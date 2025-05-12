const customEpisodes = {
  "12": { thumb: "cupstarnogimart11.jpg", name: "Episode 11 [END]" },
  "11": { thumb: "cupstarnogimart-tokubetsu.jpg", name: "特別編" },
  "10": { thumb: "cupstarnogimart10.jpg", name: "Episode 10" },
  "09": { thumb: "cupstarnogimart09.jpg", name: "Episode 9" },
  "08": { thumb: "cupstarnogimart08.png", name: "Episode 8" },
  "07": { thumb: "cupstarnogimart07.jpg", name: "Episode 7" },
  "06": { thumb: "cupstarnogimart06.jpg", name: "Episode 6" },
  "05": { thumb: "cupstarnogimart05.jpg", name: "Episode 5" },
  "04": { thumb: "cupstarnogimart04.jpg", name: "Episode 4" },
  "03": { thumb: "cupstarnogimart03.jpg", name: "Episode 3" },
  "02": { thumb: "cupstarnogimart02.jpg", name: "Episode 2" },
  "01": { thumb: "cupstarnogimart01.jpg", name: "Episode 1" }
};

const episodes = [];
for (let i = 12; i >= 1; i--) {
  episodes.push(i.toString().padStart(2, "0"));
}

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((num, index) => {
  const ep = customEpisodes[num];
  if (!ep) return;
  html += `
    <div class="episodelist buttonEpsList" data-episode="${num}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/${ep.thumb}">
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