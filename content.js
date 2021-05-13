
function scrape_article(site_content){
    var paragraphs = site_content.getElementsByClassName('article-body__detail js-article-body-detail');
    console.log(paragraphs[0].firstElementChild.textContent);
}

function article_http_request(link){
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', link, true);
    xhttp.send();

    xhttp.onreadystatechange = function(e) {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            var doc = document.implementation.createHTMLDocument("");
            doc.body.innerHTML = xhttp.responseText;
            scrape_article(doc);
        }
    }

}

var cards_wrapper = document.getElementsByClassName('card__media-wrapper');
var cards_content = document.getElementsByClassName('card__content');
var star_size = "24px";
var star_icon_address = "https://img.icons8.com/fluent/96/000000/star.png";

for (var i = 0; i < cards_wrapper.length; i++) {
    
    var first_star = document.createElement('img');
    var second_star = document.createElement('img');
    var third_star = document.createElement('img');
    var fourth_star = document.createElement('img');
    var fifth_star = document.createElement('img');
    
    var dale = document.createTextNode('dale');
    first_star.src = star_icon_address;
    first_star.style.width = star_size;
    first_star.style.height = star_size;
    
    second_star.src = star_icon_address;
    second_star.style.width = star_size;
    second_star.style.height = star_size;
    second_star.style.marginLeft = star_size;
    
    third_star.src = star_icon_address;
    third_star.style.width = star_size;
    third_star.style.height = star_size;
    third_star.style.marginLeft = 2*parseInt(star_size,10)+"px";
    
    fourth_star.src = star_icon_address;
    fourth_star.style.width = star_size;
    fourth_star.style.height = star_size;
    fourth_star.style.marginLeft = 3*parseInt(star_size,10)+"px";
    
    fifth_star.src = star_icon_address;
    fifth_star.style.width = star_size;
    fifth_star.style.height = star_size;
    fifth_star.style.marginLeft = 4*parseInt(star_size,10)+"px";

    var div_image = cards_wrapper[i].querySelector(".media-image__container");
    var div_content = cards_content[i].querySelector(".card___mtitle");

    div_image.appendChild(first_star);
    div_image.appendChild(second_star);
    div_image.appendChild(third_star);
    div_image.appendChild(fourth_star);
    div_image.appendChild(fifth_star);

    if(div_content != null){
        article_http_request(div_content.firstElementChild.href);
    }
}

