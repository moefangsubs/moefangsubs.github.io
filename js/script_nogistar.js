// ----------------------
// Global State
// ----------------------
let allMembers = [];
let allSongs = [];
let memberMap = {};
let selectedMemberIds = new Set();
let showActiveOnly = true;

// ----------------------
// DOM Elements
// ----------------------
const memberSelectionContainer = document.getElementById('member-selection-container');
const songResultContainer = document.getElementById('song-result-container');
const toggleActiveStatus = document.getElementById('toggle-active-status');
const toggleStatusLabel = document.getElementById('toggle-status-label');
const inputSearchText = document.getElementById('input-search-text');
const btnResetFilter = document.getElementById('btn-reset-filter');
const selectedMemberCountEl = document.getElementById('selected-member-count');
const totalResultCountEl = document.getElementById('total-result-count');

// ----------------------
// Helper: Member Photo Resolver & Fallbacks
// ----------------------
function getMemberPhotoCandidates(member) {
    if (!member) {
        return ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23e7c7ff"/><circle cx="50" cy="40" r="20" fill="%23440079"/><path d="M20 85 C20 62, 80 62, 80 85 Z" fill="%23440079"/></svg>'];
    }

    const candidates = [];
    const rawId = member.id ? member.id.replace(/-/g, '') : '';
    const formattedName = member.nama_romaji ? member.nama_romaji.trim().toLowerCase().replace(/\s+/g, '_') : '';

    if (member.foto_profil) {
        candidates.push(member.foto_profil);
    }

    const startHistory = member.histori?.mulai || 38;
    const endHistory = member.histori?.akhir || 42;

    if (member.status === 'lulus') {
        const singlePadded = String(endHistory).padStart(3, '0');
        if (rawId) {
            candidates.push(`https://ik.imagekit.io/moearchive/calendar/nogi${endHistory}/${rawId}.png`);
        }
        if (formattedName) {
            candidates.push(`https://ik.imagekit.io/moearchive/web/memberprofile/s${singlePadded}/${formattedName}.png`);
        }
    } else {
        if (rawId) {
            for (let s = endHistory - 1; s >= startHistory; s--) {
                candidates.push(`https://ik.imagekit.io/moearchive/calendar/nogi${s}/${rawId}.png`);
            }
        }
        if (formattedName) {
            for (let s = endHistory; s >= startHistory; s--) {
                const sPadded = String(s).padStart(3, '0');
                candidates.push(`https://ik.imagekit.io/moearchive/web/memberprofile/s${sPadded}/${formattedName}.png`);
            }
        }
    }

    candidates.push('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23e7c7ff"/><circle cx="50" cy="40" r="20" fill="%23440079"/><path d="M20 85 C20 62, 80 62, 80 85 Z" fill="%23440079"/></svg>');

    return [...new Set(candidates)];
}

function attachImageWithFallback(imgElement, candidates) {
    let candidateIndex = 0;
    imgElement.src = candidates[0];

    imgElement.onerror = () => {
        candidateIndex++;
        if (candidateIndex < candidates.length) {
            imgElement.src = candidates[candidateIndex];
        }
    };
}

// ----------------------
// Data Initialization
// ----------------------
async function initNogiStarData() {
    try {
        const [membersResponse, songsResponse] = await Promise.all([
            fetch('/store/member/members.json'),
            fetch('/store/data/nogistar.json')
        ]);

        allMembers = await membersResponse.json();
        allSongs = await songsResponse.json();

        allMembers.forEach(member => {
            memberMap[member.id] = member;
            memberMap[member.nama_jp] = member;
        });

        renderMemberSelector();
        applyFilters();
        setupEventListeners();
    } catch (error) {
        totalResultCountEl.textContent = 'Gagal memuat data.';
    }
}

// ----------------------
// Member Selector UI
// ----------------------
function renderMemberSelector() {
    memberSelectionContainer.innerHTML = '';

    const participatingMemberIds = new Set();
    allSongs.forEach(song => {
        (song.members || []).forEach(m => {
            const memberObj = memberMap[m];
            if (memberObj) {
                participatingMemberIds.add(memberObj.id);
            } else {
                participatingMemberIds.add(m);
            }
        });
    });

    const generationOrder = [
        { key: '4期', label: 'Generasi 4' },
        { key: '5期', label: 'Generasi 5' },
        { key: '6期', label: 'Generasi 6' },
        { key: '3期', label: 'Senpai (Generasi 3)' },
        { key: '2期', label: 'Senpai (Generasi 2)' },
        { key: '1期', label: 'Senpai (Generasi 1)' }
    ];

    generationOrder.forEach(gen => {
        const membersInGen = allMembers.filter(m => {
            if (m.gen !== gen.key) return false;

            const isSenpai = ['1期', '2期', '3期'].includes(gen.key);
            if (isSenpai && !participatingMemberIds.has(m.id)) {
                return false;
            }

            const isGraduated = m.status === 'lulus';
            if (showActiveOnly && isGraduated) {
                return false;
            }

            return true;
        });

        if (membersInGen.length === 0) return;

        membersInGen.sort((a, b) => a.nama_romaji.localeCompare(b.nama_romaji));

        const groupContainer = document.createElement('div');
        groupContainer.className = 'gen-group-container';

        const groupTitle = document.createElement('div');
        groupTitle.className = 'gen-group-title';
        groupTitle.textContent = gen.label;

        const chipsFlex = document.createElement('div');
        chipsFlex.className = 'gen-chips-flex';

        membersInGen.forEach(member => {
            const isGraduated = member.status === 'lulus';
            const chip = document.createElement('div');
            chip.className = `member-chip ${selectedMemberIds.has(member.id) ? 'selected' : ''} ${isGraduated ? 'is-graduated' : ''}`;
            chip.dataset.memberId = member.id;

            const img = document.createElement('img');
            img.alt = member.nama_romaji;
            img.loading = 'lazy';
            attachImageWithFallback(img, getMemberPhotoCandidates(member));

            const nameSpan = document.createElement('span');
            nameSpan.className = 'member-chip-name';
            nameSpan.textContent = member.nama_romaji;

            chip.appendChild(img);
            chip.appendChild(nameSpan);

            chip.onclick = () => {
                if (selectedMemberIds.has(member.id)) {
                    selectedMemberIds.delete(member.id);
                    chip.classList.remove('selected');
                } else {
                    selectedMemberIds.add(member.id);
                    chip.classList.add('selected');
                }
                updateSummaryCounters();
                applyFilters();
            };

            chipsFlex.appendChild(chip);
        });

        groupContainer.appendChild(groupTitle);
        groupContainer.appendChild(chipsFlex);
        memberSelectionContainer.appendChild(groupContainer);
    });
}

// ----------------------
// Filter Logic
// ----------------------
function applyFilters() {
    const searchText = (inputSearchText.value || '').trim().toLowerCase();

    const filtered = allSongs.filter(item => {
        if (selectedMemberIds.size > 0) {
            const songPerformerIds = item.members.map(m => {
                const found = memberMap[m];
                return found ? found.id : m;
            });

            const hasAllSelected = Array.from(selectedMemberIds).every(selectedId => {
                return songPerformerIds.includes(selectedId);
            });

            if (!hasAllSelected) {
                return false;
            }
        }

        if (searchText) {
            const titleMatch = item.title && item.title.toLowerCase().includes(searchText);
            const artistMatch = item.artist && item.artist.toLowerCase().includes(searchText);
            const guestMatch = item.guests && item.guests.some(g => g.toLowerCase().includes(searchText));
            const showMatch = item.showTitle && item.showTitle.toLowerCase().includes(searchText);

            if (!titleMatch && !artistMatch && !guestMatch && !showMatch) {
                return false;
            }
        }

        return true;
    });

    renderSongResults(filtered);
    totalResultCountEl.textContent = `Ditemukan ${filtered.length} penampilan lagu`;
}

// ----------------------
// Result Renderer
// ----------------------
function renderSongResults(songs) {
    songResultContainer.innerHTML = '';

    if (songs.length === 0) {
        songResultContainer.innerHTML = `
            <div class="no-results-box boxs2">
                <h3>Tidak ada penampilan yang sesuai dengan kriteria pencarian.</h3>
                <p>Cobalah memilih kombinasi member lain atau mereset filter.</p>
            </div>
        `;
        return;
    }

    songs.forEach(song => {
        const card = document.createElement('div');
        card.className = 'song-card';

        const performerCount = (song.members || []).length;
        let badgeHtml = '';
        if (performerCount === 1) {
            badgeHtml = '<span class="song-badge solo">Solo</span>';
        } else if (performerCount === 2) {
            badgeHtml = '<span class="song-badge duet">Duet</span>';
        } else if (performerCount > 2) {
            badgeHtml = '<span class="song-badge unit">Unit</span>';
        }

        const guestHtml = song.guests && song.guests.length > 0
            ? `<div class="guest-info"><strong>Guest:</strong> ${song.guests.join(', ')}</div>`
            : '';

        const cleanEpisode = String(parseInt(song.episode, 10) || song.episode);
        const moesubsUrl = `https://moefangsubs.zone.id/moesubs/#/${song.showUrl}/${cleanEpisode}`;
        const songDataString = `${song.artist} 「${song.title}」`;

        card.innerHTML = `
            <div>
                <div class="card-top-meta">
                    <div class="show-info">
                        <span class="show-name">${song.showTitle}</span>
                        <span>Episode ${song.episode} | Part ${song.part}</span>
                    </div>
                    ${badgeHtml}
                </div>
                <div class="song-heading">
                    <div class="song-title jpn">${song.title}</div>
                    <div class="song-artist jpn">${song.artist}</div>
                </div>
                <div class="performers-section">
                    <div class="performers-label">Member yang membawakan:</div>
                    <div class="performers-flex" id="performers-flex-${song.showUrl}-${song.episode}-${song.part}"></div>
                </div>
                ${guestHtml}
            </div>
            <div class="card-buttons-row">
                <a href="${moesubsUrl}" target="_blank" rel="noopener noreferrer" class="btn-card moesubs-btn">MoeSubs</a>
                <button type="button" class="btn-card Youtube-btn" data-song="${songDataString}">YouTube</button>
            </div>
        `;

        const performersContainer = card.querySelector(`#performers-flex-${song.showUrl}-${song.episode}-${song.part}`);
        (song.members || []).forEach(memberKey => {
            const memberObj = memberMap[memberKey];
            const name = memberObj ? memberObj.nama_romaji : memberKey;
            const memberId = memberObj ? memberObj.id : memberKey;
            const isSelected = selectedMemberIds.has(memberId);

            const unit = document.createElement('div');
            unit.className = `performer-unit ${isSelected ? 'is-matched' : ''}`;

            const photoImg = document.createElement('img');
            photoImg.className = 'performer-photo';
            photoImg.alt = name;
            photoImg.loading = 'lazy';
            attachImageWithFallback(photoImg, getMemberPhotoCandidates(memberObj));

            const nameEl = document.createElement('span');
            nameEl.className = 'performer-name';
            nameEl.textContent = name;

            unit.appendChild(photoImg);
            unit.appendChild(nameEl);
            performersContainer.appendChild(unit);
        });

        songResultContainer.appendChild(card);
    });

    addSongButtonListeners();
}

// ----------------------
// YouTube Button Listener
// ----------------------
function addSongButtonListeners() {
    document.querySelectorAll('.Youtube-btn').forEach(button => {
        button.onclick = (e) => {
            const songString = e.currentTarget.getAttribute('data-song');
            const match = songString.match(/「(.+)」|『(.+)』/);
            if (match) {
                const songTitle = match[1] || match[2];
                const artist = songString.split(match[0])[0].trim();
                const searchQuery = encodeURIComponent(`${artist} ${songTitle}`);
                window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
            }
        };
    });
}

// ----------------------
// Event Handlers
// ----------------------
function setupEventListeners() {
    toggleActiveStatus.onchange = (e) => {
        showActiveOnly = e.target.checked;
        toggleStatusLabel.textContent = showActiveOnly ? 'Member Aktif Saja' : 'Semua (Plus Lulus)';
        renderMemberSelector();
        applyFilters();
    };

    inputSearchText.oninput = () => {
        applyFilters();
    };

    btnResetFilter.onclick = () => {
        selectedMemberIds.clear();
        inputSearchText.value = '';
        renderMemberSelector();
        updateSummaryCounters();
        applyFilters();
    };
}

function updateSummaryCounters() {
    selectedMemberCountEl.textContent = `${selectedMemberIds.size} member dipilih`;
}

// ----------------------
// Lifecycle Init
// ----------------------
document.addEventListener('DOMContentLoaded', initNogiStarData);