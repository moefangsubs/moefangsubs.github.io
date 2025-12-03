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

	async function renderAdminResult() {
        mainApp.style.maxWidth = '100%';
        mainApp.style.background = 'transparent'; 
        mainApp.style.boxShadow = 'none';
        
        pageContent.innerHTML = '<div class="spinner"></div><h2>Memuat Hasil Live...</h2>';
        
        const navControls = document.getElementById('nav-controls');
        if(navControls) navControls.style.display = 'none'; 
        
        const progressBar = document.getElementById('progress-bar');
        if(progressBar && progressBar.parentElement) progressBar.parentElement.style.display = 'none';

        const snapshot = await db.collection('moepoll').where('isdone', '==', 'done').get();
        const votes = [];
        snapshot.forEach(doc => votes.push(doc.data()));

        pageContent.innerHTML = `
            <div class="res-voter-count">Total Voters: ${votes.length}</div>
            <div class="result-container-wrapper">
                <button id="res-prev" class="result-nav-btn">❮</button>
                <div class="result-slides" id="result-slides"></div>
                <button id="res-next" class="result-nav-btn">❯</button>
            </div>
        `;

        const slidesContainer = document.getElementById('result-slides');
        const pollSections = POLL_CONFIG.filter(c => c.type === 'song' || c.type === 'member');
        let currentSlide = 0;

        for (const config of pollSections) {
            const scores = {};
            // Poin maksimal sesuai limit voting (misal 3 atau 5)
            const maxPoints = config.limit;

            votes.forEach(v => {
                const userChoices = v[config.id] || [];
                userChoices.forEach((choiceId, idx) => {
                    const points = maxPoints - idx;
                    if(points > 0) scores[choiceId] = (scores[choiceId] || 0) + points;
                });
            });

            const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
            const rankedData = [];
            let currentRank = 1;
            
            sorted.forEach((item, idx) => {
                const [id, score] = item;
                if (idx > 0 && score < sorted[idx - 1][1]) {
                    currentRank = idx + 1;
                }
                
                let meta = { title: id, img: '' };
                
                if (config.type === 'song') {
                    meta.img = getPollThumbnail(id);
                    // Fallback to CD Cover logic if needed for admin display
                    for (const [key, value] of Object.entries(songData)) {
                        if (Array.isArray(value)) {
                            const found = value.find(s => s.titleRo === id);
                            if (found) {
                                meta.cdCover = getCoverArtUrl('nogizaka46', key, found);
                                break;
                            }
                        }
                    }
                } else if (config.type === 'member') {
                    const found = memberData.find(m => m.nama_romaji === id);
                    if (found) meta.img = found.foto_profil;
                }

                rankedData.push({ ...meta, score, rank: currentRank });
            });

            const slide = document.createElement('div');
            slide.className = 'result-slide';
            
            slide.innerHTML = `
                <div class="result-header-main">
                    <h2 class="res-title">${config.title}</h2>
                </div>
                <div class="podium-container" id="podium-row-1"></div>
                <div class="podium-row-2" id="podium-row-2"></div>
                <div class="result-list-container"></div>
            `;

            const podiumRow1 = slide.querySelector('#podium-row-1');
            const podiumRow2 = slide.querySelector('#podium-row-2');
            const listContainer = slide.querySelector('.result-list-container');

            // --- SPLIT DATA ---
            // Kita paksa ambil Top 5 untuk display podium, berapapun limit votingnya
            const top3Data = rankedData.slice(0, 3);   // Rank 1-3
            const midData = rankedData.slice(3, 5);    // Rank 4-5
            const listData = rankedData.slice(5);      // Rank 6+

            const renderCard = (container, data) => {
                const card = document.createElement('div');
                card.className = `podium-card rank-${data.rank} ${config.type}-card`;
                
                const fallbackImg = data.cdCover || 'https://ik.imagekit.io/moearchive/poll/nogi.png';
                
                card.innerHTML = `
                    <div class="rank-badge">${data.rank}</div>
                    <div class="podium-img-wrapper">
                        <img src="${data.img}" onerror="this.src='${fallbackImg}'">
                    </div>
                    <div class="podium-info-wrapper">
                        <div class="podium-name">${data.title}</div>
                        <div class="podium-votes">${data.score} Poin</div>
                    </div>
                `;
                
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    
                    let transY = '';
                    if (container === podiumRow1) {
                         transY = `translateY(${data.rank === 1 ? '0' : (data.rank === 2 ? '30px' : '60px')})`;
                    }
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) ${transY}`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = ''; 
                    card.style.removeProperty('transform');
                });

                container.appendChild(card);
            };

            // Render Row 1 (Top 3)
            top3Data.forEach(d => renderCard(podiumRow1, d));

            // Render Row 2 (Rank 4 & 5)
            // Selalu tampilkan jika ada datanya, meskipun config.limit cuma 3
            if (midData.length > 0) {
                midData.forEach(d => renderCard(podiumRow2, d));
                podiumRow2.style.display = 'flex';
            } else {
                podiumRow2.style.display = 'none';
            }

            // Render List (Rest)
            if (listData.length > 0) {
                listData.forEach(data => {
                    const row = document.createElement('div');
                    row.className = 'res-list-item';
                    row.innerHTML = `
                        <span class="res-list-rank">#${data.rank}</span>
                        <span class="res-list-name">${data.title}</span>
                        <span class="res-list-score">${data.score} Poin</span>
                    `;
                    listContainer.appendChild(row);
                });
                
                if (listData.length > 5) {
                    const details = document.createElement('details');
                    const summary = document.createElement('summary');
                    summary.textContent = 'Lihat Peringkat Lengkap';
                    summary.style.cursor = 'pointer';
                    summary.style.padding = '10px';
                    summary.style.textAlign = 'center';
                    
                    while (listContainer.firstChild) {
                        details.appendChild(listContainer.firstChild);
                    }
                    details.insertBefore(summary, details.firstChild);
                    listContainer.appendChild(details);
                }
            } else {
                listContainer.style.display = 'none';
            }

            slidesContainer.appendChild(slide);
        }

        const slides = document.querySelectorAll('.result-slide');
        const updateSlider = () => {
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            slides.forEach((s, i) => {
                s.classList.toggle('active', i === currentSlide);
            });
        };

        document.getElementById('res-prev').addEventListener('click', () => {
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
            updateSlider();
        });

        document.getElementById('res-next').addEventListener('click', () => {
            currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
            updateSlider();
        });

        updateSlider();
    }
});