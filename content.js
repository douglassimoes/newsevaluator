var divs = document.getElementsByClassName('media-image__container');
var star_size = "24px";
var star_icon_address = "https://img.icons8.com/fluent/96/000000/star.png";

for (var i = 0; i < divs.length; i++) {
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

    divs[i].appendChild(first_star);
    divs[i].appendChild(second_star);
    divs[i].appendChild(third_star);
    divs[i].appendChild(fourth_star);
    divs[i].appendChild(fifth_star);
}

