import { Movie } from "../Movie/script.js";

let templateFile = await fetch('./component/MovieCategory/template.html');
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function(categoryName, data){
    let html = template;
    html = html.replaceAll("{{categoryName}}", categoryName);
    let filmHTML = Movie.format(data);
    html = html.replaceAll("{{movieList}}", filmHTML);
    return html;
}

export { MovieCategory };