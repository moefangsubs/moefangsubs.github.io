
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
  "01": "Episode 1 kali ini adalah pertama dan terakhirnya buat Suzuki Ayane, dimana ia ingin pergi ke Asakusa dengan berbagai kegiatan, dan memilih Sato Rika sebagai partner jalan-jalannya kali ini sambil merayakan Rika-chan yang pertama kali masuk senbatsu. Seperti apakah keseruannya?",
  "02": "Episode 2 kali ini adalah Inoue Nagi, dan ia memilih ingin bersama senpai yang dikaguminya, Endo Sakura. Jalan-jalan kali ini adalah sekitaran Tokyo, dimana ingin mengunjungi tempat mitarashi dango, makanan kesukaannya senpainya, dan ingin pergi ke toko buku. Seperti apakah keseruannya?",
  "03": "Episode 3 kali ini adalah Sugawara Satsuki, dan ia memilih ingin bersama senpai yang dekat dengannya, Tamura Mayu. Jalan-jalan kali ini adalah pergi ke sebuah toko dessert, lalu setelah itu mereka menuju Sumida Aquarium.",
  "04": "Episode 4 kali ini adalah Iwamoto Renka, dan ia memilih ingin bersama kouhai yang katanya ingin berbicara dengannya, yaitu Shibata Yuna. Jalan-jalan kali ini adalah pergi ke berbagai toko di Shimokitazawa, mulai dari pernak-pernik, baju bekas, furnitur dan kafe.",
  "05": "Episode 5 kali ini adalah Ito Riria, dan ia memilih ingin bersama kouhai yang sehobi dengannya, yaitu Kaki Haruka. Jalan-jalan kali ini adalah pergi ke Animate, dimana mereka begitu menikmati berbagai goods anime, lalu di akhir mereka mencoba pergi ke game center.",
  "06": "Episode 6 kali ini adalah Tomisato Nao, dan ia memilih ingin bersama senpainya yang sekarang makin dekat dan menganggapnya kakak sendiri, Sato Kaede. Jalan-jalan kali ini adalah pergi ke Yomiuri Land Tokyo. Disana mereka berdua akan mencoba berbagai wahana dari yang santai sampai yang paling menantang.",
  "07": "Episode 7 kali ini adalah Ichinose, dan ia memilih ingin bersama senpainya yang sekarang makin dekat, Tamura Mayu. Jalan-jalan kali ini adalah pergi ke toko pembuatan baju dimana dia ingin punya baju yang samaan dengan Mayutan. Lalu dilanjut dengan menantang panjat tebing yang mana kedua orang ini baru pertama kali mencobanya. Setelah lelah, mereka pergi ke kedai yakiniku sambil ngobrol santai disana.<",
  "08": "Episode 8 kali ini adalah Tsutsui Ayame yang ingin berkemah alias nge-BBQ bareng sohibnya, Seimiya Rei. Sepanjang video kita akan menyaksikan kemah ala-ala mereka, lalu ditambah dengan obrolan randomnya mereka. Di akhir video, mereka turun dari tempat mereka kemah dan pergi ke sungai.",
  "09": "Episode 9 kali ini adalah Yakubo Mio, yang sama-sama memilih teman dekatnya sesama gen-4, Hayashi Runa. Mio-chan yang berkeinginan mencoba ke kedai restoran Cina sederhana namun belum punya pengalaman, maka ia berkesempatan mengajak Runa yang sudah sering pergi ke kedai Cina. Setelah itu perjalanan mereka diakhiri dengan melihat iluminasi atau pameran lampu sambil membuat dekorasi lilin untuk natal."
  };


// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂ぶらり";
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
  "01": "24 Maret 2023",
  "02": "21 April 2023",
  "03": "12 Mei 2023",
  "04": "12 Juni 2023",
  "05": "21 Juli 2023",
  "06": "10 Agustus 2023",
  "07": "28 September 2023",
  "08": "13 Oktober 2023",
  "09": "22 Desember 2023"
  };


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
  "01": "鈴木絢音、佐藤璃果",
  "02": "井上和、遠藤さくら",
  "03": "菅原咲月、田村真佑",
  "04": "岩本蓮加、柴谷柚菜",
  "05": "伊藤理々杏、賀喜遥香",
  "06": "冨里奈央、佐藤楓",
  "07": "一ノ瀬美空、田村真佑",
  "08": "筒井あやめ、清宮レイ",
  "09": "矢久保美緒、林瑠奈"
  };


// =======================
// FILE PASSWORD
// =======================

const filePassword = {};

for (let i = 1; i <= 9999; i++) {
  let paddedNumber;
  if (i >= 1 && i <= 9) {
    paddedNumber = `0${i}`;
  } else {
    paddedNumber = i.toString();
  }

  filePassword[paddedNumber] = `nogiburari${paddedNumber}`;
}

console.log(filePassword);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiburari/nogiburari${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiburari/nogiburari${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiburari/nogiburari${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiburari/nogiburari${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiburari/nogiburari${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
  "01": "https://lokerwfh.net/MKxN",
  "02": "https://lokerwfh.net/J4zaN8",
  "03": "https://lokerwfh.net/ytLlD",
  "04": "https://lokerwfh.net/4yyMJU",
  "05": "https://lokerwfh.net/fVehDX0b",
  "06": "https://lokerwfh.net/IOnguiB",
  "07": "https://lokerwfh.net/U6pp4Eur",
  "08": "https://lokerwfh.net/C7kWsH",
  "09": "https://lokerwfh.net/zEmwmG4z"
  };

// =======================
// LINK SOFTSUB as TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka-burari-tSBLr";
}
console.log(linkTrakteer);

// =======================
// LINK RAW
// =======================

const linkRAW = {};
for (let i = 1; i <= 9999; i++) {
  linkRAW[i.toString().padStart(2, '0')] = "https://www.akari46.cloud/search?q=Nogizaka+Burari";
}
console.log(linkRAW);

// =======================
// ASALRAW
// =======================

const rawSource = {};
for (let i = 1; i <= 9999; i++) {
  rawSource[i.toString().padStart(2, '0')] = "Akari46 / Aidoru";
}
console.log(rawSource);


// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);
