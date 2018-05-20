//Variables
var seconds;
var minutes;
var temp; //To ensure multiple 0's dont show up in front of minutes xD
var tempsec; //To ensure multiple '0's dont show up in front of seconds xD
//var tempMinutes; Meant to store value when paused, but minutes or seconds are not reset so this is unnecessary!
//var tempSeconds;
var countdown;
var breakCountdown;
var intervalOnload;
var defaultMinute;
var defaultBreakMinute;
var isDefaultChosen; //Number that stores what default time has been chosen, to check whether one has been selected
var timerCounter = 0;
var breakMinutes = 0;

var workMinutes = 0;
var breakMinutes = 0;

var userGoal;

//Booleans
var timerRunning = false;
var breakTimerRunning = false;
var paused = false;
var customInput = false;
var changedSetting = false;

//Arrays
var DefaultTimes = [25, 5, 52, 17, 90, 20];

function timer() {

    var userGoal = document.getElementById('goalInput').value;

    changedSetting = false;

    document.getElementById("stopbtn").style.display = "none";
    document.getElementById("lightstopbtn").style.display = "block";

    document.getElementById("startbtn").style.display = "none";
    document.getElementById("pausebtn").style.display = "block";

    intervalOnload = setInterval (timerUIUpdate, 10);

    function timerUIUpdate() {
        timerDisplay();
    }

    timerRunning = true;
    timerCounter++;

    if(paused == false){
        
        if(isDefaultChosen == 1 || isDefaultChosen == 2 || isDefaultChosen == 3){
            minutes = defaultMinute;
        }
        else if(customInput == true){
            minutes = workMinutes;
        }
        else{//Just in case, if the timer starts and there is no default setting, default value!
            minutes = 25;
        }
        seconds = 0;
    }

    countdown = setInterval (timerDecrement, 1000);

    function timerDecrement() {

        paused = false;

        if (seconds > 0){
            seconds--;
        }
        else if (minutes > 0){
            minutes--;
            seconds = 59;
        }
        else {
            clearInterval(countdown);
            timerRunning = false;
            breakTime();
        }
    }
}

function breakTime() {

    var userGoal = document.getElementById('goalInput').value;

    changedSetting = false;

    document.getElementById("stopbtn").style.display = "none";
    document.getElementById("lightstopbtn").style.display = "block";

    intervalOnload = setInterval (breakTimerUIUpdate, 10);

    function breakTimerUIUpdate() {
        timerDisplay();
    }

    breakTimerRunning = true;

    breakCountdown = setInterval (breakDecrement, 1000);

    if(paused == false){

        if(isDefaultChosen == 1 || isDefaultChosen == 2 || isDefaultChosen == 3){
            minutes = defaultBreakMinute;
            seconds = 0;
        }
        else if(customInput == true){
            minutes = breakMinutes;
        }
        else {
            minutes = 5; // Or the default value, whichever that is (default, user input, paused values)
            seconds = 0;
        }
        seconds = 0;
    }

    function breakDecrement() {

        paused = false;

        if (seconds > 0){
            seconds--;
        }
        else if (minutes > 0){
            minutes--;
            seconds = 59;
        }
        else{
            clearInterval(breakCountdown);
            breakTimerRunning = false;
            timer();
        }
    }
}

function timerDisplay() {

    document.getElementById('goalInput').innerHTML = userGoal;

    temp = minutes;
    tempsec = seconds;

    if (minutes < 10) {
        temp = "0" + temp;   
    }; //problem: This keeps adding 0's!!!

    if (seconds < 10) {
        tempsec = "0" + tempsec;
    };

    timeOutput = temp + " : " + tempsec;

    document.getElementById("time").innerHTML = timeOutput;
}

function pause(){

    clearInterval(countdown);
    clearInterval(breakCountdown);

    paused = true;

    document.getElementById("stopbtn").style.display = "block";
    document.getElementById("lightstopbtn").style.display = "none";

    document.getElementById("startbtn").style.display = "block";
    document.getElementById("pausebtn").style.display = "none";
}

function reset() {

    document.getElementById('goalInput').innerHTML = "";

    document.getElementById("startbtn").style.display = "block";
    document.getElementById("pausebtn").style.display = "none";

    if (paused == true){

        clearInterval(countdown);
        clearInterval(breakCountdown);

        if(isDefaultChosen == 1 || isDefaultChosen == 2 || isDefaultChosen == 3){
            minutes = defaultMinute;
            seconds = 0;
        }
        else if(customInput == true){
            minutes = workMinutes;
            seconds = 0;
        }
        else {
            minutes = 25; // Or the default value, whichever that is (default, user input, paused values)
            seconds = 00;
        }
    } 
}

function setDefaultOne(){

    changedSetting = true;

    defaultMinute = DefaultTimes[0];
    defaultBreakMinute = DefaultTimes[1];

    isDefaultChosen = 1;
    customInput = false;

    if(timerCounter < 1){
        timer();
        pause();
        reset();
    }
    else{
        pause();
        reset();
    }
}

function setDefaultTwo(){

    changedSetting = true;

    defaultMinute = DefaultTimes[2];
    defaultBreakMinute = DefaultTimes[3];

    isDefaultChosen = 2;
    customInput = false;

    if(timerCounter < 1){
        timer();
        pause();
        reset();
    }
    else{
        pause();
        reset();
    }
}

function setDefaultThree(){

    changedSetting = true;

    defaultMinute = DefaultTimes[4];
    defaultBreakMinute = DefaultTimes[5];

    isDefaultChosen = 3;
    customInput = false;

    if(timerCounter < 1){
        timer();
        pause();
        reset();
    }
    else{
        pause();
        reset();
    }
}

function isInputNumber(){

    changedSetting = true;

    isDefaultChosen = 0; //Ensure default setting isnt set
    customInput = true;

    var minuteTemp = document.getElementById('workTimeInput').value;
    var breakTemp = document.getElementById('breakTimeInput').value;

    if(isNaN(minuteTemp) || isNaN(breakTemp)){
        document.getElementById("alertTime").innerHTML = "Input must be a number!";
    }else{
        document.getElementById("alertTime").innerHTML = ""; //Rids alert
        workMinutes = minuteTemp;
        breakMinutes = breakTemp;
        seconds = 0;
    }

    if(timerCounter < 1){
        timer();
        pause();
        reset();
    }
    else{
        pause();
        reset();
    }
}
