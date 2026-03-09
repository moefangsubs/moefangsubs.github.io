document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('year-container');
    const filterGroup = document.getElementById('filter-group');
    const filterStatus = document.getElementById('filter-status');
    const displayMode = document.getElementById('display-mode');

    let allMembers = [];

    const endpoints = [
        { id: 'nogi', url: '../store/member/members.json' },
        { id: 'keya', url: '../store/member/members_db_keya.json' },
        { id: 'saku', url: '../store/member/members_db_saku.json' },
        { id: 'hina', url: '../store/member/members_db_hina.json' },
        { id: 'boku', url: '../store/member/members_db_boku.json' }
    ];

    function toTitleCase(str) {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    async function fetchData() {
        try {
            const requests = endpoints.map(ep => fetch(ep.url).then(res => res.json()).then(data => ({ id: ep.id, data })));
            const results = await Promise.all(requests);
            
            results.forEach(result => {
                result.data.forEach(m => {
                    const normalizedDate = m.lahir.replace(/\./g, '-');
                    const birthMoment = moment(normalizedDate);
                    
                    allMembers.push({
                        group: result.id,
                        status: m.status,
                        nama_jp: m.nama_jp,
                        nama_romaji: toTitleCase(m.nama_romaji),
                        foto: m.foto_profil || m.foto_profil,
                        tahun: birthMoment.year(),
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
        const selectedStatus = filterStatus.value;
        const selectedMode = displayMode.value;

        let filtered = allMembers.filter(m => {
            const matchGroup = selectedGroup === 'all' || m.group === selectedGroup;
            const matchStatus = selectedStatus === 'all' || m.status === selectedStatus;
            return matchGroup && matchStatus;
        });

        filtered.sort((a, b) => a.timestamp - b.timestamp);

        const groupedByYear = {};
        filtered.forEach(m => {
            if (!groupedByYear[m.tahun]) groupedByYear[m.tahun] = [];
            groupedByYear[m.tahun].push(m);
        });

        const sortedYears = Object.keys(groupedByYear).sort((a, b) => parseInt(a) - parseInt(b));

        let html = '';
        sortedYears.forEach(year => {
            html += `
                <div class="year-row">
                    <div class="year-label">${year}</div>
                    <div class="year-members ${selectedMode}">
            `;
            
            groupedByYear[year].forEach(m => {
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
    filterStatus.addEventListener('change', renderUI);
    displayMode.addEventListener('change', renderUI);

    fetchData();
});