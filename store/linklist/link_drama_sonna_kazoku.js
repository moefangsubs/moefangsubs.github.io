
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Menjelang ulang tahunnya yang ke-18, Ichika mulai berbicara dengan ayahnya dan mengetahui bahwa aturan selotip ini dimulai karena ucapan yang melukai ibunya. Saat Reitaro melanggar aturan untuk mengubah situasi, Kazumi bereaksi keras. Lalu Reitaro memulihkan perasaannya di luar rumah, namun Sayako, yang sebelumnya menyelamatkan Reitaro dari kecelakaan di lampu merah, bertemu dengannya di jembatan. Reitaro menceritakan kehidupannya di rumah yang kemudian Sayako menasihatinya dengan lembut bahwa apa yang dialaminya adalah bentuk kekerasan dalam rumah tangga. Sementara itu, Ichika berusaha menahan kepergian ayahnya dan ingin memulihkan kembali keluarga mereka. Saat mendekati jawaban atas misteri selotip, Ichika menemukan sebuah kebohongan besar yang selama ini disembunyikan oleh kedua orang tuanya.",
"02" : "Di tengah situasi tersebut, Ichika bertemu dengan Hikaru, seorang siswa pindahan dari Tokyo, yang memiliki ketertarikan pada aplikasi kuis yang sama. Hikaru, yang dibesarkan dalam keluarga ibu tunggal dan melarikan diri dari pacar ibunya yang menjadi penguntit, pindah ke kota Ichika. Ichika yang merasa terhubung dengan Hikaru, yang juga mengalami lingkungan keluarga yang rumit dan melarikan diri dari kenyataan melalui hobi kuisnya, membagikan masalah keluarga yang tidak nyaman. Hikaru kemudian menawarkan strategi untuk membantu Ichika.",
"03" : "Setelah diisolasi dari keluarganya oleh selotip kuning, Reitaro hidup dalam kesendirian di kamarnya, di mana terdapat satu foto keluarga. Foto tersebut diletakkan oleh istrinya, Kazumi, yang menempelkan selotip tersebut setelah terjadi suatu peristiwa. Bersama teman sekelasnya, Hikaru, Ichika berusaha mengungkap misteri di balik foto itu. Dalam foto tersebut, Reitaro, Kazumi, dan Ichika kecil terlihat tersenyum bahagia, tetapi sebagian foto telah dipotong. Menurut Kazumi, itu adalah peringatan bagi Reitaro. Tampaknya foto ini terkait dengan suatu peristiwa, tetapi kapan dan di mana foto ini diambil? Apa yang sebenarnya terjadi di masa lalu mereka? Ichika bekerja sama dengan Hikaru untuk mencari petunjuk. Di tengah pencarian ini, tiba-tiba Kazumi mulai bertindak tidak terkendali. Setelah termakan oleh bisikan wali kelas Ichika, Ogino, yang mengatakan bahwa Ichika dan Hikaru berpacaran, Kazumi dengan paksa membawa Ichika dan menerobos masuk ke rumah Hikaru.",
// "04" : "Reitaro yang terpisah dari keluarganya dengan selotip, mengungkapkan keinginan hatinya kepada putrinya, Ichika, bahwa dia ingin makan bersama sebagai keluarga bertiga. Namun, saat Kazumi  melihat Reitaro berbicara dengan Ichika, dia marah besar. Sekali lagi, keluarga mereka menuju kehancuran. Sementara itu, Ichika menemukan foto di kamar Reitaro yang terkait dengan "suatu peristiwa" yang menyebabkan selotip ditempelkan. Bersama dengan teman sekelasnya, Hikaru, Ichika mencoba mengungkap misteri foto tersebut. Hikaru menemukan bahwa gerbang kuil yang terlihat di latar belakang foto itu sama dengan yang ada di poster kebun binatang. Ternyata, foto itu diambil di salah satu sudut kebun binatang. Bagian foto yang dipotong tampaknya menyimpan petunjuk, dan Ichika serta Hikaru menyimpulkan bahwa rahasia tersembunyi ada di bagian yang hilang itu. Mereka pun pergi ke kebun binatang untuk mencari lokasi pengambilan foto dan menyelidiki apa yang seharusnya terlihat dalam foto tersebut.",
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
"02" : "25 Juli 2024",
"03" : "15 Agustus 2024",
// "04" : "22 Agustus 2024",
// "05" : "29 Agustus 2024",
// "06" : "5 September 2024",
// "07" : "12 September 2024",
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
"02" : "https://sfl.gl/xM7XqC",
"03" : "https://sfl.gl/cht0w",
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