function create_star(){
    var star_size = "24px";
    var star_icon_address = "https://img.icons8.com/fluent/96/000000/star.png";
    var star_element = document.createElement('img');
    star_element.src = star_icon_address;
    star_element.style.width = star_size;
    star_element.style.height = star_size;
    return star_element;
}

function scrape_article(site_content){
    var paragraphs = site_content.getElementsByClassName('article__content  old__article-content-single');
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

console.log("NewsEvaluator starting for LeMonde...");
var slice = Array.prototype.slice;
var cards_wrapper = document.getElementsByClassName('article__media');
var secondary_content = slice.call(document.getElementsByClassName('article article--runner old__article-runner'));
var river_content = slice.call(document.getElementsByClassName('article article--river old__article-river'));
var main_content = slice.call(document.getElementsByClassName('article article--main'));

var cards_content = main_content.concat(secondary_content,river_content);

var star_size = "24px";
var star_icon_address = "https://img.icons8.com/fluent/96/000000/star.png";
for (var i = 0; i < cards_wrapper.length; i++) {
    
    var first_star = create_star();
    var second_star = create_star();
    var third_star = create_star();
    var fourth_star = create_star();
    var fifth_star = create_star();
    
    second_star.style.marginLeft = star_size;
    third_star.style.marginLeft = 2*parseInt(star_size,10)+"px";
    fourth_star.style.marginLeft = 3*parseInt(star_size,10)+"px";
    fifth_star.style.marginLeft = 4*parseInt(star_size,10)+"px";

    var div_image = cards_wrapper[i];
    var div_content = cards_content[i];

    div_image.appendChild(first_star);
    div_image.appendChild(second_star);
    div_image.appendChild(third_star);
    div_image.appendChild(fourth_star);
    div_image.appendChild(fifth_star);

    if(div_content != null){
        article_http_request(div_content.firstElementChild.href);
    }
}

