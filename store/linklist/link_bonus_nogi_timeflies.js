
// =======================
// NAMA ACARA
// =======================


const nameShow = {
	"01" : "\"10th Anniversary \"Documentary Movie「10年の歩み」",
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| 10th Anniversary Documantary Movie - 10nen no Ayumi",
};
console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "15 Desember 2021",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "乃木坂46",
  };
console.log(memberParticipate);



// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus-album-timeflies/10nenayumi.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus-album-timeflies/10nenayumi-1.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus-album-timeflies/10nenayumi-2.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus-album-timeflies/10nenayumi-3.jpg",
};

const imageThumbX = {
	...imageThumbC,
};
console.log(imageThumbX);


// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus-album-timeflies/10nenayumi-4.jpg",
};
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/oMBYj8lR",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
	"01" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-10nen-no-ayumi-hardsub-softsub-z50gh",
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