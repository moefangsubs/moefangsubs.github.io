
// =======================
// NAMA ACARA
// =======================


const nameShow = {
	"01" : "乃木坂46 36thSG アンダーライブ／アンダーライブの裏側で Part 1",
	"02" : "乃木坂46 36thSG アンダーライブ／アンダーライブの裏側で Part 2",
	"03" : "乃木坂46 36thSG アンダーライブ／アンダーライブの裏側で Part 3",
	"04" : "乃木坂46 Documentary 「懐かしさの先」"

};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Bonus Type A - 37thSG Under Live & Behind The Scene Part 1",
	"02" : "| Bonus Type B - 37thSG Under Live & Behind The Scene Part 2",
	"03" : "| Bonus Type C - 37thSG Under Live & Behind The Scene Part 3",
	"04" : "| Bonus Type D - Behind The Scene of MV 'Natsukashisa no Saki'"
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {};
for (let i = 1; i <= 9999; i++) {
  descOnAirDate[i.toString().padStart(2, '0')] = "26 Maret 2025";
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
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus38th/37underlive-a.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus38th/37underlive-b.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus38th/37underlive-c.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus38th/natsukashisa-d.jpg"
};
console.log(imageThumbBig);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://sfl.gl/dbsMBrp",
	"02" : "https://sfl.gl/omySV",
	"03" : "https://sfl.gl/hNMANj2L",
	"04" : "https://sfl.gl/mwhIhPoM"
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka46-38th-bonus-amW7w";
};
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "38thBonus-UnderTerakhirHazuki";
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