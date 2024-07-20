
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Menjelang ulang tahunnya yang ke-18, Ichika mulai berbicara dengan ayahnya dan mengetahui bahwa aturan selotip ini dimulai karena ucapan yang melukai ibunya. Saat Reitaro melanggar aturan untuk mengubah situasi, Kazumi bereaksi keras. Lalu Reitaro memulihkan perasaannya di luar rumah, namun Sayako, yang sebelumnya menyelamatkan Reitaro dari kecelakaan di lampu merah, bertemu dengannya di jembatan. Reitaro menceritakan kehidupannya di rumah yang kemudian Sayako menasihatinya dengan lembut bahwa apa yang dialaminya adalah bentuk kekerasan dalam rumah tangga. Sementara itu, Ichika berusaha menahan kepergian ayahnya dan ingin memulihkan kembali keluarga mereka. Saat mendekati jawaban atas misteri pita, Ichika menemukan sebuah kebohongan besar yang selama ini disembunyikan oleh kedua orang tuanya."
// "02" : "",
// "03" : "",
// "04" : "",
// "05" : "",
// "06" : "",
// "07" : "",
// "08" : "",
// "09" : "",
// "10" : "",
// "11" : "",
// "12" : "",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "そんな家族なら捨てちゃえば？";
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
"01" : "18 Juli 2024",
// "02" : "25 Juli 2024",
// "03" : "1 Agustus 2024",
// "04" : "8 Agustus 2024",
// "05" : "15 Agustus 2024",
// "06" : "22 Agustus 2024",
// "07" : "29 Agustus 2024",
// "08" : "5 September 2024",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "岩本連加";
}
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/sonnakazoku/sonnakazoku${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/sonnakazoku/sonnakazoku${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/sonnakazoku/sonnakazoku${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/sonnakazoku/sonnakazoku${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/sonnakazoku/sonnakazoku${paddedNumber}d.jpg`;
}
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://sfl.gl/ROpDL3",
// "02" : "",
// "03" : "",
// "04" : "",
// "05" : "",
// "06" : "",
// "07" : "",
// "08" : "",
// "09" : "",
// "10" : "",
// "11" : "",
// "12" : "",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/sonna-kazoku-nara-sutechaeba-2024-7eBja";
};
console.log(linkTrakteer);


// =======================
// PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "rentansebagaiichika";
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