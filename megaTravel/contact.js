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

    //event on the phone number input
    let numberInput = document.getElementById("phone");
    numberInput.addEventListener('input', function (e) {
        //if there is something in the input
        if (this.value.length > 0) {
            //initialize variables
            let entered = this.value.charAt(this.value.length - 1);
            let before = this.value.substring(0, this.value.length - 1);

            //if it's not a number, a '-', or is too long, delete the entered value
            if (/\D/.test(entered) || entered == "-" || this.value.length == 13) {
                this.value = before;
            }

            //if it's time for a '-' add one for the user
            if (this.value.length == 4 || this.value.length == 8) {
                this.value = before + "-" + entered;
            }
        }
    });

    //validate form
    var form = document.getElementById('contactForm');
    form.addEventListener('submit', function (e) {
        //variables for validation
        var cL;

        //make sure all inputs have values
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        //validate phone
        cL = document.getElementById("badPhone").classList;
        if (numberInput.value.length < 12) {
            e.preventDefault();
            e.stopPropagation();
            cL.add('d-block');
            numberInput.style.border = "1px solid #dc3545";
            numberInput.style.backgroundImage = "url()";
        } else {
            cL.remove('d-block');
            numberInput.removeAttribute('style');
        }

        //validate date
        let travelDate = document.getElementById("travelDate");
        cL = document.getElementById("badDate").classList;
        var dates = travelDate.value.split("-"); //year-mm-dd
        let today = new Date();
        let year = +today.getFullYear();
        let month = +today.getMonth() + 1;
        let day = +today.getDate();
        if (+dates[0] >= year //correct year
            && (+dates[1] >= month && +dates[0] == year) //correct month
            && ((+dates[2] >= day && +dates[1] == month) || (+dates[1] > month)) //correct day
            || (+dates[0] > year)) { //correct if target year is past current year
            cL.remove('d-block');
            travelDate.removeAttribute('style');
        } else {
            e.preventDefault();
            e.stopPropagation();
            cL.add('d-block');
            travelDate.style.border = "1px solid #dc3545";
            travelDate.style.backgroundImage = "url()";
        }

        //valid adult
        cL = document.getElementById("badAdult").classList;
        let a = document.getElementById("adults");
        if (+a.value > 0) {
            cL.remove('d-block');
            a.removeAttribute('style');
        } else {
            e.preventDefault();
            e.stopPropagation();
            cL.add('d-block');
            a.style.border = "1px solid #dc3545";
            a.style.backgroundImage = "url()";
        }

        //validate activities
        let sa = document.getElementById("selectedActivities");
        if (selectedActivities.get(locationString).length > 0) {
            sa.removeAttribute('style');
            sa.style.color = "#28a745";
        } else {
            e.preventDefault();
            e.stopPropagation();
            sa.style.color = "#dc3545";
        }

        //let bootstrap know it's been validated
        form.classList.add('was-validated');
    }, false);

    //clear form
    let clear = document.getElementById("clearForm");
    clear.addEventListener('click', function (e) {
        clearForm();
    });
}


function clearForm() {
    //remove validation
    document.getElementById("contactForm").classList.remove('was-validated');

    //clear values
    document.getElementById('fName').value = "";
    document.getElementById('lName').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('travelDate').value = "";
    document.getElementById('adults').value = "";
    document.getElementById('children').value = "";

    //remove any styles
    document.getElementById("phone").removeAttribute('style');
    document.getElementById("badPhone").classList.remove('d-block');
    document.getElementById("travelDate").removeAttribute('style');
    document.getElementById("badDate").classList.remove('d-block');
    document.getElementById("adults").removeAttribute('style');
    document.getElementById("badAdult").classList.remove('d-block');
    document.getElementById("selectedActivities").removeAttribute('style');

    //reset activities
    selectedActivities = new Map();
    initializeActivities()
    makeCheckBoxes();
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
        input.classList.add("activityBox");
        input.setAttribute("name", "iActivities[]");
        input.value = act;
        input.type = "checkbox";
        input.id = act;

        //create label
        let label = document.createElement("LABEL");
        label.classList.add("form-check-label");
        label.style.color = "#666"
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

    if (selectedActivities.get(locationString) != undefined && selectedActivities.get(locationString).length > 0) {
        list.innerHTML = "You selected these activities: ";
        list.removeAttribute('style');

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
    activityList = activities.get(locationString);
}

function updateActivityList() {
    makeCheckBoxes();
}