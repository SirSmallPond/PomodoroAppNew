//Problem might be that the onlcik is still firing even with z-index :(( Wasnt the problem.

//Problem:  Also, when leaving to another page and returning, the timer reverts to the timer, rather than
//the breakTimer! This bug is fixed

//Problem is:   when I pause and play in breakTime mode the color animations start firing! FIXED! Turns out the
//css animation-name was still open, so when the display was set to block, the animation started again.

//Problem:     The goal resets when you click the timer on the top right. Problem solved!

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
var breakTimerCounter = 0;
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
var userGoalOpen = false;
var colorIsBlue = true;
var colorIsOrange = false;

var onTimerPage = false; //Initialise boolean to see if current page is the timer page!

var playTimerSound = true;
var playEndTimerSound = true;

var timerAudio = new Audio("audio/timerSound.mp3");
var timerDing = new Audio("audio/timerDing.mp3")


//Arrays
var DefaultTimes = [25, 5, 52, 17, 90, 20];

function timer() {

    timerRunning = true;
    timerCounter++;

    if(colorIsBlue == false && colorIsOrange == true){//If color is not blue, but orange!

        //Animation to change line to blue
            document.getElementById("line").style.animationName = "changeToBlue";
            document.getElementById("line").style.backgroundColor = "#4CB5AB";

            document.getElementById("time").style.animationName = "changeTextToBlue";
            document.getElementById("time").style.color = "#009688";

        orangeToBlue(); //Function that animates the elements transition from orange to blue
        //This should only fire when the break timer is called from the timer

        colorIsBlue = true; //Since the colors are now blue, set this to true!
        colorIsOrange = false; //Colors are blue, so it is not orange
    }
    else{ //If the color IS blue, and ISNT orange, then:
        //Keep line blue, since its already blue!
        document.getElementById("line").style.backgroundColor = "#4CB5AB";
        //Keep time blue, sicne its already blue!
        document.getElementById("time").style.color = "#009688";

        //Makes blue elements stay faded in
        document.getElementById("startbtn").style.opacity = "1";
        document.getElementById("pausebtn").style.opacity = "1";
        document.getElementById("stopbtn").style.opacity = "1";
        document.getElementById("lightstopbtn").style.opacity = "1";

        //Ensure the orange elements stay faded out!
        document.getElementById("orangestartbtn").style.opacity = "0";
        document.getElementById("orangepausebtn").style.opacity = "0";
        document.getElementById("orangestopbtn").style.opacity = "0";
        document.getElementById("orangelightstopbtn").style.opacity = "0";

        colorIsBlue = true; //Since the colors are now blue, set this to true!
        colorIsOrange = false; //Colors are blue, so it is not orange
    }

    //More UI elements switching; but these arent animation based; constant!
        //Display; consitutes when play or pause buttons, etc are available to click!
            //seperate from opacity, which is animated! These are constant!
                document.getElementById("stopbtn").style.display = "none";
                document.getElementById("lightstopbtn").style.display = "block";
                document.getElementById("startbtn").style.display = "none";
                document.getElementById("pausebtn").style.display = "block";

            //For orange elements: These can be the same as blue, since opacity is factored in! Doing this
            //it dont matter if display is on or not, since the element is invisible!
                document.getElementById("orangestopbtn").style.display = "none";
                document.getElementById("orangelightstopbtn").style.display = "block";
                document.getElementById("orangestartbtn").style.display = "none";
                document.getElementById("orangepausebtn").style.display = "block";

        //Animating z index: Whether the buttons are on top of eachother; call the wrong functions!
            document.getElementById("startbtn").style.zIndex = "0";
            document.getElementById("pausebtn").style.zIndex = "0";
            document.getElementById("stopbtn").style.zIndex = "0";
            document.getElementById("lightstopbtn").style.zIndex = "0";

            //z Index of orange elements:
            document.getElementById("orangestartbtn").style.zIndex = "-1";
            document.getElementById("orangepausebtn").style.zIndex = "-1";
            document.getElementById("orangestopbtn").style.zIndex = "-1";
            document.getElementById("orangelightstopbtn").style.zIndex = "-1"; 

            colorIsBlue = true; //Since the colors are now blue, set this to true!
            colorIsOrange = false; //Colors are blue, so it is not orange


    if(paused == true){ //If paused == true; i.e. The timer was paused just before
        document.getElementById("userGoal").innerHTML = userGoal;
    }
    else{ //If paused has not been hit; i.e. when the timer is first started
        userGoal = document.getElementById('goalInput').value;

        document.getElementById("userGoal").innerHTML = userGoal;
    
        document.getElementById("userGoal").style.display = "block";
        document.getElementById("goalInput").style.display = "none";

        //For default time implementation into timer
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

    intervalOnload = setInterval (timerUIUpdate, 10); //Keeps timer updating constantly!

    function timerUIUpdate() {
        timerDisplay();
    }

    paused = false; //Paused set to false!

    countdown = setInterval (timerDecrement, 1000);

    function timerDecrement() { //Function that decrements the timer

        //document.getElementById("testing").innerHTML = "timer!"; Testing; but this broke stuff!

        //document.getElementById("timerFiring").innerHTML = "timer firing/still firing"; //Testing; but this broke stuff!

        if(playTimerSound == true){
            timerAudio.play(); //This is working :))
        }

        if (seconds > 0){
            seconds--;
        }
        else if (minutes > 0){
            minutes--;
            seconds = 59;
        }
        else {

            if(playEndTimerSound == true){
                timerDing.volume = 0.5;
                timerDing.play(); //This is working :))
            }
            clearInterval(countdown);
            timerRunning = false;
            breakTime();
        }
    }
}


function breakTime() {

    breakTimerRunning = true;
    breakTimerCounter++;

    if(colorIsBlue == true && colorIsOrange == false){//If color is blue! NOT orange!

        //Animation to change line to orange
            document.getElementById("line").style.animationName = "changeToOrange";
            document.getElementById("line").style.backgroundColor = "#FF7700";

            document.getElementById("time").style.animationName = "changeTextToOrange";
            document.getElementById("time").style.color = "rgb(224, 122, 54)";

        blueToOrange();

        colorIsBlue = false; //Since the colors are now orange, set this to false!
        colorIsOrange = true; //Since color is now orange, this is true!
    }
    else{ //If color is already orange :))
        //Keep line orange, since its already orange!
        document.getElementById("line").style.backgroundColor = "#FF7700";
        //Keep time orange, sicne its already orange!
        document.getElementById("time").style.color = "rgb(224, 122, 54)";

        //Makes blue elements stay faded out
        document.getElementById("startbtn").style.opacity = "0";
        document.getElementById("pausebtn").style.opacity = "0";
        document.getElementById("stopbtn").style.opacity = "0";
        document.getElementById("lightstopbtn").style.opacity = "0";

        //Ensure the orange elements stay faded in!
        document.getElementById("orangestartbtn").style.opacity = "1";
        document.getElementById("orangepausebtn").style.opacity = "1";
        document.getElementById("orangestopbtn").style.opacity = "1";
        document.getElementById("orangelightstopbtn").style.opacity = "1";

        colorIsBlue = false; //Since the colors are now orange, set this to false!
        colorIsOrange = true; //Since color is now orange, this is true!
    }

    //More UI elements switching; but these arent animation based; constant!
        //Display; consitutes when play or pause buttons, etc are available to click!
            //seperate from opacity, which is animated! These are constant!
                document.getElementById("stopbtn").style.display = "none";
                document.getElementById("lightstopbtn").style.display = "block";
                document.getElementById("startbtn").style.display = "none";
                document.getElementById("pausebtn").style.display = "block";

            //For orange elements: These can be the same as blue, since opacity is factored in! Doing this
            //it dont matter if display is on or not, since the element is invisible!
                document.getElementById("orangestopbtn").style.display = "none";
                document.getElementById("orangelightstopbtn").style.display = "block";
                document.getElementById("orangestartbtn").style.display = "none";
                document.getElementById("orangepausebtn").style.display = "block";

        //Animating z index: Whether the buttons are on top of eachother; call the wrong functions!
            document.getElementById("startbtn").style.zIndex = "-1";
            document.getElementById("pausebtn").style.zIndex = "-1";
            document.getElementById("stopbtn").style.zIndex = "-1";
            document.getElementById("lightstopbtn").style.zIndex = "-1";

            //z Index of orange elements: These are now accessible
            document.getElementById("orangestartbtn").style.zIndex = "0";
            document.getElementById("orangepausebtn").style.zIndex = "0";
            document.getElementById("orangestopbtn").style.zIndex = "0";
            document.getElementById("orangelightstopbtn").style.zIndex = "0"; 


    if(paused == true){ //If paused == true; i.e. The timer was paused just before
        document.getElementById("userGoal").innerHTML = userGoal;
    }
    else{ //If paused has not been hit; i.e. when the timer is first started
        userGoal = document.getElementById('goalInput').value;

        document.getElementById("userGoal").innerHTML = userGoal;
    
        document.getElementById("userGoal").style.display = "block";
        document.getElementById("goalInput").style.display = "none";
    }

    intervalOnload = setInterval (breakTimerUIUpdate, 10); //Updates the timer display constantly

    function breakTimerUIUpdate() {
        timerDisplay();
    }

    breakCountdown = setInterval (breakDecrement, 1000); //counts down every second

    if(paused == false){ //Checks whether a default time has been chosen; implements to timer

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

    function breakDecrement() { //Function that decrements the timer!

        //document.getElementById("testing").innerHTML = "break Timer!";  Testing; but this broke stuff!

        paused = false;

        if(playTimerSound == true){
            timerAudio.play(); //This is working :))
        }

        if (seconds > 0){
            seconds--;
        }
        else if (minutes > 0){
            minutes--;
            seconds = 59;
        }
        else{

            if(playEndTimerSound == true){
                timerDing.volume = 0.5;
                timerDing.play(); //This is working :))
            }
            clearInterval(breakCountdown);
            breakTimerRunning = false;
            timer();
        }
    } 
}


function timerDisplay() { //The function that constantly updates the UI time display

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


function pause(){ //The function called when pause UI element is clicked!

    timerRunning = false;
    breakTimerRunning = false;
    paused = true;
    
    clearInterval(countdown); //Clears both the countdown for normal timer and break timer
    clearInterval(breakCountdown);

    //When pause is fired from any function the pause and stop buttons are brought into UI
    //Nothing is changed here except what UI elements are visible; no colour changes, opacity changes, animations.

    if(colorIsBlue == true && colorIsOrange == false){
        document.getElementById("stopbtn").style.display = "block";
        document.getElementById("lightstopbtn").style.display = "none";
        document.getElementById("startbtn").style.display = "block";
        document.getElementById("pausebtn").style.display = "none";

        document.getElementById("stopbtn").style.animationName = "";
        document.getElementById("lightstopbtn").style.animationName = "";
        document.getElementById("startbtn").style.animationName = "";
        document.getElementById("pausebtn").style.animationName = "";
    }
    else{
        document.getElementById("orangestopbtn").style.display = "block";
        document.getElementById("orangelightstopbtn").style.display = "none";
        document.getElementById("orangestartbtn").style.display = "block";
        document.getElementById("orangepausebtn").style.display = "none";

        document.getElementById("orangestopbtn").style.animationName = "";
        document.getElementById("orangelightstopbtn").style.animationName = "";
        document.getElementById("orangestartbtn").style.animationName = "";
        document.getElementById("orangepausebtn").style.animationName = "";
    }
}


function reset() { //A full reset of all processes! Makes timer fresh again!

    //Colour Animations
    document.getElementById("line").style.backgroundColor = "#4CB5AB"; //On reset revert to blue color

    document.getElementById("time").style.color = "#009688"; //Revert time color to blue

    //Revert opacity! Only blue visible! No orange!
        document.getElementById("startbtn").style.opacity = "1";
        document.getElementById("pausebtn").style.opacity = "1";
        document.getElementById("stopbtn").style.opacity = "1";
        document.getElementById("lightstopbtn").style.opacity = "1";

        document.getElementById("orangestartbtn").style.opacity = "0";
        document.getElementById("orangepausebtn").style.opacity = "0";
        document.getElementById("orangestopbtn").style.opacity = "0";
        document.getElementById("orangelightstopbtn").style.opacity = "0";

    //Change z-index of elements back to original! Blue on top of orange elements!
        document.getElementById("startbtn").style.zIndex = "0";
        document.getElementById("pausebtn").style.zIndex = "0";
        document.getElementById("stopbtn").style.zIndex = "0";
        document.getElementById("lightstopbtn").style.zIndex = "0";

        document.getElementById("orangestartbtn").style.zIndex = "-1";
        document.getElementById("orangepausebtn").style.zIndex = "-1";
        document.getElementById("orangestopbtn").style.zIndex = "-1";
        document.getElementById("orangelightstopbtn").style.zIndex = "-1";

    //Display changes for UI elements visible:
        document.getElementById("startbtn").style.display = "block";
        document.getElementById("pausebtn").style.display = "none";

        document.getElementById("startbtn").style.animationName = "";
        document.getElementById("pausebtn").style.animationName = "";
    
        //For orange elements; same as blue
        document.getElementById("orangestartbtn").style.display = "block";
        document.getElementById("orangepausebtn").style.display = "none";

        document.getElementById("orangestartbtn").style.animationName = "";
        document.getElementById("orangepausebtn").style.animationName = "";

    colorIsBlue = true; //Sets color to blue, so changes this as well; bug fix :P
    colorIsOrange = false; //Sets color to blue/initial state, so orange goes awayyy


    document.getElementById('goalInput').value = ""; //Resets text input field
    document.getElementById("userGoal").innerHTML = ""; //Resets userGoal text

    document.getElementById("userGoal").style.display = "none"; //Hides userGoal text
    document.getElementById("goalInput").style.display = "initial"; //Displays input area :))


    if (paused == true){ //Can only be called when paused == true, so duh xD

        clearInterval(countdown); //Clears all current timers again just in case (done in pause already)
        clearInterval(breakCountdown);

        //Sets work minutes to the chosen value :)) Whether default or custom
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
    paused = false; //Sets paused back to initial state after a reset : A bug in some functions 
    //This means that although it looks like paused is true, the function is yet to be called so
    //the initial state is re-initialised
}


function setDefaultOne(){ //If user chose the first default option, then:

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

function setDefaultTwo(){ //If the user chose the second default option, then:

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

function setDefaultThree(){ //If the user chose the third default option, then:

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

function isInputNumber(){ //If user chose a custom input, then:

    changedSetting = true;

    isDefaultChosen = 0; //Ensure default setting isnt set
    customInput = true;

    var minuteTemp = document.getElementById('workTimeInput').value;
    var breakTemp = document.getElementById('breakTimeInput').value;

    if(isNaN(minuteTemp) || isNaN(breakTemp)){
        document.getElementById("applyContent").style.height = "12em";
        document.getElementById("alertTime").innerHTML = "*Error* Input must be a number!";
        document.getElementById("settingsContentBG").style.height = "47em";
    }else{
        document.getElementById("applyContent").style.height = "10em";
        document.getElementById("settingsContentBG").style.height = "45em";
        document.getElementById("alertTime").innerHTML = ""; //Rids alert
        
        var minuteUp = Math.ceil(minuteTemp); //round up the user input
        var breakUp = Math.ceil(breakTemp); //round up user input

        if(minuteUp < 1){ //If they didnt choose a value, then this will become at least 1
            minuteUp++;
        }
        if(breakUp < 1){ //If they didnt choose a value, then this will become at least 1
            breakUp++;
        }

        if(minuteUp > 120){ //Errors for length of time you can work!
            document.getElementById("applyContent").style.height = "13em";
            document.getElementById("alertTime").innerHTML = "*Error* Working over 120 minutes can limit productivity! Please choose something lower!";
            document.getElementById("settingsContentBG").style.height = "48em";
            return;
        }
        if(breakUp > 30){
            document.getElementById("applyContent").style.height = "13em";
            document.getElementById("alertTime").innerHTML = "*Error* Taking breaks for over 30 minutes can make it harder to return to work! Please choose something lower!";
            document.getElementById("settingsContentBG").style.height = "48em";
            return;
        }

        if(breakUp >= minuteUp && breakUp > 0){
            document.getElementById("applyContent").style.height = "15em";
            document.getElementById("alertTime").innerHTML = 'It is recommended to have greater work over break time for maximum productivity! </br> If you still wish to continue, return to the timer page.';
            document.getElementById("settingsContentBG").style.height = "50em";
        }
        
        workMinutes = minuteUp; //Set the work and break minutes to the chosen values!
        breakMinutes = breakUp;
        seconds = 0;
    }

    if(timerCounter < 1){ //If the timer has not run once already; i.e., the display updater is not yet running:
        timer();
        pause();
        reset();
    }
    else{
        pause();
        reset();
    }
}



function orangeToBlue() {

    //The animation to change the colors of elements when timer initialised.
        //Make blue elements fade in
        document.getElementById("startbtn").style.animationName = "opacityToFull"; 
        document.getElementById("pausebtn").style.animationName = "opacityToFull";
        document.getElementById("stopbtn").style.animationName = "opacityToFull";
        document.getElementById("lightstopbtn").style.animationName = "opacityToFull";
    //Makes blue elements stay faded in
        document.getElementById("startbtn").style.opacity = "1";
        document.getElementById("pausebtn").style.opacity = "1";
        document.getElementById("stopbtn").style.opacity = "1";
        document.getElementById("lightstopbtn").style.opacity = "1";


    //Make orange elements fade out!
        document.getElementById("orangestartbtn").style.animationName = "opacityToZero";
        document.getElementById("orangepausebtn").style.animationName = "opacityToZero";
        document.getElementById("orangestopbtn").style.animationName = "opacityToZero";
        document.getElementById("orangelightstopbtn").style.animationName = "opacityToZero";
    //Ensure the orange elements stay faded out!
        document.getElementById("orangestartbtn").style.opacity = "0";
        document.getElementById("orangepausebtn").style.opacity = "0";
        document.getElementById("orangestopbtn").style.opacity = "0";
        document.getElementById("orangelightstopbtn").style.opacity = "0";

}

function blueToOrange() {

    //The animation to change the colors of elements when timer initialised.
        //Make blue elements fade out
        document.getElementById("startbtn").style.animationName = "opacityToZero"; 
        document.getElementById("pausebtn").style.animationName = "opacityToZero";
        document.getElementById("stopbtn").style.animationName = "opacityToZero";
        document.getElementById("lightstopbtn").style.animationName = "opacityToZero";
    //Makes blue elements stay faded out
        document.getElementById("startbtn").style.opacity = "0";
        document.getElementById("pausebtn").style.opacity = "0";
        document.getElementById("stopbtn").style.opacity = "0";
        document.getElementById("lightstopbtn").style.opacity = "0";


    //Make orange elements fade in!
        document.getElementById("orangestartbtn").style.animationName = "opacityToFull";
        document.getElementById("orangepausebtn").style.animationName = "opacityToFull";
        document.getElementById("orangestopbtn").style.animationName = "opacityToFull";
        document.getElementById("orangelightstopbtn").style.animationName = "opacityToFull";
    //Ensure the orange elements stay faded in!
        document.getElementById("orangestartbtn").style.opacity = "1";
        document.getElementById("orangepausebtn").style.opacity = "1";
        document.getElementById("orangestopbtn").style.opacity = "1";
        document.getElementById("orangelightstopbtn").style.opacity = "1";
}


function timerSounds(){

    if(document.getElementById("timerSound").checked == true){
        playTimerSound = true;
    }
    else{
        playTimerSound = false;
    }

    if(document.getElementById("timerAlarmSound").checked == true){
        playEndTimerSound = true;
    }
    else{
        playEndTimerSound = false;
    }

}