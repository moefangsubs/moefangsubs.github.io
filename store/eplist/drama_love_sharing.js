const episodes = [
  { number: "11", ext: "jpg", name: "Story.11 [END]" },
  { number: "10", ext: "jpg", name: "Story.10" },
  { number: "09", ext: "jpg", name: "Story.09" },
  { number: "08", ext: "jpg", name: "Story.08" },
  { number: "07", ext: "jpg", name: "Story.07" },
  { number: "06", ext: "jpg", name: "Story.06" },
  { number: "05", ext: "jpg", name: "Story.05" },
  { number: "04", ext: "jpg", name: "Story.04" },
  { number: "03", ext: "jpg", name: "Story.03" },
  { number: "02", ext: "png", name: "Story.02" },
  { number: "01", ext: "jpg", name: "Story.01" }
];

const update = 0; 
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/drama_lovesharing-${ep.number}.${ep.ext}">
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
