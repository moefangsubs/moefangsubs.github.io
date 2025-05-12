const episodes = [
  { number: "03", thumbnail: "sol_nogizakalock_220728.jpg", name: "School of Lock!" },
  { number: "02", thumbnail: "sol_nogizakalock_210826.jpg", name: "School of Lock!" },
  { number: "01", thumbnail: "170217_showroom_nanami.jpg", name: "Girls Lock!" }
];

const update =0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/${ep.thumbnail}">
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
