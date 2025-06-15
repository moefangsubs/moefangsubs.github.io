// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂スター誕生！SIX";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {};

for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  descEpisode[paddedNumber] = `| Episode ${i}`;
}
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01": "28 April 2025",
	"02": "5 Mei 2025",
	"03": "12 Mei 2025",
	"04": "19 Mei 2025",
	"05": "26 Mei 2025",
	"06": "2 Juni 2025",
	"07": "9 Juni 2025",
};
console.log(descOnAirDate);

// =======================
// DESKRIPSI LAGU 1 (Khusus Star Tanjou series)
// =======================

const descSong1 = {
	"01": "いきものがかり 「じょいふる」",
	"02": "ポルノグラフィティ 「メリッサ」",
	"03": "MY LITTLE LOVER 「Hello, Again 〜昔からある場所〜」",
	"04": "大塚愛 「PEACH」",
	"05": "フレデリック 「オドループ」",
	"06": "Foorin 「パプリカ」",
	"07": "東京事変 「女の子は誰でも」",
};

// =======================
// DESKRIPSI LAGU 2 (Khusus Star Tanjou series)
// =======================

const descSong2 = {
	"01": "絢香 「にじいろ」",
	"02": "松たか子 「明日、春が来たら」",
	"03": "緑黄色社会 「Mela!」",
	"04": "木村カエラ 「リルラ リルハ」",
	"05": "Uru 「プロローグ」",
	"06": "YUI 「CHE.R.RY」",
	"07": "KOH＋ 「KISSして」",
};


// =======================
// DESKRIPSI LAGU 3 (Khusus Star Tanjou series)
// =======================

const descSong3 = {
	"01": "平原綾香 「Jupiter」",
	"02": "竹内まりや 「いのちの歌」",
	"03": "SHISHAMO 「僕に彼女ができたんだ」",
	"04": "平井堅 「POP STAR」",
	"05": "いきものががり 「コイスルオトメ」",
	"06": "ASIAN KUNG-FU GENERATION 「ソラニン」",
	"07": "三浦大知 「(RE)PLAY」",
};


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01": "乃木坂46 6期生、久保史緒里",
	"02": "乃木坂46 6期生、井上和",
	"03": "乃木坂46 6期生、小川彩",
	"04": "乃木坂46 6期生、賀喜遥香",
	"05": "乃木坂46 6期生、つついあやめ",
	"06": "乃木坂46 6期生、五百城茉央",
	"07": "乃木坂46 6期生、一ノ瀬美空",
};

console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/six${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/six${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/six${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/six${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/six${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://sfl.gl/PhUz4W",
	"02" : "https://sfl.gl/JzRW3",
	"03" : "https://sfl.gl/9P3bZlXK",
	"04" : "https://sfl.gl/zKZGgeJ",
	"05" : "https://sfl.gl/s94zVK",
	"06" : "https://sfl.gl/eFiI",
	"07" : "https://sfl.gl/gGL4K",

};

// =======================
// LINK SOFTSUB
// =======================

const linkSoftsub = {
	"01" : "https://sfl.gl/vromf",
	"02" : "https://sfl.gl/z6uZ1VQj",
	"03" : "https://sfl.gl/uXi4",
	"04" : "https://sfl.gl/yKzeMGZr",
	"05" : "https://sfl.gl/0w35kU",
	"06" : "https://sfl.gl/GdpjWso",
	"07" : "https://sfl.gl/Z4Hs",

};

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-six-vMle0";
}
console.log(linkTrakteer);

// =======================
// LINK RAW
// =======================

const linkRAW = {};
for (let i = 1; i <= 9999; i++) {
  linkRAW[i.toString().padStart(2, '0')] = "https://www.akari46.cloud/search/label/Nogizaka%20Star%20Tanjou%21%20SIX";
}
console.log(linkRAW);

// =======================
// ASALRAW
// =======================

const rawSource = {};
for (let i = 1; i <= 9999; i++) {
  rawSource[i.toString().padStart(2, '0')] = "Akari46";
}
console.log(rawSource);


// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);
