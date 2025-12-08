document.addEventListener("DOMContentLoaded", async () => {
    const svgContainer = document.getElementById('svg-container');
    const svg = document.getElementById('map-svg');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const memberContentContainer = document.querySelector('.member-content');
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX, startY;
    let activePrefectureElement = null;
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
        console.error("Failed to load initial data:", error);
        memberContentContainer.innerHTML = `<p style="color: #ff9999;">Error loading map data. Please check the console or try refreshing.</p>`;
        return;
    }
    function updateTransform() {
        svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
    function zoom(factor) {
        const newScale = Math.max(0.5, Math.min(5, scale + factor));
        if (newScale !== scale) {
            scale = newScale;
            updateTransform();
        }
    }
    zoomInBtn.addEventListener('click', () => zoom(0.2));
    zoomOutBtn.addEventListener('click', () => zoom(-0.2));
    svgContainer.addEventListener('wheel', (event) => {
        event.preventDefault();
        zoom(event.deltaY < 0 ? 0.1 : -0.1);
    });
    svgContainer.addEventListener('mousedown', (event) => {
        if (event.target.closest('g')) return;
        isDragging = true;
        svgContainer.style.cursor = 'grabbing';
        startX = event.clientX - translateX;
        startY = event.clientY - translateY;
    });
    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        translateX = event.clientX - startX;
        translateY = event.clientY - startY;
        updateTransform();
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        svgContainer.style.cursor = 'grab';
    });
    function toTitleCase(str) {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }
    function setupMap(prefectures, members) {
        const prefJpToEn = prefectures;
        Object.entries(prefJpToEn).forEach(([jpName, enName]) => {
            const prefectureId = enName.toLowerCase();
            const contentDiv = document.createElement('div');
            contentDiv.id = `content-${prefectureId}`;
            contentDiv.innerHTML = `
                <div class="title">
                    <span class="jp">${jpName}</span>
                    <span class="id">${enName}</span>
                </div>
                <div class="member"></div>
            `;
            memberContentContainer.appendChild(contentDiv);
        });
        const prefCount = {};
        Object.entries(members).forEach(([category, memberList]) => {
            memberList.forEach(member => {
                const enPrefecture = prefJpToEn[member.asal];
                if (!enPrefecture) return; 
                const location = enPrefecture.toLowerCase();
                prefCount[location] = (prefCount[location] || 0) + 1;
                const targetDiv = document.querySelector(`#content-${location} .member`);
                if (targetDiv) {
                    const memberDiv = document.createElement("div");
                    memberDiv.className = `member-card ${category}`;
                    memberDiv.innerHTML = `
                        <img src="${member.foto_profil}" alt="${member.nama_romaji}" />
                        <div class="name-detail">
                            <span class="name-id">${toTitleCase(member.nama_romaji)}</span>
                            <span class="name-jp">${member.nama_jp}</span>
                        </div>
                    `;
                    if (category === 'nogi' || category === 'gradn') {
                        memberDiv.style.cursor = 'pointer';
                        memberDiv.addEventListener('click', () => {
                            window.location.href = `member.html?id=${member.id}`;
                        });
                    }
                    targetDiv.appendChild(memberDiv);
                }
            });
        });
        const colors = ["#4a0750", "#590860", "#680a70", "#770b80", "#860d90", "#950ea0", "#a310b1", "#b211c1", "#c113d1", "#d014e1", "#d91dea", "#dc2deb", "#de3ded", "#e14dee", "#e45ef0", "#e66ef1", "#e97ef3", "#ec8ef4", "#ee9ef6", "#f1aef7", "#f4bef9", "#f6cefa", "#f9defc", "#fceefd", "#ffffff"];
        document.querySelectorAll("svg g").forEach(group => {
            const prefName = group.id;
            const count = prefCount[prefName] || 0;
            const landPaths = group.querySelectorAll(".land");
            if (landPaths.length > 0) {
                const color = count > 0 ? colors[Math.min(count - 1, colors.length - 1)] : "#1d0220";
                landPaths.forEach(path => path.style.fill = color);
            }
        });
        setupInteractivity();
    }
    function setupInteractivity() {
        const allPrefectureGroups = document.querySelectorAll('svg g');
        const resetAllStates = () => {
            allPrefectureGroups.forEach(g => g.classList.remove('active', 'inactive'));
            if (activePrefectureElement) {
                activePrefectureElement.classList.remove('active');
                activePrefectureElement = null;
            }
            const activeContent = memberContentContainer.querySelector('.active');
            if (activeContent) {
                activeContent.classList.remove('active');
            }
        };
        const showPrefectureContent = (prefectureId) => {
            const targetDiv = document.querySelector(`#content-${prefectureId}`);
            if (!targetDiv || targetDiv.classList.contains('active')) return;
            const currentActive = memberContentContainer.querySelector('.active');
            if (currentActive) currentActive.classList.remove('active');
            setTimeout(() => targetDiv.classList.add('active'), 10);
        };
        allPrefectureGroups.forEach(group => {
            if (group.querySelector('.land')) {
                group.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const clickedId = group.id;
                    if (group.classList.contains('active')) {
                        resetAllStates();
                        return;
                    }
                    resetAllStates();
                    group.classList.add('active');
                    activePrefectureElement = group;
                    allPrefectureGroups.forEach(g => {
                        if (g !== group) g.classList.add('inactive');
                    });
                    group.parentNode.appendChild(group);
                    showPrefectureContent(clickedId);
                });
            }
        });
        document.body.addEventListener('click', (event) => {
            if (!event.target.closest('#svg-container')) {
                resetAllStates();
            }
        });
    }
});