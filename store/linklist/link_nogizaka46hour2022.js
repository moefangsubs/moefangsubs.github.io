
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"01" : "Untuk yang pertama tampil adalah Saito Asuka yang menantang diri mencoba tap dance.",
	"02" : "Untuk yang kedua adalah Tsutsui Ayame yang akan menantang shodou atau kaligrafi Jepang secara live.",
	"03" : "Untuk yang ketiga adalah Yamashita Mizuki yang akan menantang berupa 'menebas 46 orang'!",
	"04" : "Untuk yang keempat adalah denshidai dari Seimiya Rei yang akan memberikan masukan untuk member dan penggemar yang memiliki masalah.",
	"05" : "Segmen dalam hari pertama ini adalah Daftar Peringkat Main Song Nogizaka46 TOP 10. Yang jelas, ini adalah salah satu ranking list pertama dari 3 segmen selanjutnya yang bukan tentang main song. Tentu saja, yang mengambil suara disini adalah para member dan Bananaman, yang juga turut hadir dalam segmen ini. Lagu apa sajakah yang ada dalam urutan itu?",
	"06" : "Untuk yang terakhir di DAY 1 adalah Tamura Mayu yang menantang diri menggunakan mikrofon ASMR.",
	"07" : "Untuk yang kelima adalah Kaki Haruka, dan tidak seperti yang lain, denshidai-nya Kakki ini berlangsung selama 46hour berlangsung. Jadi di video ini sudah di-merge 3 hari.",
	"08" : "Denshidai ke-21 adalah Hayashi Runa yang melakukan tantangan batsugame atau permainan hukuman. Menurutnya selama di Nogizaka46 ia belum pernah punya pengalaman batsugame, jadi kali ini ia akan mencoba membuat tantangan batsugame itu dengan senpai yang sudah punya pengalaman dengan hal seperti itu yaitu Akimoto Manatsu, Higuchi Hina dan Wada Maaya.",
	"09" : "Segmen Nogizaka46 daiundokai / Festival Olahraga 2022 merupakan segment olahraga yang diselenggarakan pada hari ke-2 di acara 46 Hour TV. Segmen ini sebenarnya melanjutkan undokai sebelumnya di hari pertama yang mana hari pertama itu menentukan posisi para member yang akan dimasukkan dalam 3 tim (No, Gi, Saka). Dan di hari ke-2 ini semua member Nogizaka46 (kecuali gen-5) melakukan 5 kompetisi. Bersama MC/Komentator dari komedian Lotti dan Takahashi-san, akan seru-seruan disini.",
	"10" : " Denshidai ke-23 adalah Yamazaki Rena akan mencoba mengadakan kuis seputar Nogizaka yang sebagaimana kita tahu kalau Renachi ini pinterrr banget orangnya alias berwawasan luas. So, gas aja.",
	"11" : "Segmen sanshamendan atau bisa disebut segmen bimbingan Nogizaka, merupakan dimana para member-member tertentu akan diberikan bimbingan terkait masalah yang dihadapinya oleh senior dari dunia entertainment, Horiuchi Ken-san! Dengan durasi hampir satu jam ini, kita akan melihat keseruan yang dibuat Hori Ken-san.",
	"12" : "Denshidai ke-25 adalah Sakaguchi Tamami yang melakukan olahraga dengan judul Let's Tamatore! bersama teman-teman gen-3-nya seperti Sato Kaede, Mukai Hazuki, Nakamura Reno dan Yamashita Mizuki.",
	"13" : "Omitatekai Nogizaka46 Gen-5 ini adalah pertama kalinya omitatekai yang disiarkan secara langsung di kanal YouTube. Ini diadakan saat event 46hour TV bersamaan merayakan 10th anniversary Nogizaka46. Meskipun gen-5 total adalah 11 member, namun yang dapat tampil disini hanyalah 7 member saja,sisanya seperti Tomisato Nao yang kontak erat dengan penderita Covid,juga 3 lainnya yang belum diumumkan karena pendidikan mereka.",
	"14" : "Denshidai ke-33 adalah Kakehasi Sayaka yang menantang diri melakukan hal-hal ringan yang dilakukan oleh wanita dewasa, karena Saachan tahun ini berusia 20 tahun.",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂46時間TV 2022";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Denshidai Saito Asuka",
	"02" : "| Denshidai Tsutsui Ayame",
	"03" : "| Denshidai Yamashita Mizuki",
	"04" : "| Denshidai Seimiya Rei",
	"05" : "| Bananaman & Member! Top 10 Main Song Nogizaka46",
	"06" : "| Denshidai Tamura Mayu",
	"07" : "| Denshidai Kaki Haruka",
	"08" : "| Denshidai Hayashi Runa",
	"09" : "| Daiundokai Day 2",
	"10" : "| Denshidai Yamazaki Rena",
	"11" : "| Sanshamendan Kaki Haruka x Hori Ken",
	"12" : "| Denshidai Sakaguchi Tamami",
	"13" : "| 5th-gen 1st Omitatekai",
	"14" : "| Denshidai Kakehashi Sayaka",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "21 Februari 2022",
	"02" : "21 Februari 2022",
	"03" : "21 Februari 2022",
	"04" : "21 Februari 2022",
	"05" : "21 Februari 2022",
	"06" : "21 Februari 2022",
	"07" : "21-23 Februari 2022",
	"08" : "22 Februari 2022",
	"09" : "22 Februari 2022",
	"10" : "22 Februari 2022",
	"11" : "22 Februari 2022",
	"12" : "22 Februari 2022",
	"13" : "23 Februari 2022",
	"14" : "23 Februari 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "齋藤飛鳥",
	"02" : "筒井あやめ",
	"03" : "山下美月",
	"04" : "清宮レイ、賀喜遥香、樋口日奈、向井葉月、ティモンディ高岸宏行",
	"05" : "乃木坂46、バナナマン",
	"06" : "田村真佑",
	"07" : "賀喜遥香",
	"08" : "林瑠奈、秋元真夏、樋口日奈、和田まあや",
	"09" : "乃木坂46、ろってぃー",
	"10" : "山崎怜奈、久保史緒里、阪口珠美、向井葉月、黒見明香、林瑠奈、矢久保美緒、弓木奈於",
	"11" : "賀喜遥香、秋元真夏、齋藤飛鳥、金川紗耶、矢久保美緒、早川聖来、掛橋沙耶香、遠藤さくら、堀内健",
	"12" : "阪口珠美、佐藤楓、向井葉月、中村麗乃、山下美月",
	"13" : "乃木坂46 5期生",
	"14" : "掛橋沙耶香、清宮レイ",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai01-asuka.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai02-ayame.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai03-yamashita.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai04-rei.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/46hourtv-top10bananamanmember.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai06-tamura.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai05-kaki.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai21-runa.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/46hourtv-daiundokai.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai23-renachi.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/46hourtv-sanshamendan.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai25-tamami.jpg",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/omitatekaigen5.jpg",
	"14" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai33-kakehashi.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai01-asuka-a.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai02-ayame-a.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai03-yamashita-a.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai04-rei-a.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/46hourtv-top10bananamanmember-a.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai06-tamura-a.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai05-kaki-a.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai21-runa-a.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/46hourtv-daiundokai-a.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai23-renachi-a.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/46hourtv-sanshamendan-a.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai25-tamami-a.jpg",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/omitatekaigen5-a.jpg",
	"14" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai33-kakehashi-a.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai01-asuka-b.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai02-ayame-b.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai03-yamashita-b.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai04-rei-b.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/46hourtv-top10bananamanmember-b.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai06-tamura-b.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai05-kaki-b.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai21-runa-b.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/46hourtv-daiundokai-b.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai23-renachi-b.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/46hourtv-sanshamendan-b.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai25-tamami-b.jpg",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/omitatekaigen5-b.jpg",
	"14" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai33-kakehashi-b.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai01-asuka-c.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai02-ayame-c.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai03-yamashita-c.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai04-rei-c.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/46hourtv-top10bananamanmember-c.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai06-tamura-c.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai05-kaki-c.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai21-runa-c.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/46hourtv-daiundokai-c.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai23-renachi-c.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/46hourtv-sanshamendan-c.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai25-tamami-c.jpg",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/omitatekaigen5-c.jpg",
	"14" : "https://ik.imagekit.io/mLsKqNSuB/post/46hour_tv/denshidai33-kakehashi-c.jpg",
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
	"01" : "https://lokerwfh.net/qZgAnHu",
	"02" : "https://lokerwfh.net/agpktFgR",
	"03" : "https://lokerwfh.net/OSgeUiPo",
	"04" : "https://lokerwfh.net/VCIEM",
	"05" : "https://lokerwfh.net/CWNt4gG",
	"06" : "https://lokerwfh.net/vLvkq",
	"07" : "https://lokerwfh.net/ZQwkA",
	"08" : "https://lokerwfh.net/herwE",
	"09" : "https://lokerwfh.net/bnkWD",
	"10" : "https://lokerwfh.net/5R0qHouA",
	"11" : "https://lokerwfh.net/whq5jTD",
	"12" : "https://lokerwfh.net/JoaRi6B8",
	"13" : "https://lokerwfh.net/aZCKtk",
	"14" : "https://lokerwfh.net/Hv2Hvw5",
  };
console.log(linkHardsub);


// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
	"01" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-10th-anniversary-46hour-tv-denshidai-yaPqD",
	"02" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-10th-anniversary-46hour-tv-denshidai-yaPqD",
	"03" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-10th-anniversary-46hour-tv-denshidai-yaPqD",
	"04" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-10th-anniversary-46hour-tv-denshidai-yaPqD",
	"05" : "https://trakteer.id/moefangsubs/showcase/nogizaka-46-hour-tv-best-10-main-song-part-nogizaka46-x-bananaman-IROVf",
	"06" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-10th-anniversary-46hour-tv-denshidai-yaPqD",
	"07" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-10th-anniversary-46hour-tv-denshidai-yaPqD",
	"08" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-10th-anniversary-46hour-tv-denshidai-yaPqD",
	"09" : "https://trakteer.id/moefangsubs/showcase/nogizaka-46-hour-tv-daiundokai-day-2-part-7Yp86",
	"10" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-10th-anniversary-46hour-tv-denshidai-yaPqD",
	"11" : "https://trakteer.id/moefangsubs/showcase/nogizaka-46-hour-tv-sanshamendan-part-kaki-haruka-x-hori-ken-q3ChP",
	"12" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-10th-anniversary-46hour-tv-denshidai-yaPqD",
	"13" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-5th-gen-omitatekai-hpOLm",
	"14" : "https://trakteer.id/moefangsubs/showcase/nogizaka46-10th-anniversary-46hour-tv-denshidai-yaPqD",

};
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {
	"01" : "-",
	"02" : "-",
	"03" : "-",
	"04" : "-",
	"05" : "bananaman&member",
	"06" : "-",
	"07" : "-",
	"08" : "-",
	"09" : "daiundokai_46htv",
	"10" : "-",
	"11" : "kakkikawaii~!",
	"12" : "-",
	"13" : "mysupportersarethebest!",
	"14" : "-",
};
console.log(filePassword);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);