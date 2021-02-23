/*
    Name: Dylan Mackey
    Date: 2/23/2021
    Assignment: Mega Travel
    Filename: activities.js
*/

/* Running Scripts */
var activities = new Map();
var activityList = [];
var selectedActivities = new Map();
var locationString = "";

//when DOM is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    //set location
    locationString = "newzealand";

    //set up activities
    initializeActivities();

    //add click events
    addEvents();

    //make check boxes
    makeCheckBoxes();
});

function addEvents() {
    //set up event delegation
    let locations = document.getElementById("locationDrop");

    locations.addEventListener('click', (e) => {
        //get the place
        let place = locations.value;

        //get activities
        let a = activities.get(place);

        //update the list
        if (a != activityList) {
            activityList = activities.get(place);
            locationString = place;
            updateActivityList();
        }
    });
}

function makeCheckBoxes() {
    //create a form group
    var group = document.getElementById("activityChecks");
    group.innerHTML = "";

    //create and add check boxes
    for (let i = 0; i < activityList.length; i++) {
        //get the activity
        let act = activityList[i];

        //make a container
        let box = document.createElement("DIV");
        box.classList.add("form-check");

        //create check box
        let input = document.createElement("INPUT");
        input.classList.add("form-check-input");
        input.type = "checkbox";
        input.id = act;

        //create label
        let label = document.createElement("LABEL");
        label.classList.add("form-check-label");
        label.for = act;
        label.innerHTML = act;

        //add items to container
        box.appendChild(input);
        box.appendChild(label);

        //initialize variable
        let flag = false;

        //add event to container
        box.addEventListener('click', (e) => {
            //update flag
            flag = !flag;

            //select/ deselect activity and update list
            if (flag) {
                input.setAttribute('checked', 'checked');
                selectedActivities.get(locationString).push(act);
            }
            else {
                input.removeAttribute('checked');
                let index = selectedActivities.get(locationString).indexOf(act);
                selectedActivities.get(locationString).splice(index, 1);
            }

            //update visual list
            updateVisualActivityList();
        });

        //add container to group
        group.appendChild(box);
    }

    //empty selected activites
    updateVisualActivityList();
}

function updateVisualActivityList() {
    var list = document.getElementById("selectedActivities");

    if (selectedActivities.get(locationString).length > 0) {
        list.innerHTML = "You selected these activities: ";

        //add activities with puncuation
        for (let j = 0; j < selectedActivities.get(locationString).length; j++) {
            list.innerHTML += selectedActivities.get(locationString)[j];
            list.innerHTML += (j != selectedActivities.get(locationString).length - 1) ? ", " : ".";

            //update checcks
            document.getElementById(selectedActivities.get(locationString)[j]).setAttribute('checked', 'checked');
        }
    }
    else {
        list.innerHTML = "You haven't selected any activities.";
    }
}


function initializeActivities() {
    activities.set("newzealand", ["City Tours", "Sports", "Cycling", "Museums", "Boating"]);
    activities.set("maldives", ["Museums", "Sailing", "Beach", "Hiking", "Boating"]);
    activities.set("venice", ["Museums", "Theatre", "Parks and Recreation", "City Tours"]);
    activities.set("cancun", ["Parks and Recreation", "Beaches", "Boating", "Snorkeling"]);
    selectedActivities.set("newzealand", []);
    selectedActivities.set("maldives", []);
    selectedActivities.set("venice", []);
    selectedActivities.set("cancun", []);
    activityList = activities.get("newzealand");
}

function updateActivityList() {
    makeCheckBoxes();
}