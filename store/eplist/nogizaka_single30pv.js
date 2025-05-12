const episodes = [
  { number: "01", thumbnail: "nogi_30pv_A1.jpg", name: "(A) Ioki Mao" },
  { number: "02", thumbnail: "nogi_30pv_A2.jpg", name: "(A) Ikeda Teresa" },
  { number: "03", thumbnail: "nogi_30pv_A3.jpg", name: "(A) Ichinose Miku" },
  { number: "05", thumbnail: "nogi_30pv_B1.jpg", name: "(B) Inoue Nagi" },
  { number: "06", thumbnail: "nogi_30pv_B2.jpg", name: "(B) Okamoto Hina" },
  { number: "07", thumbnail: "nogi_30pv_C1.jpg", name: "(C) Ogawa Aya" },
  { number: "08", thumbnail: "nogi_30pv_C2.jpg", name: "(C) Okuda Iroha" },
  { number: "09", thumbnail: "nogi_30pv_C3.jpg", name: "(C) Kawasaki Sakura" },
  { number: "10", thumbnail: "nogi_30pv_D1.jpg", name: "(D) Sugawara Satsuki" },
  { number: "11", thumbnail: "nogi_30pv_D2.jpg", name: "(D) Tomisato Nao" },
  { number: "12", thumbnail: "nogi_30pv_D3.jpg", name: "(D) Nakanishi Aruno" }
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