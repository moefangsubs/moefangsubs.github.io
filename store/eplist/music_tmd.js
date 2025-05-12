const episodes = [
  { num: "05", img: "220702_tmd_hinata.jpg", title: "220702 日向坂" },
  { num: "04", img: "220702_tmd_saku.jpg", title: "220702 櫻坂" },
  { num: "03", img: "220702_tmd_nogib.jpg", title: "220702 乃木坂" },
  { num: "02", img: "220702_tmd_nogia.jpg", title: "220702 乃木坂" },
  { num: "01", img: "220702_tmd_medley.jpg", title: "220702 坂道" },
];

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.num}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/${ep.img}">
      <div class="epsname">${ep.title}</div>
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
