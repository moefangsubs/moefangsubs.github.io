// ../js/script_down_mv_random.js

document.addEventListener('DOMContentLoaded', async () => {
    // Target utama untuk menempatkan semua konten
    const mainContainer = document.querySelector('.mv-group-container');
    if (!mainContainer) return;

    // Tampilkan pesan loading awal
    mainContainer.innerHTML = '<p style="color:white;text-align:center;">Memuat data MV...</p>';

    const jsonPath = '../store/single/songall_random.json';

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const songs = await response.json();

        // Cek jika data kosong atau bukan array
        if (!Array.isArray(songs) || songs.length === 0) {
            mainContainer.innerHTML = '<p style="color:white;text-align:center;">Tidak ada MV yang tersedia saat ini.</p>';
            return;
        }

        // Buat HTML untuk setiap lagu
        const songListHTML = songs.map(song => {
            // Pastikan semua data yang dibutuhkan ada
            const {
                titleJp = 'N/A',
                titleRo = 'Unknown Title',
                ArtistJp = 'N/A',
                ArtistRo = 'Unknown Artist',
                thumb, // Ambil properti thumb
                LinkDownMV
            } = song;

            // Jika tidak ada link download, jangan tampilkan lagu
            if (!LinkDownMV) {
                return '';
            }

            // Buat elemen thumbnail jika 'thumb' ada
            let thumbnailHTML = '';
            if (thumb) {
                const thumbnailUrl = `https://ik.imagekit.io/mLsKqNSuB/post/mv/${thumb}.jpg`;
                thumbnailHTML = `
                    <li class="song-cover">
                        <img src="${thumbnailUrl}" 
                             alt="Thumbnail for ${titleRo}" 
                             style="height: 100px; width: auto; object-fit: contain;" 
                             loading="lazy">
                    </li>
                `;
            }

            return `
                <div class="single-container" style="border: none; padding: 0; margin-bottom: 0.5rem;">
                    <div class="songlist" style="width: 100%;">
                        <span class="mvv">
                            ${thumbnailHTML}
                            <li class="song-title">
                                <p class="jp">${ArtistRo}</p>
                                <p class="ro">${titleRo.toUpperCase()}</p>
                                <p class="jp">${ArtistJp} 「${titleJp}」</p>
                            </li>
                            <li class="song-download">
                                <a href="${LinkDownMV}" target="_blank" rel="noopener noreferrer"></a>
                            </li>
                        </span>
                    </div>
                </div>
            `;
        }).join('');

        // Masukkan semua HTML yang sudah dibuat ke dalam container utama
        if (songListHTML) {
            mainContainer.innerHTML = songListHTML;
        } else {
            mainContainer.innerHTML = '<p style="color:white;text-align:center;">Tidak ada MV yang bisa diunduh saat ini.</p>';
        }

    } catch (error) {
        console.error('Gagal memuat data MV:', error);
        mainContainer.innerHTML = '<p style="color:red;text-align:center;">Gagal memuat data. Silakan coba lagi nanti.</p>';
    }
});