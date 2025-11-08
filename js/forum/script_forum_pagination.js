import { renderMessage } from './script_forum_render.js';

let db, elements, appState;

export function setupPagination(firestoreDb, domElements, appStateRef) {
    db = firestoreDb;
    elements = domElements;
    appState = appStateRef;

    [elements.prevPageBtnTop, elements.prevPageBtnBottom].forEach(btn => {
        btn.addEventListener('click', () => goToPage(appState.currentPage - 1));
    });
    [elements.nextPageBtnTop, elements.nextPageBtnBottom].forEach(btn => {
        btn.addEventListener('click', () => goToPage(appState.currentPage + 1));
    });

    return { loadPinnedMessages, goToPage, findAndGoToMessage, checkUrlHash, getCurrentPage };
}

export function getCurrentPage() {
    return appState.currentPage;
}

function updatePaginationUI() {
    const info = `Halaman ${appState.currentPage}`;
    elements.pageInfoTop.textContent = info;
    elements.pageInfoBottom.textContent = info;

    const showPagination = appState.currentPage > 1 || !appState.isLastPage;
    elements.paginationTop.style.display = showPagination ? 'flex' : 'none';
    elements.paginationBottom.style.display = showPagination ? 'flex' : 'none';

    elements.prevPageBtnTop.disabled = appState.currentPage === 1;
    elements.prevPageBtnBottom.disabled = appState.currentPage === 1;
    elements.nextPageBtnTop.disabled = appState.isLastPage;
    elements.nextPageBtnBottom.disabled = appState.isLastPage;
}

export function loadPinnedMessages() {
    if (appState.pinnedMessagesListener) appState.pinnedMessagesListener();

    const query = db.collection('forumMessages')
        .where('isPinned', '==', true)
        .orderBy('timestamp', 'desc');

    appState.pinnedMessagesListener = query.onSnapshot(async (snapshot) => { 

        elements.pinnedMessagesContainer.innerHTML = '';

        const userIds = new Set();
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            appState.allMessagesData.set(doc.id, data);
            userIds.add(data.userId);
        });

        await fetchUserProfiles(Array.from(userIds));

        snapshot.docs.forEach(doc => {
            const element = renderMessage(doc, appState); 

            elements.pinnedMessagesContainer.appendChild(element);
        });
    }, error => {
        console.error("Gagal memuat pesan pinned:", error);
    });
}

export async function goToPage(page) {
    if (appState.isLoadingPage) return;
    appState.isLoadingPage = true;

    if (page < 1) page = 1;

    if (appState.messagesListener) appState.messagesListener();

    elements.chatFeed.innerHTML = '';
    elements.loadingPlaceholder.style.display = 'block';

    let query = db.collection('forumMessages')
                  .where('isPinned', '==', false)
                  .orderBy('timestamp', 'asc')
                  .limit(appState.MESSAGES_PER_PAGE);

    if (page > appState.currentPage && appState.lastVisibleDoc) {
        query = query.startAfter(appState.lastVisibleDoc);
    } else if (page < appState.currentPage && appState.pageSnapshots[page]) {
        query = query.startAt(appState.pageSnapshots[page]);
    } else if (page > 1) {
        try {
            const startAtQuery = db.collection('forumMessages')
                                    .where('isPinned', '==', false)
                                    .orderBy('timestamp', 'asc')
                                    .limit((page - 1) * appState.MESSAGES_PER_PAGE);
            const startAtSnapshot = await startAtQuery.get();
            const lastDocOfPrevPage = startAtSnapshot.docs[startAtSnapshot.docs.length - 1];
            if (lastDocOfPrevPage) {
                query = query.startAfter(lastDocOfPrevPage);
            }
        } catch (err) { console.error("Gagal menghitung startAt:", err); }
    }

    appState.messagesListener = query.onSnapshot(async (snapshot) => { 

        elements.loadingPlaceholder.style.display = 'none';
        elements.chatFeed.innerHTML = '';

        if (snapshot.empty) {
            appState.isLastPage = true;
            if (page === 1) {
                elements.loadingPlaceholder.textContent = 'Belum ada pesan.';
                elements.loadingPlaceholder.style.display = 'block';
            }
        } else {
            appState.isLastPage = snapshot.docs.length < appState.MESSAGES_PER_PAGE;
        }

        appState.firstVisibleDoc = snapshot.docs[0];
        appState.lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];

        if (page === 1) appState.pageSnapshots = [null]; 
        if (!appState.pageSnapshots[page]) appState.pageSnapshots[page] = appState.firstVisibleDoc;

        appState.currentPage = page;

        const userIds = new Set();
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            appState.allMessagesData.set(doc.id, data);
            userIds.add(data.userId);
        });

        await fetchUserProfiles(Array.from(userIds));

        snapshot.docs.forEach(doc => {
            const element = renderMessage(doc, appState); 

            elements.chatFeed.appendChild(element);
        });

        updatePaginationUI();
        appState.isLoadingPage = false;
        checkUrlHash();

    }, error => {
        console.error(`Gagal memuat halaman ${page}:`, error);
        appState.isLoadingPage = false;
    });
}

export async function findAndGoToMessage(messageId) {
    const element = document.getElementById(messageId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.querySelector('.chat-message').style.animation = 'highlight-message 2s ease';
        setTimeout(() => {
            if (element.querySelector('.chat-message')) {
                element.querySelector('.chat-message').style.animation = '';
            }
        }, 2000);
        return;
    }

    try {
        const docSnap = await db.collection('forumMessages').doc(messageId).get();
        if (!docSnap.exists) {
            alert('Pesan yang dibalas tidak dapat ditemukan (mungkin telah dihapus permanen).');
            return;
        }

        // Cek jika pesan di-pin (logika pin tidak berubah)
        if (docSnap.data().isPinned) {
            const pinnedElement = document.getElementById(messageId);
            if(pinnedElement) {
                pinnedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                pinnedElement.querySelector('.chat-message').style.animation = 'highlight-message 2s ease';
                setTimeout(() => {
                    if(pinnedElement.querySelector('.chat-message')) {
                        pinnedElement.querySelector('.chat-message').style.animation = '';
                    }
                }, 2000);
            } else {
                console.warn("Pesan pinned tidak ditemukan di DOM, seharusnya ada.");
            }
            return;
        }

        const docTimestamp = docSnap.data().timestamp;
        const olderMessagesQuery = await db.collection('forumMessages')
                                    .where('isPinned', '==', false)
                                    .orderBy('timestamp', 'asc')
                                    .endAt(docTimestamp)
                                    .get();

        const messageIndex = olderMessagesQuery.docs.length - 1;
        
        if (messageIndex === -1) {
             throw new Error("Pesan tidak ditemukan dalam penghitungan indeks.");
        }
        
        const targetPage = Math.floor(messageIndex / appState.MESSAGES_PER_PAGE) + 1;

        appState.initialHash = messageId; 
        await goToPage(targetPage);

    } catch (error) {
        console.error("Gagal mencari pesan:", error);
        alert("Gagal melompat ke pesan yang dibalas. Error: " + error.message);
    }
}

export function checkUrlHash() {
    if (appState.initialHash) {
        const element = document.getElementById(appState.initialHash);
        if (element) {
            setTimeout(() => { 
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.querySelector('.chat-message').style.animation = 'highlight-message 2s ease';
                setTimeout(() => {
                    if (element.querySelector('.chat-message')) {
                        element.querySelector('.chat-message').style.animation = '';
                    }
                }, 2000);
                appState.initialHash = null; 
            }, 100);
        }
    }
}

async function fetchUserProfiles(userIds) {
    const defaultProfile = { bio: '', oshi: {} };
    const userRefsToFetch = [];

    userIds.forEach(id => {
        if (!appState.userProfiles.has(id)) {
            userRefsToFetch.push(db.collection('users').doc(id).get());
        }
    });

    if (userRefsToFetch.length === 0) return; 

    try {
        const snapshots = await Promise.all(userRefsToFetch);
        snapshots.forEach(doc => {
            if (doc.exists) {
                appState.userProfiles.set(doc.id, doc.data());
            } else {

                appState.userProfiles.set(doc.id, defaultProfile);
            }
        });
    } catch (error) {
        console.error("Gagal mengambil profil pengguna:", error);
    }
}