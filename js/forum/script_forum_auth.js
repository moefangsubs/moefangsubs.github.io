export function setupAuthHandling(auth, db, elements, appState, paginationControls) {

    const { loadPinnedMessages, findAndGoToMessage, goToPage } = paginationControls;

    async function checkAdminStatus(uid) {
        if (!uid) { appState.isAdmin = false; return; }
        if (appState.adminList[uid]) { appState.isAdmin = true; return; }
        try {
            const adminDoc = await db.collection('admins').doc(uid).get();
            if (adminDoc.exists) {
                appState.isAdmin = true;
                appState.adminList[uid] = true; 
            } else {
                appState.isAdmin = false;
            }
        } catch (error) {
            console.error("Gagal memeriksa status admin:", error);
            appState.isAdmin = false;
        }
    }

    async function handleAuthState(user) {
        if (user) {
            // --- PENGGUNA LOGIN ---
            appState.currentUser = user;
            await checkAdminStatus(user.uid); 
            
            elements.chatFormContainer.style.display = 'none'; 
            elements.showChatToggleBtn.style.display = 'flex';
            elements.chatLoginPrompt.style.display = 'none'; 
            
            if (elements.loadingPlaceholder) {
                elements.loadingPlaceholder.style.display = 'none';
            }
            
            loadPinnedMessages();
			
        } else {
            appState.currentUser = null;
            appState.isAdmin = false;
            
            appState.initialLoadGoToLastPage = true; 
            
            elements.chatFormContainer.style.display = 'none'; 
            elements.showChatToggleBtn.style.display = 'none';
            elements.chatLoginPrompt.style.display = 'block'; 
            
            elements.chatFeed.innerHTML = ''; 
            elements.pinnedMessagesContainer.innerHTML = '';
            appState.allMessagesData.clear();
            
            if (appState.pinnedMessagesListener) appState.pinnedMessagesListener();
            if (appState.messagesListener) appState.messagesListener();
            
            elements.paginationTop.style.display = 'none';
            elements.paginationBottom.style.display = 'none';
        }
    }
    return handleAuthState; 
}