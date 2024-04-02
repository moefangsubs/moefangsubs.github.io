
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Nogizaka Skits ini adalah bonus dari BluRay/DVD-Box Vol.2 nya yang telah dijual 2 April 2021. Di kesempatan kali ini adalah making of dari Nogizaka Skits ACT 1 paruh kedua.",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {
"01" : "ノギザカスキッツ　メイキング",
};
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| Making of Vol. 2",
};
console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "2 April 2021",

  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "乃木坂46 4期生",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-makingof-00.jpg",

  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-makingof-02a.jpg",

  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-makingof-02b.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================


const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogiskitsbonus/nogiskibd-makingof-02c.jpg",
  };
console.log(imageThumbC);

const imageThumbX = {
...imageThumbC,
};
console.log(imageThumbX);


// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {
"01" : "https://trakteer.id/moefangsubs/showcase/nogizaka-skits-making-of-vol2-k7UkX",
  };
console.log(linkTrakteer);


// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);