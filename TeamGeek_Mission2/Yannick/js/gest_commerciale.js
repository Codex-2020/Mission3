document.getElementById("clientDetails").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "flex";
});

document.getElementById("closed").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "none";
});

let modal = document.getElementById("myModal");
let btn = document.getElementById("addAcustomer");
let span = document.getElementsByClassName("closed")[0];

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
