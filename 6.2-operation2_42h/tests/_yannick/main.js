if (localStorage.getItem('user_mail')) {
    document.getElementById('connectButton').style.display = "none";
    document.getElementById('userMsg').style.display = "block";
}

function logout(){
    localStorage.clear();
    location.href='./index.html';
    return false;
}