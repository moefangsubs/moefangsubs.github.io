
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"19" : "Episode 19 kali ini adalah bagian pertama dimana Iwamoto Renka & Mukai Hazuki pergi ke Hokkaido untuk menemui petani yang menggunakan AI sebagai alat bantunya dalam pertanian. Seperti apakah itu?",
	"20" : "Episode 20 kali ini adalah bagian kedua dimana Iwamoto Renka & Mukai Hazuki pergi ke Hokkaido untuk menemui petani yang menggunakan AI sebagai alat bantunya dalam pertanian. Seperti apakah itu?",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂46と一緒に、国消国産を学ぼう！";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"19" : "| Episode 19 前編",
	"20" : "| Episode 20 後編",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"19" : "30 November 2022",
	"20" : "9 Desember 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"19" : "岩本蓮加、向井葉月",
	"20" : "岩本蓮加、向井葉月",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"19" : "https://ik.imagekit.io/mLsKqNSuB/post/kokushokokusan/kokusho19.jpg",
	"20" : "https://ik.imagekit.io/mLsKqNSuB/post/kokushokokusan/kokusho20.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"19" : "https://ik.imagekit.io/mLsKqNSuB/post/kokushokokusan/kokusho19a.jpg",
	"20" : "https://ik.imagekit.io/mLsKqNSuB/post/kokushokokusan/kokusho20a.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"19" : "https://ik.imagekit.io/mLsKqNSuB/post/kokushokokusan/kokusho19b.jpg",
	"20" : "https://ik.imagekit.io/mLsKqNSuB/post/kokushokokusan/kokusho20b.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"19" : "https://ik.imagekit.io/mLsKqNSuB/post/kokushokokusan/kokusho19c.jpg",
	"20" : "https://ik.imagekit.io/mLsKqNSuB/post/kokushokokusan/kokusho20c.jpg",
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
	"19" : "https://lokerwfh.net/RHdFWwa2",
	"20" : "https://lokerwfh.net/5o7kcnkN",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
	"19" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-to-isshoni-kokushokokusan-o-manabou-pJAK4",
	"20" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-to-isshoni-kokushokokusan-o-manabou-pJAK4",
};
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {
	"19" : "kokusho19-mukairenka",
	"20" : "kokusho20-mukairenka",
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