let templateFile = await fetch('./component/AddMovieForm/template.html');
let template = await templateFile.text();

let AddMovieForm = {};

AddMovieForm.format = function(handler){
    let html = template;
    html = html.replaceAll("{{handler}}", handler);
    return html;
}

export { AddMovieForm };