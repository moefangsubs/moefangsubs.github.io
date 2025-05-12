const episodes = [];
for (let i = 20; i >= 19; i--) {
  episodes.push(i.toString().padStart(2, "0"));
}

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((num, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${parseInt(num, 10)}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/variety/kokusho${num}.jpg">
      <div class="epsname">Episode ${parseInt(num, 10)}</div>
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
