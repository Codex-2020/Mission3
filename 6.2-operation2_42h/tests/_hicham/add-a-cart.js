//comportement du panier au survol pour affichage de son contenu
let timeout;
$("#cart").on({
  mouseenter: function () {
    $("#cart-dropdown").show();
  },
  mouseleave: function () {
    timeout = setTimeout(function () {
      $("#cart-dropdown").hide();
    }, 200);
  },
});

//laisse le contenu ouvert à son survol
//le cache quand la sourit sort
$("#cart-dropdown").on({
  mouseenter: function () {
    clearTimeout(timeout);
  },
  mouseleave: function () {
    $("#cart-dropdown").hide();
  },
});

//setCookie
function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();

  //règle le problème des caractères interdits
  if ("btoa" in window) {
    cvalue = btoa(cvalue);
  }
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function urldecode(url) {
  return decodeURIComponent(url.replace(/\+/g, " "));
}

//fonction pour sauvegarder notre panier
function saveCart(inCartItemsNum, cartArticles) {
  setCookie("inCartItemsNum", inCartItemsNum, 5);
  setCookie("cartArticles", JSON.stringify(cartArticles), 5);
}

//getCookie
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c[0] == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) != -1) {
      if ("btoa" in window) return atob(c.substring(name.length, c.length));
    } else return c.substring(name.length, c.length);
  }
  return false;
}

//variables pour stocker le nombre d'articles et leurs noms
let inCartItemsNum;
let cartArticles;
let orderId = [];

//affiche/cache les éléments du panier selon s'il contient des produits
function cartEmptyToggle() {
  if (inCartItemsNum > 0) {
    $("#cart-dropdown .hidden").removeClass("hidden");
    $("#empty-cart-msg").hide();
  } else {
    $("#cart-dropdown .go-to-cart,#cart-dropdown .go-to-cart").addClass(
      "hidden"
    );
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
orderId[0] = getCookie("orderId") ? getCookie("orderId") : 0;

cartEmptyToggle();

//affiche le nombre d'article du panier dans le widget
$("#in-cart-items-num").html(inCartItemsNum);

//hydrate le panier
let items = "";
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
  let $this = $(this);
  let id = $this.attr("data-id");
  let name = $this.attr("data-name");
  let price = $this.attr("data-price");
  let url = $this.attr("data-url");
  let qt = parseInt($("#qt").val());
  inCartItemsNum += qt;

  //mise à jour du nombre de produit dans le widget
  $("#in-cart-items-num").html(inCartItemsNum);

  let newArticle = true;

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

//si on est sur la page ayant pour url cart.html
if (window.location.pathname.indexOf("../cart.html/") !== -1) {
  let subTotal = 0;
  let shippingFrance = 5;
  let total;
  let items = "";

  setCartFromUrl();

  // test for adblocker
  $.post("/test-ajax/").always(function (data, textStatus, jqXHR) {
    // request must have been blocked by an add blocker
    if (jqXHR.status === 200 && jqXHR.responseText == "") {
      $("#add-blocker-alert").modal({ backdrop: "static" });
    }
  });

  /*on parcourt notre array et on crée les lignes du tableau pour nos articles :
   * - le nom de l'article (lien cliquable qui mène à la fiche produit)
   * - son prix
   * - la dernière colonne permet de modifier la quantité et de supprimer l'article
   *
   * on met aussi à jour le total de la commande
   */

  cartArticles.forEach(function (v) {
    //opération sur un entier pour éviter les problèmes d'arrondis
    let itemPrice = v.price.replace(",", ".") * 1000;
    items +=
      '<tr data-id="' +
      v.id +
      '">\
                   <td><a href="' +
      v.url +
      '">' +
      v.name +
      "</a></td><td>" +
      v.price +
      '€</td>\
                   <td><span class="qt">' +
      v.qt +
      '</span> <span class="qt-minus">–</span> <span class="qt-plus">+</span> \
                   <a class="delete-item pull-right">Supprimer</a></td></tr>';
    subTotal += itemPrice * v.qt;
  });

  //on reconverti notre résultat en décimal
  subTotal = subTotal / 1000;

  //on insère le contenu du tableau et le sous total
  $("#cart-tablebody").empty().html(items);
  $(".subtotal").html(subTotal.toFixed(2).replace(".", ","));
  $("#totalFrance").html(
    (subTotal + shippingFrance).toFixed(2).replace(".", ",")
  );

  //lorsqu'on clique sur le "+" du panier
  $(".qt-plus").on("click", function () {
    let $this = $(this);

    //on récupère la quantité actuelle et l'id de l'article
    let qt = parseInt($this.prevAll(".qt").html());
    let id = $this.parent().parent().attr("data-id");

    //met à jour la quantité
    inCartItemsNum += 1;
    $this.prevAll(".qt").html(qt + 1);
    $("#in-cart-items-num").html(inCartItemsNum);
    $("#" + id + " .qt").html(qt + 1);

    //met à jour cartArticles
    cartArticles.forEach(function (v) {
      // on incrémente la qt
      if (v.id == id) {
        v.qt += 1;

        //récupération du prix
        //on effectue tous les calculs sur des derniers
        subTotal =
          (subTotal * 1000 + parseFloat(v.price.replace(",", ".")) * 1000) /
          1000;
      }
    });

    //met à jour la quantité du widget et sauvegarde le panier
    $(".subtotal").html(subTotal.toFixed(2).replace(".", ","));
    saveCart(inCartItemsNum, cartArticles);
  });

  //quantité -
  $(".qt-minus").click(function () {
    let $this = $(this);
    let qt = parseInt($this.prevAll(".qt").html());
    let id = $this.parent().parent().attr("data-id");

    if (qt > 1) {
      //maj qt
      inCartItemsNum += 1;
      $this.prevAll(".qt").html(qt - 1);
      $("#in-cart-items-num").html(inCartItemsNum);
      $("#" + id + " .qt").html(qt - 1);

      cartArticles.forEach(function (v) {
        //on décrémente la qt
        if (v.id == id) {
          v.qt -= 1;

          //récupération du prix
          //on effectue tous les calculs sur des entiers
          subTotal =
            (subTotal * 1000 - parseFloat(v.price.replace(",", ".")) * 1000) /
            1000;
        }
      });

      $("subTotal").html(subTotal.toFixed(2).replace(".", ","));
      $("#totalFrance").html(
        (subTotal + shippingFrance).toFixed(2).replaced(".", ",")
      );
      saveCart(inCartItemsNum, cartArticles);
    }
  });

  //suppression d'un article
  $(".delete-item").click(function () {
    let $this = $(this);
    let id = $this.parent().parent().attr("data-id");
    let qt = parseInt($this.prevAll(".qt").html());
    let arrayId = 0;
    let price;

    //maj qt
    inCartItemsNum -= qt;
    $("#in-cart-items-num").html(inCartItemsNum);

    //supprime l'item du DOM
    $("#in-cart-items-num").html(inCartItemsNum);

    //supprime l'item du DOM
    $this.parent().parent().hide(600);
    $("#" + id).remove();

    cartArticles.forEach(function (v) {
      //on récupère l'id de l'article dans l'array
      if (v.id == id) {
        //on met à jour le sous total er retire l'article de l'array
        //calcul sur des entiers
        let itemPrice = v.price.replace(",", ".") * 1000;
        subTotal -= (itemPrice * qt) / 1000;
        cartArticles.splice(arrayId, 1);

        return false;
      }

      arrayId++;
    });

    $("subtotal").html(subTotal.toFixed(2).replace(".", ","));
    saveCart(inCartItemsNum, cartArticles);
    cartEmptyToggle();
  });
}

function getUrlVars() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");

    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }

  return query_string;
}

// const btn = document.querySelector("#btn");
// btn.addEventListener("click", () => {
//   const titre = "tintin";
//   const prix = 20;
//   const quantite = 2;

//   //query parameters
//   const url = `cart.html?titre=${titre}&prix=${prix}&quantite=${quantite}`;
//   location.replace(url);
// });

// const qparameters = location.href.split("?")[1];

// // iterate - key value pairs
// for (let pair of qparameters.split("&")) {
//   const [key, value] = pair.split("=");
//   console.log(key); //titre
//   console.log(value); // tintin

//   const tbody = document.querySelector("#cart-tablebody");

//   const td = document.createElement("td");
//   td.textContent = value;
//   tbody.appendChild(td);
// }
