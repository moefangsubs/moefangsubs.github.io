// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木恋・演じるガールズ";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Episode 1",
	"02" : "| Episode 2",
	"03" : "| Episode 3",
	"04" : "| Individual - Endo Sakura",
	"05" : "| Individual - Kaki Haruka",
	"06" : "| Individual - Tsutsui Ayame",
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "7 November 2019",
	"02" : "10 November 2019",
	"03" : "13 November 2019",
	"04" : "10 November 2019",
	"05" : "10 November 2019",
	"06" : "10 November 2019",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "遠藤さくら、賀喜遥香、筒井あやめ",
	"02" : "遠藤さくら、賀喜遥香、筒井あやめ",
	"03" : "遠藤さくら、賀喜遥香、筒井あやめ",
	"04" : "遠藤さくら",
	"05" : "賀喜遥香",
	"06" : "筒井あやめ",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-01.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-02.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-03.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-pv1.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-pv2.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-pv3.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-01a.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-02a.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-03a.jpg",
	"04" : "doc/blank.png",
	"05" : "doc/blank.png",
	"06" : "doc/blank.png",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-01b.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-02b.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-03b.jpg",
	"04" : "doc/blank.png",
	"05" : "doc/blank.png",
	"06" : "doc/blank.png",

};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-01c.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-02c.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-07-enjirugirls-03c.jpg",
	"04" : "doc/blank.png",
	"05" : "doc/blank.png",
	"06" : "doc/blank.png",
};
console.log(imageThumbC);

const imageThumbX = {
	...imageThumbC,
};
console.log(imageThumbX);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/Uc3hIByc",
	"02" : "https://lokerwfh.net/YDjvV",
	"03" : "https://lokerwfh.net/8cfqA7",
	"04" : "https://lokerwfh.net/3H54eKl",
	"05" : "https://lokerwfh.net/kwCAQY",
	"06" : "https://lokerwfh.net/jLQs7n",
  };
console.log(linkHardsub);

// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 9999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "nogikoienjiru";
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