const episodes = [
  { number: "01", thumbnail: "nogi_26pv_rei.jpg", name: "(A) Seimiya Rei" },
  { number: "02", thumbnail: "nogi_26pv_ayame.jpg", name: "(A) Tsutsui Ayame" },
  { number: "03", thumbnail: "nogi_26pv_yakubo.jpg", name: "(A) Yakubo Mio" },
  { number: "04", thumbnail: "nogi_26pv_yumiki.jpg", name: "(A) Yumiki Nao" },
  { number: "05", thumbnail: "nogi_26pv_kaki.jpg", name: "(B) Kaki Haruka [1]" },
  { number: "06", thumbnail: "nogi_26pv_kaki.jpg", name: "(B) Kaki Haruka [2]" },
  { number: "07", thumbnail: "nogi_26pv_kitagawa.jpg", name: "(B) Kitagawa Yuri" },
  { number: "08", thumbnail: "nogi_26pv_kuromi.jpg", name: "(B) Kuromi Haruka" },
  { number: "09", thumbnail: "nogi_26pv_miyu.jpg", name: "(B) Matsuo Miyu" },
  { number: "10", thumbnail: "nogi_26pv_endo.jpg", name: "(C) Endo Sakura" },
  { number: "11", thumbnail: "nogi_26pv_yuna.jpg", name: "(C) Shibata Yuna" },
  { number: "12", thumbnail: "nogi_26pv_seira.jpg", name: "(C) Hayakawa Seira" },
  { number: "13", thumbnail: "nogi_26pv_runa.jpg", name: "(C) Hayashi Runa" },
  { number: "14", thumbnail: "nogi_26pv_kakehashi.jpg", name: "(D) Kakehashi Sayaka" },
  { number: "15", thumbnail: "nogi_26pv_kanagawa.jpg", name: "(D) Kanagawa Saya" },
  { number: "16", thumbnail: "nogi_26pv_rika.jpg", name: "(D) Sato Rika" },
  { number: "17", thumbnail: "nogi_26pv_tamura.jpg", name: "(D) Tamura Mayu" }
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