// checkPass.js

document.addEventListener("DOMContentLoaded", function() {
    var storedPassword = localStorage.getItem("enteredPassword");
    if (!storedPassword || storedPassword !== "Hashimoto_Nanami@2017") {
        window.location.href = "index.html";
    }
});
