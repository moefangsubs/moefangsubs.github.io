
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Sakura pindah ke sebuah rumah karena akan bekerja di sebuah toko buku. Ia ragu akan menyapa tetangga barunya, namun ia kaget tetangga itu sedang berada di luar dan hendak masuk ke rumahnya. Dia adalah Makino. Saat Makino memberikan suvenir manisan, terdengar suara teriakan.",
"02" : "Sakura penasaran siapa pelaku yang menempelkan kertas penuh teka-teki itu. Ia pun menanyakan kepada tetangga yang baru ia kenal, Makino dan Shiraki karena menurut mereka sudah sering terjadi hal seperti ini.",
"03" : "Sakura tengah memecahkan teka-teki yang ia perkirakan adalah permainan kata dari huruf Katakana acak dengan sampah yang ada di papan pengumuman.",
"04" : "Makino menceritakan apakah Sakura sudah bertemu dengan pria botak, dan Sakura menjawab sudah pernah menyapanya, bahkan ia merasa aneh mengapa pria itu begitu ketakutan.",
"05" : "Setelah memecahkan kode, tiba-tiba datang tetangga lainnya yang menemukan kembali teka-teki, namun teka-teki ini berbeda dengan yang sebelumnya.",
"06" : "Sakura kembali memecahkan kode baru yang dibawa Shirakawa, beberapa hari kemudian ia kagum bertemu dengan detektif sungguhan.",
"07" : "Sang detektif yang penasaran ruang Nunokawa, mendapati Nunokawa diikat, dan Sakura memberi kesimpulan singkat.",
"08" : "Setelah Sakura memberi kesimpulan, ia mencurigai pengelola apartemen itu.",
"09" : "Setelah kejar-kejaran antara pengelola apartemen dan para tetangga ke lantai atas apartemen, Sakura memberikan kesimpulan singkat.",
"10" : "Tendo Sakura akhirnya bisa menemukan siapa pelaku dalam insiden ini.",
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
"06" : "| Episode 6",
"07" : "| Episode 7",
"08" : "| Episode 8",
"09" : "| Episode 9",
"10" : "| Episode 10 [TAMAT]",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "25 Maret 2024",
"02" : "26 Maret 2024",
"03" : "27 Maret 2024",
"04" : "28 Maret 2024",
"05" : "29 Maret 2024",
"06" : "1 April 2024",
"07" : "2 April 2024",
"08" : "3 April 2024",
"09" : "4 April 2024",
"10" : "5 April 2024",
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
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei03.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei04.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei05.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei06.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei07.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei08.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei09.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei10.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei01a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei02a.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei03a.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei04a.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei05a.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei06a.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei07a.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei08a.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei09a.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei10a.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei01b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei02b.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei03b.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei04b.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei05b.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei06b.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei07b.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei08b.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei09b.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei10b.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// ======================= 

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei01c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei02c.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei03c.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei04c.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei05c.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei06c.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei07c.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei08c.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei09c.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/hikkoushitantei/hikkoushitantei10c.jpg",
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
"06" : "https://lokerwfh.net/pS0O",
"07" : "https://lokerwfh.net/Mk6f5eZk",
"08" : "https://lokerwfh.net/CBZli",
"09" : "https://lokerwfh.net/cUpjAEQ",
"10" : "https://lokerwfh.net/Z0z8",
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