
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Episode 153 menghadirkan Ikuta Erika, Kubo Shiori, dan Kaki Haruka dari grup idola populer Nogizaka46. Mengikuti penampilan Sakura Endo yang tak terduga dan menyegarkan di episode sebelumnya, kali ini tiga anggota yang suaranya dikenal luas mempersembahkan penampilan SATU KALI PENGAMBILAN dari lagu cinta baru yang memilukan dari Nogizaka46 'yasashiidakenara' (Jika hanya untuk bersikap baik), hanya di THE FIRST TAKE.",
"02" : "Endo Sakura diwawancarai Setelah penampilannya di THE FIRST TAKE dengan membawakan lagu populer Nogizaka46 \"Kikkake\" beberapa waktu yang lalu. Wawancaranya seputar perasaannya tampil di FIRST TAKE dan pandangannya terhadap Nogizaka46.",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "THE FIRST TAKE";
}
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| 210922 THE FIRST TAKE",
"02" : "| 210927 THE FIRST TAKE Podcast",
};
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "22 September 2021",
"02" : "27 September 2021",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================


const memberParticipate = {
"01" : "生田絵梨花、久保史緒里、賀喜遥香",
"02" : "遠藤さくら",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/210922_nogizaka_thefirsttake.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/tft-podcast-endo.jpg",
  };
console.log(imageThumbBig);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://lokerwfh.net/fW6yPP",
"02" : "https://lokerwfh.net/Dcnx",
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