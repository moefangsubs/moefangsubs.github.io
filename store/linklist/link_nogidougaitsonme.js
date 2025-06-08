// sumber
// https://nogidoga.com/episodes/1007488667800829953?type=series&id=1007489341468966914

// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Kali ini, yang menantang misi adalah Ikeda Teresa. Tanpa memberi tahu apa-apa, ia mengajak Ioki Mao ke sebuah kafe yang stylish. Apakah Ikeda akan berhasil menyelesaikan misinya?",
"02" : "Kali ini, yang menantang misi adalah Yumiki Nao. Ia mengundang kouhai yang akrab dengannya, Kawasaki Sakura, ke sebuah restoran yakiniku bergaya Kyoto dengan harapan, \"Aku ingin dia makan makanan enak\". Meskipun Yumiki terlihat agak kurang percaya diri dan berkata, \"Sepertinya ini tidak akan semudah itu,\" akankah ia berhasil menyelesaikan dua misi yang diberikan?",
"03" : "Kali ini, yang menantang misi adalah Tamura Mayu. Tamura, yang mengaku menyukai jou mino (bagian dari daging sapi), mengajak Ogawa Aya, kouhai yang juga merupakan member dari Mayutan Kyoukai, ke sebuah restoran horumon (menu daging organ/sapi khas Jepang). Setelah mendengar isi misinya, Tamura tampak sedikit khawatir sambil berkata, \"Karena Aaya itu anak yang baik…\". Namun ia langsung menegaskan semangatnya, \"Aku akan benar-benar menilainya dengan baik!\". Akankah Tamura berhasil menyelesaikan dua misi yang diberikan?"
};
console.log(descEpisodeSynopsis);


// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "イッツオンミー〜私の奢りです〜";
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
	"01": "1 Januari 2025",
	"02": "22 Februari 2025",
	"03": "19 Maret 2025",
};
console.log(descOnAirDate);

// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01": "池田瑛紗、五百城茉央",
	"02": "弓木奈於、川﨑桜",
	"03": "田村真佑、小川彩",
};

console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/itsonme/itsonme${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/itsonme/itsonme${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/itsonme/itsonme${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/itsonme/itsonme${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/itsonme/itsonme${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://sfl.gl/yrrx",
	"02" : "https://sfl.gl/aXkVIA",
	"03" : "https://sfl.gl/p721",
};

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/its-on-me-GYvBC";
}
console.log(linkTrakteer);

// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 9999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "AkuYangNgajak-AkuYangTraktir";
}
console.log(filePassword);


// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);
