<?php
    session_start();
    if (isset($_SESSION['user'])) {
        header("Location: admin.php");
        exit();
    }

    if (isset($_POST['loginSubmit'])) {
        $conn = new mysqli('mariadb_db', 'root', 'root', 'users');

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $username = $conn->real_escape_string($_POST['username']);
        $password = $conn->real_escape_string($_POST['password']);

        $sql = "SELECT * FROM users WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if ($user['password'] === $password) {
                $_SESSION['user'] = $user; // Store user data in session
                header("Location: admin.php"); // Redirect to admin page
                exit();
            } else {
                $loginError = 'Incorrect password';
            }
        } else {
            $loginError = 'User not found';
        }

        $stmt->close();
        $conn->close();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cocktail Website</title>
    <link rel="stylesheet" type="text/css" href="landing.css">
</head>
<body>
    <script src="landing.js" defer></script>

    <div id="hoverArea"></div>

    <div id="navbar" class="hidden">
        <button id="loginBtn" onclick="openModal()">Login</button>
    </div>

    <header>
        <div class="welcome-container">
            <h1>Welcome to Alt Test Cocktails</h1>
        </div>
    </header>

    <main>
        <section class="cocktail">
            <!-- <img src="alt-test-image.jpg" alt="Cocktail Image"> -->
            <h2 class="cocktail-name">Cocktail Name</h2>
            <p class="cocktail-glass">Glass Type</p>
            <ul class="cocktail-ingredients"></ul>
            <p class="cocktail-how-to-mix">Instructions go here.</p>
        </section>
    </main>

    <?php if (isset($loginError)): ?>
        <script>alert('<?php echo $loginError; ?>');</script>
    <?php endif; ?>

    <footer>
        <p class="drink-counter" style="color: grey;">&nbsp;</p>
    </footer>

    <div id="loginModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <form id="loginForm" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>

                <button type="submit" name="loginSubmit">Login</button>
            </form>
        </div>
    </div>



 
</body>
</html>