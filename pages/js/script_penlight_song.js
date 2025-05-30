document.addEventListener("DOMContentLoaded", function () {
  const songData = {
    nogizaka46: {
      className: "psongn",
      items: [
        { color1: "白", color2: "白", title: "Hakumaisama" },
        { color1: "赤", color2: "赤", title: "Hakumaisama" },
        { color1: "白", color2: "白", title: "Itsuka dekiru kara kyou dekiru" },
        { color1: "水", color2: "水", title: "Offshore Girl" },
        { color1: "緑", color2: "白", title: "Kougousei Kibou" },
        { color1: "桃", color2: "水", title: "Boukyaku to Bigaku" },
        { color1: "緑", color2: "白", title: "Hitoriyogari" },
        { color1: "緑", color2: "白", title: "Mou Sukoshi no Yume" },
        { color1: "水", color2: "水", title: "Tsuribori" },
        { color1: "白", color2: "白", title: "Gomenne, Zutto..." },
        { color1: "黄", color2: "白", title: "Harujion ga Sakukoro" },
        { color1: "桃", color2: "桃", title: "Nidome no Kiss kara" },
        { color1: "青", color2: "青", title: "Sakanatachi no Love Song" },
        { color1: "赤", color2: "赤", title: "Shitto no Kenri" },
        { color1: "黄", color2: "桃", title: "Muhyoujou" },
        { color1: "白", color2: "白", title: "Fuusen wa Ikiteiru" },
        { color1: "青", color2: "青", title: "Nandome no Aozora ka?" },
        { color1: "青", color2: "青", title: "Nichijou" },
        { color1: "紫", color2: "紫", title: "Nogizaka no Uta" },
        { color1: "白", color2: "白", title: "Ano Hi Boku wa Tossa ni Uso o Tsuita" },
        { color1: "白", color2: "白", title: "Kyuushamen" },
        { color1: "青", color2: "青", title: "Skydiving" },
        { color1: "赤", color2: "赤", title: "Sayuringo Boshuchu" },
        { color1: "赤", color2: "赤", title: "Influencer" },
        { color1: "青", color2: "赤", title: "Ikuate no nai Bokutachi" },
        { color1: "桃", color2: "桃", title: "Kimi wa Boku to Awanai Hou ga Yokatta no kana" },
        { color1: "緑", color2: "緑", title: "Sayonara no Imi" },
        { color1: "桃", color2: "橙", title: "Namida ga Mada Kanashimi datta koro" },
        { color1: "黄", color2: "黄", title: "Sabita Compass" },
        { color1: "緑", color2: "緑", title: "Naimononedari" },
        { color1: "緑", color2: "緑", title: "Tsuyogaru Tsubomi" },
        { color1: "黄", color2: "黄", title: "Anata no Tame ni Hikitai" },
        { color1: "黄", color2: "黄", title: "Teitaion no Kiss" },
        { color1: "青", color2: "紫", title: "Mizutamamoyou" },
        { color1: "青", color2: "桃", title: "Hidari Mune no Yuuki" },
        { color1: "水", color2: "桃", title: "Watashi no Iro" },
        { color1: "青", color2: "青", title: "Nigemizu" }
      ]
    },

    sakurazaka46: {
      className: "psongs",
      items: [
        { iconClass: "songsaku1", title: "Overture" },
        { iconClass: "songsaku1", title: "Nobody's fault" },
        { iconClass: "songsaku1", title: "Sonia" },
        { iconClass: "songsaku2", title: "Guuzen no Kotae" },
        { iconClass: "songsaku2", title: "Blue Moon Kiss" },
        { iconClass: "songsaku2", title: "Mugon no Uchu" },
        { iconClass: "songsaku2", title: "Boku no Dilemma" },
        { iconClass: "songsaku3", title: "BAN" },
        { iconClass: "songsaku3", title: "Nagaredama" },
        { iconClass: "songsaku3", title: "Dead End" },
        { iconClass: "songsaku4", title: "Saishu no Chikatetsu ni Notte" },
        { iconClass: "songsaku5", title: "Omotta yori mo Sabishikunai" },
        { iconClass: "songsaku6", title: "Buddies" },
        { iconClass: "songsaku6", title: "Sakurazaka no Uta" }
      ]
    },

    hinatazaka46: {
      className: "psongh",
      items: [
        { iconClass: "songhnt1", title: "Overture" },
        { iconClass: "songhnt11", title: "Hiragana Keyaki" },
        { iconClass: "songhnt9", title: "Eien no Hakusen" },
        { iconClass: "songhnt15", title: "Chinmokushita Koibito yo" },
        { iconClass: "songhnt14", title: "100nen Mateba" },
        { iconClass: "songhnt3", title: "Senkou Hanabi ga Kieru made" },
        { iconClass: "songhnt3", title: "Hiragana de Koishitai" },
        { iconClass: "songhnt7", title: "Halloween no Kabocha ga Wareta" },
        { iconClass: "songhnt8", title: "Kirei ni Naritai" },
        { iconClass: "songhnt8", title: "My Fans" },
        { iconClass: "songhnt5", title: "Natsuiro no Mule" },
        { iconClass: "songhnt12", title: "Warenai Shabontama" },
        { iconClass: "songhnt6", title: "Wazukana Hikari" },
        { iconClass: "songhnt6", title: "Masaka Guuzen..." },
        { iconClass: "songhnt15", title: "Otoko Tomodachi Dakara" },
        { iconClass: "songhnt9", title: "Igokochi Waruku, Otona ni Natta" },
        { iconClass: "songhnt1", title: "Yakusoku no Tamago" },
        { iconClass: "songhnt1", title: "Kyun" },
        { iconClass: "songhnt1", title: "Tokimeki-sou" },
        { iconClass: "songhnt1", title: "Mimi ni Ochiru Namida" },
        { iconClass: "songhnt6", title: "Hanachanzu unit song" },
        { special: true, title: "JOYFUL LOVE" },
        { special: true, title: "Omoigakenai Double Rainbow" }
      ]
    }
  };

  document.querySelectorAll(".psolt").forEach(container => {
    const group = container.getAttribute("song-for");
    const data = songData[group];

    if (!data) return;

    const { className, items } = data;

    items.forEach(song => {
      const item = document.createElement("div");
      item.className = className;

      // Untuk lagu dengan dua ikon warna
      if (song.color1 && song.color2) {
        const circle1 = document.createElement("i");
        circle1.className = "fa-solid fa-circle " + song.color1;

        const circle2 = document.createElement("i");
        circle2.className = "fa-solid fa-circle " + song.color2;

        item.appendChild(circle1);
        item.appendChild(circle2);
      }

      // Untuk lagu dengan satu ikon class
      else if (song.iconClass) {
        const circle1 = document.createElement("i");
        circle1.className = "fa-solid fa-circle " + song.iconClass;

        const circle2 = document.createElement("i");
        circle2.className = "fa-solid fa-circle " + song.iconClass;

        item.appendChild(circle1);
        item.appendChild(circle2);
      }

      // Untuk lagu spesial tanpa ikon
      if (song.special) {
        const specialDiv = document.createElement("div");
        specialDiv.className = "songhntrb";
        specialDiv.textContent = song.title;
        item.appendChild(specialDiv);
      }

      // Judul lagu
      if (!song.special) {
        item.appendChild(document.createTextNode(song.title));
      }

      container.appendChild(item);
    });
  });
});