const ML_UI = {
    initTabs: () => {
        UI_REFS.tabs.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                UI_REFS.tabs.btns.forEach(b => b.classList.remove('active'));
                UI_REFS.tabs.contents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
            });
        });
    },

    handleCategoryChange: (category) => {
        ML_STATE.data.activeCategory = category;
        const { programDropdown, groupDropdown, singleDropdown, groupContainer, singleContainer } = UI_REFS.forms;

        programDropdown.innerHTML = '<option value="">– Pilih Acara –</option>';
        programDropdown.disabled = true;
        programDropdown.classList.add('disabled-input');
        
        groupDropdown.value = "";
        singleDropdown.innerHTML = '<option value="">– Pilih Single –</option>';
        singleDropdown.disabled = true;
        
        groupContainer.classList.add('hidden');
        singleContainer.classList.add('hidden');

        UI_REFS.radios.category.forEach(r => {
            r.checked = (r.value === category);
        });

        if (!category) return;

        if (category === 'bonus_single') {
            programDropdown.innerHTML = '<option value="">(Lihat Dropdown Single)</option>';
            groupContainer.classList.remove('hidden');
            singleContainer.classList.remove('hidden');
        } else {
            ML_FIREBASE.fetchShowsByCategory(category).then(shows => {
                if (shows.length > 0) {
                    programDropdown.disabled = false;
                    programDropdown.classList.remove('disabled-input');
                    shows.forEach(show => {
                        const opt = document.createElement('option');
                        opt.value = show.id;
                        opt.textContent = show.name;
                        programDropdown.appendChild(opt);
                    });
                } else {
                    programDropdown.innerHTML = '<option value="">– Tidak ada data –</option>';
                }
            });
        }
    },

    handleFansubChange: (fansubId) => {
        const { otherFansubInput } = UI_REFS.forms;
        const { status, lang } = UI_REFS.radios;
        
        otherFansubInput.disabled = true;
        otherFansubInput.value = '';
        otherFansubInput.classList.remove('active-input');
        otherFansubInput.classList.add('grey-placeholder-box');

        status.forEach(r => { r.disabled = false; r.checked = false; });
        lang.forEach(r => { r.disabled = false; r.checked = false; });

        if (fansubId === 'other') {
            otherFansubInput.disabled = false;
            otherFansubInput.classList.remove('grey-placeholder-box');
            otherFansubInput.classList.add('active-input');
            otherFansubInput.focus();
        } else if (ML_STATE.data.fansubs[fansubId]) {
            const data = ML_STATE.data.fansubs[fansubId];
            
            const statusVal = data.status ? 'active' : 'inactive';
            document.querySelector(`input[name="status_fansub"][value="${statusVal}"]`).checked = true;
            status.forEach(r => r.disabled = true);

            if(data.language) {
                document.querySelector(`input[name="bahasa"][value="${data.language}"]`).checked = true;
                lang.forEach(r => r.disabled = true);
            }
        }
    },

    toggleInputsByRole: (role) => {
        console.log("Adjusting UI for Role:", role);
    },

    setLoading: (isLoading, btn) => {
        if(isLoading) {
            btn.dataset.originalText = btn.innerText;
            btn.innerText = "MENYIMPAN...";
            btn.classList.remove('bg-gray-700');
            btn.classList.add('bg-green-600');
            btn.disabled = true;
        } else {
            setTimeout(() => {
                btn.innerText = btn.dataset.originalText;
                btn.classList.add('bg-gray-700');
                btn.classList.remove('bg-green-600');
                btn.disabled = false;
            }, 1000);
        }
    }
};