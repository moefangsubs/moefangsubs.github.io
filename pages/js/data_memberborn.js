const prefectureData = {
    "北海道": "HOKKAIDO",
    "青森県": "AOMORI",
    "岩手県": "IWATE",
    "宮城県": "MIYAGI",
    "秋田県": "AKITA",
    "山形県": "YAMAGATA",
    "福島県": "FUKUSHIMA",
    "茨城県": "IBARAKI",
    "栃木県": "TOCHIGI",
    "群馬県": "GUNMA",
    "埼玉県": "SAITAMA",
    "千葉県": "CHIBA",
    "東京都": "TOKYO",
    "神奈川県": "KANAGAWA",
    "新潟県": "NIIGATA",
    "富山県": "TOYAMA",
    "石川県": "ISHIKAWA",
    "福井県": "FUKUI",
    "山梨県": "YAMANASHI",
    "長野県": "NAGANO",
    "岐阜県": "GIFU",
    "静岡県": "SHIZUOKA",
    "愛知県": "AICHI",
    "三重県": "MIE",
    "滋賀県": "SHIGA",
    "京都府": "KYOTO",
    "大阪府": "OSAKA",
    "兵庫県": "HYOGO",
    "奈良県": "NARA",
    "和歌山県": "WAKAYAMA",
    "鳥取県": "TOTTORI",
    "島根県": "SHIMANE",
    "岡山県": "OKAYAMA",
    "広島県": "HIROSHIMA",
    "山口県": "YAMAGUCHI",
    "徳島県": "TOKUSHIMA",
    "香川県": "KAGAWA",
    "愛媛県": "EHIME",
    "高知県": "KOCHI",
    "福岡県": "FUKUOKA",
    "佐賀県": "SAGA",
    "長崎県": "NAGASAKI",
    "熊本県": "KUMAMOTO",
    "大分県": "OITA",
    "宮崎県": "MIYAZAKI",
    "鹿児島県": "KAGOSHIMA",
    "沖縄県": "OKINAWA"
};



const memberData = {
  "nogi": {
    "3期": [
		["伊藤理々杏", "Ito Riria", "itouriria", "okinawa", "nogi36"],
		["岩本蓮加", "Iwamoto Renka", "iwamotorenka", "tokyo", "nogi36"],
		["梅澤美波", "Umezawa Minami", "umezawaminami", "kanagawa", "nogi36"],
		["久保史緒里", "Kubo Shiori", "kuboshiori", "miyagi", "nogi36"],
		["佐藤楓", "Sato Kaede", "satoukaede", "aichi", "nogi36"],
		["中村麗乃", "Nakamura Reno", "nakamurareno", "tokyo", "nogi36"],
		["吉田綾乃ｸﾘｽﾃｨｰ", "Yoshida Ayano Christie", "yoshidaayanochristie", "oita", "nogi36"],
		["与田祐希", "Yoda Yuuki", "yodayuuki", "fukuoka", "nogi36"]
    ],
    "4期": [
		["遠藤さくら", "Endo Sakura", "endousakura", "aichi", "nogi36"],
		["賀喜遥香", "Kaki Haruka", "kakiharuka", "tochigi", "nogi36"],
		["金川紗耶", "Kanagawa Saya", "kanagawasaya", "hokkaido", "nogi36"],
		["黒見明香", "Kuromi Haruka", "kuromiharuka", "tokyo", "nogi36"],
		["佐藤璃果", "Sato Rika", "satourika", "iwate", "nogi36"],
		["柴田柚菜", "Shibata Yuna", "shibatayuna", "chiba", "nogi36"],
		["田村真佑", "Tamura Mayu", "tamuramayu", "saitama", "nogi36"],
		["筒井あやめ", "Tsutsui Ayame", "tsutsuiayame", "aichi", "nogi36"],
		["林瑠奈", "Hayashi Runa", "hayashiruna", "kanagawa", "nogi36"],
		["松尾美佑", "Matsuo Miyu", "matsuomiyu", "chiba", "nogi36"],
		["矢久保美緒", "Yakubo Mio", "yakubomio", "tokyo", "nogi36"],
		["弓木奈於", "Yumiki Nao", "yumikinao", "kyoto", "nogi36"]
    ],
    "5期": [
		["五百城茉央", "Ioki Mao", "iokimao", "hyogo", "nogi36"],
		["池田瑛紗", "Ikeda Teresa", "ikedateresa", "tokyo", "nogi36"],
		["一ノ瀬美空", "Ichinose Miku", "ichinosemiku", "fukuoka", "nogi36"],
		["井上和", "Inoue Nagi", "inouenagi", "kanagawa", "nogi36"],
		["岡本姫奈", "Okamoto Hina", "okamotohina", "aichi", "nogi36"],
		["小川彩", "Ogawa Aya", "ogawaaya", "chiba", "nogi36"],
		["奥田いろは", "Okuda Iroha", "okudairoha", "chiba", "nogi36"],
		["川﨑桜", "Kawasaki Sakura", "kawasakisakura", "kanagawa", "nogi36"],
		["菅原咲月", "Sugawara Satsuki", "sugawarasatsuki", "chiba", "nogi36"],
		["冨里奈央", "Tomisato Nao", "tomisatonao", "chiba", "nogi36"],
		["中西アルノ", "Nakanishi Aruno", "nakanishiaruno", "chiba", "nogi36"]
    ],
    "6期": [
		["海邉朱莉", "Kaibe Akari", "kaibeakari", "hyogo", "nogi-6ki"],
		["川端晃菜", "Kawabata Hina", "kawabatahina", "tokyo", "nogi-6ki"],
		["瀬戸口心月", "Setoguchi Mitsuki", "setoguchimitsuki", "kagoshima", "nogi-6ki"],
		["長嶋凛桜", "Nagashima Rio", "nagashimario", "hokkaido", "nogi-6ki"],
		["矢田萌華", "Yada Moeka", "yadamoeka", "akita", "nogi-6ki"]
	]
  },
  "gradn": {
    "1期": [
      ["岩瀬佑美子", "Iwase Yumiko", "iwaseyumiko", "saitama", "grad"],
      ["安藤美雲", "Ando Mikumo", "andomikumo", "kanagawa", "grad"],
      ["柏幸奈", "Kashiwa Yukina", "kashiwayukina", "kanagawa", "grad"],
      ["宮澤成良", "Miyazawa Seira", "miyazawaseira", "chiba", "grad"],
      ["市來玲奈", "Ichiki Rena", "ichikirena", "chiba", "grad"],
      ["伊藤寧々", "Ito Nene", "itounene", "gifu", "grad"],
      ["大和里菜", "Yamato Rina", "yamatorina", "miyagi", "grad"],
      ["畠中清羅", "Hatanaka Seira", "hatanakaseira", "oita", "grad"],
      ["永島聖羅", "Nagashima Seira", "nagashimaseira", "aichi", "grad"],
      ["深川麻衣", "Fukagawa Mai", "fukagawamai", "shizuoka", "grad"],
      ["橋本奈々未", "Hashimoto Nanami", "hashimotonanami", "hokkaido", "grad"],
      ["伊藤万理華", "Ito Marika", "itoumarika", "kanagawa", "grad"],
      ["中元日芽香", "Nakamoto Himeka", "nakamotohimeka", "hiroshima", "grad"],
      ["川村真洋", "Kawamura Mahiro", "kawamuramahiro", "osaka", "grad"],
      ["生駒里奈", "Ikoma Rina", "ikomarina", "akita", "grad"],
      ["斎藤ちはる", "Saito Chiharu", "saitouchiharu", "saitama", "grad"],
      ["若月佑美", "Wakatsuki Yumi", "wakatsukiyumi", "shizuoka", "grad"],
      ["能條愛未", "Noujo Ami", "noujoami", "kanagawa", "grad"],
      ["川後陽菜", "Kawago Hina", "kawagohina", "nagasaki", "grad"],
      ["西野七瀬", "Nishino Nanase", "nishinonanase", "osaka", "grad"],
      ["衛藤美彩", "Eto Misa", "etoumisa", "oita", "grad"],
      ["斉藤優里", "Saito Yuuri", "saitouyuri", "tokyo", "grad"],
      ["桜井玲香", "Sakurai Reika", "sakuraireika", "kanagawa", "grad"],
      ["井上小百合", "Inoue Sayuri", "inouesayuri", "saitama", "grad"],
      ["中田花奈", "Nakada Kana", "nakadakana", "saitama", "grad"],
      ["白石麻衣", "Shiraishi Mai", "shiraishimai", "gunma", "grad"],
      ["松村沙友理", "Matsumura Sayuri", "matsumurasayuri", "osaka", "nogi27"],
      ["高山一実", "Takayama Kazumi", "takayamakazumi", "chiba", "nogi28"],
      ["生田絵梨花", "Ikuta Erika", "ikutaerika", "duesseldorf", "nogi28"],
      ["星野みなみ", "Hoshino Minami", "hoshinominami", "chiba", "nogi28"],
      ["樋口日奈", "Higuchi Hina", "higuchihina", "tokyo", "nogi28"],
      ["和田まあや", "Wada Maaya", "wadamaaya", "hiroshima", "nogi28"],
      ["齋藤飛鳥", "Saito Asuka", "saitouasuka", "tokyo", "nogi31"],
      ["秋元真夏", "Akimoto Manatsu", "akimotomanatsu", "saitama", "nogi31"]
    ],
    "2期": [
      ["相楽伊織", "Sagara Iori", "iorisagara", "saitama", "grad"],
      ["伊藤かりん", "Ito Karin", "itoukarin", "kanagawa", "grad"],
      ["佐々木琴子", "Sasaki Kotoko", "sasakikotoko", "saitama", "grad"],
      ["堀未央奈", "Hori Miona", "horimiona", "gifu", "grad"],
      ["伊藤純奈", "Ito Junna", "itoujunna", "kanagawa", "nogi27"],
      ["渡辺みり愛", "Watanabe Miria", "watanabemiria", "tokyo", "nogi27"],
      ["寺田蘭世", "Terada Ranze", "teradaranze", "tokyo", "nogi28"],
      ["新内眞衣", "Shinuchi Mai", "shinuchimai", "saitama", "nogi28"],
      ["北野日奈子", "Kitano Hinako", "kitanohinako", "chiba", "nogi28"],
      ["山崎怜奈", "Yamazaki Rena", "yamazakirena", "tokyo", "nogi28"],
      ["鈴木絢音", "Suzuki Ayane", "suzukiayane", "akita", "nogi31"]
    ],
    "3期": [
      ["大園桃子", "Ozono Momoko", "oozonomomoko", "kagoshima", "nogi27"],
      ["山下美月", "Yamashita Mizuki", "yamashitamizuki", "tokyo", "nogi35"],
      ["阪口珠美", "Sakaguchi Tamami", "sakaguchitamami", "tokyo", "nogi35"],
      ["向井葉月", "Mukai Hazuki", "mukaihazuki", "tokyo", "nogi36"]
    ],
    "4期": [
      ["北川悠理", "Kitagawa Yuri", "kitagawayuri", "california", "nogi31"],
      ["早川聖来", "Hayakawa Seira", "hayakawaseira", "osaka", "nogi31"],
      ["清宮レイ", "Seimiya Rei", "seimiyarei", "saitama", "nogi35"],
      ["掛橋沙耶香", "Kakehashi Sayaka", "kakehashisayaka", "okayama", "nogi36"]
    ],
    "5期": []
  },
  "gradk": {
    "1期": [
      ["原田まゆ", "Harada Mayu", "haradamayu", "tokyo", "grad"],
      ["今泉佑唯", "Imaizumi Yui", "imaizumiyui", "kanagawa", "grad"],
      ["志田愛佳", "Shida Manaka", "shidamanaka", "niigata", "grad"],
      ["米谷奈々未", "Yonetani Nanami", "yonetaninanami", "osaka", "grad"],
      ["織田奈那", "Oda Nana", "odanana", "shizuoka", "grad"],
      ["鈴本美愉", "Suzumoto Miyu", "suzumotomiyu", "aichi", "grad"],
      ["平手友梨奈", "Hirate Yurina", "hirateyurina", "aichi", "grad"],
      ["長沢菜々香", "Nagasawa Nanako", "nagasawananako", "yamagata", "grad"],
      ["石森虹花", "Ishimori Nijika", "ishimorinijika", "miyagi", "grad"],
      ["佐藤詩織", "Sato Shiori", "satoshiori", "tokyo", "grad"]
    ],
    "1.5期": [
      ["長濱ねる", "Nagahama Neru", "nagahamaneru", "nagasaki", "grad"]
    ]
  },
  "saku": {
    "1期": [],
    "2期": [
      ["井上梨名", "Inoue Rina", "inouerina", "hyogo", "saku9"],
      ["遠藤光莉", "Endo Hikari", "endouhikari", "kanagawa", "saku9"],
      ["大園玲", "Ozono Rei", "oozonorei", "kagoshima", "saku9"],
      ["大沼晶保", "Onuma Akiho", "oonumaakiho", "shizuoka", "saku9"],
      ["幸阪茉里乃", "Kousaka Marino", "kousakamarino", "mie", "saku9"],
      ["武元唯衣", "Takemoto Yui", "takemotoyui", "shiga", "saku9"],
      ["田村保乃", "Tamura Hono", "tamurahono", "osaka", "saku9"],
      ["藤吉夏鈴", "Fujiyoshi Karin", "fujiyoshikarin", "osaka", "saku9"],
      ["増本綺良", "Masumoto Kira", "masumotokira", "hyogo", "saku9"],
      ["松田里奈", "Matsuda Rina", "matsudarina", "miyazaki", "saku9"],
      ["森田ひかる", "Morita Hikaru", "moritahikaru", "fukuoka", "saku9"],
      ["守屋麗奈", "Moriya Rena", "moriyarena", "tokyo", "saku9"],
      ["山﨑天", "Yamasaki Ten", "yamasakiten", "osaka", "saku9"]
    ],
    "3期": [
      ["石森璃花", "Ishimori Rika", "ishimoririka", "gunma", "saku9"],
      ["遠藤理子", "Endo Riko", "endouriko", "saitama", "saku9"],
      ["小田倉麗奈", "Odakura Reina", "odakurareina", "tokyo", "saku9"],
      ["小島凪紗", "Kojima Nagisa", "kojimanagisa", "nagano", "saku9"],
      ["谷口愛季", "Taniguchi Airi", "taniguchiairi", "yamaguchi", "saku9"],
      ["中嶋優月", "Nakashima Yuzuki", "nakashimayuzuki", "fukuoka", "saku9"],
      ["的野美青", "Matono Mio", "matonomio", "fukuoka", "saku9"],
      ["向井純葉", "Mukai Itoha", "mukaiitoha", "hiroshima", "saku9"],
      ["村井優", "Murai Yuu", "muraiyuu", "tokyo", "saku9"],
      ["村山美羽", "Murayama Miu", "murayamamiu", "tokyo", "saku9"],
      ["山下瞳月", "Yamashita Shizuki", "yamashitashizuki", "kyoto", "saku9"]
    ]
  },
  "grads": {
    "1期": [
      ["守屋茜", "Moriya Akane", "moriyaakane", "miyagi", "saku3"],
      ["渡辺梨加", "Watanabe Rika", "watanaberika", "ibaraki", "saku3"],
      ["渡邉理佐", "Watanabe Risa", "watanaberisa", "ibaraki", "saku4"],
      ["原田葵", "Harada Aoi", "haradaaoi", "tokyo", "saku4"],
      ["尾関梨香", "Ozeki Rika", "ozekirika", "kanagawa", "sakualb1"],
      ["菅井友香", "Sugai Yuuka", "sugaiyuuka", "tokyo", "sakualb1"],
      ["土生瑞穂", "Habumi Zuho", "habumizuho", "tokyo", "saku6fix"],
      ["小林由依", "Kobayashi Yui", "kobayashiyui", "saitama", "saku6fix"],
      ["齋藤冬優花", "Saito Fuyuka", "saitoufuyuka", "tokyo", "saku9"]
      ["上村莉菜", "Uemura Rina", "uemurarina", "chiba", "saku9"],
	  
      ["小池美波", "Koike Minami", "koikeminami", "hyogo", "saku9"],
    ],
    "2期": [
      ["松平璃子", "Matsudaira Riko", "matsudairariko", "tokyo", "grad"],
      ["関有美子", "Seki Yumiko", "sekiyumiko", "fukuoka", "saku5"]
    ]
  },
  "hina": {
    "1期": [],
    "2期": [
      ["金村美玖", "Kanemura Miku", "kanemuramiku", "saitama", "hinata12"],
      ["河田陽菜", "Kawata Hina", "kawatahina", "yamaguchi", "hinata12"],
      ["小坂菜緒", "Kosaka Nao", "kosakanao", "osaka", "hinata12"],
      ["富田鈴花", "Tomita Suzuka", "tomitasuzuka", "kanagawa", "hinata12"],
      ["松田好花", "Matsuda Konoka", "matsudakonoka", "kyoto", "hinata12"]
    ],
    "3期": [
      ["上村ひなの", "Kamimura Hinano", "kamimurahinano", "tokyo", "hinata12"],
      ["髙橋未来虹", "Takahashi Mikuni", "takahashimikuni", "tokyo", "hinata12"],
      ["森本茉莉", "Morimoto Marie", "morimotomarii", "tokyo", "hinata12"],
      ["山口陽世", "Yamaguchi Haruyo", "yamaguchiharuyo", "tottori", "hinata12"]
    ],
    "4期": [
      ["石塚瑶季", "Ishizuka Tamaki", "ishizukatamaki", "tokyo", "hinata12"],
      ["小西夏菜実", "Konishi Nanami", "konishinanami", "hyogo", "hinata12"],
      ["清水理央", "Shimizu Rio", "shimizurio", "chiba", "hinata12"],
      ["正源司陽子", "Shogenji Yoko", "shogenjiyoko", "hyogo", "hinata12"],
      ["竹内希来里", "Takeuchi Kirari", "takeuchikirari", "hiroshima", "hinata12"],
      ["平尾帆夏", "Hirao Honoka", "hiraohonoka", "tottori", "hinata12"],
      ["平岡海月", "Hiraoka Mitsuki", "hiraokamitsuki", "fukui", "hinata12"],
      ["藤嶌果歩", "Fujishima Kaho", "fujishimakaho", "hokkaido", "hinata12"],
      ["宮地すみれ", "Miyachi Sumire", "miyachisumire", "kanagawa", "hinata12"],
      ["山下葉留花", "Yamashita Haruka", "yamashitaharuka", "aichi", "hinata12"],
      ["渡辺莉奈", "Watanabe Rina", "watanaberina", "fukuoka", "hinata12"]
    ]
  },
  "gradh": {
    "1期": [
      ["柿崎芽実", "Kakizaki Memi", "kakizakimemi", "nagano", "grad"],
      ["井口眞緒", "Iguchi Mao", "iguchimao", "niigata", "grad"],
      ["影山優佳", "Kageyama Yuuka", "kageyamayuuka", "tokyo", "hinata9"],
      ["潮紗理菜", "Ushio Sarina", "ushiosarina", "kanagawa", "hinata10"],
      ["齊藤京子", "Saito Kyoko", "saitokyoko", "tokyo", "hinata10"],
      ["加藤史帆", "Kato Shiho", "katoshiho", "tokyo", "hinata12"],
      ["佐々木久美", "Sasaki Kumi", "sasakikumi", "chiba", "hinata12"],
      ["佐々木美玲", "Sasaki Mirei", "sasakimirei", "hyogo", "hinata12"],
      ["高瀬愛奈", "Takase Mana", "takasemana", "osaka", "hinata12"]
    ],
    "2期": [
      ["渡邉美穂", "Watanabe Miho", "watanabemiho", "saitama", "hinata7"],
      ["宮田愛萌", "Miyata Manamo", "miyatamanamo", "tokyo", "hinata7"],
      ["丹生明里", "Nibu Akari", "nibuakari", "saitama", "hinata12"],
      ["濱岸ひより", "Hamagishi Hiyori", "hamagishihiyori", "fukuoka", "hinata12"],
      ["東村芽依", "Higashimura Mei", "higashimuramei", "nara", "hinata12"]
    ],
    "3期": [],
    "4期": [
      ["岸帆夏", "Kishi Honoka", "kishihonoka", "tokyo", "hinata10"]
    ]
  },
  "boku": {
    "1期": [
      ["青木宙帆", "Aoki Yuho", "aokiyuho", "okinawa", "bokuao2"],
      ["秋田莉杏", "Akita Rian", "akitarian", "hyogo", "bokuao2"],
      ["安納蒼衣", "Anno Aoi", "annoaoi", "saitama", "bokuao2"],
      ["伊藤ゆず", "Ito Yuzu", "itoyuzu", "chiba", "bokuao2"],
      ["今井優希", "Imai Yuki", "imaiyuki", "aichi", "bokuao2"],
      ["岩本理瑚", "Iwamoto Riko", "iwamotoriko", "tokyo", "bokuao2"],
      ["金澤亜美", "Kanazawa Ami", "kanazawaami", "kanagawa", "bokuao2"],
      ["木下藍", "Kinoshita Ai", "kinoshitaai", "tokyo", "bokuao2"],
      ["工藤唯愛", "Kudo Yua", "kudoyua", "hokkaido", "bokuao2"],
      ["塩釜菜那", "Shiogama Nana", "shiogamanana", "kagoshima", "bokuao2"],
      ["杉浦英恋", "Sugiura Eren", "sugiuraeren", "aichi", "bokuao2"],
      ["須永心海", "Sunaga Miuna", "sunagamiuna", "saitama", "bokuao2"],
      ["西森杏弥", "Nishimori Aya", "nishimoriaya", "kochi", "bokuao2"],
      ["萩原心花", "Hagiwara Kokoka", "hagiwarakokoka", "shizuoka", "bokuao2"],
      ["長谷川稀未", "Hasegawa Hitomi", "hasegawahitomi", "saitama", "bokuao2"],
      ["早﨑すずき", "Hayasaki Suzuki", "hayasakisuzuki", "tokyo", "bokuao2"],
      ["宮腰友里亜", "Miyakoshi Yuria", "miyakoshiyuria", "fukui", "bokuao2"],
      ["持永真奈", "Mochinaga Mana", "mochinagamana", "tokyo", "bokuao2"],
      ["八重樫美伊咲", "Yaegashi Miisa", "yaegashimiisa", "miyagi", "bokuao2"],
      ["八木仁愛", "Yagi Toa", "yagitoa", "tokyo", "bokuao2"],
      ["柳堀花怜", "Yanagihori Karen", "yanagihorikaren", "tokyo", "bokuao2"],
      ["山口結杏", "Yamaguchi Yuan", "yamaguchiyuan", "hyogo", "bokuao2"],
      ["吉本此那", "Yoshimoto Cocona", "yoshimotococona", "ishikawa", "bokuao2"]
    ]
  }
};