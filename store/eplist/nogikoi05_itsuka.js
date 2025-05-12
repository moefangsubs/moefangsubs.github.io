
const episodes = [
  { number: "01", thumbnail: "nogikoi-hello-nanase.jpg", name: "Nishino Nanase" },
  { number: "02", thumbnail: "nogikoi-hello-yumi.jpg", name: "Wakatsuki Yumi" },
];
const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/nogikoi/${ep.thumbnail}">
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