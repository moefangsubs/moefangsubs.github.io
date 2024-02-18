
// =======================
// NAMA ACARA
// =======================


const nameShow = {
	"01" : "乃木坂46「真夏の全国ツアー2023」＠沖縄アリーナ公演",
	"02" : "乃木坂46「真夏の全国ツアー2023」＠沖縄アリーナ公演",
	"03" : "乃木坂46「真夏の全国ツアー2023」＠沖縄アリーナ公演",
	"04" : "乃木坂46「真夏の全国ツアー2023」＠沖縄アリーナ公演",
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Bonus Type A - Manatsu no Zenkoku Tour 2023 @ Okinawa Live Selection",
	"02" : "| Bonus Type B - Manatsu no Zenkoku Tour 2023 @ Okinawa Live Selection",
	"03" : "| Bonus Type C - Manatsu no Zenkoku Tour 2023 @ Okinawa Live Selection",
	"04" : "| Bonus Type D - Manatsu no Zenkoku Tour 2023 @ Okinawa Live Selection",
};

console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "6 Desember 2023",
	"02" : "6 Desember 2023",
	"03" : "6 Desember 2023",
	"04" : "6 Desember 2023",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "乃木坂46",
	"02" : "乃木坂46",
	"03" : "乃木坂46",
	"04" : "乃木坂46",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-a.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-b.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-c.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-d.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-a1.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-b1.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-c1.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-d1.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-a2.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-b2.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-c2.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-d2.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-a4.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-b4.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-c4.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus34th/34zenkoku23-d4.jpg",

};

const imageThumbX = {
	...imageThumbC,
};
console.log(imageThumbX);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/2e0JbliT",
	"02" : "https://lokerwfh.net/uGDQGZCu",
	"03" : "https://lokerwfh.net/tSk0W",
	"04" : "https://lokerwfh.net/JdDGDmu",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
	"01" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-34th-single-bonus-manatsu-no-zenkoku-tour-2023-at-okinawa-performance-ZJ9SQ",
	"02" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-34th-single-bonus-manatsu-no-zenkoku-tour-2023-at-okinawa-performance-ZJ9SQ",
	"03" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-34th-single-bonus-manatsu-no-zenkoku-tour-2023-at-okinawa-performance-ZJ9SQ",
	"04" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-34th-single-bonus-manatsu-no-zenkoku-tour-2023-at-okinawa-performance-ZJ9SQ",
};
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {
	"01" : "nogi34bonusZenkoku",
	"02" : "nogi34bonusZenkoku",
	"03" : "nogi34bonusZenkoku",
	"04" : "nogi34bonusZenkoku",
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