let templateFile = await fetch('./component/ProfileForm/template.html');
let template = await templateFile.text();

let templateOpFile = await fetch('./component/ProfileForm/templateOp.html');
let templateOp = await templateOpFile.text();

let AddProfileForm = {};

AddProfileForm.format = function(handler, profiles){
    let html = template;
    
    let profileList ="";
    for (let profile of profiles){
        let op = templateOp;
        op = op.replaceAll('{{profileId}}', profile.id);
        op = op.replaceAll('{{profileName}}', profile.nom);
        profileList += op;
    }
    html = html.replaceAll("{{optionProfiles}}", profileList);
    html = html.replaceAll("{{handler}}", handler);
    return html;
}

export { AddProfileForm };