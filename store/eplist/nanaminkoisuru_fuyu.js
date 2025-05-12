const episode = [];
	for (let i = 5; i >= 1; i--) {
	  episode.push(i.toString().padStart(2, "0"));
	}
console.log(episode);

const updateFuyu = 0;
let htmlFuyu = `
  <div class="scroll-container">
    <div class="imglist">
`;

episode.forEach((num, index) => {
  htmlFuyu += `
    <div class="episodelist buttonEpsList" data-episode="${num}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/nanaminfuyu_${num}.jpg">
      <div class="epsname">Episode ${num}</div>
      ${index < updateFuyu ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

htmlFuyu += `
    </div>
  </div>
`;

document.write(htmlFuyu);
