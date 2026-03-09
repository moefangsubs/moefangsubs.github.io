document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('pitch-container');
    let memberProfiles = {};
    let pitchData = [];

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

    async function loadAllData() {
        try {
            const dbRequests = endpoints.map(ep => fetch(ep.url).then(res => res.json()).then(data => ({ id: ep.id, data })));
            const dbResults = await Promise.all(dbRequests);
            
            dbResults.forEach(result => {
                result.data.forEach(m => {
                    const cleanId = m.id.replace(/-/g, '');
                    memberProfiles[cleanId] = {
                        nameJp: m.nama_jp,
                        nameRm: toTitleCase(m.nama_romaji),
                        group: result.id
                    };
                });
            });

            const pitchRes = await fetch('../store/member/members_firstpitch.json');
            pitchData = await pitchRes.json();
            
            renderUI();
        } catch (error) {
            console.error("Gagal load data:", error);
            container.innerHTML = '<p class="error" style="text-align:center;">Terjadi kesalahan saat memuat data. Pastikan path file JSON sudah benar.</p>';
        }
    }

    function renderUI() {
        let html = '';
        
        pitchData.forEach(pitch => {
            const profile = memberProfiles[pitch.id] || { nameJp: pitch.id, nameRm: pitch.id, group: 'nogi' };
            const imgUrl = `https://ik.imagekit.io/moearchive/web/firstpitch/${pitch.id}_${pitch.count}.jpg`;
            const fallbackUrl = "https://ik.imagekit.io/moearchive/web/firstpitch/not.jpg";

            const badgeText = pitch.count === 1 ? '初' : `${pitch.count}回`;
            const badgeClass = pitch.count === 1 ? 'badge-first' : 'badge-repeat';

            html += `
                <div class="pitch-card boxs2 group-${profile.group}">
                    <div class="pitch-photo">
                        <img src="${imgUrl}" alt="First Pitch ${profile.nameRm}" onerror="this.onerror=null;this.src='${fallbackUrl}';">
                    </div>
                    <div class="pitch-info">
                        <div class="pitch-header">
                            <div class="pitch-title-wrapper">
                                <div class="m-name-jp jpn">${profile.nameJp}</div>
                                <span class="pitch-badge ${badgeClass} jpn">${badgeText}</span>
                            </div>
                            <div class="m-name-rm">${profile.nameRm}</div>
                        </div>
                        <div class="pitch-details">
                            <div class="detail-label">Tanggal</div>
                            <div class="detail-value">${pitch.date}</div>
                            
                            <div class="detail-label">Stadion Bisbol</div>
                            <div class="detail-value jpn">${pitch.stadium}</div>
                            
                            <div class="detail-label">Pertandingan</div>
                            <div class="detail-value jpn">${pitch.match}</div>
                            
                            <div class="detail-label">Rincian Lemparan</div>
                            <div class="detail-value jpn">${pitch.result}</div>
                            
                            <div class="detail-label">Catatan</div>
                            <div class="detail-value jpn">${pitch.note || '-'}</div>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    loadAllData();
});