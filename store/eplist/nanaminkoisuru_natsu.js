const episode = [];
	for (let i = 6; i >= 1; i--) {
	  episode.push(i.toString().padStart(2, "0"));
	}
console.log(episode);

const updateNatsu = 0;
let htmlNatsu = `
  <div class="scroll-container">
    <div class="imglist">
`;

episode.forEach((num, index) => {
  htmlNatsu += `
    <div class="episodelist buttonEpsList" data-episode="${num}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/nanaminnatsu_${num}.jpg">
      <div class="epsname">Episode ${num}</div>
      ${index < updateNatsu ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

htmlNatsu += `
    </div>
  </div>
`;

document.write(htmlNatsu);
