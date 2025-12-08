document.addEventListener('DOMContentLoaded', () => {
    let allMembers = [];
    const calendarContainer = document.getElementById('calendar-container');
    const hbdContainer = document.getElementById('hbd-container');
    const filterButtons = document.querySelectorAll('.dropdown-btn');
    const toTitleCase = (str) => {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    const formatDate = (date) => {
        moment.locale('id');
        return moment(date).format('D MMMM YYYY');
    };
    const getGroupClass = (group, status) => {
        if (status === 'lulus') {
            if (group === 'keya') return 'gradk';
            return `grad${group.charAt(0)}`;
        }
        return group;
    };
    const addBirthdayGlowStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --glow-nogi: #814fa2;
                --glow-saku: #e95881;
                --glow-hina: #2eabdd;
                --glow-boku: #006ed6;
                --glow-gradn: #48265f;
                --glow-gradk: #1b6a21;
                --glow-grads: #8e1235;
                --glow-gradh: #004868;
            }
            @keyframes glowing {
                0% { box-shadow: 0 0 5px var(--glow-color, #fff); }
                50% { box-shadow: 0 0 25px 8px var(--glow-color, #fff); }
                100% { box-shadow: 0 0 5px var(--glow-color, #fff); }
            }
            .member-card.is-birthday-card {
                animation: glowing 2s infinite ease-in-out;
                border: 2pt solid var(--glow-color);
            }
            .nogi.is-birthday-card { --glow-color: var(--glow-nogi); }
            .saku.is-birthday-card { --glow-color: var(--glow-saku); }
            .hina.is-birthday-card { --glow-color: var(--glow-hina); }
            .boku.is-birthday-card { --glow-color: var(--glow-boku); }
            .gradn.is-birthday-card { --glow-color: var(--glow-nogi); }
            .gradk.is-birthday-card { --glow-color: var(--glow-gradk); }
            .grads.is-birthday-card { --glow-color: var(--glow-grads); }
            .gradh.is-birthday-card { --glow-color: var(--glow-gradh); }
        `;
        document.head.appendChild(style);
    };
    async function loadAllMembers() {
        const endpoints = {
            nogi: '../store/member/members.json',
            keya: '../store/member/members_db_keya.json',
            saku: '../store/member/members_db_saku.json',
            hina: '../store/member/members_db_hina.json',
            boku: '../store/member/members_db_boku.json'
        };
        const requests = Object.entries(endpoints).map(([group, url]) =>
            fetch(url).then(res => res.json()).then(data => ({ group, data }))
        );
        try {
            const results = await Promise.all(requests);
            let processedMembers = [];
            results.forEach(({ group, data }) => {
                const groupMembers = data.map(member => ({
                    id: member.id,
                    nameJP: member.nama_jp,
                    nameRomaji: toTitleCase(member.nama_romaji),
                    birthDate: moment(member.lahir, "YYYY.MM.DD").toDate(),
                    gen: member.gen,
                    photoURL: member.foto_profil,
                    status: member.status,
                    group: group,
                    groupClass: getGroupClass(group, member.status),
                }));
                processedMembers.push(...groupMembers);
            });
            allMembers = processedMembers;
            updateBirthdayBanner();
            renderCalendar(allMembers);
            setupFiltering();
            setInterval(updateAllCounters, 1000 * 60);  
        } catch (error) {
            console.error("Gagal memuat data member:", error);
            calendarContainer.innerHTML = "<p>Gagal memuat data member. Silakan coba lagi nanti.</p>";
        }
    }
    function updateBirthdayBanner() {
        const today = moment().startOf('day');
        let birthdayGirls = [];
        let upcomingBirthdays = [];
        allMembers.forEach(member => {
            const birthDate = moment(member.birthDate);
            const age = today.diff(birthDate, 'years');
            const nextBirthday = birthDate.clone().year(today.year());
            if (nextBirthday.isBefore(today)) {
                nextBirthday.add(1, 'year');
            }
            const daysUntil = nextBirthday.diff(today, 'days');
            if (daysUntil === 0) {
                birthdayGirls.push({ ...member, age: age });
            } else {
                upcomingBirthdays.push({ ...member, daysUntil, age: age + 1, photoURL: member.photoURL });
            }
        });
        hbdContainer.innerHTML = '';  
        if (birthdayGirls.length > 0) {
            birthdayGirls.forEach(girl => {
                const banner = document.createElement('div');
                banner.className = 'hbd is-today';
                banner.innerHTML = `
                    <div class="hbd-content">
                        <p class="line1">SELAMAT ULANG TAHUN!</p>
                        <p class="line2 jpn">${girl.nameRomaji}</p>
                        <p class="line3">yang ke-<span>${girl.age}</span> tahun!</p>
                    </div>
                    <div class="hbd-photo">
                        <img src="${girl.photoURL}" alt="${girl.nameRomaji}" loading="lazy">
                    </div>`;
                hbdContainer.appendChild(banner);
            });
        } else {
             if (upcomingBirthdays.length > 0) {
                upcomingBirthdays.sort((a, b) => a.daysUntil - b.daysUntil);
                const nextGirl = upcomingBirthdays[0];
                const banner = document.createElement('div');
                banner.className = 'hbd';
                banner.innerHTML = `
                     <div class="hbd-content">
                         <p class="line1">DALAM <span>${nextGirl.daysUntil}</span> HARI LAGI</p>
                         <p class="line2 jpn">${nextGirl.nameRomaji}</p>
                         <p class="line3">akan berulang tahun yang ke-<span>${nextGirl.age}</span>!</p>
                     </div>
                     <div class="hbd-photo">
                         <img src="${nextGirl.photoURL}" alt="${nextGirl.nameRomaji}" loading="lazy">
                     </div>`;
                 hbdContainer.appendChild(banner);
             }
        }
    }
    function renderCalendar(members) {
        calendarContainer.innerHTML = '';
        moment.locale('id');
        const months = moment.months();
        const today = moment();
        const groupedByMonth = members.reduce((acc, member) => {
            const monthIndex = member.birthDate.getMonth();
            if (!acc[monthIndex]) {
                acc[monthIndex] = [];
            }
            acc[monthIndex].push(member);
            return acc;
        }, {});
        Object.keys(groupedByMonth).sort((a, b) => a - b).forEach(monthIndex => {
            const monthName = months[monthIndex].toUpperCase();
            const monthHeader = document.createElement('div');
            monthHeader.className = 'namabulan';
            monthHeader.textContent = monthName;
            calendarContainer.appendChild(monthHeader);
            const listContainer = document.createElement('div');
            listContainer.className = 'calendarlist';
            const sortedMembers = groupedByMonth[monthIndex].sort((a, b) => {
                const dayA = a.birthDate.getDate();
                const dayB = b.birthDate.getDate();
                if (dayA !== dayB) return dayA - dayB;
                return a.birthDate.getFullYear() - b.birthDate.getFullYear();
            });
            sortedMembers.forEach(member => {
                const card = document.createElement('div');
                card.className = `member-card ${member.groupClass}`;
                if (today.month() === member.birthDate.getMonth() && today.date() === member.birthDate.getDate()) {
                    card.classList.add('is-birthday-card');
                }
                card.innerHTML = `
                    <div class="pictm">
                        <img src="${member.photoURL}" alt="${member.nameRomaji}" loading="lazy">
                        <div class="gen">${member.gen}</div>
                    </div>
                    <div class="mem-data">
                        <div class="jptx jpn">${member.nameJP}</div>
                        <div class="romaji">${member.nameRomaji}</div>
                        <div class="date">${formatDate(member.birthDate)}</div>
                        <div class="countupdate" data-birthdate="${member.birthDate.toISOString()}"></div>
                    </div>
                `;
                listContainer.appendChild(card);
            });
            calendarContainer.appendChild(listContainer);
        });
        updateAllCounters();
    }
    function updateAgeCounter(element) {
        const birthDate = moment(element.dataset.birthdate);
        const now = moment();
        let years = now.diff(birthDate, 'years');
        const lastBirthday = birthDate.clone().add(years, 'years');
        if (now.isBefore(lastBirthday)){
            years--; 
        }
        const correctLastBirthday = birthDate.clone().add(years, 'years');
        const daysSinceLastBirthday = now.diff(correctLastBirthday, 'days');
        const daysText = daysSinceLastBirthday === 0 ? '✨' : `${daysSinceLastBirthday} hari`;
        element.textContent = `Usia: ${years} tahun ${daysText}`;
    }
    function updateAllCounters() {
        document.querySelectorAll('.countupdate').forEach(updateAgeCounter);
    }
    function setupFiltering() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                let filteredMembers = allMembers;
                if (filter !== 'all') {
                    filteredMembers = allMembers.filter(m => m.groupClass === filter);
                }
                renderCalendar(filteredMembers);
                const monthHeaders = document.querySelectorAll('.namabulan');
                const defaultColor = 'var(--moe)';
                let groupColorVar = defaultColor;
                if (filter !== 'all') {
                    groupColorVar = getComputedStyle(document.documentElement).getPropertyValue(`--bg${filter}`).trim() || defaultColor;
                }
                monthHeaders.forEach(header => {
                    let nextSibling = header.nextElementSibling;
                    if (nextSibling && nextSibling.classList.contains('calendarlist') && nextSibling.hasChildNodes()) {
                        header.style.background = groupColorVar;  
                        header.style.display = 'block';
                    } else {
                        header.style.display = 'none';
                    }
                });
            });
        });
    }
    addBirthdayGlowStyles();  
    loadAllMembers();
});