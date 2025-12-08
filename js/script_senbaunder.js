document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('center-list-container');
    const captionElement = document.getElementById('dynamic-caption');
    let processedData = null;
    let currentView = '';
    const getOrdinalSuffix = (n) => {
        if (n % 100 >= 11 && n % 100 <= 13) return 'th';
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };
    const formatRomajiName = (name) => {
        if (!name) return '';
        return name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    const containsJapanese = (text) => /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(text);
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    const createTitleHtml = (titleRo, titleJp) => {
        if (!titleRo) return '—';
        const titleToEncode = titleJp || titleRo;
        const songLink = `../moedata/song.html?name=${encodeURIComponent(titleToEncode)}`;
        const jpTitleHtml = containsJapanese(titleJp) ? `<span class="song-title-japanese">${titleJp}</span>` : '';
        return `<a href="${songLink}" target="_blank" rel="noopener noreferrer"><span class="song-title-romaji">${titleRo}</span>${jpTitleHtml}</a>`;
    };
    const createCenterHtml = (centers, counts, num, memberIdMap) => {
        if (!centers || centers.length === 0) return '';
        const memberLinks = centers.map((name, index) => {
            const idWithHyphen = memberIdMap[name] || 'default';
            const idWithUnderscore = idWithHyphen.replaceAll('-', '_');
            const memberLink = `../moedata/member.html?id=${idWithHyphen}`;
            const displayCount = counts[index] === 1 ? '初' : counts[index];
            return `<a href="${memberLink}" target="_blank" rel="noopener noreferrer"><div class="pictm"><img src="https://ik.imagekit.io/moearchive/web/memberprofile/s${String(num).padStart(3, '0')}/${idWithUnderscore}.png" alt="${name}"><div class="berapa">${displayCount}</div></div></a>`;
        }).join('');
        return `<div class="pictm-container">${memberLinks}</div>`;
    };
    const renderDesktop = (data) => {
        container.className = 'desktop-view';
        const { singlesByYear, memberIdMap } = data;
        let tableHTML = `<table><thead><tr>
            <th>#</th><th>Senbatsu Song</th><th>Senbatsu Center</th>
            <th>Cover</th><th>Under Center</th><th>Under Song</th>
        </tr></thead><tbody>`;
        const sortedYears = Object.keys(singlesByYear).sort((a, b) => b - a);
        sortedYears.forEach(year => {
            tableHTML += `<tr class="cyear-row"><td colspan="6">${year}</td></tr>`;
            singlesByYear[year].forEach(s => {
                const senbatsuCenterHTML = createCenterHtml(s.senbatsuCenter, s.senbatsuCenterCounts, s.num, memberIdMap);
                const underCenterHTML = createCenterHtml(s.underCenter, s.underCenterCounts, s.num, memberIdMap);
                const coverURL = `https: 
                tableHTML += `<tr class="single-row">
                    <td class="sinnux-cell">${s.num}${getOrdinalSuffix(s.num)}</td>
                    <td class="sgc">${createTitleHtml(s.titleRo, s.titleJp)}</td>
                    <td class="sgc center-cell">${senbatsuCenterHTML}</td>
                    <td class="cover-cell"><img src="${coverURL}" alt="Cover ${s.num}"></td>
                    <td class="udc center-cell">${underCenterHTML}</td>
                    <td class="udc">${createTitleHtml(s.underSongRo, s.underSongJp)}</td>
                </tr>`;
            });
        });
        tableHTML += `</tbody></table>`;
        container.innerHTML = tableHTML;
    };
    const renderMobile = (data) => {
        container.className = 'mobile-view';
        const { singlesByYear, memberIdMap } = data;
        let cardHTML = '';
        const sortedYears = Object.keys(singlesByYear).sort((a, b) => b - a);
        sortedYears.forEach(year => {
            cardHTML += `<div class="cyear-header">${year}</div>`;
            singlesByYear[year].forEach(s => {
                const senbatsuSection = `<div class="detail-section senbatsu-section">
                    <div class="song-title-group">${createTitleHtml(s.titleRo, s.titleJp)}</div>
                    <div class="center-photos-group">${createCenterHtml(s.senbatsuCenter, s.senbatsuCenterCounts, s.num, memberIdMap)}</div>
                </div>`;
                const underSection = (s.underSongRo || (s.underCenter && s.underCenter.length > 0)) ? `
                    <div class="card-divider"></div>
                    <div class="detail-section under-section">
                        <div class="song-title-group">${createTitleHtml(s.underSongRo, s.underSongJp)}</div>
                        <div class="center-photos-group">${createCenterHtml(s.underCenter, s.underCenterCounts, s.num, memberIdMap)}</div>
                    </div>` : '<div class="detail-section under-section"></div>';
                const coverURL = `https: 
                cardHTML += `<div class="single-card">
                    <div class="card-cover">
                        <img src="${coverURL}" alt="Cover ${s.num}">
                        <div class="ordinal-number">${s.num}${getOrdinalSuffix(s.num)}</div>
                    </div>
                    <div class="card-details">
                        ${senbatsuSection}
                        ${underSection}
                    </div>
                </div>`;
            });
        });
        container.innerHTML = cardHTML;
    };
    const checkAndRender = () => {
        if (!processedData) return;
        const view = window.innerWidth > 800 ? 'desktop' : 'mobile';
        if (view !== currentView) {
            currentView = view;
            if (view === 'desktop') {
                renderDesktop(processedData);
            } else {
                renderMobile(processedData);
            }
        }
    };
    const initialize = async () => {
        try {
            const [songResponse, memberResponse] = await Promise.all([
                fetch('../store/single/songall.json'),
                fetch('../store/member/members.json')
            ]);
            if (!songResponse.ok || !memberResponse.ok) throw new Error('Network response was not ok.');
            const songData = await songResponse.json();
            const memberData = await memberResponse.json();
            const memberIdMap = memberData.reduce((map, member) => { map[member.nama_jp] = member.id; return map; }, {});
            const kanjiToRomajiMap = memberData.reduce((map, member) => { map[member.nama_jp] = member.nama_romaji; return map; }, {});
            const senbatsuCenterCount = {};
            const underCenterCount = {};
            let allSingles = [];
            for (const key in songData) {
                if (!key.startsWith('s')) continue;
                const singleNum = parseInt(key.slice(1));
                const songs = songData[key];
                const mainSong = songs[0];
                if (!mainSong) continue;
                const underSong = songs.find(s => s.songOutline === 'Under');
                let senbatsuCenter = Array.isArray(mainSong.center) ? mainSong.center : (mainSong.center ? [mainSong.center] : []);
                let underCenter = underSong ? (Array.isArray(underSong.center) ? underSong.center : [underSong.center]) : [];
                allSingles.push({ num: singleNum, year: new Date(mainSong.songRelease).getFullYear(), titleJp: mainSong.titleJp, titleRo: mainSong.titleRo, senbatsuCenter, cover: key.slice(1).padStart(2, '0'), underSongJp: underSong?.titleJp, underSongRo: underSong?.titleRo, underCenter, senbatsuCenterCounts: [], underCenterCounts: [] });
            }
            allSingles.sort((a, b) => b.num - a.num);
            [...allSingles].reverse().forEach(single => {
                single.senbatsuCenter.forEach(name => {
                    senbatsuCenterCount[name] = (senbatsuCenterCount[name] || 0) + 1;
                    single.senbatsuCenterCounts.push(senbatsuCenterCount[name]);
                });
                single.underCenter.forEach(name => {
                    underCenterCount[name] = (underCenterCount[name] || 0) + 1;
                    single.underCenterCounts.push(underCenterCount[name]);
                });
            });
            const singlesByYear = allSingles.reduce((acc, single) => {
                (acc[single.year] = acc[single.year] || []).push(single);
                return acc;
            }, {});
            const totalCenterCount = { ...senbatsuCenterCount };
            for (const name in underCenterCount) { totalCenterCount[name] = (totalCenterCount[name] || 0) + underCenterCount[name]; }
            processedData = { singlesByYear, memberIdMap, kanjiToRomajiMap, totalCenterCount, latestSingleNum: allSingles[0]?.num || 0 };
            const sortedCounts = Object.entries(processedData.totalCenterCount).sort(([, a], [, b]) => b - a);
            if (captionElement && sortedCounts.length >= 3) {
                const [top1, top2, top3] = sortedCounts;
                const top1Name = formatRomajiName(kanjiToRomajiMap[top1[0]] || top1[0]);
                const top2Name = formatRomajiName(kanjiToRomajiMap[top2[0]] || top2[0]);
                const top3Name = formatRomajiName(kanjiToRomajiMap[top3[0]] || top3[0]);
                captionElement.innerHTML = `Berikut adalah daftar center baik untuk Senbatsu maupun Under, dengan data terakhir adalah single yang ke-<b>${processedData.latestSingleNum}</b>.
                <br><br>
                FYI, berdasarkan data di bawah, member dengan pengalaman center terbanyak di kedua sisi (Senbatsu dan Under) adalah <b>${top1Name}</b> yang mendapatkan <b>${top1[1]}</b> kali kesempatan.
                Di urutan kedua adalah <b>${top2Name}</b> dengan <b>${top2[1]}</b> kali center, dan ketiga adalah <b>${top3Name}</b> dengan <b>${top3[1]}</b> kali.`;
            }
            checkAndRender();
            window.addEventListener('resize', debounce(checkAndRender, 200));
        } catch (error) {
            console.error('Error in initialization:', error);
            if (captionElement) captionElement.textContent = 'Gagal memproses data.';
        }
    };
    initialize();  
});