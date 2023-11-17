<?php
    session_start();

    if (!isset($_SESSION['user'])) {
        header("Location: index.php");
        exit();
    }

    if (isset($_GET['action']) && $_GET['action'] == 'logout') {
        session_unset();
        session_destroy();
        header("Location: index.php");
        exit();
    }
?><!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Panel - Cocktail Website</title>
    <link rel="stylesheet" type="text/css" href="admin.css">
</head>
<body>
    <script src="admin.js" defer></script>
    <div id="hoverArea"></div>

    <div id="navbar" class="hidden">
        <a id="logoutBtn" href="admin.php?action=logout">Logout</a>
    </div>

    <header>
        <div class="welcome-container">
            <h1>Admin Panel - Alt Test Cocktails</h1>
        </div>
    </header>

    <main>
        <section class="admin-section">
            <h2>Admin Controls</h2>
            <!-- Add your admin controls and functionalities here -->
            <p>Here you can manage cocktails, users, and other administrative tasks.</p>
        </section>
    </main>

    <footer>
        <p class="admin-footer" style="color: grey;">Admin Panel Footer</p>
    </footer>
</body>
</html>
