document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    const pageType = mainContent.dataset.pageType;
    const displayArea = document.getElementById('song-display-area');
    Promise.all([
        fetch('../store/single/songall.json').then(res => res.json()),
        fetch('../store/member/members.json').then(res => res.json())
    ]).then(([songData, memberData]) => {
        const memberJpMap = new Map(memberData.map(m => [m.nama_jp, m]));
        const memberRomajiMap = new Map(memberData.map(m => [m.nama_romaji, m]));
        const categoryOrder = getCategoryOrder(songData);
        let allSongs = [];
        categoryOrder.forEach(key => {
            if (songData[key]) {
                songData[key].forEach((song, index) => {
                    allSongs.push({ ...song, sourceKey: key, sourceIndex: index });
                });
            }
        });
        let filteredSongs;
        let groupingFunction;
        let sortGroupsManually = false;
        switch (pageType) {
            case 'senbatsu-main':
                filteredSongs = filterSenbatsuMain(songData, categoryOrder);
                groupingFunction = groupBySongNumber;
                break;
            case 'senbatsu-coupling':
                filteredSongs = filterSenbatsuCoupling(songData, categoryOrder);
                groupingFunction = groupBySongNumber;
                break;
            case 'under':
                filteredSongs = allSongs.filter(song => song.songOutline && song.songOutline.toLowerCase().includes('under'));
                groupingFunction = groupBySongNumber;
                break;
            case 'solo':
                filteredSongs = allSongs.filter(song => song.songOutline === 'Solo');
                groupingFunction = (songs) => groupByMemberName(songs, memberJpMap);
                sortGroupsManually = true;
                break;
            case 'generation':
                filteredSongs = allSongs.filter(song => song.songOutline && song.songOutline.toLowerCase().includes('gen'));
                groupingFunction = groupByGeneration;
                sortGroupsManually = true;
                break;
            case 'unit':
                filteredSongs = allSongs.filter(song => song.songOutline && song.songOutline.toLowerCase().includes('unit'));
                groupingFunction = groupBySongNumber;
                break;
        }
        const groupedSongs = groupingFunction(filteredSongs);
        displaySongs(groupedSongs, { memberJpMap, memberRomajiMap }, pageType, displayArea, sortGroupsManually);
    }).catch(error => {
        console.error('Error loading data:', error);
        displayArea.innerHTML = '<p>Error loading song data. Please try again later.</p>';
    });
});
function getCategoryOrder(songData) {
    const keys = Object.keys(songData);
    const order = { s: 1, dig: 2, a: 3, u: 4, b: 5 };
    return keys.sort((a, b) => {
        const typeA = a.replace(/\d+/g, '');
        const typeB = b.replace(/\d+/g, '');
        const numA = parseInt(a.match(/\d+/g) || 0);
        const numB = parseInt(b.match(/\d+/g) || 0);
        if (order[typeA] !== order[typeB]) {
            return order[typeA] - order[typeB];
        }
        return numA - numB;
    });
}
function filterSenbatsuMain(songData, order) {
    const mainSongs = [];
    order.forEach(key => {
        if (songData[key] && songData[key].length > 0) {
            const firstSong = songData[key][0];
            if (firstSong.songOutline && firstSong.songOutline.toLowerCase().includes('senbatsu')) {
                mainSongs.push({ ...firstSong, sourceKey: key, sourceIndex: 0 });
            }
        }
    });
    return mainSongs;
}
function filterSenbatsuCoupling(songData, order) {
    const couplingSongs = [];
     order.forEach(key => {
        if (songData[key] && songData[key].length > 1) {
            songData[key].slice(1).forEach((song, index) => {
                if (song.songOutline && song.songOutline.toLowerCase().includes('senbatsu')) {
                     couplingSongs.push({ ...song, sourceKey: key, sourceIndex: index + 1 });
                }
            });
        }
    });
    return couplingSongs;
}
function getMemberNames(song) {
    let members = [];
    for (let i = 0; i <= 5; i++) {
        if (song[`members${i}`]) {
            members = members.concat(song[`members${i}`]);
        }
    }
     if (members.length === 0 && song.members0) {
        members.push(song.members0);
    }
    return members.flat();
}
function getMemberCounts(song, memberMap) {
    const names = getMemberNames(song);
    let active = 0;
    let graduated = 0;
    names.forEach(name => {
        const member = memberMap.get(name);
        if (member) {
            if (member.status === 'aktif') {
                active++;
            } else {
                graduated++;
            }
        }
    });
    return { active, graduated };
}
function getImageUrl(song) {
    const key = song.sourceKey;
    const type = song.songTypeAvv || 'All';
    const baseUrl = 'https://ik.imagekit.io/moearchive/singlealbum/v2/';
    const digitalCovers = {
        "大嫌いなはずだった。": "n46_cover_dig_honeyworks",
        "世界中の隣人よ": "n46_cover_dig1",
        "Route 246": "n46_cover_dig2",
        "1・2・3": "n46_cover_dig_karaage"
    };
    if (digitalCovers[song.titleJp.trim()]) {
        return `${baseUrl}${digitalCovers[song.titleJp.trim()]}.jpg`;
    }
    const keyPrefix = key.charAt(0);
    if (keyPrefix === 'a' || keyPrefix === 'u' || keyPrefix === 'b') {
        return `${baseUrl}n46_cover_${key}.jpg`;
    }
    if (keyPrefix === 's') {
        let typeSuffix;
        switch (type.toLowerCase()) {
            case 'a': case 'all': typeSuffix = 'a'; break;
            case 'b': typeSuffix = 'b'; break;
            case 'c': typeSuffix = 'c'; break;
            case 'd': typeSuffix = 'd'; break;
            case 'regular': typeSuffix = 'r'; break;
            default: typeSuffix = 'a';
        }
        return `${baseUrl}n46_cover_${key}${typeSuffix}.jpg`;
    }
    return `${baseUrl}n46_cover_s01a.jpg`;
}
function createSongElement(song, maps, pageType) {
    const { memberJpMap } = maps;
    const counts = getMemberCounts(song, memberJpMap);
    const imageUrl = getImageUrl(song);
    const detailUrl = `song.html?name=${encodeURIComponent(song.titleJp)}`;
    let unitNameHTML = '';
    if (pageType === 'unit' && song.UnitName) {
        unitNameHTML = `<div class="song-unit-name jpn">Unit: ${song.UnitName}</div>`;
    }
    let memberInfoHTML = '';
    const gridPages = ['generation', 'unit', 'senbatsu-coupling'];
    if (pageType === 'solo') {
    } else if (gridPages.includes(pageType)) {
        const memberNames = getMemberNames(song);
        const photoGrid = memberNames.map(name => {
            const member = memberJpMap.get(name);
            if(member) {
                return `<img src="${member.foto_profil}" class="member-photo-grid-item status-${member.status}" title="${member.nama_romaji}" loading="lazy">`;
            }
            return '';
        }).join('');
        memberInfoHTML = `
            <div>Member Aktif: ${counts.active} orang</div>
            <div>Member Lulus: ${counts.graduated} orang</div>
            <div class="member-photo-grid">${photoGrid}</div>
        `;
    } else {
        memberInfoHTML = `
            <div>Member Aktif: ${counts.active} orang</div>
            <div>Member Lulus: ${counts.graduated} orang</div>
        `;
    }
    return `
        <div class="song-item">
            <div class="song-item-img">
                <img src="${imageUrl}" alt="${song.titleRo} cover" loading="lazy">
            </div>
            <div class="song-item-details">
                <div class="song-titles">
                    <span class="song-title-jp jpn">${song.titleJp}</span>
                    <span class="song-title-ro">${song.titleRo}</span>
                </div>
                <div class="song-meta">
                    ${unitNameHTML}
                    ${memberInfoHTML}
                </div>
            </div>
            <div class="song-item-action">
                <a href="${detailUrl}" class="details-button jpn">Detail ></a>
            </div>
        </div>
    `;
}
function displaySongs(groupedSongs, maps, pageType, container, sortGroupsManually) {
    container.innerHTML = '';
    let groupKeys = Array.from(groupedSongs.keys());
    const { memberRomajiMap } = maps;
    if (!sortGroupsManually) {
         const order = { "Single": 1, "Digital": 2, "Album": 3, "Under Album": 4, "Best Album": 5 };
         groupKeys.sort((a, b) => {
            const getOrder = (key) => {
                for (const prefix in order) { if (key.includes(prefix)) return order[prefix]; }
                return 99;
            };
            const numA = parseInt(a.match(/\d+/));
            const numB = parseInt(b.match(/\d+/));
            const orderA = getOrder(a);
            const orderB = getOrder(b);
            if (orderA !== orderB) return orderA - orderB;
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
            return a.localeCompare(b);
        });
    }
    for (const groupName of groupKeys) {
        const songs = groupedSongs.get(groupName);
        if (songs.length === 0) continue;
        const wrapper = document.createElement('div');
        wrapper.className = 'category-wrapper';
        const title = document.createElement('h2');
        title.className = 'category-title jpn';
        if (pageType === 'solo') {
            const member = memberRomajiMap.get(groupName.toUpperCase().replace(/\s/g, ' '));
            if (member) {
                title.innerHTML = `<img src="${member.foto_profil}" class="category-title-img"> <span>${groupName}</span>`;
            } else {
                title.textContent = groupName;
            }
        } else {
             title.textContent = groupName;
        }
        wrapper.appendChild(title);
        const listContainer = document.createElement('div');
        listContainer.className = 'song-list-container';
        listContainer.innerHTML = songs.map(song => createSongElement(song, maps, pageType)).join('');
        wrapper.appendChild(listContainer);
        container.appendChild(wrapper);
    }
}
function groupBySongNumber(songs) {
    const groups = new Map();
    songs.forEach(song => {
        const groupName = song.songNumber || 'Lainnya';
        if (!groups.has(groupName)) {
            groups.set(groupName, []);
        }
        groups.get(groupName).push(song);
    });
    return groups;
}
function groupByGeneration(songs) {
    const groups = new Map();
    const genOrder = ["Gen (1st)", "Gen (2nd)", "Gen (3rd)", "Gen (4th)", "Gen (5th)", "Gen (6th)"];
    genOrder.forEach(gen => groups.set(gen, []));
    songs.forEach(song => {
        const genMatch = song.songOutline.match(/Gen\s\(\d+[a-z]+\)/);
        if (genMatch) {
            const groupName = genMatch[0];
            if (groups.has(groupName)) {
                groups.get(groupName).push(song);
            }
        }
    });
    return groups;
}
function groupByMemberName(songs, memberJpMap) {
    const groups = new Map();
    const memberRomajiNames = new Map();
    memberJpMap.forEach(m => memberRomajiNames.set(m.nama_jp, m.nama_romaji));
    songs.forEach(song => {
        const memberJpName = song.members0;
        const memberRoName = memberRomajiNames.get(memberJpName) || memberJpName;
        const groupName = memberRoName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        if (!groups.has(groupName)) {
            groups.set(groupName, []);
        }
        groups.get(groupName).push(song);
    });
    return new Map([...groups.entries()].sort());
}