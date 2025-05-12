const episodes = [
  { number: "02", name: "221110", thumbnail: "221110_best_hits.jpg" },
  { number: "01", name: "211111", thumbnail: "211111_best_hits.jpg" }
];

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((episode, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${episode.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/${episode.thumbnail}">
      <div class="epsname">${episode.name}</div>
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
