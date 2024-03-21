
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Episode 1 ini kita diperkenalkan seperti apa kegiatan di sekolah pelatihan komedian yang pengajarnya adalah Tadanori, yang tegas pada murid-muridnya. Banyak para siswa tidak suka dengan pengajar yang satu ini, apalagi Sawamura si mantan pegawai kantoran ini. Beda dengan yang lainnya punya alasan khusus ingin jadi komedian, Gota sendiri hanya ingin tidak menjadi politikus seperti ayahnya.",
"02" : "Episode 2 para calon komedian membawakan materi pertama mereka dengan sangat antusias. Mereka menuju ke Izakaya Dojo dan bergabung dengan anggota biasa, termasuk Sumire, Takeru, Yamato dan Minoru. Sumire kemudian mulai memutar ulang pertunjukan yang telah difilmkan di ponselnya, tetapi semua orang merasa gagal!　Para siswa benar-benar tertekan, bertanya-tanya apa tawa itu. Sawamura kemudian pergi ke rumah Gota bersamanya dan bertemu dengan ayah Gota, politisi Tonegawa Shuro. Shuro, yang mengolok-olok komedi, kemudian mulai berbicara kasar kepada Sawamura.",
"03" : "Episode 3 di Sekolah Pelatihan Komedi Daikoku Entertainment, para siswa masih bekerja keras dalam karier komedi mereka saat ini. Namun, Gouta tidak hadir sementara teman-temannya bekerja keras menunjukkan materi manzai-nya. Ia mengkhawatirkan rekannya, Sawamura Ginpei yang telah absen sejak hari sebelumnya tanpa bisa dihubungi. Kemudian, dosen Tadanori Aida mengatakan kepada Gouta tanpa syarat yang tidak pasti bahwa Sawamura berhenti.",
"04" : "Episode 4 saat Gouta diberitahu oleh Sawamura bahwa ia mengidap kanker stadium 4, ia bertekad untuk benar-benar melindungi satu-satunya partner-nya yang berharga di dunia. Sementara itu, para siswa di sekolah pelatihan, termasuk Sumire Amamiya, yang telah berlari menuju mimpinya untuk menjadi \"komedian profesional\", mulai memiliki perasaan rumitnya sendiri.",
"05" : "Gouta merasakan keinginan yang sungguh-sungguh dari partner-nya, Sawamura yang berada di rumah sakit menunggu operasi kanker, untuk \"hidup untuk menunjukkan pada putrinya dia masuk TV\", dan mulai memikirkan cara untuk membiarkannya bertemu dengan keluarganya yang terasing. Gouta diam-diam menemukan taman kanak-kanak tempat istri Sawamura, Mayumi bekerja dan memohon padanya untuk datang ke rumah sakit bersamanya. Sementara itu, di sekolah pelatihan komedi, instruktur iblis Tadanori Aida melampiaskan kemarahannya pada pengkhianat yang menulis hal-hal buruk tentang dirinya dan muridnya di internet.",
"06" : "Gouta merasakan keinginan yang sungguh-sungguh dari rekannya, Sawamura, yang berada di rumah sakit menunggu operasi kanker, untuk \"hidup untuk melihat putrinya di TV\", dan mulai memikirkan cara untuk membiarkannya bertemu dengan keluarganya yang terasing. Gota diam-diam menemukan taman kanak-kanak tempat istri Sawamura, Mayumi bekerja dan memohon padanya untuk datang ke rumah sakit bersamanya. Sementara itu, di sekolah pelatihan komedi, pengajar  Aida masih melampiaskan kemarahannya pada pengkhianat yang menulis hal-hal buruk tentang rekannya di internet. Selain itu, saat Aida menghadapkan mereka dengan realitas dunia komedi, para siswa, yang selama ini merasakan kerasnya situasi, mulai memikirkan kembali kehidupan mereka sendiri. Terlepas dari upaya Gouta, ayahnya terus meletakkan dasar bagi Gouta untuk mencalonkan diri.",
"07" : "Di Sekolah Pelatihan Komedi Hiburan Daikoku, para siswa menampilkan neta mereka di kelas seperti biasa. Namun, Gouta yang tidak bisa berkonsentrasi sama sekali, disibukkan dengan melihat jam tangannya ... Pada saat ini, satu-satunya partner pentingnya, Sawamura sedang menjalani operasi kanker. Sementara itu, kepala sekolah, Ootaguro, datang menemui Aida di ruang guru. Ootaguro dengan sedih mulai memberitahunya bahwa bangunan itu akan dihancurkan awal tahun depan. Dia juga mengatakan bahwa sekolah pelatihan tidak dapat dilanjutkan karena manajemen yang buruk.",
"08" : "Hari upacara kelulusan di Sekolah Pelatihan Komedi Hiburan Daikoku Entertainment tiba. Ruang kelas yang biasa digunakan untuk upacara dipenuhi dengan suasana pesta Natal, dan ruangannya dipenuhi dengan tamu undangan, termasuk keluarga siswa, teman, dan perwakilan media. Para siswa sangat bersemangat di ruang tunggu ketika mereka melihat auditorium penuh dengan tamu undangan yang menunggu pertunjukan dimulai. Mereka menghabiskan waktu yang tegang dan menegangkan untuk berganti kostum dan menyesuaikan neta mereka.",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {
"01" : "最初はパー",
"02" : "最初はパー",
"03" : "最初はパー",
"04" : "最初はパー",
"05" : "最初はパー",
"06" : "最初はパー",
"07" : "最初はパー",
"08" : "最初はパー",
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
"06" : "| Episode 6",
"07" : "| Episode 7",
"08" : "| Episode 8 [END]",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "28 Oktober 2022",
"02" : "4 November 2022",
"03" : "11 November 2022",
"04" : "18 November 2022",
"05" : "25 November 2022",
"06" : "2 Desember 2022",
"07" : "9 Desember 2022",
"08" : "16 Desember 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  memberParticipate[paddedNumber] = `賀喜遥香`;
}
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/saishowapaa/saishowapaa${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/saishowapaa/saishowapaa${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/saishowapaa/saishowapaa${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/saishowapaa/saishowapaa${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/saishowapaa/saishowapaa${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://lokerwfh.net/pov7C20",
"02" : "https://lokerwfh.net/jYaCnd",
"03" : "https://lokerwfh.net/qGE9SRU",
"04" : "https://lokerwfh.net/Hh0tSQvQ",
"05" : "https://lokerwfh.net/cXWk5O",
"06" : "https://lokerwfh.net/c1OY",
"07" : "https://lokerwfh.net/LfNmWp",
"08" : "https://lokerwfh.net/FbsJBnPj",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/saisho-wa-paa-GrUxb";
};
console.log(linkTrakteer);


// =======================
// PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "kakkipgnjdkomedian";
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