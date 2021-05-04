<?php
    $servername='localhost';
    $username='root';
    $password='';
    $dbname = "great_race";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $first = $_POST['fName'];
    $second = $_POST['lName'];
    $sql = "INSERT INTO races (fName, lName, phone, email, adults, children, locationDrop, travelDate, iActivities)
    VALUES ('$fName','$lName','$phone','$email','$adults','$children','$locationDrop','$travelDate','$iActivities')";
    mysqli_query($conn, $sql);
    mysqli_close($conn);
?>