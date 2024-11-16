document.getElementById('search-input').addEventListener('input', search);

function search() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Bersihkan hasil sebelumnya

    // Jika query kurang dari 3 karakter, jangan tampilkan hasil apapun
    if (query.length < 3) {
        return; // Hentikan eksekusi jika panjang query kurang dari 3 karakter
    }

    const results = [];

    // Iterasi setiap show di searchData
    for (const show in searchData) {
        const showData = searchData[show];
        let title = showData.title || show; // Ambil title dari showData, fallback ke nama show

        // **Check if title has square brackets and remove them**
        if (title.startsWith('[') && title.endsWith(']')) {
            title = ''; // Hapus title untuk show yang memiliki tanda []
        }

        // Jika ada episodeRange, kita bangun episode secara dinamis
        if (showData.episodeRange) {
            const { start, end } = showData.episodeRange;
            for (let i = start; i <= end; i++) {
                const episode = i.toString().padStart(2, '0'); // Pastikan format 2 digit
                let episodeName;

                if (show === "Minna no Mameo" && episode === "00") {
                    episodeName = "Mangamichi (Minna no Mameo)"; // Ubah nama khusus untuk Episode 00
                } else if (show === "MTV") {
                    // Gunakan nama episode langsung dari showData.name tanpa menambahkan MTV lagi
                    episodeName = showData.name[episode]; // Ambil nama dari JSON tanpa mengubahnya
                } else {
                    episodeName = title ? `${title} Episode ${episode}` : `Episode ${episode}`; // Format default, tanpa title jika title kosong
                }

                // Cek jika query cocok dengan nama episode
                if (episodeName.toLowerCase().includes(query)) {
                    let fileExtension = 'jpg'; // Default file extension

                    // Jika episode ada di daftar pngEpisodes, gunakan format PNG
                    if (showData.pngEpisodes && showData.pngEpisodes.includes(i)) {
                        fileExtension = 'png';
                    }

                    let thumbnailUrl;

                    // Pengecualian untuk "Minna no Mameo" Episode 00
                    if (show === "Minna no Mameo" && episode === "00") {
                        thumbnailUrl = `${showData.thumbnailBaseUrl.slice(0, -1)}.jpg`; // Gunakan thumbnail khusus untuk 00
                    } else if (show === "Nogizaka Skits ACT 1" || show === "Nogizaka Skits ACT 2") {
                        thumbnailUrl = `${showData.thumbnailBaseUrl}${episode}a.${fileExtension}`; // Tambahkan "a" untuk Skits
                    } else if (show === "Gourmet no Sakamichi") {
                        thumbnailUrl = `${showData.thumbnailBaseUrl}${episode}alt.${fileExtension}`; // Gunakan "alt" untuk Gourmet
                    } else {
                        thumbnailUrl = `${showData.thumbnailBaseUrl}${episode}.${fileExtension}`; // Default URL thumbnail
                    }

                    results.push({
                        name: episodeName, // Gunakan episodeName yang sudah disesuaikan
                        url: `${showData.baseUrl}?episode=${episode}`,
                        thumbnail: thumbnailUrl // URL Thumbnail dengan pengecualian khusus
                    });
                }
            }
        } else if (Array.isArray(showData.episodes)) {
            // Tetap gunakan pola array jika ada episodes yang tidak berurutan
            showData.episodes.forEach(episode => {
                let thumbnailUrl = `${showData.thumbnailBaseUrl}${episode}.jpg`; // Default URL thumbnail

                // Pengecualian untuk episode "12"
                if (show === "Hinatazaka46 desu. Chotto ii desu ka?" && episode === "12") {
                    thumbnailUrl = `${showData.thumbnailBaseUrl}${episode}_2.jpg`;
                }
                if (show === "Nogizaka46 Yamazaki Rena to Ohatsu-chan" && episode === "07") {
                    thumbnailUrl = `${showData.thumbnailBaseUrl}05.jpg`;
                }

                const episodeName = title ? `${title} Episode ${episode}` : `Episode ${episode}`; // Jika title kosong, hanya tampilkan Episode

                // Cek jika query cocok dengan nama episode
                if (episodeName.toLowerCase().includes(query)) {
                    results.push({
                        name: `${title} Episode ${episode}`, // Gunakan title secara dinamis
                        url: `${showData.baseUrl}?episode=${episode}`,
                        thumbnail: thumbnailUrl // URL thumbnail dengan pengecualian khusus
                    });
                }
            });
        } else {
            // Penanganan khusus untuk [RANDOM] dan [MTV] yang memiliki nama episode dan thumbnail unik
            const names = showData.name;
            const thumbnails = showData.thumbnail;

            for (const episodeId in names) {
                const episodeName = title ? `${title} ${names[episodeId]}` : `${names[episodeId]}`; // Hanya gunakan nama episode jika title kosong

                // Cek jika query cocok dengan nama episode
                if (episodeName.toLowerCase().includes(query)) {
                    let thumbnailBaseUrl = showData.thumbnailBaseUrl;
                    let thumbnailFile = thumbnails[episodeId];

                    // Cek jika thumbnailFile adalah objek dan memiliki baseUrl
                    if (typeof thumbnailFile === 'object') {
                        if (thumbnailFile.thumbnailBaseUrl) {
                            thumbnailBaseUrl = thumbnailFile.thumbnailBaseUrl; // Gunakan baseUrl khusus jika ada
                        }
                        thumbnailFile = thumbnailFile.file; // Ambil file dari objek thumbnail
                    }

                    // Jika thumbnailFile bukan objek, kita ambil langsung
                    if (typeof thumbnailFile === 'string') {
                        // Tambahkan baseUrl jika thumbnailFile string
                        thumbnailBaseUrl = `${thumbnailBaseUrl}${thumbnailFile}`;
                    }

                    results.push({
                        name: episodeName, // Gunakan episodeName yang disesuaikan
                        url: `${showData.baseUrl}?episode=${episodeId}`, // URL berdasarkan ID episode
                        thumbnail: `${thumbnailBaseUrl}` // URL Thumbnail dengan baseUrl khusus jika ada
                    });
                }
            }
        }
    }

    if (results.length > 0) {
        results.forEach(item => {
            // Buat container untuk setiap hasil pencarian
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            // Buat elemen gambar thumbnail
            const img = document.createElement('img');
            img.src = item.thumbnail;
            img.alt = item.name;
            img.className = 'thumbnail';
            img.onclick = () => window.location.href = item.url; // Thumbnail bisa diklik

            // Buat elemen link teks
            const a = document.createElement('a');
            a.href = item.url;
            a.textContent = item.name;

            // Tambahkan gambar dan link ke resultItem
            resultItem.appendChild(img);
            resultItem.appendChild(a);

            // Tambahkan resultItem ke resultsContainer
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<div class="result-item">No results found</div>';
    }
}
