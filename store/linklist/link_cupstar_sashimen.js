
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"00" : "Di episode 0 kali ini, member yang pertama kali memakan Cupstar bersama adalah Yoda Yuuki dari gen-3 dengan Ikeda Teresa dari gen-5.",
"01" : "Di episode 1 kali ini, pasangan member yang akan memakan Cupstar bersama adalah Yamashita Mizuki & Tamura Mayu yang dipilih dengan sebutan kombinasi 'dua orang yang bisa melakukan apa saja'.",
"02" : "Di episode 2 kali ini, pasangan member yang akan memakan Cupstar bersama adalah Umezawa Minami & Yumiki Nao yang dipilih dengan sebutan kombinasi 'si serius dan si penggoda'.",
"03" : "Di episode 3 kali ini, pasangan member yang akan memakan Cupstar bersama adalah Endo Sakura & Ogawa Aya yang dipilih dengan sebutan kombinasi 'mereka yang disayang sama teman-teman seangkatannya'.",
"04" : "Di episode 4 kali ini, pasangan member yang akan memakan Cupstar bersama adalah Ito Riria & Inoue Nagi yang dipilih dengan sebutan kombinasi 'Dua orang yang sangat cinta anime'.",
"05" : "Di episode 5 kali ini, pasangan member yang akan memakan Cupstar bersama adalah Kaki Haruka & Sugawara Satsuki yang dipilih dengan sebutan kombinasi 'sering diandalkan oleh teman seangkatan'.",
"06" : "Di episode 6 kali ini, pasangan member yang akan memakan Cupstar bersama adalah Hayashi Runa & Ichinose Miku yang dipilih dengan sebutan kombinasi 'Duo yang Mudah Dibentuk'.",
"07" : "Di episode 7 kali ini, pasangan member yang akan memakan Cupstar bersama adalah Kanagawa Saya & Kawasaki Sakura yang dipilih dengan sebutan kombinasi 'teman sebangku' karena namanya berada saling bersebelahan.",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 0; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "サシメン";
}
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {
"00" : "| Vol.0 (Yoda Yuuki & Ikeda Teresa)",
"01" : "| Vol.1 (Yamashita Mizuki & Tamura Mayu)",
"02" : "| Vol.2 (Umezawa Minami & Yumiki Nao)",
"03" : "| Vol.3 (Endo Sakura & Ogawa Aya)",
"04" : "| Vol.4 (Ito Riria & Inoue Nagi)",
"05" : "| Vol.5 (Kaki Haruka & Sugawara Satsuki)",
"06" : "| Vol.6 (Hayashi Runa & Ichinose Miku)",
"07" : "| Vol.7 (Kanagawa Saya & Kawasaki Sakura)",
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"00" : "19 April 2024",
"01" : "2 Mei 2024",
"02" : "6 Juni 2024",
"03" : "4 Juli 2024",
"04" : "1 Agustus 2024",
"05" : "5 September 2024",
"06" : "3 Oktober 2024",
"07" : "7 November 2024",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"00" : "与田祐希、池田瑛紗",
"01" : "山下美月、田村真佑",
"02" : "梅澤美波、弓木奈於",
"03" : "遠藤さくら、小川彩",
"04" : "伊藤理々杏、井上和",
"05" : "賀喜遥香、菅原咲月",
"06" : "林瑠奈、一ノ瀬美空",
"07" : "金川紗耶、川﨑桜",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 0; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/sashimen/sashimen${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 0; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/sashimen/sashimen${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 0; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/sashimen/sashimen${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 0; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/sashimen/sashimen${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 0; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/sashimen/sashimen${paddedNumber}d.jpg`;
}
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"00" : "https://lokerwfh.net/krxpWh",
"01" : "https://sfl.gl/nj4Z6X74",
"02" : "https://sfl.gl/xtdKqt",
"03" : "https://sfl.gl/imEeeOf",
"04" : "https://sfl.gl/6Xcwlp9",
"05" : "https://sfl.gl/aHuovi",
"06" : "https://sfl.gl/iD4jeR",
"07" : "https://sfl.gl/db0T",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 0; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka46-cupstar-sashimen-9eYqV";
}
console.log(linkTrakteer);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 0; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);