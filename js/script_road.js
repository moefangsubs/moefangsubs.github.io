document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('isometric-grid-container');

    // --- PENGATURAN DASAR ---
    const vectorCol = { x: 150.05, y: 87.41 }; 
    const vectorRow = { x: -150.05, y: 87.41 };
    
    const assetMap = { 
	'r0tlbr': 'road1.png',
	'build0': 'build0.png',
	
	};
    const layout = [
        ['r0tlbr', 'r0tlbr', 'r0tlbr', 'r0tlbr', 'r0tlbr'],
        ['r0tlbr', 'r0tlbr', 'build0', 'r0tlbr', 'r0tlbr'],
        ['r0tlbr', 'r0tlbr', 'r0tlbr', 'r0tlbr', 'r0tlbr'],
        ['r0tlbr', 'r0tlbr', 'r0tlbr', 'r0tlbr', 'r0tlbr'],
    ];

    // BARU: Tentukan tile mana yang akan mendapatkan efek hover
    // Anda bisa menambahkan lebih banyak, misal: ['c3', 'd1']
    const specialTiles = ['c3'];

    const numRows = layout.length;
    const numCols = layout[0] ? layout[0].length : 0;

    // Hitung posisi awal (top-left) dari seluruh grid
    const gridOriginX = (numRows - 1) * vectorRow.x;
    const gridOriginY = 0; // Titik paling atas adalah di baris pertama
    
    // --- 1. LOGIKA PEMBUATAN GRID ---
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            // Posisi relatif terhadap kontainer, bukan layar
            const posX = (j * vectorCol.x) + (i * vectorRow.x) - gridOriginX;
            const posY = (j * vectorCol.y) + (i * vectorRow.y) - gridOriginY;
            const zIndex = (i * numCols) + j + 1;
            const rowChar = String.fromCharCode('a'.charCodeAt(0) + i);
            const tileID = `${rowChar}${j + 1}`;
            
            const tileContainer = document.createElement('div');
            tileContainer.className = 'grid-tile';
            tileContainer.style.left = `${posX}px`;
            tileContainer.style.top = `${posY}px`;
            tileContainer.style.zIndex = zIndex;

            // BARU: Tambahkan kelas efek hover jika tile ini spesial
            if (specialTiles.includes(tileID)) {
                tileContainer.classList.add('hover-effect');
            }

            const imgElement = document.createElement('img');
            imgElement.src = `../assets/${assetMap[layout[i][j]] || 'road1.svg'}`;
            
            const labelElement = document.createElement('span');
            labelElement.className = 'tile-label';
            labelElement.textContent = tileID;

            tileContainer.appendChild(imgElement);
            tileContainer.appendChild(labelElement);
            gridContainer.appendChild(tileContainer);
        }
    }

    // --- 2. LOGIKA INTERAKTIVITAS (PAN & ZOOM) ---
    const panzoomInstance = panzoom(gridContainer, {
        maxZoom: 2,
        minZoom: 0.2,
        // Menonaktifkan zoom dengan scroll mouse agar lebih fokus ke drag
        // Hapus baris ini jika Anda ingin zoom dengan scroll
        filterKey: () => true, 
    });

    // --- 3. LOGIKA AUTO-FIT RESPONSIVE ---
    function fitGridToScreen() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const gridRect = gridContainer.getBoundingClientRect();

        // Hitung skala yang dibutuhkan untuk fit lebar dan tinggi
        const scaleX = viewportWidth / gridRect.width;
        const scaleY = viewportHeight / gridRect.height;

        // Ambil skala terkecil agar seluruh grid terlihat (letterboxing)
        // Di layar vertikal (hape), scaleY akan lebih kecil -> fit tinggi
        // Di layar horizontal (desktop), scaleX akan lebih kecil -> fit lebar
        const scale = Math.min(scaleX, scaleY) * 0.95; // 0.95 untuk memberi sedikit padding

        // Hitung posisi untuk menengahkan grid
        const x = (viewportWidth - gridRect.width * scale) / 2;
        const y = (viewportHeight - gridRect.height * scale) / 2;

        // Gunakan API panzoom untuk mengaplikasikan posisi dan skala
        panzoomInstance.moveTo(x, y);
        panzoomInstance.zoomAbs(x, y, scale);
    }
    
    // Panggil fungsi fit saat pertama kali dimuat
    fitGridToScreen();
    // Panggil lagi jika ukuran window berubah
    window.addEventListener('resize', fitGridToScreen);

});