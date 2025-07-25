document.addEventListener("DOMContentLoaded", () => {
    // Lokasi file data telah disesuaikan, senbatsu.json tidak lagi digunakan
    const dataFiles = {
        releases: '../store/single/single_release.json',
        songall: '../store/single/songall.json' 
    };

    let processedData = [];

    // Fungsi untuk menghitung selisih hari antara dua tanggal
    const calculateDaysBetween = (startDateStr, endDateStr) => {
        const parseDateToUTC = (dateStr) => {
            if (!dateStr) return NaN;
            const [year, month, day] = dateStr.split('/').map(Number);
            return Date.UTC(year, month - 1, day);
        };
        const start = parseDateToUTC(startDateStr);
        const end = parseDateToUTC(endDateStr);
        if (isNaN(start) || isNaN(end)) return -1;
        const differenceInMs = end - start;
        return Math.round(differenceInMs / (1000 * 60 * 60 * 24));
    };

    // Fungsi untuk memuat data yang diperlukan
    const loadData = async () => {
        try {
            // Memuat 'releases' dan 'songall', tidak lagi memuat 'senbatsu'
            const [releases, songall] = await Promise.all([
                fetch(dataFiles.releases).then(res => res.json()),
                fetch(dataFiles.songall).then(res => res.json())
            ]);
            // Memproses data dengan argumen yang diperbarui
            processAllData(releases, songall);
            renderChart(processedData, true); // Kirim 'true' untuk animasi saat pertama kali load
        } catch (error) {
            console.error("Gagal memuat data:", error);
            document.getElementById('chart-container').innerHTML = "<p>Gagal memuat data. Silakan coba lagi nanti.</p>";
        }
    };

    // Fungsi untuk memproses dan menggabungkan data dari file JSON
    const processAllData = (releases, songall) => {
        processedData = releases.map(release => {
            const singleKey = release.num;
            const songallKey = 's' + String(singleKey).padStart(2, '0');

            // **LOGIKA BARU**: Mengambil lagu pertama dari array sebagai lagu utama
            const mainSong = songall[songallKey]?.[0] || {};
            
            const daysGap = calculateDaysBetween(release.announcementDate, release.releaseDate);
            
            return {
                singleNumber: singleKey,
                // **PERUBAHAN**: Mengambil judul dari objek mainSong yang didapat dari songall.json
                titleJp: mainSong.titleJp || 'N/A',
                titleRo: mainSong.titleRo || 'N/A',
                daysGap: daysGap,
                announcementDate: release.announcementDate, // Simpan tanggal untuk ditampilkan
                releaseDate: release.releaseDate,       // Simpan tanggal untuk ditampilkan
                coverUrl: `https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_s${String(singleKey).padStart(2, '0')}a.jpg`
            };
        }).filter(item => !isNaN(item.daysGap) && item.daysGap >= 0).reverse();
    };
    
    // Fungsi untuk animasi angka hitung naik (count up)
    const animateCountUp = (el, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * end);
            el.textContent = `${currentValue} hari`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Fungsi untuk me-render grafik bar
    const renderChart = (data, withAnimation = false) => {
        const container = document.getElementById('chart-container');
        container.innerHTML = '';
        if (data.length === 0) return;

        const maxDays = Math.max(...data.map(d => d.daysGap));
        
        // Fungsi untuk menentukan warna gradien akhir berdasarkan durasi maksimal
        const getEndGradientColor = (max) => {
            if (max <= 30) return 'var(--moe-tint2)';
            if (max <= 60) return 'var(--moe-tint3)';
            if (max <= 70) return 'var(--moe-tint4)';
            if (max <= 120) return 'var(--moe-tint5)';
            if (max <= 150) return 'var(--moe-tint6)';
            return 'var(--moe-tint7)';
        };

        const endColor = getEndGradientColor(maxDays);
        const gradientStyle = `linear-gradient(to right, var(--moe-tint1), ${endColor})`;
        
        // Kalkulasi lebar maksimal bar untuk responsivitas
        const containerWidth = container.clientWidth;
        const infoWidth = 120; // Lebar .single-info
        const labelPadding = 85; // Lebar .days-label + margin
        const maxBarWidth = containerWidth - infoWidth - labelPadding;

        data.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'chart-row';
            
            const singleInfo = document.createElement('div');
            singleInfo.className = 'single-info';
            const coverImg = document.createElement('img');
            coverImg.src = item.coverUrl;
            coverImg.className = 'single-cover';
            const singleNum = document.createElement('span');
            singleNum.className = 'single-number';
            singleNum.textContent = `${item.singleNumber}`;
            const tooltip = document.createElement('span');
            tooltip.className = 'tooltip-text';
            tooltip.innerHTML = `${item.titleJp}<br>(${item.titleRo})`;
            singleInfo.append(coverImg, singleNum, tooltip);
            
            const barWrapper = document.createElement('div');
            barWrapper.className = 'bar-wrapper';
            
            const finalBarWidth = (item.daysGap / maxDays) * maxBarWidth;

            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.background = gradientStyle;
            
            const barText = document.createElement('div');
            barText.className = 'bar-text';
            barText.innerHTML = `選抜: ${item.announcementDate}<br>発売: ${item.releaseDate}`;
            bar.appendChild(barText);

            const daysLabel = document.createElement('span');
            daysLabel.className = 'days-label';
            
            // Logika Animasi
            if (withAnimation) {
                bar.style.width = '0px';
                daysLabel.textContent = `0 hari`;
                setTimeout(() => {
                    bar.style.width = `${finalBarWidth}px`;
                    animateCountUp(daysLabel, item.daysGap, 5000); // Durasi animasi 5 detik
                }, 100 + (index * 20)); // Stagger animasi setiap baris
            } else {
                bar.style.width = `${finalBarWidth}px`;
                daysLabel.textContent = `${item.daysGap} hari`;
            }

            barWrapper.append(bar, daysLabel);
            row.append(singleInfo, barWrapper);
            container.appendChild(row);
        });
    };

    // Fungsi untuk mengurutkan data berdasarkan pilihan dropdown
    const sortData = (order) => {
        switch (order) {
            case 'longest':
                processedData.sort((a, b) => b.daysGap - a.daysGap);
                break;
            case 'shortest':
                processedData.sort((a, b) => a.daysGap - b.daysGap);
                break;
            case 'default':
            default:
                processedData.sort((a, b) => b.singleNumber - a.singleNumber);
                break;
        }
        // Render ulang chart tanpa animasi saat sorting
        renderChart(processedData, false);
    };

    // Event listener untuk resize window dan perubahan dropdown
    window.addEventListener('resize', () => renderChart(processedData, false));
    document.getElementById('sort-order').addEventListener('change', (e) => sortData(e.target.value));

    // Memulai proses pemuatan data
    loadData();
});