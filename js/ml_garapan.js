ML_LOGIC.handleCatChange = async (cat) => {
    const progSelect = document.getElementById('inp-program');
    const lblProgram = document.getElementById('lbl-program');
    
    // Default State
    progSelect.innerHTML = '<option>Loading...</option>';
    progSelect.disabled = true;
    progSelect.classList.remove('bg-gray-100', 'text-gray-400', 'hidden');
    progSelect.classList.add('bg-white', 'text-black');
    lblProgram.classList.remove('hidden');

    const bonusArea = document.getElementById('bonus-single-area');
    const containerEps = document.getElementById('container-garapan-eps');
    const containerType = document.getElementById('container-garapan-type');
    const lblSubtitle = document.getElementById('lbl-subtitle');
    const inpDate = document.getElementById('inp-date');
    const warnSubtitle = document.getElementById('warn-subtitle');

    if (cat === 'bonus_single') {
        bonusArea.classList.remove('hidden');
        progSelect.classList.add('hidden'); // Hide Program Dropdown
        lblProgram.classList.add('hidden'); // Hide Label

        // Adjust for Bonus Single
        containerEps.classList.add('hidden');
        containerType.classList.remove('hidden');
        lblSubtitle.innerText = "Judul Bonus";
        inpDate.disabled = true;
        inpDate.classList.add('bg-gray-100');
        warnSubtitle.classList.remove('hidden');
    } else {
        bonusArea.classList.add('hidden');
        progSelect.classList.remove('hidden');
        lblProgram.classList.remove('hidden');

        // Adjust for Standard
        containerEps.classList.remove('hidden');
        containerType.classList.add('hidden');
        lblSubtitle.innerText = "Sub Judul (Opsional)";
        inpDate.disabled = false;
        inpDate.classList.remove('bg-gray-100');
        warnSubtitle.classList.add('hidden');
        
        // Load Programs
        const snap = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).get();
        progSelect.innerHTML = '<option value="">-- Pilih Acara --</option>';
        snap.forEach(doc => {
            const d = doc.data();
            ML_LOGIC.cache.shows[doc.id] = d; 
            progSelect.innerHTML += `<option value="${doc.id}">${d.name}</option>`;
        });
        progSelect.disabled = false;
    }

    // Listener for Standard Program Dropdown
    progSelect.onchange = () => {
        const showId = progSelect.value;
        const showData = ML_LOGIC.cache.shows[showId];
        
        if(showData && showData.grup) {
            ML_LOGIC.toggleMultiGroup(false); // Reset check
            const checkboxes = document.getElementsByName('rad-group');
            checkboxes.forEach(c => {
                c.checked = (c.value === showData.grup);
                c.disabled = true;
            });
            document.getElementById('chk-multi-group').disabled = true;
        } else {
            const checkboxes = document.getElementsByName('rad-group');
            checkboxes.forEach(c => { c.disabled = false; });
            document.getElementById('chk-multi-group').disabled = false;
        }

        const epsInput = document.getElementById('inp-eps');
        const unknownCheck = document.getElementById('chk-eps-unknown');
        
        if(showData && showData.forbid_zero) {
            unknownCheck.checked = false;
            unknownCheck.disabled = true;
            epsInput.min = 1;
            epsInput.placeholder = "Wajib";
        } else {
            unknownCheck.disabled = false;
            epsInput.min = 0;
        }

        ML_LOGIC.checkEpisodeData();
    };

    document.getElementById('inp-eps').addEventListener('change', ML_LOGIC.checkEpisodeData);
    document.getElementById('chk-eps-unknown').addEventListener('change', ML_LOGIC.checkEpisodeData);
};

ML_LOGIC.handleGroupSingleChange = (group) => {
    // Reset Type & Song
    const typeSelect = document.getElementById('inp-type-single');
    const songSelect = document.getElementById('inp-song');
    
    typeSelect.value = "";
    typeSelect.disabled = !group;
    typeSelect.classList.toggle('bg-gray-100', !group);
    
    songSelect.innerHTML = '<option value="">-- Pilih Single --</option>';
    songSelect.disabled = true;
    songSelect.classList.add('bg-gray-100');

    // Handle Member Group Locking for Bonus Single
    const memGroup = document.getElementById('grp-member-group');
    if (group) {
        memGroup.value = group;
        ML_LOGIC.handleMemberGroupChange(group, 'grp-member-list');
        memGroup.disabled = true;
        memGroup.classList.add('bg-gray-100', 'locked-cursor');
    } else {
        memGroup.value = "";
        memGroup.disabled = false;
        memGroup.classList.remove('bg-gray-100', 'locked-cursor');
    }
};

ML_LOGIC.handleBonusTypeChange = async (type) => {
    const group = document.getElementById('inp-group-single').value;
    const songSelect = document.getElementById('inp-song');
    
    if (!group || !type) return;

    songSelect.innerHTML = '<option>Loading...</option>';
    
    const snap = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection('bonus_single')
        .where('grup', '==', group)
        .where('type', '==', type)
        .get();

    songSelect.innerHTML = '<option value="">-- Pilih Single --</option>';
    songSelect.disabled = false;
    songSelect.classList.remove('bg-gray-100');

    const items = [];
    snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));

    // Sort by Number
    items.sort((a,b) => (a.number || "").localeCompare(b.number || ""));

    items.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.text = `${item.number || '?'} - ${item.title || item.name}`;
        songSelect.add(opt);
        ML_LOGIC.cache.shows[item.id] = item; // Cache for checking data
    });
    
    // Listener for Bonus Single Selection to auto-check data
    songSelect.onchange = () => {
        const showId = songSelect.value;
        const showData = ML_LOGIC.cache.shows[showId];
        
        // Auto select group radio logic if needed
        if(showData && showData.grup) {
            ML_LOGIC.toggleMultiGroup(false);
            const checkboxes = document.getElementsByName('rad-group');
            checkboxes.forEach(c => {
                c.checked = (c.value === showData.grup);
                c.disabled = true;
            });
            document.getElementById('chk-multi-group').disabled = true;
        }

        // Auto Populate Member if exists in Show Data
        if (showData && showData.members) {
             const m = showData.members;
             if (m.type === 'custom' || m.type === 'list') {
                 document.getElementById('grp-member-custom').value = m.names;
                 ML_LOGIC.handleCustomMemberInput(m.names, 'grp');
                 document.getElementById('grp-member-custom-check').checked = true;
                 ML_LOGIC.toggleGarapanMemberCustom(true);
             } else if (m.type === 'many') {
                 document.getElementById('grp-member-many').checked = true;
                 ML_LOGIC.toggleMemberMany(true, 'grp');
             }
        }
        
        ML_LOGIC.checkEpisodeData();
    };
};

ML_LOGIC.checkEpisodeData = async () => {
    const cat = document.getElementById('inp-cat').value;
    const isBonus = cat === 'bonus_single';
    
    let prog, epsId;
    
    if (isBonus) {
        prog = document.getElementById('inp-song').value;
        epsId = document.getElementById('inp-garapan-type').value;
    } else {
        prog = document.getElementById('inp-program').value;
        const epsInput = document.getElementById('inp-eps').value;
        const isUnknown = document.getElementById('chk-eps-unknown').checked;
        if (!isUnknown && !epsInput) return;
        epsId = isUnknown ? 'unknown' : String(epsInput).padStart(2, '0');
    }

    if (!cat || !prog || !epsId) return;

    const subInput = document.getElementById('inp-subtitle');

    try {
        const doc = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(prog).collection('episodes').doc(epsId).get();
        
        if (doc.exists) {
            const data = doc.data();
            if (data.sub_judul && data.sub_judul.trim() !== "") {
                subInput.value = data.sub_judul;
                subInput.disabled = true;
                subInput.classList.add('bg-gray-100', 'text-gray-500');
                subInput.title = "Data sudah ada (Locked)";
            } else {
                subInput.disabled = false;
                subInput.value = "";
                subInput.classList.remove('bg-gray-100', 'text-gray-500');
                subInput.title = "";
            }
        } else {
            subInput.disabled = false;
            subInput.value = "";
            subInput.classList.remove('bg-gray-100', 'text-gray-500');
            subInput.title = "";
        }
    } catch (e) {
        console.log("Silent check error", e);
    }
};

ML_LOGIC.toggleUrlMode = (isSplit) => {
    const singleContainer = document.getElementById('url-single-container');
    const splitContainer = document.getElementById('url-split-container');
    const inpSingle = document.getElementById('inp-url');
    const inpH = document.getElementById('inp-url-h');
    const inpS = document.getElementById('inp-url-s');

    if(isSplit) {
        singleContainer.classList.add('hidden');
        splitContainer.classList.remove('hidden');
        inpSingle.removeAttribute('required');
    } else {
        singleContainer.classList.remove('hidden');
        splitContainer.classList.add('hidden');
        inpSingle.setAttribute('required', 'true');
        inpH.value = '';
        inpS.value = '';
    }
};

ML_LOGIC.loadFansubDropdown = async () => {
    const sel = document.getElementById('inp-fansub');
    if(!sel) return;
    
    sel.innerHTML = '<option value="">-- Pilih Fansub --</option><option value="other">Lainnya (Manual - Auto Add)</option>';
    
    const snap = await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').get();
    
    const fansubs = [];
    snap.forEach(doc => {
        const d = doc.data();
        ML_LOGIC.cache.fansubs[doc.id] = d;
        fansubs.push({id: doc.id, name: d.name});
    });

    fansubs.sort((a, b) => a.name.localeCompare(b.name));
    
    const otherOpt = sel.querySelector('option[value="other"]');

    fansubs.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.id;
        opt.text = f.name;
        sel.insertBefore(opt, otherOpt);
    });
};

ML_LOGIC.handleFansubSelect = (val) => {
    const manualInp = document.getElementById('inp-fansub-manual');
    const warnManual = document.getElementById('warn-fansub-manual');
    const radiosStatus = document.getElementsByName('rad-status');
    const radiosLang = document.getElementsByName('rad-lang');
    const correctionArea = document.getElementById('correction-area');
    const chkCorrection = document.getElementById('chk-correction');
    const inpUrl = document.getElementById('inp-url');
    const inpUrlH = document.getElementById('inp-url-h');
    const inpUrlS = document.getElementById('inp-url-s');
    const chkSplit = document.getElementById('chk-split-url');

    correctionArea.classList.add('hidden');
    chkCorrection.checked = false;
    inpUrl.disabled = false;
    inpUrlH.disabled = false;
    inpUrlS.disabled = false;
    inpUrl.classList.remove('bg-gray-100');
    inpUrlH.classList.remove('bg-gray-100');
    inpUrlS.classList.remove('bg-gray-100');
    
    inpUrl.value = "";
    inpUrlH.value = "";
    inpUrlS.value = "";

    if (val === 'other') {
        manualInp.classList.remove('hidden');
        warnManual.classList.remove('hidden');
        radiosStatus.forEach(r => r.disabled = false);
        radiosLang.forEach(r => r.disabled = false);
    } else if (val) {
        manualInp.classList.add('hidden');
        warnManual.classList.add('hidden');
        const data = ML_LOGIC.cache.fansubs[val];
        
        if(data) {
            const isActive = data.status;
            document.querySelector(`input[name="rad-status"][value="${isActive?'active':'inactive'}"]`).checked = true;
            radiosStatus.forEach(r => r.disabled = true);

            const hasId = data.lang_id;
            const hasEn = data.lang_en;
            
            if (hasId && !hasEn) {
                document.querySelector(`input[name="rad-lang"][value="id"]`).checked = true;
                radiosLang.forEach(r => r.disabled = true);
            } else if (!hasId && hasEn) {
                document.querySelector(`input[name="rad-lang"][value="en"]`).checked = true;
                radiosLang.forEach(r => r.disabled = true);
            } else {
                radiosLang.forEach(r => r.disabled = false);
            }
        }

        if (ML_LOGIC.currentEpisodeLinks.length > 0) {
            const fsName = data.name;
            const existingData = ML_LOGIC.currentEpisodeLinks.find(l => l.fansub === fsName);

            if (existingData) {
                if (existingData.lang) {
                    const langRadio = document.querySelector(`input[name="rad-lang"][value="${existingData.lang}"]`);
                    if (langRadio) {
                        langRadio.checked = true;
                        radiosLang.forEach(r => r.disabled = true);
                    }
                }

                const hasUrl = existingData.url;
                const hasUrlH = existingData.url_h;
                const hasUrlS = existingData.url_s;

                if (hasUrl || hasUrlH || hasUrlS) {
                    if (hasUrlH || hasUrlS) {
                        chkSplit.checked = true;
                        ML_LOGIC.toggleUrlMode(true);
                        if(hasUrlH) inpUrlH.value = hasUrlH;
                        if(hasUrlS) inpUrlS.value = hasUrlS;
                    } else {
                        chkSplit.checked = false;
                        ML_LOGIC.toggleUrlMode(false);
                        inpUrl.value = hasUrl;
                    }

                    inpUrl.disabled = true;
                    inpUrlH.disabled = true;
                    inpUrlS.disabled = true;
                    inpUrl.classList.add('bg-gray-100');
                    inpUrlH.classList.add('bg-gray-100');
                    inpUrlS.classList.add('bg-gray-100');

                    const myEmail = ML_LOGIC.user.email;
                    const isLeader = ML_LOGIC.role === 'leader';
                    const isAdmin = ML_LOGIC.role === 'admin';
                    
                    const isMyFansub = data.email === myEmail;
                    const isInactiveFansub = data.status === false;
                    const isUnclaimedFansub = !data.email || data.email === "";

                    let canCorrect = false;
                    if (isLeader) canCorrect = true;
                    else if (isAdmin) {
                        if (isMyFansub || isInactiveFansub || isUnclaimedFansub) {
                            canCorrect = true;
                        }
                    }

                    if (canCorrect) {
                        correctionArea.classList.remove('hidden');
                    }
                }
            }
        }

    } else {
        manualInp.classList.add('hidden');
        warnManual.classList.add('hidden');
        radiosStatus.forEach(r => r.disabled = false);
        radiosLang.forEach(r => r.disabled = false);
    }
};

ML_LOGIC.toggleCorrectionMode = (isChecked) => {
    const inpUrl = document.getElementById('inp-url');
    const inpUrlH = document.getElementById('inp-url-h');
    const inpUrlS = document.getElementById('inp-url-s');

    if (isChecked) {
        inpUrl.disabled = false;
        inpUrlH.disabled = false;
        inpUrlS.disabled = false;
        inpUrl.classList.remove('bg-gray-100');
        inpUrlH.classList.remove('bg-gray-100');
        inpUrlS.classList.remove('bg-gray-100');
    } else {
        inpUrl.disabled = true;
        inpUrlH.disabled = true;
        inpUrlS.disabled = true;
        inpUrl.classList.add('bg-gray-100');
        inpUrlH.classList.add('bg-gray-100');
        inpUrlS.classList.add('bg-gray-100');
    }
};

ML_LOGIC.handleGarapanMemberNameType = () => {
    const groupVal = document.getElementById('grp-member-group').value;
    if(groupVal) {
        ML_LOGIC.handleMemberGroupChange(groupVal, 'grp-member-list');
    }
};

ML_LOGIC.toggleGarapanMemberCustom = (isChecked) => {
    const customInp = document.getElementById('grp-member-custom');
    const manyCheck = document.getElementById('grp-member-many');
    const groupSelect = document.getElementById('grp-member-group');
    const listContainer = document.getElementById('grp-member-list');

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

ML_LOGIC.updateSelectedMembersDisplay = () => {
    const resultBox = document.getElementById('grp-member-result');
    const memChecks = document.querySelectorAll('#grp-member-list input:checked');
    const memCustom = document.getElementById('grp-member-custom').value;
    const memMany = document.getElementById('grp-member-many').checked;
    
    let html = "";
    if (memCustom) {
        html = `<span class="text-blue-600 font-bold">Custom:</span> ${memCustom}`;
    } else if (memMany) {
        html = `<span class="text-blue-600 font-bold">Mode 多人 (Many)</span>`;
    } else if (memChecks.length > 0) {
        // Group Logic is complex here because we don't have multi-group selection for member input yet
        // Assuming single group selected for members
        const names = Array.from(memChecks).map(c => c.value).join(', ');
        html = names;
    } else {
        html = '<span class="text-gray-400">Belum ada member dipilih.</span>';
    }
    resultBox.innerHTML = html;
};

ML_LOGIC.handleGroupCheck = (checkbox) => {
    const multiCheck = document.getElementById('chk-multi-group');
    if(!multiCheck.checked) {
        const boxes = document.getElementsByName('rad-group');
        boxes.forEach(b => {
            if(b !== checkbox) b.checked = false;
        });
    }
};

ML_LOGIC.toggleMultiGroup = (isChecked) => {
    if(!isChecked) {
        const boxes = document.querySelectorAll('input[name="rad-group"]:checked');
        if(boxes.length > 1) {
            for(let i=1; i<boxes.length; i++) boxes[i].checked = false;
        }
    }
};


ML_LOGIC.submitGarapan = async () => {
    const cat = document.getElementById('inp-cat').value;
    const isBonus = cat === 'bonus_single';
    
    let prog, epsId, subTitle, airingDate;

    if (isBonus) {
        prog = document.getElementById('inp-song').value;
        epsId = document.getElementById('inp-garapan-type').value;
        subTitle = document.getElementById('inp-subtitle').value; 
        airingDate = '-'; 
    } else {
        prog = document.getElementById('inp-program').value;
        const eps = document.getElementById('inp-eps').value;
        subTitle = document.getElementById('inp-subtitle').value;
        const isUnknown = document.getElementById('chk-eps-unknown').checked;
        if (!isUnknown && (!eps || eps === '0' || eps === '00')) {
             const showData = ML_LOGIC.cache.shows[prog];
             if(showData && showData.forbid_zero) return alert("Acara ini melarang Episode 00/Unknown. Mohon isi nomor episode.");
        }
        epsId = isUnknown ? 'unknown' : String(eps).padStart(2, '0');
        airingDate = document.getElementById('inp-date').value;
    }
    
    const fansubId = document.getElementById('inp-fansub').value;
    const isSplitUrl = document.getElementById('chk-split-url').checked;
    const isCorrection = document.getElementById('chk-correction') ? document.getElementById('chk-correction').checked : false;

    if(!cat || !prog || !fansubId) return alert("Mohon lengkapi data utama!");
    
    let fsName = "";
    if (fansubId === 'other') {
        fsName = document.getElementById('inp-fansub-manual').value;
        if(!fsName) return alert("Nama fansub manual wajib diisi!");
        try {
            const newFsId = fsName.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const fsDoc = await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').doc(newFsId).get();
            if (!fsDoc.exists) {
                await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').doc(newFsId).set({
                    name: fsName, status: true, email: "", timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                await ML_LOGIC.loadFansubDropdown();
            }
        } catch (e) { console.error("Auto add fansub failed", e); }
    } else {
        fsName = ML_LOGIC.cache.fansubs[fansubId].name;
    }
    const langRadio = document.querySelector('input[name="rad-lang"]:checked');
    const langVal = langRadio ? langRadio.value : 'id'; 

    let linkData = {
        fansub: fsName,
        lang: langVal,
        added_by: ML_LOGIC.user.email,
        timestamp: new Date().toISOString()
    };

    if (isSplitUrl) {
        const urlH = document.getElementById('inp-url-h').value;
        const urlS = document.getElementById('inp-url-s').value;
        if(!urlH && !urlS) return alert("Isi minimal satu link (Hardsub/Softsub)!");
        if(urlH) linkData.url_h = urlH;
        if(urlS) linkData.url_s = urlS;
    } else {
        const url = document.getElementById('inp-url').value;
        if(!url) return alert("URL wajib diisi!");
        linkData.url = url;
    }

    const memGroup = document.getElementById('grp-member-group').value;
    const memMany = document.getElementById('grp-member-many').checked;
    const memCustom = document.getElementById('grp-member-custom').value;
    const memChecks = document.querySelectorAll('#grp-member-list input:checked');
    
    let memberDataToSave = null;
    if (memCustom) memberDataToSave = { type: 'custom', names: memCustom };
    else if (memMany) memberDataToSave = { type: 'many', names: '多人' };
    else if (memChecks.length > 0) {
        const names = Array.from(memChecks).map(c => c.value).join(' ・ ');
        memberDataToSave = { type: 'list', names: names };
    }
    
    const grpChecks = document.querySelectorAll('input[name="rad-group"]:checked');
    const selectedGroups = Array.from(grpChecks).map(c => c.value);

    const episodesRef = firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(prog).collection('episodes');
    let finalDocId = epsId;

    try {
        if (ML_LOGIC.editingEpisodeId && ML_LOGIC.editingEpisodeId.startsWith(epsId)) {
            finalDocId = ML_LOGIC.editingEpisodeId;
        } 
        else {
            let counter = 1;
            while (true) {
                const checkId = counter === 1 ? epsId : `${epsId}_${counter}`;
                const docCheck = await episodesRef.doc(checkId).get();
                
                if (!docCheck.exists) {
                    finalDocId = checkId;
                    break;
                } else {
                    const data = docCheck.data();
                    const dbSub = (data.sub_judul || "").trim().toLowerCase();
                    const inputSub = (subTitle || "").trim().toLowerCase();

                    if (dbSub === inputSub) {
                        finalDocId = checkId;
                        break;
                    }
                    counter++;
                }
            }
        }

        const docRef = episodesRef.doc(finalDocId);
        const doc = await docRef.get();

        if (doc.exists) {
            const currentLinks = doc.data().links || [];
            const existingIndex = currentLinks.findIndex(l => l.fansub.toLowerCase() === fsName.toLowerCase());
            
            const updatePayload = { sub_judul: subTitle };
            if (memberDataToSave) updatePayload.members = memberDataToSave;
            if (selectedGroups.length > 0) updatePayload.participating_groups = selectedGroups;

            if (existingIndex !== -1) {
                const existingData = currentLinks[existingIndex];
                const hasUrlData = existingData.url || existingData.url_h || existingData.url_s;

                if (hasUrlData && !isCorrection) {
                    return alert("PENYIMPANAN DITOLAK: Fansub ini sudah ada dan ada link. Gunakan 'Perbaikan'.");
                } else {
                    const updatedLinks = [...currentLinks];
                    updatedLinks[existingIndex] = { ...existingData, ...linkData, updated_at: new Date().toISOString() };
                    updatePayload.links = updatedLinks;
                    await docRef.update(updatePayload);
                }
            } else {
                updatePayload.links = firebase.firestore.FieldValue.arrayUnion(linkData);
                await docRef.update(updatePayload);
            }
        } else {
            const setPayload = {
                airing: airingDate,
                sub_judul: subTitle,
                links: [linkData]
            };
            if (memberDataToSave) setPayload.members = memberDataToSave;
            if (selectedGroups.length > 0) setPayload.participating_groups = selectedGroups;
            await docRef.set(setPayload);
        }
        
        alert("Data tersimpan!");
        document.getElementById('form-garapan').reset();
        
        ML_LOGIC.handleCatChange('');
        document.getElementById('grp-member-result').innerHTML = '<span class="text-gray-400">Belum ada member dipilih.</span>';
        
        ML_LOGIC.currentEpisodeLinks = [];
        ML_LOGIC.tempLockedFansubs = [];
        ML_LOGIC.editingEpisodeId = null;
        ML_LOGIC.editingSuffix = null;
        ML_LOGIC.loadFansubDropdown(); 

    } catch(e) {
        alert("Error: " + e.message);
    }
};



ML_LOGIC.goToGarapan = async (cat, showId, eps, suffix = '') => {
    ML_LOGIC.switchTab('tab-garapan');
    ML_LOGIC.tempLockedFansubs = [];
    ML_LOGIC.currentEpisodeLinks = [];
    ML_LOGIC.editingEpisodeId = eps; 
    ML_LOGIC.editingSuffix = suffix;
    
    await ML_LOGIC.loadFansubDropdown();

    const catSelect = document.getElementById('inp-cat');
    catSelect.value = cat;
    catSelect.disabled = true;
    catSelect.classList.add('bg-gray-100', 'locked-cursor');

    await ML_LOGIC.handleCatChange(cat);
    
    const isBonus = cat === 'bonus_single';
    
    if (isBonus) {
        let showData = ML_LOGIC.cache.shows[showId];
        if(!showData) {
             const sDoc = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(showId).get();
             if(sDoc.exists) { showData = sDoc.data(); ML_LOGIC.cache.shows[showId] = showData; }
        }

        if(showData) {
            document.getElementById('inp-group-single').value = showData.grup;
            ML_LOGIC.handleGroupSingleChange(showData.grup);
            document.getElementById('inp-type-single').value = showData.type;
            await ML_LOGIC.handleBonusTypeChange(showData.type);
            document.getElementById('inp-song').value = showId;
            document.getElementById('inp-garapan-type').value = eps; 
        }
    } else {
        const progSelect = document.getElementById('inp-program');
        progSelect.value = showId;
        progSelect.dispatchEvent(new Event('change'));
        progSelect.disabled = true;
        progSelect.classList.remove('bg-white');
        progSelect.classList.add('bg-gray-100', 'locked-cursor');
        
        const epsInput = document.getElementById('inp-eps');
        const unknownCheck = document.getElementById('chk-eps-unknown');
        
        if (eps === 'unknown') {
            unknownCheck.checked = true;
            epsInput.value = '';
        } else {
            unknownCheck.checked = false;
            epsInput.value = parseInt(eps);
        }
        epsInput.disabled = true;
        unknownCheck.disabled = true;
        epsInput.classList.add('locked-cursor');
    }

    try {
        const doc = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(showId).collection('episodes').doc(eps).get();
        
        if (doc.exists) {
            const data = doc.data();
            
            const targetSub = suffix ? data[`sub_judul${suffix}`] : data.sub_judul;
            const targetLinks = suffix ? data[`links${suffix}`] : data.links;
            const targetMembers = suffix ? data[`members${suffix}`] : data.members;
            const targetGroups = suffix ? data[`participating_groups${suffix}`] : data.participating_groups;

            if (targetLinks) ML_LOGIC.currentEpisodeLinks = targetLinks;

            const subInput = document.getElementById('inp-subtitle');
            if (targetSub && targetSub.trim() !== "") {
                subInput.value = targetSub;
                subInput.disabled = true;
                subInput.classList.add('bg-gray-100', 'text-gray-500', 'locked-cursor'); 
            } else {
                subInput.value = "";
                subInput.disabled = false;
                subInput.classList.remove('bg-gray-100', 'text-gray-500', 'locked-cursor');
            }

            if (!isBonus) {
                 const dateInput = document.getElementById('inp-date');
                 if (data.airing && data.airing !== 'unknown') dateInput.value = data.airing;
                 dateInput.disabled = true;
                 dateInput.classList.add('locked-cursor');
            }

            // Member Populate & LOCKING LOGIC
            const memGroup = document.getElementById('grp-member-group');
            const memList = document.getElementById('grp-member-list');
            const memMany = document.getElementById('grp-member-many');
            const memCustom = document.getElementById('grp-member-custom');

            // Reset Member UI First
            memGroup.value = "";
            memList.innerHTML = "";
            memMany.checked = false;
            memCustom.value = "";
            [memGroup, memMany, memCustom].forEach(el => {
                el.disabled = false; 
                el.classList.remove('bg-gray-100', 'locked-cursor', 'opacity-50');
            });

            if (targetMembers) {
                if (targetMembers.type === 'custom') {
                    document.getElementById('grp-member-custom-check').checked = true;
                    ML_LOGIC.toggleGarapanMemberCustom(true);
                    memCustom.value = targetMembers.names;
                } else if (targetMembers.type === 'many') {
                    memMany.checked = true;
                } else if (targetMembers.type === 'list') {
                }
                
                ML_LOGIC.updateSelectedMembersDisplay();
				
                memGroup.disabled = true;
                memMany.disabled = true;
                memCustom.disabled = true;
                document.getElementById('grp-member-custom-check').disabled = true;
                
                const checkBoxes = memList.querySelectorAll('input[type="checkbox"]');
                checkBoxes.forEach(cb => cb.disabled = true);

                [memGroup, memMany.parentElement, memCustom, memList].forEach(el => el.classList.add('locked-cursor', 'opacity-75'));
                memCustom.classList.add('bg-gray-100');
            }
            
            // Participating Groups Populate
            if (targetGroups && targetGroups.length > 0) {
                 ML_LOGIC.toggleMultiGroup(true);
                 document.getElementById('chk-multi-group').checked = true;
                 const boxes = document.getElementsByName('rad-group');
                 boxes.forEach(b => {
                     if(targetGroups.includes(b.value)) b.checked = true;
                 });
                 // Optional: Lock groups if data exists?
                 document.getElementById('chk-multi-group').disabled = true;
                 boxes.forEach(b => b.disabled = true);
            }

            if (targetLinks && targetLinks.length > 0) {
                const link = targetLinks[0];
                const fsId = Object.keys(ML_LOGIC.cache.fansubs).find(key => ML_LOGIC.cache.fansubs[key].name === link.fansub);
                if (fsId) {
                    document.getElementById('inp-fansub').value = fsId;
                    ML_LOGIC.handleFansubSelect(fsId);
                }
            }
        }
    } catch (e) {
        console.error("Error fetching episode details:", e);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
