const episodes = [
  { number: "06", thumbnail: "matsumuraa6.jpg", name: "Episode 6 [END]" },
  { number: "05", thumbnail: "matsumuraa5.jpg", name: "Episode 5" },
  { number: "04", thumbnail: "matsumuraa4.jpg", name: "Episode 4" },
  { number: "03", thumbnail: "matsumuraa3.jpg", name: "Episode 3" },
  { number: "02", thumbnail: "matsumuraa2.jpg", name: "Episode 2" },
  { number: "01", thumbnail: "matsumuraa1.jpg", name: "Episode 1" }
];

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/${ep.thumbnail}">
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
