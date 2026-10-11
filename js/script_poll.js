// ----------------------
// Configuration & Helpers
// ----------------------
const dbPoll = firebase.firestore();
const POLL_DEADLINE = new Date("2026-10-18T22:00:00+07:00");

let allActiveMembers = [];
let groupedMembers = {};
let selectedPollMembers = [];
let currentPollType = null;
let pollUser = null;
let cachedMembersData = [];
let currentUserVote = null;
let chatUnsubscribe = null;
let replyContext = null;
let editingCommentId = null;

function isPollClosed() {
    return new Date() >= POLL_DEADLINE;
}

// ----------------------
// Initialization
// ----------------------
document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            pollUser = user;
            initPollContainerLayout();
            checkIfUserVoted();
        } else {
            const container = document.getElementById('poll-senbatsu-container');
            if (container) {
                container.innerHTML = '<div style="text-align:center; padding:20px;">Silakan login terlebih dahulu untuk mengikuti polling.</div>';
            }
        }
    });
});

// ----------------------
// Initialization Layout
// ----------------------
function initPollContainerLayout() {
    const container = document.getElementById('poll-senbatsu-container');
    if (!container) return;

    container.innerHTML = `
        <div class="poll-main-wrapper">
            <div class="poll-content-side" id="poll-content-slot">
                <div style="text-align:center; padding:20px;">Memuat data...</div>
            </div>

            <div class="poll-chat-side" id="poll-chat-slot" style="display:none;">
                <div class="poll-chat-header">
                    <span><i class="fa-solid fa-comments"></i> Diskusi Prediksi</span>
                    <button class="poll-chat-toggle-btn" id="btn-hide-chat" type="button" title="Sembunyikan Chat">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="poll-chat-body" id="poll-chat-body">
                    <div class="poll-chat-messages" id="poll-chat-messages">
                        <div style="text-align:center; color:#888; font-size:0.85em; margin-top:20px;">Memuat obrolan...</div>
                    </div>

                    <div class="poll-chat-reply-bar" id="poll-chat-reply-bar" style="display:none;">
                        <div class="reply-info">
                            <span class="reply-label"><i class="fa-solid fa-reply"></i> Membalas:</span>
                            <span class="reply-target-name" id="reply-target-name"></span>
                        </div>
                        <button type="button" class="reply-cancel-btn" id="btn-cancel-reply" title="Batal Balas">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div class="poll-chat-edit-bar" id="poll-chat-edit-bar" style="display:none;">
                        <div class="edit-info">
                            <span class="edit-label"><i class="fa-solid fa-pen"></i> Edit Komentar:</span>
                        </div>
                        <button type="button" class="edit-cancel-btn" id="btn-cancel-edit" title="Batal Edit">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <form class="poll-chat-input-area" id="poll-chat-form">
                        <input type="text" id="poll-chat-text" placeholder="Tulis prediksimu..." maxlength="250" autocomplete="off" required>
                        <button type="submit" id="btn-submit-chat">
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.getElementById('btn-hide-chat').addEventListener('click', hideChatBox);
    document.getElementById('btn-cancel-reply').addEventListener('click', cancelReply);
    document.getElementById('btn-cancel-edit').addEventListener('click', cancelEdit);
    document.getElementById('poll-chat-form').addEventListener('submit', handleSendComment);
}

// ----------------------
// Chat Toggle Functions
// ----------------------
function hideChatBox() {
    const chatSlot = document.getElementById('poll-chat-slot');
    const openWrapper = document.getElementById('poll-chat-open-wrapper');
    if (chatSlot) chatSlot.style.display = 'none';
    if (openWrapper) openWrapper.style.display = 'block';
}

function showChatBox() {
    const chatSlot = document.getElementById('poll-chat-slot');
    const openWrapper = document.getElementById('poll-chat-open-wrapper');
    if (chatSlot) {
        chatSlot.style.display = 'flex';
        const messagesBox = document.getElementById('poll-chat-messages');
        if (messagesBox) messagesBox.scrollTop = messagesBox.scrollHeight;
    }
    if (openWrapper) openWrapper.style.display = 'none';
}


function cancelReply() {
    replyContext = null;
    const bar = document.getElementById('poll-chat-reply-bar');
    if (bar) bar.style.display = 'none';
}

function cancelEdit() {
    editingCommentId = null;
    const bar = document.getElementById('poll-chat-edit-bar');
    const input = document.getElementById('poll-chat-text');
    if (bar) bar.style.display = 'none';
    if (input) input.value = '';
}

// ----------------------
// Database Check
// ----------------------
function checkIfUserVoted() {
    dbPoll.collection('poll_senbatsu_43').doc(pollUser.uid).get()
        .then(doc => {
            if (doc.exists) {
                currentUserVote = doc.data();
                renderResultArea(currentUserVote);
                enableChatBox(currentUserVote);
            } else if (isPollClosed()) {
                renderResultArea(null);
            } else {
                fetchMembersData();
            }
        })
        .catch(error => {
            console.error("Error checking vote status: ", error);
            const slot = document.getElementById('poll-content-slot');
            if (slot) {
                slot.innerHTML = '<div style="text-align:center; padding:20px;">Gagal memverifikasi status vote. Periksa izin akses database atau coba lagi nanti.</div>';
            }
        });
}

// ----------------------
// Data Fetching
// ----------------------
function fetchMembersData() {
    fetch('../store/member/members.json')
        .then(response => response.json())
        .then(data => {
            cachedMembersData = data;
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
    const slot = document.getElementById('poll-content-slot');
    if (!slot) return;

    slot.innerHTML = `
        <div class="poll-header">
            <h2>Tebak Center Single ke-43 "Kimi Loss"</h2>
            <div class="poll-deadline">Batas waktu vote: Minggu 18 Oktober 2026, 22.00 WIB</div>
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
    if (!tabsContainer) return;
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
    if (!gridContainer) return;
    gridContainer.innerHTML = '';
    
    groupedMembers[gen].forEach(member => {
        const card = document.createElement('div');
        const isSelected = selectedPollMembers.some(m => m.id === member.id);
        card.className = `poll-member-card ${isSelected ? 'selected' : ''}`;
        card.innerHTML = `
            <img src="${member.foto_profil}" alt="${member.nama_romaji}" onerror="this.src='../sprite/element/vibe/load.gif'">
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
    if (!confBox || !submitBtn) return;

    const maxSelect = currentPollType === 'center' ? 1 : 2;

    if (selectedPollMembers.length > 0) {
        confBox.style.display = 'block';
        const names = selectedPollMembers.map(m => m.nama_romaji).join(' & ');
        confBox.innerHTML = `Kamu memilih <strong>${names}</strong> yang diprediksi menjadi center Single ke-43 "Kimi Loss"`;
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
    if (isPollClosed()) {
        alert('Batas waktu voting telah berakhir.');
        checkIfUserVoted();
        return;
    }

    const maxSelect = currentPollType === 'center' ? 1 : 2;
    if (selectedPollMembers.length !== maxSelect) return;

    const names = selectedPollMembers.map(m => m.nama_romaji).join(' & ');
    if (!confirm(`Yakin mengirim vote untuk ${names}?\nPilihan tidak dapat diubah setelah disubmit.`)) {
        return;
    }

    const payload = {
        email: pollUser.email,
        displayName: pollUser.displayName || pollUser.email.split('@')[0],
        photoURL: pollUser.photoURL || '',
        type: currentPollType,
        members: selectedPollMembers.map(m => m.id),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    dbPoll.collection('poll_senbatsu_43').doc(pollUser.uid).set(payload)
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
    const slot = document.getElementById('poll-content-slot');
    if (!slot) return;
    slot.innerHTML = '<div style="text-align:center; padding:20px;">Memuat hasil polling...</div>';

    const getMembersPromise = cachedMembersData.length > 0 
        ? Promise.resolve(cachedMembersData) 
        : fetch('../store/member/members.json').then(res => res.json());

    Promise.all([
        dbPoll.collection('poll_senbatsu_43').get(),
        getMembersPromise
    ]).then(([snapshot, membersData]) => {
        cachedMembersData = membersData;
        let totalUsers = snapshot.size;
        let typeCenter = 0;
        let typeWCenter = 0;
        let memberVotes = {};

        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.type === 'center') typeCenter++;
            if (data.type === 'w-center') typeWCenter++;
            
            if (Array.isArray(data.members)) {
                data.members.forEach(mId => {
                    memberVotes[mId] = (memberVotes[mId] || 0) + 1;
                });
            }
        });

        const sortedMembers = Object.keys(memberVotes)
            .map(mId => {
                const memData = membersData.find(m => m.id === mId) || { nama_romaji: mId, foto_profil: '' };
                return {
                    ...memData,
                    voteCount: memberVotes[mId],
                    percentage: totalUsers > 0 ? ((memberVotes[mId] / totalUsers) * 100).toFixed(1) : 0
                };
            })
            .sort((a, b) => b.voteCount - a.voteCount);

        const totalTypeVotes = typeCenter + typeWCenter;
        const pctCenter = totalTypeVotes > 0 ? ((typeCenter / totalTypeVotes) * 100).toFixed(1) : 0;
        const pctWCenter = totalTypeVotes > 0 ? (100 - pctCenter).toFixed(1) : 0;

        let userStatusHtml = '';
        if (userVoteData && Array.isArray(userVoteData.members) && userVoteData.members.length > 0) {
            const myVoteNames = userVoteData.members.map(mId => {
                const m = membersData.find(x => x.id === mId);
                return m ? m.nama_romaji : mId;
            }).join(' & ');
            userStatusHtml = `<div class="poll-result-title">Kamu memilih <strong>${myVoteNames}</strong> yang diprediksi menjadi center Single ke-43 "Kimi Loss"</div>`;
        } else {
            userStatusHtml = `<div class="poll-result-title" style="background:var(--moe-tint7); border-color:var(--moe);">Voting telah ditutup. Kamu tidak berpartisipasi dalam polling ini.</div>`;
        }

        let html = `
            <div class="poll-header">
                <h2>Hasil Polling Center Single ke-43 "Kimi Loss"</h2>
            </div>
            ${userStatusHtml}
        `;

        html += `<div class="poll-top-5">`;
        sortedMembers.slice(0, 5).forEach(m => {
            html += `
                <div class="poll-result-card-top">
                    <img src="${m.foto_profil}" alt="${m.nama_romaji}" onerror="this.src='../sprite/element/vibe/load.gif'">
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
                        <img src="${m.foto_profil}" alt="${m.nama_romaji}" onerror="this.src='../sprite/element/vibe/load.gif'">
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
            <div class="poll-vs-wrapper" style="margin: 20px auto;">
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
            <div class="poll-chat-open-btn-wrapper" id="poll-chat-open-wrapper" style="display:none; text-align:center; margin-top:20px;">
                <button class="poll-chat-open-btn" id="btn-open-chat" type="button">
                    <i class="fa-solid fa-comments"></i> Buka Diskusi
                </button>
            </div>
        `;

        slot.innerHTML = html;

        const openBtn = document.getElementById('btn-open-chat');
        if (openBtn) {
            openBtn.addEventListener('click', showChatBox);
        }

        const chatSlot = document.getElementById('poll-chat-slot');
        const openWrapper = document.getElementById('poll-chat-open-wrapper');
        if (chatSlot && openWrapper && chatSlot.style.display === 'none') {
            openWrapper.style.display = 'block';
        }
    }).catch(error => {
        console.error("Error processing results: ", error);
        slot.innerHTML = '<div style="text-align:center;">Gagal memuat hasil.</div>';
    });
}


// ----------------------
// Helper Avatar
// ----------------------
function getUserAvatarUrl(user) {
    if (!user) return 'https://via.placeholder.com/150?text=?';
    return user.photoURL || 'https://via.placeholder.com/150?text=?';
}


// ----------------------
// Chat Real-time Logic
// ----------------------
function enableChatBox(voteData) {
    const chatSlot = document.getElementById('poll-chat-slot');
    if (!chatSlot) return;

    chatSlot.style.display = 'flex';

    const openWrapper = document.getElementById('poll-chat-open-wrapper');
    if (openWrapper) openWrapper.style.display = 'none';

    if (chatUnsubscribe) chatUnsubscribe();

    const messagesBox = document.getElementById('poll-chat-messages');

    chatUnsubscribe = dbPoll.collection('poll_senbatsu_43_comments')
        .orderBy('timestamp', 'asc')
        .limitToLast(50)
        .onSnapshot(snapshot => {
            if (snapshot.empty) {
                messagesBox.innerHTML = '<div style="text-align:center; color:#888; font-size:0.85em; margin-top:20px;">Belum ada komentar. Jadilah yang pertama!</div>';
                return;
            }

            messagesBox.innerHTML = '';
            snapshot.forEach(doc => {
                const item = doc.data();
                const bubble = document.createElement('div');
                bubble.className = 'poll-chat-bubble';
                bubble.id = `comment-${doc.id}`;

                let timeFormatted = '';
                if (item.timestamp && item.timestamp.toDate) {
                    const d = item.timestamp.toDate();
                    timeFormatted = `${d.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                }

                const editedLabel = item.isEdited ? ' <span class="comment-edited-tag">-edited-</span>' : '';
                const avatarUrl = item.userPhoto || 'https://via.placeholder.com/150?text=?';
                const isOwner = pollUser && pollUser.uid === item.userId;

                let quoteHtml = '';
                if (item.quote && item.quote.author && item.quote.text) {
                    quoteHtml = `
                        <div class="poll-chat-quote-box">
                            <span class="poll-quote-author"><i class="fa-solid fa-reply"></i> ${escapeHtml(item.quote.author)}</span>
                            <span class="poll-quote-text">${escapeHtml(item.quote.text)}</span>
                        </div>
                    `;
                }

                let actionsHtml = `
                    <div class="poll-bubble-actions">
                        <button type="button" class="btn-chat-reply" title="Balas"><i class="fa-solid fa-reply"></i></button>
                        ${isOwner ? `
                            <button type="button" class="btn-chat-edit" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button type="button" class="btn-chat-delete" title="Hapus"><i class="fa-solid fa-trash-can"></i></button>
                        ` : ''}
                    </div>
                `;

                bubble.innerHTML = `
                    <div class="poll-bubble-inner">
                        <img src="${avatarUrl}" class="poll-bubble-avatar" alt="Profil" referrerpolicy="no-referrer" onerror="this.src='https://via.placeholder.com/150?text=?'">
                        <div class="poll-bubble-content">
                            <div class="poll-bubble-top">
                                <div class="poll-bubble-meta">
                                    <span class="poll-bubble-username">${escapeHtml(item.userName || 'Anonymous')}</span>
                                    <span class="poll-bubble-voted">Memilih: ${escapeHtml(item.votedMembers || '-')}</span>
                                </div>
                                ${actionsHtml}
                            </div>
                            ${quoteHtml}
                            <div class="poll-bubble-text" id="msg-text-${doc.id}">${escapeHtml(item.message || '')}</div>
                            <div class="poll-bubble-footer">
                                ${timeFormatted ? `<span class="poll-bubble-time">${timeFormatted}${editedLabel}</span>` : ''}
                            </div>
                        </div>
                    </div>
                `;

                bubble.querySelector('.btn-chat-reply').addEventListener('click', () => {
                    replyContext = {
                        author: item.userName || 'Anonymous',
                        text: item.message || ''
                    };
                    document.getElementById('reply-target-name').textContent = replyContext.author;
                    document.getElementById('poll-chat-reply-bar').style.display = 'flex';
                    cancelEdit();
                    document.getElementById('poll-chat-text').focus();
                });

                if (isOwner) {
                    bubble.querySelector('.btn-chat-edit').addEventListener('click', () => {
                        editingCommentId = doc.id;
                        document.getElementById('poll-chat-edit-bar').style.display = 'flex';
                        cancelReply();
                        const input = document.getElementById('poll-chat-text');
                        input.value = item.message || '';
                        input.focus();
                    });

                    bubble.querySelector('.btn-chat-delete').addEventListener('click', () => {
                        if (confirm('Yakin ingin menghapus komentar ini?')) {
                            dbPoll.collection('poll_senbatsu_43_comments').doc(doc.id).delete()
                                .catch(err => {
                                    console.error("Gagal menghapus komentar: ", err);
                                    alert("Gagal menghapus komentar.");
                                });
                        }
                    });
                }

                messagesBox.appendChild(bubble);
            });

            messagesBox.scrollTop = messagesBox.scrollHeight;
        }, err => {
            console.error("Error loading chat: ", err);
        });
}


function handleSendComment(e) {
    e.preventDefault();
    const input = document.getElementById('poll-chat-text');
    const msg = input.value.trim();
    if (!msg || !currentUserVote) return;

    if (editingCommentId) {
        dbPoll.collection('poll_senbatsu_43_comments').doc(editingCommentId).update({
            message: msg,
            isEdited: true,
            editedAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            cancelEdit();
        }).catch(err => {
            console.error("Gagal mengupdate komentar: ", err);
            alert("Gagal mengupdate komentar.");
        });
        return;
    }

    let votedNames = '-';
    if (Array.isArray(currentUserVote.members)) {
        votedNames = currentUserVote.members.map(mId => {
            const m = cachedMembersData.find(x => x.id === mId);
            return m ? m.nama_romaji : mId;
        }).join(' & ');
    }

    const payload = {
        userId: pollUser.uid,
        userName: pollUser.displayName || pollUser.email.split('@')[0],
        userPhoto: getUserAvatarUrl(pollUser),
        votedMembers: votedNames,
        message: msg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        isEdited: false
    };

    if (replyContext) {
        payload.quote = {
            author: replyContext.author,
            text: replyContext.text
        };
    }

    input.value = '';
    cancelReply();

    dbPoll.collection('poll_senbatsu_43_comments').add(payload)
        .catch(err => {
            console.error("Gagal mengirim komentar: ", err);
            alert("Gagal mengirim komentar. Silakan coba lagi.");
        });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}