// ../js/script_sitemap_update.js
document.addEventListener('DOMContentLoaded', async () => {
    const updateContainer = document.getElementById('daftar-update');
    if (!updateContainer) return;

    try {
        const [updateResponse, listResponse, membersResponse] = await Promise.all([
            fetch('../store/subs/update.json'),
            fetch('../store/subs/list.json'),
            fetch('../store/member/members.json')
        ]);

        if (!updateResponse.ok) throw new Error('Failed to fetch update.json');
        if (!listResponse.ok) throw new Error('Failed to fetch list.json');
        if (!membersResponse.ok) throw new Error('Failed to fetch members.json');

        const updatesByDate = await updateResponse.json();
        const showListByCategory = await listResponse.json();
        const membersList = await membersResponse.json();
        
        const showPathMap = new Map();
        for (const category in showListByCategory) {
            const basePath = `../store/subs/${category}`;
            showListByCategory[category].forEach(showId => {
                showPathMap.set(showId, `${basePath}/${showId}.json`);
            });
        }
        
        const memberMap = new Map(membersList.map(m => [m.nama_jp, m.id]));

        const formatUpdateDate = (dateStr) => {
            const year = `20${dateStr.substring(0, 2)}`;
            const month = parseInt(dateStr.substring(2, 4), 10) - 1;
            const day = dateStr.substring(4, 6);
            const dateObj = new Date(year, month, day);
            return dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        };

        for (const updateEntry of updatesByDate) {
            const { date, updates } = updateEntry;
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'update-section';
            sectionDiv.innerHTML = `<h3 class="update-date">${formatUpdateDate(date)}</h3>`;

            const scrollContainer = document.createElement('div');
            scrollContainer.className = 'update-scroll-container';

            const gridDiv = document.createElement('div');
            gridDiv.className = 'update-grid';

            for (const updateItem of updates) {
                const showId = updateItem.showId;
                const episodeNumber = updateItem.eps;

                const showJsonPath = showPathMap.get(showId);
                if (!showJsonPath) continue;

                try {
                    const showDataResponse = await fetch(showJsonPath);
                    if (!showDataResponse.ok) continue;
                    const showData = await showDataResponse.json();
                    
                    const epKey = episodeNumber.toString().padStart(2, '0');
                    const episodeData = showData.episodes ? (showData.episodes[epKey] || showData.episodes[episodeNumber]) : {};

                    if(!episodeData) continue;

                    let thumbUrl = episodeData.imageThumbBig || (showData.imageThumbBigPattern ? showData.imageThumbBigPattern.replace('{{eps}}', epKey) : null);
                    if (!thumbUrl) thumbUrl = 'https://via.placeholder.com/320x180.png?text=No+Image';

                    const link = `../moesubs/subs.html?show=${showData.url}&eps=${epKey}`;
                    const descEpisode = episodeData.descEpisode ? episodeData.descEpisode.replace(/\|\s*/, '') : `Episode ${parseInt(episodeNumber, 10)}`;
					const captionHTML = `<span><strong>${showData.nameShowTitle}</strong> ${descEpisode}</span>`;

                    let membersHTML = '';
                    
                    // ### PERUBAHAN UTAMA - LOGIKA FALLBACK MEMBERPARTICIPATE ###
                    const membersRaw = episodeData.memberParticipate || showData.memberParticipate || [];
                    // ########################################################

                    let membersArray = [];
                    if (typeof membersRaw === 'string' && membersRaw.length > 0) {
                        membersArray = membersRaw.split('、');
                    } else if (Array.isArray(membersRaw)) {
                        membersArray = membersRaw;
                    }

                    if (membersArray.length > 0) {
                        const memberItems = membersArray.map(nameJP => {
                            const cleanedName = nameJP.replace(/[\u200B-\u200F\uFEFF]/g, '').trim();
							const memberId = memberMap.get(cleanedName);
                            const content = memberId ? `<a href="../moedata/member.html?id=${memberId}" target="_blank">${nameJP.trim()}</a>` : nameJP.trim();
                            
                            // Mengubah return untuk menyertakan struktur wrapper dan shadow
                            return `
                                <li class="member-item-wrapper">
                                    <div class="member-item-shadow"></div>
                                    <div class="member-item">${content}</div>
                                </li>
                            `;
                        });

                        // Mengubah cara tombol '...' dibuat agar sesuai
                        if (memberItems.length > 5) {
                            const visibleItems = memberItems.slice(0, 5).join('');
                            const hiddenItemsHTML = encodeURIComponent(memberItems.slice(5).join(''));
                            const expandButton = `<li class="member-item-wrapper"><div class="member-item expand-btn" data-more="${hiddenItemsHTML}">...</div></li>`;
                            membersHTML = `<ul class="member-list">${visibleItems}${expandButton}</ul>`;
                        } else {
                            membersHTML = `<ul class="member-list">${memberItems.join('')}</ul>`;
                        }
                    }
                    
                    const itemDiv = document.createElement('div');
                    // 'itemDiv' sekarang menjadi pembungkus luar untuk positioning
                    itemDiv.className = 'update-item-wrapper'; 
                    
                    // Kita buat HTML baru dengan div untuk bayangan dan konten
                    itemDiv.innerHTML = `
                        <div class="update-item-shadow"></div>
                        <div class="update-item">
                            <a href="${link}">
                                <img src="${thumbUrl}" alt="${showData.nameShowTitle} - ${descEpisode}" class="update-item-thumb" loading="lazy">
                                <div class="update-item-caption">${captionHTML}</div>
                            </a>
                            ${membersHTML ? `<div class="members-container">${membersHTML}</div>` : ''}
                        </div>
                    `;
                    gridDiv.appendChild(itemDiv);
                } catch (error) { console.error(`Error processing ${showId}:`, error); }
            }
            
			
					
            scrollContainer.appendChild(gridDiv);
            // if (updates.length > 2) {
                 // const btnLeft = document.createElement('button');
                 // btnLeft.className = 'scroll-btn scroll-btn-left hidden';
                 // btnLeft.innerHTML = '&#10094;';

                 // const btnRight = document.createElement('button');
                 // btnRight.className = 'scroll-btn scroll-btn-right';
                 // btnRight.innerHTML = '&#10095;';
                 
                 // scrollContainer.appendChild(btnLeft);
                 // scrollContainer.appendChild(btnRight);
            // }


			if (updates.length > 2) {
                 const btnLeft = document.createElement('button');
                 btnLeft.className = 'scroll-btn scroll-btn-left hidden';
                 btnLeft.innerHTML = '<img src="../sprite/element/arrow_left.svg" alt="Scroll Kiri">';

                 const btnRight = document.createElement('button');
                 btnRight.className = 'scroll-btn scroll-btn-right';
                 btnRight.innerHTML = '<img src="../sprite/element/arrow_right.svg" alt="Scroll Kanan">';
                 
                 scrollContainer.appendChild(btnLeft);
                 scrollContainer.appendChild(btnRight);
            }
			
			
            sectionDiv.appendChild(scrollContainer);
            updateContainer.appendChild(sectionDiv);
        }

        // updateContainer.addEventListener('click', (e) => {
            // const target = e.target;

            // if (target.matches('.scroll-btn')) {
                // const scrollContainer = target.closest('.update-scroll-container');
                // const grid = scrollContainer.querySelector('.update-grid');
                // const scrollAmount = grid.querySelector('.update-item').offsetWidth * 2 + 32;

                // if (target.matches('.scroll-btn-left')) {
                    // grid.scrollLeft -= scrollAmount;
                // } else if (target.matches('.scroll-btn-right')) {
                    // grid.scrollLeft += scrollAmount;
                // }
            // }

            // if (target.matches('.expand-btn')) {
                // const list = target.parentElement;
                // list.insertAdjacentHTML('beforeend', decodeURIComponent(target.dataset.more));
                // target.remove();
            // }
        // });

		updateContainer.addEventListener('click', (e) => {
            const scrollButton = e.target.closest('.scroll-btn');
            const expandButton = e.target.closest('.expand-btn');

            if (scrollButton) {
                const scrollContainer = scrollButton.closest('.update-scroll-container');
                const grid = scrollContainer.querySelector('.update-grid');
                // Menggunakan wrapper untuk kalkulasi yang lebih stabil
                const itemWidth = grid.querySelector('.update-item-wrapper')?.offsetWidth || 280;
                const scrollAmount = itemWidth * 2 + 32;

                if (scrollButton.matches('.scroll-btn-left')) {
                    grid.scrollLeft -= scrollAmount;
                } else if (scrollButton.matches('.scroll-btn-right')) {
                    grid.scrollLeft += scrollAmount;
                }
            }

            if (expandButton) {
                const expandButtonWrapper = expandButton.closest('.member-item-wrapper');
                
                if (expandButtonWrapper) {
                    const list = expandButtonWrapper.parentElement;
                    const hiddenItemsHTML = decodeURIComponent(expandButton.dataset.more);

                    // --- METODE BARU YANG LEBIH STABIL ---
                    // 1. Buat kontainer sementara di memori
                    const tempContainer = document.createElement('div');
                    tempContainer.innerHTML = `<ul>${hiddenItemsHTML}</ul>`;

                    // 2. Ambil semua <li> baru dari kontainer sementara
                    const newItems = tempContainer.querySelector('ul').childNodes;

                    // 3. Pindahkan setiap <li> baru ke dalam daftar yang asli
                    list.append(...newItems);
                    // ------------------------------------

                    // 4. Hapus seluruh <li> pembungkus tombol "..."
                    expandButtonWrapper.remove();
                }
            }
        });





        document.querySelectorAll('.update-grid').forEach(grid => {
            const scrollCheck = () => {
                const scroller = grid.parentElement;
                const btnLeft = scroller.querySelector('.scroll-btn-left');
                const btnRight = scroller.querySelector('.scroll-btn-right');
                if(!btnLeft || !btnRight) return;
                
                btnLeft.classList.toggle('hidden', grid.scrollLeft < 10);
                btnRight.classList.toggle('hidden', grid.scrollWidth - grid.scrollLeft - grid.clientWidth < 10);
                
                if (grid.scrollWidth <= grid.clientWidth) {
                    btnLeft.classList.add('hidden');
                    btnRight.classList.add('hidden');
                }
            };
            grid.addEventListener('scroll', scrollCheck);
            new ResizeObserver(scrollCheck).observe(grid);
            scrollCheck();
        });

    } catch (error) {
        console.error('Failed to load update data:', error);
        updateContainer.innerHTML = '<p style="text-align:center;">Gagal memuat daftar update.</p>';
    }
});