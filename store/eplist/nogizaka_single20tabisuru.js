const episodes = [
  { number: "06", thumbnail: "nogi_20tabi_06.jpg", name: "Yamaguchi" },
  { number: "05", thumbnail: "nogi_20tabi_03.jpg", name: "Aomori" },
  { number: "04", thumbnail: "nogi_20tabi_05.jpg", name: "Kyoto" },
  { number: "03", thumbnail: "nogi_20tabi_02.jpg", name: "Kochi" },
  { number: "02", thumbnail: "nogi_20tabi_04.jpg", name: "Matsusaka" },
  { number: "01", thumbnail: "nogi_20tabi_01.jpg", name: "Kanazawa" }
];

const update =0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/bonus/${ep.thumbnail}">
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