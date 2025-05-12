const episodes = [
  { number: "01", thumbnail: "nogi_27pv_16_riria.jpg", name: "(A) Ito Riria" },
  { number: "02", thumbnail: "nogi_27pv_18_ume.jpg", name: "(A) Umezawa Minami" },
  { number: "03", thumbnail: "nogi_27pv_28_endo.jpg", name: "(A) Endo Sakura" },
  { number: "04", thumbnail: "nogi_27pv_19_momoko.jpg", name: "(A) Ozono Momoko" },
  { number: "05", thumbnail: "nogi_27pv_38_ayamen.jpg", name: "(A) Tsutsui Ayame" },
  { number: "06", thumbnail: "nogi_27pv_23_reno.jpg", name: "(A) Nakamura Reno" },
  { number: "07", thumbnail: "nogi_27pv_40_hayashi.jpg", name: "(A) Hayashi Runa" },
  { number: "08", thumbnail: "nogi_27pv_06_hoshino.jpg", name: "(A) Hoshino Minami" },
  { number: "09", thumbnail: "nogi_27pv_26_yoshida.jpg", name: "(A) Yoshida Ayano Christie" },
  { number: "10", thumbnail: "nogi_27pv_08_maaya.jpg", name: "(A) Wada Maaya" },
  { number: "11", thumbnail: "nogi_27pv_02_ikuta.jpg", name: "(B) Ikuta Erika" },
  { number: "12", thumbnail: "nogi_27pv_22_kaede.jpg", name: "(B) Sato Kaede" },
  { number: "13", thumbnail: "nogi_27pv_34_rika.jpg", name: "(B) Sato Rika" },
  { number: "14", thumbnail: "nogi_27pv_35_shibata.jpg", name: "(B) Shibata Yuna" },
  { number: "15", thumbnail: "nogi_27pv_04_kazumin.jpg", name: "(B) Takayama Kazumi" },
  { number: "16", thumbnail: "nogi_27pv_37_tamura.jpg", name: "(B) Tamura Mayu" },
  { number: "17", thumbnail: "nogi_27pv_05_hinachima.jpg", name: "(B) Higuchi Hina" },
  { number: "18", thumbnail: "nogi_27pv_14_renachi.jpg", name: "(B) Yamazaki Rena" },
  { number: "19", thumbnail: "nogi_27pv_43_yumiki.jpg", name: "(B) Yumiki Nao" },
  { number: "20", thumbnail: "nogi_27pv_27_yoda.jpg", name: "(B) Yoda Yuuki" },
  { number: "21", thumbnail: "nogi_27pv_15_miria.jpg", name: "(B) Watanabe Miria" },
  { number: "22", thumbnail: "nogi_27pv_29_kaki.jpg", name: "(C) Kaki Haruka" },
  { number: "23", thumbnail: "nogi_27pv_30_kakehashi.jpg", name: "(C) Kakehashi Sayaka" },
  { number: "24", thumbnail: "nogi_27pv_32_yuri.jpg", name: "(C) Kitagawa Yuri" },
  { number: "25", thumbnail: "nogi_27pv_10_hinako.jpg", name: "(C) Kitano Hinako" },
  { number: "26", thumbnail: "nogi_27pv_03_asuka.jpg", name: "(C) Saito Asuka" },
  { number: "27", thumbnail: "nogi_27pv_11_maichun.jpg", name: "(C) Shinuchi Mai" },
  { number: "28", thumbnail: "nogi_27pv_12_ayane.jpg", name: "(C) Suzuki Ayane" },
  { number: "29", thumbnail: "nogi_27pv_36_rei.jpg", name: "(C) Seimiya Rei" },
  { number: "30", thumbnail: "nogi_27pv_07_sayuringo.jpg", name: "(C) Matsumura Sayuri" },
  { number: "31", thumbnail: "nogi_27pv_24_mukai.jpg", name: "(C) Mukai Hazuki" },
  { number: "32", thumbnail: "nogi_27pv_42_yakubo.jpg", name: "(C) Yakubo Mio" },
  { number: "33", thumbnail: "nogi_27pv_01_manatsu.jpg", name: "(D) Akimoto Manatsu" },
  { number: "34", thumbnail: "nogi_27pv_09_junna.jpg", name: "(D) Ito Junna" },
  { number: "35", thumbnail: "nogi_27pv_17_renka.jpg", name: "(D) Iwamoto Renka" },
  { number: "36", thumbnail: "nogi_27pv_31_yanchan.jpg", name: "(D) Kanagawa Saya" },
  { number: "37", thumbnail: "nogi_27pv_20_kubo.jpg", name: "(D) Kubo Shiori" },
  { number: "38", thumbnail: "nogi_27pv_33_kuromi.jpg", name: "(D) Kuromi Haruka" },
  { number: "39", thumbnail: "nogi_27pv_13_ranze.jpg", name: "(D) Terada Ranze" },
  { number: "40", thumbnail: "nogi_27pv_39_hayakawa.jpg", name: "(D) Hayakawa Seira" },
  { number: "41", thumbnail: "nogi_27pv_41_miyu.jpg", name: "(D) Matsuo Miyu" },
  { number: "42", thumbnail: "nogi_27pv_25_yamashita.jpg", name: "(D) Yamashita Mizuki" }
];

const update =0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/bonus/${ep.thumbnail}">
      <div class="epsname">${ep.name}</div>
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);