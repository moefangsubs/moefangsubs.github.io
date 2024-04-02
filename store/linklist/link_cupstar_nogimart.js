
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Di episode pertama kali ini, mereka berdebat mengenai membuat sorak sorai Capstar untuk desanya atas keinginan pak RW Toyomoto-san.",
"02" : "Di episode 2 kali ini, mulanya Yama (Yamashita Mizuki) dan Ume (Umezawa Minami) hendak mengajak senpainya Asuka bermain dan jalan-jalan, namun Asuka tidak bisa karena sedang bekerja. Singkat cerita, Kakuta-san ingin menolak 3 member Nogizaka yang menembak dirinya dengan maksud merasakan enaknya makan Cupstar setelah ditolak cintanya. Apakah berjalan dengan baik?",
"03" : "Di episode 3 ini, para member (Yamashita Mizuki, Yoda Yuuki, Umezawa Minami, Endo Sakura) akan mencoba melakukan tsukkomi. Bersama Kakuta, apakah mereka bisa melakukan tsukkomi dengan baik demi bisa jadi partner-nya Kakuta untuk lomba manzai?",
"04" : "Di episode 4 ini, para member (Umezawa Minami, Kaki Haruka) akan memiliki cerita yang berbeda.",
"05" : "Di episode 5 kali ini, Yumiki Nao yang pertama tampil, Endo Sakura akan menyampaikan ide untuk Kakuta-san yang ingin memberikan lagu pada Kaki Haruka yang sedang berulang tahun.",
"06" : "Di episode 6 kali ini, sehubungan CupStar sedang renewal atau melakukan pembaruan, Endo Sakura merasa ingin dirinya \"renewal\", tidak hanya menyampaikan apa yang dia pikirkan, tapi juga meningkatkan kemampuan manzai-nya bersama Kakuta-san di episode sebelumnya.",
"07" : "Di episode 7, Asuka, Yoda, Endo dan Kaki mencoba menarikan 'Nyunyu Dance'. Iizuka sebagai ayahnya Asuka bersama pak RW Toyomoto-san ditawari untuk mencoba tarian ini.",
"08" : "Di episode 8, NogiMart kedatangan tamu dari gen-5 yaitu Inoue Nagi dan Sugawara Satsuki. Bersama Ume dan Asuka, mereka berdiskusi soal cerita apa yang akan ditampilkan saat festival nanti di lingkungannya.",
"09" : "Di episode 9, Yoda, Kakki dan Sakura hendak merayakan kemenangan Yama atas menjadi juara turnamen tenis meja, yang mana disangka oleh Kakuta adalah merayakan dirinya.",
"10" : "Di episode 10 ini adalah episode terakhirnya Saito Asuka yang sudah menjadi pemeran utama dalam seri Nogizaka Maitsuki Gekijou ini selama 3 tahun dan 3 season. Ceritanya ditutup dengan Asuka akan pergi meninggalkan ayahnya dan menuju Tokyo untuk mengejar mimpinya.",
"11" : "ebelum menuju episode terakhir pada bulan selanjutnya, Cupstar merilis video spesial dimana para member yang tampil disini yaitu Yoda Yuuki, Umezawa Minami dan Endo Sakura akan sharing seperti apa kenangan dan harapannya pada seri Nogizaka Maitsuki Gekijou ini.",
"12" : "Di episode 11 ini adalah episode terakhir dari serangkaian seri Nogizaka Maitsuki Gekijou Season 3. Ceritanya ditutup dengan ayahnya Asuka hendak menutup Nogimart sementara dan pergi berlibur, sementara karyawan part-time baru yaitu Nagi dan Sugawara menggantikan pekerjaan Asuka yang di episode sebelumnya pergi ke Tokyo mencari mimpinya.",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================

const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂毎月劇場 ノギマートの日々";
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
"10" : "| Episode 10",
"11" : "| Tokubetsu-hen",
"12" : "| Episode 11 [END]",
};
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "6 April 2022",
"02" : "2 Mei 2022",
"03" : "1 Juni 2022",
"04" : "27 Juli 2022",
"05" : "8 Agustus 2022",
"06" : "1 September 2022",
"07" : "1 Oktober 2022",
"08" : "1 November 2022",
"09" : "1 Desember 2022",
"10" : "5 Januari 2023",
"11" : "1 Februari 2023",
"12" : "1 Maret 2023",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "齋藤飛鳥、与田祐希、遠藤さくら、賀喜遥香",
"02" : "齋藤飛鳥、梅澤美波、山下美月",
"03" : "齋藤飛鳥、梅澤美波、山下美月、与田祐希、遠藤さくら",
"04" : "齋藤飛鳥、梅澤美波、賀喜遥香",
"05" : "遠藤さくら、賀喜遥香、弓木奈於",
"06" : "齋藤飛鳥、梅澤美波、遠藤さくら、賀喜遥香",
"07" : "齋藤飛鳥、与田祐希、遠藤さくら、賀喜遥香",
"08" : "齋藤飛鳥、梅澤美波、井上和、菅原咲月",
"09" : "山下美月、与田祐希、遠藤さくら、賀喜遥香",
"10" : "齋藤飛鳥、梅澤美波、与田祐希、遠藤さくら、井上和、菅原咲月",
"11" : "齋藤飛鳥、梅澤美波、与田祐希、遠藤さくら",
"12" : "梅澤美波、与田祐希、遠藤さくら、井上和、菅原咲月",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart01.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart02.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart03.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart04.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart05.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart06.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart07.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart08.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart09.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart10.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart-tokubetsu.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart11.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart01a.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart02a.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart03a.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart04a.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart05a.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart06a.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart07a.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart08a.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart09a.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart10a.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart-tokubetsu-a.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart11a.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart01b.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart02b.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart03b.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart04b.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart05b.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart06b.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart07b.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart08b.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart09b.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart10b.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart-tokubetsu-b.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart11b.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart01c.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart02c.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart03c.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart04c.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart05c.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart06c.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart07c.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart08c.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart09c.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart10c.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart-tokubetsu-c.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart11c.jpg",
  };
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart01d.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart02d.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart03d.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart04d.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart05d.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart06d.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart07d.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart08d.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart09d.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart10d.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart-tokubetsu-d.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/nogimart/nogimart11d.jpg",
  };
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://lokerwfh.net/pANwS70L",
"02" : "https://lokerwfh.net/xd36SfSf",
"03" : "https://lokerwfh.net/OZVStas",
"04" : "https://lokerwfh.net/veUx8rz",
"05" : "https://lokerwfh.net/gREDT2E",
"06" : "https://lokerwfh.net/06dc7X",
"07" : "https://lokerwfh.net/MZRLGe11",
"08" : "https://lokerwfh.net/HvZ7NMk",
"09" : "https://lokerwfh.net/5q4l",
"10" : "https://lokerwfh.net/QVdey",
"11" : "https://lokerwfh.net/AZoUAm3",
"12" : "https://lokerwfh.net/CRhHXv",
  };
console.log(linkHardsub);

// =======================
// LINK HARDSUB
// =======================

const linkSoftsub = {
"01" : "https://lokerwfh.net/OKQHUKcY",
"02" : "https://lokerwfh.net/mv9H01",
"03" : "https://lokerwfh.net/tcbXG",
"04" : "https://lokerwfh.net/AC4uO",
"05" : "https://lokerwfh.net/N4qv1wdp",
"06" : "https://lokerwfh.net/G2Dw",
"07" : "https://lokerwfh.net/tyTqzay",
"08" : "https://lokerwfh.net/d6VhHDv",
"09" : "https://lokerwfh.net/toiyU",
"10" : "https://lokerwfh.net/Dy87d5s",
"11" : "https://lokerwfh.net/vb4R",
"12" : "https://lokerwfh.net/inVt",
  };
console.log(linkSoftsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/cupstar-nogimart-no-hibi-hardsub-softsub-3zLH3";
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