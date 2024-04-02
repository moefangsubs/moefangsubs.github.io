// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "新・乃木坂スター誕生！5期生の挑戦";
}
console.log(nameShow);

// =======================
// EPISODE
// =======================

const descEpisode = {};

for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  descEpisode[paddedNumber] = `| HULU Episode ${i}`;
}
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "25 April 2022",
"02" : "2 Mei 2022",
"03" : "9 Mei 2022",
"04" : "16 Mei 2022",
"05" : "23 Mei 2022",
"06" : "30 Mei 2022",
"07" : "6 Juni 2022",
"08" : "13 Juni 2022",
"09" : "20 Juni 2022",
"10" : "27 Juni 2022",
"11" : "4 Juli 2022",
"12" : "11 Juli 2022",
"13" : "18 Juli 2022",
"14" : "25 Juli 2022",
"15" : "1 Agustus 2022",
"16" : "8 Agustus 2022",
"17" : "15 Agustus 2022",
"18" : "22 Agustus 2022",
"19" : "29 Agustus 2022",
"20" : "5 September 2022",
"21" : "12 September 2022",
"22" : "19 September 2022",
"23" : "26 September 2022",
"24" : "3 Oktober 2022",
"25" : "10 Oktober 2022",
"26" : "17 Oktober 2022",
"27" : "24 Oktober 2022",
"28" : "31 Oktober 2022",
"29" : "7 November 2022",
"30" : "14 November 2022",
"31" : "21 November 2022",
"32" : "28 November 2022",
"33" : "5 Desember 2022",
"34" : "12 Desember 2022",
"35" : "19 Desember 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "乃木坂46 5期生",
"02" : "乃木坂46 5期生",
"03" : "乃木坂46 5期生",
"04" : "乃木坂46 5期生",
"05" : "乃木坂46 5期生",
"06" : "乃木坂46 5期生",
"07" : "乃木坂46 5期生",
"08" : "乃木坂46 5期生",
"09" : "乃木坂46 5期生",
"10" : "乃木坂46 5期生",
"11" : "乃木坂46 5期生",
"12" : "乃木坂46 5期生",
"13" : "乃木坂46 5期生",
"14" : "乃木坂46 5期生、和田まあや、久保史緒里、金川紗耶",
"15" : "乃木坂46 5期生、与田祐希、遠藤さくら、弓木奈於",
"16" : "乃木坂46 5期生",
"17" : "乃木坂46 5期生",
"18" : "乃木坂46 5期生",
"19" : "乃木坂46 5期生",
"20" : "乃木坂46 5期生",
"21" : "乃木坂46 5期生",
"22" : "乃木坂46 5期生",
"23" : "乃木坂46 5期生",
"24" : "乃木坂46 5期生、林瑠奈",
"25" : "乃木坂46 5期生",
"26" : "乃木坂46 5期生",
"27" : "乃木坂46 5期生",
"28" : "乃木坂46 5期生、柴田柚菜",
"29" : "乃木坂46 5期生",
"30" : "乃木坂46 5期生、伊藤理々杏",
"31" : "乃木坂46 5期生",
"32" : "乃木坂46 5期生",
"33" : "乃木坂46 5期生、中村麗乃",
"34" : "乃木坂46 5期生",
"35" : "乃木坂46 5期生、筒井あやめ",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-01.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-02.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-03.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-04.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-05.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-06.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-07.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-08.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-09.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-10.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-11.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-12.jpg",
"13" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-13.jpg",
"14" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-14.jpg",
"15" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-15.jpg",
"16" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-16.jpg",
"17" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-17.jpg",
"18" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-18.jpg",
"19" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-19.jpg",
"20" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-20.jpg",
"21" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-21.jpg",
"22" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-22.jpg",
"23" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-23.jpg",
"24" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-24.jpg",
"25" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-25.jpg",
"26" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-26.jpg",
"27" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-27.jpg",
"28" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-28.jpg",
"29" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-29.jpg",
"30" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-30.jpg",
"31" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-31.jpg",
"32" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-32.jpg",
"33" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-33.jpg",
"34" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-34.jpg",
"35" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistarhulu-35.jpg",
  };
console.log(imageThumbBig);


// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/shin-nogizaka-star-tanjou-5kisei-no-chousen-tJmDh";
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