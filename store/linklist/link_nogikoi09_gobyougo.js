// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木恋・5秒後、キミを好きになる";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Opening",
	"02" : "| Ending",
	"03" : "| Individual - Sato Rika",
	"04" : "| Individual - Yumiki Nao",
	"05" : "| Individual - Matsuo Miyu",
	"06" : "| Individual - Hayashi Runa",
	"07" : "| Individual - Kuromi Haruka",
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {};
for (let i = 1; i <= 9999; i++) {
  descOnAirDate[i.toString().padStart(2, '0')] = "31 Maret - 4 April 2021";
}
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "佐藤璃果、弓木奈於、松尾美佑、林瑠奈、黒見明香",
	"02" : "佐藤璃果、弓木奈於、松尾美佑、林瑠奈、黒見明香",
	"03" : "佐藤璃果",
	"04" : "弓木奈於",
	"05" : "松尾美佑",
	"06" : "林瑠奈",
	"07" : "黒見明香",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-01.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-02.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-pv-rika.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-pv-yumiki.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-pv-miyu.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-pv-runa.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-pv-kuromi.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-01a.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-02a.jpg",
	"03" : "doc/blank.png",
	"04" : "doc/blank.png",
	"05" : "doc/blank.png",
	"06" : "doc/blank.png",
	"07" : "doc/blank.png",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-01b.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-02b.jpg",
	"03" : "doc/blank.png",
	"04" : "doc/blank.png",
	"05" : "doc/blank.png",
	"06" : "doc/blank.png",
	"07" : "doc/blank.png",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-01c.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-09-5byougo-02c.jpg",
	"03" : "doc/blank.png",
	"04" : "doc/blank.png",
	"05" : "doc/blank.png",
	"06" : "doc/blank.png",
	"07" : "doc/blank.png",
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
	"01" : "https://lokerwfh.net/5dZn",
	"02" : "https://lokerwfh.net/U23mh",
	"03" : "https://lokerwfh.net/TaKEg",
	"04" : "https://lokerwfh.net/ZDrH8Jc8",
	"05" : "https://lokerwfh.net/6NNafFh",
	"06" : "https://lokerwfh.net/7sumJ",
	"07" : "https://lokerwfh.net/8c7O6d",
  };
console.log(linkHardsub);

// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 9999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "nogikoi5byou";
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