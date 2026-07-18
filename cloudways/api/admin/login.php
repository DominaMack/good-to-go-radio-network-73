<?php
require_once __DIR__ . '/../_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    json_response(405, ['error' => 'Method not allowed']);
}

if (!admin_auth_configured()) {
    json_response(503, ['error' => 'Admin authentication is not configured.']);
}

$body = request_json();
$adminUser = verify_google_credential($body['credential'] ?? '');

if (!$adminUser) {
    json_response(401, ['error' => 'This Google account is not authorized for admin access.']);
}

set_admin_cookie(create_admin_session($adminUser));
json_response(200, ['authenticated' => true, 'adminUser' => $adminUser]);
?>
