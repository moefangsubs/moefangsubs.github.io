const episodes = [
  { number: "35", thumbnail: "35.jpg", name: "Episode 35" },
  { number: "34", thumbnail: "34.jpg", name: "Episode 34" },
  { number: "33", thumbnail: "33.jpg", name: "Episode 33" },
  { number: "32", thumbnail: "32.jpg", name: "Episode 32" },
  { number: "31", thumbnail: "31.jpg", name: "Episode 31" },
  { number: "30", thumbnail: "30.jpg", name: "Episode 30" },
  { number: "29", thumbnail: "29.jpg", name: "Episode 29" },
  { number: "28", thumbnail: "28.jpg", name: "Episode 28" },
  { number: "27", thumbnail: "27.jpg", name: "Episode 27" },
  { number: "26", thumbnail: "26.jpg", name: "Episode 26" },
  { number: "25", thumbnail: "25.jpg", name: "Episode 25" },
  { number: "24", thumbnail: "24.jpg", name: "Episode 24" },
  { number: "23", thumbnail: "23.jpg", name: "Episode 23" },
  { number: "22", thumbnail: "22.jpg", name: "Episode 22" },
  { number: "21", thumbnail: "21.jpg", name: "Episode 21" },
  { number: "20", thumbnail: "20.jpg", name: "Episode 20" },
  { number: "19", thumbnail: "19.jpg", name: "Episode 19" },
  { number: "18", thumbnail: "18.jpg", name: "Episode 18" },
  { number: "17", thumbnail: "17.jpg", name: "Episode 17" },
  { number: "16", thumbnail: "16.png", name: "Episode 16" },
  { number: "15", thumbnail: "15.jpg", name: "Episode 15" },
  { number: "14", thumbnail: "14.jpg", name: "Episode 14" },
  { number: "13", thumbnail: "13.jpg", name: "Episode 13" },
  { number: "12", thumbnail: "12.jpg", name: "Episode 12" },
  { number: "11", thumbnail: "11.jpg", name: "Episode 11" },
  { number: "10", thumbnail: "10.jpg", name: "Episode 10" },
  { number: "09", thumbnail: "9.jpg", name: "Episode 9" },
  { number: "08", thumbnail: "8.jpg", name: "Episode 8" },
  { number: "07", thumbnail: "7.jpg", name: "Episode 7" },
  { number: "06", thumbnail: "6.jpg", name: "Episode 6" },
  { number: "05", thumbnail: "5.jpg", name: "Episode 5" },
  { number: "04", thumbnail: "4.jpg", name: "Episode 4" },
  { number: "03", thumbnail: "3.jpg", name: "Episode 3" },
  { number: "02", thumbnail: "2.jpg", name: "Episode 2" },
  { number: "01", thumbnail: "1.jpg", name: "Episode 1" }
];

const update =0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/other/shinstartanjou_chousen${ep.thumbnail}">
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