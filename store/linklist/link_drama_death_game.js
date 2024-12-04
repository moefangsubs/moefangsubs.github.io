
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
    "01": "Sejak kecil menyukai TV, Tomura menjadi penulis skenario dengan harapan membuat acara sukses. Namun, ia menghadapi budaya industri yang penuh penjilat dan pelecehan kekuasaan. Saat ia mengusulkan konsep 'menara wasabi', konsep itu diubah drastis menjadi game ekstrem dan ditayangkan, yang berujung pada kecelakaan fatal. Tomura disalahkan dan dikeluarkan dari industri, tetapi seorang wanita bernama Akizawa tertarik pada konsepnya dan menawarinya kesempatan baru.",
    "02": "Tomura, penulis yang disalahkan atas kecelakaan fatal dari acara yang ia buat, bertemu Akizawa, seorang produser yang memujinya dan mengajaknya bergabung dengan perusahaan pembuat death game, Dreamia. Setelah kejadian misterius menimpa mantan direktur acaranya, Tomura merasa ragu, namun ia memilih bergabung dan bertemu dengan tim Dreamia yang memiliki suasana damai meski mengelola permainan yang mematikan.",
    "03": "Setelah bergabung dengan Dreamia, Tomura berencana menargetkan Yaguri, komedian yang pernah mem-bully-nya. Mengetahui rahasia kelam Yaguri, ia merancang permainan maut 'Ruang Pengakuan Asam Sulfat' di mana Yaguri harus mengakui dosanya untuk menghindari hukuman yang mematikan, dengan mempertaruhkan masa depan dan keselamatannya.",
	"04": "Setelah dijadikan kambing hitam dalam kasus kecelakaan 'Wasabi,' Tomura beralih menjadi pembuat death game untuk membalas dendam. Ia mendapatkan bukti suara yang mengungkap penyalahgunaan kekuasaannya oleh kolega lama. Tomura mulai menyasar orang-orang terkait kasus tersebut, termasuk seorang tokoh senior industri TV, sebagai target death game berikutnya.",
	"05": "Tomura bertemu Akizawa, yang mengungkap trauma masa lalunya akibat program TV yang menghancurkan bisnis keluarganya. Akizawa dan Tomura menyadari bahwa musuh mereka adalah orang yang sama, produser yang membuat Tomura menjadi kambing hitam dalam 'Wasabi.' Mereka bersatu untuk balas dendam, sementara fakta baru terkait kecelakaan itu terungkap.",
	"06": "Perusahaan death game tempat Tomura bekerja dihancurkan untuk mencegah kebocoran informasi. Setelah bubar, Tomura dan rekan-rekannya menjalani kehidupan baru masing-masing. Tomura merasa kesempatan untuk balas dendam telah hilang, hingga Akizawa kembali muncul membawa sesuatu yang mengejutkan.",
	// "07": "Tomura dan rekan-rekannya memutuskan untuk bangkit kembali setelah perusahaannya dihancurkan. Dengan nama baru, Fantasia, mereka memulai ulang tanpa membuat death game langsung. Mereka menciptakan konten bertema 'kematian sosial,' menargetkan influencer yang berisiko mengalami kehancuran akibat eksposur publik.",
	// "08": "",
	// "09": "",
	// "10": "",

};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  nameShow[paddedNumber] = `デスゲームで待ってる`;
}
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
	"01" : "24 Oktober 2024",
	"02" : "31 Oktober 2024",
	"03" : "7 November 2024",
	"04": "14 November 2024",
	"05": "21 November 2024",
	"06": "28 November 2024",
	// "07": "",
	// "08": "",
	// "09": "",
	// "10": "",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  memberParticipate[paddedNumber] = `梅澤美波`;
}
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/deathgame/deathgame${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/deathgame/deathgame${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/deathgame/deathgame${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/deathgame/deathgame${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/deathgame/deathgame${paddedNumber}d.jpg`;
}
console.log(imageThumbD);




// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://sfl.gl/6UshH",
	"02" : "https://sfl.gl/ubzqf",
	"03" : "https://sfl.gl/q7L4",
	"04": "https://sfl.gl/XoLLAAmq",
	"05": "https://sfl.gl/GYHMjYG",
	"06": "https://sfl.gl/QSNshHkz",
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
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/death-game-de-matteru-gjTqq";
};
console.log(linkTrakteer);


// =======================
// PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "UmeDreamia";
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