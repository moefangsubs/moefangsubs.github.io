ML_LOGIC.loadFansubList = async () => {
    const tbody = document.getElementById('fansub-list-body');
    const snap = await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').get();
    
    let fansubs = [];
    snap.forEach(doc => {
        fansubs.push({ id: doc.id, ...doc.data() });
    });

    fansubs.sort((a, b) => {
        if (ML_LOGIC.sortColumn === 'status') {
            const statA = a.status ? 1 : 0;
            const statB = b.status ? 1 : 0;
            return ML_LOGIC.sortOrder === 'asc' ? statA - statB : statB - statA;
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    tbody.innerHTML = '';
    fansubs.forEach(d => {
        const myEmail = ML_LOGIC.user.email;
        let canEdit = false;
        let canDelete = false;

        if(ML_LOGIC.role === 'leader') {
            canEdit = true;
            canDelete = true;
        } else if (ML_LOGIC.role === 'admin') {
            if (d.email === myEmail) {
                canEdit = true;
                canDelete = true;
            }
            if (!d.status || !d.email) {
                canDelete = true;
            }
        }

        const links = [];
        if(d.link_web) links.push(`<a href="${d.link_web}" target="_blank" class="text-blue-600"><i class="fas fa-globe"></i></a>`);
        if(d.url_fb) links.push(`<a href="${d.url_fb}" target="_blank" class="text-blue-800"><i class="fab fa-facebook"></i></a>`);
        if(d.url_twitter) links.push(`<a href="${d.url_twitter}" target="_blank" class="text-black"><i class="fab fa-twitter"></i></a>`);
        if(d.url_ig) links.push(`<a href="${d.url_ig}" target="_blank" class="text-pink-600"><i class="fab fa-instagram"></i></a>`);
        if(d.url_trakteer) links.push(`<a href="${d.url_trakteer}" target="_blank" class="text-red-600"><i class="fas fa-heart"></i></a>`);
        
        const logoHtml = d.logo ? `<img src="${d.logo}" class="h-8 object-contain mx-auto">` : '';

        tbody.innerHTML += `
            <tr class="hover:bg-gray-50 border-b">
                <td class="border p-2 text-center" style="background-color: var(--moe-tint2);">${logoHtml}</td>
                <td class="border p-2 font-bold">${d.name}</td>
                <td class="border p-2 text-center">
                    <span class="px-2 py-1 rounded text-xs text-white ${d.status ? 'bg-green-500':'bg-gray-500'}">
                        ${d.status ? 'AKTIF' : 'NONAKTIF'}
                    </span>
                </td>
                <td class="border p-2 text-center text-gray-400 font-mono" id="total-subs-${d.id}" data-fsname="${d.name}">-</td>
                <td class="border p-2 text-left space-x-2 text-lg">
                    ${links.join(' ')}
                </td>
                <td class="border p-2 text-center">
                    ${canEdit ? `<button onclick="ML_LOGIC.editFansub('${d.id}')" class="text-blue-600 hover:text-blue-800 mr-2"><i class="fas fa-edit"></i></button>` : '<span class="text-gray-300 mr-2"><i class="fas fa-lock"></i></span>'}
                    ${canDelete ? `<button onclick="ML_LOGIC.deleteFansub('${d.id}', '${d.name}')" class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button>` : ''}
                </td>
            </tr>
        `;
    });
};

ML_LOGIC.calculateFansubTotals = async () => {
    const btn = document.getElementById('btn-get-total');
    if(btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }

    try {
        const counts = {};
        
        // Menggunakan Collection Group Query untuk mengambil semua dokumen 'episodes' di seluruh database
        const snapshot = await firebase.firestore().collectionGroup('episodes').get();
        
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.links && Array.isArray(data.links)) {
                data.links.forEach(link => {
                    if (link.fansub) {
                        const name = link.fansub;
                        counts[name] = (counts[name] || 0) + 1;
                    }
                });
            }
        });

        // Update UI
        const cells = document.querySelectorAll('[id^="total-subs-"]');
        cells.forEach(cell => {
            const name = cell.getAttribute('data-fsname');
            const count = counts[name] || 0;
            cell.innerHTML = count > 0 ? `<span class="font-bold text-blue-600">${count}</span>` : '0';
        });
        
    } catch (e) {
        console.error("Gagal menghitung total:", e);
        alert("Gagal menghitung data: " + e.message);
    } finally {
        if(btn) {
            btn.disabled = false;
            btn.innerHTML = 'Get Total';
        }
    }
};

ML_LOGIC.sortFansubList = (col) => {
    if (ML_LOGIC.sortColumn === col) {
        ML_LOGIC.sortOrder = ML_LOGIC.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        ML_LOGIC.sortColumn = col;
        ML_LOGIC.sortOrder = 'asc';
    }
    ML_LOGIC.loadFansubList();
};

ML_LOGIC.addFansub = async () => {
    const name = document.getElementById('fs-name').value;
    const status = document.querySelector('input[name="fs-status"]:checked').value === 'true';
    const desc = document.getElementById('fs-desc').value;
    const langId = document.getElementById('fs-lang-id').checked;
    const langEn = document.getElementById('fs-lang-en').checked;
    
    if (!langId && !langEn) return alert("Wajib memilih minimal satu Bahasa Utama!");

    const web = document.getElementById('fs-web').value;
    const fb = document.getElementById('fs-fb').value;
    const twitter = document.getElementById('fs-twitter').value;
    const ig = document.getElementById('fs-ig').value;
    const trakteer = document.getElementById('fs-trakteer').value;
    const kofi = document.getElementById('fs-kofi').value;
    
    let emailOwner = document.getElementById('fs-email').value;

    if (ML_LOGIC.role === 'admin') {
        emailOwner = ML_LOGIC.user.email;
    }

    if (!name) return alert("Nama Fansub wajib diisi!");
    
    if (ML_LOGIC.role !== 'leader' && !emailOwner) {
        return alert("Email wajib diisi!");
    }

    try {
        const id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
        
        const checkDoc = await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').doc(id).get();
        if (checkDoc.exists) {
            return alert("Fansub dengan nama ini sudah ada! Tidak bisa membuat baru dengan nama yang sama.");
        }
        
        await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').doc(id).set({
            name: name,
            status: status,
            desc: desc,
            lang_id: langId,
            lang_en: langEn,
            link_web: web,
            url_fb: fb,
            url_twitter: twitter,
            url_ig: ig,
            url_trakteer: trakteer,
            url_kofi: kofi,
            email: emailOwner,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        alert("Fansub berhasil ditambahkan!");
        ML_LOGIC.resetFansubForm();
        ML_LOGIC.loadFansubList();
    } catch (e) {
        alert("Error: " + e.message);
    }
};

ML_LOGIC.editFansub = async (id) => {
    ML_LOGIC.editingFansubId = id;
    
    try {
        const doc = await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').doc(id).get();
        if (!doc.exists) return alert("Data tidak ditemukan!");
        
        const d = doc.data();
        
        const nameInput = document.getElementById('fs-name');
        nameInput.value = d.name;
        nameInput.disabled = true;
        nameInput.classList.add('bg-gray-100', 'locked-cursor');
        
        document.getElementById('fs-name-warn').innerText = "❌ Nama tidak dapat diubah";
        
        const statusVal = d.status ? 'true' : 'false';
        document.querySelector(`input[name="fs-status"][value="${statusVal}"]`).checked = true;
        
        document.getElementById('fs-desc').value = d.desc || '';
        document.getElementById('fs-email').value = d.email || '';
        
        document.getElementById('fs-lang-id').checked = (d.lang_id !== undefined) ? d.lang_id : false;
        document.getElementById('fs-lang-en').checked = (d.lang_en !== undefined) ? d.lang_en : false;

        document.getElementById('fs-web').value = d.link_web || '';
        document.getElementById('fs-fb').value = d.url_fb || '';
        document.getElementById('fs-twitter').value = d.url_twitter || '';
        document.getElementById('fs-ig').value = d.url_ig || '';
        document.getElementById('fs-trakteer').value = d.url_trakteer || '';
        document.getElementById('fs-kofi').value = d.url_kofi || '';
        
        if(d.logo && ML_LOGIC.role === 'leader') {
            document.getElementById('fs-logo').value = d.logo;
        }
        
        const btnAdd = document.getElementById('btn-add-fansub');
        if(btnAdd) btnAdd.classList.add('hidden');
        
        document.getElementById('form-fansub').scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
        console.error("Gagal load edit:", e);
    }
};

ML_LOGIC.saveFansub = async () => {
    if (!ML_LOGIC.editingFansubId) {
        return alert("Mode Tambah Baru. Gunakan tombol Tambah.");
    }

    const id = ML_LOGIC.editingFansubId;
    const status = document.querySelector('input[name="fs-status"]:checked').value === 'true';
    const desc = document.getElementById('fs-desc').value;
    const langId = document.getElementById('fs-lang-id').checked;
    const langEn = document.getElementById('fs-lang-en').checked;

    if (!langId && !langEn) return alert("Wajib memilih minimal satu Bahasa Utama!");
    
    const payload = {
        status: status,
        desc: desc,
        lang_id: langId,
        lang_en: langEn,
        link_web: document.getElementById('fs-web').value,
        url_fb: document.getElementById('fs-fb').value,
        url_twitter: document.getElementById('fs-twitter').value,
        url_ig: document.getElementById('fs-ig').value,
        url_trakteer: document.getElementById('fs-trakteer').value,
        url_kofi: document.getElementById('fs-kofi').value
    };
    
    if(ML_LOGIC.role === 'leader') {
        payload.logo = document.getElementById('fs-logo').value;
    }

    try {
        await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').doc(id).update(payload);
        
        alert("Perubahan disimpan!");
        ML_LOGIC.resetFansubForm();
        ML_LOGIC.loadFansubList();
    } catch (e) {
        alert("Error: " + e.message);
    }
};

ML_LOGIC.deleteFansub = async (id, name) => {
    if(!confirm(`Yakin ingin menghapus fansub "${name}" secara permanen? Tindakan ini tidak dapat dibatalkan.`)) return;
    
    try {
        await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').doc(id).delete();
        alert("Fansub berhasil dihapus.");
        ML_LOGIC.loadFansubList();
    } catch (e) {
        alert("Gagal menghapus: " + e.message);
    }
};

ML_LOGIC.resetFansubForm = () => {
    document.getElementById('form-fansub').reset();
    ML_LOGIC.editingFansubId = null;
    
    const nameInput = document.getElementById('fs-name');
    nameInput.disabled = false;
    nameInput.classList.remove('bg-gray-100', 'locked-cursor');
    document.getElementById('fs-name-warn').innerText = "⚠️ Hanya bisa diinput sekali, jika sudah tersimpan, tidak bisa diubah";
    
    const btnAdd = document.getElementById('btn-add-fansub');
    if(btnAdd) btnAdd.classList.remove('hidden');

    document.querySelector('input[name="fs-status"][value="true"]').checked = true;
    document.getElementById('fs-lang-id').checked = true;
    document.getElementById('fs-lang-en').checked = false;
    
    if(ML_LOGIC.role === 'admin') document.getElementById('fs-email').value = ML_LOGIC.user.email;
};


ML_LOGIC.handleAcaraCatChange = (cat, isForm = false) => {
    if (isForm) {
        const bonusGroup = document.getElementById('new-show-bonus-group');
        const nameInput = document.getElementById('new-show-name');
        const groupInputs = document.getElementsByName('new-show-group');
        const iconLabel = document.getElementById('lbl-new-show-icon');
        const descInput = document.getElementById('new-show-desc');
        const noZero = document.getElementById('new-show-no-zero');
        
        if (cat === 'bonus_single') {
            bonusGroup.classList.remove('hidden');
            nameInput.disabled = true;
            nameInput.classList.add('bg-gray-100');
            groupInputs.forEach(r => { r.disabled = true; r.checked = false; });
            iconLabel.innerText = "CD Cover URL";
            descInput.disabled = true;
            descInput.classList.add('bg-gray-100');
            noZero.disabled = true;
            noZero.checked = false;
            
            document.getElementById('acara-member-group').disabled = true;
            document.getElementById('acara-member-group').classList.add('bg-gray-100');
        } else {
            bonusGroup.classList.add('hidden');
            nameInput.disabled = false;
            nameInput.classList.remove('bg-gray-100');
            groupInputs.forEach(r => r.disabled = false);
            iconLabel.innerText = "Icon URL";
            descInput.disabled = false;
            descInput.classList.remove('bg-gray-100');
            noZero.disabled = false;
            
            document.getElementById('acara-member-group').disabled = false;
            document.getElementById('acara-member-group').classList.remove('bg-gray-100');
        }
    } else {
        ML_LOGIC.loadAcaraList(cat);
    }
};

ML_LOGIC.handleNewShowSingleGroup = (groupVal) => {
    const radios = document.getElementsByName('new-show-group');
    radios.forEach(r => {
        if(r.value === groupVal) r.checked = true;
    });
    
    const memGroup = document.getElementById('acara-member-group');
    if (memGroup) {
        memGroup.value = groupVal;
        ML_LOGIC.handleMemberGroupChange(groupVal, 'acara-member-list');
    }
};

ML_LOGIC.toggleAcaraMemberNameType = () => {
    const groupVal = document.getElementById('acara-member-group').value;
    if(groupVal) {
        ML_LOGIC.handleMemberGroupChange(groupVal, 'acara-member-list');
    }
};

ML_LOGIC.addNewShow = async () => {
    const cat = document.getElementById('new-show-cat').value;
    if (!cat) return alert("Pilih kategori!");

    const isBonus = cat === 'bonus_single';
    let name, group, icon, desc, noZero, bonusData = {};

    if (isBonus) {
        const sGroup = document.getElementById('new-show-single-group').value;
        const sType = document.getElementById('new-show-single-type').value;
        const sNum = document.getElementById('new-show-single-num').value;
        const sTitle = document.getElementById('new-show-single-title').value;

        if (!sGroup || !sNum || !sTitle) return alert("Lengkapi data Single!");

        name = sTitle;
        group = sGroup;
        icon = document.getElementById('new-show-icon').value;
        desc = ""; 
        noZero = false;

        bonusData = {
            type: sType,
            number: sNum,
            title: sTitle
        };
    } else {
        name = document.getElementById('new-show-name').value;
        const grpRadio = document.querySelector('input[name="new-show-group"]:checked');
        group = grpRadio ? grpRadio.value : "";
        icon = document.getElementById('new-show-icon').value;
        desc = document.getElementById('new-show-desc').value;
        noZero = document.getElementById('new-show-no-zero').checked;
        
        if (!name) return alert("Nama Acara wajib diisi!");
        if (!group) return alert("Pilih grup utama!");
    }

    const memMany = document.getElementById('acara-member-many').checked;
    const memCustom = document.getElementById('acara-member-custom').value;
    const memChecks = document.querySelectorAll('#acara-member-list input:checked');
    
    let memberData = null;
    if (memCustom) memberData = { type: 'custom', names: memCustom };
    else if (memMany) memberData = { type: 'many', names: '多人' };
    else if (memChecks.length > 0) {
        memberData = { type: 'list', names: Array.from(memChecks).map(c => c.value).join(' ・ ') };
    }

    const payload = {
        name: name,
        grup: group,
        icon: icon,
        desc: desc,
        forbid_zero: noZero,
        add_by: ML_LOGIC.user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    if (isBonus) Object.assign(payload, bonusData);
    if (memberData) payload.members = memberData;

    try {
        if (ML_LOGIC.editingShowId) {
            await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(ML_LOGIC.editingShowId).update(payload);
            alert("Acara berhasil diupdate!");
        } else {
            await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).add(payload);
            alert("Acara berhasil dibuat!");
        }
        ML_LOGIC.resetShowForm();
        ML_LOGIC.handleAcaraCatChange(cat);
    } catch (e) {
        alert("Error: " + e.message);
    }
};

ML_LOGIC.resetShowForm = () => {
    document.getElementById('form-show').reset();
    ML_LOGIC.editingShowId = null;
    document.getElementById('new-show-bonus-group').classList.add('hidden');
    
    const nameInput = document.getElementById('new-show-name');
    nameInput.disabled = false; nameInput.classList.remove('bg-gray-100');
    
    document.getElementsByName('new-show-group').forEach(r => r.disabled = false);
    
    document.getElementById('new-show-desc').disabled = false;
    document.getElementById('new-show-desc').classList.remove('bg-gray-100');
    
    document.getElementById('lbl-new-show-icon').innerText = "Icon URL";
    
    document.getElementById('acara-member-list').innerHTML = "";
    document.getElementById('acara-member-group').disabled = false;
    document.getElementById('acara-member-group').classList.remove('bg-gray-100');
};

ML_LOGIC.loadAcaraList = async (cat) => {
    const container = document.getElementById('acara-list-container');
    container.innerHTML = '<p class="p-8 text-center">Loading...</p>';
    
    if (!cat) {
        container.innerHTML = '<p class="p-8 text-center text-gray-400">Pilih kategori untuk melihat daftar acara.</p>';
        return;
    }

    try {
        const snap = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).get();
        const items = [];
        snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));

        if (items.length === 0) {
            container.innerHTML = '<p class="p-8 text-center text-gray-500">Belum ada data.</p>';
            return;
        }

        let html = '';
        const isLeader = ML_LOGIC.role === 'leader';

        if (cat === 'bonus_single') {
            const grouped = {};
            const order = ['nogizaka', 'keyakizaka', 'sakurazaka', 'hinatazaka', 'bokuao'];
            
            items.forEach(item => {
                if(!grouped[item.grup]) grouped[item.grup] = [];
                grouped[item.grup].push(item);
            });

            order.forEach(gKey => {
                if (grouped[gKey] && grouped[gKey].length > 0) {
                    html += `<h4 class="font-bold text-lg mt-6 mb-2 uppercase border-b border-gray-300">${gKey}</h4>`;
                    html += `<div class="overflow-x-auto"><table class="w-full text-sm bg-white border">`;
                    html += `<thead class="bg-gray-100"><tr>
                        <th class="p-2 border w-16 text-center">Cover</th>
                        <th class="p-2 border w-20 text-center">Type</th>
                        <th class="p-2 border w-16 text-center">No</th>
                        <th class="p-2 border">Title</th>
                        <th class="p-2 border w-24 text-center">Group</th>
                        <th class="p-2 border w-24 text-center">Aksi</th>
                    </tr></thead><tbody>`;
                    
                    grouped[gKey].sort((a,b) => (a.number || "").localeCompare(b.number || ""));

                    grouped[gKey].forEach((item) => {
                        const coverImg = item.icon ? `<img src="${item.icon}" class="w-10 h-10 object-cover mx-auto border" alt="cover">` : '<div class="w-10 h-10 bg-gray-200 mx-auto"></div>';
                        const delBtn = isLeader ? `<button onclick="ML_LOGIC.deleteShow('${item.id}', '${cat}')" class="text-red-600 hover:text-red-800 ml-2"><i class="fas fa-trash"></i></button>` : '';
                        
                        html += `<tr>
                            <td class="p-2 border text-center">${coverImg}</td>
                            <td class="p-2 border text-center text-xs font-bold">${item.type || '-'}</td>
                            <td class="p-2 border text-center font-bold">${item.number || '-'}</td>
                            <td class="p-2 border">${item.title || item.name}</td>
                            <td class="p-2 border text-center capitalize text-xs">${item.grup || '-'}</td>
                            <td class="p-2 border text-center">
                                ${isLeader ? `<button onclick="ML_LOGIC.editShow('${item.id}', '${cat}')" class="text-blue-600"><i class="fas fa-edit"></i></button>` : '-'}
                                ${delBtn}
                            </td>
                        </tr>`;
                    });
                    html += `</tbody></table></div>`;
                }
            });

        } else {
            html += `<div class="overflow-x-auto"><table class="w-full text-sm bg-white border">`;
            html += `<thead class="bg-gray-100"><tr>
                <th class="p-2 border w-10">No</th>
                <th class="p-2 border">Nama Acara</th>
                <th class="p-2 border">Grup</th>
                <th class="p-2 border">Member</th>
                <th class="p-2 border w-20">Aksi</th>
            </tr></thead><tbody>`;
            
            items.forEach((item, idx) => {
                let memStr = '-';
                if (item.members) memStr = `<span class="text-xs">${item.members.names}</span>`;
                const delBtn = isLeader ? `<button onclick="ML_LOGIC.deleteShow('${item.id}', '${cat}')" class="text-red-600 hover:text-red-800 ml-2"><i class="fas fa-trash"></i></button>` : '';

                html += `<tr>
                    <td class="p-2 border text-center">${idx + 1}</td>
                    <td class="p-2 border font-bold">${item.name}</td>
                    <td class="p-2 border text-center capitalize">${item.grup || '-'}</td>
                    <td class="p-2 border">${memStr}</td>
                    <td class="p-2 border text-center">
                        ${isLeader ? `<button onclick="ML_LOGIC.editShow('${item.id}', '${cat}')" class="text-blue-600"><i class="fas fa-edit"></i></button>` : '-'}
                        ${delBtn}
                    </td>
                </tr>`;
            });
            html += `</tbody></table></div>`;
        }

        container.innerHTML = html;
    } catch (e) {
        console.error("Load list failed", e);
        container.innerHTML = `<p class="text-red-500">Error loading data.</p>`;
    }
};


ML_LOGIC.editShow = async (id, cat) => {
    ML_LOGIC.editingShowId = id;
    
    // Set category
    const catSelect = document.getElementById('new-show-cat');
    catSelect.value = cat;
    ML_LOGIC.handleAcaraCatChange(cat, true);

    try {
        const doc = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(id).get();
        if(!doc.exists) return alert("Data tidak ditemukan");
        const d = doc.data();

        if (cat === 'bonus_single') {
            document.getElementById('new-show-single-group').value = d.grup;
            ML_LOGIC.handleNewShowSingleGroup(d.grup);
            
            document.getElementById('new-show-single-type').value = d.type;
            document.getElementById('new-show-single-num').value = d.number;
            document.getElementById('new-show-single-title').value = d.title;
            document.getElementById('new-show-name').value = d.name; // hidden but synced
            document.getElementById('new-show-icon').value = d.icon || "";
        } else {
            document.getElementById('new-show-name').value = d.name;
            const grpRadio = document.querySelector(`input[name="new-show-group"][value="${d.grup}"]`);
            if (grpRadio) grpRadio.checked = true;
            document.getElementById('new-show-icon').value = d.icon || "";
            document.getElementById('new-show-desc').value = d.desc || "";
            document.getElementById('new-show-no-zero').checked = d.forbid_zero || false;
            
            if (d.grup) ML_LOGIC.handleMemberGroupChange(d.grup, 'acara-member-list');
        }

        // Member Data
        if (d.members) {
            const m = d.members;
            if (m.type === 'custom' || m.type === 'list') {
                document.getElementById('acara-member-custom').value = m.names;
            } else if (m.type === 'many') {
                document.getElementById('acara-member-many').checked = true;
            }
        }

        document.getElementById('form-show').scrollIntoView({ behavior: 'smooth' });

    } catch (e) {
        console.error("Edit show failed", e);
    }
};

ML_LOGIC.deleteShow = async (id, cat) => {
    if (!confirm("Yakin ingin menghapus acara ini? Perhatian: Data episode di dalamnya mungkin tidak terhapus otomatis.")) return;

    try {
        await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(id).delete();
        alert("Acara berhasil dihapus!");
        ML_LOGIC.loadAcaraList(cat);
    } catch (e) {
        alert("Error: " + e.message);
    }
};