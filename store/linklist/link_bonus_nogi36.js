
// =======================
// NAMA ACARA
// =======================


const nameShow = {
	"01" : "35thシングルアンダーライブ",
	"02" : "35thシングルアンダーライブ",
	"03" : "35thシングルアンダーライブ",
	"04" : "35thシングルアンダーライブ"

};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Bonus Type A - 35th Under Live Selection + Interview",
	"02" : "| Bonus Type B - 35th Under Live Selection + Interview",
	"03" : "| Bonus Type C - 35th Under Live Selection + Interview",
	"04" : "| Bonus Type D - 35th Under Live Selection + Interview"
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {};
for (let i = 1; i <= 9999; i++) {
  descOnAirDate[i.toString().padStart(2, '0')] = "21 Agustus 2024";
}
console.log(descOnAirDate);

// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "35thシングル アンダーメンバー";
}
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus36th/36underlive-a.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus36th/36underlive-b.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus36th/36underlive-c.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus36th/36underlive-d.jpg"
};
console.log(imageThumbBig);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://sfl.gl/FDhK7Oj",
	"02" : "https://sfl.gl/BK6w",
	"03" : "https://sfl.gl/w5cEc",
	"04" : "https://sfl.gl/1K7K"
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka46-36th-bonus-35sg-underlive-WOGbT";
};
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "36Bonus-Underlive";
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