var isThemeDark = false;

function timerSettingsUIUpdate() {

    updateTimeSettings = setInterval (timerSettingsUpdate, 10);
}

function timerSettingsUpdate(){

    var d1 = document.getElementById("defaultOne").checked;
    var d2 = document.getElementById("defaultTwo").checked;
    var d3 = document.getElementById("defaultThree").checked;
    var c = document.getElementById("customRadio").checked;

    if(d1 == true || d2 == true || d3 == true){

        //Clears the warning area :P
        document.getElementById("applyContent").style.height = "10em";
        document.getElementById("alertTime").innerHTML = "";
        document.getElementById("settingsContentBG").style.height = "45em";

        document.getElementById("workTimeInput").disabled = true;
        document.getElementById("breakTimeInput").disabled = true;

        document.getElementById("workTimeInput").value = "";
        document.getElementById("breakTimeInput").value = "";

        if(isThemeDark == true){


            document.getElementById("workTimeInput").style.backgroundColor = "#2c2c2c";
            document.getElementById("breakTimeInput").style.backgroundColor = "#2c2c2c";
            document.getElementById("workTimeInput").style.borderColor = "#2c2c2c";
            document.getElementById("breakTimeInput").style.borderColor = "#2c2c2c";
        }
        else{

            document.getElementById("workTimeInput").style.backgroundColor = "#EFEFEF";
            document.getElementById("breakTimeInput").style.backgroundColor = "#EFEFEF";
            document.getElementById("workTimeInput").style.borderColor = "#EFEFEF";
            document.getElementById("breakTimeInput").style.borderColor = "#EFEFEF";
        }
    }
    if(c == true){

        if(isThemeDark == true){

            document.getElementById("workTimeInput").disabled = false;
            document.getElementById("breakTimeInput").disabled = false;
    
            //Change below colors to make it nightshifty plz
            document.getElementById("workTimeInput").style.backgroundColor = "#1f1f1f";
            document.getElementById("breakTimeInput").style.backgroundColor = "#1f1f1f";
            document.getElementById("workTimeInput").style.borderColor = "#1f1f1f";
            document.getElementById("breakTimeInput").style.borderColor = "#1f1f1f";
        }
        else{

            document.getElementById("workTimeInput").disabled = false;
            document.getElementById("breakTimeInput").disabled = false;

            document.getElementById("workTimeInput").style.backgroundColor = "white";
            document.getElementById("breakTimeInput").style.backgroundColor = "white";
            document.getElementById("workTimeInput").style.borderColor = "white";
            document.getElementById("breakTimeInput").style.borderColor = "white";
        }
    }
}


function darkTheme() { //This is now firing :D

    var dark = document.getElementById("darkTheme").checked;

    if(dark == true){

        isThemeDark = true;

        /*Universal*/
        document.getElementById("backgroundMain").style.backgroundColor = "#313131"; /*Main BG change */
        document.getElementById("navBar").style.backgroundColor = "#313131"; /*Header NavBar */

        /*The timer Page on navigation.js*/

        /*For settings page */
        document.getElementById("settingsTitle").style.color = "#D5D5D5"; /*Header NavBar */
        document.getElementById("settingsContentBG").style.backgroundColor = "#454545"; /*Main BG change */
        document.getElementById("settingsContent").style.backgroundColor = "#454545"; /*Main BG change */
        document.getElementById("radioButtons").style.color = "#454545"; /*Header NavBar */
        /*document.getElementsByClassName("checkmark").style.backgroundColor = "#454545"; /*Main BG change */
        document.getElementById("timerSounds").style.color = "#C5C5C5"; /*Header NavBar */
        document.getElementById("timerAlarm").style.color = "#C5C5C5"; /*Header NavBar */
        document.getElementById("darkThemeText").style.color = "#C5C5C5"; /*Header NavBar */
            
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
    else{
        isThemeDark = false;

        document.getElementById("backgroundMain").style.backgroundColor = "white"; /*Main BG change */
        document.getElementById("navBar").style.backgroundColor = "white"; /*Header NavBar */

        document.getElementById("settingsTitle").style.color = "#525252"; /*Header NavBar */
        document.getElementById("settingsContentBG").style.backgroundColor = "#E0E0E0"; /*Main BG change */
        document.getElementById("settingsContent").style.backgroundColor = "#E0E0E0"; /*Main BG change */
        document.getElementById("radioButtons").style.color = "#E0E0E0"; /*Header NavBar */

        document.getElementById("timerSounds").style.color = "#535353"; /*Header NavBar */
        document.getElementById("timerAlarm").style.color = "#535353"; /*Header NavBar */
        document.getElementById("darkThemeText").style.color = "#535353"; /*Header NavBar */

        /*Replace dark mode images with normal images */
        document.getElementById("workingStyleSubHeadingImage").style.display = "initial"; 
        document.getElementById("workingStyleSubHeadingImageDark").style.display = "none"; 

        document.getElementById("audioSubHeadingImage").style.display = "initial"; 
        document.getElementById("audioSubHeadingImageDark").style.display = "none"; 

        document.getElementById("visualsSubHeadingImage").style.display = "initial"; 
        document.getElementById("visualsSubHeadingImageDark").style.display = "none";

        document.getElementById("defaultSettingsImage").style.display = "initial"; 
        document.getElementById("defaultSettingsImageDark").style.display = "none";

        document.getElementById("customSettingImage").style.display = "initial"; 
        document.getElementById("customSettingImageDark").style.display = "none";
    }
}

function apply() {

    darkTheme();
    timerSounds();

    var d1 = document.getElementById("defaultOne").checked;
    var d2 = document.getElementById("defaultTwo").checked;
    var d3 = document.getElementById("defaultThree").checked;
    var c = document.getElementById("customRadio").checked;

    if(d1 == true || d2 == true || d3 == true){

        //Blur out the custom input area

        if(d1 == true){
            setDefaultOne();
        }
        if(d2 == true){
            setDefaultTwo();
        }
        if(d3 == true){
            setDefaultThree();
        }
    }

    if(c == true){

        //Blur in the custom input area

        isInputNumber();
    }
}