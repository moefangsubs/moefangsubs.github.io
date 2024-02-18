
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
  nameShow[i.toString().padStart(2, '0')] = "ノギザカスキッツ";
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
"01" : "16 Juni 2020",
"02" : "23 Juni 2020",
"03" : "30 Juni 2020",
"04" : "7 Juli 2020",
"05" : "14 Juli 2020",
"06" : "21 Juli 2020",
"07" : "28 Juli 2020",
"08" : "4 Agustus 2020",
"09" : "11 Agustus 2020",
"10" : "18 Agustus 2020",
"11" : "25 Agustus 2020",
"12" : "1 September 2020",
"13" : "8 September 2020",
"14" : "15 September 2020",
"15" : "22 September 2020",
"16" : "29 September 2020",
"17" : "6 Oktober 2020",
"18" : "13 Oktober 2020",
"19" : "20 Oktober 2020",
"20" : "27 Oktober 2020"
};
console.log(descOnAirDate);



// =======================
// JUDUL SKITS A
// =======================

const descSkitsA = {
"01" : "「キャプテンユリ」",
"02" : "「オーディション」",
"03" : "「麗しのレイランド様」～コンビニ編～",
"04" : "「キャプテンユリ」 第2話",
"05" : "「天使と悪魔」",
"06" : "「保険ポリスは許さない」",
"07" : "「第8世代オーディション」",
"08" : "「ホワイトエンジェルの災難」",
"09" : "「潜入!アイドル道場」",
"10" : "「キャプテンユリ」 第3話",
"11" : "「スーパーセレブお嬢様・早小路セイラ」",
"12" : "「メンタルリストAYAME」 第2話",
"13" : "「麗しのレイランド様」",
"14" : "「かつ家」",
"15" : "「キュンキュン病棟24時」",
"16" : "「モーリーズエンジェル」",
"17" : "「陰キャアイドル・刹那少女」",
"18" : "「恋愛シスターさくら」",
"19" : "「まゆたんは愛されたい」 第3話",
"20" : "第1回ノギスキキャラデミー賞"
};
console.log(descSkitsA);

// =======================
// JUDUL SKITS B
// =======================

const descSkitsB = {
"01" : "「まゆたんは愛されたい」",
"02" : "「FUWANちゃん」",
"03" : "「週刊スキッツ編集部」",
"04" : "「メンタルリストAYAME」",
"05" : "「やんちゃなやんちゃん」",
"06" : "「まいどCAFE」",
"07" : "「スマイルガールズ」",
"08" : "「やんちゃなやんちゃん」 第2話",
"09" : "「まゆたんは愛されたい」",
"10" : "「ギャルの恩返し」",
"11" : "「保険ポリスは許さない」 第2話",
"12" : "「やんちゃなやんちゃん」 第3話",
"13" : "「妄想少女かっきー」",
"14" : "「FUWANちゃん」 第2話",
"15" : "「スマイルガールズ」 第2話",
"16" : "「キュンキュン病棟24時」 第2話",
"17" : "「やんちゃなやんちゃん」 第4話",
"18" : "「保険ポリスは許さない」 第3話",
"19" : "「かつ家」 第2話",
"20" : ""
};
console.log(descSkitsB);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================


const memberParticipate = {
"01" : "(1) 掛橋沙耶香、北川悠理、柴田柚菜、清宮レイ、田村真佑、筒井あやめ、矢久保美緒 (2) 田村真佑",
"02" : "(1) 遠藤さくら、賀喜遥香、掛橋沙耶香、金川紗耶、清宮レイ、田村真佑、筒井あやめ、早川聖来 (2) 柴田柚菜、田村真佑、矢久保美緒",
"03" : "(1) 清宮レイ、筒井あやめ、早川聖来  (2) 賀喜遥香、金川紗耶、柴田柚菜、田村真佑、早川聖来",
"04" : "(1) 掛橋沙耶香、北川悠理、黒見明香、佐藤璃果、柴田柚菜、清宮レイ、田村真佑、筒井あやめ、林瑠奈、松尾美佑、矢久保美緒、弓木奈於 (2) 掛橋沙耶香、北川悠理、柴田柚菜、清宮レイ、田村真佑、筒井あやめ、矢久保美緒",
"05" : "(1) 遠藤さくら、金川紗耶、筒井あやめ、早川聖来 (2) 賀喜遥香、金川紗耶",
"06" : "(1) 掛橋沙耶香、清宮レイ (2) 賀喜遥香、早川聖来",
"07" : "(1) 遠藤さくら、掛橋沙耶香、北川悠理、田村真佑、林瑠奈、弓木奈於 (2) 柴田柚菜、清宮レイ、早川聖来",
"08" : "(1) 遠藤さくら、佐藤璃果、北川悠理、筒井あやめ (2) 賀喜遥香、金川紗耶",
"09" : "(1) 金川紗耶、黒見明香、清宮レイ、田村真佑、林瑠奈、松尾美佑、矢久保美緒 (2) 田村真佑",
"10" : "(1) 遠藤さくら、掛橋沙耶香、北川悠理、柴田柚菜、清宮レイ、田村真佑、筒井あやめ、矢久保美緒 (2) 筒井あやめ、早川聖来",
"11" : "(1) 佐藤璃果、筒井あやめ、早川聖来 (2) 掛橋沙耶香、清宮レイ、田村真佑",
"12" : "(1) 遠藤さくら、賀喜遥香、金川紗耶、黒見明香、佐藤璃果、筒井あやめ、松尾美佑、弓木奈於 (2) 賀喜遥香、金川紗耶、早川聖来",
"13" : "(1) 遠藤さくら、賀喜遥香、清宮レイ、林瑠奈 (2) 賀喜遥香、黒見明香、筒井あやめ",
"14" : "(1) 掛橋沙耶香、北川悠理、佐藤璃果、林瑠奈、弓木奈於 (2) 遠藤さくら、金川紗耶、筒井あやめ、矢久保美緒",
"15" : "(1) 遠藤さくら、佐藤璃果、清宮レイ、田村真佑、矢久保美緒、松尾美佑 (2) 柴田柚菜、清宮レイ、早川聖来、林瑠奈、松尾美佑",
"16" : "(1) 掛橋沙耶香、金川紗耶、清宮レイ、田村真佑、弓木奈於 (2) 遠藤さくら、佐藤璃果、清宮レイ、田村真佑、矢久保美緒、松尾美佑",
"17" : "(1) 早川聖来、林瑠奈、弓木奈於 (2) 賀喜遥香、金川紗耶、田村真佑",
"18" : "(1) 遠藤さくら、柴田柚菜、早川聖来 (2) 掛橋沙耶香、佐藤璃果、清宮レイ、松尾美佑、弓木奈於",
"19" : "(1) 北川悠理、田村真佑、林瑠奈 (2) 賀喜遥香、黒見明香、佐藤璃果、柴田柚菜、清宮レイ、筒井あやめ",
"20" : "乃木坂46 4期生"
};
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiskits/nogskits-act1-${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiskits/nogskits-act1-${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiskits/nogskits-act1-${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiskits/nogskits-act1-${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiskits/nogskits-act1-${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/c4nqcWDy",
	"02" : "https://lokerwfh.net/BUgDSfb",
	"03" : "https://lokerwfh.net/yCU9wq",
	"04" : "https://lokerwfh.net/kdDd",
	"05" : "https://lokerwfh.net/26Qv",
	"06" : "https://lokerwfh.net/4xhl",
	"07" : "https://lokerwfh.net/bImZE",
	"08" : "https://lokerwfh.net/2FavjBCv",
	"09" : "https://lokerwfh.net/y802ynP",
	"10" : "https://lokerwfh.net/hZ4sJw",
	"11" : "https://lokerwfh.net/fa5Z2JYM",
	"12" : "https://lokerwfh.net/QseO",
	"13" : "https://lokerwfh.net/O3k3t",
	"14" : "https://lokerwfh.net/8YMm",
	"15" : "https://lokerwfh.net/LDfp",
	"16" : "https://lokerwfh.net/mnhl",
	"17" : "https://lokerwfh.net/PWPOw8",
	"18" : "https://lokerwfh.net/yl29",
	"19" : "https://lokerwfh.net/0FuUEIC7",
	"20" : "https://lokerwfh.net/ZyTDDmNl"
};
console.log(linkHardsub);


// =======================
// LINK SOFTSUB
// =======================

const linkSoftsub = {
	"01" : "https://lokerwfh.net/V2nIzfe",
	"02" : "https://lokerwfh.net/YIpe7fjn",
	"03" : "https://lokerwfh.net/zYMOQO",
	"04" : "https://lokerwfh.net/kifXb",
	"05" : "https://lokerwfh.net/sgPa",
	"06" : "https://lokerwfh.net/M3YxBV1",
	"07" : "https://lokerwfh.net/eQzA",
	"08" : "https://lokerwfh.net/EtofPTMK",
	"09" : "https://lokerwfh.net/vIE4daX",
	"10" : "https://lokerwfh.net/tI7Iy",
	"11" : "https://lokerwfh.net/xgOeYE",
	"12" : "https://lokerwfh.net/dvWJHj",
	"13" : "https://lokerwfh.net/lwjeusB",
	"14" : "https://lokerwfh.net/ITgL",
	"15" : "https://lokerwfh.net/bCva",
	"16" : "https://lokerwfh.net/GcWPbW",
	"17" : "https://lokerwfh.net/1rLeh",
	"18" : "https://lokerwfh.net/QDplNRcQ",
	"19" : "https://lokerwfh.net/RK1b",
	"20" : "https://lokerwfh.net/dq6hZU"
};
console.log(linkSoftsub);

// =======================
// LINK TRAKTEER
// =======================

// hulu ver
const linkTrakteerA = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteerA[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/batch-softsub-nogizaka-skits-act1-IfYaZ";
}
console.log(linkTrakteerA);

// machisowakan ver
const linkTrakteerB = {
"01" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-Dc8iF",
"02" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-Dc8iF",
"03" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-Dc8iF",
"04" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-Dc8iF",
"05" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-Dc8iF",
"06" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep06-10-y2gGM",
"07" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep06-10-y2gGM",
"08" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep06-10-y2gGM",
"09" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep06-10-y2gGM",
"10" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep06-10-y2gGM",
"11" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep11-15-q5XC6",
"12" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep11-15-q5XC6",
"13" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep11-15-q5XC6",
"14" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep11-15-q5XC6",
"15" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep11-15-q5XC6",
"16" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep16-5N1VY",
"17" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep17-hip3V",
"18" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep18-1F9ft",
"19" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep19-iOesr",
"20" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-1-ep20-X7I8X",
};
console.log(linkTrakteerB);

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
  linkRAW[i.toString().padStart(2, '0')] = "https://misaka46.blogspot.com/search/label/Nogizaka%20Skits";
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

