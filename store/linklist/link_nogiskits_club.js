// =======================
// NAMA ACARA
// =======================

const nameShow = {
"01" : "スキッツクラブ「祝！オープン記念コメント【FROM 早川聖来】」",
"02" : "スキッツクラブ「年末のご挨拶【FROM 賀喜遥香】」",
"03" : "スキッツクラブ「」",
};
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| 201228 Hayakawa Seira",
"02" : "| 201231 Kaki Haruka",
"03" : "| 210101 Endo Sakura",
};
console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "28 Desember 2020",
"02" : "31 Desember 2020",
"03" : "1 Januari 2021",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "早川聖来",
"02" : "賀喜遥香",
"03" : "遠藤さくら",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskitsclub-1-seira.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskitsclub-2-kakki.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskitsclub-3-endo.jpg",
  };
console.log(imageThumbBig);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://lokerwfh.net/r4uw",
"02" : "https://lokerwfh.net/1Abne504",
"03" : "https://lokerwfh.net/3IOUsS0R",
  };
console.log(linkHardsub);

// =======================
// FILE PASSWORD
// =======================

const filePassword = {
"01" : "skitsclub",
"02" : "skitsclub",
"03" : "skitsclub",
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