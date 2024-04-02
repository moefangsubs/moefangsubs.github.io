
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Sakura pindah ke sebuah rumah karena akan bekerja di sebuah toko buku. Ia ragu akan menyapa tetangga barunya, namun ia kaget tetangga itu sedang berada di luar dan hendak masuk ke rumahnya. Dia adalah Makino. Saat Makino memberikan suvenir manisan, terdengar suara teriakan.",
"02" : "Sakura penasaran siapa pelaku yang menempelkan kertas penuh teka-teki itu. Ia pun menanyakan kepada tetangga yang baru ia kenal, Makino dan Shiraki karena menurut mereka sudah sering terjadi hal seperti ini.",
"03" : "Sakura tengah memecahkan teka-teki yang ia perkirakan adalah permainan kata dari huruf Katakana acak dengan sampah yang ada di papan pengumuman.",
"04" : "Makino menceritakan apakah Sakura sudah bertemu dengan pria botak, dan Sakura menjawab sudah pernah menyapanya, bahkan ia merasa aneh mengapa pria itu begitu ketakutan.",
"05" : "Setelah memecahkan kode, tiba-tiba datang tetangga lainnya yang menemukan kembali teka-teki, namun teka-teki ini berbeda dengan yang sebelumnya.",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  nameShow[paddedNumber] = `引越し探偵サクラ`;
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| Episode 1",
"02" : "| Episode 2",
"03" : "| Episode 3",
"04" : "| Episode 4",
"05" : "| Episode 5",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "25 Maret 2024",
"02" : "26 April 2024",
"03" : "27 April 2024",
"04" : "28 April 2024",
"05" : "29 April 2024",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  memberParticipate[paddedNumber] = `遠藤さくら`;
}
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei01.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei02.jpg",
"03" : "",
"04" : "",
"05" : "",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei01a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei02a.jpg",
"03" : "",
"04" : "",
"05" : "",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei01b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei02b.jpg",
"03" : "",
"04" : "",
"05" : "",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// ======================= 

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei01c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei02c.jpg",
"03" : "",
"04" : "",
"05" : "",
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
"01" : "https://lokerwfh.net/SaClhFQ",
"02" : "https://lokerwfh.net/ec4YMAys",
"03" : "https://lokerwfh.net/kFNE",
"04" : "https://lokerwfh.net/4fZu7",
"05" : "https://lokerwfh.net/yB1Kluk",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/hikkoushi-tantei-sakura-y3cwy";
};
console.log(linkTrakteer);


// =======================
// PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 999999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "DetektifSakuchan";
};
console.log(filePassword);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 999999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
};
console.log(subLanguage);