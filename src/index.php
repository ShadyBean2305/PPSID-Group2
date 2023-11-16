<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cocktail Website</title>
    <link rel="stylesheet" type="text/css" href="style2.css">
</head>
<body>
    <script src="script.js" defer></script>
    <header>
        <div class="welcome-container">
            <h1>Welcome to Alt Test Cocktails</h1>
        </div>
    </header>

    <main>
        <section class="cocktail">
            <img src="alt-test-image.jpg" alt="Cocktail Image">
            <h2 class="cocktail-name">Cocktail Name</h2>
            <p class="cocktail-glass">Glass Type</p>
            <ul class="cocktail-ingredients"></ul>
            <p class="cocktail-how-to-mix">Instructions go here.</p>
        </section>
    </main>
    
    <?php
    $servername = "mariadb_db";  // Use your database host name here
    $username = "root";          // Use your database username here
    $password = "root";          // Use your database password here
    $dbname = "users";      // Your database name

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        echo "<script>console.error('Connection failed: " . addslashes($conn->connect_error) . "');</script>";
    } else {
        echo "<script>console.log('Connected successfully to the database');</script>";

        // Query to fetch data from users table
        $sql = "SELECT username, password FROM users";
        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {
            // Fetch data and log to console
            while($row = $result->fetch_assoc()) {
                $userData = addslashes(json_encode($row));
                echo "<script>console.log('User Data: ', JSON.parse('$userData'));</script>";
            }
        } else {
            echo "<script>console.log('0 results or query failed');</script>";
        }

        // Close connection if open
        if (!$conn->connect_error) {
            $conn->close();
        }
    }
    ?>

    <footer>
        <p class="drink-counter" style="color: grey;">&nbsp;</p>
    </footer>
</body>
</html>