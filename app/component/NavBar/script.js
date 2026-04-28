let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let templateOpFile = await fetch('./component/NavBar/templateOp.html');
let templateOp = await templateOpFile.text();

let NavBar = {};

NavBar.format = function (hHome, hProfiles, data, hDeconnexion) {
  let html = template;
  html = html.replaceAll("{{hHome}}", hHome);
  html = html.replaceAll("{{hProfiles}}", hProfiles);

  let profileList ="";
  for (let profile of data){
    let op = templateOp;
    op = op.replaceAll('{{profileId}}', profile.id);
    op = op.replaceAll('{{profileAvatar}}', profile.avatar);
    op = op.replaceAll('{{profileName}}', profile.nom);
    profileList += op;
  }
  html = html.replaceAll("{{optionProfiles}}", profileList);
  html = html.replaceAll("{{hDeconnexion}}", hDeconnexion)
  return html;
};

export { NavBar };
