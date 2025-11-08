// File: js/forum/script_forum_dom.js

export function injectHTML() {
    const forumRoot = document.getElementById('forum-root');
    if (!forumRoot) {
        console.error("#forum-root tidak ditemukan!");
        return;
    }
	
    const toggleBtnHTML = `
        <button class="chat-toggle-btn" id="show-chat-toggle-btn" title="Buka Pesan" style="display: none;">
            <img src="../sprite/button/chat/bubble.svg" alt="Buka Chat">
        </button>
    `;
    document.body.insertAdjacentHTML('beforeend', toggleBtnHTML);

    forumRoot.innerHTML = `
        <div class="forum-chat-wrapper">
            <h2 class="forum-title">
                <img src="../sprite/button/chat/moechat.svg" alt="Forum Chat">
            </h2>
            
            <div id="forum-announcement-box" class="announcement-box" style="display: none;"></div>
            
            <div id="pinned-messages-container"></div>

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

            <div class="member-list-container" id="member-list-container" style="display: none;">
                <h3 class="member-list-header">
                    MOECHAT MEMBER 
                    [Aktif: <span id="member-list-active-count">0</span>, 
                    Terdaftar: <span id="member-list-total-count">0</span>]
                </h3>
                <div class="member-list" id="member-list-box">
                </div>
            </div>

            <div class="pagination-container" id="pagination-container-bottom" style="display: none;">
                <button class="pagination-btn" id="prev-page-btn-bottom">Sebelumnya</button>
                <span class="pagination-info" id="page-info-bottom">Halaman 1</span>
                <button class="pagination-btn" id="next-page-btn-bottom">Berikutnya</button>
            </div>

            <div class="chat-form-container" id="chat-form-container" style="display: none;">
                <div class="reply-info-box" id="reply-info-box">
                    <span>Membalas <strong id="reply-info-name"></strong>...</span>
                    <button id="cancel-reply-btn">Batal</button>
                </div>

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
                    
                    <button class="format-btn" id="close-chat-form-btn" title="Tutup" style="margin-left: auto; font-size: 1.5em; padding: 0 8px; line-height: 1;">&times;</button>
                </div>

                <form id="chat-form">
                    <div class="chat-form-input">
                        <textarea id="chat-text-input" placeholder="Ketik pesan... Gunakan <b>teks</b> untuk bold atau <img>url_gambar</img> untuk gambar." required rows="3"></textarea>
                    </div>
                    <button type="submit" class="chat-submit-btn" title="Kirim Pesan">
                        <img src="../sprite/button/chat/send.svg" alt="Kirim">
                    </button>
                </form>
            </div>
            <div class="chat-login-prompt" id="chat-login-prompt" style="display: none;">
                <p>Silakan <a href="index.html" style="text-decoration: underline; font-weight: bold;">login</a> untuk bergabung di forum chat!</p>
            </div>
        </div>
        
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

        <div class="confirm-modal-overlay" id="image-prompt-overlay">
            <div class="confirm-modal-wrapper">
                <div class="confirm-modal-shadow"></div>
                <div class="confirm-modal confirm-modal-box active image-prompt" id="confirm-modal-image">
                    <h3>Sisipkan Gambar</h3>
                    <p>Paste URL gambar (http://... atau https://...) di bawah ini.</p>
                    <div class="modal-input-group">
                        <input type="text" id="image-url-input" class="confirm-modal-input" placeholder="https://...">
                        <button class="paste-btn" id="paste-btn-image" title="Paste">PASTE</button>
                    </div>
                    <div class="modal-spoiler-toggle">
                        <input type="checkbox" id="image-spoiler-checkbox">
                        <label for="image-spoiler-checkbox">Tandai sebagai Spoiler</label>
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
    
    document.body.style.paddingBottom = "200px";
}

export function getDOMElements() {
    return {
        forumRoot: document.getElementById('forum-root'),
        chatFeed: document.getElementById('chat-feed'),
        pinnedMessagesContainer: document.getElementById('pinned-messages-container'),
        loadingPlaceholder: document.querySelector('.loading-placeholder'),
        
        showChatToggleBtn: document.getElementById('show-chat-toggle-btn'),
        closeChatFormBtn: document.getElementById('close-chat-form-btn'),
        
        chatFormContainer: document.getElementById('chat-form-container'),
        chatLoginPrompt: document.getElementById('chat-login-prompt'),
        chatForm: document.getElementById('chat-form'),
        chatTextInput: document.getElementById('chat-text-input'),
        
        replyInfoBox: document.getElementById('reply-info-box'),
        replyInfoName: document.getElementById('reply-info-name'),
        cancelReplyBtn: document.getElementById('cancel-reply-btn'),
        
        toolbar: document.getElementById('chat-toolbar'),
        collageToggle: document.getElementById('collage-toggle-checkbox'),
        
        userDeleteModal: document.getElementById('confirm-modal-overlay-user-delete'),
        confirmBtnYesUserDelete: document.getElementById('confirm-btn-yes-user-delete'),
        confirmBtnNoUserDelete: document.getElementById('confirm-btn-no-user-delete'),

        adminDeleteModal: document.getElementById('confirm-modal-overlay-admin-delete'),
        confirmBtnSoftDeleteAdmin: document.getElementById('confirm-btn-soft-delete-admin'),
        confirmBtnPermDeleteAdmin: document.getElementById('confirm-btn-perm-delete-admin'),
        confirmBtnNoAdminDelete: document.getElementById('confirm-btn-no-admin-delete'),

        editModal: document.getElementById('confirm-modal-overlay-edit'),
        editTextInput: document.getElementById('edit-text-input'),
        editHistoryContainer: document.getElementById('edit-history-container'),
        editHistoryList: document.getElementById('edit-history-list'),
        confirmBtnYesEdit: document.getElementById('confirm-btn-yes-edit'),
        confirmBtnNoEdit: document.getElementById('confirm-btn-no-edit'),

        imagePromptOverlay: document.getElementById('image-prompt-overlay'),
        imageUrlInput: document.getElementById('image-url-input'),
        confirmBtnYesImage: document.getElementById('confirm-btn-yes-image'),
        confirmBtnNoImage: document.getElementById('confirm-btn-no-image'),
        pasteBtnImage: document.getElementById('paste-btn-image'),
        imageSpoilerCheckbox: document.getElementById('image-spoiler-checkbox'),

        paginationTop: document.getElementById('pagination-container-top'),
        paginationBottom: document.getElementById('pagination-container-bottom'),
        prevPageBtnTop: document.getElementById('prev-page-btn-top'),
        nextPageBtnTop: document.getElementById('next-page-btn-top'),
        pageInfoTop: document.getElementById('page-info-top'),
        prevPageBtnBottom: document.getElementById('prev-page-btn-bottom'),
        nextPageBtnBottom: document.getElementById('next-page-btn-bottom'),
        pageInfoBottom: document.getElementById('page-info-bottom'),
        
        memberListContainer: document.getElementById('member-list-container'),
        memberListActiveCount: document.getElementById('member-list-active-count'),
        memberListTotalCount: document.getElementById('member-list-total-count'),
        memberListBox: document.getElementById('member-list-box')
    };
}