const episodes = [
  { number: "01", thumbnail: "nogikoi-shoujo21.jpg", name: "Episode 1" },
  { number: "02", thumbnail: "nogikoi-shoujo22.jpg", name: "Episode 2" },
  { number: "03", thumbnail: "nogikoi-shoujo23.jpg", name: "Episode 3" },
  { number: "04", thumbnail: "nogikoi-shoujo24.jpg", name: "Episode 4" },
  { number: "05", thumbnail: "nogikoi-shoujo25.jpg", name: "Episode 5" },
  { number: "06", thumbnail: "nogikoi.jpg", name: "Extra - 山下" },
  { number: "07", thumbnail: "nogikoi.jpg", name: "Extra - 久保" },
  { number: "08", thumbnail: "nogikoi.jpg", name: "Extra - 大園" },
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