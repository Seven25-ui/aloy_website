<?php
require_once 'config.php';

if (!isLoggedIn()) {
    header('Location: auth.html');
    exit;
}

$user = getCurrentUser();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 20px;
        }
        .btn {
            padding: 10px 20px;
            background: #7dd3fc;
            color: #000;
            text-decoration: none;
            border-radius: 10px;
            display: inline-block;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome, <?php echo htmlspecialchars($user['username']); ?>!</h1>
        <p>Email: <?php echo htmlspecialchars($user['email']); ?></p>
        <p>Member since: <?php echo date('F Y', strtotime($user['created_at'])); ?></p>
        
        <a href="index.html" class="btn">Go to Portfolio</a>
        <a href="logout.php" class="btn" style="background:#f44336;">Logout</a>
    </div>
</body>
</html>
