
   console.log(localStorage.getItem('user_mail'));

   /*Afficher Mail actuel dans le compte*/
   document.getElementById('infoMailUser').innerHTML = localStorage.getItem('user_mail');
   /*Modifier l'adresse mail*/
   function store(){

      let usermail = document.getElementById('user_mail');
    
      if(usermail.value.length == 0){
          alert('Please fill in email');
          
      }else{
          localStorage.setItem('user_mail', usermail.value);
          alert('Votre Adresse mail a bien été modifiée');
          location.href='./account.html';
          return false;
          
      }
      
    }
   /*Enregistrer ou modifier Adresse*/
    function storeAddress(){

      let useraddress = document.getElementById('userAddress');
      let usercity = document.getElementById('userCityZip');
      let numbers = /[0-9]/g;
      if(useraddress.value.length == 0){
          alert('Veuillez renseigner votre numéro et nom de voie');
      }
      else if(usercity.value.length == 0){
            alert('Veuillez renseigner votre code postal et votre ville');
      }
      else if(useraddress.value.length == 0 && usercity.value.length == 0){
         alert('Veuillez renseigner une adresse complète');
     }
     else if(!usercity.value.match(numbers)){
      alert('Veuillez renseigner le code postal également');

  }
      else{
          localStorage.setItem('user_address', useraddress.value);
          localStorage.setItem('user_city', usercity.value);
          alert('Votre Adresse a bien été enregistrée');
          location.href='./account.html';
          return false;
          
      }
      
    }
   /*Afficher Adresse actuelle dans le compte*/
   document.getElementById('infoAddressUser').innerHTML = localStorage.getItem('user_address');
   document.getElementById('infoCityUser').innerHTML = localStorage.getItem('user_city');

   /*Enregistrer ou modifier Nom et prénom*/
   function storeIdentity(){

      let userfirstname = document.getElementById('userFirstName');
      let userlastname = document.getElementById('userLastName');
      if(userfirstname.value.length == 0){
          alert('Veuillez renseigner votre prénom');
      }
      else if(userlastname.value.length == 0){
            alert('Veuillez renseigner votre nom');
      }
      else if(userfirstname.value.length == 0 && userlastname.value.length == 0){
         alert('Veuillez renseigner votre Nom ET votre prénom');
     }
     
      else{
          localStorage.setItem('user_firstname', userfirstname.value);
          localStorage.setItem('user_name', userlastname.value);
          alert('Votre Nom et Prénom ont bien été enregistrés');
          location.href='./account.html';
          return false;
          
      }
      
    }
   /*Afficher Nom et prénom dans le compte*/
   document.getElementById('infoFirstNameUser').innerHTML = localStorage.getItem('user_firstname');
   document.getElementById('infoLastNameUser').innerHTML = localStorage.getItem('user_name');
