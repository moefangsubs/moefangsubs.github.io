
// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木恋・脳内エンジェルズ";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Intro - Saito Asuka",
	"02" : "| Intro - Hoshino Minami",
	"03" : "| Intro - Yamashita Mizuki",
	"04" : "| Intro - Endo Sakura",
	"05" : "| Prologue",
	"06" : "| Episode 1",
	"07" : "| Episode 2",
	"08" : "| Episode 3",
	"09" : "| Episode 4",
	"10" : "| Meeting Part 1",
	"11" : "| Meeting Part 2",
	"12" : "| Meeting Part 3",
	"13" : "| Individual",
	"14" : "| Confession - Saito Asuka",
	"15" : "| Confession - Hoshino Minami",
	"16" : "| Confession - Yamashita Mizuki",
	"17" : "| Confession - Endo Sakura",
	"18" : "| Introduction",
	"19" : "| True End",
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {};
for (let i = 1; i <= 9999; i++) {
  descOnAirDate[i.toString().padStart(2, '0')] = "20 Oktober 2021";
}
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "齋藤飛鳥",
	"02" : "星野みなみ",
	"03" : "山下美月",
	"04" : "遠藤さくら",
	"05" : "齋藤飛鳥、星野みなみ、山下美月、遠藤さくら",
	"06" : "齋藤飛鳥、星野みなみ、山下美月、遠藤さくら",
	"07" : "齋藤飛鳥、星野みなみ、山下美月、遠藤さくら",
	"08" : "齋藤飛鳥、星野みなみ、山下美月、遠藤さくら",
	"09" : "齋藤飛鳥、星野みなみ、山下美月、遠藤さくら",
	"10" : "齋藤飛鳥、星野みなみ、山下美月、遠藤さくら",
	"11" : "齋藤飛鳥、星野みなみ、山下美月、遠藤さくら",
	"12" : "齋藤飛鳥、星野みなみ、山下美月、遠藤さくら",
	"13" : "齋藤飛鳥、星野みなみ、山下美月、遠藤さくら",
	"14" : "齋藤飛鳥",
	"15" : "星野みなみ",
	"16" : "山下美月",
	"17" : "遠藤さくら",
	"18" : "齋藤飛鳥、星野みなみ、山下美月、遠藤さくら",
	"19" : "齋藤飛鳥、星野みなみ、山下美月、遠藤さくら",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangels-intro-asuka.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangels-intro-minami.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangels-intro-yamashita.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangels-intro-endo.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangels-prologue.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-01.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-02.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-03.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-04.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-meeting1.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-meeting2.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-meeting3.jpg",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-individual.jpg",
	"14" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-confess1.jpg",
	"15" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-confess2.jpg",
	"16" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-confess3.jpg",
	"17" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-confess4.jpg",
	"18" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-intend-introduction.jpg",
	"19" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-intend-end.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "doc/blank.png",
	"02" : "doc/blank.png",
	"03" : "doc/blank.png",
	"04" : "doc/blank.png",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangels-prologue1.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-01a.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-02a.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-03a.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-04a.jpg",
	"10" : "doc/blank.png",
	"11" : "doc/blank.png",
	"12" : "doc/blank.png",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-individual1.jpg",
	"14" : "doc/blank.png",
	"15" : "doc/blank.png",
	"16" : "doc/blank.png",
	"17" : "doc/blank.png",
	"18" : "doc/blank.png",
	"19" : "doc/blank.png",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "doc/blank.png",
	"02" : "doc/blank.png",
	"03" : "doc/blank.png",
	"04" : "doc/blank.png",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangels-prologue2.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-01b.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-02b.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-03b.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-04b.jpg",
	"10" : "doc/blank.png",
	"11" : "doc/blank.png",
	"12" : "doc/blank.png",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-individual2.jpg",
	"14" : "doc/blank.png",
	"15" : "doc/blank.png",
	"16" : "doc/blank.png",
	"17" : "doc/blank.png",
	"18" : "doc/blank.png",
	"19" : "doc/blank.png",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "doc/blank.png",
	"02" : "doc/blank.png",
	"03" : "doc/blank.png",
	"04" : "doc/blank.png",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangels-prologue3.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-01c.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-02c.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-03c.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-04c.jpg",
	"10" : "doc/blank.png",
	"11" : "doc/blank.png",
	"12" : "doc/blank.png",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-individual3.jpg",
	"14" : "doc/blank.png",
	"15" : "doc/blank.png",
	"16" : "doc/blank.png",
	"17" : "doc/blank.png",
	"18" : "doc/blank.png",
	"19" : "doc/blank.png",
};
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {
	"01" : "doc/blank.png",
	"02" : "doc/blank.png",
	"03" : "doc/blank.png",
	"04" : "doc/blank.png",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangels-prologue4.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-01d.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-02d.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-03d.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-04d.jpg",
	"10" : "doc/blank.png",
	"11" : "doc/blank.png",
	"12" : "doc/blank.png",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-10-nounaiangles-individual4.jpg",
	"14" : "doc/blank.png",
	"15" : "doc/blank.png",
	"16" : "doc/blank.png",
	"17" : "doc/blank.png",
	"18" : "doc/blank.png",
	"19" : "doc/blank.png",
};
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/Nb9ajB",
	"02" : "https://lokerwfh.net/81xc56",
	"03" : "https://lokerwfh.net/ounc",
	"04" : "https://lokerwfh.net/HqP38H5",
	"05" : "https://lokerwfh.net/VGqDL",
	"06" : "https://lokerwfh.net/nssiY0",
	"07" : "https://lokerwfh.net/bh0S",
	"08" : "https://lokerwfh.net/JNKhGB",
	"09" : "https://lokerwfh.net/4MXVGhl",
	"10" : "https://lokerwfh.net/0co1jEw",
	"11" : "https://lokerwfh.net/iO6X5ZU",
	"12" : "https://lokerwfh.net/XNSt",
	"13" : "https://lokerwfh.net/P0UltBL4",
	"14" : "https://lokerwfh.net/8VGv",
	"15" : "https://lokerwfh.net/oailK1",
	"16" : "https://lokerwfh.net/fjB7v0h",
	"17" : "https://lokerwfh.net/qftIxjM",
	"18" : "https://lokerwfh.net/XiBW5eMe",
	"19" : "https://lokerwfh.net/L0Ye930",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogikoi-nounai-angels-QA0M7";
}
console.log(linkTrakteer);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);