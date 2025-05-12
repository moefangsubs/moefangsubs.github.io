const episodes = [
  { number: "04", label: "Type D", thumbnail: "d.jpg" },
  { number: "03", label: "Type C", thumbnail: "c.jpg" },
  { number: "02", label: "Type B", thumbnail: "b.jpg" },
  { number: "01", label: "Type A", thumbnail: "a.jpg" }
];

const update = 0;

let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/bonus/nogi_36underlive-${ep.thumbnail}">
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
