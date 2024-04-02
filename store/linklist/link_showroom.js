
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Our release this time from our fansub partner \"MochiWorld\" is Ikeda Teresa's first SHOWROOM.",
"02" : "Our release this time from our fansub partner \"MochiWorld\" is Ogawa Aya's first SHOWROOM.",
"03" : "Our release this time from our fansub partner \"MochiWorld\" is Okuda Iroha's first SHOWROOM.",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "SHOWROOM";
}
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {

"01" : "| 230302 Ikeda Teresa",
"02" : "| 230303 Ogawa Aya",
"03" : "| 230307 Okuda Iroha",
};
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "March 2, 2023",
"02" : "March 3, 2023",
"03" : "March 7, 2023",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "池田瑛紗",
"02" : "小川彩",
"03" : "奥田いろは",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/showroom/230302_SR-IkedaTeresa.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/showroom/230303_SR-OgawaAya.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/showroom/230307_SR-OkudaIroha.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/showroom/230302_SR-IkedaTeresa1.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/showroom/230303_SR-OgawaAya1.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/showroom/230307_SR-OkudaIroha1.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/showroom/230302_SR-IkedaTeresa2.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/showroom/230303_SR-OgawaAya2.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/showroom/230307_SR-OkudaIroha2.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/showroom/230302_SR-IkedaTeresa3.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/showroom/230303_SR-OgawaAya3.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/showroom/230307_SR-OkudaIroha3.jpg",
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
"01" : "https://drive.google.com/file/d/1v00e8xUQtl2GJrmKc3ZlpH0PdUrgRS3k/view?usp=share_link",
"02" : "https://drive.google.com/file/d/1qUl3K6SU4iFTmQo-hHNiu9kjMGZKzJ55/view?usp=share_link",
"03" : "https://drive.google.com/file/d/1kQ9aGQPL4-AuVlD7999FeiW2flFVW9rt/view?usp=share_link",
  };
console.log(linkHardsub);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "English";
}
console.log(subLanguage);