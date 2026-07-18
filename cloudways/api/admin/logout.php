<?php
require_once __DIR__ . '/../_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    json_response(405, ['error' => 'Method not allowed']);
}

clear_admin_cookie();
json_response(200, ['authenticated' => false]);
?>
