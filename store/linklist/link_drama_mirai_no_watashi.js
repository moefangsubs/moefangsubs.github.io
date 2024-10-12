
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Igarashi Light, seorang pegawai pemerintah, sedang menjalani \"hari terpenting dalam hidupnya\"—hari di mana ia tidak boleh gagal. Dia sedang menunggu kekasihnya, Tsutsui Rin, di sebuah restoran untuk melamarnya. Selama ini, Light selalu menjalani hidup dengan prinsip \"aman dan stabil.\" Jika hari ini berjalan lancar, dia yakin akan mendapatkan kehidupan yang damai. Namun, tiba-tiba, seseorang yang mengaku sebagai dirinya dari masa depan 30 tahun kemudian muncul dan memperingatkan bahwa jika Light tidak membatalkan lamaran ini, hidupnya akan berakhir dalam kegagalan besar.",
"02" : "Light gagal melamar Rin akibat gangguan dari pria yang mengaku sebagai \"dirinya dari 30 tahun ke depan\" . Sesuai dengan prediksi pria itu, Light kemudian mendapat tawaran dari teman seangkatannya di klub robotik semasa sekolah teknik, Shimizu, untuk bergabung dengan perusahaan rintisan robotik yang baru saja didirikannya. Meski tertekan dengan lamaran yang gagal dan bimbang untuk mengambil risiko, pria dari masa depan berusaha agar Light menerima tawaran Shimizu. Sementara itu, Rin yang mulai curiga dengan perilaku aneh Light, merasa khawatir.",
"03" : "Rin yang tidak tahu apa-apa hampir bertemu dengan pria dari masa depan , membuat Light panik. Meskipun berhasil mengelabui Rin, rahasia yang Light sembunyikan semakin banyak. Rin pun mulai merasa ada yang tidak beres dengan Light. Di tengah kebingungan ini, Light harus fokus pada tugasnya sebagai pemimpin proyek festival daerah yang diberikan oleh atasannya, Takatsu. Saat Light bekerja keras, rekan kerjanya, Miyamoto, menyadari bahwa Light menyembunyikan perasaannya yang sebenarnya.",
"04" : "Light dihadapkan pada pilihan sulit—apakah dia akan mengejar mimpinya dengan menerima tawaran pekerjaan dari Shimizu atau tetap bekerja di kantor pemerintah? Di hari festival, banyak anak-anak berkumpul untuk mengikuti lomba roket botol plastik, yang menjadi acara utama dan berlangsung sangat meriah. Melihat antusiasme anak-anak yang terpukau oleh cerita dari tamu istimewa, mantan astronaut Tokioka Satoko, Light terdorong untuk menanyakan sebuah pertanyaan kepada Tokioka. Di sisi lain, Rin, yang datang ke acara tersebut, merasa cemas melihat Light yang tampak akrab berbicara dengan rekan kerjanya, Miyamoto.",
// "05" : "",
// "06" : "",
// "07" : "",
// "08" : "",
// "09" : "",
// "10" : "",
// "11" : "",
// "12" : "",
// "13" : "",
// "14" : "",
// "15" : "",
// "16" : "",
// "17" : "",
// "18" : "",
// "19" : "",
// "20" : "",
// "21" : "",
// "22" : "",
// "23" : "",
// "24" : "",
// "25" : "",
// "26" : "",
// "27" : "",
// "28" : "",
// "29" : "",
// "30" : "",
// "31" : "",
// "32" : "",
// "33" : "",
// "34" : "",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "未来の私にブッかまされる！？";
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
"01" : "7 Oktober 2024",
"02" : "8 Oktober 2024",
"03" : "9 Oktober 2024",
"04" : "10 Oktober 2024",
// "05" : "",
// "06" : "",
// "07" : "",
// "08" : "",
// "09" : "",
// "10" : "",
// "11" : "",
// "12" : "",
// "13" : "",
// "14" : "",
// "15" : "",
// "16" : "",
// "17" : "",
// "18" : "",
// "19" : "",
// "20" : "",
// "21" : "",
// "22" : "",
// "23" : "",
// "24" : "",
// "25" : "",
// "26" : "",
// "27" : "",
// "28" : "",
// "29" : "",
// "30" : "",
// "31" : "",
// "32" : "",
// "33" : "",
// "34" : "",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "久保史緒里";
}
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/miranowatashi/miranowatashi${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/miranowatashi/miranowatashi${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/miranowatashi/miranowatashi${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/miranowatashi/miranowatashi${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/miranowatashi/miranowatashi${paddedNumber}d.jpg`;
}
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://sfl.gl/xS1z9jOZ",
"02" : "https://sfl.gl/PBmwp",
"03" : "https://sfl.gl/RDjKQD",
"04" : "https://sfl.gl/XopAoFl",
// "05" : "",
// "06" : "",
// "07" : "",
// "08" : "",
// "09" : "",
// "10" : "",
// "11" : "",
// "12" : "",
// "13" : "",
// "14" : "",
// "15" : "",
// "16" : "",
// "17" : "",
// "18" : "",
// "19" : "",
// "20" : "",
// "21" : "",
// "22" : "",
// "23" : "",
// "24" : "",
// "25" : "",
// "26" : "",
// "27" : "",
// "28" : "",
// "29" : "",
// "30" : "",
// "31" : "",
// "32" : "",
// "33" : "",
// "34" : "",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/mirai-no-watashi-ni-bukkamasareru-vn1dn";
};
console.log(linkTrakteer);


// =======================
// PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "KuboIstriMasaDepanku";
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