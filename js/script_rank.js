document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    let salesChart;
    let fullData = [];
    let currentFilter = 'new_era';
    let currentChartType = 'line';
    let showDataLabels = true;
    let xAxisStyle = 'image';
    const imageCache = {};

    // --- ELEMENT SELECTORS ---
    const ctx = document.getElementById('salesChart');
    const rangeFilter = document.getElementById('range-filter');
    const chartTypeControls = document.getElementById('chart-type-controls');
    const dataLabelToggle = document.getElementById('toggle-datalabels');
    const xAxisStyleFilter = document.getElementById('xaxis-style-filter');
    const loadingSpinner = document.getElementById('loading-spinner');
    const tableBody = document.getElementById('sales-table-body');

    if (!ctx || !rangeFilter || !chartTypeControls || !dataLabelToggle || !xAxisStyleFilter || !loadingSpinner || !tableBody) {
        console.error("Elemen kontrol atau tabel tidak lengkap!");
        return;
    }

    // --- DATA PENJUALAN LENGKAP (1-39) ---
    const tempSalesData = {
        "s01": {"oricon_day1": 8.5, "oricon_week1": 13.6, "billboard_week1": null}, "s02": {"oricon_day1": 11.1, "oricon_week1": 15.6, "billboard_week1": null}, "s03": {"oricon_day1": 15.0, "oricon_week1": 18.7, "billboard_week1": null}, "s04": {"oricon_day1": 19.0, "oricon_week1": 23.3, "billboard_week1": null}, "s05": {"oricon_day1": 20.4, "oricon_week1": 24.2, "billboard_week1": null}, "s06": {"oricon_day1": 28.6, "oricon_week1": 33.7, "billboard_week1": null}, "s07": {"oricon_day1": 34.7, "oricon_week1": 39.5, "billboard_week1": null}, "s08": {"oricon_day1": 38.7, "oricon_week1": 45.7, "billboard_week1": null}, "s09": {"oricon_day1": 37.5, "oricon_week1": 42.1, "billboard_week1": null}, "s10": {"oricon_day1": 41.2, "oricon_week1": 47.9, "billboard_week1": null}, "s11": {"oricon_day1": 42.2, "oricon_week1": 50.0, "billboard_week1": null}, "s12": {"oricon_day1": 48.2, "oricon_week1": 60.9, "billboard_week1": null}, "s13": {"oricon_day1": 53.4, "oricon_week1": 62.7, "billboard_week1": null}, "s14": {"oricon_day1": 59.0, "oricon_week1": 75.0, "billboard_week1": 71.0}, "s15": {"oricon_day1": 60.0, "oricon_week1": 72.8, "billboard_week1": 74.9}, "s16": {"oricon_day1": 68.3, "oricon_week1": 82.8, "billboard_week1": 77.3}, "s17": {"oricon_day1": 74.3, "oricon_week1": 87.4, "billboard_week1": 84.9}, "s18": {"oricon_day1": 71.6, "oricon_week1": 88.0, "billboard_week1": 102.9}, "s19": {"oricon_day1": 69.2, "oricon_week1": 85.1, "billboard_week1": 98.9}, "s20": {"oricon_day1": 86.3, "oricon_week1": 111.7, "billboard_week1": 118.8}, "s21": {"oricon_day1": 77.4, "oricon_week1": 98.9, "billboard_week1": 105.3}, "s22": {"oricon_day1": 82.2, "oricon_week1": 106.3, "billboard_week1": 110.4}, "s23": {"oricon_day1": 81.5, "oricon_week1": 100.4, "billboard_week1": 105.9}, "s24": {"oricon_day1": 78.9, "oricon_week1": 96.5, "billboard_week1": 101.9}, "s25": {"oricon_day1": 81.1, "oricon_week1": 99.6, "billboard_week1": 105.0}, "s26": {"oricon_day1": 44.6, "oricon_week1": 58.9, "billboard_week1": 67.9}, "s27": {"oricon_day1": 45.0, "oricon_week1": 59.0, "billboard_week1": 70.4}, "s28": {"oricon_day1": 40.9, "oricon_week1": 53.6, "billboard_week1": 65.8}, "s29": {"oricon_day1": 34.6, "oricon_week1": 46.3, "billboard_week1": 56.1}, "s30": {"oricon_day1": 43.5, "oricon_week1": 57.7, "billboard_week1": 72.0}, "s31": {"oricon_day1": 48.9, "oricon_week1": 65.4, "billboard_week1": 83.0}, "s32": {"oricon_day1": 41.9, "oricon_week1": 51.7, "billboard_week1": 66.3}, "s33": {"oricon_day1": 41.2, "oricon_week1": 56.6, "billboard_week1": 71.4}, "s34": {"oricon_day1": 40.1, "oricon_week1": 53.9, "billboard_week1": 69.2}, "s35": {"oricon_day1": 41.3, "oricon_week1": 51.8, "billboard_week1": 71.4}, "s36": {"oricon_day1": 37.5, "oricon_week1": 51.0, "billboard_week1": 65.2}, "s37": {"oricon_day1": 36.0, "oricon_week1": 48.4, "billboard_week1": 61.0}, "s38": {"oricon_day1": 37.7, "oricon_week1": 48.4, "billboard_week1": 61.2}, "s39": {"oricon_day1": 43.5, "oricon_week1": 59.5, "billboard_week1": 77.6}
    };

    // --- FUNGSI & PLUGIN ---

    async function fetchData() {
        try {
            const response = await fetch('../store/single/songall.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const allSongsData = await response.json();
            
            const processedData = [];
            Object.keys(allSongsData).forEach(key => {
                if (key.startsWith('s') && allSongsData[key].length > 0) {
                    const aSide = allSongsData[key][0];
                    const singleNumber = parseInt(key.substring(1), 10);
                    if (tempSalesData[key]) {
                        processedData.push({
                            key: key, singleNumber: singleNumber, number: String(singleNumber).padStart(2, '0'),
                            title: aSide.titleJp,
                            coverUrl: `https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_${key}a.jpg`,
                            sales: tempSalesData[key]
                        });
                    }
                }
            });
            fullData = processedData.sort((a, b) => a.singleNumber - b.singleNumber);
        } catch (error) {
            loadingSpinner.innerHTML = `<p>Gagal memuat data. Periksa konsol.</p>`;
        }
    }
    
    // --- FUNGSI UNTUK MEMBUAT TABEL ---
    function populateTable(data) {
        tableBody.innerHTML = ''; // Kosongkan tabel
        
        data.forEach((d, index) => {
            const prevData = index > 0 ? data[index-1] : null;

            // Hitung selisih
            const oriconDiff = prevData ? d.sales.oricon_week1 - prevData.sales.oricon_week1 : null;
            const billboardDiff = (prevData && prevData.sales.billboard_week1 && d.sales.billboard_week1) ? d.sales.billboard_week1 - prevData.sales.billboard_week1 : null;
            
            const formatDiff = (diff) => {
                if (diff === null) return '<span>-</span>';
                const sign = diff > 0 ? '+' : '';
                const className = diff > 0 ? 'sales-increase' : 'sales-decrease';
                return `<span class="${className}">${sign}${diff.toFixed(1)}</span>`;
            };

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="cell-cover" data-label="Cover"><img src="${d.coverUrl}" alt="Cover ${d.title}" class="table-cover-img"></td>
                <td data-label="Nomor" class="col-num">${d.number}</td>
                <td data-label="Judul" class="col-title">${d.title}</td>
                <td data-label="Oricon Day 1" class="col-sales">${d.sales.oricon_day1.toFixed(1)}</td>
                <td data-label="Oricon Week 1" class="col-sales">${d.sales.oricon_week1.toFixed(1)}</td>
                <td data-label="+/- Oricon" class="col-diff">${formatDiff(oriconDiff)}</td>
                <td data-label="Billboard Week 1" class="col-sales">${d.sales.billboard_week1 ? d.sales.billboard_week1.toFixed(1) : '-'}</td>
                <td data-label="+/- Billboard" class="col-diff">${formatDiff(billboardDiff)}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // --- FUNGSI UTAMA UNTUK UPDATE TAMPILAN ---
    function updateDisplay() {
        if (salesChart) salesChart.destroy();
        
        const isMobile = window.innerWidth <= 768;
        const type = isMobile ? 'horizontalBar' : currentChartType;
        
        // Filter data
        let data = [];
        switch (currentFilter) {
            case 'all': data = fullData; break;
            case 'last_10': data = fullData.slice(-10); break;
            case 'covid_era': data = fullData.filter(d => d.singleNumber >= 26 && d.singleNumber <= 31); break;
            case 'new_era': default: data = fullData.filter(d => d.singleNumber >= 32); break;
        }

        // Panggil fungsi untuk mengisi tabel dengan data yang sudah difilter
        populateTable(data);

        // Lanjutkan membuat grafik...
        // (Sisa kode untuk membuat grafik tetap sama dari sebelumnya)
        // ... (kode config dan pembuatan chart.js) ...
        const chartData = { /* ... */ }; // (Kode ini sama persis dengan jawaban sebelumnya)
        const config = { /* ... */ }; // (Kode ini sama persis dengan jawaban sebelumnya, pastikan bagian scales, plugins, dll. ada di sini)
        
        salesChart = new Chart(ctx, config);
        loadingSpinner.style.display = 'none';
    }


    // (Sisipkan SISA KODE DARI JAWABAN SEBELUMNYA DI SINI)
    // yaitu:
    // 1. const axisImagePlugin = { ... }
    // 2. function drawImage(...)
    // 3. function updateChart() { ... } (ganti nama jadi createOrUpdateChart)
    // 4. async function init() { ... }
    
    // Untuk mempersingkat, saya akan salin-tempel versi lengkapnya lagi:
    const axisImagePlugin = {
        id: 'axisImagePlugin',
        afterDraw(chart) {
            if (chart.options.xAxisStyle !== 'image') return;
            const isHorizontal = chart.options.indexAxis === 'y';
            const { ctx } = chart;
            const coverSize = isHorizontal ? 40 : 50;

            if (isHorizontal) {
                const { chartArea: { left }, scales: { y } } = chart;
                const xPos = left - coverSize - 10;
                 y.ticks.forEach((tick, index) => {
                    const label = chart.data.labels[index];
                    if (!label || !label.coverUrl) return;
                    drawImage(chart, label.coverUrl, xPos, y.getPixelForTick(index) - coverSize / 2, coverSize);
                });
            } else {
                const { chartArea: { bottom }, scales: { x } } = chart;
                const yPos = bottom + 15;
                x.ticks.forEach((tick, index) => {
                    const label = chart.data.labels[index];
                    if (!label || !label.coverUrl) return;
                    drawImage(chart, label.coverUrl, x.getPixelForTick(index) - coverSize / 2, yPos, coverSize);
                });
            }
        }
    };
    function drawImage(chart, url, x, y, size){
        let img = imageCache[url];
        if (!img) {
            img = new Image(); img.src = url;
            img.onload = () => { imageCache[url] = img; chart.draw(); };
        }
        if (img.complete) chart.ctx.drawImage(img, x, y, size, size);
    }
    function createOrUpdateChart() {
        if (salesChart) salesChart.destroy();
        const isMobile = window.innerWidth <= 768;
        const type = isMobile ? 'horizontalBar' : currentChartType;
        let data = [];
        switch (currentFilter) {
            case 'all': data = fullData; break;
            case 'last_10': data = fullData.slice(-10); break;
            case 'covid_era': data = fullData.filter(d => d.singleNumber >= 26 && d.singleNumber <= 31); break;
            case 'new_era': default: data = fullData.filter(d => d.singleNumber >= 32); break;
        }
        populateTable(data);
        const chartData = {
            labels: data.map(d => ({ title: d.title, coverUrl: d.coverUrl, number: d.number })),
            datasets: [
                { label: 'Oricon First Day', data: data.map(d => d.sales.oricon_day1), borderColor: 'rgb(33, 150, 243)'},
                { label: 'Oricon First Week', data: data.map(d => d.sales.oricon_week1), borderColor: 'rgb(255, 152, 0)'},
                { label: 'Billboard First Week', data: data.map(d => d.sales.billboard_week1), borderColor: 'rgb(96, 125, 139)' }
            ]
        };
        const isHorizontal = type === 'horizontalBar';
        const config = {
            type: type === 'line' ? 'line' : 'bar', data: chartData, plugins: [ChartDataLabels, axisImagePlugin],
            options: {
                indexAxis: isHorizontal ? 'y' : 'x', xAxisStyle: xAxisStyle, responsive: true, maintainAspectRatio: false,
                layout: { padding: (xAxisStyle === 'image') ? (isHorizontal ? { left: 55 } : { bottom: 70 }) : {bottom:10} },
                plugins: {
                    datalabels: { display: showDataLabels, align: isHorizontal ? 'end' : 'top', anchor: 'end', offset: isHorizontal ? -5 : 8, color: isHorizontal ? 'var(--moe-shade-min1)' : 'white', backgroundColor: isHorizontal ? null : 'rgba(75, 0, 121, 0.7)', borderWidth: 1, borderRadius: 4, font: { size: 9, weight: 'bold'}, padding: 4, formatter: (v) => v ? v.toFixed(1) : '' },
                    title: { display: true, text: 'Tren Penjualan Single Nogizaka46 (x10,000)', padding: { top: 10, bottom: 20 }, font: { size: 18, family: '"M PLUS Rounded 1c", sans-serif', weight: 'bold'}, color: 'var(--moe-shade-min1)'},
                    legend: { position: 'top', labels: {font: {family: '"Space Mono", monospace', size: 12}, usePointStyle: true, pointStyle: 'rectRounded'}},
                    tooltip: { callbacks: { title: (items) => chartData.labels[items[0].dataIndex].title } }
                },
                scales: {
                    x: {
                        ticks: {
                            callback: function(value, index) {
                                if(isHorizontal && xAxisStyle === 'title') return chartData.labels[index].title.length > 20 ? chartData.labels[index].title.substring(0,20)+'...' : chartData.labels[index].title;
                                switch(xAxisStyle){
                                    case 'image': return '';
                                    case 'number': return chartData.labels[index].number;
                                    case 'title': return chartData.labels[index].title;
                                    default: return '';
                                }
                            },
                            font: { family: '"M PLUS Rounded 1c", sans-serif' },
                            maxRotation: xAxisStyle === 'title' && !isHorizontal ? 45 : 0,
                            minRotation: xAxisStyle === 'title' && !isHorizontal ? 45 : 0
                        },
                        grid: { display: !isHorizontal },
                    },
                    y: {
                        min: 0,
                        ticks: { callback: (value, index) => {
                            if (isHorizontal) {
                                const label = chartData.labels[index];
                                if (xAxisStyle === 'image') return '';
                                if (xAxisStyle === 'number') return label.number;
                                return label.title.length > 20 ? label.title.substring(0,20)+'...' : label.title;
                            }
                            return value;
                        }},
                        grid: { display: isHorizontal },
                    }
                }
            }
        };
        config.data.datasets.forEach(dataset => {
            dataset.tension = 0; dataset.backgroundColor = dataset.borderColor;
            dataset.borderWidth = type === 'line' ? 2.5 : 0; dataset.pointRadius = type === 'line' ? 4 : 0;
        });
        salesChart = new Chart(ctx, config);
        loadingSpinner.style.display = 'none';
    }

    function handleUpdate() {
        loadingSpinner.style.display = 'flex';
        setTimeout(createOrUpdateChart, 50);
    }
    
    async function init() {
        await fetchData();
        handleUpdate();
        
        rangeFilter.addEventListener('change', (e) => { currentFilter = e.target.value; handleUpdate(); });
        dataLabelToggle.addEventListener('change', (e) => { showDataLabels = e.target.checked; handleUpdate(); });
        xAxisStyleFilter.addEventListener('change', (e) => { xAxisStyle = e.target.value; handleUpdate(); });
        chartTypeControls.addEventListener('click', (e) => {
            if (e.target.classList.contains('chart-type-btn')) {
                chartTypeControls.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                currentChartType = e.target.dataset.type;
                handleUpdate();
            }
        });
        
        let resizeTimer;
        window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(handleUpdate, 250); });
    }

    init();
});