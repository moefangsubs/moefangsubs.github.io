const episodes = [
  { number: "220108", name: "220108", thumbnail: "mtv_unplugged_2021_making.jpg" },
  { number: "211228", name: "211228", thumbnail: "mtv_inside_1.jpg" },
  { number: "211211", name: "211211", thumbnail: "mtv_unplugged_2021.jpg" }
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
