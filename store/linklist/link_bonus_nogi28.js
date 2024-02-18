
// =======================
// NAMA ACARA
// =======================


const nameShow = {
	"01" : "Documentary of Ranze Terada",
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Bonus Type A - Dokumenter Terada Ranze",
};
console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "22 September 2021",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "寺田蘭世",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus28/28-doc-ranze.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus28/28-doc-ranze-a.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus28/28-doc-ranze-b.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus28/28-doc-ranze-c.jpg",
};

const imageThumbX = {
	...imageThumbC,
};
console.log(imageThumbX);


// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus28/28-doc-ranze-d.jpg",
};
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/WSupkSG",
  };
console.log(linkHardsub);

// =======================
// LINK HARDSUB
// =======================

const linkRAW = {
	"01" : "https://chr0balord46.blogspot.com/2021/09/documentary-documentary-of-terada-ranze.html",
  };
console.log(linkRAW);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
	"01" : "https://trakteer.id/moefangsubs/showcase/28th-single-bonus-documentary-of-terada-ranze-mMVJH",
};
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {
	"01" : "ranran",
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