/* Functions bound to Navigation Bar Items */  
    /*Returns user to Timer page */
    function returnTimer() {
        window.location.href="#/!";
        closeNav();
        closeTransText();
    }

    /* Open when someone clicks on the span element */
    function openNav() {
        document.getElementById("myNav").style.width = "88%";
        transText();
    }

    function openStudyNav() {
        document.getElementById("mySideStudynav").style.width = "88%";
        transStudyText();
        closeTransText();
    }



/* Functions bound for Menu Item Page Opening */

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


/* Functions bound to Navigation Menu */
    function closeNav() {
        document.getElementById("myNav").style.width = "0%";
        closeTransText();
    }

    function closeStudyNav() {
        document.getElementById("mySideStudynav").style.width = "0%";
        closeStudyTransText();
        transText();
    }



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