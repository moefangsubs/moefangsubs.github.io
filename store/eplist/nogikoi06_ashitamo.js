const episodes = [
  { number: "01", thumbnail: "nogikoi-ashitamo-maiyan.jpg", name: "Shiraishi Mai (Sweet)" },
  { number: "02", thumbnail: "nogikoi-ashitamo-maiyan.jpg", name: "Shiraishi Mai (Bitter)" },
  { number: "03", thumbnail: "nogikoi-ashitamo-ikuchan.jpg", name: "Ikuta Erika (Sweet)" },
  { number: "04", thumbnail: "nogikoi-ashitamo-ikuchan.jpg", name: "Ikuta Erika (Bitter)" }
];

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/nogikoi/${ep.thumbnail}">
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