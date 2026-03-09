document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('name-container');

    let membersData = [];
    let shortData = {};
    let adanaData = {};

    const preferredAdana = {
        "冨里奈央": "adanaaya1"
    };

    const romajiToHiragana = (text) => {
        let t = text.toLowerCase();
        const exceptions = {
            'ito': 'itou', 'saito': 'saitou', 'sato': 'satou', 'endo': 'endou',
            'ozono': 'oozono', 'ozeki': 'oozeki', 'ota': 'oota', 'kono': 'kouno',
            'noujo': 'noujou', 'eto': 'etou', 'hori': 'hori', 'okoshi': 'ookoshi'
        };
        t = t.split(' ').map(w => exceptions[w] || w).join(' ');
        
        t = t.replace(/([ksthmyrwgzjdbp])\1/g, 'っ$1');
        t = t.replace(/n(?![aeiouy])/g, 'ん');

        const map = {
            kya:'きゃ', kyu:'きゅ', kyo:'きょ', sha:'しゃ', shu:'しゅ', sho:'しょ',
            cha:'ちゃ', chu:'ちゅ', cho:'ちょ', nya:'にゃ', nyu:'にゅ', nyo:'にょ',
            hya:'ひゃ', hyu:'ひゅ', hyo:'ひょ', mya:'みゃ', myu:'みゅ', myo:'みょ',
            rya:'りゃ', ryu:'りゅ', ryo:'りょ', gya:'ぎゃ', gyu:'ぎゅ', gyo:'ぎょ',
            ja:'じゃ', ju:'じゅ', jo:'じょ', bya:'びゃ', byu:'びゅ', byo:'びょ',
            pya:'ぴゃ', pyu:'ぴゅ', pyo:'ぴょ', shi:'し', chi:'ち', tsu:'つ',
            ka:'か', ki:'き', ku:'く', ke:'け', ko:'こ', sa:'さ', su:'す', se:'せ', so:'そ',
            ta:'た', te:'て', to:'と', na:'な', ni:'に', nu:'ぬ', ne:'ね', no:'の',
            ha:'は', hi:'ひ', fu:'ふ', he:'へ', ho:'ほ', ma:'ま', mi:'み', mu:'む', me:'め', mo:'も',
            ya:'や', yu:'ゆ', yo:'よ', ra:'ら', ri:'り', ru:'る', re:'れ', ro:'ろ',
            wa:'わ', wo:'を', n:'ん', ga:'が', gi:'ぎ', gu:'ぐ', ge:'げ', go:'ご',
            za:'ざ', ji:'じ', zu:'ず', ze:'ぜ', zo:'ぞ', da:'だ', de:'で', do:'ど',
            ba:'ば', bi:'び', bu:'ぶ', be:'べ', bo:'ぼ', pa:'ぱ', pi:'ぴ', pu:'ぷ', pe:'ぺ', po:'ぽ',
            a:'あ', i:'い', u:'う', e:'え', o:'お', '-':'ー',
			ch:'く',stie:'すてぃー'
        };

        for (let key in map) {
            t = t.split(key).join(map[key]);
        }
        return t;
    };

    async function loadData() {
        try {
            const [memRes, shortRes, adanaRes] = await Promise.all([
                fetch('../store/member/members.json'),
                fetch('../store/member/member_short.json'),
                fetch('../store/member/adana.json')
            ]);
            
            membersData = await memRes.json();
            shortData = await shortRes.json();
            adanaData = await adanaRes.json();
            
            renderPage();
        } catch (err) {
            container.innerHTML = '<p>Gagal memuat data.</p>';
        }
    }

    function getSurname(romaji) {
        if (shortData[romaji]) return shortData[romaji][0];
        return romaji.split(' ')[0];
    }

    function getAdana(jpName) {
        const obj = adanaData[jpName];
        if (!obj) return '-';
        if (preferredAdana[jpName] && obj[preferredAdana[jpName]]) {
            return obj[preferredAdana[jpName]];
        }
        return Object.values(obj)[0];
    }

    function buildTable(members, highlightFn) {
        if (members.length === 0) return '<p class="empty-msg">Tidak ada member di kategori ini.</p>';
        let html = `
            <table class="member-table boxs2">
                <thead>
                    <tr>
                        <th>Member</th>
                        <th>Hiragana</th>
                        <th>Gen</th>
                        <th>Marga</th>
                        <th>Panggilan</th>
                    </tr>
                </thead>
                <tbody>
        `;
        members.forEach(m => {
            let hira = romajiToHiragana(m.nama_romaji);
            if (highlightFn) hira = highlightFn(hira, m.nama_romaji);
            
            html += `
                <tr>
                    <td class="col-name">
                        <div class="jp-name jpn">${m.nama_jp}</div>
                        <div class="rm-name">${m.nama_romaji}</div>
                    </td>
                    <td class="col-hiragana jpn">${hira}</td>
                    <td class="col-gen">${m.gen}</td>
                    <td class="col-surname jpn">${getSurname(m.nama_romaji)}</td>
                    <td class="col-nickname jpn">${getAdana(m.nama_jp)}</td>
                </tr>
            `;
        });
        html += `</tbody></table>`;
        return html;
    }

    function renderPage() {
        const categories = [
            {
                title: "Karakter 「心」 pada gen-6",
                desc: "Saat 11 member yang lulus audisi gen-6 diumumkan pada Februari 2025, banyak nama yang cukup sulit dibaca. Menariknya, terdapat 3 member yang memiliki karakter 「心」 (Hati) pada namanya, sebuah karakter yang belum pernah ada pada generasi sebelumnya.",
                content: () => {
                    const m = membersData.filter(x => x.gen === "6期" && x.nama_jp.includes("心"));
                    return buildTable(m, h => h.replace(/(ここ|み)/g, '<b>$1</b>'));
                }
            },
            {
                title: "Awalan A-I-U-E-O pada gen-5",
                desc: "Saat 11 member gen-5 diumumkan, terlihat banyak marga yang diawali dengan huruf vokal baris A (A, I, U, E, O). Terdapat 7 dari 11 member (64%).",
                content: () => {
                    const m = membersData.filter(x => x.gen === "5期" && /^[aiueo]/i.test(x.nama_romaji));
                    return buildTable(m, h => {
                        let p = h.split(' ');
                        if(p.length > 0) p[0] = p[0].replace(/^([あいうえお])/, '<b>$1</b>');
                        return p.join(' ');
                    });
                }
            },
            {
                title: "Nama 2 Huruf Berakhiran 「O」",
                desc: "Dengan bergabungnya gen-6, nama panggilan/depan 2 huruf yang berakhiran 「O」 semakin bertambah. Ini merupakan fenomena yang banyak muncul pada member kelahiran sekitar tahun 2000-an ke atas.",
                content: () => {
                    const m = membersData.filter(x => {
                        const parts = x.nama_romaji.split(' ');
                        if (parts.length < 2) return false;
                        const fn = parts[1].toLowerCase();
                        const fnHira = romajiToHiragana(fn);
                        return fn.endsWith('o') && fnHira.length === 2;
                    });
                    return buildTable(m, h => {
                        let p = h.split(' ');
                        if(p.length > 1) p[1] = p[1].replace(/(お|こ|そ|と|の|ほ|も|よ|ろ|を)$/, '<b>$1</b>');
                        return p.join(' ');
                    });
                }
            },
            {
                title: "Karakter 「月」 pada Nama",
                desc: "Member yang memiliki karakter 「月」 (Tsuki/Bulan) di dalam namanya.",
                content: () => {
                    const m = membersData.filter(x => x.nama_jp.includes("月"));
                    return buildTable(m, h => h.replace(/(づき|つき|ずき)/g, '<b>$1</b>'));
                }
            },
            {
                title: "Duplikasi Marga: Kasus 「Saito」 dan 「Ito」",
                desc: "Salah satu hal yang paling ikonik adalah banyaknya member bermarga Saito dan Ito. Namun karena sebagian besar sudah lulus, marga member saat ini sangat beragam.",
                content: () => {
                    const subs = [
                        { label: 'Saito / さいとう', prefix: 'Saito ' },
                        { label: 'Sato / さとう', prefix: 'Sato ' },
                        { label: 'Ito / いとう', prefix: 'Ito ' },
                        { label: 'Inoue / いのうえ', prefix: 'Inoue ' },
                        { label: 'Suzuki / すずき', prefix: 'Suzuki ' }
                    ];
                    let html = '';
                    subs.forEach(sub => {
                        const m = membersData.filter(x => x.nama_romaji.startsWith(sub.prefix));
                        html += `<h3 class="sub-title jpn">${sub.label}</h3>`;
                        html += buildTable(m, h => {
                            let p = h.split(' ');
                            p[0] = `<b>${p[0]}</b>`;
                            return p.join(' ');
                        });
                    });
                    return html;
                }
            },
            {
                title: "Duplikasi Nama Depan",
                desc: "Saat ini terdapat beberapa member dengan nama depan atau cara baca yang sama. Meskipun marganya sangat beragam, kesamaan nama depan cukup sering terjadi.",
                content: () => {
                    const subs = [
                        { label: 'HARUKA', filter: m => m.nama_romaji.endsWith(' Haruka') },
                        { label: 'NAO', filter: m => m.nama_romaji.endsWith(' Nao') },
                        { label: 'SAKURA', filter: m => m.nama_romaji.endsWith(' Sakura') },
                        { label: 'MINAMI', filter: m => m.nama_romaji.endsWith(' Minami') },
                        { label: 'HINA', filter: m => m.nama_romaji.split(' ')[1] && m.nama_romaji.split(' ')[1].startsWith('Hina') },
                        { label: 'SEIRA', filter: m => m.nama_romaji.endsWith(' Seira') },
                        { label: 'MAI', filter: m => m.nama_romaji.endsWith(' Mai') },
                        { label: 'SAYURI', filter: m => m.nama_romaji.endsWith(' Sayuri') },
                        { label: 'SAYA / SAYAKA', filter: m => m.nama_romaji.endsWith(' Saya') || m.nama_romaji.endsWith(' Sayaka') },
                        { label: 'AYA', filter: m => m.nama_romaji.split(' ').slice(1).join(' ').includes('Aya') }
                    ];
                    let html = '';
                    subs.forEach(sub => {
                        const m = membersData.filter(sub.filter);
                        if(m.length > 0) {
                            html += `<h3 class="sub-title">${sub.label}</h3>`;
                            html += buildTable(m, h => {
                                let p = h.split(' ');
                                if(p.length > 1) p[1] = `<b>${p[1]}</b>`;
                                return p.join(' ');
                            });
                        }
                    });
                    return html;
                }
            },
            {
                title: "Kepunahan Karakter 「子」",
                desc: "Nama dengan akhiran 「子」 (Ko) terus berkurang setiap tahunnya, sejalan dengan tren pemberian nama di Jepang secara umum. Member terakhir dengan akhiran ini adalah Ozono Momoko (gen-3, lulus) kelahiran 1999.",
                content: () => {
                    const m = membersData.filter(x => x.nama_jp.endsWith("子"));
                    return buildTable(m, h => h.replace(/こ$/, '<b>こ</b>'));
                }
            }
        ];

        let finalHtml = '';
        categories.forEach(cat => {
            finalHtml += `
                <div class="category-block boxs2">
                    <div class="cat-header">
                        <h2>${cat.title}</h2>
                    </div>
                    <div class="cat-body">
                        <p class="cat-desc">${cat.desc}</p>
                        <div class="cat-content">
                            ${cat.content()}
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = finalHtml;
    }

    loadData();
});