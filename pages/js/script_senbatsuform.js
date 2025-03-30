document.addEventListener("DOMContentLoaded", function() {

	const SingleCreator = {
		"1": {
			SgLyrics: "秋元康",
			SgComposer: "黒須克彦",
			SgArranger: "湯浅篤",
			SgMVDirector: "操上和美",
			SgMVChoreo: "南流石"
		},
		"2": {
			SgLyrics: "秋元康",
			SgComposer: "小田切大",
			SgArranger: "TATOO",
			SgMVDirector: "高橋栄樹",
			SgMVChoreo: "南流石"
		},
		"3": {
			SgLyrics: "秋元康",
			SgComposer: "Shusui、伊藤涼、木村篤史、ヒロイズム",
			SgArranger: "湯浅篤",
			SgMVDirector: "中島哲也",
			SgMVChoreo: "南流石"
		},
		"4": {
			SgLyrics: "秋元康",
			SgComposer: "杉山勝彦",
			SgArranger: "百石元",
			SgMVDirector: "池田一真",
			SgMVChoreo: "南流石"
		},
		"5": {
			SgLyrics: "秋元康",
			SgComposer: "杉山勝彦",
			SgArranger: "杉山勝彦、有木竜郎",
			SgMVDirector: "山下敦弘",
			SgMVChoreo: "南流石"
		},
		"6": {
			SgLyrics: "秋元康",
			SgComposer: "後藤康二",
			SgArranger: "後藤康二",
			SgMVDirector: "柳沢翔",
			SgMVChoreo: "WARNER"
		},
		"7": {
			SgLyrics: "秋元康",
			SgComposer: "サイトウヨシヒロ",
			SgArranger: "若田部誠",
			SgMVDirector: "江湖広二",
			SgMVChoreo: "LICO"
		},
		"8": {
			SgLyrics: "秋元康",
			SgComposer: "Akira Sunset",
			SgArranger: "湯浅篤",
			SgMVDirector: "柳沢翔",
			SgMVChoreo: "WARNER"
		},
		"9": {
			SgLyrics: "秋元康",
			SgComposer: "井上トモノリ",
			SgArranger: "井上トモノリ",
			SgMVDirector: "丸山健志",
			SgMVChoreo: "WARNER"
		},
		"10": {
			SgLyrics: "秋元康",
			SgComposer: "川浦正大",
			SgArranger: "百石元",
			SgMVDirector: "内田けんじ",
			SgMVChoreo: "LICO"
		},
		"11": {
			SgLyrics: "秋元康",
			SgComposer: "Hiroki Sagawa",
			SgArranger: "Hiroki Sagawa",
			SgMVDirector: "井上強",
			SgMVChoreo: "WARNER"
		},
		"12": {
			SgLyrics: "秋元康",
			SgComposer: "黒須克彦",
			SgArranger: "長田直之",
			SgMVDirector: "三石直和",
			SgMVChoreo: "WARNER"
		},
		"13": {
			SgLyrics: "秋元康",
			SgComposer: "Akira Sunset、APAZZI",
			SgArranger: "Akira Sunset、APAZZI",
			SgMVDirector: "萩原健太郎",
			SgMVChoreo: "WARNER"
		},
		"14": {
			SgLyrics: "秋元康",
			SgComposer: "Akira Sunset、APAZZI",
			SgArranger: "Akira Sunset、APAZZI",
			SgMVDirector: "山戸結希",
			SgMVChoreo: "WARNER"
		},
		"15": {
			SgLyrics: "秋元康",
			SgComposer: "福森秀敏",
			SgArranger: "APAZZI",
			SgMVDirector: "丸山健志",
			SgMVChoreo: "WARNER"
		},
		"16": {
			SgLyrics: "秋元康",
			SgComposer: "杉山勝彦",
			SgArranger: "若田部誠",
			SgMVDirector: "柳沢翔",
			SgMVChoreo: "WARNER"
		},
		"17": {
			SgLyrics: "秋元康",
			SgComposer: "すみだしんや",
			SgArranger: "APAZZI",
			SgMVDirector: "丸山健志",
			SgMVChoreo: "Seishiro"
		},
		"18": {
			SgLyrics: "秋元康",
			SgComposer: "谷村庸平",
			SgArranger: "谷村庸平",
			SgMVDirector: "山岸聖太",
			SgMVChoreo: "CRE8BOY"
		},
		"19": {
			SgLyrics: "秋元康",
			SgComposer: "Akira Sunset、京田誠一",
			SgArranger: "Akira Sunset、京田誠一",
			SgMVDirector: "高橋栄樹",
			SgMVChoreo: "小島亜斗"
		},
		"20": {
			SgLyrics: "秋元康",
			SgComposer: "シライシ紗トリ",
			SgArranger: "シライシ紗トリ",
			SgMVDirector: "池田一真",
			SgMVChoreo: "Seishiro"
		},
		"21": {
			SgLyrics: "秋元康",
			SgComposer: "ナスカ",
			SgArranger: "野中“まさ”雄一",
			SgMVDirector: "中村太洸",
			SgMVChoreo: "Acchan、田中文人"
		},
		"22": {
			SgLyrics: "秋元康",
			SgComposer: "渡邉俊彦",
			SgArranger: "渡邉俊彦、早川博隆",
			SgMVDirector: "関和亮",
			SgMVChoreo: "CRE8BOY"
		},
		"23": {
			SgLyrics: "秋元康",
			SgComposer: "Ryota Saito、TETTA",
			SgArranger: "野中“まさ”雄一",
			SgMVDirector: "池田一真",
			SgMVChoreo: "Seishiro"
		},
		"24": {
			SgLyrics: "秋元康",
			SgComposer: "山田裕介",
			SgArranger: "APAZZI",
			SgMVDirector: "丸山健志",
			SgMVChoreo: "CRE8BOY"
		},
		"25": {
			SgLyrics: "秋元康",
			SgComposer: "MASANORI URA",
			SgArranger: "武藤星児",
			SgMVDirector: "池田一真",
			SgMVChoreo: "CRE8BOY"
		},
		"26": {
			SgLyrics: "秋元康",
			SgComposer: "杉山勝彦",
			SgArranger: "杉山勝彦、石原剛志",
			SgMVDirector: "奥山大史",
			SgMVChoreo: "Seishiro"
		},
		"27": {
			SgLyrics: "秋元康",
			SgComposer: "杉山勝彦、APAZZI",
			SgArranger: "APAZZI",
			SgMVDirector: "東市篤憲",
			SgMVChoreo: "LICO"
		},
		"28": {
			SgLyrics: "秋元康",
			SgComposer: "youth case",
			SgArranger: "石塚知生",
			SgMVDirector: "横堀光範",
			SgMVChoreo: "CRE8BOY"
		},
		"29": {
			SgLyrics: "秋元康",
			SgComposer: "NAMITO",
			SgArranger: "APAZZI",
			SgMVDirector: "東市篤憲",
			SgMVChoreo: "Seishiro"
		},
		"30": {
			SgLyrics: "秋元康",
			SgComposer: "野村陽一郎",
			SgArranger: "野村陽一郎",
			SgMVDirector: "神谷雄貴",
			SgMVChoreo: "WARNER"
		},
		"31": {
			SgLyrics: "秋元康",
			SgComposer: "ナスカ",
			SgArranger: "the Third",
			SgMVDirector: "小林啓一",
			SgMVChoreo: "LICO"
		},
		"32": {
			SgLyrics: "秋元康",
			SgComposer: "松尾一真",
			SgArranger: "APAZZI",
			SgMVDirector: "丸山健志",
			SgMVChoreo: "yurinasia"
		},
		"33": {
			SgLyrics: "秋元康",
			SgComposer: "Akira Sunset、ha-j、丸谷マナブ、遠藤ナオキ",
			SgArranger: "APAZZI",
			SgMVDirector: "伊藤衆人",
			SgMVChoreo: "LICO"
		},
		"34": {
			SgLyrics: "秋元康",
			SgComposer: "杉山勝彦",
			SgArranger: "杉山勝彦、谷地学、尾上榛",
			SgMVDirector: "池田一真",
			SgMVChoreo: "WARNER"
		},
		"35": {
			SgLyrics: "秋元康",
			SgComposer: "中村泰輔",
			SgArranger: "中村泰輔",
			SgMVDirector: "大河臣",
			SgMVChoreo: "Acchan、田中文人"
		},
		"36": {
			SgLyrics: "秋元康",
			SgComposer: "川浦正大",
			SgArranger: "野中“まさ”雄一",
			SgMVDirector: "伊藤衆人",
			SgMVChoreo: "LICO"
		},
		"37": {
			SgLyrics: "秋元康",
			SgComposer: "杉山勝彦",
			SgArranger: "石原剛志、杉山勝彦、浅尾悠太",
			SgMVDirector: "三木孝浩",
			SgMVChoreo: "Seishiro"
		},
		"38": {
			SgLyrics: "秋元康",
			SgComposer: "???",
			SgArranger: "???",
			SgMVDirector: "???",
			SgMVChoreo: "???",
		},
	};

	const photoMember = {
		generalUrl: "https://ik.imagekit.io/moearchive/web/memberprofile/",

		// Special case mapping for certain singles
		specialCases: {
			16: 15,
			18: 17,
			19: 17,
			21: 20,
			23: 22,
			29: 28,
			30: 28,
			32: 31,
			34: 33,
		},

		// Special links for specific members in specific singles
		//--COPYHERE
		specialLinks: {
			"早川聖来": {
				33: "https://ik.imagekit.io/moearchive/web/memberprofile/s031/hayakawa_seira.png"
			},
			"掛橋沙耶香": {
				31: "https://ik.imagekit.io/moearchive/web/memberprofile/s028/kakehashi_sayaka.png"
			},
			"和田まあや": {
				31: "https://ik.imagekit.io/moearchive/web/memberprofile/s028/wada_maaya.png"
			},
			"樋口日奈": {
				31: "https://ik.imagekit.io/moearchive/web/memberprofile/s028/higuchi_hina.png"
			}
		},
		//--UNTILHERE

		singleNumber: function(singleIndex) {
			// Check if the single number is a special case, if so, return the mapped value
			if (this.specialCases[singleIndex]) {
				return `s${String(this.specialCases[singleIndex]).padStart(3, '0')}`;
			}
			// Otherwise, return the single number as usual
			return `s${String(singleIndex).padStart(3, '0')}`;
		},
		getPhotoUrl: function(singleIndex, memberName) {
			// Check if the member has a special link for the given single
			if (this.specialLinks[memberName] && this.specialLinks[memberName][singleIndex]) {
				return this.specialLinks[memberName][singleIndex];
			}
			// Fall back to the default URL generation
			if (this.nameMember[memberName]) {
				return `${this.generalUrl}${this.singleNumber(singleIndex)}/${this.nameMember[memberName]}.png`;
			}
			return null;
		},
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
			"中西アルノ": "nakanishi_aruno",
			"矢田萌華" : "yada_moeka",
			"川端晃菜" : "kawabata_hina",
			"瀬戸口心月" : "setoguchi_mitsuki",
			"海邉朱莉" : "kaibe_akari",
			"長嶋凛桜" : "nagashima_rio",
			"森平麗心" : "morihira_urumi",
			"愛宕心響" : "atago_kokone",
			"鈴木佑捺" : "suzuki_yuuna",
			"大越ひなの" : "okoshi_hinano",
			"小津玲奈" : "ozu_reina",
			"増田三莉音" : "masuda_mirine"

		},
		getPhotoUrl: function(singleIndex, memberName) {
			if (this.nameMember[memberName]) {
				return `${this.generalUrl}${this.singleNumber(singleIndex)}/${this.nameMember[memberName]}.png`;
			}
			return null;
		},
		//--COPY HERE (add SVG link function)
		getSvgUrl: function(memberName) {
			if (this.nameMember[memberName]) {
				return `svg/${this.nameMember[memberName]}.svg`;
			}
			return null;
		}
		//--TO HERE
	};
	const memberGrad = {
		4: "岩瀬佑美子",
		6: "安藤美雲",
		7: ["柏幸奈", "宮澤成良"],
		8: ["西川七海", "市來玲奈"],
		10: ["矢田里沙子", "米徳京花", "伊藤寧々", "大和里菜"],
		11: ["畠中清羅", "松井玲奈"],
		13: "永島聖羅",
		14: "深川麻衣",
		16: "橋本奈々未",
		18: "中元日芽香",
		19: "伊藤万理華",
		20: ["川村真洋", "生駒里奈"],
		21: ["斎藤ちはる", "相楽伊織"],
		22: ["若月佑美", "能條愛未", "川後陽菜", "西野七瀬", "衛藤美彩"],
		23: ["伊藤かりん", "斉藤優里"],
		24: ["桜井玲香", "井上小百合"],
		25: ["佐々木琴子", "中田花奈", "白石麻衣"],
		26: "堀未央奈",
		27: ["松村沙友理", "伊藤純奈", "渡辺みり愛", "大園桃子", "高山一実"],
		28: ["寺田蘭世", "生田絵梨花", "新内眞衣", "星野みなみ"],
		29: ["北野日奈子", "山崎怜奈"],
		31: ["樋口日奈", "和田まあや", "齋藤飛鳥"],
		32: ["秋元真夏", "鈴木絢音", "北川悠理"],
		33: "早川聖来",
		35: ["山下美月", "阪口珠美", "清宮レイ"],
		36: "掛橋沙耶香",
		37: "向井葉月",
		38: ["与田祐希", "中村麗乃"],
	};
	// Table MADAMADA, with the title “不参加"
	const HiatusMadamada = {
		1: "秋元真夏",
		2: "秋元真夏",
		3: "秋元真夏",
		23: "山下美月"
	}

	// Table TUKAR, with heading “交換留学生"
	const TransferMember = {
		9: "松井玲奈"
	}

	// Table TIDAKIKUT, with heading ‘休業中"
	const HiatusNotParticipate = {
		6: "市來玲奈",
		7: "市來玲奈",
		9: "生田絵梨花",
		12: "山崎怜奈",
		32: "掛橋沙耶香",
		33: "掛橋沙耶香",
		34: "掛橋沙耶香",
		35: "掛橋沙耶香"
	}

	// Tabel SAKIT, dengan judul “体調不良"
	const HiatusSick = {
		17: "中元日芽香",
		20: "北野日奈子",
		21: "久保史緒里",
		24: ["井上小百合", "大園桃子"],
		30: "早川聖来",
		31: ["清宮レイ", "掛橋沙耶香"],
		33: ["林瑠奈", "岡本姫奈"],
		34: "金川紗耶",
		35: "掛橋沙耶香",
	}

	const generations = {
		1: ["山本穂乃香", "吉本彩華", "岩瀬佑美子", "安藤美雲", "柏幸奈", "宮澤成良", "市來玲奈", "伊藤寧々", "大和里菜", "畠中清羅", "永島聖羅", "深川麻衣", "橋本奈々未", "伊藤万理華", "中元日芽香", "川村真洋", "生駒里奈", "斎藤ちはる", "若月佑美", "能條愛未", "川後陽菜", "西野七瀬", "衛藤美彩", "斉藤優里", "桜井玲香", "井上小百合", "中田花奈", "白石麻衣", "松村沙友理", "高山一実", "生田絵梨花", "星野みなみ", "樋口日奈", "和田まあや", "齋藤飛鳥", "秋元真夏"],
		2: ["西川七海", "矢田里沙子", "米徳京花", "相楽伊織", "伊藤かりん", "佐々木琴子", "堀未央奈", "伊藤純奈", "渡辺みり愛", "寺田蘭世", "新内眞衣", "北野日奈子", "山崎怜奈", "鈴木絢音"],
		3: ["大園桃子", "山下美月", "阪口珠美", "伊藤理々杏", "岩本蓮加", "梅澤美波", "久保史緒里", "佐藤楓", "中村麗乃", "向井葉月", "吉田綾乃ｸﾘｽﾃｨｰ", "与田祐希"],
		4: ["北川悠理", "早川聖来", "清宮レイ", "掛橋沙耶香", "遠藤さくら", "賀喜遥香", "金川紗耶", "黒見明香", "佐藤璃果", "柴田柚菜", "田村真佑", "筒井あやめ", "林瑠奈", "松尾美佑", "矢久保美緒", "弓木奈於"],
		5: ["五百城茉央", "池田瑛紗", "一ノ瀬美空", "井上和", "岡本姫奈", "小川彩", "奥田いろは", "川﨑桜", "菅原咲月", "冨里奈央", "中西アルノ"],
		transfer: ["松井玲奈"]
	};
	const singles = {
		"1": {
			singleTitle: "ぐるぐるカーテン",
			center: "生駒里奈",
			members3rd: ["川村真洋", "能條愛未", "西野七瀬", "齋藤飛鳥", "斉藤優里", "桜井玲香", "井上小百合", "中田花奈", "市來玲奈"],
			members2nd: ["橋本奈々未", "松村沙友理", "白石麻衣", "高山一実"],
			members1st: ["生田絵梨花", "生駒里奈", "星野みなみ"]
		},
		"2": {
			singleTitle: "おいでシャンプー",
			center: "生駒里奈",
			members3rd: ["岩瀬佑美子", "市來玲奈", "斉藤優里", "生田絵梨花", "井上小百合", "星野みなみ", "西野七瀬", "畠中清羅", "宮澤成良"],
			members2nd: ["橋本奈々未", "松村沙友理", "白石麻衣", "高山一実"],
			members1st: ["桜井玲香", "生駒里奈", "中田花奈"]
		},
		"3": {
			singleTitle: "走れ!Bicycle",
			center: "生駒里奈",
			members3rd: ["斉藤優里", "若月佑美", "井上小百合", "市來玲奈", "伊藤万理華", "深川麻衣"],
			members2nd: ["中田花奈", "橋本奈々未", "白石麻衣", "松村沙友理", "西野七瀬", "高山一実"],
			members1st: ["生田絵梨花", "生駒里奈", "星野みなみ", "桜井玲香"]
		},
		"4": {
			singleTitle: "制服のマネキン",
			center: "生駒里奈",
			members3rd: ["能條愛未", "齋藤飛鳥", "若月佑美", "井上小百合", "深川麻衣", "市來玲奈", "西野七瀬", "高山一実"],
			members2nd: ["桜井玲香", "橋本奈々未", "白石麻衣", "松村沙友理", "秋元真夏"],
			members1st: ["生田絵梨花", "生駒里奈", "星野みなみ"]
		},
		"5": {
			singleTitle: "君の名は希望",
			center: "生駒里奈",
			members3rd: ["伊藤寧々", "中田花奈", "井上小百合", "西野七瀬", "若月佑美", "深川麻衣", "永島聖羅", "高山一実"],
			members2nd: ["桜井玲香", "橋本奈々未", "白石麻衣", "松村沙友理", "秋元真夏"],
			members1st: ["生田絵梨花", "生駒里奈", "星野みなみ"]
		},
		"6": {
			singleTitle: "ガールズルール",
			center: "白石麻衣",
			members3rd: ["伊藤万理華", "井上小百合", "中田花奈", "若月佑美", "星野みなみ", "秋元真夏", "深川麻衣", "斉藤優里"],
			members2nd: ["桜井玲香", "生田絵梨花", "生駒里奈", "西野七瀬", "高山一実"],
			members1st: ["松村沙友理", "白石麻衣", "橋本奈々未"]
		},
		"7": {
			singleTitle: "バレッタ",
			center: "堀未央奈",
			members3rd: ["伊藤万理華", "衛藤美彩", "齋藤飛鳥", "秋元真夏", "深川麻衣", "中元日芽香", "川後陽菜", "高山一実"],
			members2nd: ["桜井玲香", "生田絵梨花", "生駒里奈", "若月佑美"],
			members1st: ["西野七瀬", "白石麻衣", "堀未央奈", "橋本奈々未", "松村沙友理"]
		},
		"8": {
			singleTitle: "気づいたら片想い",
			center: "西野七瀬",
			members3rd: ["川村真洋", "北野日奈子", "樋口日奈", "秋元真夏", "和田まあや", "高山一実"],
			members2nd: ["桜井玲香", "若月佑美", "生田絵梨花", "松村沙友理", "深川麻衣"],
			members1st: ["堀未央奈", "白石麻衣", "西野七瀬", "橋本奈々未", "生駒里奈"]
		},
		"9": {
			singleTitle: "夏のFree&Easy",
			center: "西野七瀬",
			members3rd: ["衛藤美彩", "井上小百合", "斉藤優里", "星野みなみ", "大和里菜", "堀未央奈", "高山一実"],
			members2nd: ["若月佑美", "秋元真夏", "桜井玲香", "深川麻衣", "生駒里奈"],
			members1st: ["松井玲奈", "白石麻衣", "西野七瀬", "橋本奈々未", "松村沙友理"]
		},
		"10": {
			singleTitle: "何度目の青空か？",
			center: "生田絵梨花",
			members3rd: ["衛藤美彩", "若月佑美", "堀未央奈", "星野みなみ", "高山一実", "斎藤ちはる"],
			members2nd: ["松村沙友理", "秋元真夏", "生駒里奈", "桜井玲香", "深川麻衣"],
			members1st: ["松井玲奈", "白石麻衣", "生田絵梨花", "西野七瀬", "橋本奈々未"]
		},
		"11": {
			singleTitle: "命は美しい",
			center: "西野七瀬",
			members3rd: ["松村沙友理", "相楽伊織", "齋藤飛鳥", "伊藤万理華", "堀未央奈", "星野みなみ", "衛藤美彩", "高山一実"],
			members2nd: ["若月佑美", "秋元真夏", "生駒里奈", "桜井玲香", "深川麻衣"],
			members1st: ["松井玲奈", "白石麻衣", "西野七瀬", "橋本奈々未", "生田絵梨花"]
		},
		"12": {
			singleTitle: "太陽ノック",
			center: "生駒里奈",
			members3rd: ["松村沙友理", "斉藤優里", "星野みなみ", "齋藤飛鳥", "伊藤万理華", "井上小百合", "新内眞衣", "衛藤美彩"],
			members2nd: ["高山一実", "若月佑美", "桜井玲香", "秋元真夏", "深川麻衣"],
			members1st: ["白石麻衣", "西野七瀬", "生駒里奈", "生田絵梨花", "橋本奈々未"]
		},
		"13": {
			singleTitle: "今、話したい誰かがいる",
			center: ["白石麻衣", "西野七瀬"],
			members3rd: ["桜井玲香", "若月佑美", "生駒里奈", "松村沙友理", "伊藤万理華", "井上小百合"],
			members2nd: ["齋藤飛鳥", "高山一実", "橋本奈々未", "生田絵梨花", "秋元真夏", "星野みなみ"],
			members1st: ["衛藤美彩", "西野七瀬", "白石麻衣", "深川麻衣"]
		},
		"14": {
			singleTitle: "ハルジオンが咲く頃",
			center: "深川麻衣",
			members3rd: ["桜井玲香", "若月佑美", "松村沙友理", "生駒里奈", "伊藤万理華", "井上小百合", "堀未央奈"],
			members2nd: ["齋藤飛鳥", "高山一実", "衛藤美彩", "秋元真夏", "星野みなみ"],
			members1st: ["橋本奈々未", "西野七瀬", "深川麻衣", "白石麻衣", "生田絵梨花"]
		},
		"15": {
			singleTitle: "裸足でSummer",
			center: "齋藤飛鳥",
			members3rd: ["北野日奈子", "星野みなみ", "若月佑美", "生駒里奈", "堀未央奈", "中元日芽香"],
			members2nd: ["高山一実", "衛藤美彩", "松村沙友理", "秋元真夏", "桜井玲香"],
			members1st: ["橋本奈々未", "西野七瀬", "齋藤飛鳥", "白石麻衣", "生田絵梨花"]
		},
		"16": {
			singleTitle: "サヨナラの意味",
			center: "橋本奈々未",
			members3rd: ["中元日芽香", "井上小百合", "新内眞衣", "桜井玲香", "生駒里奈", "星野みなみ", "北野日奈子", "伊藤万理華"],
			members2nd: ["若月佑美", "松村沙友理", "堀未央奈", "齋藤飛鳥", "衛藤美彩", "秋元真夏"],
			members1st: ["高山一実", "西野七瀬", "橋本奈々未", "白石麻衣", "生田絵梨花"]
		},
		"17": {
			singleTitle: "インフルエンサー",
			center: ["白石麻衣", "西野七瀬"],
			members3rd: ["新内眞衣", "井上小百合", "寺田蘭世", "北野日奈子", "伊藤万理華", "星野みなみ", "斉藤優里", "樋口日奈", "中田花奈"],
			members2nd: ["若月佑美", "高山一実", "生駒里奈", "生田絵梨花", "松村沙友理", "桜井玲香"],
			members1st: ["秋元真夏", "堀未央奈", "西野七瀬", "白石麻衣", "齋藤飛鳥", "衛藤美彩"]
		},
		"18": {
			singleTitle: "逃げ水",
			center: ["大園桃子", "与田祐希"],
			members3rd: ["伊藤万理華", "新内眞衣", "生駒里奈", "桜井玲香", "若月佑美", "井上小百合"],
			members2nd: ["星野みなみ", "松村沙友理", "生田絵梨花", "秋元真夏", "衛藤美彩", "高山一実"],
			members1st: ["齋藤飛鳥", "白石麻衣", "大園桃子", "与田祐希", "西野七瀬", "堀未央奈"]
		},
		"19": {
			singleTitle: "いつかできるから今日できる",
			center: ["西野七瀬", "齋藤飛鳥"],
			members3rd: ["新内眞衣", "斉藤優里", "星野みなみ", "生駒里奈", "秋元真夏", "北野日奈子", "中田花奈", "高山一実"],
			members2nd: ["若月佑美", "井上小百合", "松村沙友理", "生田絵梨花", "伊藤万理華", "桜井玲香", "衛藤美彩"],
			members1st: ["堀未央奈", "西野七瀬", "齋藤飛鳥", "白石麻衣"]
		},
		"20": {
			singleTitle: "シンクロニシティ",
			center: "白石麻衣",
			members3rd: ["井上小百合", "新内眞衣", "高山一実", "星野みなみ", "若月佑美", "樋口日奈", "寺田蘭世"],
			members2nd: ["桜井玲香", "松村沙友理", "久保史緒里", "生駒里奈", "大園桃子", "衛藤美彩", "秋元真夏"],
			members1st: ["山下美月", "堀未央奈", "生田絵梨花", "白石麻衣", "西野七瀬", "齋藤飛鳥", "与田祐希"]
		},
		"21": {
			singleTitle: "ジコチューで行こう!",
			center: "齋藤飛鳥",
			members3rd: ["高山一実", "斉藤優里", "若月佑美", "鈴木絢音", "星野みなみ", "新内眞衣", "井上小百合"],
			members2nd: ["秋元真夏", "衛藤美彩", "大園桃子", "梅澤美波", "岩本蓮加", "松村沙友理", "桜井玲香"],
			members1st: ["生田絵梨花", "与田祐希", "西野七瀬", "齋藤飛鳥", "白石麻衣", "堀未央奈", "山下美月"]
		},
		"22": {
			singleTitle: "帰り道は遠回りしたくなる",
			center: "西野七瀬",
			members3rd: ["斉藤優里", "井上小百合", "佐藤楓", "大園桃子", "伊藤理々杏", "新内眞衣", "高山一実"],
			members2nd: ["衛藤美彩", "秋元真夏", "堀未央奈", "若月佑美", "星野みなみ", "桜井玲香", "松村沙友理"],
			members1st: ["梅澤美波", "山下美月", "齋藤飛鳥", "西野七瀬", "白石麻衣", "生田絵梨花", "与田祐希"]
		},
		"23": {
			singleTitle: "Sing Out!",
			center: "齋藤飛鳥",
			members3rd: ["井上小百合", "佐藤楓", "鈴木絢音", "岩本蓮加", "阪口珠美", "渡辺みり愛", "伊藤理々杏", "新内眞衣"],
			members2nd: ["梅澤美波", "北野日奈子", "秋元真夏", "久保史緒里", "松村沙友理", "星野みなみ", "桜井玲香"],
			members1st: ["大園桃子", "堀未央奈", "生田絵梨花", "齋藤飛鳥", "白石麻衣", "高山一実", "与田祐希"]
		},
		"24": {
			singleTitle: "夜明けまで強がらなくてもいい",
			center: "遠藤さくら",
			members3rd: ["梅澤美波", "北野日奈子", "秋元真夏", "久保史緒里", "高山一実", "星野みなみ", "新内眞衣"],
			members2nd: ["山下美月", "生田絵梨花", "白石麻衣", "松村沙友理", "桜井玲香", "与田祐希"],
			members1st: ["堀未央奈", "賀喜遥香", "遠藤さくら", "筒井あやめ", "齋藤飛鳥"]
		},
		"25": {
			singleTitle: "しあわせの保護色",
			center: "白石麻衣",
			members3rd: ["賀喜遥香", "新内眞衣", "山下美月", "久保史緒里", "堀未央奈", "大園桃子", "遠藤さくら", "岩本蓮加", "与田祐希", "北野日奈子", "梅澤美波"],
			members2nd: ["井上小百合", "和田まあや", "高山一実", "秋元真夏", "樋口日奈", "中田花奈"],
			members1st: ["齋藤飛鳥", "生田絵梨花", "白石麻衣", "松村沙友理", "星野みなみ"]
		},
		"26": {
			singleTitle: "僕は僕を好きになる",
			center: "山下美月",
			members3rd: ["新内眞衣", "清宮レイ", "田村真佑", "星野みなみ", "筒井あやめ", "岩本蓮加", "高山一実"],
			members2nd: ["松村沙友理", "遠藤さくら", "大園桃子", "堀未央奈", "与田祐希", "賀喜遥香", "秋元真夏"],
			members1st: ["生田絵梨花", "梅澤美波", "山下美月", "久保史緒里", "齋藤飛鳥"]
		},
		"27": {
			singleTitle: "ごめんねFingers crossed",
			center: "遠藤さくら",
			members3rd: ["樋口日奈", "早川聖来", "筒井あやめ", "大園桃子", "岩本蓮加", "清宮レイ", "田村真佑", "新内眞衣"],
			members2nd: ["秋元真夏", "梅澤美波", "星野みなみ", "松村沙友理", "生田絵梨花", "久保史緒里", "高山一実"],
			members1st: ["与田祐希", "齋藤飛鳥", "遠藤さくら", "山下美月", "賀喜遥香"]
		},
		"28": {
			singleTitle: "君に叱られた",
			center: "賀喜遥香",
			members3rd: ["樋口日奈", "早川聖来", "清宮レイ", "北野日奈子", "岩本蓮加", "鈴木絢音", "田村真佑", "新内眞衣", "掛橋沙耶香"],
			members2nd: ["筒井あやめ", "梅澤美波", "星野みなみ", "高山一実", "生田絵梨花", "久保史緒里", "秋元真夏"],
			members1st: ["遠藤さくら", "与田祐希", "賀喜遥香", "齋藤飛鳥", "山下美月"]
		},
		"29": {
			singleTitle: "Actually…",
			center: "中西アルノ",
			members3rd: ["田村真佑", "掛橋沙耶香", "清宮レイ", "鈴木絢音", "樋口日奈", "岩本蓮加", "柴田柚菜", "早川聖来"],
			members2nd: ["久保史緒里", "賀喜遥香", "与田祐希", "遠藤さくら", "筒井あやめ"],
			members1st: ["梅澤美波", "山下美月", "中西アルノ", "齋藤飛鳥", "秋元真夏"]
		},
		"30": {
			singleTitle: "好きというのはロックだぜ！",
			center: "賀喜遥香",
			members3rd: ["金川紗耶", "清宮レイ", "掛橋沙耶香", "鈴木絢音", "樋口日奈", "柴田柚菜", "佐藤楓", "弓木奈於"],
			members2nd: ["田村真佑", "久保史緒里", "梅澤美波", "秋元真夏", "岩本蓮加", "筒井あやめ"],
			members1st: ["与田祐希", "齋藤飛鳥", "賀喜遥香", "山下美月", "遠藤さくら"]
		},
		"31": {
			singleTitle: "ここにはないもの",
			center: "齋藤飛鳥",
			members3rd: ["柴田柚菜", "岩本蓮加", "阪口珠美", "筒井あやめ", "早川聖来", "林瑠奈", "弓木奈於"],
			members2nd: ["田村真佑", "久保史緒里", "梅澤美波", "秋元真夏", "鈴木絢音", "金川紗耶"],
			members1st: ["賀喜遥香", "遠藤さくら", "齋藤飛鳥", "山下美月", "与田祐希"]
		},
		"32": {
			singleTitle: "人は夢を二度見る",
			center: ["久保史緒里", "山下美月"],
			members3rd: ["佐藤璃果", "金川紗耶", "早川聖来", "一ノ瀬美空", "松尾美佑", "五百城茉央", "岩本蓮加", "弓木奈於", "柴田柚菜"],
			members2nd: ["菅原咲月", "田村真佑", "与田祐希", "井上和", "梅澤美波", "筒井あやめ", "川﨑桜"],
			members1st: ["賀喜遥香", "久保史緒里", "山下美月", "遠藤さくら"]
		},
		"33": {
			singleTitle: "おひとりさま天国",
			center: "井上和",
			members3rd: ["中村麗乃", "筒井あやめ", "川﨑桜", "弓木奈於", "池田瑛紗", "金川紗耶", "菅原咲月", "柴田柚菜", "伊藤理々杏"],
			members2nd: ["岩本蓮加", "一ノ瀬美空", "与田祐希", "梅澤美波", "五百城茉央", "田村真佑"],
			members1st: ["山下美月", "賀喜遥香", "井上和", "遠藤さくら", "久保史緒里"]
		},
		"34": {
			singleTitle: "Monopoly",
			center: ["賀喜遥香", "遠藤さくら"],
			members3rd: ["冨里奈央", "向井葉月", "柴田柚菜", "菅原咲月", "筒井あやめ", "一ノ瀬美空", "弓木奈於", "黒見明香", "五百城茉央"],
			members2nd: ["梅澤美波", "川﨑桜", "与田祐希", "井上和", "岩本蓮加", "池田瑛紗", "田村真佑"],
			members1st: ["山下美月", "賀喜遥香", "遠藤さくら", "久保史緒里"]
		},
		"35": {
			singleTitle: "チャンスは平等",
			center: "山下美月",
			members3rd: ["吉田綾乃ｸﾘｽﾃｨｰ", "佐藤楓", "阪口珠美", "一ノ瀬美空", "五百城茉央", "池田瑛紗", "伊藤理々杏", "向井葉月", "中村麗乃"],
			members2nd: ["田村真佑", "井上和", "遠藤さくら", "賀喜遥香", "川﨑桜", "弓木奈於"],
			members1st: ["与田祐希", "久保史緒里", "山下美月", "梅澤美波", "岩本蓮加"]
		},
		"36": {
			singleTitle: "チートデイ",
			center: "井上和",
			members3rd: ["筒井あやめ", "菅原咲月", "田村真佑", "中西アルノ", "川﨑桜", "弓木奈於", "冨里奈央", "金川紗耶"],
			members2nd: ["与田祐希", "五百城茉央", "久保史緒里", "梅澤美波", "一ノ瀬美空", "岩本蓮加"],
			members1st: ["遠藤さくら", "小川彩", "井上和", "池田瑛紗", "賀喜遥香"]
		},
		"37": {
			singleTitle: "歩道橋",
			center: "遠藤さくら",
			members3rd: ["奥田いろは", "金川紗耶", "弓木奈於", "小川彩", "筒井あやめ", "田村真佑", "岩本蓮加", "林瑠奈"],
			members2nd: ["五百城茉央", "川﨑桜", "久保史緒里", "与田祐希", "一ノ瀬美空", "中西アルノ"],
			members1st: ["賀喜遥香", "井上和", "遠藤さくら", "池田瑛紗", "梅澤美波"]
		},
		"38": {
			singleTitle: "ネーブルオレンジ",
			center: ["井上和", "中西アルノ"],
			members3rd: ["金川紗耶", "冨里奈央", "弓木奈於", "菅原咲月", "筒井あやめ", "田村真佑", "奥田いろは", "林瑠奈"],
			members2nd: ["小川彩", "川﨑桜", "久保史緒里", "池田瑛紗", "梅澤美波", "五百城茉央", "一ノ瀬美空"],
			members1st: ["賀喜遥香", "井上和", "中西アルノ", "遠藤さくら"]
		},

		// [all other singles]
	};

	const backgroundColorMemberCont = {
		"1": "#EAE9EE",
		"2": "#EDEDF5",
		"3": "#F3EEEA",
		"4": "#F5F3F4",
		"6": "#9BA7B3",
		"8": "#F1F2F6",
		"10": "#E0E6EB",
		"11": "#C8CDD1",
		"12": "#DADADC",
		"13": "#E2E2E6",
		"14": "#F6F6F9",
		"17": "#F1F1F3",
		"18": "#F0EFF4",
		"19": "#F0EFF4",
		"20": "#F4F2F9",
		"21": "#F4F2F9",
		"22": "#E5E5E5",
		"23": "#E5E5E5",
		"24": "#EDEFF3",
		"25": "#EDEFF3",
		"26": "#CADCF3",
		"27": "#CADCF3",
		"28": "#CBB8B1",
		"29": "#CBB8B1",
		"30": "#CBB8B1",
		"31": "#CBCED3",
		"32": "#CBCED3",
		"33": "#CFE1F7",
		"34": "#CFE1F7",
		"35": "#C7D2D4",
		"36": "#EEE1FF",
		"37": "#FBDFB0",
		"38": "#E6DCE4"
	};

	const singlerelease = [{
			num: 1,
			announcementDate: "2011/10/3",
			airingChannel: "乃木坂ってこど？#14",
			releaseDate: "2012/02/22"
		},
		{
			num: 2,
			announcementDate: "2012/03/19",
			airingChannel: "乃木坂ってこど？#24",
			releaseDate: "2012/05/2"
		},
		{
			num: 3,
			announcementDate: "2012/06/18",
			airingChannel: "乃木坂ってこど？#37",
			releaseDate: "2012/08/22"
		},
		{
			num: 4,
			announcementDate: "2012/10/8",
			airingChannel: "乃木坂ってこど？#53",
			releaseDate: "2012/12/19"
		},
		{
			num: 5,
			announcementDate: "2013/01/7",
			airingChannel: "乃木坂ってこど？#65",
			releaseDate: "2013/03/13"
		},
		{
			num: 6,
			announcementDate: "2013/04/22",
			airingChannel: "乃木坂ってこど？#80",
			releaseDate: "2013/07/3"
		},
		{
			num: 7,
			announcementDate: "2013/10/7",
			airingChannel: "乃木坂ってこど？#104",
			releaseDate: "2013/11/27"
		},
		{
			num: 8,
			announcementDate: "2014/01/27",
			airingChannel: "乃木坂ってこど？#119",
			releaseDate: "2014/04/2"
		},
		{
			num: 9,
			announcementDate: "2014/05/12",
			airingChannel: "乃木坂ってこど？#133",
			releaseDate: "2014/07/9"
		},
		{
			num: 10,
			announcementDate: "2014/08/4",
			airingChannel: "乃木坂ってこど？#145",
			releaseDate: "2014/10/8"
		},
		{
			num: 11,
			announcementDate: "2015/01/19",
			airingChannel: "乃木坂ってこど？#168",
			releaseDate: "2015/03/18"
		},
		{
			num: 12,
			announcementDate: "2015/05/11",
			airingChannel: "乃木坂工事中 #4",
			releaseDate: "2015/07/22"
		},
		{
			num: 13,
			announcementDate: "2015/08/31",
			airingChannel: "乃木坂工事中 #18",
			releaseDate: "2015/10/28"
		},
		{
			num: 14,
			announcementDate: "2016/02/1",
			airingChannel: "乃木坂工事中 #41",
			releaseDate: "2016/03/23"
		},
		{
			num: 15,
			announcementDate: "2016/06/6",
			airingChannel: "乃木坂工事中 #54",
			releaseDate: "2016/07/27"
		},
		{
			num: 16,
			announcementDate: "2016/10/17",
			airingChannel: "乃木坂工事中 #57",
			releaseDate: "2016/11/9"
		},
		{
			num: 17,
			announcementDate: "2017/01/30",
			airingChannel: "乃木坂工事中 #90",
			releaseDate: "2017/03/22"
		},
		{
			num: 18,
			announcementDate: "2017/07/10",
			airingChannel: "乃木坂工事中 #112",
			releaseDate: "2017/08/9"
		},
		{
			num: 19,
			announcementDate: "2017/09/4",
			airingChannel: "乃木坂工事中 #120",
			releaseDate: "2017/10/11"
		},
		{
			num: 20,
			announcementDate: "2018/03/12",
			airingChannel: "乃木坂工事中 #146",
			releaseDate: "2018/04/25"
		},
		{
			num: 21,
			announcementDate: "2018/07/2",
			airingChannel: "乃木坂工事中 #162",
			releaseDate: "2018/08/8"
		},
		{
			num: 22,
			announcementDate: "2018/10/1",
			airingChannel: "乃木坂工事中 #175",
			releaseDate: "2018/11/14"
		},
		{
			num: 23,
			announcementDate: "2019/04/15",
			airingChannel: "乃木坂工事中 #202",
			releaseDate: "2019/05/29"
		},
		{
			num: 24,
			announcementDate: "2019/07/15",
			airingChannel: "乃木坂工事中 #215",
			releaseDate: "2019/09/4"
		},
		{
			num: 25,
			announcementDate: "2020/02/3",
			airingChannel: "乃木坂工事中 #243",
			releaseDate: "2020/03/25"
		},
		{
			num: 26,
			announcementDate: "2020/11/16",
			airingChannel: "乃木坂工事中 #284",
			releaseDate: "2021/01/27"
		},
		{
			num: 27,
			announcementDate: "2021/04/19",
			airingChannel: "乃木坂工事中 #305",
			releaseDate: "2021/06/9"
		},
		{
			num: 28,
			announcementDate: "2021/08/16",
			airingChannel: "乃木坂工事中 #322",
			releaseDate: "2021/09/22"
		},
		{
			num: 29,
			announcementDate: "2022/02/21",
			airingChannel: "乃木坂工事中 #348",
			releaseDate: "2022/03/23"
		},
		{
			num: 30,
			announcementDate: "2022/07/18",
			airingChannel: "乃木坂工事中 #369",
			releaseDate: "2022/08/31"
		},
		{
			num: 31,
			announcementDate: "2022/11/7",
			airingChannel: "乃木坂工事中 #385",
			releaseDate: "2022/12/7"
		},
		{
			num: 32,
			announcementDate: "2023/02/20",
			airingChannel: "乃木坂工事中 #399",
			releaseDate: "2023/03/29"
		},
		{
			num: 33,
			announcementDate: "2023/06/26",
			airingChannel: "乃木坂工事中 #417",
			releaseDate: "2023/08/23"
		},
		{
			num: 34,
			announcementDate: "2023/11/6",
			airingChannel: "乃木坂工事中 #436",
			releaseDate: "2023/12/6"
		},
		{
			num: 35,
			announcementDate: "2024/02/19",
			airingChannel: "乃木坂工事中 #450",
			releaseDate: "2024/04/10"
		},
		{
			num: 36,
			announcementDate: "2024/07/15",
			airingChannel: "乃木坂工事中 #471",
			releaseDate: "2024/08/21"
		},
		{
			num: 37,
			announcementDate: "2024/11/09",
			airingChannel: "240911 乃木坂配信中",
			releaseDate: "2024/12/11"
		},
		{
			num: 38,
			announcementDate: "2025/03/02",
			airingChannel: "乃木坂工事中 #503",
			releaseDate: "2025/03/26"
		}
	];


	// Function to format the date into Japanese format
	function formatDateToJapanese(dateStr) {
		const [year, month, day] = dateStr.split('/');
		return `${year}年${month}月${day}日`;
	}

	let imageUrls = [];
	for (let singleKey in singles) {
		let single = singles[singleKey];
		let members = [...single.members3rd, ...single.members2nd, ...single.members1st];

		members.forEach(member => {
			let imageUrl = photoMember.getPhotoUrl(singleKey, member);
			if (imageUrl) {
				imageUrls.push(imageUrl);
			}
		});
	}

	console.log(imageUrls);
	const senbatsuContainer = document.getElementById('senbatsuContainer');
	let previousMembers = {};
	for (let singleKey in singles) {
		const single = singles[singleKey];

		// Create the main ROW div
		const rowDiv = document.createElement('div');
		rowDiv.classList.add('row-container');
		// Use class for CSS if needed

		// Create the title and number div
		const titleDiv = document.createElement('div');
		titleDiv.classList.add('title-container');
		// CSS class for styling

		// Create span for the single number with the class "numbersbs"
		const singleNumberSpan = document.createElement('span');
		singleNumberSpan.classList.add('numbersbs');
		if (singleKey == 1) {
			singleNumberSpan.textContent = `デビュー`;
		} else {
			singleNumberSpan.textContent = `${singleKey}枚目`;
		}


		// Create span for the single title with the class "titlesbs"
		const singleTitleSpan = document.createElement('span');
		singleTitleSpan.classList.add('titlesbs');
		singleTitleSpan.textContent = `${single.singleTitle}`;

		// Append the number and title to the titleDiv
		titleDiv.appendChild(singleNumberSpan);
		titleDiv.appendChild(singleTitleSpan);

		// Append the titleDiv to the rowDiv
		rowDiv.appendChild(titleDiv);

		// Create the SUB-ROW div inside ROW for formation, total, generation, and member info
		const subRowDiv = document.createElement('div');
		subRowDiv.classList.add('sub-row');
		// Use class for CSS if needed
		const formationsDiv = document.createElement('div');
		formationsDiv.classList.add('formation');

		// Create a list of all members in the single
		const members = [...single.members3rd, ...single.members2nd, ...single.members1st];

		// Append the formations inside the SUB-ROW
		['members3rd', 'members2nd', 'members1st'].forEach(row => {
			const rowDiv = document.createElement('div');
			rowDiv.classList.add('row');
			single[row].forEach(member => {
				const memberPhotoUrl = photoMember.getPhotoUrl(singleKey, member);
				const memberSvgUrl = photoMember.getSvgUrl(member); // Get SVG URL

				const memberContainer = document.createElement('div');
				memberContainer.classList.add('member-container');

				// dynamic background and border color
				if (backgroundColorMemberCont[singleKey]) {
					memberContainer.style.backgroundColor = backgroundColorMemberCont[singleKey];
					memberContainer.style.borderColor = backgroundColorMemberCont[singleKey]; // Set border color
				} else {
					memberContainer.style.backgroundColor = "white";
					memberContainer.style.borderColor = "white"; // Default border color if not found
				}


				// add SVG logic
				if (memberSvgUrl) {
					const svgImg = document.createElement('img');
					svgImg.src = memberSvgUrl;
					svgImg.classList.add('svgmember');
					memberContainer.appendChild(svgImg); // Append SVG before photo
				}

				if (memberPhotoUrl) {
					const img = document.createElement('img');
					img.src = memberPhotoUrl;
					img.alt = member;
					img.classList.add('fotomember');

					// Check if member is a center (handling array case)
					if (Array.isArray(single.center)) {
						if (single.center.includes(member)) {
							img.classList.add('center');
						}
					} else if (member === single.center) {
						img.classList.add('center');
					}
					memberContainer.appendChild(img);
				} else {
					const memberDiv = document.createElement('div');
					memberDiv.textContent = member;
					memberContainer.appendChild(memberDiv);
				}
				// const memberNameDiv = document.createElement('div');
				// memberNameDiv.classList.add('member-name');
				// memberNameDiv.textContent = member;				
				// memberContainer.appendChild(memberNameDiv);


				rowDiv.appendChild(memberContainer);
			});
			formationsDiv.appendChild(rowDiv);
		});

		// Append wadahsenbaDiv after all rows are added
		const wadahsenbaDiv = document.createElement('div');
		wadahsenbaDiv.classList.add('wadahsenba');
		formationsDiv.appendChild(wadahsenbaDiv);

		subRowDiv.appendChild(formationsDiv);




		// Create and append the TOTAL and GENERATION info using the "info-group" structure
		const infoGroupDiv = document.createElement('div');
		infoGroupDiv.classList.add('info-datasingle');

		function calculateDateDifference(announcementDate, releaseDate) {
			const date1 = new Date(announcementDate);
			const date2 = new Date(releaseDate);
			const differenceInTime = date2.getTime() - date1.getTime();
			const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
			return differenceInDays;
		}

		// ANNOUNCESENBA and ANNOUNCEBANGUMI merged
		const announceDateDiv = document.createElement('div');
		announceDateDiv.classList.add('info-data-min');
		announceDateDiv.innerHTML = `
<div class="statusmember">選抜発表日</div>
<div class="info-item info-count">${formatDateToJapanese(singlerelease[singleKey - 1].announcementDate)}</div>
<div class="info-item info-count-mini">${singlerelease[singleKey - 1].airingChannel}</div>`;
		infoGroupDiv.appendChild(announceDateDiv);

		// DIFFERENCE table
		const differenceInDays = calculateDateDifference(singlerelease[singleKey - 1].announcementDate, singlerelease[singleKey - 1].releaseDate);
		const differenceDiv = document.createElement('div');
		differenceDiv.classList.add('info-data-min');
		differenceDiv.innerHTML = `
<div class="statusmember">日数の差</div>
<div class="info-item info-count">${differenceInDays}日</div>`;
		infoGroupDiv.appendChild(differenceDiv);

		// RELEASESINGLE (発売日)
		const releaseSingleDiv = document.createElement('div');
		releaseSingleDiv.classList.add('info-data-min');
		releaseSingleDiv.innerHTML = `
<div class="statusmember">発売日</div>
<div class="info-item info-count">${formatDateToJapanese(singlerelease[singleKey - 1].releaseDate)}</div>`;
		infoGroupDiv.appendChild(releaseSingleDiv);

		// Main info-group container
		const totalMembers = members.length;
		const genStats = {
			1: members.filter(member => generations[1].includes(member)).length,
			2: members.filter(member => generations[2].includes(member)).length,
			3: members.filter(member => generations[3].includes(member)).length,
			4: members.filter(member => generations[4].includes(member)).length,
			5: members.filter(member => generations[5].includes(member)).length,
			"兼": members.filter(member => generations.transfer.includes(member)).length
		};

		// Create and append the total number of members
		const totalDiv = document.createElement('div');
		totalDiv.classList.add('info-data-min');
		totalDiv.innerHTML = `<div class="statusmember">人数</div><div class="info-item info-count">${totalMembers}名</div>`;
		infoGroupDiv.appendChild(totalDiv);

		// Append generation information based on non-zero counts
		for (let genKey in genStats) {
			if (genStats[genKey] > 0) {
				const genDiv = document.createElement('div');
				genDiv.classList.add('info-data-min');
				genDiv.innerHTML = `<div class="statusmember">${genKey}期</div><div class="info-item info-count">${genStats[genKey]}名</div>`;
				infoGroupDiv.appendChild(genDiv);
			}
		}
		subRowDiv.appendChild(infoGroupDiv);



		// Create and append the SINGLE CREATOR info using the "info-group" structure
		const infoSingleDiv = document.createElement('div');
		infoSingleDiv.classList.add('info-datasingle');

		// Function to append a data block
		function appendInfoData(title, content) {
			const infoDataDiv = document.createElement('div');
			infoDataDiv.classList.add('info-data');
			infoDataDiv.innerHTML = `<div class="statusmember">${title}</div><div class="info-item info-count">${content}</div>`;
			infoSingleDiv.appendChild(infoDataDiv);
		}

		// Retrieve SingleCreator data based on singleKey
		const singleCreatorData = SingleCreator[singleKey];

		appendInfoData('作詞', singleCreatorData.SgLyrics);
		appendInfoData('編曲', singleCreatorData.SgArranger);
		appendInfoData('作曲', singleCreatorData.SgComposer);
		appendInfoData('MV監督', singleCreatorData.SgMVDirector);
		appendInfoData('振付師', singleCreatorData.SgMVChoreo);
		subRowDiv.appendChild(infoSingleDiv);



		// Append the HATSU, OCHI, and KAERI info after the TOTAL and GENERATION info
		const hatsu = [];
		const ochi = [];
		const kaeri = [];
		members.forEach(member => {
			if (!(member in previousMembers)) {
				hatsu.push(member);
			} else if (previousMembers[member] < singleKey - 1) {
				kaeri.push({
					name: member,
					lastSingle: previousMembers[member]
				});
			}
		});
		for (let member in previousMembers) {
			if (!members.includes(member) && previousMembers[member] == singleKey - 1) {
				ochi.push(member);
			}
		}

		// Ensure graduated members are removed from future singles
		let graduatedMembers = [];
		if (memberGrad[singleKey]) {
			const grads = Array.isArray(memberGrad[singleKey]) ? memberGrad[singleKey] : [memberGrad[singleKey]];
			grads.forEach(gradMember => {
				graduatedMembers.push(gradMember);
				delete previousMembers[gradMember];
				// Remove from future OCHI checks
			});
		}

		// ----------------------------------
		// Info member HATSU
		// ----------------------------------
		const hatsuDiv = document.createElement('div');
		hatsuDiv.classList.add('info-group');
		hatsuDiv.innerHTML = `<div class="statusmember">初選抜</div>`;
		const hatsuItem = document.createElement('div');
		hatsuItem.classList.add('info-item');
		if (hatsu.length) {
			hatsu.forEach(member => {
				const memberPhotoUrl = photoMember.getPhotoUrl(singleKey, member);
				const memberContainer = document.createElement('div');
				memberContainer.classList.add('member-container');
				if (memberPhotoUrl) {
					const img = document.createElement('img');
					img.src = memberPhotoUrl;
					img.alt = member;
					memberContainer.appendChild(img);
				}
				hatsuItem.appendChild(memberContainer);
			});
		} else {
			hatsuItem.innerHTML = `<div class="itemnashi">なし</div>`;
		}
		hatsuDiv.appendChild(hatsuItem);


		// ----------------------------------
		// Info member OCHI
		// ----------------------------------		
		const ochiDiv = document.createElement('div');
		ochiDiv.classList.add('info-group');
		ochiDiv.innerHTML = `<div class="statusmember">選抜落ち</div>`;
		const ochiItem = document.createElement('div');
		ochiItem.classList.add('info-item');

		// Filter OCHI members who have graduated in previous singles
		const filteredOchi = ochi.filter(member => {

			// Check all previous singles to see if the member graduated
			for (let gradSingleKey in memberGrad) {
				const gradMembers = Array.isArray(memberGrad[gradSingleKey]) ? memberGrad[gradSingleKey] : [memberGrad[gradSingleKey]];
				if (gradMembers.includes(member) && gradSingleKey <= singleKey) {
					return false;
					// Member has graduated, don't include them in OCHI
				}
			}
			return true;
			// Member has not graduated, include them in OCHI
		});
		if (filteredOchi.length) {
			filteredOchi.forEach(member => {
				const memberPhotoUrl = photoMember.getPhotoUrl(singleKey, member);
				const memberContainer = document.createElement('div');
				memberContainer.classList.add('member-container');
				if (memberPhotoUrl) {
					const img = document.createElement('img');
					img.src = memberPhotoUrl;
					img.alt = member;
					memberContainer.appendChild(img);
				}
				ochiItem.appendChild(memberContainer);
			});
		} else {
			ochiItem.innerHTML = `<div class="itemnashi">なし</div>`;
		}
		ochiDiv.appendChild(ochiItem);


		// ----------------------------------
		// Info member KAERI
		// ----------------------------------	
		const kaeriDiv = document.createElement('div');
		if (singleKey > 2) {
			// KAERI only applies from the 3rd single onward
			kaeriDiv.classList.add('info-group');
			kaeriDiv.innerHTML = `<div class="statusmember">選抜復帰</div>`;
			const kaeriItem = document.createElement('div');
			kaeriItem.classList.add('info-item');
			if (kaeri.length) {
				kaeri.forEach(member => {
					const memberPhotoUrl = photoMember.getPhotoUrl(singleKey, member.name);
					const memberContainer = document.createElement('div');
					memberContainer.classList.add('member-container');
					if (memberPhotoUrl) {
						const img = document.createElement('img');
						img.src = memberPhotoUrl;
						img.alt = member.name;
						img.classList.add('kaeri-member');

						// Add last single number [X] before the photo
						const lastSingleNumber = document.createElement('span');
						lastSingleNumber.textContent = `${member.lastSingle}`;
						lastSingleNumber.classList.add('last-single-number');
						memberContainer.appendChild(lastSingleNumber);
						memberContainer.appendChild(img);
					}
					kaeriItem.appendChild(memberContainer);
				});
			} else {
				kaeriItem.innerHTML = `<div class="itemnashi">なし</div>`;
			}
			kaeriDiv.appendChild(kaeriItem);
		}

		// ----------------------------------
		// Info member GRAD
		// ----------------------------------	
		const gradDiv = document.createElement('div');
		gradDiv.classList.add('info-group');
		gradDiv.innerHTML = `<div class="statusmember">卒業</div>`;
		const gradItem = document.createElement('div');
		gradItem.classList.add('info-item');
		if (graduatedMembers.length) {
			graduatedMembers.forEach(gradMember => {
				const gradPhotoUrl = photoMember.getPhotoUrl(singleKey, gradMember);
				const gradContainer = document.createElement('div');
				gradContainer.classList.add('member-container');
				if (gradPhotoUrl) {
					const img = document.createElement('img');
					img.src = gradPhotoUrl;
					img.alt = gradMember;
					gradContainer.appendChild(img);
				}
				gradItem.appendChild(gradContainer);
			});
		} else {
			// Set display: none when there are no graduated members
			gradDiv.style.display = 'none';
		}
		gradDiv.appendChild(gradItem);

		// ----------------------------------
		// Info member MADAMADA (HiatusMadamada)
		// ----------------------------------
		const madamadaDiv = document.createElement('div');
		madamadaDiv.classList.add('info-group');
		madamadaDiv.innerHTML = `<div class="statusmember">不参加</div>`;
		const madamadaItem = document.createElement('div');
		madamadaItem.classList.add('info-item');
		if (HiatusMadamada[singleKey]) {
			const member = HiatusMadamada[singleKey];
			const memberPhotoUrl = photoMember.getPhotoUrl(singleKey, member);
			const memberContainer = document.createElement('div');
			memberContainer.classList.add('member-container');
			if (memberPhotoUrl) {
				const img = document.createElement('img');
				img.src = memberPhotoUrl;
				img.alt = member;
				memberContainer.appendChild(img);
			}
			madamadaItem.appendChild(memberContainer);
		} else {
			madamadaDiv.style.display = 'none';
		}
		madamadaDiv.appendChild(madamadaItem);

		// ----------------------------------
		// Info member TUKAR (TransferMember)
		// ----------------------------------
		const tukarDiv = document.createElement('div');
		tukarDiv.classList.add('info-group');
		tukarDiv.innerHTML = `<div class="statusmember">交換留学生</div>`;
		const tukarItem = document.createElement('div');
		tukarItem.classList.add('info-item');
		if (TransferMember[singleKey]) {
			const member = TransferMember[singleKey];
			const memberPhotoUrl = photoMember.getPhotoUrl(singleKey, member);
			const memberContainer = document.createElement('div');
			memberContainer.classList.add('member-container');
			if (memberPhotoUrl) {
				const img = document.createElement('img');
				img.src = memberPhotoUrl;
				img.alt = member;
				memberContainer.appendChild(img);
			}
			tukarItem.appendChild(memberContainer);
		} else {
			tukarDiv.style.display = 'none';
		}
		tukarDiv.appendChild(tukarItem);

		// ----------------------------------
		// Info member TIDAKIKUT (HiatusNotParticipate)
		// ----------------------------------
		const tidakIkutDiv = document.createElement('div');
		tidakIkutDiv.classList.add('info-group');
		tidakIkutDiv.innerHTML = `<div class="statusmember">休業中</div>`;
		const tidakIkutItem = document.createElement('div');
		tidakIkutItem.classList.add('info-item');
		if (HiatusNotParticipate[singleKey]) {
			const member = HiatusNotParticipate[singleKey];
			const memberPhotoUrl = photoMember.getPhotoUrl(singleKey, member);
			const memberContainer = document.createElement('div');
			memberContainer.classList.add('member-container');
			if (memberPhotoUrl) {
				const img = document.createElement('img');
				img.src = memberPhotoUrl;
				img.alt = member;
				memberContainer.appendChild(img);
			}
			tidakIkutItem.appendChild(memberContainer);
		} else {
			tidakIkutDiv.style.display = 'none';
		}
		tidakIkutDiv.appendChild(tidakIkutItem);

		// ----------------------------------
		// Info member SAKIT (HiatusSick)
		// ----------------------------------
		const sakitDiv = document.createElement('div');
		sakitDiv.classList.add('info-group');
		sakitDiv.innerHTML = `<div class="statusmember">体調不良</div>`;
		const sakitItem = document.createElement('div');
		sakitItem.classList.add('info-item');
		if (HiatusSick[singleKey]) {
			const sickMembers = Array.isArray(HiatusSick[singleKey]) ? HiatusSick[singleKey] : [HiatusSick[singleKey]];
			sickMembers.forEach(member => {
				const memberPhotoUrl = photoMember.getPhotoUrl(singleKey, member);
				const memberContainer = document.createElement('div');
				memberContainer.classList.add('member-container');
				if (memberPhotoUrl) {
					const img = document.createElement('img');
					img.src = memberPhotoUrl;
					img.alt = member;
					memberContainer.appendChild(img);
				}
				sakitItem.appendChild(memberContainer);
			});
		} else {
			sakitDiv.style.display = 'none';
		}
		sakitDiv.appendChild(sakitItem);



		const infoDiv = document.createElement('div');
		infoDiv.classList.add('flex-container');
		if (singleKey > 2) {
			infoDiv.appendChild(hatsuDiv);
			infoDiv.appendChild(ochiDiv);
			infoDiv.appendChild(kaeriDiv);
			infoDiv.appendChild(gradDiv);
		}
		infoDiv.appendChild(madamadaDiv);
		if (singleKey > 2) {
			infoDiv.appendChild(tukarDiv);
			infoDiv.appendChild(tidakIkutDiv);
			infoDiv.appendChild(sakitDiv);
		}
		subRowDiv.appendChild(infoDiv);

		// Append the subRowDiv to the main rowDiv
		rowDiv.appendChild(subRowDiv);

		// Finally, append the rowDiv to the senbatsuContainer
		senbatsuContainer.appendChild(rowDiv);

		// Update previousMembers for tracking members in future singles
		members.forEach(member => {
			previousMembers[member] = singleKey;
		});
	}
});


document.addEventListener("DOMContentLoaded", function() {
	const rowContainers = document.querySelectorAll(".row-container");
	let currentSlide = 0;

	// Initially hide all slides except the first one
	rowContainers.forEach((row, index) => {
		if (index !== currentSlide) {
			row.style.display = "none";
		}
	});

	// Function to show a specific slide
	function showSlide(index) {
		// Hide all slides
		rowContainers.forEach((row) => row.style.display = "none");
		// Show the desired slide
		rowContainers[index].style.display = "flex";

		// Apply the 'scaleboom' animation to the titlesbs
		const title = rowContainers[index].querySelector('.titlesbs');
		title.style.animation = 'scaleboom 0.6s ease forwards';

		// Once the 'scaleboom' animation is done, apply 'bumbum' to each member-container
		setTimeout(() => {
			const memberContainers = rowContainers[index].querySelectorAll('.row .member-container');
			memberContainers.forEach((member, i) => {
				member.style.animation = `bumbum 0.8s ease forwards ${0 + i * 0.1}s`;
				member.style.display = 'block'; // Ensure it becomes visible during animation
			});
		}, 600); // Delay after scaleboom finishes
	}

	// Next and previous controls
	function plusSlides(n) {
		currentSlide += n;
		if (currentSlide >= rowContainers.length) currentSlide = 0; // Loop to first
		if (currentSlide < 0) currentSlide = rowContainers.length - 1; // Loop to last
		showSlide(currentSlide);
	}

	// Attach event listeners to the buttons
	document.querySelector(".next").addEventListener("click", () => plusSlides(1));
	document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));

	// Show the first slide initially
	showSlide(currentSlide);
});