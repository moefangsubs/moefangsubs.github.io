document.addEventListener("DOMContentLoaded", function() {
    const baseUrl = "https://ik.imagekit.io/moearchive/calendar"; 
    const defaultBoxNameClass = "boxname";

    // Mapping warna detailDiv ke rotStick
    const penlightMap = {
        dred: 'pred',
        dpurple: 'ppurple',
        dsakura: 'ppink1',	
        dsakupink: 'psakuralight',
        dpink: 'ppink2',
        dpinkhot: 'ppink2',
        dpinkpassion: 'ppinkpassion',
        dblue: 'pblue',		
        dbluelight: 'pbluelight',
        dbluepastel: 'pbluepastel',
        dyellow: 'pyellow',
        dwhite: 'pwhite',
        dblack: 'pblack',
        dgreen: 'pgreen',
        dgreenlight: 'pgreenlight',
        dorange: 'porange',
        dturqoise: 'pturqoise',
        dgreenpea: 'pgreenpea',
        dgreenpearl: 'pgreenpearl',
        dgreenemerald: 'pgreenemerald',	
        dviolet: 'pviolet',
		
        dxxx: 'pxxx',
    };

    // Mapping member -> info tambahan (romaji, gen, filename, subfolder)
    const memberGenMap = {
        nogizaka46: {
			"伊藤理々杏"	: ["Ito Riria", "gen3", "itouriria", "nogi38"],
			"岩本蓮加"	: ["Iwamoto Renka", "gen3", "iwamotorenka", "nogi38"],
			"梅澤美波"	: ["Umezawa Minami", "gen3", "umezawaminami", "nogi38"],
			"久保史緒里"	: ["Kubo Shiori", "gen3", "kuboshiori", "nogi38"],
			"吉田綾乃"	: ["Yoshida Ayano", "gen3", "yoshidaayanochristie", "nogi38"],
			
			"遠藤さくら"	: ["Endo Sakura", "gen4", "endousakura", "nogi38"],
			"賀喜遥香"	: ["Kaki Haruka", "gen4", "kakiharuka", "nogi38"],
			"金川紗耶"	: ["Kanagawa Saya", "gen4", "kanagawasaya", "nogi38"],
			"黒見明香"	: ["Kuromi Haruka", "gen4", "kuromiharuka", "nogi38"],
			"佐藤璃果"	: ["Sato Rika", "gen4", "satourika", "nogi38"],
			"柴田柚菜"	: ["Shibata Yuna", "gen4", "shibatayuna", "nogi38"],
			"田村真佑"	: ["Tamura Mayu", "gen4", "tamuramayu", "nogi38"],
			"筒井あやめ"	: ["Tsutsui Ayame", "gen4", "tsutsuiayame", "nogi38"],
			"林瑠奈"		: ["Hayashi Runa", "gen4", "hayashiruna", "nogi38"],
			"松尾美佑"	: ["Matsuo Miyu", "gen4", "matsuomiyu", "nogi38"],
			"矢久保美緒"	: ["Yakubo Mio", "gen4", "yakubomio", "nogi38"],
			"弓木奈於"	: ["Yumiki Nao", "gen4", "yumikinao", "nogi38"],
			
			"五百城茉央"	: ["Ioki Mao", "gen5", "iokimao", "nogi38"],
			"池田瑛紗"	: ["Ikeda Teresa", "gen5", "ikedateresa", "nogi38"],
			"一ノ瀬美空"	: ["Ichinose Miku", "gen5", "ichinosemiku", "nogi38"],
			"井上和"		: ["Inoue Nagi", "gen5", "inouenagi", "nogi38"],
			"岡本姫奈"	: ["Okamoto Hina", "gen5", "okamotohina", "nogi38"],
			"小川彩"		: ["Ogawa Aya", "gen5", "ogawaaya", "nogi38"],
			"奥田いろは"	: ["Okuda Iroha", "gen5", "okudairoha", "nogi38"],
			"川﨑桜"		: ["Kawasaki Sakura", "gen5", "kawasakisakura", "nogi38"],
			"菅原咲月"	: ["Sugawara Satsuki", "gen5", "sugawarasatsuki", "nogi38"],
			"冨里奈央"	: ["Tomisato Nao", "gen5", "tomisatonao", "nogi38"],
			"中西アルノ"	: ["Nakanishi Aruno", "gen5", "nakanishiaruno", "nogi38"],
			
			"愛宕心響"	: ["Atago Kokone", "gen6", "atagokokone", "nogi38"],
			"大越ひなの"	: ["Okoshi Hinano", "gen6", "ookoshihinano", "nogi38"],
			"小津玲奈"	: ["Ozu Reina", "gen6", "ozureina", "nogi38"],
			"海邉朱莉"	: ["Kaibe Akari", "gen6", "kaibeakari", "nogi38"],
			"川端晃菜"	: ["Kawabata Hina", "gen6", "kawabatahina", "nogi38"],
			"鈴木佑捺"	: ["Suzuki Yuuna", "gen6", "suzukiyuuna", "nogi38"],
			"瀬戸口心月"	: ["Setoguchi Mitsuki", "gen6", "setoguchimitsuki", "nogi38"],
			"長嶋凛桜"	: ["Nagashima Rio", "gen6", "nagashimario", "nogi38"],
			"増田三莉音"	: ["Masuda Mirine", "gen6", "masudamirine", "nogi38"],
			"森平麗心"	: ["Morihira Urumi", "gen6", "morihiraurumi", "nogi38"],
			"矢田萌華"	: ["Yada Moeka", "gen6", "yadamoeka", "nogi38"],
			
			"伊藤寧々"	: ["Ito Nene", "noog", "itounene", "grad"],
			"大和里菜"	: ["Yamato Rina", "noog", "yamatorina", "grad"],
			"畠中清羅"	: ["Hatanaka Seira", "noog", "hatanakaseira", "grad"],
			"松井玲奈"	: ["Matsui Rena", "noog", "matsuirena", "grad"],
			"永島聖羅"	: ["Nagashima Seira", "noog", "nagashimaseira", "grad"],
			"深川麻衣"	: ["Fukagawa Mai", "noog", "fukagawamai", "grad"],
			"橋本奈々未"	: ["Hashimoto Nanami", "noog", "hashimotonanami", "grad"],
			"伊藤万理華"	: ["Ito Marika", "noog", "itoumarika", "grad"],
			"中元日芽香"	: ["Nakamoto Himeka", "noog", "nakamotohimeka", "grad"],
			"川村真洋"	: ["Kawamura Mahiro", "noog", "kawamuramahiro", "grad"],
			"生駒里奈"	: ["Ikoma Rina", "noog", "ikomarina", "grad"],
			"斎藤ちはる"	: ["Saito Chiharu", "noog", "saitouchiharu", "grad"],
			"相楽伊織"	: ["Iori Sagara", "noog", "iorisagara", "grad"],
			"若月佑美"	: ["Wakatsuki Yumi", "noog", "wakatsukiyumi", "grad"],
			"能條愛未"	: ["Noujo Ami", "noog", "noujoami", "grad"],
			"川後陽菜"	: ["Kawago Hina", "noog", "kawagohina", "grad"],
			"西野七瀬"	: ["Nishino Nanase", "noog", "nishinonanase", "grad"],
			"衛藤美彩"	: ["Eto Misa", "noog", "etoumisa", "grad"],
			"伊藤かりん"	: ["Ito Karin", "noog", "itoukarin", "grad"],
			"斉藤優里"	: ["Saito Yuuri", "noog", "saitouyuri", "grad"],
			"桜井玲香"	: ["Sakurai Reika", "noog", "sakuraireika", "grad"],
			"佐々木琴子"	: ["Sasaki Kotoko", "noog", "sasakikotoko", "grad"],
			"井上小百合"	: ["Inoue Sayuri", "noog", "inouesayuri", "grad"],
			"中田花奈"	: ["Nakada Kana", "noog", "nakadakana", "grad"],
			"白石麻衣"	: ["Shiraishi Mai", "noog", "shiraishimai", "grad"],
			"堀未央奈"	: ["Hori Miona", "noog", "horimiona", "grad"],
			"松村沙友理"	: ["Matsumura Sayuri", "noog", "matsumurasayuri", "nogi27"],
			"伊藤純奈"	: ["Ito Junna", "noog", "itoujunna", "nogi27"],
			"渡辺みり愛"	: ["Watanabe Miria", "noog", "watanabemiria", "nogi27"],
			"大園桃子"	: ["Ozono Momoko", "noog", "oozonomomoko", "nogi27"],
			"高山一実"	: ["Takayama Kazumi", "noog", "takayamakazumi", "nogi28"],
			"寺田蘭世"	: ["Terada Ranze", "noog", "teradaranze", "nogi28"],
			"生田絵梨花"	: ["Ikuta Erika", "noog", "ikutaerika", "nogi28"],
			"新内眞衣"	: ["Shinuchi Mai", "noog", "shinuchimai", "nogi28"],
			"星野みなみ"	: ["Hoshino Minami", "noog", "hoshinominami", "nogi28"],
			"北野日奈子"	: ["Kitano Hinako", "noog", "kitanohinako", "nogi28"],
			"山崎怜奈"	: ["Yamazaki Rena", "noog", "yamazakirena", "nogi28"],
			"和田まあや"	: ["Wada Maaya", "noog", "wadamaaya", "nogi28"],
			"樋口日奈"	: ["Higuchi Hina", "noog", "higuchihina", "nogi28"],
			"秋元真夏"	: ["Akimoto Manatsu", "noog", "akimotomanatsu", "nogi31"],
			"鈴木絢音"	: ["Suzuki Ayane", "noog", "suzukiayane", "nogi31"],
			"齋藤飛鳥"	: ["Saito Asuka", "noog", "saitouasuka", "nogi31"],
			"北川悠理"	: ["Kitagawa Yuri", "noog", "kitagawayuri", "nogi31"],
			"早川聖来"	: ["Hayakawa Seira", "noog", "hayakawaseira", "nogi31"],
			"山下美月"	: ["Yamashita Mizuki", "noog", "yamashitamizuki", "nogi35"],
			"阪口珠美"	: ["Sakaguchi Tamami", "noog", "sakaguchitamami", "nogi35"],
			"清宮レイ"		: ["Seimiya Rei", "noog", "seimiyarei", "nogi35"],
			"掛橋沙耶香"	: ["Kakehashi Sayaka", "noog", "kakehashisayaka", "nogi36"],
			"向井葉月"	: ["Mukai Hazuki", "noog", "mukaihazuki", "nogi36"],
			"与田祐希"	: ["Yoda Yuuki", "noog", "yodayuuki", "nogi36"],
			"佐藤楓"		: ["Sato Kaede", "noog", "satoukaede", "nogi38"],
			"中村麗乃"	: ["Nakamura Reno", "noog", "nakamurareno", "nogi36"]
        },
		sakurazaka46: {
			"井上梨名"	: ["Inoue Rina", "gen2", "inouerina", "saku11"],
			"遠藤光莉"	: ["Endo Hikari", "gen2", "endouhikari", "saku11"],
			"大園玲"		: ["Ozono Rei", "gen2", "oozonorei", "saku11"],
			"大沼晶保"	: ["Onuma Akiho", "gen2", "oonumaakiho", "saku11"],
			"幸阪茉里乃"	: ["Kousaka Marino", "gen2", "kousakamarino", "saku11"],
			"武元唯衣"	: ["Takemoto Yui", "gen2", "takemotoyui", "saku11"],
			"田村保乃"	: ["Tamura Hono", "gen2", "tamurahono", "saku11"],
			"藤吉夏鈴"	: ["Fujiyoshi Karin", "gen2", "fujiyoshikarin", "saku11"],
			"増本綺良"	: ["Masumoto Kira", "gen2", "masumotokira", "saku11"],
			"松田里奈"	: ["Matsuda Rina", "gen2", "matsudarina", "saku11"],
			"森田ひかる"	: ["Morita Hikaru", "gen2", "moritahikaru", "saku11"],
			"守屋麗奈"	: ["Moriya Rena", "gen2", "moriyarena", "saku11"],
			"山﨑天"		: ["Yamasaki Ten", "gen2", "yamasakiten", "saku11"],
			
			"石森璃花"	: ["Ishimori Rika", "gen3", "ishimoririka", "saku11"],
			"遠藤理子"	: ["Endo Riko", "gen3", "endouriko", "saku11"],
			"小田倉麗奈"	: ["Odakura Reina", "gen3", "odakurareina", "saku11"],
			"小島凪紗"	: ["Kojima Nagisa", "gen3", "kojimanagisa", "saku11"],
			"谷口愛季"	: ["Taniguchi Airi", "gen3", "taniguchiairi", "saku11"],
			"中嶋優月"	: ["Nakashima Yuzuki", "gen3", "nakashimayuzuki", "saku11"],
			"的野美青"	: ["Matono Mio", "gen3", "matonomio", "saku11"],
			"向井純葉"	: ["Mukai Itoha", "gen3", "mukaiitoha", "saku11"],
			"村井優"		: ["Murai Yuu", "gen3", "muraiyuu", "saku11"],
			"村山美羽"	: ["Murayama Miu", "gen3", "murayamamiu", "saku11"],
			"山下瞳月"	: ["Yamashita Shizuki", "gen3", "yamashitashizuki", "saku11"],
			
			"浅井恋乃未"	: ["Asai Konomi", "gen4", "asaikonomi", "saku4"],
			"稲熊ひな"	: ["Inaguma Hina", "gen4", "inagumahina", "saku4"],
			"勝又春"		: ["Katamata Haru", "gen4", "katamatamaru", "saku4"],
			"佐藤愛桜"	: ["Sato Neo", "gen4", "satouneo", "saku4"],
			"中川智尋"	: ["Nakagawa Chihiro", "gen4", "nakagawachihiro", "saku4"],
			"松本和子"	: ["Matsumoto Wako", "gen4", "matsumotowako", "saku4"],
			"目黒陽色"	: ["Meguro Hiiro", "gen4", "megurohiiro", "saku4"],
			"山川宇衣"	: ["Yamakawa Ui", "gen4", "yamakawaui", "saku4"],
			"山田桃実"	: ["Yamada Momomi", "gen4", "yamadamomomi", "saku4"],
			
			"今泉佑唯"	: ["Imaizumi Yui", "kyog", "imaizumiyui", "grad"],
			"志田愛佳"	: ["Shida Manaka", "kyog", "shidamanaka", "grad"],
			"米谷奈々未"	: ["Yonetani Nanami", "kyog", "yonetaninanami", "grad"],
			"長濱ねる"	: ["Nagahama Neru", "kyog", "nagahamaneru", "grad"],
			"織田奈那"	: ["Oda Nana", "kyog", "odanana", "grad"],
			"鈴本美愉"	: ["Suzumoto Miyu", "kyog", "suzumotomiyu", "grad"],
			"平手友梨奈"	: ["Hirate Yurina", "kyog", "hirateyurina", "grad"],
			"長沢菜々香"	: ["Nagasawa Nanako", "kyog", "nagasawananako", "grad"],
			"石森虹花"	: ["Ishimori Nijika", "kyog", "ishimorinijika", "grad"],
			"佐藤詩織"	: ["Sato Shiori", "kyog", "satoshiori", "grad"],
			"松平璃子"	: ["Matsudaira Riko", "sakog", "matsudairariko", "grad"],
			"守屋茜"		: ["Moriya Akane", "sakog", "moriyaakane", "saku3"],
			"渡辺梨加"	: ["Watanabe Rika", "sakog", "watanaberika", "saku3"],
			"渡邉理佐"	: ["Watanabe Risa", "sakog", "watanaberisa", "saku4"],
			"原田葵"		: ["Harada Aoi", "sakog", "haradaaoi", "saku4"],
			"尾関梨香"	: ["Ozeki Rika", "sakog", "ozekirika", "sakualb1"],
			"関有美子"	: ["Seki Yumiko", "sakog", "sekiyumiko", "saku5"],
			"菅井友香"	: ["Sugai Yuuka", "sakog", "sugaiyuuka", "sakualb1"],
			"土生瑞穂"	: ["Habu Mizuho", "sakog", "habumizuho", "saku6fix"],
			"小林由依"	: ["Kobayashi Yui", "sakog", "kobayashiyui", "saku6fix"],
			"齋藤冬優花"	: ["Saito Fuyuka", "sakog", "saitoufuyuka", "saku9"],
			"上村莉菜"	: ["Uemura Rina", "sakog", "uemurarina", "saku9"],
			"小池美波"	: ["Koike Minami", "sakog", "koikeminami", "saku9"]
		},
		hinatazaka46: {
			"金村美玖"	: ["Kanemura Miku", "gen2", "kanemuramiku", "hinata14"],
			"河田陽菜"	: ["Kawata Hina", "gen2", "kawatahina", "hinata14"],
			"小坂菜緒"	: ["Kosaka Nao", "gen2", "kosakanao", "hinata14"],
			"松田好花"	: ["Matsuda Konoka", "gen2", "matsudakonoka", "hinata14"],
			
			"上村ひなの"	: ["Kamimura Hinano", "gen3", "kamimurahinano", "hinata14"],
			"髙橋未来虹"	: ["Takahashi Mikuni", "gen3", "takahashimikuni", "hinata14"],
			"森本茉莉"	: ["Morimoto Marii", "gen3", "morimotomarii", "hinata14"],
			"山口陽世"	: ["Yamaguchi Haruyo", "gen3", "yamaguchiharuyo", "hinata14"],
			
			"石塚瑶季"	: ["Ishizuka Tamaki", "gen4", "ishizukatamaki", "hinata14"],
			"小西夏菜実"	: ["Konishi Minami", "gen4", "konishinanami", "hinata14"],
			"清水理央"	: ["Shimizu Rio", "gen4", "shimizurio", "hinata14"],
			"正源司陽子"	: ["Shogenji Yoko", "gen4", "shogenjiyoko", "hinata14"],
			"竹内希来里"	: ["Takeuchi Kirari", "gen4", "takeuchikirari", "hinata14"],
			"平尾帆夏"	: ["Hirao Honoka", "gen4", "hiraohonoka", "hinata14"],
			"平岡海月"	: ["Hiraoka Mitsuki", "gen4", "hiraokamitsuki", "hinata14"],
			"藤嶌果歩"	: ["Fujishi Makaho", "gen4", "fujishimakaho", "hinata14"],
			"宮地すみれ"	: ["Miyachi Sumire", "gen4", "miyachisumire", "hinata14"],
			"山下葉留花"	: ["Yamashita Haruka", "gen4", "yamashitaharuka", "hinata14"],
			"渡辺莉奈"	: ["Watanabe Rina", "gen4", "watanaberina", "hinata14"],

			"大田美月"	: ["Ota Mizuki", "gen5", "ootamizuki", "hinata14"],
			"大野愛実"	: ["Ono Manami", "gen5", "oonomanami", "hinata14"],
			"片山紗希"	: ["Katayama Saki", "gen5", "katayamasaki", "hinata14"],
			"蔵盛妃那乃"	: ["Kuramori Hinano", "gen5", "kuramorihinano", "hinata14"],
			"坂井新奈"	: ["Sakai Niina", "gen5", "sakainiina", "hinata14"],
			"佐藤優羽"	: ["Sato Yuu", "gen5", "satouyuu", "hinata14"],
			"下田衣珠季"	: ["Shimoda Izuki", "gen5", "shimodaizuki", "hinata14"],
			"高井俐香"	: ["Takai Rika", "gen5", "takairika", "hinata14"],
			"鶴崎仁香"	: ["Tsurusaki Niko", "gen5", "tsurusakiniko", "hinata14"],
			"松尾桜"		: ["Matsuo Sakura", "gen5", "matsuosakura", "hinata14"],
			
			"井口眞緒"	: ["Iguchi Mao", "hinog", "iguchimao", "grad"],
			"柿崎芽実"	: ["Kakizaki Memi", "hinog", "kakizakimemi", "grad"],
			"渡邉美穂"	: ["Watanabe Miho", "hinog", "watanabemiho", "hinata7"],
			"宮田愛萌"	: ["Miyata Manamo", "hinog", "miyatamanamo", "hinata7"],
			"影山優佳"	: ["Kageyama Yuuka", "hinog", "kageyamayuuka", "hinata9"],
			"岸帆夏"		: ["Kishi Honoka", "hinog", "kishihonoka", "hinata10"],
			"潮紗理菜"	: ["Ushio Sarina", "hinog", "ushiosarina", "hinata10"],
			"齊藤京子"	: ["Saito Kyoko", "hinog", "saitokyoko", "hinata10"],
			"高本彩花"	: ["Takamoto Ayaka", "hinog", "takamotoayaka", "hinata11"],
			"丹生明里"	: ["Nibu Akari", "hinog", "nibuakari", "hinata12"],
			"濱岸ひより"	: ["Hamagishi Hiyori", "hinog", "hamagishihiyori", "hinata12"],
			"加藤史帆"	: ["Kato Shiho", "hinog", "katoshiho", "hinata12"],
			"東村芽依"	: ["Higashimura Mei", "hinog", "higashimuramei", "hinata12"],
			"佐々木久美"	: ["Sasaki Kumi", "hinog", "sasakikumi", "hinata13"],
			"佐々木美玲"	: ["Sasaki Mirei", "hinog", "sasakimirei", "hinata13"],
			"高瀬愛奈"	: ["Takase Mana", "hinog", "takasemana", "hinata13"],
			"富田鈴花"	: ["Tomita Suzuka", "hinog", "tomitasuzuka", "hinata13"]
		}
    };

    // Grup dan mapping class gen
    const groupGenMap = {
        nogizaka46: {
            gen3: { containerClass: "pgen3", boxClass: "ngen3" },
            gen4: { containerClass: "pgen4", boxClass: "ngen4" },
            gen5: { containerClass: "pgen5", boxClass: "ngen5" },
            gen6: { containerClass: "pgen6", boxClass: "ngen6" },
            noog: { containerClass: "pnoog", boxClass: "nnoog" }
        },
        sakurazaka46: {
            gen2: { containerClass: "sgen2", boxClass: "stextgen2" },
            gen3: { containerClass: "sgen3", boxClass: "stextgen3" },
            gen4: { containerClass: "sgen4", boxClass: "stextgen4" },
            kyog: { containerClass: "kykog", boxClass: "ktextog" },
            sakog: { containerClass: "sakog", boxClass: "stextog" }
        },
        hinatazaka46: {
            gen2: { containerClass: "hgen2", boxClass: "htextgen2" },
            gen3: { containerClass: "hgen3", boxClass: "htextgen3" },
            gen4: { containerClass: "hgen4", boxClass: "htextgen4" },
            gen5: { containerClass: "hgen5", boxClass: "htextgen5" },
            hinog: { containerClass: "hinog", boxClass: "htextog" }
        }
    };

    // Default config untuk semua member
    const defaultMember = {
        containerClass: "stickmember",
        imgPic: {
            id: "picmember"
        }
    };

    // Struktur data utama
	const membersData = {
		nogizaka46: {
			gen3: [
				{ name: "伊藤理々杏", detailDiv	: ["dred", "dpurple"] },
				{ name: "岩本蓮加", detailDiv	: ["dred", "dsakura"] },
				{ name: "梅澤美波", detailDiv	: ["dbluelight", "dblue"] },
				{ name: "久保史緒里", detailDiv	: ["dbluelight", "dyellow"] },
				{ name: "吉田綾乃", detailDiv	: ["dred", "dpurple"] }
			],
			gen4: [
				{ name: "遠藤さくら", detailDiv	: ["dsakura", "dwhite"] },
				{ name: "賀喜遥香", detailDiv	: ["dorange", "dgreen"] },
				{ name: "金川紗耶", detailDiv	: ["dbluelight", "dred"] },
				{ name: "黒見明香", detailDiv	: ["dpurple", "dgreen"] },
				{ name: "佐藤璃果", detailDiv	: ["dsakura", "dturqoise"] },
				{ name: "柴田柚菜", detailDiv	: ["dblue", "dgreenpea"] },
				{ name: "田村真佑", detailDiv	: ["dbluelight", "dpurple"] },
				{ name: "筒井あやめ", detailDiv	: ["dpurple", "dpurple"] },
				{ name: "林瑠奈", detailDiv	: ["dsakura", "dsakura"] },
				{ name: "松尾美佑", detailDiv	: ["dturqoise", "dwhite"] },
				{ name: "矢久保美緒", detailDiv	: ["dsakura", "dyellow"] },
				{ name: "弓木奈於", detailDiv	: ["dred", "dgreenpea"] }
			],
			gen5: [
				{ name: "五百城茉央", detailDiv	: ["dturqoise", "dblue"] },
				{ name: "池田瑛紗", detailDiv	: ["dgreen", "dwhite"] },
				{ name: "一ノ瀬美空", detailDiv	: ["dbluelight", "dbluelight"] },
				{ name: "井上和", detailDiv	: ["dred", "dwhite"] },
				{ name: "岡本姫奈", detailDiv	: ["dpurple", "dblue"] },
				{ name: "小川彩", detailDiv	: ["dwhite", "dwhite"] },
				{ name: "奥田いろは", detailDiv	: ["dgreenpea", "dsakura"] },
				{ name: "川﨑桜", detailDiv	: ["dsakura", "dgreen"] },
				{ name: "菅原咲月", detailDiv	: ["dsakura", "dbluelight"] },
				{ name: "冨里奈央", detailDiv	: ["dturqoise", "dturqoise"] },
				{ name: "中西アルノ", detailDiv	: ["dbluelight", "dturqoise"] }
			],
			gen6: [
				{ name: "愛宕心響", detailDiv	: ["dpink", "dblue"] },
				{ name: "大越ひなの", detailDiv	: ["dwhite", "dyellow"] },
				{ name: "小津玲奈", detailDiv	: ["dpurple", "dturqoise"] },
				{ name: "海邉朱莉", detailDiv	: ["dred", "dblue"] },
				{ name: "川端晃菜", detailDiv	: ["dbluelight", "dgreen"] },
				{ name: "鈴木佑捺", detailDiv	: ["dbluelight", "dwhite"] },
				{ name: "瀬戸口心月", detailDiv	: ["dblue", "dyellow"] },
				{ name: "長嶋凛桜", detailDiv	: ["dpink", "dorange"] },
				{ name: "増田三莉音", detailDiv	: ["dblue", "dblue"] },
				{ name: "森平麗心", detailDiv	: ["dyellow", "dyellow"] },
				{ name: "矢田萌華", detailDiv	: ["dwhite", "dpurple"] }
			],
			noog: [
				{ name: "伊藤寧々", detailDiv	: ["dsakura", "dorange"] },
				{ name: "大和里菜", detailDiv	: ["dsakura", "dwhite"] },
				{ name: "畠中清羅", detailDiv	: ["dsakura", "dblue"] },
				{ name: "松井玲奈", detailDiv	: ["dgreenlight", "dgreenlight"] },
				{ name: "永島聖羅", detailDiv	: ["dyellow", "dyellow"] },
				{ name: "深川麻衣", detailDiv	: ["dgreenlight", "dpurple"] },
				{ name: "橋本奈々未", detailDiv	: ["dgreenlight", "dgreenlight"] },
				{ name: "伊藤万理華", detailDiv	: ["dgreenlight", "dpurple"] },
				{ name: "中元日芽香", detailDiv	: ["dsakura", "dsakura"] },
				{ name: "川村真洋", detailDiv	: ["dred", "dwhite"] },
				{ name: "生駒里奈", detailDiv	: ["dblue", "dpurple"] },
				{ name: "斎藤ちはる", detailDiv	: ["dred", "dblue"] },
				{ name: "相楽伊織", detailDiv	: ["dgreenlight", "dorange"] },
				{ name: "若月佑美", detailDiv	: ["dblue", "dblue"] },
				{ name: "能條愛未", detailDiv	: ["dorange", "dorange"] },
				{ name: "川後陽菜", detailDiv	: ["dred", "dred"] },
				{ name: "西野七瀬", detailDiv	: ["dgreenlight", "dwhite"] },
				{ name: "衛藤美彩", detailDiv	: ["dred", "dpurple"] },
				{ name: "伊藤かりん", detailDiv	: ["dgreenlight", "dpurple"] },
				{ name: "斉藤優里", detailDiv	: ["dsakura", "dwhite"] },
				{ name: "桜井玲香", detailDiv	: ["dred", "dsakura"] },
				{ name: "佐々木琴子", detailDiv	: ["dblue", "dgreenlight"] },
				{ name: "井上小百合", detailDiv	: ["dwhite", "dwhite"] },
				{ name: "中田花奈", detailDiv	: ["dblack", "dwhite"] },
				{ name: "白石麻衣", detailDiv	: ["dbluelight", "dbluelight"] },
				{ name: "堀未央奈", detailDiv	: ["dorange", "dwhite"] },
				{ name: "松村沙友理", detailDiv	: ["dred", "dred"] },
				{ name: "伊藤純奈", detailDiv	: ["dbluelight", "dwhite"] },
				{ name: "渡辺みり愛", detailDiv	: ["dgreenlight", "dgreen"] },
				{ name: "大園桃子", detailDiv	: ["dsakura", "dgreenlight"] },
				{ name: "高山一実", detailDiv	: ["dbluelight", "dsakura"] },
				{ name: "寺田蘭世", detailDiv	: ["dred", "dwhite"] },
				{ name: "生田絵梨花", detailDiv	: ["dyellow", "dyellow"] },
				{ name: "新内眞衣", detailDiv	: ["dblue", "dpurple"] },
				{ name: "星野みなみ", detailDiv	: ["dwhite", "dwhite"] },
				{ name: "北野日奈子", detailDiv	: ["dsakura", "dgreen"] },
				{ name: "山崎怜奈", detailDiv	: ["dgreenpea", "dwhite"] },
				{ name: "和田まあや", detailDiv	: ["dyellow", "dorange"] },
				{ name: "樋口日奈", detailDiv	: ["dpurple", "dorange"] },
				{ name: "秋元真夏", detailDiv	: ["dred", "dsakura"] },
				{ name: "鈴木絢音", detailDiv	: ["dwhite", "dpurple"] },
				{ name: "齋藤飛鳥", detailDiv	: ["dbluelight", "dwhite"] },
				{ name: "北川悠理", detailDiv	: ["dbluelight", "dorange"] },
				{ name: "早川聖来", detailDiv	: ["dblue", "dblue"] },
				{ name: "山下美月", detailDiv	: ["dblue", "dyellow"] },
				{ name: "阪口珠美", detailDiv	: ["dpurple", "dyellow"] },
				{ name: "清宮レイ", detailDiv	: ["dorange", "dorange"] },
				{ name: "掛橋沙耶香", detailDiv	: ["dsakura", "dorange"] },
				{ name: "向井葉月", detailDiv	: ["dyellow", "dyellow"] },
				{ name: "与田祐希", detailDiv	: ["dred", "dgreen"] },
				{ name: "佐藤楓", detailDiv	: ["dred", "dred"] },
				{ name: "中村麗乃", detailDiv	: ["dblue", "dwhite"] }
			]
		},
		sakurazaka46: {
			gen2: [
				{ name: "井上梨名", detailDiv	: ["dblue", "dblue"] },
				{ name: "遠藤光莉", detailDiv	: ["dpurple", "dpurple"] },
				{ name: "大園玲", detailDiv	: ["dviolet", "dviolet"] },
				{ name: "大沼晶保", detailDiv	: ["dbluepastel", "dyellow"] },
				{ name: "幸阪茉里乃", detailDiv	: ["dgreenpearl", "dsakupink"] },
				{ name: "武元唯衣", detailDiv	: ["dpinkpassion", "dblue"] },
				{ name: "田村保乃", detailDiv	: ["dbluepastel", "dbluepastel"] },
				{ name: "藤吉夏鈴", detailDiv	: ["dwhite", "dviolet"] },
				{ name: "増本綺良", detailDiv	: ["dgreenemerald", "dgreenemerald"] },
				{ name: "松田里奈", detailDiv	: ["dgreen", "dyellow"] },
				{ name: "森田ひかる", detailDiv	: ["dred", "dblue"] },
				{ name: "守屋麗奈", detailDiv	: ["dyellow", "dpink"] },
				{ name: "山﨑天", detailDiv	: ["dwhite", "dgreen"] }
			],
			gen3: [
				{ name: "石森璃花", detailDiv	: ["dpink", "dgreen"] },
				{ name: "遠藤理子", detailDiv	: ["dsakupink", "dviolet"] },
				{ name: "小田倉麗奈", detailDiv	: ["dpinkpassion", "dwhite"] },
				{ name: "小島凪紗", detailDiv	: ["dbluepastel", "dorange"] },
				{ name: "谷口愛季", detailDiv	: ["dpurple", "dred"] },
				{ name: "中嶋優月", detailDiv	: ["dpink", "dpink"] },
				{ name: "的野美青", detailDiv	: ["dblue", "dbluepastel"] },
				{ name: "向井純葉", detailDiv	: ["dbluepastel", "dgreenemerald"] },
				{ name: "村井優", detailDiv	: ["dpurple", "dblue"] },
				{ name: "村山美羽", detailDiv	: ["dviolet", "dpurple"] },
				{ name: "山下瞳月", detailDiv	: ["dred", "dbluepastel"] }
			],
			// gen4: [
				// { name: "浅井恋乃未", detailDiv: ["dxxx", "dxxx"] },
				// { name: "稲熊ひな", detailDiv: ["dxxx", "dxxx"] },
				// { name: "勝又春", detailDiv: ["dxxx", "dxxx"] },
				// { name: "佐藤愛桜", detailDiv: ["dxxx", "dxxx"] },
				// { name: "中川智尋", detailDiv: ["dxxx", "dxxx"] },
				// { name: "松本和子", detailDiv: ["dxxx", "dxxx"] },
				// { name: "目黒陽色", detailDiv: ["dxxx", "dxxx"] },
				// { name: "山川宇衣", detailDiv: ["dxxx", "dxxx"] },
				// { name: "山田桃実", detailDiv: ["dxxx", "dxxx"] }
			// ],
			kyog: [
				{ name: "今泉佑唯", detailDiv	: ["dred", "dgreen"] },
				{ name: "志田愛佳", detailDiv	: ["dwhite", "dwhite"] },
				{ name: "米谷奈々未", detailDiv	: ["dbluelight", "dgreen"] },
				{ name: "長濱ねる", detailDiv	: ["dpurple", "dpurple"] },
				{ name: "織田奈那", detailDiv	: ["dorange", "dgreen"] },
				{ name: "鈴本美愉", detailDiv	: ["dwhite", "dbluelight"] },
				{ name: "平手友梨奈", detailDiv	: ["dgreen", "dgreen"] },
				{ name: "長沢菜々香", detailDiv	: ["dred", "dwhite"] },
				{ name: "石森虹花", detailDiv	: ["dpink", "dwhite"] },
				{ name: "佐藤詩織", detailDiv	: ["dblue", "dpurple"] }
			],
			sakog: [
				{ name: "松平璃子", detailDiv	: ["dpinkhot", "dviolet"] },
				{ name: "守屋茜", detailDiv	: ["dred", "dred"] },
				{ name: "渡辺梨加", detailDiv	: ["dbluepastel", "dbluepastel"] },
				{ name: "渡邉理佐", detailDiv	: ["dwhite", "dblue"] },
				{ name: "原田葵", detailDiv	: ["dwhite", "dwhite"] },
				{ name: "尾関梨香", detailDiv	: ["dyellow", "dwhite"] },
				{ name: "関有美子", detailDiv	: ["dwhite", "dorange"] },
				{ name: "菅井友香", detailDiv	: ["dwhite", "dbluepastel"] },
				{ name: "土生瑞穂", detailDiv	: ["dwhite", "dred"] },
				{ name: "小林由依", detailDiv	: ["dyellow", "dblue"] },
				{ name: "齋藤冬優花", detailDiv	: ["dyellow", "dyellow"] },
				{ name: "上村莉菜", detailDiv	: ["dsakupink", "dsakupink"] },
				{ name: "小池美波", detailDiv	: ["dwhite", "dsakupink"] }
			],
		},
		hinatazaka46: {
			gen2: [
				{ name: "金村美玖", detailDiv	: ["dyellow", "dbluepastel"] },
				{ name: "河田陽菜", detailDiv	: ["dpink", "dyellow"] },
				{ name: "小坂菜緒", detailDiv	: ["dviolet", "dwhite"] },
				{ name: "松田好花", detailDiv	: ["dpink", "dgreenpearl"] }
			],
			gen3: [
				{ name: "上村ひなの", detailDiv	: ["dred", "dgreenemerald"] },
				{ name: "髙橋未来虹", detailDiv	: ["dgreen", "dpurple"] },
				{ name: "森本茉莉", detailDiv	: ["dorange", "dblue"] },
				{ name: "山口陽世", detailDiv	: ["dgreenpearl", "dyellow"] }
			],
			gen4: [
				{ name: "石塚瑶季", detailDiv	: ["dbluepastel", "dorange"] },
				{ name: "小西夏菜実", detailDiv	: ["dpurple", "dblue"] },
				{ name: "清水理央", detailDiv	: ["dgreenpearl", "dorange"] },
				{ name: "正源司陽子", detailDiv	: ["dorange", "dred"] },
				{ name: "竹内希来里", detailDiv	: ["dyellow", "dred"] },
				{ name: "平尾帆夏", detailDiv	: ["dbluepastel", "dorange"] },
				{ name: "平岡海月", detailDiv	: ["dblue", "dyellow"] },
				{ name: "藤嶌果歩", detailDiv	: ["dsakupink", "dblue"] },
				{ name: "宮地すみれ", detailDiv	: ["dviolet", "dred"] },
				{ name: "山下葉留花", detailDiv	: ["dwhite", "dgreenemerald"] },
				{ name: "渡辺莉奈", detailDiv	: ["dpurple", "dpink"] }
			],
			gen5: [
				{ name: "大田美月", detailDiv: ["dsakura", "dpink"] },
				{ name: "大野愛実", detailDiv: ["dred", "dred"] },
				{ name: "片山紗希", detailDiv: ["dbluepastel", "dbluepastel"] },
				{ name: "蔵盛妃那乃", detailDiv: ["dsakura", "dred"] },
				{ name: "坂井新奈", detailDiv: ["dwhite", "dwhite"] },
				{ name: "佐藤優羽", detailDiv: ["dgreenemerald", "dgreenemerald"] },
				{ name: "下田衣珠季", detailDiv: ["dbluepastel", "dgreenemerald"] },
				{ name: "高井俐香", detailDiv: ["dpurple", "dyellow"] },
				{ name: "鶴崎仁香", detailDiv: ["dyellow", "dorange"] },
				{ name: "松尾桜", detailDiv: ["dsakura", "dwhite"] }
			],
			hinog: [
				{ name: "井口眞緒", detailDiv	: ["dred", "dorange"] },
				{ name: "柿崎芽実", detailDiv	: ["dgreenpearl", "dgreenpearl"] },
				{ name: "渡邉美穂", detailDiv	: ["dwhite", "dbluepastel"] },
				{ name: "宮田愛萌", detailDiv	: ["dred", "dsakupink"] },
				{ name: "影山優佳", detailDiv	: ["dred", "dred"] },
				{ name: "岸帆夏", detailDiv	: ["dyellow", "dwhite"] },
				{ name: "潮紗理菜", detailDiv	: ["dpurple", "dyellow"] },
				{ name: "齊藤京子", detailDiv	: ["dwhite", "dwhite"] },
				{ name: "高本彩花", detailDiv	: ["dbluepastel", "dsakupink"] },
				{ name: "丹生明里", detailDiv	: ["dorange", "dorange"] },
				{ name: "濱岸ひより", detailDiv	: ["dorange", "dwhite"] },
				{ name: "加藤史帆", detailDiv	: ["dblue", "dblue"] },
				{ name: "東村芽依", detailDiv	: ["dsakupink", "dsakupink"] },
				{ name: "佐々木久美", detailDiv	: ["dbluepastel", "dpurple"] },
				{ name: "佐々木美玲", detailDiv	: ["dyellow", "dyellow"] },
				{ name: "高瀬愛奈", detailDiv	: ["dpink", "dwhite"] },
				{ name: "富田鈴花", detailDiv	: ["dpurple", "dpurple"] }
			]
		},
	};

    function buildMemberData(group) {
        const groupMembers = [];
        const groupMapping = groupGenMap[group];

        Object.entries(membersData[group]).forEach(([genKey, members]) => {
            const genInfo = groupMapping[genKey];
            members.forEach(member => {
                const [romaji, genVal, filename, subdir] = memberGenMap[group][member.name];
                const src = `${baseUrl}/${subdir}/${filename}.png`;

                groupMembers.push({
                    containerClass: `${defaultMember.containerClass} ${genInfo.containerClass}`,

                    nameDiv: {
                        className: `${genInfo.boxClass} jp700`,
                        id: "memname",
                        text: member.name
                    },

                    imgRotA: {
                        className: penlightMap[member.detailDiv[0]],
                        id: "rotsticka"
                    },
                    imgPic: {
                        id: "picmember",
                        src: src
                    },
                    imgRotB: {
                        className: penlightMap[member.detailDiv[1]],
                        id: "rotstickb"
                    },

                    boxName: {
                        className: `${genInfo.boxClass}`,
                        text: romaji
                    },

                    detailDiv: {
                        colors: member.detailDiv
                    }
                });
            });
        });

        return groupMembers;
    }

    Object.keys(membersData).forEach(group => {
        membersData[group] = buildMemberData(group);
    });

    document.querySelectorAll(".penlist").forEach(container => {
        const group = container.getAttribute("data-for");
        const members = membersData[group];

        if (!members) return;

        members.forEach(member => {
            const stickMember = document.createElement("div");
            stickMember.className = member.containerClass;

            // Nama Member
            const nameDiv = document.createElement("div");
            nameDiv.className = member.nameDiv.className;
            nameDiv.id = member.nameDiv.id;
            nameDiv.textContent = member.nameDiv.text;
            stickMember.appendChild(nameDiv);

            // RotStick A
            const rotstickA = document.createElement("img");
            rotstickA.className = member.imgRotA.className;
            rotstickA.id = member.imgRotA.id;
            stickMember.appendChild(rotstickA);

            // PicMember
            const picmember = document.createElement("img");
            picmember.id = member.imgPic.id;
            picmember.src = member.imgPic.src;
            stickMember.appendChild(picmember);

            // RotStick B
            const rotstickB = document.createElement("img");
            rotstickB.className = member.imgRotB.className;
            rotstickB.id = member.imgRotB.id;
            stickMember.appendChild(rotstickB);

            // Box Name
            const boxname = document.createElement("div");
            boxname.className = `${defaultBoxNameClass} ${member.boxName.className}`;
            boxname.textContent = member.boxName.text;
            stickMember.appendChild(boxname);

            // Detail Div
            const pdetail = document.createElement("div");
            pdetail.className = "pdetail";

            member.detailDiv.colors.forEach(color => {
                const colorDiv = document.createElement("div");
                colorDiv.className = color;
                pdetail.appendChild(colorDiv);
            });

            stickMember.appendChild(pdetail);
            container.appendChild(stickMember);
        });
    });
});