const episodes = [
  { number: "03", name: "DAY 3", thumbnail: "240331-12thbdltalk-day3.jpg" }
];

const update = 1; // Jumlah episode terbaru yang diberi badge "New"

let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/other/${ep.thumbnail}">
      <div class="epsname">${ep.name}</div>
      ${index < update ? '<span class="ep
