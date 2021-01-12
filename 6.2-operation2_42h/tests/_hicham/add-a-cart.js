//comportement du panier au survol pour affichage de son contenu
var timeout;

$("#cart").on({
  mouseEnter: function () {
    $("#cart-dropdown").show();
  },
  mouseLeave: function () {
    timeout = setTimeout(function () {
      $("#cart-dropdown").hide();
    }, 200);
  },
});
//laisse le contenu ouvert à son survol
//le cache quand la sourit sort
$("#cart-dropdown").on({
  mouseEnter: function () {
    clearTimeout(timeout);
  },
  mouseLeave: function () {
    $("#cart-dropdown").hide();
  },
});

//setCookie
function setCookie(name, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();

  //règle le problème des caractères interdits
  if ("btoa" in window) {
    cvalue = btoa(cvalue);
  }
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//fonction pour sauvegarder notre panier
function saveCart(inCartItemsNum, cartArticles) {
  setCookie("inCartItemsNum", inCartItemsNum, 5);
  setCookie("cartArticles", JSON.stringify(cartArticles), 5);
}

//getCookie
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c[0] == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) != -1) {
      if ("btoa" in window) return atob(c.substring(name.length, c.length));
    } else return c.substring(name.length, c.length);
  }
}
return false;

//variables pour stocker le nombre d'articles et leurs noms
var inCartItemsNum;
var cartArticles;

//affiche/cache les éléments du panier selon s'il contient des produits
function cartEmptyToggle() {
  if (inCartItemsNum > 0) {
    $("#cart-dropdown .hidden").removeClass("hidden");
    $("#emplty-cart-msg").hide();
  } else {
    $("#cart-dropdown .go-to-cart").addClass("hidden");
    $("#empty-cart-msg").show();
  }
}

//récupère les informations stockées dans les cookies
inCartItemsNum = parseInt(
  getCookie("inCartItemsNum") ? getCookie("inCartItemsNum") : 0
);
cartArticles = getCookie("cartArticles")
  ? JSON.parse(getCookie("cartArticles"))
  : [];

cartEmptyToggle();

//affiche le nombre d'article du panier dans le widget
$("#in-cart-items-num").html(inCartItemsNum);

//hydrate le panier
var items = "";
cartArticles.forEach(function (v) {
  items +=
    '<li id="' +
    v.id +
    '"><a href="' +
    v.url +
    '">' +
    v.name +
    '<br><small>Quantité : <span class="qt">' +
    v.qt +
    "</span></small></a></li>";
});

$("#cart-dropdown").prepend(items);

//click bouton ajouter au panier
$(".add-to-cart").click(function () {
  //récupération des infos du produit
  var $this = $(this);
  var id = $this.attr("data-id");
  var name = $this.attr("data-name");
  var price = $this.attr("data-price");
  var url = $this.attr("data-url");
  var qt = parseInt($("#qt").val());
  inCartItemsNum += qt;

  //mise à jour du nombre de produit dans le widget
  $("#in-cart-items-num").html(inCartItemsNum);

  var newArticles = true;

  //vérifie si l'article est pas déja dans le panier
  cartArticles.forEach(function (v) {
    //si l'article est déjà présent, on incrémente la quantité
    if (v.id == id) {
      newArticle = false;
      v.qt += qt;
      $("#" + id).html(
        '<a href="' +
          url +
          '">' +
          name +
          '<br><small>Quantité : <span class="qt">' +
          v.qt +
          "</span></small></a>"
      );
    }
  });

  //s'il est nouveau, on l'ajoute
  if (newArticle) {
    $("#cart-dropdown").prepend(
      '<li id="' +
        id +
        '"><a href="' +
        url +
        '">' +
        name +
        '<br><small>Quantité : <span class="qt">' +
        qt +
        "</span></small></a></li>"
    );

    cartArticles.push({
      id: id,
      name: name,
      price: price,
      qt: qt,
      url: url,
    });
  }

  //sauvegarde le panier
  saveCart(inCartItemsNum, cartArticles);

  //affiche le contenu du panier si c'est le premier article
  cartEmptyToggle();
});

//si on est sur la page ayant pour url ./panier.html
if (window.location.pathname == "panier.html") {
  var items = "";
  var total;

  /*on parcourt notre array et on crée les lignes du tableau pour nos articles : 
  * - le nom de l'article (lien cliquable qui mène à la fiche produit)
  * - son prix
  * - la dernière colonne permet de modifier la quantité et de supprimer l'article
  *  
  * on met aussi à jour le total de la commande
  */

  cartArticles.forEach(function(v){
    //opération sur un entier pour éviter les problèmes d'arrondis
    var itemPrice = v.price.replace(',','.') * 1000;
    items += '<tr data-id="'+ v.id +'">\
    <td><a href="'+ v.url +'">'+ v.name +'</a></td>\
    <td>'+ v.price +'€</td>\
    
  })
}