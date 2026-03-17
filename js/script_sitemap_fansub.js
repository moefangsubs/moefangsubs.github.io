document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("partner-grid-container");

    // Mengambil data JSON dari repo kamu
    fetch('../store/data/fansub_update.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            container.innerHTML = ''; // Kosongkan container
            
            data.forEach(item => {
                // Formatting tanggal (opsional, disesuaikan)
                const dateObj = new Date(item.date);
                const dateString = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

                const cardHTML = `
                    <div class="partner-item-wrapper">
                        <div class="partner-item-shadow"></div>
                        <div class="partner-item">
                            <a href="${item.link}" target="_blank" style="text-decoration: none; display: flex; flex-direction: column; height: 100%;">
                                <img src="${item.thumbnail}" class="partner-item-thumb" alt="${item.title}" loading="lazy">
                                <div class="partner-item-caption">
                                    <span class="partner-tag">${item.fansub}</span>
                                    <strong>${item.title}</strong>
                                    <span class="partner-date">📅 ${dateString}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', cardHTML);
            });
        })
        .catch(error => {
            console.error('Gagal memuat update partner:', error);
            container.innerHTML = '<p style="text-align:center; color: red;">Gagal memuat data rekanan.</p>';
        });
});