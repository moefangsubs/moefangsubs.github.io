const episodes = [
  { number: "01", thumbnail: "nogikoi-goodbye01.jpg", name: "Episode 1" },
  { number: "02", thumbnail: "nogikoi-goodbye02.jpg", name: "Episode 2" },
  { number: "03", thumbnail: "nogikoi-goodbye03.jpg", name: "Episode 3" }
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