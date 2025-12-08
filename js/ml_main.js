document.addEventListener('DOMContentLoaded', () => {
    ML_UI.initTabs();

    const { 
        dbForm, 
        catDropdown, 
        programDropdown, 
        groupDropdown, 
        singleDropdown,
        fansubSelect, 
        otherFansubInput, 
        episodeInput, 
        unknownEpCheck,
        dateInputs 
    } = UI_REFS.forms;

    const { 
        group: groupInputs, 
        status: statusRadios, 
        lang: langRadios 
    } = UI_REFS.radios;

    const googleLoginBtn = document.getElementById('google-login-btn');
    const btnRegister = document.getElementById('btn-register');
    const loginBox = document.getElementById('login-box');
    const regBox = document.getElementById('registration-box');
    const mainTabs = document.getElementById('main-tabs');
    const mainContent = document.getElementById('main-content');
    const usernameDisplay = document.getElementById('welcome-username');

    if(googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            ML_STATE.refs.auth.signInWithPopup(provider).catch(err => alert(err.message));
        });
    }

    if(btnRegister) {
        btnRegister.addEventListener('click', async () => {
            btnRegister.innerText = "MEMPROSES...";
            btnRegister.disabled = true;
            
            const success = await ML_FIREBASE.registerUser();
            if(success) {
                alert("Pendaftaran berhasil! Silakan tunggu konfirmasi Admin atau refresh halaman.");
                location.reload();
            } else {
                btnRegister.innerText = "DAFTAR SEKARANG";
                btnRegister.disabled = false;
            }
        });
    }

    ML_STATE.refs.auth.onAuthStateChanged(async user => {
        if (user) {
            ML_STATE.user.uid = user.uid;
            ML_STATE.user.email = user.email;
            ML_STATE.user.displayName = user.displayName;

            loginBox.classList.add('hidden');
            usernameDisplay.textContent = user.displayName;

            const inputUserDisplay = document.querySelector('input[value=""][disabled].std-input');
            if(inputUserDisplay) inputUserDisplay.value = user.displayName;

            const roleData = await ML_FIREBASE.checkUserRole(user.email);
            
            if (roleData) {
                regBox.classList.add('hidden');
                mainTabs.classList.remove('hidden');
                mainContent.classList.remove('hidden');

                ML_STATE.user.role = roleData.status;
                ML_UI.toggleInputsByRole(roleData.status);
                ML_FIREBASE.fetchFansubs();
                
                const roleDisplay = document.querySelector('#role-display-area'); 
                if(roleDisplay) {
                    roleDisplay.innerText = roleData.status.toUpperCase();
                }
            } else {
                regBox.classList.remove('hidden');
                mainTabs.classList.add('hidden');
                mainContent.classList.add('hidden');
            }
        } else {
            loginBox.classList.remove('hidden');
            regBox.classList.add('hidden');
            mainTabs.classList.add('hidden');
            mainContent.classList.add('hidden');
            usernameDisplay.textContent = "";
        }
    });

    catDropdown.addEventListener('change', (e) => {
        ML_UI.handleCategoryChange(e.target.value);
    });

    groupDropdown.addEventListener('change', async (e) => {
        const group = e.target.value;
        singleDropdown.innerHTML = '<option value="">– Pilih Single –</option>';
        
        if (group) {
            const singles = await ML_FIREBASE.fetchShowsByCategory('bonus_single'); 
            const filtered = singles.filter(s => s.grup === group);
            
            if (filtered.length > 0) {
                filtered.forEach(song => {
                    const option = document.createElement('option');
                    option.value = song.id;
                    option.textContent = song.name;
                    singleDropdown.appendChild(option);
                });
                singleDropdown.disabled = false;
                singleDropdown.classList.remove('disabled-input');
            } else {
                singleDropdown.disabled = true;
                singleDropdown.classList.add('disabled-input');
            }
        }
    });

    fansubSelect.addEventListener('change', (e) => {
        ML_UI.handleFansubChange(e.target.value);
    });

    const multiGroupCheck = document.getElementById('multiGroupCheck');
    if (multiGroupCheck) {
        multiGroupCheck.addEventListener('change', (e) => {
            const isMulti = e.target.checked;
            groupInputs.forEach(input => {
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

    if (unknownEpCheck) {
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

    if (dateInputs.unknown) {
        dateInputs.unknown.addEventListener('change', (e) => {
            const isUnknown = e.target.checked;
            [dateInputs.year, dateInputs.month, dateInputs.date].forEach(select => {
                if (select) {
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

    dbForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (multiGroupCheck && multiGroupCheck.checked) {
            const checkedGroups = document.querySelectorAll('input[name="grup"]:checked');
            if (checkedGroups.length === 0) {
                const grupError = document.getElementById('grupError');
                if (grupError) grupError.classList.remove('hidden');
                document.getElementById('grupContainer').scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            } else {
                const grupError = document.getElementById('grupError');
                if (grupError) grupError.classList.add('hidden');
            }
        }

        const btn = dbForm.querySelector('button[type="submit"]');
        ML_UI.setLoading(true, btn);

        let airingDateValue = "unknown";
        if (!dateInputs.unknown.checked) {
            const y = dateInputs.year.value;
            const m = dateInputs.month.value;
            const d = dateInputs.date.value;
            airingDateValue = `${y.slice(2)}${m}${d}`;
        }

        let selectedGroups = [];
        const groupNodes = document.querySelectorAll('input[name="grup"]:checked');
        groupNodes.forEach(node => selectedGroups.push(node.value));

        let finalProgramId = programDropdown.value;
        if (catDropdown.value === 'bonus_single') {
            finalProgramId = singleDropdown.value;
        }

        let finalStatus = 'inactive';
        const checkedStatus = document.querySelector('input[name="status_fansub"]:checked');
        if(checkedStatus) finalStatus = checkedStatus.value;

        let finalLang = 'id';
        const checkedLang = document.querySelector('input[name="bahasa"]:checked');
        if(checkedLang) finalLang = checkedLang.value;

        const formData = {
            category: catDropdown.value,
            programId: finalProgramId,
            episodeNum: unknownEpCheck.checked ? 'unknown' : episodeInput.value,
            airingDate: airingDateValue,
            fansubName: fansubSelect.value === 'other' ? otherFansubInput.value : fansubSelect.options[fansubSelect.selectedIndex].text,
            fansubStatus: finalStatus,
            lang: finalLang,
            urlType: document.querySelector('select:has(option[value="fansub_page"])').value, 
            url: document.querySelector('input[type="url"]').value,
            thumbnail: document.querySelectorAll('input[type="url"]')[1].value,
            groups: selectedGroups
        };

        const success = await ML_FIREBASE.submitEpisode(formData);
        
        if (success) {
            alert("Data berhasil disimpan ke Firebase!");
            dbForm.reset();
            ML_UI.handleCategoryChange(""); 
            ML_UI.handleFansubChange("");
        }
        
        ML_UI.setLoading(false, btn);
    });
});