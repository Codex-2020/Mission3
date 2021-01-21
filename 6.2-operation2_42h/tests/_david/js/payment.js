

//en attendant que toutes les pages soient communes
localStorage.setItem("user_firstname", "Nissim");
localStorage.setItem("user_name", "Djerouri");
localStorage.setItem("user_addres", "56 rue des daltoniens");
localStorage.setItem("user_city", "75000 Silicon Valley");



let b = document.body;
let userAddres = document.getElementById('user_addres');
let userCity = document.getElementById('user_city');
let userAddresDelivery = document.getElementById('user_addresd');
let userCityDelivery = document.getElementById('user_cityd');
let noDeliveryAddres = document.getElementById('noDeliveryAddres')
let addresB = document.getElementById('b-addres');
let addresD = document.getElementById('d-addres');
let deliveryEdit = document.getElementsByClassName('deliveryEdit');
let billingEdit = document.getElementsByClassName('billingEdit');

let enterSearch = document.querySelectorAll('.user-addres');
let check_btn = false;

//Regex contrôle saisie
let regString = new RegExp("^[A-Za-z0-9 \.\*\+\(\)'\?\!,@\$\#-]{1,1000}$");
let regMasterCard = new RegExp('^5[1-5][0-9]{14}$');
let regVisaCard = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
let regDate = new RegExp("^202[0-5]\-(0[0-9]|1[0-2])\-(0[0-9]|[1-2][0-9]|3[0-1])$");
let regCVV = new RegExp("^[0-9]{3,4}$");





//Gestion Checkbox-Affichage adresse de livraison
var checkbox = document.querySelector("input[id=addres_chk]");

checkbox.addEventListener('change', function () {
    if (this.checked) {

        check_btn = true;

        user_addres = sessionStorage.getItem('user_addres');
        user_city = sessionStorage.getItem('user_city');
        sessionStorage.setItem('user_addresd', user_addres);
        sessionStorage.setItem('user_cityd', user_city);
        document.getElementById("user_cityd").value = user_city;
        document.getElementById('user_addresd').value = user_addres;


        noDeliveryAddres.style.visibility = 'hidden';
        userCityDelivery.style.visibility = 'visible';
        userAddresDelivery.style.visibility = 'visible';


    } else {

        check_btn = false;

        noDeliveryAddres.style.visibility = 'visible';
        userCityDelivery.style.visibility = 'hidden';
        userAddresDelivery.style.visibility = 'hidden';
    }
});

//Edit adresses

function edit(what) {


    if (what == billingEdit) {
        console.log('edit fact');
        userAddres.removeAttribute("readonly");
        userCity.removeAttribute("readonly");
        addresB.style.border = '1px solid';
        validEdit()
    }

    else if (what == deliveryEdit && check_btn == false) {
        console.log('edit liv');

        noDeliveryAddres.style.visibility = 'hidden';
        userCityDelivery.style.visibility = 'visible';
        userAddresDelivery.style.visibility = 'visible';
        userAddresDelivery.removeAttribute("readonly");
        userCityDelivery.removeAttribute("readonly");
        addresD.style.border = '1px solid';
        validEdit()
    } else {
        console.log(' vous ne pouvez pas modifier l\'adresse si vous avez cocher la case même adresse de livraison et facturation');
        document.getElementById('cantAddres').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">                              
        <p class="msgError" >' vous ne pouvez pas modifier l\'adresse si vous avez cocher la case même adresse de livraison et facturation' </p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
     </div>`;
        userAddres.focus();
        userCity.focus();
        return false;
    }
}

function validEdit() {

    enterSearch.forEach(function (a) {
        a.addEventListener('keypress', function (e) {
            let key = e.which || e.keyCode;
            if (key === 13) {

                closeEdit()
            }
        })
    })

}

function closeEdit() {


    let NewUserAddres = document.getElementById('user_addres').value;
    let NewUserCity = document.getElementById('user_city').value;
    let NewAddres = regString.test(NewUserAddres);
    let NewCity = regString.test(NewUserCity);


    let NewUserAddresDelivery = document.getElementById('user_addresd').value;
    let NewUserCityDelivery = document.getElementById('user_cityd').value;
    let NewAddresDelivery = regString.test(NewUserAddresDelivery);
    let NewCityDelivery = regString.test(NewUserCityDelivery);

    user_addres = sessionStorage.getItem('user_addres');
    user_city = sessionStorage.getItem('user_city');
    user_addresd = sessionStorage.getItem('user_addresd');
    user_cityd = sessionStorage.getItem('user_cityd');



    if (NewAddres && NewCity && (NewUserAddres != user_addres || NewUserCity != user_city)) {

        console.log('close fact');

        sessionStorage.setItem('user_addres', NewUserAddres);
        sessionStorage.setItem('user_city', NewUserCity);


        user_addresd = NewUserAddres;
        user_cityd = NewUserCity;
        sessionStorage.setItem('user_addresd', user_addresd);
        sessionStorage.setItem('user_cityd', user_cityd);
        document.getElementById("user_cityd").value = user_cityd;
        document.getElementById('user_addresd').value = user_addresd;

        addresB.style.border = 'none';
        userAddres.setAttribute("readonly", "");
        userCity.setAttribute("readonly", "");


    }

    else if (NewAddresDelivery && NewCityDelivery && (NewUserAddresDelivery != user_addresd || NewUserCityDelivery != user_cityd)) {

        console.log('close liv');
        sessionStorage.setItem('user_addresd', NewUserAddresDelivery);
        sessionStorage.setItem('user_cityd', NewUserCityDelivery);
        addresD.style.border = 'none';
        userAddresDelivery.setAttribute("readonly", "");
        userCityDelivery.setAttribute("readonly", "");

        user_addresd = sessionStorage.getItem('user_addresd');
        user_cityd = sessionStorage.getItem('user_cityd');
        document.getElementById("user_cityd").value = user_cityd;
        document.getElementById('user_addresd').value = user_addresd;

    } else {
        console.log('close err')
        error()
    }

}

function error() {

    if (userCity.value == "" || userAddres.value == "") {
        document.getElementById('errorAddres').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">                              
        <p class="msgError" >Erreur de saisie </p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
     </div>`;
        userAddres.focus();
        userCity.focus();
        return false;
    }


    else if (userAddresDelivery.value == "" || userCityDelivery.value == "") {
        document.getElementById('errorAddress').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">                              
        <p class="msgError" >Erreur de saisie </p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
     </div>`;

        userAddresDelivery.focus();
        userCityDelivery.focus();
        return false;

    } else {
        document.getElementById('errorAddres').innerHTML = "";
        document.getElementById('errorAddress').innerHTML = "";
    }
}


//Contrôle saisie info bancaires

function orderValidation() {

    let cardNumber = document.getElementsByClassName('card-number')[0].value;
    let cardName = document.getElementsByClassName('card-name')[0].value;
    let cardDate = document.getElementsByClassName('card-date')[0].value;
    let cardCVV = document.getElementsByClassName('card-cvv')[0].value;




    let cardControl = (regMasterCard.test(cardNumber)) && regString.test(cardName) && regDate.test(cardDate) && regCVV.test(cardCVV);

    if (cardControl) {
        console.log('Toutes les infos bancaires sont ok')
        window.event.returnValue = false;
        window.location = './withdrawal.html';
    } else {
        alert('Un ou des champs sont mal remplis')

    }

}
