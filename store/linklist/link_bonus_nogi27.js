
// =======================
// NAMA ACARA
// =======================


const nameShow = {
"01" : "ワープ!!!",
"02" : "梅色",
"03" : "言えない。",
"04" : "ももことまめぞうと",
"05" : "エリート社員 筒井あやめ",
"06" : "兄、不在。",
"07" : "ABC予想解説してみた",
"08" : "星野みなみのとにかくかわいいかるた",
"09" : "わたしをさがして",
"10" : "血液型",
"11" : "仁義なきいくちゃん?おしおきの巻?",
"12" : "楓が鬼",
"13" : "リカの法則",
"14" : "柴田さん間違ってますよ。",
"15" : "ちゃんとした朝ごはん",
"16" : "Record of the Dead",
"17" : "#ちまデート",
"18" : "山崎怜奈のヘルシーチャレンジ",
"19" : "アンガーマネジメント",
"20" : "ヨダユキ",
"21" : "Spring Train",
"22" : "BGMR",
"23" : "マチアワセ",
"24" : "空飛ぶ少女",
"25" : "ワタシがアイドルでいられる時間",
"26" : "ラブ・ストーリーは凸電に",
"27" : "テイク・ア・タクシー",
"28" : "ちいさなことをひとつ",
"29" : "わたしのラクガキおじさん",
"30" : "このタイミングで必殺技さゆりんごパンチを完成させたいねん",
"31" : "ババベラビギナー",
"32" : "念入り",
"33" : "A DAY IN THE LIFE OF MANATSU",
"34" : "東京の女の子。",
"35" : "れんたん金魚",
"36" : "ランナーズ ハイ",
"37" : "春、ふたり",
"38" : "脳内会議",
"39" : "さいごの晩餐",
"40" : "大好きすぎて、聖来ちゃんになっちゃった!",
"41" : "月が綺麗ですね",
"42" : "わがまま",
};
console.log(nameShow);


// =======================
// EPISODE
// =======================

const descEpisode = {
"01" : "| Bonus Type A - PV Ito Riria",
"02" : "| Bonus Type A - PV Umezawa Minami",
"03" : "| Bonus Type A - PV Endo Sakura",
"04" : "| Bonus Type A - PV Ozono Momoko",
"05" : "| Bonus Type A - PV Tsutsui Ayame",
"06" : "| Bonus Type A - PV Nakamura Reno",
"07" : "| Bonus Type A - PV Hayashi Runa",
"08" : "| Bonus Type A - PV Hoshino Minami",
"09" : "| Bonus Type A - PV Yoshida Ayano Christie",
"10" : "| Bonus Type A - PV Wada Maaya",
"11" : "| Bonus Type B - PV Ikuta Erika",
"12" : "| Bonus Type B - PV Sato Kaede",
"13" : "| Bonus Type B - PV Sato Rika",
"14" : "| Bonus Type B - PV Shibata Yuna",
"15" : "| Bonus Type B - PV Takayama Kazumi",
"16" : "| Bonus Type B - PV Tamura Mayu",
"17" : "| Bonus Type B - PV Higuchi Hina",
"18" : "| Bonus Type B - PV Yamazaki Rena",
"19" : "| Bonus Type B - PV Yumiki Nao",
"20" : "| Bonus Type B - PV Yoda Yuuki",
"21" : "| Bonus Type B - PV Watanabe Miria",
"22" : "| Bonus Type C - PV Kaki Haruka",
"23" : "| Bonus Type C - PV Kakehashi Sayaka",
"24" : "| Bonus Type C - PV Kitagawa Yuri",
"25" : "| Bonus Type C - PV Kitano Hinako",
"26" : "| Bonus Type C - PV Saito Asuka",
"27" : "| Bonus Type C - PV Shinuchi Mai",
"28" : "| Bonus Type C - PV Suzuki Ayane",
"29" : "| Bonus Type C - PV Seimiya Rei",
"30" : "| Bonus Type C - PV Matsumura Sayuri",
"31" : "| Bonus Type C - PV Mukai Hazuki",
"32" : "| Bonus Type C - PV Yakubo Mio",
"33" : "| Bonus Type D - PV Akimoto Manatsu",
"34" : "| Bonus Type D - PV Ito Junna",
"35" : "| Bonus Type D - PV Iwamoto Renka",
"36" : "| Bonus Type D - PV Kanagawa Saya",
"37" : "| Bonus Type D - PV Kubo Shiori",
"38" : "| Bonus Type D - PV Kuromi Haruka",
"39" : "| Bonus Type D - PV Terada Ranze",
"40" : "| Bonus Type D - PV Hayakawa Seira",
"41" : "| Bonus Type D - PV Matsuo Miyu",
"42" : "| Bonus Type D - PV Yamashita Mizuki",
};
console.log(descEpisode);



// =======================
// DESKRIPSI AIRING
// =======================

const descOnAirDate= {};
for (let i = 1; i <= 9999; i++) {
descOnAirDate[i.toString().padStart(2, '0')] = "9 Juni 2021";
}
console.log(descOnAirDate);


// =======================
// PARTISIPASI ORANG & TAMU
// =======================

const memberParticipate = {
"01" : "伊藤理々杏",
"02" : "梅澤美波",
"03" : "遠藤さくら",
"04" : "大園桃子",
"05" : "筒井あやめ",
"06" : "中村麗乃",
"07" : "林瑠奈",
"08" : "星野みなみ",
"09" : "吉田綾乃クリスティー",
"10" : "和田まあや",
"11" : "生田絵梨花",
"12" : "佐藤楓",
"13" : "佐藤璃果",
"14" : "柴田柚菜",
"15" : "高山一実",
"16" : "田村真佑",
"17" : "樋口日奈",
"18" : "山崎怜奈",
"19" : "弓木奈於",
"20" : "与田祐希",
"21" : "渡辺みり愛",
"22" : "賀喜遥香",
"23" : "掛橋沙耶香",
"24" : "北川悠理",
"25" : "北野日奈子",
"26" : "齋藤飛鳥",
"27" : "新内眞衣",
"28" : "鈴木絢音",
"29" : "清宮レイ",
"30" : "松村沙友理",
"31" : "向井葉月",
"32" : "矢久保美緒",
"33" : "秋元真夏",
"34" : "伊藤純奈",
"35" : "岩本蓮加",
"36" : "金川紗耶",
"37" : "久保史緒里",
"38" : "黒見明香",
"39" : "寺田蘭世",
"40" : "早川聖来",
"41" : "松尾美佑",
"42" : "山下美月",
};
console.log(memberParticipate);


// =======================
// IMAGE THUMBNAIL main
// =======================


const imageThumbBig = {
"01" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-a01.jpg",
"02" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-a02.jpg",
"03" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-a03.jpg",
"04" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-a04.jpg",
"05" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-a05.jpg",
"06" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-a06.jpg",
"07" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-a07.jpg",
"08" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-a08.jpg",
"09" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-a09.jpg",
"10" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-a10.jpg",
"11" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-b01.jpg",
"12" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-b02.jpg",
"13" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-b03.jpg",
"14" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-b04.jpg",
"15" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-b05.jpg",
"16" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-b06.jpg",
"17" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-b07.jpg",
"18" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-b08.jpg",
"19" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-b09.jpg",
"20" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-b10.jpg",
"21" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-b11.jpg",
"22" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-c01.jpg",
"23" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-c02.jpg",
"24" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-c03.jpg",
"25" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-c04.jpg",
"26" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-c05.jpg",
"27" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-c06.jpg",
"28" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-c07.jpg",
"29" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-c08.jpg",
"30" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-c09.jpg",
"31" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-c10.jpg",
"32" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-c11.jpg",
"33" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-d01.jpg",
"34" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-d02.jpg",
"35" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-d03.jpg",
"36" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-d04.jpg",
"37" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-d05.jpg",
"38" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-d06.jpg",
"39" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-d07.jpg",
"40" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-d08.jpg",
"41" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-d09.jpg",
"42" : "https://ik.imagekit.io/mLsKqNSuB/post/bonus27/27-pv-d10.jpg",
};
console.log(imageThumbBig);


// =======================
// LINK HARDSUB
// =======================

const linkHardsub = {
"01" : "https://lokerwfh.net/PXR1csA",
"02" : "https://lokerwfh.net/9MZh",
"03" : "https://lokerwfh.net/DGApfOrC",
"04" : "https://lokerwfh.net/Vkvb",
"05" : "https://lokerwfh.net/EMayZBm",
"06" : "https://lokerwfh.net/f1XK4",
"07" : "https://lokerwfh.net/3aBZOqZ",
"08" : "https://lokerwfh.net/FpqM8TX",
"09" : "https://lokerwfh.net/LRW9VUl",
"10" : "https://lokerwfh.net/hTPhc",
"11" : "https://lokerwfh.net/EIUxFWFv",
"12" : "https://lokerwfh.net/45uwFDYQ",
"13" : "https://lokerwfh.net/CUWc0",
"14" : "https://lokerwfh.net/yJ8TOw",
"15" : "https://lokerwfh.net/ZQeE",
"16" : "https://lokerwfh.net/6w2TgFHz",
"17" : "https://lokerwfh.net/olkNPSu",
"18" : "https://lokerwfh.net/pYFX",
"19" : "https://lokerwfh.net/wPALM",
"20" : "https://lokerwfh.net/Y6bq",
"21" : "https://lokerwfh.net/wQajrY1",
"22" : "https://lokerwfh.net/hNE3",
"23" : "https://lokerwfh.net/af3iTc",
"24" : "https://lokerwfh.net/WGgp",
"25" : "https://lokerwfh.net/WXcRPgW",
"26" : "https://lokerwfh.net/trBAZF",
"27" : "https://lokerwfh.net/9ToytEd",
"28" : "https://lokerwfh.net/y7Pm",
"29" : "https://lokerwfh.net/0G7EzNS",
"30" : "https://lokerwfh.net/MUGgsQqN",
"31" : "https://lokerwfh.net/TYV5J",
"32" : "https://lokerwfh.net/SRtPb",
"33" : "https://lokerwfh.net/6zbKK",
"34" : "https://lokerwfh.net/88Zky5",
"35" : "https://lokerwfh.net/Kxxs",
"36" : "https://lokerwfh.net/S87woh75",
"37" : "https://lokerwfh.net/PsNaamyQ",
"38" : "https://lokerwfh.net/5dGg1",
"39" : "https://lokerwfh.net/YTem",
"40" : "https://lokerwfh.net/UVFWkP",
"41" : "https://lokerwfh.net/tAtKr2",
"42" : "https://lokerwfh.net/UqOef",
};
console.log(linkHardsub);


// =======================
// LINK TRAKTEER
// =======================


const linkTrakteer = {};
for (let i = 1; i <= 9999; i++) {
linkTrakteer[i.toString().padStart(2, '0')] = "https://trakteer.id/moefangsubs/showcase/softsub-batch-nogizaka46-27th-individual-pv-T5TF7";
}
console.log(linkTrakteer);


// =======================
// FILE PASSWORD
// =======================

const filePassword = {};
for (let i = 1; i <= 9999; i++) {
filePassword[i.toString().padStart(2, '0')] = "27GomennePVNogizaka";
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