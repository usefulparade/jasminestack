let danceDiv, aboutDiv, videoDiv, danceContent, aboutContent, videoContent;
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
    danceDiv = window.parent.document.getElementById("dance");
    aboutDiv = window.parent.document.getElementById("about");
    videoDiv = window.parent.document.getElementById("video");
    
    danceFocused = false;
    aboutFocused = false;
    videoFocused = false;

    // danceDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
    // aboutDiv.style.height = centerHeight + "px";
    // videoDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";


}

function pageInit(){
    danceDiv = document.getElementById("dance");
    aboutDiv = document.getElementById("about");
    videoDiv = document.getElementById("video");

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

        for (var i = 0;i<3;i++){
            window.parent.frames[i].hideContent();
        }
        danceFocused = false;
    } else {
        danceDiv.style.height = "calc(100vh - " + (centerHeight+10) + "px)";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "0vh";

        window.parent.frames[0].showContent();
        window.parent.frames[1].hideContent();
        window.parent.frames[2].hideContent();
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
        
        for (var i = 0;i<3;i++){
            window.parent.frames[i].hideContent();
        }
        aboutFocused = false;
    } else {
        danceDiv.style.height = centerHeight + "px";
        aboutDiv.style.height = "calc(100vh - " + centerHeight * 2 + "px)";
        videoDiv.style.height = "100px";

        window.parent.frames[1].showContent();
        window.parent.frames[0].hideContent();
        window.parent.frames[2].hideContent();
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
        for (var i = 0;i<3;i++){
            window.parent.frames[i].hideContent();
        }
        videoFocused = false;
    } else {
        danceDiv.style.height = "0vh";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "calc(100vh - " + (centerHeight+10) + "px)";
        window.parent.frames[2].showContent();
        window.parent.frames[0].hideContent();
        window.parent.frames[1].hideContent();
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

function showContent(){
    var content = document.getElementById("content");
    if (content != null){
        content.style.opacity = "1";
    }
}

function hideContent(){
    var content = document.getElementById("content");
    if (content != null){
        content.style.opacity = "0";
    }
}