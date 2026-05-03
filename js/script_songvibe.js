/* ---------------------- */
/* Dictionaries */
/* ---------------------- */
const moodMap = {
    "Joyful": "Gembira / Ceria",
	"Melancholy": "Sedih / Melankolis",
	"Nostalgic": "Nostalgia / Rindu", 
    "Energetic": "Energik / Semangat",
	"Hopeful": "Harapan / Memotivasi",
	"Lonely": "Kesepian / Hampa", 
    "Rebellious": "Rebel / Agresif",
	"Peaceful": "Damai / Tenang"
};
const seasonMap = {
    "Spring": "Musim Semi",
	"Summer": "Musim Panas",
	"Autumn": "Musim Gugur", 
    "Winter": "Musim Dingin",
	"Twilight/Night": "Senja / Malam",
	"All-Season": "Sepanjang Waktu"
};
const povMap = {
    "Boku": "Boku (Laki-laki)",
	"Watashi/Atashi": "Watashi/Atashi (Perempuan)", 
    "Bokura/Watashitachi": "Bokura/Watashitachi (Kolektif)",
	"Kimi-centric": "Fokus pada Kimi",
	"Neutral": "Netral"
};
const themeMap = {
    "Romance: Crush": "Romansa (Jatuh Cinta)",
	"Romance: Heartbreak": "Romansa (Patah Hati)", 
    "Seishun": "Masa Muda / Seishun",
	"Sotsugyou": "Kelulusan / Perpisahan", 
    "Life Meaning": "Makna Hidup",
	"Friendship": "Persahabatan"
};
const albumTitles = {
    'a1': 'Toumei na Iro', 'a2': 'Sorezore no Isu', 'a3': 'Umareta kara Hajimete Mita Yume', 
    'a4': 'Ima ga Omoide ni naru Made', 'a5': 'My respect', 'u1': 'Boku dake no Kimi ~Under Super Best~', 
    'b1': 'Time flies', 'akb38': 'Kibouteki Refrain', 'akb47': 'Shoot Sign', 
    'akb51': 'Jabaja', 'akb55': 'Jiwaru DAYS'
};

/* ---------------------- */
/* Variables */
/* ---------------------- */
const step1 = document.getElementById('step1-container');
const step2Song = document.getElementById('step2-song-container');
const step2Mood = document.getElementById('step2-mood-container');
const backBtns = document.querySelectorAll('.btn-back');
const resultArea = document.getElementById('resultArea');

let globalSongAll = {};
let globalSongVibe = {};
let songLookup = {}; 
let searchTimeout = null;
let currentDeskResults = [];
let currentDeskIndex = 0;

let activeFilters = {
    mood: "",
    season: "",
    pov: "",
    theme: ""
};


/* ---------------------- */
/* Helper Functions */
/* ---------------------- */
function getOrdinalSuffix(numberString) {
    if (!numberString || isNaN(numberString)) return "";
    const num = parseInt(numberString, 10);
    const j = num % 10;
    const k = num % 100;
    if (j == 1 && k != 11) return num + "st";
    if (j == 2 && k != 12) return num + "nd";
    if (j == 3 && k != 13) return num + "rd";
    return num + "th";
}

/* ---------------------- */
/* Navigation Logic */
/* ---------------------- */
document.getElementById('btnModeSong').addEventListener('click', () => {
    step1.style.display = 'none';
    step2Song.style.display = 'block';
    resultArea.innerHTML = '';
});

document.getElementById('btnModeMood').addEventListener('click', () => {
    step1.style.display = 'none';
    step2Mood.style.display = 'block';
    resultArea.innerHTML = '';
    document.getElementById('dynamicMoodText').innerHTML = 'Silakan pilih kriteria di atas.';
});

/* ---------------------- */
/* Tombol Back & Reset    */
/* ---------------------- */
backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        step2Song.style.display = 'none';
        step2Mood.style.display = 'none';
        
        step1.style.display = ''; 
        
        document.getElementById('resultArea').innerHTML = '';
        const moodArea = document.getElementById('resultAreaMood');
        if(moodArea) moodArea.innerHTML = '';
        
        document.getElementById('searchInput').value = "";
        document.getElementById('searchInput').disabled = false;
        document.getElementById('releaseCategorySelect').disabled = false;
        document.getElementById('songSelect').disabled = true;
        document.getElementById('releaseCategorySelect').value = "";
        document.getElementById('songSelect').innerHTML = '<option value="">-- Pilih Lagu --</option>';
        
        // Reset state tombol mood pixel
        activeFilters = { mood: "", season: "", pov: "", theme: "" };
        document.querySelectorAll('.pixel-filter-wrap').forEach(b => b.classList.remove('active'));
        updateDynamicText();
        document.getElementById('btnAnalyzeMood').disabled = true;
    });
});

/* ---------------------- */
/* Data Loading */
/* ---------------------- */
async function initVibeSystem() {
    try {
        const [vibeDef, songVibe, songAll] = await Promise.all([
            fetch('../store/single/songvibe.json').then(r => r.json()),
            fetch('../store/single/n46_songvibe.json').then(r => r.json()),
            fetch('../store/single/songall.json').then(r => r.json())
        ]);

        globalSongVibe = {};
        for(let key in songVibe) {
            globalSongVibe[key.normalize("NFC")] = songVibe[key];
        }

        globalSongAll = {};
        songLookup = {};
        for(let key in songAll) {
            globalSongAll[key] = songAll[key].map(track => {
                const normJp = track.titleJp.normalize("NFC");
                songLookup[normJp] = { releaseKey: key, songData: track };
                return { ...track, titleJp: normJp };
            });
        }

        populateReleaseCategories(globalSongAll);
        setupSongEvents();
        setupMoodEvents();
    } catch (err) {
        console.error(err);
        resultArea.innerHTML = `<p style="color:red;"><i class="fas fa-triangle-exclamation"></i> Gagal memuat JSON.</p>`;
    }
}

/* ---------------------- */
/* Song Mode Logic */
/* ---------------------- */
function populateReleaseCategories(songAll) {
    const releaseSelect = document.getElementById('releaseCategorySelect');
    const keys = Object.keys(songAll);

    keys.forEach(key => {
        let label = key;
        const tracks = songAll[key];
        const firstTrack = tracks && tracks.length > 0 ? tracks[0].titleRo : "";

        if (key.startsWith('s')) {
            const num = key.replace('s', '');
            label = `${getOrdinalSuffix(num)} Single "${firstTrack}"`;
        }
        else if (key.startsWith('a')) {
            const num = key.replace('a', '');
            label = `${getOrdinalSuffix(num)} Album "${albumTitles[key] || firstTrack}"`;
        }
        else if (key.startsWith('b')) {
            const num = key.replace('b', '');
            label = `${getOrdinalSuffix(num)} Best Album "${albumTitles[key] || firstTrack}"`;
        }
        else if (key.startsWith('u')) {
            const num = key.replace('u', '');
            label = `${getOrdinalSuffix(num)} Under Album "${albumTitles[key] || firstTrack}"`;
        }
        else if (key.startsWith('dig')) {
            label = `Single Digital`;
        }
        else if (key.startsWith('akb')) {
            const num = key.replace('akb', '');
            label = `AKB48 Single ${num} "${albumTitles[key] || firstTrack}"`;
        }

        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = label;
        releaseSelect.appendChild(opt);
    });
}

function setupSongEvents() {
    const releaseSelect = document.getElementById('releaseCategorySelect');
    const songSelect = document.getElementById('songSelect');
    const searchInput = document.getElementById('searchInput');
    const btnAnalyzeSong = document.getElementById('btnAnalyzeSong');

    releaseSelect.addEventListener('change', (e) => {
        songSelect.innerHTML = '<option value="">-- Pilih Lagu --</option>';
        if (!e.target.value) {
            songSelect.disabled = true;
            return;
        }

        songSelect.disabled = false;
        const tracks = globalSongAll[e.target.value];
        tracks.forEach(track => {
            const opt = document.createElement('option');
            opt.value = track.titleJp;
            opt.textContent = track.titleRo;
            songSelect.appendChild(opt);
        });
    });

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim().toLowerCase().normalize("NFC");
        const targetArea = document.getElementById('resultAreaDesk');

        if (query.length > 0) {
            releaseSelect.disabled = true;
            songSelect.disabled = true;
            releaseSelect.value = "";
            songSelect.innerHTML = '<option value="">-- Pilih Lagu --</option>';
        } else {
            releaseSelect.disabled = false;
            targetArea.innerHTML = '<div class="desk-empty-state">Menunggu kaset dimasukkan...</div>';
            document.getElementById('mainCdCover').src = '../sprite/element/vibe/cd_cover.png';
            return;
        }

        if (query.length < 5) {
            targetArea.innerHTML = "<p style='color: var(--cokelat2); font-family: VT323, monospace; font-size: 1.5rem;'>Lanjutkan mengetik (Min. 5 karakter)...</p>";
            return;
        }

        targetArea.innerHTML = "<p style='color: var(--cokelat2); font-family: VT323, monospace; font-size: 1.5rem;'><i class='fas fa-spinner fa-spin'></i> Menunggu ketikan selesai...</p>";

        searchTimeout = setTimeout(() => {
            executeSearch(query);
        }, 3000);
    });

    btnAnalyzeSong.addEventListener('click', () => {
        if (searchInput.value.trim().length > 0) return; 

        const selectedSong = songSelect.value;
        if (!selectedSong) {
            document.getElementById('resultAreaDesk').innerHTML = "<p style='color: var(--cokelat2); font-family: VT323, monospace; font-size: 1.5rem;'>Silakan pilih rilis dan lagu terlebih dahulu.</p>";
            return;
        }

        renderSingleResult(selectedSong);
    });
}

function executeSearch(query) {
    const isMoodModeActive = document.getElementById('step2-mood-container').style.display === 'block';
    const targetArea = isMoodModeActive ? document.getElementById('resultAreaMood') : document.getElementById('resultAreaDesk');
    
    targetArea.innerHTML = "<p style='color: var(--cokelat2); font-family: VT323, monospace; font-size: 1.5rem;'><i class='fas fa-spinner fa-spin'></i> Mencari lagu...</p>";
    
    let foundSongs = [];
    for (const key in globalSongAll) {
        globalSongAll[key].forEach(t => {
            const searchTitleRo = t.titleRo.toLowerCase().normalize("NFC");
            const searchTitleJp = t.titleJp;
            if (searchTitleRo.includes(query) || searchTitleJp.includes(query)) {
                foundSongs.push(t.titleJp);
            }
        });
    }

    targetArea.innerHTML = "";
    if (foundSongs.length > 0) {
        if (isMoodModeActive) {
            let hasVibeData = false;
            foundSongs.forEach(titleJp => {
                if (globalSongVibe[titleJp]) {
                    appendResultCard(titleJp, globalSongVibe[titleJp], {}, true);
                    hasVibeData = true;
                }
            });
            if (!hasVibeData) targetArea.innerHTML = "<p style='color: var(--cokelat1); font-family: VT323, monospace; font-size: 1.5rem;'>Lagu ditemukan, tapi belum ada data vibe-nya.</p>";
        } else {
            currentDeskResults = foundSongs.filter(title => globalSongVibe[title]);
            currentDeskIndex = 0;
            if (currentDeskResults.length > 0) {
                renderDeskSlide();
            } else {
                targetArea.innerHTML = "<p style='color: var(--cokelat1); font-family: VT323, monospace; font-size: 1.5rem;'>Lagu ditemukan, tapi belum ada data vibe-nya.</p>";
            }
        }
    } else {
        targetArea.innerHTML = "<p style='color: var(--cokelat1); font-family: VT323, monospace; font-size: 1.5rem;'>Lagu tidak ditemukan dalam database.</p>";
    }
}

function renderSingleResult(titleJp) {
    const targetArea = document.getElementById('resultAreaDesk');
    targetArea.innerHTML = "";
    if (globalSongVibe[titleJp]) {
        currentDeskResults = [titleJp];
        currentDeskIndex = 0;
        renderDeskSlide();
    } else {
        targetArea.innerHTML = "<p style='color: var(--cokelat1); font-family: VT323, monospace; font-size: 1.5rem;'>Maaf, data untuk lagu ini belum ada.</p>";
    }
}

window.changeDeskSlide = function(dir) {
    currentDeskIndex += dir;
    if (currentDeskIndex < 0) currentDeskIndex = currentDeskResults.length - 1;
    if (currentDeskIndex >= currentDeskResults.length) currentDeskIndex = 0;
    renderDeskSlide();
};

function renderDeskSlide() {
    const titleJp = currentDeskResults[currentDeskIndex];
    appendResultCard(titleJp, globalSongVibe[titleJp], {}, false, currentDeskResults.length, currentDeskIndex);
}


/* ---------------------- */
/* Mood Mode Logic */
/* ---------------------- */
function setupMoodEvents() {
    const groups = ['mood', 'season', 'pov', 'theme'];
    const btnAnalyzeMood = document.getElementById('btnAnalyzeMood');

    groups.forEach(group => {
        const buttons = document.querySelectorAll(`.filter-group[data-group="${group}"] .pixel-filter-wrap`);
        
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.getAttribute('data-val');

                if (btn.classList.contains('active')) {
                    btn.classList.remove('active');
                    activeFilters[group] = "";
                } else {
                    buttons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    activeFilters[group] = val;
                }

                updateDynamicText();
				
                if (activeFilters.mood || activeFilters.season || activeFilters.pov || activeFilters.theme) {
                    btnAnalyzeMood.disabled = false;
                } else {
                    btnAnalyzeMood.disabled = true;
                }
            });
        });
    });

    btnAnalyzeMood.addEventListener('click', executeMoodFilter);
}

function updateDynamicText() {
    let textParts = [];
    if (activeFilters.mood) textParts.push(`memiliki mood ${moodMap[activeFilters.mood]}`);
    if (activeFilters.season) textParts.push(`dengan suasana ${seasonMap[activeFilters.season]}`);
    if (activeFilters.pov) textParts.push(`menggunakan sudut pandang ${povMap[activeFilters.pov]}`);
    if (activeFilters.theme) textParts.push(`bertemakan ${themeMap[activeFilters.theme]}`);

    const dynamicDiv = document.getElementById('dynamicMoodText');
    
    if (textParts.length === 0) {
        dynamicDiv.innerHTML = `<i class="fas fa-pen-nib"></i> Belum ada mantra kriteria yang ditulis...`;
    } else {
        dynamicDiv.innerHTML = `Aku mau cari lagu yang ${textParts.join(', ')}.`;
    }
}


function executeMoodFilter() {
    const moodResultArea = document.getElementById('resultAreaMood');
    moodResultArea.innerHTML = "";

    let results = Object.entries(globalSongVibe).map(([title, data]) => {
        return { titleJp: title, vibe: data.vibe };
    });

    if (activeFilters.mood) results = results.filter(s => s.vibe.primary_mood === activeFilters.mood || s.vibe.secondary_mood === activeFilters.mood);
    if (activeFilters.season) results = results.filter(s => s.vibe.season === activeFilters.season);
    if (activeFilters.pov) results = results.filter(s => s.vibe.pov_type === activeFilters.pov);
    if (activeFilters.theme) results = results.filter(s => s.vibe.theme === activeFilters.theme);

    if (results.length === 0) {
        moodResultArea.innerHTML = "<p style='color: #8c3b21; font-family: VT323, monospace; font-size: 1.4rem; text-align:center; margin-top:20px;'><i class='fas fa-box-open'></i> Wah, belum ada lagu dengan kombinasi mantra ini.</p>";
        return;
    }

    const criteria = { 
        mood: activeFilters.mood, 
        season: activeFilters.season, 
        pov: activeFilters.pov, 
        theme: activeFilters.theme 
    };

    results.forEach(res => {
        appendResultCard(res.titleJp, { vibe: res.vibe }, criteria, true);
    });
}

/* ---------------------- */
/* Helper Render */
/* ---------------------- */
function getSingleImageUrl(releaseKey, songData) {
    const baseV2Url = "https://ik.imagekit.io/moearchive/singlealbum/v2/";
    const specialCovers = {
        "僕たちのサヨナラ": "n46_cover_s32_bokutachi.jpg",
        "あの光": "n46_cover_s36_anohikari.jpg",
        "懐かしさの先": "n46_cover_s38_natsukashisa.jpg",
        "100日目": "n46_cover_s38_100nichime.jpg"
    };
    
    if (specialCovers[songData.titleJp.trim()]) {
        return `${baseV2Url}${specialCovers[songData.titleJp.trim()]}`;
    }

    if (releaseKey.startsWith('akb')) {
        const num = releaseKey.replace(/\D/g, '');
        return `${baseV2Url}akb48_cover_s${num}.jpg`;
    } else if (releaseKey.startsWith('s')) {
        const num = releaseKey.replace(/\D/g, '');
        const typeAvv = songData.songTypeAvv || "";
        let typeChar = 'a';
        switch (typeAvv.toLowerCase()) {
            case 'all': case 'a': typeChar = 'a'; break;
            case 'b': typeChar = 'b'; break;
            case 'c': typeChar = 'c'; break;
            case 'd': typeChar = 'd'; break;
            case 'regular': typeChar = 'r'; break;
        }
        return `${baseV2Url}n46_cover_s${num}${typeChar}.jpg`;
    } else if (releaseKey.startsWith('a')) {
        switch (songData.titleJp.trim()) {
            case "全力ラップタイム": return `${baseV2Url}n46_cover_a5reg.jpg`;
            case "世界はここにある": return `${baseV2Url}n46_cover_a5a.jpg`;
            case "Fake Doctor": return `${baseV2Url}n46_cover_a5b.jpg`;
            case "Just a sec.": return `${baseV2Url}n46_cover_a5c.jpg`;
            default: return `${baseV2Url}n46_cover_${releaseKey}.jpg`;
        }
    } else if (releaseKey.startsWith('u') || releaseKey.startsWith('b')) {
        return `${baseV2Url}n46_cover_${releaseKey}.jpg`;
    } else if (releaseKey === 'dig') {
        switch (songData.titleJp.trim()) {
            case "世界中の隣人よ": return `${baseV2Url}n46_cover_dig1.jpg`;
            case "Route 246": return `${baseV2Url}n46_cover_dig2.jpg`;
            case "大嫌いなはずだった。": return `${baseV2Url}n46_cover_dig_honeyworks.jpg`;
            case "1・2・3": return `${baseV2Url}n46_cover_dig_karaage.jpg`;
            default: return `${baseV2Url}n46_cover_x.jpg`;
        }
    }
    return `${baseV2Url}n46_cover_x.jpg`;
}

/* ---------------------- */
/* Helper Render */
/* ---------------------- */

function appendResultCard(titleJp, vibeData, criteria = {}, isMoodMode = false, totalResults = 1, currentIndex = 0) {
    const lookupData = songLookup[titleJp];
    const titleRo = lookupData ? lookupData.songData.titleRo : "Title Unknown";
    const releaseKey = lookupData ? lookupData.releaseKey : "";
    const coverUrl = lookupData ? getSingleImageUrl(releaseKey, lookupData.songData) : "https://via.placeholder.com/120";
    
    let releaseText = "Unknown Release";
    const fallbackTrack = (globalSongAll[releaseKey] && globalSongAll[releaseKey].length > 0) ? globalSongAll[releaseKey][0].titleRo : "";
    
    if (releaseKey.startsWith('s')) {
        const num = releaseKey.replace('s', '');
        releaseText = `${getOrdinalSuffix(num)} Single "${fallbackTrack}"`;
    } else if (releaseKey.startsWith('a')) {
        const num = releaseKey.replace('a', '');
        releaseText = `${getOrdinalSuffix(num)} Album "${albumTitles[releaseKey] || fallbackTrack}"`;
    } else if (releaseKey.startsWith('b')) {
        const num = releaseKey.replace('b', '');
        releaseText = `${getOrdinalSuffix(num)} Best Album "${albumTitles[releaseKey] || fallbackTrack}"`;
    } else if (releaseKey.startsWith('u')) {
        const num = releaseKey.replace('u', '');
        releaseText = `${getOrdinalSuffix(num)} Under Album "${albumTitles[releaseKey] || fallbackTrack}"`;
    } else if (releaseKey.startsWith('dig')) {
        releaseText = `Single Digital`;
    } else if (releaseKey.startsWith('akb')) {
        const num = releaseKey.replace('akb', '');
        releaseText = `AKB48 Single ${num} "${albumTitles[releaseKey] || fallbackTrack}"`;
    }

    const isPrimaryMatch = criteria.mood && vibeData.vibe.primary_mood === criteria.mood;
    const isSecondaryMatch = criteria.mood && vibeData.vibe.secondary_mood === criteria.mood;
    const isSeasonMatch = criteria.season && vibeData.vibe.season === criteria.season;
    const isPovMatch = criteria.pov && vibeData.vibe.pov_type === criteria.pov;
    const isThemeMatch = criteria.theme && vibeData.vibe.theme === criteria.theme;

    const moodClassPrimary = isPrimaryMatch ? 'highlight' : '';
    const moodClassSecondary = isSecondaryMatch ? 'highlight' : '';
    const seasonClass = isSeasonMatch ? 'highlight' : '';
    const povClass = isPovMatch ? 'highlight' : '';
    const themeClass = isThemeMatch ? 'highlight' : '';
    
    const descriptionText = vibeData.vibe.description ? vibeData.vibe.description : "Menunggu deskripsi puitis dari angin yang berhembus...";

    if (isMoodMode) {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <img src="${coverUrl}" class="result-cover" onerror="this.onerror=null; this.src='https://via.placeholder.com/120';">
            <div class="result-info">
                <h3 class="jpn font0"><i class="fas fa-music"></i> ${titleJp}</h3>
                <h4 class="romaji-title">${titleRo}</h4>
                <div class="release-label"><i class="fas fa-compact-disc"></i> ${releaseText}</div>
                <p class="song-description">${descriptionText}</p>
                <div class="vibe-tags">
                    <span class="tag mood ${moodClassPrimary}">Utama: ${moodMap[vibeData.vibe.primary_mood] || vibeData.vibe.primary_mood}</span>
                    <span class="tag mood ${moodClassSecondary}">Sub: ${moodMap[vibeData.vibe.secondary_mood] || vibeData.vibe.secondary_mood}</span>
                    <span class="tag season ${seasonClass}">${seasonMap[vibeData.vibe.season] || vibeData.vibe.season}</span>
                    <span class="tag pov ${povClass}">${povMap[vibeData.vibe.pov_type] || vibeData.vibe.pov_type}</span>
                    <span class="tag theme ${themeClass}">${themeMap[vibeData.vibe.theme] || vibeData.vibe.theme}</span>
                </div>
            </div>
        `;
        document.getElementById('resultAreaMood').appendChild(card);
    } else {
        const cdCoverProp = document.getElementById('mainCdCover');
        if (cdCoverProp) {
            cdCoverProp.src = coverUrl;
        }

        let navHTML = "";
        if (totalResults > 1) {
            navHTML = `
                <div class="desk-nav-controls">
                    <button class="desk-nav-btn" onclick="changeDeskSlide(-1)"><i class="fas fa-arrow-left"></i></button>
                    <span class="desk-nav-text">${currentIndex + 1} / ${totalResults}</span>
                    <button class="desk-nav-btn" onclick="changeDeskSlide(1)"><i class="fas fa-arrow-right"></i></button>
                </div>
            `;
        }

        const deskResult = document.getElementById('resultAreaDesk');
        deskResult.innerHTML = `
            <div class="result-card" style="background: var(--cokelat-kertas); border-radius: 0; clip-path: var(--pixel-update-clip-path-outer); border: none;">
                <div class="result-info">
                    <h3 class="jpn font0" style="color: var(--cokelat2); font-size: 2rem; margin-bottom:0;"><i class="fas fa-music"></i> ${titleJp}</h3>
                    <h4 class="romaji-title" style="color: var(--cokelat4); font-size: 1.2rem;">${titleRo}</h4>
                    <div class="release-label" style="color: var(--cokelat3);"><i class="fas fa-compact-disc"></i> ${releaseText}</div>
                    
                    <p class="song-description" style="color: var(--cokelat1); background: rgba(255,255,255,0.4); border-left: 4px solid var(--cokelat4);">${descriptionText}</p>
                    
                    <div class="vibe-tags">
                        <span class="tag mood" style="background: var(--cokelat5); border-radius:0; color: #f4e8d4; clip-path: var(--pixel-update-clip-path-outer);">Utama: ${moodMap[vibeData.vibe.primary_mood] || vibeData.vibe.primary_mood}</span>
                        <span class="tag mood" style="background: var(--cokelat5); border-radius:0; color: #f4e8d4; clip-path: var(--pixel-update-clip-path-outer);">Sub: ${moodMap[vibeData.vibe.secondary_mood] || vibeData.vibe.secondary_mood}</span>
                        <span class="tag season" style="background: var(--cokelat5); border-radius:0; color: #f4e8d4; clip-path: var(--pixel-update-clip-path-outer);">${seasonMap[vibeData.vibe.season] || vibeData.vibe.season}</span>
                        <span class="tag pov" style="background: var(--cokelat5); border-radius:0; color: #f4e8d4; clip-path: var(--pixel-update-clip-path-outer);">${povMap[vibeData.vibe.pov_type] || vibeData.vibe.pov_type}</span>
                        <span class="tag theme" style="background: var(--cokelat5); border-radius:0; color: #f4e8d4; clip-path: var(--pixel-update-clip-path-outer);">${themeMap[vibeData.vibe.theme] || vibeData.vibe.theme}</span>
                    </div>
                    ${navHTML}
                </div>
            </div>
        `;
    }
}

initVibeSystem();



document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.keyCode === 187 || e.keyCode === 189)) {
        e.preventDefault();
    }
});

document.addEventListener('wheel', function(e) {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });


document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});