document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. TAB NAVIGATION LOGIC
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });


    // ==========================================
    // 2. DATA LOADING (Programs & Fansubs)
    // ==========================================
    
    // --- Program Data (Fallback & Fetch) ---
    const programFallback = {
        "categories": {
            "variety_tv": ["Nogizaka Under Construction", "Soko Magattara, Sakurazaka?", "Hinatazaka de Aimashou"],
            "bonus_single": [],
            "concert": ["Birthday Live"]
        },
        "bonus_single": {}
    };
    let programData = programFallback;

    // --- Fansub Data (Fallback & Fetch) ---
    const fansubFallback = {
        "moefang": { "status": "active", "language": "id" }
    };
    let fansubData = fansubFallback;

    // Fetch Program List
    fetch('../store/data/masterlist/programlist.json')
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .then(data => { programData = data; console.log("Program Data Loaded"); })
        .catch(err => console.warn("Using fallback Program data:", err));

    // Fetch Fansub List
    fetch('../store/data/masterlist/fansublist.json')
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .then(data => { 
            fansubData = data; 
            console.log("Fansub Data Loaded"); 
            populateFansubDropdown(); // Isi dropdown setelah data load
        })
        .catch(err => console.warn("Using fallback Fansub data:", err));


    // ==========================================
    // 3. DROPDOWN & CATEGORY LOGIC
    // ==========================================
    const catDropdown = document.getElementById('catDropdown');
    const programDropdown = document.getElementById('programDropdown');
    const groupDropdownContainer = document.getElementById('groupDropdownContainer');
    const singleDropdownContainer = document.getElementById('singleDropdownContainer');
    const groupDropdown = document.getElementById('groupDropdown');
    const singleDropdown = document.getElementById('singleDropdown');
    const categoryRadios = document.querySelectorAll('input[name="kategori"]');

    // Listener Kategori Dropdown
    catDropdown.addEventListener('change', (e) => {
        const val = e.target.value;
        handleCategoryChange(val);
        
        // Sync ke Radio Button (yang di-lock)
        if (val) {
            const radio = document.querySelector(`input[name="kategori"][value="${val}"]`);
            if (radio) radio.checked = true;
        } else {
            // Reset radio jika unselect
            categoryRadios.forEach(r => r.checked = false);
        }
    });

    function handleCategoryChange(category) {
        // Reset States
        programDropdown.innerHTML = '<option value="">– Pilih Acara –</option>';
        programDropdown.disabled = true;
        programDropdown.classList.add('disabled-input');
        
        groupDropdown.value = "";
        singleDropdown.innerHTML = '<option value="">– Pilih Grup Terlebih Dahulu –</option>';
        singleDropdown.disabled = true;
        singleDropdown.classList.add('disabled-input');

        groupDropdownContainer.classList.add('hidden');
        singleDropdownContainer.classList.add('hidden');

        if (!category) return;

        if (category === 'bonus_single') {
            // Logic Bonus Single
            programDropdown.innerHTML = '<option value="">(Dinonaktifkan untuk Bonus Single)</option>';
            programDropdown.disabled = true;
            groupDropdownContainer.classList.remove('hidden');
            singleDropdownContainer.classList.remove('hidden');
        } else {
            // Logic Kategori Lain
            const programs = programData.categories[category] || [];
            if (programs.length > 0) {
                programs.forEach(prog => {
                    const option = document.createElement('option');
                    option.value = prog;
                    option.textContent = prog;
                    programDropdown.appendChild(option);
                });
                programDropdown.disabled = false;
                programDropdown.classList.remove('disabled-input');
            } else {
                programDropdown.innerHTML = '<option value="">– Tidak ada data acara –</option>';
            }
        }
    }

    // Listener Bonus Single Group
    groupDropdown.addEventListener('change', (e) => {
        const group = e.target.value;
        singleDropdown.innerHTML = '<option value="">– Pilih Single –</option>';
        
        if (group && programData.bonus_single && programData.bonus_single[group]) {
            const singles = programData.bonus_single[group];
            singles.forEach(song => {
                const option = document.createElement('option');
                option.value = song;
                option.textContent = song;
                singleDropdown.appendChild(option);
            });
            singleDropdown.disabled = false;
            singleDropdown.classList.remove('disabled-input');
        } else {
            singleDropdown.disabled = true;
            singleDropdown.classList.add('disabled-input');
        }
    });


    // ==========================================
    // 4. FANSUB & AUTO-LOCK LOGIC
    // ==========================================
    const fansubSelect = document.getElementById('fansubSelect');
    const otherFansubInput = document.getElementById('otherFansubInput');
    const statusRadios = document.querySelectorAll('input[name="status_fansub"]');
    const langRadios = document.querySelectorAll('input[name="bahasa"]');

    function populateFansubDropdown() {
        // Hapus opsi lama kecuali default dan 'other'
        // (Di sini kita asumsikan HTML static awal cuma punya 'other' dan 'moefang' sbg contoh)
        // Idealnya kita clear dan rebuild, tapi kita append saja yang dari JSON
        
        // Bersihkan opsi selain default & other untuk mencegah duplikasi jika dipanggil ulang
        // Sederhananya, kita biarkan static HTML 'MoeFang' & 'Other' ada, 
        // lalu tambahkan yang belum ada dari JSON.
        
        Object.keys(fansubData).forEach(key => {
            // Cek apakah option sudah ada
            if (!fansubSelect.querySelector(`option[value="${key}"]`)) {
                // Insert sebelum opsi 'other'
                const otherOpt = fansubSelect.querySelector('option[value="other"]');
                const newOpt = document.createElement('option');
                newOpt.value = key;
                newOpt.textContent = fansubData[key].name;
                fansubSelect.insertBefore(newOpt, otherOpt);
            }
        });
    }

    fansubSelect.addEventListener('change', (e) => {
        const val = e.target.value;

        // Reset Logic
        otherFansubInput.disabled = true;
        otherFansubInput.value = '';
        otherFansubInput.classList.add('grey-placeholder-box');
        otherFansubInput.classList.remove('active-input');
        otherFansubInput.required = false;

        // Reset Radio Locks
        statusRadios.forEach(r => { r.disabled = false; r.checked = false; });
        langRadios.forEach(r => { r.disabled = false; r.checked = false; });

        if (val === 'other') {
            // Mode Manual
            otherFansubInput.disabled = false;
            otherFansubInput.classList.remove('grey-placeholder-box');
            otherFansubInput.classList.add('active-input');
            otherFansubInput.focus();
            otherFansubInput.required = true;
            
            // Radio tetap enable (user pilih sendiri)
        } else if (val && fansubData[val]) {
            // Mode Auto (Data dari JSON)
            const data = fansubData[val];
            
            // Set Status
            const targetStatus = data.status === 'active' ? 'active' : 'inactive';
            // Mapping value radio di HTML: 'active' -> Fansub aktif, 'inactive' -> Fansub tidak aktif
            // Kita perlu pastikan value di HTML sesuai. (Di HTML: value="active" / value="inactive")
            
            // Cari radio yang sesuai dan check
            document.querySelector(`input[name="status_fansub"][value="${targetStatus}"]`).checked = true;
            
            // Lock Status
            statusRadios.forEach(r => r.disabled = true);

            // Set Bahasa
            const targetLang = data.language; // 'id' or 'en'
            document.querySelector(`input[name="bahasa"][value="${targetLang}"]`).checked = true;

            // Lock Bahasa
            langRadios.forEach(r => r.disabled = true);
        }
    });


    // ==========================================
    // 5. OTHER UTILITIES (Date, Checkbox, Form)
    // ==========================================
    
    // Group Logic (Checkbox/Radio Swap)
    const multiGroupCheck = document.getElementById('multiGroupCheck');
    const grupInputs = document.querySelectorAll('input[name="grup"]');
    
    if(multiGroupCheck){
        multiGroupCheck.addEventListener('change', (e) => {
            const isMulti = e.target.checked;
            grupInputs.forEach(input => {
                input.checked = false; 
                if (isMulti) {
                    input.type = 'checkbox';
                    input.required = false; 
                } else {
                    input.type = 'radio';
                    input.required = true; 
                }
            });
        });
    }

    // Episode Logic
    const unknownEpCheck = document.getElementById('unknownEpCheck');
    const episodeInput = document.getElementById('episodeInput');
    
    if(unknownEpCheck){
        unknownEpCheck.addEventListener('change', (e) => {
            const isUnknown = e.target.checked;
            episodeInput.disabled = isUnknown;
            if (isUnknown) {
                episodeInput.value = ''; 
                episodeInput.classList.add('disabled-input');
                episodeInput.required = false; 
            } else {
                episodeInput.classList.remove('disabled-input');
                episodeInput.required = true; 
            }
        });
    }

    // Date Logic
    const unknownDateCheck = document.getElementById('unknownDateCheck');
    const dateSelects = [
        document.getElementById('airingYear'), 
        document.getElementById('airingMonth'), 
        document.getElementById('airingDate')
    ];
    
    if(unknownDateCheck){
        unknownDateCheck.addEventListener('change', (e) => {
            const isUnknown = e.target.checked;
            dateSelects.forEach(select => {
                if(select) {
                    select.disabled = isUnknown;
                    if (isUnknown) {
                        select.value = "";
                        select.required = false;
                        select.classList.add('disabled-input');
                    } else {
                        select.required = true;
                        select.classList.remove('disabled-input');
                    }
                }
            });
        });
    }

    // Form Submit
    const form = document.getElementById('dbForm');
    const grupError = document.getElementById('grupError');
    const grupContainer = document.getElementById('grupContainer');

    if(form){
        form.addEventListener('submit', function(e) {
            // Validasi manual jika grup checkbox
            if (multiGroupCheck && multiGroupCheck.checked) {
                const checkedGroups = document.querySelectorAll('input[name="grup"]:checked');
                if (checkedGroups.length === 0) {
                    e.preventDefault();
                    if(grupError) grupError.classList.remove('hidden');
                    if(grupContainer) grupContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return; 
                } else {
                    if(grupError) grupError.classList.add('hidden');
                }
            }
    
            e.preventDefault(); 
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = "MENYIMPAN...";
            btn.classList.remove('bg-gray-700');
            btn.classList.add('bg-green-600');
            
            setTimeout(() => {
                alert("Data berhasil divalidasi dan disimpan!");
                btn.innerText = originalText;
                btn.classList.add('bg-gray-700');
                btn.classList.remove('bg-green-600');
            }, 1000);
        });
    }

});