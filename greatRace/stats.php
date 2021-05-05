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
    
    <script
        src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
    <script>
        function postChange() {
            let f = document.getElementById("firstRunner");
            let s = document.getElementById("secondRunner");
            var selected = (f != null) ? f.value : "Usain";
            var selected2 = (s != null) ? s.value : "Pam";
            $.ajax({
                url: 'http://localhost/ITC475-Adv-Web-Dev/greatrace/getRace.php',
                type: 'post',
                contentType: 'application/json',
                dataType: 'text',
                data: JSON.stringify({ "first": selected, "second": selected2 }),
                success: function (data) {
            console.log("hi yall");
                    $('#searchTableBody').html(data);
                }
            });
        }
    </script>
</head>

<body>
    <div id="container">
        <a id="toRace" href="/ITC475-Adv-Web-Dev/greatrace/index.html">
            <div class="btn btn-primary">Back to the race!</div>
        </a>

        <div class="row">
            <div class="col-6 mx-auto">
                <h1 clasas="text-justify text-center">Last 5 Races</h1>
                <?php
                    $servername='localhost';
                    $username='root';
                    $password='';
                    $dbname = "great_race";
                    
                    $conn = new mysqli($servername, $username, $password, $dbname);
                    if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                    }

                    $sql = "SELECT * FROM races LIMIT 5";
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
        </div>
        <div class="row">
            <div class="col-6 mx-auto">
                <h1 clasas="text-justify text-center" id="ten">Last 10 Races of</h1>
                <form>
                    <div class="form-group" id="runners">
                    </div>
                </form>
                <table class='table table-striped'>
                    <thead>
                    <tr>
                        <th scope='col'>Time</th>
                        <th scope='col'>Racer One</th>
                        <th scope='col'>Racer Two</th>
                        <th scope='col'>Winner</th>
                    </tr>
                    </thead>
                    <tbody id='searchTableBody'>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script src="stats.js"></script>
</body>

</html>