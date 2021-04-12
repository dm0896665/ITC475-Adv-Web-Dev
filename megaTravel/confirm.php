<!DOCTYPE html>
<html lang="en">

<head>
    <!--
      Name: Dylan Mackey
      Date: 3/30/2021
      Assignment: Mega Travel
      Filename: confirm.php
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
                    <div id="submission">
                        Thank you for submitting your travel agent contact request! Here is the information you submitted:<br><br>

                        Client Name: <?php echo $_POST["fName"]; ?> <?php echo $_POST["lName"]; ?><br>
                        Client Phone Number: <?php echo $_POST["phone"]; ?><br>
                        Client Email: <?php echo $_POST["email"]; ?><br>
                        Number of Adults: <?php echo $_POST["adults"]; ?><br>
                        Number of Children: <?php echo $_POST["children"]; ?><br>
                        Destination: <?php 
                            $des = $_POST["locationDrop"]; 
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
                        ?><br>
                        Travel Dates: <?php 
                            $date = $_POST["travelDate"];
                            $d = explode('-', $date); 
                            echo ($d[1] . "/" . $d[2] . "/" . $d[0]);
                        ?><br>
                        Interested Activities: <?php 
                            $act = $_POST['iActivities'];

                            for($i=0; $i < count($act); $i++)
                            {
                                echo($act[$i]);
                                echo($i != count($act) - 1) ? ", " : ".";
                            }
                        ?><br>
                        An agent will be in touch with you soon!<br>
                        
                        <?php
                        $servername='localhost';
                        $username='root';
                        $password='';
                        $dbname = "mega_travel";
                        
                        $conn = new mysqli($servername, $username, $password, $dbname);
                        if ($conn->connect_error) {
                          die("Connection failed: " . $conn->connect_error);
                        }
                        $fName = $_POST['fName'];
                        $lName = $_POST['lName'];
                        $phone = $_POST['phone'];
                        $email = $_POST['email'];
                        $adults = $_POST['adults'];
                        $children = $_POST['children'];
                        $locationDrop = $_POST['locationDrop'];
                        $travelDate = $_POST['travelDate'];
                        $iActivities = json_encode($_POST['iActivities']);
                        $sql = "INSERT INTO contacts (fName, lName, phone, email, adults, children, locationDrop, travelDate, iActivities)
                        VALUES ('$fName','$lName','$phone','$email','$adults','$children','$locationDrop','$travelDate','$iActivities')";
                        mysqli_query($conn, $sql);
                        mysqli_close($conn);
                        ?>
                    </div>
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