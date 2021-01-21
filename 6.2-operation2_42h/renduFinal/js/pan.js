//Fonction pour récupérer et lire un cookie
function getCookies(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c[0] == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            if ('atob' in window) {
                return atob(c.substring(name.length, c.length));
            }
            else {
                return c.substring(name.length, c.length);

            }
        }
    }
    return false;
}

//Récupération du coockie et recomposition des infos
recupCookie = getCookies('cartArticles');
let recupBoucle = recupCookie.split('}')
let recupChaqueBd = [];
let idBd = "";
let bd = new Map();
let PourFacture = [];
let totalTTC = [];
let qtArray = [];
let prixArray = [];
let titreArray = [];
let iterator1 = bd.entries(1);
let totalFinal = "";


for (let i = 0; i <= recupBoucle.length - 2; i++) {

    if (i == 0) {
        recupChaqueBd = recupBoucle[i].split(',');

        idBd = recupChaqueBd[0].split(':');
        idBdSlice1 = idBd[1].slice(1, -1);

        nameBd = recupChaqueBd[1].split(':');
        nameBdSlice1 = nameBd[1].slice(1, -1);

        prixBd = recupChaqueBd[2].split(':');
        prixBdSlice1 = prixBd[1].slice(1, -1);


        qtBd = recupChaqueBd[3].split(':');
        qtBdSlice1 = qtBd[1].slice(0, 1);


        bd.set([["id", idBdSlice1], ["name", nameBdSlice1], ["prix", prixBdSlice1], ["qt", qtBdSlice1]]);

    }

    else {

        recupChaqueBd = recupBoucle[i].split(',');

        idBd = recupChaqueBd[1].split(':');
        idBdSlice1 = idBd[1].slice(1, -1);

        nameBd = recupChaqueBd[2].split(':');
        nameBdSlice1 = nameBd[1].slice(1, -1);

        prixBd = recupChaqueBd[3].split(':');
        prixBdSlice1 = prixBd[1].slice(1, -1);

        qtBd = recupChaqueBd[4].split(':');
        qtBdSlice1 = qtBd[1].slice(0, 1);

        bd.set([["id", idBdSlice1], ["name", nameBdSlice1], ["prix", prixBdSlice1], ["qt", qtBdSlice1]]);

    }
}


function Maboul() {

    let bdFacturable = iterator1.next().value;
    let infoBdFacturable = bdFacturable[0];
    let nameFacturableExtrait = infoBdFacturable[1];
    let prixFacturableExtrait = infoBdFacturable[2];
    let qtFacturableExtrait = infoBdFacturable[3];
    let total = prixFacturableExtrait[1] * qtFacturableExtrait[1];
    totalTTC.push(total);
    qtArray.push(qtFacturableExtrait[1]);
    prixArray.push(prixFacturableExtrait[1]);
    titreArray.push(nameFacturableExtrait[1]);
}

bd.forEach(Maboul);


const reducer = (accumulator, currentValue) => accumulator + currentValue;
TotalTTCFacture = totalTTC.reduce(reducer);

//Affichage contenu du panier
const cmdFinale = document.getElementById('commande');
let iArray = [];

for (let i = 0; i <= qtArray.length - 1; i++) {

    let recapCommande = document.createElement("p");
    recapCommande.innerHTML = `
    <div id="input_div${i}"> <span>${titreArray[i]}</span> - 
    <input type="button" value="-" id="moins" onclick="minus${i}()">
    <input type="text" size="8" value="${qtArray[i]}" id="count${i}">
        <input type="button" value = "+" id = "plus" onclick = "plus${i}()" >
     - PU :  ${prixArray[i]} € </div >`;
    cmdFinale.appendChild(recapCommande);
    iArray.push(i);
}


//Ajout ou retrait d'unité de livre
let counter = "";
let countEl = "";
let count = qtArray[0];
let count1 = qtArray[1];
let count2 = qtArray[2];
let count3 = qtArray[3];
let count4 = qtArray[4];
let count5 = qtArray[5];
let count6 = qtArray[6];
let count7 = qtArray[7];
let count8 = qtArray[8];
let count9 = qtArray[9];
let Vqt = qtArray[0];
let Vqt1 = qtArray[1];
let Vqt2 = qtArray[2];
let Vqt3 = qtArray[3];
let Vqt4 = qtArray[4];
let Vqt5 = qtArray[5];
let Vqt6 = qtArray[6];
let Vqt7 = qtArray[7];
let Vqt8 = qtArray[8];
let Vqt9 = qtArray[9];



countEl = document.getElementById('count0');
countEl1 = document.getElementById('count1');
countEl2 = document.getElementById('count2');
countEl3 = document.getElementById('count3');
countEl4 = document.getElementById('count4');
countEl5 = document.getElementById('count5');
countEl6 = document.getElementById('count6');
countEl7 = document.getElementById('count7');
countEl8 = document.getElementById('count8');
countEl9 = document.getElementById('count9');

function plus0() {
    count++;
    countEl.value = count;
    qt = document.getElementById('count0');
    Vqt = qt.value;
    NewTotalFinal()


}
function minus0() {
    if (count > 0) {
        count--;
        countEl.value = count;
        qt = document.getElementById('count0');
        Vqt = qt.value;
        NewTotalFinal()

    }
}
function plus1() {
    count1++;
    countEl1.value = count1;
    qt1 = document.getElementById('count1');
    Vqt1 = qt1.value;
    NewTotalFinal()
}
function minus1() {
    if (count1 > 0) {
        count1--;
        countEl1.value = count1;
        qt1 = document.getElementById('count1');
        Vqt1 = qt1.value;
        console.log(Vqt1);
        NewTotalFinal()
    }
}
function plus2() {
    count2++;
    countEl2.value = count2;
    qt2 = document.getElementById('count2');
    Vqt2 = qt2.value;
    NewTotalFinal()
}
function minus2() {
    if (count2 > 0) {
        count2--;
        countEl2.value = count2;
        qt2 = document.getElementById('count2');
        Vqt2 = qt2.value;
        NewTotalFinal()
    }
}
function plus3() {
    count3++;
    countEl3.value = count3;
    qt3 = document.getElementById('count3');
    Vqt3 = qt3.value;
    NewTotalFinal()
}
function minus3() {
    if (count3 > 0) {
        count3--;
        countEl3.value = count3;
        qt3 = document.getElementById('count3');
        Vqt3 = qt3.value;
        NewTotalFinal()
    }
}
function plus4() {
    count4++;
    countEl4.value = count4;
    qt4 = document.getElementById('count4');
    Vqt4 = qt4.value;
    NewTotalFinal()
}
function minus4() {
    if (count4 > 0) {
        count4--;
        countEl4.value = count4;
        qt4 = document.getElementById('count4');
        Vqt4 = qt4.value;
        NewTotalFinal()
    }
}
function plus5() {
    count5++;
    countEl5.value = count5;
    qt5 = document.getElementById('count5');
    Vqt5 = qt5.value;
    NewTotalFinal()
}
function minus5() {
    if (count5 > 0) {
        count5--;
        countEl5.value = count5;
        qt5 = document.getElementById('count5');
        Vqt5 = qt5.value;
        NewTotalFinal()
    }
}
function plus6() {
    count6++;
    countEl6.value = count6;
    qt6 = document.getElementById('count6');
    Vqt6 = qt6.value;
    NewTotalFinal()
}
function minus6() {
    if (count6 > 0) {
        count6--;
        countEl6.value = count6;
        qt6 = document.getElementById('count6');
        Vqt6 = qt6.value;
        NewTotalFinal()
    }
}
function plus7() {
    count7++;
    countEl7.value = count7;
    qt7 = document.getElementById('count7');
    Vqt7 = qt7.value;
    NewTotalFinal()
}
function minus7() {
    if (count7 > 0) {
        count7--;
        countEl7.value = count7;
        qt7 = document.getElementById('count7');
        Vqt7 = qt7.value;
        NewTotalFinal()
    }
}
function plus8() {
    count8++;
    countEl8.value = count8;
    qt8 = document.getElementById('count8');
    Vqt8 = qt8.value;
    NewTotalFinal()
}
function minus8() {
    if (count8 > 0) {
        count8--;
        countEl8.value = count8;
        qt8 = document.getElementById('count8');
        Vqt8 = qt8.value;
        NewTotalFinal()
    }
}
function plus9() {
    count9++;
    countEl9.value = count9;
    qt9 = document.getElementById('count9');
    Vqt9 = qt9.value;
    NewTotalFinal()
}
function minus9() {
    if (count9 > 0) {
        count9--;
        countEl9.value = count9;
        qt9 = document.getElementById('count9');
        Vqt9 = qt9.value;
        NewTotalFinal()
    }
}



function NewTotalFinal() {


    if (prixArray.length == 1) {
        totalFinal = Vqt * prixArray[0];

    }
    if (prixArray.length == 2) {
        totalFinal = Vqt * prixArray[0] + Vqt1 * prixArray[1];
    }
    if (prixArray.length == 3) {
        totalFinal = Vqt * prixArray[0] + Vqt1 * prixArray[1] + Vqt2 * prixArray[2];
    }
    if (prixArray.length == 4) {
        totalFinal = Vqt * prixArray[0] + Vqt1 * prixArray[1] + Vqt2 * prixArray[2] + Vqt3 * prixArray[3];
    }
    if (prixArray.length == 5) {
        totalFinal = Vqt * prixArray[0] + Vqt1 * prixArray[1] + Vqt2 * prixArray[2] + Vqt3 * prixArray[3] + Vqt4 * prixArray[4];
        console.log(totalFinal);
    }
    if (prixArray.length == 6) {
        totalFinal = Vqt * prixArray[0] + Vqt1 * prixArray[1] + Vqt2 * prixArray[2] + Vqt3 * prixArray[3] + Vqt4 * prixArray[4] + Vqt5 * prixArray[5];
    }
    if (prixArray.length == 7) {
        totalFinal = Vqt * prixArray[0] + Vqt1 * prixArray[1] + Vqt2 * prixArray[2] + Vqt3 * prixArray[3] + Vqt4 * prixArray[4] + Vqt5 * prixArray[5] + Vqt6 * prixArray[6];
    }
    if (prixArray.length == 8) {
        totalFinal = Vqt * prixArray[0] + Vqt1 * prixArray[1] + Vqt2 * prixArray[2] + Vqt3 * prixArray[3] + Vqt4 * prixArray[4] + Vqt5 * prixArray[5] + Vqt6 * prixArray[6] + Vqt7 * prixArray[7];
    }
    if (prixArray.length == 9) {
        totalFinal = Vqt * prixArray[0] + Vqt1 * prixArray[1] + Vqt2 * prixArray[2] + Vqt3 * prixArray[3] + Vqt4 * prixArray[4] + Vqt5 * prixArray[5] + Vqt6 * prixArray[6] + Vqt7 * prixArray[7] + Vqt8 * prixArray[8];
    }
    if (prixArray.length == 10) {
        totalFinal = Vqt * prixArray[0] + Vqt1 * prixArray[1] + Vqt2 * prixArray[2] + Vqt3 * prixArray[3] + Vqt4 * prixArray[4] + Vqt5 * prixArray[5] + Vqt6 * prixArray[6] + Vqt7 * prixArray[7] + Vqt8 * prixArray[8] + Vqt9 * prixArray[9];
    }

    totalCommande.innerHTML = `Total TTC : ${totalFinal} €`;
    TotalFinal.appendChild(totalCommande);



    //Suppression du panier à 0;
    if (Vqt == 0) {
        document.getElementById('input_div0').style.display = 'none';
    }

    if (Vqt1 == 0) {
        document.getElementById('input_div1').style.display = 'none';
    }

    if (Vqt2 == 0) {
        document.getElementById('input_div2').style.display = 'none';
    }

    if (Vqt3 == 0) {
        document.getElementById('input_div3').style.display = 'none';
    }
    if (Vqt4 === 0) {
        document.getElementById('input_div4').style.display = 'none';
    }
    if (Vqt5 == 0) {
        document.getElementById('input_div5').style.display = 'none';
    }
    if (Vqt6 == 0) {
        document.getElementById('input_div6').style.display = 'none';
    }
    if (Vqt7 == 0) {
        document.getElementById('input_div7').style.display = 'none';
    }
    if (Vqt8 == 0) {
        document.getElementById('input_div8').style.display = 'none';
    }
    if (Vqt9 == 0) {
        document.getElementById('input_div9').style.display = 'none';
    }

}

//Total panier initial
const TotalFinal = document.getElementById('total');
let totalCommande = document.createElement("p");
totalCommande.innerHTML = `Total TTC : ${TotalTTCFacture} €`;
TotalFinal.appendChild(totalCommande);

//Bouton Valider
function Validation() {

    sessionStorage.setItem("user_cart", totalFinal);
    window.event.returnValue = false;
    window.location = './payment.html';

}









