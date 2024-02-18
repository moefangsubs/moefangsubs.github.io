
// =======================
// NAMA ACARA
// =======================


const nameShow = {
	"03" : "Documentary of 乃木坂46 3期生編",
	"04" : "Documentary of 乃木坂46 4期生編",
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"03" : "| Bonus Type C - Documentary of 3rd Generation",
	"04" : "| Bonus Type D - Documentary of 4th Generation",
};
console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate= {};
for (let i = 1; i <= 9999; i++) {
  descOnAirDate[i.toString().padStart(2, '0')] = "4 September 2019";
}
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"03" : "乃木坂46 3期生",
	"04" : "乃木坂46 4期生",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus24/24doc3ki-0.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus24/24doc4ki-0.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus24/24doc3ki-1.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus24/24doc4ki-1.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus24/24doc3ki-2.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus24/24doc4ki-2.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus24/24doc3ki-3.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus24/24doc4ki-3.jpg",
};

const imageThumbX = {
	...imageThumbC,
};
console.log(imageThumbX);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"03" : "https://lokerwfh.net/hD8Kn",
	"04" : "https://lokerwfh.net/mpJDIi4",
  };
console.log(linkHardsub);

// =======================
// LINK HARDSUB
// =======================

const linkSoftsub = {

  };
console.log(linkSoftsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka46-bonus-24th-single-documentary-3rd-4th-gen-0t7uF";
}
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {
	"03" : "24DocuGen3",
	"04" : "24DocuGen4",
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