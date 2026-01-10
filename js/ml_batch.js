ML_LOGIC.checkBatchJson = () => {
    const inputStr = document.getElementById('batch-json-input').value;
    const reviewArea = document.getElementById('batch-review-area');
    const logArea = document.getElementById('batch-log');
    
    reviewArea.innerHTML = '';
    reviewArea.classList.add('hidden');
    logArea.classList.add('hidden');

    if (!inputStr.trim()) return alert("Input JSON kosong!");

    let data;
    try {
        data = JSON.parse(inputStr);
    } catch (e) {
        return alert("JSON Invalid: " + e.message);
    }

    reviewArea.classList.remove('hidden');
    let html = '';

    if (data.fansubs && Array.isArray(data.fansubs) && data.fansubs.length > 0) {
        html += `
            <div class="border rounded bg-white overflow-hidden">
                <div class="bg-gray-100 p-3 border-b font-bold flex justify-between">
                    <span>Daftar Fansub</span>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${data.fansubs.length} item</span>
                </div>
                <div class="overflow-x-auto max-h-64">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50 text-left">
                            <tr>
                                <th class="border p-2">ID</th>
                                <th class="border p-2">Nama</th>
                                <th class="border p-2 text-center">Status</th>
                                <th class="border p-2 text-center">Info Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.fansubs.map(f => {
                                const linkCount = [f.link_web, f.url_fb, f.url_twitter, f.url_ig, f.url_trakteer, f.url_kofi].filter(x => x).length;
                                return `
                                <tr class="hover:bg-gray-50 border-b">
                                    <td class="border p-2 font-mono text-xs text-gray-600">${f.id || '<span class="text-red-500 font-bold">MISSING</span>'}</td>
                                    <td class="border p-2 font-bold">${f.name || '<span class="text-red-500 font-bold">MISSING</span>'}</td>
                                    <td class="border p-2 text-center">
                                        <span class="px-2 py-0.5 rounded text-xs text-white ${f.status ? 'bg-green-500' : 'bg-red-500'}">
                                            ${f.status ? 'AKTIF' : 'MATI'}
                                        </span>
                                    </td>
                                    <td class="border p-2 text-center text-xs text-gray-500">${linkCount} link</td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    if (data.shows && Array.isArray(data.shows) && data.shows.length > 0) {
        html += `
            <div class="border rounded bg-white overflow-hidden">
                <div class="bg-gray-100 p-3 border-b font-bold flex justify-between">
                    <span>Daftar Acara (Shows)</span>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${data.shows.length} item</span>
                </div>
                <div class="overflow-x-auto max-h-96">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50 text-left">
                            <tr>
                                <th class="border p-2">Kategori</th>
                                <th class="border p-2">Nama Acara</th>
                                <th class="border p-2 text-center">Grup</th>
                                <th class="border p-2 text-center">Eps</th>
                                <th class="border p-2 text-center">Member</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.shows.map(s => {
                                const epsCount = s.episodes ? s.episodes.length : 0;
                                let memberInfo = '-';
                                if (s.members) {
                                    if (s.members.type === 'custom') memberInfo = 'Custom';
                                    else if (s.members.type === 'many') memberInfo = 'Many';
                                    else if (s.members.type === 'list') memberInfo = 'List';
                                }
                                return `
                                <tr class="hover:bg-gray-50 border-b">
                                    <td class="border p-2 text-xs font-mono">${s.category || '<span class="text-red-500 font-bold">MISSING</span>'}</td>
                                    <td class="border p-2 font-bold">
                                        ${s.name || s.title || '<span class="text-red-500 font-bold">MISSING</span>'}
                                        ${s.number ? `<span class="text-xs font-normal text-gray-500 ml-1">(${s.number})</span>` : ''}
                                    </td>
                                    <td class="border p-2 text-center capitalize">${s.grup || '-'}</td>
                                    <td class="border p-2 text-center font-bold ${epsCount > 0 ? 'text-green-600' : 'text-gray-400'}">${epsCount}</td>
                                    <td class="border p-2 text-center text-xs text-gray-500">${memberInfo}</td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    if (!html) {
        html = `<div class="p-4 bg-blue-50 text-blue-800 border border-blue-200 rounded text-center">JSON Valid, tetapi tidak ditemukan array "shows" atau "fansubs".</div>`;
    }

    reviewArea.innerHTML = html;
};

ML_LOGIC.processBatchJson = async () => {
    const inputStr = document.getElementById('batch-json-input').value;
    const logArea = document.getElementById('batch-log');
    
    logArea.innerHTML = '';
    logArea.classList.remove('hidden');

    if (!inputStr.trim()) return alert("Area input kosong!");

    let data;
    try {
        data = JSON.parse(inputStr);
    } catch (e) {
        return alert("Format JSON tidak valid!");
    }

    const appendLog = (msg, type = 'info') => {
        const div = document.createElement('div');
        div.className = type === 'error' ? 'text-red-400' : (type === 'success' ? 'text-green-400' : 'text-gray-400');
        div.innerText = `> ${msg}`;
        logArea.appendChild(div);
        logArea.scrollTop = logArea.scrollHeight;
    };

    appendLog("Memulai proses batch...", 'info');

    const db = firebase.firestore();
    const batch = db.batch();
    let batchCount = 0;
    
    // Fungsi commit batch jika limit tercapai (Firestore limit 500 ops)
    const checkCommit = async () => {
        if (batchCount >= 450) {
            await batch.commit();
            batchCount = 0;
            return db.batch(); // Return new batch
        }
        return batch;
    };

    try {
        // --- PROCESS FANSUBS ---
        if (data.fansubs && Array.isArray(data.fansubs)) {
            for (const item of data.fansubs) {
                if (!item.id || !item.name) {
                    appendLog(`Skip Fansub: ID/Nama invalid`, 'error');
                    continue;
                }
                
                const ref = db.collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').doc(item.id);
                batch.set(ref, {
                    name: item.name,
                    status: item.status === true,
                    logo: item.logo || "",
                    desc: item.desc || "",
                    link_web: item.link_web || "",
                    url_fb: item.url_fb || "",
                    url_twitter: item.url_twitter || "",
                    url_ig: item.url_ig || "",
                    url_trakteer: item.url_trakteer || "",
                    url_kofi: item.url_kofi || "",
                    email: item.email || "",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
                
                batchCount++;
                appendLog(`Fansub disiapkan: ${item.name}`, 'success');
            }
        }

        // --- PROCESS SHOWS ---
        if (data.shows && Array.isArray(data.shows)) {
            for (const item of data.shows) {
                if (!item.category || !item.name) {
                    appendLog(`Skip Show: Kategori/Nama invalid`, 'error');
                    continue;
                }

                let showId = item.id;
                let showRef;

                if (showId) {
                    showRef = db.collection('masterlist_data').doc('show_parent').collection(item.category).doc(showId);
                } else {
                    showRef = db.collection('masterlist_data').doc('show_parent').collection(item.category).doc();
                    showId = showRef.id;
                }

                const showPayload = {
                    name: item.name,
                    grup: item.grup || "",
                    icon: item.icon || "",
                    desc: item.desc || "",
                    forbid_zero: item.forbid_zero || false,
                    add_by: ML_LOGIC.user.email,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                };

                if (item.category === 'bonus_single') {
                    showPayload.type = item.type || "Single";
                    showPayload.number = item.number || "";
                    showPayload.title = item.title || item.name;
                }

                if (item.members) {
                    showPayload.members = item.members;
                }

                batch.set(showRef, showPayload, { merge: true });
                batchCount++;
                appendLog(`Acara disiapkan: ${item.name}`, 'success');

                // Episodes
                if (item.episodes && Array.isArray(item.episodes)) {
                    for (const eps of item.episodes) {
                        if (!eps.id) continue;
                        
                        const epsRef = showRef.collection('episodes').doc(eps.id);
                        const epsPayload = {
                            airing: eps.airing || "-",
                            sub_judul: eps.sub_judul || "",
                            links: eps.links || []
                        };
                        
                        if (eps.members) epsPayload.members = eps.members;
                        if (eps.participating_groups) epsPayload.participating_groups = eps.participating_groups;

                        batch.set(epsRef, epsPayload, { merge: true });
                        batchCount++;
                    }
                    appendLog(`+ ${item.episodes.length} Episode`, 'info');
                }
            }
        }

        if (batchCount > 0) {
            await batch.commit();
            appendLog(`SELESAI! ${batchCount} dokumen berhasil disimpan.`, 'success');
            alert("Proses Batch Selesai!");
        } else {
            appendLog("Tidak ada data baru untuk disimpan.", 'error');
        }

    } catch (e) {
        console.error(e);
        appendLog(`ERROR CRITICAL: ${e.message}`, 'error');
        alert("Terjadi kesalahan saat upload batch.");
    }
};

// --- BATCH JSON GENERATOR LOGIC ---

ML_LOGIC.loadBatchGenShows = async (cat) => {
    const sel = document.getElementById('gen-show');
    sel.innerHTML = '<option>Loading...</option>';
    sel.disabled = true;

    if (!cat) {
        sel.innerHTML = '<option value="">-- Pilih Kategori Dulu --</option>';
        return;
    }

    try {
        const snap = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).get();
        sel.innerHTML = '<option value="">-- Pilih Acara --</option>';
        sel.disabled = false;
        
        snap.forEach(doc => {
            const d = doc.data();
            // Cache data agar bisa diambil metadata-nya
            ML_LOGIC.cache.shows[doc.id] = { id: doc.id, ...d }; 
            
            const nameDisplay = d.title ? `${d.number || ''} - ${d.title}` : d.name;
            const opt = document.createElement('option');
            opt.value = doc.id;
            opt.text = nameDisplay;
            sel.add(opt);
        });
    } catch (e) {
        console.error("Gagal load show batch", e);
        sel.innerHTML = '<option>Error Loading</option>';
    }
};

ML_LOGIC.updateJsonPreview = () => {
    const cat = document.getElementById('gen-cat').value;
    const showId = document.getElementById('gen-show').value;
    const output = document.getElementById('gen-output');

    if (!cat || !showId) {
        output.value = "// Silakan pilih Kategori dan Acara terlebih dahulu.";
        return;
    }

    const showData = ML_LOGIC.cache.shows[showId];
    if (!showData) return;

    // Build Show Object
    const showObj = {
        category: cat,
        id: showData.id,
        name: showData.name || showData.title,
        grup: showData.grup || "",
        icon: showData.icon || "",
        desc: showData.desc || "",
        forbid_zero: showData.forbid_zero || false
    };

    if (cat === 'bonus_single') {
        showObj.type = showData.type || "Single";
        showObj.number = showData.number || "";
        showObj.title = showData.title || showData.name;
    }

    if (showData.members) {
        showObj.members = showData.members;
    }

    // Episodes Logic
    const includeEps = document.getElementById('chk-gen-eps').checked;
    if (includeEps) {
        const epsObj = {
            id: "01" 
        };

        if (document.getElementById('chk-gen-airing').checked) epsObj.airing = "2024-01-01";
        if (document.getElementById('chk-gen-sub').checked) epsObj.sub_judul = "Judul Episode Contoh";
        
        if (document.getElementById('chk-gen-member').checked) {
            epsObj.members = { type: "list", names: "Member A ・ Member B" };
        }

        // Links Logic
        const includeLinks = document.getElementById('chk-gen-links').checked;
        if (includeLinks) {
            const linkObj = {};
            if (document.getElementById('chk-gen-link-fansub').checked) linkObj.fansub = "Nama Fansub";
            if (document.getElementById('chk-gen-link-url').checked) linkObj.url = "https://link-fansub.com";
            if (document.getElementById('chk-gen-link-lang').checked) linkObj.lang = "id";
            
            // PERBAIKAN: Gunakan email user yang sedang login
            if (document.getElementById('chk-gen-link-added').checked) {
                linkObj.added_by = ML_LOGIC.user ? ML_LOGIC.user.email : "email@anda.com";
            }
            
            if (document.getElementById('chk-gen-link-time').checked) linkObj.timestamp = new Date().toISOString();
            
            epsObj.links = [linkObj];
        }

        showObj.episodes = [epsObj, { ...epsObj, id: "02" }]; 
    }

    const finalJson = {
        shows: [showObj]
    };

    output.value = JSON.stringify(finalJson, null, 2);
};

ML_LOGIC.copyJsonToInput = () => {
    const preview = document.getElementById('gen-output').value;
    const input = document.getElementById('batch-json-input');
    
    if (!preview || preview.startsWith("//")) return alert("Belum ada JSON yang digenerate.");
    
    input.value = preview;
    alert("JSON berhasil disalin ke Input Box! Silakan edit value-nya sebelum diproses.");
};

ML_LOGIC.checkBatchJson = () => {
    const inputStr = document.getElementById('batch-json-input').value;
    const reviewArea = document.getElementById('batch-review-area');
    const logArea = document.getElementById('batch-log');
    
    reviewArea.innerHTML = '';
    reviewArea.classList.add('hidden');
    logArea.classList.add('hidden');

    if (!inputStr.trim()) return alert("Input JSON kosong!");

    let data;
    try {
        data = JSON.parse(inputStr);
    } catch (e) {
        return alert("JSON Invalid: " + e.message);
    }

    reviewArea.classList.remove('hidden');
    let html = '';

    if (data.fansubs && Array.isArray(data.fansubs) && data.fansubs.length > 0) {
        html += `
            <div class="border rounded bg-white overflow-hidden">
                <div class="bg-gray-100 p-3 border-b font-bold flex justify-between">
                    <span>Daftar Fansub</span>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${data.fansubs.length} item</span>
                </div>
                <div class="overflow-x-auto max-h-64">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50 text-left">
                            <tr>
                                <th class="border p-2">ID</th>
                                <th class="border p-2">Nama</th>
                                <th class="border p-2 text-center">Status</th>
                                <th class="border p-2 text-center">Info Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.fansubs.map(f => {
                                const linkCount = [f.link_web, f.url_fb, f.url_twitter, f.url_ig, f.url_trakteer, f.url_kofi].filter(x => x).length;
                                return `
                                <tr class="hover:bg-gray-50 border-b">
                                    <td class="border p-2 font-mono text-xs text-gray-600">${f.id || '<span class="text-red-500 font-bold">MISSING</span>'}</td>
                                    <td class="border p-2 font-bold">${f.name || '<span class="text-red-500 font-bold">MISSING</span>'}</td>
                                    <td class="border p-2 text-center">
                                        <span class="px-2 py-0.5 rounded text-xs text-white ${f.status ? 'bg-green-500' : 'bg-red-500'}">
                                            ${f.status ? 'AKTIF' : 'MATI'}
                                        </span>
                                    </td>
                                    <td class="border p-2 text-center text-xs text-gray-500">${linkCount} link</td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    if (data.shows && Array.isArray(data.shows) && data.shows.length > 0) {
        html += `
            <div class="border rounded bg-white overflow-hidden">
                <div class="bg-gray-100 p-3 border-b font-bold flex justify-between">
                    <span>Daftar Acara (Shows)</span>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${data.shows.length} item</span>
                </div>
                <div class="overflow-x-auto max-h-96">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50 text-left">
                            <tr>
                                <th class="border p-2">Kategori</th>
                                <th class="border p-2">Nama Acara</th>
                                <th class="border p-2 text-center">Grup</th>
                                <th class="border p-2 text-center">Eps</th>
                                <th class="border p-2 text-center">Member</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.shows.map(s => {
                                const epsCount = s.episodes ? s.episodes.length : 0;
                                let memberInfo = '-';
                                if (s.members) {
                                    if (s.members.type === 'custom') memberInfo = 'Custom';
                                    else if (s.members.type === 'many') memberInfo = 'Many';
                                    else if (s.members.type === 'list') memberInfo = 'List';
                                }
                                return `
                                <tr class="hover:bg-gray-50 border-b">
                                    <td class="border p-2 text-xs font-mono">${s.category || '<span class="text-red-500 font-bold">MISSING</span>'}</td>
                                    <td class="border p-2 font-bold">
                                        ${s.name || s.title || '<span class="text-red-500 font-bold">MISSING</span>'}
                                        ${s.number ? `<span class="text-xs font-normal text-gray-500 ml-1">(${s.number})</span>` : ''}
                                    </td>
                                    <td class="border p-2 text-center capitalize">${s.grup || '-'}</td>
                                    <td class="border p-2 text-center font-bold ${epsCount > 0 ? 'text-green-600' : 'text-gray-400'}">${epsCount}</td>
                                    <td class="border p-2 text-center text-xs text-gray-500">${memberInfo}</td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    if (!html) {
        html = `<div class="p-4 bg-blue-50 text-blue-800 border border-blue-200 rounded text-center">JSON Valid, tetapi tidak ditemukan array "shows" atau "fansubs".</div>`;
    }

    reviewArea.innerHTML = html;
};

ML_LOGIC.processBatchJson = async () => {
    const inputStr = document.getElementById('batch-json-input').value;
    const logArea = document.getElementById('batch-log');
    
    logArea.innerHTML = '';
    logArea.classList.remove('hidden');

    if (!inputStr.trim()) return alert("Area input kosong!");

    let data;
    try {
        data = JSON.parse(inputStr);
    } catch (e) {
        return alert("Format JSON tidak valid!");
    }

    const appendLog = (msg, type = 'info') => {
        const div = document.createElement('div');
        div.className = type === 'error' ? 'text-red-400' : (type === 'success' ? 'text-green-400' : 'text-gray-400');
        div.innerText = `> ${msg}`;
        logArea.appendChild(div);
        logArea.scrollTop = logArea.scrollHeight;
    };

    appendLog("Memulai proses batch...", 'info');

    const db = firebase.firestore();
    const batch = db.batch();
    let batchCount = 0;
    
    // Fungsi commit batch jika limit tercapai (Firestore limit 500 ops)
    const checkCommit = async () => {
        if (batchCount >= 450) {
            await batch.commit();
            batchCount = 0;
            return db.batch(); // Return new batch
        }
        return batch;
    };

    try {
        // --- PROCESS FANSUBS ---
        if (data.fansubs && Array.isArray(data.fansubs)) {
            for (const item of data.fansubs) {
                if (!item.id || !item.name) {
                    appendLog(`Skip Fansub: ID/Nama invalid`, 'error');
                    continue;
                }
                
                const ref = db.collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').doc(item.id);
                batch.set(ref, {
                    name: item.name,
                    status: item.status === true,
                    logo: item.logo || "",
                    desc: item.desc || "",
                    link_web: item.link_web || "",
                    url_fb: item.url_fb || "",
                    url_twitter: item.url_twitter || "",
                    url_ig: item.url_ig || "",
                    url_trakteer: item.url_trakteer || "",
                    url_kofi: item.url_kofi || "",
                    email: item.email || "",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
                
                batchCount++;
                appendLog(`Fansub disiapkan: ${item.name}`, 'success');
            }
        }

        // --- PROCESS SHOWS ---
        if (data.shows && Array.isArray(data.shows)) {
            for (const item of data.shows) {
                if (!item.category || !item.name) {
                    appendLog(`Skip Show: Kategori/Nama invalid`, 'error');
                    continue;
                }

                let showId = item.id;
                let showRef;

                if (showId) {
                    showRef = db.collection('masterlist_data').doc('show_parent').collection(item.category).doc(showId);
                } else {
                    showRef = db.collection('masterlist_data').doc('show_parent').collection(item.category).doc();
                    showId = showRef.id;
                }

                const showPayload = {
                    name: item.name,
                    grup: item.grup || "",
                    icon: item.icon || "",
                    desc: item.desc || "",
                    forbid_zero: item.forbid_zero || false,
                    add_by: ML_LOGIC.user.email,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                };

                if (item.category === 'bonus_single') {
                    showPayload.type = item.type || "Single";
                    showPayload.number = item.number || "";
                    showPayload.title = item.title || item.name;
                }

                if (item.members) {
                    showPayload.members = item.members;
                }

                batch.set(showRef, showPayload, { merge: true });
                batchCount++;
                appendLog(`Acara disiapkan: ${item.name}`, 'success');

                // Episodes
                if (item.episodes && Array.isArray(item.episodes)) {
                    for (const eps of item.episodes) {
                        if (!eps.id) continue;
                        
                        const epsRef = showRef.collection('episodes').doc(eps.id);
                        const epsPayload = {
                            airing: eps.airing || "-",
                            sub_judul: eps.sub_judul || "",
                            links: eps.links || []
                        };
                        
                        if (eps.members) epsPayload.members = eps.members;
                        if (eps.participating_groups) epsPayload.participating_groups = eps.participating_groups;

                        batch.set(epsRef, epsPayload, { merge: true });
                        batchCount++;
                    }
                    appendLog(`+ ${item.episodes.length} Episode`, 'info');
                }
            }
        }

        if (batchCount > 0) {
            await batch.commit();
            appendLog(`SELESAI! ${batchCount} dokumen berhasil disimpan.`, 'success');
            alert("Proses Batch Selesai!");
        } else {
            appendLog("Tidak ada data baru untuk disimpan.", 'error');
        }

    } catch (e) {
        console.error(e);
        appendLog(`ERROR CRITICAL: ${e.message}`, 'error');
        alert("Terjadi kesalahan saat upload batch.");
    }
};