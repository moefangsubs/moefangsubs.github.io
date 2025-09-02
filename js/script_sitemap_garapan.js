// ../js/script_sitemap_garapan.js (FINAL - Dengan Fitur Label Baru)
document.addEventListener('DOMContentLoaded', () => {

    // ========== LOGIC FOR DIV 1: SALAM PEMBUKA (Tidak berubah) ==========
    const countupDaysSpan = document.getElementById("countup-days");
    if (countupDaysSpan) {
        const calculateDays = (startDate) => {
            const start = new Date(startDate);
            const today = new Date();
            const timeDifference = today - start;
            return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        };
        countupDaysSpan.textContent = calculateDays("2020-07-06");
    }
	
	
	// =====================================
	// Karena logika perhitungan dan animasi angka sudah dipindahkan ke script_sitemap_count.js, kita harus menghapus logika animasi yang duplikat dari script_sitemap_garapan.js agar tidak berjalan dua kali.
	// =====================================
	
    // const counters = document.querySelectorAll('.counter');
    // if (counters.length > 0) {
        // const animate = (counter, countTo, duration) => {
            // let startTime = null;
            // const step = (currentTime) => {
                // if (!startTime) startTime = currentTime;
                // const progress = Math.min((currentTime - startTime) / duration, 1);
                // const currentNum = Math.floor(progress * countTo);
                // counter.textContent = currentNum.toLocaleString('id-ID');
                // if (progress < 1) {
                    // window.requestAnimationFrame(step);
                // }
            // };
            // window.requestAnimationFrame(step);
        // };
        // counters.forEach(counter => {
            // const countTo = parseFloat(counter.dataset.countTo);
            // const duration = parseFloat(counter.dataset.duration);
            // animate(counter, countTo, duration);
        // });
    // }	
	// =====================================

    // ========== LOGIC FOR DIV 3: DAFTAR GARAPAN ==========
    const garapanContainer = document.getElementById('daftar-garapan');
    if (garapanContainer) {
        const listJsonPath = '../store/subs/list.json';
        const updateJsonPath = '../store/subs/update.json'; // BARU: Path ke update.json

        const categoryDetails = {
            "01_variety": { name: "TV VARIETY SHOW", path: '../store/subs/01_variety' },
            "02_nogidouga": { name: "NOGI DOUGA CONTENT", path: '../store/subs/02_nogidouga' },
            "03_web": { name: "WEB CONTENT", path: '../store/subs/03_web' },
            "04_singlebonus": { name: "SINGLE BONUS", path: '../store/subs/04_singlebonus' },
            "05_nogikoi": { name: "NOGIKOI, HINAKOI & SAKUKOI", path: '../store/subs/05_nogikoi' },
            "06_drama": { name: "DRAMA", path: '../store/subs/06_drama' },
            "07_movie": { name: "MOVIE", path: '../store/subs/07_movie' },
            "08_stage": { name: "STAGE & THEATER", path: '../store/subs/08_stage' },
            "09_documentary": { name: "DOCUMENTARY", path: '../store/subs/09_documentary' },
            "10_sapporo": { name: "CUPSTAR SERIES", path: '../store/subs/10_sapporo' },
            "11_musicprogram": { name: "MUSIC PROGRAM PERFORMANCE", path: '../store/subs/11_musicprogram' },
            "12_random": { name: "RANDOM CONTENT", path: '../store/subs/12_random' },
            "13_concert": { name: "CONCERT & LIVE PERFORMANCE", path: '../store/subs/13_concert' },
            "14_premium": { name: "PREMIUM CONTENT", path: '../store/subs/14_premium' },
            "15_radio": { name: "RADIO & READING", path: '../store/subs/15_radio' },
            "16_nonsakamichi": { name: "NON-SAKAMICHI CONTENT", path: '../store/subs/16_nonsakamichi' }
        };

        const fetchShowData = async (showId, basePath) => {
            try {
                const response = await fetch(`${basePath}/${showId}.json`);
                if (!response.ok) throw new Error(`Failed to fetch ${showId}.json`);
                return await response.json();
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        const buildGarapanList = async () => {
            try {
                // BARU: Ambil data dari list.json dan update.json
                const [listResponse, updateResponse] = await Promise.all([
                    fetch(listJsonPath),
                    fetch(updateJsonPath) 
                ]);

                if (!listResponse.ok) throw new Error('Failed to fetch list.json');
                if (!updateResponse.ok) throw new Error('Failed to fetch update.json');

                const showList = await listResponse.json();
                const updatesByDate = await updateResponse.json();

                // BARU: Buat daftar acara yang baru diupdate untuk pengecekan cepat
                const updatedShows = new Set();
                updatesByDate.forEach(entry => {
                    entry.updates.forEach(update => {
                        updatedShows.add(update.showId);
                    });
                });

                for (const categoryKey in showList) {
                    if (categoryDetails[categoryKey] && showList[categoryKey].length > 0) {
                        const categoryInfo = categoryDetails[categoryKey];
                        const subcategoryDiv = document.createElement('div');
                        subcategoryDiv.className = 'div-subcategory';
                        
                        const title = document.createElement('h3');
                        title.textContent = categoryInfo.name;
                        subcategoryDiv.appendChild(title);
                        
                        const gridDiv = document.createElement('div');
                        gridDiv.className = 'garapan-grid';

                        const showPromises = showList[categoryKey].map(showId => fetchShowData(showId, categoryInfo.path));
                        const showsData = await Promise.all(showPromises);

                        showsData.forEach(data => {
                            if (data && data.url && data.nameShowTitle && data.IMGSitemap) {
                                
                                // BARU: Cek apakah acara ini ada di daftar update
                                let badgeHTML = '';
                                if (updatedShows.has(data.url)) {
                                    badgeHTML = `
                                        <div class="garapan-update-wrapper">
                                            <div class="garapan-update-border"></div>
                                            <div class="garapan-update">NEW!</div>
											<div class="garapan-update-tail"></div>
                                        </div>
                                    `;
                                }
                                
                                const a = document.createElement('a');
                                a.href = `../moesubs/subs.html?show=${data.url}`;
                                a.innerHTML = `
                                    <div class="cat-acara">
                                        <img src="${data.IMGSitemap}" alt="${data.nameShowTitle}" loading="lazy">
                                        <div class="cat-acara-border"></div>
                                        <div class="cat-acara-shade1"></div>
                                        <div class="cat-acara-shade2"></div>
                                        ${badgeHTML} 
                                    </div>
                                    <span>${data.nameShowTitle}</span>
                                `;
                                gridDiv.appendChild(a);
                            }
                        });
                        
                        subcategoryDiv.appendChild(gridDiv);
                        garapanContainer.appendChild(subcategoryDiv);
                    }
                }
            } catch (error) {
                console.error('Error building garapan list:', error);
                garapanContainer.innerHTML += '<p style="text-align:center;">Gagal memuat daftar garapan.</p>';
            }
        };

        buildGarapanList();
    }
});