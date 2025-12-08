document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('allow-copy');
    if (typeof firebase === 'undefined' || typeof firebase.auth === 'undefined' || typeof firebase.firestore === 'undefined') {
        console.error("Firebase SDK tidak dimuat dengan benar. Pastikan firebase-app, firebase-auth, dan firebase-firestore sudah di-impor.");
        document.getElementById('forum-root').innerHTML = '<p style="color: red; text-align: center; padding: 2rem;">Error: Firebase SDK gagal dimuat.</p>';
        return;
    }
    const auth = firebase.auth();
    const db = firebase.firestore();
    const { serverTimestamp, FieldValue } = firebase.firestore;
    const forumHTMLStructure = `
        <div class="forum-chat-wrapper">
            <h2 class="forum-title">FORUM CHAT NOGIZAKA46</h2>
            <div id="pinned-messages-container">
                <!-- Pesan pinned akan diisi di sini -->
            </div>
            <!-- POIN 4: Navigasi Halaman (Atas) -->
            <div class="pagination-container" id="pagination-container-top" style="display: none;">
                <button class="pagination-btn" id="prev-page-btn-top">Sebelumnya</button>
                <span class="pagination-info" id="page-info-top">Halaman 1</span>
                <button class="pagination-btn" id="next-page-btn-top">Berikutnya</button>
            </div>
            <div class="chat-feed-container">
                <div id="chat-feed">
                    <div class="loading-placeholder">
                        <p>Memuat pesan...</p>
                    </div>
                </div>
            </div>
            <!-- POIN 4: Navigasi Halaman (Bawah) -->
            <div class="pagination-container" id="pagination-container-bottom" style="display: none;">
                <button class="pagination-btn" id="prev-page-btn-bottom">Sebelumnya</button>
                <span class="pagination-info" id="page-info-bottom">Halaman 1</span>
                <button class="pagination-btn" id="next-page-btn-bottom">Berikutnya</button>
            </div>
            <!-- Form di 'position: fixed' -->
            <div class="chat-form-container" id="chat-form-container" style="display: none;">
                <div class="reply-info-box" id="reply-info-box" style="display: none;">
                    <span>Membalas <strong id="reply-info-name"></strong>...</span>
                    <button id="cancel-reply-btn">Batal</button>
                </div>
                <!-- POIN 6 & 9: Toolbar Editor Teks dengan SVG dan Style Baru -->
                <div class="chat-toolbar" id="chat-toolbar">
                    <button class="format-btn" id="format-btn-bold" title="Bold"><img src="../sprite/button/chat/bold.svg" alt="Bold"></button>
                    <button class="format-btn" id="format-btn-italic" title="Italic"><img src="../sprite/button/chat/italic.svg" alt="Italic"></button>
                    <button class="format-btn" id="format-btn-underline" title="Underline"><img src="../sprite/button/chat/underline.svg" alt="Underline"></button>
                    <button class="format-btn" id="format-btn-image" title="Gambar"><img src="../sprite/button/chat/image.svg" alt="Image"></button>
                    <div class="collage-toggle" id="collage-toggle">
                        <input type="checkbox" id="collage-toggle-checkbox" checked>
                        <img src="../sprite/button/chat/collage_off.svg" class="collage-off-img" alt="Collage Off">
                        <img src="../sprite/button/chat/collage_on.svg" class="collage-on-img" alt="Collage On">
                        <label for="collage-toggle-checkbox">Auto Kolase</label>
                    </div>
                </div>
                <form id="chat-form">
                    <div class="chat-form-input">
                        <textarea id="chat-text-input" placeholder="Ketik pesan... Gunakan <b>teks</b> untuk bold atau <img>url_gambar</img> untuk gambar." required rows="3"></textarea>
                    </div>
                    <!-- POIN 6: Tombol Kirim SVG -->
                    <button type="submit" class="chat-submit-btn" title="Kirim Pesan">
                        <img src="../sprite/button/chat/send.svg" alt="Kirim">
                    </button>
                </form>
            </div>
            <div class="chat-login-prompt" id="chat-login-prompt" style="display: none;">
                <p>Silakan <a href="index.html" style="text-decoration: underline; font-weight: bold;">login</a> untuk bergabung di forum chat!</p>
            </div>
        </div>
        <!-- --- MODAL-MODAL --- -->
        <!-- POIN 1, 3: Modal Hapus (User) -->
        <div class="confirm-modal-overlay" id="confirm-modal-overlay-user-delete">
            <div class="confirm-modal-wrapper">
                <div class="confirm-modal-shadow"></div>
                <div class="confirm-modal confirm-modal-box active" id="confirm-modal-user-delete">
                    <h3>Hapus Pesan?</h3>
                    <p>Pesan Anda akan disembunyikan dan diganti dengan "[Dihapus oleh user]". Anda yakin?</p>
                    <div class="confirm-modal-buttons">
                        <button class="confirm-btn confirm-btn-no" id="confirm-btn-no-user-delete">Batal</button>
                        <button class="confirm-btn confirm-btn-yes" id="confirm-btn-yes-user-delete">Ya, Hapus</button>
                    </div>
                </div>
                <div class="confirm-modal-border"></div>
            </div>
        </div>
        <!-- POIN 1: Modal Hapus (Admin) -->
        <div class="confirm-modal-overlay" id="confirm-modal-overlay-admin-delete">
            <div class="confirm-modal-wrapper">
                <div class="confirm-modal-shadow"></div>
                <div class="confirm-modal confirm-modal-box active" id="confirm-modal-admin-delete">
                    <h3>Pilihan Admin: Hapus Pesan</h3>
                    <p>Pesan ini dapat dihapus sementara (teks diganti) atau dihapus permanen dari database.</p>
                    <div class="confirm-modal-buttons admin-options">
                        <button class="confirm-btn confirm-btn-soft-delete" id="confirm-btn-soft-delete-admin"><b>Soft Delete</b> (Ganti teks)</button>
                        <button class="confirm-btn confirm-btn-perm-delete" id="confirm-btn-perm-delete-admin"><b>Permanent Delete</b> (Hilang selamanya)</button>
                        <button class="confirm-btn confirm-btn-no" id="confirm-btn-no-admin-delete">Batal</button>
                    </div>
                </div>
                <div class="confirm-modal-border"></div>
            </div>
        </div>
        <!-- POIN 2: Modal Edit Pesan -->
        <div class="confirm-modal-overlay" id="confirm-modal-overlay-edit">
            <div class="confirm-modal-wrapper">
                <div class="confirm-modal-shadow"></div>
                <div class="confirm-modal confirm-modal-box active" id="confirm-modal-edit">
                    <h3>Edit Pesan</h3>
                    <p>Anda hanya dapat mengedit pesan ini dalam 5 menit setelah dikirim.</p>
                    <textarea id="edit-text-input"></textarea>
                    <div id="edit-history-container" style="display: none;">
                        <h4>Riwayat Editan (Admin Only)</h4>
                        <div id="edit-history-list"></div>
                    </div>
                    <div class="confirm-modal-buttons">
                        <button class="confirm-btn confirm-btn-no" id="confirm-btn-no-edit">Batal</button>
                        <button class="confirm-btn confirm-btn-save" id="confirm-btn-yes-edit">Simpan</button>
                    </div>
                </div>
                <div class="confirm-modal-border"></div>
            </div>
        </div>
        <!-- Modal Input Gambar -->
        <div class="confirm-modal-overlay" id="image-prompt-overlay">
            <div class="confirm-modal-wrapper">
                <div class="confirm-modal-shadow"></div>
                <div class="confirm-modal confirm-modal-box active image-prompt" id="confirm-modal-image">
                    <h3>Sisipkan Gambar</h3>
                    <p>Paste URL gambar (http: 
                    <div class="modal-input-group">
                        <input type="text" id="image-url-input" class="confirm-modal-input" placeholder="https://...">
                        <button class="paste-btn" id="paste-btn-image" title="Paste">PASTE</button>
                    </div>
                    <div class="confirm-modal-buttons">
                        <button class="confirm-btn confirm-btn-no" id="confirm-btn-no-image">Batal</button>
                        <button class="confirm-btn confirm-btn-yes" id="confirm-btn-yes-image">OK</button>
                    </div>
                </div>
                <div class="confirm-modal-border"></div>
            </div>
        </div>
    `;
    const forumRoot = document.getElementById('forum-root');
    if (!forumRoot) {
        console.error("#forum-root tidak ditemukan!");
        return;
    }
    forumRoot.innerHTML = forumHTMLStructure;
    document.body.style.paddingBottom = "200px";
    const chatFeed = document.getElementById('chat-feed');
    const pinnedMessagesContainer = document.getElementById('pinned-messages-container');
    const loadingPlaceholder = document.querySelector('.loading-placeholder');
    const chatFormContainer = document.getElementById('chat-form-container');
    const chatLoginPrompt = document.getElementById('chat-login-prompt');
    const chatForm = document.getElementById('chat-form');
    const chatTextInput = document.getElementById('chat-text-input');
    const replyInfoBox = document.getElementById('reply-info-box');
    const replyInfoName = document.getElementById('reply-info-name');
    const cancelReplyBtn = document.getElementById('cancel-reply-btn');
    const toolbar = document.getElementById('chat-toolbar');
    const collageToggle = document.getElementById('collage-toggle-checkbox');
    const collageToggleLabel = document.getElementById('collage-toggle');
    const userDeleteModal = document.getElementById('confirm-modal-overlay-user-delete');
    const confirmBtnYesUserDelete = document.getElementById('confirm-btn-yes-user-delete');
    const confirmBtnNoUserDelete = document.getElementById('confirm-btn-no-user-delete');
    const adminDeleteModal = document.getElementById('confirm-modal-overlay-admin-delete');
    const confirmBtnSoftDeleteAdmin = document.getElementById('confirm-btn-soft-delete-admin');
    const confirmBtnPermDeleteAdmin = document.getElementById('confirm-btn-perm-delete-admin');
    const confirmBtnNoAdminDelete = document.getElementById('confirm-btn-no-admin-delete');
    const editModal = document.getElementById('confirm-modal-overlay-edit');
    const editTextInput = document.getElementById('edit-text-input');
    const editHistoryContainer = document.getElementById('edit-history-container');
    const editHistoryList = document.getElementById('edit-history-list');
    const confirmBtnYesEdit = document.getElementById('confirm-btn-yes-edit');
    const confirmBtnNoEdit = document.getElementById('confirm-btn-no-edit');
    const imagePromptOverlay = document.getElementById('image-prompt-overlay');
    const imageUrlInput = document.getElementById('image-url-input');
    const confirmBtnYesImage = document.getElementById('confirm-btn-yes-image');
    const confirmBtnNoImage = document.getElementById('confirm-btn-no-image');
    const pasteBtnImage = document.getElementById('paste-btn-image');
    const paginationTop = document.getElementById('pagination-container-top');
    const paginationBottom = document.getElementById('pagination-container-bottom');
    const prevPageBtnTop = document.getElementById('prev-page-btn-top');
    const nextPageBtnTop = document.getElementById('next-page-btn-top');
    const pageInfoTop = document.getElementById('page-info-top');
    const prevPageBtnBottom = document.getElementById('prev-page-btn-bottom');
    const nextPageBtnBottom = document.getElementById('next-page-btn-bottom');
    const pageInfoBottom = document.getElementById('page-info-bottom');
    let currentUser = null;
    let isAdmin = false;
    let adminList = {};
    let currentReplyInfo = null; 
    let messageRefToActOn = null;
    let messageDataToActOn = null;
    let lastCursorPosition = 0;
    let allMessagesData = new Map();
    let pinnedMessagesListener = null;
    let messagesListener = null;
    const MESSAGES_PER_PAGE = 25;
    let currentPage = 1;
    let isLastPage = false;  
    let lastVisibleDoc = null; 
    let firstVisibleDoc = null;
    let pageSnapshots = [null];  
    let isLoadingPage = false;
    let authCheckCompleted = false;
    async function checkAdminStatus(uid) {
        if (!uid) { isAdmin = false; return; }
        if (adminList[uid]) { isAdmin = true; return; }
        try {
            const adminDoc = await db.collection('admins').doc(uid).get();
            if (adminDoc.exists) {
                isAdmin = true;
                adminList[uid] = true; 
            } else {
                isAdmin = false;
            }
        } catch (error) {
            console.error("Gagal memeriksa status admin:", error);
            isAdmin = false;
        }
    }
    function formatMessageText(data, messageDataMap) {
        let text = data.text || '';
        if (data.isDeleted) {
            if (isAdmin) {
                const originalText = data.originalText || data.text;
                return `<span class="deleted-text">${data.text}</span>
                        <div class="original-deleted-text">
                            <b>Teks Asli:</b> ${originalText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                        </div>`;
            } else {
                return `<span class="deleted-text">${data.text}</span>`;
            }
        }
        let safeText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const imageUrls = [];
        const imgRegex = /&lt;img&gt;(.*?)&lt;\/img&gt;/gi;
        safeText = safeText.replace(imgRegex, (match, url) => {
            if (url.startsWith('http://') || url.startsWith('https://')) {
                imageUrls.push(url);
            }
            return ''; 
        });
        safeText = safeText.replace(/&lt;b&gt;(.*?)&lt;\/b&gt;/gi, '<strong>$1</strong>');
        safeText = safeText.replace(/&lt;i&gt;(.*?)&lt;\/i&gt;/gi, '<i>$1</i>');
        safeText = safeText.replace(/&lt;u&gt;(.*?)&lt;\/u&gt;/gi, '<u>$1</u>');
        safeText = safeText.replace(/&lt;list&gt;([\s\S]*?)&lt;\/list&gt;/gi, (match, items) => {
            const listItems = items.trim().split('\n');
            let htmlList = '<ul>';
            listItems.forEach(item => {
                if(item.trim() !== '') {
                    htmlList += `<li>${item.trim()}</li>`;
                }
            });
            htmlList += '</ul>';
            return htmlList;
        });
        safeText = safeText.replace(/\n/g, '<br>');
        const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(\bwww\.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const placeholders = [];
        safeText = safeText.replace(/<[^>]+>/g, (match) => {
            placeholders.push(match);
            return '___PLACEHOLDER___';
        });
        safeText = safeText.replace(urlRegex, (url) => {
            let href = url;
            if (url.startsWith('www.')) {
                href = 'http://' + url;
            }
            return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });
        safeText = safeText.replace(/___PLACEHOLDER___/g, () => placeholders.shift());
        let replyHTML = '';
        if (data.replyToId) {
            const parentMsgData = messageDataMap.get(data.replyToId);
            if (parentMsgData) {
                const replyText = parentMsgData.isDeleted ? parentMsgData.text : (parentMsgData.originalText || parentMsgData.text);
                const quoteClass = parentMsgData.isDeleted ? 'deleted-reply' : 'reply-quote';
                replyHTML = `
                    <div class="reply-link ${parentMsgData.isDeleted ? 'deleted-reply' : ''}">
                        <a href="#${data.replyToId}" data-reply-id="${data.replyToId}">Membalas ${data.replyToName} (#${data.replyToPublicId})</a>
                        <span class="${quoteClass}">${formatMessageText(parentMsgData, messageDataMap)}</span>
                    </div>`;
            } else {
                replyHTML = `<div class="reply-link deleted-reply">| Pesan dihapus</div>`;
            }
        }
        let imagesHTML = '';
        if (imageUrls.length > 0) {
            if (data.autoCollage && imageUrls.length > 1) { 
                const count = Math.min(imageUrls.length, 4);
                imagesHTML = `<div class="collage-grid collage-count-${count}">`;
                for (let i = 0; i < count; i++) {
                    const cleanUrl = imageUrls[i].replace(/"/g, "&quot;").replace(/'/g, "&#39;");
                    imagesHTML += `
                        <div class="collage-item">
                            <a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="message-image-link">
                                <img src="${cleanUrl}" class="message-image" alt="Gambar Kolase ${i+1}">
                            </a>
                        </div>
                    `;
                }
                imagesHTML += `</div>`;
            } else {
                imageUrls.forEach(url => {
                    const cleanUrl = url.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
                    imagesHTML += `
                        <a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="message-image-link">
                            <img src="${cleanUrl}" class="message-image" alt="Gambar">
                        </a>`;
                });
            }
        }
        return `${replyHTML}${safeText}${imagesHTML}`;
    }
    // --- 4. Render Pesan ---
    function renderMessage(doc, messageDataMap) {
        const data = doc.data();
        const id = doc.id;
        const publicId = id.slice(-6).toUpperCase();
        const wrapper = document.createElement('div');
        wrapper.className = 'chat-message-wrapper';
        wrapper.id = id;
        if (data.isPinned) wrapper.classList.add('pinned-message');
        if (data.isAdminPost) wrapper.classList.add('admin-post');
        if (currentUser && currentUser.uid === data.userId) {
            wrapper.classList.add('my-message');
        }
        let timestamp = 'Baru saja';
        if (data.timestamp && data.timestamp.toDate) {
            timestamp = data.timestamp.toDate().toLocaleString('id-ID', {
                hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short'
            });
        }
        let editedTimestamp = '';
        if (data.isEdited && data.lastEdited) {
            const editTime = data.lastEdited.toDate().toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit' });
            editedTimestamp = `<span class="edited-timestamp" title="Diedit pada ${editTime}">(edited)</span>`;
        }
        const canDelete = currentUser && (currentUser.uid === data.userId || isAdmin);
        const canPin = currentUser && isAdmin;
        const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
        const canEdit = currentUser && 
                        currentUser.uid === data.userId && 
                        !data.isDeleted &&
                        data.timestamp && data.timestamp.toDate().getTime() > fiveMinutesAgo;
        const formattedText = formatMessageText(data, messageDataMap);
        const likeClass = (data.likeCount || 0) > 0 ? 'has-votes' : '';
        const dislikeClass = (data.dislikeCount || 0) > 0 ? 'has-votes' : '';
        const deleteButtonText = data.isDeleted ? 'Hapus Permanen' : 'Hapus';
        const canDeleteHtml = (currentUser && isAdmin) || (currentUser && currentUser.uid === data.userId && !data.isDeleted);
        const adminViewButtons = isAdmin && (data.isDeleted || data.isEdited) ? 
            `<button class="chat-action-btn admin-view-btn" data-id="${id}" data-action="toggle-history">
                ${data.isDeleted ? '[Show Original]' : '[Show History]'}
            </button>` : '';
        wrapper.innerHTML = `
            <div class="chat-message-shadow"></div>
            <div class="chat-message">
                <div class="chat-message-avatar">
                    <img src="${data.userPhotoURL || 'https: 
                </div>
                <div class="chat-message-content">
                    <div class="chat-message-header">
                        <span class="chat-user-name">${data.userName || 'Anonim'}</span>
                        ${data.isAdminPost ? '<span class="admin-badge">[Admin]</span>' : ''}
                        <span class="chat-timestamp">· ${timestamp}</span>
                        ${editedTimestamp}
                        <a href="#${id}" class="chat-public-id" data-reply-id="${id}">(#${publicId})</a>
                    </div>
                    <div class="chat-message-text ${data.isDeleted ? 'deleted-text' : ''}">
                        ${formattedText}
                    </div>
                    <div class="chat-message-actions">
                        ${!data.isDeleted ? `<button class="chat-action-btn like-btn ${likeClass}" data-id="${id}" data-action="like">👍 ${data.likeCount || 0}</button>` : ''}
                        ${!data.isDeleted ? `<button class="chat-action-btn dislike-btn ${dislikeClass}" data-id="${id}" data-action="dislike">👎 ${data.dislikeCount || 0}</button>` : ''}
                        ${!data.isDeleted ? `<button class="chat-action-btn reply-btn" data-id="${id}" data-action="reply">Balas</button>` : ''}
                        ${canEdit ? `<button class="chat-action-btn edit-btn" data-id="${id}" data-action="edit">Edit</button>` : ''}
                        ${canDeleteHtml ? `<button class="chat-action-btn delete-btn" data-id="${id}" data-action="delete">${deleteButtonText}</button>` : ''}
                        ${canPin && !data.isDeleted ? `<button class="chat-action-btn pin-btn" data-id="${id}" data-action="pin" data-pinned="${data.isPinned || false}">${data.isPinned ? 'Un-Pin' : 'Pin'}</button>` : ''}
                        ${adminViewButtons}
                    </div>
                </div>
            </div>
        `;
        return wrapper;
    }
    function updatePaginationUI() {
        const info = `Halaman ${currentPage}`;
        pageInfoTop.textContent = info;
        pageInfoBottom.textContent = info;
        paginationTop.style.display = (currentPage > 1 || !isLastPage) ? 'flex' : 'none';
        paginationBottom.style.display = (currentPage > 1 || !isLastPage) ? 'flex' : 'none';
        prevPageBtnTop.disabled = currentPage === 1;
        prevPageBtnBottom.disabled = currentPage === 1;
        nextPageBtnTop.disabled = isLastPage;
        nextPageBtnBottom.disabled = isLastPage;
    }
    function loadPinnedMessages() {
        if (pinnedMessagesListener) pinnedMessagesListener(); 
        pinnedMessagesListener = db.collection('forumMessages')
            .where('isPinned', '==', true)
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                pinnedMessagesContainer.innerHTML = '';
                const tempMap = new Map(allMessagesData);
                snapshot.docs.forEach(doc => tempMap.set(doc.id, doc.data()));
                snapshot.docs.forEach(doc => {
                    const element = renderMessage(doc, tempMap);
                    pinnedMessagesContainer.appendChild(element);
                });
            }, error => {
                console.error("Gagal memuat pesan pinned:", error);
            });
    }
    async function goToPage(page) {
        if (isLoadingPage) return;
        isLoadingPage = true;
        if (page < 1) {
            page = 1;
            isLoadingPage = false;
            return;
        }
        if (messagesListener) messagesListener();
        chatFeed.innerHTML = '';
        loadingPlaceholder.style.display = 'block';
        let query = db.collection('forumMessages')
                      .where('isPinned', '==', false)
                      .orderBy('timestamp', 'desc')
                      .limit(MESSAGES_PER_PAGE);
        if (page > currentPage && lastVisibleDoc) {
            query = query.startAfter(lastVisibleDoc);
        } else if (page < currentPage && pageSnapshots[page]) {
            query = query.startAt(pageSnapshots[page]);
        } else if (page > 1) {
            try {
                const startAtDoc = await db.collection('forumMessages')
                                        .where('isPinned', '==', false)
                                        .orderBy('timestamp', 'desc')
                                        .limit((page - 1) * MESSAGES_PER_PAGE)
                                        .get();
                const lastDoc = startAtDoc.docs[startAtDoc.docs.length - 1];
                if (lastDoc) {
                    query = query.startAfter(lastDoc);
                }
            } catch (err) {
                console.error("Gagal menghitung startAt:", err);
            }
        }
        messagesListener = query.onSnapshot(snapshot => {
            loadingPlaceholder.style.display = 'none';
            chatFeed.innerHTML = '';
            if (snapshot.empty && page === 1) {
                loadingPlaceholder.textContent = 'Belum ada pesan.';
                loadingPlaceholder.style.display = 'block';
                isLastPage = true;  
            } else if (snapshot.empty) {
                isLastPage = true;
                currentPage = page - 1;  
            } else {
                isLastPage = snapshot.docs.length < MESSAGES_PER_PAGE;
            }
            firstVisibleDoc = snapshot.docs[0];
            lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
            if (page === 1) pageSnapshots = [null]; 
            if (!pageSnapshots[page]) pageSnapshots[page] = firstVisibleDoc;
            currentPage = page;
            snapshot.docs.forEach(doc => allMessagesData.set(doc.id, doc.data()));
            snapshot.docs.forEach(doc => {
                const element = renderMessage(doc, allMessagesData);
                chatFeed.appendChild(element);
            });
            updatePaginationUI();
            isLoadingPage = false;
            checkUrlHash();
        }, error => {
            console.error(`Gagal memuat halaman ${page}:`, error);
            chatFeed.innerHTML = '<p style="color: red;">Gagal memuat chat. Coba refresh.</p>';
            isLoadingPage = false;
        });
    }
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser) return;
        const text = chatTextInput.value;
        if (text.trim() === '') return; 
        try {
            let newMessage = {
                text: text,
                originalText: text, 
                userId: currentUser.uid,
                userName: currentUser.displayName,
                userPhotoURL: currentUser.photoURL,
                timestamp: serverTimestamp(),
                isAdminPost: isAdmin,
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
                autoCollage: collageToggle.checked 
            };
            if (currentReplyInfo) {
                newMessage.replyToId = currentReplyInfo.id;
                newMessage.replyToName = currentReplyInfo.name;
                newMessage.replyToPublicId = currentReplyInfo.publicId;
                newMessage.replyToText = currentReplyInfo.text.substring(0, 50);
            }
            await db.collection('forumMessages').add(newMessage);
            chatTextInput.value = '';
            currentReplyInfo = null;
            replyInfoBox.style.display = 'none';
            if (currentPage !== 1) {
                goToPage(1);
            }
        } catch (error) {
            console.error("Gagal mengirim pesan:", error);
        }
    });
    forumRoot.addEventListener('click', async (e) => {
        if (!currentUser) return; 
        const replyLink = e.target.closest('a[data-reply-id]');
        if (replyLink) {
            e.preventDefault();
            const messageId = replyLink.dataset.replyId;
            await findAndGoToMessage(messageId);
            return;
        }
        const target = e.target.closest('.chat-action-btn');
        if (!target) return; 
        const messageId = target.dataset.id;
        const action = target.dataset.action;
        if (!messageId || !action) return; 
        const messageRef = db.collection('forumMessages').doc(messageId);
        messageRefToActOn = messageRef;
        messageDataToActOn = allMessagesData.get(messageId) || null;
        try {
            switch (action) {
                case 'delete':
                    if (isAdmin) {
                        adminDeleteModal.classList.add('active');
                    } else {
                        userDeleteModal.classList.add('active');
                    }
                    break;
                case 'pin':
                    if (isAdmin) {
                        const isCurrentlyPinned = target.dataset.pinned === 'true';
                        await messageRef.update({ isPinned: !isCurrentlyPinned });
                    }
                    break;
                case 'like':
                    await handleVote('like', messageRef, currentUser.uid);
                    break;
                case 'dislike':
                    await handleVote('dislike', messageRef, currentUser.uid);
                    break;
                case 'reply':
                    currentReplyInfo = { 
                        id: messageId, 
                        name: messageDataToActOn.userName || 'Anonim', 
                        publicId: messageId.slice(-6).toUpperCase(), 
                        text: messageDataToActOn.text 
                    };
                    replyInfoName.textContent = `${currentReplyInfo.name} (#${currentReplyInfo.publicId})`;
                    replyInfoBox.style.display = 'flex';
                    chatTextInput.focus();
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
    });
    confirmBtnNoUserDelete.addEventListener('click', () => userDeleteModal.classList.remove('active'));
    confirmBtnYesUserDelete.addEventListener('click', async () => {
        if (messageRefToActOn) {
            try {
                await messageRefToActOn.update({
                    text: "[Dihapus oleh user]",
                    originalText: messageDataToActOn.text, 
                    isDeleted: true,
                    deletedBy: "user"
                });
            } catch (error) { console.error("Gagal soft delete (user):", error); }
            finally {
                userDeleteModal.classList.remove('active');
                messageRefToActOn = null;
            }
        }
    });
    confirmBtnNoAdminDelete.addEventListener('click', () => adminDeleteModal.classList.remove('active'));
    confirmBtnSoftDeleteAdmin.addEventListener('click', async () => {
        if (messageRefToActOn) {
            try {
                await messageRefToActOn.update({
                    text: "[Dihapus oleh administrator]",
                    originalText: messageDataToActOn.isDeleted ? messageDataToActOn.originalText : messageDataToActOn.text,
                    isDeleted: true,
                    deletedBy: "admin"
                });
            } catch (error) { console.error("Gagal soft delete (admin):", error); }
            finally {
                adminDeleteModal.classList.remove('active');
                messageRefToActOn = null;
            }
        }
    });
    confirmBtnPermDeleteAdmin.addEventListener('click', async () => {
        if (messageRefToActOn) {
            try {
                await messageRefToActOn.delete();
            } catch (error) { console.error("Gagal permanent delete (admin):", error); }
            finally {
                adminDeleteModal.classList.remove('active');
                messageRefToActOn = null;
            }
        }
    });
    function showEditModal() {
        if (!messageDataToActOn) return;
        editTextInput.value = messageDataToActOn.text;
        editHistoryList.innerHTML = '';
        if (isAdmin && messageDataToActOn.editHistory && messageDataToActOn.editHistory.length > 0) {
            editHistoryContainer.style.display = 'block';
            [...messageDataToActOn.editHistory].reverse().forEach(edit => {
                const editTime = edit.editedAt.toDate().toLocaleString('id-ID');
                editHistoryList.innerHTML += `<p><b>${editTime}:</b> <i>${edit.oldText.replace(/</g, "&lt;")}</i></p>`;
            });
        } else {
            editHistoryContainer.style.display = 'none';
        }
        editModal.classList.add('active');
        editTextInput.focus();
    }
    confirmBtnNoEdit.addEventListener('click', () => editModal.classList.remove('active'));
    confirmBtnYesEdit.addEventListener('click', async () => {
        if (messageRefToActOn && messageDataToActOn) {
            const newText = editTextInput.value;
            if (newText === messageDataToActOn.text) {
                editModal.classList.remove('active');
                return;
            }
            try {
                await messageRefToActOn.update({
                    text: newText,
                    isEdited: true,
                    lastEdited: serverTimestamp(),
                    editHistory: FieldValue.arrayUnion({
                        oldText: messageDataToActOn.text,
                        editedAt: serverTimestamp()
                    })
                });
            } catch (error) { console.error("Gagal menyimpan editan:", error); }
            finally {
                editModal.classList.remove('active');
                messageRefToActOn = null;
            }
        }
    });
    cancelReplyBtn.addEventListener('click', () => {
        currentReplyInfo = null;
        replyInfoBox.style.display = 'none';
    });
    confirmBtnNoImage.addEventListener('click', () => imagePromptOverlay.classList.remove('active'));
    pasteBtnImage.addEventListener('click', async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.readText) {
                const text = await navigator.clipboard.readText();
                imageUrlInput.value = text;
                imageUrlInput.focus();
            } else {
                alert('Gagal paste otomatis. Silakan gunakan Ctrl+V.');
            }
        } catch (err) { alert('Gagal paste dari clipboard. Silakan gunakan Ctrl+V.'); }
    });
    confirmBtnYesImage.addEventListener('click', () => {
        const url = imageUrlInput.value.trim();
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            const tag = `<img>${url}</img>`; 
            const text = chatTextInput.value;
            const newText = text.substring(0, lastCursorPosition) + tag + text.substring(lastCursorPosition);
            chatTextInput.value = newText;
            const newCursorPosition = lastCursorPosition + tag.length;
            chatTextInput.selectionStart = newCursorPosition;
            chatTextInput.selectionEnd = newCursorPosition;
            imagePromptOverlay.classList.remove('active');
            chatTextInput.focus();
        } else {
            alert("URL tidak valid. Harap masukkan URL lengkap (http:// atau https://).");
        }
    });
    function updateCursorPosition() {
        lastCursorPosition = chatTextInput.selectionStart;
    }
    chatTextInput.addEventListener('keyup', updateCursorPosition);
    chatTextInput.addEventListener('click', updateCursorPosition);
    function wrapText(tag) {
        const start = chatTextInput.selectionStart;
        const end = chatTextInput.selectionEnd;
        const text = chatTextInput.value;
        const selectedText = text.substring(start, end);
        let replacement = selectedText ? `<${tag}>${selectedText}</${tag}>` : `<${tag}></${tag}>`;
        chatTextInput.value = text.substring(0, start) + replacement + text.substring(end);
        let cursorPosition = selectedText ? start + replacement.length : start + tag.length + 2;
        chatTextInput.selectionStart = cursorPosition;
        chatTextInput.selectionEnd = cursorPosition;
        chatTextInput.focus();
    }
    toolbar.addEventListener('click', (e) => {
        const target = e.target.closest('.format-btn');
        if (!target) {
            if(e.target.closest('#collage-toggle')) {
                collageToggle.checked = !collageToggle.checked;
            }
            return;
        }
        updateCursorPosition();
        if (target.id === 'format-btn-bold') wrapText('b');
        if (target.id === 'format-btn-italic') wrapText('i');
        if (target.id === 'format-btn-underline') wrapText('u');
        if (target.id === 'format-btn-image') {
            imageUrlInput.value = ''; 
            imagePromptOverlay.classList.add('active');
            imageUrlInput.focus();
        }
    });
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
                    transaction.set(voteRef, { timestamp: serverTimestamp() });
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
    [prevPageBtnTop, prevPageBtnBottom].forEach(btn => {
        btn.addEventListener('click', () => goToPage(currentPage - 1));
    });
    [nextPageBtnTop, nextPageBtnBottom].forEach(btn => {
        btn.addEventListener('click', () => goToPage(currentPage + 1));
    });
    async function findAndGoToMessage(messageId) {
        const element = document.getElementById(messageId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.querySelector('.chat-message').style.boxShadow = '0 0 10px 5px var(--moe-tint2)';
            setTimeout(() => {
                element.querySelector('.chat-message').style.boxShadow = '';
            }, 2000);
            return;
        }
        try {
            const docSnap = await db.collection('forumMessages').doc(messageId).get();
            if (!docSnap.exists) {
                alert('Pesan yang dibalas tidak dapat ditemukan (mungkin telah dihapus permanen).');
                return;
            }
            const docTimestamp = docSnap.data().timestamp;
            const allMessagesQuery = await db.collection('forumMessages')
                                        .where('isPinned', '==', false)
                                        .orderBy('timestamp', 'desc')
                                        .get();
            let messageIndex = -1;
            allMessagesQuery.docs.forEach((doc, index) => {
                if (doc.id === messageId) {
                    messageIndex = index;
                }
            });
            if (messageIndex === -1) {
                const element = document.getElementById(messageId);  
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    alert('Pesan yang dibalas tidak ditemukan.');
                }
                return;
            }
            const targetPage = Math.floor(messageIndex / MESSAGES_PER_PAGE) + 1;
            if (targetPage === currentPage) {
                console.warn("Pesan ada di halaman ini tapi tidak ditemukan di DOM.");
            } else {
                await goToPage(targetPage);
            }
        } catch (error) {
            console.error("Gagal mencari pesan:", error);
            alert("Gagal melompat ke pesan yang dibalas. Error: " + error.message);
        }
    }
    let initialHash = window.location.hash.substring(1);
    function checkUrlHash() {
        if (initialHash) {
            const element = document.getElementById(initialHash);
            if (element) {
                setTimeout(() => { 
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.querySelector('.chat-message').style.boxShadow = '0 0 10px 5px var(--moe-tint2)';
                    setTimeout(() => {
                        element.querySelector('.chat-message').style.boxShadow = '';
                    }, 2000);
                    initialHash = null; 
                }, 100);
            }
        }
    }
    auth.onAuthStateChanged(async (user) => {
        authCheckCompleted = true; 
        if (user) {
            currentUser = user;
            await checkAdminStatus(user.uid); 
            chatFormContainer.style.display = 'block'; 
            chatLoginPrompt.style.display = 'none'; 
            loadPinnedMessages();
            if (initialHash) {
                await findAndGoToMessage(initialHash);
            } else {
                await goToPage(1);
            }
        } else {
            currentUser = null;
            isAdmin = false;
            document.body.innerHTML = '<div class="loading-placeholder" style="padding: 5rem 0;"><p>Anda tidak login. Mengalihkan ke halaman utama...</p></div>';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });
    setTimeout(() => {
        if (!authCheckCompleted) {
            document.getElementById('forum-root').innerHTML = '<div class="loading-placeholder"><p>Mengecek status login...</p></div>';
        }
    }, 500);
});