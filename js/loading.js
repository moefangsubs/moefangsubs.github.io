document.addEventListener('DOMContentLoaded', () => {

    const loadingBar = document.getElementById('loading-bar');

    // --- Konfigurasi Animasi ---
    const totalFrames = 10;
    const frameWidth = 150;
    
    // Diubah sesuai permintaan: 0.5 detik = 500 milidetik
    const frameDuration = 500; 

    let currentFrame = 0;

    // Menjalankan fungsi ini setiap 0.5 detik
    setInterval(() => {
        // Hitung posisi X untuk frame berikutnya
        const positionX = -(currentFrame * frameWidth);

        // Langsung lompat ke posisi background yang baru.
        // Ini akan menampilkan frame yang berbeda secara instan
        // karena tidak ada properti "transition" di CSS.
        loadingBar.style.backgroundPosition = `${positionX}px 0px`;

        // Siapkan frame selanjutnya untuk interval berikutnya
        currentFrame = (currentFrame + 1) % totalFrames;
        
    }, frameDuration);
});