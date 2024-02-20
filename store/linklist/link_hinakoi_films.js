// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "ひな恋・君と僕の、ひなたの初恋";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Episode 1",
	"02" : "| Episode 2",
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {};
for (let i = 1; i <= 9999; i++) {
  descOnAirDate[i.toString().padStart(2, '0')] = "15 November 2021";
}
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "高本彩花、影山優佳、松田好花、富田鈴花、河田陽菜、宮田愛萌";
}
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hinakoi/hinakoi-bunkasai.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hinakoi/hinakoi-bunkasai.jpg",

};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hinakoi/hinakoi-bunkasai-01a.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hinakoi/hinakoi-bunkasai-02a.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hinakoi/hinakoi-bunkasai-01b.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hinakoi/hinakoi-bunkasai-02b.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hinakoi/hinakoi-bunkasai-01c.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hinakoi/hinakoi-bunkasai-02c.jpg",
};
console.log(imageThumbC);

const imageThumbX = {
	...imageThumbC,
};
console.log(imageThumbX);


// =======================
// IMAGE THUMBNAIL D
// =======================


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/L7Go1T",
	"02" : "https://lokerwfh.net/87ytZAH",
  };
console.log(linkHardsub);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);