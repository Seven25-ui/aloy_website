<?php
$db = new SQLite3('users.db');

$email = $_POST['email'];
$pass = $_POST['password'];

$stmt = $db->prepare("SELECT password FROM users WHERE email = :email");
$stmt->bindValue(':email', $email);
$result = $stmt->execute()->fetchArray();

if ($result && password_verify($pass, $result['password'])) {
  echo "Login success!";
} else {
  echo "Wrong credentials!";
}
?>
