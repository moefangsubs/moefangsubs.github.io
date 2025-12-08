document.addEventListener('DOMContentLoaded', async () => {
    const mainContainer = document.querySelector('.mv-group-container');
    if (!mainContainer) return;
    mainContainer.innerHTML = '<p style="color:white;text-align:center;">Memuat data MV...</p>';
    const specialTitles = {
        nogizaka46: {
            "a1": "Toumei na Iro", "a2": "Sorezore no Isu", "a3": "Umarete kara Hajimete Mita Yume",
            "a4": "Ima ga Omoide ni naru made", "b1": "Time flies", "u1": "Boku dake no Kimi ~Under Super Best~", "dig": "Digital Release"
        },
        hinatazaka: { "a01": "Hinatazaka", "a02": "Myakuutsu Kanjou", "hira_alb": "Hashiridasu Shunkan" },
        sakurazaka: { "a01": "As You Know?", "a02": "Addiction" },
        keyakizaka: {
            "a01": "Masshiro na Mono wa Yogoshitakunaru", "b01": "Eien yori Nagai Isshun", "dig": "Dare ga Sono Kane o Narasu no ka?"
        }
    };
    const pageConfig = {
        'sub-mv-48-46.html': [
            { key: 'keyakizaka', path: '../store/single/songall_46keyaki.json', title: 'Keyakizaka46', className: 'skr' },
            { key: 'sakurazaka', path: '../store/single/songall_46sakura.json', title: 'Sakurazaka46', className: 'skr' },
            { key: 'hinatazaka', path: '../store/single/songall_46hinata.json', title: 'Hinatazaka46', className: 'hnt' }
        ],
        'sub-mv-nogizaka46.html': [
            { key: 'nogizaka46', path: '../store/single/songall.json', title: 'Nogizaka46', className: 'n46' }
        ],
        'sub-mv-bokuao.html': [
            { key: 'bokuao', path: '../store/single/songall_bokuao.json', title: 'Boku ga Mitakatta Aozora', className: 'bao' }
        ]
    };
    const pageName = window.location.pathname.split('/').pop();
    const groupFiles = pageConfig[pageName] || [];
    if (groupFiles.length === 0) {
        mainContainer.innerHTML = '<p style="color:white;text-align:center;">Konfigurasi halaman tidak ditemukan.</p>';
        return;
    }
    let finalHTML = '';
    const allGroupData = await Promise.all(
        groupFiles.map(file => fetch(file.path).then(res => res.ok ? res.json() : null).catch(() => null))
    );
    allGroupData.forEach((data, index) => {
        if (!data) return;
        const groupInfo = groupFiles[index];
        const groupKey = groupInfo.key;
        const isNogizaka = groupKey === 'nogizaka46';
        const singles = isNogizaka ? data : data[Object.keys(data)[0]];
        if (!singles || Object.keys(singles).length === 0) return;
        let singlesHTML = '';
        for (const singleId in singles) {
            const songs = Array.isArray(singles[singleId]) ? singles[singleId] : Object.values(singles[singleId]);
            const hasDownloadableMV = songs.some(song => {
                const hasLink = song.LinkDownMV1 || song.LinkDownMV2;
                return isNogizaka ? hasLink : (song.HasMV === 'yes' && hasLink);
            });
            if (!hasDownloadableMV) continue;
            let mainCoverArt;
            if (groupKey === 'bokuao') {
                const dummySongForMainCover = { SongTypeAvv: 'Type-A' };
                mainCoverArt = getCoverArtUrl(groupKey, singleId, dummySongForMainCover);
            } else {
                const firstSongWithCover = songs[0];
                mainCoverArt = getCoverArtUrl(groupKey, singleId, firstSongWithCover);
            }
            let singleTitle = (specialTitles[groupKey] && specialTitles[groupKey][singleId])
                ? specialTitles[groupKey][singleId]
                : (songs[0]?.titleRo || 'Unknown Title');
            const songListHTML = songs
                .filter(song => (isNogizaka ? (song.LinkDownMV1 || song.LinkDownMV2) : (song.HasMV === 'yes')))
                .map(song => {
                    const hasLink = !!song.LinkDownMV1 || !!song.LinkDownMV2;
                    const liClass = hasLink ? 'mvv' : 'mvx';
                    const titleClass = (song.titleJp === song.titleRo) ? 'roa' : 'ro';
                    const category = song.songOutline || '';
                    const downloadLinkHTML = song.LinkDownMV1 ? `<li class="song-download"><a href="${song.LinkDownMV1}" target="_blank"></a></li>` : '';
                    let trackCoverArtHTML = '';
                    const grayscaleClass = hasLink ? '' : 'grayscale';
                    if (groupKey === 'bokuao' && Array.isArray(song.SongTypeAvv)) {
                        trackCoverArtHTML = song.SongTypeAvv.map(type => {
                            const tempSong = { ...song, SongTypeAvv: type };  
                            const trackCoverArtUrl = getCoverArtUrl(groupKey, singleId, tempSong);
                            return `<img src="${trackCoverArtUrl}" class="${grayscaleClass}" loading="lazy" />`;
                        }).join('');
                    } else {
                        const trackCoverArtUrl = getCoverArtUrl(groupKey, singleId, song);
                        trackCoverArtHTML = `<img src="${trackCoverArtUrl}" class="${grayscaleClass}" loading="lazy" />`;
                    }
                    return `
                        <span class="${liClass}">
                            <li class="song-cover">${trackCoverArtHTML}</li>
                            <li class="song-title">
                                <p class="${titleClass}">${song.titleRo}</p>
                                ${song.titleJp && song.titleJp !== song.titleRo ? `<p class="jp">${song.titleJp}</p>` : ''}
                                ${category ? `<p class="cat">${category}</p>` : ''}
                            </li>
                            ${downloadLinkHTML}
                        </span>
                    `;
                }).join('');
            if (!songListHTML) continue;
            singlesHTML += `
                <div class="single-container" single="${singleId}">
                    <span class="single-title">${singleTitle.toUpperCase()}</span>
                    <div class="download">
                        <div class="cdcover"><img src="${mainCoverArt}" loading="lazy" /></div>
                        <div class="songlist">${songListHTML}</div>
                    </div>
                </div>
            `;
        }
        if (singlesHTML) {
            finalHTML += `
                <div class="mv-group" data="${groupKey}">
                    <h2 class="${groupInfo.className}">${groupInfo.title}</h2>
                    ${singlesHTML}
                </div>
            `;
        }
    });
    if (finalHTML) {
        mainContainer.innerHTML = finalHTML;
    } else {
        mainContainer.innerHTML = '<p style="color:white;text-align:center;">Tidak ada MV yang tersedia saat ini.</p>';
    }
});