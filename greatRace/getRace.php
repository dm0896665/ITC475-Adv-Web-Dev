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
    $sql = "SELECT * FROM races WHERE ((first_racer = '{$first}' AND second_racer = '{$second}') OR (first_racer = '{$second}' AND second_racer = '{$first}'))LIMIT 10";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>"; echo $row["time"]; echo "</td>";
            echo "<td>"; echo $row["first_racer"]; echo "</td>";
            echo "<td>"; echo $row["second_racer"]; echo "</td>";
            echo "<td>"; echo $row["winner"]; echo "</td>";
            echo "</tr>";
        }
    } else {
        echo "No Results found";
    }
    mysqli_close($conn);
?>