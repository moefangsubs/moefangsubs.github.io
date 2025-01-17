
// =======================
// NAMA ACARA
// =======================


const nameShow = {
	"01" : "乃木坂46「Live In Hong Kong」",
	"02" : "乃木坂46「Live In Hong Kong」",
	"03" : "乃木坂46「Live In Hong Kong」",
	"04" : "乃木坂46「Live In Hong Kong」"

};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Bonus Type A - Live in Hong Kong",
	"02" : "| Bonus Type B - Live in Hong Kong",
	"03" : "| Bonus Type C - Live in Hong Kong",
	"04" : "| Bonus Type D - Live in Hong Kong"
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {};
for (let i = 1; i <= 9999; i++) {
  descOnAirDate[i.toString().padStart(2, '0')] = "11 Desember 2024";
}
console.log(descOnAirDate);

// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "乃木坂46";
}
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus37th/liveinhongkong-a.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus37th/liveinhongkong-b.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus37th/liveinhongkong-c.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus37th/liveinhongkong-d.jpg"
};
console.log(imageThumbBig);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://sfl.gl/2Qp3a",
	"02" : "https://sfl.gl/gM0dwo",
	"03" : "https://sfl.gl/2cnDmnL",
	"04" : "https://sfl.gl/5cYDvS"
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka46-37th-bonus-live-in-hong-kong-ocfm2";
};
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "Hongkong!Daai6Gaa1Hou2!";
};
console.log(filePassword);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);