const ML_COMPONENTS = {
	renderLogin: () => `
		<div class="auth-container">
			<h1 class="font-bold" style="font-size: 1.5rem; margin-bottom: 0.5rem;">AKSES DIBATASI</h1>
			<p class="info-text" style="font-size: 1rem; margin-bottom: 1.5rem;">Silakan login untuk mengakses Admin Masterlist.</p>
			<button id="btn-login-google" class="btn btn-primary btn-full">
				<i class="fab fa-google"></i> MASUK DENGAN GOOGLE
			</button>
		</div>
	`,

	renderRegister: (email, name) => `
		<div class="auth-register-container">
			<h1 class="font-bold" style="font-size: 1.5rem; color: #854d0e; margin-bottom: 0.5rem;">PENDAFTARAN RELAWAN</h1>
			<div style="background: white; padding: 1rem; border-radius: 4px; border: 1px solid #e5e7eb; margin-bottom: 1rem; text-align: left;">
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Nama:</strong> ${name}</p>
			</div>
			<p style="margin-bottom: 1.5rem;">Akun belum terdaftar. Sistem sedang menerima relawan baru.</p>
			<button id="btn-register-submit" class="btn btn-warning btn-full" style="background-color: #ca8a04; color: white;">
				DAFTAR SEKARANG
			</button>
		</div>
	`,

	renderDashboard: (user, role) => `
		<header class="dashboard-header">
			<h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); letter-spacing: 1px;">EDITOR DATABASE</h1>
			<div class="user-info text-right">
				<div class="label">Masuk sebagai</div>
				<div class="name">${user.displayName} <span class="role-badge">${role}</span></div>
			</div>
		</header>

		<div class="tab-nav">
			<button class="tab-btn" onclick="ML_LOGIC.switchTab('tab-garapan')">GARAPAN</button>
			<button class="tab-btn" onclick="ML_LOGIC.switchTab('tab-fansub')">FANSUB</button>
			<button class="tab-btn" onclick="ML_LOGIC.switchTab('tab-acara')">DAFTAR ACARA</button>
			<button class="tab-btn" onclick="ML_LOGIC.switchTab('tab-episode')">DAFTAR EPISODE</button>
            ${role === 'leader' ? `<button class="tab-btn px-6 py-3 font-semibold text-red-600 hover:text-red-800 hover:bg-red-50 transition rounded-t-lg border-b-2 border-transparent" onclick="ML_LOGIC.switchTab('tab-batch')">BATCH JSON</button>` : ''}
		</div>

		<div id="main-panel">
		</div>
	`,

    renderTabBatch: (staticData) => `
        <div class="space-y-6">
            <div class="bg-white border border-blue-200 p-4 rounded shadow-sm">
                <h3 class="font-bold text-lg text-blue-800 mb-4 border-b pb-2">🛠️ JSON FORMAT GENERATOR</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-xs font-bold mb-1">1. Pilih Kategori</label>
                        <select id="gen-cat" class="std-input" onchange="ML_LOGIC.loadBatchGenShows(this.value)">
                            <option value="">-- Pilih Kategori --</option>
                            ${staticData.categories.map(c => `<option value="${c.val}">${c.label}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold mb-1">2. Pilih Acara (Auto-fill Metadata)</label>
                        <select id="gen-show" class="std-input" disabled onchange="ML_LOGIC.updateJsonPreview()">
                            <option value="">-- Pilih Kategori Dulu --</option>
                        </select>
                    </div>
                </div>

                <div class="mb-4 bg-gray-50 p-3 rounded border">
                    <label class="font-bold text-sm flex items-center cursor-pointer mb-2">
                        <input type="checkbox" id="chk-gen-eps" checked onchange="ML_LOGIC.updateJsonPreview()" class="mr-2"> 
                        Sertakan Array "episodes"?
                    </label>
                    
                    <div id="gen-eps-options" class="ml-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        <label class="flex items-center text-gray-400 cursor-not-allowed">
                            <input type="checkbox" checked disabled class="mr-1"> ID (Wajib)
                        </label>
                        <label class="flex items-center cursor-pointer">
                            <input type="checkbox" id="chk-gen-airing" checked onchange="ML_LOGIC.updateJsonPreview()" class="mr-1"> Airing
                        </label>
                        <label class="flex items-center cursor-pointer">
                            <input type="checkbox" id="chk-gen-sub" checked onchange="ML_LOGIC.updateJsonPreview()" class="mr-1"> Sub Judul
                        </label>
                        <label class="flex items-center cursor-pointer">
                            <input type="checkbox" id="chk-gen-member" onchange="ML_LOGIC.updateJsonPreview()" class="mr-1"> Member
                        </label>
                    </div>

                    <div id="gen-links-container" class="ml-6 mt-2 border-t pt-2">
                        <label class="font-bold text-xs flex items-center cursor-pointer mb-1">
                            <input type="checkbox" id="chk-gen-links" checked onchange="ML_LOGIC.updateJsonPreview()" class="mr-2"> 
                            Sertakan Array "links"?
                        </label>
                        <div id="gen-links-options" class="ml-4 grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                            <label class="flex items-center cursor-pointer"><input type="checkbox" id="chk-gen-link-fansub" checked onchange="ML_LOGIC.updateJsonPreview()" class="mr-1"> Fansub</label>
                            <label class="flex items-center cursor-pointer"><input type="checkbox" id="chk-gen-link-url" checked onchange="ML_LOGIC.updateJsonPreview()" class="mr-1"> URL</label>
                            <label class="flex items-center cursor-pointer"><input type="checkbox" id="chk-gen-link-lang" checked onchange="ML_LOGIC.updateJsonPreview()" class="mr-1"> Bahasa</label>
                            <label class="flex items-center cursor-pointer"><input type="checkbox" id="chk-gen-link-added" checked onchange="ML_LOGIC.updateJsonPreview()" class="mr-1"> Added By</label>
                            <label class="flex items-center cursor-pointer"><input type="checkbox" id="chk-gen-link-time" checked onchange="ML_LOGIC.updateJsonPreview()" class="mr-1"> Timestamp</label>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="flex justify-between items-center mb-1">
                        <label class="text-xs font-bold uppercase text-gray-500">Preview JSON</label>
                        <button onclick="ML_LOGIC.copyJsonToInput()" class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 font-bold">
                            ⬇️ Salin ke Input Box
                        </button>
                    </div>
                    <textarea id="gen-output" readonly class="w-full border p-2 rounded font-mono text-xs h-40 bg-gray-800 text-green-400"></textarea>
                </div>
            </div>

            <hr class="border-gray-300 my-6">

            <div class="bg-yellow-50 border border-yellow-400 p-4 rounded text-sm text-yellow-800">
                <strong>⚠️ PERHATIAN (Mode Leader)</strong><br>
                Fitur ini digunakan untuk memasukkan data secara massal. Pastikan format JSON valid.<br>
                ID yang sama akan menimpa (merge) data yang sudah ada.
            </div>

            <div>
                <label class="block font-bold mb-2">Input JSON Data (Paste Disini)</label>
                <textarea id="batch-json-input" class="w-full border p-2 rounded font-mono text-xs h-64 bg-gray-50" placeholder='{"shows": [...], "fansubs": [...]}'></textarea>
            </div>

            <div class="flex gap-2 justify-end">
                <button onclick="ML_LOGIC.checkBatchJson()" class="bg-blue-600 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition">
                    CEK & REVIEW JSON
                </button>
                <button onclick="ML_LOGIC.processBatchJson()" class="bg-red-600 text-white font-bold py-3 px-8 rounded hover:bg-red-700 transition">
                    PROSES BATCH
                </button>
            </div>

            <div id="batch-review-area" class="hidden space-y-6"></div>

            <div id="batch-log" class="hidden border p-4 bg-black text-green-400 font-mono text-xs rounded h-64 overflow-y-auto"></div>
        </div>
    `,
	
	renderTabGarapan: (staticData, role) => `
		<form id="form-garapan" class="form-layout">
			<div class="form-section">
				<h3 class="section-title">1. PILIH ACARA</h3>
				<p class="info-text">ℹ️ Jika ingin menambahkan acara, silakan hubungi admin MoeFang agar database rapi.</p>
				<div class="panel-box">
					<label class="input-label">Kategori</label>
					<select id="inp-cat" class="std-input" onchange="ML_LOGIC.handleCatChange(this.value)">
						<option value="">-- Pilih Kategori --</option>
						${staticData.categories.map(c => `<option value="${c.val}">${c.label}</option>`).join('')}
					</select>

					<div style="margin-top: 1rem;">
						<label id="lbl-program" class="input-label">Judul Acara</label>
						<select id="inp-program" class="std-input" disabled>
							<option value="">-- Pilih Kategori Dulu --</option>
						</select>
					</div>
					
					<div id="bonus-single-area" class="hidden" style="margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
						<div class="form-group">
							<label class="input-label">Grup Single</label>
							<select id="inp-group-single" class="std-input" onchange="ML_LOGIC.handleGroupSingleChange(this.value)">
								<option value="">-- Pilih Grup --</option>
								${staticData.groups.map(g => `<option value="${g.val}">${g.label}</option>`).join('')}
							</select>
						</div>
						<div class="form-group">
							<label class="input-label">Tipe</label>
							<select id="inp-type-single" class="std-input" disabled onchange="ML_LOGIC.handleBonusTypeChange(this.value)">
								<option value="">-- Pilih Tipe --</option>
								<option value="Single">Single</option>
								<option value="Album">Album</option>
								<option value="Best Album">Best Album</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div class="form-group">
							<label class="input-label">Pilih Single/Album</label>
							<select id="inp-song" class="std-input" disabled>
								<option value="">-- Pilih Single --</option>
							</select>
						</div>
					</div>

					<div style="margin-top: 1rem;">
						<label id="lbl-subtitle" class="input-label">Sub Judul (Opsional)</label>
						<input type="text" id="inp-subtitle" class="std-input" placeholder="Contoh: Isu Island">
						<p id="warn-subtitle" class="warning-text hidden">⚠️ Wajib sesuai judul resmi, silakan cek di web <a href="https://48pedia.org/" target="_blank" class="underline" style="color: var(--moe);">48pedia</a> ini</p>
					</div>
				</div>

				<div class="form-row">
					<div>
						<label class="input-label">Episode</label>
						<div id="container-garapan-eps" style="display: flex; gap: 0.5rem; align-items: center;">
							<input type="number" id="inp-eps" class="std-input" style="width: 80px;" placeholder="00">
							<label class="check-label"><input type="checkbox" id="chk-eps-unknown"> Tidak Tahu</label>
						</div>
						<div id="container-garapan-type" class="hidden">
							<select id="inp-garapan-type" class="std-input">
								<option value="Type A">Type A</option>
								<option value="Type B">Type B</option>
								<option value="Type C">Type C</option>
								<option value="Type D">Type D</option>
								<option value="Type E">Type E</option>
								<option value="Regular">Regular</option>
								<option value="BOKUAO Event">BOKUAO Event</option>
								<option value="BOKUAO Live">BOKUAO Live</option>
							</select>
						</div>
					</div>
					<div>
						<label class="input-label">Tanggal Tayang</label>
						<input type="date" id="inp-date" class="std-input">
					</div>
				</div>

				<div class="panel-box member-panel">
					<div class="member-header">
						<h4 class="font-bold" style="font-size: 0.9rem;">PARTISIPASI MEMBER</h4>
						<div class="radio-stack" style="flex-direction: row; gap: 1rem;">
							<label class="check-label">
								<input type="radio" name="garapan-mem-name" id="garapan-mem-jp" value="jp" checked onchange="ML_LOGIC.handleGarapanMemberNameType()"> JP
							</label>
							<label class="check-label">
								<input type="radio" name="garapan-mem-name" id="garapan-mem-romaji" value="romaji" onchange="ML_LOGIC.handleGarapanMemberNameType()"> Romaji
							</label>
						</div>
					</div>
					
					<select id="grp-member-group" class="std-input" style="margin-bottom: 0.5rem;" onchange="ML_LOGIC.handleMemberGroupChange(this.value, 'grp-member-list')">
						<option value="">-- Pilih Grup Member --</option>
						<option value="nogizaka">Nogizaka46</option>
						<option value="sakurazaka">Sakurazaka46</option>
						<option value="hinatazaka">Hinatazaka46</option>
						<option value="bokuao">BokuAo</option>
						<option value="keyakizaka">Keyakizaka46</option>
					</select>
					
					<div id="grp-member-list" class="member-list-container">
						<p class="info-text text-center" style="padding: 1rem;">Pilih grup dulu.</p>
					</div>

					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
						 <label class="check-label">
							<input type="checkbox" id="grp-member-many" onchange="ML_LOGIC.toggleMemberMany(this.checked, 'grp')"> Banyak Member (多人)
						</label>
						<label class="check-label" style="color: var(--moe);">
							<input type="checkbox" id="grp-member-custom-check" onchange="ML_LOGIC.toggleGarapanMemberCustom(this.checked)"> Input Manual?
						</label>
					</div>
					
					<input type="text" id="grp-member-custom" class="std-input locked-cursor" style="background-color: #f3f4f6;" placeholder="Contoh: 37th Single Senbatsu" disabled>

					<div id="grp-member-result" style="margin-top: 0.75rem; padding: 0.5rem; background: #fffbeb; border: 1px solid #fcd34d; border-radius: 4px; font-size: 0.8rem; min-height: 40px;">
						<span class="text-muted">Belum ada member dipilih.</span>
					</div>
				</div>

				<div style="margin-top: 1rem;">
					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
						<label class="input-label">Grup Partisipan (Show)</label>
						<label class="check-label" style="font-size: 0.8rem;"><input type="checkbox" id="chk-multi-group" onchange="ML_LOGIC.toggleMultiGroup(this.checked)"> Multi Grup?</label>
					</div>
					<div id="group-container" class="form-row">
						${staticData.groups.map(g => `
							<label class="check-label" style="border: 1px solid var(--border-color); padding: 0.5rem; border-radius: 4px;">
								<input type="checkbox" name="rad-group" value="${g.val}" onclick="ML_LOGIC.handleGroupCheck(this)"> ${g.label}
							</label>
						`).join('')}
					</div>
				</div>
			</div>

			<div class="form-section">
				<h3 class="section-title">2. DATA TAUTAN</h3>

				<div>
					<label class="input-label">Fansub</label>
					<div style="margin-bottom: 0.5rem;">
						<select id="inp-fansub" class="std-input" onchange="ML_LOGIC.handleFansubSelect(this.value)">
							<option value="">-- Pilih Fansub --</option>
							<option value="other">Lainnya (Manual - Auto Add)</option>
						</select>
					</div>
					<input type="text" id="inp-fansub-manual" class="std-input hidden" placeholder="Nama Fansub Baru...">
					<p id="warn-fansub-manual" class="warning-text hidden">⚠️ Nama fansub wajib sama huruf besar/kecilnya dengan fansub aslinya</p>
				</div>

				<div class="form-row">
					<div>
						<label class="input-label">Status Fansub</label>
						<div class="radio-stack">
							<label class="check-label"><input type="radio" name="rad-status" value="active" checked> Aktif</label>
							<label class="check-label"><input type="radio" name="rad-status" value="inactive"> Tidak Aktif</label>
						</div>
					</div>
					<div>
						<label class="input-label">Bahasa</label>
						<div class="radio-stack">
							<label class="check-label"><input type="radio" name="rad-lang" value="id" checked> Indonesia</label>
							<label class="check-label"><input type="radio" name="rad-lang" value="en"> Inggris</label>
						</div>
					</div>
				</div>

				<div>
					<label class="input-label">Tautan Garapan</label>
					
					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
						<label class="check-label" style="color: var(--moe);">
							<input type="checkbox" id="chk-split-url" onchange="ML_LOGIC.toggleUrlMode(this.checked)"> Link Hardsub & Softsub beda?
						</label>
						
						<div id="correction-area" class="hidden">
							<label class="check-label" style="font-weight: bold; color: var(--danger); background: #fef2f2; padding: 4px 8px; border: 1px solid #fecaca; border-radius: 4px;">
								<input type="checkbox" id="chk-correction" onchange="ML_LOGIC.toggleCorrectionMode(this.checked)">
								Ada perbaikan, timpa asli
							</label>
						</div>
					</div>
					
					<div id="url-single-container">
						<input type="url" id="inp-url" class="std-input" style="margin-bottom: 0.5rem;" placeholder="https://..." required>
						<div class="info-text text-danger">*Gunakan link postingan fansub jika aktif. Direct link hanya untuk fansub mati.</div>
					</div>

					<div id="url-split-container" class="hidden" style="display: flex; flex-direction: column; gap: 0.5rem;">
						<div>
							<input type="url" id="inp-url-h" class="std-input" placeholder="Link Hardsub (URL)">
						</div>
						<div>
							<input type="url" id="inp-url-s" class="std-input" placeholder="Link Softsub (URL)">
						</div>
					</div>
				</div>

				<div class="footer-action">
					<div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
						<span>Penginput:</span>
						<span class="font-bold">${ML_LOGIC.user.displayName}</span>
					</div>
					<div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.8rem;">
						<span>Email:</span>
						<span style="font-family: monospace;">${ML_LOGIC.user.email}</span>
					</div>
					<div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.9rem;">
						<span>Role:</span>
						<span class="role-badge">${role}</span>
					</div>
					<p class="warning-text" style="font-weight: bold; margin-bottom: 1rem;">⚠️ Setiap perubahan data di sini adalah tanggung jawab Anda. Kekeliruan input data dapat menyebabkan akun dinonaktifkan.</p>
					<button type="button" onclick="ML_LOGIC.submitGarapan()" class="btn btn-primary btn-full">
						SIMPAN DATA
					</button>
				</div>
			</div>
		</form>
	`,


	renderTabFansub: (role) => {
        const isLeader = role === 'leader';
        const isAdmin = role === 'admin' || isLeader;
        const myEmail = ML_LOGIC.user ? ML_LOGIC.user.email : "";
        
        return `
        <div class="space-y-8">
            <div class="panel-box">
                <h3 class="section-title">
                    <i class="fas fa-edit"></i> EDITOR FANSUB
                    ${!isAdmin ? '<span class="status-badge status-inactive ml-2">Terkunci (Relawan)</span>' : ''}
                </h3>
                
                <form id="form-fansub" class="${!isAdmin ? 'locked-cursor' : ''}" ${!isAdmin ? 'style="pointer-events: none;"' : ''}>
                    <div class="form-row" style="margin-bottom: 1rem;">
                        <div>
                            <label class="input-label">Nama Fansub <span style="color: var(--danger);">*</span></label>
                            <input type="text" id="fs-name" class="std-input" placeholder="Nama Fansub" required ${role === 'volunteer' ? 'readonly' : ''}>
                            <p id="fs-name-warn" class="warning-text">⚠️ Hanya bisa diinput sekali, jika sudah tersimpan, tidak bisa diubah</p>
                        </div>
                        <div>
                            <label class="input-label">Status Fansub</label>
                            <div class="radio-stack" style="flex-direction: row; gap: 1rem; margin-top: 0.5rem;">
                                <label class="check-label"><input type="radio" name="fs-status" value="true" checked> Aktif</label>
                                <label class="check-label"><input type="radio" name="fs-status" value="false"> Nonaktif</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-row" style="margin-bottom: 1rem;">
                        <div>
                            <label class="input-label">Logo URL</label>
                            <input type="url" id="fs-logo" class="std-input" placeholder="https://..." ${!isLeader ? 'disabled' : ''}>
                            ${!isLeader ? '<p class="info-text">ℹ️ Hanya dapat diinput oleh Leader</p>' : ''}
                        </div>
                        <div>
                            <label class="input-label">Email Pemilik</label>
                            <input type="email" id="fs-email" class="std-input locked-cursor" style="background-color: #f3f4f6;"
                                value="${role === 'admin' ? myEmail : ''}" 
                                placeholder="email@fansub.com" 
                                readonly>
                            <p class="info-text">ℹ️ Berhubung role Admin hanya diberikan bagi pemilik fansub, sehingga apa yang Anda input disini adalah fansub Anda sendiri dan/atau fansub orang lain yang nonaktif/tidak terdaftar.</p>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="input-label">Bahasa Utama</label>
                        <div class="check-group">
                            <label class="check-label"><input type="checkbox" id="fs-lang-id" checked> Indonesia</label>
                            <label class="check-label"><input type="checkbox" id="fs-lang-en"> Inggris</label>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="input-label">Deskripsi Fansub</label>
                        <textarea id="fs-desc" class="std-input" style="height: 80px;" placeholder="Deskripsi singkat..."></textarea>
                    </div>

                    <div class="form-row-3" style="margin-bottom: 1rem;">						
                        <input type="url" id="fs-web" class="std-input" placeholder="URL Website">
                        <input type="url" id="fs-trakteer" class="std-input" placeholder="URL Trakteer">
                        <input type="url" id="fs-kofi" class="std-input" placeholder="URL Ko-fi">
                        <input type="url" id="fs-ig" class="std-input" placeholder="URL Instagram">
                        <input type="url" id="fs-fb" class="std-input" placeholder="URL Facebook">
                        <input type="url" id="fs-twitter" class="std-input" placeholder="URL X / Twitter">
                    </div>
                    
                    <div style="display: flex; gap: 0.5rem;">
                        ${isAdmin ? `<button type="button" id="btn-add-fansub" onclick="ML_LOGIC.addFansub()" class="btn btn-success" style="background-color: var(--success); color: white;">TAMBAH BARU</button>` : ''}
                        <button type="button" onclick="ML_LOGIC.saveFansub()" class="btn btn-primary">SIMPAN PERUBAHAN</button>
                        <button type="button" onclick="ML_LOGIC.resetFansubForm()" class="btn btn-secondary">RESET</button>
                    </div>
                </form>
            </div>

            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h3 class="section-title" style="margin-bottom: 0;">DAFTAR FANSUB</h3>
                    <button id="btn-get-total" onclick="ML_LOGIC.calculateFansubTotals()" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
                        Get Total
                    </button>
                </div>
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th style="width: 100px;">Logo</th>
                                <th>Nama</th>
                                <th class="text-center" style="cursor: pointer;" onclick="ML_LOGIC.sortFansubList('status')">Status <i class="fas fa-sort"></i></th>
                                <th class="text-center">Total Subtitle</th>
                                <th>Website & Tautan</th>
                                <th class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="fansub-list-body">
                            <tr><td colspan="6" class="text-center" style="padding: 2rem;">Memuat data...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `},

	renderTabAcara: (staticData, role) => {
		const isLeader = role === 'leader';
		
		return `
		<div class="form-layout" style="display: block;">
			${isLeader ? `
			<div class="panel-box" style="margin-bottom: 2rem;">
				<h3 class="section-title">TAMBAH ACARA BARU / EDITOR</h3>
				<form id="form-show" class="form-section">
					<div>
						<label class="input-label">Kategori <span style="color: var(--danger);">*</span></label>
						<select id="new-show-cat" class="std-input" onchange="ML_LOGIC.handleAcaraCatChange(this.value, true)">
							<option value="">-- Pilih Kategori --</option>
							${staticData.categories.map(c => `<option value="${c.val}">${c.label}</option>`).join('')}
						</select>
					</div>

					<div id="new-show-bonus-group" class="hidden panel-box" style="border-left: 4px solid var(--moe); background-color: #f0fdf4;">
						<div class="form-group">
							<label class="input-label">Single Grup <span style="color: var(--danger);">*</span></label>
							<select id="new-show-single-group" class="std-input" onchange="ML_LOGIC.handleNewShowSingleGroup(this.value)">
								<option value="">-- Pilih Grup --</option>
								${staticData.groups.map(g => `<option value="${g.val}">${g.label}</option>`).join('')}
							</select>
						</div>
						<div class="form-row">
							<div>
								<label class="input-label">Tipe</label>
								<select id="new-show-single-type" class="std-input">
									<option value="Single">Single</option>
									<option value="Album">Album</option>
									<option value="Best Album">Best Album</option>
									<option value="Other">Other</option>
								</select>
							</div>
							<div>
								<label class="input-label">Nomor</label>
								<input type="text" id="new-show-single-num" class="std-input" placeholder="cth: 1st, 2nd">
							</div>
						</div>
						<div class="form-group">
							<label class="input-label">Judul <span style="color: var(--danger);">*</span></label>
							<input type="text" id="new-show-single-title" class="std-input" placeholder="Judul Single/Album" oninput="document.getElementById('new-show-name').value = this.value">
						</div>
					</div>

					<div>
						<label class="input-label">Nama Acara <span style="color: var(--danger);">*</span></label>
						<input type="text" id="new-show-name" class="std-input" required>
					</div>

					<div>
						<label class="input-label">Grup Utama <span style="color: var(--danger);">*</span></label>
						<div class="check-group" id="new-show-group-container">
							<label class="check-label"><input type="radio" name="new-show-group" value="nogizaka"> Nogizaka</label>
							<label class="check-label"><input type="radio" name="new-show-group" value="sakurazaka"> Sakurazaka</label>
							<label class="check-label"><input type="radio" name="new-show-group" value="hinatazaka"> Hinatazaka</label>
							<label class="check-label"><input type="radio" name="new-show-group" value="keyakizaka"> Keyakizaka</label>
							<label class="check-label"><input type="radio" name="new-show-group" value="bokuao"> BokuAo</label>
						</div>
					</div>

					<div class="panel-box">
						<div class="member-header">
							<h4 class="font-bold" style="font-size: 0.9rem;">PARTISIPASI MEMBER</h4>
							<div class="radio-stack" style="flex-direction: row; gap: 1rem;">
								<label class="check-label"><input type="radio" name="acara-mem-name" id="acara-mem-jp" value="jp" checked onchange="ML_LOGIC.toggleAcaraMemberNameType()"> JP</label>
								<label class="check-label"><input type="radio" name="acara-mem-name" id="acara-mem-romaji" value="romaji" onchange="ML_LOGIC.toggleAcaraMemberNameType()"> Romaji</label>
							</div>
						</div>
						<div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
							<select id="acara-member-group" class="std-input" style="width: 40%;" onchange="ML_LOGIC.handleMemberGroupChange(this.value, 'acara-member-list')">
								<option value="">-- Grup --</option>
								<option value="nogizaka">Nogizaka46</option>
								<option value="sakurazaka">Sakurazaka46</option>
								<option value="hinatazaka">Hinatazaka46</option>
								<option value="bokuao">BokuAo</option>
								<option value="keyakizaka">Keyakizaka46</option>
							</select>
							<label class="check-label"><input type="checkbox" id="acara-member-many" onchange="ML_LOGIC.toggleMemberMany(this.checked, 'acara')"> Banyak</label>
							<input type="text" id="acara-member-custom" class="std-input" style="width: 40%;" placeholder="Manual..." oninput="ML_LOGIC.handleCustomMemberInput(this.value, 'acara')">
						</div>
						<div id="acara-member-list" class="member-list-container"></div>
					</div>

					<div>
						<label id="lbl-new-show-icon" class="input-label">URL Ikon</label>
						<input type="url" id="new-show-icon" class="std-input" placeholder="https://...">
					</div>
					<div>
						<label class="input-label">Deskripsi</label>
						<textarea id="new-show-desc" class="std-input"></textarea>
					</div>
					<div>
						<label class="check-label">
							<input type="checkbox" id="new-show-no-zero"> Larang Episode 00
						</label>
					</div>
					<div style="display: flex; gap: 0.5rem;">
						<button type="button" onclick="ML_LOGIC.addNewShow()" class="btn btn-primary" style="flex: 1;">SIMPAN ACARA</button>
						<button type="button" onclick="ML_LOGIC.resetShowForm()" class="btn btn-secondary">RESET</button>
					</div>
				</form>
			</div>` : ''}

			<h3 class="section-title">DAFTAR ACARA</h3>
			<div class="filter-bar">
				<select id="filter-acara-cat" class="std-input" onchange="ML_LOGIC.handleAcaraCatChange(this.value)">
					<option value="">-- Pilih Kategori List --</option>
					${staticData.categories.map(c => `<option value="${c.val}">${c.label}</option>`).join('')}
				</select>
			</div>

			<div id="acara-list-container">
				<div class="text-center text-muted" style="padding: 2rem;">Pilih kategori untuk melihat daftar acara.</div>
			</div>
		</div>
	`},

	renderTabEpisode: (staticData) => `
		<div class="form-section">
			<div class="filter-bar">
				<select id="filter-cat" class="std-input" onchange="ML_LOGIC.loadShowsForFilter(this.value)">
					<option value="">-- Pilih Kategori --</option>
					${staticData.categories.map(c => `<option value="${c.val}">${c.label}</option>`).join('')}
				</select>
				<select id="filter-group" class="std-input hidden" onchange="ML_LOGIC.loadBonusShowsForFilter(this.value)">
					<option value="">-- Pilih Grup --</option>
					${staticData.groups.map(g => `<option value="${g.val}">${g.label}</option>`).join('')}
				</select>
				<select id="filter-show" class="std-input" disabled onchange="ML_LOGIC.loadEpisodesList(this.value)">
					<option value="">-- Pilih Acara --</option>
				</select>
			</div>

			<div id="show-info-container" class="hidden panel-box" style="display: flex; gap: 1rem; align-items: start;">
				<img id="show-info-img" src="" alt="Show Icon" style="width: 80px; height: auto; border: 1px solid var(--border-color); border-radius: 4px;" class="hidden">
				<div>
					<h3 id="show-info-title" style="font-size: 1.1rem; font-weight: 700; color: var(--moe);"></h3>
					<p id="show-info-desc"></p>
				</div>
			</div>

			<div id="quick-add-episode-box" class="hidden">
				<h4 style="font-weight: 700; margin-bottom: 1rem; border-bottom: 1px solid var(--moe); padding-bottom: 0.5rem; color: var(--moe);">TAMBAH / UPDATE EPISODE</h4>
				
				<div style="margin-bottom: 1rem; font-size: 0.85rem;">
					<p id="quick-tip-eps" style="color: var(--moe); font-weight: 600;">ℹ️ Kamu bisa isi episode dengan angka format tanggal YYMMDD</p>
					<p style="color: var(--danger);">⚠️ Jika dalam acara yang sama dan di tanggal yang sama terdapat 2 atau lebih konten, mohon isi Sub Judul yang berbeda.</p>
				</div>

				<div class="form-row">
					<div style="flex: 0 0 20%;">
						<label id="lbl-quick-eps" class="input-label">Episode</label>
						<div id="container-quick-eps">
							<input type="number" id="quick-eps" class="std-input" placeholder="00">
						</div>
						<div id="container-quick-type" class="hidden">
							<select id="quick-type" class="std-input">
								<option value="Type A">Type A</option>
								<option value="Type B">Type B</option>
								<option value="Type C">Type C</option>
								<option value="Type D">Type D</option>
								<option value="Type E">Type E</option>
								<option value="Regular">Regular</option>
								<option value="BOKUAO Event">BOKUAO Event</option>
								<option value="BOKUAO Live">BOKUAO Live</option>
							</select>
						</div>
					</div>
					<div style="flex: 1;">
						<label id="lbl-quick-sub" class="input-label">Sub Judul</label>
						<input type="text" id="quick-sub" class="std-input" placeholder="Judul Episode...">
					</div>
					<div id="container-quick-date" style="flex: 0 0 25%;">
						<label class="input-label">Tayang</label>
						<div style="display: flex; align-items: center; gap: 0.5rem;">
							<input type="date" id="quick-date" class="std-input">
							<div style="display: flex; align-items: center;">
								<input type="checkbox" id="quick-unknown-date" title="Tanggal Tidak Diketahui">
							</div>
						</div>
					</div>
				</div>

				<div class="panel-box" style="margin: 1rem 0; padding: 0.75rem;">
					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
						<div style="display: flex; align-items: center; gap: 1rem;">
							<h5 class="font-bold" style="font-size: 0.85rem;">MEMBER</h5>
							<div class="radio-stack" style="flex-direction: row; gap: 0.5rem;">
								<label class="check-label"><input type="radio" name="quick-mem-name" id="quick-mem-jp" value="jp" checked onchange="ML_LOGIC.toggleMemberNameType()"> JP</label>
								<label class="check-label"><input type="radio" name="quick-mem-name" id="quick-mem-romaji" value="romaji" onchange="ML_LOGIC.toggleMemberNameType()"> Romaji</label>
							</div>
						</div>
						<label class="check-label" style="color: var(--moe); font-weight: 600;">
							<input type="checkbox" id="quick-member-custom-check" onchange="ML_LOGIC.toggleQuickMemberCustom(this.checked)"> Input Manual?
						</label>
					</div>

					<div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
						<select id="quick-member-group" class="std-input" style="width: 35%;" onchange="ML_LOGIC.handleMemberGroupChange(this.value, 'quick-member-list')">
							<option value="">-- Grup --</option>
							<option value="nogizaka">Nogizaka46</option>
							<option value="sakurazaka">Sakurazaka46</option>
							<option value="hinatazaka">Hinatazaka46</option>
							<option value="bokuao">BokuAo</option>
							<option value="keyakizaka">Keyakizaka46</option>
						</select>
						<label class="check-label" style="white-space: nowrap;">
							<input type="checkbox" id="quick-member-many" onchange="ML_LOGIC.toggleMemberMany(this.checked, 'quick')"> Banyak
						</label>
						<input type="text" id="quick-member-custom" class="std-input locked-cursor" style="background-color: #f3f4f6;" placeholder="Manual..." disabled>
					</div>
					
					<div id="quick-member-list" class="member-list-container" style="max-height: 100px;"></div>
				</div>

				<div class="form-row-3" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 1rem;">
					<div style="grid-column: span 1;">
						<select id="quick-fs-1" class="std-input" onchange="ML_LOGIC.handleQuickFsChange(1)">
							<option value="">-- Fansub 1 --</option>
						</select>
						
						<div id="quick-url-box" class="hidden" style="margin-top: 0.5rem; padding: 0.5rem; background: #f3f4f6; border: 1px solid var(--border-color); border-radius: 4px;">
							<div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
								<span style="font-size: 0.75rem; font-weight: bold;">Link Fansub 1</span>
								<label class="check-label" style="font-size: 0.75rem; color: var(--moe);">
									<input type="checkbox" id="quick-url-split-check" onchange="ML_LOGIC.toggleQuickUrlMode(this.checked)"> Split?
								</label>
							</div>
							<input type="url" id="quick-url-single" class="std-input" style="padding: 0.25rem; font-size: 0.8rem;" placeholder="URL...">
							<div id="quick-url-split-container" class="hidden" style="display: flex; flex-direction: column; gap: 0.25rem;">
								<input type="url" id="quick-url-h" class="std-input" style="padding: 0.25rem; font-size: 0.8rem;" placeholder="Hardsub URL">
								<input type="url" id="quick-url-s" class="std-input" style="padding: 0.25rem; font-size: 0.8rem;" placeholder="Softsub URL">
							</div>
						</div>
					</div>
					
					<select id="quick-fs-2" class="std-input locked-cursor" disabled onchange="ML_LOGIC.handleQuickFsChange(2)">
						<option value="">-- Fansub 2 --</option>
					</select>
					<select id="quick-fs-3" class="std-input locked-cursor" disabled onchange="ML_LOGIC.handleQuickFsChange(3)">
						<option value="">-- Fansub 3 --</option>
					</select>
					<select id="quick-fs-4" class="std-input locked-cursor" disabled>
						<option value="">-- Fansub 4 --</option>
					</select>
				</div>

				<button onclick="ML_LOGIC.addQuickEpisode()" class="btn btn-primary btn-full">PROSES DATA</button>
			</div>

			<div class="tableopt">
				<label class="check-label" style="font-weight: 600; background: white; padding: 0.25rem 0.5rem; border: 1px solid var(--border-color); border-radius: 4px;">
					<input type="checkbox" id="chk-show-member" onchange="ML_LOGIC.loadEpisodesList(document.getElementById('filter-show').value)">
					Tampilkan Member
				</label>
				<button onclick="ML_LOGIC.refreshEpisodeList()" class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
					<i class="fas fa-sync-alt"></i> Segarkan Data
				</button>
			</div>

			<div class="table-wrapper">
				<table class="data-table">
					<thead>
						<tr>
							<th style="width: 60px;" onclick="ML_LOGIC.sortEpisodeList('id')">
								Eps <i class="fas fa-sort ml-1"></i>
							</th>
							<th style="width: 90px;">Tayang</th>
							<th>Sub Judul</th>
							<th id="col-member" class="hidden">Member</th> 
							<th class="text-center" onclick="ML_LOGIC.sortEpisodeList('status')">
								Status <i class="fas fa-sort ml-1"></i>
							</th>
							<th onclick="ML_LOGIC.sortEpisodeList('fansub')">
								Fansub<i class="fas fa-sort ml-1"></i>
							</th>
							${ML_LOGIC.role === 'leader' ? '<th style="width: 120px; background-color: #fef9c3; color: #854d0e;">Oleh</th>' : ''}
							<th style="width: 80px;" class="text-center">Aksi</th>
						</tr>
					</thead>
					<tbody id="episode-list-body">
						<tr><td colspan="${ML_LOGIC.role === 'leader' ? 8 : 7}" class="text-center" style="padding: 2rem; color: var(--text-muted);">Pilih acara untuk melihat episode.</td></tr>
					</tbody>
				</table>
			</div>
		</div>
	`
};