
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
 "01" : "Grup rival Nogizaka46, Boku ga Mitakatta Aozora, mengadakan one man live dengan tajuk \"Boku ga Mitakatta One Man Live vol.0\" pada 19 Agustus 2023 silam. Disini mereka membawakan seluruh lagunya dalam single debut mereka, juga membawakan untuk pertama kalinya single kedua."
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {
 "01" : "僕が観たかったワンマンライブ vol.0"
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
 "01" : "231219 Boku ga Mitakatta One Man Live Vol.0"
};
console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
 "01" : "19 Desember 2023"
};
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
 "01" : "僕が見たかった青空"
};
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
 "01" : "https://ik.imagekit.io/mLsKqNSuB/post/live/231219-bokuao-oneman-vol0.jpg"
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
 "01" : "https://ik.imagekit.io/mLsKqNSuB/post/live/231219-bokuao-oneman-vol0a.jpg"
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
 "01" : "https://ik.imagekit.io/mLsKqNSuB/post/live/231219-bokuao-oneman-vol0b.jpg"
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
 "01" : "https://ik.imagekit.io/mLsKqNSuB/post/live/231219-bokuao-oneman-vol0c.jpg"
};
console.log(imageThumbC);

const imageThumbX = {
	...imageThumbC,
};
console.log(imageThumbX);


// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {
 "01" : "https://ik.imagekit.io/mLsKqNSuB/post/live/231219-bokuao-oneman-vol0d.jpg"
};
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
 "01" : "https://lokerwfh.net/gDmU"
};
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
 "01" : "https://trakteer.id/moefangsubs/showcase/231219-boku-ga-mitakatta-one-man-live-vol0-dgb5A"
};
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {
 "01" : "BokuNoKamihikoukiTobanakatta"
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
