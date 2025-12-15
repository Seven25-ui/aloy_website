<?php
require_once 'config.php';

session_unset();
session_destroy();

// If called via AJAX, return JSON
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
} else {
    // If direct access, redirect
    header('Location: auth.html');
}
exit;
?>
