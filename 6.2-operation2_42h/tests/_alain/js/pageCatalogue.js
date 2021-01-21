import albums from "../data/albums.js";
import series from "../data/series.js";
import auteurs from "../data/auteurs.js";
// console.log(auteurs);
// console.log(albums.get("2").titre);
// console.log(auteurs.get("8").nom);

let id = "";
let titre = "";
let numéro = "";
let idSerie = "";
let idAuteur = "";
let prix = "";
let enStock = "";
let albumArray = ";"
let tableau = [];
let preTable = "";
const srcImageAlbum = "albums/";
let cheminImageAlbum = "";
let tabAuteur = []; // création de bouton auteur sans doublons
let tabSerie = []; // création de bouton serie sans doublons

class Albumss {
  constructor(id, titre, numéro, idSerie, idAuteur, prix, enStock) { // Comment intégrer l'image
    this.id = id;
    this.titre = titre;
    this.numéro = numéro;
    this.idSerie = idSerie;
    this.idAuteur = idAuteur;
    this.prix = prix;
    this.enStock = enStock;
  }
};

function getAuteursById(param) {
  return auteurs.get(param)
};

function getSeriesById(parama) {
  return series.get(parama)
};

for (let i = 1; i <= 50; i++) {

  let j = `${i}`;
  let searchId = albums.has(j)

  if (searchId) {
    id = j;
    titre = albums.get(j).titre;
    numéro = albums.get(j).numero;
    idSerie = albums.get(j).idSerie;
    idAuteur = albums.get(j).idAuteur;
    prix = albums.get(j).prix;
    enStock = Math.random() >= 0.5;
    // console.log(idSerie);
    // console.log(idAuteur);

    // albumArray = `"${id}","${titre}","${numéro}","${idSerie}","${idAuteur}","${prix}","${enStock}"`;
    preTable = new Albumss(id, titre, numéro, idSerie, idAuteur, prix, enStock);
    tableau.push(preTable);
  }
}
// console.log(albumArray);
// console.log(tableau);

const cardList = document.getElementById('bdList');
cardList.classList.add("row", "row-col-2", "row-cols-md-4", "px-3");

for (let i = 0; i < tableau.length; i++) {

  let j = `${i}`;

  let searchId = albums.has(j);

  if (searchId) {
    let divInter1 = document.createElement("div");
    divInter1.classList.add("col", "mb-4");

    let divInter2 = document.createElement("div");
    let auteur = getAuteursById(tableau[i].idAuteur).nom;
    let serie = getSeriesById(tableau[i].idSerie).nom;

    let nomAlbum = serie + "-" + tableau[i].numéro + "-" + tableau[i].titre; // Concaténation du nom de l'image
    nomAlbum = nomAlbum.replace(/'|!|\?|\.|"|:|\$/g, "");
    console.log(nomAlbum);
    cheminImageAlbum = "./" + srcImageAlbum + nomAlbum + ".jpg";
    console.log(cheminImageAlbum);

    console.log(auteur);
    console.log(serie);

    if (auteur.includes(" ")) {
      auteur = auteur.replaceAll(" ", "-");
      auteur = auteur.replaceAll(",", "");
      //  console.log("auteur sans espace = ", auteur);
    }

    if (serie.includes(" ")) {
      serie = serie.replaceAll(" ", "-");
      serie = serie.replaceAll(",", "");
      //  console.log("serie sans espace = ", serie);
    }

    divInter2.classList.add("testcard", "card", "p-2", "filterDiv", auteur, serie);
    let newDiv = document.createElement("div");
    newDiv.classList.add("card-body", "text-center");

    let newPicture = document.createElement("p");
    newPicture.classList.add("card-title", "card-img-top");
    newPicture.innerHTML = `<div class="col mb-4">
     
    <form class=" d-flex justify-content-center" method="get" action="./description.html">
      <input type="hidden" name="id" value="${tableau[i].id}"/>
      <input class="card  p-2 filterDiv" type="image" src="${cheminImageAlbum}" width="200px" height="300px">
    </form></div>`;

    let newTitle = document.createElement("h5");
    newTitle.classList.add("card-title");
    newTitle.innerHTML = `${tableau[i].titre}`;

    let newAuteur = document.createElement("h6");
    newAuteur.classList.add("card-subtitle", "auteur");
    newAuteur.innerHTML = `${auteur}`;

    let newSerie = document.createElement("h6");
    newSerie.classList.add("card-subtitle", "serie", "mt-2");
    newSerie.innerHTML = `${serie}`;

    let newPrix = document.createElement("h6");
    newPrix.classList.add("card-title", "mt-2");
    newPrix.innerHTML = `${tableau[i].prix} €`;

    let newParagraphe = document.createElement("p");
    newParagraphe.innerHTML = `<button type="button" id="boutonQuiAjouteAuPanier" class="add-to-cart btn btn-default center-block" 
    data-id="${tableau[i].id}" data-name="${tableau[i].titre}" data-price="${tableau[i].prix}">Ajouter au panier</button>`;


    let newEnStock = document.createElement("div");
    const isStock = tableau[i].enStock ? 'En stock' : 'Indisponible'
    const couleur = isStock === "En stock" ? "bg-success" : "bg-danger"
    newEnStock.classList.add("card-footer", couleur, "text-white", "text-center");
    newEnStock.innerHTML = isStock;

    newDiv.appendChild(newPicture);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newAuteur);
    newDiv.appendChild(newSerie);
    newDiv.appendChild(newPrix);
    newDiv.appendChild(newParagraphe);

    divInter2.appendChild(newDiv);
    divInter2.appendChild(newEnStock);
    divInter1.appendChild(divInter2);
    cardList.appendChild(divInter1);

   // filtre des auteurs et séries sans doublons
    if (tabAuteur.indexOf(auteur) === -1) {
      tabAuteur.push(auteur);
      // créer le bouton auteur
      const buttonAuteur = document.createElement("button");
      buttonAuteur.textContent = auteur;
      buttonAuteur.addEventListener("click", () => {
        filterSelection(auteur);
      });
      buttonAuteur.classList.add("btnTri");
      document.getElementById("myBtnContainer").appendChild(buttonAuteur);
    }
    if (tabSerie.indexOf(serie) === -1) {
      tabSerie.push(serie);
      // créer le bouton serie
      const buttonSerie = document.createElement("button");
      buttonSerie.textContent = serie;
      buttonSerie.addEventListener("click", () => {
        filterSelection(serie);
      });
      buttonSerie.classList.add("btnTri");
      document.getElementById("myBtnContainer").appendChild(buttonSerie);
    }
  }
}

// Concerne les outils de filtrage

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

//Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

//Add active class to the current control button(highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}








