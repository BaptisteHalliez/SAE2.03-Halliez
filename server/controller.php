<?php

/** ARCHITECTURE PHP SERVEUR  : Rôle du fichier controller.php
 * 
 *  Dans ce fichier, on va définir les fonctions de contrôle qui vont traiter les requêtes HTTP.
 *  Les requêtes HTTP sont interprétées selon la valeur du paramètre 'todo' de la requête (voir script.php)
 *  Pour chaque valeur différente, on déclarera une fonction de contrôle différente.
 * 
 *  Les fonctions de contrôle vont éventuellement lire les paramètres additionnels de la requête, 
 *  les vérifier, puis appeler les fonctions du modèle (model.php) pour effectuer les opérations
 *  nécessaires sur la base de données.
 *  
 *  Si la fonction échoue à traiter la requête, elle retourne false (mauvais paramètres, erreur de connexion à la BDD, etc.)
 *  Sinon elle retourne le résultat de l'opération (des données ou un message) à includre dans la réponse HTTP.
 */

/** Inclusion du fichier model.php
 *  Pour pouvoir utiliser les fonctions qui y sont déclarées et qui permettent
 *  de faire des opérations sur les données stockées en base de données.
 */
require("model.php");


function readMoviesController(){
    $min_age = isset($_REQUEST['min_age']) ? $_REQUEST['min_age'] : 0;
    $movies = getAllMovies($min_age);
    return $movies;
}

function readMoviesCategoryController($min_age = 0){
    if (isset($_REQUEST['min_age'])==false){
        return false;
    }

    $min_age = $_REQUEST['min_age'];

    $movies = getAllMovies($min_age);
    $category = [];
    foreach($movies as $m){
        $categoryName = $m->category_name;
        if  (!isset($category[$categoryName])){
            $category[$categoryName] = [];
        }
        $category[$categoryName][] = $m;
    }
    return $category;
}
    
function readMoviesDetailsController(){
    if (empty($_REQUEST['id'])) {
        return ["status" => "error", "message" => "L'identifiant du film est manquant"];
    }
    
    $id = $_REQUEST['id'];
    $movie = getMovieDetails($id);
    
    if($movie){
        return $movie;
    }
}
    
function addMoviesController(){
    $name = $_REQUEST['name'];
    $year = $_REQUEST['year'];
    $length = $_REQUEST['length'];
    $description = $_REQUEST['description'];
    $director = $_REQUEST['director'];
    $category = $_REQUEST['id_category'];
    $image = $_REQUEST['image'];
    $trailer = $_REQUEST['trailer'];
    $min_age = $_REQUEST['min_age'];
    $ok = addMovie($name, $year, $length, $description, $director, $category, $image, $trailer, $min_age);
    if ($ok!=0){
        return "Le film $name réalisé par $director a été ajouté";
    }
    else {
        return false;
    }
}

function addProfileController(){
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : null; 
    $nom = $_REQUEST['nom'];
    $avatar = $_REQUEST['avatar'];
    $min_age = $_REQUEST['min_age'];
    $ok = addProfile($id, $nom, $avatar, $min_age);
    if ($ok){ 
        return "Le profil de $nom a été ajouté / modifié";
    } 
    else {
        return false;
    }
}

function readCategoryController(){
    return readCategory();
}

function readProfilesController(){
    return readProfiles(null);
}
