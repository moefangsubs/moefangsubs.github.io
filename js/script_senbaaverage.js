document.addEventListener('DOMContentLoaded', async () => {
    window.nogiData = {};
    const dataFiles = [
        '../store/member/members.json',
        '../store/single/songall.json',
        '../store/member/members_single_hiatus.json',
        '../store/member/members_single_hiatus_sick.json',
        '../store/member/members_single_hiatus_not_participate.json',
        '../store/member/members_single_grad.json'
    ];
    try {
        const responses = await Promise.all(dataFiles.map(file => fetch(file)));
        const [
            members, 
            songsData, 
            hiatus, 
            hiatusSick, 
            hiatusNotParticipate,
            gradData
        ] = await Promise.all(responses.map(res => res.json()));
        window.nogiData = {
            members,
            songsData,
            hiatusData: { hiatus, hiatusSick, hiatusNotParticipate },
            gradMap: createGraduationMap(gradData)
        };
        document.querySelectorAll('input[name="memberStatus"]').forEach(radio => {
            radio.addEventListener('change', renderGrid);
        });
        handleRouting();
    } catch (error) {
        console.error('Error loading or processing data:', error);
        document.getElementById('main').innerHTML = '<p>Error loading or processing data. Please check the console.</p>';
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
function renderGrid() {
    document.getElementById('grid-view').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
    const { members, songsData, hiatusData, gradMap } = window.nogiData;
    const filter = document.querySelector('input[name="memberStatus"]:checked').value;
    const membersToDisplay = (filter === 'active') ? members.filter(m => m.status === 'aktif') : members;
    const mainSingles = getMainSingles(songsData);
    updatePageDescription(mainSingles);  
    const memberStats = membersToDisplay.map(member => {
        const applicableSingles = getApplicableSingles(member, mainSingles, gradMap);
        const senbatsuCount = countSenbatsuAppearances(member, applicableSingles);
        const hiatusCount = countHiatus(member, applicableSingles, hiatusData);
        const finalTotalSingles = applicableSingles.length - hiatusCount;
        const percentage = finalTotalSingles > 0 ? (senbatsuCount / finalTotalSingles) : 0;
        return { ...member, senbatsuCount, totalSingles: finalTotalSingles, percentage };
    });
    memberStats.sort((a, b) => b.percentage - a.percentage || b.senbatsuCount - a.senbatsuCount);
    displayRankings(memberStats);
}
function showDetailView(memberId) {
    document.getElementById('grid-view').classList.add('hidden');
    const detailView = document.getElementById('detail-view');
    detailView.classList.remove('hidden');
    detailView.innerHTML = ''; 
    const { members, songsData, gradMap } = window.nogiData;
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
        <div id="single-list-container" class="single-participation-list"></div>
    `;
    detailView.innerHTML = headerHTML;
    document.getElementById('detail-close-btn').addEventListener('click', () => {
        history.pushState(null, '', window.location.pathname);
        renderGrid();
    });
    const mainSingles = getMainSingles(songsData);
    const applicableSingles = getApplicableSingles(member, mainSingles, gradMap);
    const senbatsuStatus = getSenbatsuParticipation(member, applicableSingles);
    const listContainer = document.getElementById('single-list-container');
    applicableSingles.forEach(single => {
        const isSenbatsu = senbatsuStatus[single.titleRo];
        let singleKey = Object.keys(songsData).find(key => songsData[key].some(s => s.titleRo === single.titleRo && s.songNumber === single.songNumber));
        let coverUrl = 'https://via.placeholder.com/60';
        if (single.titleJp === 'Route 246') {
            coverUrl = 'https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_dig2.jpg';
        } else if (singleKey) {
            singleKey = singleKey.replace('s', '');
            coverUrl = `https: 
        }
        const singleItemHTML = `
            <div class="single-item">
                <img src="${coverUrl}" alt="${single.titleRo} cover">
                <span class="single-item-title">${single.songNumber} "${single.titleRo}"</span>
                <span class="single-item-status ${isSenbatsu ? 'status-yes' : 'status-no'}">
                    ${isSenbatsu ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-times"></i>'}
                </span>
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
        <div class="percentage" data-target="${percentageFormatted}">${0.0}%</div>
        <div class="single-count">${member.senbatsuCount} dari ${member.totalSingles} single</div>
    `;
    return card;
}
function getMainSingles(songsData) { let singles = []; for (const key in songsData) { if (key.startsWith('s')) { if (songsData[key] && songsData[key].length > 0) singles.push(songsData[key][0]); } } const route246 = songsData.dig.find(s => s.titleJp === 'Route 246'); if (route246) singles.push(route246); singles.sort((a, b) => new Date(a.songRelease) - new Date(b.songRelease)); return singles; }
function countSenbatsuAppearances(member, singles) { let count = 0; const memberNameJP = member.nama_jp; singles.forEach(single => { const allSenbatsuMembers = [...(single.members1 || []), ...(single.members2 || []), ...(single.members3 || [])]; if (allSenbatsuMembers.includes(memberNameJP)) count++; }); return count; }
function countHiatus(member, applicableSingles, hiatusData) { let hiatusCount = 0; const memberName = member.nama_jp; applicableSingles.forEach(single => { const singleNumStr = single.songNumber.match(/\d+/); if (!singleNumStr) return; const singleNum = singleNumStr[0]; for (const key in hiatusData) { const hiatusList = hiatusData[key][singleNum]; if (hiatusList) { if (Array.isArray(hiatusList) ? hiatusList.includes(memberName) : hiatusList === memberName) { hiatusCount++; break; } } } }); return hiatusCount; }
function getSenbatsuParticipation(member, singles) { const participation = {}; const memberNameJP = member.nama_jp; singles.forEach(single => { const allSenbatsuMembers = [...(single.members1 || []), ...(single.members2 || []), ...(single.members3 || [])]; participation[single.titleRo] = allSenbatsuMembers.includes(memberNameJP); }); return participation; }
function animatePercentages() { document.querySelectorAll('.percentage').forEach(counter => { const target = +counter.getAttribute('data-target'); let current = 0; const increment = target / 100; const timer = setInterval(() => { current += increment; if (current >= target) { clearInterval(timer); counter.innerText = `${target.toFixed(1)}%`; } else { counter.innerText = `${current.toFixed(1)}%`; } }, 20); }); }