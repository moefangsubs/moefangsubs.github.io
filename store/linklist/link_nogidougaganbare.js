// sumber
// https://nogidoga.com/episodes/1042657236066762754?type=series&id=1007503262674321409

// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Di episode perdana yang spesial ini, Shibata Yuna mencoba tantangan untuk menguasai backflip! Sebagai mantan atlet senam ritmik, Shibata memulai latihan dengan target bisa berhasil dalam waktu singkat. Namun, seiring berjalannya waktu, situasinya mulai tidak berjalan sesuai harapan...",
"02" : "Di episode ke-2 ini, Yumiki Nao menantang dirinya untuk mencoba pantomim! Pertunjukan utamanya dijadwalkan hanya 3 hari lagi. Yumiki mulai berlatih dari dasar, dan akan menampilkan sebuah pertunjukan berbentuk cerita dengan menggunakan lagu-lagu dari Nogizaka46. Akankah hasil latihannya bisa ditampilkan dengan baik...!?",
};
console.log(descEpisodeSynopsis);


// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "がんばれ乃木坂";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {};

for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  descEpisode[paddedNumber] = `| Episode ${i}`;
}
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01": "24 Januari 2025",
	"02": "18 April 2025",
};
console.log(descOnAirDate);

// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01": "柴田柚菜、松尾美佑、林瑠奈(ナレーション)",
	"02": "弓木奈於、吉田綾乃クリスティー、田村真佑、菅原咲月、冨里奈央、賀喜遥香(ナレーション)",
};

console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/ganbare/ganbare${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/ganbare/ganbare${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/ganbare/ganbare${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/ganbare/ganbare${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/ganbare/ganbare${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://sfl.gl/K4R3jJ",
};

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/ganbare-nogizaka-Jmp5x";
}
console.log(linkTrakteer);

// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 9999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "Watashi_Marumaru_Chousenshitai";
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
