const episodes = [
  { number: "01", thumbnail: "nogi_32pv_A1.jpg", name: "(A) Ioki Mao" },
  { number: "02", thumbnail: "nogi_32pv_A2.jpg", name: "(A) Ikeda Teresa" },
  { number: "03", thumbnail: "nogi_32pv_A3.jpg", name: "(A) Ichinose Miku" },
  { number: "04", thumbnail: "nogi_32pv_B1.jpg", name: "(B) Okamoto Hina" },
  { number: "05", thumbnail: "nogi_32pv_B2.jpg", name: "(B) Ogawa Aya" },
  { number: "06", thumbnail: "nogi_32pv_B3.jpg", name: "(B) Okuda Iroha" },
  { number: "07", thumbnail: "nogi_32pv_B4.jpg", name: "(B) Kawasaki Sakura" },
  { number: "08", thumbnail: "nogi_32pv_C1.jpg", name: "(C) Sugawara Satsuki" },
  { number: "09", thumbnail: "nogi_32pv_C2.jpg", name: "(C) Tomisato Nao" },
  { number: "10", thumbnail: "nogi_32pv_C3.jpg", name: "(C) Nakanishi Aruno" }
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
