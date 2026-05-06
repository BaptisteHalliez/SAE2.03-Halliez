let HOST_URL = "https://mmi.unilim.fr/~halliez1/SAE2.03-Halliez";

let DataProfile = {};

DataProfile.add = async function(fdata){
    let config = {
        method: "POST",
        body: fdata
    };
    let answer = await fetch(HOST_URL + "/server/script.php?todo=addprofile", config);
    let data = await answer.json();
    return data;
}

DataProfile.read = async function () {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readprofiles");
    DataProfile.profiles = await answer.json(); 
    return DataProfile.profiles;
}

DataProfile.getProfileId = function(id) {
    for (let profile of DataProfile.profiles) {
        if (profile.id == id) {
            return profile; 
        }
    }
    return null; 
}
export { DataProfile };
