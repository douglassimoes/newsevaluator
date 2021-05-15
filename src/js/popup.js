

function settingsClicked(){
    console.log("settings Clicked");
    chrome.tabs.create({active: true, url: "../html/background.html"});
}

function activateClicked(){
    var activeTab = chrome.tabs.query({active: true, currentWindow: true}, function (tabActive) {
        var msg = {
            known_words: localStorage.getItem('my_words'),
            dict: localStorage.getItem('dict_french')
        }
        console.log("activate Clicked");
        console.log(tabActive);
        chrome.tabs.sendMessage(tabActive[0].id,msg);
    });
}

window.onload = function(){
    var settings = document.getElementById('settings');
    var activate = document.getElementById('activate');
    settings.addEventListener('click', settingsClicked);
    activate.addEventListener('click', activateClicked);
}
