document.addEventListener("participationLoaded", () => {
  if (!window.memberParticipation) return;
  const result = window.memberParticipation;
  const rowColors = {
    C: "#ffd700", WC: "#ffd700", "1st": "var(--moe-tint3)", "2nd": "var(--moe-tint2)", "3rd": "var(--moe-tint1)",
    UC: "#9e91a7", UWC: "#9e91a7", U1: "#5D486D", U2: "#4A3A57", U3: "#382B41", U4: "#251d2c", U5: "#130e16"
  };
  const stats = { C: 0, WC: 0, "1st": 0, "2nd": 0, "3rd": 0, Under: 0, total: 0 };
  const items = [];
  Object.keys(result).sort((a, b) => +a - +b).forEach(num => {
    const { row } = result[num];
    items.push(`
      <div class="partisipasi-item" id="single-item-${num}" data-num="${num}">
        <div class="single-label">${num}</div>
        <img src="https://ik.imagekit.io/moearchive/singlealbum/n46_${String(num).padStart(2, '0')}.jpg" class="single-thumb" alt="Single ${num}">
        <div class="single-pos" style="background:${rowColors[row] || '#888'}; color:${row === 'C' || row === 'WC' ? 'var(--moe)' : 'white'}">${row}</div>
      </div>
    `);
    if (row === "C" || row === "WC") stats[row]++;
    else if (row.startsWith("U")) stats.Under++;
    else if (stats.hasOwnProperty(row)) stats[row]++;
    stats.total++;
  });
  let tooltip = document.getElementById("single-tooltip");
  if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "single-tooltip";
      document.body.appendChild(tooltip);
  }
  function showTooltip(event, num) {
    const data = result[num];
    if (!data || !data.romaji) return;
    let tooltipText = ""; const title = data.romaji;
    switch (data.row) {
      case "C": tooltipText = `Center Single "${title}"`; break;
      case "WC": tooltipText = `W-Center Single "${title}"`; break;
      case "1st": tooltipText = `"${title}" Front row dari 3 row`; break;
      case "2nd": tooltipText = `"${title}" Row 2 dari 3 row`; break;
      case "3rd": tooltipText = `"${title}" Row 3 dari 3 row`; break;
      case "UC": tooltipText = `Center Under "${title}"`; break;
      case "UWC": tooltipText = `W-Center Under "${title}"`; break;
      default: if (data.row && data.row.startsWith("U")) { const rowNum = data.row.substring(1); tooltipText = `"${title}" Under Row ${rowNum} dari ${data.totalRows} row`; }
    }
    if (tooltipText) {
      tooltip.textContent = tooltipText; tooltip.style.opacity = "1";
      const targetRect = event.currentTarget.getBoundingClientRect();
      tooltip.style.top = `${window.scrollY + targetRect.top - tooltip.offsetHeight - 10}px`;
      let leftPos = targetRect.left + (targetRect.width / 2) - (tooltip.offsetWidth / 2);
      const maxLeft = window.innerWidth - tooltip.offsetWidth - 10;
      leftPos = Math.min(Math.max(leftPos, 10), maxLeft);
      tooltip.style.left = `${leftPos}px`;
    }
  }
  function hideTooltip() { tooltip.style.opacity = "0"; }
  const partisipasiHTML = `<h3>PARTISIPASI DI SINGLE</h3><div class="partisipasi-container">${items.join("")}</div>`;
  const keterangan = `
    <div class="keterangan-container">
      <h3>KETERANGAN</h3>
      <ul class="partisipasi-keterangan">
        <li>Menjadi center: ${stats.C + stats.WC} kali</li>
        <li>Senbatsu 1st row: ${stats["1st"]} kali</li>
        <li>Senbatsu 2nd row: ${stats["2nd"]} kali</li>
        <li>Senbatsu 3rd row: ${stats["3rd"]} kali</li>
        <li>Under: ${stats.Under} kali</li>
        <li>Partisipasi single: ${stats.total} single</li>
        <li id="total-songs-participation">Partisipasi lagu: --- lagu</li>
      </ul>
    </div>`;
  const container = document.getElementById("main");
  container.insertAdjacentHTML("beforeend", partisipasiHTML + keterangan);
  document.querySelectorAll('.partisipasi-item').forEach(el => {
    const num = el.dataset.num;
    el.addEventListener('mouseenter', (e) => showTooltip(e, num));
    el.addEventListener('mouseleave', () => hideTooltip());
  });
});