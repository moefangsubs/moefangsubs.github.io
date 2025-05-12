const episodes = [
  { number: "60", thumbnail: "live_yodagradcon.jpg", name: "Yoda Yuuki" },
  { number: "50", thumbnail: "live_saachangradcer.jpg", name: "Kakehashi Sayaka" },
  { number: "48", thumbnail: "live_zukkigradcon.jpg", name: "Yamashita Mizuki" },
  { number: "29", thumbnail: "live_seiragradcer.jpg", name: "Hayakawa Seira" },
  { number: "25", thumbnail: "live_asukasotsucon2.jpg", name: "Saito Asuka D2" },
  { number: "24", thumbnail: "live_asukasotsucon1.jpg", name: "Saito Asuka D1" },
  { number: "21", thumbnail: "live_ayanegradcer.jpg", name: "Suzuki Ayane" },
  { number: "12", thumbnail: "live_higuchigradcer.jpg", name: "Higuchi Hina" },
  { number: "09", thumbnail: "live_kitanogradcon.jpg", name: "Kitano Hinako" }
];

const update = 0;

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
