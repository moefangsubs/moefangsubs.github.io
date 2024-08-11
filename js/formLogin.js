// formLogin.js
// document.body.style.backgroundColor = '#1e0e00';

function checkPassword() {
    var passwordInput = document.getElementById("password");
    var password = passwordInput.value;
    var correctPassword = "Hashimoto_Nanami@2017";
    var placeholderText = passwordInput.getAttribute('placeholder');

    if (password === correctPassword) {
        localStorage.setItem("enteredPassword", password);
        window.location.href = "sitemap.html";
    } else {
        passwordInput.setAttribute('placeholder', 'WRONG PASSWORD :(');
        passwordInput.value = "";
        passwordInput.style.backgroundColor = "white";
        setTimeout(function() {
            passwordInput.style.backgroundColor = "";
            passwordInput.setAttribute('placeholder', placeholderText);
        }, 2000);
    }
}


document.getElementById("passwordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    checkPassword();
});

document.getElementById("togglePassword").addEventListener("click", function() {
    var passwordField = document.getElementById("password");
    var type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    this.textContent = type === "password" ? "👁️" : "🙈";
});

document.addEventListener('DOMContentLoaded', (event) => {
    const ifpernahDiv = document.querySelector('.ifpernah');
    
    ifpernahDiv.addEventListener('click', () => {
        window.location.href = 'sitemap.html';
    });
});
