let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();

let templateLiFile = await fetch("./component/Movie/templateLi.html");
let templateLi = await templateLiFile.text();

let Movie = {};

Movie.format = function (movies, favorites = []) {
  let html = template;
  if (movies.length == 0) {
    return html.replaceAll(
      "{{movieList}}",
      "<p class='movie__empty'>Aucun film n'est disponible pour le moment</p>",
    );
  } else {
    let filmHTML = "";
    for (let film of movies) {
      let li = templateLi;
      li = li.replaceAll("{{movieId}}", film.id);
      li = li.replaceAll("{{sourceAffiche}}", film.image);
      li = li.replaceAll("{{movieTrailer}}", film.trailer);
      li = li.replaceAll("{{movieCategory}}", film.category_name);
      li = li.replaceAll("{{movieYear}}", film.year);
      li = li.replaceAll("{{movieLength}}", film.length);
      li = li.replaceAll("{{movieRestriction}}", film.min_age);
      li = li.replaceAll("{{movieLength}}", film.length);
      li = li.replaceAll("{{movieTitle}}", film.name);

      let Favorited = false;
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id == film.id) {
          Favorited = true;
        }
      }
      let favBtn = "";
      let favClass = "";
      if (Favorited) {
        favBtn = "";
        favClass = "is-added";
      }
      else {
        favBtn = "C.handlerAddFavorite(" + film.id + ")";
        let favClass = "";
      }
      li = li.replaceAll("{{favBtn}}", favBtn);
      li = li.replaceAll("{{favClass}}", favClass);
      filmHTML += li;
    }
    html = html.replaceAll("{{movieList}}", filmHTML);
    return html;
  }
};

export { Movie };
