
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"57" : "Di episode 57 ini, Kubo Channel mendatangkan tamu dari gen-1, Saito Asuka yang telah mengumumkan kelulusannya. Di sini mereka akan melihat MV solo-nya Asuka \"Kore kara\", dan setelah itu kita akan mendengar cerita kecil di dalamnya.",
	"62" : "Di episode 62 ini, Kubo Channel kedatangan tamu dari gen-4, Kaki Haruka, yang masih sama seperti di episode sebelumnya. Di sini mereka akan melihat tayangan 10th Birthday Live dimana Akimoto Manatsu menjadi center dari lagu \"Sayonara no Imi\", dan setelah itu kita akan mendengar cerita kecil tentang kedekatan mereka bersama Manatsu-san.",
	"114": "Episode ini menandai kemunculan perdana member gen-6, Setoguchi Mitsuki dan Yada Moeka, bersama Kubo Shiori dalam segmen \"Time Limit Kataomoi\". Mereka mengenang pengalaman syuting MV pertama mereka, membagikan kesan jujur dan cerita di balik layar. Kubo juga mendengar kesan pertama kedua juniornya terhadap dirinya, sambil tak bisa menyembunyikan kegugupan sebagai MC. Percakapan bertiga mencerminkan kepolosan khas gen baru, hingga membuat Kubo merasa malu pada dirinya sendiri.",
	"115": "Episode ini mengungkap kisah di balik video pengumuman member baru yang direkam di kampung halaman masing-masing. Dalam prosesnya, mereka berjuang agar tak ketahuan oleh siswa lain saat syuting di sekolah. Kisah masa seleksi mereka juga diangkat, termasuk saat mereka harus diam-diam bolak-balik Tokyo untuk latihan, menyembunyikan rahasia dari teman-teman dan keluarga. Menjelang 13th YEAR BIRTHDAY LIVE, Setoguchi dan Yada berbagi kegelisahan mereka, dan Kubo memberikan saran hangat sebagai senpai.",
	"116": "Episode ini menampilkan penampilan panggung pertama Setoguchi dan Yada di First Performance \"Hajimemashite, 6kisei desu\", termasuk cuplikan perkenalan satu menit dan unjuk bakat mereka. Mereka berbagi cerita tentang pemilihan kostum dan pengalaman panggung perdana yang penuh kebaruan. Percakapan berlanjut dengan bahasan saling pandang satu sama lain, hal-hal yang dinantikan dalam Zenkoku Tour mendatang, kata-kata dari Umezawa Minami, serta koneksi unik lewat dialek daerah mereka."
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "久保チャンネル";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"57" : "| Episode 57",
	"62" : "| Episode 62",
	"114" : "| Episode 114",
	"115" : "| Episode 115",
	"116" : "| Episode 116",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"57" : "16 Desember 2022",
	"62" : "7 Februari 2023",
	"114" : "27 Mei 2025",
	"115" : "3 Juni 2025",
	"116" : "10 Juni 2025",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"57" : "久保史緒里、齋藤飛鳥",
	"62" : "久保史緒里、賀喜遥香",
	"114" : "久保史緒里、瀬戸口美月、矢田萌華",
	"115" : "久保史緒里、瀬戸口美月、矢田萌華",
	"116" : "久保史緒里、瀬戸口美月、矢田萌華",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"57" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel57.jpg",
	"62" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel62.jpg",
	"114" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel114.jpg",
	"115" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel115.jpg",
	"116" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel116.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"57" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel57a.jpg",
	"62" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel62a.jpg",
	"114" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel114a.jpg",
	"115" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel115a.jpg",
	"116" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel116a.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"57" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel57b.jpg",
	"62" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel62b.jpg",
	"114" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel114b.jpg",
	"115" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel115b.jpg",
	"116" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel116b.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"57" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel57c.jpg",
	"62" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel62c.jpg",
	"114" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel114c.jpg",
	"115" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel115c.jpg",
	"116" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel116c.jpg",
  };
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {
	"57" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel57d.jpg",
	"62" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel62d.jpg",
	"114" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel114d.jpg",
	"115" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel115d.jpg",
	"116" : "https://ik.imagekit.io/mLsKqNSuB/post/kubochannel/kubochannel116d.jpg",
  };
console.log(imageThumbD);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/kubo-channel-GGnx0";
};
console.log(linkTrakteer);


// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
};
console.log(subLanguage);