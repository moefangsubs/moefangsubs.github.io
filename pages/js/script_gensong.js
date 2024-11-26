let currentIndex = 0;
let songs = [];

// Mapping songcode ke nama komposisi
const songCodeToCompname = {
	s001 : "ぐるぐるカーテン",
	s002 : "おいでシャンプー",
	s003 : "走れ！Bicycle",
	s004 : "制服のマネキン",
	s005 : "君の名は希望",
	s006 : "ガールズルール",
	s007 : "バレッタ",
	s008 : "気づいたら片想い",
	s009 : "夏のFree&Easy",
	s010 : "何度目の青空か？",
	s011 : "命は美しい",
	s012 : "太陽ノック",
	s013 : "今、話したい誰かがいる",
	s014 : "ハルジオンが咲く頃",
	s015 : "裸足でSummer",
	s016 : "サヨナラの意味",
	s017 : "インフルエンサー",
	s018 : "逃げ水",
	s019 : "いつかできるから今日できる",
	s020 : "シンクロニシティ",
	s021 : "ジコチューで行こう!",
	s022 : "帰り道は遠回りしたくなる",
	s023 : "Sing Out!",
	s024 : "夜明けまで強がらなくてもいい",
	s025 : "しあわせの保護色",
	s026 : "僕は僕を好きになる",
	s027 : "ごめんねFingers crossed",
	s028 : "君に叱られた",
	s029 : "Actually…",
	s030 : "好きというのはロックだぜ！",
	s031 : "ここにはないもの",
	s032 : "人は夢を二度見る",
	s033 : "おひとりさま天国",
	s034 : "Monopoly",
	s035 : "チャンスは平等",
	s036 : "チートデイ",
	s037 : "歩道橋",
	
	a001: "透明な色",
	a002: "それぞれの椅子",
	a003: "生まれてから初めて見た夢",
	a004: "今が思い出になるまで",
	
	b001: "Time flies",
};

// Mapping nama member ke slug
const memberNameToSlug = {
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

};

// Struktur untuk memetakan foto member
const photoMember = {
  generalUrl: "https://ik.imagekit.io/moearchive/web/memberprofile/",

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

  specialCasesAandZ: {
    a001: "s010",
    a002: "s014",
    a003: "s017",
    a004: "s022",
	b001: "s028",
    z003: "s026",
  },

  specialLinks: {
    "早川聖来": {
      33: "https://ik.imagekit.io/moearchive/web/memberprofile/s031/hayakawa_seira.jpg",
    },
  },

  singleNumber: function(singleIndex, prefix) {
    if (prefix === "s" && this.specialCases[singleIndex]) {
      return `s${String(this.specialCases[singleIndex]).padStart(3, "0")}`;
    }
    if (prefix === "a" || prefix === "b" || prefix === "z") {
      const key = `${prefix}${String(singleIndex).padStart(3, "0")}`;
      if (this.specialCasesAandZ[key]) {
        return this.specialCasesAandZ[key];
      }
    }
    return `${prefix}${String(singleIndex).padStart(3, "0")}`;
  },

  getPhotoUrl: function(singleIndex, memberName, prefix) {
    if (this.specialLinks[memberName] && this.specialLinks[memberName][singleIndex]) {
      return this.specialLinks[memberName][singleIndex];
    }

    const memberSlug = memberNameToSlug[memberName];
    if (memberSlug) {
      const singleFolder = this.singleNumber(singleIndex, prefix);
      return `${this.generalUrl}${singleFolder}/${memberSlug}.png`;
    }

    console.warn(`Slug untuk ${memberName} tidak ditemukan`);
    return null;
  },
};

// Mapping CSS untuk setiap generasi
const generationStyles = {
  "1": {
    songFrom: { background: "#590810d6", color: "#ffffff" },
    songTitle: { background: "#e91429", color: "#ffffff" },
  },
  "2": {
    songFrom: { background: "#4a0b46d6", color: "#ffffff" },
    songTitle: { background: "#c205b7", color: "#ffffff" },
  },
  "3": {
    songFrom: { background: "#2485cc", color: "#ffffff" },
    songTitle: { background: "#11056ddb", color: "#ffffff" },
  },
  "4": {
    songFrom: { background: "#ffad02", color: "#ffffff" },
    songTitle: { background: "#9a3205bf", color: "#ffffff" },
  },
  "5": {
    songFrom: { background: "#202020c4", color: "#ffffff" },
    songTitle: { background: "#d2d2d2c4", color: "#ffffff" },
  },
};

// Mengambil data lagu dari JSON dan memulai tampilan
fetch("js/generationSongs.json")
  .then((response) => response.json())
  .then((data) => {
    songs = data;
    updateDisplay();
  });

function updateDisplay() {
  if (!songs.length) return;

  const currentSong = songs[currentIndex];
  const baseSongCode = currentSong.songcode.match(/^[a-z]\d+/)[0]; // Ambil awalan saja
  const compname = songCodeToCompname[baseSongCode] || "Tidak diketahui";

  // Update teks lagu
  document.getElementById("song-title").textContent = currentSong.title;
  document.getElementById("song-from").textContent = `Lagu dari: ${compname}`;

  // Update CSS berdasarkan generation
  const generationStyle = generationStyles[currentSong.generation];
  if (generationStyle) {
    const songFrom = document.getElementById("song-from");
    const songTitle = document.getElementById("song-title");

    if (songFrom && songTitle) {
      Object.assign(songFrom.style, generationStyle.songFrom);
      Object.assign(songTitle.style, generationStyle.songTitle);
    }
  }

  // Update Spotify embed
  document.getElementById("spotify-embed").src = currentSong.spotifyLink;

  // Update foto member berdasarkan members3, members2, members1
  const membersContainer = document.getElementById("members-container");
  membersContainer.innerHTML = ""; // Reset kontainer member

  ["members5", "members4", "members3", "members2", "members1"].forEach((key) => {
    if (currentSong[key] && currentSong[key].length > 0) {
      const memberDiv = document.createElement("div");
      memberDiv.id = key;
      memberDiv.classList.add("member-level");

      currentSong[key].forEach((member) => {
        const prefix = currentSong.songcode[0]; // Ambil prefix ('s', 'a', 'z')
        const singleNumber = parseInt(currentSong.songcode.slice(1)); // Ambil angka setelah prefix
        const memberPhotoUrl = photoMember.getPhotoUrl(singleNumber, member, prefix);

        if (memberPhotoUrl) {
          const img = document.createElement("img");
          img.src = memberPhotoUrl;
          img.alt = member;
          img.classList.add("member-photo");

          // Tambahkan efek border emas jika member adalah center
          if (
            (Array.isArray(currentSong.center) &&
              currentSong.center.includes(member)) ||
            currentSong.center === member
          ) {
            img.style.border = "6px solid gold";
            img.style.animation =
              "borderColorAnimation 2s infinite alternate";
          }

          memberDiv.appendChild(img);
        }
      });

      membersContainer.appendChild(memberDiv);
    }
  });

  // Update trivia
  const triviaContainer = document.getElementById("song-trivia");
  triviaContainer.innerHTML = ""; // Reset kontainer trivia

  const ul = document.createElement("ul");
  ul.classList.add("trivia");

  let hasTrivia = false;
  for (let i = 1; i <= 10; i++) {
    const triviaKey = `trivia${i}`;
    if (currentSong[triviaKey] && currentSong[triviaKey].trim() !== "") {
      hasTrivia = true;
      const li = document.createElement("li");
      li.textContent = currentSong[triviaKey];
      ul.appendChild(li);
    }
  }

  if (hasTrivia) {
    triviaContainer.appendChild(ul);
  }

  // Tampilkan lirik
  const lyricsContainer = document.querySelector(".song-lyrics");
  lyricsContainer.innerHTML = currentSong.lyrics || "Lirik tidak tersedia.";
}



// Fungsi untuk navigasi lagu
document.getElementById("prev-song").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  updateDisplay();
});

document.getElementById("next-song").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  updateDisplay();
});
