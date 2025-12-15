<?php
$host = "127.0.0.1";   // Termux localhost
$user = "root";         // imong MariaDB root user
$pass = "se7en";             // kung walay password
$db   = "myapp";        // imong database

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
