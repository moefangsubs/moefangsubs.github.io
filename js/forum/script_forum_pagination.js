// File: js/forum/script_forum_pagination.js (😎)
// PERBAIKAN:
// 1. Membalik urutan render pesan (terbaru di bawah).
// 2. Menyesuaikan logika 'startAfter' dan 'startAt' untuk 'desc' query.

import { renderMessage } from './script_forum_render.js';

let db, elements, appState;

// --- Fungsi Paginasi ---

/**
 * Inisialisasi modul paginasi
 */
export function setupPagination(firestoreDb, domElements, appStateRef) {
    db = firestoreDb;
    elements = domElements;
    appState = appStateRef;

    // Listener tombol paginasi
    [elements.prevPageBtnTop, elements.prevPageBtnBottom].forEach(btn => {
        btn.addEventListener('click', () => goToPage(appState.currentPage - 1));
    });
    [elements.nextPageBtnTop, elements.nextPageBtnBottom].forEach(btn => {
        btn.addEventListener('click', () => goToPage(appState.currentPage + 1));
    });

    return { loadPinnedMessages, goToPage, findAndGoToMessage, checkUrlHash, getCurrentPage };
}

/**
 * Mendapatkan halaman saat ini (untuk modul lain)
 */
export function getCurrentPage() {
    return appState.currentPage;
}

/**
 * Memperbarui UI tombol/info paginasi
 */
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

/**
 * Memuat pesan yang di-pin
 */
export function loadPinnedMessages() {
    if (appState.pinnedMessagesListener) appState.pinnedMessagesListener();

    const query = db.collection('forumMessages')
        .where('isPinned', '==', true)
        .orderBy('timestamp', 'desc'); // Pinned tetap terbaru di atas

    appState.pinnedMessagesListener = query.onSnapshot(snapshot => {
        elements.pinnedMessagesContainer.innerHTML = '';
        const tempMap = new Map(appState.allMessagesData);
        snapshot.docs.forEach(doc => {
            appState.allMessagesData.set(doc.id, doc.data()); // Pastikan data pin ada di map
            tempMap.set(doc.id, doc.data());
        });
        
        // Render Pinned (tidak dibalik, terbaru di atas)
        snapshot.docs.forEach(doc => {
            const element = renderMessage(doc, tempMap, appState.currentUser, appState.isAdmin);
            elements.pinnedMessagesContainer.appendChild(element);
        });
    }, error => {
        console.error("Gagal memuat pesan pinned:", error);
        elements.pinnedMessagesContainer.innerHTML = '<p style="color: red;">Gagal memuat pesan pinned.</p>';
    });
}

/**
 * Pindah ke halaman spesifik
 * @param {number} page - Nomor halaman tujuan
 */
export async function goToPage(page) {
    if (appState.isLoadingPage) return;
    appState.isLoadingPage = true;

    if (page < 1) {
        page = 1;
        appState.isLoadingPage = false;
        return;
    }

    if (appState.messagesListener) appState.messagesListener();
    
    elements.chatFeed.innerHTML = '';
    elements.loadingPlaceholder.style.display = 'block';
    
    let query = db.collection('forumMessages')
                  .where('isPinned', '==', false)
                  .orderBy('timestamp', 'desc') // Tetap 'desc' (terbaru dulu)
                  .limit(appState.MESSAGES_PER_PAGE);

    // Logika Paginasi (Query 'desc')
    if (page > appState.currentPage && appState.lastVisibleDoc) {
        // "Next" (ke halaman lebih LAMA)
        query = query.startAfter(appState.lastVisibleDoc);
    } else if (page < appState.currentPage && appState.pageSnapshots[page]) {
        // "Prev" (ke halaman lebih BARU)
        query = query.startAt(appState.pageSnapshots[page]);
    } else if (page > 1) {
        // Jika cache tidak ada (misal: refresh di halaman 3)
        // Kita harus mengambil dokumen startAfter untuk halaman tsb
        try {
            const startAtQuery = db.collection('forumMessages')
                                    .where('isPinned', '==', false)
                                    .orderBy('timestamp', 'desc')
                                    .limit((page - 1) * appState.MESSAGES_PER_PAGE);
            
            const startAtSnapshot = await startAtQuery.get();
            const lastDocOfPrevPage = startAtSnapshot.docs[startAtSnapshot.docs.length - 1];
            
            if (lastDocOfPrevPage) {
                query = query.startAfter(lastDocOfPrevPage);
            }
        } catch (err) {
            console.error("Gagal menghitung startAt untuk halaman:", err);
        }
    }
    // Jika page == 1, tidak perlu startAt/startAfter

    appState.messagesListener = query.onSnapshot(snapshot => {
        elements.loadingPlaceholder.style.display = 'none';
        elements.chatFeed.innerHTML = '';
        
        if (snapshot.empty && page === 1) {
            elements.loadingPlaceholder.textContent = 'Belum ada pesan.';
            elements.loadingPlaceholder.style.display = 'block';
            appState.isLastPage = true;
        } else if (snapshot.empty) {
            appState.isLastPage = true;
        } else {
            appState.isLastPage = snapshot.docs.length < appState.MESSAGES_PER_PAGE;
        }

        appState.firstVisibleDoc = snapshot.docs[0];
        appState.lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
        
        if (page === 1) appState.pageSnapshots = [null]; 
        if (!appState.pageSnapshots[page]) appState.pageSnapshots[page] = appState.firstVisibleDoc;

        appState.currentPage = page;
        
        snapshot.docs.forEach(doc => appState.allMessagesData.set(doc.id, doc.data()));

        // --- PERBAIKAN (😎) POIN 1 ---
        // Balik array-nya sebelum di-render
        // Ini membuat pesan terlama di halaman muncul di atas, terbaru di bawah.
        snapshot.docs.reverse().forEach(doc => {
            const element = renderMessage(doc, appState.allMessagesData, appState.currentUser, appState.isAdmin);
            elements.chatFeed.appendChild(element);
        });
        // ------------------------------

        updatePaginationUI();
        appState.isLoadingPage = false;
        
        checkUrlHash(); // Cek jika kita perlu scroll ke hash

    }, error => {
        console.error(`Gagal memuat halaman ${page}:`, error);
        elements.chatFeed.innerHTML = '<p style="color: red;">Gagal memuat chat. Coba refresh.</p>';
        appState.isLoadingPage = false;
    });
}

/**
 * Mencari pesan berdasarkan ID dan pindah ke halaman yang benar
 * @param {string} messageId - ID Dokumen pesan
 */
export async function findAndGoToMessage(messageId) {
    const element = document.getElementById(messageId);
    if (element) {
        // Pesan sudah ada di halaman (mungkin di pinned)
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.querySelector('.chat-message').style.animation = 'highlight-message 2s ease';
        setTimeout(() => {
            if (element.querySelector('.chat-message')) { // Cek jika elemen masih ada
                element.querySelector('.chat-message').style.animation = '';
            }
        }, 2000);
        return;
    }

    try {
        // 1. Ambil dokumen pesan untuk mendapatkan timestamp-nya
        const docSnap = await db.collection('forumMessages').doc(messageId).get();
        if (!docSnap.exists) {
            alert('Pesan yang dibalas tidak dapat ditemukan (mungkin telah dihapus permanen).');
            return;
        }

        // Cek jika pesan di-pin
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

        // 2. Hitung ada berapa pesan yang LEBIH BARU dari pesan ini
        const newerMessagesQuery = await db.collection('forumMessages')
                                    .where('isPinned', '==', false)
                                    .orderBy('timestamp', 'desc') // 'desc' adalah urutan alami kita
                                    .startAt(docTimestamp) // Mulai dari pesan itu sendiri
                                    .get();

        const messageIndex = newerMessagesQuery.docs.findIndex(doc => doc.id === messageId);
        
        if (messageIndex === -1) {
             throw new Error("Pesan tidak ditemukan dalam penghitungan indeks.");
        }
        
        // 3. Hitung halaman target
        const targetPage = Math.floor(messageIndex / appState.MESSAGES_PER_PAGE) + 1;

        appState.initialHash = messageId; // Simpan hash agar di-scroll setelah halaman dimuat

        if (targetPage === appState.currentPage) {
            checkUrlHash(); // Sudah di halaman yang benar, cukup scroll
        } else {
            await goToPage(targetPage); // Pindah halaman
        }

    } catch (error) {
        console.error("Gagal mencari pesan:", error);
        alert("Gagal melompat ke pesan yang dibalas. Error: " + error.message);
    }
}

/**
 * Cek URL hash dan scroll ke pesan jika ada
 */
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