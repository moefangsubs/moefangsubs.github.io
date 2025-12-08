document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const memberId = params.get('id');
    const gridContainer = document.getElementById('garapanGridContainer');
    
    if (!memberId) {
        gridContainer.innerHTML = '<p class="status-message">ID Member tidak ditemukan di URL.</p>';
        return;
    }
    
    gridContainer.innerHTML = `<p class="status-message">Memuat data partisipasi, mohon tunggu...</p>`;

    try {
        const membersResponse = await fetch('../store/member/members.json');
        const membersData = await membersResponse.json();
        const memberInfo = membersData.find(m => m.id === memberId);

        if (!memberInfo) {
            document.getElementById('memberNamaJp').textContent = "Member Tidak Dikenal";
            gridContainer.innerHTML = '<p class="status-message">Informasi member tidak ditemukan.</p>';
            return;
        }

        document.getElementById('memberPhoto').src = memberInfo.foto_profil || '';
        document.getElementById('memberPhoto').alt = memberInfo.nama_jp || 'Foto Member';
        const memberNamaJpElem = document.getElementById('memberNamaJp');
        memberNamaJpElem.innerHTML = '';
        (memberInfo.nama_jp || '').split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.setProperty('--i', index);
            memberNamaJpElem.appendChild(span);
        });
        document.getElementById('memberNamaRomaji').textContent = memberInfo.nama_romaji || '';

        const listResponse = await fetch('../store/subs/list.json');
        const showList = await listResponse.json();
        const allParticipations = [];
        const DATA_PATH_PREFIXES = { 
		"01_variety": "../store/subs/01_variety/",
		"02_nogidouga": "../store/subs/02_nogidouga/",
		"03_web": "../store/subs/03_web/",
		"04_singlebonus": "../store/subs/04_singlebonus/",
		"05_nogikoi": "../store/subs/05_nogikoi/",
		"06_drama": "../store/subs/06_drama/",
		"07_movie": "../store/subs/07_movie/",
		"08_stage": "../store/subs/08_stage/",
		"08_documentary": "../store/subs/08_documentary/",
		"10_sapporo": "../store/subs/10_sapporo/",
		"11_musicprogram": "../store/subs/11_musicprogram/",
		"12_random": "../store/subs/12_random/",
		"13_concert": "../store/subs/13_concert/",
		"14_premium": "../store/subs/14_premium/",
		"15_radio": "../store/subs/15_radio/",
		"16_nonsakamichi": "../store/subs/16_nonsakamichi/" };

        // 3. Iterasi setiap kategori dan setiap acara untuk mencari partisipasi member
        for (const categoryKey in showList) {
            const basePath = DATA_PATH_PREFIXES[categoryKey];
            if (!basePath) continue;

            const showPromises = showList[categoryKey].map(showId => 
                fetch(`${basePath}${showId}.json`).then(res => res.ok ? res.json() : null).catch(() => null)
            );
            const showsData = await Promise.all(showPromises);

            showsData.forEach(showData => {
                if (!showData) return;

                const targetMemberName = memberInfo.nama_jp;
                
                if (showData.memberParticipate && showData.memberParticipate.includes(targetMemberName)) {
                    (showData.availableEpisode || []).sort().forEach(eps => {
                        allParticipations.push({ showData, episodeNumber: eps });
                    });
                } else if (showData.episodes) {
                    for (const eps in showData.episodes) {
                        const episodeData = showData.episodes[eps];
                        if (episodeData.memberParticipate && episodeData.memberParticipate.includes(targetMemberName)) {
                            allParticipations.push({ showData, episodeNumber: eps });
                        }
                    }
                }
            });
        }
        
        if (allParticipations.length > 0) {
            const resultHTML = allParticipations.map(({ showData, episodeNumber }) => {
                const episodeData = showData.episodes[episodeNumber] || {};
                
                let imageUrl = '';
                if (episodeData.imageThumbEps) {
                    imageUrl = episodeData.imageThumbEps;
                } else if (showData.IMGThumbnailEps) {
                    imageUrl = showData.IMGThumbnailEps.replace('{{eps}}', episodeNumber);
                } else if (showData.imageThumbBigPattern) {
                    imageUrl = showData.imageThumbBigPattern.replace('{{eps}}', episodeNumber);
                }
                
                if (!imageUrl) {
                    imageUrl = 'https://via.placeholder.com/320x180.png?text=No+Image'; // Fallback
                }
				
                let fullTitle = '';
                if (showData.url === 'random-subs') {
                    fullTitle = episodeData.descEpisode ? episodeData.descEpisode.replace(/\|\s*/, '') : `Episode ${episodeNumber}`;
                } else {
                    const epsTitle = episodeData.descEpsListName || (episodeData.descEpisode ? episodeData.descEpisode.replace(/\|\s*/, '') : `Episode ${episodeNumber}`);
                    fullTitle = `${showData.nameShowTitle} ${epsTitle}`;
                }
				
                const link = `../moesubs/#/${showData.url}/${episodeNumber}`;
				
                return `
                    <div class="garapan-item">
                        <a href="${link}" target="_blank">
                            <img src="${imageUrl}" alt="${fullTitle}" loading="lazy">
                            <p class="title">${fullTitle}</p>
                        </a>
                    </div>
                `;
            }).join('');
            gridContainer.innerHTML = resultHTML;
        } else {
            gridContainer.innerHTML = `<p class="status-message">Member ini tidak memiliki partisipasi dalam garapan yang terdata oleh MoeFang Subs atau tidak terdaftar/tergabung dalam satu grup.</p>`;
        }

    } catch (error) {
        console.error(`Error kritis saat memuat data: ${error}`);
        gridContainer.innerHTML = `<p class="status-message">Gagal memuat data. Cek console untuk detail error.</p>`;
    }
});