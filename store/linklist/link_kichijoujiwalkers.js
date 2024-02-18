
// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "吉祥寺ウォーカーズ";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"02" : "| Episode 2",
	"04" : "| Episode 4",
	"08" : "| Episode 8",
	"10" : "| Episode 10",
	"12" : "| Episode 12",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"02" : "18 April 2022",
	"04" : "13 Mei 2022",
	"08" : "30 Mei 2022",
	"10" : "13 Juni 2022",
	"12" : "27 Juni 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "岩本蓮加";
}
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220418-kichijojiwalkers-2.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220503-kichijojiwalkers-4.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220530-kichijojiwalkers-8.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220613-kichijojiwalkers-10.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220627-kichijojiwalkers-12.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220418-kichijojiwalkers-2a.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220503-kichijojiwalkers-4a.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220530-kichijojiwalkers-8a.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220613-kichijojiwalkers-10a.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220627-kichijojiwalkers-12a.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220418-kichijojiwalkers-2b.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220503-kichijojiwalkers-4b.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220530-kichijojiwalkers-8b.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220613-kichijojiwalkers-10b.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220627-kichijojiwalkers-12b.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220418-kichijojiwalkers-2c.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220503-kichijojiwalkers-4c.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220530-kichijojiwalkers-8c.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220613-kichijojiwalkers-10c.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220627-kichijojiwalkers-12c.jpg",
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
	"02" : "https://lokerwfh.net/BAOp6",
	"04" : "https://lokerwfh.net/N9Gqoa7z",
	"08" : "https://lokerwfh.net/bAZay",
	"10" : "https://lokerwfh.net/TrFVb",
	"12" : "https://lokerwfh.net/kJBlBbSN",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/kichijoji-walkers-iwamoto-renka-hardsub-softsub-mOZGa";
}
console.log(linkTrakteer);


// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);