
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Dalam rilisan ini kita melihat penampilan pertama di layar televisi, lagu kelulusannya Ikuta Erika berjudul \"Saigo no Tight Hug\" dalam BEST HITS 2021 pada tanggal 11 November 2021.",
"02" : "Dalam rilisan ini kita melihat penampilan pertama di layar televisi, single kelulusannya Saito Asuka berjudul \"Koko ni wa nai mono\" dalam BEST HITS 2022 pada tanggal 10 November 2022. Sama seperti tahun sebelumnya dimana Ikuchan tampil membawakan lagu kelulusannya disini. ",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {
"01" : "BEST HITS 2021",
"02" : "BEST HITS 2022",
};
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| BEST HITS 2021 \"Saigo no Tight Hug\"",
"02" : "| BEST HITS 2022 \"Koko ni wa nai mono\"",

};
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "11 November 2021",
"02" : "10 November 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "乃木坂46";
}
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/211111-best-hits-a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/221110-best-hits.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/211111-best-hits-b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/221110-best-hits-a.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/211111-best-hits-c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/221110-best-hits-b.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/211111-best-hits-d.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/221110-best-hits-c.jpg",
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
"01" : "https://lokerwfh.net/2V0wnr",
"02" : "https://lokerwfh.net/sx2fpZ",
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