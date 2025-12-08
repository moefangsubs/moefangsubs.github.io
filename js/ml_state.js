const ML_STATE = {
    user: {
        uid: null,
        email: null,
        displayName: null,
        role: null, 
        fansubData: null 
    },
    data: {
        programs: {},
        fansubs: {},
        activeCategory: null,
        activeShowId: null
    },
    refs: {
        // Pastikan firebase sudah di-init sebelum file ini jalan
        db: typeof firebase !== 'undefined' ? firebase.firestore() : null,
        auth: typeof firebase !== 'undefined' ? firebase.auth() : null
    }
};

const UI_REFS = {
    forms: {
        dbForm: document.getElementById('dbForm'),
        programDropdown: document.getElementById('programDropdown'),
        catDropdown: document.getElementById('catDropdown'),
        groupDropdown: document.getElementById('groupDropdown'),
        singleDropdown: document.getElementById('singleDropdown'),
        groupContainer: document.getElementById('groupDropdownContainer'),
        singleContainer: document.getElementById('singleDropdownContainer'),
        fansubSelect: document.getElementById('fansubSelect'),
        otherFansubInput: document.getElementById('otherFansubInput'),
        episodeInput: document.getElementById('episodeInput'),
        unknownEpCheck: document.getElementById('unknownEpCheck'),
        dateInputs: {
            year: document.getElementById('airingYear'),
            month: document.getElementById('airingMonth'),
            date: document.getElementById('airingDate'),
            unknown: document.getElementById('unknownDateCheck')
        }
    },
    radios: {
        category: document.querySelectorAll('input[name="kategori"]'),
        status: document.querySelectorAll('input[name="status_fansub"]'),
        lang: document.querySelectorAll('input[name="bahasa"]'),
        group: document.querySelectorAll('input[name="grup"]')
    },
    display: {
        loginBox: document.getElementById('login-box'),
        welcomeBox: document.getElementById('welcome-back-box'),
        username: document.getElementById('welcome-username'),
        roleDisplay: document.getElementById('role-display-area') 
    },
    tabs: {
        btns: document.querySelectorAll('.tab-button'),
        contents: document.querySelectorAll('.tab-content')
    }
};