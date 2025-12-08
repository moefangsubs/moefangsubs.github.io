document.addEventListener('DOMContentLoaded', () => {
    // --- Create and Inject HTML Elements & CSS ---
    
    // 1. Inject CSS into the <head>
    const styles = `
        :root {
            /* Copied from your style_sitemap_update.css for consistency */
            --pixel-update-clip-path-outer: polygon(0px calc(100% - 6px), 2px calc(100% - 6px), 2px calc(100% - 4px), 4px calc(100% - 2px), 6px calc(100% - 2px), 6px 100%, calc(100% - 6px) 100%, calc(100% - 6px) calc(100% - 2px), calc(100% - 4px) calc(100% - 2px), calc(100% - 2px) calc(100% - 4px), calc(100% - 2px) calc(100% - 6px), 100% calc(100% - 6px), 100% 6px, calc(100% - 2px) 6px, calc(100% - 2px) 4px, calc(100% - 4px) 2px, calc(100% - 6px) 2px, calc(100% - 6px) 0px, 6px 0px, 6px 2px, 4px 2px, 2px 4px, 2px 6px, 0px 6px);
	        --pixel-update-clip-path-border: polygon(0px calc(100% - 6px), 2px calc(100% - 6px), 2px calc(100% - 4px), 4px calc(100% - 2px), 6px calc(100% - 2px), 6px 100%, calc(100% - 6px) 100%, calc(100% - 6px) calc(100% - 2px), calc(100% - 4px) calc(100% - 2px), calc(100% - 2px) calc(100% - 4px), calc(100% - 2px) calc(100% - 6px), 100% calc(100% - 6px), 100% 6px, calc(100% - 2px) 6px, calc(100% - 2px) 4px, calc(100% - 4px) 2px, calc(100% - 6px) 2px, calc(100% - 6px) 0px, 6px 0px, 6px 2px, 4px 2px, 2px 4px, 2px 6px, 0px 6px, 0px 50%, 2px 50%, 2px 6px, 4px 6px, 4px 4px, 6px 4px, 6px 2px, calc(100% - 6px) 2px, calc(100% - 6px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 6px, calc(100% - 2px) 6px, calc(100% - 2px) calc(100% - 6px), calc(100% - 4px) calc(100% - 6px), calc(100% - 4px) calc(100% - 4px), calc(100% - 6px) calc(100% - 4px), calc(100% - 6px) calc(100% - 2px), 6px calc(100% - 2px), 6px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 6px), 2px calc(100% - 6px), 2px 50%, 0px 50%);
        }

		.search-floating-button-wrapper {
			position: fixed;
			bottom: 15px;
			right: 15px;
			width: 50px;
			height: 50px;
			cursor: pointer;
			z-index: 999;
			padding-right: 3px;
			padding-bottom: 3px;
		}
        .search-floating-button-shadow {
            content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1; background: var(--moe-tint5); transform: translate(3px, 3px);
            clip-path: var(--pixel-update-clip-path-outer);
        }
        .search-floating-button {
            width: 100%; height: 100%;
            position: relative; z-index: 2;
            background-color: var(--moe-tint6); /* Changed background color */
            display: flex; justify-content: center; align-items: center;
            transition: transform 0.3s ease;
            clip-path: var(--pixel-update-clip-path-outer);
        }
        .search-floating-button-wrapper:hover .search-floating-button {
            transform: translate(-2px, -2px);
        }
        .search-floating-button::after {
            content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 3; background: var(--moe); pointer-events: none;
            clip-path: var(--pixel-update-clip-path-border);
        }
        .search-floating-button img { width: 50%; height: 50%; }

        .search-popup-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.7); z-index: 1000;
            display: none; justify-content: center; align-items: center;
        }
        .search-popup-box-wrapper {
            width: 90%; max-width: 1000px; height: 80vh;
            position: relative; padding-right: 3px; padding-bottom: 3px;
        }
        .search-popup-box-shadow {
            content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1; background: var(--moe-tint5); transform: translate(3px, 3px);
            clip-path: var(--pixel-update-clip-path-outer);
        }
        .search-popup-box {
            background-color: var(--moe-tint7, #f8efff); color: var(--moe);
            width: 100%; height: 100%; position: relative; z-index: 2;
            display: flex; flex-direction: column; padding: 20px;
            clip-path: var(--pixel-update-clip-path-outer);
        }
        .search-popup-box::after {
            content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 3; background: var(--moe-shade-max1); pointer-events: none;
            clip-path: var(--pixel-update-clip-path-border);
        }

        .search-popup-close {
            position: absolute; top: 15px; right: 15px; font-size: 2em;
            cursor: pointer; line-height: 1; font-family: Arial, sans-serif;
            z-index: 4;
        }
        .search-popup-header {
            padding-bottom: 15px; border-bottom: 2px solid var(--moe-tint5, #d5a0ff);
        }
        .search-input-area {
            display: none; /* Initially hidden */
        }
        .search-input-wrapper {
            display: flex; gap: 10px; align-items: center; position: relative;
        }
        #searchInput {
            flex-grow: 1; padding: 10px; border: 2px solid var(--moe-tint5, #d5a0ff);
            font-size: 1em; background: white; width: 100%; padding-right: 35px;
        }
        .search-clear-btn {
            position: absolute; right: 105px; /* Adjust based on CARI button width */
            top: 50%; transform: translateY(-50%);
            cursor: pointer; font-size: 20px; color: #999;
            display: none; /* Hidden by default */
        }
        #searchTrigger {
            padding: 10px 20px; background-color: var(--moe); color: white;
            border: none; cursor: pointer; font-size: 1em;
            clip-path: var(--pixel-update-clip-path-outer);
        }
        #searchTrigger:disabled { background-color: #999; cursor: not-allowed; }

        .search-controls {
            display: flex; align-items: center; gap: 15px; margin-top: 10px; font-size: 0.9em;
        }
        .auto-search-switch {
            display: flex; align-items: center; gap: 5px; cursor: pointer;
        }
        .auto-search-switch input { display: none; }
        .auto-search-switch .switch-ui {
            width: 40px; height: 20px; background: #ccc; position: relative;
            clip-path: var(--pixel-update-clip-path-outer);
        }
        .auto-search-switch .switch-ui::before {
            content: ''; position: absolute; width: 16px; height: 16px;
            background: white; top: 2px; left: 2px; transition: transform 0.2s ease;
            clip-path: var(--pixel-update-clip-path-outer);
        }
        .auto-search-switch input:checked + .switch-ui { background: var(--moe-tint1); }
        .auto-search-switch input:checked + .switch-ui::before { transform: translateX(20px); }
        
        .search-status-message {
            text-align: center; padding: 40px 15px; font-size: 1.1em; color: var(--moe);
        }
        .search-results-container {
            flex-grow: 1; overflow-y: auto; margin-top: 20px;
        }
        .garapan-grid-container {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px; padding: 10px;
        }
        .garapan-item {
            background-color: white; overflow: hidden;
            position: relative; padding-bottom: 3px; padding-right: 3px;
        }
        .garapan-item .item-shadow {
            content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1; background: var(--moe-tint5); transform: translate(3px, 3px);
            clip-path: var(--pixel-update-clip-path-outer);
        }
        .garapan-item a {
            text-decoration: none; color: inherit; display: block;
            width: 100%; height: 100%; position: relative; z-index: 2;
            background: var(--moe-tint7);
            clip-path: var(--pixel-update-clip-path-outer);
            transition: transform 0.2s ease;
        }
        .garapan-item:hover a {
             transform: translate(-2px, -2px);
        }
        .garapan-item a::after {
            content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 3; background: var(--moe-shade-max1); pointer-events: none;
            clip-path: var(--pixel-update-clip-path-border);
        }
        .garapan-item img {
            width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block;
        }
        .garapan-item .title {
            padding: 10px; font-size: 0.9em; font-weight: bold; color: #333;
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Create HTML for the button and popup
    const searchButtonHTML = `
        <div class="search-floating-button-wrapper" title="Cari Garapan">
            <div class="search-floating-button-shadow"></div>
            <div class="search-floating-button">
                <img src="../sprite/element/search.svg" alt="Search">
            </div>
        </div>
    `;
    const searchPopupHTML = `
        <div class="search-popup-overlay">
            <div class="search-popup-box-wrapper">
                <div class="search-popup-box-shadow"></div>
                <div class="search-popup-box">
                    <span class="search-popup-close" title="Tutup">&times;</span>
                    <div class="search-popup-header">
                        <h2 style="margin: 0; font-family: 'M PLUS Rounded 1c', sans-serif;">Pencarian Garapan</h2>
                        <div id="searchInputArea" class="search-input-area">
                            <div class="search-input-wrapper">
                                <input type="text" id="searchInput" placeholder="Ketik minimal 3 huruf..." />
                                <span class="search-clear-btn" title="Hapus teks">&times;</span>
                                <button id="searchTrigger">CARI</button>
                            </div>
                            <div class="search-controls">
                                <label class="auto-search-switch">
                                    <input type="checkbox" id="autoSearchToggle">
                                    <span class="switch-ui"></span>
                                </label>
                                <span>Auto Search</span>
                            </div>
                        </div>
                    </div>
                    <div id="searchStatus" class="search-status-message">Menginisialisasi mesin pencari...</div>
                    <div class="search-results-container">
                        <div id="searchResultsGrid" class="garapan-grid-container"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', searchButtonHTML);
    document.body.insertAdjacentHTML('beforeend', searchPopupHTML);

    // --- State and DOM Element References ---
    let allShowsData = [];
    let isDataLoaded = false;
    
    const floatingButton = document.querySelector('.search-floating-button-wrapper');
    const overlay = document.querySelector('.search-popup-overlay');
    const closeButton = document.querySelector('.search-popup-close');
    const searchStatus = document.getElementById('searchStatus');
    const searchInputArea = document.getElementById('searchInputArea');
    const searchInput = document.getElementById('searchInput');
    const searchClearBtn = document.querySelector('.search-clear-btn');
    const searchTrigger = document.getElementById('searchTrigger');
    const autoSearchToggle = document.getElementById('autoSearchToggle');
    const resultsGrid = document.getElementById('searchResultsGrid');
    
    // --- Core Logic ---
    const DATA_PATH_PREFIXES = { 
        "01_variety": "../store/subs/01_variety/", "02_nogidouga": "../store/subs/02_nogidouga/",
        "03_web": "../store/subs/03_web/", "04_singlebonus": "../store/subs/04_singlebonus/",
        "05_nogikoi": "../store/subs/05_nogikoi/", "06_drama": "../store/subs/06_drama/",
        "07_movie": "../store/subs/07_movie/", "08_stage": "../store/subs/08_stage/",
        "09_documentary": "../store/subs/09_documentary/", "10_sapporo": "../store/subs/10_sapporo/",
        "11_musicprogram": "../store/subs/11_musicprogram/", "12_random": "../store/subs/12_random/",
        "13_concert": "../store/subs/13_concert/", "14_premium": "../store/subs/14_premium/",
        "15_radio": "../store/subs/15_radio/", "16_nonsakamichi": "../store/subs/16_nonsakamichi/"
    };

    async function loadAllData() {
        searchStatus.textContent = 'Mohon tunggu...';
        try {
            const listResponse = await fetch('../store/subs/list.json');
            if (!listResponse.ok) throw new Error('Gagal memuat');
            const showList = await listResponse.json();

            const fetchPromises = [];
            for (const categoryKey in showList) {
                const basePath = DATA_PATH_PREFIXES[categoryKey];
                if (!basePath) continue;

                showList[categoryKey].forEach(showId => {
                    const promise = fetch(`${basePath}${showId}.json`)
                        .then(res => res.ok ? res.json() : null)
                        .catch(err => {
                            console.warn(`Gagal memuat ${showId}.json:`, err);
                            return null;
                        });
                    fetchPromises.push(promise);
                });
            }

            const results = await Promise.all(fetchPromises);
            allShowsData = results.filter(data => data !== null);
            isDataLoaded = true;

            searchStatus.style.display = 'none';
            searchInputArea.style.display = 'block';
            resultsGrid.innerHTML = `<p class="search-status-message">Silakan masukkan kata kunci untuk memulai pencarian.</p>`;
            
        } catch (error) {
            console.error("Error kritis saat memuat data JSON:", error);
            searchStatus.textContent = 'Gagal memuat data. Silakan coba lagi nanti.';
        }
    }

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query.length < 3) {
            resultsGrid.innerHTML = `<p class="search-status-message">Ketik minimal 3 huruf untuk menampilkan hasil.</p>`;
            return;
        }

        const matchedEpisodes = [];

        for (const showData of allShowsData) {
            let isTopLevelMatch = false;
            // Check top-level titles
            if ((showData.nameShowTitle && showData.nameShowTitle.toLowerCase().includes(query)) ||
                (showData.nameShow && showData.nameShow.toLowerCase().includes(query))) {
                isTopLevelMatch = true;
            }

            // If top-level matches, add all available episodes
            if (isTopLevelMatch) {
                if (showData.availableEpisode) {
                    for (const episodeNumber of showData.availableEpisode) {
                        matchedEpisodes.push({ showData, episodeNumber });
                    }
                }
                continue; // Move to the next show to avoid duplicate entries
            }

            // If no top-level match, check per-episode data (for files like random-subs.json)
            if (showData.episodes) {
                for (const episodeNumber in showData.episodes) {
                    const episodeData = showData.episodes[episodeNumber];
                    if ((episodeData.nameShow && episodeData.nameShow.toLowerCase().includes(query)) ||
                        (episodeData.descEpisode && episodeData.descEpisode.toLowerCase().includes(query))) {
                        matchedEpisodes.push({ showData, episodeNumber });
                    }
                }
            }
        }

        displayResults(matchedEpisodes);
    }
    
    function displayResults(matchedEpisodes) {
        if (matchedEpisodes.length === 0) {
            resultsGrid.innerHTML = `<p class="search-status-message">Tidak ada hasil yang ditemukan untuk "${searchInput.value}".</p>`;
            return;
        }

        const resultHTML = matchedEpisodes.map(({ showData, episodeNumber }) => {
            const episodeData = showData.episodes ? (showData.episodes[episodeNumber] || {}) : {};

            let imageUrl = 'https://via.placeholder.com/320x180.png?text=No+Image';
            if (episodeData.imageThumbEps) {
                imageUrl = episodeData.imageThumbEps;
            } else if (showData.IMGThumbnailEps) {
                imageUrl = showData.IMGThumbnailEps.replace('{{eps}}', episodeNumber);
            } else if (showData.imageThumbBigPattern) {
                imageUrl = showData.imageThumbBigPattern.replace('{{eps}}', episodeNumber);
            }

            let fullTitle = '';
            if (showData.url === 'random-subs') {
                fullTitle = episodeData.descEpisode ? episodeData.descEpisode.replace(/\|\s*/, '') : `Episode ${episodeNumber}`;
            } else {
                const epsTitle = episodeData.descEpsListName || (episodeData.descEpisode ? episodeData.descEpisode.replace(/\|\s*/, '') : `Episode ${episodeNumber}`);
                fullTitle = `${showData.nameShowTitle} ${epsTitle}`;
            }
			const link = `../moesubs/#/${showData.url}/${episodeNumber}`;

            return `
                <div class="garapan-item">
                    <div class="item-shadow"></div>
                    <a href="${link}" target="_blank">
                        <img src="${imageUrl}" alt="${fullTitle}" loading="lazy">
                        <div class="title">${fullTitle}</div>
                    </a>
                </div>
            `;
        }).join('');
        
        resultsGrid.innerHTML = resultHTML;
    }

    const debouncedSearch = debounce(performSearch, 400);

    // --- Event Listeners ---
    floatingButton.addEventListener('click', () => {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (!isDataLoaded) {
            loadAllData();
        }
    });

    function closePopup() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    closeButton.addEventListener('click', closePopup);
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closePopup();
        }
    });

    searchTrigger.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' && !autoSearchToggle.checked) {
            performSearch();
        }
    });
    
    searchInput.addEventListener('input', () => {
        searchClearBtn.style.display = searchInput.value.length > 0 ? 'block' : 'none';
        if (autoSearchToggle.checked) {
            debouncedSearch();
        }
    });

    searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchClearBtn.style.display = 'none';
        resultsGrid.innerHTML = `<p class="search-status-message">Silakan masukkan kata kunci untuk memulai pencarian.</p>`;
        searchInput.focus();
    });

    autoSearchToggle.addEventListener('change', () => {
        searchTrigger.disabled = autoSearchToggle.checked;
        if (autoSearchToggle.checked && searchInput.value.length >= 3) {
            performSearch(); // Immediately search if conditions are met
        }
    });
});