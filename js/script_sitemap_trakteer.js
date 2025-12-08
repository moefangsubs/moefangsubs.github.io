document.addEventListener('DOMContentLoaded', () => {
    if (typeof auth === 'undefined' || typeof db === 'undefined') {
        console.error('Firebase belum diinisialisasi. Pastikan firebase-init.js dimuat lebih dulu.');
        return;
    }
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('User logged in, fetching Trakteer config...');
            fetchTrakteerUrlAndInject();
        } else {
            console.log('User not logged in, Trakteer marquee hidden.');
            const marqueeWrapper = document.getElementById('trakteer-marquee-wrapper');
            if (marqueeWrapper) {
                marqueeWrapper.style.display = 'none';
            }
        }
    });
});
async function fetchTrakteerUrlAndInject() {
    try {
        const docRef = db.collection('config').doc('widgets');
        const doc = await docRef.get();
        if (doc.exists) {
            const trakteerStreamURL = doc.data().trakteerMarqueeUrl;
            if (trakteerStreamURL) {
                injectTrakteerMarquee(trakteerStreamURL);
            } else {
                console.error('Field "trakteerMarqueeUrl" tidak ada di dokumen config/widgets.');
            }
        } else {
            console.error('Dokumen "config/widgets" tidak ditemukan di Firestore.');
        }
    } catch (error) {
        console.error('Gagal mengambil config Trakteer dari Firestore:', error.message);
    }
}
function injectTrakteerMarquee(trakteerStreamURL) {
    if (document.getElementById('trakteer-marquee-wrapper')) {
        document.getElementById('trakteer-marquee-wrapper').style.display = 'block';
        return; 
    }
    const notificationSlider = document.getElementById('notification-slider');
    if (!notificationSlider) {
        console.error('#notification-slider tidak ditemukan. Marquee tidak bisa disisipkan.');
        return;
    }
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
    marqueeIframe.src = trakteerStreamURL;  
    marqueeIframe.setAttribute('frameborder', '0');
    marqueeIframe.setAttribute('scrolling', 'no');
    marqueeIframe.setAttribute('allowtransparency', 'true');
    marqueeContainer.appendChild(marqueeIframe); 
    marqueeWrapper.appendChild(shadowDiv);      
    marqueeWrapper.appendChild(marqueeContainer);
    notificationSlider.insertAdjacentElement('afterend', marqueeWrapper);
}