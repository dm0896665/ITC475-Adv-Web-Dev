<?php
    session_start();
    if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
        header("location: login.php");
        exit;
    } else {
        session_destroy();
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <!--
        Name: Dylan Mackey
        Date: 4/13/2021
        Assignment: Mega Travel
        Filename: admin.php
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
                <div class="col-sm-6 col-xs-12">
                    <?php
                        $servername='localhost';
                        $username='root';
                        $password='';
                        $dbname = "mega_travel";
                        
                        $conn = new mysqli($servername, $username, $password, $dbname);
                        if ($conn->connect_error) {
                          die("Connection failed: " . $conn->connect_error);
                        }

                        $sql = "SELECT * FROM contacts";
                        $result = $conn->query($sql);

                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                echo "<div class=\"submissionRow\">";
                                echo "Client Name: "; echo $row["fName"]; echo " "; echo $row["lName"]; echo "<br>";
                                echo "Client Phone Number: "; echo $row["phone"]; echo "<br>";
                                echo "Client Email: "; echo $row["email"]; echo "<br>";
                                echo "Number of Adults: "; echo $row["adults"]; echo "<br>";
                                echo "Number of Children: "; echo $row["children"]; echo "<br>";
                                echo "Destination: "; 
                                    $des = $row["locationDrop"]; 
                                    switch($des){
                                        case "newzealand":
                                            echo "New Zealand";
                                            break;
                                        case "maldives":
                                            echo "Maldives, South Asia";
                                            break;
                                        case "venice":
                                            echo "Venice, Italy";
                                            break;
                                        case "cancun":
                                            echo "Cancun";
                                            break;
                                        default:
                                            echo "A far away land";
                                            break;
                                    }
                                    echo "<br>";
                                echo "Travel Dates: "; 
                                    $date = $row["travelDate"];
                                    $d = explode('-', $date); 
                                    echo ($d[1] . "/" . $d[2] . "/" . $d[0]);
                                    echo "<br>";
                                echo "Interested Activities: "; 
                                    $act = json_decode($row['iActivities']);
        
                                    for($i=0; $i < count($act); $i++)
                                    {
                                        echo($act[$i]);
                                        echo($i != count($act) - 1) ? ", " : ".";
                                    }
                                echo "<br>";
                                echo "</div>";
                            }
                          } else {
                            echo "No Results found";
                          }
                          $conn->close();
                    ?>
                </div>
            </div>
        </article>

        <footer>
            <p id="copyright">Copyright Protected All Rights reserved.</p>
            <p id="footerName">MEGA TRAVELS</p>
            <p id="footerEmail">mega@travels.com</p>
        </footer>
    </div>
</body>

</html>