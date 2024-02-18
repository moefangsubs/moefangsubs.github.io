
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"07" : "Ya, walau tanpa ada RAW-nya, dan meski hardsub China, saya kerjain aja yang ada biar gak penasaran ujug-ujug ke ep18. Episode ini dimulai setelah \"libur\" karena pandemi COVID-19 pada waktu itu. Nah, di episode 7 ini bintang tamunya adalah EXIT! Pokoknya seru deh! Hmm bahasa Indonesianya sudah menyesuaikan baik dari Bahasa Jepangnya sendiri, maupun terjemahan Bahasa China-nya. Mohon maaf apabila ada salah terjemahan, atau kurang sreg.",
	"08" : "Ya, di episode 8 ini masih kelanjutan dari episode 7 dengan bintang tamunya EXIT. Terima kasih NOGISUBS yang sudah mau membantu timingnya! Bahasa Indonesianya sudah menyesuaikan baik dari Bahasa Jepangnya sendiri, maupun terjemahan Bahasa China-nya. Mohon maaf apabila ada salah terjemahan, atau kurang sreg.",
	"09" : "Ya, di episode 9 ini bersama dengan bintang tamu Kajisac, seorang YouTuber populer. Para member yang mewawancarai adalah Manamo, Kyoko, Manafi dan Nibu. Mohon maaf apabila ada salah terjemahan, atau kurang sreg.",
	"10" : "Di episode 10 ini bersama dengan bintang tamu sultan.. Tamura Atsushi! wkwkwk seorang artis, sekaligus punya beberapa perusahaan Jepang terkenal. Para member yang mewawancarai adalah oshiku Miho, Shiho, Meimei dan Kawata. Mohon maaf apabila ada salah terjemahan, atau kurang sreg.",
	"11" : "Di episode 11 masih bersama dengan Tamura Atsushi, sang bintang tamu sultan yang sebelumnya diwawancarai di episode 10.  Para member yang mewawancarai masih oshiku Miho, Shiho, Meimei dan Kawata. Mohon maaf apabila ada salah terjemahan, atau kurang sreg.",
	"12" : "Ya, di episode kali ini kita kedatangan tamu trio komedian yang paling bikin ramai studio, 3ji no Heroine! Bareng Matsuda Konoka, Ushio Sarina, Sasaki Mirei dan Hamagishi Hiyori, mereka akan mewawancarai bintang tamunya dengan penuh keseruan! Dan di bagian akhir seperti biasa ada sesi pertanyaan dari para member yang mana kali ini adalah giliran Ushio Sarina! Udah pasti ada Indonesia-nya loh~ Mohon maaf apabila ada salah terjemahan, atau kurang sreg.",
	"19" : "Yes! Kita mundur episodenya.. wkwkwk. Ini adalah Kuis Hinachonea bagian kedua dan bagian pertamanya ada di episode 18. Seperti biasa terjemahannya sudah diimprove dengan Bahasa Jepangnya sendiri, dan bahasa Inggris dibantu oleh Nassux. Mohon maaf apabila ada salah terjemahan, atau kurang sreg.",
	"20" : "Yes! Sudah seminggu lebih aku mengerjakan ini, akhirnya kali ini selesai juga! Kebetulan ketemu RAW-nya (meskipun ada watermark di pojok kanan bawah) jadi langsung gaskeun! Seperti biasa terjemahannya sudah diimprove dengan Bahasa Jepangnya sendiri, jadi mohon maaf apabila ada salah terjemahan, atau kurang sreg.",
  };


// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "日向坂46です。ちょっといいですか?";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"07" : "| Episode 7",
	"08" : "| Episode 8",
	"09" : "| Episode 9",
	"10" : "| Episode 10",
	"11" : "| Episode 11",
	"12" : "| Episode 12",
	"13" : "| Episode 13",
	"14" : "| Episode 14",
	"15" : "| Episode 15",
	"16" : "| Episode 16",
	"17" : "| Episode 17",
	"18" : "| Episode 18",
	"19" : "| Episode 19",
	"20" : "| Episode 20"
  };
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"07" : "27 Juni 2020",
	"08" : "4 Juli 2020",
	"09" : "11 Juli 2020",
	"10" : "18 Juli 2020",
	"11" : "25 Juli 2020",
	"12" : "1 Agustus 2020",
	"19" : "19 September 2020",
	"20" : "26 September 2020"
  };


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"07" : "佐々木久美、金村美玖、小坂菜緒、富田鈴花、EXIT",
	"08" : "佐々木久美、金村美玖、小坂菜緒、富田鈴花、EXIT",
	"09" : "齊藤京子、高瀬愛奈、丹生明里、宮田愛萌、梶原雄太（キングコング）",
	"10" : "加藤史帆、東村芽依、河田陽菜、渡邉美穂、田村淳",
	"11" : "加藤史帆、東村芽依、河田陽菜、渡邉美穂、田村淳",
	"12" : "潮紗理菜、佐々木美玲、濱岸ひより、松田好花、3時のヒロイン",
	"19" : "佐々木久美、佐々木美玲、高瀬愛奈、高本彩花、東村芽依、金村美玖、小坂菜緒、濱岸ひより、宮田愛萌、上村ひなの、髙橋未来虹、森本茉莉、山口陽世",
	"20" : "丹生明里、松田好花、宮田愛萌、齋藤飛鳥、梅澤美波"
  };


// =======================
// FILE PASSWORD (1-9 pake 0, sisanya enggak)
// =======================

const filePassword = {
	"07" : "hinachoi07",
	"08" : "hinachoi08",
	"09" : "hinachoi09",
	"10" : "hinachoi10",
	"11" : "hinachoi11",
	"12" : "hinachoi12",
	"19" : "hinachoi19",
	"20" : "hinachoi20"
  };

console.log(filePassword);

// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi.jpg",
	"19" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi.jpg",
	"20" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi.jpg"
  };

console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi07a.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi08a.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi09a.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi10a.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi11a.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi12a.jpg",
	"19" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi19a.jpg",
	"20" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi20a.jpg"
  };

console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================


const imageThumbB = {
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi07b.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi08b.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi09b.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi10b.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi11b.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi12b.jpg",
	"19" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi19b.jpg",
	"20" : "https://ik.imagekit.io/mLsKqNSuB/post/hinachoi/hinachoi20b.jpg"
  };

console.log(imageThumbB);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"07" : "https://lokerwfh.net/M0bvgC",
	"08" : "https://lokerwfh.net/hBKp28Wn",
	"09" : "https://lokerwfh.net/7bNLOb",
	"10" : "https://lokerwfh.net/AWXfodg",
	"11" : "https://lokerwfh.net/FzcN6",
	"12" : "https://lokerwfh.net/OS2cSH",
	"19" : "https://lokerwfh.net/vHGv",
	"20" : "https://lokerwfh.net/00NaC"
  };

// =======================
// LINK SOFTSUB as TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/hinatazaka46-desu-chotto-ii-desu-ka-8kGvA";
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
