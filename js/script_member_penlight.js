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
        keyakizaka46: '../store/member/members_db_keya.json',
        sakurazaka46: '../store/member/members_db_saku.json',
        hinatazaka46: '../store/member/members_db_hina.json'
    };
    
    try {
        if (typeof loadPictReleaseData === "function") {
            await loadPictReleaseData();
        }

        const [penlightRes, nogiDbRes, keyaDbRes, sakuDbRes, hinaDbRes] = await Promise.all([
            fetch('../store/member/member_penlight.json'),
            fetch(memberDbFiles.nogizaka46), fetch(memberDbFiles.keyakizaka46),
            fetch(memberDbFiles.sakurazaka46), fetch(memberDbFiles.hinatazaka46)
        ]);

        const penlightData = await penlightRes.json();
        const allMemberDbs = {
            nogizaka46: await nogiDbRes.json(),
            keyakizaka46: await keyaDbRes.json(),
            sakurazaka46: await sakuDbRes.json(),
            hinatazaka46: await hinaDbRes.json()
        };

        const memberLookup = new Map();
        for (const group in allMemberDbs) {
            allMemberDbs[group].forEach(member => {
                member.group_id = member.group_id || (group === "nogizaka46" ? "nogi" : (group === "sakurazaka46" ? "sakura" : (group === "hinatazaka46" ? "hinata" : "keyaki")));
                memberLookup.set(member.nama_jp, member);
            });
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
        wrapper.setAttribute('data-status', memberDetails.status || 'aktif');
        
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

        const picContainer = document.createElement("div");
        picContainer.className = "picmember-container";

        const picmember = document.createElement("img");
        picmember.id = "picmember";
        picmember.className = "picmember";
        picmember.alt = memberDetails.nama_romaji;

        picContainer.appendChild(picmember);
        imageContainer.appendChild(picContainer);

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

        const doCrop = function() {
            if (typeof window.applyMoeCrop === "function") {
                window.applyMoeCrop(picmember, memberDetails.nama_jp);
            } else {
                picmember.style.opacity = '1';
            }
        };

        picmember.onload = doCrop;

        if (memberDetails.status === "aktif" && typeof getMemberPhotoInfo === "function") {
            const photoInfo = getMemberPhotoInfo(memberDetails, "2026.11.11", group);
            picmember.src = photoInfo.url || memberDetails.foto_profil;
            if (photoInfo.fallbacks) {
                picmember.dataset.fallbacks = photoInfo.fallbacks;
                picmember.onerror = function() {
                    if (typeof window.handleMoeFallback === "function") {
                        window.handleMoeFallback(this);
                    } else {
                        this.onerror = null;
                    }
                };
            }
        } else {
            picmember.src = memberDetails.foto_profil;
        }

        if (picmember.complete && picmember.naturalWidth > 0) {
            doCrop();
        }
    }

    function setupFilters(penlightData) {
        const groupButtons = document.querySelectorAll('.filter-btn[data-group]');
        const genButtons = document.querySelectorAll('.filter-btn[data-gen]');
        const statusButtons = document.querySelectorAll('.filter-btn[data-status]');
        
        let currentGroup = 'all';
        let currentGen = 'all';
        let currentStatus = 'aktif';

        const groupGenAvailability = {
            nogizaka46: Object.keys(penlightData.nogizaka46 || {}),
            keyakizaka46: Object.keys(penlightData.keyakizaka46 || {}),
            sakurazaka46: Object.keys(penlightData.sakurazaka46 || {}),
            hinatazaka46: Object.keys(penlightData.hinatazaka46 || {})
        };

        function updateGenButtons(group) {
            let availableGens = new Set();
            if (group === 'all') {
                ['gen1', 'gen2', 'gen3', 'gen4', 'gen5', 'gen6'].forEach(g => availableGens.add(g));
            } else if (groupGenAvailability[group]) {
                groupGenAvailability[group].forEach(g => availableGens.add(g));
            }
            
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

        statusButtons.forEach(button => {
            button.addEventListener('click', () => {
                statusButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentStatus = button.dataset.status;
                applyFilters();
            });
        });

        function applyFilters() {
            const allMembers = document.querySelectorAll('.stickmember-wrapper');

            allMembers.forEach(member => {
                const memberGroup = member.dataset.group;
                const memberGen = member.dataset.gen;
                const memberStatus = member.dataset.status;

                const groupMatch = (currentGroup === 'all') || (memberGroup === currentGroup);
                const genMatch = (currentGen === 'all') || (memberGen === currentGen);
                const statusMatch = (currentStatus === 'all') || (memberStatus === currentStatus);

                if (groupMatch && genMatch && statusMatch) {
                    member.style.display = 'inline-block';
                } else {
                    member.style.display = 'none';
                }
            });
            
            document.querySelectorAll('.penlist').forEach(list => {
                const group = list.dataset.for;
                const title = document.querySelector(`.pentitle[data-group-title="${group}"]`);
                const existingMsg = list.querySelector('.empty-member-msg');
                if (existingMsg) {
                    existingMsg.remove();
                }

                // 1. Cek apakah grup ini cocok dengan filter grup
                const isGroupMatch = (currentGroup === 'all') || (currentGroup === group);
                if (!isGroupMatch) {
                    if (title) title.style.display = 'none';
                    list.style.display = 'none';
                    return;
                }

                // 2. Cek apakah grup ini memiliki generasi yang sedang dipilih
                const availableGensInGroup = groupGenAvailability[group] || [];
                if (currentGen !== 'all' && !availableGensInGroup.includes(currentGen)) {
                    // Grup ini BELUM/TIDAK memiliki generasi ini (misal Hinatazaka/Sakurazaka di gen-6)
                    // Maka sembunyikan grup ini sepenuhnya, JANGAN tampilkan teks 'Semua member sudah lulus'
                    if (title) title.style.display = 'none';
                    list.style.display = 'none';
                    return;
                }

                // 3. Penanganan khusus Keyakizaka46
                // Keyakizaka adalah grup yang telah berganti nama/reorganisasi ke Sakurazaka46 dan tidak memiliki member aktif
                if (group === 'keyakizaka46') {
                    if (currentStatus === 'aktif') {
                        if (currentGroup === 'all') {
                            // Saat di view ALL dengan status Member aktif, Keyakizaka disembunyikan agar tidak janggal
                            if (title) title.style.display = 'none';
                            list.style.display = 'none';
                            return;
                        } else {
                            // Jika user secara eksplisit memilih tombol Keyakizaka46 saat status Member aktif
                            if (title) title.style.display = 'block';
                            list.style.display = 'block';
                            const emptyDiv = document.createElement('div');
                            emptyDiv.className = 'empty-member-msg';
                            emptyDiv.textContent = 'Keyakizaka46 telah berganti nama menjadi Sakurazaka46.';
                            list.appendChild(emptyDiv);
                            return;
                        }
                    }
                }

                // 4. Untuk grup yang valid dan memiliki generasi tersebut:
                // Tampilkan pentitle dan list
                if (title) title.style.display = 'block';
                list.style.display = 'block';

                const visibleMembers = list.querySelectorAll('.stickmember-wrapper[style*="inline-block"]');
                
                if (visibleMembers.length === 0) {
                    const emptyDiv = document.createElement('div');
                    emptyDiv.className = 'empty-member-msg';

                    let caption = "";
                    if (currentStatus === 'lulus') {
                        caption = (currentGen !== 'all') 
                            ? "Belum ada member di generasi sini yang lulus" 
                            : "Belum ada member di grup sini yang lulus";
                    } else {
                        // Status 'aktif' (Member)
                        caption = (currentGen !== 'all') 
                            ? "Semua member di generasi sini sudah lulus" 
                            : "Semua member di grup sini sudah lulus";
                    }

                    emptyDiv.textContent = caption;
                    list.appendChild(emptyDiv);
                }
            });
        }
        
        updateGenButtons('all');
        applyFilters();
    }
});
