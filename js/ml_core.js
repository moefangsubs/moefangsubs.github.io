ML_LOGIC.loginGoogle = () => {
    const p = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(p);
};

ML_LOGIC.registerUser = async () => {
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
};

ML_LOGIC.switchTab = async (tabName) => {
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
        ML_LOGIC.lockedFansubs = []; 
        ML_LOGIC.loadFansubDropdown();
    } else if (tabName === 'tab-fansub') {
        panel.innerHTML = ML_COMPONENTS.renderTabFansub(ML_LOGIC.role);
        ML_LOGIC.loadFansubList();
    } else if (tabName === 'tab-acara') {
        panel.innerHTML = ML_COMPONENTS.renderTabAcara(ML_LOGIC.staticData, ML_LOGIC.role);
    } else if (tabName === 'tab-episode') {
        panel.innerHTML = ML_COMPONENTS.renderTabEpisode(ML_LOGIC.staticData);
        
        const quickEpsInput = document.getElementById('quick-eps');
        if (quickEpsInput) {
            quickEpsInput.addEventListener('input', (e) => {
                const val = e.target.value;
                const dateInput = document.getElementById('quick-date');
                const unknownCheck = document.getElementById('quick-unknown-date');

                if (/^\d{6}$/.test(val)) {
                    const yy = val.substring(0, 2);
                    const mm = val.substring(2, 4);
                    const dd = val.substring(4, 6);
                    const formattedDate = `20${yy}-${mm}-${dd}`;
                    
                    if (dateInput) dateInput.value = formattedDate;
                    if (unknownCheck) unknownCheck.checked = false;
                } else {
                    if (dateInput) dateInput.value = '';
                }
            });
        }

        if (ML_LOGIC.episodeTabState && ML_LOGIC.episodeTabState.cat) {
            const cat = ML_LOGIC.episodeTabState.cat;
            document.getElementById('filter-cat').value = cat;
            
            await ML_LOGIC.loadShowsForFilter(cat);
            
            if (ML_LOGIC.episodeTabState.show) {
                const fullVal = `${cat}|${ML_LOGIC.episodeTabState.show}`;
                const showDropdown = document.getElementById('filter-show');
                if(showDropdown.querySelector(`option[value="${fullVal}"]`)) {
                    showDropdown.value = fullVal;
                    ML_LOGIC.loadEpisodesList(fullVal);
                }
            }
        }
    } else if (tabName === 'tab-batch') {
        panel.innerHTML = ML_COMPONENTS.renderTabBatch(ML_LOGIC.staticData);
    }
};

ML_LOGIC.init = async () => {
    try {
        const resp = await fetch('../store/data/masterlist/static_data.json');
        ML_LOGIC.staticData = await resp.json();
        
        const memberFiles = {
            'nogizaka': '../store/member/members.json',
            'sakurazaka': '../store/member/members_db_saku.json',
            'hinatazaka': '../store/member/members_db_hina.json',
            'bokuao': '../store/member/members_db_boku.json',
            'keyakizaka': '../store/member/members_db_keya.json'
        };

        for (const [key, path] of Object.entries(memberFiles)) {
            try {
                const r = await fetch(path);
                ML_LOGIC.memberData[key] = await r.json();
            } catch (e) {
                console.error(`Gagal load member ${key}`, e);
            }
        }

        const style = document.createElement('style');
        style.innerHTML = `
            .locked-cursor { cursor: not-allowed !important; }
            .locked-cursor * { cursor: not-allowed !important; }
        `;
        document.head.appendChild(style);

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
};
document.addEventListener('DOMContentLoaded', ML_LOGIC.init);