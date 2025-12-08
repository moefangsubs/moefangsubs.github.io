// File: js/forum/script_forum_auth.js (FIX 1)
// PERBAIKAN: Menghapus loop "Mengecek status..." dan langsung memeriksa auth.currentUser

// Fungsi ini di-impor dan dipanggil oleh script_forum_main.js
export function setupAuthHandling(auth, db, elements, appState, paginationControls) {

    const { loadPinnedMessages, findAndGoToMessage, goToPage } = paginationControls;

    /**
     * Cek apakah user yang login adalah admin
     */
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

    /**
     * Fungsi untuk menangani status login (dipanggil sekali saat muat & saat berubah)
     */
    async function handleAuthState(user) {
        if (user) {
            // --- PENGGUNA LOGIN ---
            appState.currentUser = user;
            await checkAdminStatus(user.uid); 
            
            // (PERUBAHAN) Tampilkan tombol toggle, BUKAN form
            elements.chatFormContainer.style.display = 'none'; 
            elements.showChatToggleBtn.style.display = 'flex'; // Tampilkan tombol bubble
            elements.chatLoginPrompt.style.display = 'none'; 
            
            if (elements.loadingPlaceholder) {
                elements.loadingPlaceholder.style.display = 'none';
            }
            
            loadPinnedMessages();
            
            if (appState.initialHash) {
                await findAndGoToMessage(appState.initialHash);
            } else {
                await goToPage(1);
            }

        } else {
            // --- PENGGUNA LOGOUT ---
            appState.currentUser = null;
            appState.isAdmin = false;
            
            // (PERUBAHAN) Sembunyikan form DAN tombol toggle
            elements.chatFormContainer.style.display = 'none'; 
            elements.showChatToggleBtn.style.display = 'none'; // Sembunyikan tombol bubble
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

    // --- PERBAIKAN (FIX 1) ---
    auth.onAuthStateChanged(handleAuthState);

    const currentUser = auth.currentUser;
    if (currentUser) {
        handleAuthState(currentUser);
    } else {
        handleAuthState(null);
    }
}