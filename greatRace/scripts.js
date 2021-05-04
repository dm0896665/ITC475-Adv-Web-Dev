/*
    Name: Dylan Mackey
    Date: 5/11/2021
    Assignment: Great Race
    Filename: scripts.js
*/

/* Running Scripts */
var running;
var index1 = 0;
var index2 = 0;
var countD = 3;
var r1 = {
    name: "",
    num: 1,
    won: false
};
var r2 = {
    name: "",
    num: 2,
    won: false
};
var runnerArray = [r1, r2];
var nameArray = ["Usain", "Pam", "Jim", "Shelly-Ann"];
var won = false;
var selected = 0;

//when DOM is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    //initialize images
    initializeImages();

    //add click events
    addEvents();
});

function addEvents() {
    //light click
    document.getElementById('light').addEventListener('click', function () {
        if (!won) {
            document.getElementById('light').src = "img/green.png";

            running = setInterval(run, 500);
        }
    });

    //standings click
    document.getElementById('standings').addEventListener('click', function () {
        if (won) {
            won = false;
            runnerArray[0].won = false;
            runnerArray[1].won = false;
            document.getElementById('p' + runnerArray[0].num).removeChild(document.getElementById('p' + runnerArray[0].num).firstChild);
            document.getElementById('p' + runnerArray[1].num).removeChild(document.getElementById('p' + runnerArray[1].num).firstChild);
            document.getElementById('selection').removeChild(document.getElementById('selection').lastChild);
            initializeImages();
        }
    });

    //player click
    document.getElementById('selection').addEventListener('click', function (e) {
        if (selected < 2) {
            let id = e.target.id; runnerArray[0];
            if (id.includes("p")) {
                runnerArray[selected].num = +id.charAt(1);
                runnerArray[selected].name = nameArray[+id.charAt(1) - 1];
                selected++;
                let runner = document.getElementById(id);
                var css = "#" + id + "{background-color: rgba(0, 255, 0, .5);opacity:1;} #" + id + "Text{display:block;}";
                var style = document.createElement('style');

                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
                runner.appendChild(style);

                if (selected == 2) {
                    css = ".selectMe:hover{background-color: rgba(0, 255, 0, 0);opacity:1;} .contentWithTextBackground:hover > .backgroundText{display:none;}";
                    style = document.createElement('style');

                    if (style.styleSheet) {
                        style.styleSheet.cssText = css;
                    } else {
                        style.appendChild(document.createTextNode(css));
                    }
                    document.getElementById('selection').appendChild(style);

                    running = setInterval(countDown, 1000);
                }
            }
        }
    });
}

function countDown() {
    if (countD > 0) {
        document.getElementById("selectText").innerHTML = "May the best racer win! Race is preparing in " + countD + "...";
        countD--;
    } else {
        clearInterval(running);
        countD = 3;
        initializeRace();
    }
}

function run() {
    if (index1 < 1120) {
        index1 += Math.floor(Math.random() * 200);
        document.getElementById("r1").style.left = index1 + "px";
    }
    else {
        clearInterval(running);
        var w;
        if (index1 > index2)
            w = 1;
        else
            w = 2;
        document.getElementById('r1').src = "img/blank.png";
        document.getElementById('r2').src = "img/blank.png";
        index1 = 0;
        index2 = 0;
        declareWinner(w);
    }
    if (index2 < 1120) {
        index2 += Math.floor(Math.random() * 200);
        document.getElementById("r2").style.left = index2 + "px";
    }
    else {
        clearInterval(running);
        var w;
        if (index1 > index2)
            w = 1;
        else
            w = 2;
        document.getElementById('r1').src = "img/blank.png";
        document.getElementById('r2').src = "img/blank.png";
        index1 = 0;
        index2 = 0;
        declareWinner(w);
    }
}

function declareWinner(winner) {
    selected = 0;
    won = true;
    document.getElementById('win').style = "";

    if (winner == 1) {
        document.getElementById('winner').src = "img/" + runnerArray[0].num + "w.png";
        document.getElementById('loser').src = "img/" + runnerArray[1].num + "l.png";
        runnerArray[0].won = true;
    }
    else {
        document.getElementById('winner').src = "img/" + runnerArray[1].num + "w.png";
        document.getElementById('loser').src = "img/" + runnerArray[0].num + "l.png";
        runnerArray[1].won = true;
    }

    insertStatsIntoDB();
}

function insertStatsIntoDB() {
    /*
    const express = require('express')
    const bodyParser = require('body-parser')
    const mysql = require('mysql')

    const app = express()
    const port = process.env.PORT || 5000;

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    const pool  = mysql.createPool({
        connectionLimit : 10,
        host            : 'localhost',
        user            : 'root',
        password        : '',
        database        : 'great_race'
    })

    app.post('', (req, res) => {

        pool.getConnection((err, connection) => {
            if(err) throw err;
            
            const params = req.body;
            connection.query('INSERT INTO races SET ?', params, (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`Beer with the record ID  has been added.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from beer table are:11 \n', rows)
    
            })
        })
    });
    */
    var xhttp = new XMLHttpRequest();
    var str_json = (JSON.stringify({ first: r1.name, second: r2.name, winner: (r1.won) ? r1.name : r2.name }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Successfully recorded " + ((r1.won) ? r1.name : r2.name) + "'s winning race.")
        }
    };
    xhttp.open("POST", "http://localhost/ITC475-Adv-Web-Dev/greatrace/database.php", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(str_json);

    /*
    $.ajax({
        type: 'post',
        url: 'http://localhost/ITC475-Adv-Web-Dev/greatrace/database.php',
        data: { first: r1.name, second: r2.name, winner: (r1.won) ? r1.name : r2.name },
        success: function (data) {
            console.log(data);
        }
    });
    */
}

function initializeRace() {
    document.getElementById('light').style = "";
    document.getElementById('light').src = "img/red.png";
    document.getElementById('flag').src = "img/finish.png";
    document.getElementById('r1').src = "img/" + runnerArray[0].num + "r.png";
    document.getElementById('r2').src = "img/" + runnerArray[1].num + "r.png";
    document.getElementById('selection').style = "display:none;";
}

function initializeImages() {
    index1, index2 = 0;
    //document.getElementById('light').style = "display:none;";
    document.getElementById('flag').src = "img/blank.png";
    document.getElementById('selection').style = "";
    document.getElementById('winner').src = "img/winBlank.png";
    document.getElementById('loser').src = "img/loseBlank.png";
    document.getElementById("r1").style.left = index1;
    document.getElementById("r2").style.left = index2;
    document.getElementById('win').style = "display:none;";
    document.getElementById("selectText").innerHTML = "Select two runners!";
}