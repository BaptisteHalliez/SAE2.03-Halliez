let templateFile = await fetch("./component/MovieDetails/template.html");
let template = await templateFile.text();

let MovieDetails = {};

MovieDetails.format = function (data) {
    let html = template;
    html = html.replaceAll("{{movieTitle}}", data.name);
    html = html.replaceAll("{{movieYear}}", data.year);
    html = html.replaceAll("{{movieCategory}}", data.category_name);
    html = html.replaceAll("{{movieAffiche}}", data.image);
    html = html.replaceAll("{{movieTrailer}}", data.trailer);
    html = html.replaceAll("{{movieDescription}}", data.description);
    html = html.replaceAll("{{movieDirector}}", data.director);
    html = html.replaceAll("{{movieRestriction}}", data.min_age);
    return html;
}

export { MovieDetails };