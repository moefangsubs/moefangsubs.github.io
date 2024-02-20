
// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木恋・グッバイアンサンブル";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Episode 1",
	"02" : "| Episode 2",
	"03" : "| Episode 3",

};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "31 Maret - 10 April 2020",
	"02" : "31 Maret - 10 April 2020",
	"03" : "31 Maret - 10 April 2020",

  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "白石麻衣、秋元真夏",
	"02" : "白石麻衣、高山一実",
	"03" : "白石麻衣、松村沙友里",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-goodbye.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-goodbye.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-goodbye.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-goodbye-1a.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-goodbye-2a.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-goodbye-3a.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-goodbye-1b.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-goodbye-2b.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-goodbye-3b.jpg",

};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-goodbye-1c.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-goodbye-2c.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-goodbye-3c.jpg",
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
	"01" : "https://lokerwfh.net/V5WJ2",
	"02" : "https://lokerwfh.net/ukbEUTO",
	"03" : "https://lokerwfh.net/Ebvus1i3",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogikoi-goodbye-ensemble-TMcyc";
}
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 9999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "nogikoigoodbye";
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