document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('academic-container');
    const filterGroup = document.getElementById('filter-group');
    const displayMode = document.getElementById('display-mode');

    let allMembers = [];

    const endpoints = [
        { id: 'nogi', url: '../store/member/members.json' },
        { id: 'saku', url: '../store/member/members_db_saku.json' },
        { id: 'hina', url: '../store/member/members_db_hina.json' },
        { id: 'boku', url: '../store/member/members_db_boku.json' }
    ];

    function toTitleCase(str) {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    function getAcademicLevel(birthAcademicYear) {
        const now = moment();
        let currentAcademicYear = now.year();
        
        if (now.month() < 3 || (now.month() === 3 && now.date() === 1)) {
            currentAcademicYear -= 1;
        }
        
        const diff = currentAcademicYear - birthAcademicYear;
        
        if (diff === 13) return "中学1年生";
        if (diff === 14) return "中学2年生";
        if (diff === 15) return "中学3年生";
        if (diff === 16) return "高校1年生";
        if (diff === 17) return "高校2年生";
        if (diff === 18) return "高校3年生";
        if (diff === 19) return "大学1年生";
        if (diff === 20) return "大学2年生";
        if (diff === 21) return "大学3年生";
        if (diff === 22) return "大学4年生";
        if (diff > 22) return "社会人世代";
        if (diff < 13) return "小学生"; 
        
        return "";
    }

    async function fetchData() {
        try {
            const requests = endpoints.map(ep => fetch(ep.url).then(res => res.json()).then(data => ({ id: ep.id, data })));
            const results = await Promise.all(requests);
            
            results.forEach(result => {
                result.data.forEach(m => {
                    if (m.status !== 'aktif') return;

                    const normalizedDate = m.lahir.replace(/\./g, '-');
                    const birthMoment = moment(normalizedDate);
                    
                    let academicYear = birthMoment.year();
                    if (birthMoment.month() < 3 || (birthMoment.month() === 3 && birthMoment.date() === 1)) {
                        academicYear -= 1;
                    }
                    
                    allMembers.push({
                        group: result.id,
                        nama_jp: m.nama_jp,
                        nama_romaji: toTitleCase(m.nama_romaji),
                        foto: m.foto_profil,
                        academicYear: academicYear,
                        timestamp: birthMoment.valueOf()
                    });
                });
            });

            renderUI();
        } catch (error) {
            console.error("Gagal load JSON:", error);
            container.innerHTML = '<p>Terjadi kesalahan saat memuat data.</p>';
        }
    }

    function renderUI() {
        const selectedGroup = filterGroup.value;
        const selectedMode = displayMode.value;

        let filtered = allMembers.filter(m => {
            return selectedGroup === 'all' || m.group === selectedGroup;
        });

        filtered.sort((a, b) => a.timestamp - b.timestamp);

        const groupedByAcademicYear = {};
        filtered.forEach(m => {
            if (!groupedByAcademicYear[m.academicYear]) groupedByAcademicYear[m.academicYear] = [];
            groupedByAcademicYear[m.academicYear].push(m);
        });

        const sortedYears = Object.keys(groupedByAcademicYear).sort((a, b) => parseInt(b) - parseInt(a));

        let html = '';
        sortedYears.forEach(year => {
            const parsedYear = parseInt(year);
            const nextYear = parsedYear + 1;
            const academicLabel = getAcademicLevel(parsedYear);
            const labelHtml = academicLabel ? `<span class="acad-level jpn">${academicLabel}</span>` : '';

            html += `
                <div class="year-row">
                    <div class="year-label">
                        <span class="main-year">${year}</span>
                        <span class="sub-year">${year} - ${nextYear}</span>
                        ${labelHtml}
                    </div>
                    <div class="year-members ${selectedMode}">
            `;
            
            groupedByAcademicYear[year].forEach(m => {
                html += `
                    <div class="member-item group-${m.group}">
                        <img src="${m.foto}" alt="${m.nama_romaji}" loading="lazy">
                        <div class="member-name-block">
                            <div class="m-name-jp jpn">${m.nama_jp}</div>
                            <div class="m-name-rm">${m.nama_romaji}</div>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        container.innerHTML = html || '<p style="text-align:center;">Tidak ada data yang sesuai dengan filter.</p>';
    }

    filterGroup.addEventListener('change', renderUI);
    displayMode.addEventListener('change', renderUI);

    fetchData();
});