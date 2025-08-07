document.addEventListener('DOMContentLoaded', () => {
	// ------

	document.addEventListener('contextmenu', event => {
		event.preventDefault();
	});
	const disableEvents = ['copy', 'paste', 'cut'];
	disableEvents.forEach(event => {
		document.addEventListener(event, e => e.preventDefault());
	});
	document.addEventListener('keydown', event => {
		if (event.key === 'F12') {
			event.preventDefault();
		}
		if (event.ctrlKey && event.shiftKey && event.key === 'I') {
			event.preventDefault();
		}
		if (event.ctrlKey && event.shiftKey && event.key === 'J') {
			event.preventDefault();
		}
		if (event.ctrlKey && event.key === 'U') {
			event.preventDefault();
		}
	});

    // --- 1. DEFINISI HTML DAN CSS (DITARUH DI LUAR AGAR TIDAK DIBUAT BERULANG KALI) ---

    // Definisi CSS navbar. Sama persis dengan file lama Anda.
    const navbarCSS = `
		* {
			-webkit-user-select: none !important;
			-ms-user-select: none !important;
			user-select: none !important;
		}
		#main-header { position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; background-color: transparent; transition: background-color 0.4s ease-in-out, box-shadow 0.4s ease-in-out; padding: 10px 0; }
		#main-header.scrolled { background-color: var(--moe-shade-max1, #4a148c); box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); }
		.navbar-container { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
		.navbar-logo img { height: 40px; display: block; }
		.nav-menu { list-style: none; display: flex; margin: 0; padding: 0; gap: 25px; align-items: center; }
		.nav-menu a { color: var(--moe); text-decoration: none; font-weight: bold; font-size: 1rem; padding: 8px 4px; transition: color 0.3s ease; display: flex; align-items: center; }
		.submenu-toggle .arrow { border: solid var(--moe, #6a1b9a); border-width: 0 2px 2px 0; display: inline-block; padding: 3px; margin-left: 8px; transform: rotate(45deg); transition: transform 0.3s ease, border-color 0.3s ease; }
        
        /* --- Kumpulan Aturan untuk Dark Mode --- */
		#main-header.on-dark-bg .nav-menu > .nav-item > a { color: white !important; }
		#main-header.on-dark-bg .submenu-toggle .arrow { border-color: var(--moe-tint6, #e1bee7) !important; }
		#main-header.on-dark-bg .burger-menu span { background-color: var(--moe-tint6, #e1bee7); }
		
        /* --- Aturan Normal dan Saat Scroll --- */
        #main-header.scrolled .nav-menu > .nav-item > a { color: white; }
        #main-header.scrolled .submenu-toggle .arrow { border-color: white; }
		#main-header.scrolled .burger-menu span { background-color: white; }
		.has-submenu { position: relative; }
		.submenu { position: absolute; top: 120%; left: 0; background-color: var(--moe-tint4); list-style: none; padding: 10px 0; margin: 0; min-width: 200px; border-radius: 5px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); opacity: 0; visibility: hidden; transform: translateY(10px); transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s; }
		.submenu li a { color: #333 !important; padding: 10px 20px; display: block; width: 100%; box-sizing: border-box; }
		.submenu li a:hover { background-color: var(--moe-tint5) }
		.burger-menu { display: none; cursor: pointer; }
		.nav-greeting > a { cursor: default; font-style: italic; font-weight: 500; }
		.nav-greeting > a:hover { opacity: 1 !important; }
        .nav-greeting > .submenu a { font-style: normal !important; }
		@media (min-width: 993px) { #main-header:not(.scrolled) .nav-menu > .nav-item > a:not(.nav-greeting > a):hover { opacity: 0.7; } #main-header.scrolled .nav-menu > .nav-item > a:not(.nav-greeting > a):hover { opacity: 0.8; } .has-submenu:hover > .submenu { opacity: 1; visibility: visible; transform: translateY(0); } .has-submenu:hover > .submenu-toggle > .arrow { transform: rotate(-135deg); } }
		@media (max-width: 992px) { .navbar-container { padding: 0 1.5rem; } .burger-menu { display: flex; flex-direction: column; gap: 5px; z-index: 1002; } .burger-menu span { display: block; width: 25px; height: 3px; background-color: var(--moe, #6a1b9a); transition: all 0.3s ease-in-out; } .burger-menu.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); } .burger-menu.active span:nth-child(2) { opacity: 0; } .burger-menu.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); } .nav-menu { position: fixed; top: 0; left: -100%; width: 80%; max-width: 320px; height: 100vh; background-color: var(--moe-shade-max1, #4a148c); flex-direction: column; align-items: flex-start; justify-content: flex-start; padding: 80px 30px 30px 30px; gap: 5px; box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2); transition: left 0.4s ease-in-out; } .nav-menu.active { left: 0; } .nav-menu .nav-item { width: 100%; border-bottom: 1px solid rgba(255, 255, 255, 0.1); } .nav-menu .nav-item:last-child { border-bottom: none; } .nav-menu a { color: white !important; width: 100%; padding: 15px 0; } .submenu-toggle .arrow { border-color: white !important; margin-left: auto; } .submenu { display: none; position: static; opacity: 1; visibility: visible; transform: none; box-shadow: none; background-color: transparent; padding: 0 0 0 15px; min-width: unset; width: 100%; border-radius: 0; max-height: 0; overflow: hidden; transition: max-height 0.4s ease-in-out; } .has-submenu.active > .submenu { display: block; max-height: 500px; } .has-submenu.active > .submenu-toggle > .arrow { transform: rotate(-135deg); } .submenu li a { color: rgba(255, 255, 255, 0.8) !important; font-size: 0.9rem; padding: 10px 0; } }
        @media (max-width: 992px) { .navbar-container { padding: 0 1.5rem; } .burger-menu { display: flex; flex-direction: column; gap: 5px; z-index: 1002; } .burger-menu span { display: block; width: 25px; height: 3px; background-color: var(--moe, #6a1b9a); transition: all 0.3s ease-in-out; } .burger-menu.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); } .burger-menu.active span:nth-child(2) { opacity: 0; } .burger-menu.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); } .nav-menu { position: fixed; top: 0; left: -100%; width: 80%; max-width: 320px; height: 100vh; background-color: var(--moe-shade-max1, #4a148c); flex-direction: column; align-items: flex-start; justify-content: flex-start; padding: 80px 30px 30px 30px; gap: 5px; box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2); transition: left 0.4s ease-in-out; } .nav-menu.active { left: 0; } .nav-menu .nav-item { width: 100%; border-bottom: 1px solid rgba(255, 255, 255, 0.1); } .nav-menu .nav-item:last-child { border-bottom: none; } .nav-menu a { color: white !important; width: 100%; padding: 15px 0; } .submenu-toggle .arrow { border-color: white !important; margin-left: auto; } .submenu { display: none; position: static; opacity: 1; visibility: visible; transform: none; box-shadow: none; background-color: transparent; padding: 0 0 0 15px; min-width: unset; width: 100%; border-radius: 0; max-height: 0; overflow: hidden; transition: max-height 0.4s ease-in-out; } .has-submenu.active > .submenu { display: block; max-height: 500px; } .has-submenu.active > .submenu-toggle > .arrow { transform: rotate(-135deg); } .submenu li a { color: rgba(255, 255, 255, 0.8) !important; font-size: 0.9rem; padding: 10px 0; } }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.7); backdrop-filter: blur(5px); display: flex; justify-content: center; align-items: center; z-index: 2000; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s; }
        .modal-overlay.active { opacity: 1; visibility: visible; }
        .modal-box { color: var(--moe-tint7); background-color: var(--moe-shade-min2); padding: 30px; width: 90%; max-width: 450px; border: 2px solid var(--moe); box-shadow: 0 5px 20px rgba(0,0,0,0.4); transform: scale(0.9); transition: transform 0.3s ease; }
        .modal-overlay.active .modal-box { transform: scale(1); }
        .modal-box h2 { margin-top: 0; text-align: center; }
        .modal-box p { text-align: center; font-size: 1.1em; }
        .modal-box .input-group { margin-bottom: 20px; }
        .modal-box .input-group label { display: block; margin-bottom: 8px; font-weight: bold; }
        .modal-box .input-group input { font-family: 'Space Mono', monospace; width: 100%; padding: 10px; background-color: var(--moe-shade-min3); border: 2px solid var(--moe); color: white; font-size: 16px; }
        .modal-box .password-wrapper { position: relative; display: flex; align-items: center; }
        .modal-box .password-wrapper input { padding-right: 40px; }
        .modal-box .toggle-password { position: absolute; right: 10px; cursor: pointer; user-select: none; font-family: monospace; }
        .modal-box .button-group { display: flex; flex-direction: row; justify-content: center; gap: 15px; margin-top: 25px; }
        .modal-box .btn-submit, .modal-box .btn-link { font-family: 'Space Mono', monospace; padding: 12px; border: 2px solid var(--moe); cursor: pointer; font-size: 16px; font-weight: bold; text-align: center; }
        .modal-box .btn-submit { background-color: var(--moe); color: white; }
        .modal-box .btn-link { background-color: transparent; color: var(--moe-tint7); border: none; }
        .strength-meter { height: 8px; width: 100%; background-color: var(--moe-shade-min3); margin-top: 8px; border-radius: 4px; overflow: hidden; }
        .strength-bar { height: 100%; width: 0; transition: width 0.3s, background-color 0.3s; }
        .strength-bar.lemah { width: 33%; background-color: #d32f2f; }
        .strength-bar.sedang { width: 66%; background-color: #f57c00; }
        .strength-bar.kuat { width: 100%; background-color: #388e3c; }
        .strength-text { font-size: 0.8em; text-align: right; margin-top: 4px; font-style: italic; opacity: 0; transition: opacity 0.3s; }
        .strength-text.lemah { color: #d32f2f; opacity: 1; }
        .strength-text.sedang { color: #f57c00; opacity: 1; }
        .strength-text.kuat { color: #388e3c; opacity: 1; }
        .favorites-popup-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.7); backdrop-filter: blur(5px); display: flex; justify-content: center; align-items: center; z-index: 2500; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s; }
        .favorites-popup-overlay.active { opacity: 1; visibility: visible; }
        .favorites-popup-box { color: var(--moe-tint7); background-color: var(--moe-shade-min2); padding: 20px; width: 90%; max-width: 500px; border: 2px solid var(--moe); box-shadow: 0 5px 20px rgba(0,0,0,0.4); transform: scale(0.9); transition: transform 0.3s ease; display: flex; flex-direction: column; max-height: 80vh; }
        .favorites-popup-overlay.active .favorites-popup-box { transform: scale(1); }
        .favorites-popup-box h2 { margin-top: 0; text-align: center; border-bottom: 1px solid var(--moe); padding-bottom: 10px; }
        .favorites-list { list-style: none; padding: 0; margin: 0; overflow-y: auto; flex-grow: 1; }
        .favorites-list-item { padding: 10px; border-bottom: 1px solid rgba(106, 27, 154, 0.5); }
        .favorites-list-item a { color: var(--moe-tint7); text-decoration: none; display: block; transition: background-color 0.2s; }
        .favorites-list-item a:hover { background-color: var(--moe); }
        .favorites-list .loading-fav { text-align: center; padding: 20px; font-style: italic; }
        .construction-popup-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 3000; opacity: 0; transition: opacity 0.3s ease; }
        .construction-popup-overlay.visible { opacity: 1; }
        .construction-popup-box { position: relative; background-color: var(--moe-shade-min2, #18002b); color: var(--moe-tint7, #f8efff); padding: 25px 35px; border-radius: 8px; border: 1px solid var(--moe, #6a1b9a); text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.5); transform: scale(0.9); transition: transform 0.3s ease; }
        .construction-popup-overlay.visible .construction-popup-box { transform: scale(1); }
        .construction-popup-box svg { width: 120px; height: 120px; margin-bottom: 15px; }
        .construction-popup-box p { margin: 0; font-size: 1.2rem; font-weight: bold; }
        .construction-popup-close { position: absolute; top: -10px; right: -10px; background-color: white; color: var(--moe, #6a1b9a); border: 2px solid var(--moe, #6a1b9a); border-radius: 50%; width: 30px; height: 30px; font-size: 20px; line-height: 26px; text-align: center; cursor: pointer; font-weight: bold; }
    `;
	const antiCopyStyleEl = document.createElement('style');
	antiCopyStyleEl.innerHTML = navbarCSS;
	document.head.appendChild(antiCopyStyleEl);

    // Injeksi CSS ke head. Cukup dilakukan sekali saat halaman dimuat.
    const styleEl = document.createElement('style');
    styleEl.innerHTML = navbarCSS;
    document.head.appendChild(styleEl);

    function showConstructionPopup() {
        const constructionIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="300px" height="333px" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 39.24 43.6" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"/><g id="_2424748795296"><path fill="#292929" d="M1.09 29.43l1.09 0 0 -1.09 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 -1.09 1.09 0 0 -1.09 1.09 0 1.09 0 0 1.09 1.09 0 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 0 -1.09zm18.53 -28.34l-1.09 0 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 -1.09 0zm0 31.61l-1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 0 -1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 1.09 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0z"/><path fill="#F93C00" d="M8.72 29.43l1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 1.09 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 0 -1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 -1.09 0 -1.09 1.09 0 1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 1.09 0 1.09 0 0 1.09 0 1.09zm20.71 0l0 1.09 -1.09 0 0 -1.09 1.09 0zm-9.81 11.99l1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0zm1.09 -8.72l-1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0zm4.36 -1.09l0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0zm-15.26 -2.18l0 1.09 1.09 0 0 -1.09 -1.09 0zm4.36 2.18l0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 1.09 0 1.09 0 1.09 0z"/><path fill="white" d="M13.08 15.26l1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 0 -1.09 0 -1.09zm6.54 -2.18l1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0zm0 14.17l1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0z"/><polygon fill="#F9A825" points="18.53,1.09 19.62,1.09 20.71,1.09 20.71,2.18 21.8,2.18 21.8,3.27 21.8,4.36 21.8,5.45 22.89,5.45 22.89,6.54 22.89,7.63 22.89,8.72 21.8,8.72 21.8,7.63 21.8,6.54 21.8,5.45 20.71,5.45 20.71,4.36 20.71,3.27 19.62,3.27 18.53,3.27 18.53,4.36 18.53,5.45 17.44,5.45 17.44,6.54 17.44,7.63 17.44,8.72 16.35,8.72 16.35,7.63 16.35,6.54 16.35,5.45 17.44,5.45 17.44,4.36 17.44,3.27 17.44,2.18 18.53,2.18 "/><polygon fill="black" fill-opacity="0.301961" points="39.24,31.61 38.15,31.61 38.15,32.7 38.15,33.79 37.06,33.79 37.06,34.88 35.97,34.88 35.97,35.97 34.88,35.97 34.88,37.06 33.79,37.06 32.7,37.06 32.7,38.15 31.61,38.15 30.52,38.15 30.52,39.24 29.43,39.24 28.34,39.24 27.25,39.24 27.25,40.33 26.16,40.33 25.07,40.33 25.07,41.42 23.98,41.42 22.89,41.42 21.8,41.42 21.8,42.51 20.71,42.51 19.62,42.51 18.53,42.51 17.44,42.51 17.44,41.42 16.35,41.42 15.26,41.42 14.17,41.42 14.17,40.33 13.08,40.33 11.99,40.33 11.99,39.24 10.9,39.24 9.81,39.24 8.72,39.24 8.72,38.15 7.63,38.15 6.54,38.15 6.54,37.06 5.45,37.06 4.36,37.06 4.36,35.97 3.27,35.97 3.27,34.88 2.18,34.88 2.18,33.79 1.09,33.79 1.09,32.7 1.09,31.61 0,31.61 0,32.7 0,33.79 0,34.88 1.09,34.88 1.09,35.97 2.18,35.97 2.18,37.06 3.27,37.06 3.27,38.15 4.36,38.15 5.45,38.15 5.45,39.24 6.54,39.24 7.63,39.24 7.63,40.33 8.72,40.33 9.81,40.33 9.81,41.42 10.9,41.42 11.99,41.42 13.08,41.42 13.08,42.51 14.17,42.51 15.26,42.51 16.35,42.51 16.35,43.6 17.44,43.6 18.53,43.6 19.62,43.6 20.71,43.6 21.8,43.6 22.89,43.6 22.89,42.51 23.98,42.51 25.07,42.51 26.16,42.51 26.16,41.42 27.25,41.42 28.34,41.42 29.43,41.42 29.43,40.33 30.52,40.33 31.61,40.33 31.61,39.24 32.7,39.24 33.79,39.24 33.79,38.15 34.88,38.15 35.97,38.15 35.97,37.06 37.06,37.06 37.06,35.97 38.15,35.97 38.15,34.88 39.24,34.88 39.24,33.79 39.24,32.7 "/><path fill="#F06D03" d="M37.06 29.43l-1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09zm-17.44 -11.99l-1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0zm0 11.99l-1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 0 -1.09 -1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 -1.09 0 0 1.09 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0zm0 -18.53l-1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 -1.09 0 -1.09 1.09 0 1.09 0 0 1.09 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0zm0 13.08l-1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0z"/></g></g></svg>`;
        const popupHTML = `
            <div class="construction-popup-overlay" id="construction-popup">
                <div class="construction-popup-box">
                    <button class="construction-popup-close" title="Close">&times;</button>
                    ${constructionIconSVG}
                    <p>Sedang dalam konstruksi</p>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        const popup = document.getElementById('construction-popup');
        setTimeout(() => popup.classList.add('visible'), 10);

        const closePopup = () => {
            popup.classList.remove('visible');
            popup.addEventListener('transitionend', () => popup.remove(), { once: true });
        };
        
        popup.querySelector('.construction-popup-close').addEventListener('click', closePopup);
        popup.addEventListener('click', (e) => {
            if (e.target.id === 'construction-popup') closePopup();
        });
    }
	
	async function showFavoritesPopup() {
        const modalHTML = `
            <div class="favorites-popup-overlay active" id="favorites-modal">
                <div class="favorites-popup-box">
                    <h2>⭐ Favoritku ⭐</h2>
                    <ul class="favorites-list">
                        <li class="loading-fav">
                            <img src="../sprite/element/loading.svg" alt="Memuat..." style="width: 60px; height: 60px;">
                        </li>
                    </ul>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const newModal = document.getElementById('favorites-modal');
        const listContainer = newModal.querySelector('.favorites-list');

        const closeModal = () => newModal.remove();
        newModal.addEventListener('click', (e) => {
            if (e.target.id === 'favorites-modal') closeModal();
        });

        try {
            const user = auth.currentUser;
            if (!user) {
                listContainer.innerHTML = '<li class="loading-fav">Gagal memuat: Anda tidak login.</li>';
                return;
            }

            // 1. Ambil daftar 'like' dari Firestore
            const likesSnapshot = await db.collection('users').doc(user.uid).collection('likes').get();
            if (likesSnapshot.empty) {
                listContainer.innerHTML = '<li class="loading-fav">Kamu belum punya favorit.</li>';
                return;
            }
            const favorites = likesSnapshot.docs.map(doc => doc.data());

            // 2. Ambil list.json untuk menentukan urutan dan path
            const listData = await fetch('../store/subs/list.json').then(res => res.json());
            const allShowsOrder = Object.values(listData).flat();

            const findShowPath = (showName) => {
                for (const category in listData) {
                    if (listData[category].includes(showName)) {
                        return `../store/subs/${category}/`;
                    }
                }
                return null;
            };

            // 3. Ambil detail untuk setiap item favorit
            const detailPromises = favorites.map(async (fav) => {
                const path = findShowPath(fav.show);
                if (!path) return null;
                try {
                    const showData = await fetch(`${path}${fav.show}.json`).then(res => res.json());
                    const episodeData = showData.episodes[fav.eps];
                    if (!episodeData) return null;
                    
                    const episodeText = episodeData.descEpisode ? episodeData.descEpisode.replace(/\|/g, '').trim() : `Episode ${fav.eps}`;
                    return {
                        url: `../moesubs/subs.html?show=${fav.show}&eps=${fav.eps}`,
                        displayText: `${showData.nameShowTitle} ${episodeText}`,
                        order: allShowsOrder.indexOf(fav.show) // Simpan urutan untuk sorting
                    };
                } catch {
                    return null;
                }
            });

            // 4. Tunggu semua detail selesai di-fetch, filter yang gagal, dan urutkan
            let favoriteDetails = (await Promise.all(detailPromises)).filter(Boolean);
            favoriteDetails.sort((a, b) => a.order - b.order);

            // 5. Tampilkan hasilnya
            if (favoriteDetails.length === 0) {
                listContainer.innerHTML = '<li class="loading-fav">Data favorit tidak ditemukan.</li>';
            } else {
                listContainer.innerHTML = favoriteDetails.map(item => 
                    `<li class="favorites-list-item"><a href="${item.url}">${item.displayText}</a></li>`
                ).join('');
            }
        } catch (error) {
            console.error("Error showing favorites popup:", error);
            listContainer.innerHTML = '<li class="loading-fav">Gagal memuat favorit.</li>';
        }
    }
	
	
	function showChangeUsernameModal() {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const modalHTML = `
        <div class="modal-overlay active" id="change-username-modal">
            <div class="modal-box">
                <h2>Ganti Username</h2>
                <form id="changeUsernameForm" novalidate>
                    <div class="input-group">
                        <label for="new-username-input">Username Baru</label>
                        <input type="text" id="new-username-input" required minlength="6" pattern="[A-Za-z0-9_]{6,}" title="Minimal 6 karakter, hanya huruf, angka, dan underscore.">
                        <small class="validation-message" style="color: #ffb3b3; font-size: 0.8em; margin-top: 4px; display: block;"></small>
                    </div>
                    <div class="button-group">
                        <button type="submit" class="btn-submit">Simpan</button>
                        <button type="button" class="btn-link" id="cancel-change-username">Batal</button>
                    </div>
                </form>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const newModal = document.getElementById('change-username-modal');
        const usernameInput = document.getElementById('new-username-input');
        const form = document.getElementById('changeUsernameForm');
        const validationMessage = newModal.querySelector('.validation-message');
        const submitButton = form.querySelector('.btn-submit');

        usernameInput.value = currentUser.displayName;

        const closeModal = () => newModal.remove();
        newModal.querySelector('#cancel-change-username').onclick = closeModal;
        newModal.addEventListener('click', (e) => {
            if (e.target.id === 'change-username-modal') closeModal();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newUsername = usernameInput.value.trim();
            
            if (!form.checkValidity()) {
                validationMessage.textContent = usernameInput.title;
                return;
            }
            if (newUsername === currentUser.displayName) {
                validationMessage.textContent = "Ini sudah menjadi username Anda saat ini.";
                return;
            }

            validationMessage.textContent = '';
            submitButton.disabled = true;
            submitButton.textContent = 'Menyimpan...';

            currentUser.updateProfile({
                displayName: newUsername
            }).then(() => {
                document.getElementById('navbar-username-display').textContent = newUsername;
                alert('Username berhasil diubah!');
                closeModal();
            }).catch((error) => {
                console.error("Error updating username:", error);
                alert("Gagal mengubah username. Silakan coba lagi.");
                submitButton.disabled = false;
                submitButton.textContent = 'Simpan';
            });
        });
    }

	function showLogoutConfirm() {
        const modalHTML = `<div class="modal-overlay active" id="logout-confirm-modal"><div class="modal-box"><h2>Logout</h2><p>Anda yakin ingin keluar?</p><div class="button-group"><button type="button" class="btn-submit" id="confirm-logout">Ya</button><button type="button" class="btn-link" id="cancel-logout">Tidak</button></div></div></div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const newModal = document.getElementById('logout-confirm-modal');
        
        const closeModal = () => newModal.remove();

        newModal.addEventListener('click', (e) => { 
            if (e.target.id === 'logout-confirm-modal') closeModal(); 
        });

        // PERUBAHAN UTAMA: Tombol "Ya" sekarang memanggil auth.signOut()
        newModal.querySelector('#confirm-logout').addEventListener('click', () => { 
            auth.signOut().catch(error => console.error('Sign out error', error));
            // Redirect tidak perlu di sini, akan ditangani otomatis oleh onAuthStateChanged
            closeModal();
        });
        
        newModal.querySelector('#cancel-logout').addEventListener('click', closeModal);
    }
	
    // --- 2. PENGGERAK UTAMA: DENGARKAN STATUS LOGIN DARI FIREBASE ---
    // Ini adalah jantung dari sistem. Ia akan berjalan otomatis saat halaman dibuka
    // dan setiap kali pengguna login atau logout.
    auth.onAuthStateChanged(user => {
        // Setiap kali status berubah, kita gambar ulang navbarnya.
        renderNavbar(user);
    });

    // --- 3. FUNGSI UNTUK MENGGAMBAR NAVBAR DAN MENAMBAHKAN FUNGSI KLIK ---
    function renderNavbar(user) {
        // Hapus navbar lama jika ada, untuk menghindari duplikasi
        const oldHeader = document.getElementById('main-header');
        if (oldHeader) {
            oldHeader.remove();
        }

        let userGreetingHTML = '';
        if (user) {
            const displayName = user.displayName || user.email;
            userGreetingHTML = `
                <li class="nav-item has-submenu nav-greeting">
                    <a href="#" class="submenu-toggle">Halo, <span id="navbar-username-display">${displayName}</span> <span class="arrow"></span></a>
                    <ul class="submenu">
                        <li><a href="#" id="favorites-btn">Favorit</a></li>
                        <li><a href="#" id="change-username-btn">Ganti Username</a></li>
                        <li><a href="#" id="logout-btn">Logout</a></li>
                    </ul>
                </li>`;
        }

        const navbarHTML = `
			<header id="main-header">
				<nav class="navbar-container">
					<a href="../index.html" class="navbar-logo">
						<img src="https://moefangsubs.github.io/sprite/logonew2024.svg" alt="Moefangsubs Logo">
					</a>
					<div class="burger-menu">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<ul class="nav-menu">
						<li class="nav-item">
							<a href="../sitemap.html">SITEMAP</a>
						</li>
						<li class="nav-item has-submenu">
							<a href="#" class="submenu-toggle">MV <span class="arrow"></span>
							</a>
							<ul class="submenu">
								<li><a href="../moedownload/sub-mv-nogizaka46.html">Nogizaka46</a></li>
								<li><a href="../moedownload/sub-mv-48-46.html">Sakamichi</a></li>
								<li><a href="../moedownload/sub-mv-bokuao.html">BokuAo</a></li>
								<li><a href="../moedownload/sub-mv-random.html">Random J-Pop</a></li>
							</ul>
						</li>
						<li class="nav-item has-submenu">
							<a href="#" class="submenu-toggle">TRANSLATION <span class="arrow"></span>
							</a>
							<ul class="submenu">
								<li><a href="#">Blog</a></li>
								<li><a href="../moemagz/magazine-translation.html">Magazine</a></li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="../moeplay/moeplay-chord.html">CHORD</a>
						</li>
						<li class="nav-item">
							<a href="../moedata/database.html">DB</a>
						</li>
						<li class="nav-item has-submenu">
							<a href="#" class="submenu-toggle">OTHER <span class="arrow"></span>
							</a>
							<ul class="submenu">
								<li><a href="../moedownload/folder-icon.html">Folder Icon</a></li>
								<li><a href="#">Fansub List</a></li>
								<li><a href="#">Color Palette</a></li>
								<li><a href="#">Masterlist</a></li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="../moeplay/moeplay.html">PLAY</a>
						</li> ${userGreetingHTML}
					</ul>
				</nav>
			</header>`;
        
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);

        const header = document.getElementById('main-header');
        if (!header) return;

        const burgerMenu = header.querySelector('.burger-menu');
        const navMenu = header.querySelector('.nav-menu');

        const detectInitialHeaderColor = () => {
            const darkBgVariables = ['--moe-shade-min3', '--moe-shade-min2', '--moe-shade-min1', '--moe', '--moe-shade-max1', '--moe-shade-max2', '--moe-shade-max3', '--moe-tint1', '--moe-tint2', '--moe-tint3'];
            const bodyBackgroundColor = window.getComputedStyle(document.body).backgroundColor;
            const colorTester = document.createElement('div');
            colorTester.style.display = 'none';
            document.body.appendChild(colorTester);
            for (const variable of darkBgVariables) {
                colorTester.style.color = `var(${variable})`;
                if (bodyBackgroundColor === window.getComputedStyle(colorTester).color) {
                    header.classList.add('on-dark-bg');
                    break;
                }
            }
            document.body.removeChild(colorTester);
        };
        detectInitialHeaderColor();

        const adjustBodyPadding = () => { document.body.style.paddingTop = `${header.offsetHeight}px`; };
        adjustBodyPadding();
        window.addEventListener('resize', adjustBodyPadding);
        window.addEventListener('scroll', () => { window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled'); });

        // --- PERBAIKAN UTAMA: MENGGUNAKAN EVENT DELEGATION ---
        // Kita hanya menambahkan SATU event listener ke seluruh header.
        header.addEventListener('click', (e) => {
            const link = e.target.closest('a'); // Cari elemen <a> terdekat dari target yang di-klik
            if (!link) return; // Jika yang di-klik bukan link, abaikan

            const href = link.getAttribute('href');
            const id = link.id;

            // Cek apakah link ini adalah link fungsional yang sudah punya fungsi sendiri
            const isFunctionalLink = link.classList.contains('submenu-toggle') || 
                                     (user && (id === 'favorites-btn' || id === 'change-username-btn' || id === 'logout-btn'));
            
            if (isFunctionalLink) {
                e.preventDefault();
                if (id === 'favorites-btn') showFavoritesPopup();
                if (id === 'change-username-btn') showChangeUsernameModal();
                if (id === 'logout-btn') showLogoutConfirm();
                if (link.classList.contains('submenu-toggle') && window.matchMedia("(max-width: 992px)").matches) {
                    link.parentElement.classList.toggle('active');
                }
                return;
            }

            // Cek apakah ini link "Under Construction"
            if (href === '#' || href === '') {
                e.preventDefault();
                showConstructionPopup();
                return;
            }

            // Jika bukan keduanya, biarkan link berjalan normal (misal: link ke DB)
        });

        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
            }
        }, true);
    }
});