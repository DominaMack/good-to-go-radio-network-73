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
$adminUser = find_admin_user($body['username'] ?? '');
$password = (string)($body['password'] ?? '');

if (!$adminUser || !hash_equals(env_value('ADMIN_PASSWORD'), $password)) {
    json_response(401, ['error' => 'Invalid admin username or password']);
}

set_admin_cookie(create_admin_session($adminUser));
json_response(200, ['authenticated' => true, 'adminUser' => $adminUser]);
?>
