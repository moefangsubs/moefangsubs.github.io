// ../js/script_sitemap_garapan.js (FINAL - Dengan Link Tujuan yang Benar)
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

    // ========== LOGIC FOR DIV 3: DAFTAR GARAPAN ==========
    const garapanContainer = document.getElementById('daftar-garapan');
    if (garapanContainer) {
        const listJsonPath = '../store/subs/list.json';
        const updateJsonPath = '../store/subs/update.json';
        const comingsoonJsonPath = '../store/subs/comingsoon.json'; 

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
                const [listResponse, updateResponse, comingsoonResponse] = await Promise.all([
                    fetch(listJsonPath),
                    fetch(updateJsonPath),
                    fetch(comingsoonJsonPath) 
                ]);

                if (!listResponse.ok) throw new Error('Failed to fetch list.json');
                if (!updateResponse.ok) throw new Error('Failed to fetch update.json');
                if (!comingsoonResponse.ok) throw new Error('Failed to fetch comingsoon.json');

                const showList = await listResponse.json();
                const updatesByDate = await updateResponse.json();
                const comingSoonList = await comingsoonResponse.json();

                const comingSoonShows = new Set();
                for (const category in comingSoonList) {
                    comingSoonList[category].forEach(showId => {
                        comingSoonShows.add(showId);
                    });
                }

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
                                
                                const a = document.createElement('a'); // Pindahkan pembuatan elemen 'a' ke atas

                                let badgeHTML = '';
                                let linkHref = `../moesubs/subs.html?show=${data.url}`;

                                if (comingSoonShows.has(data.url)) {
                                    a.classList.add('is-coming-soon'); // TAMBAHKAN BARIS INI
                                    linkHref = `../moesubs/subs.html?status=comingsoon`;
                                    badgeHTML = `
                                        <div class="garapan-comingsoon-wrapper">
                                            <div class="garapan-comingsoon-border"></div>
                                            <div class="garapan-comingsoon">COMING SOON</div>
                                            <div class="garapan-comingsoon-tail"></div>
                                        </div>
                                    `;
                                } else if (updatedShows.has(data.url)) {
                                    badgeHTML = `
                                        <div class="garapan-update-wrapper">
                                            <div class="garapan-update-border"></div>
                                            <div class="garapan-update">NEW!</div>
                                            <div class="garapan-update-tail"></div>
                                        </div>
                                    `;
                                }
                                
                                a.href = linkHref;
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