const episodes = [
  { number: "30", thumbnail: "startanjou2_10hulu.jpg", name: "Episode 10" },
  { number: "29", thumbnail: "startanjou2_09hulu.jpg", name: "Episode 9" },
  { number: "28", thumbnail: "startanjou2_08hulu.jpg", name: "Episode 8" },
  { number: "27", thumbnail: "startanjou2_07hulu.jpg", name: "Episode 7" },
  { number: "26", thumbnail: "startanjou2_06hulu.jpg", name: "Episode 6" },
  { number: "25", thumbnail: "startanjou2_05hulu.jpg", name: "Episode 5" },
  { number: "24", thumbnail: "startanjou2_04hulu.jpg", name: "Episode 4" },
  { number: "23", thumbnail: "startanjou2_03hulu.jpg", name: "Episode 3" },
  { number: "22", thumbnail: "startanjou2_02hulu.jpg", name: "Episode 2" },
  { number: "21", thumbnail: "startanjou2_01hulu.jpg", name: "Episode 1" },
  { number: "20", thumbnail: "startanjou_20hulu.jpg", name: "Episode 20" },
  { number: "19", thumbnail: "startanjou_19hulu.jpg", name: "Episode 19" },
  { number: "18", thumbnail: "startanjou_18hulu.jpg", name: "Episode 18" },
  { number: "17", thumbnail: "startanjou_17hulu.jpg", name: "Episode 17" },
  { number: "16", thumbnail: "startanjou_16hulu.jpg", name: "Episode 16" },
  { number: "15", thumbnail: "startanjou_15hulu.jpg", name: "Episode 15" },
  { number: "14", thumbnail: "startanjou_14hulu.jpg", name: "Episode 14" },
  { number: "13", thumbnail: "startanjou_13hulu.jpg", name: "Episode 13" },
  { number: "12", thumbnail: "startanjou_12hulu.jpg", name: "Episode 12" },
  { number: "11", thumbnail: "startanjou_11hulu.jpg", name: "Episode 11" },
  { number: "10", thumbnail: "startanjou_10hulu.jpg", name: "Episode 10" },
  { number: "09", thumbnail: "startanjou_09hulu.jpg", name: "Episode 9" },
  { number: "08", thumbnail: "startanjou_08hulu.jpg", name: "Episode 8" },
  { number: "07", thumbnail: "startanjou_07hulu.jpg", name: "Episode 7" },
  { number: "06", thumbnail: "startanjou_06hulu.jpg", name: "Episode 6" },
  { number: "05", thumbnail: "startanjou_05hulu.jpg", name: "Episode 5" },
  { number: "04", thumbnail: "startanjou_04hulu.jpg", name: "Episode 4" },
  { number: "03", thumbnail: "startanjou_03hulu.jpg", name: "Episode 3" },
  { number: "02", thumbnail: "startanjou_02hulu.jpg", name: "Episode 2" },
  { number: "01", thumbnail: "startanjou_01hulu.jpg", name: "Episode 1" }
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