const firebaseConfig = {
  apiKey: "AIzaSyDp6LHXi1-dmTKDq4eL_GB12mm_JFfeGfM",
  authDomain: "moefangsubs-ngz46.firebaseapp.com",
  databaseURL: "https://moefangsubs-ngz46-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "moefangsubs-ngz46",
  storageBucket: "moefangsubs-ngz46.firebasestorage.app",
  messagingSenderId: "124881237230",
  appId: "1:124881237230:web:360929b3c82ea9c17eefff",
  measurementId: "G-V4L9TSQGTH"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const rtdb = firebase.database();


document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const isIndexPage = path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('moefangsubs.github.io'); 

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('Security Check: User is logged in:', user.displayName);
            if (typeof rtdb !== 'undefined') {
                const userStatusRef = rtdb.ref('/onlineUsers/' + user.uid);
                userStatusRef.set(true);
                userStatusRef.onDisconnect().remove();
            }
            const loginBox = document.getElementById('login-box');
            const welcomeBackBox = document.getElementById('welcome-back-box');
            const usernameDisplay = document.getElementById('welcome-username');
            
            if (isIndexPage && welcomeBackBox) {
                if (loginBox) loginBox.style.display = 'none'; 
                if (usernameDisplay) usernameDisplay.textContent = user.displayName;
                welcomeBackBox.style.display = 'block'; 
            }
            if (typeof fetchTrakteerUrlAndInject === 'function') {
                fetchTrakteerUrlAndInject();
            }

        } else {
            console.log('Security Check: User is logged out.');
            
            if (!isIndexPage) {
                console.warn('Akses ilegal terdeteksi. Mengalihkan ke halaman login...');
                window.location.href = 'https://moefangsubs.github.io/index.html'; 
            } else {
                const loginBox = document.getElementById('login-box');
                const welcomeBackBox = document.getElementById('welcome-back-box');
                if (loginBox) loginBox.style.display = 'block';
                if (welcomeBackBox) welcomeBackBox.style.display = 'none';
            }
        }
    });

    // --- EVENT LISTENER TOMBOL LOGIN (Opsional, agar tombol tetap jalan) ---
    const googleLoginBtn = document.getElementById('google-login-btn');
    const messageArea = document.getElementById('message-area');
    
    function showMessage(msg, isErr) {
        if(!messageArea) return;
        messageArea.textContent = msg;
        messageArea.style.backgroundColor = isErr ? '#c70000' : 'var(--moe)';
        messageArea.classList.add('show');
        setTimeout(() => messageArea.classList.remove('show'), 4000);
    }

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            if(typeof showMessage === 'function') showMessage('Membuka jendela login...', false);
            auth.signInWithPopup(provider).catch(error => {
                console.error(error);
                if(typeof showMessage === 'function') showMessage('Gagal login.', true);
            });
        });
    }
});
