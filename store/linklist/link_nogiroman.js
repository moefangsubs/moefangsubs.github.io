
// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂浪漫";
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
	"01" : "2 April 2012",
	"02" : "3 April 2012",
	"03" : "4 April 2012",
	"04" : "5 April 2012",
	"05" : "9 April 2012",
	"06" : "10 April 2012",
	"07" : "11 April 2012",
	"08" : "12 April 2012",
	"09" : "16 April 2012",
	"10" : "17 April 2012",
	"11" : "18 April 2012",
	"12" : "19 April 2012",
	"13" : "23 April 2012"
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "生駒里奈",
	"02" : "橋本奈々未",
	"03" : "白石麻衣",
	"04" : "桜井玲香",
	"05" : "松村沙友里",
	"06" : "高山一実",
	"07" : "生田絵梨花",
	"08" : "中田花奈",
	"09" : "白石麻衣",
	"10" : "桜井玲香",
	"11" : "井上小百合",
	"12" : "生駒里奈",
	"13" : "橋本奈々未"
  };
console.log(memberParticipate);


// =======================
// karya sastra
// =======================

const LiteraturName = {
	"01" : "夢十夜 (Yume Juu-ya)",
	"02" : "堕落論 (Darakuron)",
	"03" : "蒲団 (Futon)",
	"04" : "女生徒 (Joseito)",
	"05" : "夫婦善哉 (Meoto Zenzai)",
	"06" : "山椒大夫 (Sanjou Dayuu)",
	"07" : "野菊の墓 (Nogiku no Haka)",
	"08" : "銀河鉄道の夜 (Gin'ga Tetsudou no Yoru)",
	"09" : "濹東綺譚 (Bokuto Kitan)",
	"10" : "或る女 (Aru Onna)",
	"11" : "檸檬 (Lemon)",
	"12" : "一握の砂 (Ichiaku no Suna)",
	"13" : "汚れっちまった悲しみに (Yogorecchimatta Kanashimi ni)"
  };
console.log(LiteraturName);


const LiteraturAuthor = {
	"01" : "夏目漱石 (Natsume Souseki)",
	"02" : "坂口安吾 (Sakaguchi Ango)",
	"03" : "田山花袋 (Tayama Katai)",
	"04" : "太宰治 (Dazai Osamu)",
	"05" : "織田作之助 (Oda Sakunosuke)",
	"06" : "森鷗外 (Mori Ougai)",
	"07" : "伊藤左千夫 (Itou Sachio)",
	"08" : "宮沢賢治 (Miyazawa Kenji)",
	"09" : "永井荷風 (Nagai Kafuu)",
	"10" : "有島武郎 (Arishima Takeo)",
	"11" : "梶井基次郎 (Kajii Motojiro)",
	"12" : "石川啄木 (Ishikawa Takuboku)",
	"13" : "中原中也 (Nakahara Chuuya)"
  };
console.log(LiteraturAuthor);



// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiroman/nogiroman-0${paddedNumber}.jpg`;
}
console.log(imageThumbBig);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/GEVPa",
	"02" : "https://lokerwfh.net/TBXd",
	"03" : "https://lokerwfh.net/HWvhB",
	"04" : "https://lokerwfh.net/vAGGy",
	"05" : "https://lokerwfh.net/SdJn",
	"06" : "https://lokerwfh.net/68i3",
	"07" : "https://lokerwfh.net/FvWV",
	"08" : "https://lokerwfh.net/txCa",
	"09" : "https://lokerwfh.net/Is5tj",
	"10" : "https://lokerwfh.net/XI9t",
	"11" : "https://lokerwfh.net/EVuEi9g6",
	"12" : "https://lokerwfh.net/HILItjsE",
	"13" : "https://lokerwfh.net/vBjR8"
  };
console.log(linkHardsub);

// =======================
// LINK HARDSUB
// =======================

const linkSoftsub = {
	"01" : "https://lokerwfh.net/hgV0k0L",
	"02" : "https://lokerwfh.net/gq6SnL",
	"03" : "https://lokerwfh.net/mm9iUDE",
	"04" : "https://lokerwfh.net/EuyzlM",
	"05" : "https://lokerwfh.net/tPgbOX",
	"06" : "https://lokerwfh.net/W7VQ1",
	"07" : "https://lokerwfh.net/Oq5F",
	"08" : "https://lokerwfh.net/BLXkUPd",
	"09" : "https://lokerwfh.net/2xTE",
	"10" : "https://lokerwfh.net/dhhDSXc",
	"11" : "https://lokerwfh.net/ZWnfZxZH",
	"12" : "https://lokerwfh.net/7rUOCbY",
	"13" : "https://lokerwfh.net/RJlLU7"
  };
console.log(linkSoftsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka-romance-qIQuW";
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