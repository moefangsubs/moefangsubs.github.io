
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Novel berjudul \"Hitsuji to Hagane no Mori\" (A Forest of Wool and Steel) bercerita tentang mimpi pemuda bernama Shuhei untuk menjadi penyetem piano. Shuhei yang dibesarkan di peternakan domba terpencil, memiliki ketertarikan dengan piano yang ia temukan di tempat itu. Ia kemudian tekun belajar menyetem piano secara otodidak dengan bantuan seorang penyetem piano tua. Perjuangan dan pendewasaan Shuhei digambarkan dalam perjalanannya meraih mimpinya tersebut.",
"02" : "Novel berjudul \"Hitsuji to Hagane no Mori\" (A Forest of Wool and Steel) bercerita tentang mimpi pemuda bernama Shuhei untuk menjadi penyetem piano. Shuhei yang dibesarkan di peternakan domba terpencil, memiliki ketertarikan dengan piano yang ia temukan di tempat itu. Ia kemudian tekun belajar menyetem piano secara otodidak dengan bantuan seorang penyetem piano tua. Perjuangan dan pendewasaan Shuhei digambarkan dalam perjalanannya meraih mimpinya tersebut.",
"03" : "\"Hanauzumi\" karya Watanabe Junichi adalah sebuah perjalanan melalui literatur cinta yang menggambarkan kehidupan Ogino Ginko, seorang dokter wanita pertama di Jepang pada Era Meiji. Kisah ini menggambarkan perjalanan hidupnya yang penuh perjuangan, mulai dari memutuskan menjadi dokter setelah terinfeksi penyakit menular seksual pada usia 18 tahun, hingga memilih meninggalkan segalanya termasuk reputasinya di Tokyo demi cinta pada pria yang lebih muda dan cita-citanya mendirikan desa Kristen ideal di Hokkaido.",
"04" : "\"Hanauzumi\" karya Watanabe Junichi adalah sebuah perjalanan melalui literatur cinta yang menggambarkan kehidupan Ogino Ginko, seorang dokter wanita pertama di Jepang pada Era Meiji. Kisah ini menggambarkan perjalanan hidupnya yang penuh perjuangan, mulai dari memutuskan menjadi dokter setelah terinfeksi penyakit menular seksual pada usia 18 tahun, hingga memilih meninggalkan segalanya termasuk reputasinya di Tokyo demi cinta pada pria yang lebih muda dan cita-citanya mendirikan desa Kristen ideal di Hokkaido.",
"05" : "Dalam novel 'Dakousuru Tsuki', Sakuragi Shino menggambarkan kehidupan yang kompleks di tengah sungai yang mengalir seperti metafora kehidupan yang tak pernah berakhir. Melalui karakter Junko, seorang wanita yang melarikan diri dari kehidupan rumahnya di Kushiro menuju Tokyo setelah kawin lari dengan pria yang jauh lebih muda, pembaca disuguhkan dengan pertanyaan yang mendalam tentang arti sejati kebahagiaan. Momoko, teman sekelas Junko, yang mencoba memahami pilihan hidupnya, menemukan dirinya terombang-ambing antara rasa simpati dan kebingungan. Di tengah-tengah kisah, momen-momen emosional seperti reuni Momoko dan Junko di Tokyo, serta refleksi tentang kehidupan di pulau terpencil yang tak berpenghuni, menghadirkan gambaran puitis tentang kehidupan dan kebahagiaan.",
"06" : "Dalam novel 'Dakousuru Tsuki', Sakuragi Shino menggambarkan kehidupan yang kompleks di tengah sungai yang mengalir seperti metafora kehidupan yang tak pernah berakhir. Melalui karakter Junko, seorang wanita yang melarikan diri dari kehidupan rumahnya di Kushiro menuju Tokyo setelah kawin lari dengan pria yang jauh lebih muda, pembaca disuguhkan dengan pertanyaan yang mendalam tentang arti sejati kebahagiaan. Momoko, teman sekelas Junko, yang mencoba memahami pilihan hidupnya, menemukan dirinya terombang-ambing antara rasa simpati dan kebingungan. Di tengah-tengah kisah, momen-momen emosional seperti reuni Momoko dan Junko di Tokyo, serta refleksi tentang kehidupan di pulau terpencil yang tak berpenghuni, menghadirkan gambaran puitis tentang kehidupan dan kebahagiaan.",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂46 橋本奈々未の恋する文学-夏の旅-";
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
"01" : "28 Oktober 2016",
"02" : "4 November 2016",
"03" : "11 November 2016",
"04" : "18 November 2016",
"05" : "25 November 2016",
"06" : "2 Desember 2016",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "橋本奈々未";
}
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu01.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu02.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu03.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu04.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/natsu05.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/natsu06.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu01a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu02a.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu03a.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu04a.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/natsu05a.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/natsu06a.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu01b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu02b.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu03b.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu04b.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/natsu05b.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/natsu06b.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu01c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu02c.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu03c.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu04c.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/natsu05c.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/natsu06c.jpg",
  };
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu01d.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu02d.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu03d.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurunatsu04d.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/natsu05d.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/natsu06d.jpg",
  };
console.log(imageThumbD);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/hashimoto-nanami-no-koisuru-bungaku-natsu-no-tabi-vszmE";
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