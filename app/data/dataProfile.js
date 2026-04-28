let HOST_URL = "https://mmi.unilim.fr/~halliez1/SAE2.03-Halliez";

let DataProfile = {};

DataProfile.read = async function(){
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readprofiles");
    let data = await answer.json();
    return data;
}

export { DataProfile };
