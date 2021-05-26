let danceDiv, aboutDiv, videoDiv;

function init(){
    danceDiv = parent.document.getElementById("dance");
    aboutDiv = parent.document.getElementById("about");
    videoDiv = parent.document.getElementById("video");
}

function sporesExpand(){
    danceDiv = parent.document.getElementById("dance");
    aboutDiv = parent.document.getElementById("about");
    videoDiv = parent.document.getElementById("video");
    if (danceDiv.style.height == "90vh"){
        danceDiv.style.height = "45vh";
        aboutDiv.style.height = "10vh";
        videoDiv.style.height = "45vh";
    } else {
        danceDiv.style.height = "90vh";
        aboutDiv.style.height = "10vh";
        videoDiv.style.height = "0vh";
    }
}

function foragerExpand(){
    danceDiv = parent.document.getElementById("dance");
    aboutDiv = parent.document.getElementById("about");
    videoDiv = parent.document.getElementById("video");
    if (aboutDiv.style.height == "60vh"){
        danceDiv.style.height = "45vh";
        aboutDiv.style.height = "10vh";
        videoDiv.style.height = "45vh";
    } else {
        danceDiv.style.height = "20vh";
        aboutDiv.style.height = "60vh";
        videoDiv.style.height = "20vh";
    }
    
}

function myceliumExpand(){
    danceDiv = parent.document.getElementById("dance");
    aboutDiv = parent.document.getElementById("about");
    videoDiv = parent.document.getElementById("video");
    if (videoDiv.style.height == "90vh"){
        danceDiv.style.height = "45vh";
        aboutDiv.style.height = "10vh";
        videoDiv.style.height = "45vh";
    } else {
        danceDiv.style.height = "0vh";
        aboutDiv.style.height = "10vh";
        videoDiv.style.height = "90vh";
    }
}