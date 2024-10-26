
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
  "01": "Komukai Riko mendengar kabar duka tentang kematian kakeknya dan memutuskan untuk pulang ke kampung halaman. Saat berada di rumah, Riko menemukan 'model kit yang belum selesai' dari barang peninggalan kakeknya. Merasa harus menyelesaikan apa yang tertunda, Riko pun menuju 'Toko Model Kit Yajima.'",
  "02": "Saat tinggal di rumah orang tua, Riko dan keluarganya kedatangan keponakan mereka, Yuuto. Senang bisa bertemu kembali, keluarga pergi belanja, meninggalkan Riko dan Yuuto di rumah. Riko pun merencanakan sebuah ide untuk membuat model kit bersama Yuuto.",
  "03": "Suatu hari, ketiga bersaudara Riko menyadari bahwa rumah mereka penuh dengan pernak-pernik idola yang misterius. Ternyata, idola tersebut adalah orang yang menjadi kegemaran sang ibu! Ketiga bersaudara itu pun mulai menyelidiki lebih jauh untuk menghindari invasi idola di rumah mereka...",
  "04": "Ayah Riko, Koichiro, adalah sosok ayah yang baik hati yang rela menghadapi bahaya demi keluarganya. Saat Riko menghadapi masalah di pekerjaan, ia mencoba untuk curhat pada ayahnya. Namun, karena tegang, Koichiro tidak dapat mengucapkan sepatah kata pun.",
  "05": "Riko ingin pergi ke festival kembang api di kota sebelah bersama ayahnya, Koichiro. Namun, sebuah insiden membuat Koichiro batal datang. Kecewa, Riko pergi ke Toko Model Kit Yajima untuk mengalihkan pikirannya.",
  "06": "Yumi, yang sedang tinggal di rumah keluarga, memiliki masalah dalam hubungan pernikahannya. Khawatir, Riko mengajak Yumi ke Toko Model Kit Yajima untuk membuat model kit bersama. Di sana, sisi hati Yumi yang belum pernah ia ungkapkan akhirnya terlihat...",
  "07": "Riko dan teman masa kecilnya, Asai, pergi untuk membantu seseorang. Di tengah misi mereka, tiba-tiba muncul seekor babi hutan ganas! Setelah berjuang dan Asai terluka, Riko pergi ke Toko Model Kit Yajima untuk mengobati lukanya.",
  "08": "Riko mengetahui bahwa adik perempuannya, Kae, sedang bingung soal masa depannya. Untuk memperkenalkan hobi yang disukainya, Riko mengajak Kae ke Toko Model Kit Yajima. Saat melihat Riko menikmati hobi dan merampungkan model kitnya, Kae pun menemukan inspirasi...",
  "09": "Di kota Toichi, tempat keluarga Riko tinggal, sedang ada rencana pengembangan resor pemandian air panas. Saat perusahaan resor tiba-tiba menegosiasikan penggusuran, terjadilah perdebatan besar dalam keluarga Komukai! Bagi Riko dan keluarganya, apa arti keadilan sebenarnya?",
  "10": "Keluarga Komukai terpecah antara setuju dan tidak setuju soal penggusuran. Riko menemukan model kit milik kakeknya yang menyimpan kenangan lama. Dia pun mengusulkan agar mereka membuat model kit bersama sebagai keluarga. Akankah hati mereka yang terpecah bisa kembali bersatu...?"
};


// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "量産型リコ -最後のプラモ女子の人生組み立て記-";
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
"01" : "28 Juni 2024",
"02" : "5 Juli 2024",
"03" : "12 Juli 2024",
"04" : "19 Juli 2024",
"05" : "26 Juli 2024",
"06" : "2 Agustus 2024",
"07" : "9 Agustus 2024",
"08" : "16 Agustus 2024",
"09" : "23 Agustus 2024",
"10" : "30 Agustus 2024"
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "与田祐希";
}
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/ryosangatarikos3/ryosangatarikos3-${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/ryosangatarikos3/ryosangatarikos3-${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/ryosangatarikos3/ryosangatarikos3-${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/ryosangatarikos3/ryosangatarikos3-${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/ryosangatarikos3/ryosangatarikos3-${paddedNumber}d.jpg`;
}
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://sfl.gl/HvI0SW",
"02" : "https://sfl.gl/EJx2U",
"03" : "https://sfl.gl/oLQdWL",
"04" : "https://sfl.gl/8HUOjAb9",
"05" : "https://sfl.gl/fuhmoc",
"06" : "https://sfl.gl/ekmedu",
"07" : "https://sfl.gl/fU6b",
"08" : "https://sfl.gl/dXzl",
"09" : "https://sfl.gl/Lmj0",
"10" : "https://sfl.gl/OiZR1P0P"
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/ryosangata-riko-season-3-XM6cV";
};
console.log(linkTrakteer);


// =======================
// PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "Season3RikoMerakit";
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