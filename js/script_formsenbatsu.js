document.addEventListener("DOMContentLoaded", function() {

    const a = {
        songall: '../store/single/songall.json',
        releases: '../store/single/single_release.json',
        bgColors: '../store/single/senbatsu_member_bg.json',
        members: '../store/member/members.json',
        grad: '../store/member/members_single_grad.json',
        hiatus: '../store/member/members_single_hiatus.json',
        transfer: '../store/member/members_single_transfer.json',
        notPart: '../store/member/members_single_hiatus_not_participate.json',
        sick: '../store/member/members_single_hiatus_sick.json'
    };

    const tooltips = { "選抜発表日": "Hari formasi senbatsu diumumkan", "日数の差": "Rentang hari dari formasi senbatsu diumumkan ke tanggal rilis", "発売日": "Hari perilisan single", "人数": "Jumlah", "作詞": "Lirik", "編曲": "Arranger", "作曲": "Composer", "作曲 & 編曲": "Composer & Arranger", "MV監督": "Sutradara MV", "振付師": "Choreographer", "不参加": "Member yang tidak ikut serta...", "初選抜": "Member yang pertama kali masuk senbatsu", "選抜落ち": "Member yang single sebelumnya...", "選抜復帰": "Member yang pernah masuk senbatsu...", "卒業": "Member yang memutuskan lulus", "休業中": "Member yang mengalami penangguhan...", "体調不良": "Member yang kesehatannya memburuk", "交換留学生": "Member pertukaran dari grup lain" };
    
    Promise.all([
        fetch(a.songall).then(res => res.json()),
        fetch(a.releases).then(res => res.json()),
        fetch(a.members).then(res => res.json()),
        fetch(a.grad).then(res => res.json()),
        fetch(a.hiatus).then(res => res.json()),
        fetch(a.transfer).then(res => res.json()),
        fetch(a.notPart).then(res => res.json()),
        fetch(a.sick).then(res => res.json()),
        fetch(a.bgColors).then(res => res.json())
    ]).then(([songall, releases, membersData, grad, hiatus, transfer, notPart, sick, bgColors]) => {
        
        const specialCases = { 16: 15, 18: 17, 19: 17, 21: 20, 23: 22, 29: 28, 30: 28, 32: 31, 34: 33 };
        const baseUrl = "https://ik.imagekit.io/moearchive/web/memberprofile/";

        function setMemberImageWithFallback(imgElement, memberId, currentSingleKey) {
            if (currentSingleKey < 1) {
                imgElement.src = `https://via.placeholder.com/150x200/cccccc/ffffff.png?text=${memberId.replace(/_/g, '+')}`;
                imgElement.style.objectFit = 'contain';
                return;
            }
            
            const singleFolderNumber = `s${String(specialCases[currentSingleKey] || currentSingleKey).padStart(3, '0')}`;
            const urlToTry = `${baseUrl}${singleFolderNumber}/${memberId}.png`;
            const imageTester = new Image();
            imageTester.onload = () => { imgElement.src = urlToTry; };
            imageTester.onerror = () => { setMemberImageWithFallback(imgElement, memberId, currentSingleKey - 1); };
            imageTester.src = urlToTry;
        }

        const getMemberId = (memberName) => {
            const member = membersData.find(m => m.nama_jp === memberName);
            return member ? member.id : null;
        };

        function formatDateStandard(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}/${month}/${day}`;
        }

        const senbatsuContainer = document.getElementById('senbatsuContainer');
        let previousMembers = {};

        const singleKeys = Object.keys(songall).filter(key => key.startsWith('s') && !isNaN(key.substring(1))).sort((a, b) => parseInt(a.substring(1)) - parseInt(b.substring(1)));

        for (const key of singleKeys) {
            const singleKey = parseInt(key.substring(1));
            const allSongsInSingleArr = songall[key];
            const single = allSongsInSingleArr[0];
            if (!single) continue;

            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row-container');

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('title-container');
            const singleNumberSpan = document.createElement('span');
            singleNumberSpan.classList.add('numbersbs');
            singleNumberSpan.textContent = (singleKey == 1) ? `デビュー` : `${singleKey}枚目`;
            const singleTitleSpan = document.createElement('span');
            singleTitleSpan.classList.add('titlesbs');
            singleTitleSpan.textContent = `${single.titleJp}`;
            titleDiv.appendChild(singleNumberSpan);
            titleDiv.appendChild(singleTitleSpan);
            rowDiv.appendChild(titleDiv);

            const subRowDiv = document.createElement('div');
            subRowDiv.classList.add('sub-row');
            const formationsDiv = document.createElement('div');
            formationsDiv.classList.add('formation');

            const formationRowKeys = ['members3', 'members2', 'members1'];
            const allMembersInSingle = [];
            formationRowKeys.forEach(rowKey => { if(single[rowKey]) allMembersInSingle.push(...single[rowKey]); });

            formationRowKeys.forEach(rowKey => {
                 if (!single[rowKey]) return;
                 const rowFormationDiv = document.createElement('div');
                 rowFormationDiv.classList.add('row');
                 single[rowKey].forEach(memberName => {
                    if (memberName === "吉田綾乃ｸﾘｽﾃｨｰ") memberName = "吉田綾乃クリスティー";
                    
                    const memberContainer = document.createElement('div');
                    memberContainer.classList.add('member-container');
                    if (bgColors[singleKey]) {
                        memberContainer.style.backgroundColor = bgColors[singleKey];
                        memberContainer.style.borderColor = bgColors[singleKey];
                    } else {
                        memberContainer.style.backgroundColor = "white";
                        memberContainer.style.borderColor = "white";
                    }

                    const memberId = getMemberId(memberName);
                    if (memberId) {
                        const memberIdUnderscore = memberId.replace(/-/g, '_');

                        const svgImg = document.createElement('img');
                        svgImg.src = `../sprite/formframe/${memberIdUnderscore}.svg`;
                        svgImg.classList.add('svgmember');
                        memberContainer.appendChild(svgImg);

                        const img = document.createElement('img');
                        img.alt = memberName;
                        img.classList.add('fotomember');
                        img.src = ""; // Sumber dikosongkan dulu, akan diisi oleh fungsi fallback
                        setMemberImageWithFallback(img, memberIdUnderscore, singleKey);
                        
                        if ((Array.isArray(single.center) && single.center.includes(memberName)) || single.center === memberName) {
                            img.classList.add('center');
                        }
                        memberContainer.appendChild(img);
                    }
                    rowFormationDiv.appendChild(memberContainer);
                 });
                 formationsDiv.appendChild(rowFormationDiv);
            });
            
            const wadahsenbaDiv = document.createElement('div');
            wadahsenbaDiv.classList.add('wadahsenba');
            formationsDiv.appendChild(wadahsenbaDiv);
            subRowDiv.appendChild(formationsDiv);

            function createInfoBox(title, content, subContent = '', isSmall = true, contentTooltip = '') {
                const boxDiv = document.createElement('div');
                boxDiv.classList.add(isSmall ? 'info-data-min' : 'info-data');
                const titleHtml = `<div class="statusmember tooltip">${title}<span class="tooltiptext">${tooltips[title] || title}</span></div>`;
                let contentHtml = `<div class="info-item info-count">${content}</div>`;
                if (contentTooltip) {
                    contentHtml = `<div class="info-item info-count tooltip">${content}<span class="tooltiptext">${contentTooltip}</span></div>`;
                }
                const subContentHtml = subContent ? `<div class="info-item info-count-mini">${subContent}</div>` : '';
                boxDiv.innerHTML = titleHtml + contentHtml + subContentHtml;
                return boxDiv;
            }

            const infoGroupDiv = document.createElement('div');
            infoGroupDiv.classList.add('info-datasingle');
            const releaseInfo = releases.find(r => r.num == singleKey);
            if (releaseInfo) {
                infoGroupDiv.appendChild(createInfoBox("選抜発表日", formatDateStandard(releaseInfo.announcementDate), releaseInfo.airingChannel));
                const diff = Math.ceil((new Date(releaseInfo.releaseDate) - new Date(releaseInfo.announcementDate)) / (1000 * 60 * 60 * 24));
                infoGroupDiv.appendChild(createInfoBox("日数の差", `${diff}日`));
                infoGroupDiv.appendChild(createInfoBox("発売日", formatDateStandard(releaseInfo.releaseDate)));
            }
            infoGroupDiv.appendChild(createInfoBox("人数", `${allMembersInSingle.length}名`));
            const genStats = allMembersInSingle.reduce((acc, memberName) => {
                if (memberName === "吉田綾乃ｸﾘｽﾃｨｰ") memberName = "吉田綾乃クリスティー";
                const member = membersData.find(m => m.nama_jp === memberName);
                if (member) { const gen = member.gen === "留学" ? "兼" : member.gen.replace('期',''); acc[gen] = (acc[gen] || 0) + 1; }
                return acc;
            }, {});
            Object.keys(genStats).sort().forEach(genKey => { infoGroupDiv.appendChild(createInfoBox(`${genKey}${genKey !== "兼" ? "期" : ""}`, `${genStats[genKey]}名`)); });
            subRowDiv.appendChild(infoGroupDiv);
            
            const infoSingleDiv = document.createElement('div');
            infoSingleDiv.classList.add('info-datasingle');
            const formatData = (data) => Array.isArray(data) ? data.join(', ') : data;
            const areCreatorsEqual = (a, b) => a && b && JSON.stringify(a) === JSON.stringify(b);
            if (single.SongLyricsJP) infoSingleDiv.appendChild(createInfoBox('作詞', formatData(single.SongLyricsJP), '', false));
            if (areCreatorsEqual(single.SongCompJP, single.SongArraJP)) {
                infoSingleDiv.appendChild(createInfoBox('作曲 & 編曲', formatData(single.SongCompJP), '', false));
            } else {
                if (single.SongCompJP) infoSingleDiv.appendChild(createInfoBox('作曲', formatData(single.SongCompJP), '', false));
                if (single.SongArraJP) infoSingleDiv.appendChild(createInfoBox('編曲', formatData(single.SongArraJP), '', false));
            }
            if (single.SongMVDirJP) {
                const directorJP = formatData(single.SongMVDirJP);
                const directorRO = single.SongMVDirRO ? formatData(single.SongMVDirRO) : '';
                infoSingleDiv.appendChild(createInfoBox('MV監督', directorJP, '', false, directorRO));
            }
            if (single.SongChoreo) infoSingleDiv.appendChild(createInfoBox('振付師', formatData(single.SongChoreo), '', false));
            if (infoSingleDiv.hasChildNodes()) { subRowDiv.appendChild(infoSingleDiv); }

            const infoFlexContainer = document.createElement('div');
            infoFlexContainer.classList.add('flex-container');
			function createMemberGroup(title, memberList) {
                if (!memberList || memberList.length === 0) return null;
                const groupDiv = document.createElement('div'); groupDiv.classList.add('info-group');
                groupDiv.innerHTML = `<div class="statusmember tooltip">${title}<span class="tooltiptext">${tooltips[title] || title}</span></div>`;
                const itemDiv = document.createElement('div'); itemDiv.classList.add('info-item');
                const membersArray = Array.isArray(memberList) ? memberList : [memberList];
                membersArray.forEach(member => {
                    let memberName = typeof member === 'object' ? member.name : member;
                    if (memberName === "吉田綾乃ｸﾘｽﾃｨｰ") memberName = "吉田綾乃クリスティー";
                    
                    // MODIFIKASI: Tambahkan kelas 'tooltip' ke container member
                    const memberContainer = document.createElement('div'); memberContainer.classList.add('member-container', 'tooltip');
                    
                    // MODIFIKASI: Ambil data lengkap member
                    const memberData = membersData.find(m => m.nama_jp === memberName);

                    if(memberData) {
                        // MODIFIKASI BARU: Buat dan tambahkan tooltip untuk nama_jp
                        const tooltipSpan = document.createElement('span');
                        tooltipSpan.classList.add('tooltiptext');
                        tooltipSpan.textContent = memberData.nama_jp; // Menggunakan nama_jp
                        memberContainer.appendChild(tooltipSpan);

                        const img = document.createElement('img');
                        img.alt = memberName;
                        setMemberImageWithFallback(img, memberData.id.replace(/-/g, '_'), singleKey);
                        if (title === '選抜復帰') {
                            img.classList.add('kaeri-member');
                            const lastSingleNum = document.createElement('span'); lastSingleNum.textContent = member.lastSingle; lastSingleNum.classList.add('last-single-number');
                            memberContainer.appendChild(lastSingleNum);
                        }
                        memberContainer.appendChild(img);
                    }
                    itemDiv.appendChild(memberContainer);
                });
                groupDiv.appendChild(itemDiv); return groupDiv;
            }
            let hatsu = [], ochi = [], kaeri = [];
            allMembersInSingle.forEach(member => {
                let currentName = member; if (currentName === "吉田綾乃ｸﾘｽﾃｨｰ") currentName = "吉田綾乃クリスティー";
                if (!(currentName in previousMembers)) { hatsu.push(currentName); } 
                else if (previousMembers[currentName] < singleKey - 1) { kaeri.push({ name: currentName, lastSingle: previousMembers[currentName] }); }
            });
            Object.keys(previousMembers).forEach(member => {
                if (!allMembersInSingle.map(m => m === "吉田綾乃ｸﾘｽﾃｨｰ" ? "吉田綾乃クリスティー" : m).includes(member) && previousMembers[member] == singleKey - 1) { ochi.push(member); }
            });
            [ createMemberGroup("初選抜", hatsu), createMemberGroup("選抜落ち", ochi), createMemberGroup("選抜復帰", kaeri), createMemberGroup("卒業", grad[singleKey]), createMemberGroup("不参加", hiatus[singleKey]), createMemberGroup("交換留学生", transfer[singleKey]), createMemberGroup("休業中", notPart[singleKey]), createMemberGroup("体調不良", sick[singleKey]) ].forEach(group => { if(group) infoFlexContainer.appendChild(group); });
            subRowDiv.appendChild(infoFlexContainer);
            rowDiv.appendChild(subRowDiv);
            senbatsuContainer.appendChild(rowDiv);

            allMembersInSingle.forEach(member => {
                let currentName = member; if (currentName === "吉田綾乃ｸﾘｽﾃｨｰ") currentName = "吉田綾乃クリスティー";
                previousMembers[currentName] = singleKey; 
            });
            if(grad[singleKey]) { const graduated = Array.isArray(grad[singleKey]) ? grad[singleKey] : [grad[singleKey]]; graduated.forEach(gradMember => delete previousMembers[gradMember]); }
        }
        
        initializeSlider();
    }).catch(error => console.error("Gagal memuat data:", error));

    function initializeSlider() {
        const rowContainers = document.querySelectorAll(".row-container");
        if (rowContainers.length === 0) return;
        let currentSlide = rowContainers.length - 1;
        function showSlide(index) {
            rowContainers.forEach((row, idx) => { row.style.display = (idx === index) ? "flex" : "none"; });
            const activeRow = rowContainers[index];
            const title = activeRow.querySelector('.titlesbs');
            title.style.animation = 'none'; void title.offsetWidth; title.style.animation = 'scaleboom 0.6s ease forwards';
            const memberContainers = activeRow.querySelectorAll('.row .member-container');
            memberContainers.forEach(mc => { mc.style.animation = 'none'; mc.style.display = 'none'; });
            setTimeout(() => {
                memberContainers.forEach((member, i) => { member.style.display = 'flex'; member.style.animation = `bumbum 0.8s ease forwards ${0.1 * i}s`; });
            }, 600);
        }
        function plusSlides(n) { let newSlide = currentSlide + n; if (newSlide >= rowContainers.length) newSlide = 0; if (newSlide < 0) newSlide = rowContainers.length - 1; currentSlide = newSlide; showSlide(currentSlide); }
        document.querySelector(".next").addEventListener("click", () => plusSlides(1));
        document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));
        showSlide(currentSlide);
    }
});