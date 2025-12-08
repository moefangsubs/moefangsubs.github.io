// ../js/script_subs_comingsoon.js

document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('garapan-main-container');
    const loadingOverlay = document.getElementById('loading-overlay');

    // Fungsi untuk menyuntikkan style ke dalam head
    const addStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .status-message-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 50vh;
                text-align: center;
                color: var(--moe-shade-min2);
                padding: 2rem;
            }
            .status-message-container h1 {
                font-size: 4rem;
                font-weight: 900;
                color: var(--moe);
                margin: 0;
            }
            .status-message-container p {
                font-size: 1.2rem;
                margin-top: 1rem;
            }
            @media (max-width: 768px) {
                .status-message-container h1 {
                    font-size: 2.5rem;
                }
                .status-message-container p {
                    font-size: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // Baca parameter dari URL
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');

    if (mainContainer) {
        addStyles(); // Panggil fungsi untuk menambahkan style

        if (status === 'comingsoon') {
            const comingSoonHTML = `
                <div class="status-message-container">
                    <h1>Coming Soon</h1>
                    <p>Akan kami garap secepatnya ketika sudah tersedia.</p>
                </div>
            `;
            mainContainer.innerHTML = comingSoonHTML;
        } else {
            // Tampilan default jika parameter status tidak ada atau tidak dikenali
            const defaultHTML = `
                <div class="status-message-container">
                    <h1>Konten Tidak Ditemukan</h1>
                    <p>Silakan kembali ke halaman sebelumnya.</p>
                </div>
            `;
            mainContainer.innerHTML = defaultHTML;
        }
    }

    // Sembunyikan loading overlay setelah semuanya siap
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
});