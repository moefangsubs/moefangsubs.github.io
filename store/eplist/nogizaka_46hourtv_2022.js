const episodes = [
  { number: "14", thumbnail: "46htv_denshidai33_kakehashi.jpg", name: "電視台" },
  { number: "13", thumbnail: "46htv_omitatekaigen5.jpg", name: "お見立て会" },
  { number: "12", thumbnail: "46htv_denshidai25_tamami.jpg", name: "電視台" },
  { number: "11", thumbnail: "46htv_sanshamendan.jpg", name: "おみ三者面談" },
  { number: "10", thumbnail: "46htv_denshidai23_yamazaki.jpg", name: "電視台" },
  { number: "09", thumbnail: "46htv_daiundokai.jpg", name: "大運動会" },
  { number: "08", thumbnail: "46htv_denshidai21_hayashi.jpg", name: "電視台" },
  { number: "07", thumbnail: "46htv_denshidai05_kaki.jpg", name: "電視台" },
  { number: "06", thumbnail: "46htv_denshidai06_tamura.jpg", name: "電視台" },
  { number: "05", thumbnail: "46htv_bestsongbabanaman.jpg", name: "Best Song" },
  { number: "04", thumbnail: "46htv_denshidai04_rei.jpg", name: "電視台" },
  { number: "03", thumbnail: "46htv_denshidai03_mizuki.jpg", name: "電視台" },
  { number: "02", thumbnail: "46htv_denshidai02_ayame.jpg", name: "電視台" },
  { number: "01", thumbnail: "46htv_denshidai01_asuka.jpg", name: "電視台" }
];

const update =0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom//${ep.thumbnail}">
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