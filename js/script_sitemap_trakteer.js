// ../js/script_sitemap_trakteer.js (REVISI LENGKAP DENGAN FIRESTORE)

document.addEventListener('DOMContentLoaded', () => {
    // Pastikan 'auth' dan 'db' sudah didefinisikan oleh firebase-init.js
    if (typeof auth === 'undefined' || typeof db === 'undefined') {
        console.error('Firebase belum diinisialisasi. Pastikan firebase-init.js dimuat lebih dulu.');
        return;
    }

    // Kita tidak melakukan apa-apa sampai status auth siap.
    auth.onAuthStateChanged(user => {
        if (user) {
            // 1. User sudah login, panggil fungsi untuk mengambil URL
            console.log('User logged in, fetching Trakteer config...');
            fetchTrakteerUrlAndInject();
        } else {
            // 2. User logout, tidak perlu tampilkan marquee
            console.log('User not logged in, Trakteer marquee hidden.');
            
            // Sembunyikan marquee jika ada (misal, jika user baru saja logout)
            const marqueeWrapper = document.getElementById('trakteer-marquee-wrapper');
            if (marqueeWrapper) {
                marqueeWrapper.style.display = 'none';
            }
        }
    });
});

/**
 * Mengambil URL dari Firestore dan menyisipkannya ke DOM.
 */
async function fetchTrakteerUrlAndInject() {
    try {
        // 3. Ambil dokumen 'widgets' dari koleksi 'config'
        // Ini hanya akan berhasil jika user sudah login (sesuai Rules)
        const docRef = db.collection('config').doc('widgets');
        const doc = await docRef.get();

        if (doc.exists) {
            // 4. Dokumen ditemukan, ambil URL-nya
            const trakteerStreamURL = doc.data().trakteerMarqueeUrl;

            if (trakteerStreamURL) {
                // 5. URL ada, panggil fungsi untuk menyisipkan iframe
                injectTrakteerMarquee(trakteerStreamURL);
            } else {
                console.error('Field "trakteerMarqueeUrl" tidak ada di dokumen config/widgets.');
            }
        } else {
            console.error('Dokumen "config/widgets" tidak ditemukan di Firestore.');
        }
    } catch (error) {
        console.error('Gagal mengambil config Trakteer dari Firestore:', error.message);
        // Error ini wajar terjadi jika user anonim mencoba akses (Permission Denied).
    }
}

/**
 * Membuat elemen iframe marquee dan menyisipkannya ke halaman.
 * @param {string} trakteerStreamURL - URL yang diambil dari Firestore
 */
function injectTrakteerMarquee(trakteerStreamURL) {
    // 6. Cek apakah marquee sudah ada (mencegah duplikat)
    if (document.getElementById('trakteer-marquee-wrapper')) {
        // Jika sudah ada, pastikan terlihat (jika sebelumnya di-logout)
        document.getElementById('trakteer-marquee-wrapper').style.display = 'block';
        return; 
    }

    // 7. Temukan elemen #notification-slider sebagai titik acuan
    const notificationSlider = document.getElementById('notification-slider');
    if (!notificationSlider) {
        console.error('#notification-slider tidak ditemukan. Marquee tidak bisa disisipkan.');
        return;
    }
    
    // 8. Buat semua elemen (ini adalah KODE LAMA ANDA YANG SUDAH BERHASIL)
    const marqueeWrapper = document.createElement('div');
    marqueeWrapper.id = 'trakteer-marquee-wrapper';
    marqueeWrapper.className = 'notifsitemap-wrapper'; 

    const shadowDiv = document.createElement('div');
    shadowDiv.className = 'notifsitemap-shadow';

    const marqueeContainer = document.createElement('div');
    marqueeContainer.id = 'trakteer-marquee-container'; 
    marqueeContainer.className = 'notifsitemap-container'; 

    const marqueeIframe = document.createElement('iframe');
    marqueeIframe.id = 'trakteer-iframe';
    marqueeIframe.src = trakteerStreamURL; // <- URL DARI FIRESTORE
    marqueeIframe.setAttribute('frameborder', '0');
    marqueeIframe.setAttribute('scrolling', 'no');
    marqueeIframe.setAttribute('allowtransparency', 'true');
    
    // 9. Susun dan sisipkan
    marqueeContainer.appendChild(marqueeIframe); 
    marqueeWrapper.appendChild(shadowDiv);      
    marqueeWrapper.appendChild(marqueeContainer);
    notificationSlider.insertAdjacentElement('afterend', marqueeWrapper);
}