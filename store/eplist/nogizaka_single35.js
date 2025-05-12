const episodes = [
  { number: "01", thumbnail: "nogi_35shinzanmono_a1.jpg", name: "Type A 菅原" },
  { number: "02", thumbnail: "nogi_35shinzanmono_a2.jpg", name: "Type A 岡本" },
  { number: "03", thumbnail: "nogi_35shinzanmono_a3.jpg", name: "Type A 奥田" },
  { number: "04", thumbnail: "nogi_35shinzanmono_a4.jpg", name: "Type A" },
  { number: "05", thumbnail: "nogi_35shinzanmono_b1.jpg", name: "Type B 井上" },
  { number: "06", thumbnail: "nogi_35shinzanmono_b2.jpg", name: "Type B 小川" },
  { number: "07", thumbnail: "nogi_35shinzanmono_b3.jpg", name: "Type B 池田" },
  { number: "08", thumbnail: "nogi_35shinzanmono_b4.jpg", name: "Type B" },
  { number: "09", thumbnail: "nogi_35shinzanmono_b5.jpg", name: "Type B" },
  { number: "10", thumbnail: "nogi_35shinzanmono_c1.jpg", name: "Type C 五百城" },
  { number: "11", thumbnail: "nogi_35shinzanmono_c2.jpg", name: "Type C 中西" },
  { number: "12", thumbnail: "nogi_35shinzanmono_c3.jpg", name: "Type C" },
  { number: "13", thumbnail: "nogi_35shinzanmono_c4.jpg", name: "Type C" },
  { number: "14", thumbnail: "nogi_35shinzanmono_d1.jpg", name: "Type D 冨里" },
  { number: "15", thumbnail: "nogi_35shinzanmono_d2.jpg", name: "Type D 一ノ瀬" },
  { number: "16", thumbnail: "nogi_35shinzanmono_d3.jpg", name: "Type D 川﨑" },
  { number: "17", thumbnail: "nogi_35shinzanmono_d4.jpg", name: "Type D" },
  { number: "18", thumbnail: "nogi_35shinzanmono_d5.jpg", name: "Type D" }
];

const update =0;
let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/bonus/${ep.thumbnail}">
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