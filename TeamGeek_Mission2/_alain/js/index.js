var btn = document.querySelector('input');
var txt = document.querySelector('p');

btn.addEventListener('click', updateBtn);

function updateBtn() {
  if (btn.value === 'Connexion') {
    btn.value = 'Déconnexion';
    txt.textContent = 'Vous êtes connecté';
  } else {
    btn.value = 'Connexion';
    txt.textContent = 'Vous êtes déconnecté';
  }
}