
// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂46 「チャンスは平等」初回仕様限定版の特典映像【新参者LIVE】";
}
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| Bonus Type A1 - Sekai de Ichiban Kodoku na Lover (Sugawara Satsuki)",
"02" : "| Bonus Type A2 - Inochi wa Utsukushii (Okamoto Hina)",
"03" : "| Bonus Type A3 - Watashi no Tame ni, Dare ka no Tame ni (Okuda Iroha)",
"04" : "| Bonus Type A4 - Bandaid Hagasu you na Wakarekata",
"05" : "| Bonus Type B1 - Tsuyogaru Tsubomi (Inoue Nagi)",
"06" : "| Bonus Type B2 - Kikkake (Ogawa Aya)",
"07" : "| Bonus Type B3 - Teressa'21 (Ikeda Teresa)",
"08" : "| Bonus Type B4 - Kokoro ni mo nai koto",
"09" : "| Bonus Type B5 - Itsu no Hi ka, Ano Uta o...",
"10" : "| Bonus Type C1 - Hane no Kioku (Ioki Mao)",
"11" : "| Bonus Type C2 - Machine Gun Rain (Nakanishi Aruno)",
"12" : "| Bonus Type C3 - Zetsubou no Ichibyou Mae",
"13" : "| Bonus Type C4 - Actually...",
"14" : "| Bonus Type D1 - Kaerimichi wa Toomawari shitakunaru (Tomisato Nao)",
"15" : "| Bonus Type D2 - Kokoro no Kusuri (Ichinose Miku)",
"16" : "| Bonus Type D3 - Synchronicity (Kawasaki Sakura)",
"17" : "| Bonus Type D4 - 17fun",
"18" : "| Bonus Type D5 - Kangaenai you ni suru",
};

console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {};
for (let i = 1; i <= 9999; i++) {
  descOnAirDate[i.toString().padStart(2, '0')] = "10 April 2024";
}
console.log(descOnAirDate);

// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "菅原咲月",
"02" : "岡本姫奈",
"03" : "奥田いろは",
"04" : "乃木坂46 5期生",
"05" : "井上和",
"06" : "小川彩",
"07" : "池田瑛紗",
"08" : "乃木坂46 5期生",
"09" : "乃木坂46 5期生",
"10" : "五百城茉央",
"11" : "中西アルノ",
"12" : "乃木坂46 5期生",
"13" : "乃木坂46 5期生",
"14" : "冨里奈央",
"15" : "一ノ瀬美空",
"16" : "川﨑桜",
"17" : "乃木坂46 5期生",
"18" : "乃木坂46 5期生",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-a1.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-a2.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-a3.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-a4.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-b1.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-b2.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-b3.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-b4.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-b5.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-c1.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-c2.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-c3.jpg",
"13" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-c4.jpg",
"14" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-d1.jpg",
"15" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-d2.jpg",
"16" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-d3.jpg",
"17" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-d4.jpg",
"18" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus35/35shinzanmono-d5.jpg",
};
console.log(imageThumbBig);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://lokerwfh.net/68PCNK5n",
"02" : "https://lokerwfh.net/cAHFL5mr",
"03" : "https://lokerwfh.net/u1rdu",
"04" : "https://lokerwfh.net/lnWG",
"05" : "https://lokerwfh.net/2lTCJ",
"06" : "https://lokerwfh.net/AK1F9IS",
"07" : "https://lokerwfh.net/vsj9U",
"08" : "https://lokerwfh.net/44ZWUEd",
"09" : "https://lokerwfh.net/Yn88b",
"10" : "https://lokerwfh.net/Cmdfjq2",
"11" : "https://lokerwfh.net/iPWQ",
"12" : "https://lokerwfh.net/pwLe",
"13" : "https://lokerwfh.net/Aa9cW",
"14" : "https://lokerwfh.net/HIXJjWQ",
"15" : "https://lokerwfh.net/ceoPXW",
"16" : "https://lokerwfh.net/d0JV",
"17" : "https://lokerwfh.net/Q7LQ3ap",
"18" : "https://lokerwfh.net/nZPs4mni",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
"01" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"02" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"03" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"04" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"05" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"06" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"07" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"08" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"09" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"10" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"11" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"12" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"13" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"14" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"15" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"16" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"17" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
"18" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-35th-bonus-shinzanmono-AJn8l",
};
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 9999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "OhitorisamaTengoku-Kikaku";
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
