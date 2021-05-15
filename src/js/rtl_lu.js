
const N_PARAGRAPHS_TO_EVALUATE = 1;

function create_star(){
    var star_size = "24px";
    var star_icon_address = "https://img.icons8.com/fluent/96/000000/star.png";
    var star_element = document.createElement('img');
    star_element.src = star_icon_address;
    star_element.style.width = star_size;
    star_element.style.height = star_size;
    return star_element;
}


function star_based_on_rank(div_image,rank){
    var star_size = "24px";

    var first_star = create_star();
    var second_star = create_star();
    var third_star = create_star();
    var fourth_star = create_star();
    var fifth_star = create_star();
    
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
            if(known_words.includes(article_words[i])){
                article_known_words++;
            }  
    }

    var article_percent_known = (article_known_words*100)/article_words.length;
    console.log("article_percent_known: "+article_known_words.toString() + "::"+ article_words.length.toString()+" result: "+article_percent_known.toString());
    return article_percent_known;
}

function scrape_article(site_content){
    var textContent = "";

    var paragraphs = site_content.getElementsByClassName('article-body__detail js-article-body-detail');
     if (paragraphs[0].firstElementChild != null){
        for(var i=0; i < N_PARAGRAPHS_TO_EVALUATE; i++){
            textContent = textContent + " "+ paragraphs[i].firstElementChild.textContent;
        }
        return textContent;
     }
}

function article_http_request(link,div_image,message){
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', link, true);
    xhttp.send();

    xhttp.onreadystatechange = function(e) {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            var doc = document.implementation.createHTMLDocument("");
            doc.body.innerHTML = xhttp.responseText;
            var article_text = scrape_article(doc);
            console.log("Article scraped!");
            var rank = check_text_against_known_words(article_text,message.known_words);
            console.log("Rank: "+rank.toString());
            star_based_on_rank(div_image,rank);
        }
    }

}

console.log("NewsEvaluator starting for RTL.lu...");

function gotMessage(message,sender,sendResponse){
    console.log("Message Received...");
    console.log(message);
    var cards_wrapper = document.getElementsByClassName('card__media-wrapper');
    var cards_content = document.getElementsByClassName('card__content');
    
    for (var i = 0; i < cards_wrapper.length; i++) {
        var div_image = cards_wrapper[i].querySelector(".media-image__container");
        var div_content = cards_content[i].querySelector(".card___mtitle");
    
        if(div_content != null){
            var article = article_http_request(div_content.firstElementChild.href,div_image,message);
        }
    }};
    
chrome.runtime.onMessage.addListener(gotMessage);
