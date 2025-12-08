document.addEventListener('DOMContentLoaded', function() {
    const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html');
    const loginBox = document.getElementById('login-box');
    const welcomeBackBox = document.getElementById('welcome-back-box');
    const messageArea = document.getElementById('message-area');
    const googleLoginBtn = document.getElementById('google-login-btn');
    function showMessage(message, isError = false) {
        if (!messageArea) return;
        messageArea.textContent = message;
        messageArea.style.backgroundColor = isError ? '#c70000' : 'var(--moe)';
        messageArea.classList.add('show');
        setTimeout(() => { messageArea.classList.remove('show'); }, 4000);
    }
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('User is logged in:', user.displayName);
            if (typeof rtdb !== 'undefined') {
                const userStatusRef = rtdb.ref('/onlineUsers/' + user.uid);
                userStatusRef.set(true);
                userStatusRef.onDisconnect().remove();
            }
            if (isIndexPage && welcomeBackBox) {
                if (loginBox) loginBox.style.display = 'none';  
                document.getElementById('welcome-username').textContent = user.displayName;
                welcomeBackBox.style.display = 'block';  
            }
        } else {
            console.log('User is logged out.');
            if (!isIndexPage) {
                window.location.href = '/index.html'; 
            } else {
                if (loginBox) loginBox.style.display = 'block';
                if (welcomeBackBox) welcomeBackBox.style.display = 'none';
            }
        }
    });
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            showMessage('Membuka jendela login Google...', false);
            auth.signInWithPopup(provider)
                .then((result) => {
                    const user = result.user;
                    showMessage(`Selamat datang, ${user.displayName}! Mengalihkan...`, false);
                }).catch((error) => {
                    if (error.code === 'auth/popup-closed-by-user') {
                        showMessage('Jendela login ditutup sebelum selesai.', true);
                    } else {
                        showMessage('Gagal login dengan Google. Coba lagi.', true);
                    }
                    console.error("--- Google Sign-In Error ---");
                    console.error("Error Code:", error.code);
                    console.error("Error Message:", error.message);
                    console.error("--------------------------");
                });
        });
    }
});