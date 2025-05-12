
const episodes = [
  { number: "01", thumbnail: "nogikoi-noginounai-0.jpg", name: "Intro 齋藤" },
  { number: "02", thumbnail: "nogikoi-noginounai-0.jpg", name: "Intro 星野" },
  { number: "03", thumbnail: "nogikoi-noginounai-0.jpg", name: "Intro 山下" },
  { number: "04", thumbnail: "nogikoi-noginounai-0.jpg", name: "Intro 遠藤" },
  { number: "05", thumbnail: "nogikoi-noginounai-prologue.jpg", name: "Prologue" },
  { number: "06", thumbnail: "nogikoi-noginounai-1.jpg", name: "Episode 1" },
  { number: "07", thumbnail: "nogikoi-noginounai-2.jpg", name: "Episode 2" },
  { number: "08", thumbnail: "nogikoi-noginounai-3.jpg", name: "Episode 3" },
  { number: "09", thumbnail: "nogikoi-noginounai-4.jpg", name: "Episode 4" },
  { number: "10", thumbnail: "nogikoi-noginounai-0.jpg", name: "Meeting Part 1" },
  { number: "11", thumbnail: "nogikoi-noginounai-0.jpg", name: "Meeting Part 2" },
  { number: "12", thumbnail: "nogikoi-noginounai-0.jpg", name: "Meeting Part 3" },
  { number: "13", thumbnail: "nogikoi-noginounai-0.jpg", name: "Individual" },
  { number: "14", thumbnail: "nogikoi-noginounai-0.jpg", name: "Confession 齋藤" },
  { number: "15", thumbnail: "nogikoi-noginounai-0.jpg", name: "Confession 星野" },
  { number: "16", thumbnail: "nogikoi-noginounai-0.jpg", name: "Confession 山下" },
  { number: "17", thumbnail: "nogikoi-noginounai-0.jpg", name: "Confession 遠藤" },
  { number: "18", thumbnail: "nogikoi-noginounai-0.jpg", name: "Introduction" },
  { number: "19", thumbnail: "nogikoi-noginounai-0.jpg", name: "True End" }
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