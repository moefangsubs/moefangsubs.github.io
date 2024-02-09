// formLogin.js

function checkPassword() {
    var password = document.getElementById("password").value;
    var correctPassword = "MoeFang_Subs";

    if (password === correctPassword) {
        // Simpan password di localStorage jika benar
        localStorage.setItem("enteredPassword", password);
        window.location.href = "sitemap.html";
    } else {
        var form = document.getElementById("passwordForm");
        form.reset();
        form.style.backgroundColor = "red";
        setTimeout(function() {
            form.style.backgroundColor = "";
        }, 2000);
    }
}
