
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Episode perdana menampilkan penyanyi ternama Hirahara Ayaka, yang merayakan 20 tahun debutnya, tampil bersama band orisinal program ini.",
"02" : "Episode 2 dari Spicy Sessions menghadirkan Chris Hart, penyanyi asal San Francisco yang jatuh cinta pada J-POP sejak remaja dan pindah ke Jepang di usia 26 tahun. Setelah memenangkan kompetisi karaoke pada 2012, ia debut dengan album Heart Song dan sukses di industri musik. Vakum pada 2018, ia kembali pada 2021 dan merayakan 10 tahun kariernya. Chris juga berbagi kisah tentang perjalanannya mempelajari bahasa Jepang dan pengalamannya sebelum terjun ke dunia musik.",
"03" : "Episode 3 Spicy Sessions menghadirkan Namioka Shintaro dan Oshima Maho dari Penthouse, band beranggotakan enam orang dengan dua vokalis utama. Dibentuk pada 2019 oleh Namioka Shintaro, lulusan Universitas Tokyo, band ini mengusung soundscape urban yang khas. Lima dari enam anggotanya adalah alumni Universitas Tokyo, dan banyak yang bekerja sebagai pegawai perusahaan sambil bermusik. Lagu mereka, \"Koi ni Ochitara\" dan \"Living Room\", memuncaki iTunes R&B Soul Ranking pada 2021. Tahun lalu, mereka merilis album \"Balcony\" dan sukses menggelar tur di lima kota besar Jepang. Pada 24 Januari 2024, mereka merilis single digital \"FRIDAY'S High!\".",
"04" : "Episode 4 kali ini menghadirkan penyanyi berbakat May J. sebagai bintang tamu, yang dikenal luas lewat suara emasnya dalam lagu tema versi Jepang film \"Ana to Yuki no Joou\" (Frozen) dan penampilannya di \"Kouhaku Uta Gassen\" 2014. Lahir pada tahun 1988 dari ayah Jepang dan ibu asal Iran, May J. tumbuh dalam lingkungan yang kental dengan pendidikan seni, memulai les piano dan balet sejak usia 3 tahun, serta vokal klasik sejak 8 tahun. Debut resminya terjadi pada 2006 dengan mini album \"All My Girls\", dan kini, setelah melahirkan anak pertamanya pada 2023, ia kembali aktif di dunia musik dengan merilis album orisinal terbarunya \"Aurora\" pada April 2024.",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "SPICY SESSIONS";
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
"01" : "16 Desember 2023",
"02" : "23 Februari 2024",
"03" : "23 Maret 2024",
"04" : "27 April 2024",
  };
console.log(descOnAirDate);

// =======================
// DESKRIPSI LAGU 1 (Khusus Star Tanjou series)
// =======================

const descSong1 = {
	"01": "平原綾香『からっぽのハート』",
	"02": "クリス・ハート『monochromatic』",
	"03": "Penthouse『…恋に落ちたら』",
	"04": "May J.『Sweetest Crime』",
};
const descSong2 = {
	"01": "Ray Charles『Georgia On My Mind』",
	"02": "Kiroro『未来へ』",
	"03": "Derek and the Dominos『Layla』 ",
	"04": "宇多田ヒカル『First Love』",
};
const descSong3 = {
	"01": "玉置浩二『ロマン』",
	"02": "CHEMISTRY『Pieces of a Dream』",
	"03": "DREAMS COME TRUE『やさしいキスをして』 ",
	"04": "映画『Aladdin（アラジン）』より『A Whole New World』",
};
const descSong4 = {
	"01": "ミュージカル『ムーラン・ルージュ』より『Come What May』 ",
	"02": "クリス・ハート『I Love You』",
	"03": "德永英明『壊れかけのRadio』",
	"04": "Lionel Richie & Diana Ross『Endless Love』",
};
const descSong5 = {
	"01": "椎名林檎『丸の内サディスティック』",
	"02": "乃木坂46『思い出が止まらなくなる』 ",
	"03": "ミュージカル『Les Misérables（レ・ミゼラブル）』より『On My Own』 ",
	"04": "コレサワ『たばこ』",
};
	
// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "中西アルノ";
}
console.log(memberParticipate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const additionalGuests = {
	"01": "平原綾香",
	"02": "クリス・ハート",
	"03": "浪岡真太郎＆大島真帆（Penthouse）",
	"04": "May J.",
};

const guestArtis = {};

for (let i = 1; i <= 39; i++) {
    const key = i.toString().padStart(2, '0');
    guestArtis[key] = "";
}

Object.assign(guestArtis, additionalGuests);

console.log(guestArtis);
	
	
// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/spicysessions/spicysessions${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/spicysessions/spicysessions${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/spicysessions/spicysessions${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/spicysessions/spicysessions${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/spicysessions/spicysessions${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/spicy-sessions-dnh5k";
};
console.log(linkTrakteer);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 999999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
};
console.log(subLanguage);