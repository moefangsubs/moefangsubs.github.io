
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"01" : "Saat masuk kerja, Jun mendapati rekan-rekannya sedang heboh karena ramalan zodiak yang tiba-tiba jadi kenyataan. Meski awalnya menolak percaya, Jun ikut diramal secara paksa. Sementara itu, akun media sosialnya mulai dipenuhi pesan curhat, dan ia pun mulai merasakan pengaruh dari setiap kata yang ia tulis. Tak lama kemudian, ia diminta menjadi kepala polisi sehari, dan saat menjalankan tugasnya, ia bertemu seorang penggemar berat yang membuatnya grogi menghadapi sorotan publik yang terus meningkat.",
	"02" : "Jun terus menerima berbagai curhatan dari para pengikutnya dan merespons dengan sikap positif yang tulus. Suatu hari, ia mendapat permintaan kerja khusus dari klien baru yang ternyata juga ingin meminta saran pribadi. Dengan berbicara langsung, Jun menyadari pentingnya komunikasi tatap muka. Saat melihat kembali pesan-pesan yang masuk, ia menemukan sebuah hal yang mencurigakan dalam salah satu curhatan, yang bisa saja membawa perubahan besar.",
	"03" : "Saat truknya rusak, Jun harus menumpang di truk milik Sakurajima, rekan kerja yang ia kira hanya peduli pada latihan otot. Namun di perjalanan, ia mulai melihat sisi lain dari Sakurajima yang bijak dan penuh perhatian, dan belajar banyak dari cara kerja serta kepeduliannya terhadap orang lain. Ketika mereka sampai di tujuan berikutnya, mereka bertemu klien yang kesulitan mengangkat barang, dan Jun ikut membantu sambil terus menyerap nilai-nilai kerja sama dan kepedulian dari sekitarnya.",
	"04" : "Jun menjalani liputan harian bersama penulis eksentrik bernama Tsurusu yang selalu berbicara dengan nada musikal, membuat Jun kebingungan. Sementara itu, rekan-rekan Jun di perusahaan antusias, dan Kanta merasa khawatir akan kedekatan mereka selama liputan. Meski awalnya hanya menjalankan tugas, Tsurusu mulai kagum pada semangat Jun terhadap pekerjaannya, namun diam-diam ia merasa hampa karena tidak bisa mencintai profesinya sendiri. Jun pun mencoba menyemangatinya.",
	"05" : "Jun mengikuti pelatihan keselamatan untuk sopir profesional dan bertemu Abukuma, peserta lain yang cerewet dan penuh semangat membela keadilan, tapi ternyata dia sendiri pernah berbuat salah secara diam-diam. Saat Jun mengunjungi klien bernama Miyahara, pria itu curiga istrinya berselingkuh dan meminta saran. Jun menyarankan agar langsung bertanya, yang membuat Miyahara langsung menelepon sang istri di tempat—dan situasinya pun berkembang tak terduga.",
	"06" : "Jun menerima kabar mendadak dari adiknya, Miu, bahwa ibu mereka, tiba-tiba jatuh sakit. Ia pun segera bergegas pulang ke kampung halamannya di Hokkaido. Untungnya, kondisi sang ibu tidak terlalu serius. Namun, Jun secara tidak sengaja mendengar percakapan Miu dan ibunya yang membuat Jun merasa campur aduk. Di tengah situasi itu, Jun mampir ke perusahaan pengangkutan milik keluarga temannya, dan di sana ia diberi tahu oleh sang direktur bahwa mereka sedang kekurangan tenaga kerja. Karena bisa tetap berada di dekat keluarganya, Jun pun ditawari untuk bekerja di sana."
};

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 999999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "トラックガール２";
};
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
"06" : "| Episode 6 [END]"
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "17 Mei 2025",
	"02" : "17 Mei 2025",
	"03" : "24 Mei 2025",
	"04" : "31 Mei 2025",
	"05" : "7 Juni 2025",
	"06" : "14 Juni 2025",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 999999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "遠藤さくら";
};
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB//post/truckgirl/truckgirl2${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB//post/truckgirl/truckgirl2${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB//post/truckgirl/truckgirl2${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB//post/truckgirl/truckgirl2${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB//post/truckgirl/truckgirl2${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://sfl.gl/y0QqzJkG",
	"02" : "https://sfl.gl/lHp4U1T",
	"03" : "https://sfl.gl/aS2A",
	"04" : "https://sfl.gl/6gw7",
	"05" : "https://sfl.gl/EYwr",
	"06" : "https://sfl.gl/IikD2UHe",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/truck-girl-2-y8zLm";
};
console.log(linkTrakteer);

// =======================
// PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "InfluencerSupirTrukJunchanKembali";
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