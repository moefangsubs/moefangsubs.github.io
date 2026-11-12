let pictReleaseDB = {};
window.cropDB = {};
let exceptDB = {};

// ============================
const LATEST_NOGI_DATE = "2026.10.25";
// ============================

async function loadPictReleaseData() {
    try {
        let res = await fetch("../store/member/members_pict_release.json");
        if (!res.ok) res = await fetch("../store/data/member/members_pict_release.json");
        if (res.ok) {
            pictReleaseDB = await res.json();
        }
    } catch (e) {
        console.warn(e);
    }

    try {
        let resExcept = await fetch("../store/data/sr_except.json");
        if (!resExcept.ok) resExcept = await fetch("../store/member/sr_except.json");
        if (resExcept.ok) {
            exceptDB = await resExcept.json();
        }
    } catch (e) {
        console.warn(e);
    }

    const groups = ["nogi", "sakura", "hinata", "keyaki"];
    for (const g of groups) {
        try {
            let resCrop = await fetch(`../store/member/members_pict_crop_${g}.json`);
            if (!resCrop.ok) {
                resCrop = await fetch(`../store/data/member/members_pict_crop_${g}.json`);
            }
            if (resCrop.ok) {
                const groupData = await resCrop.json();
                window.cropDB[`v3_${g}`] = groupData[`v3_${g}`];
            }
        } catch (e) {
            console.warn(e);
        }
    }
}

function getMemberPhotoInfo(memberObj, streamDate, groupStr) {
    let groupKey = memberObj.group_id || "";

    if (!groupKey) {
        if (groupStr.includes("乃木坂46") || groupStr === "nogizaka46") groupKey = "nogi";
        else if (groupStr.includes("櫻坂46") || groupStr === "sakurazaka46") groupKey = "sakura";
        else if (groupStr.includes("日向坂46") || groupStr.includes("けやき坂46") || groupStr === "hinatazaka46") groupKey = "hinata";
        else if (groupStr.includes("欅坂46") || groupStr === "keyakizaka46") groupKey = "keyaki";
        else return { url: memberObj.foto_profil, fallbacks: "" };
    }

    if (groupKey === "sakura" && streamDate < "2020.10.14") {
        groupKey = "keyaki";
    }

    let folderPrefix = "";
    if (groupKey === "nogi") folderPrefix = "v3_nogi";
    else if (groupKey === "sakura") folderPrefix = "v3_sakura";
    else if (groupKey === "hinata") folderPrefix = "v3_hinata";
    else if (groupKey === "keyaki") folderPrefix = "v3_keyaki";
    else return { url: memberObj.foto_profil, fallbacks: "" };

    let sKey = "s01"; 
    let finalUrl = "";
    const name = memberObj.nama_jp;

    if (exceptDB[streamDate] && exceptDB[streamDate][name]) {
        const exData = exceptDB[streamDate][name];
        folderPrefix = exData.folder;
        sKey = exData.sKey;
        finalUrl = `https://ik.imagekit.io/moearchive/web/member/${folderPrefix}/${sKey}/${exData.file}`;
    }

    if (finalUrl === "") {
        if (pictReleaseDB[groupKey] && pictReleaseDB[groupKey].single) {
            const singles = pictReleaseDB[groupKey].single;
            let targetSingleNum = 0;

            for (let i = 0; i < singles.length; i++) {
                const single = singles[i];
                if (!single.updateDate) continue;

                let releaseDate = "";
                if (typeof single.updateDate === "string") {
                    releaseDate = single.updateDate;
                } else if (typeof single.updateDate === "object") {
                    if (single.updateDate[name]) {
                        releaseDate = single.updateDate[name];
                    } else if (single.updateDate["default"]) {
                        if (typeof single.updateDate["default"] === "string") {
                            releaseDate = single.updateDate["default"];
                        } else if (typeof single.updateDate["default"] === "object" && single.updateDate["default"][name]) {
                            releaseDate = single.updateDate["default"][name];
                        }
                    }
                }

                if (releaseDate && streamDate >= releaseDate) {
                    targetSingleNum = single.num;
                }
            }

            if (targetSingleNum > 0) {
                const sNum = targetSingleNum.toString().padStart(2, '0');
                sKey = `s${sNum}`;
                finalUrl = `https://ik.imagekit.io/moearchive/web/member/${folderPrefix}/${sKey}/${sKey}_${name}.jpg`;
            } else {
                sKey = "special";
                finalUrl = memberObj.foto_profil;
            }
        } else {
            finalUrl = memberObj.foto_profil;
        }
    }

    // Hindari permutasi spekulatif yang memicu 404 beruntun.
    // Jika gambar URL utama gagal, langsung gunakan memberObj.foto_profil yang sudah terverifikasi.
    let fallbacks = "";
    if (memberObj.foto_profil && memberObj.foto_profil !== finalUrl) {
        fallbacks = memberObj.foto_profil;
    }

    return {
        url: finalUrl,
        fallbacks: fallbacks
    };
}

function getCropData(groupKey, singleId, memberName, cropType) {
    if (!cropDB[groupKey] || !cropDB[groupKey][singleId]) return null;
    
    const singleData = cropDB[groupKey][singleId];
    const subTypeData = singleData['original'] || Object.values(singleData)[0];
    
    if (!subTypeData) return null;
    
    let styleData = subTypeData[cropType];
    if (!styleData) {
        if (cropType === 'lockratio' && subTypeData['normal']) {
            styleData = subTypeData['normal'];
        } else if (cropType === 'normal' && subTypeData['lockratio']) {
            styleData = subTypeData['lockratio'];
        } else {
            return null;
        }
    }

    let result = { ...styleData };
    delete result.custom;

    if (styleData.custom && styleData.custom[memberName]) {
        result = { ...result, ...styleData.custom[memberName] };
    }

    return result;
}

window.handleMoeFallback = function(img) {
    if (!img || !img.dataset || !img.dataset.fallbacks) {
        if (img) img.onerror = null;
        return;
    }
    let fallbacks = img.dataset.fallbacks.split(',').filter(f => f.trim().length > 0);
    let state = parseInt(img.dataset.fallbackState || "0");
    
    if (state < fallbacks.length) {
        img.dataset.fallbackState = state + 1;
        img.src = fallbacks[state];
    } else {
        img.onerror = null;
    }
};

window.getAccurateCrop = function(imgSrc, memberName) {
    if (!imgSrc || !imgSrc.includes('/member/v3_')) return null;
    
    const parts = imgSrc.split('/');
    const v3Index = parts.findIndex(p => p.startsWith('v3_'));
    if (v3Index === -1) return null;
    
    const folderPrefix = parts[v3Index]; 
    const sKey = parts[v3Index + 1]; 
    
    if (!window.cropDB[folderPrefix]) return null;

    let cropNode = null;

    if (sKey === 'special') {
        const catKey = parts[v3Index + 2]; 
        const fileName = parts[v3Index + 3]; 

        if (window.cropDB[folderPrefix].special && window.cropDB[folderPrefix].special[catKey]) {
            const catNode = window.cropDB[folderPrefix].special[catKey];
            let matchedSubKey = null;
            for (const sk in catNode) {
                if (fileName && fileName.includes(sk)) {
                    matchedSubKey = sk;
                    break;
                }
            }
            if (matchedSubKey) cropNode = catNode[matchedSubKey];
            else cropNode = catNode['original'] || catNode[Object.keys(catNode)[0]];
        }
    } else {
        if (window.cropDB[folderPrefix][sKey]) {
            const singleNode = window.cropDB[folderPrefix][sKey];
            let matchedSubKey = null;
            for (const sk in singleNode) {
                if (sk !== 'original' && imgSrc.includes(sk)) {
                    matchedSubKey = sk;
                    break;
                }
            }
            if (matchedSubKey) cropNode = singleNode[matchedSubKey];
            else cropNode = singleNode['original'] || singleNode[Object.keys(singleNode)[0]];
        }
    }

    if (!cropNode) return null;

    let round = cropNode['round'] ? { ...cropNode['round'] } : null;
    let normal = cropNode['lockratio'] ? { ...cropNode['lockratio'] } : (cropNode['normal'] ? { ...cropNode['normal'] } : null);

    if (round && round.custom && round.custom[memberName]) {
        round = { ...round, ...round.custom[memberName] };
    }
    if (normal && normal.custom && normal.custom[memberName]) {
        normal = { ...normal, ...normal.custom[memberName] };
    }

    return { round, normal };
};

window.applyMoeCrop = function(img, memberName) {
    if (!img) return;
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    if (!nw || !nh) return;

    const container = img.parentElement;
    if (!container) return;

    const cw = container.clientWidth || container.offsetWidth || 80;
    const ch = container.clientHeight || container.offsetHeight || 130;
    if (!cw || !ch) return;

    const crop = window.getAccurateCrop ? window.getAccurateCrop(img.src, memberName) || {} : {};

    let cx, cy, cropW, cropH;
    const isPortrait = ch > cw;

    if (isPortrait && crop.normal) {
        const c = crop.normal;
        const ox = c['offset-x'] || 0;
        const oy = c['offset-y'] || 0;
        const c_left = (c.left || 0) + ox;
        const c_right = nw - (c.right || 0) + ox;
        const c_top = (c.top || 0) + oy;
        const c_bottom = nh - (c.bottom || 0) + oy;

        cropW = c_right - c_left;
        cropH = c_bottom - c_top;
        cx = c_left + (cropW / 2);
        cy = c_top + (cropH / 2);
    } 
    else if (crop.round) {
        const c = crop.round;
        const r = c.radius || (nw / 2);
        const ox = c['offset-x'] || 0;
        let oy = c['offset-y'];
        if (oy === undefined || oy === null) oy = r - (nh / 2);

        cropW = r * 2;
        cropH = r * 2;
        cx = (nw / 2) + ox;
        cy = (nh / 2) + oy;
    } 
    else {
        cropW = nw;
        cropH = nh;
        cx = nw / 2;
        cy = nh / 2;
    }

    if (cropW <= 0) cropW = nw;
    if (cropH <= 0) cropH = nh;

    let S = Math.max(cw / cropW, ch / cropH);
    let Tx = (cw / 2) - (cx * S);
    let Ty = (ch / 2) - (cy * S);

    if (nw * S >= cw) {
        if (Tx > 0) Tx = 0;
        if (Tx + nw * S < cw) Tx = cw - nw * S;
    } else {
        Tx = (cw - nw * S) / 2;
    }

    if (nh * S >= ch) {
        if (Ty > 0) Ty = 0;
        if (Ty + nh * S < ch) Ty = ch - nh * S;
    } else {
        Ty = (ch - nh * S) / 2;
    }

    img.style.position = 'absolute';
    img.style.left = '0';
    img.style.top = '0';
    img.style.width = nw + 'px';
    img.style.height = nh + 'px';
    img.style.maxWidth = 'none';
    img.style.transformOrigin = '0 0';
    img.style.transform = `translate(${Tx}px, ${Ty}px) scale(${S})`;
    
    if (img.parentElement) {
        img.parentElement.style.backgroundImage = 'none';
    }
    
    img.style.opacity = '1';
};
