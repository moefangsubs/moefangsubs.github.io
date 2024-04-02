
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Di edisi Fuyu no Tabi, para member tersebut antara lain Terada Ranze, Takayama Kazumi, Fukagawa Mai, Hoshino Minami dan Saito Asuka.",
"02" : "Di edisi Natsu no Tabi, para member tersebut antara lain Terada Ranze, Takayama Kazumi, Higuchi Hina, Nakamoto Himeka, Hoshino Minami dan Saito Asuka.",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂46Books";
}
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| Fuyu",
"02" : "| Natsu",
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "19 Februari - 18 Maret 2016",
"02" : "28 Oktober - 2 Desember 2016",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "深川麻衣、齋藤飛鳥、星野みなみ、寺田蘭世、高山一実",
"02" : "寺田蘭世、星野みなみ、樋口日奈、高山一実、中元日芽香、齋藤飛鳥",
  };
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/nogizakabooks-fuyu.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/nogizakabooks-natsu.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/nogizakabooks-fuyu1.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/nogizakabooks-natsu1.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/nogizakabooks-fuyu2.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/nogizakabooks-natsu2.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/nogizakabooks-fuyu3.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/nogizakabooks-natsu3.jpg",
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
"01" : "https://lokerwfh.net/71qcr9v",
"02" : "https://lokerwfh.net/Zc0i0S73",
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