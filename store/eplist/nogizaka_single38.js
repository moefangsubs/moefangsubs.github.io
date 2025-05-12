const episodes = [
  { number: "04", name: "Type D", thumbnail: "38docu-d.jpg" },
  { number: "03", name: "Type C", thumbnail: "38under-c.jpg" },
  { number: "02", name: "Type B", thumbnail: "38under-b.jpg" },
  { number: "01", name: "Type A", thumbnail: "38under-a.jpg" }
];

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((episode, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${episode.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/bonus/nogi_${episode.thumbnail}">
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
