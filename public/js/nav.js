//................................. NAV BAR ITEM's RELATED CODES .................................//

function isLogin() {
    if (localStorage.getItem('user')) {
        const logiUserElement = document.querySelectorAll(".sesion-active");
        logiUserElement.forEach((userItem) => {
            userItem.style.display = 'block';
        });
        document.querySelector(".btn-login").style.display = 'none';
        
        return true
    } else {
        const logiUserElement = document.querySelectorAll(".sesion-inactive");
        logiUserElement.forEach((userItem) => {
            //userItem.style.display = 'none';
        });
        return false
    }
}

//Login Nav Item Related Code
addEventListener('DOMContentLoaded', () => {
    isLogin()
});


//Logout related code
const logoutLink = document.getElementById('logout_nav_item');

logoutLink.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html'
});