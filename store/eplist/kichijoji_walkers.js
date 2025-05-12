const episodes = [
  { number: "12", filename: "220627_kichijojiwalkers12.jpg" },
  { number: "10", filename: "220613_kichijojiwalkers10.jpg" },
  { number: "08", filename: "220530_kichijojiwalkers8.jpg" },
  { number: "04", filename: "220503_kichijojiwalkers4.jpg" },
  { number: "02", filename: "220418_kichijojiwalkers2.jpg" }
];

const update = 1; // contoh: hanya episode terbaru yang dikasih badge

let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/${ep.filename}">
      <div class="epsname">Episode ${parseInt(ep.number, 10)}</div>
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
