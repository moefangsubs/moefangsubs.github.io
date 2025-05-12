const episodes = [
  { number: "65", thumbnail: "live_underlive37.jpg", name: "37SG Day 3" },
  { number: "62", thumbnail: "live_underlive36.jpg", name: "36SG Day 3" },
  { number: "61", thumbnail: "live_underlive36.jpg", name: "36SG Day 2" },
  { number: "57", thumbnail: "live_underlive35.jpg", name: "35SG" },
  { number: "56", thumbnail: "live_underlive34.jpg", name: "34SG" },
  { number: "34", thumbnail: "live_underlive33.jpg", name: "33SG" },
  { number: "22", thumbnail: "live_underlive32.jpg", name: "32SG" },
  { number: "04", thumbnail: "live_sgunderlive2021.jpg", name: "28SG" },
  { number: "02", thumbnail: "live_underlive2021.jpg", name: "2021" }
];

const update = 0;

let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/other/${ep.thumbnail}">
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
