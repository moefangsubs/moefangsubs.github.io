
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"01" : "Kali ini mereka bertiga pergi ke daerah Kanazawa.",
	"02" : "Kali ini bagian Matsusaka-hen. mereka bertiga bakal seru-seruan di Prefektur Mie, di sebuah kota yang terkenal dengan daging sapi",
	"03" : "Kali ini adalah edisi Kochi, dimana Nanase, Maichun dan Kapten Reika pergi ke Prefektur Kochi.",
	"04" : "Kali ini adalah edisi Kyoto-hen, meskipun harusnya Hakodate karena cuaca buruk jadi ganti tempat. Ikuchan, Ikoma dan Minami bakal seru-seruan di Kyoto dan tempat-tempat lainnya.",
	"05" : "Kali ini adalah bagian Aomori-hen...grupnya adalah Miona, Shiori dan Sayunyan. Melihat ini rasanya pengen banget ke Aomori terutama ke museum seni modernnya.~",
	"06" : "Kali ini adalah edisi Yamaguchi-hen. Kita akan menikmati keasyikan Kazumi, Ranze dan Zuki selama berada di Prefektur Yamaguchi",
};
console.log(descEpisodeSynopsis);

// =======================
// NAMA ACARA
// =======================


const nameShow = {
	"01" : "旅する3人～最高のお土産を探して～金沢編",
	"02" : "旅する3人～最高のお土産を探して～松坂編",
	"03" : "旅する3人～最高のお土産を探して～高知編",
	"04" : "旅する3人～最高のお土産を探して～京都編",
	"05" : "旅する3人～最高のお土産を探して～青森編",
	"06" : "旅する3人～最高のお土産を探して～山口編",
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Bonus Type A - Kanazawa-hen",
	"02" : "| Bonus Type A - Matsusaka-hen",
	"03" : "| Bonus Type B - Kochi-hen",
	"04" : "| Bonus Type B - Kyoto-hen",
	"05" : "| Bonus Type C - Aomori-hen",
	"06" : "| Bonus Type C - Yamaguchi-hen",
};
console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {};
for (let i = 1; i <= 9999; i++) {
  descOnAirDate[i.toString().padStart(2, '0')] = "25 April 2018";
}
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "白石麻衣、松村沙友理、若月佑美",
	"02" : "衛藤美彩、樋口日奈、与田祐希",
	"03" : "桜井玲香、新内眞衣、西野七瀬",
	"04" : "生田絵梨花、生駒里奈、星野みなみ",
	"05" : "井上小百合、久保史緒里、堀未央奈",
	"06" : "高山一実、寺田蘭世、山下美月",
  };
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/moefang/post/nogi20th/kanazawa-00.jpg",
	"02" : "https://ik.imagekit.io/moefang/post/nogi20th/matsusaka-00.jpg",
	"03" : "https://ik.imagekit.io/moefang/post/nogi20th/kochi-00.jpg",
	"04" : "https://ik.imagekit.io/moefang/post/nogi20th/kyoto-00.jpg",
	"05" : "https://ik.imagekit.io/moefang/post/nogi20th/aomorihen-00.jpg",
	"06" : "https://ik.imagekit.io/moefang/post/nogi20th/yamaguchi-00.jpg",
};
console.log(imageThumbBig);


// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-kanazawa-00.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-matsusaka-00.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-kochi-00.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-kyoto-00.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-aomorihen-00.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-yamaguchi-00.jpg",
};
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-kanazawa-01.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-matsusaka-01.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-kochi-01.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-kyoto-01.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-aomorihen-01.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-yamaguchi-01.jpg",
};
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-kanazawa-02.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-matsusaka-02.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-kochi-02.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-kyoto-02.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-aomorihen-02.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-yamaguchi-02.jpg",
};

const imageThumbX = {
	...imageThumbC,
};
console.log(imageThumbX);


// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-kanazawa-03.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-matsusaka-03.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-kochi-03.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-kyoto-03.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-aomorihen-03.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus20/20-tabisuru-yamaguchi-03.jpg",
};
console.log(imageThumbD);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://drive.google.com/file/d/12GNQw2HW1xqykgzBlLH5MsylocBQFGQF/view?usp=drive_link",
	"02" : "https://drive.google.com/file/d/12KvmzvYYC4e2QM-IcO1APvV5j-4sbKlM/view?usp=drive_link",
	"03" : "https://lokerwfh.net/l6bkhqdn",
	"04" : "https://lokerwfh.net/Eo6MP",
	"05" : "https://lokerwfh.net/JjirH",
	"06" : "https://lokerwfh.net/4DeQCe",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka46-bonus-20th-single-synchronicity-vV3qa";
}
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 9999; i++) {
  filePassword[i.toString().padStart(2, '0')] = "20thTabiSuru3nin";
}

console.log(filePassword);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);