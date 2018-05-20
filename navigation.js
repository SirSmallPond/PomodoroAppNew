
/* Returns user to Timer page */
    function returnTimer() {
        window.location.href="#/!";
        closeNav();
        closeTransText();

        if(changedSetting == true){
            timer(); //These functins exist in a different js document! By doing this, they can still call from any page
                 //i.e., from settings to the timer. 
                 //PROBLEM: Now if you accidentally hit the timer UI icon it resets the timer :/
            pause();
            reset();
        }
        else if (paused == false){ //Rid of bug that causes play button to appear when already running. nav bug.
            document.getElementById("startbtn").style.display = "none";
            document.getElementById("pausebtn").style.display = "block";
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
        window.location.href="#!settings";
        closeNav();
        closeTransText();
    }

    function openHelp() {
        window.location.href="#!help";
        closeNav();
        closeTransText();
    }


    function openStudyTime() {
        window.location.href="#!studyTime";
        closeNav();
        closeStudyNav();
        closeTransText();
        closeStudyTransText();
    }

    function openBreakTime() {
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
        ngHeight30();
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