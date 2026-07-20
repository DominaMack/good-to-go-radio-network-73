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
$adminUser = verify_supabase_password($body['email'] ?? '', $body['password'] ?? '');

if (!$adminUser) {
    json_response(401, ['error' => 'Invalid Supabase admin email or password.']);
}

set_admin_cookie(create_admin_session($adminUser));
json_response(200, ['authenticated' => true, 'adminUser' => $adminUser]);
?>
