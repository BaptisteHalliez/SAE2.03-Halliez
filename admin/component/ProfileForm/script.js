let templateFile = await fetch('./component/ProfileForm/template.html');
let template = await templateFile.text();

let AddProfileForm = {};

AddProfileForm.format = function(handler){
    let html = template;
    html = html.replaceAll("{{handler}}", handler);
    return html;
}

export { AddProfileForm };