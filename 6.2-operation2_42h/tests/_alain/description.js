import albums from "./data/albums.js";
import series from "./data/series.js";
import auteurs from "./data/auteurs.js";
console.log(albums); // test
console.log(series); // test
console.log(auteurs); // test

// Permet de lire l'url à partir du ?
let param = window.location.search;
console.log(param); //test

// Fonction permettant d'extraire une valeur de l'url
function obtenirParametre (sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

// Stockage dans une variable de la valeur "id" extrait de l'url
let id = (obtenirParametre("id"));

// Fonction permettant de naviguer dans les différents 'data' recuppérer leurs valeur en fonction de l'id et l'afficher
function getAlbum(num) {
  let serieAlbum = document.getElementById("serie");
  let numeroAlbum = document.getElementById("numero");
  let titreAlbum = document.getElementById("titre");
  let auteurAlbum = document.getElementById("auteur");
  let prixAlbum = document.getElementById("prix");
  let imageAlbum = document.getElementById("albumBd");
  const srcImageAlbum = "albums/"; // emplacement des images des albums en grand

  let ligneAlbum = albums.get(num); // ID ALBUM
  
  let ligneSerie = series.get(ligneAlbum.idSerie);
  let ligneAuteur = auteurs.get(ligneAlbum.idAuteur);

  serieAlbum.textContent = ligneSerie.nom;  
  numeroAlbum.textContent = ligneAlbum.numero;
  titreAlbum.textContent = ligneAlbum.titre;
  auteurAlbum.textContent = ligneAuteur.nom;
  prixAlbum.textContent = ligneAlbum.prix;

  let nomAlbum = ligneSerie.nom +  "-" + ligneAlbum.numero + "-" + ligneAlbum.titre; // Concaténation du nom de l'image
  nomAlbum = nomAlbum.replace(/'|!|\?|\.|"|:|\$/g, "");
  let cheminImageAlbum = srcImageAlbum + nomAlbum + ".jpg";
  imageAlbum.src = cheminImageAlbum;
};

// Appel de la fonction GetAlbum avec l'envoi de l'id en paramètre 
getAlbum(id)


