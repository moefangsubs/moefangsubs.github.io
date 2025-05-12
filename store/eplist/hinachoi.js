const episodes = [
  { number: "20", thumb: "hinachoi-20.jpg" },
  { number: "19", thumb: "hinachoi-19.jpg" },
  { number: "12", thumb: "hinachoi-12_2.jpg" },
  { number: "11", thumb: "hinachoi-11.jpg" },
  { number: "10", thumb: "hinachoi-10.jpg" },
  { number: "09", thumb: "hinachoi-09.jpg" },
  { number: "08", thumb: "hinachoi-08.jpg" },
  { number: "07", thumb: "hinachoi-07.jpg" }
];

const update = 0;

let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/variety/${ep.thumb}">
      <div class="epsname">Episode ${parseInt(ep.number, 10)}</div>
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
