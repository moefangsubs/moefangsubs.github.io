document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('blood-container');
    const filterStatus = document.getElementById('filter-status');
    
    let allMembers = [];

    async function loadData() {
        try {
            const response = await fetch('../store/member/members.json');
            if (!response.ok) throw new Error('Gagal load JSON');
            allMembers = await response.json();
            
            renderUI();
        } catch (error) {
            console.error(error);
            container.innerHTML = '<p style="text-align:center;">Gagal memuat data member.</p>';
        }
    }

    function renderUI() {
        const selectedStatus = filterStatus.value;

        let filtered = allMembers;
        if (selectedStatus === 'aktif') {
            filtered = allMembers.filter(m => m.status === 'aktif');
        }

        const bloodGroups = {
            'A型': [],
            'B型': [],
            'O型': [],
            'AB型': [],
            '不明': []
        };

        filtered.forEach(m => {
            const bt = m.gol_darah || '不明';
            if (bloodGroups[bt]) {
                bloodGroups[bt].push(m);
            } else {
                bloodGroups['不明'].push(m);
            }
        });

        const order = ['A型', 'B型', 'O型', 'AB型', '不明'];
        let html = '';

        order.forEach(bt => {
            const membersInGroup = bloodGroups[bt];
            
            if (membersInGroup.length > 0) {
                html += `
                    <div class="blood-section boxs2 group-${bt}">
                        <div class="blood-header jpn">
                            ${bt} <span class="blood-count jpn">(${membersInGroup.length} 名)</span>
                        </div>
                        <div class="blood-members">
                `;
                
                membersInGroup.forEach(m => {
                    const statusClass = m.status === 'lulus' ? 'member-lulus' : '';
                    html += `
                        <div class="member-card ${statusClass}">
                            <img src="${m.foto_profil}" alt="${m.nama_romaji}" loading="lazy">
                            <div class="m-name-jp jpn">${m.nama_jp}</div>
                            <div class="m-name-rm">${m.nama_romaji}</div>
                        </div>
                    `;
                });

                html += `
                        </div>
                    </div>
                `;
            }
        });

        container.innerHTML = html || '<p style="text-align:center;">Tidak ada data yang sesuai dengan filter.</p>';
    }

    filterStatus.addEventListener('change', renderUI);

    loadData();
});