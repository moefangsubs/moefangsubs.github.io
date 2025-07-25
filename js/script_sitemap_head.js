// ../js/script_sitemap_head.js
document.addEventListener('DOMContentLoaded', () => {

    const initNotificationSlider = async () => {
        const sliderContainer = document.getElementById('notification-slider');
        if (!sliderContainer) return;

        // Pemetaan tipe notifikasi ke class CSS-nya
        const typeMap = {
            experiment: { className: 'notif-experiment' },
            notice: { className: 'notif-notice' },
            feature: { className: 'notif-feature' }
        };

        try {
            // Ganti path jika lokasi notification.json berbeda
            const response = await fetch('../store/data/notification.json');
            if (!response.ok) throw new Error('Gagal memuat notifikasi.');
            
            const notifications = await response.json();
            // Urutkan kunci agar notifikasi tampil sesuai urutan (01, 02, ...)
            const notificationKeys = Object.keys(notifications).sort();

            if (notificationKeys.length === 0) {
                sliderContainer.remove(); // Hapus kontainer jika tidak ada notifikasi
                return;
            }

            // Bangun struktur HTML untuk slider
            sliderContainer.className = 'notifsitemap-wrapper';
            sliderContainer.innerHTML = `
                <div class="notifsitemap-shadow"></div>
                <div class="notifsitemap-container">
                    <ul class="notifsitemap-ul">
                        ${notificationKeys.map(key => {
                            const item = notifications[key];
                            // Gunakan 'notice' sebagai default jika tipe tidak ditemukan
                            const typeInfo = typeMap[item.type] || typeMap['notice']; 
                            return `<li class="notifsitemap-li ${typeInfo.className}">${item.note}</li>`;
                        }).join('')}
                    </ul>
                </div>
            `;
            
            // Logika untuk menjalankan slider
            const listItems = sliderContainer.querySelectorAll('.notifsitemap-li');
            if (listItems.length === 0) return;

            let currentIndex = 0;
            listItems[currentIndex].classList.add('active');

            // Jalankan interval hanya jika ada lebih dari satu notifikasi
            if (listItems.length > 1) {
                setInterval(() => {
                    listItems[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % listItems.length;
                    listItems[currentIndex].classList.add('active');
                }, 6000); // 5 detik tampil + 1 detik transisi fade = 6000ms
            }

        } catch (error) {
            console.error('Error saat inisialisasi slider notifikasi:', error);
            sliderContainer.remove(); // Sembunyikan jika terjadi error
        }
    };

    initNotificationSlider();
});