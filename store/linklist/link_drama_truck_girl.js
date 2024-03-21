
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Kurate Jun, seorang sopir truk, tiba di kantor dan melihat rekan kerjanya, Hirokawa Kanta, Sakurajima Takeshi, Kishi Michiru, dan Kiyama Yuriko tengah berbincang biasa seperti biasanya di kantor. Dari percakapan sepele tersebut, Jun hampir saja membuat Yuriko marah, jadi Jun segera meninggalkan kantor. Saat Jun melakukan pekerjaan bongkar-muat di pusat logistik, seorang sopir dari perusahaan pesaing bernama Usamaru mencoba mengolok-olok Jun yang merupakan seorang sopir truk wanita yang jarang terlihat. Namun, Takeshi yang berotot besar segera mengusirnya Kemudian, Jun pergi ke tujuan pengiriman baru dengan kecepatan dan ketelitian kerjanya yang khas. Penanggung jawab di sana, Midorikawa terkejut melihat kinerjanya dan merasa terinspirasi. >Setelah selesai bekerja, Jun pergi ke restoran izakaya langganannya...",
"02" : "Jun menuju tujuan pengiriman dan bertemu dengan orang yang bertanggung jawab di sana, Miyahara, yang ingin berkonsultasi dengan Jun. Ia memiliki seorang putri yang masih SMA dan putrinya mengatakan ingin menjadi seorang pekerja konstrusi wanita di masa depan. Miyahara khawatir karena putrinya akan melompat ke dunia yang didominasi oleh pria, dan meminta Jun untuk membujuknya agar berpikir ulang. Namun, Jun justru meninggalkan pesan dukungan untuknya. Tergerak oleh perasaan tulus Jun, Miyahara pulang dan memberi tahu putrinya tentang sesuatu yang tak terduga. Sementara itu, setelah selesai bekerja, Jun minum sake sendirian di rumah dan mendapatkan panggilan video dari sahabatnya, Mina yang mendorong Jun untuk memposting foto-foto sehari-hari di media sosial. Akhirnya, apa yang akan Jun lakukan dalam unggahan pertamanya?!",
"03" : "Jun ditugaskan menjadi instruktur baru. Namun, lawan kerjanya adalah pengemudi veteran, Koga, yang lebih tua daripada ayahnya. Meskipun bingung dengan sikap yang pendiam dan tanpa ekspresi, Jun harus berangkat bersama Koga untuk perjalanan jarak jauh. Di area layanan tengah perjalanan, mereka bertemu dengan teman sejawat pengemudi truk, Yamae, yang memberikan informasi macet yang berguna untuk perjalanan selanjutnya. Meskipun mereka terhenti karena penutupan jalan, mereka berhasil tiba tepat waktu dengan rute alternatif yang diusulkan oleh Koga. Jun berterima kasih kepada Koga, tetapi kekesalannya hampir meledak karena Koga tetap enggan berkomunikasi dengannya.",
"04" : "Jun mengambil cuti berbayar untuk mengikuti ujian mendapatkan lisensi mengemudi truk besar. Biasanya, ia hanya mengonsumsi sarapan sederhana di hari kerja, tetapi kali ini ia sangat bersemangat untuk makan di restoran set menu sejak pagi. Namun, keberuntungan Jun berbalik saat barang-barang baru yang ia beli sebagai tanda baik untuk ujian semuanya rusak, dan hari itu dimulai dengan perasaan yang buruk. Kemudian, di sekolah mengemudi, ia bertemu dengan instruktur yang sangat kuat karakternya, Tamana, yang membuat Jun merasa agak kikuk. Meskipun begitu, Jun berhasil melewati pelatihan dengan lancar. Di akhir liburannya, ketika Jun masuk ke sebuah restoran izakaya, ia mendapati dirinya terlibat dengan dua karyawan kantoran, Yamaura dan Imagawa. Kedua pria itu mengeluh tentang kesulitan pekerjaan penjualan, tetapi Jun tetap berbicara tentang pendekatannya yang positif terhadap pekerjaannya seperti biasa.",
"05" : "Pagi-pagi, Yuriko kepikiran tentang \"penghematan biaya,\" tapi dia marah pada timnya yang hanya menghamburkan uang tanpa sadar. Kran daruma pengawal di perjalanan juga semakin kecil, dan Jun diminta untuk menggunakan jalan alternatif. Setelah itu, Jun tiba tepat waktu di tempat pengiriman, tetapi dia diberitahu untuk menunggu karena \"sedang ramai.\" Selanjutnya, dia mendengar dari petugas yang bertanggung jawab, bahwa pengiriman akan sangat terlambat dan mungkin bir di toko bir tidak akan cukup. Jun terkejut dan menanyakan, \"Apakah itu baik-baik saja...?\" tapi ia tidak serius menanggapinya karena kesalahan dari pihak client. Terdorong oleh situasi tersebut, Jun kembali bertindak dengan sikap proaktif...! Setelah bekerja selesai hari itu, teman baiknya, Mina akan pindah ke Tokyo, dan mereka berdua pergi ke izakaya biasa. Mina mengalami kebuntuan dalam pekerjaannya, tetapi Jun secara alami memberikan dukungan kepadanya.",
"06" : "Saat Jun datang ke kantor, Kanta sedang berkonsultasi dengan Yuriko tentang masalahnya. Yuriko yang prihatin dengan Kanta yang terlalu khawatir mengusulkan untuk pergi minum bersama sebagai sesama rekan kerja. Awalnya, Jun tidak bersemangat untuk pergi, tetapi dia setuju jika mendengar masalahnya bisa membuat Kanta lebih positif. Kemudian, ketika Jun tiba di tempat pengiriman, Kusu, orang yang bertanggung jawab, mengatakan bahwa dia sering lupa dan kesulitan.",
};

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 999999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "トラックガール";
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
"06" : "| Episode 6 [END]",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "19 Juli 2023",
"02" : "19 Juli 2023",
"03" : "19 Juli 2023",
"04" : "19 Juli 2023",
"05" : "19 Juli 2023",
"06" : "19 Juli 2023",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 999999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "`遠藤さくら";
};
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB//post/truckgirl/truckgirl${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB//post/truckgirl/truckgirl${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB//post/truckgirl/truckgirl${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB//post/truckgirl/truckgirl${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB//post/truckgirl/truckgirl${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://lokerwfh.net/qj2lF",
"02" : "https://lokerwfh.net/a6R9CYF",
"03" : "https://lokerwfh.net/6JCBEVbV",
"04" : "https://lokerwfh.net/5Ibb",
"05" : "https://lokerwfh.net/MgLuK",
"06" : "https://lokerwfh.net/xxBm",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/truck-girl-aTKOz";
};
console.log(linkTrakteer);

// =======================
// PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "HatiHatiSakuchan";
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