
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
  nameShow[i.toString().padStart(2, '0')] = "ノギザカスキッツ ACT 2";
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
	"01" : "10 November 2020",
	"02" : "17 November 2020",
	"03" : "24 November 2020",
	"04" : "1 Desember 2020",
	"05" : "8 Desember 2020",
	"06" : "15 Desember 2020",
	"07" : "22 Desember 2020",
	"08" : "5 Januari 2021",
	"09" : "12 Januari 2021",
	"10" : "19 Januari 2021",
	"11" : "26 Januari 2021",
	"12" : "2 Februari 2021",
	"13" : "16 Februari 2021",
	"14" : "23 Februari 2021",
	"15" : "2 Maret 2021",
	"16" : "9 Maret 2021",
	"17" : "16 Maret 2021",
	"18" : "23 Maret 2021",
	"19" : "30 Maret 2021",
	"20" : "6 April 2021"
};
console.log(descOnAirDate);



// =======================
// JUDUL SKITS A
// =======================

const descSkitsA = {
	"01" : "「三姫学園生徒会へようこそ!」",
	"02" : "「ノギザカプラス」",
	"03" : "「スマイルガールズ」 第3話",
	"04" : "「三姫学園生徒会へようこそ!」 第2話",
	"05" : "「恋のSHIO'S CASINO」",
	"06" : "「照負倶楽部」",
	"07" : "「恋の火消し隊」",
	"08" : "「ポジティブネゴシエーター・」",
	"09" : "「ザ･スキッツテン」",
	"10" : "「元祖かつ家」",
	"11" : "「ユーチューバー・スト子」",
	"12" : "「恋のSHIO'S CASINO」",
	"13" : "「恋愛シスター」 第2話",
	"14" : "「高嶺のさま」",
	"15" : "「キャプテンユリ」 第4話",
	"16" : "「マサラ転校生タマーミ」",
	"17" : "「ギャルーズ☆ウォーズ」",
	"18" : "「インサイド・ユリヘッド」",
	"19" : "「FUWANちゃん」 第3話",
	"20" : "第2回キャラデミー賞"
};
console.log(descSkitsA);

// =======================
// JUDUL SKITS B
// =======================

const descSkitsB = {
	"01" : "「GO!GO!第8世代」",
	"02" : "「しりとれ!HIP CATCH PARTY!」",
	"03" : "「北川教習所」",
	"04" : "「やんちゃなやんちゃん」 第5話",
	"05" : "「やんちゃなやん」ちゃん」 第6話",
	"06" : "「しりとれ!HIP CATCH PARTY」 第2話",
	"07" : "「かつ家」 第3話",
	"08" : "「はぁって言うAI den」",
	"09" : "「スーパーセレブお嬢様・早小路セイラ」 第2話",
	"10" : "「あるあるであそぼ!」",
	"11" : "「保険ポリスは許さない」 第4話",
	"12" : "「あるあるであそぼ!」 第2話",
	"13" : "「まゆたんは愛されたい」 第4話",
	"14" : "「ちゃんが逮捕しちゃうぞ!」",
	"15" : "「あるあるであそぼ!」 第3話",
	"16" : "「カワイイアーミーズ」",
	"17" : "「ザ・スキッツテン」 第2話",
	"18" : "「プリンセスと王子様」",
	"19" : "「NAKAMA NO KOTOBA」",
	"20" : ""
};
console.log(descSkitsB);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================


const memberParticipate = {
	"01" : "(1) 伊藤、岩本、梅澤、久保、阪口、楓、中村、山下、吉田、与田 (2) 遠藤、賀喜、掛橋、柴田、清宮、筒井、早川、弓木、阿佐ヶ谷姉妹",
	"02" : "(1) 梅澤、山下、与田 (2) 梅澤、久保、向井、金川、早川、田村",
	"03" : "(1) 遠藤、柴田、清宮、田村、早川、林、松尾、白鳥久美子 (2) 向井、山下、遠藤、賀喜、北川、矢久保",
	"04" : "(1) 伊藤、岩本、梅澤、大園、久保、阪口、楓、中村、吉田、与田、テツandトモ (2) 賀喜、金川、清宮",
	"05" : "(1) 伊藤、久保、阪口、山下 (2) 賀喜、金川、藤森慎吾",
	"06" : "(1) 伊藤、岩本、梅澤、大園、向井、山下、掛橋、北川、璃果、柴田、早川、藤森慎吾 (2) 岩本、大園、阪口、楓、黒見、田村、筒井、松尾",
	"07" : "(1) 岩本、梅澤、大園、向井 (2) 遠藤、掛橋、田村、筒井、松尾",
	"08" : "(1) 賀喜、黒見、清宮、早川、林 (2) 梅澤、阪口、楓、向井、吉田",
	"09" : "(1) 向井、山下、吉田、北川、黒見、清宮、田村、筒井、弓木 (2) 金川、璃果、田村、柴田、筒井、早川",
	"10" : "(1) 岩本、梅澤、大園、中村、山下、ジャングルポケット (2) 大園、楓、与田、遠藤、賀喜、金川、早川、松尾、矢久保",
	"11" : "(1) 久保、阪口、中村、与田 (2) 掛橋、璃果、清宮、林",
	"12" : "(1) 伊藤、岩本、梅澤、久保、阪口 (2) 大園、阪口、与田、賀喜、黒見、璃果、清宮、早川、矢久保、弓木",
	"13" : "(1) 遠藤、柴田、早川 (2) 久保、田村",
	"14" : "(1) 伊藤、岩本、梅澤、大園、楓、向井、山下、与田 (2) 賀喜、筒井、弓木",
	"15" : "(1) 掛橋、金川、北川、黒見、柴田、清宮、田村、筒井、松尾、矢久保 (2) 大園、阪口、与田、賀喜、黒見、璃果、清宮、早川、矢久保、弓木",
	"16" : "(1) 伊藤、岩本、阪口、向井、与田、金川、松尾 (2) 久保、遠藤、賀喜、柴田、松尾、矢久保",
	"17" : "(1) 岩本、梅澤、阪口、金川、筒井 (2) 楓、中村、掛橋、黒見、璃果、筒井、早川、林、弓木",
	"18" : "(1) 遠藤、賀喜、北川、清宮、松尾 (2) 楓、中村、向井、山下、吉田",
	"19" : "(1) 大園、早川、矢久保、弓木 (2) 岩本、梅澤、久保、楓、向井、賀喜、掛橋、金川、北川、璃果、柴田、清宮、筒井、林、松尾、矢久保",
	"20" : "乃木坂46 3期生・4期生"
};
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiskits/nogizakaskits-act2-${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiskits/nogskits-act2-${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiskits/nogskits-act2-${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiskits/nogskits-act2-${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiskits/nogskits-act2-${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/iiaw3nt",
	"02" : "https://lokerwfh.net/KntWSjC",
	"03" : "https://lokerwfh.net/kOIviR",
	"04" : "https://lokerwfh.net/8amnz",
	"05" : "https://lokerwfh.net/OEJt",
	"06" : "https://lokerwfh.net/oef6p5",
	"07" : "https://lokerwfh.net/IUPekvH",
	"08" : "https://lokerwfh.net/93VhTvtO",
	"09" : "https://lokerwfh.net/JPbmkDh0",
	"10" : "https://lokerwfh.net/seesT",
	"11" : "https://lokerwfh.net/LkJTU",
	"12" : "https://lokerwfh.net/DEwJnMV",
	"13" : "https://lokerwfh.net/tZQj",
	"14" : "https://lokerwfh.net/ZTi1rf",
	"15" : "https://lokerwfh.net/6japD2Sy",
	"16" : "https://lokerwfh.net/RLof",
	"17" : "https://lokerwfh.net/1Y3K1d",
	"18" : "https://lokerwfh.net/CtjwXg3",
	"19" : "https://lokerwfh.net/vNgo",
	"20" : "https://lokerwfh.net/flHFR"
};
console.log(linkHardsub);


// =======================
// LINK SOFTSUB
// =======================

const linkSoftsub = {
	"01" : "https://lokerwfh.net/XCNi5X9",
	"02" : "https://lokerwfh.net/zT92cIOs",
	"03" : "https://lokerwfh.net/5N0UxZcg",
	"04" : "https://lokerwfh.net/6AScrFcZ",
	"05" : "https://lokerwfh.net/sDISiV",
	"06" : "https://lokerwfh.net/7LBgexEu",
	"07" : "https://lokerwfh.net/jfp9u",
	"08" : "https://lokerwfh.net/V0DOpzR",
	"09" : "https://lokerwfh.net/YDZRP",
	"10" : "https://lokerwfh.net/xmXz",
	"11" : "https://lokerwfh.net/AhCxpU",
	"12" : "https://lokerwfh.net/3OzaJbLm",
	"13" : "https://lokerwfh.net/mgTdzB1",
	"14" : "https://lokerwfh.net/BKOyYlil",
	"15" : "https://lokerwfh.net/9J3i",
	"16" : "https://lokerwfh.net/mkF7YZ",
	"17" : "https://lokerwfh.net/DmNa9E1P",
	"18" : "https://lokerwfh.net/B1tM",
	"19" : "https://lokerwfh.net/2i4a1yb",
	"20" : "https://lokerwfh.net/yHrP20h"
};
console.log(linkSoftsub);

// =======================
// LINK TRAKTEER
// =======================

// hulu ver
const linkTrakteerA = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteerA[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/batch-softsub-nogizaka-skits-act2-IYKxX";
}
console.log(linkTrakteerA);

// machisowakan ver
const linkTrakteerB = {
	"01" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep01-05-YtyMl",
	"02" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep02-b7s4L",
	"03" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep03-W0qzK",
	"04" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep04-rh0CB",
	"05" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep05-qrEpy",
	"06" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep06-ZRD75",
	"07" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep07-kMsVl",
	"08" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep08-j6Qwz",
	"09" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep09-rI9kb",
	"10" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep10-Bpmje",
	"11" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep11-aYWIU",
	"12" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep12-JzDhF",
	"13" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep13-wzFig",
	"14" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep14-yj9m7",
	"15" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep15-m95nH",
	"16" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep16-xBoAD",
	"17" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep17-5Q8I9",
	"18" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep18-RpsMS",
	"19" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep19-7dDdM",
	"20" : "https://trakteer.id/moefangsubs/showcase/nogisuki-machisowakan-act-2-ep20-i5HEL"
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

