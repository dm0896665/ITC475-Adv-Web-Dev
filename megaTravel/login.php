<?php
session_start();
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: admin.php");
    exit;
}
 
$servername='localhost';
$username='root';
$password='';
$dbname = "mega_travel";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
 
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($result->num_rows > 0) {
        $found = false;
            while($row = $result->fetch_assoc()) {
                if($row["username"] == $username){
                    if($row["password"] == $password){
                        session_start();
                        $_SESSION["loggedin"] = true;     
                        header("location: admin.php");
                        mysqli_close($conn);
                    } else {
                        echo '<script>alert("Wrong username or password")</script>';
                        $found = true;
                    }
                }
            }
            if(!$found){
                echo '<script>alert("That Username doesn\'t exist.")</script>';
            }
    }
    
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <!--
        Name: Dylan Mackey
        Date: 4/27/2021
        Assignment: Mega Travel
        Filename: login.php
    -->
    <meta charset="UTF-8">

    <title>
        Mega Travel
    </title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="container-fluid">
        <header>
            <div id="logoHolder">
                <img id="logo" src="img/megaTravelLogo.PNG" alt="Mega Travel Logo" width=300 />
            </div>
            <div id="separator"></div>

            <nav class="navbar">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html"><strong>Home</strong></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="about.html"><strong>About Us</strong></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact.html"><strong>Contact Agent</strong></a>
                    </li>
                </ul>
            </nav>
        </header>

        <article>
            <div class="row">
                <div class="col-sm-6 col-xl-3 col-xs-12 mx-auto">
                    <h2 class="text-center">Login</h2>
                    <p class="text-center">Please fill in your credentials to login.</p>

                    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                        <div class="form-group">
                            <label>Username</label>
                            <input required type="text" name="username" class="form-control">
                        </div>    
                        <div class="form-group">
                            <label>Password</label>
                            <input required type="password" name="password" class="form-control">
                        </div>
                        <div class="form-group d-flex flex-row-reverse">
                            <input type="submit" class="btn btn-primary" value="Login">
                        </div>
                    </form>
                </div>
            </div>
        </article>

        <footer class="fixed-bottom">
            <p id="copyright">Copyright Protected All Rights reserved.</p>
            <p id="footerName">MEGA TRAVELS</p>
            <p id="footerEmail">mega@travels.com</p>
        </footer>
    </div>
</body>

</html>