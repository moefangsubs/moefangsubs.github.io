// File: js/forum/script_forum_render.js (🛡️)
// PERBAIKAN:
// 1. (🏖️) Mem-parse tag <img spoiler="true">
// 2. (🏖️) Merender HTML untuk wrapper spoiler
// 3. (🏖️) Mengganti tombol dan badge dengan SVG
// 4. (🛡️) Mengimplementasikan fitur Admin Edit Tanpa Batas Waktu

/**
 * Memformat teks mentah (termasuk yang dihapus) ke HTML
 * @param {object} data - Data dokumen pesan
 * @param {Map<string, object>} messageDataMap - Map semua data pesan
 * @param {boolean} isAdmin - Status admin user saat ini
 */
function formatMessageText(data, messageDataMap, isAdmin) {
    let text = data.text || '';
    
    // Logika Tampilan Teks Dihapus
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
    
    // (🏖️) PERBAIKAN: Ubah imageUrls menjadi array of objects
    const imageUrls = [];
    // (🏖️) PERBAIKAN: Regex untuk menangkap atribut spoiler
    const imgRegex = /&lt;img( spoiler="true")?&gt;(.*?)&lt;\/img&gt;/gi;
    
    safeText = safeText.replace(imgRegex, (match, spoilerAttr, url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            // (🏖️) Simpan status spoiler
            imageUrls.push({ 
                url: url, 
                isSpoiler: spoilerAttr ? true : false 
            });
        }
        return ''; 
    });

    // Format Teks
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

    // Auto-link
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

    // HTML Balasan
    let replyHTML = '';
    if (data.replyToId) {
        const parentMsgData = messageDataMap.get(data.replyToId);
        
        if (parentMsgData) {
            // (👍) Membawa perbaikan logika balasan dari update sebelumnya
            const replyText = parentMsgData.isDeleted ? parentMsgData.text : (parentMsgData.originalText || parentMsgData.text);
            const quoteClass = parentMsgData.isDeleted ? 'deleted-reply' : 'reply-quote';
            
            // (🏖️) PERBAIKAN: Tampilkan teks yang dihapus di kutipan, JANGAN teks asli
            const quoteText = parentMsgData.isDeleted ? replyText : (parentMsgData.originalText || parentMsgData.text);
            const truncatedQuote = quoteText.substring(0, 50) + (quoteText.length > 50 ? '...' : '');

            replyHTML = `
                <div class="reply-link ${parentMsgData.isDeleted ? 'deleted-reply' : ''}">
                    <a href="#${data.replyToId}" data-reply-id="${data.replyToId}">Membalas ${data.replyToName} (#${data.replyToPublicId})</a>
                    <span class="${quoteClass}">${truncatedQuote.replace(/</g, "&lt;")}</span>
                </div>`;
        } else {
            replyHTML = `<div class="reply-link deleted-reply">| Pesan dihapus</div>`;
        }
    }

    // (🏖️) PERBAIKAN: Logika render gambar untuk menangani spoiler
    let imagesHTML = '';
    if (imageUrls.length > 0) {
        if (data.autoCollage && imageUrls.length > 1) { 
            const count = Math.min(imageUrls.length, 4);
            imagesHTML = `<div class="collage-grid collage-count-${count}">`;
            for (let i = 0; i < count; i++) {
                const imgObj = imageUrls[i];
                const cleanUrl = imgObj.url.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
                const spoilerClass = imgObj.isSpoiler ? 'spoiler-image-wrapper' : '';
                const spoilerTitle = imgObj.isSpoiler ? 'title="Klik untuk melihat spoiler"' : '';
                const spoilerOverlay = imgObj.isSpoiler ? '<div class="spoiler-overlay"><img src="../sprite/button/chat/chat_imghide.svg" alt="Spoiler"></div>' : '';

                imagesHTML += `
                    <div class="collage-item ${spoilerClass}" ${spoilerTitle}>
                        <a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="message-image-link">
                            <img src="${cleanUrl}" class="message-image" alt="Gambar Kolase ${i+1}">
                        </a>
                        ${spoilerOverlay}
                    </div>
                `;
            }
            imagesHTML += `</div>`;
        } else {
            imageUrls.forEach(imgObj => {
                const cleanUrl = imgObj.url.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
                const spoilerClass = imgObj.isSpoiler ? 'spoiler-image-wrapper' : '';
                const spoilerTitle = imgObj.isSpoiler ? 'title="Klik untuk melihat spoiler"' : '';
                const spoilerOverlay = imgObj.isSpoiler ? '<div class="spoiler-overlay"><img src="../sprite/button/chat/chat_imghide.svg" alt="Spoiler"></div>' : '';

                imagesHTML += `
                    <div class="message-image-container ${spoilerClass}" ${spoilerTitle}>
                        <a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="message-image-link">
                            <img src="${cleanUrl}" class="message-image" alt="Gambar">
                        </a>
                        ${spoilerOverlay}
                    </div>`;
            });
        }
    }
    // (🏖️) SELESAI

    return `${replyHTML}${safeText}${imagesHTML}`;
}

/**
 * Membuat elemen HTML untuk satu pesan
 * @param {firebase.firestore.DocumentSnapshot} doc - Dokumen pesan
 * @param {Map<string, object>} messageDataMap - Map semua data pesan
 * @param {firebase.User} currentUser - Objek user saat ini
 * @param {boolean} isAdmin - Status admin user saat ini
 */
export function renderMessage(doc, messageDataMap, currentUser, isAdmin) {
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
        // (👍) Membawa perbaikan bug dari update sebelumnya (pastikan lastEdited ada)
        const editTime = data.lastEdited ? data.lastEdited.toDate().toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '';
        editedTimestamp = `<span class="edited-timestamp" title="Diedit pada ${editTime}">(edited)</span>`;
    }

    const canPin = currentUser && isAdmin;
    
    // (🛡️) PERBAIKAN: Logika Admin Edit Tanpa Batas Waktu
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
    const isOwner = currentUser && currentUser.uid === data.userId;
    const isWithin5Min = data.timestamp && data.timestamp.toDate().getTime() > fiveMinutesAgo;
    
    // Admin bisa edit kapan saja (jika tidak dihapus)
    // User bisa edit HANYA dalam 5 menit (jika tidak dihapus)
    const canEdit = (!data.isDeleted && (isAdmin || (isOwner && isWithin5Min)));
    // (🛡️) SELESAI

    const formattedText = formatMessageText(data, messageDataMap, isAdmin);
    
    const likeClass = (data.likeCount || 0) > 0 ? 'has-votes' : '';
    const dislikeClass = (data.dislikeCount || 0) > 0 ? 'has-votes' : '';

    const deleteButtonText = data.isDeleted ? 'Hapus Permanen' : 'Hapus';
    const canDeleteHtml = (currentUser && isAdmin) || (currentUser && currentUser.uid === data.userId && !data.isDeleted);

    const adminViewButtons = isAdmin && (data.isDeleted || data.isEdited) ? 
        `<button class="chat-action-btn admin-view-btn" data-id="${id}" data-action="toggle-history">
            ${data.isDeleted ? '[Show Original]' : '[Show History]'}
        </button>` : '';

    // (🏖️) PERBAIKAN: Menggunakan SVG untuk badge admin (dari file lama Anda)
    const adminBadge = data.isAdminPost ? `<img src="../sprite/button/chat/label_admin.svg" alt="Admin" class="admin-badge-img" title="Admin">` : '';

    wrapper.innerHTML = `
        <div class="chat-message-shadow"></div>
        <div class="chat-message">
            <div class="chat-message-avatar">
                <img src="${data.userPhotoURL || 'https://via.placeholder.com/45?text=?'}" alt="Avatar">
            </div>
            <div class="chat-message-content">
                <div class="chat-message-header">
                    <span class="chat-user-name">${data.userName || 'Anonim'}</span>
                    ${adminBadge}
                    <span class="chat-timestamp">· ${timestamp}</span>
                    ${editedTimestamp}
                    <a href="#${id}" class="chat-public-id" data-reply-id="${id}">(#${publicId})</a>
                </div>
                <div class="chat-message-text ${data.isDeleted ? 'deleted-text' : ''}">
                    ${formattedText}
                </div>
                
                <div class="chat-message-actions">
                    ${!data.isDeleted ? `<button class="chat-action-btn like-btn ${likeClass}" data-id="${id}" data-action="like"><img src="../sprite/button/chat/chat_likey.svg" alt="Like"> <span class="btn-text">${data.likeCount || 0}</span></button>` : ''}
                    ${!data.isDeleted ? `<button class="chat-action-btn dislike-btn ${dislikeClass}" data-id="${id}" data-action="dislike"><img src="../sprite/button/chat/chat_likex.svg" alt="Dislike"> <span class="btn-text">${data.dislikeCount || 0}</span></button>` : ''}
                    ${!data.isDeleted ? `<button class="chat-action-btn reply-btn" data-id="${id}" data-action="reply"><img src="../sprite/button/chat/chat_reply.svg" alt="Balas"> <span class="btn-text">Balas</span></button>` : ''}
                    ${canEdit ? `<button class="chat-action-btn edit-btn" data-id="${id}" data-action="edit"><img src="../sprite/button/chat/chat_edit.svg" alt="Edit"> <span class="btn-text">Edit</span></button>` : ''}
                    ${canDeleteHtml ? `<button class="chat-action-btn delete-btn" data-id="${id}" data-action="delete"><img src="../sprite/button/chat/chat_trash.svg" alt="Hapus"> <span class="btn-text">${deleteButtonText}</span></button>` : ''}
                    ${canPin && !data.isDeleted ? `<button class="chat-action-btn pin-btn" data-id="${id}" data-action="pin" data-pinned="${data.isPinned || false}"><img src="../sprite/button/chat/chat_pin.svg" alt="Pin"> <span class="btn-text">${data.isPinned ? 'Un-Pin' : 'Pin'}</span></button>` : ''}
                    ${adminViewButtons}
                </div>
            </div>
        </div>
    `;
    
    return wrapper;
}