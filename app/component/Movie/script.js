let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();

let templateLiFile = await fetch("./component/Movie/templateLi.html");
let templateLi = await templateLiFile.text();

let Movie = {};

Movie.format = function (data) {
  let html = template;
  if (data.length == 0) {
    return html.replaceAll(
      "{{movieList}}",
      "<p class='movie__empty'>Aucun film n'est disponible pour le moment</p>",
    );
  } else {
    let filmHTML = "";
    for (let film of data) {
      let li = templateLi;
      li = li.replaceAll("{{sourceAffiche}}", "../server/images/" + film.image);
      li = li.replaceAll("{{movieTitle}}", film.name);
      filmHTML += li;
    }
    html = html.replaceAll("{{movieList}}", filmHTML);
    return html;
  }
};

export { Movie };
