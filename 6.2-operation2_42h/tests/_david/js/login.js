function store(){

  let usermail = document.getElementById('user_mail');
  let userpassword = document.getElementById('user_password');
  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  let numbers = /[0-9]/g;

  if(usermail.value.length == 0){
      alert('Veuillez renseigner un mail');

  }else if(userpassword.value.length == 0){
      alert('Veuillez renseigner un mot de passe');

  }else if(usermail.value.length == 0 && userpassword.value.length == 0){
      alert('Veuillez renseigner un mail ET un mot de passe');

  }else if(userpassword.value.length < 8){
      alert('Le mot de passe doit contenir au moins 8 caractères');

  }else if(!userpassword.value.match(numbers)){
      alert('Le mot de passe doit contenir au moins un nombre');

  }else if(!userpassword.value.match(upperCaseLetters)){
      alert('Le mot de passe doit contenir au moins une lettre majuscule');

  }else if(!userpassword.value.match(lowerCaseLetters)){
      alert('Le mot de passe doit contenir au moins une lettre minuscule');
      
  }else{
      localStorage.setItem('user_mail', usermail.value);
      localStorage.setItem('user_password', userpassword.value);
      alert('Votre compte a bien été créé');
      location.href='./account.html';
      return false;
      
  }
  
}

//checking
function check(){
  let storedName = localStorage.getItem('user_mail');
  let storedPw = localStorage.getItem('user_password');

  let user_mail = document.getElementById('usermail');
  let user_password = document.getElementById('userpassword');
  let userRemember = document.getElementById("rememberMe");

  if(user_mail.value == storedName && user_password.value == storedPw){
    alert('Connexion réussie!');
    location.href='./account.html';
    return false;
      }
       
  else{
      alert('Erreur de connexion!');
  }
}


