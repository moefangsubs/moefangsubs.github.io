
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"211211" : "Pada 11 Desember 2021, Saluran musik Jepang MTV Japan menayangkan remake dari “MTV Unplugged Ikuta Erika from Nogizaka46” tahun 2017. “MTV Unplugged Nogizaka46” sekali lagi akan menghadirkan Ikuta Erika dengan suaranya yang luar biasa disertai kali ini oleh member Nogizaka46 Higuchi Hina, Kubo Shiori, Endo Sakura dan Kaki Haruka. Lagu-lagu tersebut dipilih oleh Ikuta Erika. Selanjutnya, saluran tersebut membawakan serial empat bagian “MTV INSIDE: Nogizaka46 – 10th Anniversary” untuk menandai ulang tahun ke-10 Nogizaka46.",
	"211228" : "MTV INSIDE: Nogizaka46 ～10th Anniversary～ episode 1 dimana Ikuta Erika yang baru saja lulus dari Nogizaka46. Disini kita akan melihat jejak perjalanan Ikuchan dari awal dia menyukai musikal sampai kelulusannya. Buat oshinya Ikuchan penting banget nonton ini deh!",
	"220108" : "Pada 11 Desember 2021, telah ditayangkan “MTV Unplugged Nogizaka46” yang mana sekali lagi menghadirkan Ikuta Erika dengan suaranya yang luar biasa bersama Higuchi Hina, Kubo Shiori, Endo Sakura dan Kaki Haruka. Dalam kesempatan ini, saya mencoba sub untuk bagian Making of-nya.",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {
	"211211" : "MTV Unplugged 2021",
	"211228" : "MTV Inside Episode 1",
	"220108" : "MTV Unplugged 2021 Making of",
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"211211" : "| MTV Unplugged 2021",
	"211228" : "| MTV Inside Episode 1",
	"220108" : "| MTV Unplugged 2021 Making of",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"211211" : "11 Desember 2021",
	"211228" : "28 Desember 2021",
	"220108" : "8 Januari 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"211211" : "生田絵梨花、樋口日奈、久保史緒里、遠藤さくら、賀喜遥香",
	"211228" : "生田絵梨花、樋口日奈、久保史緒里、遠藤さくら、賀喜遥香",
	"220108" : "生田絵梨花、樋口日奈、久保史緒里、遠藤さくら、賀喜遥香",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"211211" : "https://ik.imagekit.io/moefang/post/random/211211-mtv-unplugged0.jpg",
	"211228" : "https://ik.imagekit.io/moefang/post/random/211228-mtvinside-01.jpg",
	"220108" : "https://ik.imagekit.io/moefang/post/random/220108-making-of-mtv-unplugged.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"211211" : "https://ik.imagekit.io/moefang/post/random/211211-mtv-unplugged1.jpg",
	"211228" : "https://ik.imagekit.io/moefang/post/random/211228-mtvinside-01a.jpg",
	"220108" : "https://ik.imagekit.io/moefang/post/random/220108-making-of-mtv-unplugged-a.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"211211" : "https://ik.imagekit.io/moefang/post/random/211211-mtv-unplugged2.jpg",
	"211228" : "https://ik.imagekit.io/moefang/post/random/211228-mtvinside-01b.jpg",
	"220108" : "https://ik.imagekit.io/moefang/post/random/220108-making-of-mtv-unplugged-b.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"211211" : "https://ik.imagekit.io/moefang/post/random/211211-mtv-unplugged3.jpg",
	"211228" : "https://ik.imagekit.io/moefang/post/random/211228-mtvinside-01c.jpg",
	"220108" : "https://ik.imagekit.io/moefang/post/random/220108-making-of-mtv-unplugged-c.jpg",
};
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {
	"211211" : "https://ik.imagekit.io/moefang/post/random/211211-mtv-unplugged4.jpg",
	"211228" : "https://ik.imagekit.io/moefang/post/random/211228-mtvinside-01d.jpg",
	"220108" : "https://ik.imagekit.io/moefang/post/random/220108-making-of-mtv-unplugged-d.jpg",
};
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"211211" : "https://lokerwfh.net/WFY7bOc",
	"211228" : "https://lokerwfh.net/Oub3S",
	"220108" : "https://lokerwfh.net/oj7Du",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
	"211211" : "https://trakteer.id/moefangsubs/showcase/mtv-unplugged-2021-ikuta-erika-FanUP",
	"211228" : "https://trakteer.id/moefangsubs/showcase/mtv-inside-nogizaka46-10th-anniversary-j5sSa",
	"220108" : "https://trakteer.id/moefangsubs/showcase/220108-making-of-mtv-unplugged-nogizaka46-XZggH",
};
console.log(linkTrakteer);


// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 999999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
};
console.log(subLanguage);