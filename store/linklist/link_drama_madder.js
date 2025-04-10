
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"01": "Di Akademi Seiran, sekolah elit dengan tingkat kelulusan tertinggi ke Universitas Tokyo, Nakano Akane menjadi siswa pertama yang masuk dengan nilai sempurna di semua mata pelajaran. Namun, kejeniusannya justru membuatnya merasa dunia ini membosankan dan hidup kehilangan makna. Saat hari pertama masuk sekolah, sebuah kasus pembunuhan terjadi di taman dekat sekolah, dengan korban ditemukan tanpa lengan kiri. Di lokasi kejadian, Akane melihat seorang pria bernama Kurokawa Yu yang menarik perhatiannya dengan tatapan dingin. Sejak saat itu, ia mulai tertarik pada dunia kejahatan dan rasa ingin tahunya terhadap Kurokawa semakin dalam. Meski awalnya berharap menemukan teman sekelas yang menarik di sekolah penuh siswa berprestasi seperti pemenang olimpiade dan juara nasional, Akane malah merasa muak dengan kesombongan mereka. Ketika ia hendak pulang, ia kembali bertemu Kurokawa di lingkungan sekolah, lalu memutuskan untuk mengunjunginya di toko listrik tempatnya bekerja, membuka lembaran baru dalam hidupnya yang selama ini terasa hampa.",
	"02": "Penyelidikan kasus penghancuran patung di Akadmei Seiran mulai bergerak saat Akane dengan cerdik memancing teman-teman sekelasnya untuk mencari pelaku, namun teori mereka meleset semua dan tak satu pun mendekati kebenaran. Akane semakin frustrasi dengan para jenius yang hanya pintar bicara. Saat ditemukan bahwa tidak hanya patung di gerbang sekolah, tapi juga patung gips di ruang seni telah dirusak, Shinozaki menduga bahwa pecahan yang tersebar di TKP mungkin berasal dari patung gips, bukan patung utama. Ini menandakan bahwa patung aslinya mungkin masih utuh dan disembunyikan. Kecurigaan pun mulai mengarah pada salah satu anggota klub seni. Untuk memancing petunjuk lebih lanjut, Akane memberikan sebuah buku pada Eto, sementara Shinozaki dan Iyohara menemukan kejanggalan dalam video saat patung dihancurkan. Bersamaan, Eto juga menemukan keanehan dari isi buku tersebut. Saat semuanya mulai mendekati kebenaran, Akane melangkah lebih jauh demi kesenangannya sendiri. Tak lama kemudian, sesosok bayangan mencurigakan terlihat di gudang sekolah—orang itu memegang patung yang seharusnya sudah hancur.",

};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  nameShow[paddedNumber] = `MADDER（マダー）その事件、ワタシが犯人です`;
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| Episode 1",
// "02" : "| Episode 2",
// "03" : "| Episode 3",
// "04" : "| Episode 4",
// "05" : "| Episode 5",
// "06" : "| Episode 6",
// "07" : "| Episode 7",
// "08" : "| Episode 8",
// "09" : "| Episode 9",
// "10" : "| Episode 10 [TAMAT]",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
    "01": "10 April 2025",
    // "02": "17 April 2025",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  memberParticipate[paddedNumber] = `五百城茉央`;
}
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/madder/madder${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/madder/madder${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/madder/madder${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/madder/madder${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/madder/madder${paddedNumber}d.jpg`;
}
console.log(imageThumbD);




// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
    "01": "https://sfl.gl/700l",
    // "02": "",
    // "03": "",
    // "04": "",
    // "05": "",
    // "06": "",
	// "07": "",
	// "08": "",
	// "09": "",
	// "10": "",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/madder-b2big";
};
console.log(linkTrakteer);


// =======================
// PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "MaoSiPintarMemecahkanMisteri";
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