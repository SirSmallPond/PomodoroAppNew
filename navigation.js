/* Returns user to Timer page */
    function returnTimer() { //This is only triggered when the timer icon is clicked?


    //Problem with this method is that the timer no longer runs when off timer page..

    //It has nothing to do with the onTimerPage == true; if statements :// So it must be in the main
    //code...

    //It has nothing to do with the code in this function in general! With just window.location.href="" and
    //other things, the timer still stop!! Why?? Do functions not work when other pages are open??

    //The problem is that timer(); no longer works unless the timer page is open

    //Problem Solved! It was that I was trying to access HTML elements that were only available in the timer page!
    //Thats why it only worked on that page! For the future, make sure to delete 'testing' elements unless
    //they are universal.

    clearInterval(updateTimeSettings);

        //disable the button - original fix plan ://
        if(onTimerPage == true){ 
            //document.getElementById("testing").innerHTML = "Already on Timer page!!"; 
        }

        if(onTimerPage == false){ //When you leave and return with timer on, onTimerPage is still true; problem!  Fixed

            window.location.href="#/!"; //This should only fire when not on timer page really :))
            closeNav();
            closeTransText();

            if(changedSetting == true){

                if(timerRunning == true){
                    timer(); //These functins exist in a different js document! By doing this, they can still call from any page
                     //i.e., from settings to the timer. 
                }
                pause();
                reset();
                changedSetting = false;
            }
    
            //BUG: when leaving and returning from break timer, the timer reverts to work timer.
            if (paused == false && timerRunning == true && changedSetting == false){ //Rid of bug that causes play button to appear when already running. nav bug.
                pause();
                timer();
                
                document.getElementById("startbtn").style.display = "none";
                document.getElementById("pausebtn").style.display = "block";
    
                document.getElementById("orangestartbtn").style.display = "none";
                document.getElementById("orangepausebtn").style.display = "block";
    
                //document.getElementById("testingBreak").innerHTML = "TIMER - paused == false function fired";
                changedSetting = false;
            }
            if (paused == true && colorIsBlue == true && timerRunning == false && changedSetting == false){
                timer();
                pause();
                
                //document.getElementById("testingBreak").innerHTML = "TIMER - paused == true function fired";
                changedSetting = false;
            }
    
    
            if (paused == false && breakTimerRunning == true && changedSetting == false){
    
                //when you click the timer in the top right in break mode, it changes colors to blue?? Whattt?
                //Rather; it changes the timer back to the default page, with the timer still running!?? The text
                //gets set back to 'test'! This only happens when it is clicked multiple times, however ://
                //Possible fix: Since if current page == something is not viable, I could disable ability to click
                //the timer icon for 2 seconds after click or something...
                pause();
                breakTime(); //This doesnt fix it :((
    
                document.getElementById("startbtn").style.display = "none"; //Display style for norm buttons
                document.getElementById("pausebtn").style.display = "block";
    
                document.getElementById("orangestartbtn").style.display = "none"; //Display style for orange buttons
                document.getElementById("orangepausebtn").style.display = "block";
    
                //document.getElementById("testingBreak").innerHTML = "paused == false function fired";
                changedSetting = false;
            }
            if (paused == true && colorIsBlue == false && breakTimerRunning == false && changedSetting == false){
                breakTime();
                pause();
                
                //document.getElementById("testingBreak").innerHTML = "paused == true function fired";
                changedSetting = false;
            }
            onTimerPage = true; //Sets current page to timer page :D

            if (timerRunning == true || breakTimerRunning == true || paused == true){
                //This next part is for the userGoal display; since that resets too :(
                document.getElementById("userGoal").innerHTML = userGoal;
                document.getElementById("userGoal").style.display = "block";
                document.getElementById("goalInput").style.display = "none";
            }
        }
        //Set time out for 2 seconds, re-enable button

        if(isThemeDark == true){

            /*Problem was that the content hadent been loaded yet :// */
            document.getElementById("greyCircle").style.opacity = "0.25"; /*image opacity NavBar WORKING */
            document.getElementById("goalInput").style.backgroundColor = "#313131"; /*goalInput Area WORKING*/
        }
    }

        

/* Functions bound to OPENING Side Menu navigation (both Main and Study) */
    function openNav() {
        document.getElementById("myNav").style.width = "88%";
        transText();
    }

    function openStudyNav() {
        document.getElementById("mySideStudynav").style.width = "88%";
        transStudyText();
        closeTransText();
    }


/* Functions bound to CLOSING Side Menu navigation (both Main and Study) */
    function closeNav() {
        document.getElementById("myNav").style.width = "0%";
        closeTransText();
    }

    function closeStudyNav() {
        document.getElementById("mySideStudynav").style.width = "0%";
        closeStudyTransText();
        transText();
    }



/* Functions bound for Menu Item Page Opening (both Main and Study Menu Items) */

    function openSettings() {
        onTimerPage = false;
        window.location.href="#!settings";
        closeNav();
        closeTransText();
        timerSettingsUIUpdate();

        if(isThemeDark == true){

            /*Need it here as well as in settings.js, so that when we reload page dark css is still viewable*/
            document.getElementById("settingsTitle").style.color = "#D5D5D5"; /*Header NavBar */
            document.getElementById("settingsContentBG").style.backgroundColor = "#454545"; /*Main BG change */
            document.getElementById("settingsContent").style.backgroundColor = "#454545"; /*Main BG change */
            document.getElementById("radioButtons").style.color = "#454545"; /*Header NavBar */

            document.getElementById("timerSounds").style.color = "#C5C5C5"; /*Header NavBar */
            document.getElementById("timerAlarm").style.color = "#C5C5C5"; /*Header NavBar */
            document.getElementById("darkThemeText").style.color = "#C5C5C5"; /*Header NavBar */

            document.getElementById("darkTheme").checked = true; /*Changes dark theme setting back to user setting */

            /*Replace normal images with dark mode images */
            document.getElementById("workingStyleSubHeadingImage").style.display = "none"; 
            document.getElementById("workingStyleSubHeadingImageDark").style.display = "initial"; 

            document.getElementById("audioSubHeadingImage").style.display = "none"; 
            document.getElementById("audioSubHeadingImageDark").style.display = "initial"; 

            document.getElementById("visualsSubHeadingImage").style.display = "none"; 
            document.getElementById("visualsSubHeadingImageDark").style.display = "initial";

            document.getElementById("defaultSettingsImage").style.display = "none"; 
            document.getElementById("defaultSettingsImageDark").style.display = "initial";

            document.getElementById("customSettingImage").style.display = "none"; 
            document.getElementById("customSettingImageDark").style.display = "initial";
        } 
        /*Doesnt require an else statement since it resets to default anyways */

        if(playTimerSound == false){
            document.getElementById("timerSound").checked = false;
        }
        if(playEndTimerSound == false){
            document.getElementById("timerAlarmSound").checked = false;
        }
    }

    function openHelp() {
        onTimerPage = false;
        window.location.href="#!help";
        closeNav();
        closeTransText();

        /*if(timerRunning == true){
            document.getElementById("timerFiring").innerHTML = "TestTimer"; //If this does not revert, then the timer
            //has stopped firing.. This doesnt revert... The timer stops before I get to the next page..
        } */
    }


    function openStudyTime() {
        onTimerPage = false;
        window.location.href="#!studyTime";
        closeNav();
        closeStudyNav();
        closeTransText();
        closeStudyTransText();
    }

    function openBreakTime() {
        onTimerPage = false;
        window.location.href="#!breakTime";
        closeNav();
        closeStudyNav();
        closeTransText();
        closeStudyTransText();
    }





/* Functions for Text Opacity in Menu Items */
    function transText() {
        document.getElementById("menuText").style.opacity = "1";
        document.getElementById("menuText2").style.opacity = "1";
        document.getElementById("menuText3").style.opacity = "1";
    }

    function closeTransText() {
        document.getElementById("menuText").style.opacity = "0";
        document.getElementById("menuText2").style.opacity = "0";
        document.getElementById("menuText3").style.opacity = "0";
    }

    function transStudyText() {
        document.getElementById("menuStudyText1").style.opacity = "1";
        document.getElementById("menuStudyText2").style.opacity = "1";
        document.getElementById("menuStudyText3").style.opacity = "1";
    }

    function closeStudyTransText() {
        document.getElementById("menuStudyText1").style.opacity = "0";
        document.getElementById("menuStudyText2").style.opacity = "0";
        document.getElementById("menuStudyText3").style.opacity = "0";
    }


/* Functions for changing ng-window size (angular) based on the page */

    var ngStyles = document.getElementById("ng-window");

    function ngHeight20 () {

            ngStyles.style.height = "20em";   
    }

    function ngHeight30 () {
            ngStyles.style.height = "30em";
    }

    function ngHeight60 () {
            ngStyles.style.height = "60em";
    }


/* Functions to fire functions for ng-height and page loading */

    function loadTimerPage () {
        ngHeight20();
        returnTimer();
    }

    function loadSettingsPage () {
        ngStyles.style.height = "50em";
        openSettings();
    }

    function loadHelpPage () {
        ngHeight30();
        openHelp();
    }

    /* Functionception for Study and Break Time Pages */

    function loadStudyTimePage () {
        ngHeight60();
        openStudyTime();
    }

    function loadBreakTimePage () {
        ngHeight60();
        openBreakTime();
    }