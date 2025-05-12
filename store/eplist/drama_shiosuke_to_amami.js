const episodes = [
  { number: "08", thumbnail: "220812-shiosukeitv.jpg", title: "Interview" },
  { number: "07", thumbnail: "220729-shiosukeitv.jpg", title: "Interview" },
  { number: "06", thumbnail: "shiosuke06.jpg", title: "Episode 6 [END]" },
  { number: "05", thumbnail: "shiosuke05.jpg", title: "Episode 5" },
  { number: "04", thumbnail: "shiosuke04.jpg", title: "Episode 4" },
  { number: "03", thumbnail: "shiosuke03.jpg", title: "Episode 3" },
  { number: "02", thumbnail: "shiosuke02.jpg", title: "Episode 2" },
  { number: "01", thumbnail: "shiosuke01.jpg", title: "Episode 1" }
];

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/${ep.thumbnail}">
      <div class="epsname">${ep.title}</div>
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
