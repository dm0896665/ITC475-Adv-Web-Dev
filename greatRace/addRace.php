<?php
    $servername='localhost';
    $username='root';
    $password='';
    $dbname = "great_race";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $first = $data["first"];
    $second = $data["second"];
    $winner = $data["winner"];
    $sql = "INSERT INTO races (first_racer, second_racer, winner)
    VALUES ('$first','$second','$winner')";
    mysqli_query($conn, $sql);
    mysqli_close($conn);
?>