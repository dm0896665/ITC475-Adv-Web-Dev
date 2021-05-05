/*
    Name: Dylan Mackey
    Date: 5/11/2021
    Assignment: Great Race
    Filename: stats.js
*/

/* Running Scripts */
var nameArray = ["Usain", "Pam", "Jim", "Shelly-Ann"];
var nameInUseArray = [];
var firstRunnerEle;
var secondRunnerEle;
var firstRunner = "Usain";
var secondRunner = "Pam";

//when DOM is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    //add control
    updateSelectionLists();

    //initialize variables
    firstRunnerEle = document.getElementById('firstRunner');
    secondRunnerEle = document.getElementById('secondRunner');

    //add click events
    addEvents();
});

function addEvents() {
    //first Runner
    firstRunnerEle.addEventListener('click', function (e) {
        //make sure the value changes
        if (firstRunner != firstRunnerEle.value) {
            firstRunner = firstRunnerEle.value;

            //update the list
            updateSelectionLists();
        }
    });

    //second Runner
    secondRunnerEle.addEventListener('click', function (e) {
        //make sure the value changes
        if (secondRunner != secondRunnerEle.value) {
            secondRunner = secondRunnerEle.value;

            //update the list
            updateSelectionLists();
        }
    });
}

function updateSelectionLists() {
    //initialize variables
    nameInUseArray = [firstRunner, secondRunner];
    let group = document.getElementById("runners");
    group.innerHTML = "";

    //add racers name for first racer
    let sel = document.createElement('select');
    sel.classList.add("form-control");
    for (let i = 0; i < nameArray.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = nameArray[i];
        if (nameInUseArray.includes(nameArray[i])) {
            opt.disabled = true;
            if (nameArray[i] == firstRunner) {
                opt.setAttribute('selected', 'selected');
            }
        }
        sel.appendChild(opt);
    }
    sel.id = "firstRunner";
    let row = document.createElement('div');
    row.classList.add("row");
    let col = document.createElement('div');
    col.classList.add("col-4");
    col.appendChild(sel);
    row.appendChild(col);

    //add racers name for second racer
    let sel2 = document.createElement('select');
    sel2.classList.add("form-control");
    for (let i = 0; i < nameArray.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = nameArray[i];
        if (nameInUseArray.includes(nameArray[i])) {
            opt.disabled = true;
            if (nameArray[i] == secondRunner) {
                opt.setAttribute('selected', 'selected');
            }
        }
        sel2.appendChild(opt);
    }
    sel2.id = "secondRunner";
    col = document.createElement('div');
    col.classList.add("col-4");
    col.appendChild(sel2);
    row.appendChild(col);
    group.appendChild(row);

    //update header
    document.getElementById("ten").innerHTML = "Last 10 Races of " + firstRunner + " vs " + secondRunner;

    //update elements and events on them
    firstRunnerEle = document.getElementById('firstRunner');
    secondRunnerEle = document.getElementById('secondRunner');
    addEvents();

    //update changes
    postChange();
}