// Function: Member Handling
ML_LOGIC.handleMemberGroupChange = (group, containerId) => {
    const container = document.getElementById(containerId);
    
    // Restore Checked state if re-render (optional but good for UX)
    const currentChecked = Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.value);
    
    container.innerHTML = '';
    
    if (!group || !ML_LOGIC.memberData[group]) {
        container.innerHTML = '<p class="text-xs text-gray-500 italic">Pilih grup untuk memuat member.</p>';
        return;
    }

    let useRomaji = false;
    if (containerId === 'quick-member-list') {
        const romajiRadio = document.getElementById('quick-mem-romaji');
        if (romajiRadio && romajiRadio.checked) useRomaji = true;
    } else if (containerId === 'grp-member-list') { // Context Garapan
        const romajiRadio = document.getElementById('garapan-mem-romaji');
        if (romajiRadio && romajiRadio.checked) useRomaji = true;
    } else if (containerId === 'acara-member-list') { // Context Acara
        const romajiRadio = document.getElementById('acara-mem-romaji');
        if (romajiRadio && romajiRadio.checked) useRomaji = true;
    }

    const members = ML_LOGIC.memberData[group];
    const gens = {};
    members.forEach(m => {
        if (!gens[m.gen]) gens[m.gen] = [];
        gens[m.gen].push(m);
    });

    for (const [gen, mems] of Object.entries(gens)) {
        const genDiv = document.createElement('div');
        genDiv.className = 'mb-3';
        genDiv.innerHTML = `<h5 class="text-xs font-bold bg-gray-200 p-1 mb-2">${gen}</h5>`;
        
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-2 md:grid-cols-3 gap-2';
        
        mems.forEach(m => {
            const displayName = useRomaji ? m.nama_romaji : m.nama_jp;
            const saveValue = m.nama_jp;
            const isChecked = currentChecked.includes(saveValue) ? 'checked' : '';

            const label = document.createElement('label');
            label.className = 'flex items-center text-sm cursor-pointer hover:bg-gray-100 p-1 rounded border border-transparent hover:border-gray-300';
            
            // Onchange for Garapan to update result box
            const changeAttr = (containerId === 'grp-member-list') ? 'onchange="ML_LOGIC.updateSelectedMembersDisplay()"' : '';

            label.innerHTML = `
                <input type="checkbox" name="chk-member" value="${saveValue}" class="mr-2 member-checkbox" style="width:16px; height:16px;" ${isChecked} ${changeAttr}>
                ${displayName}
            `;
            grid.appendChild(label);
        });
        genDiv.appendChild(grid);
        container.appendChild(genDiv);
    }
};

ML_LOGIC.toggleMemberNameType = () => {
	const groupVal = document.getElementById('quick-member-group').value;
	if(groupVal) {
		ML_LOGIC.handleMemberGroupChange(groupVal, 'quick-member-list');
	}
};
	
ML_LOGIC.toggleMemberMany = (isChecked, context) => {
	const container = document.getElementById(`${context}-member-list`);
	const checkboxes = container.querySelectorAll('input[type="checkbox"]');
	
	if (isChecked) {
		checkboxes.forEach(cb => {
			cb.checked = false;
			cb.disabled = true;
			cb.parentElement.classList.add('opacity-50', 'locked-cursor');
		});
		document.getElementById(`${context}-member-custom`).disabled = true;
		document.getElementById(`${context}-member-custom`).classList.add('bg-gray-100', 'locked-cursor');
	} else {
		const customVal = document.getElementById(`${context}-member-custom`).value;
		if (!customVal) {
			checkboxes.forEach(cb => {
				cb.disabled = false;
				cb.parentElement.classList.remove('opacity-50', 'locked-cursor');
			});
		}
		document.getElementById(`${context}-member-custom`).disabled = false;
		document.getElementById(`${context}-member-custom`).classList.remove('bg-gray-100', 'locked-cursor');
	}
};

ML_LOGIC.handleCustomMemberInput = (val, context) => {
	const container = document.getElementById(`${context}-member-list`);
	const checkboxes = container.querySelectorAll('input[type="checkbox"]');
	const manyCheck = document.getElementById(`${context}-member-many`);

	if (val.trim() !== "") {
		manyCheck.checked = false;
		manyCheck.disabled = true;
		manyCheck.parentElement.classList.add('opacity-50', 'locked-cursor');
		
		checkboxes.forEach(cb => {
			cb.checked = false;
			cb.disabled = true;
			cb.parentElement.classList.add('opacity-50', 'locked-cursor');
		});
	} else {
		manyCheck.disabled = false;
		manyCheck.parentElement.classList.remove('opacity-50', 'locked-cursor');
		
		if (!manyCheck.checked) {
			checkboxes.forEach(cb => {
				cb.disabled = false;
				cb.parentElement.classList.remove('opacity-50', 'locked-cursor');
			});
		}
	}
};