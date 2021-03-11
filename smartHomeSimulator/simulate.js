/*
    Name: Dylan Mackey
    Date: 3/12/2021
    Assignment: Smart Home Simulator
    Filename: simulate.js
*/

/* Running Scripts */
var currentTime;
var running = false;
var updating;
var devices;

//when DOM is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    //add time visuals
    visuallySetTime();

    //add devices to DOM
    devices = getDevices();
    createDevices();

    //add click events
    addEvents();
});

function addEvents() {
    //set up event delegation
    let run = document.getElementById("run");
    run.addEventListener('click', (e) => {
        if (!running) {
            //start simulation
            updating = setInterval(time, 1000);

            //update flag
            running = true;

            //update color
            run.style.background = "rgba(40, 167, 69, 1)";
            updateBackgroundColors();

            //update tip
            run.setAttribute("title", "Click to stop simulation.");
        } else {
            //stop simulation
            clearInterval(updating);

            //update flag
            running = false;

            //update color
            run.style.background = "rgba(220, 53, 69, 1)";
            updateBackgroundColors();

            //update tip
            run.setAttribute("title", "Click to start simulation.");

            //set back clock
            document.getElementById("time").innerHTML = "12:00:00 am";
        }
    });
}


function time() {
    //get time
    var today = new Date();

    //see if it needs to be updated
    if (today.getSeconds() != 0) {
        visuallySetTime();

        //update colors
        updateDevices();
        updateBackgroundColors();
    }
}

function visuallySetTime() {
    //set variables
    var today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let timeBox = document.getElementById("time");
    let isMorning = (hours - 12 <= 0) ? true : false;
    currentTime = hours + ":" + minutes;

    //set front-end time
    let timeText = ((isMorning) ? /*morning*/ ((hours == 0) ? 12 : hours) : /*night*/ ((hours == 12) ? hours : hours - 12)) //hours
        + ":" + ((minutes.toString().length < 2) ? "0" + minutes : minutes) //minutes
        + ":" + ((seconds.toString().length < 2) ? "0" + seconds : seconds) //seconds
        + ((isMorning) ? " am" : " pm"); //meridiem

    if (running) {
        timeBox.innerHTML = timeText;
    }
}

function createDevices() {
    //get container
    var container = document.getElementById("container");

    //add devices
    devices.forEach(device => {
        //make a box
        let box = document.createElement("DIV");
        box.id = device.key + "Box";
        box.classList.add("deviceBox");
        box.classList.add("align-items-center");
        box.classList.add("justify-content-center");

        //set variables
        today = device.start.split(":");
        hours = +today[0];
        minutes = +today[1];
        isMorning = (hours - 12 <= 0) ? true : false;

        //set start time
        let startTime = ((isMorning) ? /*morning*/ ((hours == 0) ? 12 : hours) : /*night*/ ((hours == 12) ? hours : hours - 12)) //hours
            + ":" + ((minutes.toString().length < 2) ? "0" + minutes : minutes) //minutes
            + ((isMorning) ? " am" : " pm"); //meridiem

        //set variables
        today = device.end.split(":");
        hours = +today[0];
        minutes = +today[1];
        isMorning = (hours - 12 <= 0) ? true : false;

        //set end time
        let endTime = ((isMorning) ? /*morning*/ ((hours == 0) ? 12 : hours) : /*night*/ ((hours == 12) ? hours : hours - 12)) //hours
            + ":" + ((minutes.toString().length < 2) ? "0" + minutes : minutes) //minutes
            + ((isMorning) ? " am" : " pm"); //meridiem

        //set tooltip description
        let desc = "The " + device.name + " " + device.onWord + " at " + startTime + " and " + device.offWord + " at " + endTime + "."
        if (today[0].length == 0) {
            desc = "The " + device.name + "'s times have not been set up yet.";
        }

        //add image
        let img = document.createElement("IMG");
        img.setAttribute("src", "img/" + device.key + ".png");
        img.setAttribute("alt", device.name);
        img.setAttribute("data-toggle", "tooltip");
        img.setAttribute("title", desc);
        img.setAttribute("width", 100);
        img.setAttribute("height", 100);
        img.classList.add("mx-auto");
        img.classList.add("d-block");
        img.classList.add("deviceImg");

        //connect objects
        box.appendChild(img);
        container.appendChild(box);
    });

    //update colors
    updateDevices();
    updateBackgroundColors();
}

function updateDevices() {
    devices.forEach(device => {
        if (device.start.length != 0) {
            let startTime = device.start.split(":");
            let endTime = device.end.split(":");
            let time = currentTime.split(":");
            let isOn = "false";

            //if start and end times are the same
            if (+startTime[0] == +endTime[0] && +startTime[1] == +endTime[1]) {
                isOn = "true";
            } else {
                //between regular times
                if (+startTime[0] <= +time[0] && +endTime[0] > +time[0]) {
                    if (+startTime[1] <= +time[1] && +endTime[1] > +time[1]) {
                        isOn = "true";
                    }
                }

                //same hour as start time
                if (+startTime[0] == +time[0] && +startTime[0] != +endTime[0]) {
                    if (+startTime[1] <= +time[1]) {
                        isOn = "true";
                    }
                }

                //same hour as end time
                if (+endTime[0] == +time[0] && +startTime[0] != +endTime[0]) {
                    if (+endTime[1] > +time[1]) {
                        isOn = "true";
                    }
                }

                //start and end hour is the same
                if (+startTime[0] == +endTime[0] && +startTime[0] == +time[0]) {
                    if (+startTime[1] <= +time[1] && +endTime[1] > +time[1] && +startTime[1] < +endTime[1]) {
                        isOn = "true";
                    }
                }

                //end time is before start time
                if (+startTime[0] > +endTime[0] || (+startTime[0] == +endTime[0] && +startTime[1] > +endTime[1])) {
                    if (((+startTime[0] <= +time[0]) || (+startTime[0] == +time[0] && +startTime[1] <= +time[1]))
                        || ((+endTime[0] > +time[0]) || (+endTime[0] == +time[0] && +endTime[1] > +time[1]))) {
                        isOn = "true";
                    }
                }
            }
            device.isOn = isOn;
        } else {
            device.isOn = null;
        }
    });
}

function updateBackgroundColors() {
    devices.forEach(device => {
        let box = document.getElementById(device.key + "Box");
        switch (device.isOn) {
            case null:
                box.style.background = "rgba(108, 117, 125, 0.7)";
                break;
            case "true":
                if (running) {
                    box.style.background = "rgba(40, 167, 69, 0.7)";
                } else {
                    box.style.background = "rgba(108, 117, 125, 0.7)";
                }
                break;
            case "false":
                if (running) {
                    box.style.background = "rgba(220, 53, 69, 0.7)";
                } else {
                    box.style.background = "rgba(108, 117, 125, 0.7)";
                }
                break;
            default:
                console.log(device.isOn + " <- is strange.");
                break;
        }
    });
}

function getDevices() {
    return JSON.parse(localStorage.getItem("devices"), reviver);
}

function reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}