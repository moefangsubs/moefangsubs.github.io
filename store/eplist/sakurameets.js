const episodes = [
  { number: "27", thumbnail: "sakurameets-27.jpg", name: "Episode 27" },
  { number: "26", thumbnail: "sakurameets-26.jpg", name: "Episode 26" },
  { number: "18", thumbnail: "sakurameets-18.jpg", name: "Episode 18" },
  { number: "17", thumbnail: "sakurameets-17.jpg", name: "Episode 17" },
];
const update =0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/variety/${ep.thumbnail}">
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