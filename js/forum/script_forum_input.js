let db, elements, appState, paginationControls, FieldValue;
let lastScrollTop = 0; 

export function setupInput(firestoreDb, domElements, appStateRef, paginationCtrls, firebaseFieldValue) {
    db = firestoreDb;
    elements = domElements;
    appState = appStateRef;
    paginationControls = paginationCtrls;
    FieldValue = firebaseFieldValue; 

    function showChatForm() {
        if (appState.currentUser) {
            elements.chatFormContainer.style.display = 'block';
            elements.showChatToggleBtn.style.display = 'none';
            elements.chatTextInput.focus();
        }
    }
    
    function hideChatForm() {
        elements.chatFormContainer.style.display = 'none';
        if (appState.currentUser) {
            elements.showChatToggleBtn.style.display = 'block';
        }
        appState.currentReplyInfo = null;
        elements.replyInfoBox.style.display = 'none';
    }

    elements.showChatToggleBtn.addEventListener('click', showChatForm);
	
    elements.chatForm.addEventListener('submit', (e) => handleChatSubmit(e, hideChatForm));
	
    elements.toolbar.addEventListener('click', (e) => handleToolbarClick(e, hideChatForm));
    elements.chatTextInput.addEventListener('keyup', updateCursorPosition);
    elements.chatTextInput.addEventListener('click', updateCursorPosition);
    
    elements.confirmBtnNoUserDelete.addEventListener('click', () => elements.userDeleteModal.classList.remove('active'));
    elements.confirmBtnYesUserDelete.addEventListener('click', handleUserSoftDelete);

    elements.confirmBtnNoAdminDelete.addEventListener('click', () => elements.adminDeleteModal.classList.remove('active'));
    elements.confirmBtnSoftDeleteAdmin.addEventListener('click', handleAdminSoftDelete);
    elements.confirmBtnPermDeleteAdmin.addEventListener('click', handleAdminPermDelete);

    elements.confirmBtnNoEdit.addEventListener('click', () => elements.editModal.classList.remove('active'));
    elements.confirmBtnYesEdit.addEventListener('click', handleEditSave);

    elements.confirmBtnNoImage.addEventListener('click', () => elements.imagePromptOverlay.classList.remove('active'));
    elements.pasteBtnImage.addEventListener('click', handleImagePaste);
    elements.confirmBtnYesImage.addEventListener('click', handleImageInsert);
    
    elements.cancelReplyBtn.addEventListener('click', () => {
        appState.currentReplyInfo = null;
        elements.replyInfoBox.style.display = 'none';
    });
}

async function handleChatSubmit(e, hideChatForm) {
    e.preventDefault();
    if (!appState.currentUser) return;

    const text = elements.chatTextInput.value;
    if (text.trim() === '') return; 

    try {
        let newMessage = {
            text: text,
            originalText: text, 
            userId: appState.currentUser.uid,
            userName: appState.currentUser.displayName,
            userPhotoURL: appState.currentUser.photoURL,
            timestamp: FieldValue.serverTimestamp(),
            isAdminPost: appState.isAdmin,
            isPinned: false,
            isDeleted: false,
            deletedBy: null,
            isEdited: false,
            editHistory: [],
            lastEdited: null,
            likeCount: 0,
            dislikeCount: 0,
            replyToId: null,
            replyToName: null,
            replyToPublicId: null,
            replyToText: null,
            autoCollage: elements.collageToggle.checked 
        };
        
        if (appState.currentReplyInfo) {
            newMessage.replyToId = appState.currentReplyInfo.id;
            newMessage.replyToName = appState.currentReplyInfo.name;
            newMessage.replyToPublicId = appState.currentReplyInfo.publicId;
            newMessage.replyToText = appState.currentReplyInfo.text.substring(0, 50);
        }

        await db.collection('forumMessages').add(newMessage);

        elements.chatTextInput.value = '';
        appState.currentReplyInfo = null;
        elements.replyInfoBox.style.display = 'none';
        
        if (hideChatForm) hideChatForm();

        if (paginationControls.getCurrentPage() !== 1) {
            paginationControls.goToPage(1);
        }
        
    } catch (error) {
        console.error("Gagal mengirim pesan:", error);
    }
}

function updateCursorPosition() {
    appState.lastCursorPosition = elements.chatTextInput.selectionStart;
}

/**
 * Membungkus teks yang dipilih dengan tag
 * @param {string} tag - Tag HTML (cth: 'b', 'i')
 */
function wrapText(tag) {
    const start = elements.chatTextInput.selectionStart;
    const end = elements.chatTextInput.selectionEnd;
    const text = elements.chatTextInput.value;
    const selectedText = text.substring(start, end);

    let replacement = selectedText ? `<${tag}>${selectedText}</${tag}>` : `<${tag}></${tag}>`;
    
    elements.chatTextInput.value = text.substring(0, start) + replacement + text.substring(end);
    
    let cursorPosition = selectedText ? start + replacement.length : start + tag.length + 2;
    elements.chatTextInput.selectionStart = cursorPosition;
    elements.chatTextInput.selectionEnd = cursorPosition;
    elements.chatTextInput.focus();
}

function handleToolbarClick(e, hideChatForm) { 
    const target = e.target.closest('.format-btn');
    
    if (!target) {
        return;
    }
    
    if (target.id === 'close-chat-form-btn') {
        if (hideChatForm) hideChatForm();
        return;
    }
    
    updateCursorPosition();
    
    if (target.id === 'format-btn-bold') wrapText('b');
    if (target.id === 'format-btn-italic') wrapText('i');
    if (target.id === 'format-btn-underline') wrapText('u');
    if (target.id === 'format-btn-image') {
        elements.imageUrlInput.value = ''; 
        elements.imageSpoilerCheckbox.checked = false; 
        elements.imagePromptOverlay.classList.add('active');
        elements.imageUrlInput.focus();
    }
}

async function handleUserSoftDelete() {
    if (appState.messageRefToActOn) {
        try {
            await appState.messageRefToActOn.update({
                text: "[Dihapus oleh user]",
                originalText: appState.messageDataToActOn.text, 
                isDeleted: true,
                deletedBy: "user"
            });
        } catch (error) { console.error("Gagal soft delete (user):", error); }
        finally {
            elements.userDeleteModal.classList.remove('active');
            appState.messageRefToActOn = null;
        }
    }
}

async function handleAdminSoftDelete() {
    if (appState.messageRefToActOn) {
        try {
            await appState.messageRefToActOn.update({
                text: "[Dihapus oleh administrator]",
                originalText: appState.messageDataToActOn.isDeleted ? appState.messageDataToActOn.originalText : appState.messageDataToActOn.text,
                isDeleted: true,
                deletedBy: "admin"
            });
        } catch (error) { console.error("Gagal soft delete (admin):", error); }
        finally {
            elements.adminDeleteModal.classList.remove('active');
            appState.messageRefToActOn = null;
        }
    }
}

async function handleAdminPermDelete() {
    if (appState.messageRefToActOn) {
        try {
            await appState.messageRefToActOn.delete();
        } catch (error) { console.error("Gagal permanent delete (admin):", error); }
        finally {
            elements.adminDeleteModal.classList.remove('active');
            appState.messageRefToActOn = null;
        }
    }
}

async function handleEditSave() {
    if (appState.messageRefToActOn && appState.messageDataToActOn) {
        const newText = elements.editTextInput.value;
        if (newText === appState.messageDataToActOn.text) {
            elements.editModal.classList.remove('active');
            return;
        }
        
        try {
            await appState.messageRefToActOn.update({
                text: newText,
                isEdited: true,
                lastEdited: FieldValue.serverTimestamp(), 
                editHistory: FieldValue.arrayUnion({
                    oldText: appState.messageDataToActOn.text,
                    editedAt: new Date() 
                })
            });
        } catch (error) { 
            console.error("Gagal menyimpan editan:", error); 
            alert("Gagal menyimpan editan. Cek console untuk detail.");
        }
        finally {
            elements.editModal.classList.remove('active');
            appState.messageRefToActOn = null;
        }
    }
}

async function handleImagePaste() {
    try {
        if (navigator.clipboard && navigator.clipboard.readText) {
            const text = await navigator.clipboard.readText();
            elements.imageUrlInput.value = text;
            elements.imageUrlInput.focus();
        } else {
            alert('Gagal paste otomatis. Silakan gunakan Ctrl+V.');
        }
    } catch (err) { alert('Gagal paste dari clipboard. Silakan gunakan Ctrl+V.'); }
}

function handleImageInsert() {
    const url = elements.imageUrlInput.value.trim();
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
        
        const isSpoiler = elements.imageSpoilerCheckbox.checked;
        const spoilerAttr = isSpoiler ? ' spoiler="true"' : '';
        const tag = `<img${spoilerAttr}>${url}</img>`; 
        
        const text = elements.chatTextInput.value;
        const newText = text.substring(0, appState.lastCursorPosition) + tag + text.substring(appState.lastCursorPosition);
        elements.chatTextInput.value = newText;
        const newCursorPosition = appState.lastCursorPosition + tag.length;
        elements.chatTextInput.selectionStart = newCursorPosition;
        elements.chatTextInput.selectionEnd = newCursorPosition;
        elements.imagePromptOverlay.classList.remove('active');
        elements.chatTextInput.focus();
    } else {
        alert("URL tidak valid. Harap masukkan URL lengkap (http:// atau https://).");
    }
}
