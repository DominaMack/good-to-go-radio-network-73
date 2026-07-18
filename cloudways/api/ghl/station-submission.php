<?php
require_once __DIR__ . '/../_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    json_response(405, ['error' => 'Method not allowed']);
}

if (env_value('GHL_WEBHOOK_SECRET') === '') {
    json_response(503, ['error' => 'GHL webhook secret is not configured.']);
}

$authorization = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$submittedSecret = '';
if (stripos($authorization, 'Bearer ') === 0) {
    $submittedSecret = trim(substr($authorization, 7));
} elseif (isset($_SERVER['HTTP_X_GHL_WEBHOOK_SECRET'])) {
    $submittedSecret = trim($_SERVER['HTTP_X_GHL_WEBHOOK_SECRET']);
} elseif (isset($_GET['secret'])) {
    $submittedSecret = trim((string)$_GET['secret']);
}

if (!hash_equals(env_value('GHL_WEBHOOK_SECRET'), $submittedSecret)) {
    json_response(401, ['error' => 'Invalid webhook secret']);
}

$payload = request_json();
$stationDraft = station_draft_from_payload($payload);

if (($_GET['dryRun'] ?? '') === '1') {
    json_response(200, ['stored' => false, 'stationDraft' => $stationDraft]);
}

if (!github_configured()) {
    json_response(503, [
        'error' => 'GitHub issue storage is not configured. Refusing to drop a paid station submission.',
        'stationDraft' => $stationDraft,
    ]);
}

try {
    $issue = create_submission_issue($stationDraft, $payload);
    json_response(202, [
        'stored' => true,
        'issue' => [
            'number' => $issue['number'],
            'url' => $issue['html_url'],
        ],
        'stationDraft' => $stationDraft,
    ]);
} catch (Throwable $error) {
    json_response(502, ['error' => $error->getMessage(), 'stationDraft' => $stationDraft]);
}
?>
