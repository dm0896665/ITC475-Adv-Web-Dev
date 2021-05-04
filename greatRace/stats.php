<!DOCTYPE html>
<html lang="en">

<head>
    <!--
            Name: Dylan Mackey
            Date: 5/11/2021
            Assignment: Great Race
            Filename: stats.php
        -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>The Great Race</title>
    <link href="https://fonts.googleapis.com/css?family=Racing+Sans+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="container">
        <?php
            $servername='localhost';
            $username='root';
            $password='';
            $dbname = "great_race";
            
            $conn = new mysqli($servername, $username, $password, $dbname);
            if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
            }

            $sql = "SELECT * FROM races LIMIT 10";
            $result = $conn->query($sql);

            echo "<table class='table table-striped'>";
            echo "<thead>";
            echo "  <tr>";
            echo "    <th scope='col'>Time</th>";
            echo "    <th scope='col'>Racer One</th>";
            echo "    <th scope='col'>Racer Two</th>";
            echo "    <th scope='col'>Winner</th>";
            echo "  </tr>";
            echo "</thead>";
            echo "<tbody>";

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
            echo "</tbody>";
            echo "</table>";
            $conn->close();
        ?>
    </div>

    <script src="scripts.js"></script>
</body>

</html>