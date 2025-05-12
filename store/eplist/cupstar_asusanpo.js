const episodes = [
  { number: "03", thumbnail: "asusanpo_3.jpg", title: "#3 (Kobe-hen)" },
  { number: "02", thumbnail: "asusanpo_2.jpg", title: "#2 (Mie-hen)" },
  { number: "01", thumbnail: "asusanpo_1.jpg", title: "#1 (Hakata-hen)" }
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
