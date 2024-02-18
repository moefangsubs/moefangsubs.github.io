
// =======================
// DESKRIPSI B
// =======================

const descEpisodeSynopsis = {
	"01" : "Dalam episode kali ini adalah spesial Pink Lady! Para member gen-4 dan tamu dari senpai juga ikut menantang lagu-lagu populer Pink Lady!",
	"02" : "Dalam episode kali ini adalah spesial Komuro Tetsuya-san atau biasa dipanggil TK-san. Bersama DJ KOO-san, para member gen-4 dan tamu Kubo Shiori juga ikut menantang lagu-lagu populer karya TK-san!",
	"03" : "Dalam episode kali ini adalah spesial lagu-lagu yang lahir dari acara-acara TV era Showa-Heisei. Bintang tamu senpainya adalah kapten Akimoto Manatsu, dan juga Wada Maaya dan Nakamura Reno ikut memeriahkan episode kali ini.",
	"04" : "Dalam episode kali ini kita akan bertemu rivalnya Super Yanchanzu, yaitu Super Tamachanzu! Dengan keimutan para member menggunakan berbagai kostum tema haloween menambah kemeriahan dalam episode ini.",
	"05" : "Dalam episode kali ini senpai yang datang adalah Yoda Yuuki dari gen-3. Lalu, kita akan melihat sesi dimana bintang tamu spesial kali ini Matsuzaki Shigeru-san berimprovisasi dengan lirik buatan para member.",
	"06" : "Dalam episode spesial The Checkers kali ini senpai yang datang adalah Shinuchi Mai alias Maichun dari gen-2. Dan juga kedatangan tamu Tsuruku Masaharu, mantan The Checkers yang sudah 2 kali hadir di Star Tanjou.",
	"07" : "Dalam episode spesial Ii fufu no Hi (Hari Pasangan) kali ini senpai yang datang adalah Yoda Yuuki yang juga sebelumnya diundang. Dan juga kedatangan tamu idol populer karena keimutannya pada zamannya Nagai Mariko-san. Juga, ada oogiri baru spesial tentang cinta.",
	"08" : "Dalam episode spesial \"Penyanyi yang Berdampak Besar pada Lagu era Showa\" kali ini senpai yang datang adalah Higuchi Hina yang juga sebelumnya diundang. Dan juga kedatangan tamu spesial Linda Yamamoto yang saat itu terkenal akan matanya yang besar dan keimutannya seperti boneka.",
	"09" : "Dalam episode kali ini senpai yang datang adalah Kitano Hinako dari gen-2. Dan juga kedatangan tamu spesial raja high tone voice Jepang Ono Masatoshi. Juga, ada sesi latihan vokal bersama Ono-san.",
	"10" : "Dalam episode kali ini senpai yang datang adalah Kubo Shiori yang mana di episode sebelumnya telah hadir. Kali ini, Shiori-chan akan menantang diri menyanyikan lagu enka yang belum pernah dia coba sebelumnya. Juga penampilan Kobayashi Sachiko-san sebagai penyanyi enka populer akan mewarnai episode ini.",
	"11" : "Dalam episode kali ini tidak ada tamu yang datang, namun akan dimeriahkan oleh penampilan para member dan set studio bertemakan natal! Dengan kehadiran member senpai Yamashita Mizuki akan membuat meriah episode ini ditambah adanya game klasik di tengah-tengah acara.",
	"12" : "Dalam episode bertemakan idol kyapikyapi, kali ini kita kedatangan tamu mantan member Onyanko Club, Watanabe Minayo-san. Juga, penampilan dari senpai member Ito Riria bersama Super Yanchanzu. Ada juga selingan berupa duel tatap mata.",
	"13" : "Dalam episode dengan tema lagu-lagu folks ini, Nogizaka Star Tanjou mengundang seorang legenda musik folks Minami Kousetsu. Tidak seperti episode-episode sebelumnya, episode kali ini semua lagunya dibawakan secara live music. Member senpai yang datang adalah Mukai Hazuki yang akan ikut menyanyikan sebuah lagu disini dengan diiringi gitarnya.",
	"14" : "Episode 14 ini merupakan episode edisi dimana Fujimori Shingo memilih lagu-lagu yang ingin dibawakan bersama Nogizaka dengan mengusung tema 'karaoke party night'. Dan di episode ini juga Fujimori-san akan mengajarkan 'sorakan karaoke' kepada Nogizaka-chan, dan setelah itu Yumiki Nao ditantang untuk mencobanya! Penasaran? Ya udah pasti download aja ya~",
	"15" : "Episode 15 ini menghadirkan tamu spesial, seorang diva yang sudah berkarir selama 51 tahun, Koyanagi Rumiko. Dan untuk tamu dari senpai adalah Ito Riria yang sudah 3x hadir disini. Di pertengahan acara ada sesi oogiri LOVE.",
	"16" : "Episode 16 ini mungkin agak sedih karena kita akan melihat perform duo gen-2 Suzuki Ayane dan Kitano Hinako yang mana Hinako sendiri telah mengumumkan kelulusannya. Tamu spesialnya adalah Agnes Chan, seorang pelopor idol asing pertama, yang kelahirannya sama seperti Kuromi Haruka yaitu dari Hongkong. Lalu ada penampilan lagu original karya Hanashi (Kakehashi Sayaka dan Kitagawa Yuri).",
	"17" : "Episode 17 merupakan episode spesial hari valentine, dan seperti biasa valentine itu ada kegiatan khususnya, yaitu love oogiri! Bersama dengan bintang tamu Kokusho Sayuri mantan member Onyanko Club dan member senpai Nakamura Reno akan memeriahkan episode kali ini.",
	"18" : "Di episode 18 ini member senpainya adalah Kubo Shiori dari gen-3. Lalu, untuk pertama kalinya Matsuo Miyu yang biasa jadi dancer Super Yanchanzu ini menantang dirinya bernyanyi solo! Untuk bintang tamunya adalah penyanyi legendaris kelahiran Taiwan, Judy Ongg. Beliau akan bernyanyi bersama Hayashi Runa dan Kitagawa Yuri.",
	"19" : "Di episode 19 ini dibuka dengan lagu favoritnya admin, Choo Choo Train dari Zoo. Yang menantang lagu ini adalah Ito Riria bersama Super Yanchanzu. Tidak hanya Ririan, juga Umezawa Minami tampil disini dan bernyanyi solo. Bintang tamunya adalah Oginome Yoko, sang pelopor artis yang bisa menari juga menyanyi sejak debutnya tahun 1984.",
	"20" : "Di episode terakhir ini dibuat spesial, karena lagu-lagunya juga diawali dengan suasana menyenangkan dari Morning Musume, lalu di pertengahan lagunya sedih dari Remioromen, dan penutupnya lagunya menyenangkan kembali dari Sakamoto Kyu, sesuai tema yang diusung dalam episode ini."
};


// =======================
// NAMA ACARA
// =======================


const nameShow = {};
for (let i = 1; i <= 9999; i++) {
  nameShow[i.toString().padStart(2, '0')] = "乃木坂スター誕生！2";
}
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
	"01" : "| Episode 1 (Pink Lady SP)",
	"02" : "| Episode 2 (TK Song SP)",
	"03" : "| Episode 3 (Song from TV SP)",
	"04" : "| Episode 4 (Haloween SP)",
	"05" : "| Episode 5 (Love Song SP)",
	"06" : "| Episode 6 (The Checkers SP)",
	"07" : "| Episode 7 (Good Couple Day SP)",
	"08" : "| Episode 8 (The Singer Who Shocked the Showa Era SP)",
	"09" : "| Episode 9",
	"10" : "| Episode 10 (Enka, Heart of Japan SP)",
	"11" : "| Episode 11 (Christmas SP)",
	"12" : "| Episode 12 (Kyapikyapi Idol SP)",
	"13" : "| Episode 13 (Folk Song SP)",
	"14" : "| Episode 14 (Fujimori Shingo Selection)",
	"15" : "| Episode 15 (Valentine Day SP)",
	"16" : "| Episode 16",
	"17" : "| Episode 17",
	"18" : "| Episode 18",
	"19" : "| Episode 19",
	"20" : "| Episode 20 [END]"
}
console.log(descEpisode);

// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate = {
	"01" : "12 Oktober 2021",
	"02" : "19 Oktober 2021",
	"03" : "26 Oktober 2021",
	"04" : "02 November 2021",
	"05" : "09 November 2021",
	"06" : "16 November 2021",
	"07" : "23 November 2021",
	"08" : "30 November 2021",
	"09" : "07 Desember 2021",
	"10" : "14 Desember 2021",
	"11" : "21 Desember 2021",
	"12" : "11 Januari 2022",
	"13" : "17 Januari 2022",
	"14" : "25 Januari 2022",
	"15" : "01 Februari 2022",
	"16" : "08 Februari 2022",
	"17" : "15 Februari 2022",
	"18" : "22 Februari 2022",
	"19" : "01 Maret 2022",
	"20" : "08 Maret 2022",
};
console.log(descOnAirDate);

// =======================
// DESKRIPSI LAGU 1 (Khusus Star Tanjou series)
// =======================

const descSong1 = {
	"01" : "ピンク・レディー 「S・O・S」",
	"02" : "TRF 「CRAZY GONNA CRAZY」",
	"03" : "イモ欽トリオ 「ハイスクールララバイ」",
	"04" : "小泉今日子 「学園天国」",
	"05" : "PUFFY 「愛のしるし」",
	"06" : "チェッカーズ 「ギザギザハートの子守唄」",
	"07" : "星野源 「恋」",
	"08" : "山本リンダ 「こまっちゃうナ」",
	"09" : "いきものがかり 「じょいふる」",
	"10" : "小林幸子 「おもいで酒」",
	"11" : "「ジングルベル」",
	"12" : "松浦亜弥 「♡桃色片想い♡」",
	"13" : "南こうせつとかぐや姫 「神田川」",
	"14" : "Mr.Children 「innocent world」",
	"15" : "SPEED 「White Love」",
	"16" : "安室奈美恵 「Chase the Chance」",
	"17" : "広末涼子 「大スキ!」",
	"18" : "松浦亜弥 「LOVE涙色」",
	"19" : "ZOO 「Choo Choo TRAIN」",
	"20" : "モーニング娘。 「ザ☆ピ〜ス!」"
};
console.log(descSong1);


// =======================
// DESKRIPSI LAGU 2 (Khusus Star Tanjou series)
// =======================

const descSong2 = {
	"01" : "ピンク・レディー 「サウスポー」",
	"02" : "H Jungle with t 「WOW WAR TONIGHT 〜時には起こせよムーヴメント」",
	"03" : "羞恥心 「羞恥心」",
	"04" : "JITTERIN'JINN 「プレゼント」",
	"05" : "篠原涼子 「恋しさと せつなさと 心強さと」",
	"06" : "チェッカーズ 「神様ヘルプ!」",
	"07" : "森高千里 「私がオバさんになっても」",
	"08" : "ビューティ・ペア 「かけめぐる青春」",
	"09" : "REBECCA 「フレンズ」",
	"10" : "島倉千代子 「人生いろいろ」",
	"11" : "「赤鼻のトナカイ」",
	"12" : "河合奈保子 「スマイル・フォー・ミー」",
	"13" : "ベッツイ&クリス 「白い色は恋人の色」",
	"14" : "GLAY 「HOWEVER」",
	"15" : "小柳ルミ子 「瀬戸の花嫁」",
	"16" : "GReeeeN 「キセキ」",
	"17" : "麻丘めぐみ 「わたしの彼は左きき」",
	"18" : "MY LITTLE LOVER 「Hello, Again 〜昔からある場所〜」",
	"19" : "Crystal Kay 「恋におちたら」",
	"20" : "レミオロメン 「粉雪」"
};
console.log(descSong2);


// =======================
// DESKRIPSI LAGU 3 (Khusus Star Tanjou series)
// =======================

const descSong3 = {
	"01" : "ピンク・レディー 「UFO」",
	"02" : "華原朋美 「I'm proud」",
	"03" : "ブラックビスケッツ 「Timing」",
	"04" : "DJ OZMA 「アゲ♂アゲ♂EVERY☆騎士」",
	"05" : "松崎しげる 「愛のメモリー」",
	"06" : "チェッカーズ 「ジュリアに傷心」",
	"07" : "松田聖子 「大切なあなた」",
	"08" : "アグネス・チャン 「ひなげしの花」",
	"09" : "広瀬香美 「promise」",
	"10" : "石川さゆり 「津軽海峡・冬景色」",
	"11" : "山下達郎 「クリスマス・イブ」",
	"12" : "中山美穂 「ツイてるねノッてるね」",
	"13" : "チューリップ 「心の旅」",
	"14" : "YUI 「CHE.R.RY」",
	"15" : "桑田佳祐 「白い恋人達」",
	"16" : "アグネス・チャン 「草原の輝き」",
	"17" : "国生さゆり with おニャン子クラブ 「バレンタイン・キッス」",
	"18" : "ジュディ・オング 「魅せられて」",
	"19" : "沢田研二 「危険なふたり」",
	"20" : "レミオロメン 「3月9日」"
};
console.log(descSong3);


// =======================
// DESKRIPSI LAGU 4 (Khusus Star Tanjou series)
// =======================

const descSong4 = {
	"01" : "ピンク・レディー 「渚のシンドバッド」",
	"02" : "TK presents こねっと 「YOU ARE THE ONE」",
	"03" : "松本伊代 「センチメンタル・ジャーニー」",
	"04" : "森口博子 「ホイッスル」",
	"05" : "坂本九 「見上げてごらん夜の星を」",
	"06" : "チェッカーズ 「夜明けのブレス」",
	"07" : "永井真理子 「ZUTTO」",
	"08" : "山本リンダ 「どうにもとまらない」",
	"09" : "小野正利 「You're the Only…」",
	"10" : "美空ひばり 「お祭りマンボ」",
	"11" : "松任谷由実 「恋人がサンタクロース」",
	"12" : "おニャン子クラブ 「お先に失礼」",
	"13" : "ジョン・デンバー 「Take Me Home，Country Roads」",
	"14" : "RADIO FISH 「PERFECT HUMAN」",
	"15" : "井上陽水 「夢の中へ」",
	"16" : "柏原よしえ 「ハロー・グッバイ」",
	"17" : "おニャン子クラブ 「真赤な自転車」",
	"18" : "久保田早紀 「異邦人」",
	"19" : "荻野目洋子 「ダンシング・ヒーロー」",
	"20" : "坂本九 「明日があるさ」"
};
console.log(descSong4);


// =======================
// DESKRIPSI LAGU 5 (Khusus Star Tanjou series)
// =======================

const descSong5 = {
	"01" : "",
	"02" : "",
	"03" : "",
	"04" : "",
	"05" : "",
	"06" : "",
	"07" : "",
	"08" : "山本リンダ 「狙いうち」",
	"09" : "",
	"10" : "",
	"11" : "森高千里 「ジン ジン ジングルベル」",
	"12" : "",
	"13" : "",
	"14" : "",
	"15" : "",
	"16" : "",
	"17" : "",
	"18" : "",
	"19" : "",
	"20" : ""
};
console.log(descSong5);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
	"01" : "乃木坂46 4期生、樋口日奈、未唯mie",
	"02" : "乃木坂46 4期生、久保史緒里、DJ KOO",
	"03" : "乃木坂46 4期生、秋元真夏、和田まあや、中村麗乃、松本伊代",
	"04" : "乃木坂46 4期生、梅澤美波、阪口珠美、伊藤理々杏、吉田綾乃クリスティー、佐藤楓、森口博子",
	"05" : "乃木坂46 4期生、与田祐希、松崎しげる",
	"06" : "乃木坂46 4期生、新内眞衣、鶴久政治",
	"07" : "乃木坂46 4期生、与田祐希、永井真理子",
	"08" : "乃木坂46 4期生、樋口日奈、山本リンダ",
	"09" : "乃木坂46 4期生、北野日奈子、小野正利",
	"10" : "乃木坂46 4期生、久保史緒里、小林幸子",
	"11" : "乃木坂46 4期生、山下美月",
	"12" : "乃木坂46 4期生、阪口珠美、伊藤理々杏、吉田綾乃クリスティー、佐藤楓、渡辺美奈代",
	"13" : "乃木坂46 4期生、向井葉月、南こうせつ",
	"14" : "乃木坂46 4期生、秋元真夏、藤森慎吾",
	"15" : "乃木坂46 4期生、伊藤理々杏、小柳ルミ子",
	"16" : "乃木坂46 4期生、北野日奈子、鈴木絢音、アグネス チャン",
	"17" : "乃木坂46 4期生、中村麗乃、国生さゆり",
	"18" : "乃木坂46 4期生、久保史緒里、ジュディ・オング",
	"19" : "乃木坂46 4期生、梅澤美波、伊藤理々杏、荻野目洋子",
	"20" : "乃木坂46 4期生、藤巻亮太"
};
console.log(memberParticipate);

// =======================
// IMAGE THUMBNAIL main
// =======================

const imageThumbBig = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbBig[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/nogistartanjou-2-${paddedNumber}.jpg`;
}
console.log(imageThumbBig);

// =======================
// IMAGE THUMBNAIL A
// =======================

const imageThumbA = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbA[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/nogistartanjou-2-${paddedNumber}a.jpg`;
}
console.log(imageThumbA);

// =======================
// IMAGE THUMBNAIL B
// =======================

const imageThumbB = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbB[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/nogistartanjou-2-${paddedNumber}b.jpg`;
}
console.log(imageThumbB);

// =======================
// IMAGE THUMBNAIL C
// =======================

const imageThumbC = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbC[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/nogistartanjou-2-${paddedNumber}c.jpg`;
}
console.log(imageThumbC);

// =======================
// IMAGE THUMBNAIL D
// =======================

const imageThumbD = {};
for (let i = 1; i <= 9999; i++) {
  const paddedNumber = i.toString().padStart(2, '0');
  imageThumbD[paddedNumber] = `https://ik.imagekit.io/mLsKqNSuB/post/startanjou/nogistartanjou-2-${paddedNumber}d.jpg`;
}
console.log(imageThumbD);

// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
	"01" : "https://lokerwfh.net/iiaw3nt",
	"02" : "https://lokerwfh.net/KntWSjC",
	"03" : "https://lokerwfh.net/kOIviR",
	"04" : "https://lokerwfh.net/8amnz",
	"05" : "https://lokerwfh.net/OEJt",
	"06" : "https://lokerwfh.net/oef6p5",
	"07" : "https://lokerwfh.net/IUPekvH",
	"08" : "https://lokerwfh.net/93VhTvtO",
	"09" : "https://lokerwfh.net/JPbmkDh0",
	"10" : "https://lokerwfh.net/seesT",
	"11" : "https://lokerwfh.net/LkJTU",
	"12" : "https://lokerwfh.net/DEwJnMV",
	"13" : "https://lokerwfh.net/tZQj",
	"14" : "https://lokerwfh.net/ZTi1rf",
	"15" : "https://lokerwfh.net/6japD2Sy",
	"16" : "https://lokerwfh.net/RLof",
	"17" : "https://lokerwfh.net/1Y3K1d",
	"18" : "https://lokerwfh.net/CtjwXg3",
	"19" : "https://lokerwfh.net/vNgo",
	"20" : "https://lokerwfh.net/flHFR"
};
console.log(linkHardsub);



// =======================
// LINK SOFTSUB
// =======================

const linkSoftsub = {
	"01" : "https://lokerwfh.net/XCNi5X9",
	"02" : "https://lokerwfh.net/zT92cIOs",
	"03" : "https://lokerwfh.net/5N0UxZcg",
	"04" : "https://lokerwfh.net/6AScrFcZ",
	"05" : "https://lokerwfh.net/sDISiV",
	"06" : "https://lokerwfh.net/7LBgexEu",
	"07" : "https://lokerwfh.net/jfp9u",
	"08" : "https://lokerwfh.net/V0DOpzR",
	"09" : "https://lokerwfh.net/YDZRP",
	"10" : "https://lokerwfh.net/xmXz",
	"11" : "https://lokerwfh.net/AhCxpU",
	"12" : "https://lokerwfh.net/3OzaJbLm",
	"13" : "https://lokerwfh.net/mgTdzB1",
	"14" : "https://lokerwfh.net/BKOyYlil",
	"15" : "https://lokerwfh.net/9J3i",
	"16" : "https://lokerwfh.net/mkF7YZ",
	"17" : "https://lokerwfh.net/DmNa9E1P",
	"18" : "https://lokerwfh.net/B1tM",
	"19" : "https://lokerwfh.net/2i4a1yb",
	"20" : "https://lokerwfh.net/yHrP20h"
};
console.log(linkSoftsub);

// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
  linkTrakteerA[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-season-2-softsub-hardsub-yDPYT";
}
console.log(linkTrakteerA);

// hulu ver
const linkTrakteerA = {
	"01" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-season-2-hulu-ep1-H7Ac5",
	"02" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-season-2-hulu-ep2-ZvNzO",
	"03" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-season-2-hulu-ep3-pNgVT",
	"04" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-season-2-hulu-ep4-reQzk",
	"05" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-season-2-hulu-ep5-5JwqA",
	"06" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-season-2-hulu-ep6-10-uGb5H",
	"07" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-season-2-hulu-ep6-10-uGb5H",
	"08" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-season-2-hulu-ep6-10-uGb5H",
	"09" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-season-2-hulu-ep6-10-uGb5H",
	"10" : "https://trakteer.id/moefangsubs/showcase/nogizaka-star-tanjou-season-2-hulu-ep6-10-uGb5H",
};
console.log(linkTrakteerA);

// =======================
// LINK FONT
// =======================

const linkFont = {};
for (let i = 1; i <= 9999; i++) {
  linkFont[i.toString().padStart(2, '0')] = "https://drive.google.com/uc?export=download&id=1lsRJ9KQvxy4NwbuxCAC-hHK_fUt7pOnV";
}
console.log(linkFont);

// =======================
// LINK RAW
// =======================

const linkRAW = {};
for (let i = 1; i <= 9999; i++) {
  linkRAW[i.toString().padStart(2, '0')] = "https://www.akari46.cloud/search/label/Nogizaka%20Star%20Tanjou%20S2";
}
console.log(linkRAW);

// =======================
// BAHASA SUB
// =======================

const subLanguage = {};
for (let i = 1; i <= 9999; i++) {
  subLanguage[i.toString().padStart(2, '0')] = "Bahasa Indonesia";
}
console.log(subLanguage);

