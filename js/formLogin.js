// formLogin.js

// Fungsi untuk memeriksa password
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
        }, 5000);
    }
}

// Pengecekan apakah user sudah pernah memasukkan password
document.addEventListener("DOMContentLoaded", function() {
    var storedPassword = localStorage.getItem("enteredPassword");

    // Tampilkan animasi loading selama 5 detik
    setTimeout(function() {
        if (storedPassword === "Hashimoto_Nanami@2017") {
            // Jika user sudah memasukkan password sebelumnya, redirect ke sitemap setelah 3 detik
            document.getElementById("loading-screen").style.display = "none";
            document.getElementById("loading-okay").style.display = "block";
            setTimeout(function() {
                window.location.href = "sitemap.html";
            }, 3000);
        } else {
            // Jika user belum pernah memasukkan password, tampilkan form login
            document.getElementById("loading-screen").style.display = "none";
            document.getElementById("main-container").style.display = "flex";
        }
    }, 5000);
});

// Fungsi untuk menampilkan atau menyembunyikan password
document.getElementById("togglePassword").addEventListener("click", function() {
    var passwordField = document.getElementById("password");
    var type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    this.textContent = type === "password" ? "👁️" : "🙈";
});

// Event listener untuk submit form
document.getElementById("passwordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    checkPassword();
});
