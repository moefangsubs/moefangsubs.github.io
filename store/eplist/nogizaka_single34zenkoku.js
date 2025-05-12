const episodes = [
  { number: "01", thumbnail: "nogi_34manatsu23_a.jpg", name: "Type A" },
  { number: "02", thumbnail: "nogi_34manatsu23_b.jpg", name: "Type B" },
  { number: "03", thumbnail: "nogi_34manatsu23_c.jpg", name: "Type C" },
  { number: "04", thumbnail: "nogi_34manatsu23_d.jpg", name: "Type D" }
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