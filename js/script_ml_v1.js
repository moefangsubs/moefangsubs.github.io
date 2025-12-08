document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });
    const programFallback = {
        "categories": {
            "variety_tv": ["Nogizaka Under Construction", "Soko Magattara, Sakurazaka?", "Hinatazaka de Aimashou"],
            "bonus_single": [],
            "concert": ["Birthday Live"]
        },
        "bonus_single": {}
    };
    let programData = programFallback;
    const fansubFallback = {
        "moefang": { "status": "active", "language": "id" }
    };
    let fansubData = fansubFallback;
    fetch('../store/data/masterlist/programlist.json')
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .then(data => { programData = data; console.log("Program Data Loaded"); })
        .catch(err => console.warn("Using fallback Program data:", err));
    fetch('../store/data/masterlist/fansublist.json')
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .then(data => { 
            fansubData = data; 
            console.log("Fansub Data Loaded"); 
            populateFansubDropdown();  
        })
        .catch(err => console.warn("Using fallback Fansub data:", err));
    const catDropdown = document.getElementById('catDropdown');
    const programDropdown = document.getElementById('programDropdown');
    const groupDropdownContainer = document.getElementById('groupDropdownContainer');
    const singleDropdownContainer = document.getElementById('singleDropdownContainer');
    const groupDropdown = document.getElementById('groupDropdown');
    const singleDropdown = document.getElementById('singleDropdown');
    const categoryRadios = document.querySelectorAll('input[name="kategori"]');
    catDropdown.addEventListener('change', (e) => {
        const val = e.target.value;
        handleCategoryChange(val);
        if (val) {
            const radio = document.querySelector(`input[name="kategori"][value="${val}"]`);
            if (radio) radio.checked = true;
        } else {
            categoryRadios.forEach(r => r.checked = false);
        }
    });
    function handleCategoryChange(category) {
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
            programDropdown.innerHTML = '<option value="">(Dinonaktifkan untuk Bonus Single)</option>';
            programDropdown.disabled = true;
            groupDropdownContainer.classList.remove('hidden');
            singleDropdownContainer.classList.remove('hidden');
        } else {
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
    const fansubSelect = document.getElementById('fansubSelect');
    const otherFansubInput = document.getElementById('otherFansubInput');
    const statusRadios = document.querySelectorAll('input[name="status_fansub"]');
    const langRadios = document.querySelectorAll('input[name="bahasa"]');
    function populateFansubDropdown() {
        Object.keys(fansubData).forEach(key => {
            if (!fansubSelect.querySelector(`option[value="${key}"]`)) {
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
        otherFansubInput.disabled = true;
        otherFansubInput.value = '';
        otherFansubInput.classList.add('grey-placeholder-box');
        otherFansubInput.classList.remove('active-input');
        otherFansubInput.required = false;
        statusRadios.forEach(r => { r.disabled = false; r.checked = false; });
        langRadios.forEach(r => { r.disabled = false; r.checked = false; });
        if (val === 'other') {
            otherFansubInput.disabled = false;
            otherFansubInput.classList.remove('grey-placeholder-box');
            otherFansubInput.classList.add('active-input');
            otherFansubInput.focus();
            otherFansubInput.required = true;
        } else if (val && fansubData[val]) {
            const data = fansubData[val];
            const targetStatus = data.status === 'active' ? 'active' : 'inactive';
            document.querySelector(`input[name="status_fansub"][value="${targetStatus}"]`).checked = true;
            statusRadios.forEach(r => r.disabled = true);
            const targetLang = data.language;  
            document.querySelector(`input[name="bahasa"][value="${targetLang}"]`).checked = true;
            langRadios.forEach(r => r.disabled = true);
        }
    });
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
    const form = document.getElementById('dbForm');
    const grupError = document.getElementById('grupError');
    const grupContainer = document.getElementById('grupContainer');
    if(form){
        form.addEventListener('submit', function(e) {
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