 //Opens and Closes Basic Navigation

    /* Set the width of the standard navigation bar to 250px */
    function openMainNav() { //Triggered when icon is clicked
        document.getElementById("mySidenav").style.width = "350px";
            //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
  
    /* Set the width of the standard navigation bar to 0 */
    function closeMainNav() {
        document.getElementById("mySidenav").style.width = "0";
        //document.body.style.backgroundColor = "white";
    }


 //Opens and Closes Study Tips Navigation

    /* Set the width of the side navigation to 250px */
    function openStudyNav() { //Triggered when icon is clicked
        document.getElementById("mySideStudynav").style.width = "350px";
            //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
  
    /* Set the width of the side navigation to 0 */
    function closeStudyNav() {
        document.getElementById("mySideStudynav").style.width = "0";
        //document.body.style.backgroundColor = "white";
    }


    function returnTimer() {
        window.location.href="../html/timerPage.html";
    }

/* Returns user to Timer Page 
    function returnTimer() {
        if(window.location.pathname === './timerPage.html'){
            document.write('ThisIsTimerPage')
        } else{
            window.location.href="timerPage.html";
        }
    } */


/* Sends User to Settings Page */
function openSettings () {
    window.location.href='../html/settingsPage.html';
}

function openHelp() {
    window.location.href="../html/helpPage.html";
}

function openStudyTime() {
    window.location.href="../html/studyTimePage.html";
}

function openBreakTime() {
    window.location.href="../html/breakTimePage.html";
}