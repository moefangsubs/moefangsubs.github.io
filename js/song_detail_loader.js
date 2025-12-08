window.handleImageError = function(imageElement, filename) {
    const failingSrc = imageElement.src;
    const match = failingSrc.match(/\/s(\d{3})\ 
    if (!match) {
        imageElement.onerror = null;
        imageElement.src = 'https://via.placeholder.com/80';
        return;
    }
    const currentNum = parseInt(match[1]);
    const nextNum = currentNum - 1;
    if (nextNum > 0) {
        const fallbackPrefix = 's' + String(nextNum).padStart(3, '0');
        const newUrl = `https: 
        imageElement.src = newUrl;
    } else {
        imageElement.onerror = null;
        imageElement.src = 'https://via.placeholder.com/80';
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const songNameJp = params.get('name');
    const detailWrapper = document.getElementById('song-detail-wrapper');
    const lyricsWrapper = document.getElementById('lyrics-wrapper');
    if (!songNameJp) {
        document.title = "Daftar Lagu Nogizaka46";
        lyricsWrapper.style.display = 'none';
        displaySongList();
        return;
    }
    Promise.all([
        fetch('../store/single/songall.json').then(res => res.json()),
        fetch('../store/member/members.json').then(res => res.json()),
        fetch('../store/single/lyrics.json').then(res => res.json()),
        fetch('../store/single/spotifyembed.json').then(res => res.json())
    ]).then(([songallData, membersData, lyricsData, spotifyData]) => {
        lyricsWrapper.style.display = 'none';
        let targetSong = null;
        let releaseKey = null;
        for (const rKey in songallData) {
            const song = songallData[rKey].find(s => s.titleJp.trim() === songNameJp.trim());
            if (song) {
                targetSong = song;
                releaseKey = rKey;
                break;
            }
        }
        if (!targetSong) {
            detailWrapper.innerHTML = `<h1>Lagu "${songNameJp}" tidak dapat ditemukan.</h1>`;
            return;
        }
        document.title = `${targetSong.titleRo} - Detail Lagu`;
        const songLyrics = lyricsData.find(lyric => lyric.title.trim() === targetSong.titleJp.trim());
        const memberNameMap = membersData.reduce((acc, member) => {
            acc[member.nama_jp.trim()] = {
                id: member.id,
                romaji: member.nama_romaji
            };
            return acc;
        }, {});
        const externalMemberNameMap = {
            "小嶋陽菜 (AKB48)": "Kojima Haruna (AKB48)",
            "宮脇咲良": "Miyawaki Sakura (AKB48 Team A/HKT48 Team KIV)",
            "向井地美音": "Mukaichi Mion (AKB48 Team K)",
            "小嶋真子": "Kojima Mako (AKB48 Team 4)",
            "岡田奈々": "Okada Nana (AKB48 Team 4)",
            "小栗有以": "Oguri Yui (AKB48 Team 8)",
            "松井珠理奈": "Matsui Jurina (SKE48 Team S)",
            "今泉佑唯": "Imaizumi Yui (Keyakizaka46)",
            "菅井友香": "Sugai Yuuka (Keyakizaka46)",
            "平手友梨奈": "Hirate Yurina (Keyakizaka46)",
            "渡辺梨加": "Watanabe Rika (Keyakizaka46)",
            "渡邉理佐": "Watanabe Risa (Keyakizaka46)",
            "長濱ねる": "Nagahama Neru (Keyakizaka46)",
            "岡部麟": "Okabe Rin (AKB48 Team 8)",
            "加藤史帆": releaseKey === "akb51" ? "Kato Shiho (Hiragana Keyakizaka)" : "Kato Shiho (Hinatazaka46)",
            "小林由依": "Kobayashi Yui (Keyakizaka46)",
            "矢作萌夏": "Yahagi Moeka (AKB8 Team K)",
            "福岡聖菜": "Fukuoka Seina (AKB8 Team B)",
            "山内瑞葵": "Yamauchi Mizuki (AKB8 Team 4)",
            "下尾みう": "Shitao Miu (AKB48 Team 8/A)",
            "坂口渚沙": "Sakaguchi Nagisa (AKB48 Team 8/4)",
            "梅山恋和": "Umeyama Kokona (NMB48 Team BII)",
            "田中美久": "Tanaka Miku (HKT48 Team H)",
            "瀧野由美子": "Takino Yumiko (STU48)",
            "小池美波": "Koike Minami (Keyakizaka46)",
            "鈴本美愉": "Suzumoto Miyu (Keyakizaka46)",
            "土生瑞穂": "Habu Mizuho (Keyakizaka46)",
            "小坂菜緒": "Kosaka Nao (Hinatazaka46)",
            "齊藤京子": "Saito Kyoko (Hinatazaka46)",
            "佐々木美玲": "Sasaki Mirei (Hinatazaka46)",
            "渡邉美穂": "Watanabe Miho (Hinatazaka46)"
        };
        const getRomajiName = (jpName) => {
            if (!jpName) return "";
            if (externalMemberNameMap[jpName.trim()]) {
                return externalMemberNameMap[jpName.trim()];
            }
            const member = memberNameMap[jpName.trim()];
            return member ? member.romaji.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : jpName;
        };
        const formatReleaseDate = (dateStr) => {
            if (!dateStr || !/^\d{4}\.\d{2}\.\d{2}$/.test(dateStr)) return null;
            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            const [year, month, day] = dateStr.split('.');
            return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
        };
        const getSingleImageUrl = () => {
            const baseV2Url = "https://ik.imagekit.io/moearchive/singlealbum/v2/";
            const specialCovers = {
                "僕たちのサヨナラ": "n46_cover_s32_bokutachi.jpg",
                "あの光": "n46_cover_s36_anohikari.jpg",
                "懐かしさの先": "n46_cover_s38_natsukashisa.jpg",
                "100日目": "n46_cover_s38_100nichime.jpg"
            };
            if (specialCovers[targetSong.titleJp.trim()]) {
                return `${baseV2Url}${specialCovers[targetSong.titleJp.trim()]}`;
            }
            if (releaseKey.startsWith('akb')) {
                const num = releaseKey.replace(/\D/g, '');
                return `${baseV2Url}akb48_cover_s${num}.jpg`;
            } else if (releaseKey.startsWith('s')) {
                const num = releaseKey.replace(/\D/g, '');
                const typeAvv = targetSong.songTypeAvv || "";
                let typeChar = '';
                switch (typeAvv.toLowerCase()) {
                    case 'all':
                    case 'a':
                        typeChar = 'a';
                        break;
                    case 'b':
                        typeChar = 'b';
                        break;
                    case 'c':
                        typeChar = 'c';
                        break;
                    case 'd':
                        typeChar = 'd';
                        break;
                    case 'regular':
                        typeChar = 'r';
                        break;
                    default:
                        typeChar = 'a';
                        break;
                }
                return `${baseV2Url}n46_cover_s${num}${typeChar}.jpg`;
            } else if (releaseKey.startsWith('a') || releaseKey.startsWith('u') || releaseKey.startsWith('b')) {
                return `${baseV2Url}n46_cover_${releaseKey}.jpg`;
            } else if (releaseKey === 'dig') {
                switch (targetSong.titleJp.trim()) {
                    case "世界中の隣人よ":
                        return `${baseV2Url}n46_cover_dig1.jpg`;
                    case "Route 246":
                        return `${baseV2Url}n46_cover_dig2.jpg`;
                    case "大嫌いなはずだった。":
                        return `${baseV2Url}n46_cover_dig_honeyworks.jpg`;
                    case "1・2・3":
                        return `${baseV2Url}n46_cover_dig_karaage.jpg`;
                    default:
                        return "https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_x.jpg";
                }
            }
            return "https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_x.jpg";
        };
        let outlineText = targetSong.songOutline || "";
        if (outlineText === "Unit" && targetSong.UnitName && targetSong.UnitName.trim() !== "") {
            outlineText += ` (${targetSong.UnitName.trim()})`;
        }
        const centers = targetSong.center ? (Array.isArray(targetSong.center) ? targetSong.center : [targetSong.center]) : [];
        const centerNames = centers.length > 0 && centers[0] !== "" ? centers.map(getRomajiName).join(', ') : null;
        let downloadButtonsHtml = '';
        if (targetSong.LinkDownMV1 || targetSong.LinkDownMV2 || targetSong.OffVocallink) {
            downloadButtonsHtml += '<div class="download-links-container">';
            if (targetSong.LinkDownMV1) {
                let buttonText1 = "MV Sub Indonesia";
                if (targetSong.LinkMV1Desc) buttonText1 += ` - ${targetSong.LinkMV1Desc}`;
                downloadButtonsHtml += `<a href="${targetSong.LinkDownMV1}" class="download-link" target="_blank"><img src="../sprite/element/mv.svg" alt="MV Icon">${buttonText1}</a>`;
            }
            if (targetSong.LinkDownMV2) {
                let buttonText2 = "MV Sub Indonesia";
                if (targetSong.LinkMV2Desc) buttonText2 += ` - ${targetSong.LinkMV2Desc}`;
                downloadButtonsHtml += `<a href="${targetSong.LinkDownMV2}" class="download-link" target="_blank"><img src="../sprite/element/mv.svg" alt="MV Icon">${buttonText2}</a>`;
            }
            if (targetSong.OffVocallink) {
                let offVocalText = "Off-vocal";
                let details = [];
                if (targetSong.OffVocaltag) details.push(targetSong.OffVocaltag);
                if (targetSong.OffVocalformat) details.push(targetSong.OffVocalformat);
                if (details.length > 0) offVocalText += ` (${details.join(' ')})`;
                if (targetSong.OffVocalsize) offVocalText += ` - ${targetSong.OffVocalsize}`;
                downloadButtonsHtml += `<a href="${targetSong.OffVocallink}" class="download-link" target="_blank"><img src="../sprite/element/music.svg" alt="Music Icon">${offVocalText}</a>`;
            }
            downloadButtonsHtml += '</div>';
        }
        let extraDetailsHtml = '<table class="song-info-extra-details">';
        const releaseDate = formatReleaseDate(targetSong.songRelease);
        if (releaseDate) extraDetailsHtml += `<tr><td>Tanggal Rilis</td><td>${releaseDate}</td></tr>`;
        const songTypeSide = targetSong.songTypeAvv;
        if (songTypeSide && songTypeSide.trim() !== '' && songTypeSide.trim() !== '-') {
            let typeDisplayText;
            switch (songTypeSide.toLowerCase().trim()) {
                case 'all':
                    typeDisplayText = 'All Types';
                    break;
                case 'regular':
                    typeDisplayText = 'Regular Edition';
                    break;
                case 'digital':
                    typeDisplayText = 'Digital';
                    break;
                case '7net ver':
                    typeDisplayText = '7-net Version';
                    break;
                default:
                    typeDisplayText = `Type ${songTypeSide.toUpperCase()}`;
                    break;
            }
            extraDetailsHtml += `<tr><td>Type</td><td>${typeDisplayText}</td></tr>`;
        }
        if (outlineText) extraDetailsHtml += `<tr><td>Kategori</td><td>${outlineText}</td></tr>`;
        if (centerNames) extraDetailsHtml += `<tr><td>Center</td><td>${centerNames}</td></tr>`;
        if (targetSong.SongLyricsJP) extraDetailsHtml += `<tr><td>Lirik</td><td>${targetSong.SongLyricsJP}</td></tr>`;
        const composer = Array.isArray(targetSong.SongCompJP) ? targetSong.SongCompJP.join(', ') : targetSong.SongCompJP;
        const arranger = Array.isArray(targetSong.SongArraJP) ? targetSong.SongArraJP.join(', ') : targetSong.SongArraJP;
        if (composer && arranger && JSON.stringify(targetSong.SongCompJP) === JSON.stringify(targetSong.SongArraJP)) {
            extraDetailsHtml += `<tr><td>Komposer & Aransemen</td><td>${composer}</td></tr>`;
        } else {
            if (composer) extraDetailsHtml += `<tr><td>Komposer</td><td>${composer}</td></tr>`;
            if (arranger) extraDetailsHtml += `<tr><td>Aransemen</td><td>${arranger}</td></tr>`;
        }
        const director = Array.isArray(targetSong.SongMVDirJP) ? targetSong.SongMVDirJP.join(' & ') : targetSong.SongMVDirJP;
        if (director) extraDetailsHtml += `<tr><td>Sutradara MV</td><td>${director}</td></tr>`;
        const choreo = Array.isArray(targetSong.SongChoreo) ? targetSong.SongChoreo.join(' & ') : targetSong.SongChoreo;
        if (choreo) extraDetailsHtml += `<tr><td>Koreografer</td><td>${choreo}</td></tr>`;
        if (targetSong.SongLiveChoreo) extraDetailsHtml += `<tr><td>Koreografer (Konser)</td><td>${targetSong.SongLiveChoreo}</td></tr>`;
        extraDetailsHtml += '</table>';
        const songInfoCard = `<div class="song-info-card"><img src="${getSingleImageUrl()}" alt="Cover ${targetSong.titleRo}" onerror="this.onerror=null; this.src='https://via.placeholder.com/200';"><div class="song-info-details"><h1>${targetSong.titleJp}</h1><div class="romaji-title">${targetSong.titleRo}</div>${extraDetailsHtml}${downloadButtonsHtml}</div></div>`;
        const getProfileImagePrefix = () => {
            if (!releaseKey) return "";
            if (releaseKey.startsWith('s')) {
                const num = releaseKey.replace(/\D/g, '');
                return `s${String(num).padStart(3, '0')}`;
            }
            const prefixMap = {
                'dig': {
                    "Route 246": "s025",
                    "世界中の隣人よ": "s025",
                    "大嫌いなはずだった。": "s016",
                    "1・2・3": "s026"
                },
                'a1': 's010',
                'a2': 's014',
                'a3': 's017',
                'a4': 's022',
                'u1': 's019',
                'b1': 's028',
                'akb38': 's010',
                'akb47': 's016',
                'akb51': 's019',
                'akb55': 's022'
            };
            if (prefixMap[releaseKey]) {
                if (typeof prefixMap[releaseKey] === 'object') {
                    return prefixMap[releaseKey][targetSong.titleJp.trim()] || "";
                }
                return prefixMap[releaseKey];
            }
            return "";
        };
        const externalMemberImages = {
            "akb38": {
                "小嶋陽菜 (AKB48)": "kojima_haruna_2014"
            },
            "akb47": {
                "宮脇咲良": "miyawaki_sakura_2017_hkt",
                "向井地美音": "mukaichi_mion_2017",
                "小嶋真子": "kojima_mako_2017",
                "岡田奈々": "okada_nana_2017_stu",
                "小栗有以": "oguri_yui_2017_team8",
                "松井珠理奈": "matsui_jurina_2017_ske",
                "今泉佑唯": "imaizumi_yui_2017a",
                "菅井友香": "sugai_yuuka_2017a",
                "平手友梨奈": "hirate_yurina_2017a",
                "渡辺梨加": "watanabe_rika_2017a",
                "渡邉理佐": "watanabe_risa_2017a",
                "長濱ねる": "nagahama_neru_2017a"
            },
            "akb51": {
                "宮脇咲良": "miyawaki_sakura_2018_hkt",
                "向井地美音": "mukaichi_mion_2018",
                "岡田奈々": "okada_nana_2018_stu",
                "岡部麟": "okabe_rin_2018_team8",
                "小栗有以": "oguri_yui_2018_team8",
                "松井珠理奈": "matsui_jurina_2018_ske",
                "今泉佑唯": "imaizumi_yui_2018",
                "小林由依": "kobayashi_yui_2018",
                "菅井友香": "sugai_yuuka_2018",
                "長濱ねる": "nagahama_neru_2018",
                "渡邉理佐": "watanabe_risa_2018",
                "加藤史帆": "kato_shiho_2018"
            },
            "akb55": {
                "岡部麟": "okabe_rin_2019_team8",
                "小栗有以": "oguri_yui_2019_team8",
                "小林由依": "kobayashi_yui_2019",
                "菅井友香": "sugai_yuuka_2019",
                "矢作萌夏": "yahagi_moeka_2019",
                "福岡聖菜": "fukuoka_seina_2019",
                "山内瑞葵": "yamauchi_mizuki_2019",
                "下尾みう": "shitao_miu_2019",
                "坂口渚沙": "sakaguchi_nagisa_2019",
                "梅山恋和": "umeyama_kokona_2019",
                "田中美久": "tanaka_miku_2019",
                "瀧野由美子": "takino_yumiko_2019_stu",
                "小池美波": "koike_minami_2019",
                "鈴本美愉": "suzumoto_miyu_2019",
                "土生瑞穂": "habu_mizuho_2019",
                "小坂菜緒": "kosaka_nao_h46_s01",
                "齊藤京子": "saito_kyoko_h46_s01",
                "佐々木美玲": "sasaki_mirei_h46_s01",
                "渡邉美穂": "watanabe_miho_h46_s01"
            }
        };
        const getMemberInitialImageData = (jpName) => {
            if (!jpName) return {
                url: "https://via.placeholder.com/80",
                onError: ""
            };
            if (releaseKey.startsWith('akb') && externalMemberImages[releaseKey] && externalMemberImages[releaseKey][jpName.trim()]) {
                const imageName = externalMemberImages[releaseKey][jpName.trim()];
                return {
                    url: `https: 
                    onError: `onerror="this.onerror=null; this.src='https://via.placeholder.com/80';"`
                };
            }
            const member = memberNameMap[jpName.trim()];
            if (!member || !member.id) {
                console.warn(`Data untuk member "${jpName}" tidak ditemukan atau tidak memiliki ID.`);
                return {
                    url: "https://via.placeholder.com/80",
                    onError: ""
                };
            }
            const prefix = getProfileImagePrefix();
            const filename = member.id.replace(/-/g, "_") + '.png';
            if (prefix) {
                return {
                    url: `https: 
                    onError: `onerror="handleImageError(this, '${filename}')"`
                };
            }
            return {
                url: "https://via.placeholder.com/80",
                onError: ""
            };
        };
        let formationHtml = '';
        const memberRows = [];
        for (let i = 5; i >= 0; i--) {
            if (targetSong[`members${i}`]) {
                memberRows.push({
                    key: `members${i}`,
                    members: targetSong[`members${i}`]
                });
            }
        }
        if (memberRows.length > 0) {
            formationHtml = memberRows.map(row => {
                const members = Array.isArray(row.members) ? row.members : [row.members];
                const memberPhotos = members.map(jpName => {
                    const imageData = getMemberInitialImageData(jpName);
                    let displayName = jpName.trim() === '吉田綾乃クリスティー' ? '吉田綾乃' : jpName.trim();
                    const isCenter = centers.includes(jpName.trim());
                    const containerClass = isCenter ? 'member-photo-container center-highlight' : 'member-photo-container';
                    const memberContent = `<div class="${containerClass}"><img src="${imageData.url}" alt="${displayName}" class="member-photo" ${imageData.onError}><div class="member-name">${displayName}</div></div>`;
                    const memberData = memberNameMap[jpName.trim()];
                    if (externalMemberNameMap[jpName.trim()]) return memberContent;
                    const memberLink = memberData && memberData.id ? `member.html?id=${memberData.id}` : '#';
                    return `<a href="${memberLink}" style="text-decoration: none;">${memberContent}</a>`;
                }).join('');
                return `<div class="formation-row">${memberPhotos}</div>`;
            }).join('');
        }
        const hasOnlyMembers0 = memberRows.length === 1 && memberRows[0].key === 'members0';
        const headingText = hasOnlyMembers0 ? 'MEMBER YANG BERPARTISIPASI' : 'FORMASI';
        const formationCard = `<div class="formation-card"><h2>${headingText}</h2>${formationHtml}${hasOnlyMembers0 ? '<div class="formation-note">Tidak berurut karena tidak ada data/berubah-ubah</div>' : ''}</div>`;
        const spotifyUrl = spotifyData[targetSong.titleJp.trim()];
        let spotifyCard = '';
        if (spotifyUrl) {
            const trackIdMatch = spotifyUrl.match(/track[/:]([a-zA-Z0-9]+)/);
            if (trackIdMatch && trackIdMatch[1]) {
                const trackId = trackIdMatch[1];
                const spotifyEmbedUrl = `https: 
                spotifyCard = `<div class="spotify-card"><iframe src="${spotifyEmbedUrl}" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>`;
            }
        }
        let lyricsBoxHtml = '';
        if (songLyrics && songLyrics.lyrics) {
            const formattedLyrics = songLyrics.lyrics.replace(/<br\s*\/?>/gi, '\n');
            lyricsBoxHtml = `<div class="lyrics-box"><h2>Lirik</h2><div class="lyrics-content">${formattedLyrics}</div></div>`;
        }
        let mediaLyricsContainer = '';
        if (spotifyCard || lyricsBoxHtml) {
            mediaLyricsContainer = `<div class="media-lyrics-container">${spotifyCard}${lyricsBoxHtml}</div>`;
        }
        detailWrapper.innerHTML = songInfoCard + formationCard + mediaLyricsContainer;
    }).catch(error => {
        console.error("Gagal memuat data:", error);
        detailWrapper.innerHTML = `<h1>Terjadi kesalahan saat memuat data lagu.</h1><p>${error.toString()}</p>`;
    });
    function displaySongList() {
        detailWrapper.innerHTML = `<div class="songlist-header"><h1>Nogizaka46 Song List</h1><p>Jelajahi diskografi lengkap Nogizaka46. Halaman ini berisi daftar semua lagu dari setiap single, album, dan rilisan digital. Klik pada judul lagu untuk melihat detail lengkap, termasuk formasi member, lirik, dan informasi lainnya.</p></div><div id="song-list-content"><p>Memuat daftar lagu...</p></div>`;
        fetch('../store/single/songall.json')
            .then(res => res.json())
            .then(data => {
                const listContent = document.getElementById('song-list-content');
                const releaseOrder = Object.keys(data).sort((a, b) => {
                    const isADig = a === 'dig';
                    const isBDig = b === 'dig';
                    if (isADig && !isBDig) {
                        return 1;  
                    }
                    if (!isADig && isBDig) {
                        return -1;  
                    }
                    const dateA = data[a][0]?.songRelease?.replace(/\./g, '') || '0';
                    const dateB = data[b][0]?.songRelease?.replace(/\./g, '') || '0';
                    return parseInt(dateA) - parseInt(dateB);
                });
                const albumTitles = {
                    'a1': 'Toumei na Iro',
                    'a2': 'Sorezore no Isu',
                    'a3': 'Umareta kara Hajimete Mita Yume',
                    'a4': 'Ima ga Omoide ni naru Made',
                    'u1': 'Boku dake no Kimi ~Under Super Best~',
                    'b1': 'Time Flies',
                    'akb38': 'Kibouteki Refrain',
                    'akb47': 'Shoot Sign',
                    'akb51': 'Jabaja',
                    'akb55': 'Jiwaru DAYS'
                };
                let allGroupsHtml = '';
                releaseOrder.forEach(key => {
                    const songs = data[key];
                    if (!songs || songs.length === 0) return;
                    const firstSong = songs[0];
                    let coverUrl;
                    const keyNum = key.replace(/\D/g, '');
                    if (key.startsWith('akb')) {
                        coverUrl = `https: 
                    } else if (key.startsWith('s')) {
                        coverUrl = `https: 
                    } else if (key.startsWith('a') || key.startsWith('u') || key.startsWith('b')) {
                        coverUrl = `https: 
                    } else {
                        coverUrl = 'https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_x.jpg';
                    }
                    let mainSongHtml = '';
                    if (albumTitles[key]) {
                        mainSongHtml = `<div class="songlist-main-song" style="color: var(--moe-tint1); font-weight: bold; font-size: 1.3em;">${albumTitles[key]}</div>`;
                    } else if (key !== 'dig' && firstSong) {
                        mainSongHtml = `<div class="songlist-main-song"><a href="?name=${encodeURIComponent(firstSong.titleJp)}">${firstSong.titleRo}</a></div>`;
                    } else if (key === 'dig') {  
                        mainSongHtml = `<div class="songlist-main-song" style="color: var(--moe-tint1); font-weight: bold; font-size: 1.3em;">Digital Releases</div>`;
                    }
                    const tracksHtml = songs.map(song => `<a href="?name=${encodeURIComponent(song.titleJp)}">${song.titleRo}</a>`).join('');
                    const songNumberDisplay = key === 'dig' ? 'DIG' : firstSong.songNumber;  
                    allGroupsHtml += `<div class="songlist-group"><img src="${coverUrl}" alt="Cover for ${firstSong.songNumber}" class="songlist-cover" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';"><div class="songlist-info"><div class="songlist-title-bar"><div class="songlist-number">${songNumberDisplay}</div>${mainSongHtml}</div><div class="songlist-tracks">${tracksHtml}</div></div></div>`;
                });
                listContent.innerHTML = allGroupsHtml;
            }).catch(error => {
                console.error("Gagal memuat daftar lagu:", error);
                document.getElementById('song-list-content').innerHTML = `<p>Gagal memuat daftar lagu. Silakan coba lagi nanti.</p>`;
            });
    }
});