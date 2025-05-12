const episodes = [
  { number: "01", thumbnail: "5ki01.jpg", name: "Ioki Mao" },
  { number: "02", thumbnail: "5ki02.jpg", name: "Ikeda Teresa" },
  { number: "03", thumbnail: "5ki03.jpg", name: "Ichinose Miku" },
  { number: "04", thumbnail: "5ki04.jpg", name: "Inoue Nagi" },
  { number: "05", thumbnail: "5ki05.jpg", name: "Okamoto Hina" },
  { number: "06", thumbnail: "5ki06.jpg", name: "Ogawa Aya" },
  { number: "07", thumbnail: "5ki07.jpg", name: "Okuda Iroha" },
  { number: "08", thumbnail: "5ki08.jpg", name: "Kawasaki Sakura" },
  { number: "09", thumbnail: "5ki09.jpg", name: "Sugawara Satsuki" },
  { number: "10", thumbnail: "5ki10.jpg", name: "Tomisato Nao" },
  { number: "11", thumbnail: "5ki11.jpg", name: "Nakanishi Aruno" }
];

const update =0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/other/${ep.thumbnail}">
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