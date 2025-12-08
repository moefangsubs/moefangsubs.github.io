const ML_COMPONENTS = {
    renderLogin: () => `
        <div class="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-blue-600">
            <h1 class="text-2xl font-bold mb-2">ACCESS RESTRICTED</h1>
            <p class="text-gray-600 mb-6">Silakan login untuk mengakses Masterlist Admin.</p>
            <button id="btn-login-google" class="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700 w-full transition flex items-center justify-center gap-2">
                <i class="fab fa-google"></i> LOGIN GOOGLE
            </button>
        </div>
    `,

    renderRegister: (email, name) => `
        <div class="max-w-lg mx-auto mt-20 bg-yellow-50 p-8 rounded-lg shadow-lg text-center border border-yellow-400">
            <h1 class="text-2xl font-bold text-yellow-800 mb-2">PENDAFTARAN VOLUNTEER</h1>
            <div class="text-left bg-white p-4 rounded border border-gray-200 mb-4 text-sm">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Nama:</strong> ${name}</p>
            </div>
            <p class="text-gray-700 mb-6">Akun belum terdaftar. Sistem sedang menerima volunteer baru.</p>
            <button id="btn-register-submit" class="bg-yellow-600 text-white px-6 py-3 rounded font-bold hover:bg-yellow-700 w-full transition shadow">
                DAFTAR SEKARANG
            </button>
        </div>
    `,

    renderDashboard: (user, role) => `
        <header class="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-300">
            <h1 class="text-3xl font-bold uppercase tracking-wide text-gray-800">DATABASE EDITOR</h1>
            <div class="text-right text-sm">
                <div class="font-medium text-gray-500">Logged as</div>
                <div class="font-bold text-lg text-blue-900">${user.displayName} <span class="text-xs bg-gray-200 px-2 py-0.5 rounded ml-1 uppercase">${role}</span></div>
            </div>
        </header>

        <div class="flex flex-wrap gap-2 mb-0 pl-2">
            <button class="tab-btn px-6 py-3 font-semibold text-gray-600 hover:text-black hover:bg-gray-200 transition rounded-t-lg border-b-2 border-transparent" onclick="ML_LOGIC.switchTab('tab-garapan')">GARAPAN</button>
            <button class="tab-btn px-6 py-3 font-semibold text-gray-600 hover:text-black hover:bg-gray-200 transition rounded-t-lg border-b-2 border-transparent" onclick="ML_LOGIC.switchTab('tab-fansub')">FANSUB</button>
            <button class="tab-btn px-6 py-3 font-semibold text-gray-600 hover:text-black hover:bg-gray-200 transition rounded-t-lg border-b-2 border-transparent" onclick="ML_LOGIC.switchTab('tab-acara')">ACARA BARU</button>
            <button class="tab-btn px-6 py-3 font-semibold text-gray-600 hover:text-black hover:bg-gray-200 transition rounded-t-lg border-b-2 border-transparent" onclick="ML_LOGIC.switchTab('tab-episode')">LIST EPISODE</button>
        </div>

        <div id="main-panel" class="bg-white border border-gray-300 p-6 shadow-sm rounded-b-lg rounded-tr-lg min-h-[500px]">
        </div>
    `,

    renderTabGarapan: (staticData, role) => `
        <form id="form-garapan" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-6">
                <h3 class="text-xl font-bold border-b pb-2">1. PILIH ACARA</h3>
                
                <div class="bg-gray-50 p-4 rounded border">
                    <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Kategori</label>
                    <select id="inp-cat" class="w-full border p-2 rounded mb-3" onchange="ML_LOGIC.handleCatChange(this.value)">
                        <option value="">-- Pilih Kategori --</option>
                        ${staticData.categories.map(c => `<option value="${c.val}">${c.label}</option>`).join('')}
                    </select>

                    <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Judul Acara</label>
                    <select id="inp-program" class="w-full border p-2 rounded bg-gray-100 text-gray-400" disabled>
                        <option value="">-- Pilih Kategori Dulu --</option>
                    </select>
                    
                    <div id="bonus-single-area" class="hidden mt-3 pt-3 border-t border-gray-200">
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Grup (Bonus)</label>
                        <select id="inp-group-single" class="w-full border p-2 rounded mb-2" onchange="ML_LOGIC.handleGroupSingleChange(this.value)">
                            <option value="">-- Pilih Grup --</option>
                            ${staticData.groups.map(g => `<option value="${g.val}">${g.label}</option>`).join('')}
                        </select>
                        <select id="inp-song" class="w-full border p-2 rounded bg-gray-100" disabled>
                            <option>-- Pilih Single --</option>
                        </select>
                    </div>

                    <div class="mt-3">
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Sub Judul (Opsional)</label>
                        <input type="text" id="inp-subtitle" class="w-full border p-2 rounded" placeholder="Contoh: Isu Island">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block font-bold mb-1">Episode</label>
                        <div class="flex items-center gap-2">
                            <input type="number" id="inp-eps" class="border p-2 w-20 rounded" placeholder="00">
                            <label class="text-xs flex items-center"><input type="checkbox" id="chk-eps-unknown" class="mr-1"> Unknown</label>
                        </div>
                    </div>
                    <div>
                        <label class="block font-bold mb-1">Airing Date</label>
                        <input type="date" id="inp-date" class="border p-2 w-full rounded">
                    </div>
                </div>

                <div>
                    <div class="flex justify-between items-center mb-2">
                        <label class="font-bold">Grup Partisipan</label>
                        <label class="text-xs"><input type="checkbox" id="chk-multi-group" onchange="ML_LOGIC.toggleMultiGroup(this.checked)"> Multi Group?</label>
                    </div>
                    <div class="grid grid-cols-2 gap-2" id="group-container">
                        ${staticData.groups.map(g => `
                            <label class="flex items-center border p-2 rounded hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="rad-group" value="${g.val}" class="mr-2"> ${g.label}
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <h3 class="text-xl font-bold border-b pb-2">2. DATA LINK</h3>

                <div>
                    <label class="block font-bold mb-1">Fansub</label>
                    <div class="flex gap-2 mb-2">
                        <select id="inp-fansub" class="w-full border p-2 rounded" onchange="ML_LOGIC.handleFansubSelect(this.value)">
                            <option value="">-- Pilih Fansub --</option>
                            <option value="other">Lainnya (Manual)</option>
                        </select>
                    </div>
                    <input type="text" id="inp-fansub-manual" class="w-full border p-2 rounded bg-gray-100 hidden" placeholder="Nama Fansub Manual...">
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block font-bold mb-1">Status</label>
                        <div class="flex flex-col gap-1">
                            <label><input type="radio" name="rad-status" value="active" checked> Aktif</label>
                            <label><input type="radio" name="rad-status" value="inactive"> Tidak Aktif</label>
                        </div>
                    </div>
                    <div>
                        <label class="block font-bold mb-1">Bahasa</label>
                        <div class="flex flex-col gap-1">
                            <label><input type="radio" name="rad-lang" value="id" checked> Indonesia</label>
                            <label><input type="radio" name="rad-lang" value="en"> English</label>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block font-bold mb-1">URL Garapan</label>
                    <label class="flex items-center text-sm mb-2 text-blue-600 cursor-pointer">
                        <input type="checkbox" id="chk-split-url" onchange="ML_LOGIC.toggleUrlMode(this.checked)" class="mr-2"> Link Hardsub & Softsub berbeda?
                    </label>
                    
                    <div id="url-single-container">
                        <input type="url" id="inp-url" class="w-full border p-2 rounded mb-1" placeholder="https://..." required>
                        <div class="text-xs text-red-500">*Gunakan link post fansub jika aktif. Direct link hanya untuk fansub mati.</div>
                    </div>

                    <div id="url-split-container" class="hidden space-y-2">
                        <div>
                            <input type="url" id="inp-url-h" class="w-full border p-2 rounded" placeholder="Link Hardsub (URL)">
                        </div>
                        <div>
                            <input type="url" id="inp-url-s" class="w-full border p-2 rounded" placeholder="Link Softsub (URL)">
                        </div>
                    </div>
                </div>

                <div class="bg-blue-50 p-4 rounded border border-blue-200 mt-8">
                    <div class="flex justify-between text-sm mb-1">
                        <span>Penginput:</span>
                        <span class="font-bold uppercase">${role}</span>
                    </div>
                    <button type="button" onclick="ML_LOGIC.submitGarapan()" class="w-full bg-gray-800 text-white font-bold py-3 rounded hover:bg-black transition">
                        SIMPAN DATA
                    </button>
                </div>
            </div>
        </form>
    `,

    renderTabFansub: (role) => {
        const isLeader = role === 'leader';
        const isAdmin = role === 'admin' || isLeader;
        
        return `
        <div class="space-y-8">
            <div class="border rounded bg-gray-50 p-4">
                <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                    <i class="fas fa-edit"></i> EDITOR FANSUB
                    ${!isAdmin ? '<span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Locked (Volunteer)</span>' : ''}
                </h3>
                
                <form id="form-fansub" class="${!isAdmin ? 'opacity-50 pointer-events-none' : ''} space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold uppercase mb-1">Nama Fansub</label>
                            <input type="text" id="fs-name" class="w-full border p-2 rounded" required ${!isLeader ? 'readonly' : ''}>
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase mb-1">Status</label>
                            <div class="flex gap-4 mt-2">
                                <label><input type="radio" name="fs-status" value="true" checked> Aktif</label>
                                <label><input type="radio" name="fs-status" value="false"> Tidak Aktif</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase mb-1">Bahasa</label>
                        <div class="flex gap-4">
                            <label><input type="checkbox" id="fs-lang-id" value="id"> Indonesia</label>
                            <label><input type="checkbox" id="fs-lang-en" value="en"> Inggris</label>
                        </div>
                        <p class="text-xs text-gray-500">Jika dipilih, opsi bahasa di Tab Garapan akan otomatis terkunci.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold uppercase mb-1">Logo URL</label>
                            <input type="url" id="fs-logo" class="w-full border p-2 rounded" placeholder="https://..." ${!isLeader ? 'disabled' : ''}>
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase mb-1">Email Owner</label>
                            <input type="email" id="fs-email" class="w-full border p-2 rounded" placeholder="email@fansub.com" ${role === 'admin' ? 'readonly' : ''}>
                            ${role === 'admin' ? '<p class="text-xs text-blue-500">Email dikunci sesuai akun login.</p>' : ''}
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input type="url" id="fs-web" class="border p-2 rounded text-sm" placeholder="Website URL">
                        <input type="url" id="fs-trakteer" class="border p-2 rounded text-sm" placeholder="Trakteer URL">
                        <input type="url" id="fs-kofi" class="border p-2 rounded text-sm" placeholder="Ko-fi URL">
                        <input type="url" id="fs-ig" class="border p-2 rounded text-sm" placeholder="Instagram URL">
                        <input type="url" id="fs-fb" class="border p-2 rounded text-sm" placeholder="Facebook URL">
                        <input type="url" id="fs-twitter" class="border p-2 rounded text-sm" placeholder="X / Twitter URL">
                    </div>
                    
                    <div class="flex gap-2 pt-2">
                        ${isLeader ? `<button type="button" onclick="ML_LOGIC.addFansub()" class="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700">TAMBAH BARU</button>` : ''}
                        <button type="button" onclick="ML_LOGIC.saveFansub()" class="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700">SIMPAN PERUBAHAN</button>
                        <button type="button" onclick="document.getElementById('form-fansub').reset(); ML_LOGIC.editingFansubId = null;" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">RESET</button>
                    </div>
                </form>
            </div>

            <div>
                <h3 class="font-bold text-lg mb-2">DAFTAR FANSUB</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm border-collapse border border-gray-300">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="border p-2 text-left">Nama</th>
                                <th class="border p-2 text-center">Status</th>
                                <th class="border p-2 text-left">Links</th>
                                <th class="border p-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="fansub-list-body">
                            <tr><td colspan="4" class="p-4 text-center">Memuat data...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `},

    renderTabAcara: (staticData, role) => {
        const isLeader = role === 'leader';
        if (!isLeader) return `<div class="p-10 text-center text-gray-500">Fitur ini hanya untuk Leader.</div>`;

        return `
        <div class="max-w-2xl mx-auto">
            <h3 class="font-bold text-xl mb-6">TAMBAH ACARA BARU (SHOW)</h3>
            <form id="form-show" class="space-y-4">
                <div>
                    <label class="block font-bold text-sm mb-1">Kategori</label>
                    <select id="new-show-cat" class="w-full border p-2 rounded">
                        ${staticData.categories.map(c => `<option value="${c.val}">${c.label}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block font-bold text-sm mb-1">Nama Acara</label>
                    <input type="text" id="new-show-name" class="w-full border p-2 rounded" required>
                </div>
                <div>
                    <label class="block font-bold text-sm mb-1">Grup Utama</label>
                    <select id="new-show-group" class="w-full border p-2 rounded">
                        <option value="">(Kosong / Netral)</option>
                        ${staticData.groups.map(g => `<option value="${g.val}">${g.label}</option>`).join('')}
                    </select>
                    <p class="text-xs text-gray-500 mt-1">Jika dipilih, input garapan akan otomatis terkunci ke grup ini.</p>
                </div>
                <div>
                    <label class="block font-bold text-sm mb-1">Icon URL</label>
                    <input type="url" id="new-show-icon" class="w-full border p-2 rounded" placeholder="https://...">
                </div>
                <div>
                    <label class="block font-bold text-sm mb-1">Deskripsi</label>
                    <textarea id="new-show-desc" class="w-full border p-2 rounded h-24"></textarea>
                </div>
                <div>
                    <label class="flex items-center gap-2 cursor-pointer font-bold text-sm">
                        <input type="checkbox" id="new-show-no-zero"> Larang Episode 00
                    </label>
                    <p class="text-xs text-gray-500">Jika dicentang, penginput tidak bisa memilih 'Unknown' atau mengisi 00 pada episode.</p>
                </div>
                <button type="button" onclick="ML_LOGIC.addNewShow()" class="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800">
                    BUAT ACARA
                </button>
            </form>
        </div>
    `},

    renderTabEpisode: (staticData) => `
        <div class="space-y-4">
            <div class="flex flex-col md:flex-row gap-4 bg-gray-50 p-4 rounded border">
                <select id="filter-cat" class="border p-2 rounded w-full md:w-1/3" onchange="ML_LOGIC.loadShowsForFilter(this.value)">
                    <option value="">-- Pilih Kategori --</option>
                    ${staticData.categories.map(c => `<option value="${c.val}">${c.label}</option>`).join('')}
                </select>
                <select id="filter-show" class="border p-2 rounded w-full md:w-1/3" disabled onchange="ML_LOGIC.loadEpisodesList(this.value)">
                    <option value="">-- Pilih Acara --</option>
                </select>
            </div>

            <div id="quick-add-episode-box" class="bg-blue-50 border border-blue-200 p-4 rounded hidden">
                <h4 class="font-bold text-sm mb-2 text-blue-800">TAMBAH EPISODE CEPAT</h4>
                <div class="flex flex-col md:flex-row gap-2 items-end">
                    <div class="w-24">
                        <label class="text-xs font-bold">Episode</label>
                        <input type="number" id="quick-eps" class="border p-2 w-full rounded" placeholder="00">
                    </div>
                    <div class="flex-1">
                        <label class="text-xs font-bold">Sub Judul</label>
                        <input type="text" id="quick-sub" class="border p-2 w-full rounded" placeholder="Judul Episode...">
                    </div>
                    <div class="w-40">
                        <label class="text-xs font-bold">Airing</label>
                        <input type="date" id="quick-date" class="border p-2 w-full rounded">
                    </div>
                    <div class="pb-2">
                        <label class="flex items-center text-xs"><input type="checkbox" id="quick-unknown-date" class="mr-1"> Unknown Date</label>
                    </div>
                    <button onclick="ML_LOGIC.addQuickEpisode()" class="bg-blue-600 text-white font-bold px-4 py-2 rounded h-10 hover:bg-blue-700">TAMBAH</button>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-sm border-collapse border border-gray-300">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                            <th class="border p-2 w-16">Eps</th>
                            <th class="border p-2">Sub Judul</th>
                            <th class="border p-2 w-24">Airing</th>
                            <th class="border p-2">Links / Fansub</th>
                            <th class="border p-2 w-20">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="episode-list-body">
                        <tr><td colspan="5" class="p-8 text-center text-gray-400">Pilih acara untuk melihat episode.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};