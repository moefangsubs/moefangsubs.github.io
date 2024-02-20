// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木恋・夏の声～この声、君に届けたい～";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Movie",
	"02" : "| Individual - Hoshino Minami",
	"03" : "| Individual - Kitano Hinako",
	"04" : "| Individual - Sagara Iori",
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {};
for (let i = 1; i <= 9999; i++) {
  descOnAirDate[i.toString().padStart(2, '0')] = "Juli 2018";
}
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "星野みなみ、北野日奈子、相楽伊織",
	"02" : "星野みなみ",
	"03" : "北野日奈子",
	"04" : "相楽伊織",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-04-konokoe-cm.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-04-konokoe-pv-minami.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-04-konokoe-pv-kitano.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-04-konokoe-pv-sagara.jpg",
};
console.log(imageThumbBig);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/I1Lse1",
	"02" : "https://lokerwfh.net/pCLbuK",
	"03" : "https://lokerwfh.net/C3fVdD",
	"04" : "https://lokerwfh.net/7GcbdJ",
  };
console.log(linkHardsub);

// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 9999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "konokoe";
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