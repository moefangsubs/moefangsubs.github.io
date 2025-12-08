let db, elements, appState, paginationControls, FieldValue;
export function setupActions(firestoreDb, domElements, appStateRef, paginationCtrls, firebaseFieldValue) {
    db = firestoreDb;
    elements = domElements;
    appState = appStateRef;
    paginationControls = paginationCtrls;
    FieldValue = firebaseFieldValue; 
    elements.forumRoot.addEventListener('click', handleForumClick);
}
async function handleForumClick(e) {
    const oshiExpandBtn = e.target.closest('.oshi-expand-btn');
    if (oshiExpandBtn) {
        e.preventDefault();
        const oshiList = oshiExpandBtn.previousElementSibling;
        const currentMode = oshiExpandBtn.dataset.mode;
        const memberMap = window.appState ? window.appState.memberMap : new Map();
        const allOshiString = oshiExpandBtn.dataset.allOshi;
        const allOshi = allOshiString ? JSON.parse(allOshiString) : [];
        if (currentMode === 'collapsed') {
            let html = '';
            allOshi.forEach(oshi => {
                const nama = memberMap.get(oshi.id) || oshi.id;
                html += `<span class="oshi-item ${oshi.group} ${oshi.isKamioshi ? 'kamioshi' : ''}">${nama}</span>`;
            });
            oshiList.innerHTML = html;
            oshiList.classList.add('expanded');
            oshiExpandBtn.textContent = oshiExpandBtn.dataset.textExpanded;
            oshiExpandBtn.dataset.mode = 'expanded';
        } else {
            let kamioshi = [];
            if (allOshi.length > 0) {
                 kamioshi = allOshi.filter(o => o.isKamioshi);
            }
            let itemsToShow = [];
            if (kamioshi.length > 0) {
                itemsToShow = kamioshi;
            } else {
                itemsToShow = allOshi.slice(0, 6);
            }
            let html = '';
            itemsToShow.forEach(oshi => {
                const nama = memberMap.get(oshi.id) || oshi.id;
                html += `<span class="oshi-item ${oshi.group} ${oshi.isKamioshi ? 'kamioshi' : ''}">${nama}</span>`;
            });
            oshiList.innerHTML = html;
            oshiList.classList.remove('expanded');
            oshiExpandBtn.textContent = oshiExpandBtn.dataset.textCollapsed;
            oshiExpandBtn.dataset.mode = 'collapsed';
        }
        return;
    }
    const userNameEl = e.target.closest('.chat-user-name');
    if (userNameEl && appState.isAdmin && appState.currentUser) {
        e.preventDefault();
        const messageId = userNameEl.closest('.chat-message-wrapper').id;
        const messageData = appState.allMessagesData.get(messageId);
        if (messageData && messageData.userEmail) {
            alert(`Info Admin:\nUser: ${messageData.userName}\nEmail: ${messageData.userEmail}\nUID: ${messageData.userId}`);
        } else if (messageData) {
            alert(`Info Admin:\nUser: ${messageData.userName}\nEmail: (tidak tersimpan)\nUID: ${messageData.userId}`);
        }
        return; 
    }
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
    if (!appState.messageDataToActOn) {
        console.warn("Data pesan tidak ditemukan di cache untuk aksi:", messageId);
        try {
            const doc = await messageRef.get();
            if (doc.exists) appState.messageDataToActOn = doc.data();
        } catch (err) {  }
        if (!appState.messageDataToActOn) return; 
    }
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
                elements.chatFormContainer.style.display = 'block';
                elements.showChatToggleBtn.style.display = 'none';
                appState.currentReplyInfo = { 
                    id: messageId, 
                    name: appState.messageDataToActOn.userName || 'Anonim', 
                    publicId: messageId.slice(-6).toUpperCase(), 
                    text: appState.messageDataToActOn.text,
                    userId: appState.messageDataToActOn.userId 
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
function showEditModal() {
    if (!appState.messageDataToActOn) return;
    const modalText = elements.editModal.querySelector('p');
    if (appState.isAdmin) {
        modalText.textContent = "Admin dapat mengedit pesan ini kapan saja.";
    } else {
        modalText.textContent = "Anda hanya dapat mengedit pesan ini dalam 5 menit setelah dikirim.";
    }
    elements.editTextInput.value = appState.messageDataToActOn.text;
    elements.editHistoryList.innerHTML = '';
    if (appState.isAdmin && appState.messageDataToActOn.editHistory && appState.messageDataToActOn.editHistory.length > 0) {
        elements.editHistoryContainer.style.display = 'block';
        [...appState.messageDataToActOn.editHistory].reverse().forEach(edit => {
            const editTime = edit.editedAt && edit.editedAt.toDate ? 
                             edit.editedAt.toDate().toLocaleString('id-ID') : 
                             new Date(edit.editedAt).toLocaleString('id-ID'); 
            elements.editHistoryList.innerHTML += `<p><b>${editTime}:</b> <i>${(edit.oldText || '').replace(/</g, "&lt;")}</i></p>`;
        });
    } else {
        elements.editHistoryContainer.style.display = 'none';
    }
    elements.editModal.classList.add('active');
    elements.editTextInput.focus();
}