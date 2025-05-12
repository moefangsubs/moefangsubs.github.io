document.write(`
<div class="scroll-container">
<div class="imglist">
<div class="episodelist buttonEpsList" data-episode="02"><img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/"><div class="epsname"></div></div>
<div class="episodelist buttonEpsList" data-episode="01"><img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/.jpg"><div class="epsname"></div></div>
</div>
</div>
`);







const episodes = [
  { number: "02", name: "220826_musicblood.jpg", thumbnail: "210826.jpg" },
  { number: "01", name: "220617_musicblood", thumbnail: "210617.jpg" }
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
