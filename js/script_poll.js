// ----------------------
// Global Variables
// ----------------------
const dbPoll = firebase.firestore();
let allActiveMembers = [];
let groupedMembers = {};
let selectedPollMembers = [];
let currentPollType = null;
let pollUser = null;

// ----------------------
// Initialization
// ----------------------
document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            pollUser = user;
            checkIfUserVoted();
        } else {
            document.getElementById('poll-senbatsu-container').innerHTML = 
                '<div style="text-align:center; padding:20px;">Silakan login terlebih dahulu untuk mengikuti polling.</div>';
        }
    });
});

// ----------------------
// Database Check
// ----------------------
function checkIfUserVoted() {
    dbPoll.collection('poll_senbatsu').doc(pollUser.uid).get()
        .then(doc => {
            if (doc.exists) {
                renderResultArea(doc.data());
            } else {
                fetchMembersData();
            }
        })
        .catch(error => console.error("Error checking vote status: ", error));
}

// ----------------------
// Data Fetching
// ----------------------
function fetchMembersData() {
    fetch('../store/member/members.json')
        .then(response => response.json())
        .then(data => {
            allActiveMembers = data.filter(m => m.status === "aktif");
            groupedMembers = {
                "3期": allActiveMembers.filter(m => m.gen === "3期"),
                "4期": allActiveMembers.filter(m => m.gen === "4期"),
                "5期": allActiveMembers.filter(m => m.gen === "5期"),
                "6期": allActiveMembers.filter(m => m.gen === "6期")
            };
            renderVoteUI();
        })
        .catch(error => console.error("Error loading members.json: ", error));
}

// ----------------------
// UI Rendering - VOTE
// ----------------------
function renderVoteUI() {
    const container = document.getElementById('poll-senbatsu-container');
    container.innerHTML = `
        <div class="poll-header">
            <h2>Tebak Center Single ke-42</h2>
            <div class="poll-deadline">Batas waktu vote: Minggu 7 Juni 2026, 22.00 WIB</div>
        </div>
        <div class="poll-type-selection">
            <label class="poll-radio-label" id="label-center">
                <input type="radio" name="pollType" value="center" style="display:none;">
                <span>Center (1 Member)</span>
            </label>
            <label class="poll-radio-label" id="label-wcenter">
                <input type="radio" name="pollType" value="w-center" style="display:none;">
                <span>W-Center (2 Member)</span>
            </label>
        </div>
        <div id="poll-member-area" style="display: none;">
            <div class="poll-tabs" id="poll-tabs-container"></div>
            <div class="poll-member-grid" id="poll-grid-container"></div>
            <div class="poll-confirmation" id="poll-confirmation-box" style="display:none;"></div>
            <button class="poll-submit-btn" id="poll-submit-btn" disabled>SUBMIT</button>
        </div>
    `;

    document.querySelectorAll('input[name="pollType"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentPollType = e.target.value;
            selectedPollMembers = [];
            
            document.querySelectorAll('.poll-radio-label').forEach(lbl => lbl.classList.remove('active'));
            e.target.parentElement.classList.add('active');
            
            document.getElementById('poll-member-area').style.display = 'block';
            updateConfirmationBox();
            renderTabs();
        });
    });

    document.getElementById('poll-submit-btn').addEventListener('click', submitVote);
}

function renderTabs() {
    const tabsContainer = document.getElementById('poll-tabs-container');
    tabsContainer.innerHTML = '';
    
    Object.keys(groupedMembers).forEach((gen, index) => {
        const btn = document.createElement('button');
        btn.className = `poll-tab-btn ${index === 0 ? 'active' : ''}`;
        btn.textContent = `Gen-${gen.replace('期', '')}`;
        btn.onclick = () => {
            document.querySelectorAll('.poll-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMemberGrid(gen);
        };
        tabsContainer.appendChild(btn);
    });

    renderMemberGrid(Object.keys(groupedMembers)[0]);
}

function renderMemberGrid(gen) {
    const gridContainer = document.getElementById('poll-grid-container');
    gridContainer.innerHTML = '';
    
    groupedMembers[gen].forEach(member => {
        const card = document.createElement('div');
        const isSelected = selectedPollMembers.some(m => m.id === member.id);
        card.className = `poll-member-card ${isSelected ? 'selected' : ''}`;
        card.innerHTML = `
            <img src="${member.foto_profil}" alt="${member.nama_romaji}">
            <div class="member-name">${member.nama_romaji}</div>
        `;
        
        card.onclick = () => handleMemberSelection(member, card);
        gridContainer.appendChild(card);
    });
}

function handleMemberSelection(member, cardElement) {
    const maxSelect = currentPollType === 'center' ? 1 : 2;
    const index = selectedPollMembers.findIndex(m => m.id === member.id);

    if (index > -1) {
        selectedPollMembers.splice(index, 1);
        cardElement.classList.remove('selected');
    } else {
        if (selectedPollMembers.length < maxSelect) {
            selectedPollMembers.push(member);
            cardElement.classList.add('selected');
        } else {
            alert(`Kamu hanya bisa memilih maksimal ${maxSelect} member untuk tipe ${currentPollType}.`);
        }
    }
    updateConfirmationBox();
}

function updateConfirmationBox() {
    const confBox = document.getElementById('poll-confirmation-box');
    const submitBtn = document.getElementById('poll-submit-btn');
    const maxSelect = currentPollType === 'center' ? 1 : 2;

    if (selectedPollMembers.length > 0) {
        confBox.style.display = 'block';
        const names = selectedPollMembers.map(m => m.nama_romaji).join(' & ');
        confBox.innerHTML = `Kamu memilih <strong>${names}</strong> yang diprediksi menjadi center single ke-42`;
    } else {
        confBox.style.display = 'none';
    }

    if (selectedPollMembers.length === maxSelect) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// ----------------------
// Submit Logic
// ----------------------
function submitVote() {
    const maxSelect = currentPollType === 'center' ? 1 : 2;
    if (selectedPollMembers.length !== maxSelect) return;

    const names = selectedPollMembers.map(m => m.nama_romaji).join(' & ');
    if (!confirm(`Yakin mengirim vote untuk ${names}?\nPilihan tidak dapat diubah setelah disubmit.`)) {
        return;
    }

    const payload = {
        email: pollUser.email,
        type: currentPollType,
        members: selectedPollMembers.map(m => m.id),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    dbPoll.collection('poll_senbatsu').doc(pollUser.uid).set(payload)
        .then(() => {
            alert('Vote berhasil disimpan! Terima kasih.');
            checkIfUserVoted();
        })
        .catch(error => {
            console.error("Error writing document: ", error);
            alert('Gagal mengirim vote. Silakan coba lagi.');
        });
}

// ----------------------
// UI Rendering - RESULT
// ----------------------
function renderResultArea(userVoteData) {
    const container = document.getElementById('poll-senbatsu-container');
    container.innerHTML = '<div style="text-align:center; padding:20px;">Memuat hasil polling...</div>';

    Promise.all([
        dbPoll.collection('poll_senbatsu').get(),
        fetch('../store/member/members.json').then(res => res.json())
    ]).then(([snapshot, membersData]) => {
        let totalUsers = snapshot.size;
        let typeCenter = 0;
        let typeWCenter = 0;
        let memberVotes = {};

        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.type === 'center') typeCenter++;
            if (data.type === 'w-center') typeWCenter++;
            
            data.members.forEach(mId => {
                memberVotes[mId] = (memberVotes[mId] || 0) + 1;
            });
        });

        const sortedMembers = Object.keys(memberVotes)
            .map(mId => {
                const memData = membersData.find(m => m.id === mId) || { nama_romaji: mId, foto_profil: '' };
                return {
                    ...memData,
                    voteCount: memberVotes[mId],
                    percentage: ((memberVotes[mId] / totalUsers) * 100).toFixed(1)
                };
            })
            .sort((a, b) => b.voteCount - a.voteCount);

        const pctCenter = totalUsers > 0 ? ((typeCenter / totalUsers) * 100).toFixed(1) : 0;
        const pctWCenter = totalUsers > 0 ? ((typeWCenter / totalUsers) * 100).toFixed(1) : 0;

        const myVoteNames = userVoteData.members.map(mId => {
            const m = membersData.find(x => x.id === mId);
            return m ? m.nama_romaji : mId;
        }).join(' & ');

        let html = `
            <div class="poll-header">
                <h2>Hasil Polling Center Single ke-42</h2>
            </div>
            <div class="poll-result-title">
                Kamu memilih <strong>${myVoteNames}</strong> yang diprediksi menjadi center single ke-42
            </div>
        `;

        html += `<div class="poll-top-5">`;
        sortedMembers.slice(0, 5).forEach(m => {
            html += `
                <div class="poll-result-card-top">
                    <img src="${m.foto_profil}" alt="${m.nama_romaji}">
                    <div class="res-name">${m.nama_romaji}</div>
                    <div class="res-pct">${m.percentage}%</div>
                </div>
            `;
        });
        html += `</div>`;

        if (sortedMembers.length > 5) {
            html += `<div class="poll-remaining">`;
            sortedMembers.slice(5).forEach(m => {
                html += `
                    <div class="poll-result-row">
                        <img src="${m.foto_profil}" alt="${m.nama_romaji}">
                        <div class="res-name">${m.nama_romaji}</div>
                        <div class="res-bar-container">
                            <div class="res-bar-fill" style="width: ${m.percentage}%"></div>
                        </div>
                        <div class="res-pct">${m.percentage}%</div>
                    </div>
                `;
            });
            html += `</div>`;
        }

        html += `
            <div class="poll-vs-wrapper">
                <div class="poll-vs-label">CENTER</div>
                <div class="poll-vs-fill-container">
                    <div class="poll-vs-fill-center" style="width: ${pctCenter}%">
                        ${pctCenter > 0 ? `<div class="poll-vs-pct-badge">${pctCenter}%</div>` : ''}
                    </div>
                    <div class="poll-vs-fill-wcenter" style="width: ${pctWCenter}%">
                        ${pctWCenter > 0 ? `<div class="poll-vs-pct-badge">${pctWCenter}%</div>` : ''}
                    </div>
                </div>
                <div class="poll-vs-label">W-CENTER</div>
            </div>
        `;

        container.innerHTML = html;
    }).catch(error => {
        console.error("Error processing results: ", error);
        container.innerHTML = '<div style="text-align:center;">Gagal memuat hasil.</div>';
    });
}