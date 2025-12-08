// File: js/forum/script_forum_main.js

import { injectHTML, getDOMElements } from './script_forum_dom.js';
import { setupAuthHandling } from './script_forum_auth.js';
import { setupPagination, loadPinnedMessages, findAndGoToMessage, checkUrlHash, getCurrentPage } from './script_forum_pagination.js';
import { setupActions } from './script_forum_actions.js';
import { setupInput } from './script_forum_input.js';

document.addEventListener('DOMContentLoaded', () => {

    document.body.classList.add('allow-copy');

    if (typeof firebase === 'undefined' || !firebase.auth || !firebase.firestore) {
        console.error("Firebase SDK tidak dimuat dengan benar.");
        document.getElementById('forum-root').innerHTML = '<p style="color: red; text-align: center; padding: 2rem;">Error: Firebase SDK gagal dimuat.</p>';
        return;
    }

    const auth = firebase.auth();
    const db = firebase.firestore();
    
    const { FieldValue } = firebase.firestore;

	async function loadAnnouncement() {
        try {
            const response = await fetch('../store/forum-announce.json');
            if (!response.ok) throw new Error('File pengumuman tidak ditemukan.');
            
            const data = await response.json();
            const container = document.getElementById('forum-announcement-box');
            
            if (container) {
                let featuresHTML = '<ul>';
                data.features.forEach(item => {
                    featuresHTML += `<li>${item}</li>`;
                });
                featuresHTML += '</ul>';
                let imageNoteHTML = '';
                if (data.image_note) {
                    imageNoteHTML = `
                        <div class="announcement-box" style="background: var(--moe-tint6); border-style: solid; margin-top: 1rem;">
                            <h4>${data.image_note.title}</h4>
                            <p>${data.image_note.message}</p>
                        </div>
                    `;
                }

                container.innerHTML = `
                    <h4>${data.title}</h4>
                    <p>${data.message}</p>
                    
                    ${imageNoteHTML}  <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">${data.features_title || 'Fitur Saat Ini:'}</h4>
                    ${featuresHTML}

                    <p style="margin-top: 1rem;"><b>${data.closing_message || ''}</b></p>
                    <p class="announce-date">${data.timestamp}</p>
                `;
                container.style.display = 'block';
            }
        } catch (error) {
            console.warn("Gagal memuat pengumuman:", error.message);
            const container = document.getElementById('forum-announcement-box');
            if (container) container.style.display = 'none'; // Sembunyikan jika gagal
        }
    }
	
    injectHTML();
    const elements = getDOMElements();
    loadAnnouncement();

    const appState = {
        currentUser: null,
        isAdmin: false,
        adminList: {},
        currentReplyInfo: null, 
        messageRefToActOn: null,
        messageDataToActOn: null,
        lastCursorPosition: 0,
        
        allMessagesData: new Map(),
        pinnedMessagesListener: null,
        messagesListener: null,
        MESSAGES_PER_PAGE: 25,
        currentPage: 1,
        isLastPage: false,
        lastVisibleDoc: null, 
        firstVisibleDoc: null,
        pageSnapshots: [null],
        isLoadingPage: false,
        initialHash: window.location.hash.substring(1)
    };

    const paginationControls = setupPagination(db, elements, appState);
    setupAuthHandling(auth, db, elements, appState, paginationControls);
    setupActions(db, elements, appState, paginationControls, FieldValue);
    setupInput(db, elements, appState, paginationControls, FieldValue);
});