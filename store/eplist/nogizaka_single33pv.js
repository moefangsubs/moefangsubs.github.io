const episodes = [
  { number: "01", thumbnail: "nogi_33pv_A1.jpg", name: "(A) Ioki Mao" },
  { number: "02", thumbnail: "nogi_33pv_A2.jpg", name: "(A) Inoue Nagi" },
  { number: "03", thumbnail: "nogi_33pv_A3.jpg", name: "(A) Okuda Iroha" },
  { number: "04", thumbnail: "nogi_33pv_B1.jpg", name: "(B) Ogawa Aya" },
  { number: "05", thumbnail: "nogi_33pv_B2.jpg", name: "(B) Kawasaki Sakura" },
  { number: "06", thumbnail: "nogi_33pv_B3.jpg", name: "(B) Nakanishi Aruno" },
  { number: "07", thumbnail: "nogi_33pv_C1.jpg", name: "(C) Ikeda Teresa" },
  { number: "08", thumbnail: "nogi_33pv_C2.jpg", name: "(C) Ichinose Miku" },
  { number: "09", thumbnail: "nogi_33pv_C3.jpg", name: "(C) Sugawara Satsuki" },
  { number: "10", thumbnail: "nogi_33pv_C4.jpg", name: "(C) Tomisato Nao" }
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