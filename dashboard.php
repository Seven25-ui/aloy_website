<?php include 'auth.php'; ?>
<!DOCTYPE html>
<html>
<body>
<h1>Welcome, <?php echo $_SESSION['user']; ?></h1>
<p>This page is protected</p>
<a href="logout.php">Logout</a>
</body>
</html>
