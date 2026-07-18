<?php
require_once __DIR__ . '/../_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    json_response(405, ['error' => 'Method not allowed']);
}

$adminUser = get_admin_session();
json_response(200, [
    'adminConfigured' => admin_auth_configured(),
    'adminUsers' => $adminUser ? admin_users() : [],
    'authenticated' => (bool)$adminUser,
    'adminUser' => $adminUser,
]);
?>
