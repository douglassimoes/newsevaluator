import { create_star } from '../js/utils.js' ;

console.log("Starting background script..");

chrome.browserAction.onClicked.addListener(settingsClicked);

function buttonClicked(tab){
    let msg = {
        knownWords : ["test","Bonjour"]
    } 

    chrome.tabs.sendMessage(tab.id, msg);
}

export function settingsClicked(){
    chrome.tabs.create({url: chrome.extension.getURL('background.html')});
}