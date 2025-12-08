document.addEventListener('DOMContentLoaded', async () => {
    const mainContainer = document.querySelector('.mv-group-container');
    if (!mainContainer) return;
    mainContainer.innerHTML = '<p style="color:white;text-align:center;">Memuat data MV...</p>';
    const jsonPath = '../store/single/songall_random.json';
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const songs = await response.json();
        if (!Array.isArray(songs) || songs.length === 0) {
            mainContainer.innerHTML = '<p style="color:white;text-align:center;">Tidak ada MV yang tersedia saat ini.</p>';
            return;
        }
        const songListHTML = songs.map(song => {
            const {
                titleJp = 'N/A',
                titleRo = 'Unknown Title',
                ArtistJp = 'N/A',
                ArtistRo = 'Unknown Artist',
                thumb,  
                LinkDownMV
            } = song;
            if (!LinkDownMV) {
                return '';
            }
            let thumbnailHTML = '';
            if (thumb) {
                const thumbnailUrl = `https: 
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