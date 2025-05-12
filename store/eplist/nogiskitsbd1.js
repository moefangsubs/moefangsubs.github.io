const episodes = [
  { number: "03", thumbnail: "nskitsbd01_mucaburiayame.jpg", name: "Muchaburi Conte" },
  { number: "02", thumbnail: "nskitsbd01_ngscene.jpg", name: "NG Scene" },
  { number: "01", thumbnail: "nskitsbd01_makingof1.jpg", name: "Making of" },
];

const update =0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/other/${ep.thumbnail}">
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