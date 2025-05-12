const episodes = [
  { number: "66", thumbnail: "live_omitatekaigen6.jpg" },
  { number: "51", thumbnail: "live_bokuaonatsugasumi.jpg" },
  { number: "23", thumbnail: "live_hinata4thomotenashikai.jpg" },
  { number: "10", thumbnail: "live_tif2022nogizaka.jpg" },
  { number: "06", thumbnail: "live_5thomitatekai2.jpg" },
  { number: "03", thumbnail: "live_jamexpo20202021.jpg" },
  { number: "01", thumbnail: "live_nogiskitslive.jpg" }
];

const update = 1; // Jumlah episode terbaru yang diberi badge "New" (misalnya hanya episode 66)

let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/other/${ep.thumbnail}">
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
