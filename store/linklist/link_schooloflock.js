
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Menggantikan Kawaguchi Haruna sejak 20 April 2015, berlanjut selama satu tahun 10 bulan. Dengan kelulusannya dari Nogizaka46 dan pensiun dari dunia hiburan, hingga di episode 93 ini tanggal 23 Februari 2017 adalah hari terakhirnya sebagai bagian dari School of Locks! (yang mana setelah itu diganti Hirate Yurina)",
"02" : "Di volume 21 ini, Kaki Haruka akan memperkenalkan single baru ke-28 Nogizaka46 berjudul \"Kimi ni Shikarareta\" dimana dia terpilih menjadi center untuk pertama kalinya. Tidak hanya itu, disini dia berbicara bagaimana perasaannya saat terpilih.",
"03" : "Di volume 69 ini, Kaki Haruka akan memutarkan secara full main single yang baru ke-30 Nogizaka46 berjudul \"Suki to iu no wa Rock daze!\" dimana dia kembali terpilih menjadi center untuk kedua kalinya. Disini dia berbicara bagaimana perasaannya saat terpilih. ",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =====================

const nameShow = {
"01" : "GIRLS LOCK!",
"02" : "SCHOOL OF LOCK!",
"03" : "SCHOOL OF LOCK!",
};
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| Girls Lock! Episode 93",
"02" : "| School of Lock! Vol. 21",
"03" : "| School of Lock! Vol. 69",
};
console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "3 Februari 2017",
"02" : "26 Agustus 2021",
"03" : "28 Juli 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "橋本奈々未",
"02" : "賀喜遥香",
"03" : "賀喜遥香",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/moefang/8ce1049f.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/210826-sol-kakki.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220728-sol-kakki.jpg",
  };
console.log(imageThumbBig);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://youtu.be/FbpgemP8B5A",
"02" : "https://drive.google.com/file/d/1_vVnoti-5GjkycEo4a8L-Kj5WHswKWx0/preview",
"03" : "https://drive.google.com/file/d/1T48PKFJsWKCDWk9MYVlHjo_QMzAe7nZ7/view?usp=sharing",
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