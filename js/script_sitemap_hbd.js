document.addEventListener('DOMContentLoaded', () => {
    const toTitleCase = (str) => {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    async function fetchAllMembers() {
        const endpoints = {
            nogi: '../store/member/members.json',
            saku: '../store/member/members_db_saku.json',
            hina: '../store/member/members_db_hina.json',
            boku: '../store/member/members_db_boku.json',
            keya: '../store/member/members_db_keya.json'
        };
        const requests = Object.entries(endpoints).map(([group, url]) =>
            fetch(url).then(res => res.json()).catch(() => [])  
        );
        const results = await Promise.all(requests);
        let allMembers = [];
        results.forEach(groupData => {
            if (Array.isArray(groupData)) {
                const processed = groupData.map(member => ({
                    nameRomaji: toTitleCase(member.nama_romaji),
                    birthDate: moment(member.lahir, "YYYY.MM.DD").toDate(),
                    photoURL: member.foto_profil,
                }));
                allMembers.push(...processed);
            }
        });
        return allMembers;
    }
    function displayBirthdayAnnouncements(members) {
        const targetContainer = document.getElementById('sitemap-hbd-container');
        if (!targetContainer) return;
        const today = moment();
        const birthdayGirls = [];
        members.forEach(member => {
            const birthDate = moment(member.birthDate);
            if (today.month() === birthDate.month() && today.date() === birthDate.date()) {
                const age = today.diff(birthDate, 'years');
                birthdayGirls.push({ ...member, age });
            }
        });
        if (birthdayGirls.length > 0) {
            let htmlContent = '';
            birthdayGirls.forEach(girl => {
                htmlContent += `
                    <div class="sitemap-hbd-wrapper">
                        <div class="sitemap-hbd-shadow"></div>
                        <div class="sitemap-hbd-main">
                            <div class="sitemap-hbd-item">
                                <div class="sitemap-hbd-content">
                                    <p class="line1">SELAMAT ULANG TAHUN!</p>
                                    <p class="line2 jpn">${girl.nameRomaji}</p>
                                    <p class="line3">yang ke-<span>${girl.age}</span> tahun!</p>
                                </div>
                                <div class="sitemap-hbd-photo">
                                    <img src="${girl.photoURL}" alt="${girl.nameRomaji}" loading="lazy">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            targetContainer.innerHTML = htmlContent;
        }
    }
    fetchAllMembers().then(allMembers => {
        displayBirthdayAnnouncements(allMembers);
    }).catch(error => {
        console.error("Gagal memuat data ulang tahun member:", error);
    });
});