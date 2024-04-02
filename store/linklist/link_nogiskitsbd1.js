
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Nogizaka Skits ini adalah bonus dari BluRay/DVD-Box Vol.1 nya yang telah dijual 8 Januari 2021. Di kesempatan kali ini adalah making of dari Nogizaka Skits ACT 1.",
"02" : "Nogizaka Skits ini adalah bonus dari BluRay/DVD-Box Vol.1 nya yang telah dijual 8 Januari 2021. Di kesempatan kali ini adalah NG Scene alias scene gagal dari beberapa skits di ACT 1.",
"03" : "Nogizaka Skits ini adalah bonus dari BluRay/DVD-Box Vol.1 nya yang telah dijual 8 Januari 2021. Di kesempatan kali ini adalah skits versi \"extended\" dari skits Mentallist Ayame bagian pertama.",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {
"01" : "ノギザカスキッツ　メイキング",
"02" : "ノギザカスキッツ　ムチャ振りコント未公開映像「メンタリストAYAME」",
"03" : "ノギザカスキッツ　ムチャ振りコント未公開映像「メンタリストAYAME」",
};
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| Making of Vol. 1",
"02" : "| NG Scene",
"03" : "| Muchaburi Conte : Mentallist Ayame",
};
console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "8 Januari 2021",
"02" : "8 Januari 2021",
"03" : "8 Januari 2021",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "乃木坂46 4期生",
"02" : "乃木坂46 4期生",
"03" : "乃木坂46 4期生",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-makingof-00.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-ngscene-00.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-muchaburiayame-00.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-makingof-01a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-ngscene-01.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-muchaburiayame-01.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================
const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-makingof-01b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-ngscene-02.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-muchaburiayame-02.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================


const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-makingof-01c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-ngscene-03.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-muchaburiayame-03.jpg",
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
"01" : "",
"02" : "https://lokerwfh.net/obU34Y",
"03" : "https://lokerwfh.net/XyT7TT6W",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
"01" : "https://trakteer.id/moefangsubs/showcase/nogizaka-skits-making-of-BRqhI",
"02" : "",
"03" : "",
  };
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {
"01" : "",
"02" : "nogizakaskits_bd",
"03" : "nogizakaskits_bd",
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