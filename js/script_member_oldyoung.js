document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('data-container');

    // Konfigurasi Grup dan Path JSON (Sesuaikan path jika berbeda)
    const groupsConfig = [
        { id: 'nogi', name: 'Nogizaka46', file: '../store/member/members.json', class: 'group-nogi' },
        { id: 'saku', name: 'Sakurazaka46', file: '../store/member/members_db_saku.json', class: 'group-saku' },
        { id: 'hina', name: 'Hinatazaka46', file: '../store/member/members_db_hina.json', class: 'group-hina' },
        { id: 'boku', name: 'Boku ga Mitakatta Aozora', file: '../store/member/members_db_boku.json', class: 'group-boku' }
    ];

    // Helper: Formatting Nama Romaji ke Title Case
    function toTitleCase(str) {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // Helper: Hitung Usia (Tahun dan Hari) menggunakan moment.js
    // Logika disesuaikan dari referensi script_calendar.js
    function calculateAge(birthDateString) {
        // Asumsi format di JSON adalah YYYY.MM.DD atau YYYY-MM-DD
        const normalizedDate = birthDateString.replace(/\./g, '-');
        const birthDate = moment(normalizedDate);
        const now = moment();
        
        // Hitung perbedaan tahun penuh
        let years = now.diff(birthDate, 'years');
        
        // Hitung ulang tahun terakhir di tahun ini
        const lastBirthday = birthDate.clone().add(years, 'years');
        
        // Jika ultah tahun ini belum lewat, moment.js diff 'years' sudah menangani,
        // tapi kita perlu pastikan untuk hitungan hari.
        
        // Hitung selisih hari dari ulang tahun terakhir
        const days = now.diff(lastBirthday, 'days');
        
        return { 
            years, 
            days, 
            // Simpan timestamp untuk sorting
            timestamp: birthDate.valueOf() 
        };
    }

    // Helper: Create HTML Card Member
    function createCardHTML(member, type) {
        const label = type === 'oldest' ? 'Tertua' : 'Termuda';
        const labelClass = type === 'oldest' ? 'oldest' : 'youngest';
        const formattedDate = moment(member.lahir.replace(/\./g, '-')).locale('id').format('DD MMMM YYYY');
        
        return `
            <div class="member-card ${labelClass}">
                <div class="card-label">${label}</div>
                <img src="${member.foto_profil}" alt="${member.nama_romaji}" loading="lazy">
                <div class="member-name-jp jpn">${member.nama_jp}</div>
                <div class="member-name-romaji">${toTitleCase(member.nama_romaji)}</div>
                <div class="member-dob">${formattedDate}</div>
                <div class="member-age">
                    <span class="age-years">${member.ageData.years} Tahun</span>
                    <span class="age-days">${member.ageData.days} Hari</span>
                </div>
            </div>
        `;
    }

    async function processGroup(config) {
        try {
            const response = await fetch(config.file);
            if (!response.ok) throw new Error('Gagal load JSON');
            const data = await response.json();
            
            const activeMembers = data
                .filter(m => m.status === 'aktif')
                .map(m => {
                    m.ageData = calculateAge(m.lahir);
                    return m;
                });

            if (activeMembers.length === 0) return '';

            activeMembers.sort((a, b) => a.ageData.timestamp - b.ageData.timestamp);

            const oldestOverall = activeMembers[0];
            const youngestOverall = activeMembers[activeMembers.length - 1];

            const gensData = {};
            activeMembers.forEach(m => {
                const genLabel = m.gen;
                if (!gensData[genLabel]) gensData[genLabel] = [];
                gensData[genLabel].push(m);
            });

            let html = `
                <div class="group-section ${config.class}">
                    <div class="group-header jpn">${config.name}</div>
                    
                    <div class="overall-container">
                        <div class="section-title">Keseluruhan Grup</div>
                        <div class="cards-container">
                            ${createCardHTML(oldestOverall, 'oldest')}
                            ${createCardHTML(youngestOverall, 'youngest')}
                        </div>
                    </div>
            `;

            const sortedGens = Object.keys(gensData).sort((a, b) => {
                return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'});
            });

            if (sortedGens.length > 1) {
                html += `
                    <div class="generations-wrapper">
                `;

                sortedGens.forEach(genLabel => {
                    const genMembers = gensData[genLabel];
                    const oldestGen = genMembers[0];
                    const youngestGen = genMembers[genMembers.length - 1];

                    html += `
                        <div class="gen-box">
                            <div class="section-title jpn">${genLabel}</div>
                            <div class="cards-container">
                                ${createCardHTML(oldestGen, 'oldest')}
                                ${createCardHTML(youngestGen, 'youngest')}
                            </div>
                        </div>
                    `;
                });

                html += `
                    </div>
                `;
            }

            html += `
                </div>
            `;

            return html;

        } catch (error) {
            console.error(`Error processing ${config.name}:`, error);
            return `<div class="error">Gagal memuat data ${config.name}.</div>`;
        }
    }
	
    // Fungsi Utama memproses satu grup
    async function processGroup(config) {
        try {
            const response = await fetch(config.file);
            if (!response.ok) throw new Error('Gagal load JSON');
            const data = await response.json();
            
            // 1. Filter Status AKTIF & Hitung Usia
            const activeMembers = data
                .filter(m => m.status === 'aktif')
                .map(m => {
                    m.ageData = calculateAge(m.lahir);
                    return m;
                });

            if (activeMembers.length === 0) return ''; // Skip jika tidak ada member aktif

            // 2. Sorting berdasarkan usia (Timestamp lahir terkecil = tertua)
            activeMembers.sort((a, b) => a.ageData.timestamp - b.ageData.timestamp);

            const oldestOverall = activeMembers[0];
            const youngestOverall = activeMembers[activeMembers.length - 1];

            // 3. Pengelompokan per Generasi
            const gensData = {};
            activeMembers.forEach(m => {
                const genLabel = m.gen; // Misal "1st Generation"
                if (!gensData[genLabel]) gensData[genLabel] = [];
                gensData[genLabel].push(m);
            });

            // --- Mulai Generate HTML ---
            let html = `
                <div class="group-section ${config.class}">
                    <div class="group-header jpn">${config.name}</div>
                    
                    <div class="overall-container">
                        <div class="section-title">Keseluruhan Grup</div>
                        <div class="cards-container">
                            ${createCardHTML(oldestOverall, 'oldest')}
                            ${createCardHTML(youngestOverall, 'youngest')}
                        </div>
                    </div>
                    
                    <div class="generations-wrapper">
            `;

            // Sort nama generasi (misal 1st sebelum 2nd)
            const sortedGens = Object.keys(gensData).sort((a, b) => {
                return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'});
            });

            sortedGens.forEach(genLabel => {
                const genMembers = gensData[genLabel];
                // genMembers sudah ter-sort karena referensi dari activeMembers
                const oldestGen = genMembers[0];
                const youngestGen = genMembers[genMembers.length - 1];

                html += `
                    <div class="gen-box">
                        <div class="section-title jpn">${genLabel}</div>
                        <div class="cards-container">
                            ${createCardHTML(oldestGen, 'oldest')}
                            ${createCardHTML(youngestGen, 'youngest')}
                        </div>
                    </div>
                `;
            });

            html += `
                    </div> </div> `;

            return html;

        } catch (error) {
            console.error(`Error processing ${config.name}:`, error);
            return `<div class="error">Gagal memuat data ${config.name}.</div>`;
        }
    }

    // Load semua grup berurutan
    async function loadAllGroups() {
        container.innerHTML = '<div class="loading">Memuat data member...</div>';
        let finalHTML = '';
        
        for (const config of groupsConfig) {
            finalHTML += await processGroup(config);
        }
        
        container.innerHTML = finalHTML;
    }

    loadAllGroups();
});