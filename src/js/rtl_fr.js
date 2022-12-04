
const N_PARAGRAPHS_TO_EVALUATE = 4;

function create_star(){
    var star_size = "24px";
    var star_icon_address = "https://img.icons8.com/fluent/96/000000/star.png";
    var star_element = document.createElement('img');
    star_element.src = star_icon_address;
    star_element.style.width = star_size;
    star_element.style.height = star_size;
    return star_element;
}

function create_rank(rank){
    var canva_height = "72px";
    var canva_width = "200px";

    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    ctx.font = "35px Arial";
    // ctx.textAlign='center';
    // ctx.textBaseline='middle';
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "black";
    ctx.fillText(rank+"% known words", 5, 145);
    const dataUrl = canvas.toDataURL("image/png");

    var rank_address = dataUrl;
    var rank_element = document.createElement('img');
    rank_element.src = rank_address;
    rank_element.style.width = canva_width;
    rank_element.style.height = canva_height;
    return rank_element;
}


function star_based_on_rank(div_image,rank){
    var star_size = "24px";

    var first_star = create_star();
    var second_star = create_star();
    var third_star = create_star();
    var fourth_star = create_star();
    var fifth_star = create_star();
    
    var rank_element = create_rank(rank)
    
    div_image.appendChild(rank_element)

    second_star.style.marginLeft = star_size;
    third_star.style.marginLeft = 2*parseInt(star_size,10)+"px";
    fourth_star.style.marginLeft = 3*parseInt(star_size,10)+"px";
    fifth_star.style.marginLeft = 4*parseInt(star_size,10)+"px";

    var stars = [first_star,second_star,third_star,fourth_star,fifth_star];
    
    if(rank > 80){
        for(var i=0; i < 5; i++){
            div_image.appendChild(stars[i]);
        }
    }else if(rank > 60){
        for(var i=0; i < 4; i++){
            div_image.appendChild(stars[i]);
        }
    }else if(rank > 40){
        for(var i=0; i < 3; i++){
            div_image.appendChild(stars[i]);
        }
    }else if(rank > 20){
        for(var i=0; i < 2; i++){
            div_image.appendChild(stars[i]);
        }
    }else{
        div_image.appendChild(first_star);
    }


}

function check_text_against_known_words(article_text,known_words){
    var article_words = article_text.split(" ");

    var article_known_words = 0;
    for(var i=0; i < article_words.length; i++){
            if(known_words.includes(article_words[i].toLowerCase())){
                article_known_words++;
            }  
    }

    var article_percent_known = (article_known_words*100)/article_words.length;
    // console.log("article_percent_known: "+article_known_words.toString() + "::"+ article_words.length.toString()+" result: "+article_percent_known.toString());
    return article_percent_known.toFixed(0);
}

function scrape_article(site_content){
    var textContent = "";

    var div_paragraphs = site_content.getElementsByClassName('article-body__detail js-article-body-detail');
     if (div_paragraphs[0].children != null){
        for(var i=0; i < N_PARAGRAPHS_TO_EVALUATE; i++){
            textContent = textContent + " "+ div_paragraphs[0].children[i].innerText;
        }
        return textContent;
     }
}

function scrape_article_http_request(cards_overlay,div_content,div_image,message){
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', div_content.firstElementChild.href, true);
    xhttp.send();

    xhttp.onreadystatechange = function(e) {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            var doc = document.implementation.createHTMLDocument("");
            doc.body.innerHTML = xhttp.responseText;
            var article_text = scrape_article(doc);
            console.log("Article scraped!");
            var rank = check_text_against_known_words(article_text,message.known_words);
            console.log("Rank: "+rank.toString());
            cards_overlay.title = rank+"% known words";
            star_based_on_rank(div_image,rank);
        }
    }

}

function add_span_to_words_html(p,words,known_words,dict){
    var html_result = "";
    p.innerText = "";
    for (var i = 0; i < words.length; i++) {
        var span = document.createElement('span');
        span.id = "word-"+i.toString();
        span.textContent = words[i];
        var endRegex = /\'$|\.$|\!$|\?$|\"$/g; // special characters
        var startRegex = /^\'|^\.|^\!|^\?|^\"/g;
        var raw_word = words[i].toLowerCase();
        if(words[i].toLowerCase().search(startRegex) != -1){
            raw_word = words[i].toLowerCase().substring(1,words[i].length);
            console.log(raw_word);
        }
        if(words[i].toLowerCase().search(endRegex) != -1){
            raw_word = words[i].toLowerCase().substring(0,words[i].length-1);
            console.log(raw_word);
        } 
        if(known_words.includes(raw_word)){
            span.className = "knownword";   
        }else{
            span.className = "unknownword";
            span.title = "here";
        }     
        p.appendChild(span);
        p.innerHTML = p.innerHTML + " ";
    }
}


function rank_news(message){
    console.log("Rank Message Received...");
    // console.log(message);
    var cards_wrapper = document.getElementsByClassName('card__media-wrapper');
    var cards_content = document.getElementsByClassName('card__content');
    var cards_overlay = document.getElementsByClassName('block-link__overlay');
    
    for (var i = 0; i < cards_wrapper.length; i++) {
        var div_image = cards_wrapper[i].querySelector(".media-image__container");
        var div_content = cards_content[i].querySelector(".card___mtitle");
    
        if(div_content != null){
            var article = scrape_article_http_request(cards_overlay[i],div_content,div_image,message);
        }
    }
};

var auxKnownWords = "";
function parse_article(message){
    console.log("Parse Message Received...");
    // console.log(message);

    var div_paragraphs = document.getElementsByClassName('article-body__detail js-article-body-detail');
     if (div_paragraphs[0].children != null){
        for(var i=0; i < N_PARAGRAPHS_TO_EVALUATE; i++){
            var p = div_paragraphs[0].children[i];
            var words_splitted = p.innerText.split(" ");
            add_span_to_words_html(p,words_splitted,message.known_words,message.dict);
            auxKnownWords = message.known_words;
        }
     }
}

console.log("NewsEvaluator starting for RTL.lu...");

function updateKnownWords(newKnownWords){
    var msg = {
        action : "update",
        known_words: newKnownWords
    }
    chrome.runtime.sendMessage(msg);
}

function markWordAsKnown(){
    var unknownword = document.querySelector(".unknownword:hover");
    console.log(unknownword.textContent);
    if(unknownword.className == "unknownword"){
        console.log("unknown grabbed!");
        auxKnownWords = "[[\""+unknownword.textContent.trim().toLowerCase()+"\", 2]," + auxKnownWords.substring(1,auxKnownWords.length);
        unknownword.className = "knownword";
        updateKnownWords(auxKnownWords);
    }else{
        console.log("known grabbed!");
    }
}

document.addEventListener('keydown', function(e){
    if(e.key == "k"){
        markWordAsKnown();
    }
});

function gotMessage(message,sender,sendResponse){
    if(message.action == "rank"){
        rank_news(message);
    }else if(message.action == "parse"){
        parse_article(message);
    }
    
};
    
chrome.runtime.onMessage.addListener(gotMessage);
