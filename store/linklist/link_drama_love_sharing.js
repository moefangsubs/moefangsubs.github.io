
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
"01" : "Yui, Wakana, dan Midori adalah sosok Madonna di sekolah mereka. Kouhei, suatu hari dengan gegabahnya mengaku cinta pada Yui. Meskipun alasan dia tidak bisa membiarkannya begitu saja, tapi Yui malah bertanya, \"Apa cinta itu sebenarnya?\". Namun, ketiga orang itu memiliki pandangan cinta yang unik masing-masing, dan takdir secara perlahan mendekatkan mereka bertiga dengan Kouhei. Suatu hari, Kouhei yang dipanggil untuk mengungkapkan hasil pengakuannya, malah dihadapkan pada tawaran mengejutkan dari ketiganya...",
"02" : "Hubungan bergandengan tangan antara Yui, Wakana, Midori, dan Kouhei, seorang siswa SMA biasa, dimulai. Yui yang telah membunuh pamannya, harus berbagi rahasia dengan sepupunya, Kaoru Fujima. Kouhei, menyadari ada yang aneh dengan Yui, meminta dia untuk berkonsultasi jika ada masalah. Jarak antara keduanya semakin dekat...",
"03" : "Midori, siswa teladan di kelasnya, memiliki rahasia yang tak bisa dia bagikan dengan Yui dan Wakana. Dia tak percaya pada cinta antara pria dan wanita, dan hubungannya dengan ayahnya yang juga seorang CEO tidak baik. Untuk menghilangkan rasa cemasnya, dia terlibat dalam hubungan asmara dan berjudi dengan keinginan pasangannya, Kouhei. Di tengah-tengah semuanya, Midori tanpa sengaja terlihat oleh Yui, Wakana, dan Kouhei...",
"04" : "Akibat pembatalan mendadak Yui, Wakana, dan Midori, perayaan ulang tahun Kouhei menjadi kaku. Wakana, yang memiliki trauma dari hubungan pertemanan sebelumnya, takut akan keretakan hubungan mereka bertiga. Didorong oleh Yui, Wakana berusaha untuk meredakan ketegangan di antara mereka bertiga dan Kouhei, tetapi dia malah teringat akan trauma masa lalunya.",
"05" : "Mereka akhirnya berdamai dan menyatakan perasaan masing-masing. Namun, ketenaran mereka di sekolah berkat media sosial menarik perhatian Ryoji, seorang teman sekelas yang menyatakan ingin menjadi kekasih keempat karena ia penggemar \"Love Sharing\". Kehadiran Ryoji membuat dinamika hubungan mereka bertiga dengan Kouhei kembali berubah...",
"06" : "Wakana melakukan kesepakatan dengan Ryoji untuk menghapus video pengungkapan rahasia Midori. Namun, setelah video itu dihapus, video pengungkapan rahasia Wakana sendiri malah diunggah. Sementara perayaan kelulusan semakin dekat, mereka berempat harus menghadapi masalah masing-masing. Akankah mereka berhasil melewati perayaan kelulusan dengan lancar?",
"07" : "Bagian pertama dari serial di sekolah telah berakhir hingga episode 6, sekarang kami akan menyajikan episode spesial dalam bentuk diskusi antara para pemain utama tentang peran mereka, momen-momen berkesan, dan episod di lokasi syuting.",
"08" : "Meskipun di awalnya kebingungan karena ada tamu tak terduga di vila, yaitu Ryōji Kyuusaku, Ichiro Arima, dan Sae Niigata, akhirnya mereka semua sepakat untuk menginap bersama. Awalnya mereka bersenang-senang, namun...",
"09" : "Pengaruh Ryouji dan teman-temannya membuat dinamika hubungan antara mereka bertiga dengan Kouhei semakin renggang. Kouhei mulai mendekati Wakana, Yui mendekati Ichiro, dan Midori mendekati Sae. Yui menyadari bahwa hubungan hanya dari hati tidaklah cukup, dan dia pun mengajukan sebuah usulan kepada mereka bertiga...",
"10" : "Ketika Kaoru tiba di vila, mereka menyadari bahwa pertemuan mereka sebenarnya telah direncanakan oleh Kaoru. Yui, Wakana, dan Midori bersumpah untuk melawan mereka. Kouhei juga diselamatkan, tetapi perbedaan pendapat antara Yui, Wakana, Midori, dan Kouhei muncul...",
"11" : "Yui, Wakana, dan Midori membunuh Ryouji dan teman-temannya. Kouhei mencoba melarikan diri bersama Wakana. Di perjalanan menuju kota, mereka bertemu dengan Kaio Sayama di sebuah tempat yang terlantar. Apakah keputusan terakhir dari Yui, Wakana, dan Midori akan seperti apa? Bagaimana akhir kisah mereka...?",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {
"01" : "ラブシェアリング",
"02" : "ラブシェアリング",
"03" : "ラブシェアリング",
"04" : "ラブシェアリング",
"05" : "ラブシェアリング",
"06" : "ラブシェアリング",
"07" : "ラブシェアリング",
"08" : "ラブシェアリング",
"09" : "ラブシェアリング",
"10" : "ラブシェアリング",
"11" : "ラブシェアリング",
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| story.01",
"02" : "| story.02",
"03" : "| story.03",
"04" : "| story.04",
"05" : "| story.05",
"06" : "| story.06",
"07" : "| story.07",
"08" : "| story.08",
"09" : "| story.09",
"10" : "| story.10",
"11" : "| story.11",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
"01" : "27 Maret 2022",
"02" : "3 April 2022",
"03" : "10 April 2022",
"04" : "17 April 2022",
"05" : "24 April 2022",
"06" : "1 Mei 2022",
"07" : "8 Mei 2022",
"08" : "15 Mei 2022",
"09" : "22 Mei 2022",
"10" : "29 Mei 2022",
"11" : "5 Juni 2022",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  memberParticipate[paddedNumber] = `向井葉月、中村麗乃、弓木奈於`;
}
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing01.png",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing02.png",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing03.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing04.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing05.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing06.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing07.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing08.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing09.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing10.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing11.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing01-01.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing02-01.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing03-01.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing04-01.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing05-01.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing06-01.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing07-01.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing08-01.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing09-01.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing10-01.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing11-01.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing01-02.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing02-02.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing03-02.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing04-02.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing05-02.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing06-02.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing07-02.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing08-02.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing09-02.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing10-02.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing11-02.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// ======================= 

const imageThumbC = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing01-03.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing02-03.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing03-03.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing04-03.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing05-03.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing06-03.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing07-03.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing08-03.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing09-03.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing10-03.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing11-03.jpg",
};
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// ======================= 

const imageThumbD = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing01-04.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing02-04.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing03-04.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing04-04.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing05-04.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing06-04.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing07-04.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing08-04.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing09-04.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing10-04.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/lovesharing/lovesharing11-04.jpg",
};
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://lokerwfh.net/AS8s",
"02" : "https://lokerwfh.net/iDob2JzL",
"03" : "https://lokerwfh.net/86OjCyYN",
"04" : "https://lokerwfh.net/8vMbjN",
"05" : "https://lokerwfh.net/9zHEjP4z",
"06" : "https://lokerwfh.net/rGBPlR",
"07" : "https://lokerwfh.net/lxSA4w",
"08" : "https://lokerwfh.net/Ikafylh",
"09" : "https://lokerwfh.net/lz5K",
"10" : "https://lokerwfh.net/6aHJsD0",
"11" : "https://lokerwfh.net/xIMi1",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================



const linkTrakteer = {};
for (let i = 1; i <= 999999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/love-sharing-2022-hardsub-gVl8d";
};
console.log(linkTrakteer);


// =======================
// PASSWORD
// =======================


const filePassword = {
"01" : "renomukaiyumiki01",
"02" : "renomukaiyumiki02",
"03" : "renomukaiyumiki03",
"04" : "renomukaiyumiki04",
"05" : "renomukaiyumiki05",
"06" : "renomukaiyumiki06",
"07" : "renomukaiyumiki07",
"08" : "renomukaiyumiki08",
"09" : "renomukaiyumiki09",
"10" : "renomukaiyumiki10",
"11" : "renomukaiyumiki11",
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