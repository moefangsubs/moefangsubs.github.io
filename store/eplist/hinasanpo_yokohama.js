const episodes = [
  { number: "03", name: "Gen-3", filename: "hinasanpoyk3.jpg" },
  { number: "02", name: "Gen-2", filename: "hinasanpoyk2.jpg" },
  { number: "01", name: "Gen-1", filename: "hinasanpoyk1.jpg" }
];

const update = 0;

let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/variety/${ep.filename}">
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
