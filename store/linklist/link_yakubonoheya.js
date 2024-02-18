
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"03" : "Di episode 3, dengan kedatangan member gen-4 Kaki Haruka mereka akan berbincang dan mengadakan kuis seputar Nogizaka Fractal.",
	"04" : "Di episode 4, Yakubo akan menyelinap ke tempat syuting member gen-5 yang sedang melakukan proses pemotretan dan rekaman untuk Nogifra.",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木フラ presents 矢久保の部屋";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"03" : "| Episode 3",
	"04" : "| Episode 4",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"03" : "26 Juli 2022",
	"04" : "19 Agustus 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"03" : "矢久保美緒、賀喜遥香",
	"04" : "矢久保美緒、菅原咲月、井上和、池田瑛紗、中西アルノ、小川彩、冨里奈央、一ノ瀬美空",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubonoheya3.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubonoheya4.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubonoheya3a.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubonoheya4a.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubonoheya3b.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubonoheya4b.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubonoheya3c.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubonoheya4c.jpg",
};

const imageThumbX = {
	...imageThumbC,
};
console.log(imageThumbX);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"03" : "https://lokerwfh.net/M0EoZQnw",
	"04" : "https://lokerwfh.net/lwjJH4w",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
	"03" : "https://trakteer.id/moefangsubs/showcase/yakubo-no-heya-3-yakubo-mio-kaki-haruka-YW6MS",
	"04" : "https://trakteer.id/moefangsubs/showcase/yakubo-no-heya-4-yakubo-mio-gen-5-LV8dM",
};
console.log(linkTrakteer);


// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);