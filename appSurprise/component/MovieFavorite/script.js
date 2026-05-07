let templateFile = await fetch("./component/MovieFavorite/template.html");
let template = await templateFile.text();

let templateLiFile = await fetch("./component/MovieFavorite/templateLi.html");
let templateLi = await templateLiFile.text();

let MovieFavorite = {};

MovieFavorite.format = function(movies) {
    let html = template;

    let favHTML = "";
    for (let fav of movies) {
      let li = templateLi;
      li = li.replaceAll("{{movieId}}", fav.id);
      li = li.replaceAll("{{sourceAffiche}}", fav.image);
      li = li.replaceAll("{{movieTrailer}}", fav.trailer);
      li = li.replaceAll("{{movieCategory}}", fav.category_name);
      li = li.replaceAll("{{movieYear}}", fav.year);
      li = li.replaceAll("{{movieLength}}", fav.length);
      li = li.replaceAll("{{movieRestriction}}", fav.min_age);
      li = li.replaceAll("{{movieLength}}", fav.length);
      li = li.replaceAll("{{movieTitle}}", fav.name);
      favHTML += li;
    }
    html = html.replaceAll("{{favorites}}", favHTML);
    return html;
}

export { MovieFavorite };