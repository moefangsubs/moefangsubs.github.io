document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });
    const disableEvents = ['copy', 'paste', 'cut'];
    disableEvents.forEach(eventName => {
        document.addEventListener(eventName, e => {
            if (!document.body.classList.contains('allow-copy')) {
                e.preventDefault();
            }
        });
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'F12') {
            event.preventDefault();
        }
        if (event.ctrlKey && event.shiftKey && event.key === 'I') {
            event.preventDefault();
        }
        if (event.ctrlKey && event.shiftKey && event.key === 'J') {
            event.preventDefault();
        }
        if (event.ctrlKey && event.key === 'U') {
            event.preventDefault();
        }
    });
    const securityCSS = `
        * {
            -webkit-user-select: none !important;
            user-select: none !important;
        }
    `;
    const styleEl = document.createElement('style');
    styleEl.innerHTML = securityCSS;
    document.head.appendChild(styleEl);
    renderMainInterface();
    loadBackground();
});
function renderMainInterface() {
    const uiHTML = `
        <div class="form-container" id="welcome-back-box" style="display: none; text-align: center;">
            <h1>Halo, <span id="welcome-username"></span>!</h1>
            <p style="font-size: 1rem; opacity: 0.8;">Kamu sudah login</p>
            <div class="button-group">
                <a href="sitemap.html" class="btn-submit" style="text-decoration: none;">Jelajah Situs</a>
            </div>
        </div>
        <div class="form-container" id="login-box" style="display: none;"> 
            <h1>Selamat Datang</h1>
            <p style="text-align: center; margin-bottom: 25px;">Login atau daftar dengan akun Google</p>
            <div class="button-group">
                 <button type="button" class="btn-submit btn-google" id="google-login-btn">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo">
                    <span>Login dengan Google</span>
                </button>
            </div>
        </div>
        <p id="message-area" class="message-area"></p>
        <div class="mylogo">
            <span>Website masih dalam tahap pembangunan</span>
            <img src="sprite/main.svg"/> 
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', uiHTML);
}
async function loadBackground() {
    try {
        const response = await fetch('../store/bg.json');
        const data = await response.json();
        const activeBg = data.find(item => item.stat === 'on');
        let bgHTML = '';
        if (activeBg) {
            if (activeBg.type === 'video') {
                bgHTML = `
                    <video autoplay muted loop playsinline id="bg-dynamic">
                        <source src="${activeBg.url}" type="video/mp4">
                    </video>`;
            } else if (activeBg.type === 'image') {
                bgHTML = `<img src="${activeBg.url}" id="bg-dynamic" alt="Background">`;
            } else if (activeBg.type === 'image_random' && activeBg.urls) {
                const totalImages = activeBg.urls.length;
                const randomIndex = Math.floor(Math.random() * totalImages);
                const randomUrl = activeBg.urls[randomIndex];
                bgHTML = `<img src="${randomUrl}" id="bg-dynamic" alt="Random Background">`;
            }
        }
        if (bgHTML) {
            document.body.insertAdjacentHTML('afterbegin', bgHTML);
        }
    } catch (error) {
        console.error("Gagal memuat background:", error);
    }
}