// File: js/script_photobook_archive.js (Final dengan Peringkat Lengkap)

document.addEventListener('DOMContentLoaded', () => {

	const mainContainer = document.getElementById('main-archive');
	const listContainer = document.getElementById('photobook-list-container');

	// =====================================================================
	// FUNGSI UNTUK MEMBUAT KONTEN HTML
	// =====================================================================
	function generateRankHTML(data, title, applyMedals = true) {
		if (data.length === 0) return '';
		const rankCardsHTML = data.map((item, index) => {
			let medalClass = '';
			if (applyMedals && index < 3) {
				medalClass = `rank-${index + 1}`;
			}
			return `
                <div class="rank-card ${medalClass}">
                    <div class="rank-number">#${index + 1}</div>
                    <img src="${item.image}" alt="${item.title.id}">
                    <div class="rank-name"><span id="idn">${item.name.id}</span><span id="jpn" class="hidden">${item.name.jp}</span></div>
                    <div class="rank-sales" id="idn">${item.salesfirst.toLocaleString('id-ID')}</div>
                    <div class="rank-sales hidden" id="jpn">${(item.salesfirst / 10000).toFixed(1).replace('.0','')}万冊</div>
                </div>
            `;
		}).join('');
		return `<h2 class="rank-title" style="color: var(--moe-tint4); margin-top: 2.5em;">${title}</h2><div class="sales-rank-container">${rankCardsHTML}</div>`;
	}

	// [FUNGSI BARU] Membuat daftar peringkat lengkap di dalam spoiler
	function createFullRankList(data) {
		// Urutkan data sekali lagi untuk memastikan (dari tertinggi ke terendah)
		const sortedData = [...data].sort((a, b) => b.salesfirst - a.salesfirst);

		const tableRowsHTML = sortedData.map((item, index) => {
			const rankClass = index < 3 ? `rank-${index + 1}` : '';
			return `
                <tr class="full-rank-row ${rankClass}">
                    <td>#${index + 1}</td>
                    <td>
                        <span id="idn">${item.title.id} (${item.name.id})</span>
                        <span id="jpn" class="hidden">${item.title.jp} (${item.name.jp})</span>
                    </td>
                    <td>
                        <span id="idn">${item.salesfirst.toLocaleString('id-ID')}</span>
                        <span id="jpn" class="hidden">${(item.salesfirst / 10000).toFixed(1).replace('.0','')}万冊</span>
                    </td>
                </tr>
            `;
		}).join('');

		const section = document.createElement('div');
		section.className = 'full-rank-section';
		section.innerHTML = `
            <p>Untuk lengkapnya, berikut adalah urutan penjualan minggu pertama dari tertinggi ke terendah.</p>
            <details class="full-rank-spoiler">
                <summary></summary>
                <div class="full-rank-table-container">
                    <table class="full-rank-table">
                        <thead>
                            <tr>
                                <th>Peringkat</th>
                                <th>Judul (Member)</th>
                                <th style="text-align: right;">Penjualan</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRowsHTML}
                        </tbody>
                    </table>
                </div>
            </details>
        `;
		return section;
	}

	// =====================================================================
	// FUNGSI UTAMA & PEMANGGILAN
	// =====================================================================
	function initializeArchive() {
		if (!listContainer) return;

		fetch('../store/member/members_pb.json')
			.then(response => response.json())
			.then(photobookData => {
				// --- Persiapan Data ---
				const activeReleases = photobookData.filter(pb => !(pb.note && pb.note.id.includes("Dirilis setelah kelulusannya")));
				const totalBooks = activeReleases.length;
				const overallSalesData = activeReleases.filter(pb => pb.salesfirst > 0);
				const membersOnlySalesData = overallSalesData.filter(pb =>
					!pb.name.id.toLowerCase().includes('all member') && !pb.name.jp.includes('全員') && !pb.name.jp.includes('期生')
				);

				// --- Render Semua Bagian Ranking ---
				const rankSection = document.createElement('div');
				rankSection.className = 'sales-rank-section';

				const topOverall = [...overallSalesData].sort((a, b) => b.salesfirst - a.salesfirst).slice(0, 5);
				const topMembers = [...membersOnlySalesData].sort((a, b) => b.salesfirst - a.salesfirst).slice(0, 5);
				let topRankHTML = areRankingsIdentical(topOverall, topMembers) ?
					generateRankHTML(topOverall, 'TOP 5 PENJUALAN', true) :
					generateRankHTML(topOverall, 'TOP 5 PENJUALAN KESELURUHAN', true) + generateRankHTML(topMembers, 'TOP 5 PENJUALAN KHUSUS MEMBER', true);

				const bottomOverall = [...overallSalesData].sort((a, b) => a.salesfirst - b.salesfirst).slice(0, 5);
				const bottomMembers = [...membersOnlySalesData].sort((a, b) => a.salesfirst - b.salesfirst).slice(0, 5);
				let bottomRankHTML = areRankingsIdentical(bottomOverall, bottomMembers) ?
					generateRankHTML(bottomOverall, '5 PENJUALAN TERENDAH', false) :
					generateRankHTML(bottomOverall, '5 PENJUALAN TERENDAH KESELURUHAN', false) + generateRankHTML(bottomMembers, '5 PENJUALAN TERENDAH KHUSUS MEMBER', false);

				rankSection.innerHTML = `
                    <p class="sales-rank-intro">Nogizaka46 hingga saat ini telah merilis sebanyak <strong>${totalBooks}</strong> photobook (solo & grup), tidak termasuk yang dirilis setelah member lulus. Berikut adalah 5 besar photobook dengan penjualan minggu pertama tertinggi:</p>
                    ${topRankHTML}
                    <p class="sales-rank-intro" style="margin-top: 4em;">Namun di sisi lain, untuk tujuan data dan arsip, kita juga bisa melihat photobook mana yang penjualannya berada di urutan bawah.</p>
                    ${bottomRankHTML}
                `;
				listContainer.insertAdjacentElement('beforebegin', rankSection);

				// --- Render Daftar Peringkat Lengkap ---
				const fullRankListElement = createFullRankList(overallSalesData);
				listContainer.insertAdjacentElement('beforebegin', fullRankListElement);

				// --- Render Garis Pemisah ---
				const separator = document.createElement('h2');
				separator.className = 'photobook-separator';
				separator.textContent = '— SEMUA DATA PHOTOBOOK —';
				listContainer.insertAdjacentElement('beforebegin', separator);

				// --- Render Daftar Photobook Utama ---
				const allItemsHTML = photobookData.map(item => createPhotobookListItemHTML(item)).join('');
				listContainer.innerHTML = allItemsHTML;

				// --- Setup Terakhir ---
				setupLanguageToggle();
				updateVisibility();
			})
			.catch(error => {
				listContainer.innerHTML = '<p>Gagal memuat data photobook.</p>';
				console.error("Gagal memuat data photobook:", error);
			});
	}

	initializeArchive();

	// =====================================================================
	// KUMPULAN FUNGSI HELPER (Tidak ada perubahan)
	// =====================================================================
	function areRankingsIdentical(arr1, arr2) {
		if (arr1.length !== arr2.length) return false;
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i].title.id !== arr2[i].title.id) return false;
		}
		return true;
	}

	function setupLanguageToggle() {
		if (document.getElementById('language-toggle')) return;
		const switchContainer = document.createElement('div');
		switchContainer.className = 'photobook-lang-switch';
		switchContainer.innerHTML = `<input id="language-toggle" class="check-toggle" type="checkbox" checked><label for="language-toggle"></label><span class="on">ID</span><span class="off">JP</span>`;
		document.body.appendChild(switchContainer);
		document.getElementById("language-toggle").addEventListener("change", updateVisibility);
	}

	function createPhotobookListItemHTML(item) {
		const dates = formatDate(item.releaseDate);
		const sales = formatSalesFirst(item.salesfirst);
		const has = (prop) => prop && (prop.id || prop.jp);
		let detailButtonHTML = '';
		const isGroupPhotobook = item.name.id.toLowerCase().includes('all member') || item.name.jp.includes('全員') || item.name.jp.includes('期生');
		if (!isGroupPhotobook) {
			const memberId = generateId(item.name.id);
			detailButtonHTML = `<a href="member.html?id=${memberId}" class="member-detail-link" target="_blank" title="Lihat Detail Member"><i class="fa-solid fa-arrow-right"></i></a>`;
		}
		return `
            <div class="photobook">
                <div class="imgprev">
                    <figure>
                        <img src="${item.image}" alt="${item.title.id}">
                        ${item.count ? `<div class="count">${item.count}</div>` : ''}
                        <figcaption><span id="idn">Sampul Reguler</span><span id="jpn" class="hidden">通常版表紙</span></figcaption>
                    </figure>
                </div>
                <div class="content">
                    <div class="pb-title">
                        <span class="title"><span id="idn">${item.title.id}</span><span id="jpn" class="hidden">${item.title.jp}</span></span>
                        <span class="member">
                            <span id="idn">${item.name.id}</span>
                            <span id="jpn" class="hidden">${item.name.jp}</span>
                            ${detailButtonHTML}
                        </span>
                    </div>
                    <div class="pb-desc">
                        ${has(item.photographer) ? `<div><span><span id="idn">Fotografer</span><span id="jpn" class="hidden">撮影</span></span><span>:</span><span><span id="idn">${item.photographer.id}</span><span id="jpn" class="hidden">${item.photographer.jp}</span></span></div>` : ''}
                        <div><span><span id="idn">Penerbit</span><span id="jpn" class="hidden">出版社</span></span><span>:</span><span><span id="idn">${item.publisher.id}</span><span id="jpn" class="hidden">${item.publisher.jp}</span></span></div>
                        <div><span><span id="idn">Tanggal Rilis</span><span id="jpn" class="hidden">発売日</span></span><span>:</span><span><span id="idn">${dates.id}</span><span id="jpn" class="hidden">${dates.jp}</span></span></div>
                        ${has(item.memberAge) ? `<div><span><span id="idn">Usia Rilis</span><span id="jpn" class="hidden">発売時年齢</span></span><span>:</span><span><span id="idn">${item.memberAge.id}</span><span id="jpn" class="hidden">${item.memberAge.jp}</span></span></div>` : ''}
                        ${has(item.type) ? `<div><span><span id="idn">Tipe</span><span id="jpn" class="hidden">形態</span></span><span>:</span><span><span id="idn">${item.type.id}</span><span id="jpn" class="hidden">${item.type.jp}</span></span></div>` : ''}
                        ${item.salesfirst ? `<div><span><span id="idn">Penjualan Pekan Pertama</span><span id="jpn" class="hidden">初週売上</span></span><span>:</span><span><span id="idn">${sales.id}</span><span id="jpn" class="hidden">${sales.jp}</span></span></div>` : ''}
                    </div>
                    ${has(item.comment) ? `<div class="obicomment"><span><span id="idn">"${item.comment.id}"</span><span id="jpn" class="hidden">「${item.comment.jp}」</span></span><span><span id="idn">${item.commentName.id}</span><span id="jpn" class="hidden">${item.commentName.jp}</span></span></div>` : ''}
                    <div class="otherversion">
                        ${item.imageCutOther ? `<figure><img src="${item.imageCutOther}" alt="Sampul Lainnya"><figcaption><span id="idn">Sampul Lainnya</span><span id="jpn" class="hidden">アザーカット</span></figcaption></figure>` : ''}
                        ${item.imageLimited ? `<figure><img src="${item.imageLimited}" alt="Sampul Terbatas"><figcaption><span id="idn">Sampul Terbatas</span><span id="jpn" class="hidden">限定版</span></figcaption></figure>` : ''}
                        ${item.imageSevenNet ? `<figure><img src="${item.imageSevenNet}" alt="Sampul 7net"><figcaption><span id="idn">Sampul 7net</span><span id="jpn" class="hidden">セブンネット限定</span></figcaption></figure>` : ''}
                        ${item.imageRakuten ? `<figure><img src="${item.imageRakuten}" alt="Sampul Rakuten"><figcaption><span id="idn">Sampul Rakuten</span><span id="jpn" class="hidden">楽天限定</span></figcaption></figure>` : ''}
                        ${item.imageTsutaya ? `<figure><img src="${item.imageTsutaya}" alt="Sampul TSUTAYA"><figcaption><span id="idn">Sampul TSUTAYA</span><span id="jpn" class="hidden">TSUTAYA限定</span></figcaption></figure>` : ''}
                        ${item.imageHMV ? `<figure><img src="${item.imageHMV}" alt="Sampul HMV"><figcaption><span id="idn">Sampul HMV</span><span id="jpn" class="hidden">HMV限定</span></figcaption></figure>` : ''}
                        ${item.imageKinokuniya ? `<figure><img src="${item.imageKinokuniya}" alt="Sampul Kinokuniya"><figcaption><span id="idn">Sampul Kinokuniya</span><span id="jpn" class="hidden">紀伊國屋書店限定</span></figcaption></figure>` : ''}
                    </div>
                    ${item.download ? `<div class="download"><a href="${item.download}" target="_blank">Download Scan</a></div>` : ''}
                </div>
            </div>
        `;
	}

	function updateVisibility() {
		const isIdnChecked = document.getElementById("language-toggle")?.checked ?? true;
		document.querySelectorAll('#idn').forEach(el => el.classList.toggle('hidden', !isIdnChecked));
		document.querySelectorAll('#jpn').forEach(el => el.classList.toggle('hidden', isIdnChecked));
	}

	function generateId(name) {
		return name.toLowerCase().replace(/\s+/g, '-');
	}

	function formatDate(date) {
		if (!date) return {
			jp: '-',
			id: '-'
		};
		const dateObj = new Date(date);
		const jpFormat = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
		const idFormat = dateObj.toLocaleDateString("id-ID", {
			year: "numeric",
			month: "long",
			day: "numeric"
		});
		return {
			jp: jpFormat,
			id: idFormat
		};
	}

	function formatSalesFirst(sales) {
		if (!sales) return {
			jp: '-',
			id: '-'
		};
		const idFormat = `${sales.toLocaleString('id-ID')} eksemplar`;
		const man = Math.floor(sales / 10000);
		const remainder = sales % 10000;
		const jpFormat = remainder > 0 ? `${man}万${remainder.toLocaleString('ja-JP')}冊` : `${man}万冊`;
		return {
			jp: jpFormat,
			id: idFormat
		};
	}
});