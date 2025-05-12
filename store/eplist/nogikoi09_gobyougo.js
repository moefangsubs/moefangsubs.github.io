const episodes = [
  { number: "01", thumbnail: "nogikoi-nogikoi5byo-01.jpg", name: "Opening" },
  { number: "02", thumbnail: "nogikoi-nogikoi5byo-02.jpg", name: "Ending" },
  { number: "03", thumbnail: "nogikoi.jpg", name: "PV 佐藤" },
  { number: "04", thumbnail: "nogikoi.jpg", name: "PV 弓木" },
  { number: "05", thumbnail: "nogikoi.jpg", name: "PV 松尾" },
  { number: "06", thumbnail: "nogikoi.jpg", name: "PV 林" },
  { number: "07", thumbnail: "nogikoi.jpg", name: "PV 黒見" }
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