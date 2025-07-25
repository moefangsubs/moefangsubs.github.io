// ../js/script_cdcover_logic.js

/**
 * Mendapatkan URL gambar cover CD berdasarkan grup, ID single, dan data lagu.
 * @param {string} groupKey - Kunci grup (cth: 'nogizaka46', 'sakurazaka', 'bokuao').
 * @param {string} singleId - ID single atau album (cth: 's01', 'a01', 'dig').
 * @param {object} song - Objek lagu yang berisi detail lagu.
 * @returns {string} URL gambar cover.
 */
function getCoverArtUrl(groupKey, singleId, song) {
    const keyaBaseUrl = 'https://ik.imagekit.io/moearchive/singlealbum/keya/';
    const sakuBaseUrl = 'https://ik.imagekit.io/moearchive/singlealbum/saku/';
    const hinataBaseUrl = 'https://ik.imagekit.io/moearchive/singlealbum/hinata/';
    const nogiBaseUrl = 'https://ik.imagekit.io/moearchive/singlealbum/v2/';
    const bokuaoBaseUrl = 'https://ik.imagekit.io/moearchive/singlealbum/bokuao/';

    const getTypeChar = (songTypeAvv) => {
        // Mengambil elemen pertama jika berupa array, atau menggunakan string langsung
        const type = Array.isArray(songTypeAvv) ? songTypeAvv[0] : songTypeAvv;
        switch (type) {
            case 'All':
            case 'A': // Logic for Nogizaka46
            case 'Type A':
            case 'Type-A':
                return 'a';
            case 'B': // Logic for Nogizaka46
            case 'Type B':
            case 'Type-B':
                return 'b';
            case 'C': // Logic for Nogizaka46
            case 'Type C':
            case 'Type-C':
                return 'c';
            case 'D': // Logic for Nogizaka46
            case 'Type D':
            case 'Type-D':
                return 'd';
            case 'Regular':
                return 'r';
            case 'BOKUAO':
                return 'bokuao';
            case 'BokuAo Event':
                return 'event';
            case 'BokuAo Live':
                 return 'live';
            default:
                return 'a'; // Default ke cover Type-A
        }
    };

    switch (groupKey) {
        case 'nogizaka46': {
            const category = singleId.substring(0, 1);
            if (category === 's') { // Singles (s01, s02, etc.)
                if (singleId === 's36' && song.titleRo === "Ano Hikari") return `${nogiBaseUrl}n46_cover_s36_anohikari.jpg`;
                if (singleId === 's38' && song.titleRo === "100nichime") return `${nogiBaseUrl}n46_cover_s38_100nichime.jpg`;
                if (singleId === 's38' && song.titleRo === "Natsukashisa no Saki") return `${nogiBaseUrl}n46_cover_s38_natsukashisa.jpg`;
                const typeChar = getTypeChar(song.songTypeAvv);
                return `${nogiBaseUrl}n46_cover_${singleId}${typeChar}.jpg`;
            }
            if (category === 'a') return `${nogiBaseUrl}n46_cover_${singleId}.jpg`;
            if (category === 'b') return `${nogiBaseUrl}n46_cover_${singleId}.jpg`;
            if (category === 'u') return `${nogiBaseUrl}n46_cover_${singleId}.jpg`;
            if (singleId === 'dig') {
                switch (song.titleRo) {
                    case "Daikirai na Hazu datta": return `${nogiBaseUrl}n46_cover_dig_honeyworks.jpg`;
                    case "Sekaijuu no Rinjin yo": return `${nogiBaseUrl}n46_cover_dig1.jpg`;
                    case "Route 246": return `${nogiBaseUrl}n46_cover_dig2.jpg`;
                    case "1・2・3": return `${nogiBaseUrl}n46_cover_dig_karaage.jpg`;
                    default: return `${nogiBaseUrl}n46_cover_dig1.jpg`;
                }
            }
            return '';
        }

        case 'keyakizaka': {
            if (singleId === 'dig') return `${keyaBaseUrl}k46_cover_dig.jpg`;
            const typeChar = getTypeChar(song.SongTypeAvv);
            return `${keyaBaseUrl}k46_cover_${singleId}${typeChar}.jpg`;
        }

        case 'sakurazaka': {
            if (singleId === 's04' && song.titleRo === "Boku no Dilemma") return `${sakuBaseUrl}s46_cover_s04_dilema.jpg`;
            if (singleId === 's05' && song.titleRo === "Sono Hi Made") return `${sakuBaseUrl}s46_cover_s05_sonohimade.jpg`;
            if (singleId === 's07' && song.titleRo === "Kimi ga Sayonara Ietatte") return `${sakuBaseUrl}s46_cover_s07_sayonara.jpg`;
            if (singleId.startsWith('a')) {
                const title = song.titleRo;
                 if (singleId === 'a01') {
                    if (["Overture", "Masatsu Keisuu", "Jouken Hansha de Nakete Kuru", "One-way stairs"].includes(title)) return `${sakuBaseUrl}s46_cover_a01lim.jpg`;
                    if (title === "Time Machine de Yeah!") return `${sakuBaseUrl}s46_cover_a01bd.jpg`;
                    if (title === "Zutto Haru Dattara naa") return `${sakuBaseUrl}s46_cover_a01r.jpg`;
                }
                 if (singleId === 'a02') return `${sakuBaseUrl}s46_cover_a02a.jpg`;
            }
            const typeChar = getTypeChar(song.SongTypeAvv);
            return `${sakuBaseUrl}s46_cover_${singleId}${typeChar}.jpg`;
        }

        case 'hinatazaka': {
            const hirakeyaMap = {
                "Hiragana Keyaki": `${keyaBaseUrl}k46_cover_s02r.jpg`, "Dare Yori mo Takaku Tobe!": `${keyaBaseUrl}k46_cover_s03b.jpg`,
                "Bokutachi wa Tsukiatteiru": `${keyaBaseUrl}k46_cover_s04d.jpg`, "W-KEYAKIZAKA no Uta": `${keyaBaseUrl}k46_cover_s04a.jpg`,
                "Soredemo Aruiteru": `${keyaBaseUrl}k46_cover_s05a.jpg`, "NO WAR in the future": `${keyaBaseUrl}k46_cover_s05b.jpg`,
                "Ima ni Miteiro": `${keyaBaseUrl}k46_cover_s06b.jpg`, "Hanbun no Kioku": `${keyaBaseUrl}k46_cover_s06r.jpg`,
                "Chinmoku Shita Koibito yo": `${keyaBaseUrl}k46_cover_a01a.jpg`, "Eien no Hakusen": `${keyaBaseUrl}k46_cover_a01b.jpg`
            };
            if (hirakeyaMap[song.titleRo]) return hirakeyaMap[song.titleRo];
            if (singleId === 's11' && song.titleRo === "Boku ni Tsuzuke") return `${hinataBaseUrl}h46_cover_s11_bokuni.jpg`;
            if (singleId === 'hira_alb') return `${hinataBaseUrl}h46_cover_hiragana_alb00${getTypeChar(song.SongTypeAvv)}.jpg`;
            const typeChar = getTypeChar(song.SongTypeAvv);
            return `${hinataBaseUrl}h46_cover_${singleId}${typeChar}.jpg`;
        }
        
        case 'bokuao': {
            const specialCovers = {
                "s03": { "Shoukouguchi de Aetara": "s03_shokouguchi", "Spare no Nai Koi": "s03_spare", "Tomo yo Koko de Sayonara da": "s03_tomoyo" },
                "s04": { "Sorairo no Mizushibuki": "s04_sorairo" },
                "s05": { "Koi wa Baisoku": "s05_baisoku" }
            };
            if (specialCovers[singleId] && specialCovers[singleId][song.titleRo]) {
                return `${bokuaoBaseUrl}bokuao_cover_${specialCovers[singleId][song.titleRo]}.jpg`;
            }
            const typeChar = getTypeChar(song.SongTypeAvv);
            return `${bokuaoBaseUrl}bokuao_cover_${singleId}${typeChar}.jpg`;
        }

        default:
            return '';
    }
}