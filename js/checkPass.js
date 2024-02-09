// checkPass.js
document.addEventListener("DOMContentLoaded", function() {
    // Mengambil nilai password dari localStorage
    var storedPassword = localStorage.getItem("enteredPassword");

    if (!storedPassword || storedPassword !== "MoeFang_Subs") {
        // Redirect ke index.html jika password tidak ada atau tidak benar
        window.location.href = "index.html";
    }
});
