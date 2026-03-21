// ----------------------
// Elements & Config
// ----------------------

const ftListContainer = document.getElementById('ftListContainer');
const loadingElement = document.getElementById('loadingElement');
const langToggle = document.getElementById('langToggle');

const ftDataPath = '../store/member/members_firsttake.json';

const memberDbPaths = {
    nogi: '../store/member/members.json',
    keya: '../store/member/members_db_keya.json',
    sakura: '../store/member/members_db_saku.json',
    hinata: '../store/member/members_db_hina.json',
    boku: '../store/member/members_db_boku.json'
};

const groupColorClass = { nogi: 'text-nogi', keya: 'text-keya', sakura: 'text-sakura', hinata: 'text-hinata', boku: 'text-boku' };
const groupBorderClass = { nogi: 'border-nogi', keya: 'border-keya', sakura: 'border-sakura', hinata: 'border-hinata', boku: 'border-boku' };
const groupBgClass = { nogi: 'bg-nogi', keya: 'bg-keya', sakura: 'bg-sakura', hinata: 'bg-hinata', boku: 'bg-boku' };

let masterMemberMap = {};
let ftDataGlobal = [];

// Dictionary 
const dictGroupArtist = {
    "乃木坂46": "Nogizaka46", "櫻坂46": "Sakurazaka46", "日向坂46": "Hinatazaka46", 
    "坂本九": "Sakamoto Kyu", "絢香": "Ayaka", "セサミストリート": "Sesame Street"
};

const dictSong = {
    "きっかけ": "Kikkake",
	"やさしいだけなら": "Yasashii dake nara",
	"上を向いて歩こう": "Ue o Muite Arukou",
    "ドレミソラシド": "Doremi Solasi Do",
	"僕なんか": "Boku nanka", "にじいろ": "Nijiiro",
    "Start Over!": "Start Over!",
	"五月雨よ": "Samidare yo",
	"君の名は希望": "Kimi no Na wa Kibou",
    "ネーブルオレンジ": "Navel Orange"
};

// ----------------------
// Initialization
// ----------------------

async function init() {
    loadingElement.style.display = 'block';
    ftListContainer.innerHTML = '';
    
    try {
        await buildMasterMemberMap();
        
        const response = await fetch(ftDataPath);
        ftDataGlobal = await response.json();
        
        renderFtData(ftDataGlobal);
    } catch (error) {
        console.error("Error loading data:", error);
        ftListContainer.innerHTML = '<div style="text-align:center; color:red; padding:20px;">Gagal memuat data THE F1RST TAKE.</div>';
    } finally {
        loadingElement.style.display = 'none';
    }
}

// ----------------------
// Data Fetching & Mapping
// ----------------------

async function buildMasterMemberMap() {
    const fetchPromises = Object.entries(memberDbPaths).map(async ([groupKey, path]) => {
        try {
            const res = await fetch(path);
            const data = await res.json();
            
            data.forEach(member => {
                if (member.nama_jp) {
                    masterMemberMap[member.nama_jp] = {
                        id: member.id,
                        group: groupKey,
                        nama_romaji: member.nama_romaji || member.nama_jp
                    };
                }
            });
        } catch (e) {
            console.warn(`Could not load DB for ${groupKey} at ${path}`);
        }
    });

    await Promise.all(fetchPromises);
}

// ----------------------
// Helpers
// ----------------------

function formatDate(dateStr, lang) {
    if (lang === 'jp') return dateStr;
    const parts = dateStr.split('.');
    if(parts.length !== 3) return dateStr;
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${parseInt(parts[2], 10)} ${months[parseInt(parts[1], 10) - 1]} ${parts[0]}`;
}

// ----------------------
// Rendering
// ----------------------

function renderFtData(data) {
    let html = '';
    const lang = langToggle.value;

    data.forEach(item => {
        const groupBorder = groupBorderClass[item.group] || 'border-nogi';
        const groupBg = groupBgClass[item.group] || 'bg-nogi';
        
        let videoId = '';
        if (item.youtube_link) {
            const urlObj = new URL(item.youtube_link);
            videoId = urlObj.searchParams.get('v');
        }
        const generatedThumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
        
        // Language Toggle logic
        let displayDate = formatDate(item.release_date, lang);
        let displayGroupArtist = (lang === 'romaji' && dictGroupArtist[item.song.group_artist]) ? dictGroupArtist[item.song.group_artist] : item.song.group_artist;
        let displaySongTitle = (lang === 'romaji' && dictSong[item.song.title]) ? dictSong[item.song.title] : item.song.title;
        let displayCollab = (item.participate.collab_artist && lang === 'romaji' && dictGroupArtist[item.participate.collab_artist]) ? dictGroupArtist[item.participate.collab_artist] : item.participate.collab_artist;

        let membersHtmlArr = item.participate.members.map(nama => {
            const memberInfo = masterMemberMap[nama];
            let colorClass = 'text-nogi';
            let displayName = nama;

            if (memberInfo) {
                colorClass = groupColorClass[memberInfo.group] || 'text-nogi';
                if (lang === 'romaji') displayName = memberInfo.nama_romaji;
                
                if (memberInfo.group === 'nogi') {
                    return `<a href="../moedata/member.html?id=${memberInfo.id}" class="ft-member-link ${colorClass}" target="_blank">${displayName}</a>`;
                } else {
                    return `<span class="${colorClass}">${displayName}</span>`;
                }
            }
            return `<span>${displayName}</span>`;
        });

        let participantHtml = membersHtmlArr.join('<span style="color:#333;"> ・ </span>');

        if (displayCollab) {
            participantHtml += `<span class="ft-collab"> × ${displayCollab}</span>`;
        }

        let noteHtml = '';
        if (item.note) {
            noteHtml = `<div class="ft-note">${item.note}</div>`;
        }

        html += `
            <div class="ft-card ${groupBorder}">
                <div class="ft-card-header ${groupBg}">F/T Songs n° ${item.ftsong}</div>
                <div class="ft-card-body">
                    <div class="ft-left">
                        <img class="ft-thumbnail" src="${generatedThumbnail}" alt="Thumbnail">
                        <div class="ft-date">${displayDate}</div>
                        <a href="${item.youtube_link}" class="ft-btn" target="_blank">YouTube</a>
                    </div>
                    <div class="ft-right">
                        <div class="ft-label">Member Participate</div>
                        <div class="ft-members-container">${participantHtml}</div>
                        
                        <div style="height: 10px;"></div>
                        
                        <div class="ft-label">Song</div>
                        <div class="ft-song-artist">${displayGroupArtist}</div>
                        <div class="ft-song-title">${displaySongTitle}</div>
                        
                        ${noteHtml}
                    </div>
                </div>
            </div>
        `;
    });

    if (html === '') {
        html = '<div style="text-align:center; padding:20px;">Belum ada data F1RST TAKE yang tersedia.</div>';
    }

    ftListContainer.innerHTML = html;
}

// ----------------------
// Event Listeners
// ----------------------

langToggle.addEventListener('change', () => {
    if(ftDataGlobal.length > 0) renderFtData(ftDataGlobal);
});
document.addEventListener('DOMContentLoaded', init);