const ML_LOGIC = {
    // STATE
    user: null,
    role: null,
    currentTab: 'tab-garapan',
    staticData: null,
    cache: { shows: {}, fansubs: {} },

    // --- INIT ---
    init: async () => {
        try {
            const resp = await fetch('../store/data/masterlist/static_data.json');
            ML_LOGIC.staticData = await resp.json();
        } catch (e) { console.error("Missing JSON", e); return; }

        firebase.auth().onAuthStateChanged(async (u) => {
            const root = document.getElementById('app-root');
            if (u) {
                const doc = await firebase.firestore().collection('masterlist_data').doc('role_parent').collection('list_users').doc(u.email).get();
                if (doc.exists) {
                    ML_LOGIC.user = u;
                    ML_LOGIC.role = doc.data().status;
                    root.innerHTML = ML_COMPONENTS.renderDashboard(u, ML_LOGIC.role);
                    ML_LOGIC.switchTab('tab-garapan');
                } else {
                    root.innerHTML = ML_COMPONENTS.renderRegister(u.email, u.displayName);
                    document.getElementById('btn-register-submit').onclick = ML_LOGIC.registerUser;
                }
            } else {
                root.innerHTML = ML_COMPONENTS.renderLogin();
                document.getElementById('btn-login-google').onclick = ML_LOGIC.loginGoogle;
            }
        });
    },

    loginGoogle: () => {
        const p = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(p);
    },

    registerUser: async () => {
        const u = firebase.auth().currentUser;
        if(!u) return;
        await firebase.firestore().collection('masterlist_data').doc('role_parent').collection('list_users').doc(u.email).set({
            email: u.email,
            nickname: u.displayName,
            status: 'volunteer',
            accept: false,
            is_add_edit: true
        });
        location.reload();
    },

    switchTab: (tabName) => {
        ML_LOGIC.currentTab = tabName;
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active', 'border-black', 'bg-gray-200');
            b.classList.add('border-transparent');
            if(b.getAttribute('onclick').includes(tabName)) {
                b.classList.add('active', 'border-black', 'bg-gray-200');
                b.classList.remove('border-transparent');
            }
        });

        const panel = document.getElementById('main-panel');
        if (tabName === 'tab-garapan') {
            panel.innerHTML = ML_COMPONENTS.renderTabGarapan(ML_LOGIC.staticData, ML_LOGIC.role);
            ML_LOGIC.loadFansubDropdown();
        } else if (tabName === 'tab-fansub') {
            panel.innerHTML = ML_COMPONENTS.renderTabFansub(ML_LOGIC.role);
            ML_LOGIC.loadFansubList();
        } else if (tabName === 'tab-acara') {
            panel.innerHTML = ML_COMPONENTS.renderTabAcara(ML_LOGIC.staticData, ML_LOGIC.role);
        } else if (tabName === 'tab-episode') {
            panel.innerHTML = ML_COMPONENTS.renderTabEpisode(ML_LOGIC.staticData);
        }
    },

    // --- TAB GARAPAN LOGIC ---
    handleCatChange: async (cat) => {
        const progSelect = document.getElementById('inp-program');
        progSelect.innerHTML = '<option>Loading...</option>';
        progSelect.disabled = true;
        progSelect.classList.remove('bg-gray-100', 'text-gray-400');
        progSelect.classList.add('bg-white', 'text-black');

        if (cat === 'bonus_single') {
            document.getElementById('bonus-single-area').classList.remove('hidden');
            progSelect.innerHTML = '<option value="bonus">-- Bonus Single Mode --</option>';
            return;
        } else {
            document.getElementById('bonus-single-area').classList.add('hidden');
        }

        const snap = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).get();
        progSelect.innerHTML = '<option value="">-- Pilih Acara --</option>';
        
        snap.forEach(doc => {
            const d = doc.data();
            ML_LOGIC.cache.shows[doc.id] = d; 
            progSelect.innerHTML += `<option value="${doc.id}">${d.name}</option>`;
        });
        progSelect.disabled = false;
        
        progSelect.onchange = () => {
            const showId = progSelect.value;
            const showData = ML_LOGIC.cache.shows[showId];
            
            // Group Locking
            if(showData && showData.grup) {
                document.querySelectorAll('input[name="rad-group"]').forEach(r => {
                    r.checked = (r.value === showData.grup);
                    r.disabled = true;
                });
                document.getElementById('chk-multi-group').disabled = true;
            } else {
                document.querySelectorAll('input[name="rad-group"]').forEach(r => r.disabled = false);
                document.getElementById('chk-multi-group').disabled = false;
            }

            // Zero Episode Locking
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
        };
    },

    toggleUrlMode: (isSplit) => {
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
    },

    loadFansubDropdown: async () => {
        const sel = document.getElementById('inp-fansub');
        if(!sel) return;
        const snap = await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').get();
        
        snap.forEach(doc => {
            const d = doc.data();
            ML_LOGIC.cache.fansubs[doc.id] = d;
            const opt = document.createElement('option');
            opt.value = doc.id;
            opt.text = d.name;
            sel.add(opt, 1);
        });
    },

    handleFansubSelect: (val) => {
        const manualInp = document.getElementById('inp-fansub-manual');
        const radiosStatus = document.getElementsByName('rad-status');
        const radiosLang = document.getElementsByName('rad-lang');

        if (val === 'other') {
            manualInp.classList.remove('hidden');
            radiosStatus.forEach(r => r.disabled = false);
            radiosLang.forEach(r => r.disabled = false);
        } else if (val) {
            manualInp.classList.add('hidden');
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
        }
    },

    submitGarapan: async () => {
        const cat = document.getElementById('inp-cat').value;
        const prog = document.getElementById('inp-program').value;
        const eps = document.getElementById('inp-eps').value;
        const subTitle = document.getElementById('inp-subtitle').value;
        const isUnknown = document.getElementById('chk-eps-unknown').checked;
        const fansubId = document.getElementById('inp-fansub').value;
        const isSplitUrl = document.getElementById('chk-split-url').checked;

        if(!cat || !prog || !fansubId) return alert("Mohon lengkapi data utama!");
        
        // Zero check
        if (!isUnknown && (!eps || eps === '0' || eps === '00')) {
             const showData = ML_LOGIC.cache.shows[prog];
             if(showData && showData.forbid_zero) return alert("Acara ini melarang Episode 00/Unknown. Mohon isi nomor episode.");
        }

        const epsId = isUnknown ? 'unknown' : String(eps).padStart(2, '0');
        const fsName = fansubId === 'other' ? document.getElementById('inp-fansub-manual').value : ML_LOGIC.cache.fansubs[fansubId].name;

        let linkData = {
            fansub: fsName,
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

        const progRef = firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(prog);
        const epsRef = progRef.collection('episodes').doc(epsId);

        try {
            const doc = await epsRef.get();
            if(doc.exists) {
                const currentLinks = doc.data().links || [];
                const isDup = currentLinks.some(l => l.fansub.toLowerCase() === fsName.toLowerCase());
                if(isDup) return alert("PENYIMPANAN DITOLAK: Fansub ini sudah ada di episode ini.");
                await epsRef.update({ links: firebase.firestore.FieldValue.arrayUnion(linkData) });
            } else {
                await epsRef.set({
                    airing: document.getElementById('inp-date').value,
                    sub_judul: subTitle,
                    links: [linkData]
                });
            }
            alert("Data tersimpan!");
            document.getElementById('form-garapan').reset();
        } catch(e) {
            alert("Error: " + e.message);
        }
    },

    // --- TAB FANSUB LOGIC ---
    editingFansubId: null,

    loadFansubList: async () => {
        const tbody = document.getElementById('fansub-list-body');
        const snap = await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').get();
        
        tbody.innerHTML = '';
        snap.forEach(doc => {
            const d = doc.data();
            const myEmail = ML_LOGIC.user.email;
            let canEdit = false;
            if(ML_LOGIC.role === 'leader') canEdit = true;
            else if(ML_LOGIC.role === 'admin' && d.email === myEmail) canEdit = true;

            const links = [];
            if(d.link_web) links.push(`<a href="${d.link_web}" target="_blank" class="text-blue-600"><i class="fas fa-globe"></i></a>`);
            if(d.url_fb) links.push(`<a href="${d.url_fb}" target="_blank" class="text-blue-800"><i class="fab fa-facebook"></i></a>`);
            if(d.url_twitter) links.push(`<a href="${d.url_twitter}" target="_blank" class="text-black"><i class="fab fa-twitter"></i></a>`);
            if(d.url_ig) links.push(`<a href="${d.url_ig}" target="_blank" class="text-pink-600"><i class="fab fa-instagram"></i></a>`);
            if(d.url_trakteer) links.push(`<a href="${d.url_trakteer}" target="_blank" class="text-red-600"><i class="fas fa-heart"></i></a>`);

            tbody.innerHTML += `
                <tr class="hover:bg-gray-50 border-b">
                    <td class="border p-2 font-bold">${d.name}</td>
                    <td class="border p-2 text-center">
                        <span class="px-2 py-1 rounded text-xs text-white ${d.status ? 'bg-green-500':'bg-red-500'}">
                            ${d.status ? 'AKTIF' : 'MATI'}
                        </span>
                    </td>
                    <td class="border p-2 text-left space-x-2 text-lg">
                        ${links.join(' ')}
                    </td>
                    <td class="border p-2 text-center">
                        ${canEdit ? `<button onclick="ML_LOGIC.editFansub('${doc.id}')" class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button>` : '<span class="text-gray-300"><i class="fas fa-lock"></i></span>'}
                    </td>
                </tr>
            `;
        });
    },

    addFansub: async () => {
        const name = document.getElementById('fs-name').value;
        const status = document.querySelector('input[name="fs-status"]:checked').value === 'true';
        const langId = document.getElementById('fs-lang-id').checked;
        const langEn = document.getElementById('fs-lang-en').checked;
        
        if (!name) return alert("Nama Fansub wajib diisi!");

        const payload = {
            name: name,
            status: status,
            lang_id: langId,
            lang_en: langEn,
            logo: document.getElementById('fs-logo').value,
            link_web: document.getElementById('fs-web').value,
            url_fb: document.getElementById('fs-fb').value,
            url_trakteer: document.getElementById('fs-trakteer').value,
            url_kofi: document.getElementById('fs-kofi').value,
            url_ig: document.getElementById('fs-ig').value,
            url_twitter: document.getElementById('fs-twitter').value,
            email: ML_LOGIC.user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            const id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
            await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').doc(id).set(payload);
            alert("Fansub berhasil ditambahkan!");
            document.getElementById('form-fansub').reset();
            ML_LOGIC.loadFansubList();
        } catch (e) {
            alert("Error: " + e.message);
        }
    },

    editFansub: async (id) => {
        ML_LOGIC.editingFansubId = id;
        const doc = await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').doc(id).get();
        if (!doc.exists) return;
        const d = doc.data();

        document.getElementById('fs-name').value = d.name;
        document.querySelector(`input[name="fs-status"][value="${d.status}"]`).checked = true;
        document.getElementById('fs-lang-id').checked = d.lang_id || false;
        document.getElementById('fs-lang-en').checked = d.lang_en || false;
        document.getElementById('fs-logo').value = d.logo || '';
        document.getElementById('fs-email').value = d.email || '';
        document.getElementById('fs-web').value = d.link_web || '';
        document.getElementById('fs-fb').value = d.url_fb || '';
        document.getElementById('fs-trakteer').value = d.url_trakteer || '';
        document.getElementById('fs-kofi').value = d.url_kofi || '';
        document.getElementById('fs-ig').value = d.url_ig || '';
        document.getElementById('fs-twitter').value = d.url_twitter || '';

        document.getElementById('form-fansub').scrollIntoView({ behavior: 'smooth' });
    },

    saveFansub: async () => {
        if (!ML_LOGIC.editingFansubId) return alert("Mode Tambah Baru. Gunakan tombol Tambah.");
        const id = ML_LOGIC.editingFansubId;
        
        const payload = {
            status: document.querySelector('input[name="fs-status"]:checked').value === 'true',
            lang_id: document.getElementById('fs-lang-id').checked,
            lang_en: document.getElementById('fs-lang-en').checked,
            link_web: document.getElementById('fs-web').value,
            url_fb: document.getElementById('fs-fb').value,
            url_trakteer: document.getElementById('fs-trakteer').value,
            url_kofi: document.getElementById('fs-kofi').value,
            url_ig: document.getElementById('fs-ig').value,
            url_twitter: document.getElementById('fs-twitter').value,
        };

        if(ML_LOGIC.role === 'leader') {
            payload.logo = document.getElementById('fs-logo').value;
        }

        try {
            await firebase.firestore().collection('masterlist_data').doc('fansub_parent').collection('list_fansubs').doc(id).update(payload);
            alert("Perubahan disimpan!");
            document.getElementById('form-fansub').reset();
            ML_LOGIC.editingFansubId = null;
            ML_LOGIC.loadFansubList();
        } catch (e) {
            alert("Error: " + e.message);
        }
    },

    // --- TAB ACARA LOGIC ---
    addNewShow: async () => {
        const cat = document.getElementById('new-show-cat').value;
        const name = document.getElementById('new-show-name').value;
        const group = document.getElementById('new-show-group').value;
        const icon = document.getElementById('new-show-icon').value;
        const desc = document.getElementById('new-show-desc').value;
        const noZero = document.getElementById('new-show-no-zero').checked;

        if (!name) return alert("Nama Acara wajib diisi!");

        try {
            await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).add({
                name: name,
                grup: group,
                icon: icon,
                desc: desc,
                forbid_zero: noZero,
                add_by: ML_LOGIC.user.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert("Acara berhasil dibuat!");
            document.getElementById('form-show').reset();
        } catch (e) {
            alert("Error: " + e.message);
        }
    },

    // --- TAB EPISODE LIST LOGIC ---
    loadShowsForFilter: async (cat) => {
        const sel = document.getElementById('filter-show');
        sel.innerHTML = '<option>Loading...</option>';
        const snap = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).get();
        sel.innerHTML = '<option value="">-- Pilih Acara --</option>';
        sel.disabled = false;
        snap.forEach(doc => {
            sel.innerHTML += `<option value="${cat}|${doc.id}">${doc.data().name}</option>`;
        });
    },

    loadEpisodesList: async (val) => {
        if(!val) return;
        const [cat, showId] = val.split('|');
        const box = document.getElementById('quick-add-episode-box');
        
        // Show Quick Add for Admin/Leader
        if(ML_LOGIC.role !== 'volunteer') {
            box.classList.remove('hidden');
        }

        const tbody = document.getElementById('episode-list-body');
        tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center">Loading...</td></tr>';

        const snap = await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(showId).collection('episodes').get();
        
        tbody.innerHTML = '';
        if(snap.empty) {
            tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center">Belum ada episode.</td></tr>';
            return;
        }

        snap.forEach(doc => {
            const d = doc.data();
            const linksHtml = d.links ? d.links.map(l => 
                `<span class="inline-block bg-gray-100 border rounded px-1 text-xs mr-1 mb-1" title="Added by ${l.added_by}">${l.fansub}</span>`
            ).join('') : '';

            const delBtn = ML_LOGIC.role === 'leader' ? 
                `<button class="text-red-500 hover:text-red-700" onclick="alert('Fitur Delete Full Row belum diimplementasikan.')"><i class="fas fa-trash"></i></button>` : '';

            tbody.innerHTML += `
                <tr>
                    <td class="border p-2 text-center font-bold">${doc.id}</td>
                    <td class="border p-2 text-sm">${d.sub_judul || '-'}</td>
                    <td class="border p-2 text-center text-xs">${d.airing || '-'}</td>
                    <td class="border p-2">${linksHtml}</td>
                    <td class="border p-2 text-center">${delBtn}</td>
                </tr>
            `;
        });
    },

    addQuickEpisode: async () => {
        const val = document.getElementById('filter-show').value;
        if(!val) return;
        
        const [cat, showId] = val.split('|');
        const eps = document.getElementById('quick-eps').value;
        const sub = document.getElementById('quick-sub').value;
        const date = document.getElementById('quick-date').value;
        const unknownDate = document.getElementById('quick-unknown-date').checked;

        if(!eps) return alert("Nomor Episode wajib diisi!");
        
        const epsId = String(eps).padStart(2, '0');
        const airing = unknownDate ? 'unknown' : date;

        try {
            await firebase.firestore().collection('masterlist_data').doc('show_parent').collection(cat).doc(showId).collection('episodes').doc(epsId).set({
                airing: airing,
                sub_judul: sub,
                links: []
            }, { merge: true }); // Merge agar tidak menimpa jika sudah ada
            
            alert("Episode ditambahkan!");
            document.getElementById('quick-eps').value = '';
            document.getElementById('quick-sub').value = '';
            ML_LOGIC.loadEpisodesList(val);
        } catch(e) {
            alert("Error: " + e.message);
        }
    }
};

document.addEventListener('DOMContentLoaded', ML_LOGIC.init);