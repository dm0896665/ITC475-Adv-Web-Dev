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
        //if the race hasn't started yet
        if (!won && (document.getElementById('light').src != "http://localhost/ITC475-Adv-Web-Dev/greatrace/img/green.png")) {
            //update light
            document.getElementById('light').src = "img/green.png";

            //start race
            running = setInterval(run, 500);
        }
    });

    //standings click
    document.getElementById('standings').addEventListener('click', function () {
        //when the race is completed
        if (won) {
            //reset race to character selection
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
            //make sure it's the right type of element
            if (id.includes("p")) {
                //update variables
                runnerArray[selected].num = +id.charAt(1);
                runnerArray[selected].name = nameArray[+id.charAt(1) - 1];
                selected++;

                //initialize variables
                let runner = document.getElementById(id);
                var css = "#" + id + "{background-color: rgba(0, 255, 0, .5);opacity:1;} #" + id + "Text{display:block;}";
                var style = document.createElement('style');

                //add styles
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
                runner.appendChild(style);

                if (selected == 2) {
                    //initialize new style
                    css = ".selectMe:hover{background-color: rgba(0, 255, 0, 0);opacity:1;} .contentWithTextBackground:hover > .backgroundText{display:none;}";
                    style = document.createElement('style');

                    //add styles
                    if (style.styleSheet) {
                        style.styleSheet.cssText = css;
                    } else {
                        style.appendChild(document.createTextNode(css));
                    }
                    document.getElementById('selection').appendChild(style);

                    //add a count down
                    running = setInterval(countDown, 1000);
                }
            }
        }
    });
}

function countDown() {
    //update count down text
    if (countD > 0) {
        document.getElementById("selectText").innerHTML = "May the best racer win! Race is preparing in " + countD + "...";
        countD--;
    }
    //reset timer and init race
    else {
        clearInterval(running);
        countD = 3;
        initializeRace();
    }
}

function run() {
    //update first racer if he hasn't won
    if (index1 < 1120) {
        index1 += Math.floor(Math.random() * 200);
        document.getElementById("r1").style.left = index1 + "px";
    }

    //first racer won
    else {
        //declare the winner
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
    //update second racer if he hasn't won
    if (index2 < 1120) {
        index2 += Math.floor(Math.random() * 200);
        document.getElementById("r2").style.left = index2 + "px";
    }

    //second racer won
    else {
        //declare the winner
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
    //update variables
    selected = 0;
    won = true;
    document.getElementById('win').style = "";

    //first racer won
    if (winner == 1) {
        document.getElementById('winner').src = "img/" + runnerArray[0].num + "w.png";
        document.getElementById('loser').src = "img/" + runnerArray[1].num + "l.png";
        runnerArray[0].won = true;
    }
    //second racer won
    else {
        document.getElementById('winner').src = "img/" + runnerArray[1].num + "w.png";
        document.getElementById('loser').src = "img/" + runnerArray[0].num + "l.png";
        runnerArray[1].won = true;
    }

    //add it to database
    insertStatsIntoDB();
}

function insertStatsIntoDB() {
    //initialize variables
    var xhttp = new XMLHttpRequest();
    var str_json = (JSON.stringify({ first: r1.name, second: r2.name, winner: (r1.won) ? r1.name : r2.name }));

    //after it's been sent handle it
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Successfully recorded " + ((r1.won) ? r1.name : r2.name) + "'s winning race.");
        }
    };

    //send data to php page
    xhttp.open("POST", "http://localhost/ITC475-Adv-Web-Dev/greatrace/addRace.php", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(str_json);
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