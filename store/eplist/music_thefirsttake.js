const episodes = [
  { number: "02", filename: "210927_tft_podcast_endo", label: "210927" },
  { number: "01", filename: "210922_tft", label: "210922" }
];

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/${ep.filename}.jpg">
      <div class="epsname">${ep.label}</div>
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
