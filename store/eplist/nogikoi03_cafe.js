const episodes = [
  { number: "01", thumbnail: "nogikoicafe-01.jpg", name: "Episode 1 前編" },
  { number: "02", thumbnail: "nogikoicafe-01.jpg", name: "Episode 1 後編" },
  { number: "03", thumbnail: "nogikoicafe-02.jpg", name: "Episode 2 前編" },
  { number: "04", thumbnail: "nogikoicafe-02.jpg", name: "Episode 2 後編" },
  { number: "05", thumbnail: "nogikoicafe-03.jpg", name: "Episode 3 前編" },
  { number: "06", thumbnail: "nogikoicafe-03.jpg", name: "Episode 3 後編" },
  { number: "07", thumbnail: "nogikoicafe-04.jpg", name: "Episode 4 前編" },
  { number: "08", thumbnail: "nogikoicafe-04.jpg", name: "Episode 4 後編" },
  { number: "09", thumbnail: "nogikoicafe-05.jpg", name: "Episode 5 前編" },
  { number: "10", thumbnail: "nogikoicafe-05.jpg", name: "Episode 5 後編" },
  { number: "11", thumbnail: "nogikoicafe-06.jpg", name: "Episode 6 前編" },
  { number: "12", thumbnail: "nogikoicafe-06.jpg", name: "Episode 6 後編" },
  { number: "13", thumbnail: "nogikoicafe-07.jpg", name: "Episode 7 前編" },
  { number: "14", thumbnail: "nogikoicafe-07.jpg", name: "Episode 7 後編" },
  { number: "15", thumbnail: "nogikoicafe-00.jpg", name: "Epilogue" },
  { number: "16", thumbnail: "nogikoicafe-00.jpg", name: "Individual" },
  { number: "17", thumbnail: "nogikoicafe-00.jpg", name: "Making of" },
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