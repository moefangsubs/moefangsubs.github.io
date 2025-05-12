const episodes = [
  { number: "24", thumbnail: "ohatsu-24.jpg", name: "Episode 24 [END]" },
  { number: "23", thumbnail: "ohatsu-23.jpg", name: "Episode 23" },
  { number: "22", thumbnail: "ohatsu-22.jpg", name: "Episode 22" },
  { number: "21", thumbnail: "ohatsu-21.jpg", name: "Episode 21" },
  { number: "20", thumbnail: "ohatsu-20.jpg", name: "Episode 20" },
  { number: "19", thumbnail: "ohatsu-19.jpg", name: "Episode 19" },
  { number: "17", thumbnail: "ohatsu-17.jpg", name: "Episode 17" },
  { number: "15", thumbnail: "ohatsu-15.jpg", name: "Episode 15" },
  { number: "13", thumbnail: "ohatsu-13.jpg", name: "Episode 13" },
  { number: "12", thumbnail: "ohatsu-12.jpg", name: "Episode 12" },
  { number: "11", thumbnail: "ohatsu-11.jpg", name: "Episode 11" },
  { number: "08", thumbnail: "ohatsu-08.jpg", name: "Episode 8" },
  { number: "07", thumbnail: "ohatsu-05.jpg", name: "Episode 7" },
  { number: "06", thumbnail: "ohatsu-06.jpg", name: "Episode 6" },
  { number: "05", thumbnail: "ohatsu-05.jpg", name: "Episode 5" },
  { number: "04", thumbnail: "ohatsu-04.jpg", name: "Episode 4" },
  { number: "03", thumbnail: "ohatsu-03.jpg", name: "Episode 3" },
  { number: "02", thumbnail: "ohatsu-02.jpg", name: "Episode 2" },
  { number: "01", thumbnail: "ohatsu-01.jpg", name: "Episode 1" }
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