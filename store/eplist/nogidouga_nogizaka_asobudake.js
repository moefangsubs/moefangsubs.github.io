const episodes = [
  { eps: "50b", label: "Episode 50 後編" },
  { eps: "50a", label: "Episode 50 前編" },
  { eps: "49",  label: "Episode 49" },
  { eps: "48",  label: "Episode 48" },
  { eps: "47",  label: "Episode 47" },
  { eps: "44b", label: "Episode 44 後編" },
  { eps: "44a", label: "Episode 44 前編" },
  { eps: "18",  label: "Episode 18" },
  { eps: "17",  label: "Episode 17" }
];

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.eps}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/variety/asobudake${ep.eps}.jpg">
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
