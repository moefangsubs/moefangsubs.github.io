document.addEventListener('DOMContentLoaded', () => {
	
	document.addEventListener('contextmenu', event => {
		event.preventDefault();
	});
	const disableEvents = ['copy', 'paste', 'cut'];
	disableEvents.forEach(eventName => {
		document.addEventListener(eventName, e => {
			const isEditable = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
			if (!document.body.classList.contains('allow-copy') && !isEditable) {
				e.preventDefault();
			}
		});
	});
	document.addEventListener('keydown', event => {
		if (event.key === 'F12') {
			event.preventDefault();
		}
		if (event.ctrlKey && event.shiftKey && event.key === 'I') {
			event.preventDefault();
		}
		if (event.ctrlKey && event.shiftKey && event.key === 'J') {
			event.preventDefault();
		}
		if (event.ctrlKey && event.key === 'U') {
			event.preventDefault();
		}
	});
	
    // -------------------------------------------------------------
    // Endpoint & Konfigurasi Lagu
    // -------------------------------------------------------------
    const CWP_API = 'https://full.diskon.cloud/~moefa404/store/data/kara/get_karaoke_data.php';
    const IMAGEKIT_BASE = 'https://ik.imagekit.io/moearchive/singlealbum/v2/';
    const R2_BASE = 'https://pub-8af69fc04ebf496ba6cc9a127d03c7ad.r2.dev/';

    let timingOffset = 0.20;
    let isKaraokeMode = false;
    let isFuriganaOn = true;
    let isRomajiOn = true;
    let isIndoOn = true;
    let isFitScale = true;
    let isPlaying = false;
    let hasVinylOnPlatter = false;
    let currentVolume = 0.8;
    let currentGroup = 'nogizaka';
    let rafId = null;

    // DOM Elements
    const bodyNode = document.body;
    bodyNode.classList.add('fit-scale', 'theme-nogizaka');

    const groupSelector = document.getElementById('group-selector');
    const showCatalogBtn = document.getElementById('show-catalog-btn');
    const backToPlayerBtn = document.getElementById('back-to-player-btn');
    const catalogShowcase = document.getElementById('catalog-showcase');
    const catalogLoading = document.getElementById('catalog-loading');
    const showcaseGrid = document.getElementById('showcase-grid');
    const stageContainer = document.getElementById('stage-container');

    // Controls
    const startStopBtn = document.getElementById('start-stop-btn');
    const inlinePlayBtn = document.getElementById('inline-play-btn');
    const inlinePlayIcon = document.getElementById('inline-play-icon');
    const ledRing = document.getElementById('led-ring');
    const playIcon = document.getElementById('play-icon');
    const powerLed = document.getElementById('power-led');
    const vinylDisc = document.getElementById('vinyl-disc');
    const vinylCover = document.getElementById('vinyl-cover');
    const tonearm = document.getElementById('tonearm');
    const bufferStatus = document.getElementById('buffer-status');

    // Toggle Vinyl Button di Header Desktop & Mobile
    const toggleVinylDeckBtn = document.getElementById('toggle-vinyl-deck-btn');

    // Drawer Toggle Panah di Sasis Kontrol Bawah
    const toggleDrawerBtn = document.getElementById('toggle-drawer-btn');
    const drawerArrowIcon = document.getElementById('drawer-arrow-icon');
    const stageLowerControls = document.getElementById('stage-lower-controls');

    // Rocker Switches
    const karaokeRocker = document.getElementById('karaoke-rocker');
    const modeLabel = document.getElementById('mode-label');
    const furiRocker = document.getElementById('furi-rocker');
    const furiLabel = document.getElementById('furi-label');
    const romajiRocker = document.getElementById('romaji-rocker');
    const romajiLabel = document.getElementById('romaji-label');
    const indoRocker = document.getElementById('indo-rocker');
    const indoLabel = document.getElementById('indo-label');
    const fitRocker = document.getElementById('fit-rocker');
    const fitLabel = document.getElementById('fit-label');

    // Ribbed Volume Elements
    const volumeFader = document.getElementById('volume-fader');
    const volumeKnob = document.getElementById('volume-knob');
    const volumeValDisplay = document.getElementById('volume-val-display');

    // Vinyl Scale Slider & Panel
    const vinylScaleSlider = document.getElementById('vinyl-scale-slider');
    const vinylScaleText = document.getElementById('vinyl-scale-text');
    const turntablePanel = document.getElementById('turntable-panel');

    // Timeline Elements
    const timelineTrack = document.getElementById('timeline-track');
    const timelineFill = document.getElementById('timeline-fill');
    const timeCurrent = document.getElementById('time-current');
    const timeTotal = document.getElementById('time-total');

    // Lyrics & Titles
    const activeTitleRo = document.getElementById('active-title-ro');
    const activeTitleJp = document.getElementById('active-title-jp');
    const lyricsStage = document.getElementById('lyrics-stage');
    const lyricsViewport = document.getElementById('lyrics-viewport');

    // Sync Offset Elements
    const offsetDisplay = document.getElementById('offset-display');
    const btnOffsetPlus = document.getElementById('btn-offset-plus');
    const btnOffsetMinus = document.getElementById('btn-offset-minus');
    const fsSyncVal = document.getElementById('fs-sync-val');
    const fsSyncPlus = document.getElementById('fs-sync-plus');
    const fsSyncMinus = document.getElementById('fs-sync-minus');

    // Settings Modal Elements
    const settingsBtn = document.getElementById('settings-btn');
    const fsSettingsBtn = document.getElementById('fs-settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const saveStyleBtn = document.getElementById('save-style-btn');
    const resetStyleBtn = document.getElementById('reset-style-btn');

    const sliderFsKanji = document.getElementById('slider-fs-kanji');
    const lblFsKanji = document.getElementById('lbl-fs-kanji');
    const sliderFsRo = document.getElementById('slider-fs-ro');
    const lblFsRo = document.getElementById('lbl-fs-ro');
    const sliderFsId = document.getElementById('slider-fs-id');
    const lblFsId = document.getElementById('lbl-fs-id');

    const pickerBaseColor = document.getElementById('picker-base-color');
    const pickerWipeColor = document.getElementById('picker-wipe-color');
    const chkKanjiBorder = document.getElementById('chk-kanji-border');
    const chkFuriBorder = document.getElementById('chk-furi-border');

    // Fullscreen Elements
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const fullscreenIcon = document.getElementById('fullscreen-icon');
    const fsPlayBtn = document.getElementById('fs-play-btn');
    const fsPlayIcon = document.getElementById('fs-play-icon');
    const fsKaraokeBtn = document.getElementById('fs-karaoke-btn');
    const fsModeText = document.getElementById('fs-mode-text');
    const fsFuriBtn = document.getElementById('fs-furi-btn');
    const fsRomajiBtn = document.getElementById('fs-romaji-btn');
    const fsIndoBtn = document.getElementById('fs-indo-btn');
    const fsExitBtn = document.getElementById('fs-exit-btn');

    // Canvas Wrap
    const canvasWrap = document.getElementById('turntable-canvas-wrap');
    const deckCanvas = document.getElementById('turntable-deck-canvas');

    const audioVocal = document.getElementById('audio-vocal');
    const audioInst = document.getElementById('audio-inst');
    audioVocal.removeAttribute('crossorigin');
    audioInst.removeAttribute('crossorigin');

    let allSongsData = {};
    let karaokeLyrics = {};
    let eligibleTracks = [];
    let currentTrack = null;
    let currentLyrics = [];

    // -------------------------------------------------------------
    // 1. Group Theme & Color Sync
    // -------------------------------------------------------------
    function applyGroupTheme(groupKey) {
        bodyNode.classList.remove('theme-nogizaka', 'theme-sakurazaka', 'theme-hinatazaka');
        let themeClass = 'theme-nogizaka';
        let defaultColor = '#a22bff';

        if (groupKey === 'sakurazaka') {
            themeClass = 'theme-sakurazaka';
            defaultColor = '#ff5e97';
        } else if (groupKey === 'hinatazaka') {
            themeClass = 'theme-hinatazaka';
            defaultColor = '#57c7ff';
        }

        bodyNode.classList.add(themeClass);
        document.documentElement.style.setProperty('--wipe-text-color', defaultColor);
        if (pickerWipeColor) pickerWipeColor.value = defaultColor;
    }

    if (groupSelector) {
        groupSelector.addEventListener('change', (e) => {
            currentGroup = e.target.value;
            applyGroupTheme(currentGroup);
            buildShowcaseCards();
        });
    }

    // -------------------------------------------------------------
    // 2. Power LED State
    // -------------------------------------------------------------
    function updatePowerLed(state) {
        if (!powerLed) return;
        powerLed.className = 'power-status-led';
        if (state === 'playing') {
            powerLed.classList.add('status-playing');
        } else if (state === 'paused') {
            powerLed.classList.add('status-paused');
        } else {
            powerLed.classList.add('status-standby');
        }
    }

    updatePowerLed('standby');

    // -------------------------------------------------------------
    // 3. Turntable Scale & Auto-Adjusting Layout Width
    // -------------------------------------------------------------
    function updateTurntableScale() {
        if (!canvasWrap || !deckCanvas) return;
        const isFs = bodyNode.classList.contains('is-fullscreen');
        const userScale = parseFloat(vinylScaleSlider.value) || 0.75;

        const baseWidth = 530;
        const baseHeight = 400;

        if (turntablePanel && !isFs) {
            turntablePanel.style.width = `${Math.round(baseWidth * userScale)}px`;
        }

        const availW = canvasWrap.clientWidth || (baseWidth * userScale);
        let scale = availW / baseWidth;

        if (!isFs) {
            const maxH = window.innerHeight * 0.48;
            if (baseHeight * scale > maxH) {
                scale = maxH / baseHeight;
            }
        }

        scale = Math.min(Math.max(scale, 0.45), 1.25);
        deckCanvas.style.setProperty('--deck-scale', scale);
        deckCanvas.style.setProperty('--vinyl-scale-user', userScale);
        canvasWrap.style.height = `${Math.round(baseHeight * scale * userScale)}px`;

        fitAllLyricLines();
    }

    window.addEventListener('resize', () => {
        updateTurntableScale();
        scrollToActiveLyric();
    });

    if (vinylScaleSlider) {
        vinylScaleSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            vinylScaleText.textContent = `${Math.round(val * 100)}%`;
            updateTurntableScale();
            scrollToActiveLyric();
        });
    }

    // Ribbed Volume
    function updateVolumeKnobUI(val) {
        const pct = 8 + (val * 84);
        if (volumeKnob) {
            volumeKnob.style.left = `${pct}%`;
        }
        if (volumeValDisplay) {
            volumeValDisplay.textContent = `${Math.round(val * 100)}%`;
        }
    }

    if (volumeFader) {
        volumeFader.addEventListener('input', (e) => {
            currentVolume = parseFloat(e.target.value);
            updateVolumeKnobUI(currentVolume);
            applyAudioVolumes();
        });
    }

    // -------------------------------------------------------------
    // 4. Load Data CWP
    // -------------------------------------------------------------
    async function loadDataFromCWP(fileKey) {
        const urls = [
            `${CWP_API}?file=${fileKey}`,
            `https://full.diskon.cloud/~moefa404/get_karaoke_data.php?file=${fileKey}`,
            `../store/data/kara/${fileKey}.json`
        ];
        for (const u of urls) {
            try {
                const res = await fetch(u, { method: 'GET', mode: 'cors' });
                if (res.ok) return await res.json();
            } catch (err) {}
        }
        return null;
    }

    async function initKaraokeApp() {
        updateTurntableScale();
        updateVolumeKnobUI(currentVolume);
        applyGroupTheme('nogizaka');

        if (catalogLoading) catalogLoading.style.display = 'flex';
        if (showcaseGrid) showcaseGrid.style.display = 'none';
        if (bufferStatus) bufferStatus.textContent = 'Mengambil data katalog...';

        const [songsData, lyricsData] = await Promise.all([
            loadDataFromCWP('songall'),
            loadDataFromCWP('lyrics_kara')
        ]);

        if (songsData) allSongsData = songsData;
        if (lyricsData) karaokeLyrics = lyricsData;

        if (catalogLoading) catalogLoading.style.display = 'none';
        if (showcaseGrid) showcaseGrid.style.display = 'grid';

        buildShowcaseCards();
        if (bufferStatus) bufferStatus.textContent = 'Pilih lagu untuk meletakkan piringan hitam...';
    }

    function buildShowcaseCards() {
        eligibleTracks = [];
        if (!showcaseGrid) return;
        showcaseGrid.innerHTML = '';

        let groupData = allSongsData[currentGroup];
        if (!groupData) {
            groupData = currentGroup === 'nogizaka' ? allSongsData : {};
        }

        const seenTitles = new Set();
        for (const releaseKey in groupData) {
            const list = groupData[releaseKey];
            if (!Array.isArray(list)) continue;

            list.forEach(song => {
                const jp = (song.titleJp || '').trim();
                const keyToCheck = jp.toLowerCase();
                const hasLyrics = findLyricsForTrack(song).length > 0;

                if (hasLyrics && !seenTitles.has(keyToCheck)) {
                    seenTitles.add(keyToCheck);
                    eligibleTracks.push({ ...song, releaseKey, groupKey: currentGroup });
                }
            });
        }

        if (eligibleTracks.length === 0) {
            showcaseGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #62626e; font-weight: 700;">
                    Belum ada lagu untuk grup ini. Silakan pilih grup lainnya.
                </div>
            `;
            return;
        }

        const groupDisplayName = currentGroup === 'sakurazaka' ? 'Sakurazaka46' : (currentGroup === 'hinatazaka' ? 'Hinatazaka46' : 'Nogizaka46');

        eligibleTracks.forEach((track, idx) => {
            const card = document.createElement('div');
            card.className = 'showcase-card';
            card.innerHTML = `
                <div class="showcase-cd-wrap">
                    <img src="${resolveCoverUrl(track)}" alt="${track.titleRo}">
                    <div class="showcase-hub"></div>
                </div>
                <div class="showcase-title-large">${track.titleRo}</div>
                <div class="showcase-group-small">${groupDisplayName}</div>
            `;
            card.addEventListener('click', () => {
                handleTrackSelection(idx);
            });
            showcaseGrid.appendChild(card);
        });
    }

    if (showCatalogBtn) {
        showCatalogBtn.addEventListener('click', () => {
            bodyNode.classList.add('mode-idle');
            if (catalogShowcase) catalogShowcase.classList.add('can-go-back');
        });
    }

    if (backToPlayerBtn) {
        backToPlayerBtn.addEventListener('click', () => {
            if (currentTrack) {
                bodyNode.classList.remove('mode-idle');
                if (catalogShowcase) catalogShowcase.classList.remove('can-go-back');
                setTimeout(() => {
                    updateTurntableScale();
                    scrollToActiveLyric();
                }, 60);
            }
        });
    }

    function resolveCoverUrl(track) {
        if (track.coverUrl) return track.coverUrl;
        const rk = (track.releaseKey || '').toLowerCase();
        const prefix = track.groupKey === 'sakurazaka' ? 's46' : (track.groupKey === 'hinatazaka' ? 'h46' : 'n46');

        if (rk.startsWith('s')) {
            const num = rk.replace(/\D/g, '');
            return `${IMAGEKIT_BASE}${prefix}_cover_s${num}a.jpg`;
        } else if (rk.startsWith('a')) {
            const num = parseInt(rk.replace(/\D/g, ''), 10) || 1;
            return `${IMAGEKIT_BASE}${prefix}_cover_a${num}.jpg`;
        }
        return `${IMAGEKIT_BASE}n46_cover_x.jpg`;
    }

    function findLyricsForTrack(track) {
        if (!karaokeLyrics) return [];
        const targetJp = (track.titleJp || '').trim().toLowerCase();
        const targetRo = (track.titleRo || '').trim().toLowerCase();

        for (const key in karaokeLyrics) {
            const cleanKey = key.trim().toLowerCase();
            if (cleanKey === targetJp || cleanKey === targetRo) {
                return karaokeLyrics[key];
            }
        }
        return [];
    }

    // -------------------------------------------------------------
    // 5. Furigana & Line Fit Engine
    // -------------------------------------------------------------
    function buildRubyHTML(jpText, rubyList) {
        if (!rubyList || !Array.isArray(rubyList) || rubyList.length === 0) {
            return escapeHTML(jpText);
        }

        const sorted = [...rubyList].sort((a, b) => a.index - b.index);
        let result = '';
        let cursor = 0;

        for (const item of sorted) {
            const idx = item.index;
            const base = item.base || '';
            const furi = item.furi || '';

            if (idx < cursor || idx >= jpText.length) continue;

            if (idx > cursor) {
                result += escapeHTML(jpText.slice(cursor, idx));
            }

            result += `<ruby>${escapeHTML(base)}<rt>${escapeHTML(furi)}</rt></ruby>`;
            cursor = idx + base.length;
        }

        if (cursor < jpText.length) {
            result += escapeHTML(jpText.slice(cursor));
        }

        return result;
    }

    function escapeHTML(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function renderLyricsDOM() {
        if (!lyricsStage) return;
        lyricsStage.innerHTML = '';
        if (!currentLyrics || currentLyrics.length === 0) return;

        currentLyrics.forEach((line, index) => {
            const div = document.createElement('div');
            div.className = 'karaoke-line';
            div.dataset.index = index;

            const fitBox = document.createElement('div');
            fitBox.className = 'jp-fit-box';

            const wipeContainer = document.createElement('div');
            wipeContainer.className = 'jp-wipe-container';

            const richHTML = buildRubyHTML(line.jp || '', line.ruby);

            const baseSpan = document.createElement('span');
            baseSpan.className = 'jp-layer-base';
            baseSpan.innerHTML = richHTML;

            const fillSpan = document.createElement('span');
            fillSpan.className = 'jp-layer-fill';
            fillSpan.innerHTML = richHTML;
            fillSpan.setAttribute('aria-hidden', 'true');

            wipeContainer.appendChild(baseSpan);
            wipeContainer.appendChild(fillSpan);
            fitBox.appendChild(wipeContainer);
            div.appendChild(fitBox);

            if (line.ro) {
                const roP = document.createElement('p');
                roP.className = 'ro-line';
                roP.textContent = line.ro;
                div.appendChild(roP);
            }

            if (line.id) {
                const idP = document.createElement('p');
                idP.className = 'id-line';
                idP.textContent = line.id;
                div.appendChild(idP);
            }

            lyricsStage.appendChild(div);
        });

        if (lyricsViewport) {
            lyricsViewport.scrollTop = 0;
        }

        requestAnimationFrame(() => {
            fitAllLyricLines();
            scrollToActiveLyric();
        });
    }

    function fitAllLyricLines() {
        if (!lyricsViewport || !lyricsStage) return;
        const maxWidth = lyricsViewport.clientWidth - 32;
        if (maxWidth <= 0) return;

        const containers = lyricsStage.querySelectorAll('.jp-wipe-container');
        containers.forEach(container => {
            container.style.setProperty('--line-scale', 1);
            const naturalWidth = container.scrollWidth;
            if (naturalWidth > maxWidth) {
                const ratio = Math.max(0.42, maxWidth / naturalWidth);
                container.style.setProperty('--line-scale', ratio.toFixed(3));
            }
        });
    }

    // -------------------------------------------------------------
    // 6. Track Selection & Playback
    // -------------------------------------------------------------
    async function handleTrackSelection(index) {
        const selected = eligibleTracks[index];
        if (!selected) return;

        if (selected.groupKey) {
            applyGroupTheme(selected.groupKey);
            if (groupSelector) groupSelector.value = selected.groupKey;
        }

        pausePlayback();
        resetPlaybackBar();
        startStopBtn.disabled = true;
        inlinePlayBtn.disabled = true;
        ledRing.classList.remove('ready');

        bodyNode.classList.remove('mode-idle');
        if (catalogShowcase) catalogShowcase.classList.remove('can-go-back');

        setTimeout(() => {
            updateTurntableScale();
            fitAllLyricLines();
        }, 60);

        if (hasVinylOnPlatter) {
            if (bufferStatus) bufferStatus.textContent = 'Mengangkat jarum & mengeluarkan vinyl...';
            tonearm.classList.remove('engaged');
            await delay(400);
            vinylDisc.classList.remove('vinyl-in');
            vinylDisc.classList.add('vinyl-out');
            await delay(500);
        }

        currentTrack = selected;
        currentLyrics = findLyricsForTrack(selected);

        activeTitleRo.textContent = selected.titleRo;
        activeTitleJp.textContent = selected.titleJp;
        renderLyricsDOM();

        vinylCover.src = resolveCoverUrl(selected);
        vinylDisc.classList.remove('vinyl-out');
        vinylDisc.classList.add('vinyl-in', 'spinning');
        hasVinylOnPlatter = true;

        if (bufferStatus) bufferStatus.textContent = 'Mem-buffer 2 jalur audio...';
        await delay(750);
        tonearm.classList.add('engaged');

        let vocalSrc = selected.LinkMP3 || selected.linkVocal || '';
        let instSrc = selected.LinkOffVocal || selected.linkInst || '';

        if (!vocalSrc && selected.u) {
            vocalSrc = `${R2_BASE}${selected.u}_v.mp3`;
            instSrc = `${R2_BASE}${selected.u}_i.mp3`;
        }

        if (!instSrc) instSrc = vocalSrc;

        await preloadDualAudio(vocalSrc, instSrc);

        if (bufferStatus) bufferStatus.textContent = 'Audio siap! Menjalankan pemutar...';
        startStopBtn.disabled = false;
        inlinePlayBtn.disabled = false;
        ledRing.classList.add('ready');
        startPlayback();
    }

    function preloadDualAudio(vocalUrl, instUrl) {
        return new Promise((resolve) => {
            let readyCount = 0;
            let finished = false;

            const checkReady = () => {
                readyCount++;
                if (readyCount >= 2 && !finished) {
                    finished = true;
                    resolve(true);
                }
            };

            audioVocal.pause();
            audioInst.pause();
            audioVocal.removeAttribute('src');
            audioInst.removeAttribute('src');

            audioVocal.addEventListener('canplay', checkReady, { once: true });
            audioInst.addEventListener('canplay', checkReady, { once: true });

            audioVocal.src = vocalUrl;
            audioInst.src = instUrl;
            audioVocal.load();
            audioInst.load();

            setTimeout(() => {
                if (!finished) {
                    finished = true;
                    resolve(true);
                }
            }, 4500);
        });
    }

    function applyAudioVolumes() {
        if (isKaraokeMode) {
            audioVocal.volume = 0;
            audioInst.volume = currentVolume;
        } else {
            audioVocal.volume = currentVolume;
            audioInst.volume = 0;
        }
    }

    function setPlayIcons(playing) {
        const cls = playing ? 'fas fa-pause' : 'fas fa-play';
        playIcon.className = cls;
        inlinePlayIcon.className = cls;
        fsPlayIcon.className = cls;
    }

    function startPlayback() {
        if (!currentTrack || !audioVocal.src) return;
        applyAudioVolumes();
        audioInst.currentTime = audioVocal.currentTime;

        Promise.all([
            audioVocal.play(),
            audioInst.play()
        ]).then(() => {
            isPlaying = true;
            vinylDisc.classList.add('is-playing');
            tonearm.classList.add('engaged');
            setPlayIcons(true);
            updatePowerLed('playing');
            if (bufferStatus) bufferStatus.textContent = isKaraokeMode ? 'Memutar: Karaoke (Off-Vocal)' : 'Memutar: Biasa (Vocal)';
            rafId = requestAnimationFrame(updateWipeLoop);
        }).catch(() => {
            if (bufferStatus) bufferStatus.textContent = 'Klik tombol START/STOP untuk memulai.';
        });
    }

    function pausePlayback() {
        isPlaying = false;
        audioVocal.pause();
        audioInst.pause();
        vinylDisc.classList.remove('is-playing');
        setPlayIcons(false);
        updatePowerLed('paused');
        if (rafId) cancelAnimationFrame(rafId);
    }

    function togglePlayPause() {
        if (!currentTrack || !audioVocal.src) return;
        if (isPlaying) {
            pausePlayback();
            if (bufferStatus) bufferStatus.textContent = 'Vinyl dihentikan sementara.';
        } else {
            startPlayback();
        }
    }

    function resetPlaybackBar() {
        audioVocal.currentTime = 0;
        audioInst.currentTime = 0;
        timelineFill.style.width = '0%';
        timeCurrent.textContent = '00:00';

        const lineNodes = lyricsStage.querySelectorAll('.karaoke-line');
        lineNodes.forEach(node => {
            node.classList.remove('active');
            node.style.setProperty('--wipe-pct', '0%');
        });

        if (lyricsViewport) {
            lyricsViewport.scrollTop = 0;
        }
    }

    // -------------------------------------------------------------
    // 7. Toggle Switches (Karaoke, Furi, Romaji, Indo, Vinyl, Drawer)
    // -------------------------------------------------------------
    function toggleKaraokeMode() {
        isKaraokeMode = !isKaraokeMode;
        karaokeRocker.classList.toggle('is-on', isKaraokeMode);
        fsKaraokeBtn.classList.toggle('active', isKaraokeMode);

        const txt = isKaraokeMode ? 'KARAOKE' : 'VOCAL';
        modeLabel.textContent = txt;
        fsModeText.textContent = txt;

        const drift = Math.abs(audioVocal.currentTime - audioInst.currentTime);
        if (drift > 0.08) {
            if (isKaraokeMode) {
                audioInst.currentTime = audioVocal.currentTime;
            } else {
                audioVocal.currentTime = audioInst.currentTime;
            }
        }

        applyAudioVolumes();
        if (isPlaying && bufferStatus) {
            bufferStatus.textContent = isKaraokeMode ? 'Mode: Karaoke (Off-Vocal)' : 'Mode: Biasa (Vocal)';
        }
    }

    function toggleFurigana() {
        isFuriganaOn = !isFuriganaOn;
        bodyNode.classList.toggle('furigana-off', !isFuriganaOn);
        furiRocker.classList.toggle('is-on', isFuriganaOn);
        fsFuriBtn.classList.toggle('active', isFuriganaOn);
        furiLabel.textContent = isFuriganaOn ? 'ON' : 'OFF';

        fitAllLyricLines();
        scrollToActiveLyric();
    }

    function toggleRomaji() {
        isRomajiOn = !isRomajiOn;
        bodyNode.classList.toggle('romaji-off', !isRomajiOn);
        romajiRocker.classList.toggle('is-on', isRomajiOn);
        fsRomajiBtn.classList.toggle('active', isRomajiOn);
        romajiLabel.textContent = isRomajiOn ? 'ON' : 'OFF';

        fitAllLyricLines();
        scrollToActiveLyric();
    }

    function toggleIndo() {
        isIndoOn = !isIndoOn;
        bodyNode.classList.toggle('indo-off', !isIndoOn);
        indoRocker.classList.toggle('is-on', isIndoOn);
        fsIndoBtn.classList.toggle('active', isIndoOn);
        indoLabel.textContent = isIndoOn ? 'ON' : 'OFF';

        fitAllLyricLines();
        scrollToActiveLyric();
    }

    function toggleFitMode() {
        isFitScale = !isFitScale;
        fitRocker.classList.toggle('is-on', isFitScale);

        if (isFitScale) {
            bodyNode.classList.remove('fit-squish');
            bodyNode.classList.add('fit-scale');
            fitLabel.textContent = 'SCALE';
        } else {
            bodyNode.classList.remove('fit-scale');
            bodyNode.classList.add('fit-squish');
            fitLabel.textContent = 'SQUISH';
        }
        fitAllLyricLines();
        scrollToActiveLyric();
    }

    function toggleVinylDeck() {
        const isHidden = bodyNode.classList.toggle('vinyl-hidden');
        if (toggleVinylDeckBtn) {
            toggleVinylDeckBtn.style.color = isHidden ? '#72727a' : 'var(--wipe-text-color)';
        }
        setTimeout(() => {
            updateTurntableScale();
            fitAllLyricLines();
            scrollToActiveLyric();
        }, 50);
    }

    if (toggleVinylDeckBtn) {
        toggleVinylDeckBtn.addEventListener('click', toggleVinylDeck);
    }

    function toggleDrawerControls() {
        const isCollapsed = stageLowerControls.classList.toggle('drawer-collapsed');
        if (drawerArrowIcon) {
            drawerArrowIcon.className = isCollapsed ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        }
        setTimeout(() => {
            fitAllLyricLines();
            scrollToActiveLyric();
        }, 320);
    }

    if (toggleDrawerBtn) {
        toggleDrawerBtn.addEventListener('click', toggleDrawerControls);
    }

    // -------------------------------------------------------------
    // 8. Sync Offset Adjusters
    // -------------------------------------------------------------
    function adjustOffset(delta) {
        timingOffset = Math.round((timingOffset + delta) * 100) / 100;
        const sign = timingOffset >= 0 ? '+' : '';
        const formatted = `${sign}${timingOffset.toFixed(2)}s`;
        offsetDisplay.textContent = formatted;
        fsSyncVal.textContent = formatted;
    }

    btnOffsetPlus.addEventListener('click', () => adjustOffset(0.05));
    btnOffsetMinus.addEventListener('click', () => adjustOffset(-0.05));
    fsSyncPlus.addEventListener('click', () => adjustOffset(0.05));
    fsSyncMinus.addEventListener('click', () => adjustOffset(-0.05));

    // -------------------------------------------------------------
    // 9. Settings Popup Engine
    // -------------------------------------------------------------
    function openSettings() {
        settingsModal.classList.add('modal-open');
    }

    function closeSettings() {
        settingsModal.classList.remove('modal-open');
    }

    settingsBtn.addEventListener('click', openSettings);
    fsSettingsBtn.addEventListener('click', openSettings);
    closeSettingsBtn.addEventListener('click', closeSettings);

    sliderFsKanji.addEventListener('input', (e) => {
        lblFsKanji.textContent = `${e.target.value}rem`;
        document.documentElement.style.setProperty('--fs-kanji', `${e.target.value}rem`);
        fitAllLyricLines();
        scrollToActiveLyric();
    });

    sliderFsRo.addEventListener('input', (e) => {
        lblFsRo.textContent = `${e.target.value}rem`;
        document.documentElement.style.setProperty('--fs-ro', `${e.target.value}rem`);
        scrollToActiveLyric();
    });

    sliderFsId.addEventListener('input', (e) => {
        lblFsId.textContent = `${e.target.value}rem`;
        document.documentElement.style.setProperty('--fs-id', `${e.target.value}rem`);
        scrollToActiveLyric();
    });

    saveStyleBtn.addEventListener('click', () => {
        document.documentElement.style.setProperty('--base-text-color', pickerBaseColor.value);
        document.documentElement.style.setProperty('--wipe-text-color', pickerWipeColor.value);
        document.documentElement.style.setProperty('--kanji-stroke-width', chkKanjiBorder.checked ? '4px' : '0px');
        document.documentElement.style.setProperty('--furi-stroke-width', chkFuriBorder.checked ? '2.2px' : '0px');
        closeSettings();
        fitAllLyricLines();
        scrollToActiveLyric();
    });

    resetStyleBtn.addEventListener('click', () => {
        sliderFsKanji.value = 2.6;
        lblFsKanji.textContent = '2.6rem';
        sliderFsRo.value = 1.45;
        lblFsRo.textContent = '1.45rem';
        sliderFsId.value = 0.95;
        lblFsId.textContent = '0.95rem';

        pickerBaseColor.value = '#ffffff';
        applyGroupTheme(currentGroup);
        chkKanjiBorder.checked = true;
        chkFuriBorder.checked = true;

        document.documentElement.style.removeProperty('--fs-kanji');
        document.documentElement.style.removeProperty('--fs-ro');
        document.documentElement.style.removeProperty('--fs-id');
        document.documentElement.style.removeProperty('--base-text-color');
        document.documentElement.style.removeProperty('--kanji-stroke-width');
        document.documentElement.style.removeProperty('--furi-stroke-width');

        closeSettings();
        fitAllLyricLines();
        scrollToActiveLyric();
    });

    // -------------------------------------------------------------
    // 10. Fullscreen & Smooth Center Anchored Scroll
    // -------------------------------------------------------------
    function scrollToActiveLyric() {
        if (!lyricsStage) return;
        const activeNode = lyricsStage.querySelector('.karaoke-line.active');
        if (activeNode) {
            activeNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                bodyNode.classList.add('is-fullscreen');
                fullscreenIcon.className = 'fas fa-compress';
                setTimeout(() => {
                    fitAllLyricLines();
                    scrollToActiveLyric();
                }, 100);
            }).catch(() => {});
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() => {
                    bodyNode.classList.remove('is-fullscreen');
                    fullscreenIcon.className = 'fas fa-expand';
                    setTimeout(() => {
                        updateTurntableScale();
                        fitAllLyricLines();
                        scrollToActiveLyric();
                    }, 100);
                });
            }
        }
    }

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            bodyNode.classList.remove('is-fullscreen');
            fullscreenIcon.className = 'fas fa-expand';
            setTimeout(() => {
                updateTurntableScale();
                fitAllLyricLines();
                scrollToActiveLyric();
            }, 100);
        }
    });

    // -------------------------------------------------------------
    // 11. Wipe Loop Engine (Adaptive Natural Fluid & Pause-Locked)
    // -------------------------------------------------------------
    const lyricTargetCache = new WeakMap();

    function getUniqueStepTargets(wipeArr) {
        if (!wipeArr || wipeArr.length === 0) return [];
        if (lyricTargetCache.has(wipeArr)) {
            return lyricTargetCache.get(wipeArr);
        }

        // Ambil titik pertama di mana suku kata baru tercapai
        const targets = [];
        let lastPct = -1;

        for (let i = 0; i < wipeArr.length; i++) {
            const t = Number(wipeArr[i][0]);
            const p = Number(wipeArr[i][1]);

            if (Math.abs(p - lastPct) > 0.05) {
                targets.push([t, p]);
                lastPct = p;
            }
        }

        // Pastikan titik penutup 100% jika ada di akhir
        if (wipeArr.length > 0) {
            const lastRaw = wipeArr[wipeArr.length - 1];
            if (targets.length > 0 && Number(lastRaw[1]) >= 98.0 && targets[targets.length - 1][1] < 100.0) {
                targets.push([Number(lastRaw[0]), 100.0]);
            }
        }

        lyricTargetCache.set(wipeArr, targets);
        return targets;
    }

    function evaluateSmoothWipe(wipePoints, curSec) {
        if (!wipePoints || !wipePoints.length) return 0;
        const targets = getUniqueStepTargets(wipePoints);
        if (!targets.length) return 0;

        if (curSec <= targets[0][0]) return targets[0][1];
        if (curSec >= targets[targets.length - 1][0]) return targets[targets.length - 1][1];

        // Durasi wajar menyapu 1 suku kata (mora) saat bernyanyi: 0.28 detik
        const MAX_SYLLABLE_VOICE_DUR = 0.28;

        for (let i = 0; i < targets.length - 1; i++) {
            const t1 = targets[i][0];
            const p1 = targets[i][1];
            const t2 = targets[i + 1][0];
            const p2 = targets[i + 1][1];

            if (curSec >= t1 && curSec <= t2) {
                const dt = t2 - t1;

                // Jika ada jeda berhenti sejenak yang nyata (dt > 0.28s):
                if (dt > MAX_SYLLABLE_VOICE_DUR) {
                    const voiceStartTime = t2 - MAX_SYLLABLE_VOICE_DUR;
                    if (curSec < voiceStartTime) {
                        // KUNCI DIAM: Warna berhenti di batas karakter sebelumnya, TIDAK maju sendiri!
                        return p1;
                    } else {
                        // MULAI MENYANYI: Menyapu mulus selama 0.28s ke karakter berikutnya, TIDAK melompat sekejap!
                        const ratio = (curSec - voiceStartTime) / MAX_SYLLABLE_VOICE_DUR;
                        return p1 + ratio * (p2 - p1);
                    }
                } else {
                    // Suku kata bersambung rapat normal: mengalir mulus penuh sepanjang selisih waktu
                    if (dt <= 0.001) return p2;
                    const ratio = (curSec - t1) / dt;
                    return p1 + ratio * (p2 - p1);
                }
            }
        }

        return targets[targets.length - 1][1];
    }

    function updateWipeLoop() {
        const curSec = audioVocal.currentTime + timingOffset;
        const durSec = audioVocal.duration || 0;

        if (durSec > 0) {
            timelineFill.style.width = `${(audioVocal.currentTime / durSec) * 100}%`;
            timeTotal.textContent = formatSec(durSec);
        }
        timeCurrent.textContent = formatSec(audioVocal.currentTime);

        let activeIdx = -1;
        for (let i = 0; i < currentLyrics.length; i++) {
            const item = currentLyrics[i];
            const endT = item.endTime || (i + 1 < currentLyrics.length ? currentLyrics[i + 1].time : item.time + 5);
            if (curSec >= item.time && curSec <= endT) {
                activeIdx = i;
                break;
            }
        }

        const lineNodes = lyricsStage.querySelectorAll('.karaoke-line');
        lineNodes.forEach((node, idx) => {
            if (idx === activeIdx) {
                if (!node.classList.contains('active')) {
                    node.classList.add('active');
                    node.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                const wipeArr = currentLyrics[idx].wipe || [];
                const pct = evaluateSmoothWipe(wipeArr, curSec);
                node.style.setProperty('--wipe-pct', `${pct.toFixed(2)}%`);
            } else {
                node.classList.remove('active');
                node.style.setProperty('--wipe-pct', idx < activeIdx ? '100%' : '0%');
            }
        });

        if (isPlaying) {
            rafId = requestAnimationFrame(updateWipeLoop);
        }
    }

    function formatSec(sec) {
        if (!sec || isNaN(sec)) return '00:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function delay(ms) {
        return new Promise(res => setTimeout(res, ms));
    }

    // Event Listeners
    startStopBtn.addEventListener('click', togglePlayPause);
    inlinePlayBtn.addEventListener('click', togglePlayPause);

    karaokeRocker.addEventListener('click', toggleKaraokeMode);
    furiRocker.addEventListener('click', toggleFurigana);
    romajiRocker.addEventListener('click', toggleRomaji);
    indoRocker.addEventListener('click', toggleIndo);
    fitRocker.addEventListener('click', toggleFitMode);

    fullscreenBtn.addEventListener('click', toggleFullScreen);
    fsPlayBtn.addEventListener('click', togglePlayPause);
    fsKaraokeBtn.addEventListener('click', toggleKaraokeMode);
    fsFuriBtn.addEventListener('click', toggleFurigana);
    fsRomajiBtn.addEventListener('click', toggleRomaji);
    fsIndoBtn.addEventListener('click', toggleIndo);
    fsExitBtn.addEventListener('click', toggleFullScreen);

    timelineTrack.addEventListener('click', (e) => {
        if (!audioVocal.duration) return;
        const rect = timelineTrack.getBoundingClientRect();
        const clickRatio = (e.clientX - rect.left) / rect.width;
        const targetTime = clickRatio * audioVocal.duration;
        audioVocal.currentTime = targetTime;
        audioInst.currentTime = targetTime;
    });

    audioVocal.addEventListener('ended', () => {
        pausePlayback();
        resetPlaybackBar();
        tonearm.classList.remove('engaged');
        updatePowerLed('standby');
        if (bufferStatus) bufferStatus.textContent = 'Lagu selesai diputar';
    });

    initKaraokeApp();
});
