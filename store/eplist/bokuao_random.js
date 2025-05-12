const episodes = [
  { number: "04", filename: "230708_mezamashi.jpg", label: "230708" },
  { number: "03", filename: "230701_mezamashi.jpg", label: "230701" },
  { number: "02", filename: "230624_mezamashi.jpg", label: "230624" },
  { number: "01", filename: "230615_pengenalan.jpg", label: "230615" }
];

const update = 2; // Jumlah episode terbaru yang diberi badge "New"

let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/bokuao/${ep.filename}">
      <div class="epsname">${ep.label}</div>
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
