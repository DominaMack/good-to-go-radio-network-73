<?php
const GTG_COOKIE_NAME = 'gtg_admin_session';
const GTG_SESSION_TTL = 28800;
const GTG_MARKER_START = '<!-- good-to-go-station-submission';
const GTG_MARKER_END = '-->';

function json_response(int $status, array $data): void {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function request_json(): array {
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw ?: '{}', true);
    return is_array($decoded) ? $decoded : [];
}

function base64url_encode(string $value): string {
    return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
}

function base64url_decode(string $value): string {
    return base64_decode(strtr($value, '-_', '+/'));
}

function local_config_value(string $key): string {
    static $config = null;
    if ($config === null) {
        $path = __DIR__ . '/.gtg-secrets.php';
        $loaded = is_file($path) ? require $path : [];
        $config = is_array($loaded) ? $loaded : [];
    }
    return isset($config[$key]) ? trim((string)$config[$key]) : '';
}

function env_value(string $key, string $default = ''): string {
    $value = getenv($key);
    if ($value !== false && $value !== '') return $value;
    $iniValue = ini_get($key);
    if ($iniValue !== false && $iniValue !== '') return $iniValue;
    $localValue = local_config_value($key);
    return $localValue !== '' ? $localValue : $default;
}

function admin_auth_configured(): bool {
    return env_value('SUPABASE_URL') !== '' && env_value('SUPABASE_ANON_KEY') !== '' && env_value('ADMIN_SESSION_SECRET') !== '';
}

function supabase_auth_url(string $path): string {
    return rtrim(env_value('SUPABASE_URL'), '/') . '/auth/v1/' . $path;
}

function admin_user_from_supabase(array $user): ?array {
    $email = trim((string)($user['email'] ?? ''));
    if ($email === '') return null;

    $metadata = $user['user_metadata'] ?? [];
    if (!is_array($metadata)) $metadata = [];
    $name = trim((string)($metadata['name'] ?? $metadata['full_name'] ?? $email));

    return [
        'name' => $name !== '' ? $name : $email,
        'email' => $email,
        'username' => $email,
    ];
}

function verify_supabase_password(?string $email, ?string $password): ?array {
    if (!admin_auth_configured() || trim((string)$email) === '' || trim((string)$password) === '') return null;

    $headers = [
        'apikey: ' . env_value('SUPABASE_ANON_KEY'),
        'Authorization: Bearer ' . env_value('SUPABASE_ANON_KEY'),
        'Content-Type: application/json',
    ];
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => implode("\r\n", $headers),
            'content' => json_encode(['email' => $email, 'password' => $password]),
            'ignore_errors' => true,
        ],
    ]);
    $raw = @file_get_contents(supabase_auth_url('token?grant_type=password'), false, $context);
    if ($raw === false) return null;

    $decoded = json_decode($raw, true);
    if (!is_array($decoded) || !is_array($decoded['user'] ?? null)) return null;
    return admin_user_from_supabase($decoded['user']);
}

function sign_payload(string $payload): string {
    return base64url_encode(hash_hmac('sha256', $payload, env_value('ADMIN_SESSION_SECRET'), true));
}

function create_admin_session(array $user): string {
    $payload = base64url_encode(json_encode([
        'sub' => $user['email'],
        'name' => $user['name'],
        'username' => $user['username'],
        'exp' => time() + GTG_SESSION_TTL,
    ]));
    return $payload . '.' . sign_payload($payload);
}

function set_admin_cookie(string $token): void {
    setcookie(GTG_COOKIE_NAME, $token, [
        'expires' => time() + GTG_SESSION_TTL,
        'path' => '/',
        'secure' => !empty($_SERVER['HTTPS']),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function clear_admin_cookie(): void {
    setcookie(GTG_COOKIE_NAME, '', [
        'expires' => time() - 3600,
        'path' => '/',
        'secure' => !empty($_SERVER['HTTPS']),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function get_admin_session(): ?array {
    if (!admin_auth_configured()) return null;
    $token = $_COOKIE[GTG_COOKIE_NAME] ?? '';
    $parts = explode('.', $token);
    if (count($parts) !== 2) return null;
    [$payload, $signature] = $parts;
    if (!hash_equals(sign_payload($payload), $signature)) return null;
    $session = json_decode(base64url_decode($payload), true);
    if (!is_array($session) || empty($session['sub']) || (int)$session['exp'] <= time()) return null;
    return [
        'name' => trim((string)($session['name'] ?? $session['sub'])),
        'email' => trim((string)$session['sub']),
        'username' => trim((string)($session['username'] ?? $session['sub'])),
    ];
}

function require_admin(): array {
    $user = get_admin_session();
    if (!$user) json_response(401, ['error' => 'Unauthorized']);
    return $user;
}

function github_repository(): string {
    if (env_value('GITHUB_REPOSITORY') !== '') return env_value('GITHUB_REPOSITORY');
    if (env_value('GITHUB_OWNER') !== '' && env_value('GITHUB_REPO') !== '') {
        return env_value('GITHUB_OWNER') . '/' . env_value('GITHUB_REPO');
    }
    return '';
}

function github_configured(): bool {
    return env_value('GITHUB_TOKEN') !== '' && github_repository() !== '';
}

function github_request(string $path, string $method = 'GET', ?array $body = null): array {
    $headers = [
        'Accept: application/vnd.github+json',
        'Authorization: Bearer ' . env_value('GITHUB_TOKEN'),
        'Content-Type: application/json',
        'User-Agent: GoodToGoRadioAdmin',
        'X-GitHub-Api-Version: 2022-11-28',
    ];
    $context = stream_context_create([
        'http' => [
            'method' => $method,
            'header' => implode("\r\n", $headers),
            'content' => $body ? json_encode($body) : null,
            'ignore_errors' => true,
        ],
    ]);
    $raw = file_get_contents('https://api.github.com' . $path, false, $context);
    $status = 0;
    foreach ($http_response_header ?? [] as $header) {
        if (preg_match('/^HTTP\/\S+\s+(\d+)/', $header, $matches)) {
            $status = (int)$matches[1];
        }
    }
    $decoded = json_decode($raw ?: '{}', true);
    if ($status < 200 || $status >= 300) {
        throw new RuntimeException($decoded['message'] ?? 'GitHub request failed');
    }
    return is_array($decoded) ? $decoded : [];
}

function flatten_payload($value, string $prefix = '', array &$output = []): array {
    if (!is_array($value)) return $output;
    foreach ($value as $key => $item) {
        $nextKey = $prefix === '' ? (string)$key : $prefix . '.' . $key;
        if (is_array($item) && array_keys($item) !== range(0, count($item) - 1)) {
            flatten_payload($item, $nextKey, $output);
        } else {
            $output[$nextKey] = $item;
            $output[(string)$key] = $item;
        }
    }
    return $output;
}

function normalize_key(string $key): string {
    return preg_replace('/[^a-z0-9]/', '', strtolower($key));
}

function pick_value(array $lookup, array $keys): string {
    foreach ($keys as $key) {
        $normalized = normalize_key($key);
        if (isset($lookup[$normalized]) && trim((string)$lookup[$normalized]) !== '') {
            return trim((string)$lookup[$normalized]);
        }
    }
    return '';
}

function slugify(string $value): string {
    $value = strtolower(trim(str_replace('&', 'and', $value)));
    $value = preg_replace('/[^a-z0-9]+/', '-', $value);
    return trim($value, '-');
}

function auto_initials(string $name): string {
    $parts = preg_split('/\s+/', trim($name));
    $letters = '';
    foreach (array_slice(array_filter($parts), 0, 3) as $part) {
        $letters .= strtoupper($part[0]);
    }
    return $letters ?: 'NS';
}

function normalize_tier(string $value): string {
    $value = strtolower($value);
    if (strpos($value, 'premium') !== false) return 'premium';
    if (strpos($value, 'feature') !== false) return 'featured';
    return 'standard';
}

function as_bool(string $value): bool {
    return in_array(strtolower(trim($value)), ['1', 'true', 'yes', 'y', 'featured', 'premium'], true);
}

function station_draft_from_payload(array $payload): array {
    $flat = flatten_payload($payload);
    $lookup = [];
    foreach ($flat as $key => $value) $lookup[normalize_key($key)] = $value;

    $name = pick_value($lookup, ['stationName', 'station_name', 'radioStationName', 'businessName', 'companyName', 'organization']);
    $hostName = pick_value($lookup, ['hostName', 'host_name', 'ownerName', 'contactName', 'fullName', 'name']);
    $genre = pick_value($lookup, ['genre', 'stationGenre', 'format', 'musicType']);
    $tagline = pick_value($lookup, ['tagline', 'slogan', 'stationTagline']);
    $description = pick_value($lookup, ['description', 'stationDescription', 'about', 'bio', 'ministryBio']);
    $contactEmail = pick_value($lookup, ['contactEmail', 'stationEmail', 'email', 'emailAddress']);
    $streamUrl = pick_value($lookup, ['streamUrl', 'streamURL', 'radioStreamUrl', 'listenUrl']);
    $tierValue = pick_value($lookup, ['tier', 'stationTier', 'plan', 'package', 'productName']);
    $tier = normalize_tier($tierValue);
    $featuredValue = pick_value($lookup, ['featured', 'homepageFeatured', 'homePageSlot']);
    $featured = as_bool($featuredValue) || $tier === 'featured' || $tier === 'premium';
    $homepageRank = pick_value($lookup, ['homepageRank', 'homePageRank', 'featuredRank']);
    $coverImage = pick_value($lookup, ['coverImage', 'coverImageUrl', 'photo', 'photoUrl', 'image']);
    $slug = slugify($name ?: ($hostName ?: 'new-station'));

    return compact_array([
        'id' => 'station-' . $slug,
        'slug' => $slug,
        'name' => $name ?: 'New Station',
        'hostName' => $hostName ?: ($name ?: 'Host to be announced'),
        'genre' => $genre,
        'tagline' => $tagline ?: 'New Voice',
        'description' => $description ?: 'Station description to be added.',
        'contactEmail' => $contactEmail,
        'streamUrl' => $streamUrl,
        'tier' => $tier,
        'featured' => $featured,
        'approved' => false,
        'homepageRank' => $featured && $homepageRank !== '' ? (int)$homepageRank : null,
        'status' => 'draft',
        'billingStatus' => 'paid',
        'socialLinks' => [
            'website' => pick_value($lookup, ['website', 'websiteUrl']),
            'facebook' => pick_value($lookup, ['facebook', 'facebookUrl']),
            'instagram' => pick_value($lookup, ['instagram', 'instagramUrl']),
            'youtube' => pick_value($lookup, ['youtube', 'youtubeUrl']),
        ],
        'gradient' => 'from-emerald-500 via-amber-500 to-stone-900',
        'initials' => auto_initials($name ?: $hostName),
        'coverImage' => $coverImage ?: '/placeholder.svg',
        'coverPosition' => 'center',
    ]);
}

function compact_array(array $value): array {
    $output = [];
    foreach ($value as $key => $item) {
        if (is_array($item)) $item = compact_array($item);
        if ($item === '' || $item === null || $item === []) continue;
        $output[$key] = $item;
    }
    return $output;
}

function create_submission_issue(array $stationDraft, array $rawPayload): array {
    $label = env_value('GITHUB_ISSUE_LABEL', 'station-submission');
    $body = implode("\n", [
        'A paid GHL station intake form was submitted.',
        '',
        'Station: ' . ($stationDraft['name'] ?? 'New Station'),
        'Contact: ' . ($stationDraft['hostName'] ?? 'Not provided'),
        'Email: ' . ($stationDraft['contactEmail'] ?? 'Not provided'),
        'Tier: ' . ($stationDraft['tier'] ?? 'standard'),
        '',
        GTG_MARKER_START,
        json_encode(['stationDraft' => $stationDraft, 'rawPayload' => $rawPayload, 'receivedAt' => gmdate('c')], JSON_PRETTY_PRINT),
        GTG_MARKER_END,
    ]);

    return github_request('/repos/' . github_repository() . '/issues', 'POST', [
        'title' => '[Station Submission] ' . ($stationDraft['name'] ?? 'New station'),
        'body' => $body,
        'labels' => [$label],
    ]);
}

function list_submission_issues(): array {
    $label = env_value('GITHUB_ISSUE_LABEL', 'station-submission');
    $issues = github_request('/repos/' . github_repository() . '/issues?state=open&labels=' . rawurlencode($label) . '&per_page=50');
    $submissions = [];
    foreach ($issues as $issue) {
        $parsed = [];
        if (isset($issue['body']) && preg_match('/<!-- good-to-go-station-submission\s*([\s\S]*?)\s*-->/', $issue['body'], $matches)) {
            $parsed = json_decode(trim($matches[1]), true) ?: [];
        }
        $submissions[] = [
            'id' => $issue['id'],
            'number' => $issue['number'],
            'title' => $issue['title'],
            'url' => $issue['html_url'],
            'createdAt' => $issue['created_at'],
            'stationDraft' => $parsed['stationDraft'] ?? null,
            'rawPayload' => $parsed['rawPayload'] ?? null,
        ];
    }
    return $submissions;
}
?>
