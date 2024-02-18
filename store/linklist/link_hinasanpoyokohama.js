
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"01" : "Untuk kali ini adalah dari gen-1 yang penanggungjawabnya adalah Sasaki Kumi dan Ushio Sarina.",
	"02" : " Untuk kali ini adalah dari gen-2 yang penanggungjawabnya adalah Kawata Hina dan Tomita Suzuka.",
	"03" : "Untuk kali ini adalah dari gen-3 yang penanggungjawabnya adalah Takahashi Mikuni dan Yamaguchi Haruyo.",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {
	"01" : "ひなさんぽ in 横浜",
	"02" : "ひなさんぽ in 横浜",
	"03" : "ひなさんぽ in 横浜",
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Gen-1",
	"02" : "| Gen-2",
	"03" : "| Gen-3",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "3 April 2023",
	"02" : "3 April 2023",
	"03" : "3 April 2023",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "佐々木久美、潮紗理菜",
	"02" : "河田陽菜、富田鈴花",
	"03" : "髙橋未来虹、山口陽世",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hinasanpoyk/hinasanpoyk1.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hinasanpoyk/hinasanpoyk2.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/hinasanpoyk/hinasanpoyk3.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hinasanpoyk/hinasanpoyk1a.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hinasanpoyk/hinasanpoyk2a.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/hinasanpoyk/hinasanpoyk3a.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hinasanpoyk/hinasanpoyk1b.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hinasanpoyk/hinasanpoyk2b.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/hinasanpoyk/hinasanpoyk3b.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hinasanpoyk/hinasanpoyk1c.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hinasanpoyk/hinasanpoyk2c.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/hinasanpoyk/hinasanpoyk3c.jpg",
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
	"01" : "https://lokerwfh.net/GHUsCj",
	"02" : "https://lokerwfh.net/Vbb8vsi",
	"03" : "https://lokerwfh.net/98vTB",
  };
console.log(linkHardsub);

// =======================
// LINK HARDSUB
// =======================

const linkRAW = {
	"01" : "https://www.hinatazaka46.com/s/official/page/4th-anniversary",
	"02" : "https://www.hinatazaka46.com/s/official/page/4th-anniversary",
	"03" : "https://www.hinatazaka46.com/s/official/page/4th-anniversary",
  };
console.log(linkRAW);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
	"01" : "https://trakteer.id/moefangsubs/showcase/hinasanpo-in-yokohama-96OAU",
	"02" : "https://trakteer.id/moefangsubs/showcase/hinasanpo-in-yokohama-96OAU",
	"03" : "https://trakteer.id/moefangsubs/showcase/hinasanpo-in-yokohama-96OAU",
};
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {
	"01" : "hinasanpo-in-yk-gen1",
	"02" : "hinasanpo-in-yk-gen2",
	"03" : "hinasanpo-in-yk-gen3",
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