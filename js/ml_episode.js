ML_LOGIC.loadShowsForFilter = async (cat) => {
    const sel = document.getElementById('filter-show');
    const groupSel = document.getElementById('filter-group');
    
    sel.innerHTML = '<option value="">-- Pilih Acara --</option>';
    sel.disabled = true;
    groupSel.innerHTML = '<option value="">-- Pilih Grup --</option>';
    groupSel.classList.add('hidden');

    if (cat === 'bonus_single') {
        groupSel.classList.remove('hidden');
        sel.innerHTML = '<option value="">-- Pilih Single/Album --</option>';
        
        ML_LOGIC.staticData.groups.forEach(g => {
            const opt = document.createElement('option');
            opt.value = g.val;
            opt.text = g.label;
            groupSel.add(opt);
        });
        
    } else {
        const snap = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).get();
        sel.disabled = false;
        snap.forEach(doc => {
            const opt = document.createElement('option');
            opt.value = `${cat}|${doc.id}`;
            opt.text = doc.data().name;
            sel.add(opt);
        });
    }
};

ML_LOGIC.loadBonusShowsForFilter = async (group) => {
    const sel = document.getElementById('filter-show');
    sel.innerHTML = '<option>Loading...</option>';
    sel.disabled = true;
    
    if (!group) return;

    const snap = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection('bonus_single').where('grup', '==', group).get();
    
    sel.innerHTML = '<option value="">-- Pilih Single/Album --</option>';
    sel.disabled = false;
    
    const items = [];
    snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));

    const typeOrder = { "Single": 1, "Album": 2, "Best Album": 3, "Other": 4 };
    
    items.sort((a, b) => {
        const tA = typeOrder[a.type] || 99;
        const tB = typeOrder[b.type] || 99;
        if (tA !== tB) return tA - tB;
        return (a.number || "").localeCompare(b.number || "");
    });
    
    items.forEach(item => {
        const opt = document.createElement('option');
        opt.value = `bonus_single|${item.id}`;
        opt.text = `${item.number || '?'} - ${item.title || item.name}`;
        sel.add(opt);
    });
};


ML_LOGIC.loadEpisodesList = async (val) => {
    if(!val) return;
    const [cat, showId] = val.split('|');
    const isBonus = cat === 'bonus_single';

    const box = document.getElementById('quick-add-episode-box');
    const showMember = document.getElementById('chk-show-member').checked;
    
    // UI Adjustment for Bonus Single
    const containerEps = document.getElementById('container-quick-eps');
    const containerType = document.getElementById('container-quick-type');
    const lblEps = document.getElementById('lbl-quick-eps');
    const lblSub = document.getElementById('lbl-quick-sub');
    const containerDate = document.getElementById('container-quick-date');
    const tipEps = document.getElementById('quick-tip-eps');
    const memGroup = document.getElementById('quick-member-group');

    if (isBonus) {
        containerEps.classList.add('hidden');
        containerType.classList.remove('hidden');
        lblEps.innerText = "Type";
        lblSub.innerText = "Judul Bonus";
        containerDate.classList.add('opacity-0', 'pointer-events-none');
        tipEps.classList.add('hidden');
        
        const filterGroup = document.getElementById('filter-group').value;
        if (filterGroup) {
            memGroup.value = filterGroup;
            ML_LOGIC.handleMemberGroupChange(filterGroup, 'quick-member-list');
            memGroup.disabled = true;
            memGroup.classList.add('bg-gray-100', 'locked-cursor');
        }
    } else {
        containerEps.classList.remove('hidden');
        containerType.classList.add('hidden');
        lblEps.innerText = "Episode";
        lblSub.innerText = "Sub Judul";
        containerDate.classList.remove('opacity-0', 'pointer-events-none');
        tipEps.classList.remove('hidden');
        
        memGroup.disabled = false;
        memGroup.classList.remove('bg-gray-100', 'locked-cursor');
    }

    if(ML_LOGIC.role !== 'volunteer') {
        box.classList.remove('hidden');
        ML_LOGIC.loadFansubDropdownForQuickAdd();
    }

    const colMemberHead = document.getElementById('col-member');
    if (colMemberHead) {
        if (showMember) colMemberHead.classList.remove('hidden');
        else colMemberHead.classList.add('hidden');
    }

    const tbody = document.getElementById('episode-list-body');
    let colCount = ML_LOGIC.role === 'leader' ? 7 : 6;
    if (showMember) colCount++;

    tbody.innerHTML = `<tr><td colspan="${colCount}" class="p-4 text-center">Loading...</td></tr>`;

    try {
        const showDoc = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(showId).get();
        if (showDoc.exists) {
            const sData = showDoc.data();
            const infoContainer = document.getElementById('show-info-container');
            const infoImg = document.getElementById('show-info-img');
            const infoTitle = document.getElementById('show-info-title');
            const infoDesc = document.getElementById('show-info-desc');

            infoContainer.classList.remove('hidden');
            infoTitle.textContent = sData.name || showId;
            infoDesc.textContent = sData.desc || "Tidak ada deskripsi.";
            
            if (sData.icon) {
                infoImg.src = sData.icon;
                infoImg.classList.remove('hidden');
            } else {
                infoImg.classList.add('hidden');
            }
        }
    } catch (e) {
        console.error("Gagal load info show", e);
    }

    const snap = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(showId).collection('episodes').get();
    
    let rows = [];
    snap.forEach(doc => {
        const d = doc.data();
        let hasSuffix = false;
        if (d.sub_judul_1 !== undefined || d.links_1 !== undefined) hasSuffix = true;

        if (hasSuffix) {
            let i = 1;
            while (d[`sub_judul_${i}`] !== undefined || d[`links_${i}`] !== undefined) {
                rows.push({
                    id: doc.id, realId: doc.id, suffix: `_${i}`,
                    airing: d.airing, sub_judul: d[`sub_judul_${i}`], links: d[`links_${i}`],
                    members: d[`members_${i}`]
                });
                i++;
            }
        } else {
            rows.push({
                id: doc.id, realId: doc.id, suffix: '',
                airing: d.airing, sub_judul: d.sub_judul, links: d.links,
                members: d.members
            });
        }
    });

    rows.sort((a, b) => {
        let valA, valB;

        if (ML_LOGIC.sortColumn === 'id') {
            valA = a.id; valB = b.id;
            if (valA === 'unknown') return ML_LOGIC.sortOrder === 'asc' ? 1 : -1;
            if (valB === 'unknown') return ML_LOGIC.sortOrder === 'asc' ? -1 : 1;
            return ML_LOGIC.sortOrder === 'asc' ? 
                valA.localeCompare(valB, undefined, {numeric: true}) : 
                valB.localeCompare(valA, undefined, {numeric: true});
        } 
        else if (ML_LOGIC.sortColumn === 'status') {
            const getStatusScore = (item) => {
                if (!item.links || item.links.length === 0) return 0;
                const hasUrl = item.links.some(l => l.url || l.url_h || l.url_s);
                return hasUrl ? 2 : 1;
            };
            valA = getStatusScore(a);
            valB = getStatusScore(b);
        } 
        else if (ML_LOGIC.sortColumn === 'fansub') {
            valA = a.links ? a.links.map(l => l.fansub).join('').toLowerCase() : '';
            valB = b.links ? b.links.map(l => l.fansub).join('').toLowerCase() : '';
        }

        if (valA < valB) return ML_LOGIC.sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return ML_LOGIC.sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    tbody.innerHTML = '';
    if(rows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${colCount}" class="p-4 text-center">Belum ada episode.</td></tr>`;
        return;
    }

    rows.forEach(d => {
        const linksHtml = d.links ? d.links.map(l => `<span class="inline-block bg-gray-100 border rounded px-1 text-xs mr-1 mb-1">${l.fansub}</span>`).join('') : '-';
        
        let memberHtml = '<span class="text-gray-300">-</span>';
        if (d.members) {
            if (d.members.type === 'list' || d.members.type === 'custom' || d.members.type === 'many') {
                memberHtml = `<span class="text-xs text-gray-700">${d.members.names}</span>`;
            }
        }

        let statusHtml = '';
        if (!d.links || d.links.length === 0) {
            statusHtml = '<span class="font-bold text-gray-400" title="Belum ada yang menggarap">[?]</span>';
        } else {
            const hasUrl = d.links.some(l => l.url || l.url_h || l.url_s);
            if (hasUrl) {
                statusHtml = '<span class="font-bold text-green-600" title="Link Tersedia"><i class="fas fa-check"></i></span>';
            } else {
                statusHtml = '<span class="font-bold text-red-600 text-[10px]" title="Fansub ada, tapi URL kosong">[No Data]</span>';
            }
        }

        let addedByHtml = '';
        if (ML_LOGIC.role === 'leader') {
            const uniqueAdders = d.links ? [...new Set(d.links.map(l => l.added_by || '?'))] : [];
            addedByHtml = `<td class="border p-2 text-xs bg-yellow-50 text-yellow-800 break-all">${uniqueAdders.join(', ')}</td>`;
        }

        const delBtn = ML_LOGIC.role === 'leader' ? `<button class="text-red-500 hover:text-red-700 ml-2" onclick="ML_LOGIC.deleteEpisodeData('${cat}', '${showId}', '${d.realId}', '${d.suffix}')"><i class="fas fa-trash"></i></button>` : '';
        const editBtn = `<button class="text-blue-600 hover:text-blue-800" onclick="ML_LOGIC.goToGarapan('${cat}', '${showId}', '${d.realId}', '${d.suffix}')" title="Input Data"><i class="fas fa-plus-circle"></i></button>`;
        const displayId = d.realId.split('_')[0]; 

        const memberCol = showMember ? `<td class="border p-2">${memberHtml}</td>` : '';

        tbody.innerHTML += `
            <tr class="hover:bg-gray-50 border-b">
                <td class="border p-2 text-center font-bold">${displayId}</td>
                <td class="border p-2 text-center text-xs">${d.airing || '-'}</td>
                <td class="border p-2 text-sm">${d.sub_judul || '-'}</td>
                ${memberCol}
                <td class="border p-2 text-center">${statusHtml}</td>
                <td class="border p-2">${linksHtml}</td>
                ${addedByHtml}
                <td class="border p-2 text-center">${editBtn} ${delBtn}</td>
            </tr>
        `;
    });
};

ML_LOGIC.deleteEpisodeData = async (cat, showId, docId, suffix) => {
    if (!confirm("Yakin ingin menghapus data episode ini secara permanen?")) return;

    try {
        const docRef = firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(showId).collection('episodes').doc(docId);
        
        const updates = {};
        const sfx = suffix || ""; 
        
        updates[`sub_judul${sfx}`] = firebase.firestore.FieldValue.delete();
        updates[`links${sfx}`] = firebase.firestore.FieldValue.delete();
        updates[`members${sfx}`] = firebase.firestore.FieldValue.delete();

        await docRef.update(updates);
        
        const docSnap = await docRef.get();
        if (docSnap.exists) {
            const d = docSnap.data();
            const hasOtherData = Object.keys(d).some(key => key.startsWith('links') || key.startsWith('sub_judul'));

            if (!hasOtherData) {
                await docRef.delete();
            }
        }

        alert("Data berhasil dihapus!");
        
        const filterVal = document.getElementById('filter-show').value;
        ML_LOGIC.loadEpisodesList(filterVal);

    } catch (e) {
        alert("Gagal menghapus: " + e.message);
    }
};

ML_LOGIC.refreshEpisodeList = () => {
    const val = document.getElementById('filter-show').value;
    if (!val) return alert("Pilih acara terlebih dahulu!");
    ML_LOGIC.loadEpisodesList(val);
};

ML_LOGIC.sortEpisodeList = (col) => {
    if (ML_LOGIC.sortColumn === col) {
        ML_LOGIC.sortOrder = ML_LOGIC.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        ML_LOGIC.sortColumn = col;
        ML_LOGIC.sortOrder = 'asc';
    }
    const val = document.getElementById('filter-show').value;
    if(val) ML_LOGIC.loadEpisodesList(val);
};

ML_LOGIC.loadFansubDropdownForQuickAdd = async () => {
    if(document.getElementById('quick-fs-1').options.length > 1) return; 
    
    const snap = await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').get();
    const options = [];
    snap.forEach(doc => {
        options.push({id: doc.id, name: doc.data().name});
    });
    
    options.sort((a,b) => a.name.localeCompare(b.name));

    const selects = [1, 2, 3, 4];
    selects.forEach(num => {
        const el = document.getElementById(`quick-fs-1`); 
        if(num === 1) {
           options.forEach(opt => {
               const option = document.createElement('option');
               option.value = opt.name; 
               option.text = opt.name;
               el.add(option);
           });
        }
    });
};

ML_LOGIC.handleQuickFsChange = (num) => {
    const currentVal = document.getElementById(`quick-fs-${num}`).value;
    const nextNum = num + 1;
    const nextEl = document.getElementById(`quick-fs-${nextNum}`);
    
    if (num === 1) {
        const urlBox = document.getElementById('quick-url-box');
        if (currentVal) {
            urlBox.classList.remove('hidden');
        } else {
            urlBox.classList.add('hidden');
            document.getElementById('quick-url-split-check').checked = false;
            ML_LOGIC.toggleQuickUrlMode(false);
            document.getElementById('quick-url-single').value = "";
            document.getElementById('quick-url-h').value = "";
            document.getElementById('quick-url-s').value = "";
        }
    }

    if (nextEl) {
        if (currentVal) {
            nextEl.disabled = false;
            nextEl.classList.remove('opacity-50');
            if (nextEl.options.length <= 1) {
                const firstSelect = document.getElementById('quick-fs-1');
                for (let i = 1; i < firstSelect.options.length; i++) {
                    const opt = firstSelect.options[i];
                    const newOpt = document.createElement('option');
                    newOpt.value = opt.value;
                    newOpt.text = opt.text;
                    nextEl.add(newOpt);
                }
            }
        } else {
            nextEl.disabled = true;
            nextEl.classList.add('opacity-50');
            nextEl.value = "";
            ML_LOGIC.handleQuickFsChange(nextNum);
        }
    }
};

ML_LOGIC.toggleQuickUrlMode = (isSplit) => {
    const singleInp = document.getElementById('quick-url-single');
    const splitContainer = document.getElementById('quick-url-split-container');
    
    if (isSplit) {
        singleInp.classList.add('hidden');
        singleInp.value = "";
        splitContainer.classList.remove('hidden');
    } else {
        singleInp.classList.remove('hidden');
        splitContainer.classList.add('hidden');
        document.getElementById('quick-url-h').value = "";
        document.getElementById('quick-url-s').value = "";
    }
};

ML_LOGIC.toggleQuickMemberCustom = (isChecked) => {
    const customInp = document.getElementById('quick-member-custom');
    const manyCheck = document.getElementById('quick-member-many');
    const groupSelect = document.getElementById('quick-member-group');
    const listContainer = document.getElementById('quick-member-list');

    if (isChecked) {
        customInp.disabled = false;
        customInp.classList.remove('locked-cursor', 'bg-gray-100');
        
        manyCheck.checked = false;
        manyCheck.disabled = true;
        groupSelect.disabled = true;
		
        const checks = listContainer.querySelectorAll('input[type="checkbox"]');
        checks.forEach(c => {
            c.checked = false;
            c.disabled = true;
        });
        
        [manyCheck.parentElement, groupSelect, listContainer].forEach(el => el.classList.add('opacity-50', 'locked-cursor'));

    } else {
        customInp.disabled = true;
        customInp.classList.add('locked-cursor', 'bg-gray-100');
        customInp.value = "";

        manyCheck.disabled = false;
        groupSelect.disabled = false;
        
        const checks = listContainer.querySelectorAll('input[type="checkbox"]');
        checks.forEach(c => c.disabled = false);

        [manyCheck.parentElement, groupSelect, listContainer].forEach(el => el.classList.remove('opacity-50', 'locked-cursor'));
    }
};

ML_LOGIC.addQuickEpisode = async () => {
    const val = document.getElementById('filter-show').value;
    if(!val) return;
    const [cat, showId] = val.split('|');
    const isBonus = cat === 'bonus_single';

    let eps, baseEpsId;
    
    if (isBonus) {
        // Use Type Dropdown value as ID
        eps = document.getElementById('quick-type').value;
        if(!eps) return alert("Pilih Type!");
        baseEpsId = eps; 
    } else {
        eps = document.getElementById('quick-eps').value;
        if(!eps) return alert("Nomor Episode wajib diisi!");
        baseEpsId = String(eps).padStart(2, '0');
    }

    const sub = document.getElementById('quick-sub').value;
    
    const date = document.getElementById('quick-date').value;
    const unknownDate = document.getElementById('quick-unknown-date').checked;
    // For bonus, airing might be ignored or set to default
    const airing = isBonus ? '-' : (unknownDate ? 'unknown' : date);

    const fansubs = [];
    for(let i=1; i<=4; i++) {
        const fsVal = document.getElementById(`quick-fs-${i}`).value;
        if(fsVal) fansubs.push(fsVal);
    }
    
    const isSplitUrl = document.getElementById('quick-url-split-check').checked;
    const urlSingle = document.getElementById('quick-url-single').value;
    const urlH = document.getElementById('quick-url-h').value;
    const urlS = document.getElementById('quick-url-s').value;

    const batchLinks = fansubs.map((fsName, index) => {
        const linkObj = {
            fansub: fsName,
            url: '', 
            added_by: ML_LOGIC.user.email,
            timestamp: new Date().toISOString()
        };
        if (index === 0) {
            if (isSplitUrl) {
                if(urlH) linkObj.url_h = urlH;
                if(urlS) linkObj.url_s = urlS;
            } else {
                if(urlSingle) linkObj.url = urlSingle;
            }
        }
        return linkObj;
    });

    const memGroup = document.getElementById('quick-member-group').value;
    const memMany = document.getElementById('quick-member-many').checked;
    const isCustomMem = document.getElementById('quick-member-custom-check').checked;
    const memCustom = document.getElementById('quick-member-custom').value;
    const memChecks = document.querySelectorAll('#quick-member-list input:checked');
    
    let memberData = null;
    if (isCustomMem && memCustom) {
        memberData = { type: 'custom', names: memCustom };
    } else if (memMany) {
        memberData = { type: 'many', names: '多人' };
    } else if (!isCustomMem && memChecks.length > 0) {
        memberData = { type: 'list', names: Array.from(memChecks).map(c => c.value).join(' ・ ') };
    }

    const episodesRef = firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(showId).collection('episodes');

    try {
        let finalDocId = baseEpsId;
        let counter = 1;
        while (true) {
            const checkId = counter === 1 ? baseEpsId : `${baseEpsId}_${counter}`;
            const docCheck = await episodesRef.doc(checkId).get();
            if (!docCheck.exists) { finalDocId = checkId; break; } 
            else {
                const data = docCheck.data();
                const dbSub = (data.sub_judul || "").trim().toLowerCase();
                const inputSub = (sub || "").trim().toLowerCase();
                if (dbSub === inputSub) { finalDocId = checkId; break; }
                counter++;
            }
        }

        const docRef = episodesRef.doc(finalDocId);
        const docSnap = await docRef.get();
        
        if(docSnap.exists) {
            const updateData = {};
            if(sub) updateData.sub_judul = sub;
            if(airing) updateData.airing = airing;
            if(memberData) updateData.members = memberData;
            if(batchLinks.length > 0) updateData.links = firebase.firestore.FieldValue.arrayUnion(...batchLinks);
            await docRef.update(updateData);
        } else {
            const newData = { airing: airing, sub_judul: sub, links: batchLinks };
            if(memberData) newData.members = memberData;
            await docRef.set(newData);
        }
        
        alert("Episode berhasil diupdate/tambah!");
        
        // Reset Inputs
        if(isBonus) {
             document.getElementById('quick-type').value = "Type A";
        } else {
             document.getElementById('quick-eps').value = '';
        }
        document.getElementById('quick-sub').value = '';
        document.getElementById('quick-fs-1').value = '';
        
        document.getElementById('quick-url-box').classList.add('hidden');
        document.getElementById('quick-url-split-check').checked = false;
        ML_LOGIC.toggleQuickUrlMode(false);
        document.getElementById('quick-url-single').value = "";
        document.getElementById('quick-url-h').value = "";
        document.getElementById('quick-url-s').value = "";

        // Reset Member
        // Don't reset group if Bonus Single (it's locked)
        if (!isBonus) {
            document.getElementById('quick-member-group').value = "";
            document.getElementById('quick-member-list').innerHTML = "";
        } else {
            // Just clear checks
             const listContainer = document.getElementById('quick-member-list');
             const checks = listContainer.querySelectorAll('input[type="checkbox"]');
             checks.forEach(c => c.checked = false);
        }

        document.getElementById('quick-member-custom-check').checked = false;
        ML_LOGIC.toggleQuickMemberCustom(false); 
        document.getElementById('quick-member-many').checked = false;
        document.getElementById('quick-member-custom').value = "";
        
        ML_LOGIC.handleQuickFsChange(1); 
        ML_LOGIC.loadEpisodesList(val);
    } catch(e) {
        alert("Error: " + e.message);
    }
};