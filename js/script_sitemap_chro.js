document.addEventListener('DOMContentLoaded', () => {
    const rootContainer = document.getElementById('nogizaka-chronicle-container');
    if (!rootContainer) return;

    // ----------------------
    // CONFIG & CONSTANTS
    // ----------------------
    const BASE_URL = 'https://full.diskon.cloud/~moefa404/store/data/news_history';
    const YEARS = Array.from({ length: 2025 - 2012 + 1 }, (_, i) => 2012 + i);

    const MONTH_NAMES = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const CATEGORY_STYLES = {
        release: { name: 'CD / Release', color: '#f75aae' },
        live: { name: 'Live / Event', color: '#ed7272' },
        tv: { name: 'TV', color: '#ff9000' },
        radio: { name: 'Radio', color: '#cbba0a' },
        web: { name: 'Web', color: '#03b29c' },
        book: { name: 'Book', color: '#06b3d2' },
        movie: { name: 'Movie', color: '#0bdb3f' },
        photo_book: { name: 'Photobook', color: '#208000' },
        musical: { name: 'Stage / Musical', color: '#627ec4' },
        tieup: { name: 'Tie-up / CM', color: '#dbaa69' },
        other: { name: 'Other', color: '#858592' }
    };

    let cachedYearData = {};
    let isDataLoaded = false;
    let currentMode = 'preset';
    let currentOffsetDays = 0;
    let customDate = { day: 1, month: 1 };

    const today = new Date();
    customDate = { day: today.getDate(), month: today.getMonth() + 1 };

    // ----------------------
    // DOM SHELL INITIALIZATION
    // ----------------------
    rootContainer.innerHTML = `
        <div class="chro-card-wrapper">
            <h2 class="chro-title">Nogizaka Chronicle</h2>
            <p class="chro-disclaimer">
                Data ini dikurasi dari arsip resmi grup. Informasinya berfokus pada tanggal publikasi pengumuman. Karena dirangkum oleh AI, bisa saja terdapat kekeliruan dalam penamaan, dan lain sebagainya.
            </p>
            
            <div class="chro-nav-tabs" id="chro-nav-tabs">
                <button class="chro-tab-btn" data-offset="2">2 Hari Lalu</button>
                <button class="chro-tab-btn" data-offset="1">Kemarin</button>
                <button class="chro-tab-btn active" data-offset="0">Hari Ini</button>
                <button class="chro-tab-btn jump-btn" id="chro-jump-trigger">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span id="chro-jump-label">Jump Tanggal</span>
                </button>
            </div>

            <div class="chro-timeline" id="chro-timeline">
                <div class="chro-loading">Memuat kilas balik berita...</div>
            </div>
        </div>

        <div class="chro-modal-overlay" id="chro-modal-overlay">
            <div class="chro-modal">
                <h3>Pilih Tanggal & Bulan</h3>
                <div class="chro-modal-form">
                    <select id="chro-select-day"></select>
                    <select id="chro-select-month"></select>
                </div>
                <div class="chro-modal-btns">
                    <button class="chro-btn-cancel" id="chro-modal-cancel">Batal</button>
                    <button class="chro-btn-ok" id="chro-modal-ok">OK</button>
                </div>
            </div>
        </div>
    `;

    const timelineEl = document.getElementById('chro-timeline');
    const tabsContainer = document.getElementById('chro-nav-tabs');
    const jumpTrigger = document.getElementById('chro-jump-trigger');
    const jumpLabel = document.getElementById('chro-jump-label');
    const modalOverlay = document.getElementById('chro-modal-overlay');
    const modalCancel = document.getElementById('chro-modal-cancel');
    const modalOk = document.getElementById('chro-modal-ok');
    const selectDay = document.getElementById('chro-select-day');
    const selectMonth = document.getElementById('chro-select-month');

    // ----------------------
    // FUNGSI DINAMIS JUMLAH HARI PER BULAN
    // ----------------------
    const getDaysInMonth = (month) => {
        // Februari diberi 29 hari agar arsip tahun kabisat tetap bisa dicari
        if (month === 2) return 29;
        if ([4, 6, 9, 11].includes(month)) return 30;
        return 31;
    };

    const updateDayOptions = (month, preferredDay = null) => {
        const maxDays = getDaysInMonth(month);
        const currentSelectedDay = preferredDay !== null ? preferredDay : parseInt(selectDay.value, 10);
        
        selectDay.innerHTML = '';
        for (let d = 1; d <= maxDays; d++) {
            const opt = document.createElement('option');
            opt.value = d;
            opt.textContent = `Tanggal ${d}`;
            selectDay.appendChild(opt);
        }

        // Pertahankan tanggal yang dipilih sebelumnya jika masih valid, jika tidak set ke hari maksimal
        if (currentSelectedDay && currentSelectedDay <= maxDays) {
            selectDay.value = currentSelectedDay;
        } else {
            selectDay.value = maxDays;
        }
    };

    // ----------------------
    // INISIALISASI OPSI BULAN & TANGGAL
    // ----------------------
    MONTH_NAMES.forEach((mName, idx) => {
        const opt = document.createElement('option');
        opt.value = idx + 1;
        opt.textContent = mName;
        selectMonth.appendChild(opt);
    });

    selectMonth.value = customDate.month;
    updateDayOptions(customDate.month, customDate.day);

    selectMonth.addEventListener('change', () => {
        const selectedMonth = parseInt(selectMonth.value, 10);
        updateDayOptions(selectedMonth);
    });

    // ----------------------
    // DATE HELPERS
    // ----------------------
    const getCurrentTargetMMDD = () => {
        if (currentMode === 'custom') {
            const mm = String(customDate.month).padStart(2, '0');
            const dd = String(customDate.day).padStart(2, '0');
            return `${mm}${dd}`;
        } else {
            const d = new Date();
            d.setDate(d.getDate() - currentOffsetDays);
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${mm}${dd}`;
        }
    };

    // ----------------------
    // FETCH ALL JSON KE MEMORI BROWSER
    // ----------------------
    const loadAllNewsData = async () => {
        if (isDataLoaded) return;
        
        const fetchPromises = YEARS.map(async (yr) => {
            try {
                const res = await fetch(`${BASE_URL}/${yr}.json`);
                if (!res.ok) return [];
                const data = await res.json();
                cachedYearData[yr] = data;
                return data;
            } catch (err) {
                return [];
            }
        });

        await Promise.all(fetchPromises);
        isDataLoaded = true;
    };

    // ----------------------
    // RENDER TIMELINE
    // ----------------------
    const renderTimeline = () => {
        const targetMMDD = getCurrentTargetMMDD();
        let matchedEvents = [];

        YEARS.forEach(yr => {
            const list = cachedYearData[yr] || [];
            list.forEach(item => {
                if (item.date_mmdd === targetMMDD) {
                    matchedEvents.push(item);
                }
            });
        });

        matchedEvents.sort((a, b) => b.year - a.year);

        if (matchedEvents.length === 0) {
            timelineEl.innerHTML = '<div class="chro-empty">Tidak ada catatan berita atau pengumuman pada tanggal ini.</div>';
            return;
        }

        const groupedByYear = {};
        matchedEvents.forEach(ev => {
            if (!groupedByYear[ev.year]) groupedByYear[ev.year] = [];
            groupedByYear[ev.year].push(ev);
        });

        let html = '';
        Object.keys(groupedByYear).sort((a, b) => b - a).forEach(year => {
            const items = groupedByYear[year];
            html += `<div class="chro-year-group">`;
            html += `
                <div class="chro-year-label">
                    <span>${year}</span>
                    <span class="chro-year-count">${items.length} berita</span>
                </div>
            `;
            
            items.forEach(item => {
                const cat = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.other;
                const safeHeadline = item.headline || 'Tanpa Judul';
                const safeSummary = item.summary || 'Tidak ada deskripsi tambahan.';

				html += `
					<div class="chro-item-card">
						<div class="chro-header-row">
							<div class="chro-left-content">
								<span class="chro-badge" style="background-color: ${cat.color};">${cat.name}</span>
								<span class="chro-headline">${safeHeadline}</span>
							</div>
							<button class="chro-toggle-btn" aria-label="Toggle Summary">
								<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="6 9 12 15 18 9"></polyline>
								</svg>
							</button>
						</div>
						<div class="chro-summary-wrapper">
							<div class="chro-summary-inner">
								<div class="chro-summary">${safeSummary}</div>
							</div>
						</div>
					</div>
				`;
            });

            html += `</div>`;
        });

        timelineEl.innerHTML = html;
    };

    // ----------------------
    // EVENTS
    // ----------------------
	timelineEl.addEventListener('click', (e) => {
		const headerRow = e.target.closest('.chro-header-row');
		if (!headerRow) return;

		const currentCard = headerRow.closest('.chro-item-card');
		const currentWrapper = currentCard.querySelector('.chro-summary-wrapper');
		const currentToggleBtn = currentCard.querySelector('.chro-toggle-btn');
		const willOpen = !currentWrapper.classList.contains('visible');

		timelineEl.querySelectorAll('.chro-summary-wrapper.visible').forEach(openWrapper => {
			openWrapper.classList.remove('visible');
		});
		timelineEl.querySelectorAll('.chro-toggle-btn.open').forEach(openBtn => {
			openBtn.classList.remove('open');
		});

		if (willOpen) {
			currentWrapper.classList.add('visible');
			currentToggleBtn.classList.add('open');
		}
	});

    tabsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.chro-tab-btn');
        if (!btn || btn.id === 'chro-jump-trigger') return;

        tabsContainer.querySelectorAll('.chro-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentMode = 'preset';
        currentOffsetDays = parseInt(btn.dataset.offset, 10);
        jumpLabel.textContent = 'Jump Tanggal';
        renderTimeline();
    });

    // Modal Events
    jumpTrigger.addEventListener('click', () => {
        modalOverlay.classList.add('active');
    });

    modalCancel.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    modalOk.addEventListener('click', () => {
        const d = parseInt(selectDay.value, 10);
        const m = parseInt(selectMonth.value, 10);

        customDate = { day: d, month: m };
        currentMode = 'custom';

        tabsContainer.querySelectorAll('.chro-tab-btn').forEach(b => b.classList.remove('active'));
        jumpTrigger.classList.add('active');

        const monthStr = MONTH_NAMES[m - 1];
        jumpLabel.textContent = `Peristiwa di tanggal ${d} ${monthStr}`;

        modalOverlay.classList.remove('active');
        renderTimeline();
    });

    // ----------------------
    // INIT
    // ----------------------
    loadAllNewsData().then(() => {
        renderTimeline();
    });
});