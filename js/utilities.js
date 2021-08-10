let danceDiv, aboutDiv, videoDiv, danceContent, aboutContent, videoContent;
let danceFocused, aboutFocused, videoFocused;
let centerHeight;

function setup(){
    noCanvas();
    if (windowWidth >= 800){
        centerHeight = 100;
    } else {
        centerHeight = 75;
    }
    
}

function utilitiesInit(){
    danceDiv = window.parent.document.getElementById("dance");
    aboutDiv = window.parent.document.getElementById("about");
    videoDiv = window.parent.document.getElementById("video");
    
    window.parent.danceFocused = false;
    window.parent.aboutFocused = false;
    window.parent.videoFocused = false;

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

    if (window.parent.danceFocused){
        danceDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";

        for (var i = 0;i<3;i++){
            window.parent.frames[i].hideContent();
        }
        window.parent.danceFocused = false;
    } else {
        danceDiv.style.height = "calc(100vh - " + (centerHeight+10) + "px)";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "0vh";

        window.parent.frames[0].showContent();
        window.parent.frames[1].hideContent();
        window.parent.frames[2].hideContent();

        window.parent.danceFocused = true;
        window.parent.aboutFocused = false;
        window.parent.videoFocused = false;
    }
}

function foragerExpand(){
    if (windowWidth >= 720){
        centerHeight = 100;
    } else {
        centerHeight = 75;
    }

    if (window.parent.aboutFocused){
        danceDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        
        for (var i = 0;i<3;i++){
            window.parent.frames[i].hideContent();
        }
        window.parent.aboutFocused = false;
    } else {
        danceDiv.style.height = centerHeight + "px";
        aboutDiv.style.height = "calc(100vh - " + centerHeight * 2 + "px)";
        videoDiv.style.height = "100px";

        window.parent.frames[1].showContent();
        window.parent.frames[0].hideContent();
        window.parent.frames[2].hideContent();

        window.parent.aboutFocused = true;
        window.parent.danceFocused = false;
        window.parent.videoFocused = false;
    }
    
}

function myceliumExpand(){
    if (windowWidth >= 720){
        centerHeight = 100;
    } else {
        centerHeight = 75;
    }

    if (window.parent.videoFocused){
        danceDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        for (var i = 0;i<3;i++){
            window.parent.frames[i].hideContent();
        }
        window.parent.videoFocused = false;
    } else {
        danceDiv.style.height = "0vh";
        aboutDiv.style.height = centerHeight + "px";
        videoDiv.style.height = "calc(100vh - " + (centerHeight+10) + "px)";
        window.parent.frames[2].showContent();
        window.parent.frames[0].hideContent();
        window.parent.frames[1].hideContent();
        window.parent.videoFocused = true;
        window.parent.danceFocused = false;
        window.parent.aboutFocused = false;
    }
}

function windowResized(){
    if (windowWidth >= 800){
        centerHeight = 100;
    } else {
        centerHeight = 75;
    }

    if (window.parent.danceFocused){
        window.parent.danceDiv.style.height = "calc(100vh - " + centerHeight + "px)";
        window.parent.aboutDiv.style.height = centerHeight + "px";
        window.parent.videoDiv.style.height = "0vh";
    } else if (window.parent.aboutFocused){
        window.parent.danceDiv.style.height = centerHeight + "px";
        window.parent.aboutDiv.style.height = "calc(100vh - " + centerHeight * 2 + "px)";
        window.parent.videoDiv.style.height = "100px";
    } else if (window.parent.videoFocused){
        window.parent.danceDiv.style.height = "0vh";
        window.parent.aboutDiv.style.height = centerHeight + "px";
        window.parent.videoDiv.style.height = "calc(100vh - " + centerHeight + "px)";
    } else {
        window.parent.danceDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
        window.parent.aboutDiv.style.height = centerHeight + "px";
        window.parent.videoDiv.style.height = "calc((100vh - " + centerHeight + "px) / 2)";
    }

    // console.log("dance: " + window.parent.danceFocused + ", about: " + window.parent.aboutFocused + "video: " + window.parent.videoFocused);
}

function showContent(){

    // var content = document.getElementById("content");
    // if (content != null){
    //     content.style.opacity = "1";
    //     content.style.pointerEvents = "auto";
    // }

    var content = document.getElementsByClassName("content");

    if (content != null){
        for (var i=0;i<content.length;i++){
            content[i].style.opacity = "1";
            content[i].style.pointerEvents = "auto";
        }
    }
}

function hideContent(){
    var content = document.getElementsByClassName("content");

    if (content != null){
        for (var i=0;i<content.length;i++){
            content[i].style.opacity = "0";
            content[i].style.pointerEvents = "none";
        }
    }
    // var content = document.getElementById("content");
    // if (content != null){
    //     content.style.opacity = "0";
    //     content.style.pointerEvents = "none";
    // }
}

function danceScroll(){
    
    var container = document.getElementsByClassName("danceContent")[0];
    var sections = document.getElementsByClassName("danceContentBlock");
    var navs = document.getElementsByClassName("danceNav");
    console.log(container.scrollTop);
    for (var i = 0; i < navs.length; i++){
        if (container.scrollTop >= sections[i+1].offsetTop && container.scrollTop < sections[i+1].offsetTop + sections[i+1].offsetHeight){
            navs[i].style.color = "white";
        } else {
            navs[i].style.color = "#5b9292";
        }
    }
}