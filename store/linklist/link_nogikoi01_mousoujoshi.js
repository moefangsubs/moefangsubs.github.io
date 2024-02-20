// =======================
// NAMA ACARA
// =======================


const nameShow = {
	"01" : "乃木恋・女子、恋を語る。「オープニング」",
	"02" : "乃木恋・女子、恋を語る。「キスの練習グッズ」",
	"03" : "乃木恋・女子、恋を語る。「昨日、あの彼と…」",
	"04" : "乃木恋・女子、恋を語る。「プレゼント」",
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Episode 1 \"Pembukaan\"",
	"02" : "| Episode 2 \"Alat Latihan Ciuman\"",
	"03" : "| Episode 3 \"Kemarin, dengannya...\"",
	"04" : "| Episode 4 \"Hadiah\"",
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "15 Januari 2018",
	"02" : "16 Januari 2018",
	"03" : "17 Januari 2018",
	"04" : "18 Januari 2018",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "齋藤飛鳥、堀未央奈、与田祐希",
	"02" : "齋藤飛鳥、堀未央奈、与田祐希",
	"03" : "齋藤飛鳥、堀未央奈、与田祐希",
	"04" : "齋藤飛鳥、堀未央奈、与田祐希",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-01.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-02.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-03.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-04.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-01a.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-02a.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-03a.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-04a.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-01b.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-02b.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-03b.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-04b.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-01c.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-02c.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-03c.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-01-mousou-joshi-04c.jpg",
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
	"01" : "https://lokerwfh.net/p4XvUyW",
	"02" : "https://lokerwfh.net/2bRJEI",
	"03" : "https://lokerwfh.net/meyRwwcP",
	"04" : "https://lokerwfh.net/UDUkopsm",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/softsub-nogikoi-mousou-shoujo-koi-o-kataru-01-04-px76G";
}
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 9999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "";
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