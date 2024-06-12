
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Episode 1 ini adalah Inoue Nagi dimana ia mencoba memasak ala tahun baru, yaitu ozouni.",
"02" : "Episode 2 ini adalah dari member Sugawara Satsuki dimana ia akan bepergian sendirian ke tempat wisata, yaitu Tokyo Skytree.",
"03" : "Episode 3 kali ini adalah dari Kawasaki Sakura, dimana ia ingin sekali mencoba main ski setelah sekian lama karena karyawisata di sekolah SMA-nya saat itu dibatalkan karena ada pandemi, dan akhirnya sekarang bisa terwujudkan!",
"04" : "Episode 4 kali ini adalah dari Ioki Mao, dimana ia akan mencoba kakizome atau ucapan doa dalam menyambut tahun baru. Ia akan mencoba menulis 3 kakizome dengan masing-masing berbeda tema.",
"05" : "Episode 5 kali ini adalah dari Ichinose Miku, dimana ia akan meningkatkan kemampuannya sebagai seorang perempuan dengan melatih memasak. Maka dari itu, ia akan berbelanja dengan uang 2000 yen dan pergi membeli bahan-bahan yang akan ia masak, terdiri dari 2 menu yaitu hamburger rebus dan sup sayuran.",
"06" : "Episode 6 kali ini adalah dari Okamoto Hina, dimana ia akan mencoba permainan-permainan atletik yang sudah lama ia tidak lakukan sekitar 6 tahun lamanya. Seperti apakah keseruannya?",
"07" : "Episode 7 kali ini adalah dari Ogawa Aya. Member termuda ini akan mencoba snowboarding yang telah lama ia inginkan selama 3 tahun lamanya. Seperti apakah keseruannya?",
"08" : "Episode 8 kali ini adalah dari Nakanishi Aruno, dimana ia akan mencoba memancing di laut karena keinginannya untuk membuatnya menjadi hobi selain hanya menonton film saja. Seperti apakah keseruannya? Apakah berhasil mendapat ikannya?",
"09" : "Episode 9 kali ini adalah dari Tomisato Nao, dimana ia mengunjungi sebuah tempat yang memelihara berbagai hewan kecil, dan ia ingin mencoba berinteraksi dengan burung hantu, kelinci dan juga ular! Seperti apakah keseruannya?",
"10" : "Episode 10 kali ini adalah dari Okuda Iroha, dimana ia mengunjungi sebuah tempat pembuatan kerajinan tangan yaitu tembikar. Ia akan membuat 2 buah alat makan, yaitu piring pasta dan mangkuk teh.",
"11" : "Episode 11 kali ini adalah dari Ikeda Teresa, dimana ia akan membuat sebuah tart stroberi sendiri, yang mana ternyata ini adalah untuk kue ulang tahunnya sendiri.",
"12" : "Episode 12 kali ini adalah kembali dari Ioki Mao, dimana ia ingin membuat yomogi mochi, dimulai dari berburu tanaman yomogi di ladang hingga mengolahnya sendiri di dapur.",
"13" : "Episode 13 kali ini adalah kembali dari Ogawa Aya, dimana ia ingin mencoba membuat kembang api mainan, sehingga ia mengunjungi tempat pembuatannya langsung. Apakah ia berhasil membuat kembang api mainan yang indah?",
"14" : "Episode 14 kali ini adalah kembali dari Kawasaki Sakura, dimana ia ingin membuat amezaiku (seni permen tradisional Jepang yang dibentuk berbagai jenis baik hewan, manusia, dan lain sebagainya). Namun sebelum itu, ia akan berganti pakaian dengan menggunakan yukata modern.",
"15" : "Episode 15 kali ini adalah kembali dari Sugawara Satsuki, dimana ia ingin membuat lilin, karena belakangan ini ia tengah menyukainya dan selalu menggunakan lilin beraroma ketika hendak tidur.",
"16" : "Episode 16 kali ini adalah kembali dari Inoue Nagi, dimana ia akan pergi ke toko buku di daerah Shibuya dan membeli beberapa buku kesukaanya. Namun ia diberi batas berat, yaitu maksimal 2 kilogram, alasannya karena ia sudah bergabung dengan Nogizaka46 selama 2 tahun.",
"17" : "Episode 17 kali ini adalah kembali dari Nakanishi Aruno, dimana ia akan mencicipi osechi, yaitu sebuah set hidangan yang umumnya hidangan laut dan dihidangkan ketika menyambut tahun baru. Aruno yang belum pernah mencoba sebagian besar hidangan di dalamnya, kini ia akan mencicipi semuanya.",
"18" : "Episode 18 kali ini kembali dari Okuda Iroha, dimana ia ingin mencoba membuat karpet bulu. Motif yang ingin dia buat adalah makanan favoritnya, yaitu naan. Apakah Iroha-chan berhasil? ",
"19" : "Episode 19 kali ini kembali dari Okamoto Hina. Kali ini dia datang ke Yomiuri Land, dan pertama kalinya mencoba masuk ke rumah hantu! Jika ia berhasil, ia akan bisa bebas ke berbagai wahana yang ada disana sebagai hadiah.",
"20" : "Episode 20 kali ini kembali di seri hewan bersama Tomisato Nao. Di episode sebelumnya, Nao yang hanya sekadar mengunjungi tempat hewan yaitu burung hantu, kali ini dia ingin mencoba pergi ke shelter anjing dan mengajak salah satu anjing disana untuk berkeliling kota.",
"21" : "Episode 21 kali ini kembali dari Ichinose Miku, dimana ia ingin mempelajari suatu yang sangat penting, yaitu table manner atau etika saat di meja makan terutama saat-saat formal dan di restoran bintang. Apakah Miikyun berhasil mempelajarinya?",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "ひとりでできるもん";
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
"01" : "1 Januari 2023",
"02" : "2 Januari 2023",
"03" : "3 Januari 2023",
"04" : "2 Februari 2023",
"05" : "16  Februari 2023",
"06" : "31 Maret 2023",
"07" : "14 April 2023",
"08" : "28 April 2023",
"09" : "19 Mei 2023",
"10" : "3 Juni 2023",
"11" : "16 Juni 2023",
"12" : "14 Juli 2023",
"13" : "18 Agustus 2023",
"14" : "4 September 2023",
"15" : "20 Oktober 2023",
"16" : "17 November 2023",
"17" : "3 Januari 2024",
"18" : "26 Januari 2024",
"19" : "9 Februari 2024",
"20" : "15 Maret 2024",
"21" : "30 April 2024",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "井上和",
"02" : "菅原咲月",
"03" : "川﨑桜",
"04" : "五百城茉央",
"05" : "一ノ瀬美空",
"06" : "岡本姫奈",
"07" : "小川彩",
"08" : "中西アルノ",
"09" : "冨里奈央",
"10" : "奥田いろは",
"11" : "池田瑛紗",
"12" : "五百城茉央",
"13" : "小川彩",
"14" : "川﨑桜",
"15" : "菅原咲月",
"16" : "井上和",
"17" : "中西アルノ",
"18" : "奥田いろは",
"19" : "岡本姫奈",
"20" : "冨里奈央",
"21" : "一ノ瀬美空",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/hitoridedekirumon/hitoridedekirumon${paddedNumber}.jpg`;
}
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/hitoridedekirumon/hitoridedekirumon${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/hitoridedekirumon/hitoridedekirumon${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/hitoridedekirumon/hitoridedekirumon${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/hitoridedekirumon/hitoridedekirumon${paddedNumber}d.jpg`;
}
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://lokerwfh.net/1C9b8",
"02" : "https://lokerwfh.net/dQrCTRh",
"03" : "https://lokerwfh.net/XADq4r0",
"04" : "https://lokerwfh.net/vvPWcd",
"05" : "https://lokerwfh.net/4FtaC55I",
"06" : "https://lokerwfh.net/VmmwtZw6",
"07" : "https://lokerwfh.net/TunQvO",
"08" : "https://lokerwfh.net/jlabWt",
"09" : "https://lokerwfh.net/0HsS6Y",
"10" : "https://lokerwfh.net/LGS1fZ",
"11" : "https://lokerwfh.net/YVcmfX",
"12" : "https://lokerwfh.net/4OFGAkq",
"13" : "https://lokerwfh.net/aqPu",
"14" : "https://lokerwfh.net/xmc11S",
"15" : "https://lokerwfh.net/RXZr",
"16" : "https://lokerwfh.net/g9YP",
"17" : "https://lokerwfh.net/NRV7aU",
"18" : "https://lokerwfh.net/LSCy7WL",
"19" : "https://lokerwfh.net/liaDUZ00",
"20" : "https://lokerwfh.net/ZGtm",
"21" : "https://sfl.gl/uJ5kU2A",
  };
console.log(linkHardsub);


// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/hitori-de-dekirumon-YuZnU";
};
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 9999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "sendirianjugabisa";
};

console.log(filePassword);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
};
console.log(subLanguage);