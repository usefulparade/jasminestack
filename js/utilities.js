let danceDiv, aboutDiv, videoDiv;
let danceFocused, aboutFocused, videoFocused;
let centerHeight;

function setup(){
    noCanvas();
    if (windowWidth >= 720){
        centerHeight = 100;
    } else {
        centerHeight = 75;
    }
    
}

function utilitiesInit(){
    danceDiv = parent.document.getElementById("dance");
    aboutDiv = parent.document.getElementById("about");
    videoDiv = parent.document.getElementById("video");
    
    danceFocused = false;
    aboutFocused = false;
    videoFocused = false;

    danceDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
    aboutDiv.style.height = centerHeight + "px";
    videoDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
}

function sporesExpand(){
    if (windowWidth >= 720){
        centerHeight = 100;
    } else {
        centerHeight = 75;
    }

    if (danceFocused){
        danceDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        danceFocused = false;
    } else {
        danceDiv.style.height = "calc(100vh - " + centerHeight + "px)";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "0vh";
        danceFocused = true;
        aboutFocused = false;
        videoFocused = false;
    }
}

function foragerExpand(){
    if (windowWidth >= 720){
        centerHeight = 100;
    } else {
        centerHeight = 75;
    }

    if (aboutFocused){
        danceDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        aboutFocused = false;
    } else {
        danceDiv.style.height = centerHeight + "px";
        aboutDiv.style.height = "calc(100vh - " + centerHeight * 2 + "px)";
        videoDiv.style.height = "100px";
        aboutFocused = true;
        danceFocused = false;
        videoFocused = false;
    }
    
}

function myceliumExpand(){
    if (windowWidth >= 720){
        centerHeight = 100;
    } else {
        centerHeight = 75;
    }

    if (videoFocused){
        danceDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        videoFocused = false;
    } else {
        danceDiv.style.height = "0vh";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "calc(100vh - " + centerHeight + "px)";
        videoFocused = true;
        danceFocused = false;
        aboutFocused = false;
    }
}

function windowResized(){
    if (windowWidth >= 720){
        centerHeight = 100;
    } else {
        centerHeight = 75;
    }

    if (danceFocused){
        danceDiv.style.height = "calc(100vh - " + centerHeight + "px)";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "0vh";
    } else if (aboutFocused){
        danceDiv.style.height = centerHeight + "px";
        aboutDiv.style.height = "calc(100vh - " + centerHeight * 2 + "px)";
        videoDiv.style.height = "100px";
    } else if (videoFocused){
        danceDiv.style.height = "0vh";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "calc(100vh - " + centerHeight + "px)";
    } else {
        danceDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
    }
}