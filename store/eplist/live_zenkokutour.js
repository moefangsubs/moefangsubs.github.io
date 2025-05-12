const episodes = [
  { number: "54", thumbnail: "live_zenkokutour2024D3.jpg", name: "2024 DAY 3" },
  { number: "53", thumbnail: "live_zenkokutour2024D2.jpg", name: "2024 DAY 2" },
  { number: "52", thumbnail: "live_zenkokutour2024D1.jpg", name: "2024 DAY 1" },
  { number: "33", thumbnail: "live_zenkokutour2023.jpg", name: "2023 DAY 4" },
  { number: "32", thumbnail: "live_zenkokutour2023.jpg", name: "2023 DAY 3" },
  { number: "31", thumbnail: "live_zenkokutour2023.jpg", name: "2023 DAY 2" },
  { number: "30", thumbnail: "live_zenkokutour2023.jpg", name: "2023 DAY 1" },
  { number: "28", thumbnail: "live_zenkokutoue2016xebiosendaiday2.jpg", name: "2016 SENDAI" },
  { number: "14", thumbnail: "live_zenkoku2019nagoyaday2.jpg", name: "2019 DAY 2" }
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
