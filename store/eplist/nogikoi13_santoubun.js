const episodes = [
  { number: "01", thumbnail: "nogikoi-3toubun_trailer.jpg", name: "Trailer" },
  { number: "02", thumbnail: "nogikoi-3toubun_part1.jpg", name: "Part One" },
  { number: "03", thumbnail: "nogikoi-3toubun_part2.jpg", name: "Part Two" },
  { number: "04", thumbnail: "nogikoi-3toubun_making.jpg", name: "Making of" },
  { number: "05", thumbnail: "nogikoi-3toubun_comment.jpg", name: "Comment" }
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