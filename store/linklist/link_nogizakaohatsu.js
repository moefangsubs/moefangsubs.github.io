
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"01" : "Nah, di episode pertama ini adalah si kalem Oozono Momoko-san~! Kira-kira, keseruan apa aja yang terjadi disini!?",
	"02" : "Kali ini ohatsu-channya adalah Umezawa-san~! Ada hal yang bikin kita terheran-heran disana. Apakah itu!?",
	"03" : "Kali ini ohatsu-channya adalah Ayati! Ohatsu-nya dia berbeda dari yang lain, yaitu ohatsu membuat pisau dapur.. Keseruan apa saja selama proses pembuatannya??",
	"04" : "ali ini ohatsu-channya adalah Kaede! Ohatsu-nya kali ini adalah gara-gara kecanduan main game Atsumori, dia jadi pengen mancing untuk pertama kalinya! Keseruan apa aja selama memancing? Dan dapat ikan apa aja?!",
	"05" : "Kali ini ohatsu-channya adalah Hazuki! Spesial buat dia ada 2 ohatsu, dan episode ini episode pertamanya. Ohatsu-nya kali ini adalah menantang dirinya untuk rafing/arung jeram demi menghilangkan ketakutannya terhadap air! Keseruan apa aja selama rafting?!",
	"06" : "Di episode ke-6, ohatsu-channya adalah sang pro idol, Yamashita Mizuki! Namun sayangnya, di episodenya ini dia sedang tidak bisa hadir ke studio. Yamashita akan mencoba sesuatu yang.. yaa.. begitulah.",
	"07" : "Di episode ke-7 kali ini adalah bagian kedua dari Ohatsu-nya Mukai Hazuki. Setelah rafting, dia akan mencoba hal lain yang gak kalah serunya. So, tonton saja ya!",
	"08" : "Di episode ke-8 kali ini adalah gilirannya member gen-4 Yumiki Nao! Yumiki ohatsunya disini akan mencoba bagaimana rasanya tinggal di apartemen yang mewah! Hmm... apa aja ya yang akan dia lakukan disana?",
	// "09" : "",
	// "10" : "",
	"11" : "Di episode ke-11 kali ini adalah gilirannya member gen-4 Tamura Mayu! Mayutan ohatsunya disini akan mencoba menjadi seorang seiyuu atau pengisi suara. Kira-kira tantangan apa saja agar bisa mencapai impiannya itu?",
	"12" : "Di episode ke-12 kali ini adalah Hayakawa Seira yang katanya ingin refreshing alias penyegaran diri dengan mencoba taekwondo yang telah dia inginkan sejak kecil. Apakah Seira berhasil refreshing dengan berbagai teknik dalam taekwondo?",
	"13" : "Pada episode ke-13 kali ini adalah dari gen-3, Nakamura Reno yang ingin membuat melonpan terbaiknya seumur hidup. Namun sebelum membuatnya, Reno akan mencoba berbagai jenis melonpan, dari melonpan sampai ke bentuk yang membuatnya ragu apakah melonpan atau bukan.",
	// "14" : "",
	"15" : "Pada episode ke-15 kali ini adalah masih dari gen-3, Ito Riria yang ingin mencoba berkemah sendirian atau solo camp. Riria yang mengaku dirinya sebagai tipe orang rumahan ini merasa ingin mencoba menikmati alam untuk menyembuhkan diri dari kesibukannya sebagai idola di Nogizaka. Meski dia akan mencobanya sendirian, namun para staff memberinya 3 kartu bantuan kalau-kalau Riria mengalami kesusahan.",
	// "16" : "",
	"17" : "Pada episode ke-17 kali ini adalah dari gen-4 Kuromi Haruka yang saat itu masih belum genap setahun di Nogizaka. Ohatsu-nya adalah melatih diri agar bisa mengendarai sepeda. Di usianya yang sudah dewasa ini dia merasa malu belum bisa mengendarai sepeda sehingga ia menyembunyikan hal itu. Dan kali ini dia akan belajar bersama seorang sensei yang biasa melatih sepeda kenapa anak SD! Apakah dia akan berhasil?",
	// "18" : "",
	"19" : "Pada episode ke-19 kali ini adalah dari gen-4 Matsuo Miyu yang saat itu masih belum genap setahun di Nogizaka. Ohatsu-nya adalah keinginannya untuk bisa melakukan backflip. Sejak SMP selama 3 tahun ia tergabung dalam klub cheerleading. Meskipun cheerleading adalah hal yang disukainya, berapapun ia berlatih backflip selalu berakhir dengan gagal. Dengan bimbingan sensei yang merupakan mantan kandidat olimpiade, apakah ia mampu melakukan backflip-nya?",
	"20" : "Pada episode ke-20 kali ini masih dari gen-4 yaitu Seimiya Rei. Ohatsu-nya adalah keinginannya untuk bisa mengalami pengalaman sebagai CA atau pramugari, karena adalah sosok yang ia kagumi ketika masih tinggal di Amerika. Dengan bimbingan pramugari dari JAL, apakah ia cocok dengan pekerjaan itu?",
	"21" : "Di episode 21 ini, Yakubo Mio ingin dihipnotis! Ya, satu keinginan yang mungkin terdengar aneh diantara Ohatsu lainnya. Ada beberapa hal yang ingin ia bisa seperti memakan wasabi dan bawang. Apakah ia berhasil dihipnotis? Atau dia yang menghipnotis?",
	"22" : "Di episode 22 kali ini, ohatsu-channya adalah Hayashi Runa yang ingin mengucapkan terima kasih kepada guru pembimbingnya ketika ia SMP, karena berkat beliau, Runa bisa seperti sekarang. Ia ingin membawakan lagu Sangatsu Kokonoka dengan menggunakan alat musik. Apakah berhasil dengan baik? Dan bagaimana reaksi gurunya, Yamada-sensei?",
	"23" : "Pada episode 23 ini, Shibata Yuna memanfaatkan kesempatan ini dengan menantang berbagai ohatsu! Dengan waktu yang ditentukan yaitu 3 jam, apakah Yuna bisa menyelesaikan semua ohatsu dengan baik? Ataukah banyak yang gagal?",
	"24" : "Episode terakhir ini, Yamazaki Rena selaku MC acara ini akan menebak pertanyaan Ohatsu sebanyak 10 pertanyaan, dan jika ia menjawab dengan salah, ia mendapatkan hukuman yang telah di-vote saat itu oleh para penggemar. Dari 10 pertanyaan soal para kouhai-nya yang mengikuti Ohatsu-chan itu apakah Renachi bisa menebak semuanya dengan benar?",
  };

console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂46山崎怜奈とおはつちゃん";
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
	// "09" : "| Episode 9",
	// "10" : "| Episode 10",
	"11" : "| Episode 11",
	"12" : "| Episode 12",
	"13" : "| Episode 13",
	// "14" : "| Episode 14",
	"15" : "| Episode 15",
	// "16" : "| Episode 16",
	"17" : "| Episode 17",
	// "18" : "| Episode 18",
	"19" : "| Episode 19",
	"20" : "| Episode 20",
	"21" : "| Episode 21",
	"22" : "| Episode 22",
	"23" : "| Episode 23",
	"24" : "| Episode 24"
  };
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "29 Agustus 2020",
	"02" : "05 September 2020",
	"03" : "12 September 2020",
	"04" : "19 September 2020",
	"05" : "26 September 2020",
	"06" : "03 Oktober 2020",
	"07" : "10 Oktober 2020",
	"08" : "17 Oktober 2020",
	// "09" : "24 Oktober 2020",
	// "10" : "31 Oktober 2020",
	"11" : "07 November 2020",
	"12" : "14 November 2020",
	"13" : "21 November 2020",
	// "14" : "28 November 2020",
	"15" : "05 Desember 2020",
	// "16" : "12 Desember 2020",
	"17" : "19 Desember 2020",
	// "18" : "26 Desember 2020",
	"19" : "16 Januari 2021",
	"20" : "23 Januari 2021",
	"21" : "30 Januari 2021",
	"22" : "06 Februari 2021",
	"23" : "13 Februari 2021",
	"24" : "20 Februari 2021",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "山崎怜奈、大园桃子",
	"02" : "山崎怜奈、梅澤美波",
	"03" : "山崎怜奈、吉田綾乃クリスティー",
	"04" : "山崎怜奈、佐藤楓",
	"05" : "山崎怜奈、向井葉月",
	"06" : "山崎怜奈、山下美月",
	"07" : "山崎怜奈、向井葉月",
	"08" : "山崎怜奈、弓木奈於",
	// "09" : "山崎怜奈、金川紗耶",
	// "10" : "山崎怜奈、佐藤璃果",
	"11" : "山崎怜奈、田村真佑",
	"12" : "山崎怜奈、早川聖来",
	"13" : "山崎怜奈、中村麗乃",
	// "14" : "山崎怜奈、阪口珠美",
	"15" : "山崎怜奈、伊藤理々杏",
	// "16" : "山崎怜奈、北川悠理",
	"17" : "山崎怜奈、黒見明香",
	// "18" : "山崎怜奈、掛橋沙耶香",
	"19" : "山崎怜奈、松尾美佑",
	"20" : "山崎怜奈、清宮レイ",
	"21" : "山崎怜奈、矢久保美緒",
	"22" : "山崎怜奈、林瑠奈",
	"23" : "山崎怜奈、柴田柚菜",
	"24" : "山崎怜奈"
  };
console.log(memberParticipate);



// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nohatsu/ohatsu-${paddedNumber}.jpg`;
}
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nohatsu/ohatsu-${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================


const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nohatsu/ohatsu-${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nohatsu/ohatsu-${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL B
// =======================


const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/nohatsu/ohatsu-${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/yFALN3",
	"02" : "https://lokerwfh.net/9YiOB5",
	"03" : "https://lokerwfh.net/YgWXnxH",
	"04" : "https://lokerwfh.net/m4EAuSFD",
	"05" : "https://lokerwfh.net/bBkVNF",
	"06" : "https://lokerwfh.net/tzFma",
	"07" : "https://lokerwfh.net/GEHjZ",
	"08" : "https://lokerwfh.net/DXQk9Rkz",
	// "09" : "x",
	// "10" : "x",
	"11" : "https://lokerwfh.net/9vl0Gie6",
	"12" : "https://lokerwfh.net/asuH1",
	"13" : "https://lokerwfh.net/tRmn",
	// "14" : "x",
	"15" : "https://lokerwfh.net/5AVsG",
	// "16" : "x",
	"17" : "https://lokerwfh.net/xhl6WHfz",
	// "18" : "x",
	"19" : "https://lokerwfh.net/4H2mGqVK",
	"20" : "https://lokerwfh.net/CRRal4T",
	"21" : "https://lokerwfh.net/yxHBCHi",
	"22" : "https://lokerwfh.net/LVUG8pbi",
	"23" : "https://lokerwfh.net/yd4F",
	"24" : "https://lokerwfh.net/LJF7"
  };
console.log(linkHardsub);

// =======================
// LINK HARDSUB
// =======================

const linkSoftsub = {
	"01" : "https://lokerwfh.net/j2ZFFGyI",
	"02" : "https://lokerwfh.net/srI5icEv",
	"03" : "https://lokerwfh.net/CYXEM",
	"04" : "https://lokerwfh.net/BFNXh2Wq",
	"05" : "https://lokerwfh.net/tzd6",
	// "06" : "x",
	// "07" : "x",
	// "08" : "x",
	// "09" : "x",
	// "10" : "x",
	"11" : "https://lokerwfh.net/QYLAPaN",
	"12" : "https://lokerwfh.net/JTjIUtd",
	"13" : "https://lokerwfh.net/IR9wEcC",
	// "14" : "x",
	"15" : "https://lokerwfh.net/HOmXUshQ",
	// "16" : "x",
	"17" : "https://lokerwfh.net/vIJ7A",
	// "18" : "x",
	"19" : "https://lokerwfh.net/XrKbS8",
	"20" : "https://lokerwfh.net/nEql",
	"21" : "https://lokerwfh.net/KdYXrT",
	"22" : "https://lokerwfh.net/ZurSw6aP",
	"23" : "https://lokerwfh.net/GH31GEAU",
	"24" : "https://lokerwfh.net/qzB7kM"
  };
console.log(linkSoftsub);

// ---ep 6
const linkSoftsubEp6v1 = {
	"06" : "https://lokerwfh.net/3HvrcsB"
  };
console.log(linkSoftsubEp6v1);

const linkSoftsubEp6v2 = {
	"06" : "https://lokerwfh.net/zqSh"
  };
console.log(linkSoftsubEp6v2);

// ---ep 7
const linkSoftsubEp7v1 = {
	"07" : "https://lokerwfh.net/enM4K"
  };
console.log(linkSoftsubEp7v1);

const linkSoftsubEp7v2 = {
	"07" : "https://lokerwfh.net/cuMOo"
  };
console.log(linkSoftsubEp7v2);

// ---ep 8
const linkSoftsubEp8v1 = {
	"08" : "https://lokerwfh.net/O2EaTX61"
  };
console.log(linkSoftsubEp8v1);

const linkSoftsubEp8v2 = {
	"08" : "https://lokerwfh.net/q7hsifu"
  };
console.log(linkSoftsubEp8v2);

// =======================
// LINK SOFTSUB as TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka46-yamazaki-rena-to-ohatsu-chan-GRma3";
}
console.log(linkTrakteer);

// =======================
// LINK FONT
// =======================

const linkFont = {};
for (let i = 1; i <= 19; i++) {
  linkFont[i.toString().padStart(2, '0')] = "https://drive.google.com/uc?export=download&id=1lsRJ9KQvxy4NwbuxCAC-hHK_fUt7pOnV";
}
console.log(linkFont);
// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);

// =======================
// FILE PASSWORD
// =======================

const filePassword = {
	"01" : "ohatsu1",
	"02" : "ohatsu2",
	"03" : "ohatsu3",
	"04" : "ohatsu4",
	"05" : "ohatsu5",
	"06" : "ohatsu6",
	"07" : "ohatsu7",
	"08" : "ohatsu8",
	// "09" : "ohatsu9",
	// "10" : "ohatsu10",
	"11" : "ohatsu11",
	"12" : "ohatsu12",
	"13" : "ohatsu13",
	// "14" : "ohatsu14",
	"15" : "ohatsu15",
	// "16" : "ohatsu16",
	"17" : "ohatsu17",
	// "18" : "ohatsu18",
	"19" : "ohatsu19",
	"20" : "ohatsu20",
	"21" : "ohatsu21",
	"22" : "ohatsu22",
	"23" : "ohatsu23",
	"24" : "ohatsu24"
};
console.log(filePassword);
