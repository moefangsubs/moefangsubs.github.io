// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "新・乃木坂スター誕生！5期生はじめてトーク";
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
"01" : "25 April 2022",
"02" : "3 Mei 2022",
"03" : "10 Mei 2022",
"04" : "17 Mei 2022",
"05" : "24 Mei 2022",
"06" : "31 Mei 2022",
"07" : "7 Juni 2022",
"08" : "14 Juni 2022",
"09" : "21 Juni 2022",
"10" : "28 Juni 2022",
"11" : "5 Juli 2022",
"12" : "12 Juli 2022",
"13" : "19 Juli 2022",
"14" : "26 Juli 2022",
"15" : "2 Agustus 2022",
"16" : "9 Agustus 2022",
"17" : "16 Agustus 2022",
"18" : "23 Agustus 2022",
"19" : "30 Agustus 2022",
"20" : "6 September 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "小川彩、菅原咲月、一ノ瀬美空",
"02" : "五百城茉央、池田瑛紗、冨里奈央",
"03" : "奥田いろは、川﨑桜、井上和",
"04" : "一ノ瀬美空、井上和、五百城茉央",
"05" : "菅原咲月、池田瑛紗、冨里奈央",
"06" : "井上和、中西アルノ、奥田いろは",
"07" : "小川彩、岡本姫奈、菅原咲月",
"08" : "川﨑桜、冨里奈央、一ノ瀬美空",
"09" : "中西アルノ、川﨑桜、一ノ瀬美空",
"10" : "小川彩、池田瑛紗、奥田いろは",
"11" : "岡本姫奈、五百城茉央、菅原咲月",
"12" : "小川彩、岡本姫奈、菅原咲月",
"13" : "川﨑桜、池田瑛紗、井上和",
"14" : "冨里奈央、一ノ瀬美空、中西アルノ",
"15" : "岡本姫奈、小川彩、川﨑桜",
"16" : "五百城茉央、奥田いろは、中西アルノ",
"17" : "池田瑛紗、井上和、菅原咲月",
"18" : "五百城茉央、菅原咲月、中西アルノ",
"19" : "小川彩、一ノ瀬美空、池田瑛紗",
"20" : "井上和、冨里奈央、川﨑桜",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-01.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-02.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-03.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-04.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-05.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-06.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-07.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-08.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-09.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-10.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-11.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-12.jpg",
"13" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-13.jpg",
"14" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-14.jpg",
"15" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-15.jpg",
"16" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-16.jpg",
"17" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-17.jpg",
"18" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-18.jpg",
"19" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-19.jpg",
"20" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-20.jpg",
  };
console.log(imageThumbBig);

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-01a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-02a.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-03a.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-04a.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-05a.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-06a.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-07a.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-08a.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-09a.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-10a.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-11a.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-12a.jpg",
"13" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-13a.jpg",
"14" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-14a.jpg",
"15" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-15a.jpg",
"16" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-16a.jpg",
"17" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-17a.jpg",
"18" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-18a.jpg",
"19" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-19a.jpg",
"20" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-20a.jpg",
  };
console.log(imageThumbA);

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-01b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-02b.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-03b.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-04b.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-05b.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-06b.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-07b.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-08b.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-09b.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-10b.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-11b.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-12b.jpg",
"13" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-13b.jpg",
"14" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-14b.jpg",
"15" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-15b.jpg",
"16" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-16b.jpg",
"17" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-17b.jpg",
"18" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-18b.jpg",
"19" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-19b.jpg",
"20" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-20b.jpg",
  };
console.log(imageThumbB);

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-01c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-02c.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-03c.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-04c.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-05c.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-06c.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-07c.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-08c.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-09c.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-10c.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-11c.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-12c.jpg",
"13" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-13c.jpg",
"14" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-14c.jpg",
"15" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-15c.jpg",
"16" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-16c.jpg",
"17" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-17c.jpg",
"18" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-18c.jpg",
"19" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-19c.jpg",
"20" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-20c.jpg",
  };
console.log(imageThumbC);

const imageThumbD = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-01d.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-02d.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-03d.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-04d.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-05d.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-06d.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-07d.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-08d.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-09d.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-10d.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-11d.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-12d.jpg",
"13" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-13d.jpg",
"14" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-14d.jpg",
"15" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-15d.jpg",
"16" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-16d.jpg",
"17" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-17d.jpg",
"18" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-18d.jpg",
"19" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-19d.jpg",
"20" : "https://ik.imagekit.io/mLsKqNSuB/post/startanjou/shinnogistar-hajimetetalk-20d.jpg",
  };
console.log(imageThumbD);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/shin-nogizaka-star-tanjou-5kisei-hajimete-talk-gYye9";
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