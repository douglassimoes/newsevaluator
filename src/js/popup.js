

function settingsClicked(){
    console.log("settings Clicked");
    chrome.tabs.create({active: true, url: "../html/background.html"});
}

window.onload = function(){
    var link = document.getElementById('clickme');
    link.addEventListener('click', settingsClicked);
}
