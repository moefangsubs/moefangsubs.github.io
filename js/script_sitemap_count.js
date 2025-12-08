document.addEventListener('DOMContentLoaded', () => {
    async function initCounter() {
        const counterSpan = document.querySelector('span.counter');
        const titleCountSpan = document.getElementById('title-count');
        const lastUpdateDateSpan = document.getElementById('last-update-date');
        if (!counterSpan || !titleCountSpan || !lastUpdateDateSpan) {
            console.error('Elemen untuk counter, jumlah judul, atau tanggal update tidak ditemukan.');
            return;
        }
        try {
            const [garapanCount, mvCount, titleCount, latestDate] = await Promise.all([
                calculateGarapanCount(),
                calculateMvCount(),
                calculateTitleCount(),
                getLatestUpdateDate()
            ]);
            const totalTakarir = garapanCount + mvCount;
            counterSpan.setAttribute('data-count-to', totalTakarir);
            titleCountSpan.textContent = titleCount;
            lastUpdateDateSpan.textContent = latestDate;
            animateCounter(counterSpan);
        } catch (error) {
            console.error('Gagal menghitung data otomatis:', error);
            animateCounter(counterSpan);  
        }
    }
    async function calculateGarapanCount() {
        let totalEpisodes = 0;
        const listJsonPath = '../store/subs/list.json';
        const DATA_PATH_PREFIXES = { 
            "01_variety": "../store/subs/01_variety/",
            "02_nogidouga": "../store/subs/02_nogidouga/",
            "03_web": "../store/subs/03_web/",
            "04_singlebonus": "../store/subs/04_singlebonus/",
            "05_nogikoi": "../store/subs/05_nogikoi/",
            "06_drama": "../store/subs/06_drama/",
            "07_movie": "../store/subs/07_movie/",
            "08_stage": "../store/subs/08_stage/",
            "09_documentary": "../store/subs/09_documentary/",
            "10_sapporo": "../store/subs/10_sapporo/",
            "11_musicprogram": "../store/subs/11_musicprogram/",
            "12_random": "../store/subs/12_random/",
            "13_concert": "../store/subs/13_concert/",
            "14_premium": "../store/subs/14_premium/",
            "15_radio": "../store/subs/15_radio/",
            "16_nonsakamichi": "../store/subs/16_nonsakamichi/"
        };
        const response = await fetch(listJsonPath);
        const showList = await response.json();
        for (const categoryKey in showList) {
            const basePath = DATA_PATH_PREFIXES[categoryKey];
            if (!basePath) continue;
            const showPromises = showList[categoryKey].map(showId => fetch(`${basePath}${showId}.json`).then(res => res.ok ? res.json() : null));
            const showsData = await Promise.all(showPromises);
            showsData.forEach(data => {
                if (data && data.availableEpisode && Array.isArray(data.availableEpisode)) {
                    totalEpisodes += data.availableEpisode.length;
                }
            });
        }
        return totalEpisodes;
    }
    async function calculateMvCount() {
        const mvFilesConfig = [
            {
                path: '../store/single/songall.json',  
                parser: (data) => {
                    let count = 0;
                    if (!data) return 0;
                    for (const singleKey in data) {
                        const songs = data[singleKey];
                        if (Array.isArray(songs)) {
                            songs.forEach(song => {
                                if (song.LinkDownMV1) count++;
                                if (song.LinkDownMV2) count++;  
                            });
                        }
                    }
                    return count;
                }
            },
            {
                path: './store/single/songall_46keyaki.json',  
                parser: (data) => {
                    let count = 0;
                    if (!data || !data.keyakizaka) return 0;
                    for (const releaseKey in data.keyakizaka) {
                        const songs = data.keyakizaka[releaseKey];
                        if (Array.isArray(songs)) {
                            songs.forEach(song => {
                                if (song.HasMV === 'yes' && song.LinkDownMV1) {
                                    count++;
                                }
                            });
                        }
                    }
                    return count;
                }
            },
            {
                path: './store/single/songall_46sakura.json',  
                parser: (data) => {
                    let count = 0;
                    if (!data || !data.sakurazaka) return 0;
                    for (const releaseKey in data.sakurazaka) {
                        const songs = data.sakurazaka[releaseKey];
                        if (Array.isArray(songs)) {
                            songs.forEach(song => {
                                if (song.HasMV === 'yes' && song.LinkDownMV1) {
                                    count++;
                                }
                            });
                        }
                    }
                    return count;
                }
            },
            {
                path: './store/single/songall_46hinata.json',  
                parser: (data) => {
                    let count = 0;
                    if (!data || !data.hinatazaka) return 0;
                    const groupData = data.hinatazaka;
                    for (const releaseKey in groupData) {
                        const items = groupData[releaseKey];
                        if (Array.isArray(items)) {
                            items.forEach(item => {
                                if (item.HasMV === 'yes' && item.LinkDownMV1) {
                                    count++;
                                }
                            });
                        }
                    }
                    return count;
                }
            },
            {
                path: './store/single/songall_bokuao.json',  
                parser: (data) => {
                    let count = 0;
                    if (!data || !data.bokao) return 0;
                    const groupData = data.bokao;
                     for (const releaseKey in groupData) {
                        const items = groupData[releaseKey];
                        if (Array.isArray(items)) {
                            items.forEach(item => {
                                if (item.HasMV === 'yes' && item.LinkDownMV1) {
                                    count++;
                                }
                            });
                        }
                    }
                    return count;
                }
            }
        ];
        try {
			const dataPromises = mvFilesConfig.map(async (config) => {
				try {
					const res = await fetch(config.path);
					if (!res.ok) {
						console.error(`Gagal memuat: ${config.path}, Status: ${res.status}`);
						return null;  
					}
					const data = await res.json();
					return data;
				} catch (error) {
					console.error(`!!! ERROR PARSING JSON di file: ${config.path}`, error.message);
					return null;  
				}
			});
			const allData = await Promise.all(dataPromises);
			const totalMVs = allData.reduce((total, data, index) => {
				if (data === null) return total;  
				const parser = mvFilesConfig[index].parser;
				return total + parser(data);
			}, 0);
            return totalMVs;
        } catch (error) {
            console.error('Terjadi error besar saat menghitung MV:', error);
            return 0;  
        }
    }
    async function calculateTitleCount() {
        let totalTitles = 0;
        const listJsonPath = '../store/subs/list.json';
        const response = await fetch(listJsonPath);
        const showList = await response.json();
        for (const categoryKey in showList) {
            if (categoryKey !== "12_random") {
                totalTitles += showList[categoryKey].length;
            } else {
                for (const showId of showList[categoryKey]) {
                    const filePath = `../store/subs/12_random/${showId}.json`;
                    try {
                        const showResponse = await fetch(filePath);
                        if (!showResponse.ok) continue;
                        const data = await showResponse.json();
                        if (showId === "compilation") {
                            totalTitles += Object.keys(data.episodes || {}).length;
                        } else if (showId === "showroom" || showId === "random-subs") {
                            const uniqueShows = new Set();
                            if (data.episodes) {
                                for (const epsKey in data.episodes) {
                                    if (data.episodes[epsKey].nameShow) {
                                        uniqueShows.add(data.episodes[epsKey].nameShow);
                                    }
                                }
                            }
                            totalTitles += uniqueShows.size;
                        } else {
                            totalTitles++;
                        }
                    } catch (error) {
                        console.error(`Gagal memproses ${filePath}:`, error);
                    }
                }
            }
        }
        return totalTitles;
    }
    async function getLatestUpdateDate() {
        const updateJsonPath = '../store/subs/update.json';
        const response = await fetch(updateJsonPath);
        const updatesByDate = await response.json();
        if (!updatesByDate || updatesByDate.length === 0) {
            return "Data tidak tersedia";
        }
        const latestDateStr = updatesByDate.reduce((max, p) => p.date > max ? p.date : max, updatesByDate[0].date);
        const year = `20${latestDateStr.substring(0, 2)}`;
        const month = parseInt(latestDateStr.substring(2, 4), 10) - 1;
        const day = latestDateStr.substring(4, 6);
        const dateObj = new Date(year, month, day);
        return dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    function animateCounter(counter) {
        const countTo = parseFloat(counter.getAttribute('data-count-to'));
        const duration = parseFloat(counter.getAttribute('data-duration')) || 4000;
        let startTime = null;
        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentNum = Math.floor(progress * countTo);
            counter.textContent = currentNum.toLocaleString('id-ID');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    initCounter();
});