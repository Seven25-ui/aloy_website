<?php
session_start();

$db = new SQLite3(__DIR__ . '/users.db');

$db->exec("CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT
)");

if (!isset($_POST['email'], $_POST['password'])) {
  die("Invalid request");
}

$email = trim($_POST['email']);
$pass  = password_hash($_POST['password'], PASSWORD_DEFAULT);

$stmt = $db->prepare("INSERT INTO users (email, password) VALUES (:email, :pass)");
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$stmt->bindValue(':pass', $pass, SQLITE3_TEXT);

$result = $stmt->execute();

if ($result) {
  header("Location: login.html");
  exit();   // 🔥 IMPORTANTE
} else {
  echo "Signup failed (email exists)";
}
