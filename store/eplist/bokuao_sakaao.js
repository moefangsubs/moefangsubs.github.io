const episodes = [
  "17", "16", "15", "14", "13", "12", "11",
  "10", "09", "08", "07", "06", "05", "04", "03", "02", "01"
];

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((num, index) => {
  const paddedNum = num.padStart(3, "0");
  html += `
      <div class="episodelist buttonEpsList" data-episode="${num}">
        <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/bokuao/sakamichiaozora-${paddedNum}.jpg">
        <div class="epsname">Episode ${parseInt(num, 10)}</div>
        ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
      </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
