// Data JSON
const members = {
	"ito_riria":{
		"name": "伊藤理々杏",
		"gen": "3期生",
		"talk": "ririatalk",
		"insta": "ririagram",
		"blog": "ririablog"
	},
	"iwamoto_renka":{
		"name": "岩本蓮加",
		"gen": "3期生",
		"talk": "今日のれんか",
		"insta": "れんかぐらむ",
		"blog": "renkablog"
	},
	"umezawa_minami":{
		"name": "梅澤美波",
		"gen": "3期生",
		"talk": "うめとーく",
		"insta": ["umegram","うめぐらむ"],
		"blog": "umeblog"
	},
	"kubo_shiori":{
		"name": "久保史緒里",
		"gen": "3期生",
		"talk": "shioritalk",
		"insta": "shiorigram",
		"blog": "shioriblog"
	},
	"sato_kaede":{
		"name": "佐藤楓",
		"gen": "3期生",
		"talk": "kaedetalk",
		"insta": "kaedegram",
		"blog": "kaedeblog"
	},
	"nakamura_reno":{
		"name": "中村麗乃",
		"gen": "3期生",
		"talk": "renotalk",
		"insta": ["renogram","れのぐらむ"],
		"blog": "renoblog"
	},
	"mukai_hazuki":{
		"name": "向井葉月",
		"gen": "3期生",
		"talk": "はづとーく",
		"insta": ["hazukigram","はづぐらむ"],
		"blog": "はづぶろぐ"
	},
	"yoshida_ayano_christie":{
		"name": "吉田綾乃ｸﾘｽﾃｨ―",
		"gen": "3期生",
		"talk": "あやてぃーめっせーじ",
		"insta": "あやてぃーぐらむ",
		"blog": "あやてぃーぶろぐ"
	},
	"yoda_yuuki":{
		"name": "与田祐希",
		"gen": "3期生",
		"talk": "yodatalk",
		"insta": "yodagram",
		"blog": "yodablog"
	},
	"endo_sakura":{
		"name": "遠藤さくら",
		"gen": "4期生",
		"talk": "sakutalk",
		"insta": "",
		"blog": "sakublog"
	},
	"kaki_haruka":{
		"name": "賀喜遥香",
		"gen": "4期生",
		"talk": "kakitalk",
		"insta": "",
		"blog": "kakiblog"
	},
	"kanagawa_saya":{
		"name": "金川紗耶",
		"gen": "4期生",
		"talk": "sayatalk",
		"insta": "sayagram",
		"blog": "sayablog"
	},
	"shibata_yuna":{
		"name": "柴田柚菜",
		"gen": "4期生",
		"talk": "yunatalk",
		"insta": "",
		"blog": "yunablog"
	},
	"tamura_mayu":{
		"name": "田村真佑",
		"gen": "4期生",
		"talk": "mayutalk",
		"insta": "mayugram",
		"blog": "mayublog"
	},
	"tsutsui_ayame":{
		"name": "筒井あやめ",
		"gen": "4期生",
		"talk": ["ayametalk", "あやめとーく"],
		"insta": "",
		"blog": "ayameblog"
	},
	"yakubo_mio":{
		"name": "矢久保美緒",
		"gen": "4期生",
		"talk": "miotalk",
		"insta": "miogram",
		"blog": "mioblog"
	},
	"kuromi_haruka":{
		"name": "黒見明香",
		"gen": "4期生",
		"talk": "mail963",
		"insta": ["963gram","kuromigram","くろみんぐらむ"],
		"blog": "blog963"
	},
	"sato_rika":{
		"name": "佐藤璃果",
		"gen": "4期生",
		"talk": "licatalk",
		"insta": ["licagram","licamera"],
		"blog": "licablog"
	},
	"hayashi_runa":{
		"name": "林瑠奈",
		"gen": "4期生",
		"talk": "hayashimail",
		"insta": "",
		"blog": "はやしぶろぐ"
	},
	"matsuo_miyu":{
		"name": "松尾美佑",
		"gen": "4期生",
		"talk": "miyutalk",
		"insta": "",
		"blog": "miyublog"
	},
	"yumiki_nao":{
		"name": "弓木奈於",
		"gen": "4期生",
		"talk": "yumikitalk",
		"insta": "",
		"blog": "yumikiblog"
	},
	"ioki_mao":{
		"name": "五百城茉央",
		"gen": "5期生",
		"talk": "きっきのめーる",
		"insta": "",
		"blog": "きっきのにっき"
	},
	"ikeda_teresa":{
		"name": "池田瑛紗",
		"gen": "5期生",
		"talk": "terepantalk",
		"insta": "",
		"blog": ["てれぱんぶろぐ","てれぶろ"]
	},
	"ichinose_miku":{
		"name": "一ノ瀬美空",
		"gen": "5期生",
		"talk": "みーきゅんとーく",
		"insta": "",
		"blog": "みーきゅんぶろぐ"
	},
	"inoue_nagi":{
		"name": "井上和",
		"gen": "5期生",
		"talk": "nagitalk",
		"insta": "",
		"blog": "nagiblog"
	},
	"okamoto_hina":{
		"name": "岡本姫奈",
		"gen": "5期生",
		"talk": "hinadanitalk",
		"insta": "",
		"blog": "hinadaniblog"
	},
	"ogawa_aya":{
		"name": "小川彩",
		"gen": "5期生",
		"talk": ["あーやとーく","ayatalk"],
		"insta": "",
		"blog": "あーやぶろぐ"
	},
	"okuda_iroha":{
		"name": "奥田いろは",
		"gen": "5期生",
		"talk": ["イロハとおはなし","irohatalk"],
		"insta": "",
		"blog": "イロハのキモチ"
	},
	"kawasaki_sakura":{
		"name": "川崎桜",
		"gen": "5期生",
		"talk": "sakutantalk",
		"insta": "",
		"blog": "sakutanblog"
	},
	"sugawara_satsuki":{
		"name": "菅原咲月",
		"gen": "5期生",
		"talk": "さつきとーく",
		"insta": "",
		"blog": "さつきぶろぐ"
	},
	"tomisato_nao":{
		"name": "冨里奈央",
		"gen": "5期生",
		"talk": "なおもちトーク",
		"insta": "",
		"blog": "なおもちブログ"
	},
	"nakanishi_aruno":{
		"name": "中西アルノ",
		"gen": "5期生",
		"talk": "arutalk",
		"insta": "",
		"blog": ["arunoblog","arublog"]
	}
};

const nameMember = {
	"伊藤理々杏": "ito_riria",
	"岩本蓮加": "iwamoto_renka",
	"梅澤美波": "umezawa_minami",
	"久保史緒里": "kubo_shiori",
	"佐藤楓": "sato_kaede",
	"中村麗乃": "nakamura_reno",
	"向井葉月": "mukai_hazuki",
	"吉田綾乃ｸﾘｽﾃｨｰ": "yoshida_ayano_christie",
	"与田祐希": "yoda_yuuki",
	
	"遠藤さくら": "endo_sakura",
	"賀喜遥香": "kaki_haruka",
	"金川紗耶": "kanagawa_saya",
	"黒見明香": "kuromi_haruka",
	"佐藤璃果": "sato_rika",
	"柴田柚菜": "shibata_yuna",
	"田村真佑": "tamura_mayu",
	"筒井あやめ": "tsutsui_ayame",
	"林瑠奈": "hayashi_runa",
	"松尾美佑": "matsuo_miyu",
	"矢久保美緒": "yakubo_mio",
	
	"弓木奈於": "yumiki_nao",
	"五百城茉央": "ioki_mao",
	"池田瑛紗": "ikeda_teresa",
	"一ノ瀬美空": "ichinose_miku",
	"井上和": "inoue_nagi",
	"岡本姫奈": "okamoto_hina",
	"小川彩": "ogawa_aya",
	"奥田いろは": "okuda_iroha",
	"川﨑桜": "kawasaki_sakura",
	"菅原咲月": "sugawara_satsuki",
	"冨里奈央": "tomisato_nao",
	"中西アルノ": "nakanishi_aruno"
};

const imageBaseURL = "https://ik.imagekit.io/moearchive/web/memberprofile/s037/";

// Fungsi untuk membuat elemen HTML untuk setiap anggota
function createMemberElement(key, data) {
    const memberDiv = document.createElement('div');
    memberDiv.className = 'member';

    // Elemen gambar dan nama
    const figure = document.createElement('figure');
    figure.className = 'pict';
    const img = document.createElement('img');
    img.src = `${imageBaseURL}${key}.png`;
    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = data.name;
    figure.appendChild(img);
    figure.appendChild(nameParagraph);

    // Elemen data
    const dataDiv = document.createElement('div');
    dataDiv.className = 'data';

    // Fungsi untuk menangani elemen dengan banyak nilai
    function appendDataElement(className, values) {
        if (values) {
            const span = document.createElement('span');
            span.className = className;

            // Jika nilai adalah array, tambahkan semua elemen
            if (Array.isArray(values)) {
                values.forEach(value => {
                    const paragraph = document.createElement('p');
                    paragraph.textContent = `#${value}`;
                    span.appendChild(paragraph);
                });
            } else {
                const paragraph = document.createElement('p');
                paragraph.textContent = `#${values}`;
                span.appendChild(paragraph);
            }

            dataDiv.appendChild(span);
        }
    }

    // Menambahkan elemen talk, insta, dan blog
    appendDataElement('talk', data.talk);
    appendDataElement('insta', data.insta);
    appendDataElement('blog', data.blog);

    // Gabungkan semuanya
    memberDiv.appendChild(figure);
    memberDiv.appendChild(dataDiv);

    return memberDiv;
}

// Fungsi utama untuk mengisi kontainer dengan anggota
function populateHashtagContainer() {
    const container = document.querySelector('.hashtag-container');

    Object.entries(members).forEach(([key, data]) => {
        const memberElement = createMemberElement(key, data);
        container.appendChild(memberElement);
    });
}

// Memanggil fungsi utama setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', populateHashtagContainer);



//---------------------------
// Fungsi untuk mendeteksi apakah teks mengandung huruf Jepang atau romaji
//---------------------------

function detectTextType(text) {
    const japaneseRegex = /[\u3000-\u303F\u3040-\u30FF\u31F0-\u31FF\uFF00-\uFFEF\u4E00-\u9FAF\u3400-\u4DBF]/; // Karakter Jepang
    if (japaneseRegex.test(text)) {
        return 'japanese';
    }
    return 'romaji';
}

// Fungsi untuk memaksa font berdasarkan jenis karakter
function enforceFonts() {
    const elements = document.querySelectorAll('.hashtag-container p'); // Ambil semua elemen <p> di dalam .hashtag-container

    elements.forEach(element => {
        const textType = detectTextType(element.textContent);
        if (textType === 'japanese') {
            element.classList.add('font-japanese');
        } else {
            element.classList.add('font-romaji');
        }
    });
}

// Jalankan setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', enforceFonts);
