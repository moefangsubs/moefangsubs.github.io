// ../js/script_sitemap_update.js

document.addEventListener('DOMContentLoaded', async () => {
    const updateContainer = document.getElementById('daftar-update');
    if (!updateContainer) return;

    const setupViewControls = () => {
        const controlsContainer = document.getElementById('view-controls-container');
        if (!controlsContainer) return;

        controlsContainer.innerHTML = `
            <div class="view-controls">
                <button id="slide-view-btn" class="view-btn active" title="Tampilan Slide">
                    <img src="../sprite/element/view_slide.svg" alt="Slide View">
                </button>
                <button id="grid-view-btn" class="view-btn" title="Tampilan Grid">
                    <img src="../sprite/element/view_grid.svg" alt="Grid View">
                </button>
            </div>
        `;

        const slideBtn = document.getElementById('slide-view-btn');
        const gridBtn = document.getElementById('grid-view-btn');

        slideBtn.addEventListener('click', () => {
            if (updateContainer.classList.contains('grid-view')) {
                updateContainer.classList.remove('grid-view');
                slideBtn.classList.add('active');
                gridBtn.classList.remove('active');
                // Jalankan kembali pengecekan scroll untuk semua baris
                document.querySelectorAll('.update-grid').forEach(grid => grid.dispatchEvent(new Event('scroll')));
            }
        });

        gridBtn.addEventListener('click', () => {
            if (!updateContainer.classList.contains('grid-view')) {
                updateContainer.classList.add('grid-view');
                gridBtn.classList.add('active');
                slideBtn.classList.remove('active');
            }
        });
    };
    
    setupViewControls();

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
            
            const updateCount = updates.length; //
            sectionDiv.innerHTML = `<h3 class="update-date">${formatUpdateDate(date)} <span class="update-count">[${updateCount} Update]</span></h3>`;

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


					let descEpisode = episodeData.descEpisode ? episodeData.descEpisode.replace(/\|\s*/, '') : `Episode ${parseInt(episodeNumber, 10)}`;
					if (episodeData.thisEnd === true || episodeData.thisEnd === "yes") {
						descEpisode += " [TAMAT]";
					}
					const captionHTML = `<span><strong>${showData.nameShowTitle}</strong> ${descEpisode}</span>`;



                    let membersHTML = '';
                    
                    const membersRaw = episodeData.memberParticipate || showData.memberParticipate || [];

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
                            
                            return `
                                <li class="member-item-wrapper">
                                    <div class="member-item-shadow"></div>
                                    <div class="member-item">${content}</div>
                                </li>
                            `;
                        });

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
                    itemDiv.className = 'update-item-wrapper'; 
                    
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

		updateContainer.addEventListener('click', (e) => {
            const scrollButton = e.target.closest('.scroll-btn');
            const expandButton = e.target.closest('.expand-btn');

            if (scrollButton) {
                const scrollContainer = scrollButton.closest('.update-scroll-container');
                const grid = scrollContainer.querySelector('.update-grid');
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

                    const tempContainer = document.createElement('div');
                    tempContainer.innerHTML = `<ul>${hiddenItemsHTML}</ul>`;

                    const newItems = tempContainer.querySelector('ul').childNodes;

                    list.append(...newItems);

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
		
        const svgContainer = document.querySelector('.updatesvg');
        const controlsContainer = document.getElementById('view-controls-container');

        if (svgContainer) {
            svgContainer.classList.add('is-visible');
        }
        if (controlsContainer) {
            controlsContainer.classList.add('is-visible');
        }
		
    } catch (error) {
        console.error('Failed to load update data:', error);
        updateContainer.innerHTML = '<p style="text-align:center;">Gagal memuat daftar update.</p>';
    }
});