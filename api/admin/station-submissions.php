<?php
require_once __DIR__ . '/../_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    json_response(405, ['error' => 'Method not allowed']);
}

require_admin();

if (!github_configured()) {
    json_response(200, [
        'storageConfigured' => false,
        'submissions' => [],
        'message' => 'GitHub issue storage is not configured.',
    ]);
}

try {
    json_response(200, [
        'storageConfigured' => true,
        'submissions' => list_submission_issues(),
    ]);
} catch (Throwable $error) {
    json_response(502, ['error' => $error->getMessage()]);
}
?>
