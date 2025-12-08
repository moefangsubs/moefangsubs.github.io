document.addEventListener("DOMContentLoaded", () => {
    const dataFiles = {
        releases: '../store/single/single_release.json',
        songall: '../store/single/songall.json' 
    };
    let processedData = [];
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
    const loadData = async () => {
        try {
            const [releases, songall] = await Promise.all([
                fetch(dataFiles.releases).then(res => res.json()),
                fetch(dataFiles.songall).then(res => res.json())
            ]);
            processAllData(releases, songall);
            renderChart(processedData, true);  
        } catch (error) {
            console.error("Gagal memuat data:", error);
            document.getElementById('chart-container').innerHTML = "<p>Gagal memuat data. Silakan coba lagi nanti.</p>";
        }
    };
    const processAllData = (releases, songall) => {
        processedData = releases.map(release => {
            const singleKey = release.num;
            const songallKey = 's' + String(singleKey).padStart(2, '0');
            const mainSong = songall[songallKey]?.[0] || {};
            const daysGap = calculateDaysBetween(release.announcementDate, release.releaseDate);
            return {
                singleNumber: singleKey,
                titleJp: mainSong.titleJp || 'N/A',
                titleRo: mainSong.titleRo || 'N/A',
                daysGap: daysGap,
                announcementDate: release.announcementDate,  
                releaseDate: release.releaseDate,        
                coverUrl: `https: 
            };
        }).filter(item => !isNaN(item.daysGap) && item.daysGap >= 0).reverse();
    };
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
    const renderChart = (data, withAnimation = false) => {
        const container = document.getElementById('chart-container');
        container.innerHTML = '';
        if (data.length === 0) return;
        const maxDays = Math.max(...data.map(d => d.daysGap));
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
        const containerWidth = container.clientWidth;
        const infoWidth = 120;  
        const labelPadding = 85;  
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
            if (withAnimation) {
                bar.style.width = '0px';
                daysLabel.textContent = `0 hari`;
                setTimeout(() => {
                    bar.style.width = `${finalBarWidth}px`;
                    animateCountUp(daysLabel, item.daysGap, 5000);  
                }, 100 + (index * 20));  
            } else {
                bar.style.width = `${finalBarWidth}px`;
                daysLabel.textContent = `${item.daysGap} hari`;
            }
            barWrapper.append(bar, daysLabel);
            row.append(singleInfo, barWrapper);
            container.appendChild(row);
        });
    };
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
        renderChart(processedData, false);
    };
    window.addEventListener('resize', () => renderChart(processedData, false));
    document.getElementById('sort-order').addEventListener('change', (e) => sortData(e.target.value));
    loadData();
});