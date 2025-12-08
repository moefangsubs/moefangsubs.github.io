function formatMessageText(data, messageDataMap, isAdmin) {
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
    const imgRegex = /&lt;img( spoiler="true")?&gt;(.*?)&lt;\/img&gt;/gi;
    safeText = safeText.replace(imgRegex, (match, spoilerAttr, url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            imageUrls.push({ 
                url: url, 
                isSpoiler: spoilerAttr ? true : false 
            });
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
    return `${replyHTML}${safeText}${imagesHTML}`;
}
export function renderMessage(doc, appState) {
    const data = doc.data();
    const id = doc.id;
    const publicId = id.slice(-6).toUpperCase();
    const { allMessagesData, currentUser, isAdmin, userProfiles, memberMap } = appState;
    const authorProfile = userProfiles.get(data.userId) || { bio: '', oshi: {} };
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
        timestamp = data.timestamp.toDate().toLocaleString('id-ID', {  });
    }
    let editedTimestamp = '';
    if (data.isEdited && data.lastEdited) {
        const editTime = data.lastEdited ? data.lastEdited.toDate().toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '';
        editedTimestamp = `<span class="edited-timestamp" title="Diedit pada ${editTime}">(edited)</span>`;
    }
    const canPin = currentUser && isAdmin;
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
    const isOwner = currentUser && currentUser.uid === data.userId;
    const isWithin5Min = data.timestamp && data.timestamp.toDate().getTime() > fiveMinutesAgo;
    const canEdit = (!data.isDeleted && (isAdmin || (isOwner && isWithin5Min)));
    const formattedText = formatMessageText(data, allMessagesData, isAdmin);
    const likeClass = (data.likeCount || 0) > 0 ? 'has-votes' : '';
    const dislikeClass = (data.dislikeCount || 0) > 0 ? 'has-votes' : '';
    const deleteButtonText = data.isDeleted ? 'Hapus Permanen' : 'Hapus';
    const canDeleteHtml = (currentUser && isAdmin) || (isOwner && !data.isDeleted);
    const adminViewButtons = isAdmin && (data.isDeleted || data.isEdited) ? 
        `<button class="chat-action-btn admin-view-btn" data-id="${id}" data-action="toggle-history">
            ${data.isDeleted ? '[Show Original]' : '[Show History]'}
        </button>` : '';
    let userBadge = '';
    if (data.isAdminPost) {
        userBadge = `<img src="../sprite/button/chat/label_admin.svg" alt="Admin" class="admin-badge-img" title="Admin">`;
    } else {
        userBadge = `<img src="../sprite/button/chat/label_member.svg" alt="Member" class="admin-badge-img" title="Member">`;
    }
    const adminTitle = isAdmin ? `title="[Admin] Klik untuk info user"` : '';
    const bioHTML = authorProfile.bio ? `<p class="bio-text">${authorProfile.bio.replace(/</g, "&lt;")}</p>` : '';
    const oshiHTML = renderOshiList(authorProfile.oshi, memberMap);
    wrapper.innerHTML = `
        <div class="chat-message-shadow"></div>
        <div class="chat-message">
            <div class="chat-message-avatar">
                <img src="${data.userPhotoURL || 'https: 
                ${bioHTML}
                ${oshiHTML}
            </div>
            <div class="chat-message-content">
                <div class="chat-message-header">
                    <span class="chat-user-name" ${adminTitle}>${data.userName || 'Anonim'}</span>
                    ${userBadge}
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
    const expandBtn = wrapper.querySelector('.oshi-expand-btn');
    if (expandBtn) {
        expandBtn.addEventListener('click', (e) => {
            const list = e.target.previousElementSibling;
            list.classList.toggle('expanded');
            e.target.textContent = list.classList.contains('expanded') ? 'Sembunyikan' : '...';
        });
    }
    return wrapper;
}
function renderOshiList(oshiData, memberMap) {
    if (!oshiData || Object.keys(oshiData).length === 0) return '';
    const groupOrder = ['nogi', 'saku', 'hina', 'boku'];
    const sortedKamioshi = [];
    const sortedOshi = [];
    for (const group of groupOrder) {
        const data = oshiData[group];
        if (!data) continue;
        const kamioshiId = data.kamioshi;
        if (kamioshiId) {
            sortedKamioshi.push({ id: kamioshiId, group: group, isKamioshi: true });
        }
        if (data.oshi) {
            data.oshi.forEach(id => {
                if (id !== kamioshiId) {
                    sortedOshi.push({ id: id, group: group, isKamioshi: false });
                }
            });
        }
    }
    const allMembers = [...sortedKamioshi, ...sortedOshi];
    const otherOshiCount = sortedOshi.length;
    if (allMembers.length === 0) return '';
    const maxToShow = 6;
    let itemsToShow = [];
    let expandButtonText = '...';
    if (sortedKamioshi.length > 0) {
        itemsToShow = sortedKamioshi;
        if (otherOshiCount > 0) {
            expandButtonText = `[+${otherOshiCount}]`;
        } else {
            expandButtonText = null; 
        }
    } else {
        itemsToShow = allMembers.slice(0, maxToShow);
        if (allMembers.length <= maxToShow) {
            expandButtonText = null;
        }
    }
    let html = '<div class="oshi-list">';
    itemsToShow.forEach(oshi => {
        const nama = memberMap.get(oshi.id) || oshi.id;
        html += `<span class="oshi-item ${oshi.group} ${oshi.isKamioshi ? 'kamioshi' : ''}">${nama}</span>`;
    });
    html += '</div>';
    if (expandButtonText) {
        const allOshiString = JSON.stringify(allMembers);
        html += `<span class="oshi-expand-btn" data-mode="collapsed" data-all-oshi='${allOshiString}' data-text-collapsed="${expandButtonText}" data-text-expanded="Sembunyikan">${expandButtonText}</span>`;
    }
    return html;
}