let pictReleaseDB = {};
window.cropDB = {};
let exceptDB = {};


// ============================

const LATEST_NOGI_DATE = "2026.05.05";

// ============================

async function loadPictReleaseData() {
    try {
        const res = await fetch("../store/member/members_pict_release.json");
        if (res.ok) {
            pictReleaseDB = await res.json();
        }
    } catch (e) {
        console.warn(e);
    }

    try {
        const resExcept = await fetch("../store/data/sr_except.json");
        if (resExcept.ok) {
            exceptDB = await resExcept.json();
        }
    } catch (e) {
        console.warn(e);
    }

    const groups = ["nogi", "sakura", "hinata", "keyaki"];
    for (const g of groups) {
        try {
            const resCrop = await fetch(`../store/member/members_pict_crop_${g}.json`);
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
        if (groupStr.includes("乃木坂46")) groupKey = "nogi";
        else if (groupStr.includes("櫻坂46")) groupKey = "sakura";
        else if (groupStr.includes("日向坂46") || groupStr.includes("けやき坂46")) groupKey = "hinata";
        else if (groupStr.includes("欅坂46")) groupKey = "keyaki";
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
    let cropSourceKey = "s01";
    let isStandardSingle = true;
    const name = memberObj.nama_jp;

    if (exceptDB[streamDate] && exceptDB[streamDate][name]) {
        const exData = exceptDB[streamDate][name];
        folderPrefix = exData.folder;
        sKey = exData.sKey;
        finalUrl = `https://ik.imagekit.io/moearchive/web/member/${folderPrefix}/${sKey}/${exData.file}`;
        cropSourceKey = exData.crop;
        isStandardSingle = false;
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
                cropSourceKey = sKey;
                isStandardSingle = true;
            } else {
                sKey = "special";
                finalUrl = memberObj.foto_profil;
                cropSourceKey = "special";
                isStandardSingle = false;
            }
        }
    }

    return {
        url: finalUrl,
        fallbacks: getFallbackUrls(finalUrl, memberObj, folderPrefix, cropSourceKey)
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

function getFallbackUrls(originalUrl, memberObj, folderPrefix, cropSourceKey) {
    const basePath = originalUrl.substring(0, originalUrl.lastIndexOf('.'));
    const gen = memberObj.gen ? memberObj.gen.replace("生", "") : ""; 
    const nama = memberObj.nama_jp;

    let fallbacks = [];

    if (cropSourceKey !== "special" && cropSourceKey.startsWith("s")) {
        fallbacks.push(basePath + "_02.jpg");
        fallbacks.push(basePath + "_01.jpg");
        fallbacks.push(basePath + "_03.jpg");
        fallbacks.push(basePath + "_mobile.jpg");
        fallbacks.push(originalUrl.replace('.jpg', '.png'));
        fallbacks.push(basePath + "_02.png");
        fallbacks.push(basePath + "_01.png");
    } else {
        const specialBase = `https://ik.imagekit.io/moearchive/web/member/${folderPrefix}/special`;
        
        if (gen) {
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_${nama}_2018.jpg`);
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_${nama}_2020.jpg`);
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_2018_${nama}.jpg`);
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_2020_${nama}.jpg`);
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_${nama}.jpg`);
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_${nama}.png`);
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_${nama}_01.jpg`);
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_${nama}_yt.jpg`);
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_${nama}_omotenashikai.jpg`);
            
            if (gen === "1期") {
                fallbacks.push(`${specialBase}/1期生/1期生_${nama}_2016.jpg`);
                fallbacks.push(`${specialBase}/1期生/1期生_${nama}_2020.jpg`);
                fallbacks.push(`${specialBase}/1期生/1期生_${nama}_2011.jpg`);
                fallbacks.push(`${specialBase}/1期生/1期生_${nama}_合格.jpg`);
                fallbacks.push(`${specialBase}/1期生/1期生_2016_${nama}.jpg`);
                fallbacks.push(`${specialBase}/1期生/1期生_2020_${nama}.jpg`);
                fallbacks.push(`${specialBase}/1期生/1期生_2015_${nama}_01.jpg`);
            }
            fallbacks.push(`${specialBase}/新参者/新参者_${gen}生_${nama}.jpg`);
        }
        
        if (gen.includes("新")) {
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_${nama}_2020_03.jpg`);
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_${nama}_2020_04.jpg`);
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_2020_${nama}_03.jpg`);
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_2020_${nama}_04.jpg`);
            fallbacks.push(`${specialBase}/${gen}生/${gen}生_${nama}.jpg`);
        }
        
        fallbacks.push(`${specialBase}/復帰/復帰_${nama}.jpg`);
        fallbacks.push(`https://ik.imagekit.io/moearchive/web/member/${folderPrefix}/a01/a01_${nama}.jpg`);
        fallbacks.push(`https://ik.imagekit.io/moearchive/web/member/${folderPrefix}/a02/a02_${nama}.jpg`);
        fallbacks.push(`https://ik.imagekit.io/moearchive/web/member/${folderPrefix}/a03/a03_${nama}.jpg`);
    }

    if (memberObj.foto_profil) {
        fallbacks.push(memberObj.foto_profil);
    }

    const uniqueFallbacks = [...new Set(fallbacks)];

    return uniqueFallbacks.join(',');
}

window.handleMoeFallback = function(img) {
    if (!img.dataset.fallbacks) {
        img.onerror = null;
        return;
    }
    let fallbacks = img.dataset.fallbacks.split(',');
    let state = parseInt(img.dataset.fallbackState || "0");
    
    if (state < fallbacks.length) {
        img.dataset.fallbackState = state + 1;
        img.src = fallbacks[state];
    } else {
        img.onerror = null;
    }
};

window.getAccurateCrop = function(imgSrc, memberName) {
    if (!imgSrc.includes('/member/v3_')) return null;
    
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