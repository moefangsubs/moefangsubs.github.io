const episodes = [
  { number: "01", thumbnail: "nogi_31manatsu22_a.jpg", name: "(A) Song Selection #1" },
  { number: "02", thumbnail: "nogi_31makingmanatsu22_a.jpg", name: "(A) Making of #1" },
  { number: "03", thumbnail: "nogi_31manatsu22_b.jpg", name: "(B) Song Selection #2" },
  { number: "04", thumbnail: "nogi_31makingmanatsu22_b.jpg", name: "(B) Making of #2" },
  { number: "05", thumbnail: "nogi_31manatsu22_c.jpg", name: "(C) Song Selection #3" },
  { number: "06", thumbnail: "nogi_31makingmanatsu22_c.jpg", name: "(C) Making of #3" },
  { number: "07", thumbnail: "nogi_31manatsu22_d.jpg", name: "(C) Song Selection #4" },
  { number: "08", thumbnail: "nogi_31makingmanatsu22_d.jpg", name: "(D) Making of #4" }
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