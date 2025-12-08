document.addEventListener("DOMContentLoaded", async function() {
    const penlightBaseUrl = "https://ik.imagekit.io/moearchive/penlight";
    const penlightMap = {
        dred: 'penred', dpurple: 'penviolet', dsakura: 'penpink', dsakupink: 'pensakuralight',
        dpink: 'penpink2', dpinkhot: 'penpink2', dpinkpassion: 'penpinkpassion', dblue: 'penblue',
        dbluelight: 'penao', dbluepastel: 'penbluepastel', dyellow: 'penyellow', dwhite: 'penwhite',
        dblack: 'penblack', dgreen: 'pengreend', dgreenlight: 'pengreenl', dorange: 'penorange',
        dturqoise: 'penturq', dgreenpea: 'penpeagreen', dgreenpearl: 'pengreenpearl',
        dgreenemerald: 'pengreenemerald', dviolet: 'penviolet', dxxx: 'penxxx'
    };
    const colorNameMap = {
        dred: "Red", dpurple: "Purple", dsakura: "Sakura", dsakupink: "S. Pink",
        dpink: "Pink", dpinkhot: "Hot Pink", dpinkpassion: "Passion", dblue: "Blue",
        dbluelight: "L. Blue", dbluepastel: "P. Blue", dyellow: "Yellow", dwhite: "White",
        dblack: "Black", dgreen: "Green", dgreenlight: "L. Green", dorange: "Orange",
        dturqoise: "Turquoise", dgreenpea: "Pea Green", dgreenpearl: "P. Green",
        dgreenemerald: "Emerald", dviolet: "Violet", dxxx: "N/A"
    };
    const memberDbFiles = {
        nogizaka46: '../store/member/members.json',
        sakurazaka46: '../store/member/members_db_saku.json',
        keyakizaka46: '../store/member/members_db_keya.json',
        hinatazaka46: '../store/member/members_db_hina.json'
    };
    try {
        const [penlightRes, nogiDbRes, sakuDbRes, keyaDbRes, hinaDbRes] = await Promise.all([
            fetch('../store/member/member_penlight.json'),
            fetch(memberDbFiles.nogizaka46), fetch(memberDbFiles.sakurazaka46),
            fetch(memberDbFiles.keyakizaka46), fetch(memberDbFiles.hinatazaka46)
        ]);
        const penlightData = await penlightRes.json();
        const allMemberDbs = {
            nogizaka46: await nogiDbRes.json(), sakurazaka46: await sakuDbRes.json(),
            keyakizaka46: await keyaDbRes.json(), hinatazaka46: await hinaDbRes.json()
        };
        const memberLookup = new Map();
        for (const group in allMemberDbs) {
            allMemberDbs[group].forEach(member => memberLookup.set(member.nama_jp, member));
        }
        const yoshida = memberLookup.get("吉田綾乃クリスティー");
        if (yoshida) memberLookup.set("吉田綾乃", yoshida);
        document.querySelectorAll(".penlist").forEach(container => {
            const groupName = container.getAttribute("data-for");
            const groupPenlightData = penlightData[groupName];
            if (!groupPenlightData) return;
            for (const gen in groupPenlightData) {
                groupPenlightData[gen].forEach(memberInfo => {
                    const memberDetails = memberLookup.get(memberInfo.name);
                    if (memberDetails) {
                        renderMember(container, memberInfo, memberDetails, groupName, gen);
                    }
                });
            }
        });
        setupFilters(penlightData);
    } catch (error) {
        console.error("Gagal memuat atau memproses data:", error);
    }
    function renderMember(container, memberPenlight, memberDetails, group, gen) {
        const wrapper = document.createElement('div');
        wrapper.className = 'stickmember-wrapper';
        wrapper.setAttribute('data-group', group);
        wrapper.setAttribute('data-gen', gen);  
        const shadow = document.createElement('div');
        shadow.className = 'stickmember-shadow';
        wrapper.appendChild(shadow);
        const stickMember = document.createElement("div");
        stickMember.className = "stickmember";
        const nameDiv = document.createElement("div");
        nameDiv.className = "memname";
        nameDiv.textContent = memberPenlight.name;
        stickMember.appendChild(nameDiv);
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        const [colorCode1, colorCode2] = memberPenlight.detailDiv;
        const rotstickA = document.createElement("img");
        rotstickA.id = "rotsticka";
        rotstickA.src = `${penlightBaseUrl}/${penlightMap[colorCode1] || 'penxxx'}.png`;
        rotstickA.alt = colorCode1;
        imageContainer.appendChild(rotstickA);
        const picmember = document.createElement("img");
        picmember.id = "picmember";
        picmember.src = memberDetails.foto_profil;
        picmember.alt = memberDetails.nama_romaji;
        picmember.loading = 'lazy';
        imageContainer.appendChild(picmember);
        const rotstickB = document.createElement("img");
        rotstickB.id = "rotstickb";
        rotstickB.src = `${penlightBaseUrl}/${penlightMap[colorCode2] || 'penxxx'}.png`;
        rotstickB.alt = colorCode2;
        imageContainer.appendChild(rotstickB);
        stickMember.appendChild(imageContainer);
        const boxname = document.createElement("div");
        boxname.className = "boxname";
        boxname.textContent = memberDetails.nama_romaji;
        stickMember.appendChild(boxname);
        const pdetail = document.createElement("div");
        pdetail.className = "pdetail";
        memberPenlight.detailDiv.forEach(color => {
            const colorInfo = document.createElement('div');
            colorInfo.className = `color-info ${color}`;
            const colorLabel = document.createElement('span');
            colorLabel.className = 'color-label';
            colorLabel.textContent = colorNameMap[color] || 'N/A';
            colorInfo.appendChild(colorLabel);
            pdetail.appendChild(colorInfo);
        });
        stickMember.appendChild(pdetail);
        wrapper.appendChild(stickMember);
        container.appendChild(wrapper);
    }
    function setupFilters(penlightData) {
        const groupButtons = document.querySelectorAll('.filter-btn[data-group]');
        const genButtons = document.querySelectorAll('.filter-btn[data-gen]');
        let currentGroup = 'all';
        let currentGen = 'all';
        const groupGenAvailability = {
            nogizaka46: Object.keys(penlightData.nogizaka46).map(gen => gen.startsWith('noog') ? 'grad' : gen),
            sakurazaka46: Object.keys(penlightData.sakurazaka46).map(gen => gen.endsWith('og') ? 'grad' : gen),
            hinatazaka46: Object.keys(penlightData.hinatazaka46).map(gen => gen.startsWith('hinog') ? 'grad' : gen)
        };
        groupGenAvailability.keyakizaka46 = ['grad'];
        function updateGenButtons(group) {
            const availableGens = new Set(group === 'all' ? ['gen1', 'gen2', 'gen3', 'gen4', 'gen5', 'gen6', 'grad'] : groupGenAvailability[group]);
            genButtons.forEach(btn => {
                const gen = btn.dataset.gen;
                if (gen === 'all' || availableGens.has(gen)) {
                    btn.style.display = 'inline-block';
                } else {
                    btn.style.display = 'none';
                }
            });
        }
        groupButtons.forEach(button => {
            button.addEventListener('click', () => {
                groupButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentGroup = button.dataset.group;
                currentGen = 'all';
                genButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('.gen-btn[data-gen="all"]').classList.add('active');
                updateGenButtons(currentGroup);
                applyFilters();
            });
        });
        genButtons.forEach(button => {
            button.addEventListener('click', () => {
                genButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentGen = button.dataset.gen;
                applyFilters();
            });
        });
        function applyFilters() {
            const allMembers = document.querySelectorAll('.stickmember-wrapper');
            allMembers.forEach(member => {
                const memberGroup = member.dataset.group;
                const memberGen = member.dataset.gen;  
                const simplifiedGen = memberGen.endsWith('og') ? 'grad' : memberGen;  
                let groupMatch = false;
                if (currentGroup === 'all') {
                    groupMatch = true;
                } else if (currentGroup === 'keyakizaka46') {
                    groupMatch = (memberGen === 'kyog');
                } else if (currentGroup === 'sakurazaka46') {
                    groupMatch = (memberGroup === 'sakurazaka46' && memberGen !== 'kyog');
                } else {
                    groupMatch = (memberGroup === currentGroup);
                }
                const genMatch = (currentGen === 'all') || (simplifiedGen === currentGen);
                if (groupMatch && genMatch) {
                    member.style.display = 'inline-block';
                } else {
                    member.style.display = 'none';
                }
            });
            document.querySelectorAll('.penlist').forEach(list => {
                const group = list.dataset.for;
                const title = document.querySelector(`.pentitle[data-group-title="${group}"]`);
                const songList = document.querySelector(`.song-list[data-song-for="${group}"]`);
                const visibleMembers = list.querySelectorAll('.stickmember-wrapper[style*="inline-block"]');
                if (title && songList) {
                    if (visibleMembers.length > 0) {
                        title.style.display = 'block';
                        songList.style.display = 'block';
                    } else {
                        title.style.display = 'none';
                        songList.style.display = 'none';
                    }
                }
            });
        }
        updateGenButtons('all');
    }
});