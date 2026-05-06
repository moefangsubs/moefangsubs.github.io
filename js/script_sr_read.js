/* ---------------------- */
/* Global Configurations  */
/* ---------------------- */
const minYear = 2018;
const maxYear = 2027;
let currentYear = 2026;
let currentMonth = 4;
let membersDB = {};
let currentYearData = {};
let nekojitaDB = {};
let noteDB = {};
let currentViewMode = "year"; 
let globalStreamCache = {};

/* ---------------------- */
/* Initialization         */
/* ---------------------- */
document.addEventListener("DOMContentLoaded", async () => {
    initControls();
    wrapModal();
    await loadMemberDatabases();
    await loadPictReleaseData();
    await loadNekojitaData();
    await loadNoteData();
    await updateCalendar();
});

async function fetchStreamDataCached(cacheKey) {
    if (!globalStreamCache[cacheKey]) {
        globalStreamCache[cacheKey] = fetch(`../store/data/sr/${cacheKey}.json`)
            .then(res => res.ok ? res.json() : [])
            .catch(() => []);
    }
    return globalStreamCache[cacheKey];
}

async function checkAbsoluteFirst(memberName, streamType, sYear) {
    for (let y = sYear - 1; y >= minYear; y--) {
        for (let m = 12; m >= 1; m--) {
            const mStr = m.toString().padStart(2, '0');
            const cacheKey = `${y}_${mStr}`;
            const data = await fetchStreamDataCached(cacheKey);
            
            for (let s of data) {
                const mems = Array.isArray(s.member) ? s.member : [s.member];
                if (mems.length <= 2 && mems.includes(memberName)) {
                    const t = Array.isArray(s.type) ? s.type.join(" ") : s.type;
                    const sType = (t.includes("SHOWROOM") || t.includes("のぎおび")) ? "REG" : "SPEC";
                    if (sType === streamType) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

async function loadNoteData() {
    try {
        const res = await fetch("../store/data/sr_detail_note.json");
        if (res.ok) {
            noteDB = await res.json();
        }
    } catch (e) {
        console.warn("Gagal memuat data Note:", e);
    }
}

window.applyMoeCrop = function(img, memberName) {
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    if (!nw || !nh) return;

    const crop = window.getAccurateCrop ? window.getAccurateCrop(img.src, memberName) || {} : {};

    const container = img.parentElement;
    const cw = container.clientWidth;
    const ch = container.clientHeight;

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
        if (oy === undefined || oy === null) {
            oy = r - (nh / 2);
        }

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

function wrapModal() {
    const modalNode = document.querySelector(".sr-modal");
    const contentNode = document.querySelector(".sr-modal-content");
    if (modalNode && contentNode && !document.querySelector(".sr-modal-wrapper")) {
        const wrapper = document.createElement("div");
        wrapper.className = "sr-modal-wrapper";
        
        const shadow = document.createElement("div");
        shadow.className = "sr-modal-shadow";
        shadow.id = "modalShadowElement";
        
        wrapper.appendChild(shadow);
        modalNode.insertBefore(wrapper, contentNode);
        wrapper.appendChild(contentNode);
    }
}

function toggleBottomControls() {
    const bottomControls = document.getElementById("bottomControls");
    const topControls = document.querySelector(".calendar-controls:not(.bottom-controls)");
    
    if (!bottomControls || !topControls) return;

    if (currentViewMode !== "month") {
        bottomControls.style.display = "none";
        return;
    }

    const rect = topControls.getBoundingClientRect();
    if (rect.bottom < 0) {
        bottomControls.style.display = "flex";
    } else {
        bottomControls.style.display = "none";
    }
}

function initControls() {
    const yearSelect = document.getElementById("yearSelect");
    const monthSelect = document.getElementById("monthSelect");
    const viewModeSelect = document.getElementById("viewModeSelect");

    const today = new Date();
    const realMaxYear = today.getFullYear();
    const realMaxMonth = today.getMonth() + 1;

    yearSelect.innerHTML = "";
    for (let y = minYear; y <= realMaxYear; y++) {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        if (y === currentYear) opt.selected = true;
        yearSelect.appendChild(opt);
    }

    monthSelect.innerHTML = "";
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    months.forEach((m, i) => {
        const opt = document.createElement("option");
        opt.value = i + 1;
        opt.textContent = m;
        if (i + 1 === currentMonth) opt.selected = true;
        monthSelect.appendChild(opt);
    });

    const enforceBounds = () => {
        if (currentYear < 2018) currentYear = 2018;
        if (currentYear > realMaxYear) currentYear = realMaxYear;
        if (currentYear === 2018 && currentMonth < 6) currentMonth = 6;
        if (currentYear === realMaxYear && currentMonth > realMaxMonth) currentMonth = realMaxMonth;
        
        yearSelect.value = currentYear;
        monthSelect.value = currentMonth;
    };

    viewModeSelect.addEventListener("change", (e) => {
        currentViewMode = e.target.value;
        monthSelect.style.display = currentViewMode === "month" ? "inline-block" : "none";
        
        toggleBottomControls();
        
        updateCalendar();
    });

    yearSelect.addEventListener("change", (e) => {
        currentYear = parseInt(e.target.value);
        enforceBounds();
        updateCalendar();
    });

    monthSelect.addEventListener("change", (e) => {
        currentMonth = parseInt(e.target.value);
        enforceBounds();
        if (currentViewMode === "month") updateCalendar();
    });

    const handlePrev = () => {
        if (currentViewMode === "month") {
            if (currentYear === 2018 && currentMonth <= 6) return;
            currentMonth--;
            if (currentMonth < 1) {
                currentMonth = 12;
                currentYear--;
            }
        } else {
            if (currentYear <= 2018) return;
            currentYear--;
        }
        enforceBounds();
        updateCalendar();
        
        if (currentViewMode === "month") {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (currentViewMode === "month") {
            if (currentYear === realMaxYear && currentMonth >= realMaxMonth) return;
            currentMonth++;
            if (currentMonth > 12) {
                currentMonth = 1;
                currentYear++;
            }
        } else {
            if (currentYear >= realMaxYear) return;
            currentYear++;
        }
        enforceBounds();
        updateCalendar();
        
        if (currentViewMode === "month") {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    document.getElementById("prevBtn").addEventListener("click", handlePrev);
    document.getElementById("nextBtn").addEventListener("click", handleNext);
    
    const prevBtnBottom = document.getElementById("prevBtnBottom");
    if (prevBtnBottom) prevBtnBottom.addEventListener("click", handlePrev);
    
    const nextBtnBottom = document.getElementById("nextBtnBottom");
    if (nextBtnBottom) nextBtnBottom.addEventListener("click", handleNext);

    document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("srModal").classList.remove("active");
    });
    
    document.getElementById("srModal").addEventListener("click", (e) => {
        if (e.target === document.getElementById("srModal")) {
            document.getElementById("srModal").classList.remove("active");
        }
    });

    window.addEventListener("scroll", toggleBottomControls);
    toggleBottomControls();
}

async function loadNekojitaData() {
    try {
        const res = await fetch("../store/data/sr_detail_nekojita.json");
        if (res.ok) {
            nekojitaDB = await res.json();
        }
    } catch (e) {
        console.warn("Gagal memuat data detail Nekojita:", e);
    }
}

async function loadMemberDatabases() {
    const files = [
        "../store/member/members.json",
        "../store/member/members_db_hina.json",
        "../store/member/members_db_keya.json",
        "../store/member/members_db_saku.json"
    ];

    for (const file of files) {
        try {
            const res = await fetch(file);
            if (res.ok) {
                const data = await res.json();
                
                let groupId = "nogi";
                if (file.includes("hina")) groupId = "hinata";
                else if (file.includes("keya")) groupId = "keyaki";
                else if (file.includes("saku")) groupId = "sakura";

                data.forEach(m => {
                    const cleanName = m.nama_jp.replace(/\s+/g, "");
                    m.group_id = groupId;
                    membersDB[cleanName] = m;
                });
            }
        } catch (e) {
            console.warn(file);
        }
    }
}

async function loadSRDataYear(year) {
    const data = {};
    const currentDate = new Date();
    const currentY = currentDate.getFullYear();
    const currentM = currentDate.getMonth() + 1;

    for (let m = 1; m <= 12; m++) {
        if (year > currentY || (year === currentY && m > currentM)) {
            data[m] = [];
            continue;
        }

        const mStr = m.toString().padStart(2, '0');
        const fileName = `../store/data/sr/${year}_${mStr}.json`;
        try {
            const res = await fetch(fileName);
            if (res.ok) {
                data[m] = await res.json();
            } else {
                data[m] = [];
            }
        } catch (e) {
            data[m] = [];
        }
    }
    return data;
}

async function updateCalendar() {
    currentYearData = await loadSRDataYear(currentYear);
    const container = document.getElementById("calendarContainer");
    container.innerHTML = "";

    if (currentViewMode === "year") {
        container.appendChild(buildYearView());
    } else {
        container.appendChild(buildMonthGrid(currentMonth, true));
    }
}

function buildYearView() {
    const wrapper = document.createElement("div");
    wrapper.className = "year-grid";
    
    const today = new Date();
    const realMaxYear = today.getFullYear();
    const realMaxMonth = today.getMonth() + 1;

    for (let m = 1; m <= 12; m++) {
        const monthWrapper = document.createElement("div");
        monthWrapper.className = "month-wrapper";
        
        const isBeforeStart = (currentYear === 2018 && m < 6);
        const isFuture = (currentYear > realMaxYear) || (currentYear === realMaxYear && m > realMaxMonth);
        
        if (isBeforeStart || isFuture) {
            monthWrapper.style.opacity = "0.4";
            monthWrapper.style.pointerEvents = "none";
            monthWrapper.style.background = "#e0e0e0";
        } else {
            monthWrapper.addEventListener("click", () => {
                currentViewMode = "month";
                currentMonth = m;
                document.getElementById("viewModeSelect").value = "month";
                document.getElementById("monthSelect").value = m;
                document.getElementById("monthSelect").style.display = "inline-block";
                
                toggleBottomControls();
                
                updateCalendar();
            });
        }
        
        const monthTitle = document.createElement("div");
        monthTitle.className = "month-title";
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        monthTitle.textContent = months[m - 1];
        
        monthWrapper.appendChild(monthTitle);
        monthWrapper.appendChild(buildMonthGrid(m, false));
        wrapper.appendChild(monthWrapper);
    }
    return wrapper;
}

function buildMonthGrid(monthIndex, isDetailed) {
    const today = new Date();
    const realMaxYear = today.getFullYear();
    const realMaxMonth = today.getMonth() + 1;
    const realMaxDay = today.getDate();

    if (isDetailed) {
        const grid = document.createElement("div");
        grid.className = "month-list-view";
        const daysInMonth = new Date(currentYear, monthIndex, 0).getDate();
        const monthData = currentYearData[monthIndex] || [];
        
        const yearStr = currentYear.toString();
        const monthStr = monthIndex.toString().padStart(2, '0');

        for (let d = 1; d <= daysInMonth; d++) {
            const dayStr = d.toString().padStart(2, '0');
            const dateStr = `${yearStr}.${monthStr}.${dayStr}`;
            const dayStreams = monthData.filter(s => s.airdate === dateStr);
            
            let isHoliday = false;
            let holidayNote = null;
            if (noteDB[yearStr] && noteDB[yearStr][monthStr] && noteDB[yearStr][monthStr][dayStr]) {
                const noteInfo = noteDB[yearStr][monthStr][dayStr];
                if (noteInfo[0] === "お休み") {
                    isHoliday = true;
                    holidayNote = noteInfo[1];
                }
            }

            const isJune2018Disabled = (currentYear === 2018 && monthIndex === 6 && d < 18);
            const isFutureDay = (currentYear > realMaxYear) || (currentYear === realMaxYear && monthIndex > realMaxMonth) || (currentYear === realMaxYear && monthIndex === realMaxMonth && d > realMaxDay);

            if (!isJune2018Disabled && !isFutureDay && (dayStreams.length > 0 || isHoliday)) {
                const cell = document.createElement("div");
                cell.className = "list-day-row";
                
                if (isHoliday) {
                    cell.style.background = "#e0e0e0"; 
                    cell.style.borderColor = "#999999";
                }

                const dateLabel = document.createElement("div");
                dateLabel.className = "list-date-label";
                dateLabel.textContent = d;
                if (isHoliday) {
                    dateLabel.style.color = "#555555";
                }
                cell.appendChild(dateLabel);

                const streamsContainer = document.createElement("div");
                streamsContainer.className = "list-streams-container";
                
                if (isHoliday) {
                    const holidayMsg = document.createElement("div");
                    holidayMsg.style.color = "#333333";
                    holidayMsg.style.fontSize = "1.1rem";
                    holidayMsg.style.fontWeight = "bold";
                    holidayMsg.style.display = "flex";
                    holidayMsg.style.alignItems = "center";
                    holidayMsg.style.height = "100%";
                    
                    let msgText = "お休み (Libur)";
                    if (holidayNote) {
                        msgText += `<br><span style="font-size: 1rem; font-weight: normal; padding-left: 10px;"> ${holidayNote}</span>`;
                    }
                    holidayMsg.innerHTML = msgText;
                    streamsContainer.appendChild(holidayMsg);
                } else {
                    dayStreams.forEach(stream => {
                        const streamEl = buildStreamElement(stream, true);
                        streamsContainer.appendChild(streamEl);
                    });
                }
                
                cell.appendChild(streamsContainer);
                grid.appendChild(cell);
            }
        }
        
        if (grid.childNodes.length === 0) {
            const emptyMsg = document.createElement("div");
            emptyMsg.textContent = "Tidak ada jadwal di bulan ini.";
            emptyMsg.className = "empty-list-msg";
            grid.appendChild(emptyMsg);
        }
        
        return grid;
    }

    const grid = document.createElement("div");
    grid.className = "month-grid";
    const days = ["M", "S", "S", "R", "K", "J", "S"];
    days.forEach(d => {
        const header = document.createElement("div");
        header.className = "month-header";
        header.textContent = d;
        header.style.fontSize = "0.55rem";
        grid.appendChild(header);
    });

    const firstDay = new Date(currentYear, monthIndex - 1, 1).getDay();
    const daysInMonth = new Date(currentYear, monthIndex, 0).getDate();
    const monthData = currentYearData[monthIndex] || [];

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "month-day empty";
        grid.appendChild(emptyCell);
    }

    const yearStr = currentYear.toString();
    const monthStr = monthIndex.toString().padStart(2, '0');

    for (let d = 1; d <= daysInMonth; d++) {
        const cell = document.createElement("div");
        cell.className = "month-day";
        
        const dayLabel = document.createElement("span");
        dayLabel.className = "day-number";
        dayLabel.textContent = d;
        dayLabel.style.fontSize = "0.9rem";
        cell.appendChild(dayLabel);

        const dayStr = d.toString().padStart(2, '0');
        const dateStr = `${yearStr}.${monthStr}.${dayStr}`;
        const dayStreams = monthData.filter(s => s.airdate === dateStr);

        let isHoliday = false;
        if (noteDB[yearStr] && noteDB[yearStr][monthStr] && noteDB[yearStr][monthStr][dayStr]) {
            if (noteDB[yearStr][monthStr][dayStr][0] === "お休み") {
                isHoliday = true;
            }
        }

        const isJune2018Disabled = (currentYear === 2018 && monthIndex === 6 && d < 18);
        const isFutureDay = (currentYear > realMaxYear) || (currentYear === realMaxYear && monthIndex > realMaxMonth) || (currentYear === realMaxYear && monthIndex === realMaxMonth && d > realMaxDay);

        if (isJune2018Disabled || isFutureDay) {
            cell.style.background = "#eeeeee"; 
            dayLabel.style.color = "#cccccc";
            cell.style.pointerEvents = "none";
        } else if (dayStreams.length > 0) {
            const groupsInDay = dayStreams.map(s => s.group);
            cell.style.background = getDayBackground(groupsInDay);
        } else if (isHoliday) {
            cell.style.background = "#e0e0e0"; 
            dayLabel.style.color = "#777777";
        }

        grid.appendChild(cell);
    }
    return grid;
}

function getGroupRGB(groupStr) {
    if (!groupStr) return "51, 51, 51";
    if (groupStr.includes("乃木坂46")) return "129, 79, 162";
    if (groupStr.includes("櫻坂46")) return "242, 156, 208";
    if (groupStr.includes("日向坂46") || groupStr.includes("けやき坂46")) return "124, 199, 232";
    if (groupStr.includes("欅坂46")) return "108, 191, 90";
    return "51, 51, 51";
}

function getGroupBackground(groupStr) {
    const rgbColors = [];
    if (groupStr.includes("乃木坂46")) rgbColors.push("129, 79, 162");
    if (groupStr.includes("櫻坂46")) rgbColors.push("242, 156, 208");
    if (groupStr.includes("日向坂46") || groupStr.includes("けやき坂46")) rgbColors.push("124, 199, 232");
    if (groupStr.includes("欅坂46")) rgbColors.push("108, 191, 90");
    
    if (rgbColors.length === 0) rgbColors.push("51, 51, 51");

    if (rgbColors.length === 1) {
        return `rgb(${rgbColors[0]})`;
    }
    return `linear-gradient(135deg, rgb(${rgbColors.join('), rgb(')}))`;
}

function getGroupBackgroundWithOpacity(groupStr, alpha) {
    const rgbColors = [];
    if (groupStr.includes("乃木坂46")) rgbColors.push("129, 79, 162");
    if (groupStr.includes("櫻坂46")) rgbColors.push("242, 156, 208");
    if (groupStr.includes("日向坂46") || groupStr.includes("けやき坂46")) rgbColors.push("124, 199, 232");
    if (groupStr.includes("欅坂46")) rgbColors.push("108, 191, 90");
    
    if (rgbColors.length === 0) rgbColors.push("51, 51, 51");

    if (rgbColors.length === 1) {
        return `rgba(${rgbColors[0]}, ${alpha})`;
    }
    return `linear-gradient(135deg, rgba(${rgbColors.join(`, ${alpha}), rgba(`)}, ${alpha}))`;
}

function getDayBackground(groupsArr) {
    if (!groupsArr || groupsArr.length === 0) return "transparent";
    
    const unique = [];
    groupsArr.forEach(g => {
        const rgb = getGroupRGB(g);
        if (!unique.includes(rgb)) unique.push(rgb);
    });

    if (unique.length === 1) return `rgba(${unique[0]}, 0.75)`;
    else if (unique.length === 2) return `linear-gradient(180deg, rgba(${unique[0]}, 0.75) 0%, rgba(${unique[0]}, 1) 40%, rgba(${unique[1]}, 1) 60%, rgba(${unique[1]}, 0.75) 100%)`;
    else if (unique.length === 3) return `linear-gradient(180deg, rgba(${unique[0]}, 0.75) 0%, rgba(${unique[0]}, 1) 30%, rgba(${unique[1]}, 1) 35%, rgba(${unique[1]}, 1) 60%, rgba(${unique[2]}, 1) 65%, rgba(${unique[2]}, 0.75) 100%)`;
    else return `linear-gradient(180deg, rgba(${unique[0]}, 0.75) 0%, rgba(${unique[0]}, 1) 20%, rgba(${unique[1]}, 1) 25%, rgba(${unique[1]}, 1) 45%, rgba(${unique[2]}, 1) 50%, rgba(${unique[2]}, 1) 70%, rgba(${unique[3]}, 1) 75%, rgba(${unique[3]}, 0.75) 100%)`;
}

function getPrimaryColor(groupStr) {
    if (groupStr.includes("乃木坂46")) return "#814fa2";
    if (groupStr.includes("櫻坂46")) return "#f29cd0";
    if (groupStr.includes("日向坂46") || groupStr.includes("けやき坂46")) return "#7cc7e8";
    if (groupStr.includes("欅坂46")) return "#6cbf5a";
    return "#333333";
}

function getGroupLightColor(groupStr) {
    if (!groupStr) return "#ffffff";
    if (groupStr.includes("乃木坂46")) return "#f8efff";
    if (groupStr.includes("櫻坂46")) return "#fdf2f8";
    if (groupStr.includes("日向坂46") || groupStr.includes("けやき坂46")) return "#f0faff";
    if (groupStr.includes("欅坂46")) return "#f2fcf0";
    return "#ffffff";
}


function getStreamCount(targetMember, targetStream) {
    const targetMems = Array.isArray(targetStream.member) ? targetStream.member : [targetStream.member];
    
    if (targetMems.length > 2) return null;
    
    const getStreamType = (s) => {
        const t = Array.isArray(s.type) ? s.type.join(" ") : s.type;
        if (t.includes("SHOWROOM") || t.includes("のぎおび")) return "REG";
        return "SPEC";
    };

    const targetType = getStreamType(targetStream);
    
    let chronologicalStreams = [];
    for (let m = 1; m <= 12; m++) {
        if (currentYearData[m] && Array.isArray(currentYearData[m])) {
            chronologicalStreams.push(...[...currentYearData[m]].reverse());
        }
    }
    
    let count = 0;
    for (let s of chronologicalStreams) {
        const mems = Array.isArray(s.member) ? s.member : [s.member];
        
        if (mems.length <= 2 && mems.includes(targetMember)) {
            if (getStreamType(s) === targetType) {
                count++;
            }
        }
        
        if (s === targetStream) {
            return count;
        }
    }
    
    return count;
}

function buildStreamElement(stream, isDetailed) {
    if (isDetailed) {
        const card = document.createElement("div");
        card.className = "stream-detail-card";
        const primaryColor = getPrimaryColor(stream.group);
        card.style.borderColor = primaryColor;
        card.style.background = getGroupBackgroundWithOpacity(stream.group, 0.15);
        
        const header = document.createElement("div");
        header.className = "stream-detail-header";
        header.style.background = getGroupBackground(stream.group);
        
        let label = "SR";
        if (Array.isArray(stream.type) && stream.type.length > 0) {
            label = stream.type[stream.type.length - 1];
        } else if (typeof stream.type === "string") {
            label = stream.type;
            if (label.includes("猫舌")) label = "猫舌";
        }
        header.textContent = label;
        card.appendChild(header);

        const membersContainer = document.createElement("div");
        membersContainer.className = "stream-detail-members";
        
        let membersList = [];
        if (Array.isArray(stream.member)) {
            membersList = stream.member;
        } else if (typeof stream.member === "string") {
            membersList = [stream.member];
        }

        membersList.forEach(memName => {
            if (membersDB[memName]) {
                const mem = membersDB[memName];
                const photoInfo = getMemberPhotoInfo(mem, stream.airdate, stream.group);
                
                const photoWrapper = document.createElement("div");
                photoWrapper.className = "stream-detail-photo";
                photoWrapper.title = mem.nama_romaji;
                photoWrapper.style.borderColor = primaryColor;
                
                photoWrapper.style.backgroundImage = "url('../sprite/element/vibe/load.gif')";
                photoWrapper.style.backgroundPosition = "center center";
                photoWrapper.style.backgroundRepeat = "no-repeat";
                photoWrapper.style.backgroundSize = "50px";
                
                let countBadgeHtml = "";
                const appearanceCount = getStreamCount(memName, stream);
                
                if (appearanceCount !== null) {
                    const badgeId = `badge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                    const badgeText = `${appearanceCount}回`;
                    
                    let memGroupStr = "";
                    if (mem.group_id === "nogi") memGroupStr = "乃木坂46";
                    else if (mem.group_id === "sakura") memGroupStr = "櫻坂46";
                    else if (mem.group_id === "hinata") memGroupStr = "日向坂46";
                    else if (mem.group_id === "keyaki") memGroupStr = "欅坂46";
                    
                    const badgeBg = getPrimaryColor(memGroupStr);
                    
                    countBadgeHtml = `
                        <div id="${badgeId}" style="position: absolute; top: 0; right: 0; background: ${badgeBg}; color: white; font-size: 0.9rem; font-weight: normal; padding: 2px 6px; z-index: 5; border-bottom-left-radius: 4px;">
                            ${badgeText}
                        </div>
                    `;

                    if (appearanceCount === 1 && stream.airdate) {
                        const sYear = parseInt(stream.airdate.split('.')[0]);
                        const streamTypeStr = Array.isArray(stream.type) ? stream.type.join(" ") : stream.type;
                        const targetType = (streamTypeStr.includes("SHOWROOM") || streamTypeStr.includes("のぎおび")) ? "REG" : "SPEC";
                        
                        setTimeout(() => {
                            checkAbsoluteFirst(memName, targetType, sYear).then(isFirst => {
                                if (isFirst) {
                                    const badgeEl = document.getElementById(badgeId);
                                    if (badgeEl) badgeEl.textContent = "初";
                                }
                            });
                        }, 0);
                    }
                }
                
                photoWrapper.innerHTML = `
                    <img src="${photoInfo.url}" data-fallbacks="${photoInfo.fallbacks}" onerror="handleMoeFallback(this)" onload="applyMoeCrop(this, '${mem.nama_jp}')" style="opacity: 0; transition: opacity 0.3s ease;">
                    ${countBadgeHtml}
                `;
                membersContainer.appendChild(photoWrapper);
            }
        });
        
        card.appendChild(membersContainer);

        card.addEventListener("click", (e) => {
            e.stopPropagation();
            openModal(stream);
        });

        return card;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "stream-item";

    const tag = document.createElement("div");
    tag.className = "stream-tag";
    tag.style.background = getGroupBackground(stream.group);
    
    let label = "SR";
    if (Array.isArray(stream.type) && stream.type.length > 0) {
        label = stream.type[stream.type.length - 1];
    } else if (typeof stream.type === "string") {
        label = stream.type;
        if (label.includes("猫舌")) {
            label = "猫舌";
        }
    }
    
    tag.textContent = label.substring(0, 2);
    wrapper.appendChild(tag);

    const isSolo = typeof stream.member === "string" && !Array.isArray(stream.member);
    if (isSolo) {
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = membersDB[stream.member] ? membersDB[stream.member].nama_romaji : stream.member;
        wrapper.appendChild(tooltip);
    }

    wrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(stream);
    });

    return wrapper;
}

function calculateDuration(start, end) {
    if (!start || !end) {
        return null;
    }
    const d1 = new Date(`1970-01-01T${start}Z`);
    const d2 = new Date(`1970-01-01T${end}Z`);
    if (d2 < d1) {
        d2.setDate(d2.getDate() + 1);
    }
    
    const diffSeconds = (d2 - d1) / 1000;
    const h = Math.floor(diffSeconds / 3600);
    const m = Math.floor((diffSeconds % 3600) / 60);
    const s = diffSeconds % 60;
    
    let res = "";
    if (h > 0) {
        res += `${h} jam `;
    }
    if (m > 0) {
        res += `${m} menit `;
    }
    if (s > 0) {
        res += `${s} detik`;
    }
    return res.trim();
}

function formatDateID(dateStr) {
    if (!dateStr) {
        return "";
    }
    const parts = dateStr.split(".");
    if (parts.length !== 3) {
        return dateStr;
    }
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${parts[2]} ${months[parseInt(parts[1]) - 1]} ${parts[0]}`;
}

function openModal(stream) {
    const modalLeft = document.getElementById("modalLeft");
    const modalRight = document.getElementById("modalRight");
    
    modalLeft.innerHTML = "";
    modalRight.innerHTML = "";

    const wrapper = document.querySelector(".sr-modal-wrapper");
    if (wrapper) {
        wrapper.style.setProperty('--modal-shadow-color', getPrimaryColor(stream.group));
        wrapper.style.setProperty('--modal-bg-color', getGroupLightColor(stream.group));
    }

    const primaryColor = getPrimaryColor(stream.group);
    const isSolo = typeof stream.member === "string" && !Array.isArray(stream.member);

    function buildProfile(memberName, isMain) {
        if (!membersDB[memberName]) return "";
        const mem = membersDB[memberName];
        const photoInfo = getMemberPhotoInfo(mem, stream.airdate, stream.group);
        const wrapperClass = isMain ? "modal-member-photo" : "modal-multi-photo";
        
        const fontSizeRomaji = isMain ? "1.8rem" : "1rem";
        const fontSizeJp = isMain ? "1rem" : "0.85rem";
        
        return `
            <div class="modal-profile-wrap">
                <div class="${wrapperClass}" style="border-color: ${primaryColor}; background-image: url('../sprite/element/vibe/load.gif'); background-position: center center; background-repeat: no-repeat; background-size: 50px;">
                    <img src="${photoInfo.url}" data-fallbacks="${photoInfo.fallbacks}" onerror="handleMoeFallback(this)" onload="applyMoeCrop(this, '${mem.nama_jp}')" style="opacity: 0; transition: opacity 0.3s ease;">
                </div>
                <div class="modal-romaji" style="color: ${primaryColor}; font-size: ${fontSizeRomaji};">${mem.nama_romaji}</div>
                <div class="modal-jp" style="font-size: ${fontSizeJp};">${mem.nama_jp}</div>
            </div>
        `;
    }

    if (isSolo) {
        modalLeft.style.display = "flex";
        modalLeft.innerHTML = buildProfile(stream.member, true);
    } else {
        modalLeft.style.display = "none";
        let multiHtml = `<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px; justify-content: flex-start;">`;
        if (Array.isArray(stream.member)) {
            stream.member.forEach(m => {
                multiHtml += buildProfile(m, false);
            });
        }
        multiHtml += `</div>`;
        modalRight.innerHTML += multiHtml;
    }

    let rightHtml = "";
    if (stream.title) {
        rightHtml += `<div class="modal-data-row"><strong>Title:</strong> <span>${stream.title}</span></div>`;
    }

    const typeStr = Array.isArray(stream.type) ? stream.type.join(", ") : stream.type;
    rightHtml += `<div class="modal-data-row"><strong>Jenis siaran:</strong> <span>${typeStr}</span></div>`;
    rightHtml += `<div class="modal-data-row"><strong>Tanggal:</strong> <span>${formatDateID(stream.airdate)}</span></div>`;

    if (stream.airdate) {
        const dateParts = stream.airdate.split(".");
        if (dateParts.length === 3) {
            const year = parseInt(dateParts[0]).toString();
            const month = parseInt(dateParts[1]).toString().padStart(2, '0');
            const day = parseInt(dateParts[2]).toString().padStart(2, '0');

            if (noteDB[year] && noteDB[year][month] && noteDB[year][month][day]) {
                const noteInfo = noteDB[year][month][day];
                if (noteInfo[0] !== "お休み" && noteInfo[1]) {
                    const targetMembers = noteInfo[0].split(",").map(m => m.trim());
                    let isTarget = false;
                    
                    if (isSolo && targetMembers.includes(stream.member)) {
                        isTarget = true;
                    } else if (Array.isArray(stream.member)) {
                        for (let mem of stream.member) {
                            if (targetMembers.includes(mem)) {
                                isTarget = true;
                                break;
                            }
                        }
                    }

                    if (isTarget) {
                        rightHtml += `<div class="modal-data-row"><strong>Note:</strong> <span>${noteInfo[1]}</span></div>`;
                    }
                }
            }
        }
    }
	
    let timeStr = "Tidak ada data";
    let durationStr = "";
    if (stream.stream && stream.stream[0]) {
        timeStr = stream.stream[0];
        if (stream.stream[1]) {
            timeStr += ` - ${stream.stream[1]}`;
            durationStr = calculateDuration(stream.stream[0], stream.stream[1]);
        }
    }
    rightHtml += `<div class="modal-data-row"><strong>Jam siaran:</strong> <span>${timeStr}</span></div>`;
    
    if (durationStr) {
        rightHtml += `<div class="modal-data-row"><strong>Durasi:</strong> <span>${durationStr}</span></div>`;
    }

    if (typeStr.includes("猫舌") && stream.airdate) {
        const dateParts = stream.airdate.split(".");
        if (dateParts.length === 3) {
            const year = parseInt(dateParts[0]).toString();
            const month = parseInt(dateParts[1]).toString(); 
            const day = parseInt(dateParts[2]).toString();   

            if (nekojitaDB[year] && nekojitaDB[year][month] && nekojitaDB[year][month][day]) {
                let temaData = nekojitaDB[year][month][day];
                let temaStr = "";
                
                if (Array.isArray(temaData)) {
                    temaStr = temaData.join(" & ");
                } else {
                    temaStr = temaData;
                }
                
                rightHtml += `<div class="modal-data-row"><strong>Tema:</strong> <span>${temaStr}</span></div>`;
            }
        }
    }

    if (stream.mori_tw_gift) {
        const mori = stream.mori_tw_gift[0];
        if (mori) {
            if (mori.star) {
                rightHtml += `<div class="modal-data-row"><strong>Interaksi:</strong> <span><i class="fa-solid fa-star"></i> ${mori.star.toLocaleString()}</span></div>`;
            }
            if (mori.user) {
                rightHtml += `<div class="modal-data-row"><strong>Viewers:</strong> <span><i class="fa-solid fa-user"></i> ${mori.user.toLocaleString()}</span></div>`;
            }
        }
        
        const tower = stream.mori_tw_gift[1];
        if (tower !== null && tower !== false) {
            rightHtml += `<div class="modal-data-row"><strong>Tower:</strong> <span>${tower.toLocaleString()}</span></div>`;
        }
        
        const gift = stream.mori_tw_gift[2];
        if (gift !== null && gift !== false) {
            rightHtml += `<div class="modal-data-row"><strong>Total gift:</strong> <span>${gift.toLocaleString()}</span></div>`;
        }
    }

    if (stream.note_script) {
        rightHtml += `<div class="modal-data-row"><strong>Catatan:</strong> <span>${stream.note_script}</span></div>`;
    }

    modalRight.innerHTML += rightHtml;
    document.getElementById("srModal").classList.add("active");
}