/* ---------------------- */
/* Constants              */
/* ---------------------- */
const GROUP_COLORS = {
    "Nogizaka46": "#7A227F",
    "Sakurazaka46": "#F19DB5",
    "Hinatazaka46": "#81DBFF",
    "Keyakizaka46": "#8EEC82",
    "BokuAo": "#1685D8",
    "AKB48": "#FEE1EA",
    "=LOVE": "#BD0A20",
    "FRUITS ZIPPER": "#F5F0EF",
    "CANDY TUNE": "#8DACBA",
    "SWEET STEADY": "#D4EBF2",
    "CUTIE STREET": "#C9CCCD",
    "STU48": "#97B5DC",
    "Non-idol": "#808080"
};

let memberGroupMap = {};

/* ---------------------- */
/* Initialization         */
/* ---------------------- */
document.addEventListener("DOMContentLoaded", async () => {
    createModalElement();
    await initBarChart();
});

/* ---------------------- */
/* Modal UI Generation    */
/* ---------------------- */
function createModalElement() {
    let overlay = document.createElement("div");
    overlay.id = "moe-modal-overlay";
    
    let content = document.createElement("div");
    content.id = "moe-modal-content";
    
    let header = document.createElement("div");
    header.id = "moe-modal-header";
    
    let title = document.createElement("span");
    title.id = "moe-modal-title";
    title.innerText = "Daftar Garapan";
    
    let closeBtn = document.createElement("span");
    closeBtn.id = "moe-modal-close";
    closeBtn.innerHTML = "&times;";
    closeBtn.onclick = closeModal;
    
    let body = document.createElement("div");
    body.id = "moe-modal-body";
    
    // Menggunakan div (bukan ul) untuk menampung Grid system
    let list = document.createElement("div");
    list.id = "moe-modal-list";
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    body.appendChild(list);
    content.appendChild(header);
    content.appendChild(body);
    overlay.appendChild(content);
    
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });
}

function showModal(groupName, itemsList, color) {
    let overlay = document.getElementById("moe-modal-overlay");
    let title = document.getElementById("moe-modal-title");
    let list = document.getElementById("moe-modal-list");
    let header = document.getElementById("moe-modal-header");

    title.innerText = `Garapan: ${groupName} (${itemsList.length} Item)`;
    header.style.backgroundColor = color;
    list.innerHTML = "";

    itemsList.forEach(item => {
        let div = document.createElement("div");
        div.className = "moe-grid-item";
        
        let imgHTML = item.imgUrl ? `<img src="${item.imgUrl}" alt="${item.title}" loading="lazy">` : "";

        div.innerHTML = `
            <div class="item-shadow"></div>
            <a href="${item.link}" target="_blank">
                ${imgHTML}
                <div class="title">
                    <span class="moe-grid-badge" style="background-color: ${color};">${item.score.toFixed(2)}</span>
                    ${item.title}
                </div>
            </a>
        `;
        list.appendChild(div);
    });

    overlay.style.display = "flex";
}

function closeModal() {
    let overlay = document.getElementById("moe-modal-overlay");
    overlay.style.display = "none";
}

/* ---------------------- */
/* Data Loading           */
/* ---------------------- */
async function loadMembers() {
    const files = [
        {url: "store/member/members.json", group: "Nogizaka46"},
        {url: "store/member/members_db_saku.json", group: "Sakurazaka46"},
        {url: "store/member/members_db_hina.json", group: "Hinatazaka46"},
        {url: "store/member/members_db_keya.json", group: "Keyakizaka46"},
        {url: "store/member/members_db_boku.json", group: "BokuAo"}
    ];
    
    for (let file of files) {
        try {
            let res = await fetch(file.url);
            if (res.ok) {
                let data = await res.json();
                data.forEach(m => {
                    if (m.nama_jp) {
                        memberGroupMap[m.nama_jp.replace(/\s+/g, '')] = file.group;
                    }
                });
            }
        } catch (e) {}
    }
}

/* ---------------------- */
/* Parsing Logic          */
/* ---------------------- */
function parseParticipate(participateData) {
    if (!participateData) return {};
    let results = {};
    
    let participateStr = Array.isArray(participateData) ? participateData.join(",") : String(participateData);
    
    if (participateStr.includes("坂道シリーズ")) {
        return {"Nogizaka46": 1/3, "Sakurazaka46": 1/3, "Hinatazaka46": 1/3};
    }

    const explicitGroups = {
        "乃木坂46": "Nogizaka46",
        "桜坂46": "Sakurazaka46",
        "櫻坂46": "Sakurazaka46",
        "欅坂46": "Keyakizaka46",
        "けやき坂46": "Keyakizaka46",
        "日向坂46": "Hinatazaka46",
        "僕が見たかった青空": "BokuAo",
        "僕青": "BokuAo",
        "AKB48": "AKB48",
        "STU48": "STU48",
        "=LOVE": "=LOVE",
        "FRUITS ZIPPER": "FRUITS ZIPPER",
        "CANDY TUNE": "CANDY TUNE",
        "SWEET STEADY": "SWEET STEADY",
        "CUTIE STREET": "CUTIE STREET",
        "超ときめき♡宣伝部": "Non-idol"
    };

    let entities = participateStr.split(/[、,・]/).map(e => e.trim()).filter(e => e);
    let detectedGroups = new Set();
    
    for (let e of entities) {
        let matched = false;
        
        for (let [kw, grp] of Object.entries(explicitGroups)) {
            if (e.includes(kw)) {
                detectedGroups.add(grp);
                matched = true;
                break;
            }
        }
        
        if (!matched) {
            let mGrp = memberGroupMap[e.replace(/\s+/g, '')];
            if (mGrp) {
                detectedGroups.add(mGrp);
            }
        }
    }

    if (detectedGroups.size > 0) {
        let weight = 1.0 / detectedGroups.size;
        for (let g of detectedGroups) {
            results[g] = (results[g] || 0) + weight;
        }
    }
    
    return results;
}

function processSubFile(fileData, filepath) {
    let stats = {};
    let baseUrl = fileData.url || filepath.split('/').pop().replace('.json', '');
    let showName = fileData.nameShowTitle || baseUrl;

    function addStat(group, val, epKey, customTitle) {
        if (!stats[group]) stats[group] = { count: 0, items: [] };
        stats[group].count += val;
        
        let epData = (fileData.episodes && fileData.episodes[epKey]) ? fileData.episodes[epKey] : {};
        let epsStr = epKey || '';
        
        let titleLabel = customTitle;
        if (!titleLabel) {
            if (baseUrl === 'random-subs' || baseUrl === 'random' || baseUrl === 'bokuao-random') {
                titleLabel = epData.descEpisode ? epData.descEpisode.replace(/\|\s*/, '').trim() : (epsStr ? `Episode ${epsStr}` : showName);
            } else {
                let epsTitle = epData.descEpsListName || (epData.descEpisode ? epData.descEpisode.replace(/\|\s*/, '').trim() : (epsStr ? `Episode ${epsStr}` : ''));
                titleLabel = epsTitle ? `${showName} ${epsTitle}`.trim() : showName;
            }
        }
        
        let imageUrl = 'https://via.placeholder.com/320x180/e7c7ff/440079.png?text=No+Image';
        if (epData.imageThumbEps) {
            imageUrl = epData.imageThumbEps;
        } else if (fileData.IMGThumbnailEps && epsStr) {
            imageUrl = fileData.IMGThumbnailEps.replace('{{eps}}', epsStr);
        } else if (fileData.imageThumbBigPattern && epsStr) {
            imageUrl = fileData.imageThumbBigPattern.replace('{{eps}}', epsStr);
        } else if (fileData.IMGSitemap) {
            imageUrl = fileData.IMGSitemap;
        }

        let link = `../moesubs/#/${baseUrl}/${epsStr}`;
        if (filepath.includes("17_nonsakamichi") || filepath.includes("random.json")) {
            if (epData.linkHardsub) link = epData.linkHardsub;
        }

        stats[group].items.push({
            title: titleLabel,
            score: val,
            imgUrl: imageUrl,
            link: link
        });
    }

    let epKeys = fileData.availableEpisode || [];
    let episodesObj = fileData.episodes || {};
    
    if (epKeys.length === 0) {
        epKeys = Object.keys(episodesObj);
    }

    if (filepath.endsWith("17_nonsakamichi/random.json")) {
        let epCount = epKeys.length;
        if (epCount > 0) {
            epKeys.forEach(ep => addStat("Non-idol", 1, ep));
        } else {
            addStat("Non-idol", 1, "", `${showName} (Full)`);
        }
        return stats;
    }

    let globalDist = parseParticipate(fileData.memberParticipate);
    
    if (epKeys.length === 0) {
        let distToUse = Object.keys(globalDist).length > 0 ? globalDist : {};
        if (Object.keys(distToUse).length === 0) {
            if (filepath.includes("bokuao") || filepath.includes("sakamichi-no-mukou")) {
                distToUse = {"BokuAo": 1};
            } else if (filepath.includes("equal-love") || filepath.includes("ikorabu") || filepath.includes("kokoko")) {
                distToUse = {"=LOVE": 1};
            } else {
                distToUse = {"Non-idol": 1};
            }
        }
        for (let g in distToUse) {
            addStat(g, distToUse[g], "", `${showName} (Full)`);
        }
        return stats;
    }

    for (let epKey of epKeys) {
        let ep = episodesObj[epKey] || {};
        let epDist = parseParticipate(ep.memberParticipate);
        let distToUse = Object.keys(epDist).length > 0 ? epDist : globalDist;
        
        if (Object.keys(distToUse).length === 0) {
            if (filepath.includes("bokuao") || filepath.includes("sakamichi-no-mukou")) {
                distToUse = {"BokuAo": 1};
            } else if (filepath.includes("equal-love") || filepath.includes("ikorabu") || filepath.includes("kokoko")) {
                distToUse = {"=LOVE": 1};
            } else {
                distToUse = {"Non-idol": 1};
            }
        }
        
        for (let g in distToUse) {
            addStat(g, distToUse[g], epKey);
        }
    }
    return stats;
}

function parseMVData(data, defaultGroup) {
    let stats = {};
    
    function addStat(group, val, songTitle, linkStr) {
        if (!stats[group]) stats[group] = { count: 0, items: [] };
        stats[group].count += val;
        
        stats[group].items.push({
            title: `MV: ${songTitle}`,
            score: val,
            imgUrl: "",
            link: linkStr || '#'
        });
    }

    function findSongs(obj, currentKey) {
        if (Array.isArray(obj)) {
            if (obj.length > 0 && obj[0].titleJp !== undefined) {
                for (let song of obj) {
                    if (song.HasMV === "yes" && song.LinkDownMV1 && song.LinkDownMV1.trim() !== "") {
                        let sTitle = song.titleJp || "Unknown";
                        let linkStr = song.LinkDownMV1;
                        if (currentKey === "akb38") {
                            addStat("AKB48", 0.5, sTitle, linkStr);
                            addStat("Nogizaka46", 0.5, sTitle, linkStr);
                        } else if (["akb47", "akb51", "akb55"].includes(currentKey)) {
                            addStat("AKB48", 0.25, sTitle, linkStr);
                            addStat("Nogizaka46", 0.25, sTitle, linkStr);
                            addStat("Keyakizaka46", 0.25, sTitle, linkStr);
                            addStat("Hinatazaka46", 0.25, sTitle, linkStr);
                        } else {
                            addStat(defaultGroup, 1, sTitle, linkStr);
                        }
                    }
                }
            }
        } else if (typeof obj === "object" && obj !== null) {
            for (let k in obj) {
                findSongs(obj[k], k);
            }
        }
    }
    findSongs(data, "");
    return stats;
}


// Rekursif untuk membaca seluruh folder dan file di list.json
function fetchAllSubs(listObj, currentPath) {
    let promises = [];
    if (Array.isArray(listObj)) {
        listObj.forEach(item => {
            if (typeof item === 'string') {
                let path = `${currentPath}/${item}.json`;
                promises.push(
                    fetch(path).then(r => r.ok ? r.json() : null).then(data => {
                        if (data) return processSubFile(data, path);
                        return null;
                    }).catch(() => null)
                );
            } else if (typeof item === 'object') {
                promises = promises.concat(fetchAllSubs(item, currentPath));
            }
        });
    } else if (typeof listObj === 'object' && listObj !== null) {
        for (let key in listObj) {
            promises = promises.concat(fetchAllSubs(listObj[key], `${currentPath}/${key}`));
        }
    }
    return promises;
}

/* ---------------------- */
/* Main Processor         */
/* ---------------------- */
async function initBarChart() {
    await loadMembers();

    let finalStats = {};
    for (let g in GROUP_COLORS) {
        finalStats[g] = { count: 0, items: [] };
    }

    const mvFiles = [
        {url: "store/single/songall.json", group: "Nogizaka46"},
        {url: "store/single/songall_46sakura.json", group: "Sakurazaka46"},
        {url: "store/single/songall_46hinata.json", group: "Hinatazaka46"},
        {url: "store/single/songall_46keyaki.json", group: "Keyakizaka46"},
        {url: "store/single/songall_bokuao.json", group: "BokuAo"}
    ];

    for (let file of mvFiles) {
        try {
            let res = await fetch(file.url);
            if (res.ok) {
                let data = await res.json();
                let mvStats = parseMVData(data, file.group);
                for (let g in mvStats) {
                    if (!finalStats[g]) finalStats[g] = { count: 0, items: [] };
                    finalStats[g].count += mvStats[g].count;
                    finalStats[g].items.push(...mvStats[g].items);
                }
            }
        } catch(e) {}
    }

    try {
        let res = await fetch("store/subs/list.json");
        let listData = await res.json();
        
        let fetchPromises = fetchAllSubs(listData, "store/subs");
        let results = await Promise.all(fetchPromises);
        
        for (let subStats of results) {
            if (subStats) {
                for (let g in subStats) {
                    if (!finalStats[g]) finalStats[g] = { count: 0, items: [] };
                    finalStats[g].count += subStats[g].count;
                    finalStats[g].items.push(...subStats[g].items);
                }
            }
        }
    } catch(e) {}

    renderChart(finalStats);
}

/* ---------------------- */
/* Rendering              */
/* ---------------------- */
function renderChart(stats) {
    const chart = document.getElementById("moe-barchart");
    const legend = document.getElementById("moe-barchart-legend");
    if (!chart || !legend) return;

    let total = 0;
    for (let key in stats) {
        total += stats[key].count;
    }

    if (total === 0) return;

    let sortedGroups = Object.keys(stats)
        .filter(k => stats[k].count > 0)
        .sort((a, b) => stats[b].count - stats[a].count);

    chart.innerHTML = "";
    legend.innerHTML = "";

    sortedGroups.forEach(group => {
        let val = stats[group].count;
        let percent = (val / total) * 100;
        let color = GROUP_COLORS[group] || "#808080";
        
        let percentText = (percent > 0 && percent < 0.1) ? "<0.1%" : percent.toFixed(1) + "%";

        let segment = document.createElement("div");
        segment.className = "moe-barchart-segment";
        segment.style.width = percent + "%";
        segment.style.backgroundColor = color;
        
        if (percent > 4) {
            segment.innerText = percentText;
        }
        segment.title = `${group}: ${val.toFixed(2)} (${percentText}) - Klik untuk lihat detail`;
        
        segment.onclick = () => showModal(group, stats[group].items, color);
        chart.appendChild(segment);

        let legItem = document.createElement("div");
        legItem.className = "legend-item";
        legItem.innerHTML = `<div class="legend-color" style="background-color: ${color};"></div><span>${group} (${percentText})</span>`;
        
        legItem.onclick = () => showModal(group, stats[group].items, color);
        legend.appendChild(legItem);
    });
}