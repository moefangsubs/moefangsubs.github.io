const episodes = [
  { number: "04", thumbnail: "bokuao-seishunnokiseki.jpg", name: "Docu" },
  { number: "03", thumbnail: "bokuaodoc3.jpg", name: "Training Camp Doc" },
  { number: "02", thumbnail: "bokuaodoc2.jpg", name: "Training Camp Doc" },
  { number: "01", thumbnail: "bokuaodoc1.jpg", name: "Training Camp Doc" }
];

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/bokuao/${ep.thumbnail}">
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
