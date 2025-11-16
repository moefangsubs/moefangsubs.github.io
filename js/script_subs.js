// ../js/script_subs.js (FINAL - Dengan penanganan Coming Soon)
document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIG & DOM ELEMENTS --- //
    const contentContainer = document.getElementById('content-container');
    const episodeListContainer = document.getElementById('episode-list-container');
    const popupContainer = document.getElementById('popup-container');
    const redirectBtn = document.getElementById('popup-redirect-btn');
    const loadingOverlay = document.getElementById('loading-overlay'); 
    const faqContainerWrapper = document.getElementById('faq-container-wrapper');
    const faqContainer = document.getElementById('faq-container');
    
    const DATA_PATH_PREFIXES = [
        '../store/subs/01_variety/', 
        '../store/subs/02_nogidouga/',
        '../store/subs/03_web/',
        '../store/subs/04_singlebonus/',
        '../store/subs/05_nogikoi/',
        '../store/subs/06_drama/',
        '../store/subs/07_movie/',
        '../store/subs/08_stage/',
        '../store/subs/09_documentary/',
        '../store/subs/10_sapporo/',
        '../store/subs/11_musicprogram/',
        '../store/subs/12_random/',
        '../store/subs/13_concert/',
        '../store/subs/14_premium/',
        '../store/subs/15_radio/',
        '../store/subs/16_nonsakamichi/'
    ];
    const MEMBERS_DATA_PATH = '../store/member/members.json';
    const WARNINGS_DATA_PATH = '../store/subs/warn.json';
    const FAQ_DATA_PATH = '../store/data/faq.json';
	const UPDATES_DATA_PATH = '../store/subs/update.json';

    let membersData = null;
    let warningsData = null;
    let currentShowData = null;
    let currentShowPath = null;
    let faqData = null;
	let updatesData = null;

    // --- FUNGSI BARU UNTUK MENAMPILKAN PESAN COMING SOON --- //
    function renderComingSoon() {
        if (episodeListContainer) {
            const wrapper = episodeListContainer.closest('.pixel-border-wrapper');
            if (wrapper) wrapper.style.display = 'none';
        }

        // Atur agar content container memenuhi lebar
        const contentWrapper = contentContainer.closest('.pixel-border-wrapper');
        if (contentWrapper) {
            contentWrapper.style.flex = '1 1 100%';
            contentWrapper.style.maxWidth = '100%';
        }

        // Tambahkan style khusus untuk pesan
        const style = document.createElement('style');
        style.textContent = `
            .status-message-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 50vh;
                text-align: center;
                color: var(--moe-shade-min2);
                padding: 2rem;
            }
            .status-message-container h1 {
                font-size: 4rem;
                font-weight: 900;
                color: var(--moe);
                margin: 0;
            }
            .status-message-container p {
                font-size: 1.2rem;
                margin-top: 1rem;
            }
            @media (max-width: 768px) {
                .status-message-container h1 {
                    font-size: 2.5rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Tampilkan pesan di content container
        contentContainer.innerHTML = `
            <div class="status-message-container">
                <h1>Coming Soon</h1>
                <p>Akan kami garap secepatnya ketika sudah tersedia.</p>
            </div>
        `;

        // Ubah judul halaman
        document.title = "Coming Soon | MoeFang Subs";

        // Sembunyikan loading
        if(loadingOverlay) loadingOverlay.style.display = 'none';
    }


    // --- MAIN INITIALIZATION --- //
	async function init() {
        if(loadingOverlay) loadingOverlay.style.display = 'flex';

        const params = new URLSearchParams(window.location.search);
        const showName = params.get('show');
        const status = params.get('status'); // Ambil parameter status
        let episodeNumber = params.get('eps');

        // Jika URL memiliki ?status=comingsoon, jalankan fungsi khusus dan hentikan proses
        if (status === 'comingsoon') {
            renderComingSoon();
            return; // Hentikan eksekusi fungsi init lebih lanjut
        }

        if (!showName) {
            handleNoShowSelected();
            if(loadingOverlay) loadingOverlay.style.display = 'none';
            return;
        }

        try {
            [membersData, warningsData, faqData, updatesData] = await Promise.all([
                fetchData(MEMBERS_DATA_PATH),
                fetchData(WARNINGS_DATA_PATH),
                fetchData(FAQ_DATA_PATH),
				fetchData(UPDATES_DATA_PATH)
            ]);

            const showInfo = await fetchShowData(showName);
            if (!showInfo) throw new Error(`Show data for "${showName}" not found.`);
            
            currentShowData = showInfo.data;
            currentShowPath = showInfo.path;
            document.title = `${currentShowData.nameShowTitle} | MoeFang Subs`;
            
            const isSingleEpisodeView = currentShowPath.includes('07_movie/') || currentShowPath.includes('08_stage/');

            if (isSingleEpisodeView && (!currentShowData.availableEpisode || currentShowData.availableEpisode.length === 0)) {
                currentShowData.availableEpisode = ["01"];
            }

            if (!episodeNumber && currentShowData.availableEpisode && currentShowData.availableEpisode.length > 0) {
                episodeNumber = currentShowData.availableEpisode[0]; 
                const newUrl = `?show=${showName}&eps=${episodeNumber}`;
                history.replaceState({ episode: episodeNumber }, '', newUrl);
            }

            renderWarningBox(currentShowPath, showName, episodeNumber);
            
            if (isSingleEpisodeView) {
                const episodeListWrapper = document.querySelector('#episode-list-container')?.closest('.pixel-border-wrapper');
                if (episodeListWrapper) {
                    episodeListWrapper.remove();
                }

                const contentContainerWrapper = document.querySelector('#content-container')?.closest('.pixel-border-wrapper');
                if (contentContainerWrapper) {
                    contentContainerWrapper.style.flex = '1 1 100%';
                    contentContainerWrapper.style.maxWidth = '100%';
                }
            } else {
                renderEpisodeList(currentShowData, episodeNumber);
                addEpisodeNavigationHandler();
            }

            if (episodeNumber) {
                await renderEpisodeContent(currentShowData, episodeNumber, currentShowPath);
                renderFaq(currentShowData, episodeNumber);
            } else {
                handleShowWithoutEpisode();
            }
            
            window.addEventListener('popstate', handlePopState);

        } catch (error) {
            console.error('Error loading show data:', error);
            contentContainer.innerHTML = '<h2>Error: Acara tidak ditemukan.</h2><p>Pastikan parameter URL `show` sudah benar dan file JSON ada.</p>';
        } finally {
            if(loadingOverlay) loadingOverlay.style.display = 'none';
        }
    }
	
    // --- DATA FETCHING & STATE HANDLERS --- //
    async function fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    }

    async function fetchShowData(showName) {
        for (const prefix of DATA_PATH_PREFIXES) {
            try {
                const data = await fetchData(`${prefix}${showName}.json`);
                return { data: data, path: prefix };
            } catch (error) {
            }
        }
        return null;
    }
    
    function renderWarningBox(showPath, showName, currentEpisode) {
        if (!warningsData || !showPath || !showName) return;

        const oldWarning = document.getElementById('show-warning-box-wrapper');
        if (oldWarning) oldWarning.remove();

        const fullShowPath = `${showPath}${showName}.json`;
        
        const warning = warningsData.find(w => {
            if (!w.targets || !Array.isArray(w.targets)) return false;

            return w.targets.some(target => {
                const [targetPath, targetQuery] = target.split('?');
                
                if (targetPath !== fullShowPath) {
                    return false;
                }

                if (targetQuery) {
                    const targetParams = new URLSearchParams(targetQuery);
                    const targetEpisode = targetParams.get('episodes');
                    return currentEpisode === targetEpisode;
                } else {
                    return true;
                }
            });
        });

        if (warning) {
            const warningHTML = buildWarningHTML(warning);
            contentContainer.insertAdjacentHTML('afterbegin', warningHTML);
        }
    }

    function buildWarningHTML(warning) {
        let content = `<p>${warning.text}`;
        
        let i = 1;
        while (warning[`a${i}`] && warning[`directurl${i}`]) {
            content += `<a href="${warning[`directurl${i}`]}" target="_blank" rel="noopener noreferrer">${warning[`a${i}`]}</a>`;
            i++;
        }
        content += `</p>`;
        
        return `
            <div class="pixel-border-wrapper warning-box-wrapper" id="show-warning-box-wrapper">
                <div class="pixel-border-item warning-box type-${warning.type}">
                    ${content}
                </div>
                <div class="pixel-border-shadow"></div>
            </div>`;
    }


    function handleNoShowSelected() {
        popupContainer.style.display = 'flex';
        let countdown = 3;
        redirectBtn.textContent = `Kembali ke Sitemap (${countdown})`;
        const interval = setInterval(() => {
            countdown--;
            redirectBtn.textContent = `Kembali ke Sitemap (${countdown})`;
            if (countdown <= 0) {
                clearInterval(interval);
                window.location.href = '../sitemap.html';
            }
        }, 1000);
        redirectBtn.onclick = () => {
            clearInterval(interval);
            window.location.href = '../sitemap.html';
        };
    }

    function handleShowWithoutEpisode() {
        contentContainer.innerHTML = `<div class="content-section"><h2>Pilih Episode</h2><p>Silakan pilih episode dari daftar di kiri untuk melihat detailnya.</p></div>`;
        if (window.innerWidth <= 900 && episodeListContainer) {
            episodeListContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // --- DYNAMIC NAVIGATION LOGIC --- //
    function addEpisodeNavigationHandler() {
        if (!episodeListContainer) return;
        episodeListContainer.addEventListener('click', (event) => {
            const episodeLink = event.target.closest('.episode-item');
            if (!episodeLink) return;
            event.preventDefault();
            const url = new URL(episodeLink.href);
            const newEpisodeNumber = url.searchParams.get('eps');
            if (currentShowData && newEpisodeNumber) {
                loadEpisode(newEpisodeNumber);
            }
        });
    }

    function loadEpisode(episodeNumber) {
        if (!currentShowData || !episodeNumber) return;

        renderWarningBox(currentShowPath, currentShowData.url, episodeNumber);
        
        renderEpisodeContent(currentShowData, episodeNumber, currentShowPath);
        renderFaq(currentShowData, episodeNumber);

        const listContainer = document.getElementById('episode-list');
        if (listContainer) {
            const currentActive = listContainer.querySelector('.active');
            if (currentActive) currentActive.classList.remove('active');
            const newActive = listContainer.querySelector(`a[href*="&eps=${episodeNumber}"]`);
            if (newActive) newActive.classList.add('active');
        }
        const newUrl = `?show=${currentShowData.url}&eps=${episodeNumber}`;
        history.replaceState({ episode: episodeNumber }, '', newUrl);
        contentContainer.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }

    function handlePopState(event) {
        const params = new URLSearchParams(window.location.search);
        const episodeNumber = params.get('eps');
        if (episodeNumber && currentShowData) {
            loadEpisode(episodeNumber);
        }
    }

    // --- RENDERING & HELPER FUNCTIONS --- //
	function renderEpisodeList(showData, activeEpisode) {
		if (!episodeListContainer || !updatesData) return;

		const episodeList = document.createElement('div');
		episodeList.id = 'episode-list';
		const reversedEpisodes = showData.availableEpisode.slice().reverse();
		const showId = showData.url;

		reversedEpisodes.forEach(eps => {
			const episodeData = showData.episodes[eps];
			let imageUrl = episodeData?.imageThumbEps || showData.IMGThumbnailEps?.replace('{{eps}}', eps) || '../sprite/placeholder.jpg';
			let episodeText = episodeData?.descEpsListName || 
                              showData.descEpsListName?.replace('{{eps}}', eps) || 
                              `Episode ${eps}`;

			if (episodeData && (episodeData.thisEnd === true || episodeData.thisEnd === "yes")) {
				episodeText += " [END]";
			}
			
			const episodeLink = document.createElement('a');
			episodeLink.href = `?show=${showData.url}&eps=${eps}`;
			episodeLink.className = 'episode-item';
			if (eps === activeEpisode) episodeLink.classList.add('active');
			episodeLink.innerHTML = `<img src="${imageUrl}" alt="${episodeText}" loading="lazy"><span>${episodeText}</span>`;
			
			// Logika memeriksa setiap episode (eps) terhadap data dari update.json.
			const isNew = updatesData.some(updateGroup =>
				updateGroup.updates.some(update => 
					update.showId === showId && update.eps === eps
				)
			);

			if (isNew) {
				episodeLink.classList.add('is-new');
				const newLabel = document.createElement('div');
				newLabel.className = 'new-label';
				newLabel.textContent = 'NEW';
				episodeLink.appendChild(newLabel);
			}
			
			episodeList.appendChild(episodeLink);
		});

		episodeListContainer.innerHTML = '<h4>Daftar Episode</h4>';
		episodeListContainer.appendChild(episodeList);
	}
    
	async function renderEpisodeContent(showData, episodeNumber, showPath) {
		const episodeData = showData.episodes[episodeNumber];
		if (!episodeData) {
			console.error(`Data untuk episode ${episodeNumber} tidak ditemukan.`);
			contentContainer.innerHTML = '<h2>Error: Data episode tidak ditemukan.</h2>';
			return; 
		}

        const warningBox = contentContainer.querySelector('#show-warning-box-wrapper');
        contentContainer.innerHTML = ''; 
        if(warningBox) contentContainer.appendChild(warningBox);

		contentContainer.insertAdjacentHTML('beforeend', buildHeader(showData, episodeData, episodeNumber, showPath));
		contentContainer.insertAdjacentHTML('beforeend', buildThumbnails(showData, episodeData, episodeNumber));
		contentContainer.insertAdjacentHTML('beforeend', buildSynopsis(showData, episodeData, episodeNumber));
		contentContainer.insertAdjacentHTML('beforeend', buildInfoList(showData, episodeData, episodeNumber, showPath));
		contentContainer.insertAdjacentHTML('beforeend', buildSkitsList(episodeData));
		contentContainer.insertAdjacentHTML('beforeend', buildSongList(episodeData));
		contentContainer.insertAdjacentHTML('beforeend', buildLiteraturList(episodeData));
		contentContainer.insertAdjacentHTML('beforeend', buildButtons(showData, episodeData));
		contentContainer.insertAdjacentHTML('beforeend', buildPasswordBox(showData, episodeData, episodeNumber));
		
		addSongButtonListeners();
		addPasswordButtonListeners();
		addImagePopupListeners();
	}   
	
	function buildHeader(showData, episodeData, episodeNumber, showPath) {
		let episodeDesc = episodeData.descEpisode || `| Episode ${episodeNumber}`;
		if (episodeData.thisEnd === true || episodeData.thisEnd === "yes") {
			episodeDesc += " [TAMAT]";
		}
		let mainTitle = '';
		let subTitleHTML = '';

		if (showPath && showPath.includes('12_random/')) {
			mainTitle = episodeDesc.replace('|', '').trim();
			subTitleHTML = '';
		} else {
			mainTitle = showData.nameShowTitle;
			subTitleHTML = `<h3>${episodeDesc}</h3>`;
		}

		return `
			<div id="content-header">
				<div class="header-title">
					<h1>${mainTitle}</h1>
					${subTitleHTML}
				</div>
			</div>`;
	}
	
	function buildThumbnails(showData, episodeData, episodeNumber) {
		const mainThumbsList = [];
		const primaryBigThumb = episodeData.imageThumbBig || showData.imageThumbBigPattern?.replace('{{eps}}', episodeNumber);
		if (primaryBigThumb) mainThumbsList.push(primaryBigThumb);

		for (let i = 0; i <= 20; i++) {
			const key = `imageManga${String(i).padStart(2, '0')}`;
			if (episodeData[key]) mainThumbsList.push(episodeData[key]);
		}

		const smallThumbs = [
			episodeData.imageThumbA || showData.imageThumbAPattern?.replace('{{eps}}', episodeNumber),
			episodeData.imageThumbB || showData.imageThumbBPattern?.replace('{{eps}}', episodeNumber),
			episodeData.imageThumbC || showData.imageThumbCPattern?.replace('{{eps}}', episodeNumber),
			episodeData.imageThumbD || showData.imageThumbDPattern?.replace('{{eps}}', episodeNumber)
		].filter(Boolean);

		if (mainThumbsList.length === 0 && smallThumbs.length === 0) return '';
		let content = '<div id="content-thumbnails">';
		mainThumbsList.forEach(thumbUrl => {
			content += `<img src="${thumbUrl}" class="main-thumb" alt="Main Thumbnail" loading="lazy">`;
		});
		if (smallThumbs.length > 0) {
		const gridClass = smallThumbs.length === 3 ? 'small-thumbs-grid three-items' : 'small-thumbs-grid';
		content += `<div class="${gridClass}">`;
			smallThumbs.forEach(thumb => {
				content += `<img src="${thumb}" alt="Thumbnail" loading="lazy">`;
			});
			content += '</div>';
		}
		content += '</div>';
		return content;
	}
    
    function buildSynopsis(showData, episodeData, episodeNumber) {
        let content = '';
        if (showData.descSynopsis || episodeData.descEpisodeSynopsis) {
            content += '<div id="content-synopsis" class="content-section"><h4>Sinopsis</h4>';
            if (showData.descSynopsis) content += `<p>${showData.descSynopsis}</p>`;
            if (episodeData.descEpisodeSynopsis) content += `<p>${episodeData.descEpisodeSynopsis}</p>`;
            content += '</div>';
        }
        return content;
    }
	

		// --- Fungsi Helper untuk Tanggal Otomatis ---

		/**
		 * Mengubah string format YYMMDD menjadi objek Date JavaScript.
		 * @param {string} dateStr - String tanggal (misal: "240628").
		 * @returns {Date} Objek Date.
		 */
		function parseYYMMDD(dateStr) {
			const year = parseInt(`20${dateStr.substring(0, 2)}`, 10);
			const month = parseInt(dateStr.substring(2, 4), 10) - 1; // bulan di JS (0-11)
			const day = parseInt(dateStr.substring(4, 6), 10);
			return new Date(year, month, day);
		}

		/**
		 * Memformat objek Date menjadi string bahasa Indonesia.
		 * @param {Date} dateObj - Objek Date.
		 * @returns {string} String tanggal (misal: "28 Juni 2024").
		 */
		function formatDateID(dateObj) {
			return dateObj.toLocaleDateString('id-ID', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			});
		}
		
	function buildInfoList(showData, episodeData, episodeNumber, showPath) {
        let listHTML = '';
        const items = [];
		
        // --- Logika Nama Acara ---
        if (showPath && showPath.includes('04_singlebonus')) {
            if (showData.nameShow) items.push(`<li><span class="info-label l-sk">Single</span><span class="info-value jpn">${showData.nameShow}</span></li>`);
            if (episodeData.nameShow) items.push(`<li><span class="info-label l-cd">Judul Bonus</span><span class="info-value jpn">${episodeData.nameShow}</span></li>`);
        } else {
            const showName = episodeData.nameShow || showData.nameShow;
            if (showName) items.push(`<li><span class="info-label l-tv">Nama Acara</span><span class="info-value jpn">${showName}</span></li>`);
        }
		
		let airDateString = '';
		if (episodeData.descOnAirDate) {
			airDateString = episodeData.descOnAirDate;
		} else if (showData.descOnAirDatePattern && showData.OnAirEvery && showData.availableEpisode) {
            let baseDateStr = showData.descOnAirDatePattern;
            let baseEpisode = showData.availableEpisode[0];
            let interval = parseInt(showData.OnAirEvery, 10);
            
            const currentIndex = showData.availableEpisode.indexOf(episodeNumber);

            if (showData.OnAirPatternRestarts && Array.isArray(showData.OnAirPatternRestarts)) {
                for (let i = showData.OnAirPatternRestarts.length - 1; i >= 0; i--) {
                    const restart = showData.OnAirPatternRestarts[i];
                    const restartIndex = showData.availableEpisode.indexOf(restart.fromEpisode);
                    
                    if (currentIndex >= restartIndex) {
                        baseDateStr = restart.newStartDate;
                        baseEpisode = restart.fromEpisode;
                        if (restart.newInterval) {
                            interval = parseInt(restart.newInterval, 10);
                        }
                        break;
                    }
                }
            }

			try {
				const baseDate = parseYYMMDD(baseDateStr);
                const startIndex = showData.availableEpisode.indexOf(baseEpisode);

				if (startIndex > -1 && currentIndex > -1 && !isNaN(interval)) {
                    const episodesSinceStart = currentIndex - startIndex;
					const daysToAdd = episodesSinceStart * interval;
                    
					baseDate.setDate(baseDate.getDate() + daysToAdd);
					airDateString = formatDateID(baseDate);
				}
			} catch (e) {
				console.error("Error saat kalkulasi tanggal otomatis:", e);
			}
		}
		
		if (airDateString) {
            items.push(`<li><span class="info-label l-dt">Tanggal Rilis</span><span class="info-value">${airDateString}</span></li>`);
        }

        const participants = episodeData.memberParticipate || showData.memberParticipate;
        if (participants) items.push(`<li><span class="info-label l-us">Member</span><span class="info-value">${processMemberNames(participants)}</span></li>`);
        if (episodeData.additionalSenpai) items.push(`<li><span class="info-label l-se">Tamu (Senpai)</span><span class="info-value">${processMemberNames(episodeData.additionalSenpai)}</span></li>`);
        const guests = episodeData.additionalGuests || episodeData.guestArtis;
        if (guests) items.push(`<li><span class="info-label l-ar">Bintang Tamu</span><span class="info-value">${guests}</span></li>`);
        
		if (items.length > 0) listHTML = `<div class="content-section"><h4>Informasi</h4><ul class="info-list">${items.join('')}</ul></div>`;
        return listHTML;
    }
    
    function buildSkitsList(episodeData) {
        const items = [];
        if (episodeData.descSkits) items.push(`<li class="jpn"><strong>Skits:</strong> ${episodeData.descSkits}</li>`);
        if (episodeData.descSkitsA) items.push(`<li class="jpn"><strong>Skits 1:</strong> ${episodeData.descSkitsA}</li>`);
        if (episodeData.descSkitsB) items.push(`<li class="jpn"><strong>Skits 2:</strong> ${episodeData.descSkitsB}</li>`);
        if (items.length > 0) return `<div class="content-section"><h4>Skits</h4><ul class="skits-list">${items.join('')}</ul></div>`;
        return '';
    }

	function buildSongList(episodeData) {
		const items = [];
		for (let i = 1; i <= 6; i++) {
			const song = episodeData[`descSong${i}`];
			if (song) {
				const button = `
					<div class="pixel-border-wrapper yt-button-wrapper">
						<div class="pixel-border-item">
							<button class="Youtube-btn" data-song="${song}">▶</button>
						</div>
						<div class="pixel-border-shadow"></div>
					</div>
				`;
				items.push(`<li class="jpn"><span>Lagu ${i}: ${song}</span>${button}</li>`);
			}
		}
		if (items.length > 0) return `<div class="content-section"><h4>Lagu</h4><ul class="song-list">${items.join('')}</ul></div>`;
		return '';
	}
    
    function buildLiteraturList(episodeData) {
        const items = [];
        if (episodeData.LiteraturName) items.push(`<li><strong style="font-size:1.3rem">「${episodeData.LiteraturName}」</strong></li>`);
        if (episodeData.LiteraturAuthor) items.push(`<li><i>～${episodeData.LiteraturAuthor}～</i></li>`);
        if (items.length > 0) return `<div class="content-section"><h4>Literatur</h4><ul class="skits-list">${items.join('')}</ul></div>`;
        return '';
    }

	function buildButtons(showData, episodeData) {
		const trakteerLinks = [];
		const trakteerKeys = ['linkTrakteer', 'linkTrakteerA', 'linkTrakteerB', 'linkTrakteerC', 'linkTrakteerD'];
		const addedKeys = new Set();
		trakteerKeys.forEach(key => {
			if (showData[key] && !addedKeys.has(key)) {
				const textKey = key.replace('link', '');
				const description = showData[textKey];
				const buttonText = description ? `TRAKTEER (${description})` : 'TRAKTEER';
				trakteerLinks.push({ url: showData[key], text: buttonText });
				addedKeys.add(key);
			}
		});
		trakteerKeys.forEach(key => {
			if (episodeData[key] && !addedKeys.has(key)) {
				const textKey = key.replace('link', '');
				const description = episodeData[textKey];
				const buttonText = description ? `TRAKTEER (${description})` : 'TRAKTEER';
				trakteerLinks.push({ url: episodeData[key], text: buttonText });
				addedKeys.add(key);
			}
		});

		let buttonHTML = '';
		const hasHardsub = !!episodeData.linkHardsub;
		const hasSoftsub = !!episodeData.linkSoftsub;

		const createButtonWrapper = (content, customClass = '') => `
			<div class="pixel-border-wrapper dl-button-wrapper ${customClass}">
				<div class="pixel-border-item">${content}</div>
				<div class="pixel-border-shadow"></div>
			</div>
		`;

		if (hasHardsub) {
			const button = `<a href="${episodeData.linkHardsub}" target="_blank" rel="noopener noreferrer" class="dl-button btn-sub" style="--border-color: var(--moe);"><span>HARDSUB</span></a>`;
			buttonHTML += createButtonWrapper(button, !hasSoftsub ? 'full-width' : '');
		}
		if (hasSoftsub) {
			const button = `<a href="${episodeData.linkSoftsub}" target="_blank" rel="noopener noreferrer" class="dl-button btn-sub" style="--border-color: var(--moe);"><span>SOFTSUB</span></a>`;
			buttonHTML += createButtonWrapper(button, !hasHardsub ? 'full-width' : '');
		}
		trakteerLinks.forEach(link => {
			const button = `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="dl-button btn-trakteer" style="--border-color: #961234;"><span>${link.text}</span></a>`;
			buttonHTML += createButtonWrapper(button, 'full-width');
		});

		const finalLinkRAW = episodeData.linkRAW || showData.linkRAW;
		const finalRawSource = episodeData.RawSource || showData.RawSource || '?';
		const hasFont = !!showData.linkFont;

		if (finalLinkRAW) {
			const button = `<a href="${finalLinkRAW}" target="_blank" rel="noopener noreferrer" class="dl-button btn-extra" style="--border-color: var(--moe-tint4);"><span>RAW (${finalRawSource})</span></a>`;
			buttonHTML += createButtonWrapper(button, !hasFont ? 'full-width' : '');
		}
		if (hasFont) {
			const button = `<a href="${showData.linkFont}" target="_blank" rel="noopener noreferrer" class="dl-button btn-extra" style="--border-color: var(--moe-tint4);"><span>FONT</span></a>`;
			buttonHTML += createButtonWrapper(button, !finalLinkRAW ? 'full-width' : '');
		}

		if (buttonHTML) return `<div id="content-buttons">${buttonHTML}</div>`;
		return '';
	}

	function buildPasswordBox(showData, episodeData, episodeNumber) {
		const passwordTemplate = episodeData.filePassword || showData.filePassword;
		if (!passwordTemplate) return '';
		const finalPassword = passwordTemplate.replace('{{eps}}', episodeNumber);
		return `
			<div id="password-section">
				<h4>Password File</h4>
				<div id="password-box">
					<span id="password-display" data-password="${finalPassword}">*****</span>
					<button id="toggle-password-btn">Show</button>
					<button id="copy-password-btn" class="l-cp"></button>
				</div>
			</div>`;
	}
    
    // --- FAQ Logic ---
    function renderFaq(showData, episodeNumber) {
        if (!faqContainerWrapper || !faqData) return;

        let html = '';
        const episodeData = showData.episodes[episodeNumber];

        const buildFaqSection = (id, title, data, isDropdown) => {
            const content = Object.values(data).map(item => `<li>${item}</li>`).join('');
            const listType = id === 'faq-warning' ? 'ul' : 'ol';
            
            return `
                <div id="${id}" class="faq-item pixel-border-wrapper">
                    <div class="pixel-border-item">
                        <div class="faq-header ${isDropdown ? '' : 'no-dropdown'}">
                            <span>${title}</span>
                        </div>
                        <div class="faq-content">
                            <${listType}>${content}</${listType}>
                        </div>
                    </div>
                    <div class="pixel-border-shadow"></div>
                </div>`;
        };

        html += buildFaqSection('faq-warning', 'PERINGATAN', faqData.warning, false);
        if (episodeData.linkSoftsub) {
            html += buildFaqSection('faq-softsub', 'CARA PENGGUNAAN SOFTSUB', faqData['howto-softsub'], true);
        }
        if (episodeData.linkHardsub) {
            html += buildFaqSection('faq-hardsub', 'CARA PENGGUNAAN HARDSUB', faqData['howto-hardsub'], true);
        }
        html += buildFaqSection('faq-main', 'FAQ', faqData.faq, true);
        
        faqContainer.innerHTML = html;
        faqContainerWrapper.style.display = 'block';

        const setupAccordion = () => {
            const headers = faqContainer.querySelectorAll('.faq-header:not(.no-dropdown)');
            headers.forEach(header => {
                header.addEventListener('click', () => {
                    const content = header.nextElementSibling;
                    const isActive = header.classList.contains('active');

                    headers.forEach(h => {
                        h.classList.remove('active');
                        h.nextElementSibling.classList.remove('visible');
                    });

                    if (!isActive) {
                        header.classList.add('active');
                        content.classList.add('visible');
                    }
                });
            });
        };
        setupAccordion();
        
        const warningHeader = document.querySelector('#faq-warning .faq-header');
        if (warningHeader) {
            const content = warningHeader.nextElementSibling;
            content.classList.add('visible');
        }
    }

    function processMemberNames(namesString) {
        if (!namesString || !membersData) return namesString;
        const names = namesString.split('、');
        return names.map(name => {
            const cleanedName = name.replace(/[\u200B-\u200F\uFEFF]/g, '').trim();
            const memberInfo = membersData.find(m => m.nama_jp === cleanedName);
            if (memberInfo && memberInfo.id) return `<a href="../moedata/member.html?id=${memberInfo.id}" class="jpn">${cleanedName}</a>`;
            return `<span class="jpn">${cleanedName}</span>`;
        }).join('、 ');
    }
    
    function addSongButtonListeners() {
        document.querySelectorAll('.Youtube-btn').forEach(button => {
            button.onclick = (e) => {
                const songString = e.currentTarget.getAttribute('data-song');
                const match = songString.match(/「(.+)」|『(.+)』/);
                if (match) {
                    const songTitle = match[1] || match[2];
                    const artist = songString.split(match[0])[0].trim();
                    const searchQuery = encodeURIComponent(`${artist} ${songTitle}`);
                    window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
                }
            };
        });
    }

	function addImagePopupListeners() {
		const popupOverlay = document.getElementById('image-popup-overlay');
		const popupImage = document.getElementById('popup-image');
		const thumbnails = document.querySelectorAll('#content-thumbnails img');

		if (!popupOverlay || !popupImage) return;

		thumbnails.forEach(thumb => {
			thumb.addEventListener('click', (e) => {
				popupImage.src = e.target.src;
				popupOverlay.classList.add('visible'); 
			});
		});

		popupOverlay.addEventListener('click', (e) => {
			if (e.target === popupOverlay) {
				popupOverlay.classList.remove('visible'); 
				setTimeout(() => {
					popupImage.src = '';
				}, 300);
			}
		});
	}

	function addPasswordButtonListeners() {
		const toggleBtn = document.getElementById('toggle-password-btn');
		const copyBtn = document.getElementById('copy-password-btn');
		const display = document.getElementById('password-display');
		if (!toggleBtn || !copyBtn || !display) return;
		toggleBtn.onclick = () => {
			if (display.textContent === '*****') {
				display.textContent = display.dataset.password;
				toggleBtn.textContent = 'Hide';
			} else {
				display.textContent = '*****';
				toggleBtn.textContent = 'Show';
			}
		};
		const fallbackCopyTextToClipboard = (text) => {
			const textArea = document.createElement("textarea");
			textArea.value = text;
			textArea.style.top = "0";
			textArea.style.left = "0";
			textArea.style.position = "fixed";
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				document.execCommand('copy');
				return Promise.resolve();
			} catch (err) {
				return Promise.reject(err);
			} finally {
				document.body.removeChild(textArea);
			}
		};
		copyBtn.onclick = () => {
			const passwordToCopy = display.dataset.password;
			const originalContent = copyBtn.innerHTML;
			const overrideStyle = document.createElement('style');
			overrideStyle.id = 'temp-copy-override';
			overrideStyle.innerHTML = `
			  body.allow-copy, body.allow-copy * {
				-webkit-user-select: text !important;
				-ms-user-select: text !important;
				user-select: text !important;
			  }
			`;
			const showFeedback = (message) => {
				copyBtn.textContent = message;
				setTimeout(() => {
					copyBtn.innerHTML = originalContent;
				}, 1500);
			};
			const cleanup = () => {
				const styleElement = document.getElementById('temp-copy-override');
				if (styleElement) {
					document.head.removeChild(styleElement);
				}
				document.body.classList.remove('allow-copy');
			};
			const fallbackCopyTextToClipboard = (text) => {
				const textArea = document.createElement("textarea");
				textArea.value = text;
				textArea.style.position = "fixed";
				textArea.style.top = "-9999px";
				textArea.style.left = "-9999px";
				document.body.appendChild(textArea);
				textArea.focus();
				textArea.select();
				try {
					document.execCommand('copy');
					showFeedback('Copied!');
				} catch (err) {
					console.error('Fallback copy gagal:', err);
					showFeedback('Failed!');
				} finally {
					document.body.removeChild(textArea);
				}
			};
			try {
				document.head.appendChild(overrideStyle);
				document.body.classList.add('allow-copy');

				if (navigator.clipboard && window.isSecureContext) {
					navigator.clipboard.writeText(passwordToCopy)
						.then(() => showFeedback('Copied!'))
						.catch(() => fallbackCopyTextToClipboard(passwordToCopy)); // Coba fallback jika gagal
				} else {
					fallbackCopyTextToClipboard(passwordToCopy);
				}
			} catch (err) {
				console.error('Proses copy gagal total:', err);
				showFeedback('Failed!');
			} finally {
				setTimeout(cleanup, 100);
			}
		};
	}

    init();
});