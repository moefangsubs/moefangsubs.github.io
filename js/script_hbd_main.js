document.addEventListener('DOMContentLoaded', function() {
    // ---- LOGIKA ANIMASI SPRITE HBD (SUDAH ADA) ----
    const spriteContainer = document.getElementById('sprite-container');
    if (spriteContainer) {
        const spriteImages = [
            'https://ik.imagekit.io/moearchive/web/kakki/kakki_uchiwa.png',
            'https://ik.imagekit.io/moearchive/web/kakki/kakki_orange.png',
            'https://ik.imagekit.io/moearchive/web/kakki/kakki_ebi.png',
            'https://ik.imagekit.io/moearchive/web/kakki/kakki_pencil.png',
            'https://ik.imagekit.io/moearchive/web/kakki/kakki_isee.png',
            'https://ik.imagekit.io/moearchive/web/kakki/kakki_penlight.png'
        ];

        // Untuk melacak gambar yang sedang aktif di layar
        const activeSprites = new Set();

        function createSprite() {
            // 1. Saring gambar, ambil hanya yang TIDAK sedang aktif
            const availableImages = spriteImages.filter(img => !activeSprites.has(img));

            // 2. Jika tidak ada gambar unik yang tersisa, jangan buat sprite baru
            if (availableImages.length === 0) {
                return;
            }

            const sprite = document.createElement('img');
            sprite.classList.add('sprite');

            // 3. Pilih gambar dari daftar yang sudah disaring (bukan dari daftar asli)
            const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
            sprite.src = randomImage;

            // 4. Tandai gambar ini sebagai aktif dengan menambahkannya ke pelacak
            activeSprites.add(randomImage);

            sprite.style.left = `${Math.random() * 100}vw`;
            const randomSize = Math.random() * 500 + 500;
            sprite.style.width = `${randomSize}px`;
            sprite.style.height = 'auto';
            const randomSpeed = Math.random() * 11 + 4;
            sprite.style.animationDuration = `${randomSpeed}s`;

            spriteContainer.appendChild(sprite);

            sprite.addEventListener('animationend', () => {
                // 5. Saat animasi selesai, hapus gambar dari pelacak agar bisa digunakan lagi
                activeSprites.delete(sprite.src);
                sprite.remove();
            });
        }
        setInterval(createSprite, 700);
    }

    // ---- LOGIKA ANIMASI SPARK (DARI MOEPLAY) ----
    const sparkContainer = document.getElementById('spark-container');
    if (sparkContainer) {
        // Path gambar disesuaikan, '../' dihapus
        const sparkImages = [
            'sprite/element/spark1.svg',
            'sprite/element/spark2.svg',
            'sprite/element/spark3.svg',
            'sprite/element/spark4.svg',
            'sprite/element/spark5.svg',
            'sprite/element/spark6.svg'
        ];
        
        const sparkCount = 15;
        const specificSizes = [50, 25, 15, 5];

        function createSpark() {
            const spark = document.createElement('img');
            spark.src = sparkImages[Math.floor(Math.random() * sparkImages.length)];
            spark.classList.add('spark');
            const size = specificSizes[Math.floor(Math.random() * specificSizes.length)];
            spark.style.width = `${size}px`;
            spark.style.height = `${size}px`;
            spark.style.left = `${Math.random() * 100}vw`;
            spark.style.top = `${Math.random() * 100}vh`;
            spark.style.animationDuration = `${Math.random() * 1 + 1}s`;
            spark.addEventListener('animationend', () => {
                spark.remove();
                createSpark();
            });
            sparkContainer.appendChild(spark);
        }

        for (let i = 0; i < sparkCount; i++) {
            setTimeout(createSpark, Math.random() * 2000);
        }
    }
});