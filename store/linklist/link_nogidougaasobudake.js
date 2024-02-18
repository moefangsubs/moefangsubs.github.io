
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"17" : "Dalam merayakan ulang tahunnya Kaki Haruka, Kitagawa Yuri, Sato Rika dan masuknya Kanagawa Saya ke jajaran senbatsu, kali ini MoeFang mencoba ngesub konten Asobu dake khusus supporter Trakteer. Kegiatan mereka terbagi 2 episode, yaitu episode 17 dan 18. Untuk episode 17 disini mereka akan melakukan hal yang ingin dilakukan. Pertama adalah Kakki yang ingin pergi ke cafe kucing, dan Yanchan yang ingin pergi ke tempat ramal. Tanpa diduga ramalan mereka ada yang terwujud loh...",
	"18" : "Dalam merayakan ulang tahunnya Kaki Haruka, Kitagawa Yuri, Sato Rika dan masuknya Kanagawa Saya ke jajaran senbatsu, kali ini MoeFang mencoba ngesub konten Asobu dake khusus supporter Trakteer. Kegiatan mereka terbagi 2 episode, yaitu episode 17 dan 18. Untuk episode 18 disini keempat keinginan Yuri yang ingin pergi ke tempat purikura, ditambah Rika-chan yang ingin sambil bercosplay. Dan terakhir Sakuchan yang ingin pergi ke sushi bar, meskipun dia tidak ikut, tapi Kakki, Yanchan, Rika dan Yuri mewakili Sakuchan.",
	"44a" : "Dalam memperingati garapannya MoeFang yang ke-1000, kali ini kami mencoba ngesub konten Asobu dake NOGIZAKA ROOM SHARE khusus supporter Trakteer. Kegiatan mereka dalam episode 44 terbagi 2 part, yaitu Zenpen dan Kouhen dengan total kurang lebih 1,5 jam. Untuk episode ini merupakan pestanya 14 orang gen-4 (tidak termasuk Hayashi Runa dan Kakehashi Sayaka yang sedang hiatus), dan juga kumpul-kumpul terakhir Hayakawa Seira dan Kitagawa Yuri yang mengumumkan kelulusannya. Mari kita saksikan keseruan pesta bebasnya mereka.",
	"44b" : "Dalam memperingati garapannya MoeFang yang ke-1000, kali ini kami mencoba ngesub konten Asobu dake NOGIZAKA ROOM SHARE khusus supporter Trakteer. Kegiatan mereka dalam episode 44 terbagi 2 part, yaitu Zenpen dan Kouhen dengan total kurang lebih 1,5 jam. Untuk episode ini merupakan pestanya 14 orang gen-4 (tidak termasuk Hayashi Runa dan Kakehashi Sayaka yang sedang hiatus), dan juga kumpul-kumpul terakhir Hayakawa Seira dan Kitagawa Yuri yang mengumumkan kelulusannya. Mari kita saksikan keseruan pesta bebasnya mereka.",
  };

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂あそぶだけ";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"17" : "| Episode 17",
	"18" : "| Episode 18",
	"44a" : "| Episode 44 前編",
	"44b" : "| Episode 44 後編",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"17" : "25 Januari 2022",
	"18" : "1 Februari 2022",
	"44a" : "30 Juni 2023",
	"44b" : "30 Juni 2023",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"17" : "賀喜遥香、金川紗耶、北川裕理、佐藤璃果",
	"18" : "賀喜遥香、金川紗耶、北川裕理、佐藤璃果、遠藤さくら",
	"44a" : "乃木坂46 4期生",
	"44b" : "乃木坂46 4期生",
  };
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"17" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake17.jpg",
	"18" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake18.jpg",
	"44a" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake44.jpg",
	"44b" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake44.jpg",
  };
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"17" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake17a.jpg",
	"18" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake18a.jpg",
	"44a" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake44a.jpg",
	"44b" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake44a.jpg",
  };
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"17" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake17b.jpg",
	"18" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake18b.jpg",
	"44a" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake44b.jpg",
	"44b" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake44b.jpg",
  };
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"17" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake17c.jpg",
	"18" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake18c.jpg",
	"44a" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake44c.jpg",
	"44b" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake44c.jpg",
  };
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {
	"17" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake17d.jpg",
	"18" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake18d.jpg",
	"44a" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake44d.jpg",
	"44b" : "https://ik.imagekit.io/mLsKqNSuB/post/asobudake/asobudake44d.jpg",
  };
console.log(imageThumbD);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
	"17" : "https://trakteer.id/moefangsubs/showcase/nogizaka-asobu-dake-17-SJ37k",
	"18" : "https://trakteer.id/moefangsubs/showcase/nogizaka-asobu-dake-18-TimMa",
	"44a" : "https://trakteer.id/moefangsubs/showcase/nogizaka-asobu-dake-44-B7iyN",
	"44b" : "https://trakteer.id/moefangsubs/showcase/nogizaka-asobu-dake-44-B7iyN",
  };
console.log(linkTrakteer);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {
	"17" : "Bahasa Indonesia",
	"18" : "Bahasa Indonesia",
	"44a" : "Bahasa Indonesia",
	"44b" : "Bahasa Indonesia",
  };
console.log(subLanguage);