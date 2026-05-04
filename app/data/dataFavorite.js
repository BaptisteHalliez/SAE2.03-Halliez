let HOST_URL = "https://mmi.unilim.fr/~halliez1/SAE2.03-Halliez";

let DataFavorite = {};

DataFavorite.requestFavorite = async function(id_profile){
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readfavorites&id_profile=" + id_profile);
    let data = await answer.json();
    return data;
}

DataFavorite.addFavorite = async function(id_profile, id_movie) {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=addfavorites&id_profile=" + id_profile + "&id_movie=" + id_movie);
    let data = await answer.json();
    return data;
}

export { DataFavorite };