<?php
include "db.php";

$username = trim($_POST['username']);
$email    = trim($_POST['email']);
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $email, $password);

if ($stmt->execute()) {
    echo "Signup success!";
} else {
    echo "Error: " . $stmt->error;
}
?>
