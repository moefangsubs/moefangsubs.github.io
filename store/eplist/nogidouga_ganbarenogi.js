const episodes = [];
	for (let i = 01; i >= 1; i--) {
	  episodes.push(i.toString().padStart(2, "0"));
	}
console.log(episodes);

const update = 1;

let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((num, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${num}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/variety/ganbare${num}.jpg">
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
