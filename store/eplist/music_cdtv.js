const episodes = [
  { number: "01", name: "230320", thumbnail: "230320_cdtvlivelive_nogizaka46.jpg" }
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
