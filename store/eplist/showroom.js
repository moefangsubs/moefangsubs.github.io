const episodes = [
  { number: "19", name: "Masuda Mirine", thumbnail: "250428_SR-MasudaMirine.jpg" },
  { number: "18", name: "Morihira Urumi", thumbnail: "250425_SR-MorihiraUrumi.jpg" },
  { number: "17", name: "Atago Kokone", thumbnail: "250424_SR-AtagoKokone.jpg" },
  { number: "16", name: "Ozu Reina", thumbnail: "250423_SR-OzuReina.jpg" },
  { number: "15", name: "Suzuki Yuuna", thumbnail: "250422_SR-SuzukiYuuna.jpg" },
  { number: "14", name: "Okoshi Hinano", thumbnail: "250421_SR-OkoshiHinano.jpg" },
  { number: "13", name: "Kawabata Hina", thumbnail: "250418_SR-KawabataHina.jpg" },
  { number: "12", name: "Nagashima Rio", thumbnail: "250417_SR-NagashimaRio.jpg" },
  { number: "11", name: "Kaibe Akari", thumbnail: "250416_SR-KaibeAkari.jpg" },
  { number: "10", name: "Yada Moeka", thumbnail: "250415_SR-YadaMoeka.jpg" },
  { number: "09", name: "Setoguchi Mitsuki", thumbnail: "250414_SR-SetoguchiMitsuki.jpg" },
  { number: "08", name: "Ichinose Miku", thumbnail: "241202_SR-IchinoseMiku.jpg" },
  { number: "07", name: "Kaki Haruka", thumbnail: "241128_SR-KakiHaruka.jpg" },
  { number: "06", name: "Inoue, Sugawara", thumbnail: "241009-NEKOJITA.jpg" },
  { number: "05", name: "Kaki, Ikeda, Ogawa", thumbnail: "240918-NEKOJITA.jpg" },
  { number: "04", name: "Kaki Haruka", thumbnail: "240528_SR-KakiHaruka.jpeg" },
  { number: "03", name: "Okuda Iroha", thumbnail: "230307_SR-OkudaIroha.jpg" },
  { number: "02", name: "Ogawa Aya", thumbnail: "230303_SR-OgawaAya.jpg" },
  { number: "01", name: "Ikeda Teresa", thumbnail: "230302_SR-IkedaTeresa.jpg" }
];

const update = 6;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((episode, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${episode.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/${episode.thumbnail}">
      <div class="epsname">${episode.name}</div>
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
