// File: js/forum/script_forum_actions.js (🛡️)
// (🏖️) PERBAIKAN: Menambahkan listener klik untuk SPOILER
// (🛡️) PERBAIKAN: Menambahkan logika `isAdmin` pada `showEditModal`

let db, elements, appState, paginationControls, FieldValue;

/**
 * Inisialisasi listener untuk aksi pesan
 */
export function setupActions(firestoreDb, domElements, appStateRef, paginationCtrls, firebaseFieldValue) {
    db = firestoreDb;
    elements = domElements;
    appState = appStateRef;
    paginationControls = paginationCtrls;
    FieldValue = firebaseFieldValue; // Simpan FieldValue yang benar

    // Listener klik utama
    elements.forumRoot.addEventListener('click', handleForumClick);
}
/**
 * Handler utama untuk semua klik di dalam #forum-root
 */
async function handleForumClick(e) {
    
    const spoilerWrapper = e.target.closest('.spoiler-image-wrapper');
    if (spoilerWrapper) {
        e.preventDefault(); 
        spoilerWrapper.classList.toggle('unspoiled');
        return; 
    }
    
    if (!appState.currentUser) return; 

    const replyLink = e.target.closest('a[data-reply-id]');
    if (replyLink) {
        e.preventDefault();
        const messageId = replyLink.dataset.replyId;
        await paginationControls.findAndGoToMessage(messageId);
        return;
    }

    const target = e.target.closest('.chat-action-btn');
    if (!target) return; 

    const messageId = target.dataset.id;
    const action = target.dataset.action;
    if (!messageId || !action) return; 

    const messageRef = db.collection('forumMessages').doc(messageId);
    appState.messageRefToActOn = messageRef;
    appState.messageDataToActOn = appState.allMessagesData.get(messageId) || null;

    try {
        switch (action) {
            case 'delete':
                if (appState.isAdmin) {
                    elements.adminDeleteModal.classList.add('active');
                } else {
                    elements.userDeleteModal.classList.add('active');
                }
                break;
            case 'pin':
                if (appState.isAdmin) {
                    const isCurrentlyPinned = target.dataset.pinned === 'true';
                    await messageRef.update({ isPinned: !isCurrentlyPinned });
                }
                break;
            case 'like':
                await handleVote('like', messageRef, appState.currentUser.uid);
                break;
            case 'dislike':
                await handleVote('dislike', messageRef, appState.currentUser.uid);
                break;
            case 'reply':
                // (PERUBAHAN) Tampilkan form secara manual
                elements.chatFormContainer.style.display = 'block';
                elements.showChatToggleBtn.style.display = 'none';

                // Lanjutkan logika balasan
                appState.currentReplyInfo = { 
                    id: messageId, 
                    name: appState.messageDataToActOn.userName || 'Anonim', 
                    publicId: messageId.slice(-6).toUpperCase(), 
                    text: appState.messageDataToActOn.text 
                };
                elements.replyInfoName.textContent = `${appState.currentReplyInfo.name} (#${appState.currentReplyInfo.publicId})`;
                elements.replyInfoBox.style.display = 'flex';
                elements.chatTextInput.focus();
                break;
            case 'edit':
                showEditModal();
                break;
            case 'toggle-history':
                const originalTextEl = document.querySelector(`#${messageId} .original-deleted-text`);
                if (originalTextEl) {
                    originalTextEl.classList.toggle('visible');
                    target.textContent = originalTextEl.classList.contains('visible') ? '[Hide Original]' : '[Show Original]';
                } else {
                    showEditModal();
                }
                break;
        }
    } catch (error) {
        console.error(`Gagal melakukan aksi '${action}':`, error);
    }
}

/**
 * Logika Transaksi untuk Vote (Like/Dislike)
 */
async function handleVote(voteType, messageRef, uid) {
    const voteCollection = voteType === 'like' ? 'likes' : 'dislikes';
    const oppositeCollection = voteType === 'like' ? 'dislikes' : 'likes';
    const countField = voteType === 'like' ? 'likeCount' : 'dislikeCount';
    const oppositeCountField = voteType === 'like' ? 'dislikeCount' : 'likeCount';

    const voteRef = messageRef.collection(voteCollection).doc(uid);
    const oppositeVoteRef = messageRef.collection(oppositeCollection).doc(uid);

    try {
        await db.runTransaction(async (transaction) => {
            const voteDoc = await transaction.get(voteRef);
            const oppositeVoteDoc = await transaction.get(oppositeVoteRef);

            let newCount = FieldValue.increment(1);
            
            if (voteDoc.exists) {
                transaction.delete(voteRef);
                newCount = FieldValue.increment(-1);
            } else {
                transaction.set(voteRef, { timestamp: FieldValue.serverTimestamp() });
                newCount = FieldValue.increment(1);
            }
            
            transaction.update(messageRef, { [countField]: newCount });

            if (oppositeVoteDoc.exists) {
                transaction.delete(oppositeVoteRef);
                transaction.update(messageRef, { [oppositeCountField]: FieldValue.increment(-1) });
            }
        });
    } catch (e) {
        console.error("Transaksi vote gagal:", e);
    }
}

/**
 * Menampilkan modal edit
 */
function showEditModal() {
    if (!appState.messageDataToActOn) return;
    
    // (🛡️) PERBAIKAN: Ubah teks modal berdasarkan status admin
    const modalText = elements.editModal.querySelector('p');
    if (appState.isAdmin) {
        modalText.textContent = "Admin dapat mengedit pesan ini kapan saja.";
    } else {
        modalText.textContent = "Anda hanya dapat mengedit pesan ini dalam 5 menit setelah dikirim.";
    }
    // (🛡️) SELESAI
    
    elements.editTextInput.value = appState.messageDataToActOn.text;
    elements.editHistoryList.innerHTML = '';
    
    if (appState.isAdmin && appState.messageDataToActOn.editHistory && appState.messageDataToActOn.editHistory.length > 0) {
        elements.editHistoryContainer.style.display = 'block';
        [...appState.messageDataToActOn.editHistory].reverse().forEach(edit => {
            // (👍) Perbaikan: Memeriksa 'editedAt' sebelum memanggil 'toDate'
            const editTime = edit.editedAt && edit.editedAt.toDate ? 
                             edit.editedAt.toDate().toLocaleString('id-ID') : 
                             new Date(edit.editedAt).toLocaleString('id-ID'); // Fallback untuk new Date()
            
            elements.editHistoryList.innerHTML += `<p><b>${editTime}:</b> <i>${(edit.oldText || '').replace(/</g, "&lt;")}</i></p>`;
        });
    } else {
        elements.editHistoryContainer.style.display = 'none';
    }
    
    elements.editModal.classList.add('active');
    elements.editTextInput.focus();
}