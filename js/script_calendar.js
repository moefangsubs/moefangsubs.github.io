document.addEventListener('DOMContentLoaded', () => {
    // --- Global State ---
    let allMembers = [];
    const calendarContainer = document.getElementById('calendar-container');
    const hbdContainer = document.getElementById('hbd-container');
    const filterButtons = document.querySelectorAll('.dropdown-btn');

    // --- Utility Functions ---
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
            // Special case for Keyakizaka as it has no active group
            if (group === 'keya') return 'gradk';
            return `grad${group.charAt(0)}`;
        }
        return group;
    };

    // --- Style Injection for Birthday Glow ---
    const addBirthdayGlowStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                /* Define solid colors for glow effect */
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

            /* Assign the correct glow color variable to each group */
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


    // --- Data Fetching and Processing ---
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
            setInterval(updateAllCounters, 1000 * 60); // Update counter usia setiap menit
        } catch (error) {
            console.error("Gagal memuat data member:", error);
            calendarContainer.innerHTML = "<p>Gagal memuat data member. Silakan coba lagi nanti.</p>";
        }
    }

    // --- Birthday Announcement Logic ---
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
                // FIX 1: Correctly use the calculated age.
                // The 'age' variable already represents the new age on the birthday.
                birthdayGirls.push({ ...member, age: age });
            } else {
                // For upcoming birthdays, it's correct to show 'age + 1'
                upcomingBirthdays.push({ ...member, daysUntil, age: age + 1, photoURL: member.photoURL });
            }
        });
        
        hbdContainer.innerHTML = ''; // Hapus banner sebelumnya
        
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

    // --- Calendar Rendering ---
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
            // Header Bulan
            const monthName = months[monthIndex].toUpperCase();
            const monthHeader = document.createElement('div');
            monthHeader.className = 'namabulan';
            monthHeader.textContent = monthName;
            calendarContainer.appendChild(monthHeader);

            // List Member
            const listContainer = document.createElement('div');
            listContainer.className = 'calendarlist';
            
            // Urutkan member dalam bulan
            const sortedMembers = groupedByMonth[monthIndex].sort((a, b) => {
                const dayA = a.birthDate.getDate();
                const dayB = b.birthDate.getDate();
                if (dayA !== dayB) return dayA - dayB;
                return a.birthDate.getFullYear() - b.birthDate.getFullYear();
            });

            sortedMembers.forEach(member => {
                const card = document.createElement('div');
                card.className = `member-card ${member.groupClass}`;
                
                // FIX 3: Add 'is-birthday-card' class if it's the member's birthday
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
    
    // --- Age Counter Logic ---
    function updateAgeCounter(element) {
        const birthDate = moment(element.dataset.birthdate);
        const now = moment();
        let years = now.diff(birthDate, 'years');
        const lastBirthday = birthDate.clone().add(years, 'years');
        
        if (now.isBefore(lastBirthday)){
            years--; 
        }
        
        // Recalculate last birthday with correct year count
        const correctLastBirthday = birthDate.clone().add(years, 'years');
        const daysSinceLastBirthday = now.diff(correctLastBirthday, 'days');

        // FIX 2: Show emoji on birthday instead of "0 hari"
        const daysText = daysSinceLastBirthday === 0 ? '✨' : `${daysSinceLastBirthday} hari`;
        element.textContent = `Usia: ${years} tahun ${daysText}`;
    }

    function updateAllCounters() {
        document.querySelectorAll('.countupdate').forEach(updateAgeCounter);
    }

    // --- Filtering Logic ---
    function setupFiltering() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Style tombol aktif
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter data
                let filteredMembers = allMembers;
                if (filter !== 'all') {
                    filteredMembers = allMembers.filter(m => m.groupClass === filter);
                }
                
                // Render ulang
                renderCalendar(filteredMembers);
                
                // Sesuaikan warna header bulan
                const monthHeaders = document.querySelectorAll('.namabulan');
                const defaultColor = 'var(--moe)';
                let groupColorVar = defaultColor;

                if (filter !== 'all') {
                    // We get the background property, which is a gradient. We need to parse it or use a solid color.
                    // For simplicity, we reference the root variable for the gradient.
                    // The glow color logic handles the actual solid color needed.
                    groupColorVar = getComputedStyle(document.documentElement).getPropertyValue(`--bg${filter}`).trim() || defaultColor;
                }
                
                monthHeaders.forEach(header => {
                    // Cek jika ada member di bulan ini setelah filter
                    let nextSibling = header.nextElementSibling;
                    if (nextSibling && nextSibling.classList.contains('calendarlist') && nextSibling.hasChildNodes()) {
                        header.style.background = groupColorVar; // Set the gradient background
                        header.style.display = 'block';
                    } else {
                        header.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Initial Load ---
    addBirthdayGlowStyles(); // Inject the necessary CSS for the glow effect
    loadAllMembers();
});