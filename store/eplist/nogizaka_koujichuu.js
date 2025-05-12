const episodes = [
  { number: "01", thumbnail: "koujichuubd-mokuhyou-kushizashi.jpg", name: "230 未公開" },
  { number: "02", thumbnail: "koujichuubd-senshuken-nootak2.jpg", name: "139-140 未公開" }
];

const update =0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/variety/${ep.thumbnail}">
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