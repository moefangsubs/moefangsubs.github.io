document.addEventListener("DOMContentLoaded", async () => {
    // ----------------------------------------------------
    // Element Selectors
    // ----------------------------------------------------
    const stage = document.getElementById('map-stage');
    const svg = document.getElementById('map-svg');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');
    const popover = document.getElementById('member-popover');
    const popoverCloseBtn = document.getElementById('popover-close');
    const memberContent = document.getElementById('member-content');
    const tail = document.getElementById('popover-tail');

    // ----------------------------------------------------
    // State Navigasi & Dragging
    // ----------------------------------------------------
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isMouseDown = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialTx = 0;
    let initialTy = 0;
    let activePrefectureElement = null;

    // ----------------------------------------------------
    // Data Fetching Helper
    // ----------------------------------------------------
    const fetchJson = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        return response.json();
    };

    try {
        const [
            prefectureData,
            nogiData,
            keyaData,
            sakuData,
            hinaData,
            bokuData
        ] = await Promise.all([
            fetchJson('../store/data/prefecture.json'),
            fetchJson('../store/member/members.json'),
            fetchJson('../store/member/members_db_keya.json'),
            fetchJson('../store/member/members_db_saku.json'),
            fetchJson('../store/member/members_db_hina.json'),
            fetchJson('../store/member/members_db_boku.json')
        ]);

        const allMembers = {
            nogi: nogiData.filter(m => m.status === 'aktif'),
            gradn: nogiData.filter(m => m.status === 'lulus'),
            grads: sakuData.filter(m => m.status === 'lulus'),
            saku: sakuData.filter(m => m.status === 'aktif'),
            gradh: hinaData.filter(m => m.status === 'lulus'),
            hina: hinaData.filter(m => m.status === 'aktif'),
            gradk: keyaData.filter(m => m.status === 'lulus'),
            boku: bokuData.filter(m => m.status === 'aktif')
        };

        setupMap(prefectureData, allMembers);

    } catch (error) {
        console.error("Gagal memuat data map/member:", error);
        if (memberContent) {
            memberContent.innerHTML = `<p style="color: #ff9999; padding: 15px;">Gagal memuat data anggota.</p>`;
        }
        return;
    }

    // ----------------------------------------------------
    // Transform, Smooth Zoom & Panning
    // ----------------------------------------------------
    function applyTransform() {
        svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        if (activePrefectureElement && popover.classList.contains('is-visible')) {
            repositionPopover(activePrefectureElement);
        }
    }

    function zoomAtPoint(factor, clientX, clientY) {
        const rect = stage.getBoundingClientRect();
        const cursorX = clientX - rect.left;
        const cursorY = clientY - rect.top;

        const newScale = Math.max(0.6, Math.min(6, scale * factor));
        if (newScale === scale) return;

        translateX = cursorX - (cursorX - translateX) * (newScale / scale);
        translateY = cursorY - (cursorY - translateY) * (newScale / scale);
        scale = newScale;

        applyTransform();
    }

    function resetView() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        applyTransform();
    }

    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const rect = stage.getBoundingClientRect();
            zoomAtPoint(1.25, rect.left + rect.width / 2, rect.top + rect.height / 2);
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const rect = stage.getBoundingClientRect();
            zoomAtPoint(0.8, rect.left + rect.width / 2, rect.top + rect.height / 2);
        });
    }

    if (zoomResetBtn) {
        zoomResetBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            resetView();
        });
    }

    // Wheel Zoom: Hanya jika mouse di luar popover
    stage.addEventListener('wheel', (event) => {
        if (event.target.closest('#member-popover')) {
            return; // Scroll list member
        }
        event.preventDefault();
        const factor = event.deltaY < 0 ? 1.12 : 0.88;
        zoomAtPoint(factor, event.clientX, event.clientY);
    }, { passive: false });

    // ----------------------------------------------------
    // Fitur Drag Peta (Robust Mouse Down / Move / Up)
    // ----------------------------------------------------
    stage.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Hanya klik kiri
        if (e.target.closest('.controls') || e.target.closest('#member-popover')) return;

        isMouseDown = true;
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        initialTx = translateX;
        initialTy = translateY;

        // Mencegah browser melakukan native drag/selection di SVG
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        if (!isDragging && (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4)) {
            isDragging = true;
            stage.classList.add('is-dragging');
        }

        if (isDragging) {
            translateX = initialTx + deltaX;
            translateY = initialTy + deltaY;
            applyTransform();
        }
    });

    window.addEventListener('mouseup', () => {
        if (isMouseDown) {
            isMouseDown = false;
            stage.classList.remove('is-dragging');
            // Sedikit delay agar flag isDragging tidak langsung hilang sebelum event click selesai
            setTimeout(() => {
                isDragging = false;
            }, 50);
        }
    });

    // Touch Event Panning & Pinch-to-zoom di Mobile
    let touchStartDist = 0;
    let initialTouchScale = 1;

    stage.addEventListener('touchstart', (e) => {
        if (e.target.closest('.controls') || e.target.closest('#member-popover')) return;

        if (e.touches.length === 1) {
            isMouseDown = true;
            isDragging = false;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            initialTx = translateX;
            initialTy = translateY;
        } else if (e.touches.length === 2) {
            isMouseDown = false;
            isDragging = false;
            touchStartDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            initialTouchScale = scale;
        }
    }, { passive: true });

    stage.addEventListener('touchmove', (e) => {
        if (e.target.closest('#member-popover')) return;

        if (e.touches.length === 1 && isMouseDown) {
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
                isDragging = true;
                translateX = initialTx + deltaX;
                translateY = initialTy + deltaY;
                applyTransform();
            }
        } else if (e.touches.length === 2 && touchStartDist > 0) {
            e.preventDefault();
            const currentDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            const factor = currentDist / touchStartDist;
            const targetScale = Math.max(0.6, Math.min(6, initialTouchScale * factor));

            const rect = stage.getBoundingClientRect();
            const cursorX = midX - rect.left;
            const cursorY = midY - rect.top;

            translateX = cursorX - (cursorX - translateX) * (targetScale / scale);
            translateY = cursorY - (cursorY - translateY) * (targetScale / scale);
            scale = targetScale;

            applyTransform();
        }
    }, { passive: false });

    stage.addEventListener('touchend', () => {
        isMouseDown = false;
        setTimeout(() => {
            isDragging = false;
        }, 50);
        touchStartDist = 0;
    });

    // ----------------------------------------------------
    // Helper Title Case & Sanitasi ID
    // ----------------------------------------------------
    function toTitleCase(str) {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }

    function cleanId(id) {
        if (!id) return '';
        return id.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    // ----------------------------------------------------
    // Setup Map & Member Panes
    // ----------------------------------------------------
    function setupMap(prefectures, members) {
        const prefJpToEn = prefectures;
        memberContent.innerHTML = '';

        // Render struktur pane masing-masing prefektur
        Object.entries(prefJpToEn).forEach(([jpName, enName]) => {
            const rawId = enName.toLowerCase();
            const safeId = cleanId(enName);
            const pane = document.createElement('div');
            pane.id = `content-${rawId}`;
            pane.setAttribute('data-clean-id', safeId);
            pane.className = 'pref-pane';
            pane.innerHTML = `
                <div class="title">
                    <span class="jp">${jpName}</span>
                    <span class="id">${enName}</span>
                </div>
                <div class="member-scroll-body">
                    <div class="member"></div>
                </div>
            `;
            memberContent.appendChild(pane);
        });

        // Masukkan data member
        const prefCount = {};
        Object.entries(members).forEach(([category, memberList]) => {
            memberList.forEach(member => {
                const enPrefecture = prefJpToEn[member.asal];
                if (!enPrefecture) return;

                const location = enPrefecture.toLowerCase();
                const safeLocation = cleanId(enPrefecture);
                prefCount[location] = (prefCount[location] || 0) + 1;
                prefCount[safeLocation] = (prefCount[safeLocation] || 0) + 1;

                let targetDiv = document.querySelector(`#content-${location} .member`);
                if (!targetDiv) {
                    targetDiv = document.querySelector(`[data-clean-id="${safeLocation}"] .member`);
                }

                if (targetDiv) {
                    const memberDiv = document.createElement("div");
                    memberDiv.className = `member-card ${category}`;
                    memberDiv.innerHTML = `
                        <img src="${member.foto_profil}" alt="${member.nama_romaji}" loading="lazy" />
                        <div class="name-detail">
                            <span class="name-id">${toTitleCase(member.nama_romaji)}</span>
                            <span class="name-jp">${member.nama_jp}</span>
                        </div>
                    `;

                    if (category === 'nogi' || category === 'gradn') {
                        memberDiv.style.cursor = 'pointer';
                        memberDiv.addEventListener('click', (e) => {
                            e.stopPropagation();
                            window.location.href = `member.html?id=${member.id}`;
                        });
                    }

                    targetDiv.appendChild(memberDiv);
                }
            });
        });

        // Fallback jika tidak ada member
        Object.values(prefJpToEn).forEach(enName => {
            const location = enName.toLowerCase();
            const safeLocation = cleanId(enName);
            let targetDiv = document.querySelector(`#content-${location} .member`);
            if (!targetDiv) {
                targetDiv = document.querySelector(`[data-clean-id="${safeLocation}"] .member`);
            }
            if (targetDiv && targetDiv.children.length === 0) {
                targetDiv.innerHTML = `<div class="no-member-msg">Tidak ada data anggota</div>`;
            }
        });

        // ----------------------------------------------------
        // Skala Warna Tema Cerah (Lilac Pastel -> Deep Violet)
        // ----------------------------------------------------
        const colors = [
            "#f2defb", "#edd3f9", "#e7c6f7", "#e1b9f5", "#daabf3",
            "#d29cf1", "#cb8def", "#c27eed", "#b86deb", "#ae5ce8",
            "#a44ce6", "#993de4", "#8f30e0", "#8423dc", "#7818d7",
            "#6d10cf", "#610ac5", "#5607ba", "#4c05af", "#4204a3",
            "#390396", "#310289", "#29027c", "#22016f", "#1c0162"
        ];

        document.querySelectorAll("svg g").forEach(group => {
            const rawName = (group.id || '').toLowerCase();
            const safeName = cleanId(group.id);
            const count = prefCount[rawName] || prefCount[safeName] || 0;
            const landPaths = group.querySelectorAll(".land, path");

            if (landPaths.length > 0) {
                const colorIdx = count > 0 ? Math.min(count - 1, colors.length - 1) : -1;
                const color = colorIdx >= 0 ? colors[colorIdx] : "#fbf7fd";

                landPaths.forEach(path => {
                    if (!path.classList.contains('text')) {
                        path.style.fill = color;
                    }
                });

                // Jika prefektur warnanya gelap (mulai dari indeks 12 ke atas / warna pekat seperti rgb(28, 1, 98))
                // Beri penanda agar teksnya otomatis putih dan terbaca jelas!
                if (colorIdx >= 12) {
                    group.classList.add('dark-pref');
                } else {
                    group.classList.remove('dark-pref');
                }
            }
        });

        setupInteractivity();
    }

    // ----------------------------------------------------
    // Popover Positioning Dinamis 4 Arah (Anti-Crop)
    // ----------------------------------------------------
    function repositionPopover(groupElement, clickEvent) {
        if (!groupElement) return;

        const stageRect = stage.getBoundingClientRect();
        let groupRect = groupElement.getBoundingClientRect();

        let prefCenterX = (groupRect.left + groupRect.width / 2) - stageRect.left;
        let prefCenterY = (groupRect.top + groupRect.height / 2) - stageRect.top;
        let prefTopY = groupRect.top - stageRect.top;
        let prefBottomY = groupRect.bottom - stageRect.top;
        let prefLeftX = groupRect.left - stageRect.left;
        let prefRightX = groupRect.right - stageRect.left;

        // Fallback jika groupRect 0
        if (groupRect.width === 0 || groupRect.height === 0 || isNaN(prefCenterX)) {
            if (clickEvent) {
                prefCenterX = clickEvent.clientX - stageRect.left;
                prefCenterY = clickEvent.clientY - stageRect.top;
                prefTopY = prefCenterY - 15;
                prefBottomY = prefCenterY + 15;
                prefLeftX = prefCenterX - 15;
                prefRightX = prefCenterX + 15;
            } else {
                prefCenterX = stageRect.width / 2;
                prefCenterY = stageRect.height / 2;
                prefTopY = prefCenterY - 20;
                prefBottomY = prefCenterY + 20;
                prefLeftX = prefCenterX - 20;
                prefRightX = prefCenterX + 20;
            }
        }

        const popoverWidth = popover.offsetWidth || 330;
        const popoverHeight = popover.offsetHeight || 270;
        const gap = 12;

        // Hitung ruang yang tersedia di keempat sisi prefektur
        const spaceBelow = stageRect.height - prefBottomY;
        const spaceAbove = prefTopY;
        const spaceRight = stageRect.width - prefRightX;
        const spaceLeft = prefLeftX;

        // Tentukan arah terbaik agar TIDAK TERPOTONG (Anti-crop priority)
        let direction = 'bottom';

        if (spaceBelow >= popoverHeight + gap + 10) {
            direction = 'bottom';
        } else if (spaceAbove >= popoverHeight + gap + 10) {
            direction = 'top';
        } else if (spaceRight >= popoverWidth + gap + 10) {
            direction = 'right';
        } else if (spaceLeft >= popoverWidth + gap + 10) {
            direction = 'left';
        } else {
            // Jika area sangat sempit, pilih sisi dengan ruang terbesar
            const maxSpace = Math.max(spaceBelow, spaceAbove, spaceRight, spaceLeft);
            if (maxSpace === spaceAbove) direction = 'top';
            else if (maxSpace === spaceBelow) direction = 'bottom';
            else if (maxSpace === spaceRight) direction = 'right';
            else direction = 'left';
        }

        popover.classList.remove('position-top', 'position-bottom', 'position-left', 'position-right');
        popover.classList.add(`position-${direction}`);

        let targetX = 0;
        let targetY = 0;

        if (direction === 'bottom') {
            targetY = prefBottomY + gap;
            targetX = prefCenterX - popoverWidth / 2;
        } else if (direction === 'top') {
            targetY = prefTopY - popoverHeight - gap;
            targetX = prefCenterX - popoverWidth / 2;
        } else if (direction === 'right') {
            targetX = prefRightX + gap;
            targetY = prefCenterY - popoverHeight / 2;
        } else if (direction === 'left') {
            targetX = prefLeftX - popoverWidth - gap;
            targetY = prefCenterY - popoverHeight / 2;
        }

        // Klem koordinat agar popover SELALU berada di dalam area stage (tidak ter-crop oleh overflow: hidden)
        const minPadding = 10;
        const maxX = stageRect.width - popoverWidth - minPadding;
        const maxY = stageRect.height - popoverHeight - minPadding;

        targetX = Math.max(minPadding, Math.min(maxX, targetX));
        targetY = Math.max(minPadding, Math.min(maxY, targetY));

        popover.style.left = `${targetX}px`;
        popover.style.top = `${targetY}px`;

        // Posisikan tail mengarah tepat ke prefektur
        if (tail) {
            if (direction === 'bottom' || direction === 'top') {
                const tailOffsetX = prefCenterX - targetX;
                const clampedOffset = Math.max(20, Math.min(popoverWidth - 20, tailOffsetX));
                tail.style.left = `${clampedOffset}px`;
                tail.style.top = '';
                tail.style.bottom = '';
            } else {
                const tailOffsetY = prefCenterY - targetY;
                const clampedOffset = Math.max(20, Math.min(popoverHeight - 20, tailOffsetY));
                tail.style.top = `${clampedOffset}px`;
                tail.style.left = '';
                tail.style.right = '';
            }
        }
    }

    function hidePopover() {
        if (!popover.classList.contains('is-visible')) return;
        popover.classList.remove('is-visible');
        document.querySelectorAll('svg g').forEach(g => g.classList.remove('active', 'inactive'));
        activePrefectureElement = null;
    }

    if (popoverCloseBtn) {
        popoverCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hidePopover();
        });
    }

    // ----------------------------------------------------
    // Interaktivitas Klik Prefektur & Tutup Di Luar
    // ----------------------------------------------------
    function setupInteractivity() {
        svg.addEventListener('click', (event) => {
            if (isDragging) return; // Jika baru selesai drag, jangan buka popover

            const group = event.target.closest('g');
            if (!group || !group.id) return;

            event.stopPropagation();

            const rawId = group.id.toLowerCase();
            const safeId = cleanId(group.id);

            // Jika prefektur aktif diklik kembali, tutup
            if (group.classList.contains('active') && popover.classList.contains('is-visible')) {
                hidePopover();
                return;
            }

            document.querySelectorAll('svg g').forEach(g => {
                g.classList.remove('active');
                g.classList.add('inactive');
            });

            group.classList.remove('inactive');
            group.classList.add('active');
            activePrefectureElement = group;

            // Naikkan group ke layer paling atas di SVG
            group.parentNode.appendChild(group);

            // Tampilkan pane prefektur terkait
            memberContent.querySelectorAll('.pref-pane').forEach(p => p.classList.remove('active'));

            let targetPane = document.getElementById(`content-${rawId}`);
            if (!targetPane) {
                targetPane = memberContent.querySelector(`[data-clean-id="${safeId}"]`);
            }

            if (targetPane) {
                targetPane.classList.add('active');
                const scrollBody = targetPane.querySelector('.member-scroll-body');
                if (scrollBody) scrollBody.scrollTop = 0;
            }

            // Tampilkan popover & posisikan secara dinamis
            popover.classList.add('is-visible');
            repositionPopover(group, event);

            requestAnimationFrame(() => {
                repositionPopover(group, event);
            });
        });

        // Klik sembarang di luar box result akan menutupnya
        document.addEventListener('click', (event) => {
            if (isDragging) return;
            if (event.target.closest('#member-popover')) return;
            if (event.target.closest('#map-svg g')) return;
            if (event.target.closest('.controls')) return;

            hidePopover();
        });
    }
});
