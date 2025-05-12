const episodes = [
  { number: "01", thumbnail: "29th-documentary-a1-iokimao.jpg", name: "(A) Ioki Mao" },
  { number: "02", thumbnail: "29th-documentary-a2-ichinose.jpg", name: "(A) Ichinose Miku" },
  { number: "03", thumbnail: "29th-documentary-a3-teresa.jpg", name: "(A) Ikeda Teresa" },
  { number: "04", thumbnail: "29th-documentary-b1-inoue.jpg", name: "(B) Inoue Nagi" },
  { number: "05", thumbnail: "29th-documentary-b2-ogawa.jpg", name: "(B) Ogawa Aya" },
  { number: "06", thumbnail: "29th-documentary-b3-okamoto.jpg", name: "(B) Okamoto Hina" },
  { number: "07", thumbnail: "29th-documentary-c1-okuda.jpg", name: "(C) Okuda Iroha" },
  { number: "08", thumbnail: "29th-documentary-c2-sugawara.jpg", name: "(C) Sugawara Satsuki" },
  { number: "09", thumbnail: "29th-documentary-c3-tomisato.jpg", name: "(C) Tomisato Nao" },
  { number: "10", thumbnail: "29th-documentary-c4-nakanishi.jpg", name: "(C) Nakanishi Aruno" },
  { number: "11", thumbnail: "29th-documentary-kawasaki.jpg", name: "(配信中) Kawasaki Sakura" },
  { number: "12", thumbnail: "29th-documentary-makingof.jpg", name: "(D) Making of" }
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