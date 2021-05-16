

function settingsClicked(){
    console.log("settings Clicked");
    chrome.tabs.create({active: true, url: "../html/background.html"});
}

function rankClicked(){
    var activeTab = chrome.tabs.query({active: true, currentWindow: true}, function (tabActive) {
        var msg = {
            action : "rank",
            known_words: localStorage.getItem('my_words'),
            dict: localStorage.getItem('dict_french')
        }
        console.log("activate Clicked");
        console.log(tabActive);
        chrome.tabs.sendMessage(tabActive[0].id,msg);
    });
}

function parseClicked(){
    var activeTab = chrome.tabs.query({active: true, currentWindow: true}, function (tabActive) {
        var msg = {
            action : "parse",
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
    var rank = document.getElementById('rank');
    var parse = document.getElementById('parse');
    settings.addEventListener('click', settingsClicked);
    rank.addEventListener('click', rankClicked);
    parse.addEventListener('click', parseClicked);
}
