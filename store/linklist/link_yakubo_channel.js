
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Episode kali ini berlokasi di Osaka bersama gen-5 Ioki Mao.",
"02" : "Di episode 2 kali ini berlokasi di Hiroshima bersama gen-5 Ogawa Aya dan dari senpai gen-1 Wada Maaya yang asli wong Hiroshima.",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "矢久保チャンネル";
}
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  descEpisode[paddedNumber] = `| Episode ${i}`;
}
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "22 Juli 2022",
"02" : "27 Juli 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "矢久保美緒、五百城茉央",
"02" : "矢久保美緒、和田まあや、林瑠奈、小川彩",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubochannel01.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubochannel02.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubochannel01a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubochannel02a.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubochannel01b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubochannel02b.jpg",

  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubochannel01c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/yakubochannel02c.jpg",
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
"01" : "https://drive.google.com/file/d/1aA_z73GDioF5aUuiCsy9bUEDE_wnOyjk/view",
"02" : "https://drive.google.com/file/d/1kRw5GPMq64UqFahAF-MwM30UBVa-BH10/view",
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