document.addEventListener("DOMContentLoaded", function() {

    // Path ke file-file JSON yang dibutuhkan
    const a = {
        songall: '../store/single/songall.json',
        bgColors: '../store/single/senbatsu_member_bg.json',
        members: '../store/member/members.json'
    };

    // Tooltip data
    const tooltips = {
        "人数": "Jumlah",
        "作詞": "Lirik",
        "編曲": "Arranger",
        "作曲": "Composer",
        "作曲 & 編曲": "Composer & Arranger",
        "MV監督": "Sutradara MV",
        "振付師": "Choreographer"
    };
    
    // Fetch semua data yang diperlukan
    Promise.all([
        fetch(a.songall).then(res => res.json()),
        fetch(a.members).then(res => res.json()),
        fetch(a.bgColors).then(res => res.json())
    ]).then(([songall, membersData, bgColors]) => {
        
        const photoMember = {
            generalUrl: "https://ik.imagekit.io/moearchive/web/memberprofile/",
            specialCases: { 16: 15, 18: 17, 19: 17, 21: 20, 23: 22, 29: 28, 30: 28, 32: 31, 34: 3, 40: 39 },
            singleNumber: function(singleIndex) {
                return `s${String(this.specialCases[singleIndex] || singleIndex).padStart(3, '0')}`;
            },
            getMemberId: function(memberName) {
                const member = membersData.find(m => m.nama_jp === memberName);
                return member ? member.id : null;
            },
            getPhotoUrl: function(singleIndex, memberName) {
                const memberId = this.getMemberId(memberName);
                if (memberId) {
                    if (memberName === "早川聖来" && singleIndex == 33) return "https://ik.imagekit.io/moearchive/web/memberprofile/s031/hayakawa_seira.png";
                    if (memberName === "掛橋沙耶香" && singleIndex == 31) return "https://ik.imagekit.io/moearchive/web/memberprofile/s028/kakehashi_sayaka.png";
                    const filename = memberId.replace(/-/g, '_');
                    return `${this.generalUrl}${this.singleNumber(singleIndex)}/${filename}.png`;
                }
                return `https://via.placeholder.com/100x133.png?text=${memberName}`;
            },
            getSvgUrl: function(memberName) {
                const memberId = this.getMemberId(memberName);
                if (memberId) {
                    const filename = memberId.replace(/-/g, '_');
                    return `../sprite/formframe/${filename}.svg`;
                }
                return null;
            }
        };

        const senbatsuContainer = document.getElementById('senbatsuContainer');

        const singleKeys = Object.keys(songall).filter(key => key.startsWith('s') && !isNaN(key.substring(1))).sort((a, b) => parseInt(a.substring(1)) - parseInt(b.substring(1)));

        for (const key of singleKeys) {
            const singleKey = parseInt(key.substring(1));
            const allSongsInSingleArr = songall[key];
            const single = allSongsInSingleArr.find(song => song.songOutline === "Under");
            
            if (!single) continue;

            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row-container');

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('title-container');
            const singleNumberSpan = document.createElement('span');
            singleNumberSpan.classList.add('numbersbs');
            singleNumberSpan.textContent = `${singleKey}枚目`;
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
            
            const formationRowKeys = Object.keys(single)
                .filter(key => key.startsWith('members'))
                .sort((a, b) => {
                    const numA = parseInt(a.match(/\d+/)[0], 10);
                    const numB = parseInt(b.match(/\d+/)[0], 10);
                    return numB - numA;
                });

            const allMembersInSingle = [];
            formationRowKeys.forEach(rowKey => {
                if(single[rowKey]) allMembersInSingle.push(...single[rowKey]);
            });

            formationRowKeys.forEach(rowKey => {
                 if (!single[rowKey]) return;
                 const rowFormationDiv = document.createElement('div');
                 rowFormationDiv.classList.add('row');
                 single[rowKey].forEach(memberName => {
                    if (memberName === "吉田綾乃ｸﾘｽﾃｨｰ") memberName = "吉田綾乃クリスティー";
                    const memberPhotoUrl = photoMember.getPhotoUrl(singleKey, memberName);
                    const memberSvgUrl = photoMember.getSvgUrl(memberName);
                    const memberContainer = document.createElement('div');
                    memberContainer.classList.add('member-container');
                    
                    if (bgColors[singleKey]) {
                        memberContainer.style.backgroundColor = bgColors[singleKey];
                        memberContainer.style.borderColor = bgColors[singleKey];
                    } else {
                        memberContainer.style.backgroundColor = "white";
                        memberContainer.style.borderColor = "white";
                    }
                    if (memberSvgUrl) {
                        const svgImg = document.createElement('img');
                        svgImg.src = memberSvgUrl;
                        svgImg.classList.add('svgmember');
                        memberContainer.appendChild(svgImg);
                    }
                    if (memberPhotoUrl) {
                        const img = document.createElement('img');
                        img.src = memberPhotoUrl;
                        img.alt = memberName;
                        img.classList.add('fotomember');
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

            const infoGroupDiv = document.createElement('div');
            infoGroupDiv.classList.add('info-datasingle');
            
            function createInfoBox(title, content, subContent = '', isSmall = true) {
                const boxDiv = document.createElement('div');
                boxDiv.classList.add(isSmall ? 'info-data-min' : 'info-data');
                const titleHtml = `<div class="statusmember tooltip">${title}<span class="tooltiptext">${tooltips[title] || title}</span></div>`;
                const contentHtml = `<div class="info-item info-count">${content}</div>`;
                const subContentHtml = subContent ? `<div class="info-item info-count-mini">${subContent}</div>` : '';
                boxDiv.innerHTML = titleHtml + contentHtml + subContentHtml;
                return boxDiv;
            }
            
            infoGroupDiv.appendChild(createInfoBox("人数", `${allMembersInSingle.length}名`));
            
            const genStats = allMembersInSingle.reduce((acc, memberName) => {
                if (memberName === "吉田綾乃ｸﾘｽﾃｨｰ") memberName = "吉田綾乃クリスティー";
                const member = membersData.find(m => m.nama_jp === memberName);
                if (member) {
                    const gen = member.gen === "留学" ? "兼" : member.gen.replace('期','');
                    acc[gen] = (acc[gen] || 0) + 1;
                }
                return acc;
            }, {});

            Object.keys(genStats).sort().forEach(genKey => {
                 infoGroupDiv.appendChild(createInfoBox(`${genKey}${genKey !== "兼" ? "期" : ""}`, `${genStats[genKey]}名`));
            });
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
            
            let mvDirectorText = formatData(single.SongMVDirJP || '');
            if(single.SongMVDirRO) mvDirectorText += ` (${formatData(single.SongMVDirRO)})`;
            if (mvDirectorText) infoSingleDiv.appendChild(createInfoBox('MV監督', mvDirectorText.trim(), '', false));

            if (single.SongChoreo) infoSingleDiv.appendChild(createInfoBox('振付師', formatData(single.SongChoreo), '', false));
            
            if (infoSingleDiv.hasChildNodes()) {
                subRowDiv.appendChild(infoSingleDiv);
            }
            
            rowDiv.appendChild(subRowDiv);
            senbatsuContainer.appendChild(rowDiv);
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
        function plusSlides(n) {
            let newSlide = currentSlide + n;
            if (newSlide >= rowContainers.length) newSlide = 0;
            if (newSlide < 0) newSlide = rowContainers.length - 1;
            currentSlide = newSlide;
            showSlide(currentSlide);
        }
        document.querySelector(".next").addEventListener("click", () => plusSlides(1));
        document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));
        showSlide(currentSlide);
    }
});