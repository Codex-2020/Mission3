import albums from "../data/albums.js";
import series from "../data/series.js";
import auteurs from "../data/auteurs.js";
console.log(albums); // test
console.log(series); // test
console.log(auteurs); // test
console.log(albums.get("2"));
console.log(albums.get("2").titre);

let serieAlbum = "";
let numeroAlbum = "";
let titreAlbum = "";
let auteurAlbum = "";
let prixAlbum = "";
let cheminImageAlbum = "";


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
    const srcImageAlbum = "albums/"; // emplacement des images des albums en grand

    let ligneAlbum = albums.get(num); // ID ALBUM
    console.log(ligneAlbum);

    let ligneSerie = series.get(ligneAlbum.idSerie);
    let ligneAuteur = auteurs.get(ligneAlbum.idAuteur);
    console.log(ligneSerie);
    console.log(ligneSerie.nom)

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

    let nomAlbum = ligneSerie.nom + "-" + ligneAlbum.numero + "-" + ligneAlbum.titre; // Concaténation du nom de l'image
    nomAlbum = nomAlbum.replace(/'|!|\?|\.|"|:|\$/g, "");
    console.log(nomAlbum);
    cheminImageAlbum = "./" + srcImageAlbum + nomAlbum + ".jpg";
    console.log(cheminImageAlbum);
    // imageAlbum.src = cheminImageAlbum;
};


let test = "";
let testu = [];


function teste() {

    for (let i = 1; i <= 629; i++) {

        let j = `${i}`;
        let k = albums.get(j);

        let searchId = albums.has(j);
        console.log(searchId);

        if (searchId) {
            getAlbum(j);

            test = `<div class="card-body text-center">
            <img src="${cheminImageAlbum}" alt="" width="200px" height="300px" />
         <h5 class="card-title">Nom Album: ${titreAlbum}</h5>
        <h6 class="card-subtitle auteur">Auteur:  ${auteurAlbum}</h6>
        <h6 class="card-subtitle serie mt-2">Série</h6>
        <h6 class="card-title mt-2">Prix Album  ${prixAlbum} €</h6>
        <a href="#" class="btn btn-dark">Ajouter au panier</a>
    </div>`
            testu.push(test);
            console.log(testu);
        } else {
            console.log('c\'est pas grave');
        }

    }

}
teste();
console.log(testu[1]);


document.getElementById('test2').insertAdjacentHTML('afterbegin', testu);

