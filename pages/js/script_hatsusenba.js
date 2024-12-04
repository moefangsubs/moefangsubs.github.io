document.addEventListener('DOMContentLoaded', () => {
  const data = {
	nameMember: {
		"山本穂乃香": "yamamoto_honoka",
		"吉本彩華": "yoshimoto_ayaka",
		"岩瀬佑美子": "iwase_yumiko",
		"安藤美雲": "ando_mikumo",
		"柏幸奈": "kashiwa_yukina",
		"宮澤成良": "miyazawa_seira",
		"市來玲奈": "ichiki_rena",
		"伊藤寧々": "ito_nene",
		"大和里菜": "yamato_rina",
		"畠中清羅": "hatanaka_seira",
		"永島聖羅": "nagashima_seira",
		"深川麻衣": "fukagawa_mai",
		"橋本奈々未": "hashimoto_nanami",
		"伊藤万理華": "ito_marika",
		"中元日芽香": "nakamoto_himeka",
		"川村真洋": "kawamura_mahiro",
		"生駒里奈": "ikoma_rina",
		"斎藤ちはる": "saito_chiharu",
		"若月佑美": "wakatsuki_yumi",
		"能條愛未": "noujo_ami",
		"川後陽菜": "kawago_hina",
		"西野七瀬": "nishino_nanase",
		"衛藤美彩": "eto_misa",
		"斉藤優里": "saito_yuuri",
		"桜井玲香": "sakurai_reika",
		"井上小百合": "inoue_sayuri",
		"中田花奈": "nakada_kana",
		"白石麻衣": "shiraishi_mai",
		"松村沙友理": "matsumura_sayuri",
		"高山一実": "takayama_kazumi",
		"生田絵梨花": "ikuta_erika",
		"星野みなみ": "hoshino_minami",
		"樋口日奈": "higuchi_hina",
		"和田まあや": "wada_maaya",
		"齋藤飛鳥": "saito_asuka",
		"秋元真夏": "akimoto_manatsu",
		"松井玲奈": "matsui_rena",
		"西川七海": "nishikawa_nanami",
		"矢田里沙子": "yada_risako",
		"米徳京花": "yonetoku_kyoka",
		"相楽伊織": "sagara_iori",
		"伊藤かりん": "ito_karin",
		"佐々木琴子": "sasaki_kotoko",
		"堀未央奈": "hori_miona",
		"伊藤純奈": "ito_junna",
		"渡辺みり愛": "watanabe_miria",
		"寺田蘭世": "terada_ranze",
		"新内眞衣": "shinuchi_mai",
		"北野日奈子": "kitano_hinako",
		"山崎怜奈": "yamazaki_rena",
		"鈴木絢音": "suzuki_ayane",
		"大園桃子": "ozono_momoko",
		"山下美月": "yamashita_mizuki",
		"阪口珠美": "sakaguchi_tamami",
		"伊藤理々杏": "ito_riria",
		"岩本蓮加": "iwamoto_renka",
		"梅澤美波": "umezawa_minami",
		"久保史緒里": "kubo_shiori",
		"佐藤楓": "sato_kaede",
		"中村麗乃": "nakamura_reno",
		"向井葉月": "mukai_hazuki",
		"吉田綾乃ｸﾘｽﾃｨｰ": "yoshida_ayano_christie",
		"与田祐希": "yoda_yuuki",
		"北川悠理": "kitagawa_yuri",
		"早川聖来": "hayakawa_seira",
		"清宮レイ": "seimiya_rei",
		"掛橋沙耶香": "kakehashi_sayaka",
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
	},
	singlehatsu: {
		"1":	["生田絵梨花", "生駒里奈", "星野みなみ", "橋本奈々未", "松村沙友理", "白石麻衣", "高山一実", "川村真洋", "能條愛未", "西野七瀬", "齋藤飛鳥", "斉藤優里", "桜井玲香", "井上小百合", "中田花奈", "市來玲奈"],
		"2":	["岩瀬佑美子", "畠中清羅", "宮澤成良"],
		"3":	["伊藤万理華", "深川麻衣", "若月佑美"],
		"4":	["秋元真夏"],
		"5":	["伊藤寧々", "永島聖羅"],
		"6":	"",
		"7":	["衛藤美彩", "川後陽菜", "中元日芽香", "堀未央奈"],
		"8":	["樋口日奈", "和田まあや", "北野日奈子"],
		"9":	["大和里菜", "松井玲奈"],
		"10":	["斎藤ちはる"],
		"11":	["相楽伊織"],
		"12":	["新内眞衣"],
		"13":	"",
		"14":	"",
		"15":	"",
		"16":	"",
		"17":	["寺田蘭世"],
		"18":	["大園桃子", "与田祐希"],
		"19":	"",
		"20":	["久保史緒里", "山下美月"],
		"21":	["鈴木絢音", "梅澤美波", "岩本蓮加"],
		"22":	["伊藤理々杏", "佐藤楓"],
		"23":	["阪口珠美", "渡辺みり愛"],
		"24":	["遠藤さくら", "賀喜遥香", "筒井あやめ"],
		"25":	"",
		"26":	["清宮レイ", "田村真佑"],
		"27":	["早川聖来"],
		"28":	["掛橋沙耶香"],
		"29":	["柴田柚菜", "中西アルノ"],
		"30":	["金川紗耶", "弓木奈於"],
		"31":	["林瑠奈"],
		"32":	["佐藤璃果", "松尾美佑", "井上和", "菅原咲月", "川﨑桜", "五百城茉央", "一ノ瀬美空"],
		"33":	["中村麗乃", "池田瑛紗"],
		"34":	["向井葉月", "黒見明香", "冨里奈央"],
		"35":	["吉田綾乃ｸﾘｽﾃｨｰ"],
		"36":	["小川彩"],
		"37":	["奥田いろは"],
	},
	singlename: {
		"1": "Guruguru Curtain",
		"2": "Oide Shampoo",
		"3": "Hashire! Bicycle",
		"4": "Seifuku no Mannequin",
		"5": "Kimi no Na wa Kibou",
		"6": "Girls' Rule",
		"7": "Barrette",
		"8": "Kizuitara Kataomoi",
		"9": "Natsu no Free&Easy",
		"10": "Nandome no Aozora ka?",
		"11": "Inochi wa Utsukushii",
		"12": "Taiyou Knock",
		"13": "Ima, Hanashitai Dareka ga Iru",
		"14": "Harujion ga Saku Koro",
		"15": "Hadashi de Summer",
		"16": "Sayonara no Imi",
		"17": "Influencer",
		"18": "Nigemizu",
		"19": "Itsuka Dekiru kara Kyou Dekiru",
		"20": "Synchronicity",
		"21": "Jikochuu de Ikou!",
		"22": "Kaerimichi wa Toomawari Shitakunaru",
		"23": "Sing Out!",
		"24": "Yoake made Tsuyogaranakute mo Ii",
		"25": "Shiawase no Hogoshoku",
		"26": "Boku wa Boku wo Suki ni naru",
		"27": "Gomen ne Fingers crossed",
		"28": "Kimi ni Shikarareta",
		"29": "Actually…",
		"30": "Suki to Iu no wa Rock da ze!",
		"31": "Koko ni wa Nai Mono",
		"32": "Hito wa Yume wo Nido Miru",
		"33": "Ohitorisama Tengoku",
		"34": "Monopoly",
		"35": "Chance wa Byoudou",
		"36": "Cheat Day",
		"37": "Hodoukyou"
	},
	specialCases: {
		"16": "15",
		"18": "17",
		"19": "17",
		"21": "20",
		"23": "22",
		"29": "28",
		"30": "28",
		"32": "31",
		"34": "33"
	}
  };

  const container = document.querySelector('.hatsulist-container');

  Object.keys(data.singlehatsu).forEach(singleKey => {
    // Elemen utama setiap single
    const singleList = document.createElement('div');
    singleList.className = 'singlelist';

    // Elemen gambar single
    const singlePict = document.createElement('div');
    singlePict.className = 'singlepict';
    const imgSingle = document.createElement('img');
    imgSingle.src = `https://ik.imagekit.io/moearchive/singlealbum/n46_${singleKey.padStart(2, '0')}.jpg`;
    singlePict.appendChild(imgSingle);

    // Elemen detail single
    const singleDetail = document.createElement('div');
    singleDetail.className = 'singledetail';
    const pDetail = document.createElement('p');
    pDetail.textContent = data.singlename[singleKey] || "Unknown Title";
    singleDetail.appendChild(pDetail);

    // Elemen anggota yang debut di single
    const whoHatsu = document.createElement('div');
    whoHatsu.className = 'whohatsu';

    const members = data.singlehatsu[singleKey];
    if (members && members.length > 0) {
      members.forEach(memberName => {
        if (data.nameMember[memberName]) {
          const folderKey = data.specialCases[singleKey] || singleKey;
          const imgMember = document.createElement('img');
          imgMember.src = `https://ik.imagekit.io/moearchive/web/memberprofile/s${folderKey.padStart(3, '0')}/${data.nameMember[memberName]}.png`;
          whoHatsu.appendChild(imgMember);
        }
      });
    }

    // Jika tidak ada anggota, tambahkan <span> dengan teks "Tidak ada"
    if (!whoHatsu.hasChildNodes()) {
      const spanEmpty = document.createElement('span');
      spanEmpty.textContent = "Tidak ada";
      whoHatsu.appendChild(spanEmpty);
    }

    singleDetail.appendChild(whoHatsu);
    singleList.appendChild(singlePict);
    singleList.appendChild(singleDetail);
    container.appendChild(singleList);
  });
});
