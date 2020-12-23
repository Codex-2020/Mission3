var modal = document.getElementById("myModal");
var btn = document.getElementById("createProject");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//Choix du commercial et client
var commercialChoice = document.formCreateProject.commercialChoice;
var clientChoice = document.formCreateProject.clientChoice;

function populateSelect(selectInput, count) {
  for (let index = 0; index < count; index++) {
    selectInput.options[index] = new Option(
      faker.fake("{{name.firstName}} {{name.lastName}}"),
      index
    );
  }
}

//Validation formulaire

function submitForm() {
  var nomProjet = document.formCreateProject.projectName.value;
  var codeProjet = document.formCreateProject.codeProjet.value;
  var typeProjet = document.formCreateProject.typeProjet.value;
  var chargeEstimee = document.formCreateProject.chargeEstimee.value;
  var nomContact = document.formCreateProject.commercialChoice.value;
  var nomClient = document.formCreateProject.clientChoice.value;
  var datePrevDeb = document.formCreateProject.dateDebut.value;
  var datePrevFin = document.formCreateProject.dateFin.value;

  var array = {
    nomProjet,
    codeProjet,
    typeProjet,
    chargeEstimee,
    nomContact,
    nomClient,
    datePrevDeb,
    datePrevFin,
  };

  console.log(array);
}

//Faker.js

faker.locale = "fr";

//Lancement des fonctions

populateSelect(commercialChoice, 10);
populateSelect(clientChoice, 15);
