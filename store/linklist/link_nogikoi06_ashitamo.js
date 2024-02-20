
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"01" : "Nogikoi Ashita mo ano Basho de kali ini bagian pertamanya adalah Shiraishi Mai, dan terdapat dua ending, yaitu \"sweet ending\" dan \"bitter ending\".",
	"02" : "Nogikoi Ashita mo ano Basho de kali ini bagian pertamanya adalah Shiraishi Mai, dan terdapat dua ending, yaitu \"sweet ending\" dan \"bitter ending\".",
	"03" : "Nogikoi Ashita mo ano Basho de kali ini bagian keduanya adalah Ikuta Erika, sama seperti punyanya Maiyan terdapat dua ending, yaitu \"sweet ending\" dan \"bitter ending\".",
	"04" : "Nogikoi Ashita mo ano Basho de kali ini bagian keduanya adalah Ikuta Erika, sama seperti punyanya Maiyan terdapat dua ending, yaitu \"sweet ending\" dan \"bitter ending\".",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木恋・明日も、あの場所で";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Shiraishi Mai (Sweet)",
	"02" : "| Shiraishi Mai (Bitter)",
	"03" : "| Ikuta Erika (Sweet)",
	"04" : "| Ikuta Erika (Bitter)",
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "11 Januari 2019",
	"02" : "11 Januari 2019",
	"03" : "16 Januari 2019",
	"04" : "16 Januari 2019",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "白石麻衣",
	"02" : "白石麻衣",
	"03" : "生田絵梨花",
	"04" : "生田絵梨花",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-06-ashitamo-mai.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-06-ashitamo-mai.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-06-ashitamo-ikuta.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogikoi/nogikoi-06-ashitamo-ikuta.jpg",
};
console.log(imageThumbBig);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/wQmiRF6b",
	"02" : "https://lokerwfh.net/apalJA",
	"03" : "https://lokerwfh.net/zX3ytlj",
	"04" : "https://lokerwfh.net/4dqcX",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogikoi-ashita-mo-ano-basho-de-Q90FB";
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