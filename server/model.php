<?php
/**
 * Ce fichier contient toutes les fonctions qui réalisent des opérations
 * sur la base de données, telles que les requêtes SQL pour insérer, 
 * mettre à jour, supprimer ou récupérer des données.
 */

/**
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define("HOST", "localhost");
define("DBNAME", "halliez1");
define("DBLOGIN", "halliez1");
define("DBPWD", "halliez1");


function getAllMovies($m = 0){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "SELECT Movie.id, Movie.name, Movie.year, Movie.length, Movie.trailer, Movie.min_age,  Movie.image, Category.name AS category_name FROM Movie INNER JOIN Category ON Category.id = Movie.id_category WHERE Movie.min_age<=:min_age ORDER BY Category.name";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Lie le paramètre à la valeur
    $stmt->bindParam(':min_age', $m);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function getAllFavorites($p){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT Movie.*, Category.name AS category_name FROM Movie INNER JOIN Favorite ON Movie.id = Favorite.id_movie INNER JOIN Category ON Movie.id_category = Category.id WHERE Favorite.id_profile = :profile";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':profile', $p);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res;
}

function getMovieDetails($id){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT Movie.*, Category.name AS category_name FROM Movie INNER JOIN Category ON Movie.id_category=Category.id WHERE Movie.id= :id";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $res = $stmt->fetch(PDO::FETCH_OBJ);
    return $res;
}

function addMovie($n, $y, $l, $de, $di, $c, $i, $t, $m){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "INSERT INTO Movie (name, year, length, description, director, id_category, image, trailer, min_age)
    VALUES (:name, :year, :length, :description, :director, :id_category, :image, :trailer, :min_age)";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':name', $n);
    $stmt->bindParam(':year', $y);
    $stmt->bindParam(':length', $l);
    $stmt->bindParam(':description', $de);
    $stmt->bindParam(':director', $di);
    $stmt->bindParam(':id_category', $c);
    $stmt->bindParam(':image', $i);
    $stmt->bindParam(':trailer', $t);
    $stmt->bindParam(':min_age', $m);
    $stmt->execute();
    $res = $stmt->rowCount();
    return $res;
}

function addProfile($i, $n, $a, $m){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    if ($i == "" || $i == null) {
        $sql = "INSERT INTO Profile (nom, avatar, min_age) VALUES (:nom, :avatar, :min_age)";
        $stmt = $cnx->prepare($sql);
    }
    else {
        $sql = "UPDATE Profile SET nom=:nom, avatar=:avatar, min_age=:min_age WHERE id=:id";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':id', $i);
    }
    $stmt->bindParam(':nom', $n);
    $stmt->bindParam(':avatar', $a);
    $stmt->bindParam(':min_age', $m);
    $res = $stmt->execute();
    return $res;
}

function addToFavorites($p, $m){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "INSERT INTO Favorite (id_profile, id_movie) VALUES (:profile, :movie)";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':profile', $p);
    $stmt->bindParam(':movie', $m);
    $stmt->execute();
    $res = $stmt->rowCount();
    return $res;
}

function readCategory(){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT id, name FROM Category";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}

function readProfiles($i){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT id, nom, avatar, min_age FROM Profile";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res;
}

function removeFromFavorites($p, $m) {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "DELETE FROM Favorite WHERE id_profile=:profile AND id_movie=:movie";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':profile', $p);
    $stmt->bindParam(':movie', $m);
    $stmt->execute();
    $res = $stmt->rowCount();
    return $res;
}