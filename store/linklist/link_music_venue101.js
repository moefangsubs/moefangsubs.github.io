
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Di kesempatan kali ini, Venue 101 menghadirkan tamu Nogizaka46. Karena Ikuta Erika, lulusan dari Nogizaka juga, kali ini suasanya agak sedikit berbeda ditambah dengan dibawakannya lagu kelulusannya Asuka, \"Koko ni wa nai mono\" membuat tema kali ini adalah cerita seputar kouhai-senpai khususnya Gen-1 dan Saito Asuka.",
"02" : "Di kesempatan kali ini, Venue 101 kembali menghadirkan tamu Nogizaka46. Mereka akan membawakan single terbarunya \"Hito wa Yume o Nido miru\", tapi sebelum itu, kita akan mengetahui sosok seperti apakah mereka w-center kali ini Yamashita Mizuki dan Kubo Shiori.",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "Venue 101";
}
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| 221126 VENUE101",
"02" : "| 230318 VENUE101",
};
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "26 November 2022",
"02" : "18 Maret 2023",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================


const memberParticipate = {
"01" : "乃木坂46、生田絵梨花",
"02" : "乃木坂46、生田絵梨花",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/221126-venue101-nogizaka46.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/230318-venue101-nogizaka46.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/221126-venue101-nogizaka46-a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/230318-venue101-nogizaka46-a.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/221126-venue101-nogizaka46-b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/230318-venue101-nogizaka46-b.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/221126-venue101-nogizaka46-c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/230318-venue101-nogizaka46-c.jpg",
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
"01" : "https://lokerwfh.net/7KuKRIPo",
"02" : "https://lokerwfh.net/pY5u",
  };
console.log(linkHardsub);


// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {
"01" : "https://trakteer.id/moefangsubs/showcase/221126-venue-101-ikuta-erika-nogizaka46-r71os",
"02" : "https://trakteer.id/moefangsubs/showcase/230318-venue101-ikuta-erika-nogizaka46-13OAw",
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