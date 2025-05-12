const episodes = [
  { number: "03", thumbnail: "nskitclub_20210101.jpg", name: "210101 遠藤" },
  { number: "02", thumbnail: "nskitclub_20201231.jpg", name: "201231 賀喜" },
  { number: "01", thumbnail: "nskitclub_20201228.jpg", name: "201228 早川" },
];


const update =0;
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