
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"01" : "Dalam drama spin-off \"Head tachi no Jingi Naki Zunou-sen\" dari drama malam Jumat \"Densetsu no Head Sho\", Sugawara Satsuki tampil memerankan peran Kaede, tokoh heroine yang khusus untuk spin-off drama ini. Kaede adalah putri dari pemilik tempat yang menjadi tempat berkumpulnya Grand Cross, dan merupakan seorang siswi SMA dengan kepribadian yang serius. Perhatikan bagaimana Kaede, yang awalnya takut kepada tiga berandalan ini, perlahan-lahan menunjukkan sisi barunya melalui death game!",
	"02" : "Dalam drama spin-off \"Head tachi no Jingi Naki Zunou-sen\" dari drama malam Jumat \"Densetsu no Head Sho\", Sugawara Satsuki tampil memerankan peran Kaede, tokoh heroine yang khusus untuk spin-off drama ini. Di episode 2 ini, Kaede kembali menjadi wasit dalam death game yang kedua. Apakah tiga berandalan ini bisa memenangkan game tersebut? Ataukah akan keok lagi?",
	"03" : "Dalam drama spin-off \"Head tachi no Jingi Naki Zunou-sen\" dari drama malam Jumat \"Densetsu no Head Sho\", Sugawara Satsuki tampil! memerankan peran Kaede, tokoh heroine yang khusus untuk spin-off drama ini. Di episode terakhir ini ini, Kaede kembali menjadi wasit dalam death game terakhir, yaitu menentukan kursi termewah dan paling biasa saja. Apakah dengan kursi itu, para berandalan bisa menarik hati Kaede?",

};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "伝説の頭 翔 「頭（ヘッド）たちの仁義なき頭脳戦（ブレインバトル）";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {};

for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  descEpisode[paddedNumber] = `| Spin-off Episode ${i}`;
}
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "2 Agustus 2024",
"02" : "16 Agustus 2024",
"03" : "8 September 2024",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "菅原咲月";
}
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/240802-densetsu-no-head-sho-spinoff.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/240816-densetsu-no-head-sho-spinoff.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/240908-densetsu-no-head-sho-spinoff.jpg",
  };
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/240802-densetsu-no-head-sho-spinoff-a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/240816-densetsu-no-head-sho-spinoff-a.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/240908-densetsu-no-head-sho-spinoff-a.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/240802-densetsu-no-head-sho-spinoff-b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/240816-densetsu-no-head-sho-spinoff-b.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/240908-densetsu-no-head-sho-spinoff-b.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/240802-densetsu-no-head-sho-spinoff-c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/240816-densetsu-no-head-sho-spinoff-c.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/240908-densetsu-no-head-sho-spinoff-c.jpg",
  };
console.log(imageThumbC);

const imageThumbX = {
...imageThumbC,
};
console.log(imageThumbX);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://sfl.gl/4dyvvkm",
"02" : "https://sfl.gl/DPAzRgLE",
"03" : "https://sfl.gl/cw05Xq",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {
"01" : "https://trakteer.id/moefangsubs/showcase/240802-densetsu-no-head-sho-spin-off-6aMkt",
"02" : "https://trakteer.id/moefangsubs/showcase/240816-densetsu-no-head-sho-spin-off-2-j4tYQ",
"02" : "https://trakteer.id/moefangsubs/showcase/240908-densetsu-no-head-sho-spin-off-3-YZF3k",
  };
console.log(linkTrakteer);


// =======================
// PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "SatchanwithYankees";
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