
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Di episode pertama, Matsumura menerima tawaran dan mengusulkan untuk pergi ke daerah setempat untuk membandingkan masakan lokal dari kandidat rasa baru.",
"02" : "Di episode kedua, Matsumura pergi ke Ehime untuk mencicipi salah satu kandidat rasa baru, \"Taichiri\".",
"03" : "Di episode ketiga, Matsumura pergi ke Shimane untuk mencicipi salah satu kandidat rasa baru, \"Shijimi no sumashijiru (Sup bening shijimi)\".",
"04" : "Di episode keempat, ia akan mencoba kandidat rasa yang terakhir, yaitu sukiyaki ala Kansai dari Kobe. Tapi sebelum itu, ia akan naik ke Kobe Port Tower.",
"05" : "Episode kelima ini, Matsumura akan menentukan satu dari tiga rasa kandidat yang sebelumnya sudah ia coba, baik hidangannya langsung maupun rasa yang sudah dibuat menjadi ramen. Karena kebingungan, ia meminta pendapat dari Shiraishi Mai mana yang harus ia pilih menurut Maiyan.",
"06" : "Episode terakhir ini adalah episode Macchun benar-benar memilih salah satu dari tiga rasa kandidat yang akan dirilis oleh Waraa. Yang manakah yang akan ia pilih sebagai ramen yang cocok bagi semua orang? Dan apa alasan ia memilihnya?",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "まつむラー、新商品を決める";
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
"01" : "5 Februari 2019",
"02" : "8 Februari 2019",
"03" : "12 Februari 2019",
"04" : "15 Februari 2019",
"05" : "19 Februari 2019",
"06" : "22 Februari 2019",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "松村沙友里",
"02" : "松村沙友里",
"03" : "松村沙友里",
"04" : "松村沙友里",
"05" : "松村沙友里、白石麻衣",
"06" : "松村沙友里",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-1.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-2.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-3.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-4.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-5.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-6.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-1a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-2a.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-3a.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-4a.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-5a.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-6a.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-1b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-2b.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-3b.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-4b.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-5b.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-6b.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-1c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-2c.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-3c.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-4c.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-5c.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-6c.jpg",
  };
console.log(imageThumbC);


// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-1d.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-2d.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-3d.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-4d.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-5d.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/matsumuraa-shinshouhin/matsumuraa-shinshouhin-6d.jpg",
  };
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://lokerwfh.net/ss1L",
"02" : "https://lokerwfh.net/pgzzJA",
"03" : "https://lokerwfh.net/5ipBwkDj",
"04" : "https://lokerwfh.net/SjZTn",
"05" : "https://lokerwfh.net/Iwqfd",
"06" : "https://lokerwfh.net/xQCMiuU",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/matsumuraa-shishouhin-o-kimeru-rg2hN";
}
console.log(linkTrakteer);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);