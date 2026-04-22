let templateFile = await fetch('./component/Movie/template.html');
let template = await templateFile.text();

let templateLiFile = await fetch('./component/Movie/templateLi.html');
let templateLi = await templateLiFile.text();

let Movie = {};

Movie.format = function(data, css=""){
    let html = template;
    html = html.replaceAll('{{cssClass}}', css);

    let movieHTML = "";
    for (let movie of data.movie){
        let li = templateLi;
        li = li.replaceAll('{{sourceAffiche}}', movie.image);
        li = li.replaceAll('{{movieTitle}}', "../server/images" + movie.name);
        movieHTML += li;
    }
    html = html.replaceAll("{{movieList}}", movieHTML);
    return html;
}

Movie.render = function(where, data, css=""){
    let node = document.querySelector(where);
    node.innerHTML += Checkout.format(data, css);
}

export { Movie };