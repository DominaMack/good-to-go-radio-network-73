<?php
require_once __DIR__ . '/../_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    json_response(405, ['error' => 'Method not allowed']);
}

$adminUser = get_admin_session();
json_response(200, [
    'adminConfigured' => admin_auth_configured(),
    'googleClientId' => env_value('GOOGLE_CLIENT_ID'),
    'authenticated' => (bool)$adminUser,
    'adminUser' => $adminUser,
]);
?>
