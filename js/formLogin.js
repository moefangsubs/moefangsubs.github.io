// formLogin.js

    function checkPassword() {
        var password = document.getElementById("password").value;
        var correctPassword = "Hashimoto_Nanami@2017";

        if (password === correctPassword) {
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

    document.getElementById("passwordForm").addEventListener("submit", function(event) {
        event.preventDefault();
        checkPassword();
    });