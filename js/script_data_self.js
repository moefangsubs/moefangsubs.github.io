const params = new URLSearchParams(location.search);
const memberId = params.get("id");
const specialGraduatedMembers = new Set([
  "ANDO Mikumo", "Ichiki Rena", "NOUJO Ami", "MUKAI Hazuki", "YODA Yuuki", "SATO Kaede",
  "KAKEHASHI Sayaka", "SEIMIYA Rei", "MATSUI Rena", "NISHIKAWA Nanami",
  "YADA Risako", "YONETOKU Kyoka"
]);
const singleYears = {
  1: 2012, 2: 2012, 3: 2012, 4: 2012,
  5: 2013, 6: 2013, 7: 2013,
  8: 2014, 9: 2014, 10: 2014,
  11: 2015, 12: 2015, 13: 2015,
  14: 2016, 15: 2016, 16: 2016,
  17: 2017, 18: 2017, 19: 2017,
  20: 2018, 21: 2018, 22: 2018,
  23: 2019, 24: 2019,
  25: 2020,
  26: 2021, 27: 2021, 28: 2021,
  29: 2022, 30: 2022, 31: 2022,
  32: 2023, 33: 2023, 34: 2023,
  35: 2024, 36: 2024, 37: 2024,
  38: 2025, 39: 2025, 40: 2025
};
const skipSingles = new Set([16, 18, 19, 21, 23, 27, 29, 30, 32, 34]);
const prefectureData = {
  "北海道": "Hokkaido", "青森県": "Aomori", "岩手県": "Iwate", "宮城県": "Miyagi", "秋田県": "Akita",
  "山形県": "Yamagata", "福島県": "Fukushima", "茨城県": "Ibaraki", "栃木県": "Tochigi", "群馬県": "Gunma",
  "埼玉県": "Saitama", "千葉県": "Chiba", "東京都": "Tokyo", "神奈川県": "Kanagawa", "新潟県": "Niigata",
  "富山県": "Toyama", "石川県": "Ishikawa", "福井県": "Fukui", "山梨県": "Yamanashi", "長野県": "Nagano",
  "岐阜県": "Gifu", "静岡県": "Shizuoka", "愛知県": "Aichi", "三重県": "Mie", "滋賀県": "Shiga",
  "京都府": "Kyoto", "大阪府": "Osaka", "兵庫県": "Hyogo", "奈良県": "Nara", "和歌山県": "Wakayama",
  "鳥取県": "Tottori", "島根県": "Shimane", "岡山県": "Okayama", "広島県": "Hiroshima", "山口県": "Yamaguchi",
  "徳島県": "Tokushima", "香川県": "Kagawa", "愛媛県": "Ehime", "高知県": "Kochi", "福岡県": "Fukuoka",
  "佐賀県": "Saga", "長崎県": "Nagasaki", "熊本県": "Kumamoto", "大分県": "Oita", "宮崎県": "Miyazaki",
  "鹿児島県": "Kagoshima", "沖縄県": "Okinawa"
};
const zodiacIcons = {
  "Capricorn": `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zodiac-capricorn" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M4 4a3 3 0 0 1 3 3v9" /> <path d="M7 7a3 3 0 0 1 6 0v11a3 3 0 0 1 -3 3" /> <circle cx="16" cy="17" r="3" /> </svg>`,
  "Aquarius": `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zodiac-aquarius" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M3 10l3 -3l3 3l3 -3l3 3l3 -3l3 3" /> <path d="M3 17l3 -3l3 3l3 -3l3 3l3 -3l3 3" /> </svg>`,
  "Pisces": `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zodiac-pisces" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M5 3a21 21 0 0 1 0 18" /> <path d="M19 3a21 21 0 0 0 0 18" /> <line x1="5" y1="12" x2="19" y2="12" /> </svg>`,
  "Aries": `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zodiac-aries" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M12 5a5 5 0 1 0 -4 8" /> <path d="M16 13a5 5 0 1 0 -4 -8" /> <line x1="12" y1="21" x2="12" y2="5" /> </svg>`,
  "Taurus": `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zodiac-taurus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M6 3a6 6 0 0 0 12 0" /> <circle cx="12" cy="15" r="6" /> </svg>`,
  "Gemini": `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zodiac-gemini" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M3 3a21 21 0 0 0 18 0" /> <path d="M3 21a21 21 0 0 1 18 0" /> <line x1="7" y1="4.5" x2="7" y2="19.5" /> <line x1="17" y1="4.5" x2="17" y2="19.5" /> </svg>`,
  "Cancer": `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zodiac-cancer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <circle cx="6" cy="12" r="3" /> <circle cx="18" cy="12" r="3" /> <path d="M3 12a10 6.5 0 0 1 14 -6.5" /> <path d="M21 12a10 6.5 0 0 1 -14 6.5" /> </svg>`,
  "Leo": `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zodiac-leo" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M13 17a4 4 0 1 0 8 0" /> <circle cx="6" cy="16" r="3" /> <circle cx="11" cy="7" r="4" /> <path d="M7 7c0 3 2 5 2 9" /> <path d="M15 7c0 4 -2 6 -2 10" /> </svg>`,
  "Virgo": `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zodiac-virgo" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M3 4a2 2 0 0 1 2 2v9" /> <path d="M5 6a2 2 0 0 1 4 0v9" /> <path d="M9 6a2 2 0 0 1 4 0v10a7 5 0 0 0 7 5" /> <path d="M12 21a7 5 0 0 0 7 -5v-2a3 3 0 0 0 -6 0" /> </svg>`,
  "Libra": `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zodiac-libra" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <line x1="5" y1="20" x2="19" y2="20" /> <path d="M5 17h5v-.3a7 7 0 1 1 4 0v.3h5" /> </svg>`,
  "Scorpio": `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zodiac-scorpio" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M3 4a2 2 0 0 1 2 2v9" /> <path d="M5 6a2 2 0 0 1 4 0v9" /> <path d="M9 6a2 2 0 0 1 4 0v10a3 3 0 0 0 3 3h5l-3 -3m0 6l3 -3" /> </svg>`,
  "Sagittarius": `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zodiac-sagittarius" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <line x1="4" y1="20" x2="20" y2="4" /> <path d="M13 4h7v7" /> <line x1="6.5" y1="12.5" x2="11.5" y2="17.5" /> </svg>`
};
function convertPrefecture(jpName) {
  return prefectureData[jpName] 
    ? `${prefectureData[jpName]}` 
    : jpName;
}
function formatNamaRomaji(nama) {
  return nama.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
function formatTanggal(datestr) {
  if (!datestr || datestr === "未定") return "Belum ditentukan";
  const [tahun, bulan, tanggal] = datestr.split('.');
  const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return `${parseInt(tanggal)} ${namaBulan[parseInt(bulan) - 1]} ${tahun}`;
}
function hitungUmur(datestr) {
  const [tahun, bulan, tanggal] = datestr.split('.').map(Number);
  const lahir = new Date(tahun, bulan - 1, tanggal);
  const sekarang = new Date();
  let tahunUmur = sekarang.getFullYear() - lahir.getFullYear();
  const bulanSekarang = sekarang.getMonth();
  const hariSekarang = sekarang.getDate();
  if (bulanSekarang < (bulan - 1) || (bulanSekarang === (bulan - 1) && hariSekarang < tanggal)) {
    tahunUmur--;
  }
  const ultahTerakhir = new Date(sekarang.getFullYear(), bulan - 1, tanggal);
  if (sekarang < ultahTerakhir) {
    ultahTerakhir.setFullYear(sekarang.getFullYear() - 1);
  }
  const bedaMs = sekarang - ultahTerakhir;
  const hariUmur = Math.floor(bedaMs / (1000 * 60 * 60 * 24));
  return { tahun: tahunUmur, hari: hariUmur };
}
function getZodiacSign(birthDateStr, zodiacData) {
    if (!birthDateStr || !zodiacData) return null;
    const [, month, day] = birthDateStr.split('.').map(Number);
    const memberDate = month * 100 + day;
    for (const sign in zodiacData) {
        const { start, end } = zodiacData[sign];
        const [, startMonth, startDay] = start.split('.').map(Number);
        const [, endMonth, endDay] = end.split('.').map(Number);
        const startDate = startMonth * 100 + startDay;
        const endDate = endMonth * 100 + endDay;
        if (startDate > endDate) {
            if (memberDate >= startDate || memberDate <= endDate) {
                return sign;
            }
        } else {
            if (memberDate >= startDate && memberDate <= endDate) {
                return sign;
            }
        }
    }
    return null;  
}
function createSNSLink(className, href, text) {
  return `<a class="${className}" href="${href}" target="_blank">${text}</a>`;
}
function generateSNSLinks(sns) {
  if (!sns) return '';
  let html = '';
  if (sns.insta) { if (Array.isArray(sns.insta)) { sns.insta.forEach(link => { const handle = `@${link.split('/').pop()}`; html += createSNSLink('insta', link, handle); }); } else { const handle = `@${sns.insta.split('/').pop()}`; html += createSNSLink('insta', sns.insta, handle); } }
  if (sns.inspb) { if (Array.isArray(sns.inspb)) { sns.inspb.forEach(link => { const handle = `@${link.split('/').pop()}`; html += createSNSLink('inspb', link, handle); }); } else { const handle = `@${sns.inspb.split('/').pop()}`; html += createSNSLink('inspb', sns.inspb, handle); } }
  if (sns.web) { const webNames = Array.isArray(sns.webname) ? sns.webname : [sns.webname]; if (Array.isArray(sns.web)) { sns.web.forEach((link, index) => { const text = webNames[index] || 'Official Website'; html += createSNSLink('web', link, text); }); } else { const text = webNames[0] || 'Official Website'; html += createSNSLink('web', sns.web, text); } }
  if (sns.youtube) { const ytNames = Array.isArray(sns.ytname) ? sns.ytname : [sns.ytname]; if (Array.isArray(sns.youtube)) { sns.youtube.forEach((link, index) => { const text = ytNames[index] || 'YouTube'; html += createSNSLink('youtube', link, text); }); } else { const text = ytNames[0] || 'YouTube'; html += createSNSLink('youtube', sns.youtube, text); } }
  if (sns.twitter) { if (Array.isArray(sns.twitter)) { sns.twitter.forEach(link => { const handle = `@${link.split('/').pop()}`; html += createSNSLink('twitter', link, handle); }); } else { const handle = `@${sns.twitter.split('/').pop()}`; html += createSNSLink('twitter', sns.twitter, handle); } }
  if (sns.twittpb) { if (Array.isArray(sns.twittpb)) { sns.twittpb.forEach(link => { const handle = `@${link.split('/').pop()}`; html += createSNSLink('twittpb', link, handle); }); } else { const handle = `@${sns.twittpb.split('/').pop()}`; html += createSNSLink('twittpb', sns.twittpb, handle); } }
  if (sns.tiktok) { const handle = `@${sns.tiktok.split('/').pop()}`; html += createSNSLink('tiktok', sns.tiktok, handle); }
  if (sns.weibo) { const handle = sns.weibo.split('/').pop(); html += createSNSLink('weibo', sns.weibo, handle); }
  return html;
}
function generateAdanaHTML(adana) {
  if (!adana) return '';
  const categoryConfig = [
    { prefix: 'adana', label: 'Panggilan', maxCount: 10 },
    { prefix: 'adanaaya', label: 'Panggilan (小川)', maxCount: 5 },
    { prefix: 'adanasakutan', label: 'Panggilan (川﨑)', maxCount: 5 },
    { prefix: 'adanasakuchan', label: 'Panggilan (遠藤)', maxCount: 5 },
    { prefix: 'adanaother', label: 'Panggilan (Acara)', maxCount: 5 },
    { prefix: 'adanahina', label: 'Julukan dari Kawago', maxCount: 5 },
    { prefix: 'adanaasuka', label: 'Julukan dari Asuka', maxCount: 5 },
  ];
  let html = '';
  categoryConfig.forEach(config => {
    const items = [];
    for (let i = 1; i <= config.maxCount; i++) {
      const key = `${config.prefix}${i}`; 
      if (adana[key]) {
        items.push(adana[key]);
      }
    }
    if (items.length > 0) {
      html += `<div class="data-row"><div class="data-label">${config.label}</div><div class="data-value">${items.join('<br/>')}</div></div>`;
    }
  });
  return html;
}
function generateMbtiHTML(mbti) {
    if (!mbti) return '';
    const verifiedIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" style="color: white; vertical-align: middle; margin-left: -5px; margin-top:-1pt"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" stroke-width="0" fill="currentColor"></path></svg>`;
    let content = '';
    const predictions = [];
    if (mbti.predict1 && mbti.predicturl1) predictions.push(`Prediksi 1: <a href="${mbti.predicturl1}" target="_blank">${mbti.predict1}</a>`);
    if (mbti.predict2 && mbti.predicturl2) predictions.push(`Prediksi 2: <a href="${mbti.predicturl2}" target="_blank">${mbti.predict2}</a>`);
    if (mbti.predict3 && mbti.predicturl3) predictions.push(`Prediksi 3: <a href="${mbti.predicturl3}" target="_blank">${mbti.predict3}</a>`);
    const predictionHTML = predictions.length > 0 ? `<br/><small>${predictions.join('<br/>')}</small>` : '';
    if (mbti.official === "yes") {
        const isStatement = ["絶対に公表しない", "分かりません", "教えません", "恥ずかしい", "内緒"].some(s => mbti.type1.includes(s));
        let urlContent = '';
        if (mbti.url) {
            if (Array.isArray(mbti.url)) {
                urlContent = `<a href="${mbti.url[1]}" target="_blank">${mbti.url[0]}</a>`;
            } else {
                urlContent = `<span>${mbti.url}</span>`;
            }
            urlContent = `<br/><small>(${urlContent})</small>`;
        }
        content = `${mbti.type1} ${verifiedIcon}${urlContent}`;
        if (isStatement) {
            content += predictionHTML;
        }
    } else {  
        content = `Tidak diketahui${predictionHTML}`;
    }
    return `<div class="data-row"><div class="data-label">MBTI</div><div class="data-value">${content}</div></div>`;
}
function generateActivityHTML(member) {
  const items = [];
  if (member.dateKualifikasi) items.push({ jp: "合格発表日", id: "Tanggal Lolos Audisi", value: member.dateKualifikasi });
  if (member.dateKenninStart) items.push({ jp: "兼任発表日", id: "Tanggal Kennin Dimulai", value: member.dateKenninStart });
  if (member.dateKenninEnd) items.push({ jp: "兼任終了日", id: "Tanggal Kennin Berakhir", value: member.dateKenninEnd });
  if (member.datePerkenalan) items.push({ jp: "お披露目日", id: "Tanggal Perkenalan Resmi", value: member.datePerkenalan });
  if (member.datePromosi) items.push({ jp: "昇格発表日", id: "Tanggal Kenaikan Status dari Kenyuusei", value: member.datePromosi });
  if (member.dateTerdaftar) items.push({ jp: "配属決定", id: "Tanggal Penempatan Resmi", value: member.dateTerdaftar });
  if (member.placePerkenalan) items.push({ jp: "お披露目イベント", id: "Tanggal Event Pengenalan", value: member.placePerkenalan });
  if (items.length === 0) return '';
  const rows = items.map(item => `<div class="katsudo-row"><div class="katsudo-label"><div class="katsudo-label-id">${item.id}</div><div class="katsudo-label-jp">${item.jp}</div></div><div class="katsudo-value">${item.value}</div></div>`).join('');
  return `<div class="katsudo-container"><h2>DATA AKTIFITAS MEMBER</h2><div class="katsudo-grid">${rows}</div></div>`;
}
function generateHiatusHTML(member, hiatusData) {
    const memberHiatusData = hiatusData[member.nama_jp];
    if (!memberHiatusData) return '';
    const hiatusEntries = Array.isArray(memberHiatusData) ? memberHiatusData : [memberHiatusData];
    let allHiatusHTML = '';
    hiatusEntries.forEach((hiatus, index) => {
        const prefix = hiatusEntries.length > 1 ? `(${(index + 1)}) ` : '';
        const urlButton = hiatus.url 
            ? `<br/><a href="${hiatus.url}" class="partisipasi-link" target="_blank" style="margin-top:10px;">Lihat Pengumuman</a>`
            : '';
        allHiatusHTML += `
            <div class="katsudo-row">
                <div class="katsudo-label">
                    <div class="katsudo-label-id">${prefix}Tanggal dimulai</div>
                    <div class="katsudo-label-jp">休業発表</div>
                </div>
                <div class="katsudo-value">${formatTanggal(hiatus.datestart)}</div>
            </div>
            <div class="katsudo-row">
                <div class="katsudo-label">
                    <div class="katsudo-label-id">${prefix}Tanggal berakhir</div>
                    <div class="katsudo-label-jp">復帰日</div>
                </div>
                <div class="katsudo-value">${formatTanggal(hiatus.dateend)}</div>
            </div>
            <div class="katsudo-row">
                <div class="katsudo-label">
                    <div class="katsudo-label-id">${prefix}Periode</div>
                    <div class="katsudo-label-jp">休業期間</div>
                </div>
                <div class="katsudo-value">${hiatus.period}</div>
            </div>
            <div class="katsudo-row">
                <div class="katsudo-label">
                    <div class="katsudo-label-id">${prefix}Alasan</div>
                    <div class="katsudo-label-jp">休止理由</div>
                </div>
                <div class="katsudo-value">${hiatus.reason}</div>
            </div>
            <div class="katsudo-row">
                <div class="katsudo-label">
                    <div class="katsudo-label-id">${prefix}Catatan</div>
                    <div class="katsudo-label-jp">備考</div>
                </div>
                <div class="katsudo-value">${hiatus.note}${urlButton}</div>
            </div>
        `;
        if (hiatusEntries.length > 1 && index < hiatusEntries.length - 1) {
            allHiatusHTML += `<div class="katsudo-row separator-hiatus"></div>`;
        }
    });
    return `<div class="hiatus-container"><h2>DATA HIATUS</h2><div class="katsudo-grid">${allHiatusHTML}</div></div>`;
}
function generateGraduationHTML(member) {
  const items = [];
  if (member.dateGradAnn) items.push({ jp: "卒業の発表日", id: "Tanggal Pengumuman", value: member.dateGradAnn });
  if (member.dateGradMedia) items.push({ jp: "卒業の発表形式", id: "Media Pengumuman", value: member.dateGradMedia });
  if (member.dateGradAge) items.push({ jp: "卒業時の年齢", id: "Usia Saat Lulus", value: member.dateGradAge });
  if (member.gradAlasan) items.push({ jp: "卒業理由", id: "Alasan Lulus", value: member.gradAlasan });
  if (member.dateGradeLast) items.push({ jp: "卒業日", id: "Tanggal Aktifitas Terakhir", value: member.dateGradeLast });
  if (member.dateGradActLast) items.push({ jp: "メンバーとしての最終活動", id: "Aktivitas Terakhir", value: member.dateGradActLast });
  if (member.namaAgensi) items.push({ jp: "事務所", id: "Agensi", value: member.namaAgensi });
  if (items.length === 0) return '';
  const rows = items.map(item => `<div class="sotsu-row"><div class="sotsu-label"><div class="sotsu-label-id">${item.id}</div><div class="sotsu-label-jp">${item.jp}</div></div><div class="sotsu-value">${item.value}</div></div>`).join('');
  return `<div class="sotsu-container"><h2>DATA KELULUSAN</h2><div class="sotsu-grid">${rows}</div></div>`;
}
if (memberId) {
  fetch("../store/member/members.json")
    .then(res => res.json())
    .then(members => {
      const container = document.getElementById("main");
      container.innerHTML = "";
      const member = members.find(m => m.id === memberId);
      if (!member) {
        container.innerHTML = "<h2>Member tidak ditemukan.</h2>";
        return;
      }
      const activityHTML = generateActivityHTML(member);
      const graduationHTML = generateGraduationHTML(member);
      const formattedDate = formatTanggal(member.lahir);
      const umur = hitungUmur(member.lahir);
      const umurText = `${umur.tahun} tahun ${umur.hari} hari`;
      const genLabel = member.gen.replace("期", "").replace(/^(\d+)/, "Generasi ke-$1");
      const asalFormatted = convertPrefecture(member.asal);
      const namaRomajiFormatted = formatNamaRomaji(member.nama_romaji);
      let photoClass = "profile-full";
      if (member.status === "lulus" && !specialGraduatedMembers.has(member.nama_romaji)) {
        photoClass = "graduated-photo";
      }
      Promise.all([
        fetch("../store/member/sns.json").then(res => res.json()),
        fetch("../store/member/adana.json").then(res => res.json()),
        fetch("../store/member/members_kyoudaishimai.json").then(res => res.json()),
        fetch("../store/member/zodiac.json").then(res => res.json()),
        fetch("../store/member/mbti.json").then(res => res.json()),
        fetch("../store/member/members_hiatus.json").then(res => res.json())  
      ])
      .then(([snsData, adanaData, kyoudaishimaiData, zodiacData, mbtiData, hiatusData]) => {  
        const snsKey = member.nama_romaji.toLowerCase().replace(/ /g, '_');
        const memberSNS = snsData[snsKey];
        let snsContent = '';
        if (memberSNS) {
          const snsLinks = generateSNSLinks(memberSNS);
          if (snsLinks) {
            snsContent = `<div class="sns-links" style="display: flex; flex-wrap: wrap; margin-top: 5px;">${snsLinks}</div><h6 class="note">*URL/username bisa saja berubah, atau dihapus ybs</h6>`;
          }
        }
        const memberAdana = adanaData[member.nama_jp];
        const adanaHTML = generateAdanaHTML(memberAdana);
        const memberKyoudaishimai = kyoudaishimaiData.find(k => k.memberNameJP === member.nama_jp);
        let kyoudaishimaiHTML = '';
        if (memberKyoudaishimai) {
            kyoudaishimaiHTML = `<div class="data-row"><div class="data-label">Saudara</div><div class="data-value">${memberKyoudaishimai.memberStatus}<br/><font size="1.2em">(${memberKyoudaishimai.memberStatDe})</font></div></div>`;
        }
        const zodiacSign = getZodiacSign(member.lahir, zodiacData);
        let zodiacHTML = '';
        if (zodiacSign) {
            const zodiacIcon = zodiacIcons[zodiacSign] || '';
            zodiacHTML = `
                <div class="data-row">
                  <div class="data-label">Zodiak</div>
                  <div class="data-value" style="display: flex; align-items: center; gap: 8px;">
                    ${zodiacIcon}
                    <span>${zodiacSign}</span>
                  </div>
                </div>`;
        }
        const memberMbti = mbtiData[member.nama_jp];
        const mbtiHTML = generateMbtiHTML(memberMbti);
        const hiatusHTML = generateHiatusHTML(member, hiatusData);
        const memberNamaJPHtml = member.nama_jp.split('').map((char, index) => {
            if (char === ' ' || char === '_') return `<span style="--i:${index + 1}; display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`;
            return `<span style="--i:${index + 1};">${char}</span>`;
        }).join('');
        container.innerHTML = `
         <div class="profile-container">
		    <div class="profile-photo">
		        <img src="${member.foto_profil}" class="${photoClass}" alt="${namaRomajiFormatted}">
		    </div>
            <div class="profile-data">
              <div class="member-plat-header"><div class="member-plat-jp-animated">${memberNamaJPHtml}</div></div>
              <div class="data-grid">
                <div class="data-row"><div class="data-label">Nama Lengkap</div><div class="data-value">${namaRomajiFormatted}</div></div>
                ${adanaHTML}
                <div class="data-row"><div class="data-label">Tanggal Lahir</div><div class="data-value">${formattedDate} <font size="1pt">(${umurText})</font></div></div>
                <div class="data-row"><div class="data-label">Asal</div><div class="data-value">${asalFormatted}</div></div>
                <div class="data-row"><div class="data-label">Golongan Darah</div><div class="data-value">${member.gol_darah}</div></div>
                ${zodiacHTML}
                ${mbtiHTML}
                <div class="data-row"><div class="data-label">Tinggi</div><div class="data-value">${member.tinggi}</div></div>
                <div class="data-row"><div class="data-label">Generasi</div><div class="data-value">${genLabel}</div></div>
                ${kyoudaishimaiHTML}
                ${snsContent}
                <a class="partisipasi-link" href="participate.html?id=${member.id}">Garapan Kami yang Ada ${namaRomajiFormatted}</a>
              </div>
            </div>
          </div>
		 ${activityHTML}
         ${hiatusHTML}
		 ${graduationHTML}
          <div class="histori-container">
            <h2>Foto Histori di Nogizaka</h2>
            <div class="histori-grid">
              ${Array.from({ length: member.histori.akhir - member.histori.mulai + 1 }, (_, i) => {
                const no = member.histori.mulai + i;
                if (skipSingles.has(no)) return '';
                const index = String(no).padStart(3, '0');
                const filename = member.id.replace(/-/g, "_");
                const year = singleYears[no] || 'Tahun tidak diketahui';
                return `<div class="histori-item"><img src="https://ik.imagekit.io/moearchive/web/memberprofile/s${index}/${filename}.png" alt="Single ke-${no}"><div><b>${no}</b> (${year})</div></div>`;
              }).join("")}
            </div>
          </div>
        `;
        window.currentMember = member;
        document.dispatchEvent(new Event('memberReady'));
      })
      .catch(error => {
        console.error("Error loading additional data:", error);
        container.innerHTML = `<h2>Error: Gagal memuat data tambahan.</h2><p>${error}</p>`;
      });
    })
    .catch(error => {
      console.error("Error loading members:", error);
      const container = document.getElementById("main");
      container.innerHTML = "<h2>Error loading member data.</h2>";
    });
}