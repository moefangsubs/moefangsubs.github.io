const episodes = [
  { id: "231021", img: "hinach231021_y.jpg" },
  { id: "231014", img: "hinach231014_y.jpg" },
  { id: "231007", img: "hinach231007_y.jpg" },
  { id: "230923", img: "hinach230923_yt.jpg" },
  { id: "230916", img: "hinach230916_yt.jpg" },
  { id: "230909", img: "hinach230909_yt.jpg" },
  { id: "230902", img: "hinach230902_yt.jpg" },
  { id: "230819", img: "hinach230819_yt.jpg" },
  { id: "230812", img: "hinach230812_yt.jpg" },
  { id: "230805", img: "hinach230805_yt.jpg" },
  { id: "230729", img: "hinach230729_yt.jpg" },
  { id: "230715", img: "hinach230715_yt.jpg" },
  { id: "230708", img: "hinach230708_yt.jpg" },
  { id: "230701", img: "hinach230701_yt.jpg" },
  { id: "230624", img: "hinach230624_yt.jpg" },
  { id: "230617", img: "hinach230617_yt.jpg" },
  { id: "230527", img: "hinach230527_yt.jpg" },
  { id: "230520", img: "hinach230520_yt.jpg" },
  { id: "230513", img: "hinach230513_yt.jpg" },
  { id: "230429", img: "hinach.jpg", name: "H-1" },
  { id: "230428", img: "hinach.jpg", name: "H-2" },
  { id: "230427", img: "hinach.jpg", name: "H-3" },
  { id: "230426", img: "hinach.jpg", name: "H-4" },
  { id: "230425", img: "hinach.jpg", name: "H-5" },
  { id: "230424", img: "hinach.jpg", name: "H-6" },
  { id: "230423", img: "hinach.jpg", name: "H-7" },
  { id: "230422", img: "hinach.jpg", name: "H-8" },
  { id: "230421", img: "hinach.jpg", name: "H-9" },
  { id: "230420", img: "hinach.jpg", name: "H-10" },
];

const update = 0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  const displayName = ep.name || ep.id;
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.id}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/variety/${ep.img}">
      <div class="epsname">${displayName}</div>
      ${index < update ? '<span class="epsbadgeNew"></span>' : ''}
    </div>
  `;
});

html += `
    </div>
  </div>
`;

document.write(html);
