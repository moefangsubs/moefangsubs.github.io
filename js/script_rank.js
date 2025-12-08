document.addEventListener('DOMContentLoaded', () => {
    let salesChart;
    let fullData = [];
    let narrativeData = {};
    let currentFilter = 'new_era';
    let currentChartType = 'line';
    let showDataLabels = true;
    let xAxisStyle = 'image';
    let currentMetric = 'both';
    let currentPeriod = 'both';
    const imageCache = {};
    const ctx = document.getElementById('salesChart');
    const chartWrapper = document.querySelector('.chart-wrapper');
    const rangeFilter = document.getElementById('range-filter');
    const chartTypeControls = document.getElementById('chart-type-controls');
    const dataLabelToggle = document.getElementById('toggle-datalabels');
    const xAxisStyleFilter = document.getElementById('xaxis-style-filter');
    const metricFilter = document.getElementById('metric-filter');
    const periodFilter = document.getElementById('period-filter');
    const loadingSpinner = document.getElementById('loading-spinner');
    const tableBody = document.getElementById('sales-table-body');
    const introNarrative = document.getElementById('intro-narrative');
    const narrativeContainer = document.getElementById('narrative-container');
    const narrativeTitle = document.getElementById('narrative-title');
    const narrativeText = document.getElementById('narrative-text');
    if (!ctx || !chartWrapper || !rangeFilter || !chartTypeControls || !dataLabelToggle || !xAxisStyleFilter || !metricFilter || !periodFilter || !loadingSpinner || !tableBody || !introNarrative || !narrativeContainer || !narrativeTitle || !narrativeText) {
        console.error("Elemen kontrol, narasi, atau tabel tidak lengkap!");
        return;
    }
    const getCssVariable = (variable) => getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    async function fetchData() {
        try {
            const songPromise = fetch('../store/single/songall.json').then(res => res.json());
            const salesPromise = fetch('../store/single/single_sales.json').then(res => res.json());
            const [allSongsData, salesAndSummaryData] = await Promise.all([songPromise, salesPromise]);
            const salesData = salesAndSummaryData.sales;
            narrativeData = salesAndSummaryData.summary;
            const processedData = [];
            Object.keys(allSongsData).forEach(key => {
                if (key.startsWith('s') && allSongsData[key].length > 0) {
                    const aSide = allSongsData[key][0];
                    const singleNumber = parseInt(key.substring(1), 10);
                    if (salesData[key]) {
                        const exactSales = {
                            oricon_day1: salesData[key].oricon_day1 * 10000,
                            oricon_week1: salesData[key].oricon_week1 * 10000,
                            billboard_week1: salesData[key].billboard_week1 ? salesData[key].billboard_week1 * 10000 : null
                        };
                        processedData.push({ key: key, singleNumber: singleNumber, number: String(singleNumber).padStart(2, '0'), title: aSide.titleJp, coverUrl: `https: 
                    }
                }
            });
            fullData = processedData.sort((a, b) => a.singleNumber - b.singleNumber);
            introNarrative.innerHTML = narrativeData.intro;
        } catch (error) { console.error("Gagal memuat data:", error); loadingSpinner.innerHTML = `<p>Gagal memuat data.</p>`; }
    }
    function populateNarrative(filterKey) {
        const titleMap = {
            'all': 'Semua Single',
            'early_era': 'Era Awal (Single 1-7)',
            'climbing_era': 'Era Pendakian (Single 8-15)',
            'golden_era': 'Era Keemasan (Single 16-25)',
            'covid_era': 'Era Pandemi (Single 26-31)',
            'new_era': 'Era Baru (Single 32~)'
        };
        narrativeTitle.textContent = titleMap[filterKey] || 'Analisis';
        narrativeText.textContent = narrativeData[filterKey] || 'Pilih rentang untuk melihat analisis.';
    }
    function populateTable(data, allData) {
        tableBody.innerHTML = '';
        const formatNumber = (num) => num ? num.toLocaleString('id-ID') : '-';
        data.forEach((d) => {
            const fullIndex = allData.findIndex(item => item.key === d.key);
            const prevData = fullIndex > 0 ? allData[fullIndex - 1] : null;
            const oriconDiff = prevData ? d.sales.oricon_week1 - prevData.sales.oricon_week1 : null;
            const billboardDiff = (prevData && prevData.sales.billboard_week1 && d.sales.billboard_week1) ? d.sales.billboard_week1 - prevData.sales.billboard_week1 : null;
            const formatDiffCell = (value, diff) => {
                let diffHtml = '';
                if (diff !== null) {
                    const sign = diff > 0 ? '+' : ''; const className = diff > 0 ? 'sales-increase' : 'sales-decrease';
                    diffHtml = ` <span class="${className}">(${sign}${formatNumber(diff)})</span>`;
                }
                return `${formatNumber(value)}${diffHtml}`;
            };
            const row = document.createElement('tr');
            row.innerHTML = `<td class="cell-cover" data-label="Cover"><img src="${d.coverUrl}" alt="Cover ${d.title}" class="table-cover-img"></td><td data-label="Nomor" class="col-num">${d.number}</td><td data-label="Judul" class="col-title">${d.title}</td><td data-label="Oricon Day 1" class="col-sales">${formatNumber(d.sales.oricon_day1)}</td><td data-label="Oricon Week 1 (+/-)" class="col-sales">${formatDiffCell(d.sales.oricon_week1, oriconDiff)}</td><td data-label="Billboard Week 1 (+/-)" class="col-sales">${formatDiffCell(d.sales.billboard_week1, billboardDiff)}</td>`;
            tableBody.appendChild(row);
        });
    }
    const axisImagePlugin = {
        id: 'axisImagePlugin',
        afterDraw(chart) {
            if (chart.options.xAxisStyle !== 'image') return;
            const isHorizontal = chart.options.indexAxis === 'y'; const { ctx } = chart;
            const coverSize = isHorizontal ? 40 : 50;
            if (isHorizontal) {
                const { chartArea: { left }, scales: { y } } = chart; const xPos = left - coverSize - 10;
                y.ticks.forEach((tick, index) => { const label = chart.data.labels[index]; if (label && label.coverUrl) drawImage(chart, label.coverUrl, xPos, y.getPixelForTick(index) - coverSize / 2, coverSize); });
            } else {
                const { chartArea: { bottom }, scales: { x } } = chart; const yPos = bottom + 15;
                x.ticks.forEach((tick, index) => { const label = chart.data.labels[index]; if (label && label.coverUrl) drawImage(chart, label.coverUrl, x.getPixelForTick(index) - coverSize / 2, yPos, coverSize); });
            }
        }
    };
    function drawImage(chart, url, x, y, size) {
        let img = imageCache[url];
        if (!img) { img = new Image(); img.src = url; img.onload = () => { imageCache[url] = img; chart.draw(); }; }
        if (img.complete) chart.ctx.drawImage(img, x, y, size, size);
    }
    function createOrUpdateChart() {
        if (salesChart) salesChart.destroy();
        const isMobile = window.innerWidth <= 768;
        const type = isMobile ? 'horizontalBar' : currentChartType;
        let data = [];
        switch (currentFilter) {
            case 'all': data = fullData; break;
            case 'early_era': data = fullData.filter(d => d.singleNumber >= 1 && d.singleNumber <= 7); break;
            case 'climbing_era': data = fullData.filter(d => d.singleNumber >= 8 && d.singleNumber <= 15); break;
            case 'golden_era': data = fullData.filter(d => d.singleNumber >= 16 && d.singleNumber <= 25); break;
            case 'covid_era': data = fullData.filter(d => d.singleNumber >= 26 && d.singleNumber <= 31); break;
            case 'new_era': default: data = fullData.filter(d => d.singleNumber >= 32); break;
        }
        populateTable(data, fullData);
        populateNarrative(currentFilter);
        const sourceDatasets = {
            oriconDay: { label: 'Oricon First Day', data: data.map(d => d.sales.oricon_day1), borderColor: getCssVariable('--chart-color-oricon-day') },
            oriconWeek: { label: 'Oricon First Week', data: data.map(d => d.sales.oricon_week1), borderColor: getCssVariable('--chart-color-oricon-week') },
            billboardWeek: { label: 'Billboard First Week', data: data.map(d => d.sales.billboard_week1), borderColor: getCssVariable('--chart-color-billboard') }
        };
        let activeDatasets = [];
        if (currentMetric === 'both' || currentMetric === 'oricon') {
            if(currentPeriod === 'both' || currentPeriod === 'daily') activeDatasets.push(sourceDatasets.oriconDay);
            if(currentPeriod === 'both' || currentPeriod === 'weekly') activeDatasets.push(sourceDatasets.oriconWeek);
        }
        if (currentMetric === 'both' || currentMetric === 'billboard') {
             if(currentPeriod === 'both' || currentPeriod === 'weekly') activeDatasets.push(sourceDatasets.billboardWeek);
        }
        const chartData = {
            labels: data.map(d => ({ title: d.title, coverUrl: d.coverUrl, number: d.number })),
            datasets: activeDatasets
        };
        const isHorizontal = type === 'horizontalBar';
        const formatCompactNumber = (value) => {
            if (value === null || value === undefined) return '';
            if (value >= 1000000) return (value / 1000000).toFixed(2) + 'M';
            if (value >= 1000) return (value / 1000).toFixed(0) + 'k';
            return value.toFixed(0);
        };
        let datalabelsConfig;
        if (isHorizontal) {
            const numActiveDatasets = activeDatasets.length > 0 ? activeDatasets.length : 1;
            const barPixelHeight = 22; const singleCategorySpacing = 18;
            const dynamicHeight = Math.max(window.innerHeight * 0.8, data.length * ((barPixelHeight * numActiveDatasets) + singleCategorySpacing));
            chartWrapper.style.height = `${dynamicHeight}px`;
            datalabelsConfig = {
                display: showDataLabels, anchor: 'end', align: 'right', offset: -40,
                color: getCssVariable('--chart-datalabel-color-horizontal'),
                font: { size: parseInt(getCssVariable('--chart-datalabel-fontsize-horizontal')), weight: 'bold', family: getCssVariable('--chart-font-family-body') },
                formatter: formatCompactNumber
            };
        } else {
            chartWrapper.style.height = '650px';
            datalabelsConfig = { 
                display: showDataLabels, align: 'top', anchor: 'center', offset: 8,
                color: getCssVariable('--chart-datalabel-color-desktop'),
                backgroundColor: getCssVariable('--chart-datalabel-bgcolor-desktop'),
                borderWidth: 1, borderRadius: 4,
                font: { size: parseInt(getCssVariable('--chart-datalabel-fontsize-desktop')), weight: 'bold' },
                padding: 4, formatter: formatCompactNumber
            };
        }
        const config = {
            type: type === 'line' ? 'line' : 'bar',
            data: chartData,
            plugins: [ChartDataLabels, axisImagePlugin],
            options: {
                clip: false,
                indexAxis: isHorizontal ? 'y' : 'x',
                xAxisStyle: xAxisStyle,
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: (xAxisStyle === 'image') ? (isHorizontal ? { left: 55 } : { bottom: 70 }) : { bottom: 10, right: 20 } },
                plugins: {
                    datalabels: datalabelsConfig,
                    title: { 
                        display: true, text: 'Tren Penjualan Single Nogizaka46',
                        padding: { top: 10, bottom: 20 },
                        font: { size: parseInt(getCssVariable('--chart-font-size-title')), family: getCssVariable('--chart-font-family-title'), weight: 'bold' },
                        color: getCssVariable('--chart-color-title') 
                    },
                    legend: { 
                        position: 'top',
                        labels: { 
                            font: { family: getCssVariable('--chart-font-family-body'), size: parseInt(getCssVariable('--chart-font-size-legend')) },
                            usePointStyle: true, pointStyle: 'rectRounded' 
                        } 
                    },
                    tooltip: { 
                        titleFont: { family: getCssVariable('--chart-font-family-title') },
                        bodyFont: { family: getCssVariable('--chart-font-family-body') },
                        callbacks: { 
                            title: (items) => items[0] && chartData.labels[items[0].dataIndex] ? chartData.labels[items[0].dataIndex].title : '',
                            label: (context) => `${context.dataset.label}: ${context.raw ? context.raw.toLocaleString('id-ID') : '-'}`
                        } 
                    }
                },
                scales: {
                    x: { 
                        offset: true,
                        ticks: { 
                            callback: function(value, index) { const label = chartData.labels[index]; if (!label) return ''; if (isHorizontal && xAxisStyle === 'title') return label.title.length > 20 ? label.title.substring(0, 20) + '...' : label.title; switch (xAxisStyle) { case 'image': return ''; case 'number': return label.number; case 'title': return label.title; default: return ''; } },
                            font: { family: getCssVariable('--chart-font-family-axis'), size: parseInt(getCssVariable('--chart-font-size-axis')) },
                            color: getCssVariable('--chart-color-font'),
                            maxRotation: xAxisStyle === 'title' && !isHorizontal ? 45 : 0, minRotation: xAxisStyle === 'title' && !isHorizontal ? 45 : 0 
                        }, 
                        grid: { display: !isHorizontal, color: getCssVariable('--chart-color-grid') },
                    },
                    y: { 
                        grace: '5%',
                        min: 0,
                        ticks: { 
                            callback: (value, index) => { 
                                const label = chartData.labels[index]; if (!label) return ''; 
                                if (isHorizontal) { 
                                    if (xAxisStyle === 'image') return ''; 
                                    if (xAxisStyle === 'number') return label.number; 
                                    return label.title.length > 20 ? label.title.substring(0, 20) + '...' : label.title; 
                                } 
                                return formatCompactNumber(value); 
                            },
                            font: { family: getCssVariable('--chart-font-family-axis'), size: parseInt(getCssVariable('--chart-font-size-axis')) },
                            color: getCssVariable('--chart-color-font')
                        }, 
                        grid: { display: isHorizontal, color: getCssVariable('--chart-color-grid') },
                    }
                }
            }
        };
        config.data.datasets.forEach(dataset => {
            dataset.tension = 0;
            dataset.backgroundColor = dataset.borderColor;
            dataset.borderWidth = type === 'line' ? 2.5 : 0;
            dataset.pointRadius = type === 'line' ? 4 : 0;
            if (isHorizontal) {
                dataset.barThickness = 22;
            }
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
        metricFilter.addEventListener('change', (e) => { currentMetric = e.target.value; handleUpdate(); });
        periodFilter.addEventListener('change', (e) => { currentPeriod = e.target.value; handleUpdate(); });
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