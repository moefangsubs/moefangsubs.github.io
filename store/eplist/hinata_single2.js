const episodes = [
  { number: "01", thumb: "hinata_02hajime_a1", label: "Type A-1" },
  { number: "02", thumb: "hinata_02hajime_a2", label: "Type A-2" },
  { number: "03", thumb: "hinata_02hajime_b1", label: "Type B-1" },
  { number: "04", thumb: "hinata_02hajime_b2", label: "Type B-2" },
  { number: "05", thumb: "hinata_02hajime_c1", label: "Type C-1" },
  { number: "06", thumb: "hinata_02hajime_c2", label: "Type C-2" },
];

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/bonus/${ep.thumb}.jpg">
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
