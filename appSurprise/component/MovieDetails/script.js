let templateFile = await fetch("./component/MovieDetails/template.html");
let template = await templateFile.text();

let MovieDetails = {};

MovieDetails.format = function (data, favorites = []) {
  let html = template;
  html = html.replaceAll("{{movieTitle}}", data.name);
  html = html.replaceAll("{{movieYear}}", data.year);
  html = html.replaceAll("{{movieLength}}", data.length);
  html = html.replaceAll("{{movieCategory}}", data.category_name);
  html = html.replaceAll("{{movieAffiche}}", data.image);
  html = html.replaceAll("{{movieTrailer}}", data.trailer);
  html = html.replaceAll("{{movieDescription}}", data.description);
  html = html.replaceAll("{{movieDirector}}", data.director);
  html = html.replaceAll("{{movieRestriction}}", data.min_age);

  let Favorited = false;
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].id == data.id) {
      Favorited = true;
    }
  }
  let favBtn = "";
  let favClass = "";
  if (Favorited) {
    favBtn = "C.handlerRemoveFavorite(" + data.id + ")";
    favClass = "is-added";
  } else {
    favBtn = "C.handlerAddFavorite(" + data.id + ")";
    favClass = "";
  }
  html = html.replaceAll("{{favBtn}}", favBtn);
  html = html.replaceAll("{{favClass}}", favClass);
  return html;
};

export { MovieDetails };
