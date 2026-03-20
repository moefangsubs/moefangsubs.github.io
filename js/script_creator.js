const groupFilter = document.getElementById('groupFilter');
const roleFilter = document.getElementById('roleFilter');
const titleFilter = document.getElementById('titleFilter');
const showSingleCheck = document.getElementById('showSingleCheck');
const showTypeCheck = document.getElementById('showTypeCheck');
const creatorList = document.getElementById('creatorList');
const loadingElement = document.getElementById('loadingElement');
const creatorContainer = document.getElementById('creatorContainer');
const groupIconPreview = document.getElementById('groupIconPreview');

const dataPaths = {
    nogi: '../store/single/songall.json',
    keya: '../store/single/songall_46keyaki.json',
    sakura: '../store/single/songall_46sakura.json',
    hinata: '../store/single/songall_46hinata.json',
    boku: '../store/single/songall_bokuao.json'
};

const groupMeta = {
    all: { icon: '../sprite/element/group/8bit_sakamichi.png' },
    nogi: { icon: '../sprite/element/group/8bit_nogi.png', color: 'text-nogi', bg: 'bg-nogi', border: 'border-nogi', bgSoft: 'bg-soft-nogi' },
    keya: { icon: '../sprite/element/group/8bit_keya.png', color: 'text-keya', bg: 'bg-keya', border: 'border-keya', bgSoft: 'bg-soft-keya' },
    sakura: { icon: '../sprite/element/group/8bit_saku.png', color: 'text-sakura', bg: 'bg-sakura', border: 'border-sakura', bgSoft: 'bg-soft-sakura' },
    hinata: { icon: '../sprite/element/group/8bit_hina.png', color: 'text-hinata', bg: 'bg-hinata', border: 'border-hinata', bgSoft: 'bg-soft-hinata' },
    boku: { icon: '../sprite/element/group/8bit_bokuao.png', color: 'text-boku', bg: 'bg-boku', border: 'border-boku', bgSoft: 'bg-soft-boku' }
};

let globalSortedData = [];
let activeCreatorName = null;

// ----------------------
// Data Fetching
// ----------------------

async function loadCreatorData() {
    loadingElement.style.display = 'block';
    creatorList.innerHTML = '';
    
    const selectedGroup = groupFilter.value;
    creatorContainer.setAttribute('data-theme', selectedGroup);
    groupIconPreview.src = groupMeta[selectedGroup].icon;
    groupIconPreview.style.display = groupMeta[selectedGroup].icon ? 'block' : 'none';
    
    try {
        let songsArray = [];

        if (selectedGroup === 'all') {
            const fetchPromises = Object.entries(dataPaths).map(async ([group, path]) => {
                const response = await fetch(path);
                const data = await response.json();
                return extractSongs(data, group);
            });
            const results = await Promise.all(fetchPromises);
            songsArray = results.flat();
        } else {
            const response = await fetch(dataPaths[selectedGroup]);
            const data = await response.json();
            songsArray = extractSongs(data, selectedGroup);
        }
        
        processRanking(songsArray);
    } catch (error) {
        console.error(error);
        creatorList.innerHTML = '<tr><td colspan="3" style="text-align:center; color:red;">Gagal memuat data.</td></tr>';
    } finally {
        loadingElement.style.display = 'none';
    }
}

// ----------------------
// Data Extraction
// ----------------------

function extractSongs(data, groupId) {
    let songs = [];
    
    function traverse(obj) {
        if (Array.isArray(obj)) {
            obj.forEach(traverse);
        } else if (typeof obj === 'object' && obj !== null) {
            if (obj.SongCompJP !== undefined || obj.SongLyricsJP !== undefined || obj.SongMVDirJP !== undefined) {
                obj._groupId = groupId;
                songs.push(obj);
            } else {
                Object.values(obj).forEach(traverse);
            }
        }
    }
    
    traverse(data);
    return songs;
}

// ----------------------
// Data Processing
// ----------------------

function processRanking(songs) {
    const role = roleFilter.value;
    const stats = {};

    songs.forEach(song => {
        let creators = song[role];
        
        if (creators && creators !== "-" && creators !== "") {
            let list = [];
            
            if (Array.isArray(creators)) {
                list = creators.map(name => String(name).trim());
            } else {
                list = String(creators).split(/[,、/&・]/).map(name => name.trim());
            }
            
            list.forEach(name => {
                if (name && name.length > 1) {
                    if (!stats[name]) {
                        stats[name] = { total: 0, groups: {}, songs: [] };
                    }
                    
                    stats[name].total += 1;
                    
                    const gId = song._groupId;
                    stats[name].groups[gId] = (stats[name].groups[gId] || 0) + 1;
                    
                    const titleJp = song.titleJp || "Unknown Title";
                    const titleRo = song.titleRo || "Unknown Title";
                    
                    stats[name].songs.push({
                        titleJp: titleJp,
                        titleRo: titleRo,
                        group: gId,
                        creatorsList: list,
                        songNumber: song.songNumber || song.SongNumber || "",
                        songType: song.SongTypeAvv || song.songTypeAvv || ""
                    });
                }
            });
        }
    });

    globalSortedData = Object.entries(stats)
        .sort((a, b) => b[1].total - a[1].total)
        .slice(0, 100);

    renderTable();
}

// ----------------------
// UI Rendering
// ----------------------

function renderTable() {
    const titlePref = titleFilter.value;
    const showSingle = showSingleCheck.checked;
    const showType = showTypeCheck.checked;
    let html = '';
    
    let currentRank = 0;
    let previousTotal = -1;
    
    globalSortedData.forEach((item, index) => {
        const creatorName = item[0];
        const data = item[1];
        
        if (data.total !== previousTotal) {
            currentRank++;
            previousTotal = data.total;
        }
        
        let groupStatsHtml = '';
        for (const [gId, count] of Object.entries(data.groups)) {
            const meta = groupMeta[gId];
            const iconTag = meta.icon ? `<img src="${meta.icon}" class="group-icon">` : ``;
            groupStatsHtml += `<span class="${meta.color}">${iconTag}${count} Lagu</span>`;
        }

        let songListHtml = '';
        data.songs.forEach(song => {
            const meta = groupMeta[song.group];
            const iconTag = meta.icon ? `<img src="${meta.icon}" class="group-icon">` : ``;
            const displayTitle = titlePref === 'titleRo' ? song.titleRo : song.titleJp;
            
            let collabHtml = '';
            if (song.creatorsList.length > 1) {
                const collabs = song.creatorsList.filter(c => c !== creatorName);
                if (collabs.length > 0) {
                    let collabNames = collabs.join(', ');
                    if (collabs.length > 1) {
                        const last = collabs.pop();
                        collabNames = collabs.join(', ') + ' dan ' + last;
                    }
                    collabHtml = `<div class="collab-text">Kolaborasi dengan ${collabNames}</div>`;
                }
            }

            let badgesHtml = '';
            if (showSingle && song.songNumber) {
                badgesHtml += `<span class="song-badge ${meta.bg}">${song.songNumber}</span>`;
            }
            if (showType && song.songType) {
                badgesHtml += `<span class="song-badge ${meta.border}">${song.songType}</span>`;
            }

            songListHtml += `
                <div class="song-item-wrapper ${meta.bgSoft}">
                    <div class="song-item-main">
                        <div class="song-title-wrapper ${meta.color}">
                            ${iconTag}<span>${displayTitle}</span>
                        </div>
                        <div class="song-badges-wrapper">
                            ${badgesHtml}
                        </div>
                    </div>
                    ${collabHtml}
                </div>
            `;
        });

        const isOpenClass = (creatorName === activeCreatorName) ? 'open' : '';
        const safeName = creatorName.replace(/"/g, '&quot;');

        html += `
            <tr class="creator-row" data-name="${safeName}" onclick="toggleDetails(this.getAttribute('data-name'), ${index})">
                <td><span class="rank-badge">${currentRank}</span></td>
                <td><strong>${creatorName}</strong></td>
                <td style="text-align: center;">${data.total} Lagu</td>
            </tr>
            <tr id="details-${index}" class="details-row">
                <td colspan="3">
                    <div class="details-wrapper ${isOpenClass}" id="wrapper-${index}">
                        <div class="details-content">
                            <div class="group-stats">${groupStatsHtml}</div>
                            <div class="song-list">${songListHtml}</div>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    });
    
    if (html === '') {
        html = '<tr><td colspan="3" style="text-align:center;">Data tidak ditemukan.</td></tr>';
    }
    
    creatorList.innerHTML = html;
}

// ----------------------
// Interactivity
// ----------------------

function toggleDetails(name, index) {
    const wrapper = document.getElementById(`wrapper-${index}`);
    
    if (activeCreatorName === name) {
        wrapper.classList.remove('open');
        activeCreatorName = null;
    } else {
        const allWrappers = document.querySelectorAll('.details-wrapper.open');
        allWrappers.forEach(w => w.classList.remove('open'));
        
        wrapper.classList.add('open');
        activeCreatorName = name;
    }
}

// ----------------------
// Event Listeners
// ----------------------

showSingleCheck.addEventListener('change', () => {
    if (!showSingleCheck.checked) {
        showTypeCheck.checked = false;
    }
    renderTable();
});

showTypeCheck.addEventListener('change', () => {
    if (showTypeCheck.checked) {
        showSingleCheck.checked = true;
    }
    renderTable();
});

groupFilter.addEventListener('change', loadCreatorData);
roleFilter.addEventListener('change', loadCreatorData);
titleFilter.addEventListener('change', () => renderTable());
document.addEventListener('DOMContentLoaded', loadCreatorData);