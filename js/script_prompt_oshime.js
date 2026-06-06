/* ---------------------- */
/* Basic Form & Toggles   */
/* ---------------------- */
function toggleInput(inputId, checkbox) {
    const inputElement = document.getElementById(inputId);
    inputElement.disabled = !checkbox.checked;
    if (!checkbox.checked) {
        inputElement.value = '';
    }
}

function toggleColorTheme(checkbox) {
    const colorInput = document.getElementById('themeColorVal');
    colorInput.disabled = !checkbox.checked;
    colorInput.style.cursor = checkbox.checked ? 'pointer' : 'not-allowed';
}

function toggleOrnamentInput(checkbox) {
    const inputElement = document.getElementById('ornamentValue');
    const btnTrans = document.getElementById('btnTransOrnament');
    
    inputElement.disabled = !checkbox.checked;
    btnTrans.disabled = !checkbox.checked;
    
    if (!checkbox.checked) {
        inputElement.value = '';
    }
}

/* ---------------------- */
/* Advanced Menu logic    */
/* ---------------------- */
function toggleAdvanced(checkbox) {
    const advMenu = document.getElementById('advancedMenuBody');
    advMenu.style.display = checkbox.checked ? 'block' : 'none';
}

function updateFontSubRadios() {
    const cat = document.querySelector('input[name="fontCat"]:checked').value;
    const allSubs = document.querySelectorAll('.adv-sub-radio input[type="radio"]');
    allSubs.forEach(radio => radio.disabled = true);

    if (cat === 'basic') {
        const subs = document.querySelectorAll('input[name="fontBasic"]');
        subs.forEach(radio => radio.disabled = false);
        if (!document.querySelector('input[name="fontBasic"]:checked')) subs[0].checked = true;
    } else if (cat === 'fancy') {
        const subs = document.querySelectorAll('input[name="fontFancy"]');
        subs.forEach(radio => radio.disabled = false);
        if (!document.querySelector('input[name="fontFancy"]:checked')) subs[0].checked = true;
    } else if (cat === 'script') {
        const subs = document.querySelectorAll('input[name="fontScript"]');
        subs.forEach(radio => radio.disabled = false);
        if (!document.querySelector('input[name="fontScript"]:checked')) subs[0].checked = true;
    } else if (cat === 'holiday') {
        const subs = document.querySelectorAll('input[name="fontHoliday"]');
        subs.forEach(radio => radio.disabled = false);
        if (!document.querySelector('input[name="fontHoliday"]:checked')) subs[0].checked = true;
    }
}

function togglePoseInput() {
    const poseMode = document.querySelector('input[name="poseMode"]:checked').value;
    const customInput = document.getElementById('poseCustomValue');
    const btnTrans = document.getElementById('btnTransPose');
    
    customInput.disabled = poseMode !== 'custom';
    btnTrans.disabled = poseMode !== 'custom';
    if (poseMode !== 'custom') customInput.value = '';
}

function toggleBgInputs() {
    const bgMode = document.querySelector('input[name="bgMode"]:checked').value;
    const solidInput = document.getElementById('bgSolidValue');
    const customInput = document.getElementById('bgCustomValue');
    const btnTrans = document.getElementById('btnTransBg');
    
    solidInput.disabled = bgMode !== 'solid';
    solidInput.style.cursor = bgMode === 'solid' ? 'pointer' : 'not-allowed';
    
    customInput.disabled = bgMode !== 'custom';
    btnTrans.disabled = bgMode !== 'custom';
    if (bgMode !== 'custom') customInput.value = '';
}

function openTranslate(inputId) {
    const val = document.getElementById(inputId).value.trim();
    if (val) {
        const url = 'https://translate.google.com/?source=osdd&sl=auto&tl=en&text=' + encodeURIComponent(val) + '&op=translate';
        window.open(url, '_blank');
    } else {
        alert("Ketik teks di box terlebih dahulu sebelum menekan Translate.");
    }
}

/* ---------------------- */
/* Nogizaka Member Modal  */
/* ---------------------- */
let nogiMembers = [];
let currentGen = "";

async function openMemberModal() {
    document.getElementById('memberModal').style.display = 'flex';
    
    if (nogiMembers.length === 0) {
        try {
            const response = await fetch('../store/member/members.json');
            nogiMembers = await response.json();
            renderNogiTabs();
        } catch (error) {
            alert("Gagal memuat data members.json.");
            document.getElementById('nogiMemberList').innerText = "Gagal memuat data.";
        }
    }
}

function closeMemberModal() {
    document.getElementById('memberModal').style.display = 'none';
}

function renderNogiTabs() {
    const tabsContainer = document.getElementById('nogiTabs');
    const showAktif = document.getElementById('filterAktif').checked;
    const showLulus = document.getElementById('filterLulus').checked;
    
    tabsContainer.innerHTML = '';
    
    const availableMembers = nogiMembers.filter(m => {
        if (m.status === 'aktif' && !showAktif) return false;
        if (m.status === 'lulus' && !showLulus) return false;
        return true;
    });

    let generations = [...new Set(availableMembers.map(m => m.gen))];
    
    const genOrder = { "1期": 1, "2期": 2, "3期": 3, "4期": 4, "5期": 5, "6期": 6, "留学": 7, "研究生": 8 };
    generations.sort((a, b) => {
        let orderA = genOrder[a] || 99;
        let orderB = genOrder[b] || 99;
        return orderA - orderB;
    });

    if (!generations.includes(currentGen) && generations.length > 0) {
        currentGen = generations[0];
    }
    
    generations.forEach((gen) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'nogi-tab-btn';
        if (gen === currentGen) {
            btn.classList.add('active');
        }
        btn.innerText = gen;
        btn.onclick = () => {
            document.querySelectorAll('.nogi-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGen = gen;
            renderMembers();
        };
        tabsContainer.appendChild(btn);
    });
    
    renderMembers();
}

function renderMembers() {
    const listContainer = document.getElementById('nogiMemberList');
    const showAktif = document.getElementById('filterAktif').checked;
    const showLulus = document.getElementById('filterLulus').checked;
    
    listContainer.innerHTML = '';
    
    const filteredMembers = nogiMembers.filter(m => {
        if (m.gen !== currentGen) return false;
        if (m.status === 'aktif' && !showAktif) return false;
        if (m.status === 'lulus' && !showLulus) return false;
        return true;
    });

    if (filteredMembers.length === 0) {
        listContainer.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: #999; padding: 10px;">Tidak ada member yang sesuai filter.</div>';
        return;
    }

    filteredMembers.forEach(m => {
        const label = document.createElement('label');
        label.className = 'nogi-member-radio';
        label.innerHTML = `
            <input type="radio" name="nogiSelectRadio" value="${m.id}">
            <span>${m.nama_romaji}</span>
        `;
        listContainer.appendChild(label);
    });
}


function importMember(langType) {
    const selectedRadio = document.querySelector('input[name="nogiSelectRadio"]:checked');
    if (!selectedRadio) {
        alert("Silakan pilih salah satu member terlebih dahulu.");
        return;
    }
    
    const member = nogiMembers.find(m => m.id === selectedRadio.value);
    if (member) {
        const oshiNameInput = document.getElementById('oshiName');
        const oshiHeightInput = document.getElementById('oshiHeight');
        
        oshiNameInput.value = (langType === 'jp') ? member.nama_jp : member.nama_romaji;
        oshiHeightInput.value = parseInt(member.tinggi); 
        
        closeMemberModal();
    }
}


/* ---------------------- */
/* Generator Logic        */
/* ---------------------- */
async function generatePrompt() {
    const userName = document.getElementById('userName').value || '[Your Name]';
    const userHeight = document.getElementById('userHeight').value || '[Your Height]';
    
    const oshiName = document.getElementById('oshiName').value || '[Oshi Name]';
    const oshiHeight = document.getElementById('oshiHeight').value || '[Oshi Height]';
    
    const globalPhotoType = document.getElementById('globalPhotoType').value;

    const visualStyle = document.querySelector('input[name="visualStyle"]:checked').value;
    const langMode = document.querySelector('input[name="langMode"]:checked').value;
    
    let coreData, styleData;
    try {
        const coreRes = await fetch(`../store/data/prompt/core-${langMode}.json`);
        coreData = await coreRes.json();
        
        const styleRes = await fetch(`../store/data/prompt/${visualStyle}-en.json`);
        styleData = await styleRes.json();
    } catch (error) {
        alert("Gagal memuat data JSON. Pastikan file core dan style tersedia di path ../store/data/prompt/.");
        return;
    }

    const ratioMode = document.querySelector('input[name="ratioMode"]:checked').value;
    const measureMode = document.querySelector('input[name="measureMode"]:checked').value;
    
    const isAdvanced = document.getElementById('checkAdvanced').checked;
    let selectedFont = "";
    let selectedPose = "standing facing each other";
    let selectedBg = styleData.background;

    if (isAdvanced) {
        const fontCat = document.querySelector('input[name="fontCat"]:checked').value;
        if (fontCat === 'Pixel') {
            selectedFont = "Pixel";
        } else {
            let subName = "font" + fontCat.charAt(0).toUpperCase() + fontCat.slice(1);
            const subRadio = document.querySelector(`input[name="${subName}"]:checked`);
            if (subRadio) selectedFont = subRadio.value;
        }

        const poseMode = document.querySelector('input[name="poseMode"]:checked').value;
        if (poseMode === 'backtoback') selectedPose = "standing back-to-back";
        else if (poseMode === 'hug') selectedPose = "hugging each other warmly";
        else if (poseMode === 'holding_hands') selectedPose = "standing and holding hands romantically";
        else if (poseMode === 'headpat_oshi') selectedPose = `standing together, with the LEFT person (${oshiName}) affectionately patting the head of the RIGHT person (${userName})`;
        else if (poseMode === 'headpat_me') selectedPose = `standing together, with the RIGHT person (${userName}) affectionately patting the head of the LEFT person (${oshiName})`;
        else if (poseMode === 'custom') {
            const customVal = document.getElementById('poseCustomValue').value.trim();
            if (customVal) selectedPose = customVal;
        }

        const bgMode = document.querySelector('input[name="bgMode"]:checked').value;
        if (bgMode === 'solid') {
            const colorHex = document.getElementById('bgSolidValue').value;
            selectedBg = `* Background is a solid ${colorHex} color.\n\n`;
        } else if (bgMode === 'custom') {
            const customVal = document.getElementById('bgCustomValue').value.trim();
            if (customVal) selectedBg = `* Background is ${customVal}.\n\n`;
        }
    }

    function getDetailStr(checkId, inputId) {
        const isChecked = document.getElementById(checkId).checked;
        const val = document.getElementById(inputId).value.trim();
        return (isChecked && val) ? `* ${val}\n` : '';
    }

    let leftDetails = '';
    leftDetails += getDetailStr('checkOshiDetail1', 'oshiDetail1');
    leftDetails += getDetailStr('checkOshiDetail2', 'oshiDetail2');
    leftDetails += getDetailStr('checkOshiDetail3', 'oshiDetail3');
    leftDetails += getDetailStr('checkOshiDetail4', 'oshiDetail4');

    let rightDetails = '';
    rightDetails += getDetailStr('checkUserDetail1', 'userDetail1');
    rightDetails += getDetailStr('checkUserDetail2', 'userDetail2');
    rightDetails += getDetailStr('checkUserDetail3', 'userDetail3');
    rightDetails += getDetailStr('checkUserDetail4', 'userDetail4');

    let promptText = coreData.intro.replace("{styleBase}", styleData.baseStyle);

    if (globalPhotoType === 'partial') {
        promptText += coreData.mappingTitle;
        promptText += coreData.mappingDesc;
        promptText += coreData.mappingA;
        promptText += coreData.mappingB;
    }

    promptText += coreData.importantTitle;
    
    if (globalPhotoType === 'partial') {
        promptText += coreData.importantMapping;
    }
    promptText += coreData.importantRules;

    promptText += coreData.compositionTitle;
    
    if (ratioMode === 'horizontal') promptText += "* Horizontal / Landscape layout.\n";
    else if (ratioMode === '1:1') promptText += "* Square (1:1 aspect ratio) layout.\n";
    else if (ratioMode === '4:5') promptText += "* Vertical 4:5 aspect ratio layout.\n";
    else promptText += coreData.layoutRule;
    
    if (document.getElementById('addTitle').checked) {
        promptText += "* Place a large title text '#推しとの身長差' at the top of the canvas.\n";
    }

    promptText += coreData.posePrefix + selectedPose + " in the center.\n";
    
    if (measureMode === 'yes') {
        promptText += coreData.centerScale;
        promptText += coreData.dashLine;
        promptText += coreData.alignLeft.replace("{oshiName}", oshiName).replace("{oshiHeight}", oshiHeight);
        promptText += coreData.alignRight.replace("{userName}", userName).replace("{userHeight}", userHeight);
    } else {
        promptText += "* DO NOT display any height ruler, measuring scales, or dashed lines.\n";
    }
    
    promptText += selectedBg;

    promptText += coreData.layoutTitle;
    promptText += coreData.layoutDetails;
    
    if (document.getElementById('addFrame').checked) {
        promptText += "* Use decorative borders/frames around the illustration.\n";
    }

    promptText += coreData.leftPanelTitle;
    promptText += `${coreData.labelName}${oshiName}\n`;
    promptText += `${coreData.labelHeight}${oshiHeight}cm\n`;
    if (leftDetails) promptText += leftDetails;
    promptText += "\n";

    promptText += coreData.rightPanelTitle;
    promptText += `${coreData.labelName}${userName}\n`;
    promptText += `${coreData.labelHeight}${userHeight}cm\n`;
    if (rightDetails) promptText += rightDetails;
    promptText += "\n";

    promptText += coreData.tasteTitle;
    if (selectedFont) promptText += coreData.fontPrefix + selectedFont + "\n";
    
    if (document.getElementById('addFontSize').checked) {
        promptText += "* Make the font size of the characters' NAMES significantly larger and more prominent than their profile details.\n";
    }
    
    if (document.getElementById('addOrnaments').checked) {
        const ornamentTxt = document.getElementById('ornamentValue').value.trim();
        if (ornamentTxt) {
            promptText += `* Add aesthetic background ornaments and items specifically: ${ornamentTxt}.\n`;
        } else {
            promptText += "* Add aesthetic background ornaments (e.g. sparkles, subtle patterns).\n";
        }
    }

    promptText += styleData.taste;

    promptText += coreData.colorTitle;
    promptText += coreData.colorRules;
    
    if (document.getElementById('addColorTheme').checked) {
        const themeColor = document.getElementById('themeColorVal').value;
        promptText += `* Overall color theme / tint should strictly match hex color ${themeColor}.\n`;
    }

    promptText += coreData.avoidTitle;
    promptText += coreData.avoidRules;
    promptText += styleData.avoid;

    promptText += coreData.tagsTitle;
    promptText += styleData.tags;

    copyToClipboard(promptText);
}

/* ---------------------- */
/* Clipboard Logic        */
/* ---------------------- */
async function copyToClipboard(text) {
    const btn = document.getElementById('btnGenerate');
    const originalText = btn.innerHTML;
    btn.innerHTML = "MENYALIN...";

    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            showSuccess(btn, originalText);
        } catch (err) {
            fallbackCopy(text, btn, originalText);
        }
    } else {
        fallbackCopy(text, btn, originalText);
    }
}

function fallbackCopy(text, btn, originalText) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showSuccess(btn, originalText);
        } else {
            throw new Error('Copy command failed');
        }
    } catch (err) {
        alert('Gagal menyalin otomatis. Silakan salin teks secara manual.');
        btn.innerHTML = originalText;
    } finally {
        document.body.removeChild(textArea);
    }
}

function showSuccess(btn, originalText) {
    alert('Prompt berhasil disalin!');
    btn.innerHTML = "BERHASIL DISALIN!";
    setTimeout(() => btn.innerHTML = originalText, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
        input.onpaste = null;
    });
});