const episodes = [];
for (let i = 10; i >= 4; i--) {
  episodes.push(i.toString().padStart(2, "0"));
}

const update = 0;

let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((num, index) => {
  const isEnd = num === "10";
  html += `
    <div class="episodelist buttonEpsList" data-episode="${num}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/nogicinema_${num}.jpg">
      <div class="epsname">Episode ${parseInt(num, 10)}${isEnd ? " [END]" : ""}</div>
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
