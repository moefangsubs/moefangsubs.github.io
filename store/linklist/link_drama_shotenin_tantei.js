
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Tendo Sakura dengan mengajak rekannya saat itu Makino, menghadiri sebuah acara yang diadakan oleh seorang penulis terkenal, Matilda Satoru.",
"02" : "Setelah di dalam villa tempat acara diadakan, Tendo Sakura bertabrakan dengan penulis Matilda Satoru.",
"03" : "Di pagi yang damai, Matilda Satoru ditemukan terkapar di kamarnya. Tendo Sakura semakin bersemangat untuk mengungkap kasus ini bersama detektif sungguhan yang sebelumnya pernah bersamanya.",
"04" : "Pihak polisi detektif berdiskusi mengenai dua surat wasiat yang ia dapati di TKP dengan orang-orang di vila tersebut.",
"05" : "Tendo Sakura yang penasaran akan surat wasiat kedua yang berupa teka-teki itu segera memecahkan misteri.",
"06" : "Tendo Sakura mengetahui bahwa Sato-lah yang berniat membunuh Matilda Satoru, dan Sato pun menceritakan alasan kenapa ia berniat melakukan itu."
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  nameShow[paddedNumber] = `書店員探偵サクラ`;
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| Episode 1",
"02" : "| Episode 2",
"03" : "| Episode 3",
"04" : "| Episode 4",
"05" : "| Episode 5",
"06" : "| Episode 6 [TAMAT]",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "5 November 2024",
"02" : "6 November 2024",
"03" : "7 November 2024",
// "04" : "",
// "05" : "",
// "06" : ""
};
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  memberParticipate[paddedNumber] = `遠藤さくら`;
}
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei01.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei02.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei03.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei04.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei05.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei06.jpg"
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei01a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei02a.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei03a.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei04a.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei05a.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei06a.jpg"
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei01b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei02b.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei03b.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei04b.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei05b.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/shotenintantei/shotenintantei06b.jpg"
};
console.log(imageThumbB);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://sfl.gl/Z6wU",
"02" : "https://sfl.gl/Xpznw0",
"03" : "https://sfl.gl/1sMSquV",
"04" : "https://sfl.gl/OYFk",
"05" : "https://sfl.gl/49GZzKl",
"06" : "https://sfl.gl/OMnYpL8G"
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/shotenin-tantei-sakura-QpwUc";
};
console.log(linkTrakteer);


// =======================
// PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "DetektifSakocangIsBack";
};
console.log(filePassword);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 999999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
};
console.log(subLanguage);