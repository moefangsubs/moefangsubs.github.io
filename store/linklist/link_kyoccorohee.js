
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"01" : "Di episode kali ini, mereka akan menonton VTR tentang tarian kontemporer.",
	"02" : "Di episode kali ini, mereka akan menonton VTR penjelasan tarian dari koreografer profesional Takahiro-sensei!",
	"03" : "Di episode Kyoccorohee kali ini, mereka akan menonton VTR para penari profesional akan menirukan ritme dari seorang geinin. Tak kalah juga sesi sebelumnya adalah sesi ngobrol bareng!",
	"04" : "Di episode Kyoccorohee kali ini, mereka akan melihat submission dari akun-akun TikTok yang mengikuti kompetisi dari Kyoccorohee."
  };

console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "キョコロヒー";
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
  };
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "31 Maret 2021",
	"02" : "7 April 2021",
	"03" : "14 April 2021",
	"04" : "21 April 2021"
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "齊藤京子、ヒコロヒー",
	"02" : "齊藤京子、ヒコロヒー",
	"03" : "齊藤京子、ヒコロヒー",
	"04" : "齊藤京子、ヒコロヒー"
  };
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/kyoccorohee/kyoccorohee-00.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/kyoccorohee/kyoccorohee-00.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/kyoccorohee/kyoccorohee-00.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/kyoccorohee/kyoccorohee-00.jpg"
  };

console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/kyoccorohee/kyoccorohee-01a.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/kyoccorohee/kyoccorohee-02a.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/kyoccorohee/kyoccorohee-03a.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/kyoccorohee/kyoccorohee-04a.jpg"
  };

console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================


const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/kyoccorohee/kyoccorohee-01b.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/kyoccorohee/kyoccorohee-02b.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/kyoccorohee/kyoccorohee-03b.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/kyoccorohee/kyoccorohee-04b.jpg"
  };
console.log(imageThumbB);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/iHYzck",
	"02" : "https://lokerwfh.net/njjOI",
	"03" : "https://lokerwfh.net/HtWKhuFz",
	"04" : "https://lokerwfh.net/xKYm2N"
  };
 
 
// =======================
// LINK SOFTSUB
// =======================

const linkSoftsub = {
	"01" : "https://lokerwfh.net/15gBGI",
	"02" : "https://lokerwfh.net/7vkJy",
	"03" : "https://lokerwfh.net/7wb9gWv4",
	"04" : "https://lokerwfh.net/tqr7J9rB"
  };

// =======================
// LINK SOFTSUB as TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/kyokkorohee-UlAEk";
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
