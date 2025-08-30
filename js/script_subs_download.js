// File: ../js/script_subs_download.js
// Berisi fungsi untuk interaksi dengan Firestore (Download Count)

/**
 * Mengambil jumlah unduhan (hardsub & softsub) dari Firestore.
 * @param {string} episodeId - ID unik episode.
 * @returns {Promise<{hardsub: number, softsub: number}>}
 */
async function getDownloadCounts(episodeId) {
    try {
        const episodeRef = db.collection('episodes').doc(episodeId);
        const doc = await episodeRef.get();
        if (doc.exists) {
            const data = doc.data();
            return {
                hardsub: data.hardsubCount || 0,
                softsub: data.softsubCount || 0,
            };
        }
        // Jika dokumen belum ada, kembalikan 0
        return { hardsub: 0, softsub: 0 };
    } catch (error) {
        console.error("Error getting download counts:", error);
        // Jika terjadi error, anggap count 0 agar UI tidak rusak
        return { hardsub: 0, softsub: 0 };
    }
}

/**
 * Menambah +1 pada hitungan unduhan di Firestore.
 * @param {string} episodeId - ID unik episode.
 * @param {string} type - Tipe unduhan ('hardsub' atau 'softsub').
 */
async function incrementDownloadCount(episodeId, type) {
    // Pastikan user sudah login untuk bisa increment
    if (!auth.currentUser) {
        console.log("User not logged in. Download count will not be incremented.");
        return;
    }
    
    // Pastikan tipenya valid
    if (type !== 'hardsub' && type !== 'softsub') {
        console.error("Invalid download type:", type);
        return;
    }

    const episodeRef = db.collection('episodes').doc(episodeId);
    const increment = firebase.firestore.FieldValue.increment(1);
    
    // Gunakan 'set' dengan 'merge: true' untuk membuat dokumen jika belum ada,
    // atau memperbarui jika sudah ada.
    try {
        await episodeRef.set({
            [`${type}Count`]: increment
        }, { merge: true });
        console.log(`Successfully incremented ${type} count for ${episodeId}`);
    } catch (error) {
        console.error(`Failed to increment ${type} count:`, error);
    }
}

/**
 * Menginisialisasi fitur penghitung unduhan pada tombol.
 * @param {string} show - Nama file JSON acara.
 * @param {string} eps - Nomor episode.
 */
async function setupDownloadCounters(show, eps) {
    const episodeId = `${show}_eps_${eps}`;
    
    // Cari tombol berdasarkan ID yang akan kita tambahkan nanti
    const hardsubBtn = document.getElementById('hardsub-btn');
    const softsubBtn = document.getElementById('softsub-btn');
    
    // Ambil data awal dan perbarui UI
    const counts = await getDownloadCounts(episodeId);
    if (hardsubBtn) {
        const countSpan = hardsubBtn.querySelector('.download-count');
        if (countSpan) countSpan.textContent = counts.hardsub;
    }
    if (softsubBtn) {
        const countSpan = softsubBtn.querySelector('.download-count');
        if(countSpan) countSpan.textContent = counts.softsub;
    }

    // Fungsi untuk menangani event klik
    const handleDownloadClick = (event, type) => {
        // Hanya jalankan increment jika user sudah login
        if (auth.currentUser) {
            incrementDownloadCount(episodeId, type);

            // Update UI secara langsung untuk respons instan
            const btn = type === 'hardsub' ? hardsubBtn : softsubBtn;
            if (btn) {
                const countSpan = btn.querySelector('.download-count');
                if (countSpan) {
                    const currentCount = parseInt(countSpan.textContent, 10) || 0;
                    countSpan.textContent = currentCount + 1;
                }
            }
        }
    };
    
    // Tambahkan event listener untuk 'mousedown' yang menangkap semua jenis klik
    if (hardsubBtn) {
        hardsubBtn.addEventListener('mousedown', (e) => handleDownloadClick(e, 'hardsub'));
    }
    if (softsubBtn) {
        softsubBtn.addEventListener('mousedown', (e) => handleDownloadClick(e, 'softsub'));
    }
}