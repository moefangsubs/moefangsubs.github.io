const episodes = [
  { number: "64", thumbnail: "live_daikanshasai2024.jpg", name: "Daikanshasai" },
  { number: "63", thumbnail: "live_daikanshasai2024.jpg", name: "Daikanshasai" },
  { number: "55", thumbnail: "live_aozorasummerfes2024.jpg", name: "僕青 AOZORA SUMMER FEST 2024" },
  { number: "42", thumbnail: "231219-bokuao-oneman-vol0.jpg", name: "僕青 ONEMAN VOL.0" },
  { number: "27", thumbnail: "live_sakura3rdtourosaka2023.jpg", name: "櫻坂 3rd TOUR 2023" }
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
      ${ep.name ? `<div class="epsname">${ep.name}</div>` : ''}
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
