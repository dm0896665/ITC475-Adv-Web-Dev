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
var countD = 5;
var r1 = {
    num: 1,
    won: false
};
var r2 = {
    num: 2,
    won: false
};
var runnerArray = [r1, r2];
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

            running = setInterval(run, 5.5);
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
            let id = e.target.id; runnerArray[0]
            if (id.includes("p")) {
                runnerArray[selected].num = +id.charAt(1);
                selected++;
                let runner = document.getElementById(id);
                var css = "#" + id + "{background-color: rgba(0, 255, 0, .5);}";
                var style = document.createElement('style');

                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
                runner.appendChild(style);

                if (selected == 2) {
                    css = ".selectMe:hover{background-color: rgba(0, 255, 0, 0);}";
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
        countD = 5;
        initializeRace();
    }
    console.log(countD);
}

function run() {
    if (index1 < 1120) {
        index1 += Math.floor(Math.random() * 4);
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
        index2 += Math.floor(Math.random() * 4);
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
        document.getElementById('winner').src = "img/" + runnerArray[0].num + "w.png";
        document.getElementById('loser').src = "img/" + runnerArray[1].num + "l.png";
        runnerArray[1].won = true;
    }

    //insertStatsIntoDB();
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
    $.ajax({
        type: 'post',
        url: 'http://localhost/greatrace/database.php',
        data: { first: r1.num, second: (r1.won) ? r2.num : r1.num },
        success: function (data) {
            console.log(data);
        }
    });
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

    document.getElementById('light').style = "display:none;";
    document.getElementById('flag').src = "img/blank.png";
    document.getElementById('selection').style = "";
    document.getElementById('winner').src = "img/winBlank.png";
    document.getElementById('loser').src = "img/loseBlank.png";
    document.getElementById("r1").style.left = index1;
    document.getElementById("r2").style.left = index2;
    document.getElementById('win').style = "display:none;";
    document.getElementById("selectText").innerHTML = "Select two runners!";
}