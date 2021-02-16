/*
    Name: Dylan Mackey
    Date: 2/2/2021
    Assignment: Mega Travel
    Filename: welcome.js
*/

/* Running Scripts */
var currentTime;
var updating;

//when DOM is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    //add time visuals
    visuallySetTime();

    //setup clock
    updating = setInterval(time, 1000);


});

function time() {
    //get time
    var today = new Date();

    //see if it needs to be updated
    if (today.getSeconds() != 0) {
        visuallySetTime();
    }
}

function visuallySetTime() {
    //set variables
    var today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let timeBox = document.getElementById("time");
    let messageBox = document.getElementById("welcomeMessage");
    let visualIcon = document.getElementById("visualIcon");
    let isMorning = (hours - 12 <= 0) ? true : false;
    currentTime = hours + ":" + minutes;

    //set front-end time
    let timeText = ((isMorning) ? /*morning*/ ((hours == 0) ? 12 : hours) : /*night*/ ((hours == 12) ? hours : hours - 12)) //hours
        + ":" + ((minutes.toString().length < 2) ? "0" + minutes : minutes) //minutes
        + ((isMorning) ? " am" : " pm"); //meridiem
    timeBox.innerHTML = timeText;

    //set Welcome message
    let message;
    switch (true) {
        case (hours >= 0 && hours <= 11):
            message = "Good Morning";
            break;
        case (hours >= 12 && (hours <= 4)):
            message = "Good Afternoon";
            break;
        case (hours == 17):
            message = (minutes > 0) ? "Good Evening" : "Good Afternoon";
            break;
        case (hours >= 18 && hours <= 23):
            message = "Good Evening";
            break;
        default:
            console.log(hours + " is probably not a time.");
    }
    messageBox.innerHTML = message;


    //set visual icon
    let src;
    switch (true) {
        case (hours >= 6 && hours <= 17):
            src = "sun";
            break;
        case (hours == 18):
            src = (minutes > 0) ? "moon" : "sun";
            break;
        case (hours >= 19 || hours <= 5):
            src = "moon";
            break;
        default:
            console.log(hours + " is probably not a time.");
    }
    visualIcon.src = "img/" + src + ".png";
}