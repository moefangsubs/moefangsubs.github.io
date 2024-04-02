
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Di episode kali ini dibuka dengan pelajaran pertama, yaitu bagaimana caranya sebuah foto skandal menjadikannya sebuah peluang bagi para member.",
"02" : "Di episode kali ini dibuka dengan pelajaran kedua, yaitu bagaimana caranya kata yang dirasa kurang pas untuk citra seorang idol diubah menjadi tepat sebagai seorang idol ketika memakainya.",
"03" : "Di episode kali ini dibuka dengan pelajaran ketiga, yaitu mengubah kata-kata yang 'merangsang' atau dirasa tidak cocok dilontarkan oleh seorang idola, menjadi terlihat cocok dan imut jika idola yang mengatakannya.",
"04" : "Di episode kali ini dibuka dengan pelajaran keempat, yaitu para member menggambarkan apa bayangkan dirinya dalam kehidupan pasang surutnya sebagai idol, yang disajikan dalam bentuk grafik yang telah dibuat oleh Osada-sensei, dari titik A sebagai titik debut, hingga titik E sebagai titik kelulusannya.",
"05" : "Di episode kali ini dibuka dengan pelajaran kelima, yaitu para member berlomba-lomba untuk memperebutkan gelar yang masih kosong dalam dunia hiburan, yaitu \"Raja Dahi Generasi Pertama\". Seperti apakah keseruannya?",
"06" : "Di pelajaran ke-6 adalah melanjutkan episode sebelumnya dimana para member memperebutkan gelar Raja Dahi generasi pertama, yang sekarang telah menyisakan 4 member. Siapakah yang menang?",
"07" : "Di pelajaran ke-7 ini adalah para member BokuAo dilatih untuk kemampuan dalam segmen, baik dalam acara televisi ataupun event-event. Para member sebelumnya telah menuliskan segmen apa yang mereka inginkan, dan ada game dari member yang dilakukan disini dengan sedikit dimodifikasi oleh staff.",
"08" : "Di pelajaran ke-8 ini para member BokuAo belajar cara menghadapi situasi palsu. dunia TV, terkadang diperlukan situasi palsu untuk kelancaran acaranya.",
"09" : "Di pelajaran ke-9 ini melanjutkan tentang foto skandal yang ada di episode selanjutnya, lalu mereka disuruh untuk berlatih konferensi pers permintaan maaf.",
"10" : "Di pelajaran ke-10 sebenarnya harusnya yang menjadi episode pertama, yaitu memperkenalkan keterampilan khusus para member. Maka dari itu, episode 10 ini dilakukan dengan sedikit agak berbeda dari yang lain.",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "坂道の向こうには青空が広がっていた";
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
"01" : "17 Oktober 2023",
"02" : "24 Oktober 2023",
"03" : "31 Oktober 2023",
"04" : "7 November 2023",
"05" : "14 November 2023",
"06" : "21 November 2023",
"07" : "28 November 2023",
"08" : "5 Desember 2023",
"09" : "12 Desember 2023",
"10" : "19 Desember 2023",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  memberParticipate[i.toString().padStart(2, '0')] = "僕が見たかった青空";
}
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-001.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-002.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-003.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-004.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-005.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-006.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-007.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-008.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-009.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-010.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-001a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-002a.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-003a.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-004a.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-005a.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-006a.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-007a.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-008a.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-009a.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-010a.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-001b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-002b.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-003b.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-004b.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-005b.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-006b.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-007b.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-008b.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-009b.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-010b.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================


const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-001c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-002c.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-003c.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-004c.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-005c.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-006c.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-007c.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-008c.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-009c.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-010c.jpg",
  };
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================


const imageThumbD = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-001d.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-002d.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-003d.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-004d.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-005d.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-006d.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-007d.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-008d.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-009d.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/sakamichiaozora/sakamichiaozora-010d.jpg",
  };
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://lokerwfh.net/SQyXc93W",
"02" : "https://lokerwfh.net/FIPv8pwP",
"03" : "https://lokerwfh.net/LhsT7",
"04" : "https://lokerwfh.net/65lCJoAO",
"05" : "https://lokerwfh.net/q5VXBz",
"06" : "https://lokerwfh.net/Lr0NY",
"07" : "https://lokerwfh.net/GIa0wnG",
"08" : "https://lokerwfh.net/7Z0wo",
"09" : "https://lokerwfh.net/2EAmFDv",
"10" : "https://lokerwfh.net/3Nl2",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/sakamichi-no-mukou-ni-wa-aozora-ga-hirogatteita-olKHd";
}
console.log(linkTrakteer);

// =======================
// LINK RAW
// =======================

const linkRAW = {
"01" : "https://aidoru-online.me/torrents-details.php?id=250123&hit=1",
"02" : "https://aidoru-online.me/torrents-details.php?id=250123&hit=1",
"03" : "https://aidoru-online.me/torrents-details.php?id=250939&hit=1",
"04" : "https://aidoru-online.me/torrents-details.php?id=251396&hit=1",
"05" : "https://aidoru-online.me/torrents-details.php?id=251927&hit=1",
"06" : "https://aidoru-online.me/torrents-details.php?id=252309&hit=1",
"07" : "https://aidoru-online.me/torrents-details.php?id=252718&hit=1",
"08" : "https://aidoru-online.me/torrents-details.php?id=253199&hit=1",
"09" : "https://aidoru-online.me/torrents-details.php?id=253680&hit=1",
"10" : "https://aidoru-online.me/torrents-details.php?id=254169&hit=1",
  };
console.log(linkRAW);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);
