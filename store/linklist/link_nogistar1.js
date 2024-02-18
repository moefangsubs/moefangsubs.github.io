
// =======================
// DESKRIPSI B
// =======================

// const descEpisodeSynopsis = {
	
// };


// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂スター誕生！";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

// const descEpisode = {};

// for (let i = 1; i <= 9999; i++) {
  // const paddedNumber = i.toString().padStart(2, '0');
  // descEpisode[paddedNumber] = `| Episode ${i}`;
// }
// console.log(descEpisode);

const descEpisode = {
	"01" : "| Episode 1",
	"02" : "| Episode 2",
	"03" : "| Episode 3",
	"04" : "| Episode 4",
	"05" : "| Episode 5",
	"06" : "| Episode 6",
	"07" : "| Episode 7",
	"08" : "| Episode 8",
	"09" : "| Episode 9",
	"10" : "| Episode 10",
	"11" : "| Episode 11",
	"12" : "| Episode 12",
	"13" : "| Episode 13",
	"14" : "| Episode 14",
	"15" : "| Episode 15 (Idol Summer Song SP)",
	"16" : "| Episode 16 (90's Drama Theme Song SP)",
	"17" : "| Episode 17 (80's Anime Theme Song SP)",
	"18" : "| Episode 18",
	"19" : "| Episode 19 (Love Song SP)",
	"20" : "| Episode 20 (Idol Song SP)"
};
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "21 Mei 2021",
	"02" : "18 Mei 2021",
	"03" : "25 Mei 2021",
	"04" : "01 Juni 2021",
	"05" : "08 Juni 2021",
	"06" : "15 Juni 2021",
	"07" : "22 Juni 2021",
	"08" : "29 Juni 2021",
	"09" : "06 Juli 2021",
	"10" : "13 Juli 2021",
	"11" : "27 Juli 2021",
	"12" : "03 Agustus 2021",
	"13" : "10 Agustus 2021",
	"14" : "17 Agustus 2021",
	"15" : "24 Agustus 2021",
	"16" : "31 Agustus 2021",
	"17" : "07 September 2021",
	"18" : "14 September 2021",
	"19" : "21 September 2021",
	"20" : "28 September 2021",
};
console.log(descOnAirDate);


// =======================
// DESKRIPSI LAGU 1 (Khusus Star Tanjou series)
// =======================

const descSong1 = {
	"01" : "ピンク・レディー 「UFO」",
	"02" : "キャンディーズ 「年下の男の子」",
	"03" : "中森明菜 「少女A」",
	"04" : "小泉今日子 「渚のはいから人魚」",
	"05" : "Wink 「淋しい熱帯魚」",
	"06" : "SPEED 「Body & Soul」",
	"07" : "PUFFY 「渚にまつわるエトセトラ」",
	"08" : "PRINCESS PRINCESS 「Diamonds＜ダイアモンド＞」",
	"09" : "キャンディーズ 「暑中お見舞い申し上げます」",
	"10" : "松田聖子 「青い珊瑚礁」",
	"11" : "大塚愛 「さくらんぼ」",
	"12" : "JITTERIN'JINN 「夏祭り」",
	"13" : "猿岩石 「白い雲のように」",
	"14" : "TRF 「EZ DO DANCE」",
	"15" : "西田ひかる 「人生変えちゃう夏かもね」",
	"16" : "久保田利伸 with NAOMI CAMPBELL 「LA・LA・LA LOVE SONG」",
	"17" : "杏里 「CAT'S EYE」",
	"18" : "ZARD 「揺れる想い」",
	"19" : "DREAMS COME TRUE 「大阪LOVER」",
	"20" : "AKB48 「フライングゲット」",
};
console.log(descSong1);


// =======================
// DESKRIPSI LAGU 2 (Khusus Star Tanjou series)
// =======================

const descSong2 = {
	"01" : "松田聖子 「渚のバルコニー」",
	"02" : "早見優 「夏色のナンシー」",
	"03" : "わらべ 「もしも明日が」",
	"04" : "ピンク・レディー 「ペッパー警部」",
	"05" : "南野陽子 「はいからさんが通る」",
	"06" : "山口百恵 「ロックンロール・ウィドウ」",
	"07" : "石川優子とチャゲ 「ふたりの愛ランド」",
	"08" : "薬師丸ひろ子 「セーラー服と機関銃」",
	"09" : "吉田美奈子 「夢で逢えたら」",
	"10" : "中森明菜 「DESIRE -情熱-」",
	"11" : "松任谷由実 「守ってあげたい」",
	"12" : "広末涼子 「MajiでKoiする5秒前」",
	"13" : "太田裕美 「木綿のハンカチーフ」",
	"14" : "杏里 「オリビアを聴きながら」",
	"15" : "松田聖子 「夏の扉」",
	"16" : "スピッツ 「空も飛べるはず」",
	"17" : "高橋洋樹 「魔訶不思議アドベンチャー!」",
	"18" : "山口百恵 「プレイバックPart2」",
	"19" : "TEE 「ベイビー・アイラブユー」",
	"20" : "ミニモニ。 「ミニモニ。ジャンケンぴょん!」",
};
console.log(descSong2);


// =======================
// DESKRIPSI LAGU 3 (Khusus Star Tanjou series)
// =======================

const descSong3 = {
	"01" : "鈴木聖美 with Rats&Star 「ロンリー・チャップリン」",
	"02" : "武田鉄矢・芦川よしみ 「男と女のラブゲーム」",
	"03" : "ロス・インディオス&シルヴィア 「別れても好きな人」",
	"04" : "橋幸夫・吉永小百合 「いつでも夢を」",
	"05" : "藤谷美和子・大内義昭 「愛が生まれた日」",
	"06" : "相川七瀬 「夢見る少女じゃいられない」",
	"07" : "爆風スランプ 「Runner」",
	"08" : "鈴木雅之＆菊池桃子 「渋谷で5時」",
	"09" : "HOUND DOG 「ff」",
	"10" : "米米CLUB 「君がいるだけで」",
	"11" : "加藤ミリヤ×清水翔太 「Love Forever」",
	"12" : "榊原郁恵 「夏のお嬢さん」",
	"13" : "沢田研二 「勝手にしやがれ」",
	"14" : "globe 「FACE」",
	"15" : "森高千里 「17才」",
	"16" : "中島みゆき 「空と君のあいだに」",
	"17" : "永井真理子 「ミラクル・ガール」",
	"18" : "西田ひかる 「きっと愛がある」",
	"19" : "イルカ 「なごり雪」",
	"20" : "渡り廊下走り隊 「初恋ダッシュ」",
};
console.log(descSong3);


// =======================
// DESKRIPSI LAGU 4 (Khusus Star Tanjou series)
// =======================

const descSong4 = {
	"01" : "バブルガム・ブラザーズ 「WON'T BE LONG」",
	"02" : "",
	"03" : "錦野旦 「空に太陽がある限り」",
	"04" : "",
	"05" : "チェッカーズ 「涙のリクエスト」",
	"06" : "",
	"07" : "",
	"08" : "嶋大輔 「男の勲章」",
	"09" : "",
	"10" : "島谷ひとみ 「亜麻色の髪の乙女」",
	"11" : "CHEMISTRY 「PIECES OF A DREAM」",
	"12" : "",
	"13" : "SHOW-YA 「限界LOVERS」",
	"14" : "ポケットビスケッツ 「POWER」",
	"15" : "天地真理 「恋する夏の日」",
	"16" : "岡本真夜 「TOMORROW」",
	"17" : "松谷祐子 「ラムのラブソング」",
	"18" : "",
	"19" : "",
	"20" : "モーニング娘。 「恋愛レボリューション21」",
};
console.log(descSong4);


// =======================
// DESKRIPSI LAGU 5 (Khusus Star Tanjou series)
// =======================

const descSong5 = {
	"01" : "",
	"02" : "",
	"03" : "",
	"04" : "",
	"05" : "",
	"06" : "",
	"07" : "",
	"08" : "",
	"09" : "",
	"10" : "",
	"11" : "",
	"12" : "",
	"13" : "",
	"14" : "",
	"15" : "Toshi&Naoko 「夏ざかりほの字組」",
	"16" : "小田和正 「ラブ・ストーリーは突然に」",
	"17" : "うしろ髪ひかれ隊 「時の河を越えて」",
	"18" : "",
	"19" : "",
	"20" : "",
};
console.log(descSong5);


// =======================
// DESKRIPSI LAGU 6 (Khusus Star Tanjou series)
// =======================

const descSong6 = {
	"01" : "",
	"02" : "",
	"03" : "",
	"04" : "",
	"05" : "",
	"06" : "",
	"07" : "",
	"08" : "",
	"09" : "",
	"10" : "",
	"11" : "",
	"12" : "",
	"13" : "",
	"14" : "",
	"15" : "浅香唯 「C-Girl」",
	"16" : "LINDBERG 「今すぐKiss Me」",
	"17" : "岩崎良美 「タッチ」",
	"18" : "",
	"19" : "",
	"20" : "",
};
console.log(descSong6);


// =======================
// DESKRIPSI LAGU 7 (Khusus Star Tanjou series)
// =======================

const descSong7 = {
	"01" : "",
	"02" : "",
	"03" : "",
	"04" : "",
	"05" : "",
	"06" : "",
	"07" : "",
	"08" : "",
	"09" : "",
	"10" : "",
	"11" : "",
	"12" : "",
	"13" : "",
	"14" : "",
	"15" : "一青窈 「ハナミズキ」",
	"16" : "CHAGE&ASKA 「YAH YAH YAH」",
	"17" : "",
	"18" : "",
	"19" : "",
	"20" : "",
};
console.log(descSong7);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "乃木坂46 4期生、Bro.KORN、ブラザー・コーン",
	"02" : "乃木坂46 4期生、ダイアモンド✡ユカイ",
	"03" : "乃木坂46 4期生、錦野旦",
	"04" : "乃木坂46 4期生、高橋ジョージ",
	"05" : "乃木坂46 4期生、鶴久政治",
	"06" : "乃木坂46 4期生、相川七瀬",
	"07" : "乃木坂46 4期生、サンプラザ中野くん & パッパラー河合",
	"08" : "乃木坂46 4期生、嶋大輔",
	"09" : "乃木坂46 4期生、大友康平",
	"10" : "乃木坂46 4期生、島谷ひとみ",
	"11" : "乃木坂46 4期生、川畑要",
	"12" : "乃木坂46 4期生、早見優",
	"13" : "乃木坂46 4期生、寺田恵子",
	"14" : "乃木坂46 4期生、千秋",
	"15" : "乃木坂46 4期生、松陰寺太勇、浅香唯",
	"16" : "乃木坂46 4期生、渡瀬マキ",
	"17" : "乃木坂46 4期生、岩崎良美",
	"18" : "乃木坂46 4期生、西田ひかる",
	"19" : "乃木坂46 4期生",
	"20" : "乃木坂46 4期生",
};
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/nogistars1-${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/nogistars1-${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/nogistars1-${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/nogistars1-${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/nogistars1-${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/mTIsF",
	"02" : "https://lokerwfh.net/DBn5wSus",
	"03" : "https://lokerwfh.net/xyL5",
	"04" : "https://lokerwfh.net/5ru5OV",
	"05" : "https://lokerwfh.net/5dKY",
	"06" : "https://lokerwfh.net/ChPl",
	"07" : "https://lokerwfh.net/Rwu7",
	"08" : "https://lokerwfh.net/GFnLXQ",
	"09" : "https://lokerwfh.net/zi8hL5j",
	"10" : "https://lokerwfh.net/wGGSqF",
	"11" : "https://lokerwfh.net/QDJotXq",
	"12" : "https://lokerwfh.net/U0qLLy",
	"13" : "https://lokerwfh.net/tz6N",
	"14" : "https://lokerwfh.net/y6ViS",
	"15" : "https://lokerwfh.net/PaGh6",
	"16" : "https://lokerwfh.net/vxPJsOe",
	"17" : "https://lokerwfh.net/Y1BjTv",
	"18" : "https://lokerwfh.net/plByq",
	"19" : "https://lokerwfh.net/JvwKI",
	"20" : "https://lokerwfh.net/psddyHt"
};
console.log(linkHardsub);



// =======================
// LINK SOFTSUB
// =======================

const linkSoftsub = {
	"01" : "https://lokerwfh.net/iKcENG9G",
	"02" : "https://lokerwfh.net/UMlQhg",
	"03" : "https://lokerwfh.net/9KFS",
	"04" : "https://lokerwfh.net/shFufF7K",
	"05" : "https://lokerwfh.net/dVedtwI",
	"06" : "https://lokerwfh.net/U3Lqy3",
	"07" : "https://lokerwfh.net/TpL9ESlA",
	"08" : "https://lokerwfh.net/N7wlk7gp",
	"09" : "https://lokerwfh.net/Dxlc48",
	"10" : "https://lokerwfh.net/Favc",
	"11" : "https://lokerwfh.net/3sLzWcl",
	"12" : "https://lokerwfh.net/EUnjt",
	"13" : "https://lokerwfh.net/8txRA",
	"14" : "https://lokerwfh.net/Lo8f",
	"15" : "https://lokerwfh.net/Z7Kv6V",
	"16" : "https://lokerwfh.net/x1Dbg",
	"17" : "https://lokerwfh.net/5GVEiepq",
	"18" : "https://lokerwfh.net/fFyn",
	"19" : "https://lokerwfh.net/KfsfiZOd",
	"20" : "https://lokerwfh.net/SYLVV"
};
console.log(linkSoftsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteerA = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteerA[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hardsub-all-episode-V8whF";
}
console.log(linkTrakteerA);

const linkTrakteerB = {};
for (let i = 1; i <= 20; i++) {
  linkTrakteerB[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-softsub-all-episode-XPedq";
}
console.log(linkTrakteerB);

// hulu ver
const linkTrakteerC = {
	"01" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep1-Y3qer",
	"02" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep2-BYJUe",
	"03" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep3-TdAeW",
	"04" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep4-CmB0k",
	"05" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep5-Xrgl0",
	"06" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep6-ISvi2",
	"07" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep7-wZIN4",
	"08" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep8-KyvGd",
	"09" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep9-Ntiui",
	"10" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep10-efi73",
	"11" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep11-BPw6R",
	"12" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep12-o8bl7",
	"13" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep13-oMhiJ",
	"14" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep14-7sEGK",
	"15" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep15-9lTyc",
	"16" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep16-Lare5",
	"17" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep17-QGe2D",
	"18" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep18-MjsaC",
	"19" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep19-9tHPU",
	"20" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-hulu-ep20-Ji0SJ",
};
console.log(linkTrakteerC);


// smash ver
const linkTrakteerD = {
	"01" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-smash-ep1-CcZMP",
	"02" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-smash-ep2-EeLJY",
	"03" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-smash-ep3-sElsr",
	"05" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-smash-ep5-E2mPi",
	"06" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-smash-ep6-7GgcR",
	"07" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-smash-ep7-Ksp6h",
	"08" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-smash-ep8-LDceo",
	"09" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-smash-ep9-2PQyX",
	"10" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-smash-ep10-bb7f1",
	"11" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-smash-ep11-sLGiZ"
};
console.log(linkTrakteerD);

// =======================
// LINK FONT
// =======================

const linkFont = {};
for (let i = 1; i <= 9999; i++) {
  linkFont[i.toString().padStart(2, '0')] = "https://drive.google.com/uc?export=download&id=1lsRJ9KQvxy4NwbuxCAC-hHK_fUt7pOnV";
}
console.log(linkFont);

// =======================
// LINK RAW
// =======================

const linkRAW = {};
for (let i = 1; i <= 9999; i++) {
  linkRAW[i.toString().padStart(2, '0')] = "https://www.akari46.cloud/search/label/Nogizaka%20Star";
}
console.log(linkRAW);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);

