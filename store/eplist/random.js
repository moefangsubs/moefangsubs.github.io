const episodes = [
	{ number: "49", thumbnail: "250102_hodoukyou_bts.jpg", name: "250102" },
	{ number: "48", thumbnail: "241109_haishinchuuhodoukyou.jpg", name: "241109" },
	{ number: "47", thumbnail: "241102_anothersky_asuka.jpg", name: "241102" },
	{ number: "46", thumbnail: "240721_sumahoganai.jpg", name: "240721" },
	{ number: "45", thumbnail: "240103_waraidane.jpg", name: "240103" },
	{ number: "44", thumbnail: "240416_himutaro.jpg", name: "240416" },
	{ number: "43", thumbnail: "240223_himubus_fix.jpg", name: "240223" },
	{ number: "42", thumbnail: "240218_zenkokuboroiiyado.jpg", name: "240218" },
	{ number: "41", thumbnail: "231117_lalalife.jpg", name: "231117" },
	{ number: "40", thumbnail: "231114_haishinchuumonopoly.jpg", name: "231114" },
	{ number: "39", thumbnail: "231111_yonimo2023setorikangaete.jpg", name: "231111" },
	{ number: "38", thumbnail: "230902_doyounanisuru.jpg", name: "230902" },
	{ number: "37", thumbnail: "230627_bananasand.jpg", name: "230627" },
	{ number: "36", thumbnail: "230523_petitbrunch.jpg", name: "230523" },
	{ number: "35", thumbnail: "230516_petitbrunch.jpg", name: "230516" },
	{ number: "34", thumbnail: "230508_petitbrunch.jpg", name: "230508" },
	{ number: "33", thumbnail: "230418_akitadeayanechannikikitai.jpg", name: "230418" },
	{ number: "32", thumbnail: "221213_realsound.jpg", name: "221213" },
	{ number: "31", thumbnail: "221130_petitbrunch.jpg", name: "221130" },
	{ number: "30", thumbnail: "221123_petitbrunch.jpg", name: "221123" },
	{ number: "29", thumbnail: "221105_cupstar_itv.jpg", name: "221105" },
	{ number: "28", thumbnail: "220618_yonimo2022melody.jpg", name: "220618" },
	{ number: "27", thumbnail: "220910_realsound.jpg", name: "220910" },
	{ number: "26", thumbnail: "220902_realsound.jpg", name: "220902" },
	{ number: "25", thumbnail: "220721_uratorechaimashita.jpg", name: "220721" },
	{ number: "24", thumbnail: "220728-yoda_yuuki_kanyuu.jpg", name: "220728" },
	{ number: "23", thumbnail: "220726_seventeen_kubo.jpg", name: "220726" },
	{ number: "22", thumbnail: "220715_disney_endo.jpg", name: "220715" },
	{ number: "21", thumbnail: "220707_suenaga_kakehashi.jpg", name: "220707" },
	{ number: "20", thumbnail: "220514_eigaongaku.jpg", name: "220514" },
	{ number: "19", thumbnail: "210410_heyheyneo_skz.jpg", name: "220410" },
	{ number: "18", thumbnail: "200331_sonotokicupstar.jpg", name: "カップスター" },
	{ number: "17", thumbnail: "190506_lifeikuterika.jpg", name: "190506" },
	{ number: "16", thumbnail: "219327_abema2ndgen.jpg", name: "210327" },
	{ number: "15", thumbnail: "211211_marutto_saturday.jpg", name: "211211" },
	{ number: "14", thumbnail: "210916_toppafile.jpg", name: "210916" },
	{ number: "13", thumbnail: "211215_realsound.jpg", name: "211215" },
	{ number: "12", thumbnail: "211031_hirumae_shibata.jpg", name: "211031" },
	{ number: "11", thumbnail: "210625_sakagami_yoda.jpg", name: "210625" },
	{ number: "10", thumbnail: "210825_suenaga_kakehashi.jpg", name: "210825" },
	{ number: "09", thumbnail: "200707_suenaga_kakehashi.jpg", name: "200707" },
	{ number: "08", thumbnail: "210809_cinemaaddict_nanase.jpg", name: "210809" },
	{ number: "07", thumbnail: "201214_thegift_hikaru.jpg", name: "201214" },
	{ number: "06", thumbnail: "200712_shinigami.jpg", name: "死神遣いの事件帖" },
	{ number: "05", thumbnail: "161013_kyodoki_nanami.jpg", name: "161013" },
	{ number: "04", thumbnail: "180827_natsu_omoide.jpg", name: "180827" },
	{ number: "03", thumbnail: "170217_showroom_nanami.jpg", name: "170217" },
	{ number: "02", thumbnail: "191124_sorakibun.jpg", name: "191124" },
	{ number: "01", thumbnail: "190308_anothersky_asuka.jpg", name: "190308" },
];

const update = 1;

let html = `
  <div class="scroll-container">
    <div class="imglist">
`;

episodes.forEach((ep, index) => {
  html += `
    <div class="episodelist buttonEpsList" data-episode="${ep.number}">
      <img onclick="applyEffect(this)" src="https://ik.imagekit.io/moearchive/thumb/docrandom/${ep.thumbnail}">
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
