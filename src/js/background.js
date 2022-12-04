import { create_star } from '../js/utils.js' ;

console.log("Starting background script..");

chrome.browserAction.onClicked.addListener(settingsClicked);

chrome.runtime.onMessage.addListener(function(request,sender){
    if(request.action == "update_recognized"){
        const backup_key = "backup_words";
        var backup_known_words = " "+ localStorage.getItem("my_words").repeat(1);
        backup_known_words = backup_known_words.slice(1);
        localStorage.setItem(backup_key,backup_known_words);
        localStorage.setItem("my_words",request.known_words);
    }
    if(request.action == "update_familiar"){
        const backup_key = "backup_words";
        var backup_known_words = " "+ localStorage.getItem("my_words").repeat(1);
        backup_known_words = backup_known_words.slice(1);
        localStorage.setItem(backup_key,backup_known_words);
        localStorage.setItem("my_words",request.known_words);
    }
    if(request.action == "update_known"){
        const backup_key = "backup_words";
        var backup_known_words = " "+ localStorage.getItem("my_words").repeat(1);
        backup_known_words = backup_known_words.slice(1);
        localStorage.setItem(backup_key,backup_known_words);
        localStorage.setItem("my_words",request.known_words);
    }
});

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

var frequencyDictionaryFileChooser = document.getElementById("myFrequencyDict");
var languageCombobox = document.getElementById("languages");
frequencyDictionaryFileChooser.addEventListener("change", function(){

    // Get a reference to the fileList
    var files = !!this.files ? this.files : [];

    // If no files were selected, or no FileReader support, return
    if ( !files.length || !window.FileReader ) return;

    // Create a new instance of the FileReader
    var reader = new FileReader();

    reader.readAsDataURL(files[0]);

    reader.onloadend = function(){       
        const key = 'frequency_dict_'+ languageCombobox.value;
        const json = this.result.substring(29);
        const text_result = b64DecodeUnicode(json);
        localStorage.setItem(key,text_result);
    }

});

var dictionaryFileChooser = document.getElementById("myDict");
var languageTranslationsCombobox = document.getElementById("translations");
dictionaryFileChooser.addEventListener("change", function(){

    // Get a reference to the fileList
    var files = !!this.files ? this.files : [];

    // If no files were selected, or no FileReader support, return
    if ( !files.length || !window.FileReader ) return;

    // Create a new instance of the FileReader
    var reader = new FileReader();

    reader.readAsDataURL(files[0]);
    console.log(files[0]);

    reader.onloadend = function(){       
        const key = 'dict_'+ languageTranslationsCombobox.value;
        const json = this.result.substring(29);
        const text_result = b64DecodeUnicode(json);
        console.log(text_result);
        localStorage.setItem(key,text_result);
    }

});

