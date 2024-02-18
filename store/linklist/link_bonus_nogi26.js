
// =======================
// NAMA ACARA
// =======================


const nameShow = {
	"01" : "REIPEN",
	"02" : "青春の天才",
	"03" : "Mio Yakubo's Morning Routine",
	"04" : "なお、失敗ではありません。",
	"05" : "激辛の天才",
	"06" : "激辛の天才",
	"07" : "ラショナレガール",
	"08" : "天才なんて、",
	"09" : "儚さの世界",
	"10" : "いや、マジ天才!",
	"11" : "POSING QUEEN",
	"12" : "あかんたれ Two sissies",
	"13" : "発売延期（仮）（林）",
	"14" : "KICK THE CRAFTY",
	"15" : "みな天才だカーニバル!",
	"16" : "HACKER GIRL",
	"17" : "ワタシの天才ってなに?",
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Bonus Type A - PV Seimiya Rei",
	"02" : "| Bonus Type A - PV Tsutsui Ayame",
	"03" : "| Bonus Type A - PV Yakubo Mio",
	"04" : "| Bonus Type A - PV Yumiki Nao",
	"05" : "| Bonus Type B - PV Kaki Haruka Part 1",
	"06" : "| Bonus Type B - PV Kaki Haruka Part 2",
	"07" : "| Bonus Type B - PV Kitagawa Yuri",
	"08" : "| Bonus Type B - PV Kuromi Haruka",
	"09" : "| Bonus Type B - PV Matsuo Miyu",
	"10" : "| Bonus Type C - PV Endo Sakura",
	"11" : "| Bonus Type C - PV Shibata Yuna",
	"12" : "| Bonus Type C - PV Hayakawa Seira",
	"13" : "| Bonus Type C - PV Hayashi Runa",
	"14" : "| Bonus Type D - PV Kakehashi Sayaka",
	"15" : "| Bonus Type D - PV Kanagawa Saya",
	"16" : "| Bonus Type D - PV Sato Rika",
	"17" : "| Bonus Type D - PV Tamura Mayu",
};
console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate= {};
for (let i = 1; i <= 9999; i++) {
  descOnAirDate[i.toString().padStart(2, '0')] = "27 Januari 2021";
}
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "清宮レイ",
	"02" : "筒井あやめ",
	"03" : "矢久保美緒",
	"04" : "弓木奈於",
	"05" : "賀喜遥香",
	"06" : "賀喜遥香",
	"07" : "北川悠理",
	"08" : "黒見明香",
	"09" : "松尾美佑",
	"10" : "遠藤さくら",
	"11" : "柴田柚菜",
	"12" : "早川聖来",
	"13" : "林瑠奈",
	"14" : "掛橋沙耶香",
	"15" : "金川紗耶",
	"16" : "佐藤璃果",
	"17" : "田村真佑",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-rei-00.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-ayame-00.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-yakubo-00.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-yumiki-00.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kaki-00.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kaki-00.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kitagawa-00.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kuromi-00.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-miyu-00.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-endo-00.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-yuna-00.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-seira-00.jpg",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-runa-00.jpg",
	"14" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kakehashi-00.jpg",
	"15" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kanagawa-00.jpg",
	"16" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-rika-00.jpg",
	"17" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-tamura-00.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-rei-01.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-ayame-01.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-yakubo-01.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-yumiki-01.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kaki-01.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kaki-04.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kitagawa-01.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kuromi-01.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-miyu-01.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-endo-01.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-yuna-01.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-seira-01.jpg",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-runa-01.jpg",
	"14" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kakehashi-01.jpg",
	"15" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kanagawa-01.jpg",
	"16" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-rika-01.jpg",
	"17" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-tamura-01.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-rei-02.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-ayame-02.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-yakubo-02.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-yumiki-02.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kaki-02.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kaki-05.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kitagawa-02.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kuromi-02.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-miyu-02.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-endo-02.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-yuna-02.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-seira-02.jpg",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-runa-02.jpg",
	"14" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kakehashi-02.jpg",
	"15" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kanagawa-02.jpg",
	"16" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-rika-02.jpg",
	"17" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-tamura-02.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-rei-03.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-ayame-03.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-yakubo-03.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-yumiki-03.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kaki-03.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kaki-06.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kitagawa-03.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kuromi-03.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-miyu-03.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-endo-03.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-yuna-03.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-seira-03.jpg",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-runa-03.jpg",
	"14" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kakehashi-03.jpg",
	"15" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-kanagawa-03.jpg",
	"16" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-rika-03.jpg",
	"17" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus26/26pv-tamura-03.jpg",
};

const imageThumbX = {
	...imageThumbC,
};
console.log(imageThumbX);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/c78BDyH",
	"02" : "https://lokerwfh.net/eKkF",
	"03" : "https://lokerwfh.net/ye9B",
	"04" : "https://lokerwfh.net/RAKTa",
	"05" : "https://lokerwfh.net/hrYgc3",
	"06" : "https://lokerwfh.net/QiXXiP",
	"07" : "https://lokerwfh.net/YWtGpiNK",
	"08" : "https://lokerwfh.net/0tfnOI",
	"09" : "https://lokerwfh.net/1SbI0qkp",
	"10" : "https://lokerwfh.net/iZzi",
	"11" : "https://lokerwfh.net/1gDR",
	"12" : "https://lokerwfh.net/noTbdUG",
	"13" : "https://lokerwfh.net/icoRqA",
	"14" : "https://lokerwfh.net/yfev4d",
	"15" : "https://lokerwfh.net/z0tfqtX",
	"16" : "https://lokerwfh.net/ICIAPZR6",
	"17" : "https://lokerwfh.net/UiuoOnjY",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/batch-nogizaka46-26th-bonus-individual-pv-on-progress-nJoRU";
}
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 9999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "26bokusukiPVgen4";
}

console.log(filePassword);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);