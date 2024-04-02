
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Pada tanggal 2 Juli, edisi kesepuluh dari acara musik spesial pertengahan tahun Nippon TV, \"THE MUSIC DAY\", ditayangkan mulai pukul 15:00 hingga 22:54 JST. Acara ini kembali digelar di Makuhari Messe Chiba. Terakhir kali diadakan di tempat ini pada tahun 2019, tetapi belum kembali lagi sejak itu karena pandemi COVID-19. Tiga grup Sakamichi ikut tampil dalam acara ini. Dalam part ini adalah medley 3 grup Sakamichi, berkolaborasi penampilan dengan 3 idol era Showa.",
"02" : "Pada tanggal 2 Juli, edisi kesepuluh dari acara musik spesial pertengahan tahun Nippon TV, \"THE MUSIC DAY\", ditayangkan mulai pukul 15:00 hingga 22:54 JST. Acara ini kembali digelar di Makuhari Messe Chiba. Terakhir kali diadakan di tempat ini pada tahun 2019, tetapi belum kembali lagi sejak itu karena pandemi COVID-19. Tiga grup Sakamichi ikut tampil dalam acara ini. Dalam part ini adalah penampilan Nogizaka46 dengan membawakan lagu Hadashi de Summer.",
"03" : "Pada tanggal 2 Juli, edisi kesepuluh dari acara musik spesial pertengahan tahun Nippon TV, \"THE MUSIC DAY\", ditayangkan mulai pukul 15:00 hingga 22:54 JST. Acara ini kembali digelar di Makuhari Messe Chiba. Terakhir kali diadakan di tempat ini pada tahun 2019, tetapi belum kembali lagi sejak itu karena pandemi COVID-19. Tiga grup Sakamichi ikut tampil dalam acara ini. Dalam part ini adalah penampilan Nogizaka46 yang membawakan lagu No.1 pilihan netizen melalui interview di jalanan dengan memfokuskan pada liriknya \"Synchronicity\".",
"04" : "Pada tanggal 2 Juli, edisi kesepuluh dari acara musik spesial pertengahan tahun Nippon TV, \"THE MUSIC DAY\", ditayangkan mulai pukul 15:00 hingga 22:54 JST. Acara ini kembali digelar di Makuhari Messe Chiba. Terakhir kali diadakan di tempat ini pada tahun 2019, tetapi belum kembali lagi sejak itu karena pandemi COVID-19. Tiga grup Sakamichi ikut tampil dalam acara ini. Dalam part ini adalah penampilan Sakurazaka46 yang membawakan lagu No.1 pilihan netizen melalui interview di jalanan dengan memfokuskan pada liriknya \"Omotta yori mo Sabishikunai\".",
"05" : "Pada tanggal 2 Juli, edisi kesepuluh dari acara musik spesial pertengahan tahun Nippon TV, \"THE MUSIC DAY\", ditayangkan mulai pukul 15:00 hingga 22:54 JST. Acara ini kembali digelar di Makuhari Messe Chiba. Terakhir kali diadakan di tempat ini pada tahun 2019, tetapi belum kembali lagi sejak itu karena pandemi COVID-19. Tiga grup Sakamichi ikut tampil dalam acara ini. Dalam part ini adalah penampilan Hinatazaka46 yang membawakan lagu No.1 pilihan netizen melalui interview di jalanan dengan memfokuskan pada liriknya \"Nando demo Nando demo\".",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "THE MUSIC DAY";
}
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| 220702 THE MUSIC DAY Sakamichi Medley",
"02" : "| 220702 THE MUSIC DAY Nogizaka46 - Hadashi de Summer CUT",
"03" : "| 220702 THE MUSIC DAY Nogizaka46 - Synchronicity +Talk CUT",
"04" : "| 220702 THE MUSIC DAY Sakurazaka46 - Omotta yori mo Sabishikunai +Talk CUT",
"05" : "| 220702 THE MUSIC DAY Hinatazaka46 - Nandodemo Nandodemo + Talk CUT",
};
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "2 Juli 2022",
"02" : "2 Juli 2022",
"03" : "2 Juli 2022",
"04" : "2 Juli 2022",
"05" : "2 Juli 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "坂道シリーズ",
"02" : "乃木坂46",
"03" : "乃木坂46",
"04" : "桜坂46",
"05" : "日向坂46",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-medley.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-nogib.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-nogia.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-saku.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-hinata.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-medleya.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-nogiba.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-nogiaa.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-sakua.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-hinataa.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-medleyb.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-nogibb.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-nogiab.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-sakub.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-hinatab.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-medleyc.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-nogibc.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-nogiac.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-sakuc.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/random/220702-tmd-hinatac.jpg",
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
"01" : "https://lokerwfh.net/AymuB",
"02" : "https://lokerwfh.net/sLukO",
"03" : "https://lokerwfh.net/YlV0rx85",
"04" : "https://lokerwfh.net/zIqen7",
"05" : "https://lokerwfh.net/jM09c4",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {
"01" : "https://trakteer.id/moefangsubs/showcase/the-music-day-sakamichi-all-performance-juHX7",
"02" : "https://trakteer.id/moefangsubs/showcase/the-music-day-sakamichi-all-performance-juHX7",
"03" : "https://trakteer.id/moefangsubs/showcase/the-music-day-sakamichi-all-performance-juHX7",
"04" : "https://trakteer.id/moefangsubs/showcase/the-music-day-sakamichi-all-performance-juHX7",
"05" : "https://trakteer.id/moefangsubs/showcase/the-music-day-sakamichi-all-performance-juHX7",
  };
console.log(linkTrakteer);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);