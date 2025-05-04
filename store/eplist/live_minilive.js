const episodes = [
  { number: "67", name: "38th", thumbnail: "38.jpg" },
  { number: "59", name: "37th", thumbnail: "37.jpg" },
  { number: "58", name: "36th", thumbnail: "36.jpg" },
  { number: "49", name: "35th", thumbnail: "35.jpg" },
  { number: "47", name: "34th", thumbnail: "34.jpg" },
  { number: "35", name: "33rd", thumbnail: "33.jpg" },
  { number: "26", name: "32nd", thumbnail: "32.jpg" },
  { number: "15", name: "31st", thumbnail: "31.jpg" },
  { number: "13", name: "30th", thumbnail: "30.jpg" },
  { number: "08", name: "29th", thumbnail: "29.jpg" },
  { number: "05", name: "28th", thumbnail: "28.jpg" }
];

const update = 1; // Episode terbaru yang diberi badge "New" (Episode 67)

let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((episode, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${episode.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/other/live_minilive${episode.thumbnail}">
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

