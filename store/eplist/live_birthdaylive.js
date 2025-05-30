const episodes = [
  { number: "69", thumbnail: "live_nogi13bdl-2.jpg", name: "BDL 13 DAY 2" },
  { number: "68", thumbnail: "live_nogi13bdl-1.jpg", name: "BDL 13 DAY 1" },
  { number: "46", thumbnail: "live_nogi12bdl-4.jpg", name: "BDL 12 DAY 4" },
  { number: "45", thumbnail: "live_nogi12bdl-3.jpg", name: "BDL 12 DAY 3" },
  { number: "44", thumbnail: "live_nogi12bdl-2.jpg", name: "BDL 12 DAY 2" },
  { number: "43", thumbnail: "live_nogi12bdl-1.jpg", name: "BDL 12 DAY 1" },
  { number: "20", thumbnail: "live_nogi11bdl-5.jpg", name: "BDL 11 DAY 5" },
  { number: "19", thumbnail: "live_nogi11bdl-4.jpg", name: "BDL 11 DAY 4" },
  { number: "18", thumbnail: "live_nogi11bdl-3.jpg", name: "BDL 11 DAY 3" },
  { number: "17", thumbnail: "live_nogi11bdl-2.jpg", name: "BDL 11 DAY 2" },
  { number: "16", thumbnail: "live_nogi11bdl-1.jpg", name: "BDL 11 DAY 1" },
  { number: "11", thumbnail: "live_nogi1bdl.jpg", name: "BDL 1" },
  { number: "07", thumbnail: "live_nogi10bdlday2.jpg", name: "BDL 10 DAY 2" }
];

const update = 2;

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
