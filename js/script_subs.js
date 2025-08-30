document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIG & DOM ELEMENTS --- //
    const contentContainer = document.getElementById('content-container');
    const episodeListContainer = document.getElementById('episode-list-container');
    const popupContainer = document.getElementById('popup-container');
    const redirectBtn = document.getElementById('popup-redirect-btn');
    // Pastikan elemen loading-overlay ada di HTML Anda
    const loadingOverlay = document.getElementById('loading-overlay'); 
    
    const DATA_PATH_PREFIXES = [
        '../store/subs/01_variety/', 
        '../store/subs/02_nogidouga/',
        '../store/subs/03_web/',
        '../store/subs/04_singlebonus/',
        '../store/subs/05_nogikoi/',
        '../store/subs/06_drama/',
        '../store/subs/07_movie/',
        '../store/subs/08_documentary/',
        '../store/subs/09_sapporo/',
        '../store/subs/10_musicprogram/',
        '../store/subs/11_random/',
        '../store/subs/12_concert/',
        '../store/subs/13_premium/',
        '../store/subs/14_radio/',
        '../store/subs/15_nonsakamichi/'
    ];
    const MEMBERS_DATA_PATH = '../store/member/members.json';

    // Variabel untuk menyimpan data yang sedang aktif
    let membersData = null;
    let currentShowData = null;
    let currentShowPath = null;

    // --- MAIN INITIALIZATION --- //
	async function init() {
        if(loadingOverlay) loadingOverlay.style.display = 'flex';

		const params = new URLSearchParams(window.location.search);
		const showName = params.get('show');
		let episodeNumber = params.get('eps');

		if (!showName) {
			handleNoShowSelected();
            if(loadingOverlay) loadingOverlay.style.display = 'none';
			return;
		}

		try {
			const showInfo = await fetchShowData(showName);
			if (!showInfo) throw new Error(`Show data for "${showName}" not found.`);
			
			currentShowData = showInfo.data;
			currentShowPath = showInfo.path;
			document.title = `${currentShowData.nameShowTitle} | MoeFang Subs`;
			
			if (!membersData) membersData = await fetchData(MEMBERS_DATA_PATH);
			
            // Jika tidak ada episode di URL, gunakan episode pertama yang tersedia
            if (!episodeNumber && currentShowData.availableEpisode && currentShowData.availableEpisode.length > 0) {
                episodeNumber = currentShowData.availableEpisode[0];
                // Perbarui URL tanpa reload untuk konsistensi
                const newUrl = `?show=${showName}&eps=${episodeNumber}`;
                history.replaceState({ episode: episodeNumber }, '', newUrl);
            }

			renderEpisodeList(currentShowData, episodeNumber);
			addEpisodeNavigationHandler();

			if (episodeNumber) {
                // Untuk load awal, kita tunggu data like sebelum menampilkan apapun
				const episodeId = `${currentShowData.url}_eps_${episodeNumber}`;
                const initialLikeData = await getLikeStatus(episodeId);
				await renderEpisodeContent(currentShowData, episodeNumber, currentShowPath, initialLikeData);
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
                // Abaikan error dan coba path berikutnya
            }
        }
        return null;
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
        if (window.innerWidth <= 900) episodeListContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // --- DYNAMIC NAVIGATION LOGIC --- //
    function addEpisodeNavigationHandler() {
        episodeListContainer.addEventListener('click', (event) => {
            const episodeLink = event.target.closest('.episode-item');
            if (!episodeLink) return;
            event.preventDefault();
            const url = new URL(episodeLink.href);
            const newEpisodeNumber = url.searchParams.get('eps');
            if (currentShowData && newEpisodeNumber) loadEpisode(newEpisodeNumber);
        });
    }

    function loadEpisode(episodeNumber) {
        if (!currentShowData || !episodeNumber) return;
        // Panggil renderEpisodeContent tanpa data like awal, ini akan memicu background fetch
        renderEpisodeContent(currentShowData, episodeNumber, currentShowPath);
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
		const episodeList = document.createElement('div');
		episodeList.id = 'episode-list';
		const reversedEpisodes = showData.availableEpisode.slice().reverse();
		const newCount = showData.newUpdateCount || 0;
		reversedEpisodes.forEach((eps, index) => {
			const episodeData = showData.episodes[eps];
			let imageUrl = episodeData?.imageThumbEps || showData.IMGThumbnailEps?.replace('{{eps}}', eps) || '../sprite/placeholder.jpg';
			let episodeText = episodeData?.descEpsListName || episodeData?.descEpisode?.replace('|', '').trim() || `Episode ${eps}`;
			const episodeLink = document.createElement('a');
			episodeLink.href = `?show=${showData.url}&eps=${eps}`;
			episodeLink.className = 'episode-item';
			if (eps === activeEpisode) episodeLink.classList.add('active');
			episodeLink.innerHTML = `<img src="${imageUrl}" alt="${episodeText}" loading="lazy"><span>${episodeText}</span>`;
			if (index < newCount) {
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
    
	async function renderEpisodeContent(showData, episodeNumber, showPath, initialLikeData = null) {
		const episodeData = showData.episodes[episodeNumber];
		if (!episodeData) {
			console.error(`Data untuk episode ${episodeNumber} tidak ditemukan.`);
			contentContainer.innerHTML = '<h2>Error: Data episode tidak ditemukan.</h2>';
			return;
		}

		contentContainer.innerHTML = ''; // Hapus konten lama
		contentContainer.insertAdjacentHTML('beforeend', buildHeader(showData, episodeData, episodeNumber, initialLikeData));
		contentContainer.insertAdjacentHTML('beforeend', buildThumbnails(showData, episodeData, episodeNumber));
		contentContainer.insertAdjacentHTML('beforeend', buildSynopsis(showData, episodeData, episodeNumber));
		contentContainer.insertAdjacentHTML('beforeend', buildInfoList(showData, episodeData, showPath));
		contentContainer.insertAdjacentHTML('beforeend', buildSkitsList(episodeData));
		contentContainer.insertAdjacentHTML('beforeend', buildSongList(episodeData));
		contentContainer.insertAdjacentHTML('beforeend', buildLiteraturList(episodeData));
		contentContainer.insertAdjacentHTML('beforeend', buildButtons(showData, episodeData));
		contentContainer.insertAdjacentHTML('beforeend', buildPasswordBox(showData, episodeData, episodeNumber));
		
		addSongButtonListeners();
		addPasswordButtonListeners();
		addImagePopupListeners();
		setupLikeFeature(showData.url, episodeNumber, initialLikeData);

		// =================== PERUBAHAN DI SINI =================== //
        // Panggil fungsi setup untuk download counter setelah semua HTML dirender.
        setupDownloadCounters(showData.url, episodeNumber);
		// ========================================================= //
	}   
	
    function buildHeader(showData, episodeData, episodeNumber, likeData = null) {
        const episodeDesc = episodeData.descEpisode || `| Episode ${episodeNumber}`;
        const user = auth.currentUser;
        const isDisabled = user ? '' : 'disabled';
        const likeCount = likeData ? likeData.likeCount : '...';
        const likeIconSrc = likeData ? `../sprite/element/like_${likeData.userHasLiked ? 'v' : 'x'}.svg` : '../sprite/element/like_x.svg';

        return `
            <div id="content-header">
                <div class="header-title">
                    <h1>${showData.nameShowTitle}</h1>
                    <h3>${episodeDesc}</h3>
                </div>
                <div class="header-like">
                    <button class="like-button" id="like-btn" title="Sukai" ${isDisabled}>
                        <img src="${likeIconSrc}" alt="Like">
                    </button>
                    <span class="like-count" id="like-count">${likeCount}</span>
                </div>
            </div>`;
    }

    async function setupLikeFeature(show, eps, initialLikeData) {
        const episodeId = `${show}_eps_${eps}`;
        const likeButton = document.getElementById('like-btn');
        const likeCountSpan = document.getElementById('like-count');
        const likeIcon = likeButton.querySelector('img');

        if (!likeButton || !likeCountSpan) return;

        // Jika bukan load awal, ambil data di latar belakang
        if (!initialLikeData) {
            try {
                const { likeCount, userHasLiked } = await getLikeStatus(episodeId);
                likeCountSpan.textContent = likeCount;
                likeIcon.src = `../sprite/element/like_${userHasLiked ? 'v' : 'x'}.svg`;
            } catch (error) {
                console.error("Error getting like status:", error);
                likeCountSpan.textContent = "N/A";
            }
        }

        likeButton.onclick = async () => {
            likeButton.disabled = true;
            try {
                await toggleLike(show, eps);
                const { likeCount, userHasLiked } = await getLikeStatus(episodeId);
                likeCountSpan.textContent = likeCount;
                likeIcon.src = `../sprite/element/like_${userHasLiked ? 'v' : 'x'}.svg`;
            } catch (error) {
                console.error("Failed to toggle like:", error);
                alert(error.message);
            } finally {
                likeButton.disabled = false;
            }
        };
    }

	function buildThumbnails(showData, episodeData, episodeNumber) {
		const mainThumbsList = [];
		const primaryBigThumb = showData.imageThumbBigPattern?.replace('{{eps}}', episodeNumber) || episodeData.imageThumbBig;
		if (primaryBigThumb) mainThumbsList.push(primaryBigThumb);
		for (let i = 0; i <= 20; i++) {
			const key = `imageManga${String(i).padStart(2, '0')}`;
			if (episodeData[key]) mainThumbsList.push(episodeData[key]);
		}
		const smallThumbs = [
			showData.imageThumbAPattern?.replace('{{eps}}', episodeNumber) || episodeData.imageThumbA,
			showData.imageThumbBPattern?.replace('{{eps}}', episodeNumber) || episodeData.imageThumbB,
			showData.imageThumbCPattern?.replace('{{eps}}', episodeNumber) || episodeData.imageThumbC,
			showData.imageThumbDPattern?.replace('{{eps}}', episodeNumber) || episodeData.imageThumbD
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
	
	function buildInfoList(showData, episodeData, showPath) {
        let listHTML = '';
        const items = [];
        if (showPath && showPath.includes('04_singlebonus')) {
            if (showData.nameShow) items.push(`<li><span class="info-label l-sk">Single</span><span class="info-value jpn">${showData.nameShow}</span></li>`);
            if (episodeData.nameShow) items.push(`<li><span class="info-label l-cd">Judul Bonus</span><span class="info-value jpn">${episodeData.nameShow}</span></li>`);
        } else {
            const showName = episodeData.nameShow || showData.nameShow;
            if (showName) items.push(`<li><span class="info-label l-tv">Nama Acara</span><span class="info-value jpn">${showName}</span></li>`);
        }
        if (episodeData.descOnAirDate) items.push(`<li><span class="info-label l-dt">Tanggal Rilis</span><span class="info-value">${episodeData.descOnAirDate}</span></li>`);
        const participants = episodeData.memberParticipate || showData.memberParticipate;
        if (participants) items.push(`<li><span class="info-label l-us">Partisipan</span><span class="info-value">${processMemberNames(participants)}</span></li>`);
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

	// =================== PERUBAHAN DI SINI =================== //
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
			const button = `
                <a href="${episodeData.linkHardsub}" id="hardsub-btn" target="_blank" rel="noopener noreferrer" class="dl-button btn-sub" style="--border-color: var(--moe);">
                    <span>HARDSUB</span>
                    <img src="../sprite/element/downbut.svg" class="download-icon" alt="Unduh">
                    <span class="download-count">...</span>
                </a>`;
			buttonHTML += createButtonWrapper(button, !hasSoftsub ? 'full-width' : '');
		}
		if (hasSoftsub) {
			const button = `
                <a href="${episodeData.linkSoftsub}" id="softsub-btn" target="_blank" rel="noopener noreferrer" class="dl-button btn-sub" style="--border-color: var(--moe);">
                    <span>SOFTSUB</span>
                    <img src="../sprite/element/downbut.svg" class="download-icon" alt="Unduh">
                    <span class="download-count">...</span>
                </a>`;
			buttonHTML += createButtonWrapper(button, !hasHardsub ? 'full-width' : '');
		}
		trakteerLinks.forEach(link => {
			const button = `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="dl-button btn-trakteer" style="--border-color: #961234;"><span>${link.text}</span></a>`;
			buttonHTML += createButtonWrapper(button, 'full-width');
		});

		const hasRaw = !!showData.linkRAW;
		const hasFont = !!showData.linkFont;
		if (hasRaw) {
			const button = `<a href="${showData.linkRAW}" target="_blank" rel="noopener noreferrer" class="dl-button btn-extra" style="--border-color: var(--moe-tint4);"><span>RAW (${showData.RawSource || '?'})</span></a>`;
			buttonHTML += createButtonWrapper(button, !hasFont ? 'full-width' : '');
		}
		if (hasFont) {
			const button = `<a href="${showData.linkFont}" target="_blank" rel="noopener noreferrer" class="dl-button btn-extra" style="--border-color: var(--moe-tint4);"><span>FONT</span></a>`;
			buttonHTML += createButtonWrapper(button, !hasRaw ? 'full-width' : '');
		}

		if (buttonHTML) return `<div id="content-buttons">${buttonHTML}</div>`;
		return '';
	}
	// ========================================================= //

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
		const thumbnails = document.querySelectorAll('.small-thumbs-grid img');

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
			const showFeedback = (message) => {
				copyBtn.textContent = message;
				setTimeout(() => {
					copyBtn.innerHTML = originalContent;
				}, 1500);
			};
			if (navigator.clipboard && window.isSecureContext) {
				navigator.clipboard.writeText(passwordToCopy)
					.then(() => showFeedback('Copied!'))
					.catch(err => {
						console.error('Gagal menyalin dengan API modern:', err);
						showFeedback('Failed!');
					});
			} else {
				fallbackCopyTextToClipboard(passwordToCopy)
					.then(() => showFeedback('Copied!'))
					.catch(err => {
						console.error('Gagal menyalin dengan fallback:', err);
						showFeedback('Failed!');
					});
			}
		};
	}

    // --- START THE APP --- //
    init();
});
