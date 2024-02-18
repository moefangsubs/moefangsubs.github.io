
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"01" : "Dalam episode pertama, Saito Asuka menjadi pembuka seri ini.",
	"02" : "Episode 2 masih oleh Saito Asuka untuk me-review makanan.",
	"03" : "Kali ini episodenya Mukai Hazuki, dimana dia akan mencoba makanan gyoza dari 'Gyoza Shack' di Sangenjaya.",
	"04" : "Melanjutkan makan makannya Mukai Hazuki di restoran serba gyoza.",
	"05" : "Di episode 5 kali ini adalah eternal imouto Hoshino Minami!",
	"06" : "Melanjutkan makan makannya Hoshino Minami di restoran serba keju!",
	"07" : "Di episode 7 kali ini adalah Momoko!",
	"08" : "Melanjutkan episodenya Momoko. Tiap ngesub ini pasti bawaannya lapar! Hahaha~",
	"09" : "Di episode 9 kali ini adalah Takayama Kazumi atau Kazumin! ",
	"10" : "Melanjutkan gourmet punyanya Takayama Kazumi~",
	"11" : "Di episode 10 kali ini adalah berdua bareng Sayaka dan Yanchan! Mungkin ini yang terakhir dari Gourmet no Sakamichi dimana para member datang langsung ke restorannya, karena ke depannya hanya mencoba makanannya tanpa ke restorannya.",
	"12" : "Masih bareng Sayaka dan Yanchan! ",
	"13" : "Episode Wada Maaya ini adalah episode pertama untuk membawa pulang/takeout makanannya dari restoran karena aturan penanganan Covid di Jepang pada saat itu. ",
	"14" : "Di episode kali ini Gourmet no Sakamichi berganti tema. Dimana (kemungkinan besar) ada varian baru Covid-19, jadi yang tadinya member nyamperin ke restorannya sekarang makanannya yang nyamperin. Juga ada slogan \"yummy\" Okey, di episode 14 ini ada Sakaguchi Tamami bareng Iwamoto Renka! Tidak seperti biasa, 2 episode-nya ini mencoba restoran yang beda juga.",
	"15" : "Kita lanjut episodenya Sakaguchi Tamami bareng Iwamoto Renka. ",
	"16" : "Di episode kali ini datang dari gen-2, Watanabe Miria bareng Hori Miona! Sama seperti sebelumnya, 2 episode-nya ini mencoba restoran yang beda juga.",
	"17" : "Masih bareng Watanabe Miria dengan Hori Miona. ",
	"18" : "Di episode kali ini datang dari gen-2, Terada Ranze bareng Ito Junna! Sama seperti sebelumnya, 2 episode-nya ini mencoba restoran yang beda juga. ",
	"19" : "Masih bareng Terada Ranze dengan Ito Junna. ",
	"20" : "Di episode kali ini datang dari gen-4, Kanagawa Saya (yang udah dua kali) bareng Shibata Yuna yang baru pertama kali! Sama seperti sebelumnya, 2 episode-nya ini mencoba restoran yang beda juga.",
	"21" : "Masih bareng Yanchan dengan Yunachan.",
	"22" : "Di episode kali ini datang dari gen-3, Sakaguchi Tamami (yang udah dua kali) bareng Sato Kaede yang baru pertama kali! Sama seperti sebelumnya, 2 episode-nya ini mencoba restoran yang beda juga.",
	"23" : "Masih bareng Tamami dengan Denchan. ",
	"24" : "Episode kali ini adalah dari gen-4, yaitu Hayakawa Seira dengan Tamura Mayu. Sama seperti sebelumnya, 2 episode-nya ini mencoba restoran dan masakan yang berbeda juga.",
	"25" : "Masih bersama Seira dan Mayutan. ",
	"26" : "Episode kali ini masih dari gen-4, yaitu Hayashi Runa dengan dek Tsutsui Ayame. Sama seperti sebelumnya, 2 episode-nya ini mencoba restoran dan masakan yang berbeda juga.",
	"27" : "Episode kali ini masih bersama Hayashi Runa dan Ayame.",
	"28" : "Episode kali ini masih dari gen-4, yaitu Matsuo Miyu dengan Sato Rika. Masih dengan 2 episode yang berbeda. ",
	"29" : "Masih bersama Miyuchan dan Rika.",
	"30" : "Sebagai penutup dari Gourmet no Sakamichi season pertama, kali ini adalah dari gen-3, yaitu Ito Riria dengan Yoshida Ayano Christie. Khusus ini yang akan bertugas shokurepo-nya adalah mereka berdua.",
};

// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "グルメの坂道";
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
	"11" : "| Episode 11",
	"12" : "| Episode 12",
	"13" : "| Episode 13",
	"14" : "| Episode 14",
	"15" : "| Episode 15",
	"16" : "| Episode 16",
	"17" : "| Episode 17",
	"18" : "| Episode 18",
	"19" : "| Episode 19",
	"20" : "| Episode 20",
	"21" : "| Episode 21",
	"22" : "| Episode 22",
	"23" : "| Episode 23",
	"24" : "| Episode 24",
	"25" : "| Episode 25",
	"26" : "| Episode 26",
	"27" : "| Episode 27",
	"28" : "| Episode 28",
	"29" : "| Episode 29",
	"30" : "| Episode 30",
  };
console.log(descEpisode);


// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "9 Desember 2020",
	"02" : "14 Desember 2020",
	"03" : "16 Desember 2020",
	"04" : "21 Desember 2020",
	"05" : "23 Desember 2020",
	"06" : "28 Desember 2020",
	"07" : "30 Desember 2020",
	"08" : "4 Januari 2021",
	"09" : "6 Januari 2021",
	"10" : "11 Januari 2021",
	"11" : "13 Januari 2021",
	"12" : "18 Januari 2021",
	"13" : "20 Januari 2021",
	"14" : "25 Januari 2021",
	"15" : "27 Januari 2021",
	"16" : "1 Februari 2021",
	"17" : "3 Februari 2021",
	"18" : "8 Februari 2021",
	"19" : "10 Februari 2021",
	"20" : "15 Februari 2021",
	"21" : "17 Februari 2021",
	"22" : "22 Februari 2021",
	"23" : "25 Februari 2021",
	"24" : "1 Maret 2021",
	"25" : "3 Maret 2021",
	"26" : "8 Maret 2021",
	"27" : "10 Maret 2021",
	"28" : "28 Maret 2021",
	"29" : "17 Maret 2021",
	"30" : "22 Maret 2021",
  };
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "齋藤飛鳥",
	"02" : "齋藤飛鳥",
	"03" : "向井葉月",
	"04" : "向井葉月",
	"05" : "星野みなみ",
	"06" : "星野みなみ",
	"07" : "大園桃子",
	"08" : "大園桃子",
	"09" : "高山一実",
	"10" : "高山一実",
	"11" : "金川紗耶、掛橋沙耶香",
	"12" : "金川紗耶、掛橋沙耶香",
	"13" : "和田まあや",
	"14" : "阪口珠美、岩本蓮加",
	"15" : "阪口珠美、岩本蓮加",
	"16" : "堀未央奈、渡辺みり愛",
	"17" : "堀未央奈、渡辺みり愛",
	"18" : "伊藤純奈、寺田蘭世",
	"19" : "伊藤純奈、寺田蘭世",
	"20" : "柴田柚菜、金川紗耶",
	"21" : "柴田柚菜、金川紗耶",
	"22" : "阪口珠美、佐藤楓",
	"23" : "阪口珠美、佐藤楓",
	"24" : "早川聖来、田村真佑",
	"25" : "早川聖来、田村真佑",
	"26" : "筒井あやめ、林瑠奈",
	"27" : "筒井あやめ、林瑠奈",
	"28" : "松尾美佑、佐藤璃果",
	"29" : "松尾美佑、佐藤璃果",
	"30" : "伊藤理々杏、吉田綾乃クリスティー",
  };
console.log(memberParticipate);


// =======================
// NAMA RESTO & ALAMAT
// =======================

const RestoName = {
	"01" : "Masakan Jepang \"Tagetsu\"",
	"02" : "Masakan Jepang \"Tagetsu\"",
	"03" : "Gyoza Shack",
	"04" : "Gyoza Shack",
	"05" : "Restoran \"Oh! Chikkin N\"",
	"06" : "Restoran \"Oh! Chikkin N\"",
	"07" : "Restoran Seafood \"Uoteru\"",
	"08" : "Restoran Seafood \"Uoteru\"",
	"09" : "Restoran \"Taikan En\"",
	"10" : "Restoran \"Taikan En\"",
	"11" : "Restoran \"Kyoto Saryousuisen\" Shinjuku",
	"12" : "Restoran \"Kyoto Saryousuisen\" Shinjuku",
	"13" : "Restoran \"ALDEBARAN\"",
	"14" : "Restoran \"Maguro Mart\"",
	"15" : "Kedai \"Kissa You\"",
	"16" : "Fukagawa Kamasho",
	"17" : "The Grill Republic",
	"18" : "Kumada",
	"19" : "Kajitsu-en Libre",
	"20" : "The Burn",
	"21" : "Kougaiken",
	"22" : "Tsukiji Imazu",
	"23" : "Daifuku Benzaiten",
	"24" : "Tsukiji Kindako",
	"25" : "Yakiniku Ponga",
	"26" : "Sashimi Bar Kashigashira",
	"27" : "TAKEUCHI Toko Utama Jinbocho",
	"28" : "MACAPRESSO",
	"29" : "Pannya",
	"30" : "Patisserie Ease",
  };
console.log(RestoName);


const RestoAdd = {
	"01" : "Kita Aoyama 3-13-1, Minato-ku, Tokyo",
	"02" : "Kita Aoyama 3-13-1, Minato-ku, Tokyo",
	"03" : "Chome-13-10 Sangenjaya, Setagaya City, Tokyo",
	"04" : "Chome-13-10 Sangenjaya, Setagaya City, Tokyo",
	"05" : "2-3-20 Hyakunincho, Shinjuku-ku, Tokyo",
	"06" : "2-3-20 Hyakunincho, Shinjuku-ku, Tokyo",
	"07" : "7-6-3 Roppongi, Minato-ku, Tokyo",
	"08" : "7-6-3 Roppongi, Minato-ku, Tokyo",
	"09" : "Hotel New Otani Tokyo, Chiyoda, Tokyo",
	"10" : "Hotel New Otani Tokyo, Chiyoda, Tokyo",
	"11" : "2-6-1, Nishishinjuku, Tokyo",
	"12" : "2-6-1, Nishishinjuku, Tokyo",
	"13" : "3-2-9 Nishiazabu, Minato-ku, Tokyo",
	"14" : "5 Chome-50-3 Nakano, Tokyo",
	"15" : "2 Chome-1-13 Shirakawa, Koto-ku, Tokyo",
	"16" : "24 Chome-13-17, Ginza, Chuo - Tokyo",
	"17" : "ARK Hills South Tower B1F -  Roppongi, Tokyo",
	"18" : "Shibuya, Tokyo",
	"19" : "Shibuya, Tokyo",
	"20" : "Aoyama Bld. - Minato, Tokyo",
	"21" : "Nishiazabu - Minato, Tokyo",
	"22" : "Tsukiji - Chuo, Tokyo",
	"23" : "Ginza, Tokyo",
	"24" : "1 Chome-17-1 Toranomon, Minato,Tokyo",
	"25" : "Del Danville 1 Chome 2-17-5, Tokyo",
	"26" : "Ginza, Tokyo",
	"27" : "Lions Mansion East Ginza B1F, Tokyo",
	"28" : "THE CITY Shin-Okubo 2F~4F Shinjuku",
	"29" : "Kitazawa, Setagaya, Tokyo",
	"30" : "Nihonbashi Kabutocho, Tokyo",
  };
console.log(RestoAdd);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
	"01" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-01asuka.jpg",
	"02" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-01asuka.jpg",
	"03" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-03hazuki.jpg",
	"04" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-03hazuki.jpg",
	"05" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-05minami.jpg",
	"06" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-05minami.jpg",
	"07" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-07momoko.jpg",
	"08" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-07momoko.jpg",
	"09" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-09kazumin.jpg",
	"10" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-09kazumin.jpg",
	"11" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-11sayakayancha.jpg",
	"12" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-11sayakayancha.jpg",
	"13" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-13maaya.jpg",
	"14" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-14tamamirenka.jpg",
	"15" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-14tamamirenka.jpg",
	"16" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-16mionamiria.jpg",
	"17" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-16mionamiria.jpg",
	"18" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-18ranzejunna.jpg",
	"19" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-18ranzejunna.jpg",
	"20" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-20runasaya.jpg",
	"21" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-20runasaya.jpg",
	"22" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-22tamamikaede.jpg",
	"23" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-22tamamikaede.jpg",
	"24" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-24seiramayu.jpg",
	"25" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-24seiramayu.jpg",
	"26" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-26ayameruna.jpg",
	"27" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-26ayameruna.jpg",
	"28" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-28miyurika.jpg",
	"29" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-28miyurika.jpg",
	"30" : "https://ik.imagekit.io/mLsKqNSuB/post/gourmetsakamichi/Gourmet-30yoshidariria.jpg",
};
console.log(imageThumbBig);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/a08KLj",
	"02" : "https://lokerwfh.net/irISEQdx",
	"03" : "https://lokerwfh.net/n8HchMrk",
	"04" : "https://lokerwfh.net/Qe8L",
	"05" : "https://lokerwfh.net/e9Ufv",
	"06" : "https://lokerwfh.net/2Zhloa8F",
	"07" : "https://lokerwfh.net/cfyO6D",
	"08" : "https://lokerwfh.net/WDmHeW",
	"09" : "https://lokerwfh.net/fgZKIB",
	"10" : "https://lokerwfh.net/Vklx",
	"11" : "https://lokerwfh.net/H95J",
	"12" : "https://lokerwfh.net/1d6xfgus",
	"13" : "https://lokerwfh.net/6HjmV46",
	"14" : "https://lokerwfh.net/PxCn",
	"15" : "https://lokerwfh.net/Azev",
	"16" : "https://lokerwfh.net/IzfbLv",
	"17" : "https://lokerwfh.net/g8EB03",
	"18" : "https://lokerwfh.net/dQmklzIM",
	"19" : "https://lokerwfh.net/aTlS",
	"20" : "https://lokerwfh.net/2z9EH9GQ",
	"21" : "https://lokerwfh.net/Ggpx8z1",
	"22" : "https://lokerwfh.net/K3q7l29X",
	"23" : "https://lokerwfh.net/pNsZeo",
	"24" : "https://lokerwfh.net/tbq9rYGv",
	"25" : "https://lokerwfh.net/SHRAkjI8",
	"26" : "https://lokerwfh.net/6XystBKU",
	"27" : "https://lokerwfh.net/BIr2Xd",
	"28" : "https://lokerwfh.net/biJ2s1oJ",
	"29" : "https://lokerwfh.net/7z1KDC",
	"30" : "https://lokerwfh.net/6V8iLAM",
  };
console.log(linkHardsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {
	"01" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"02" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"03" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"04" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"05" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"06" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"07" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"08" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"09" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"10" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"11" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"12" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"13" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"14" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"15" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"16" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"17" : "https://trakteer.id/moefangsubs/showcase/batch-softsub-gourmet-no-sakamichi-ep-1-17-lge5w",
	"18" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-18-19-MEaKL",
	"19" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-18-19-MEaKL",
	"20" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-20-21-P77NK",
	"21" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-20-21-P77NK",
	"22" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-22-23-nzNcY",
	"23" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-22-23-nzNcY",
	"24" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-24-25-8sbhn",
	"25" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-24-25-8sbhn",
	"26" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-26-27-33yaS",
	"27" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-26-27-33yaS",
	"28" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-28-29-aTiii",
	"29" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-28-29-aTiii",
	"30" : "https://trakteer.id/moefangsubs/showcase/softsub-gourmet-no-sakamichi-ep-30-Lb6GI",
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