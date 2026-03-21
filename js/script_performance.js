const langToggle = document.getElementById('langToggle');
const perfList = document.getElementById('perfList');
const loadingElement = document.getElementById('loadingElement');
const yearDropdownHeader = document.getElementById('yearDropdownHeader');
const yearDropdownList = document.getElementById('yearDropdownList');
const yearCheckboxes = document.querySelectorAll('.year-cb');

const membersDbPath = '../store/member/members.json';
const songDbPath = '../store/single/songall.json';

let masterMemberMap = {};
let masterSongMap = {};
let currentPerfData = [];

async function init() {
    loadingElement.style.display = 'block';
    perfList.innerHTML = '';
    
    try {
        await Promise.all([
            buildMasterMemberMap(),
            buildMasterSongMap()
        ]);
        await loadPerformanceData();
    } catch (error) {
        console.error("Error init:", error);
    }
}

async function buildMasterMemberMap() {
    try {
        const res = await fetch(membersDbPath);
        const data = await res.json();
        data.forEach(member => {
            if (member.nama_jp) {
                masterMemberMap[member.nama_jp] = member.nama_romaji || member.nama_jp;
            }
        });
    } catch (e) {
        console.warn("Could not load members DB");
    }
}

async function buildMasterSongMap() {
    try {
        const res = await fetch(songDbPath);
        const data = await res.json();
        
        function traverse(obj) {
            if (Array.isArray(obj)) {
                obj.forEach(traverse);
            } else if (typeof obj === 'object' && obj !== null) {
                if (obj.titleJp && obj.titleRo) {
                    masterSongMap[obj.titleJp] = obj.titleRo;
                }
                Object.values(obj).forEach(traverse);
            }
        }
        traverse(data);
    } catch (e) {
        console.warn("Could not load song DB");
    }
}

async function loadPerformanceData() {
    loadingElement.style.display = 'block';
    perfList.innerHTML = '';
    currentPerfData = [];
    
    const checkedYears = Array.from(document.querySelectorAll('.year-cb:checked')).map(cb => cb.value);
    
    if (checkedYears.length === 0) {
        perfList.innerHTML = '<tr><td colspan="6" style="text-align:center;">Pilih setidaknya satu tahun untuk ditampilkan.</td></tr>';
        loadingElement.style.display = 'none';
        return;
    }
    
    try {
        const fetchPromises = checkedYears.map(year => 
            fetch(`../store/single/n46_perform_${year}.json`)
            .then(res => {
                if (!res.ok) throw new Error("File not found");
                return res.json();
            })
            .catch(e => [])
        );
        
        const results = await Promise.all(fetchPromises);
        let allData = results.flat().filter(item => item && item.tanggal);
        
        allData.sort((a, b) => {
            const dateA = new Date(a.tanggal.replace(/\./g, '/'));
            const dateB = new Date(b.tanggal.replace(/\./g, '/'));
            return dateA - dateB;
        });
        
        allData.forEach((item, index) => {
            item._autoNomor = index + 1;
        });
        
        allData.sort((a, b) => {
            const dateA = new Date(a.tanggal.replace(/\./g, '/'));
            const dateB = new Date(b.tanggal.replace(/\./g, '/'));
            return dateB - dateA;
        });
        
        currentPerfData = allData;
        renderTable();
    } catch (error) {
        console.error("Error loading perf data:", error);
        perfList.innerHTML = `<tr><td colspan="6" style="text-align:center; color:red;">Gagal memuat data penampilan.</td></tr>`;
    } finally {
        loadingElement.style.display = 'none';
    }
}

function formatDate(dateStr, lang) {
    if (lang === 'jp') return dateStr;
    const parts = dateStr.split('.');
    if(parts.length !== 3) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${parseInt(parts[2], 10)} ${months[parseInt(parts[1], 10) - 1]} ${parts[0]}`;
}

function getMappedName(jpName, lang) {
    if (lang === 'jp') return jpName;
    return masterMemberMap[jpName] || jpName;
}

function renderTable() {
    let html = '';
    const lang = langToggle.value;

    currentPerfData.forEach(item => {
        let displayDate = formatDate(item.tanggal, lang);
        let displaySong = (lang === 'romaji' && masterSongMap[item.lagu]) ? masterSongMap[item.lagu] : item.lagu;
        
        if (!displaySong || displaySong.trim() === "" || displaySong === "????") {
            const searchQuery = encodeURIComponent(`${item.tanggal} 乃木坂46 ${item.nama_acara}`);
            displaySong = `???? <a href="https://www.google.com/search?q=${searchQuery}" target="_blank" style="font-size: 10px; background: #ffffff; padding: 2px 6px; border: 1px solid #333; box-shadow: 2px 2px 0px #333; text-decoration: none; color: #333; margin-left: 8px; vertical-align: middle; font-family: 'Space Mono', monospace; font-weight: bold;">[Search]</a>`;
        }

        let centerArr = Array.isArray(item.center) ? item.center : [item.center];
        let displayCenters = centerArr.map(c => getMappedName(c, lang)).join('・');
        if (displayCenters.trim() === "") displayCenters = "-";

        let subArr = Array.isArray(item.pengganti_member) ? item.pengganti_member : [];
        let displaySubs = subArr.map(s => getMappedName(s, lang)).join(', ');
        if (displaySubs.trim() === "") displaySubs = "-";

        let badgesHtml = '';
        if (item.status && item.status.live) {
            badgesHtml += `<span class="perf-badge badge-live">生 LIVE</span>`;
        }
        if (item.status && item.status.medley) {
            badgesHtml += `<span class="perf-badge badge-medley">MEDLEY</span>`;
        }

        html += `
            <tr>
                <td style="font-weight:700;">${item._autoNomor}</td>
                <td style="font-family:'Space Mono', monospace;">${displayDate}</td>
                <td>
                    <strong>${item.nama_acara}</strong><br>
                    <span class="perf-badge badge-tv">${item.stasiun_tv}</span>
                </td>
                <td>
                    <div class="perf-song-title">${displaySong}</div>
                    <div class="perf-center">Center: ${displayCenters}</div>
                </td>
                <td class="perf-substitute">${displaySubs}</td>
                <td>
                    <div style="margin-bottom: 5px;">${badgesHtml}</div>
                    <span style="font-size:12px; color:#666;">${item.note || '-'}</span>
                </td>
            </tr>
        `;
    });

    if (html === '') {
        html = '<tr><td colspan="6" style="text-align:center;">Data tidak ditemukan pada tahun tersebut.</td></tr>';
    }

    perfList.innerHTML = html;
}


yearDropdownHeader.addEventListener('click', () => {
    yearDropdownList.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-dropdown')) {
        yearDropdownList.classList.remove('show');
    }
});

yearCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('.year-cb:checked').length;
        const totalCount = yearCheckboxes.length;
        yearDropdownHeader.innerText = `Tahun Dipilih (${checkedCount === totalCount ? 'Semua' : checkedCount}) ▼`;
        loadPerformanceData();
    });
});

langToggle.addEventListener('change', renderTable);
document.addEventListener('DOMContentLoaded', init);