let templateFile = await fetch('./component/AddMovieForm/template.html');
let template = await templateFile.text();

let templateOpFile = await fetch('./component/AddMovieForm/templateOp.html');
let templateOp = await templateOpFile.text();

let AddMovieForm = {};

AddMovieForm.format = function(data, handler){
    let html = template;
    
    let movieList ="";
    for (let category of data){
        let op = templateOp;
        op = op.replaceAll('{{categoryId}}', category.id);
        op = op.replaceAll('{{categoryName}}', category.name);
        movieList += op;
    }
    html = html.replaceAll("{{optionCategory}}", movieList);
    html = html.replaceAll("{{handler}}", handler);
    return html;
}

export { AddMovieForm };