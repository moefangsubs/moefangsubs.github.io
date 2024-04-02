
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Novel \"Hutan Norwegia\" (ノルウェイの森, Norwegian Wood) karya Haruki Murakami bercerita tentang Toru Watanabe, mahasiswa yang baru kehilangan sahabatnya, Kizuki. Di tengah duka, ia bertemu Midori, gadis ceria yang menjadi sumber kekuatannya. Namun, takdir mempertemukan Toru dengan Naoko, mantan kekasih Kizuki yang masih dirundung duka.",
"02" : "Dalam \"A Wild Sheep Chase\" (羊をめぐる冒険), seorang pria yang kesepian bernama boku (僕)  diceritakan oleh teman lamanya tentang domba misterius bertanduk bintang. Terjebak dalam realisme magis dan pencarian absurd, boku ditarik ke dunia kriminal dan bertemu dengan orang-orang eksentrik untuk menemukan domba ini, yang ternyata menjadi kunci untuk mengungkap misteri masa lalunya yang hilang.",
"03" : "Dalam \"A Wild Sheep Chase\" (羊をめぐる冒険), seorang pria yang kesepian bernama boku (僕)  diceritakan oleh teman lamanya tentang domba misterius bertanduk bintang. Terjebak dalam realisme magis dan pencarian absurd, boku ditarik ke dunia kriminal dan bertemu dengan orang-orang eksentrik untuk menemukan domba ini, yang ternyata menjadi kunci untuk mengungkap misteri masa lalunya yang hilang.",
"04" : " \"Loveless\" karya Sakuragi Shino adalah kisah yang menggetarkan jiwa tentang Yurie, seorang wanita yang dibesarkan dalam keluarga imigran miskin di Hokkaido dan bermimpi menjadi penyanyi. Kehidupannya di era Showa dipenuhi dengan perjuangan, namun keajaiban tak terduga muncul di akhir hidupnya.",
"05" : "\"Akan ni Hatsu\" (阿寒に果つ) karya Watanabe Junichi bercerita tentang seorang remaja laki-laki yang jatuh cinta dengan teman sekelasnya, Junko Kasei, seorang gadis berbakat seni yang misterius.  Perasaan tersebut semakin rumit karena sang gadis memiliki hubungan dengan pria dewasa lainnya, namun cinta pertama yang membara itu terus membekas di hati sang remaja laki-laki. ",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂46 橋本奈々未の恋する文学-夏の旅-";
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
"01" : "19 Februari 2016",
"02" : "26 Februari 2016",
"03" : "4 Maret 2016",
"04" : "11 Maret 2016",
"05" : "18 Maret 2016",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "橋本奈々未";
}
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu01.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu02.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu03.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu04.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu05.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu01a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu02a.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu03a.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu04a.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu05a.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu01b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu02b.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu03b.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu04b.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu05b.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu01c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu02c.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu03c.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu04c.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu05c.jpg",
  };
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu01d.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu02d.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu03d.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu04d.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/koisurubungaku/koisurufuyu05d.jpg",
  };
console.log(imageThumbD);


// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/hashimoto-nanami-no-koisuru-bungaku-fuyu-no-tabi-yQpAK";
}
console.log(linkTrakteer);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);