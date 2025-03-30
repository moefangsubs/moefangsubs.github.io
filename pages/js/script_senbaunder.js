const generateHTML = () => {
const members = [{
	year: 2012,
	singles: [{
		num: 1,
		title: "ぐるぐるカーテン",
		senbatsuCenter: ["ikoma_rina"],
		senbatsuCenterCount: ["初"],
		cover: "01",
		underCenter: ["hatanaka_seira"],
		underCenterCount: ["初"],
		underSong: "左胸の勇気"
	}, {
		num: 2,
		title: "おいでシャンプー",
		senbatsuCenter: ["ikoma_rina"],
		senbatsuCenterCount: ["2"],
		cover: "02",
		underCenter: ["ito_marika"],
		underCenterCount: ["初"],
		underSong: "狼に口笛を"
	}, {
		num: 3,
		title: "走れ！バイシクル",
		senbatsuCenter: ["ikoma_rina"],
		senbatsuCenterCount: ["3"],
		cover: "03",
		underCenter: ["ito_nene"],
		underCenterCount: ["初"],
		underSong: "涙がまだ悲しみだった頃"
	}, {
		num: 4,
		title: "制服のマネキン",
		senbatsuCenter: ["ikoma_rina"],
		senbatsuCenterCount: ["4"],
		cover: "04",
		underCenter: ["nakada_kana"],
		underCenterCount: ["初"],
		underSong: "春のメロディ一"
	}]
}, {
	year: 2013,
	singles: [{
		num: 5,
		title: "君の名は希望",
		senbatsuCenter: ["ikoma_rina"],
		senbatsuCenterCount: ["5"],
		cover: "05",
		underCenter: ["saito_yuuri"],
		underCenterCount: ["初"],
		underSong: "13日の金曜日"
	}, {
		num: 6,
		title: "ガールズルール",
		senbatsuCenter: ["shiraishi_mai"],
		senbatsuCenterCount: ["初"],
		cover: "06",
		underCenter: ["saito_asuka"],
		underCenterCount: ["初"],
		underSong: "扇風機"
	}, {
		num: 7,
		title: "バレッタ",
		senbatsuCenter: ["hori_miona"],
		senbatsuCenterCount: ["初"],
		cover: "07",
		underCenter: ["hoshino_minami"],
		underCenterCount: ["初"],
		underSong: "初恋の人を今でも"
	}]
}, {
	year: 2014,
	singles: [{
		num: 8,
		title: "気づいたら片思い",
		senbatsuCenter: ["nishino_nanase"],
		senbatsuCenterCount: ["初"],
		cover: "08",
		underCenter: ["ito_marika"],
		underCenterCount: ["2"],
		underSong: "生まれたままで"
	}, {
		num: 9,
		title: "夏のFree & Easy",
		senbatsuCenter: ["nishino_nanase"],
		senbatsuCenterCount: ["2"],
		cover: "09",
		underCenter: ["ito_marika"],
		underCenterCount: ["3"],
		underSong: "ここにいる理由"
	}, {
		num: 10,
		title: "何度目の青空か？",
		senbatsuCenter: ["ikuta_erika"],
		senbatsuCenterCount: ["初"],
		cover: "10",
		underCenter: ["inoue_sayuri"],
		underCenterCount: ["初"],
		underSong: "あの日僕は咄嗟に嘘をついた"
	}]
}, {
	year: 2015,
	singles: [{
		num: 11,
		title: "命は美しい",
		senbatsuCenter: ["nishino_nanase"],
		senbatsuCenterCount: ["3"],
		cover: "11",
		underCenter: ["nakamoto_himeka"],
		underCenterCount: ["初"],
		underSong: "君は僕の合わない方が良かったのかな"
	}, {
		num: 12,
		title: "太陽ノック",
		senbatsuCenter: ["ikoma_rina"],
		senbatsuCenterCount: ["6"],
		cover: "12",
		underCenter: ["hori_miona"],
		underCenterCount: ["初"],
		underSong: "別れ際、もっと好きになる"
	}, {
		num: 13,
		title: "今、話したい誰かがいる",
		senbatsuCenter: ["shiraishi_mai", "nishino_nanase"],
		senbatsuCenterCount: ["2", "4"],
		cover: "13",
		underCenter: ["nakamoto_himeka", "hori_miona"],
		underCenterCount: ["2", "2"],
		underSong: "嫉妬の権利"
	}]
}, {
	year: 2016,
	singles: [{
		num: 14,
		title: "ハルジオンが咲く頃",
		senbatsuCenter: ["fukagawa_mai"],
		senbatsuCenterCount: ["初"],
		cover: "14",
		underCenter: ["nakamoto_himeka"],
		underCenterCount: ["3"],
		underSong: "不等号"
	}, {
		num: 15,
		title: "裸足でSummer",
		senbatsuCenter: ["saito_asuka"],
		senbatsuCenterCount: ["初"],
		cover: "15",
		underCenter: ["higuchi_hina"],
		underCenterCount: ["初"],
		underSong: "シークレットグラフィティー"
	}, {
		num: 16,
		title: "さようならの意味",
		senbatsuCenter: ["hashimoto_nanami"],
		senbatsuCenterCount: ["初"],
		cover: "16",
		underCenter: ["terada_ranze"],
		underCenterCount: ["初"],
		underSong: "ブランコ"
	}]
}, {
	year: 2017,
	singles: [{
		num: 17,
		title: "インフルエンサー",
		senbatsuCenter: ["shiraishi_mai", "nishino_nanase"],
		senbatsuCenterCount: ["3", "5"],
		cover: "17",
		underCenter: ["watanabe_miria"],
		underCenterCount: ["初"],
		underSong: "風船は生きている"
	}, {
		num: 18,
		title: "逃げ水",
		senbatsuCenter: ["ozono_momoko", "yoda_yuuki"],
		senbatsuCenterCount: ["初", "初"],
		cover: "18",
		underCenter: ["kitano_hinako", "nakamoto_himeka"],
		underCenterCount: ["初", "4"],
		underSong: "アンダー"
	}, {
		num: 19,
		title: "いつかできるから今日できる",
		senbatsuCenter: ["saito_asuka", "nishino_nanase"],
		senbatsuCenterCount: ["2", "6"],
		cover: "19",
		underCenter: ["higuchi_hina"],
		underCenterCount: ["2"],
		underSong: "My rule"
	}]
}, {
	year: 2018,
	singles: [{
		num: 20,
		title: "シンクロニシティ",
		senbatsuCenter: ["shiraishi_mai"],
		senbatsuCenterCount: ["4"],
		cover: "20",
		underCenter: ["suzuki_ayane"],
		underCenterCount: ["初"],
		underSong: "新しい世界"
	}, {
		num: 21,
		title: "ジコチューで行こう！",
		senbatsuCenter: ["saito_asuka"],
		senbatsuCenterCount: ["3"],
		cover: "21",
		underCenter: ["nakada_kana"],
		underCenterCount: ["2"],
		underSong: "三角の空き地"
	}, {
		num: 22,
		title: "帰り道は遠回りしたくなる",
		senbatsuCenter: ["nishino_nanase"],
		senbatsuCenterCount: ["7"],
		cover: "22",
		underCenter: ["kitano_hinako"],
		underCenterCount: ["2"],
		underSong: "日常"
	}]
},  {
	year: 2019,
	singles: [{
		num: 23,
		title: "Sing Out!",
		senbatsuCenter: ["saito_asuka"],
		senbatsuCenterCount: ["4"],
		cover: "23",
		underCenter: ["terada_ranze"],
		underCenterCount: ["2"],
		underSong: "滑走路"
	}, {
		num: 24,
		title: "夜明けまで強がらなくてもいい",
		senbatsuCenter: ["endo_sakura"],
		senbatsuCenterCount: ["初"],
		cover: "24",
		underCenter: ["iwamoto_renka"],
		underCenterCount: ["初"],
		underSong: "～Do my best～ じゃ意味はない"
	}]
}, {
	year: 2020,
	singles: [{
		num: 25,
		title: "幸せの保護色",
		senbatsuCenter: ["shiraishi_mai"],
		senbatsuCenterCount: ["5"],
		cover: "25",
	}]
}, {
	year: 2021,
	singles: [{
		num: 26,
		title: "僕は僕を好きになる",
		senbatsuCenter: ["yamashita_mizuki"],
		senbatsuCenterCount: ["初"],
		cover: "26",
		underCenter: ["sakaguchi_tamami"],
		underCenterCount: ["初"],
		underSong: "口ほどにもないKISS"
	}, {
		num: 27,
		title: "ごめんね、Fingers crossed",
		senbatsuCenter: ["endo_sakura"],
		senbatsuCenterCount: ["2"],
		cover: "27",
		underCenter: ["yamazaki_rena"],
		underCenterCount: ["初"],
		underSong: "錆びたコンパス"
	}, {
		num: 28,
		title: "君に叱られた",
		senbatsuCenter: ["kaki_haruka"],
		senbatsuCenterCount: ["初"],
		cover: "28",
		underCenter: ["terada_ranze"],
		underCenterCount: ["3"],
		underSong: "マシンガンレイン"
	}]
}, {
	year: 2022,
	singles: [{
		num: 29,
		title: "Actually…",
		senbatsuCenter: ["nakanishi_aruno"],
		senbatsuCenterCount: ["初"],
		cover: "29",
		underCenter: ["sato_kaede"],
		underCenterCount: ["初"],
		underSong: "届かなくたって…"
	}, {
		num: 30,
		title: "好きと言うのはロックだぜ！",
		senbatsuCenter: ["kaki_haruka"],
		senbatsuCenterCount: ["2"],
		cover: "30",
		underCenter: ["wada_maaya"],
		underCenterCount: ["初"],
		underSong: "UNDER's Love"
	}, {
		num: 31,
		title: "ここにはないもの",
		senbatsuCenter: ["saito_asuka"],
		senbatsuCenterCount: ["5"],
		cover: "31",
		underCenter: ["nakamura_reno"],
		underCenterCount: ["初"],
		underSong: "悪い成分"
	}]
}, {
	year: 2023,
	singles: [{
		num: 32,
		title: "人は夢を二度見る",
		senbatsuCenter: ["kubo_shiori", "yamashita_mizuki"],
		senbatsuCenterCount: ["初", "2"],
		cover: "32",
		underCenter: ["ito_riria", "hayashi_runa"],
		underCenterCount: ["初", "初"],
		underSong: "さざ波は戻らない"
	}, {
		num: 33,
		title: "おひとりさま天国",
		senbatsuCenter: ["inoue_nagi"],
		senbatsuCenterCount: ["初"],
		cover: "33",
		underCenter: ["matsuo_miyu"],
		underCenterCount: ["初"],
		underSong: "踏んでしまった"
	}, {
		num: 34,
		title: "Monopoly",
		senbatsuCenter: ["endo_sakura", "kaki_haruka"],
		senbatsuCenterCount: ["3", "3"],
		cover: "34",
		underCenter: ["nakanishi_aruno"],
		underCenterCount: ["初"],
		underSong: "思い出が止まらなくなる"
	}]
}, {
	year: 2024,
	singles: [{
		num: 35,
		title: "チャンスは平等",
		senbatsuCenter: ["yamashita_mizuki"],
		senbatsuCenterCount: ["3"],
		cover: "35",
		underCenter: ["tsutsui_ayame"],
		underCenterCount: ["初"],
		underSong: "車道側"
	}, {
		num: 36,
		title: "チートデイ",
		senbatsuCenter: ["inoue_nagi"],
		senbatsuCenterCount: ["2"],
		cover: "36",
		underCenter: ["okuda_iroha"],
		underCenterCount: ["初"],
		underSong: "落とし物"
	}, {
		num: 37,
		title: "歩道橋",
		senbatsuCenter: ["endo_sakura"],
		senbatsuCenterCount: ["4"],
		cover: "37",
		underCenter: ["tomisato_nao"],
		underCenterCount: ["初"],
		underSong: "それまでの猶予"
	}]
}, {
	year: 2025,
	singles: [{
		num: 38,
		title: "ネーブルオレンジ",
		senbatsuCenter: ["inoue_nagi", "nakanishi_aruno"],
		senbatsuCenterCount: ["2", "2"],
		cover: "38",
		underCenter: ["shibata_yuna"],
		underCenterCount: ["初"],
		underSong: "交感神経優位"
	}]
}

];



	const tableBody = document.querySelector('#demoCT tbody');

	members.forEach(({ year, singles }) => {
		// Add year row
		const yearRow = document.createElement('tr');
		const yearCell = document.createElement('td');
		yearCell.className = 'cyear';
		yearCell.colSpan = 7;
		yearCell.textContent = year;
		yearRow.appendChild(yearCell);
		tableBody.appendChild(yearRow);

		// Add singles rows
		singles.forEach(({ num, title, senbatsuCenter, senbatsuCenterCount, cover, underCenter, underCenterCount, underSong }) => {
			const singleRow = document.createElement('tr');

			// Handle senbatsu center
const senbatsuCenterHTML = senbatsuCenter.length === 1
    ? `<td class="sgc jp500" colspan="2">
        <div class="pictm">
            <img src="https://ik.imagekit.io/moearchive/web/memberprofile/s${String(num).padStart(3, '0')}/${senbatsuCenter[0]}.png">
            <div class="berapa">${senbatsuCenterCount[0]}</div>
        </div>
    </td>`
    : senbatsuCenter.map((center, index) => `
        <td class="sgc jp500">
            <div class="pictm">
                <img src="https://ik.imagekit.io/moearchive/web/memberprofile/s${String(num).padStart(3, '0')}/${center}.png">
                <div class="berapa">${senbatsuCenterCount[index]}</div>
            </div>
        </td>
    `).join('');

// Handle under center
const underCenterHTML = underCenter && underCenter.length > 0
    ? (
        underCenter.length === 1
            ? `<td class="udc jp500" colspan="2">
                <div class="pictm">
                    <img src="https://ik.imagekit.io/moearchive/web/memberprofile/s${String(num).padStart(3, '0')}/${underCenter[0]}.png">
                    <div class="berapa">${underCenterCount[0]}</div>
                </div>
            </td>`
            : underCenter.map((center, index) => `
                <td class="udc jp500">
                    <div class="pictm">
                        <img src="https://ik.imagekit.io/moearchive/web/memberprofile/s${String(num).padStart(3, '0')}/${center}.png">
                        <div class="berapa">${underCenterCount[index]}</div>
                    </div>
                </td>
            `).join('')
    )
    : `<td class="udc jp500" colspan="3"></td>`;

// Handle under song
const underSongHTML = underSong ? `<td class="udc jp500">${underSong}</td>` : ``;

// Final row assembly
singleRow.innerHTML = `
    <td class="sinnux">${num}th</td>
    <td class="sgc jp500">${title}</td>
    ${senbatsuCenterHTML}
    <td class="sinnum">
        <img src="https://ik.imagekit.io/moearchive/singlealbum/n46_${cover}.jpg" />
    </td>
    ${underCenterHTML}
    ${underSongHTML}
`;

tableBody.appendChild(singleRow);

		});
	});
};

document.addEventListener('DOMContentLoaded', generateHTML);
