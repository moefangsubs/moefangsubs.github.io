const episodes = [
  { number: "41", thumbnail: "231203-shinzanmono-nogizaka46.jpg" },
  { number: "40", thumbnail: "231202-shinzanmono-sakurazaka46.jpg" },
  { number: "39", thumbnail: "231130-shinzanmono-hinatazaka46.jpg" },
  { number: "38", thumbnail: "231127-shinzanmono-nogizaka46.jpg" },
  { number: "37", thumbnail: "231118-shinzanmono-hinatazaka46.jpg" },
  { number: "36", thumbnail: "231112-shinzanmono-sakurazaka46.jpg" }
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
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
