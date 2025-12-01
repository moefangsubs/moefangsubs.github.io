document.addEventListener('DOMContentLoaded', async () => {
    // --- Global State ---
    let currentUser = null;
    let userData = {
        email: '',
        status: 'voter',
        isdone: false,
        selections: {}
    };
    let currentPageIndex = 0;
    let songData = {};
    let memberData = [];
    const db = firebase.firestore();

    // --- DOM Elements ---
    const mainApp = document.getElementById('main-app');
    const loadingScreen = document.getElementById('loading-screen');
    const pageContent = document.getElementById('page-content');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const progressBar = document.getElementById('progress-bar');
    const pageIndicator = document.getElementById('page-indicator');
    
    // Create Indicator Container inside nav-controls dynamically or verify HTML structure
    // Kita asumsikan struktur HTML nav-controls disesuaikan via script ini
    const navControls = document.getElementById('nav-controls');
    // Bersihkan isi nav-controls lama dan buat struktur baru agar rapi
    navControls.innerHTML = '';
    
    const btnPrevEl = document.createElement('button');
    btnPrevEl.id = 'btn-prev';
    btnPrevEl.className = 'btn-nav hidden';
    btnPrevEl.textContent = 'KEMBALI';
    
    // Div group kanan untuk dot + tombol next
    const rightGroup = document.createElement('div');
    rightGroup.className = 'nav-right-group';
    
    const indicatorEl = document.createElement('div');
    indicatorEl.id = 'selection-indicator';
    indicatorEl.className = 'selection-indicator';
    
    const btnNextEl = document.createElement('button');
    btnNextEl.id = 'btn-next';
    btnNextEl.className = 'btn-nav';
    btnNextEl.textContent = 'MULAI';

    rightGroup.appendChild(indicatorEl);
    rightGroup.appendChild(btnNextEl);
    
    navControls.appendChild(btnPrevEl);
    navControls.appendChild(rightGroup);

    // --- Initialization ---
    firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = '../index.html';
            return;
        }
        currentUser = user;
        userData.email = user.email;
        
        await loadUserData();
        await loadResources();
        
        if (userData.isdone === 'done') {
            if (userData.status === 'admin') {
                renderAdminResult();
            } else {
                alert('Kamu sudah berpartisipasi! Terima kasih.');
                window.location.href = '../sitemap.html';
            }
        } else {
            renderPage(0);
        }
        
        loadingScreen.style.display = 'none';
    });

    async function loadUserData() {
        try {
            const doc = await db.collection('moepoll').doc(currentUser.uid).get();
            if (doc.exists) {
                const data = doc.data();
                userData.status = data.status || 'voter';
                userData.isdone = data.isdone || false;
                if (data.selections) userData.selections = data.selections; // Load prev selections if saved
            } else {
                await db.collection('moepoll').doc(currentUser.uid).set({
                    email: currentUser.email,
                    status: 'voter',
                    isdone: false
                });
            }
        } catch (e) {
            console.error("Error loading user data", e);
        }
    }

    async function loadResources() {
        try {
            const songRes = await fetch('../store/single/songall.json');
            songData = await songRes.json();
            const memberRes = await fetch('../store/member/members.json');
            memberData = await memberRes.json();
        } catch (e) {
            console.error("Error loading JSON", e);
            alert("Gagal memuat data. Silakan refresh.");
        }
    }

    // --- Helper: Romaji Converter ---
    function getRomajiName(jpName) {
        // Hapus (AKB48) atau suffix lain jika ada, untuk pencarian murni
        const cleanName = jpName.replace(/ \(.*?\)/, '').trim();
        const member = memberData.find(m => m.nama_jp === cleanName);
        return member ? member.nama_romaji : jpName; // Fallback ke JP jika tidak ketemu
    }

    // --- Helper: Generate Poll Thumbnail URL ---
    function getPollThumbnail(titleRo) {
        if (!titleRo) return '';
        
        // 1. Hapus tanda tanya (?) menggunakan regex
        // 2. Hapus spasi di awal/akhir string (trim) untuk keamanan
        // 3. Ganti semua spasi yang tersisa dengan underscore (_)
        const filename = titleRo
            .replace(/\?/g, '')  // Menghapus karakter ?
            .trim()              // Menghapus spasi di ujung
            .replace(/ /g, '_'); // Mengganti spasi menjadi underscore
            
        return `https://ik.imagekit.io/moearchive/poll/${filename}.jpg`;
    }

    // --- Navigation ---
    btnNextEl.addEventListener('click', async () => {
        const config = POLL_CONFIG[currentPageIndex];
        if (config.type === 'intro') {
            goNext();
        } else if (config.type === 'song' || config.type === 'member') {
            const currentSelections = getSelectedItems();
            userData.selections[config.id] = currentSelections;
            goNext();
        } else if (config.type === 'finish') {
            await submitVote();
        }
    });

    btnPrevEl.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            renderPage(currentPageIndex);
        }
    });

    function goNext() {
        if (currentPageIndex < POLL_CONFIG.length - 1) {
            currentPageIndex++;
            renderPage(currentPageIndex);
        }
    }

    async function submitVote() {
        btnNextEl.disabled = true;
        btnNextEl.textContent = 'Mengirim...';
        try {
            // Flatten selections into root object for easier querying, or keep structured
            // Disini kita simpan apa adanya sesuai struktur object selections
            // Tapi karena request user: "Setiap pilihan direkam... field poll_xx"
            // Kita spread userData.selections
            const payload = {
                isdone: 'done',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                ...userData.selections
            };
            
            await db.collection('moepoll').doc(currentUser.uid).update(payload);
            alert("Voting berhasil disimpan! Terima kasih.");
            window.location.href = '../sitemap.html';
        } catch (e) {
            console.error("Error submitting", e);
            alert("Gagal mengirim vote. Coba lagi.");
            btnNextEl.disabled = false;
            btnNextEl.textContent = 'SELESAI';
        }
    }

    // --- Rendering ---
    function renderPage(index) {
        const config = POLL_CONFIG[index];
        pageContent.innerHTML = ''; 
        window.scrollTo(0, 0);

        // Progress
        const progress = ((index + 1) / POLL_CONFIG.length) * 100;
        progressBar.style.width = `${progress}%`;
        // pageIndicator.textContent = ... (jika ada element indikator halaman, opsional)

        // Button Visibility
        btnPrevEl.classList.toggle('hidden', index === 0 || config.type === 'finish');
        
        // Button Text
        if (config.type === 'intro') btnNextEl.textContent = 'MULAI';
        else if (config.type === 'finish') btnNextEl.textContent = 'KIRIM';
        else btnNextEl.textContent = 'NEXT >';

        // Indicator Visibility (Hanya untuk Song & Member)
        indicatorEl.style.display = (config.type === 'song' || config.type === 'member') ? 'flex' : 'none';

        if (config.type === 'intro') renderIntro(config);
        else if (config.type === 'finish') renderFinish(config);
        else renderPoll(config);

        if (config.type === 'song' || config.type === 'member') {
            validateSelection(config);
        } else {
            btnNextEl.disabled = false;
        }
    }

    function renderIntro(config) {
        pageContent.innerHTML = `
            <div class="intro-box">
                <h1 class="intro-title">${config.title}</h1>
                <div class="intro-text">${config.desc}</div>
                <div class="time-bar">${config.date}</div>
            </div>`;
    }

    function renderFinish(config) {
        pageContent.innerHTML = `
            <div class="intro-box">
                <h1 class="intro-title">${config.title}</h1>
                <div class="intro-text">${config.desc}</div>
            </div>`;
    }

    function renderPoll(config) {
        const header = document.createElement('div');
        header.className = 'poll-header';
        header.innerHTML = `
            <h2 class="poll-title">${config.title}</h2>
            <p class="poll-desc">${config.desc.replace(/\n/g, '<br>')}</p>
        `;
        pageContent.appendChild(header);

        const grid = document.createElement('div');
        
        let gridClass = 'default-grid';
        if (config.type === 'song') {
            if (config.id === 'poll_8_gen6') {
                gridClass = 'tri-grid';
            } else {
                gridClass = 'wide-grid';
            }
        }
        
        grid.className = `poll-grid ${gridClass}`;

        const items = getPollItems(config);
        
        items.forEach(item => {
            const el = document.createElement('div');
            const typeClass = config.noImage ? 'unit-card' : `${config.type}-card`;
            el.className = `poll-item ${typeClass}`;
            
            el.dataset.id = item.id; 
            
            const selectedArray = userData.selections[config.id] || [];
            const selectedIndex = selectedArray.indexOf(item.id);
            
            if (selectedIndex > -1) {
                el.classList.add('selected');
                el.dataset.rank = selectedIndex + 1;
            }

            let contentHTML = '';

            if (config.noImage) {
                let memberStr = '';
                if (item.members && item.members.length > 0) {
                    const romajiNames = item.members.map(name => getRomajiName(name));
                    memberStr = romajiNames.join(', ');
                }

                contentHTML = `
                    <div class="poll-info">
                        <span class="poll-title-main">${item.title}</span>
                        <span class="poll-title-sub">${item.sub}</span>
                        ${config.showMembers && memberStr ? `<div class="unit-member-list">${memberStr}</div>` : ''}
                    </div>
                `;
            } else {
                contentHTML = `
                    <div class="poll-img-container">
                        <img src="${item.img}" loading="lazy" onerror="this.src='https://ik.imagekit.io/moearchive/poll/nogi.png'">
                    </div>
                    <div class="poll-info">
                        <span class="poll-title-main">${item.title}</span>
                        <span class="poll-title-sub">${item.sub}</span>
                    </div>
                `;
            }

            el.innerHTML = contentHTML;
            el.addEventListener('click', () => toggleSelection(el, config));
            grid.appendChild(el);
        });

        pageContent.appendChild(grid);
    }

    function getPollItems(config) {
        let items = [];
        if (config.source === 'songall') {
            for (const [key, value] of Object.entries(songData)) {
                if (Array.isArray(value)) {
                    value.forEach(song => {
                        if (config.filter(song, key)) {
                            // Image URL logic
                            const imgUrl = config.noImage ? '' : getPollThumbnail(song.titleRo);
                            
                            // Collect Members for Unit
                            let membersArr = [];
                            if (song.members0) membersArr = membersArr.concat(song.members0);
                            if (song.members1) membersArr = membersArr.concat(song.members1);
                            
                            items.push({
                                id: song.titleRo, 
                                title: song.titleRo,
                                sub: song.titleJp,
                                img: imgUrl,
                                members: membersArr
                            });
                        }
                    });
                }
            }
        } else if (config.source === 'member') {
            memberData.forEach(m => {
                if (config.filter(m)) {
                    items.push({
                        id: m.nama_romaji, 
                        title: m.nama_romaji,
                        sub: m.nama_jp,
                        img: m.foto_profil
                    });
                }
            });
        }
        return items;
    }

    function toggleSelection(el, config) {
        const id = el.dataset.id;
        
        if (!userData.selections[config.id]) {
            userData.selections[config.id] = [];
        }
        const currentSelections = userData.selections[config.id];
        const index = currentSelections.indexOf(id);

        if (index > -1) {
            currentSelections.splice(index, 1);
        } else {
            const max = config.exact ? config.limit : (config.limit || 99);
            if (currentSelections.length < max) {
                currentSelections.push(id);
            }
        }
        
        updateGridVisuals(config.id);
        validateSelection(config);
    }
	
	function updateGridVisuals(pollId) {
        const items = pageContent.querySelectorAll('.poll-item');
        const selections = userData.selections[pollId] || [];
        
        items.forEach(el => {
            const id = el.dataset.id;
            const index = selections.indexOf(id);
            
            if (index > -1) {
                el.classList.add('selected');
                el.setAttribute('data-rank', index + 1);
            } else {
                el.classList.remove('selected');
                el.removeAttribute('data-rank');
            }
        });
    }
	
    function getSelectedItems() {
        return Array.from(pageContent.querySelectorAll('.poll-item.selected')).map(el => el.dataset.id);
    }

    function validateSelection(config) {
        const count = pageContent.querySelectorAll('.poll-item.selected').length;
        let isValid = false;

        // Render Dots Indicator
        indicatorEl.innerHTML = '';
        // Jumlah dot adalah Limit maksimal
        const totalDots = config.limit; 
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            // Jika index i kurang dari count saat ini, warnanya ungu (filled)
            // Jika tidak, merah (empty)
            dot.className = `dot ${i < count ? 'filled' : 'empty'}`;
            indicatorEl.appendChild(dot);
        }

        // Validate Button
        if (config.exact) {
            isValid = count === config.limit;
        } else {
            const min = config.min !== undefined ? config.min : 1;
            const max = config.limit;
            isValid = count >= min && count <= max;
        }

        btnNextEl.disabled = !isValid;
        
        // Button Text Logic
        if (config.min === 0 && count === 0) {
            btnNextEl.textContent = 'SKIP >';
            btnNextEl.disabled = false;
        } else {
            btnNextEl.textContent = isValid ? 'NEXT >' : `Pilih ${config.limit}`;
        }
    }

    // --- ADMIN RESULT LOGIC ---
    async function renderAdminResult() {
        mainApp.style.maxWidth = '1200px';
        pageContent.innerHTML = '<h2>Memuat Hasil Live...</h2>';
        
        const navControls = document.getElementById('nav-controls');
        if(navControls) navControls.style.display = 'none'; 
        
        const progressBar = document.getElementById('progress-bar');
        if(progressBar && progressBar.parentElement) progressBar.parentElement.style.display = 'none';

        const snapshot = await db.collection('moepoll').where('isdone', '==', 'done').get();
        const votes = [];
        snapshot.forEach(doc => votes.push(doc.data()));

        pageContent.innerHTML = `<h1>HASIL SEMENTARA (${votes.length} Partisipan)</h1>`;

        const pollSections = POLL_CONFIG.filter(c => c.type === 'song' || c.type === 'member');

        for (const config of pollSections) {
            const scores = {};
            const maxPoints = config.limit;

            votes.forEach(v => {
                const userChoices = v[config.id] || [];
                userChoices.forEach((choiceId, idx) => {
                    const points = maxPoints - idx;
                    scores[choiceId] = (scores[choiceId] || 0) + points;
                });
            });

            const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'result-section';
            sectionDiv.innerHTML = `<h3 class="result-header">${config.title}</h3>`;

            const top3Div = document.createElement('div');
            top3Div.className = 'top-3-container';

            const listDiv = document.createElement('div');
            listDiv.className = 'rank-list';

            const poolItems = getPollItems(config);

            let currentRank = 1;
            
            sorted.forEach((item, idx) => {
                const [id, score] = item;
                
                if (idx > 0) {
                    const prevScore = sorted[idx - 1][1];
                    if (score < prevScore) {
                        currentRank = idx + 1;
                    }
                } else {
                    currentRank = 1;
                }

                let meta = { title: id, img: '' };
                if (config.source === 'songall') {
                    for (const [key, value] of Object.entries(songData)) {
                        if (Array.isArray(value)) {
                            const found = value.find(s => s.titleRo === id);
                            if (found) {
                                meta.img = getCoverArtUrl('nogizaka46', key, found);
                                break;
                            }
                        }
                    }
                } else if (config.source === 'member') {
                    const found = memberData.find(m => m.nama_romaji === id);
                    if (found) meta.img = found.foto_profil;
                }

                if (currentRank <= 3) {
                    const card = document.createElement('div');
                    card.className = `rank-card rank-${currentRank} ${config.type}-card`;
                    card.innerHTML = `
                        <div class="rank-badge">${currentRank}</div>
                        <img src="${meta.img}" onerror="this.src='https://ik.imagekit.io/moearchive/poll/nogi.png'">
                        <div class="rank-name-small">${meta.title}</div>
                        <div class="rank-votes">${score} Poin</div>
                    `;
                    top3Div.appendChild(card);
                } else {
                    const listItem = document.createElement('div');
                    listItem.className = 'rank-list-item';
                    listItem.innerHTML = `
                        <div class="rank-num">#${currentRank}</div>
                        <div class="rank-name">${meta.title}</div>
                        <div class="rank-count">${score} Poin</div>
                    `;
                    listDiv.appendChild(listItem);
                }
            });

            sectionDiv.appendChild(top3Div);
            
            if (listDiv.children.length > 0) {
                const details = document.createElement('details');
                const summary = document.createElement('summary');
                summary.textContent = 'Lihat Peringkat Lengkap';
                summary.style.cursor = 'pointer';
                summary.style.padding = '10px';
                
                details.appendChild(summary);
                details.appendChild(listDiv);
                sectionDiv.appendChild(details);
            }

            pageContent.appendChild(sectionDiv);
        }
    }
});