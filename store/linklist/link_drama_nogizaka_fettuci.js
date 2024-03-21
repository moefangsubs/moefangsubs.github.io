// =======================
// NAMA ACARA
// =======================


const nameShow = {
"01" : "乃木坂４６ x フェットチーネグミ 「迷ったら、ハズむほう。」",
"02" : "乃木坂４６ x フェットチーネグミ 「迷ったら、ハズむほう。」",
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| Season 1",
"02" : "| Season 2",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "8 April 2020",
"02" : "29 September 2020",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "与田祐希、遠藤さくら、賀喜遥香、久保史緒里",
"02" : "齋藤飛鳥、生田絵梨花、秋元真夏、松村沙友里",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/fettucinegummy/nogimayottara-1.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/fettucinegummy/nogimayottara-2.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// ======================= 

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/fettucinegummy/nogimayottara-1a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/fettucinegummy/nogimayottara-2a.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/fettucinegummy/nogimayottara-1b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/fettucinegummy/nogimayottara-2b.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/fettucinegummy/nogimayottara-1c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/fettucinegummy/nogimayottara-2c.jpg",
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
"01" : "https://lokerwfh.net/d4pWV",
"02" : "https://lokerwfh.net/gszz",
  };
console.log(linkHardsub);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 999999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
};
console.log(subLanguage);