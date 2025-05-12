const episodes = [
  { number: "22", thumbnail: "mameo_22.jpg", title: "Episode 22" },
  { number: "21", thumbnail: "mameo_21.jpg", title: "Episode 21" },
  { number: "20", thumbnail: "mameo_20.jpg", title: "Episode 20" },
  { number: "19", thumbnail: "mameo_19.jpg", title: "Episode 19" },
  { number: "18", thumbnail: "mameo_18.jpg", title: "Episode 18" },
  { number: "17", thumbnail: "mameo_17.jpg", title: "Episode 17" },
  { number: "16", thumbnail: "mameo_16.jpg", title: "Episode 16" },
  { number: "15", thumbnail: "mameo_15.jpg", title: "Episode 15" },
  { number: "14", thumbnail: "mameo_14.jpg", title: "Episode 14" },
  { number: "13", thumbnail: "mameo_13.jpg", title: "Episode 13" },
  { number: "12", thumbnail: "mameo_12.jpg", title: "Episode 12" },
  { number: "11", thumbnail: "mameo_11.jpg", title: "Episode 11" },
  { number: "10", thumbnail: "mameo_10.jpg", title: "Episode 10" },
  { number: "09", thumbnail: "mameo_09.jpg", title: "Episode 9" },
  { number: "08", thumbnail: "mameo_08.jpg", title: "Episode 8" },
  { number: "07", thumbnail: "mameo_07.jpg", title: "Episode 7" },
  { number: "06", thumbnail: "mameo_06.jpg", title: "Episode 6" },
  { number: "05", thumbnail: "mameo_05.jpg", title: "Episode 5" },
  { number: "04", thumbnail: "mameo_04.jpg", title: "Episode 4" },
  { number: "03", thumbnail: "mameo_03.jpg", title: "Episode 3" },
  { number: "02", thumbnail: "mameo_02.jpg", title: "Episode 2" },
  { number: "01", thumbnail: "mameo_01.jpg", title: "Episode 1" },
  { number: "00", thumbnail: "mameo.jpg", title: "Mangamichi" }
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
