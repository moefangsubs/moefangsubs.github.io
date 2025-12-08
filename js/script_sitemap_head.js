document.addEventListener('DOMContentLoaded', () => {
    const initNotificationSlider = async () => {
        const sliderContainer = document.getElementById('notification-slider');
        if (!sliderContainer) return;
        const typeMap = {
            experiment: { className: 'notif-experiment' },
            notice: { className: 'notif-notice' },
            feature: { className: 'notif-feature' }
        };
        try {
            const response = await fetch('../store/data/notification.json');
            if (!response.ok) throw new Error('Gagal memuat notifikasi.');
            const notifications = await response.json();
            const notificationKeys = Object.keys(notifications).sort();
            if (notificationKeys.length === 0) {
                sliderContainer.remove();  
                return;
            }
            sliderContainer.className = 'notifsitemap-wrapper';
            sliderContainer.innerHTML = `
                <div class="notifsitemap-shadow"></div>
                <div class="notifsitemap-container">
                    <ul class="notifsitemap-ul">
                        ${notificationKeys.map(key => {
                            const item = notifications[key];
                            const typeInfo = typeMap[item.type] || typeMap['notice']; 
                            return `<li class="notifsitemap-li ${typeInfo.className}">${item.note}</li>`;
                        }).join('')}
                    </ul>
                </div>
            `;
            const listItems = sliderContainer.querySelectorAll('.notifsitemap-li');
            if (listItems.length === 0) return;
            let currentIndex = 0;
            listItems[currentIndex].classList.add('active');
            if (listItems.length > 1) {
                setInterval(() => {
                    listItems[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % listItems.length;
                    listItems[currentIndex].classList.add('active');
                }, 6000);  
            }
        } catch (error) {
            console.error('Error saat inisialisasi slider notifikasi:', error);
            sliderContainer.remove();  
        }
    };
    initNotificationSlider();
});