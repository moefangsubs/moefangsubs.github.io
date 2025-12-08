document.addEventListener('DOMContentLoaded', function() {
    const sparkContainer = document.getElementById('spark-container');
    if (!sparkContainer) return;

    const sparkImages = [
        '../sprite/element/spark1.svg',
        '../sprite/element/spark2.svg',
        '../sprite/element/spark3.svg',
        '../sprite/element/spark4.svg',
        '../sprite/element/spark5.svg',
        '../sprite/element/spark6.svg'
    ];
    
    // 1. Jumlah spark yang aktif di layar pada satu waktu
    const sparkCount = 15; 

    // 2. Ukuran spark spesifik sesuai permintaan terbaru
    const specificSizes = [50, 25, 15, 5];

    // Fungsi untuk membuat satu spark baru
    function createSpark() {
        const spark = document.createElement('img');
        
        spark.src = sparkImages[Math.floor(Math.random() * sparkImages.length)];
        spark.classList.add('spark');

        // Pilih ukuran acak dari daftar baru
        const size = specificSizes[Math.floor(Math.random() * specificSizes.length)];
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;

        // Atur posisi acak di seluruh layar
        spark.style.left = `${Math.random() * 100}vw`;
        spark.style.top = `${Math.random() * 100}vh`;
        
        // Durasi animasi "blink" tetap acak antara 1-2 detik
        spark.style.animationDuration = `${Math.random() * 1 + 1}s`; 

        // 3. Tambahkan "event listener" yang akan aktif saat animasi selesai
        spark.addEventListener('animationend', () => {
            // Hapus spark yang sudah selesai animasi
            spark.remove();
            // Buat spark baru untuk menggantikannya
            createSpark();
        });

        // Tambahkan spark yang baru dibuat ke dalam container
        sparkContainer.appendChild(spark);
    }

    // Panggil fungsi createSpark() sebanyak sparkCount untuk mengisi layar pertama kali
    for (let i = 0; i < sparkCount; i++) {
        // Beri sedikit delay acak agar tidak semua muncul bersamaan di awal
        setTimeout(createSpark, Math.random() * 2000);
    }
});