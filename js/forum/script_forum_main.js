import { injectHTML, getDOMElements } from './script_forum_dom.js';
import { setupAuthHandling } from './script_forum_auth.js';
import { setupPagination } from './script_forum_pagination.js';
import { setupActions } from './script_forum_actions.js';
import { setupInput } from './script_forum_input.js';

document.addEventListener('DOMContentLoaded', () => {

    if (typeof firebase === 'undefined' || !firebase.auth || !firebase.firestore || !firebase.database) {
        console.error("Firebase SDK tidak dimuat dengan benar.");
        document.getElementById('forum-root').innerHTML = '<p style="color: red; text-align: center; padding: 2rem;">Error: Firebase SDK gagal dimuat.</p>';
        return;
    }

    const auth = firebase.auth();
    const db = firebase.firestore();
    const rtdb = firebase.database();
    const { FieldValue } = firebase.firestore;

    let approvedMemberListener = null;

    function showAccessOverlay(message) {
        const overlayHTML = `
            <div class="gatekeeper-overlay" id="gatekeeper-overlay">
                <div class="gatekeeper-box">
                    <p>${message}</p>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', overlayHTML);
        
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 3000);
    }

    (async function gatekeepForumAccess() {
        const user = await new Promise(resolve => {
            auth.onAuthStateChanged(u => resolve(u));
        });

        if (!user) {
            showAccessOverlay('Anda harus login untuk mengakses halaman ini. Mengalihkan...');
            return;
        }

        try {
            const adminDoc = await db.collection('admins').doc(user.uid).get();
            if (adminDoc.exists) {
                initializeApp(user);
                return;
            }

            const chatDoc = await db.collection('moechat').doc(user.uid).get();
            if (chatDoc.exists) {
                const status = chatDoc.data().status.toLowerCase();
                if (status === 'ok') {
                    initializeApp(user);
                    return;
                } else if (status === 'wait') {
                    showAccessOverlay('⏳ Request aksesmu masih pending. Mengalihkan...');
                } else {
                    showAccessOverlay('❌ Kamu ditolak masuk. Mengalihkan...');
                }
            } else {
                showAccessOverlay('❌ Anda tidak punya akses ke halaman ini. Mengalihkan...');
            }
        } catch (error) {
            console.error("Gagal memverifikasi akses:", error);
            showAccessOverlay('Gagal memverifikasi akses. Mengalihkan...');
        }
    })();

    async function initializeApp(user) {
        document.body.classList.add('allow-copy');

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
                        ${imageNoteHTML}
                        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">${data.features_title || 'Fitur Saat Ini:'}</h4>
                        ${featuresHTML}
                        <p style="margin-top: 1rem;"><b>${data.closing_message || ''}</b></p>
                        <p class="announce-date">${data.timestamp}</p>
                    `;
                    container.style.display = 'block';
                }
            } catch (error) {
                console.warn("Gagal memuat pengumuman:", error.message);
                const container = document.getElementById('forum-announcement-box');
                if (container) container.style.display = 'none';
            }
        }

        async function loadMemberData() {
            try {
                const [nogi, hina, saku, boku] = await Promise.all([
                    fetch('../store/member/members.json').then(res => res.json()),
                    fetch('../store/member/members_db_hina.json').then(res => res.json()),
                    fetch('../store/member/members_db_saku.json').then(res => res.json()),
                    fetch('../store/member/members_db_boku.json').then(res => res.json())
                ]);

                appState.memberData.nogi = nogi;
                appState.memberData.hina = hina;
                appState.memberData.saku = saku;
                appState.memberData.boku = boku;

                const mapMember = (member) => [member.id, member.nama_jp];
                appState.memberMap = new Map([
                    ...nogi.map(mapMember),
                    ...hina.map(mapMember),
                    ...saku.map(mapMember),
                    ...boku.map(mapMember)
                ]);

            } catch (error) {
                console.error("Gagal memuat data member JSON:", error);
            }
        }

        function renderMemberList() {
            if (!elements.memberListBox) return;
            
            const { approvedMembers, activeMemberUIDs } = appState;
            
            elements.memberListBox.innerHTML = '';
            let activeCount = 0;
            
            const sortedMembers = [...approvedMembers.values()].sort((a, b) => {
                const aActive = activeMemberUIDs.has(a.id);
                const bActive = activeMemberUIDs.has(b.id);
                if (aActive && !bActive) return -1;
                if (!aActive && bActive) return 1;
                return a.name.localeCompare(b.name);
            });
            
            sortedMembers.forEach(member => {
                const item = document.createElement('span');
                item.className = 'member-item';
                item.textContent = member.name;
                
                if (member.isAdmin) {
                    item.classList.add('admin');
                }
                
                if (activeMemberUIDs.has(member.id)) {
                    item.classList.add('active');
                    activeCount++;
                } else {
                    item.classList.add('inactive');
                }
                elements.memberListBox.appendChild(item);
            });

            elements.memberListActiveCount.textContent = activeCount;
            elements.memberListTotalCount.textContent = approvedMembers.size;
            elements.memberListContainer.style.display = 'block';
        }

        async function setupPresenceAndMemberList(uid) {
            if (approvedMemberListener) approvedMemberListener();
            
            approvedMemberListener = db.collection('moechat').where('status', '==', 'ok')
                .onSnapshot(async (snapshot) => {
                    const adminSnapshot = await db.collection('admins').get();
                    
                    appState.approvedMembers.clear();
                    
                    const memberProfilePromises = [];
                    const memberEmails = new Map();
                    const adminUIDs = new Set(adminSnapshot.docs.map(d => d.id));

                    snapshot.forEach(doc => {
                        memberProfilePromises.push(db.collection('users').doc(doc.id).get());
                        memberEmails.set(doc.id, doc.data().email.split('@')[0]); 
                    });
                    
                    adminSnapshot.forEach(doc => {
                        if (!memberEmails.has(doc.id)) { 
                             memberProfilePromises.push(db.collection('users').doc(doc.id).get());
                        }
                    });

                    const memberProfiles = await Promise.all(memberProfilePromises);
                    
                    memberProfiles.forEach(profileDoc => {
                        const profileData = profileDoc.data();
                        let memberName;
                        const isThisAdmin = adminUIDs.has(profileDoc.id);

                        if (profileDoc.exists && profileData && profileData.displayName) {
                            memberName = profileData.displayName;
                        } 
                        else if (auth.currentUser && auth.currentUser.uid === profileDoc.id) {
                            memberName = auth.currentUser.displayName;
                        }
                        else if (memberEmails.has(profileDoc.id)) {
                            memberName = memberEmails.get(profileDoc.id);
                        }
                        else {
                            memberName = 'Admin'; 
                        }
                        
                        appState.approvedMembers.set(profileDoc.id, { 
                            id: profileDoc.id, 
                            name: memberName,
                            isAdmin: isThisAdmin
                        });
                    });
                    
                    renderMemberList();
                }, error => {
                    console.error("Error in approvedMemberListener snapshot:", error);
                });
            
            rtdb.ref('/onlineUsers').on('value', (snapshot) => {
                const activeUsers = snapshot.val() || {};
                appState.activeMemberUIDs = new Set(Object.keys(activeUsers));
                renderMemberList();
            }, error => {
                console.error("Error in onlineUsers listener:", error);
            });
        }
        
        function disconnectPresence() {
            if (approvedMemberListener) {
                approvedMemberListener();
                approvedMemberListener = null;
            }
            rtdb.ref('/onlineUsers').off();
            appState.approvedMembers.clear();
            appState.activeMemberUIDs.clear();
            if (elements.memberListContainer) {
                elements.memberListContainer.style.display = 'none';
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
            initialHash: window.location.hash.substring(1),
            initialLoadGoToLastPage: true,
            currentUserProfile: { bio: '', oshi: {} }, 
            userProfiles: new Map(), 
            memberData: { nogi: [], hina: [], saku: [], boku: [] }, 
            memberMap: new Map(),
            approvedMembers: new Map(),
            activeMemberUIDs: new Set()
        };

        window.appState = appState;
        window.db = db;

        loadMemberData(); 

        const paginationControls = setupPagination(db, elements, appState);
        const authHandler = setupAuthHandling(auth, db, elements, appState, paginationControls);

        auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const userRef = db.collection('users').doc(user.uid);
                    const doc = await userRef.get();
                    
                    if (doc.exists) {
                        appState.currentUserProfile = doc.data();
                        
                        if (!doc.data().displayName && user.displayName) {
                            try {
                                await userRef.update({ displayName: user.displayName });
                                appState.currentUserProfile.displayName = user.displayName;
                            } catch (e) { console.warn("Gagal update displayName:", e); }
                        }
                    } else {
                        const defaultProfile = { 
                            bio: '', 
                            oshi: {},
                            displayName: user.displayName 
                        };
                        await userRef.set(defaultProfile);
                        appState.currentUserProfile = defaultProfile;
                    }
                } catch (error) {
                    console.error("Gagal memuat profil user:", error);
                    appState.currentUserProfile = { bio: '', oshi: {}, displayName: user.displayName };
                }
                
                await setupPresenceAndMemberList(user.uid);

            } else {
                appState.currentUserProfile = { bio: '', oshi: {} };
                disconnectPresence();
            }
            
            await authHandler(user); 
            
            if (user && appState.initialLoadGoToLastPage) {
                appState.initialLoadGoToLastPage = false; 
                
                if (appState.initialHash) {
                    await paginationControls.findAndGoToMessage(appState.initialHash);
                } else {
                    try {
                        const countQuery = await db.collection('forumMessages')
                                                 .where('isPinned', '==', false)
                                                 .get();
                        const totalDocs = countQuery.size;
                        const targetPage = Math.ceil(totalDocs / appState.MESSAGES_PER_PAGE);
                        await paginationControls.goToPage(targetPage > 0 ? targetPage : 1);
                    } catch (err) {
                        await paginationControls.goToPage(1);
                    }
                }
            } 
        });

        setupActions(db, elements, appState, paginationControls, FieldValue);
        setupInput(db, elements, appState, paginationControls, FieldValue);
    }
});