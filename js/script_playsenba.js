document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENT REFERENCES ---
    const memberPool = document.getElementById('member-pool');
    const formationGrid = document.getElementById('formation-grid');
    const formationRows = document.querySelectorAll('.formation-row');
    const saveButton = document.getElementById('save-button');
    const captionInput = document.getElementById('caption-input');
    const publicFeed = document.getElementById('public-feed');
    const authStatus = document.getElementById('auth-status');
    const includeGraduatesToggle = document.getElementById('include-graduates');
    const resetButton = document.getElementById('reset-button');
    const toggleFeedBtn = document.getElementById('toggle-feed-btn');
    const focusModeBtn = document.getElementById('focus-mode-btn');
    const publicFeedContainer = document.getElementById('public-feed-container');
    const mainContainer = document.querySelector('.senba-creator-container');
    const builderTitle = document.getElementById('builder-title');
    const formationStatsContainer = document.getElementById('formation-stats');
    const modal = document.getElementById('senbatsu-modal');
    const modalCloseBtn = modal.querySelector('.modal-close-btn');
    const showFeedFab = document.getElementById('show-feed-fab');

    // --- STATE VARIABLES ---
    let allMembersData = [];
    let memberShortNames = {};
    let draggedItem = null;
    let currentUserLikes = new Set();

    // --- FIREBASE SETUP ---
    const db = firebase.firestore();
    const auth = firebase.auth();

    // --- INITIALIZATION ---
    const initializeApp = async () => {
        try {
            const [memberResponse, shortNameResponse] = await Promise.all([
                fetch('../store/member/members.json'),
                fetch('../store/member/member_short.json')
            ]);
            allMembersData = await memberResponse.json();
            allMembersData.forEach((member, index) => member.originalIndex = index);
            memberShortNames = await shortNameResponse.json();
            
            updateMemberPool();
            setupDragAndDropListeners();
            setupRowResizing();
            setupRemoveButtonListener();
            loadPublicFeed();
            updateFormationStats();
        } catch (error) {
            console.error('Gagal memuat data member:', error);
            memberPool.innerHTML = 'Gagal memuat data member.';
        }
    };

    // --- MEMBER POOL & ELEMENT CREATION ---
    const updateMemberPool = () => {
        const includeGraduates = includeGraduatesToggle.checked;
        const formationMemberIds = new Set(Array.from(document.querySelectorAll('.formation-row .member-item')).map(el => el.dataset.memberId));
        const membersToShow = (includeGraduates ? allMembersData : allMembersData.filter(m => m.status === 'aktif'))
            .filter(m => !formationMemberIds.has(m.id));
        populateMemberPool(membersToShow);
    };

    const populateMemberPool = (members) => {
        memberPool.innerHTML = '';
        members.sort((a, b) => a.originalIndex - b.originalIndex).forEach(member => {
            memberPool.appendChild(createMemberElement(member, false));
        });
    };
    
    // PERUBAHAN: Menambahkan class dinamis dan tombol remove kondisional
    const createMemberElement = (member, isForFormation, isOwner = true) => {
        const memberEl = document.createElement('div');
        memberEl.classList.add('member-item');
        // Tambah class untuk border
        memberEl.classList.add(member.status === 'lulus' ? 'lulus' : `gen-${member.gen.replace('期', '')}`);
        if(member.status === 'aktif') memberEl.classList.add('aktif');

        memberEl.setAttribute('draggable', true);
        memberEl.dataset.memberId = member.id;
        const memberIdUnderscore = member.id.replace(/-/g, '_');
        
        // Tombol [X] hanya muncul jika di formasi DAN user adalah pemiliknya
        const removeButtonHTML = isForFormation && isOwner ? '<button class="remove-member-btn" title="Hapus member">&times;</button>' : '';

        memberEl.innerHTML = `
            ${removeButtonHTML}
            <img src="../sprite/formframe/${memberIdUnderscore}.svg" class="svg-overlay" alt="frame">
            <img src="${member.foto_profil}" alt="${member.nama_romaji}" class="member-photo">
            <div class="member-name">${member.nama_romaji.split(' ')[0]}</div>
        `;
        return memberEl;
    };

    // --- DRAG & DROP LOGIC ---
    function setupDragAndDropListeners() {
        document.addEventListener('dragstart', e => {
            if (e.target.classList.contains('member-item')) {
                draggedItem = e.target;
                setTimeout(() => draggedItem.classList.add('dragging'), 0);
            }
        });

        document.addEventListener('dragend', () => {
            if (draggedItem) {
                draggedItem.classList.remove('dragging');
                draggedItem = null;
            }
        });

        formationRows.forEach(row => {
            row.addEventListener('dragover', e => {
                e.preventDefault();
                const afterElement = getDragAfterElement(row, e.clientX);
                if (draggedItem) {
                    if (afterElement == null) {
                        row.appendChild(draggedItem);
                    } else {
                        row.insertBefore(draggedItem, afterElement);
                    }
                }
            });

            row.addEventListener('drop', e => {
                e.preventDefault();
                // Jika item yang di-drop berasal dari pool (belum punya tombol X)
                if (draggedItem && !draggedItem.querySelector('.remove-member-btn')) {
                    const memberId = draggedItem.dataset.memberId;
                    const memberData = allMembersData.find(m => m.id === memberId);
                    // Buat elemen baru yang memiliki tombol X
                    const newFormationElement = createMemberElement(memberData, true, true);
                    
                    draggedItem.parentElement.replaceChild(newFormationElement, draggedItem);
                    draggedItem = null;
                }
                
                // updateMemberPool();
                validateAndStyleFormation();
                updateFormationStats();
                formationRows.forEach(adjustRowScaling);
            });
        });
    }

    function getDragAfterElement(container, x) {
        const draggableElements = [...container.querySelectorAll('.member-item:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

	function setupRemoveButtonListener() {
		formationGrid.addEventListener('click', e => {
			if (e.target.classList.contains('remove-member-btn')) {
				const memberItem = e.target.closest('.member-item');
				const parentRow = memberItem.parentElement;
				const memberId = memberItem.dataset.memberId; // Ambil ID member
				
				memberItem.remove(); // Hapus dari baris formasi

				const memberData = allMembersData.find(m => m.id === memberId);
				if (memberData) {
					const newPoolItem = createMemberElement(memberData, false);
					memberPool.appendChild(newPoolItem);
				}
				
				validateAndStyleFormation();
				updateFormationStats();
				adjustRowScaling(parentRow);
			}
		});
	}

    // --- FORMATION LOGIC & STYLING ---
	function validateAndStyleFormation() {
        // BARIS BARU: Hapus 'center-glow' dari SEMUA member di grid terlebih dahulu.
        document.querySelectorAll('#formation-grid .member-item').forEach(member => member.classList.remove('center-glow'));

        const row3 = document.getElementById('row3');
        const row2 = document.getElementById('row2');
        const row1 = document.getElementById('row1');

        // Validasi jumlah member antar baris
        row2.classList.toggle('invalid-row', row2.children.length > row3.children.length);
        row1.classList.toggle('invalid-row', row1.children.length > row2.children.length);
        
        // Logika untuk menerapkan glow HANYA pada baris pertama (row1)
        const row1Members = Array.from(row1.children);
        const row1Count = row1Members.length;

        if (row1Count > 0) {
            if (row1Count % 2 !== 0) {
                // Jumlah ganjil, center hanya 1
                row1Members[Math.floor(row1Count / 2)].classList.add('center-glow');
            } else {
                // Jumlah genap, center ada 2
                const centerIndex1 = row1Count / 2 - 1;
                const centerIndex2 = row1Count / 2;
                if(row1Members[centerIndex1]) row1Members[centerIndex1].classList.add('center-glow');
                if(row1Members[centerIndex2]) row1Members[centerIndex2].classList.add('center-glow');
            }
        }
    }
    // Logika auto-scaling
	const adjustRowScaling = (row) => {
		const members = row.children;
		const memberCount = members.length;
		
		const viewportWidth = window.innerWidth;
		let baseScale = 1.6; // Default untuk layar besar > 1400px
		if (viewportWidth <= 1400) baseScale = 1.3; // Untuk layar laptop (e.g., 1366px)
		if (viewportWidth < 1024) baseScale = 1.1; // Untuk layar lebih kecil / tablet

		const baseGap = 40;
		const gapStep = 5;
		const baseMemberWidth = 70;

		if (memberCount === 0) {
			row.style.gap = `${baseGap}px`;
			return;
		}

		const rowWidth = row.clientWidth;
		let finalScale = baseScale;

		// Hitung lebar yang dibutuhkan dengan baseScale yang sudah disesuaikan
		const requiredWidth = (baseMemberWidth * finalScale * memberCount) + (baseGap * (memberCount - 1));

		// Jika MASIH tidak muat (misal karena ada banyak member), kecilkan lagi
		if (requiredWidth > rowWidth && rowWidth > 0) {
			const availableWidth = rowWidth - 10; // Beri sedikit margin
			const idealMemberWidth = (availableWidth - (baseGap * (memberCount - 1))) / memberCount;
			const idealScale = idealMemberWidth / baseMemberWidth;
			finalScale = Math.floor(idealScale * 10) / 10; // Bulatkan ke bawah
		}

		finalScale = Math.max(0.8, finalScale); // Batasi skala minimum agar tidak terlalu kecil

		// Hitung gap baru berdasarkan skala akhir, dibanding skala terbesar (1.6)
		const scaleStepsDown = Math.round((1.6 - finalScale) * 10);
		const newGap = Math.max(5, baseGap - (scaleStepsDown * gapStep));

		// Terapkan skala dan gap yang baru
		row.style.gap = `${newGap}px`;
		Array.from(members).forEach(member => {
			member.style.transform = `scale(${finalScale})`;
		});
	};

    function setupRowResizing() {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                adjustRowScaling(entry.target);
            }
        });
        formationRows.forEach(row => resizeObserver.observe(row));
    }

    function updateFormationStats(container = formationStatsContainer, memberIds = []) {
        if (memberIds.length === 0) {
            memberIds = Array.from(document.querySelectorAll('.formation-row .member-item')).map(el => el.dataset.memberId);
        }
        
        const stats = { total: memberIds.length, "3期": 0, "4期": 0, "5期": 0, "6期": 0 };
        memberIds.forEach(id => {
            const memberData = allMembersData.find(m => m.id === id);
            if (memberData && stats.hasOwnProperty(memberData.gen)) {
                stats[memberData.gen]++;
            }
        });

        container.innerHTML = '';
        const createStatBox = (label, value) => `<div class="info-data-min"><div class="statusmember">${label}</div><div class="info-count">${value}</div></div>`;
        container.innerHTML += createStatBox('人数', stats.total);
        ['3期', '4期', '5期', '6期'].forEach(gen => {
            if (stats[gen] > 0) {
                container.innerHTML += createStatBox(gen, stats[gen]);
            }
        });
    }

    
    // --- FIREBASE & FEED ACTIONS ---
    saveButton.addEventListener('click', async () => {
        const user = auth.currentUser;
        if (!user) return alert('Anda harus login untuk menyimpan!');

        const formationData = {
            row1: Array.from(document.getElementById('row1').children).map(el => el.dataset.memberId),
            row2: Array.from(document.getElementById('row2').children).map(el => el.dataset.memberId),
            row3: Array.from(document.getElementById('row3').children).map(el => el.dataset.memberId),
        };
        if (formationData.row1.length === 0 && formationData.row2.length === 0 && formationData.row3.length === 0) return alert('Formasi tidak boleh kosong!');

        const dataToSave = {
            userId: user.uid, userName: user.displayName, userPhotoURL: user.photoURL,
            caption: captionInput.value.trim(),
            formation: formationData,
            title: builderTitle.textContent,
            likeCount: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            saveButton.disabled = true; saveButton.textContent = 'Menyimpan...';
            
            const docRef = await db.collection('userSenbatsu').add(dataToSave);
            const newDocSnapshot = await docRef.get();
            
            const placeholder = publicFeed.querySelector('.feed-placeholder');
            if (placeholder) placeholder.remove();

            const newFeedItem = createFeedItem(newDocSnapshot);
            publicFeed.prepend(newFeedItem);

            alert('Formasi berhasil disimpan!');
            resetFormation();

        } catch (error) { 
            console.error('Gagal menyimpan:', error); 
            alert('Gagal menyimpan formasi.');
        } finally { 
            saveButton.disabled = false; 
            saveButton.innerHTML = '<span class="jpn">保存して共有</span>'; 
        }
    });

    const loadPublicFeed = async () => {
        publicFeed.innerHTML = 'Memuat...';
        const user = auth.currentUser;
        if (user) {
            const likesSnapshot = await db.collectionGroup('likes').where('userId', '==', user.uid).get();
            currentUserLikes = new Set(likesSnapshot.docs.map(doc => doc.ref.parent.parent.id));
        }

        try {
            const snapshot = await db.collection('userSenbatsu').orderBy('createdAt', 'desc').limit(20).get();
            if (snapshot.empty) {
                publicFeed.innerHTML = '<div class="feed-placeholder">Belum ada yang membuat formasi.</div>';
                return;
            }

            publicFeed.innerHTML = '';
            const docs = snapshot.docs;
            docs.sort((a, b) => {
                if (!user) return 0;
                const aIsOwner = a.data().userId === user.uid;
                const bIsOwner = b.data().userId === user.uid;
                if (aIsOwner && !bIsOwner) return -1;
                if (!aIsOwner && bIsOwner) return 1;
                return 0;
            });
            docs.forEach(doc => publicFeed.appendChild(createFeedItem(doc)));
        } catch (error) {
            console.error('Gagal memuat feed:', error);
            publicFeed.innerHTML = 'Gagal memuat data.';
        }
    };

    const createFeedItem = (doc) => {
        const data = doc.data();
        const item = document.createElement('div');
        item.className = 'public-feed-item';
        item.dataset.docId = doc.id;
        
        const user = auth.currentUser;
        const isOwner = user && user.uid === data.userId;
        const isLiked = currentUserLikes.has(doc.id);
        
        const likeIcon = isLiked ? 'like_x.svg' : 'like_v.svg';
        
        // PERUBAHAN: Teks tombol menjadi 'IMPORT' jika bukan pemilik
        const actionButtonText = isOwner ? 'EDIT' : 'IMPORT';
        let actionButtonsHTML = `<button class="feed-btn edit-btn" data-doc-id="${doc.id}">${actionButtonText}</button>`;
        if (isOwner) {
            actionButtonsHTML += `<button class="feed-btn delete-btn delete" data-doc-id="${doc.id}">HAPUS</button>`;
        }

        item.innerHTML = `
            <div class="feed-user">
                <img src="${data.userPhotoURL}" alt="${data.userName}">
                <span class="user-name">${data.title || data.userName}</span>
            </div>
            <p class="feed-caption">${data.caption || '<i>Tanpa caption</i>'}</p>
            <div class="feed-formation-container" data-doc-id="${doc.id}">
                <div class="feed-formation">
                    ${generateFeedNameFormationHTML(data.formation)}
                </div>
            </div>
            <div class="feed-actions">
                <div class="like-container">
                    <button class="like-button" data-doc-id="${doc.id}" data-liked="${isLiked}">
                        <img src="../sprite/element/${likeIcon}" alt="like">
                    </button>
                    <span class="like-count">${data.likeCount || 0}</span>
                </div>
                <div class="action-buttons">
                    ${actionButtonsHTML}
                </div>
            </div>
        `;
        return item;
    };

    const generateFeedNameFormationHTML = (formation) => {
        const allMemberIds = [...(formation.row3 || []), ...(formation.row2 || []), ...(formation.row1 || [])];
        const formationMembers = allMemberIds.map(id => allMembersData.find(m => m.id === id)).filter(Boolean);
        
        const surnameCounts = formationMembers.reduce((acc, member) => {
            const surname = member.nama_romaji.split(' ')[0];
            acc[surname] = (acc[surname] || 0) + 1;
            return acc;
        }, {});

        const getDisplayName = (member) => {
            const romajiName = member.nama_romaji;
            const shortNameData = memberShortNames[romajiName];
            if (!shortNameData) return '?';

            const surname = member.nama_romaji.split(' ')[0];
            const kanjiSurname = shortNameData[0];
            const kanjiGivenName = shortNameData[1];

            return surnameCounts[surname] > 1 ? kanjiGivenName : kanjiSurname;
        };

        const generateRow = (rowIds) => {
            return rowIds.map(id => {
                const member = allMembersData.find(m => m.id === id);
                return member ? `<div class="feed-member-name">${getDisplayName(member)}</div>` : '';
            }).join('');
        };
        
        return `
            <div class="feed-row">${generateRow(formation.row3 || [])}</div>
            <div class="feed-row">${generateRow(formation.row2 || [])}</div>
            <div class="feed-row">${generateRow(formation.row1 || [])}</div>
        `;
    };

    // --- UI EVENT LISTENERS ---
    includeGraduatesToggle.addEventListener('change', updateMemberPool);

    function resetFormation() {
        formationRows.forEach(row => {
            row.innerHTML = '';
            adjustRowScaling(row);
        });
        captionInput.value = '';
        updateMemberPool();
        validateAndStyleFormation();
        updateFormationStats();
    }
    resetButton.addEventListener('click', () => {
        if (confirm('Anda yakin ingin mengosongkan formasi?')) {
            resetFormation();
        }
    });

    publicFeed.addEventListener('click', async e => {
        const target = e.target;
        const docId = target.closest('[data-doc-id]')?.dataset.docId;
        if (!docId) return;

        if (target.closest('.delete-btn')) {
            if (confirm('Anda yakin ingin menghapus formasi ini?')) {
                try {
                    await db.collection('userSenbatsu').doc(docId).delete();
                    target.closest('.public-feed-item').remove();
                } catch (error) { console.error('Gagal hapus:', error); alert('Gagal menghapus.'); }
            }
        } else if (target.closest('.edit-btn')) {
            loadFormationForEditing(docId);
        } else if (target.closest('.like-button')) {
            handleLike(docId, target.closest('.like-button'));
        } else if (target.closest('.feed-formation-container')) {
            openFormationModal(docId);
        }
    });

    const loadFormationForEditing = async (docId) => {
        try {
            const doc = await db.collection('userSenbatsu').doc(docId).get();
            if (!doc.exists) return alert('Formasi tidak ditemukan.');

            const data = doc.data();
            resetFormation();

            captionInput.value = data.caption || '';
            builderTitle.textContent = data.title || 'Edit Formasi';

            Object.entries(data.formation).forEach(([rowKey, memberIds]) => {
                const rowEl = document.getElementById(rowKey);
                if (rowEl) {
                    memberIds.forEach(id => {
                        const memberData = allMembersData.find(m => m.id === id);
                        if (memberData) {
                            rowEl.appendChild(createMemberElement(memberData, true));
                        }
                    });
                }
            });
            updateMemberPool();
            validateAndStyleFormation();
            updateFormationStats();
            formationRows.forEach(adjustRowScaling);
            window.scrollTo(0, 0);
            alert('Formasi dimuat ke editor. Jangan lupa simpan ulang setelah mengedit.');
        } catch (error) {
            console.error('Gagal memuat formasi:', error);
            alert('Gagal memuat formasi untuk diedit.');
        }
    };

    const handleLike = async (docId, button) => {
        const user = auth.currentUser;
        if (!user) return alert('Anda harus login untuk menyukai formasi.');

        const isCurrentlyLiked = button.dataset.liked === 'true';
        const docRef = db.collection('userSenbatsu').doc(docId);
        const likeRef = docRef.collection('likes').doc(user.uid);

        const likeCountEl = button.nextElementSibling;
        const currentCount = parseInt(likeCountEl.textContent);
        const img = button.querySelector('img');

        button.dataset.liked = !isCurrentlyLiked;
        if (!isCurrentlyLiked) {
            likeCountEl.textContent = currentCount + 1;
            img.src = '../sprite/element/like_x.svg';
            currentUserLikes.add(docId);
        } else {
            likeCountEl.textContent = currentCount - 1;
            img.src = '../sprite/element/like_v.svg';
            currentUserLikes.delete(docId);
        }

        try {
            await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(docRef);
                if (!doc.exists) throw "Document does not exist!";
                
                const newLikeCount = (doc.data().likeCount || 0) + (isCurrentlyLiked ? -1 : 1);
                
                transaction.update(docRef, { likeCount: newLikeCount });
                if (isCurrentlyLiked) {
                    transaction.delete(likeRef);
                } else {
                    transaction.set(likeRef, { userId: user.uid, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
                }
            });
        } catch (error) {
            console.error("Gagal melakukan like/unlike:", error);
            button.dataset.liked = isCurrentlyLiked;
            likeCountEl.textContent = currentCount;
            img.src = `../sprite/element/${isCurrentlyLiked ? 'like_x.svg' : 'like_v.svg'}`;
            isCurrentlyLiked ? currentUserLikes.add(docId) : currentUserLikes.delete(docId);
            alert('Gagal memberikan like. Coba lagi.');
        }
    };
    
    // PERUBAHAN: Menampilkan like count & tombol X kondisional
	const openFormationModal = async (docId) => {
        try {
            const doc = await db.collection('userSenbatsu').doc(docId).get();
            if (!doc.exists) return;
            const data = doc.data();
            const user = auth.currentUser;
            const isOwner = user && user.uid === data.userId;

            modal.querySelector('#modal-user-photo').src = data.userPhotoURL;
            modal.querySelector('#modal-title').textContent = data.title;
            modal.querySelector('#modal-caption').innerHTML = data.caption || '<i>Tanpa caption</i>';
            
            const modalLikeInfo = modal.querySelector('#modal-like-info');
            modalLikeInfo.innerHTML = `
                <img src="../sprite/element/like_x.svg" alt="like">
                <span class="like-count">${data.likeCount || 0}</span>
            `;

            const grid = modal.querySelector('#modal-formation-grid');
            grid.innerHTML = '';
            const allMemberIds = [];

            ['row3', 'row2', 'row1'].forEach(rowKey => {
                const memberIds = data.formation[rowKey] || [];
                allMemberIds.push(...memberIds);
                const rowWrapper = document.createElement('div');
                rowWrapper.className = 'row-wrapper';
                const rowEl = document.createElement('div');
                rowEl.className = 'formation-row';
                
                memberIds.forEach(id => {
                    const memberData = allMembersData.find(m => m.id === id);
                    if (memberData) rowEl.appendChild(createMemberElement(memberData, true, isOwner));
                });
                
                rowWrapper.innerHTML = `<span class="row-label jpn">${rowKey === 'row1' ? 'フロント' : rowKey.replace('row', '')+'列'}</span>`;
                rowWrapper.appendChild(rowEl);
                grid.appendChild(rowWrapper);
                
                // BARIS YANG MEMANGGIL adjustRowScaling TELAH DIHAPUS DARI SINI
            });

            updateFormationStats(modal.querySelector('#modal-stats'), allMemberIds);
            modal.classList.add('is-visible');
        } catch (error) {
            console.error("Gagal membuka modal:", error);
        }
    };

    modalCloseBtn.addEventListener('click', () => modal.classList.remove('is-visible'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('is-visible'); });

    // PERUBAHAN: Logika untuk tombol hide/show feed dan tombol flying
    toggleFeedBtn.addEventListener('click', () => {
        const isHidden = publicFeedContainer.classList.toggle('is-hidden');
        const icon = toggleFeedBtn.querySelector('i');
        icon.className = isHidden ? 'fas fa-eye' : 'fas fa-eye-slash';
        
        // Tampilkan tombol flying jika feed disembunyikan
        if (isHidden) {
            showFeedFab.classList.add('visible');
        } else {
            showFeedFab.classList.remove('visible');
        }
    });

    showFeedFab.addEventListener('click', () => {
        publicFeedContainer.classList.remove('is-hidden');
        toggleFeedBtn.querySelector('i').className = 'fas fa-eye-slash';
        showFeedFab.classList.remove('visible');
    });

    focusModeBtn.addEventListener('click', () => { mainContainer.classList.toggle('focus-mode'); });
    
    builderTitle.addEventListener('click', () => { if (auth.currentUser) { builderTitle.contentEditable = true; builderTitle.focus(); } });
    builderTitle.addEventListener('blur', () => {
        builderTitle.contentEditable = false;
        if (builderTitle.textContent.trim() === '' && auth.currentUser) {
            builderTitle.textContent = `${auth.currentUser.displayName}の選抜フォーメーション`;
        }
    });
    builderTitle.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); builderTitle.blur(); } });

    auth.onAuthStateChanged(user => {
        saveButton.disabled = !user;
        if (user) {
            authStatus.textContent = `Login sebagai ${user.displayName}.`;
            if (builderTitle.textContent === 'あなたの選抜フォーメーション') {
                builderTitle.textContent = `${user.displayName}の選抜フォーメーション`;
            }
        } else {
            authStatus.textContent = 'Login untuk menyimpan formasimu.';
            builderTitle.textContent = 'あなたの選抜フォーメーション';
        }
        loadPublicFeed();
    });

    // --- START THE APP ---
    initializeApp();
});