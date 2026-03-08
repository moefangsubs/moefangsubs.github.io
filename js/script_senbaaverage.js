document.addEventListener('DOMContentLoaded', async () => {
    window.nogiData = {};
    const dataFiles = [
        '../store/member/members.json',
        '../store/single/songall.json',
        '../store/member/members_single_hiatus.json',
        '../store/member/members_single_hiatus_sick.json',
        '../store/member/members_single_hiatus_not_participate.json',
        '../store/member/members_single_grad.json',
        '../store/single/senbatsu.json',
        '../store/single/under.json'
    ];
    try {
        const responses = await Promise.all(dataFiles.map(file => fetch(file)));
        const [
            members, 
            songsData, 
            hiatus, 
            hiatusSick, 
            hiatusNotParticipate,
            gradData,
            senbatsu,
            under
        ] = await Promise.all(responses.map(res => res.json()));
        window.nogiData = {
            members,
            songsData,
            hiatusData: { hiatus, hiatusSick, hiatusNotParticipate },
            gradMap: createGraduationMap(gradData),
            senbatsu,
            under
        };
        document.querySelectorAll('input[name="memberStatus"]').forEach(radio => {
            radio.addEventListener('change', renderGrid);
        });
        handleRouting();
    } catch (error) {
        console.error(error);
        document.getElementById('main').innerHTML = '<p>Error loading or processing data.</p>';
    }
});

window.onpopstate = handleRouting;

function handleRouting() {
    const memberId = new URLSearchParams(window.location.search).get('id');
    if (memberId) {
        showDetailView(memberId);
    } else {
        renderGrid();
    }
}

// FUNGSI LAMA
// function renderGrid() {
    // document.getElementById('grid-view').classList.remove('hidden');
    // document.getElementById('detail-view').classList.add('hidden');
    // const { members, songsData, hiatusData, gradMap } = window.nogiData;
    // const filter = document.querySelector('input[name="memberStatus"]:checked').value;
    // const membersToDisplay = (filter === 'active') ? members.filter(m => m.status === 'aktif') : members;
    // const mainSingles = getMainSingles(songsData);
    // updatePageDescription(mainSingles);
    // const memberStats = membersToDisplay.map(member => {
        // const applicableSingles = getApplicableSingles(member, mainSingles, gradMap);
        // const senbatsuCount = countSenbatsuAppearances(member, applicableSingles);
        // const hiatusCount = countHiatus(member, applicableSingles, hiatusData);
        // const finalTotalSingles = applicableSingles.length - hiatusCount;
        // const percentage = finalTotalSingles > 0 ? (senbatsuCount / finalTotalSingles) : 0;
        // return { ...member, senbatsuCount, totalSingles: finalTotalSingles, percentage };
    // });
    // memberStats.sort((a, b) => b.percentage - a.percentage || b.senbatsuCount - a.senbatsuCount);
    // displayRankings(memberStats);
// }

function renderGrid() {
    document.getElementById('grid-view').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
    
    // Kita ambil data senbatsu dan under dari window.nogiData
    const { members, songsData, gradMap, senbatsu, under } = window.nogiData;
    const filter = document.querySelector('input[name="memberStatus"]:checked').value;
    const membersToDisplay = (filter === 'active') ? members.filter(m => m.status === 'aktif') : members;
    
    const mainSingles = getMainSingles(songsData);
    updatePageDescription(mainSingles);
    
    const memberStats = membersToDisplay.map(member => {
        const applicableSingles = getApplicableSingles(member, mainSingles, gradMap);
        
        let finalTotalSingles = 0;
        let senbatsuCount = 0;

        applicableSingles.forEach(single => {
            // Ambil angka single
            const singleNumStr = single.songNumber.match(/\d+/);
            let singleNum = singleNumStr ? singleNumStr[0] : null;
            if (!singleNum && single.titleJp === 'Route 246') singleNum = '246';
            
            let senInfo = singleNum ? senbatsu[singleNum] : null;
            let unInfo = singleNum ? under[singleNum] : null;

            // Menggunakan fungsi getMemberPosition yang sudah kita buat sebelumnya
            const positionData = getMemberPosition(member, singleNum, senInfo, unInfo);
            
            // LOGIKA BARU: Jika member ADA di Senbatsu ATAU Under, maka single dihitung!
            if (positionData) {
                finalTotalSingles++; 
                
                // Jika posisinya di Senbatsu, tambah count senbatsu
                if (positionData.type === 'senbatsu') {
                    senbatsuCount++;
                }
            }
        });

        const percentage = finalTotalSingles > 0 ? (senbatsuCount / finalTotalSingles) : 0;
        return { ...member, senbatsuCount, totalSingles: finalTotalSingles, percentage };
    });
    
    memberStats.sort((a, b) => b.percentage - a.percentage || b.senbatsuCount - a.senbatsuCount);
    displayRankings(memberStats);
}

function getMemberPosition(member, singleNum, senbatsuInfo, underInfo) {
    if (!member || !singleNum) return null;
    let positionData = null;
    if (senbatsuInfo) {
        if (Array.isArray(senbatsuInfo.center) && senbatsuInfo.center.includes(member.nama_jp)) {
            positionData = { row: "WC", type: "senbatsu", rIndex: 1, overallRank: 1 };
        } else if (senbatsuInfo.center === member.nama_jp) {
            positionData = { row: "C", type: "senbatsu", rIndex: 1, overallRank: 1 };
        } else if (senbatsuInfo.members1st?.includes(member.nama_jp)) {
            positionData = { row: "1st", type: "senbatsu", rIndex: 1, overallRank: 2 };
        } else if (senbatsuInfo.members2nd?.includes(member.nama_jp)) {
            positionData = { row: "2nd", type: "senbatsu", rIndex: 2, overallRank: 3 };
        } else if (senbatsuInfo.members3rd?.includes(member.nama_jp)) {
            positionData = { row: "3rd", type: "senbatsu", rIndex: 3, overallRank: 4 };
        }
    }
    if (!positionData && underInfo) {
        if (Array.isArray(underInfo.center) && underInfo.center.includes(member.nama_jp)) {
            positionData = { row: "UWC", type: "under", rIndex: 1, overallRank: 10 };
        } else if (underInfo.center === member.nama_jp) {
            positionData = { row: "UC", type: "under", rIndex: 1, overallRank: 10 };
        } else if (Array.isArray(underInfo.UWC) && underInfo.UWC.includes(member.nama_jp)) {
            positionData = { row: "UWC", type: "under", rIndex: 1, overallRank: 10 };
        } else {
            for (let i = 1; i <= 6; i++) {
                const suffix = i === 1 ? "1st" : i === 2 ? "2nd" : i === 3 ? "3rd" : `${i}th`;
                if (underInfo[`under${suffix}`]?.includes(member.nama_jp)) {
                    positionData = { row: `U${i}`, type: "under", rIndex: i, overallRank: 11 + i };
                    break;
                }
            }
        }
    }
    return positionData;
}

function showDetailView(memberId) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.getElementById('grid-view').classList.add('hidden');
    const detailView = document.getElementById('detail-view');
    detailView.classList.remove('hidden');
    detailView.innerHTML = ''; 
    const { members, songsData, gradMap, senbatsu, under } = window.nogiData;
    const member = members.find(m => m.id === memberId);
    if (!member) {
        detailView.innerHTML = '<p>Member not found.</p>';
        return;
    }
    const nameRo = member.nama_romaji.toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    
    const headerHTML = `
        <div class="detail-header">
            <img src="${member.foto_profil}" alt="${member.nama_jp}">
            <div class="detail-header-info">
                <span class="detail-name-jp jpn">${member.nama_jp}</span>
                <span class="detail-name-ro">${nameRo}</span>
                <a href="member.html?id=${member.id}" class="detail-button">Detail ></a>
            </div>
            <span id="detail-close-btn" class="detail-close-btn">&times;</span>
        </div>
        <div id="single-chart-container" class="single-chart-container"></div>
        
        <div class="toggle-btn-container">
            <button id="toggle-list-btn" class="detail-button toggle-list-btn">Tampilkan Daftar Single</button>
        </div>
        <div id="single-list-container" class="single-participation-list" style="display: none;"></div>
    `;
    detailView.innerHTML = headerHTML;
    
    document.getElementById('detail-close-btn').addEventListener('click', () => {
        history.pushState(null, '', window.location.pathname);
        renderGrid();
    });

    const listContainer = document.getElementById('single-list-container');
    const toggleBtn = document.getElementById('toggle-list-btn');
    toggleBtn.addEventListener('click', () => {
        if (listContainer.style.display === 'none') {
            listContainer.style.display = 'flex';
            toggleBtn.textContent = 'Sembunyikan Daftar Single';
        } else {
            listContainer.style.display = 'none';
            toggleBtn.textContent = 'Tampilkan Daftar Single';
        }
    });

    const mainSingles = getMainSingles(songsData);
    const applicableSingles = getApplicableSingles(member, mainSingles, gradMap);
    const senbatsuStatus = getSenbatsuParticipation(member, applicableSingles);
    const chartContainer = document.getElementById('single-chart-container');
    let lastRank = null;
    
    applicableSingles.forEach((single, index) => {
        const isSenbatsu = senbatsuStatus[single.titleRo];
        const singleNumStr = single.songNumber.match(/\d+/);
        let singleNum = singleNumStr ? singleNumStr[0] : null;
        if (!singleNum && single.titleJp === 'Route 246') singleNum = '246';
        
        let senInfo = singleNum ? senbatsu[singleNum] : null;
        let unInfo = singleNum ? under[singleNum] : null;
        
        let sRows = 0;
        if (senInfo) {
            if (senInfo.members1st || senInfo.center) sRows = Math.max(sRows, 1);
            if (senInfo.members2nd) sRows = Math.max(sRows, 2);
            if (senInfo.members3rd) sRows = Math.max(sRows, 3);
        }
        if (sRows === 0) sRows = 3;
        
        let uRows = 0;
        if (unInfo) {
            if (unInfo.center || unInfo.UWC || unInfo.under1st) uRows = Math.max(uRows, 1);
            if (unInfo.under2nd) uRows = Math.max(uRows, 2);
            if (unInfo.under3rd) uRows = Math.max(uRows, 3);
            if (unInfo.under4th) uRows = Math.max(uRows, 4);
            if (unInfo.under5th) uRows = Math.max(uRows, 5);
            if (unInfo.under6th) uRows = Math.max(uRows, 6);
        }
        
        const positionData = getMemberPosition(member, singleNum, senInfo, unInfo);
        
        let prefix = '◎';
        if (index > 0) {
            if (!lastRank && positionData) {
                 prefix = '<span class="rank-up">▲</span>';
            } else if (lastRank && !positionData) {
                 prefix = '<span class="rank-down">▼</span>';
            } else if (lastRank && positionData) {
                if (positionData.overallRank < lastRank) {
                    prefix = '<span class="rank-up">▲</span>';
                } else if (positionData.overallRank > lastRank) {
                    prefix = '<span class="rank-down">▼</span>';
                }
            }
        }
        lastRank = positionData ? positionData.overallRank : null;

        let singleKey = Object.keys(songsData).find(key => songsData[key].some(s => s.titleRo === single.titleRo && s.songNumber === single.songNumber));
        let coverUrl = 'https://via.placeholder.com/60';
        if (single.titleJp === 'Route 246') {
            coverUrl = 'https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_dig2.jpg';
        } else if (singleKey) {
            singleKey = singleKey.replace('s', '');
            coverUrl = `https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_s${singleKey}a.jpg`;
        }

        // --- CHART GENERATION ---
        function drawBlock(bgColor, text, isTextBold = false) {
            // Jika bgColor adalah rgba (opacity), text color kita buat '#888' agar terlihat (untuk setrip '-')
            const textColor = (bgColor === '#FFD700') ? '#000' : (bgColor.includes('rgba') ? '#888' : '#FFF');
            const fontWeight = isTextBold ? 'bold' : 'normal';
            return `<div class="chart-block" style="height: 25px; background-color: ${bgColor}; color: ${textColor}; font-weight: ${fontWeight};">${text}</div>`;
        }

        let chartHtml = `<div class="chart-column" title="${single.songNumber} ${single.titleRo}">`;
        
        // Buat opacity cover pudar jika tidak berpartisipasi
        const thumbnailOpacity = positionData ? '1' : '0.4';
        chartHtml += `<img src="${coverUrl}" class="chart-thumbnail" style="opacity: ${thumbnailOpacity};" alt="cover">`;
        chartHtml += `<div class="chart-gap-small"></div>`;

        // Warna dan teks khusus jika tidak ada posisi (unaffiliated / hiatus / unit gen)
        const emptyBlockColor = positionData ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.05)';
        const emptyBlockText = positionData ? '' : '-';

        // Loop menggambar blok Senbatsu
        if (sRows > 0) {
            for (let r = 1; r <= sRows; r++) {
                if (positionData && positionData.type === 'senbatsu' && positionData.rIndex === r) {
                    let bg = (positionData.row === 'C' || positionData.row === 'WC') ? '#FFD700' : 'var(--moe)';
                    chartHtml += drawBlock(bg, positionData.row, true);
                } else {
                    chartHtml += drawBlock(emptyBlockColor, emptyBlockText);
                }
            }
        }
        
        // Loop menggambar blok Under
        if (uRows > 0) {
            chartHtml += `<div class="chart-gap-large"></div>`;
            for (let r = 1; r <= uRows; r++) {
                if (positionData && positionData.type === 'under' && positionData.rIndex === r) {
                    let bg = (positionData.row === 'UC' || positionData.row === 'UWC') ? '#FFD700' : 'var(--moe-shade-min2)';
                    chartHtml += drawBlock(bg, positionData.row, true);
                } else {
                    chartHtml += drawBlock(emptyBlockColor, emptyBlockText);
                }
            }
        }

        // Teks nomor single abu-abu pudar jika tidak berpartisipasi
        const singleNumColor = positionData ? 'var(--moe)' : '#aaa';
        chartHtml += `<div class="chart-single-num" style="color: ${singleNumColor};">${singleNumStr ? singleNumStr[0] : '-'}</div>`;
        chartHtml += `</div>`;
        chartContainer.innerHTML += chartHtml;
        
        // --- LIST GENERATION ---
        let statusIconHTML = '';
        let positionText = '';
        
        if (positionData) {
            statusIconHTML = isSenbatsu 
                ? '<span class="single-item-status status-yes"><i class="fa-solid fa-check"></i></span>'
                : '<span class="single-item-status status-no"><i class="fa-solid fa-times"></i></span>';
            positionText = `<span class="single-item-position">(${positionData.type === 'senbatsu' ? 'Senbatsu' : 'Under'} ${positionData.row})</span>`;
        } else {
            statusIconHTML = '<span class="single-item-status" style="color: #aaa; font-weight: bold;">-</span>';
            positionText = `<span class="single-item-position" style="color: #aaa;">(Tidak Berpartisipasi / Unit)</span>`;
        }

        const singleItemHTML = `
            <div class="single-item">
                <img src="${coverUrl}" style="opacity: ${thumbnailOpacity};" alt="${single.titleRo} cover">
                <span class="single-item-title" style="${!positionData ? 'color: #888;' : ''}">${prefix} ${single.songNumber} "${single.titleRo}"${positionText}</span>
                ${statusIconHTML}
            </div>
        `;
        listContainer.innerHTML += singleItemHTML;
    });
}

function updatePageDescription(mainSingles) {
    const descriptionElement = document.getElementById('page-description');
    if (mainSingles.length > 0) {
        const latestSingle = mainSingles[mainSingles.length - 1];
        const singleNumberMatch = latestSingle.songNumber ? latestSingle.songNumber.match(/\d+/) : null;
        const singleNumber = singleNumberMatch ? singleNumberMatch[0] : '';
        descriptionElement.textContent = `Data ini menghitung single yang dirilis, dan terdata hingga single ke-${singleNumber} "${latestSingle.titleRo}". Di sini single digital 'Route 246' juga dihitung.`;
    } else {
        descriptionElement.textContent = 'Tidak ada data single yang ditemukan.';
    }
}

function createGraduationMap(gradData) {
    const gradMap = new Map();
    for (const singleNum in gradData) {
        const members = gradData[singleNum];
        if (Array.isArray(members)) {
            members.forEach(name => gradMap.set(name, parseInt(singleNum)));
        } else {
            gradMap.set(members, parseInt(singleNum));
        }
    }
    return gradMap;
}

function getApplicableSingles(member, allSingles, gradMap) {
    const { gen, status, nama_jp, id } = member;
    let startNum = 0;
    if (gen === "1期") startNum = 1;
    else if (gen === "2期") startNum = 7;
    else if (gen === "3期") startNum = 18;
    else if (gen === "4期") startNum = ["kuromi-haruka", "sato-rika", "hayashi-runa", "matsuo-miyu", "yumiki-nao"].includes(id) ? 28 : 24;
    else if (gen === "5期") startNum = 29;
    else if (gen === "6期") startNum = 38;
    const endNum = status === 'lulus' ? gradMap.get(nama_jp) || Infinity : Infinity;
    return allSingles.filter(single => {
        const singleNumStr = single.songNumber.match(/\d+/);
        const singleNum = singleNumStr ? parseInt(singleNumStr[0], 10) : 0;
        if (single.titleJp === 'Route 246') {
            const releaseDate = new Date('2020-07-24');
            const gradDate = status === 'lulus' && member.dateGradeLast ? new Date(member.dateGradeLast.replace(/\./g, '-')) : new Date('2100-01-01');
            return (["1期", "2期", "3期", "4期"].includes(gen)) && (status === 'aktif' || releaseDate <= gradDate);
        }
        return singleNum >= startNum && singleNum <= endNum;
    });
}

function displayRankings(memberStats) {
    const gridContainer = document.getElementById('member-grid');
    gridContainer.innerHTML = '';
    let rankToAssign = 0;
    let lastPercentage = -1;
    memberStats.forEach((member, index) => {
        if (member.percentage !== lastPercentage) rankToAssign = index + 1;
        lastPercentage = member.percentage;
        const card = createMemberCard(member, rankToAssign);
        gridContainer.appendChild(card);
    });
    animatePercentages();
}

function createMemberCard(member, rank) {
    const card = document.createElement('a');
    card.href = `?id=${member.id}`;
    card.className = (rank >= 1 && rank <= 3) ? `rank-card rank-${rank}` : `rank-card`;
    card.addEventListener('click', e => {
        e.preventDefault();
        history.pushState({ id: member.id }, '', `?id=${member.id}`);
        showDetailView(member.id);
    });
    const nameRo = member.nama_romaji.toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    const percentageFormatted = (member.percentage * 100).toFixed(1);
    card.innerHTML = `
        <div class="rank-number">#${rank}</div>
        <img src="${member.foto_profil}" alt="${member.nama_jp}">
        <div class="member-name-jp jpn">${member.nama_jp}</div>
        <a class="member-name-ro">${nameRo}</a>
        <div class="percentage" data-target="${percentageFormatted}">0.0%</div>
        <div class="single-count">${member.senbatsuCount} dari ${member.totalSingles} single</div>
    `;
    return card;
}

function getMainSingles(songsData) { let singles = []; for (const key in songsData) { if (key.startsWith('s')) { if (songsData[key] && songsData[key].length > 0) singles.push(songsData[key][0]); } } const route246 = songsData.dig.find(s => s.titleJp === 'Route 246'); if (route246) singles.push(route246); singles.sort((a, b) => new Date(a.songRelease) - new Date(b.songRelease)); return singles; }
function countSenbatsuAppearances(member, singles) { let count = 0; const memberNameJP = member.nama_jp; singles.forEach(single => { const allSenbatsuMembers = [...(single.members1 || []), ...(single.members2 || []), ...(single.members3 || [])]; if (allSenbatsuMembers.includes(memberNameJP)) count++; }); return count; }
function countHiatus(member, applicableSingles, hiatusData) { let hiatusCount = 0; const memberName = member.nama_jp; applicableSingles.forEach(single => { const singleNumStr = single.songNumber.match(/\d+/); if (!singleNumStr) return; const singleNum = singleNumStr[0]; for (const key in hiatusData) { const hiatusList = hiatusData[key][singleNum]; if (hiatusList) { if (Array.isArray(hiatusList) ? hiatusList.includes(memberName) : hiatusList === memberName) { hiatusCount++; break; } } } }); return hiatusCount; }
function getSenbatsuParticipation(member, singles) { const participation = {}; const memberNameJP = member.nama_jp; singles.forEach(single => { const allSenbatsuMembers = [...(single.members1 || []), ...(single.members2 || []), ...(single.members3 || [])]; participation[single.titleRo] = allSenbatsuMembers.includes(memberNameJP); }); return participation; }
function animatePercentages() { document.querySelectorAll('.percentage').forEach(counter => { const target = +counter.getAttribute('data-target'); let current = 0; const increment = target / 100; const timer = setInterval(() => { current += increment; if (current >= target) { clearInterval(timer); counter.innerText = `${target.toFixed(1)}%`; } else { counter.innerText = `${current.toFixed(1)}%`; } }, 20); }); }