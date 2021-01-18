import albums from "../data/albums.js";
import series from "../data/series.js";
import auteurs from "../data/auteurs.js";
// console.log(albums); // test
// console.log(series); // test
// console.log(auteurs); // test
// console.log(albums.get("2"));
// console.log(albums.get("2").titre);

let serieAlbum = "";
let numeroAlbum = "";
let titreAlbum = "";
let auteurAlbum = "";
let prixAlbum = "";


// Permet de lire l'url à partir du ?
let param = window.location.search;
// console.log(param); //test

// Fonction permettant d'extraire une valeur de l'url
function obtenirParametre(sVar) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

// Stockage dans une variable de la valeur "id" extrait de l'url
let id = (obtenirParametre("id"));
// console.log(id);
// Fonction permettant de naviguer dans les différents 'data' recuppérer leurs valeur en fonction de l'id et l'afficher
function getAlbum(num) {
    console.log(num);
    // let serieAlbum = document.getElementById("serie");
    // let numeroAlbum = document.getElementById("numero");
    // let titreAlbum = document.getElementById("titre");
    // let auteurAlbum = document.getElementById("auteur");
    // let prixAlbum = document.getElementById("prix");
    // let imageAlbum = document.getElementById("albumBd");
    // const srcImageAlbum = "albums/"; // emplacement des images des albums en grand

    let ligneAlbum = albums.get(num); // ID ALBUM
    console.log(ligneAlbum);

    let ligneSerie = series.get(ligneAlbum.idSerie);
    let ligneAuteur = auteurs.get(ligneAlbum.idAuteur);
    console.log(ligneSerie);
    // console.log(ligneSerie.nom)

    serieAlbum = ligneSerie.nom;
    console.log(serieAlbum);
    numeroAlbum = ligneAlbum.numero;
    console.log(numeroAlbum);
    titreAlbum = ligneAlbum.titre;
    console.log(titreAlbum);
    auteurAlbum = ligneAuteur.nom;
    console.log(auteurAlbum);
    prixAlbum = ligneAlbum.prix;
    console.log(prixAlbum);

    // let nomAlbum = ligneSerie.nom + "-" + ligneAlbum.numero + "-" + ligneAlbum.titre; // Concaténation du nom de l'image
    // nomAlbum = nomAlbum.replace(/'|!|\?|\.|"|:|\$/g, "");
    // let cheminImageAlbum = srcImageAlbum + nomAlbum + ".jpg";
    // imageAlbum.src = cheminImageAlbum;
};

// Appel de la fonction GetAlbum avec l'envoi de l'id en paramètre 


// getAlbum(id)

let test = "";
let testu = [];


function teste() {

    for (let i = 1; i <= 20; i++) {
        let j = `${i}`;
        console.log(typeof j);


        getAlbum(j);
        test = ` Nom Album: ${titreAlbum}
         Numéro Album:  ${numeroAlbum}
         Auteur:  ${auteurAlbum}
         Prix Album  ${prixAlbum}
         <br />`;
        testu.push(test);
        console.log(testu);


    }

}
teste();
console.log(testu[1]);

// for (let i = 1; i <= testu[i].lenght; i++) {

//     localStorage.setItem("catalogue", testu);

// }

document.getElementById('test2').insertAdjacentHTML('afterbegin', testu);
