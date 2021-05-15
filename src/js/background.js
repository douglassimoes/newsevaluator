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

//From Mozilla Resources
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

var wordsFileChooser = document.getElementById("myfile");
wordsFileChooser.addEventListener("change", function(){

    // Get a reference to the fileList
    var files = !!this.files ? this.files : [];

    // If no files were selected, or no FileReader support, return
    if ( !files.length || !window.FileReader ) return;

    // Create a new instance of the FileReader
    var reader = new FileReader();

    reader.readAsDataURL(files[0]);

    reader.onloadend = function(){       
        const key = 'my_words';
        const json = this.result.substring(29);
        const text_result = b64DecodeUnicode(json);
        localStorage.setItem(key,text_result);
    }

});

