
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Kapten Nogizaka46, Umezawa Minami, dan rekan seangkatannya, Kubo Shiori, melakukan perjalanan ke Hokkaido sebagai \"Umekubo\". Tempat yang ingin mereka kunjungi, hal yang ingin mereka lihat, makanan yang ingin mereka coba, barang yang ingin mereka beli... semuanya direncanakan oleh mereka berdua. Terkadang, perjalanan ini mengikuti alur kejadian, menampilkan sisi asli yang hanya terlihat saat mereka berdua bersama! Hari pertama dari perjalanan orang dewasa yang penuh dengan kuliner Hokkaido dimulai!",
"02" : "Kapten Nogizaka46, Umezawa Minami, dan rekan seangkatannya, Kubo Shiori, melakukan perjalanan ke Hokkaido sebagai \"Umekubo\". Di malam hari pertama, percakapan serius antara keduanya mengungkapkan perasaan jujur yang sebelumnya tidak diketahui. Di hari kedua, mereka menuju \"teras lautan awan\" di Tomamu, yang merupakan tujuan inti dari perjalanan ini. Bagaimana rupa teras lautan awan yang ingin mereka lihat?",
"03" : "Member gen-4 Nogizaka46, Endo Sakura dan Yumiki Nao, melarikan diri ke Prefektur Shimane. Yumiki, yang berkata \"Jika bepergian, aku ingin pergi dengan Endo\", merencanakan perjalanan sendiri dan membawa buku panduan perjalanan! Mereka menikmati wisata ke tempat-tempat terkenal dan makan di sepanjang jalan, serta mendengar kisah-kisah kenangan Yumiki yang hanya bisa didengar di sini! Sebuah episode perjalanan pelarian santai yang penuh dengan suasana khas dari dua orang ini.",
"04" : "Member gen-4 Nogizaka46, Endo Sakura dan Yumiki Nao, melarikan diri ke Prefektur Shimane. Setelah menikmati BBQ dan bintang-bintang di tempat glamping, suasana mereka menjadi aneh...!? Di hari kedua, mereka melanjutkan perjalanan ke Tottori, menikmati makanan dan pemandangan. Di Bukit Pasir Tottori, mereka mengalami \"pelarian\" impian!? Selain itu, tantangan tak terduga menghampiri... Di akhir perjalanan pertama mereka bersama, Endo dan Yumiki saling mengungkapkan perasaan mereka.",
"05" : "Member gen-5 Nogizaka46, Ioki Mao dan Inoue Nagi, melarikan diri ke Okinawa. Okinawa adalah tempat yang mereka kunjungi selama tur nasional 2023. Tempat ini juga adalah tempat pertama kali Inoue memperkenalkan lagu sebagai center, namun dengan tekanan dan ketegangan sebagai center, dia tak bisa menikmati pemandangan atau makanan apapun, menyisakan kenangan pahit... Oleh karena itu, kali ini dengan tema perjalanan balas dendam, duo Ioki-Inoue akan menikmati wisata yang tak sempat mereka lakukan di Okinawa!",
"06" : "Pada episode 6, Ioki Mao dan Inoue Nagi dari gen-5 Nogizaka46 melanjutkan pelarian mereka di Okinawa. Di penginapan yang diinginkan Mao, mereka berbicara tentang realita sebagai member gen-5 yang jarang diketahui. Meski mereka masih tergolong junior di Nogizaka46, Mao dan Nagi adalah member gen-5 yang sering tampil di depan publik, dan mereka mengungkapkan kekhawatiran mereka menyambut gen-6. Pada hari kedua, cuaca cerah seperti biasa, dan mereka melakukan berbagai aktivitas khas Okinawa seperti membuat patung Shisa dan zipline. Dan akhirnya, apa yang terjadi?",
// "07" : "Dalam episode spesial ini, kami menayangkan adegan yang tidak masuk dalam episode utama dari pelarian Endo dan Yumiki ke Tottori (#4) serta pelarian Ioki Maodan Inoue Nagi ke Okinawa (#5-6)! Mereka mengunjungi berbagai tempat wisata di sekitar Bukit Pasir Tottori, dan Endo yang penggemar museum terkesan dengan "Museum Pasir." Namun, mereka juga mengalami penyesalan tertentu di bukit pasir tersebut. Di bagian Okinawa, ditampilkan momen ketika Mao dan Nagi terus bernyanyi dengan semangat! Di penginapan dan kafe yang mereka singgahi, percakapan eksklusif yang santai antara keduanya juga akan disiarkan!",
// "08" : "",
// "09" : "",
// "10" : "",
// "11" : "",
// "12" : "",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂、逃避行";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "Episode 1 - Hokkaido 前編",
"02" : "Episode 2 - Hokkaido 後編",
"03" : "Episode 3 - Shimane 前編",
"04" : "Episode 4 - Shimane & Tottori 後編",
"05" : "Episode 5 - Okinawa 前編",
"06" : "Episode 6 - Okinawa 前編",
// "07" : "",
// "08" : "",
// "09" : "",
// "10" : "",
// "11" : "",
// "12" : "",
};

console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "5 Juli 2024",
"02" : "12 Juli 2024",
"03" : "19 Juli 2024",
"04" : "26 Juli 2024",
"05" : "2 Agustus 2024",
"06" : "9 Agustus 2024",
// "07" : "16 Agustus 2024",
// "08" : "23 Agustus 2024",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "久保史緒里、梅澤美波",
"02" : "久保史緒里、梅澤美波",
"03" : "遠藤さくら、弓木奈於",
"04" : "遠藤さくら、弓木奈於",
"05" : "井上和、五百城茉央",
"06" : "井上和、五百城茉央",
// "07" : "久保史緒里、梅澤美波、遠藤さくら、弓木奈於",
// "08" : "遠藤さくら、弓木奈於、井上和、五百城茉央",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiescape/nogiescape${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiescape/nogiescape${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiescape/nogiescape${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiescape/nogiescape${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nogiescape/nogiescape${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK TRAKTEER
// =======================

const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka-touhikou-X7kHI";
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