document.addEventListener('DOMContentLoaded', function() {
    // --- Elemen-elemen Halaman ---
    const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html');
    const loginBox = document.getElementById('login-box');
    const welcomeBackBox = document.getElementById('welcome-back-box');
    const messageArea = document.getElementById('message-area');
    const googleLoginBtn = document.getElementById('google-login-btn');
	
    // --- Fungsi Helper untuk Menampilkan Pesan ---
    function showMessage(message, isError = false) {
        if (!messageArea) return;
        messageArea.textContent = message;
        messageArea.style.backgroundColor = isError ? '#c70000' : 'var(--moe)';
        messageArea.classList.add('show');
        setTimeout(() => { messageArea.classList.remove('show'); }, 4000);
    }

    // --- PEMERIKSA STATUS LOGIN UTAMA ---
    // !!! PERBAIKAN: Listener sekarang ada di level atas, langsung berjalan saat halaman dimuat !!!
    auth.onAuthStateChanged(user => {
        if (user) {
            // Pengguna sudah login
            console.log('User is logged in:', user.displayName);

            // --- ▼▼▼ KODE PRESENCE DITAMBAHKAN ▼▼▼ ---
            // Pastikan rtdb (dari firebase-init.js) sudah terdefinisi
            if (typeof rtdb !== 'undefined') {
                // Buat referensi ke path status pengguna
                const userStatusRef = rtdb.ref('/onlineUsers/' + user.uid);
                
                // Set status jadi online
                userStatusRef.set(true);
                
                // Atur 'onDisconnect' untuk menghapus status ini
                // Ini akan berjalan otomatis saat tab ditutup atau koneksi putus
                userStatusRef.onDisconnect().remove();
            }
            if (isIndexPage && welcomeBackBox) {
                if (loginBox) loginBox.style.display = 'none'; // Sembunyikan login box
                document.getElementById('welcome-username').textContent = user.displayName;
                welcomeBackBox.style.display = 'block'; // Tampilkan welcome box
            }
        } else {
            // Pengguna logged out
            console.log('User is logged out.');
            if (!isIndexPage) {
                // Jika mencoba akses halaman lain tanpa login, paksa ke index.html
                window.location.href = '/index.html'; 
            } else {
                // Jika di halaman index, tampilkan login box
                if (loginBox) loginBox.style.display = 'block';
                if (welcomeBackBox) welcomeBackBox.style.display = 'none';
            }
        }
    });

    // --- Event Listener untuk Tombol Login ---
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            showMessage('Membuka jendela login Google...', false);

            auth.signInWithPopup(provider)
                .then((result) => {
                    const user = result.user;
                    showMessage(`Selamat datang, ${user.displayName}! Mengalihkan...`, false);
                    // Tidak perlu redirect manual, onAuthStateChanged akan menanganinya
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