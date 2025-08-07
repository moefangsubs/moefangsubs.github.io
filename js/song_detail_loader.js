// Fungsi ini akan menangani fallback jika foto tidak ditemukan.
// Ditempatkan di scope global (window) agar bisa dipanggil dari atribut `onerror` di HTML.
window.handleImageError = function(imageElement, filename) {
	const failingSrc = imageElement.src;
	const match = failingSrc.match(/\/s(\d{3})\//);

	if (!match) {
		imageElement.onerror = null;
		imageElement.src = 'https://via.placeholder.com/80';
		return;
	}

	const currentNum = parseInt(match[1]);
	const nextNum = currentNum - 1;

	if (nextNum > 0) {
		const fallbackPrefix = 's' + String(nextNum).padStart(3, '0');
		const newUrl = `https://ik.imagekit.io/moearchive/web/memberprofile/${fallbackPrefix}/${filename}`;
		imageElement.src = newUrl;
	} else {
		imageElement.onerror = null;
		imageElement.src = 'https://via.placeholder.com/80';
	}
};


document.addEventListener('DOMContentLoaded', () => {
	const params = new URLSearchParams(window.location.search);
	const songNameJp = params.get('name');

	const detailWrapper = document.getElementById('song-detail-wrapper');
	const lyricsWrapper = document.getElementById('lyrics-wrapper');

	// =================================================================
	//  TAMPILAN DAFTAR LAGU JIKA TIDAK ADA PARAMETER NAMA
	// =================================================================
	if (!songNameJp) {
		document.title = "Daftar Lagu Nogizaka46";
		lyricsWrapper.style.display = 'none'; // Sembunyikan wrapper lirik di halaman daftar
		displaySongList();
		return;
	}

	// =================================================================
	//  TAMPILAN DETAIL LAGU JIKA ADA PARAMETER NAMA
	// =================================================================
	Promise.all([
		fetch('../store/single/songall.json').then(res => res.json()),
		fetch('../store/member/members.json').then(res => res.json()),
		fetch('../store/single/lyrics.json').then(res => res.json()),
		fetch('../store/single/spotifyembed.json').then(res => res.json())
	]).then(([songallData, membersData, lyricsData, spotifyData]) => {
		// Sembunyikan wrapper lirik asli dari HTML untuk mencegah duplikasi
		lyricsWrapper.style.display = 'none';

		let targetSong = null;
		let releaseKey = null;

		for (const rKey in songallData) {
			const song = songallData[rKey].find(s => s.titleJp.trim() === songNameJp.trim());
			if (song) {
				targetSong = song;
				releaseKey = rKey;
				break;
			}
		}

		if (!targetSong) {
			detailWrapper.innerHTML = `<h1>Lagu "${songNameJp}" tidak dapat ditemukan.</h1>`;
			return;
		}

		document.title = `${targetSong.titleRo} - Detail Lagu`;

		const songLyrics = lyricsData.find(lyric => lyric.title.trim() === targetSong.titleJp.trim());

		const memberNameMap = membersData.reduce((acc, member) => {
			acc[member.nama_jp.trim()] = {
				id: member.id,
				romaji: member.nama_romaji
			};
			return acc;
		}, {});

		const getRomajiName = (jpName) => {
			if (!jpName) return "";
			if (jpName === "小嶋陽菜 (AKB48)") return "Kojima Haruna (AKB48)";
			const member = memberNameMap[jpName.trim()];
			return member ? member.romaji.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : jpName;
		};

		const formatReleaseDate = (dateStr) => {
			if (!dateStr || !/^\d{4}\.\d{2}\.\d{2}$/.test(dateStr)) return null;
			const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
			const [year, month, day] = dateStr.split('.');
			return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
		};

		const getSingleImageUrl = () => {
			const baseV2Url = "https://ik.imagekit.io/moearchive/singlealbum/v2/";
			const specialCovers = {
				"僕たちのサヨナラ": "n46_cover_s32_bokutachi.jpg",
				"あの光": "n46_cover_s36_anohikari.jpg",
				"懐かしさの先": "n46_cover_s38_natsukashisa.jpg",
				"100日目": "n46_cover_s38_100nichime.jpg"
			};

			if (specialCovers[targetSong.titleJp.trim()]) {
				return `${baseV2Url}${specialCovers[targetSong.titleJp.trim()]}`;
			}

			if (releaseKey.startsWith('s')) {
				const num = releaseKey.replace(/\D/g, '');
				const typeAvv = targetSong.songTypeAvv || "";
				let typeChar = '';
				switch (typeAvv.toLowerCase()) {
					case 'all':
					case 'a':
						typeChar = 'a';
						break;
					case 'b':
						typeChar = 'b';
						break;
					case 'c':
						typeChar = 'c';
						break;
					case 'd':
						typeChar = 'd';
						break;
					case 'regular':
						typeChar = 'r';
						break;
					default:
						typeChar = 'a';
						break;
				}
				return `${baseV2Url}n46_cover_s${num}${typeChar}.jpg`;
			}
			if (releaseKey.startsWith('a') || releaseKey.startsWith('u') || releaseKey.startsWith('b')) {
				return `${baseV2Url}n46_cover_${releaseKey}.jpg`;
			}
			if (releaseKey === 'dig') {
				switch (targetSong.titleJp.trim()) {
					case "世界中の隣人よ":
						return `${baseV2Url}n46_cover_dig1.jpg`;
					case "Route 246":
						return `${baseV2Url}n46_cover_dig2.jpg`;
					case "大嫌いなはずだった。":
						return `${baseV2Url}n46_cover_dig_honeyworks.jpg`;
					case "1・2・3":
						return `${baseV2Url}n46_cover_dig_karaage.jpg`;
					default:
						return "https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_x.jpg";
				}
			}
			return "https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_x.jpg";
		};

		let outlineText = targetSong.songOutline || "";
		if (outlineText === "Unit" && targetSong.UnitName && targetSong.UnitName.trim() !== "") {
			outlineText += ` (${targetSong.UnitName.trim()})`;
		}

		const centers = targetSong.center ? (Array.isArray(targetSong.center) ? targetSong.center : [targetSong.center]) : [];
		const centerNames = centers.length > 0 && centers[0] !== "" ? centers.map(getRomajiName).join(', ') : null;
        
        // --- PEMBARUAN LOGIKA TOMBOL DOWNLOAD ---
		let downloadButtonsHtml = '';
		if (targetSong.LinkDownMV1 || targetSong.LinkDownMV2 || targetSong.LinkDownOff) {
			downloadButtonsHtml += '<div class="download-links-container">';
			
            // Logika untuk tombol MV 1
			if (targetSong.LinkDownMV1) {
                let buttonText1 = "MV Sub Indonesia";
                if (targetSong.LinkMV1Desc) {
                    buttonText1 += ` - ${targetSong.LinkMV1Desc}`;
                }
				downloadButtonsHtml += `<a href="${targetSong.LinkDownMV1}" class="download-link" target="_blank"><img src="../sprite/element/mv.svg" alt="MV Icon">${buttonText1}</a>`;
			}

            // Logika untuk tombol MV 2
            if (targetSong.LinkDownMV2) {
                let buttonText2 = "MV Sub Indonesia";
                if (targetSong.LinkMV2Desc) {
                    buttonText2 += ` - ${targetSong.LinkMV2Desc}`;
                }
				downloadButtonsHtml += `<a href="${targetSong.LinkDownMV2}" class="download-link" target="_blank"><img src="../svg/mv.svg" alt="MV Icon">${buttonText2}</a>`;
			}
            
            // Logika untuk tombol Off Vocal (tidak berubah)
			if (targetSong.LinkDownOff) {
				downloadButtonsHtml += `<a href="${targetSong.LinkDownOff}" class="download-link" target="_blank"><img src="../sprite/element/music.svg" alt="Music Icon">Off Vocal</a>`;
			}

			downloadButtonsHtml += '</div>';
		}
        // --- AKHIR PEMBARUAN LOGIKA ---

		let extraDetailsHtml = '<table class="song-info-extra-details">';
		const releaseDate = formatReleaseDate(targetSong.songRelease);
		if (releaseDate) extraDetailsHtml += `<tr><td>Tanggal Rilis</td><td>${releaseDate}</td></tr>`;
		const songTypeSide = targetSong.songTypeAvv;
		if (songTypeSide && songTypeSide.trim() !== '' && songTypeSide.trim() !== '-') {
			let typeDisplayText;
			switch (songTypeSide.toLowerCase().trim()) {
				case 'all':
					typeDisplayText = 'All Types';
					break;
				case 'regular':
					typeDisplayText = 'Regular Edition';
					break;
				case 'digital':
					typeDisplayText = 'Digital';
					break;
				case '7net ver':
					typeDisplayText = '7-net Version';
					break;
				default:
					typeDisplayText = `Type ${songTypeSide.toUpperCase()}`;
					break;
			}
			extraDetailsHtml += `<tr><td>Type</td><td>${typeDisplayText}</td></tr>`;
		}
		if (outlineText) extraDetailsHtml += `<tr><td>Kategori</td><td>${outlineText}</td></tr>`;
		if (centerNames) extraDetailsHtml += `<tr><td>Center</td><td>${centerNames}</td></tr>`;
		if (targetSong.SongLyricsJP) extraDetailsHtml += `<tr><td>Lirik</td><td>${targetSong.SongLyricsJP}</td></tr>`;
		const composer = Array.isArray(targetSong.SongCompJP) ? targetSong.SongCompJP.join(', ') : targetSong.SongCompJP;
		const arranger = Array.isArray(targetSong.SongArraJP) ? targetSong.SongArraJP.join(', ') : targetSong.SongArraJP;
		if (composer && arranger && JSON.stringify(targetSong.SongCompJP) === JSON.stringify(targetSong.SongArraJP)) {
			extraDetailsHtml += `<tr><td>Komposer & Aransemen</td><td>${composer}</td></tr>`;
		} else {
			if (composer) extraDetailsHtml += `<tr><td>Komposer</td><td>${composer}</td></tr>`;
			if (arranger) extraDetailsHtml += `<tr><td>Aransemen</td><td>${arranger}</td></tr>`;
		}
		const director = Array.isArray(targetSong.SongMVDirJP) ? targetSong.SongMVDirJP.join(' & ') : targetSong.SongMVDirJP;
		if (director) extraDetailsHtml += `<tr><td>Sutradara MV</td><td>${director}</td></tr>`;
		const choreo = Array.isArray(targetSong.SongChoreo) ? targetSong.SongChoreo.join(' & ') : targetSong.SongChoreo;
		if (choreo) extraDetailsHtml += `<tr><td>Koreografer</td><td>${choreo}</td></tr>`;
		if (targetSong.SongLiveChoreo) extraDetailsHtml += `<tr><td>Koreografer (Konser)</td><td>${targetSong.SongLiveChoreo}</td></tr>`;
		extraDetailsHtml += '</table>';

		const songInfoCard = `<div class="song-info-card"><img src="${getSingleImageUrl()}" alt="Cover ${targetSong.titleRo}" onerror="this.onerror=null; this.src='https://via.placeholder.com/200';"><div class="song-info-details"><h1>${targetSong.titleJp}</h1><div class="romaji-title">${targetSong.titleRo}</div>${extraDetailsHtml}${downloadButtonsHtml}</div></div>`;

		const getProfileImagePrefix = () => {
			if (!releaseKey) return "";
			if (releaseKey.startsWith('s')) {
				const num = releaseKey.replace(/\D/g, '');
				return `s${String(num).padStart(3, '0')}`;
			}
			switch (releaseKey) {
				case 'dig':
					switch (targetSong.titleJp.trim()) {
						case "Route 246":
							return "s025";
						case "世界中の隣人よ":
							return "s025";
						case "大嫌いなはずだった。":
							return "s016";
						case "1・2・3":
							return "s026";
						default:
							return "";
					}
				case 'a1':
					return 's010';
				case 'a2':
					return 's014';
				case 'a3':
					return 's017';
				case 'a4':
					return 's022';
				case 'u1':
					return 's019';
				case 'b1':
					return 's028';
				default:
					return "";
			}
		};

		const getMemberInitialImageData = (jpName) => {
			if (!jpName) return {
				url: "https://via.placeholder.com/80",
				onError: ""
			};
			if (jpName.trim() === "小嶋陽菜 (AKB48)") {
				return {
					url: "https://ik.imagekit.io/moearchive/web/memberprofile/other/kojima_haruna.png",
					onError: `onerror="this.onerror=null; this.src='https://via.placeholder.com/80';"`
				};
			}
			const member = memberNameMap[jpName.trim()];
			if (!member || !member.id) {
				console.warn(`Data untuk member "${jpName}" tidak ditemukan atau tidak memiliki ID.`);
				return {
					url: "https://via.placeholder.com/80",
					onError: ""
				};
			}
			const prefix = getProfileImagePrefix();
			const filename = member.id.replace(/-/g, "_") + '.png';
			if (prefix) {
				return {
					url: `https://ik.imagekit.io/moearchive/web/memberprofile/${prefix}/${filename}`,
					onError: `onerror="handleImageError(this, '${filename}')"`
				};
			}
			return {
				url: "https://via.placeholder.com/80",
				onError: ""
			};
		};

		let formationHtml = '';
		const memberRows = [];
		for (let i = 5; i >= 0; i--) {
			if (targetSong[`members${i}`]) {
				memberRows.push({
					key: `members${i}`,
					members: targetSong[`members${i}`]
				});
			}
		}
		if (memberRows.length > 0) {
			formationHtml = memberRows.map(row => {
				const members = Array.isArray(row.members) ? row.members : [row.members];
				const memberPhotos = members.map(jpName => {
					const imageData = getMemberInitialImageData(jpName);
					let displayName = jpName.trim() === '吉田綾乃クリスティー' ? '吉田綾乃' : jpName.trim();
					const isCenter = centers.includes(jpName.trim());
					const containerClass = isCenter ? 'member-photo-container center-highlight' : 'member-photo-container';
					const memberContent = `<div class="${containerClass}"><img src="${imageData.url}" alt="${displayName}" class="member-photo" ${imageData.onError}><div class="member-name">${displayName}</div></div>`;
					if (jpName.trim() === "小嶋陽菜 (AKB48)") return memberContent;
					const memberData = memberNameMap[jpName.trim()];
					const memberLink = memberData && memberData.id ? `member.html?id=${memberData.id}` : '#';
					return `<a href="${memberLink}" style="text-decoration: none;">${memberContent}</a>`;
				}).join('');
				return `<div class="formation-row">${memberPhotos}</div>`;
			}).join('');
		}
		const hasOnlyMembers0 = memberRows.length === 1 && memberRows[0].key === 'members0';
		const headingText = hasOnlyMembers0 ? 'MEMBER YANG BERPARTISIPASI' : 'FORMASI';
		const formationCard = `<div class="formation-card"><h2>${headingText}</h2>${formationHtml}${hasOnlyMembers0 ? '<div class="formation-note">Tidak berurut karena tidak ada data/berubah-ubah</div>' : ''}</div>`;

		const spotifyUrl = spotifyData[targetSong.titleJp.trim()];
		let spotifyCard = '';
		if (spotifyUrl) {
			const trackIdMatch = spotifyUrl.match(/track[/:]([a-zA-Z0-9]+)/);
			if (trackIdMatch && trackIdMatch[1]) {
				const trackId = trackIdMatch[1];
				// URL yang digenerate skrip:
				const spotifyEmbedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
				// Elemen iframe yang dibuat:
				spotifyCard = `<div class="spotify-card"><iframe src="${spotifyEmbedUrl}" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>`;
			}
		}

		let lyricsBoxHtml = '';
		if (songLyrics && songLyrics.lyrics) {
			const formattedLyrics = songLyrics.lyrics.replace(/<br\s*\/?>/gi, '\n');
			lyricsBoxHtml = `<div class="lyrics-box"><h2>Lirik</h2><div class="lyrics-content">${formattedLyrics}</div></div>`;
		}

		let mediaLyricsContainer = '';
		if (spotifyCard || lyricsBoxHtml) {
			mediaLyricsContainer = `<div class="media-lyrics-container">${spotifyCard}${lyricsBoxHtml}</div>`;
		}

		detailWrapper.innerHTML = songInfoCard + formationCard + mediaLyricsContainer;

	}).catch(error => {
		console.error("Gagal memuat data:", error);
		detailWrapper.innerHTML = `<h1>Terjadi kesalahan saat memuat data lagu.</h1><p>${error.toString()}</p>`;
	});

	function displaySongList() {
		detailWrapper.innerHTML = `<div class="songlist-header"><h1>Nogizaka46 Song List</h1><p>Jelajahi diskografi lengkap Nogizaka46. Halaman ini berisi daftar semua lagu dari setiap single, album, dan rilisan digital. Klik pada judul lagu untuk melihat detail lengkap, termasuk formasi member, lirik, dan informasi lainnya.</p></div><div id="song-list-content"><p>Memuat daftar lagu...</p></div>`;
		fetch('../store/single/songall.json')
			.then(res => res.json())
			.then(data => {
				const listContent = document.getElementById('song-list-content');

				const releaseOrder = Object.keys(data).sort((a, b) => {
					const typeOrder = {
						's': 1,
						'a': 2,
						'u': 3,
						'b': 4,
						'dig': 5
					};

					const typeA = a.substring(0, 1);
					const typeB = b.substring(0, 1);

					const numA = parseInt(a.replace(/\D/g, ''), 10);
					const numB = parseInt(b.replace(/\D/g, ''), 10);

					if (typeOrder[typeA] !== typeOrder[typeB]) {
						return typeOrder[typeA] - typeOrder[typeB];
					}

					return numA - numB;
				});

				const albumTitles = {
					'a1': 'Toumei na Iro',
					'a2': 'Sorezore no Isu',
					'a3': 'Umareta kara Hajimete Mita Yume',
					'a4': 'Ima ga Omoide ni naru Made',
					'u1': 'Boku dake no Kimi ~Under Super Best~',
					'b1': 'Time Flies'
				};
				let allGroupsHtml = '';
				releaseOrder.forEach(key => {
					const songs = data[key];
					if (!songs || songs.length === 0) return;
					const firstSong = songs[0];
					let coverUrl;
					const keyPrefix = key.substring(0, 1);
					const keyNum = key.replace(/\D/g, '');
					if (['s'].includes(keyPrefix)) {
						coverUrl = `https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_s${keyNum}a.jpg`;
					} else if (['a', 'u', 'b'].includes(keyPrefix)) {
						coverUrl = `https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_${key}.jpg`;
					} else {
						coverUrl = 'https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_x.jpg';
					}
					let mainSongHtml = '';
					if (albumTitles[key]) {
						mainSongHtml = `<div class="songlist-main-song" style="color: var(--moe-tint1); font-weight: bold; font-size: 1.3em;">${albumTitles[key]}</div>`;
					} else if (key !== 'dig' && firstSong) {
						mainSongHtml = `<div class="songlist-main-song"><a href="?name=${encodeURIComponent(firstSong.titleJp)}">${firstSong.titleRo}</a></div>`;
					}
					const tracksHtml = songs.map(song => `<a href="?name=${encodeURIComponent(song.titleJp)}">${song.titleRo}</a>`).join('');
					allGroupsHtml += `<div class="songlist-group"><img src="${coverUrl}" alt="Cover for ${firstSong.songNumber}" class="songlist-cover" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';"><div class="songlist-info"><div class="songlist-title-bar"><div class="songlist-number">${firstSong.songNumber}</div>${mainSongHtml}</div><div class="songlist-tracks">${tracksHtml}</div></div></div>`;
				});
				listContent.innerHTML = allGroupsHtml;
			}).catch(error => {
				console.error("Gagal memuat daftar lagu:", error);
				document.getElementById('song-list-content').innerHTML = `<p>Gagal memuat daftar lagu. Silakan coba lagi nanti.</p>`;
			});
	}
});