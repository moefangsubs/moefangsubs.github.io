document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("transition-body");

    function parseDate(dateStr) {
        if (!dateStr || dateStr === "非公表" || dateStr === "null") return null;
        const months = {
            "januari": 0, "january": 0, "jan": 0,
            "februari": 1, "february": 1, "feb": 1,
            "maret": 2, "march": 2, "mar": 2,
            "april": 3, "apr": 3,
            "mei": 4, "may": 4,
            "juni": 5, "june": 5, "jun": 5,
            "juli": 6, "july": 6, "jul": 6,
            "agustus": 7, "august": 7, "aug": 7,
            "september": 8, "sep": 8,
            "oktober": 9, "october": 9, "oct": 9,
            "november": 10, "nov": 10,
            "desember": 11, "december": 11, "dec": 11
        };
        
        const match = dateStr.toLowerCase().match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/);
        if (match && months[match[2]] !== undefined) {
            return new Date(match[3], months[match[2]], parseInt(match[1]));
        }
        
        const matchNoDay = dateStr.toLowerCase().match(/([a-z]+)\s+(\d{4})/);
        if (matchNoDay && months[matchNoDay[1]] !== undefined) {
            return new Date(matchNoDay[2], months[matchNoDay[1]], 1);
        }
        
        return null;
    }

    function formatDate(dateObj) {
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    }

    Promise.all([
        fetch("../store/member/members.json").then(r => r.json()),
        fetch("../store/single/single_release.json").then(r => r.json())
    ])
    .then(([membersData, singleData]) => {
        let singles = singleData.map(s => {
            let parts = s.releaseDate.split('/');
            return { num: s.num, date: new Date(parts[0], parts[1] - 1, parts[2]) };
        }).sort((a, b) => a.date - b.date);

        function getActiveSingleNum(eventDate) {
            let activeNum = 1; 
            for (let i = 0; i < singles.length; i++) {
                if (eventDate >= singles[i].date) activeNum = singles[i].num;
                else break;
            }
            return activeNum;
        }

        function getAvatarUrl(memberId, date, fallbackUrl) {
            let sNum = getActiveSingleNum(date);
            let paddedNum = String(sNum).padStart(2, '0'); 
            let formattedId = memberId.replace(/-/g, '_'); 
            return {
                src: `https://ik.imagekit.io/moearchive/web/memberprofile/s${paddedNum}/${formattedId}.png`,
                fallback: fallbackUrl || "../sprite/default-avatar.png"
            };
        }

        let events = [];

        membersData.forEach(m => {
            let joinDateStr = m.dateterdaftar || m.dateKenninStart || m.dateTerdaftar || m.dateTerdaftar || m.datePerkenalan || m.placePerkenalan || m.placeperkenalan;
            
            let joinDate = parseDate(joinDateStr);
            if (joinDate) {
                events.push({ 
                    date: joinDate, type: 'join', gen: m.gen, 
                    name: m.nama_romaji, id: m.id, foto: m.foto_profil 
                });
            }

            if (m.status === 'lulus' || m.dateKenninEnd) {
                let gradDateStr = m.dateGradeLast || m.dateKenninEnd;
                let gradDate = parseDate(gradDateStr);
                if (gradDate) {
                    events.push({ 
                        date: gradDate, type: 'grad', gen: m.gen, 
                        name: m.nama_romaji, id: m.id, foto: m.foto_profil, alasan: m.gradAlasan 
                    });
                }
            }
        });

        events.sort((a, b) => a.date - b.date);
        let groupedEvents = {};
        events.forEach(ev => {
            let timeKey = ev.date.getTime();
            if (!groupedEvents[timeKey]) groupedEvents[timeKey] = { date: ev.date, joins: [], grads: [] };
            if (ev.type === 'join') groupedEvents[timeKey].joins.push(ev);
            if (ev.type === 'grad') groupedEvents[timeKey].grads.push(ev);
        });

        let currentCounts = { "1期": 0, "2期": 0, "3期": 0, "4期": 0, "5期": 0, "6期": 0, "留学": 0, "研究生": 0 };
        let totalMembers = 0;
        let sortedKeys = Object.keys(groupedEvents).sort((a, b) => a - b);

        sortedKeys.forEach(key => {
            let group = groupedEvents[key];
            let diff = 0;
            let eventDescriptions = [];

            if (group.joins.length > 0) {
                diff += group.joins.length;
                let genGroups = {};
                
                group.joins.forEach(j => {
                    currentCounts[j.gen] = (currentCounts[j.gen] || 0) + 1;
                    if (!genGroups[j.gen]) genGroups[j.gen] = [];
                    genGroups[j.gen].push(j);
                });
                
                for (let g in genGroups) {
                    let label = g === "留学" ? "Kennin" : (g === "研究生" ? "Kenkyuusei" : `Gen-${g.replace('期','')}`);
                    let members = genGroups[g];
                    
                    let joinHTML = `<div class="event-title"><strong>${label} Bergabung</strong></div>`;
                    joinHTML += `<div class="ava-group">`;
                    members.forEach(m => {
                        let ava = getAvatarUrl(m.id, group.date, m.foto);
                        joinHTML += `<img src="${ava.src}" onerror="this.onerror=null;this.src='${ava.fallback}';" class="mini-ava" title="${m.name}" alt="${m.name}">`;
                    });
                    joinHTML += `</div>`;
                    eventDescriptions.push(joinHTML);
                }
            }

            if (group.grads.length > 0) {
                diff -= group.grads.length;
                let gradListHTML = `<ul class="grad-list">`;
                
                group.grads.forEach(g => {
                    currentCounts[g.gen] = Math.max(0, (currentCounts[g.gen] || 0) - 1);
                    
                    let actionText = "Lulus";
                    if (g.gen === "留学") actionText = "Kennin Selesai";
                    else if (g.alasan) {
                        let alasanLower = g.alasan.toLowerCase();
                        if (alasanLower.includes("diberhentikan") || alasanLower.includes("kontrak")) actionText = "Diberhentikan";
                        else if (alasanLower.includes("mundur") || alasanLower.includes("辞退")) actionText = "Mundur";
                    }

                    let ava = getAvatarUrl(g.id, group.date, g.foto);
                    
                    gradListHTML += `
                        <li class="grad-item">
                            <img src="${ava.src}" onerror="this.onerror=null;this.src='${ava.fallback}';" class="mini-ava grad-ava" title="${g.name}" alt="${g.name}">
                            <span class="grad-name"><span class="grad-action grad-label">${actionText}</span> (${g.gen}) ${g.name}</span>
                        </li>`;
                });
                gradListHTML += `</ul>`;
                eventDescriptions.push(gradListHTML);
            }

            totalMembers += diff;
            let diffStr = diff > 0 ? `+${diff}` : diff;
            let diffClass = diff > 0 ? "diff-plus" : "diff-minus";

            const g1 = currentCounts["1期"] || "-";
            const g2 = currentCounts["2期"] || "-";
            const g3 = currentCounts["3期"] || "-";
            const g4 = currentCounts["4期"] || "-";
            const g5 = currentCounts["5期"] || "-";
            const g6 = currentCounts["6期"] || "-";

            const row = `
                <tr>
                    <td class="sticky-col-date">${formatDate(group.date)}</td>
                    <td class="jpn event-cell">${eventDescriptions.join("<div class='event-divider'></div>")}</td>
                    <td class="center ${diffClass}">${diffStr}</td>
                    <td class="center total-bold">${totalMembers}</td>
                    <td class="center ${g1 !== '-' ? 'cnt-gen1' : ''}">${g1}</td>
                    <td class="center ${g2 !== '-' ? 'cnt-gen2' : ''}">${g2}</td>
                    <td class="center ${g3 !== '-' ? 'cnt-gen3' : ''}">${g3}</td>
                    <td class="center ${g4 !== '-' ? 'cnt-gen4' : ''}">${g4}</td>
                    <td class="center ${g5 !== '-' ? 'cnt-gen5' : ''}">${g5}</td>
                    <td class="center ${g6 !== '-' ? 'cnt-gen6' : ''}">${g6}</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML("beforeend", row);
        });
    })
    .catch(error => {
        console.error("Error generating transition table:", error);
        tableBody.innerHTML = `<tr><td colspan="10" class="center" style="color:red;">Gagal memproses data otomatis. Pastikan seluruh file JSON (.members, .single_release) ada di folder yang benar.</td></tr>`;
    });
});