document.addEventListener('DOMContentLoaded', () => {
	

	document.addEventListener('contextmenu', event => {
		event.preventDefault();
	});
	const disableEvents = ['copy', 'paste', 'cut'];
	disableEvents.forEach(eventName => {
		document.addEventListener(eventName, e => {
			if (!document.body.classList.contains('allow-copy')) {
				e.preventDefault();
			}
		});
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

    const navbarCSS = `
		* {
			-webkit-user-select: none !important;
		}

		.navbar-profile-img {
			height: 32px;
			width: 32px;
			border-radius: 50%;
			border: 2px solid var(--moe-tint6);
			cursor: pointer;
			object-fit: cover;
		}

		#main-header.scrolled .navbar-profile-img,
		#main-header.on-dark-bg .navbar-profile-img {
			border-color: white;
		}

		@media (max-width: 992px) {
			.nav-greeting {
				flex-direction: column;
				align-items: flex-start !important;
			}

			.navbar-profile-img {
				display: none;
			}

			.nav-greeting>a {
				color: white !important;
			}
		}

		@media (min-width: 993px) {
			.nav-greeting>a {
				padding: 0 !important;
				display: none !important;
			}

			.nav-greeting>.navbar-profile-img {
				display: block !important;
			}
		}

		#main-header {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 1000;
			background-color: transparent;
			transition: background-color 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
			padding: 10px 0;
		}

		#main-header.scrolled {
			background-color: var(--moe-shade-max1, #4a148c);
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		}

		.navbar-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			max-width: 1200px;
			margin: 0 auto;
			padding: 0 2rem;
		}

		.navbar-logo img {
			height: 40px;
			display: block;
		}

		.nav-menu {
			list-style: none;
			display: flex;
			margin: 0;
			padding: 0;
			gap: 25px;
			align-items: center;
		}

		.nav-menu a {
			color: var(--moe);
			text-decoration: none;
			font-weight: bold;
			font-size: 1rem;
			padding: 8px 4px;
			transition: color 0.3s ease;
			display: flex;
			align-items: center;
		}

		.submenu-toggle .arrow {
			border: solid var(--moe, #6a1b9a);
			border-width: 0 2px 2px 0;
			display: inline-block;
			padding: 3px;
			margin-left: 8px;
			transform: rotate(45deg);
			transition: transform 0.3s ease, border-color 0.3s ease;
		}

		#main-header.on-dark-bg .nav-menu>.nav-item>a {
			color: white !important;
		}

		#main-header.on-dark-bg .submenu-toggle .arrow {
			border-color: var(--moe-tint6, #e1bee7) !important;
		}

		#main-header.on-dark-bg .burger-menu span {
			background-color: var(--moe-tint6, #e1bee7);
		}

		#main-header.scrolled .nav-menu>.nav-item>a {
			color: white;
		}

		#main-header.scrolled .submenu-toggle .arrow {
			border-color: white;
		}

		#main-header.scrolled .burger-menu span {
			background-color: white;
		}

		.has-submenu {
			position: relative;
		}

		.submenu {
			position: absolute;
			top: 120%;
			right: 0;
			background-color: var(--moe-tint4);
			list-style: none;
			padding: 10px 0;
			margin: 0;
			min-width: 200px;
			border-radius: 5px;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
			opacity: 0;
			visibility: hidden;
			transform: translateY(10px);
			transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
		}

		.submenu li a {
			color: #333 !important;
			padding: 10px 20px;
			display: block;
			width: 100%;
			box-sizing: border-box;
		}

		.submenu li a:hover {
			background-color: var(--moe-tint5)
		}

		.burger-menu {
			display: none;
			cursor: pointer;
		}

		.nav-greeting>a {
			cursor: default;
			font-style: italic;
			font-weight: 500;
		}

		.nav-greeting>a:hover {
			opacity: 1 !important;
		}

		.nav-greeting>.submenu a {
			font-style: normal !important;
		}

		@media (min-width: 993px) {
			#main-header:not(.scrolled) .nav-menu>.nav-item>a:not(.nav-greeting > a):hover {
				opacity: 0.7;
			}

			#main-header.scrolled .nav-menu>.nav-item>a:not(.nav-greeting > a):hover {
				opacity: 0.8;
			}

			.has-submenu:hover>.submenu {
				opacity: 1;
				visibility: visible;
				transform: translateY(0);
			}

			.has-submenu:hover>.submenu-toggle>.arrow {
				transform: rotate(-135deg);
			}
		}

		@media (max-width: 992px) {
			.navbar-container {
				padding: 0 1.5rem;
			}

			.burger-menu {
				display: flex;
				flex-direction: column;
				gap: 5px;
				z-index: 1002;
			}

			.burger-menu span {
				display: block;
				width: 25px;
				height: 3px;
				background-color: var(--moe, #6a1b9a);
				transition: all 0.3s ease-in-out;
			}

			.burger-menu.active span:nth-child(1) {
				transform: rotate(45deg) translate(5px, 5px);
			}

			.burger-menu.active span:nth-child(2) {
				opacity: 0;
			}

			.burger-menu.active span:nth-child(3) {
				transform: rotate(-45deg) translate(7px, -6px);
			}

			.nav-menu {
				position: fixed;
				top: 0;
				left: -100%;
				width: 80%;
				max-width: 320px;
				height: 100vh;
				background-color: var(--moe-shade-max1, #4a148c);
				flex-direction: column;
				align-items: flex-start;
				justify-content: flex-start;
				padding: 80px 30px 30px 30px;
				gap: 5px;
				box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
				transition: left 0.4s ease-in-out;
			}

			.nav-menu.active {
				left: 0;
			}

			.nav-menu .nav-item {
				width: 100%;
				border-bottom: 1px solid rgba(255, 255, 255, 0.1);
			}

			.nav-menu .nav-item:last-child {
				border-bottom: none;
			}

			.nav-menu a {
				color: white !important;
				width: 100%;
				padding: 15px 0;
			}

			.submenu-toggle .arrow {
				border-color: white !important;
				margin-left: auto;
			}

			.submenu {
				display: none;
				position: static;
				opacity: 1;
				visibility: visible;
				transform: none;
				box-shadow: none;
				background-color: transparent;
				padding: 0 0 0 15px;
				min-width: unset;
				width: 100%;
				border-radius: 0;
				max-height: 0;
				overflow: hidden;
				transition: max-height 0.4s ease-in-out;
			}

			.has-submenu.active>.submenu {
				display: block;
				max-height: 500px;
			}

			.has-submenu.active>.submenu-toggle>.arrow {
				transform: rotate(-135deg);
			}

			.submenu li a {
				color: rgba(255, 255, 255, 0.8) !important;
				font-size: 0.9rem;
				padding: 10px 0;
			}
		}

		@media (max-width: 992px) {
			.navbar-container {
				padding: 0 1.5rem;
			}

			.burger-menu {
				display: flex;
				flex-direction: column;
				gap: 5px;
				z-index: 1002;
			}

			.burger-menu span {
				display: block;
				width: 25px;
				height: 3px;
				background-color: var(--moe, #6a1b9a);
				transition: all 0.3s ease-in-out;
			}

			.burger-menu.active span:nth-child(1) {
				transform: rotate(45deg) translate(5px, 5px);
			}

			.burger-menu.active span:nth-child(2) {
				opacity: 0;
			}

			.burger-menu.active span:nth-child(3) {
				transform: rotate(-45deg) translate(7px, -6px);
			}

			.nav-menu {
				position: fixed;
				top: 0;
				left: -100%;
				width: 80%;
				max-width: 320px;
				height: 100vh;
				background-color: var(--moe-shade-max1, #4a148c);
				flex-direction: column;
				align-items: flex-start;
				justify-content: flex-start;
				padding: 80px 30px 30px 30px;
				gap: 5px;
				box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
				transition: left 0.4s ease-in-out;
			}

			.nav-menu.active {
				left: 0;
			}

			.nav-menu .nav-item {
				width: 100%;
				border-bottom: 1px solid rgba(255, 255, 255, 0.1);
			}

			.nav-menu .nav-item:last-child {
				border-bottom: none;
			}

			.nav-menu a {
				color: white !important;
				width: 100%;
				padding: 15px 0;
			}

			.submenu-toggle .arrow {
				border-color: white !important;
				margin-left: auto;
			}

			.submenu {
				display: none;
				position: static;
				opacity: 1;
				visibility: visible;
				transform: none;
				box-shadow: none;
				background-color: transparent;
				padding: 0 0 0 15px;
				min-width: unset;
				width: 100%;
				border-radius: 0;
				max-height: 0;
				overflow: hidden;
				transition: max-height 0.4s ease-in-out;
			}

			.has-submenu.active>.submenu {
				display: block;
				max-height: 500px;
			}

			.has-submenu.active>.submenu-toggle>.arrow {
				transform: rotate(-135deg);
			}

			.submenu li a {
				color: rgba(255, 255, 255, 0.8) !important;
				font-size: 0.9rem;
				padding: 10px 0;
			}
		}

		.modal-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.7);
			backdrop-filter: blur(5px);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 2000;
			opacity: 0;
			visibility: hidden;
			transition: opacity 0.3s ease, visibility 0.3s;
		}

		.modal-overlay.active {
			opacity: 1;
			visibility: visible;
		}

		.modal-box {
			color: var(--moe-tint7);
			background-color: var(--moe-shade-min2);
			padding: 30px;
			width: 90%;
			max-width: 450px;
			border: 2px solid var(--moe);
			box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
			transform: scale(0.9);
			transition: transform 0.3s ease;
		}

		.modal-overlay.active .modal-box {
			transform: scale(1);
		}

		.modal-box h2 {
			margin-top: 0;
			text-align: center;
		}

		.modal-box p {
			text-align: center;
			font-size: 1.1em;
		}

		.modal-box .input-group {
			margin-bottom: 20px;
		}

		.modal-box .input-group label {
			display: block;
			margin-bottom: 8px;
			font-weight: bold;
		}

		.modal-box .input-group input {
			font-family: 'Space Mono', monospace;
			width: 100%;
			padding: 10px;
			background-color: var(--moe-shade-min3);
			border: 2px solid var(--moe);
			color: white;
			font-size: 16px;
		}

		.modal-box .password-wrapper {
			position: relative;
			display: flex;
			align-items: center;
		}

		.modal-box .password-wrapper input {
			padding-right: 40px;
		}

		.modal-box .toggle-password {
			position: absolute;
			right: 10px;
			cursor: pointer;
			user-select: none;
			font-family: monospace;
		}

		.modal-box .button-group {
			display: flex;
			flex-direction: row;
			justify-content: center;
			gap: 15px;
			margin-top: 25px;
		}

		.modal-box .btn-submit,
		.modal-box .btn-link {
			font-family: 'Space Mono', monospace;
			padding: 12px;
			border: 2px solid var(--moe);
			cursor: pointer;
			font-size: 16px;
			font-weight: bold;
			text-align: center;
		}

		.modal-box .btn-submit {
			background-color: var(--moe);
			color: white;
		}

		.modal-box .btn-link {
			background-color: transparent;
			color: var(--moe-tint7);
			border: none;
		}

		.strength-meter {
			height: 8px;
			width: 100%;
			background-color: var(--moe-shade-min3);
			margin-top: 8px;
			border-radius: 4px;
			overflow: hidden;
		}

		.strength-bar {
			height: 100%;
			width: 0;
			transition: width 0.3s, background-color 0.3s;
		}

		.strength-bar.lemah {
			width: 33%;
			background-color: #d32f2f;
		}

		.strength-bar.sedang {
			width: 66%;
			background-color: #f57c00;
		}

		.strength-bar.kuat {
			width: 100%;
			background-color: #388e3c;
		}

		.strength-text {
			font-size: 0.8em;
			text-align: right;
			margin-top: 4px;
			font-style: italic;
			opacity: 0;
			transition: opacity 0.3s;
		}

		.strength-text.lemah {
			color: #d32f2f;
			opacity: 1;
		}

		.strength-text.sedang {
			color: #f57c00;
			opacity: 1;
		}

		.strength-text.kuat {
			color: #388e3c;
			opacity: 1;
		}

		.favorites-popup-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.7);
			backdrop-filter: blur(5px);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 2500;
			opacity: 0;
			visibility: hidden;
			transition: opacity 0.3s ease, visibility 0.3s;
		}

		.favorites-popup-overlay.active {
			opacity: 1;
			visibility: visible;
		}

		.favorites-popup-box {
			color: var(--moe-tint7);
			background-color: var(--moe-shade-min2);
			padding: 20px;
			width: 90%;
			max-width: 500px;
			border: 2px solid var(--moe);
			box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
			transform: scale(0.9);
			transition: transform 0.3s ease;
			display: flex;
			flex-direction: column;
			max-height: 80vh;
		}

		.favorites-popup-overlay.active .favorites-popup-box {
			transform: scale(1);
		}

		.favorites-popup-box h2 {
			margin-top: 0;
			text-align: center;
			border-bottom: 1px solid var(--moe);
			padding-bottom: 10px;
		}

		.favorites-list {
			list-style: none;
			padding: 0;
			margin: 0;
			overflow-y: auto;
			flex-grow: 1;
		}

		.favorites-list-item {
			padding: 10px;
			border-bottom: 1px solid rgba(106, 27, 154, 0.5);
		}

		.favorites-list-item a {
			color: var(--moe-tint7);
			text-decoration: none;
			display: block;
			transition: background-color 0.2s;
		}

		.favorites-list-item a:hover {
			background-color: var(--moe);
		}

		.favorites-list .loading-fav {
			text-align: center;
			padding: 20px;
			font-style: italic;
		}

		.construction-popup-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.6);
			backdrop-filter: blur(4px);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 3000;
			opacity: 0;
			transition: opacity 0.3s ease;
		}

		.construction-popup-overlay.visible {
			opacity: 1;
		}

		.construction-popup-box {
			position: relative;
			background-color: var(--moe-shade-min2, #18002b);
			color: var(--moe-tint7, #f8efff);
			padding: 25px 35px;
			border-radius: 8px;
			border: 1px solid var(--moe, #6a1b9a);
			text-align: center;
			box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
			transform: scale(0.9);
			transition: transform 0.3s ease;
		}

		.construction-popup-overlay.visible .construction-popup-box {
			transform: scale(1);
		}

		.construction-popup-box svg {
			width: 120px;
			height: 120px;
			margin-bottom: 15px;
		}

		.construction-popup-box p {
			margin: 0;
			font-size: 1.2rem;
			font-weight: bold;
		}

		.construction-popup-close {
			position: absolute;
			top: -10px;
			right: -10px;
			background-color: white;
			color: var(--moe, #6a1b9a);
			border: 2px solid var(--moe, #6a1b9a);
			border-radius: 50%;
			width: 30px;
			height: 30px;
			font-size: 20px;
			line-height: 26px;
			text-align: center;
			cursor: pointer;
			font-weight: bold;
		}	
				
		/* Style untuk Modal Bio */
		.bio-modal-box textarea {
			width: 100%;
			box-sizing: border-box;
			height: 80px;
			resize: none;
			font-family: "Space Mono", monospace;
			/* (Gaya input di bawah ini mengambil dari style modal login Anda) */
			padding: 10px;
			background-color: var(--moe-shade-min3);
			border: 2px solid var(--moe);
			color: white;
			font-size: 16px;
		}
		.bio-modal-box #bio-char-count {
			text-align: right;
			font-size: 0.9em;
			opacity: 0.8;
			margin-top: 5px;
		}

		/* Style Notifikasi Popup */
		.notifications-popup-box {
			width: 90% !important;
			max-width: 500px !important;
			max-height: 70vh;
			display: flex;
			flex-direction: column;
		}
		.notifications-list {
			flex-grow: 1;
			overflow-y: auto;
			list-style: none;
			padding: 0;
			margin: 0;
			color: var(--moe-tint7); /* Menyesuaikan warna teks modal */
		}
		.notification-item {
			padding: 10px;
			border-bottom: 1px solid var(--moe); /* Menyesuaikan border modal */
		}
		.notification-item:last-child {
			border-bottom: none;
		}
		.notification-item p {
			margin: 0 0 5px 0;
			font-size: 1em;
			line-height: 1.4;
			text-align: left; /* Menyesuaikan teks */
		}
		.notification-item a {
			color: var(--moe-tint2);
			text-decoration: none;
			font-weight: bold;
		}
		.notification-item .notif-date {
			font-size: 0.8em;
			opacity: 0.7;
		}
		.notifications-popup-box .notif-empty {
			text-align: center;
			padding: 2rem;
			opacity: 0.8;
		}

		/* Style Oshi Modal */
		.oshi-modal-box {
			width: 95% !important;
			max-width: 800px !important;
			max-height: 90vh;
			display: flex;
			flex-direction: column;
		}
		.oshi-modal-tabs {
			display: flex;
			border-bottom: 2px solid var(--moe);
			margin-bottom: 1rem;
			flex-shrink: 0;
		}
		.oshi-modal-tab {
			padding: 10px 15px;
			cursor: pointer;
			opacity: 0.6;
			font-weight: bold;
			border-bottom: 3px solid transparent;
			color: var(--moe-tint7); /* Menyesuaikan warna teks */
		}
		.oshi-modal-tab.active {
			opacity: 1;
			border-bottom-color: var(--moe);
		}
		.oshi-modal-tab.nogi.active { border-bottom-color: #9b2ca2; }
		.oshi-modal-tab.saku.active { border-bottom-color: #ff91b7; }
		.oshi-modal-tab.hina.active { border-bottom-color: #78dbff; }
		.oshi-modal-tab.boku.active { border-bottom-color: #1b5ff1; }

		.oshi-modal-filter {
			margin-bottom: 1rem;
			display: flex;
			align-items: center;
			gap: 8px;
			font-size: 0.9em;
			color: var(--moe-tint7); /* Menyesuaikan warna teks */
			flex-shrink: 0;
		}
		.oshi-modal-filter label {
			cursor: pointer;
			-webkit-user-select: none;
			user-select: none;
		}
		.oshi-modal-filter input[type="checkbox"] {
			cursor: pointer;
		}

		.oshi-modal-content {
			display: none;
			flex-grow: 1;
			overflow-y: auto;
		}
		/* (Ini perbaikan dari Anda) */
		.oshi-modal-content.active {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 10px;
			justify-content: center;
			align-items: flex-start;
		}

		/* (Ini perbaikan dari Anda) */
		.oshi-member-item {
			width: 110px; 
			border-radius: 5px;
			cursor: pointer;
			border: 2px solid transparent;
			background-color: var(--moe-shade-min3); /* Menyesuaikan bg modal */
			transition: all 0.2s;
			overflow: hidden; 
			opacity: 0.8;
			display: flex;
			flex-direction: column;
		}
		.oshi-member-item:hover {
			opacity: 1;
			transform: scale(1.05);
			border-color: var(--moe-tint4);
		}
		.oshi-member-item.selected {
			opacity: 1;
			color: white; 
		}

		.oshi-member-photo {
			width: 100%;
			aspect-ratio: 1 / 1; 
			object-fit: contain; 
			background-color: #fff; 
			display: block;
		}

		/* (Ini perbaikan dari Anda) */
		.oshi-member-name {
			display: block;
			padding: 8px 6px; 
			font-size: 0.8em;
			text-align: center;
			color: var(--moe-tint7); /* Menyesuaikan warna teks */
			white-space: normal;
			word-wrap: break-word; 
			min-height: 2.6em; 
			display: flex; 
			align-items: center;
			justify-content: center;
			flex-grow: 1; 
		}
		.oshi-member-item.selected .oshi-member-name {
			color: white;
			font-weight: bold;
		}

		/* Warna Seleksi Oshi */
		.oshi-member-item.nogi.selected { background-color: #9b2ca2; }
		.oshi-member-item.saku.selected { background-color: #ff91b7; }
		.oshi-member-item.hina.selected { background-color: #78dbff; }
		.oshi-member-item.boku.selected { background-color: #1b5ff1; }

		.oshi-member-item.kamioshi {
			border-color: #333 !important;
			box-shadow: 0 0 8px #333;
			background-color: white !important;
		}
		.oshi-member-item.kamioshi.nogi .oshi-member-name { color: #9b2ca2 !important; }
		.oshi-member-item.kamioshi.saku .oshi-member-name { color: #ff91b7 !important; }
		.oshi-member-item.kamioshi.hina .oshi-member-name { color: #78dbff !important; }
		.oshi-member-item.kamioshi.boku .oshi-member-name { color: #1b5ff1 !important; }

		.oshi-member-item.kamioshi .oshi-member-name {
			font-weight: bold;
		}
		.oshi-modal-box p.info {
			font-size: 0.9em;
			font-style: italic;
			opacity: 0.8;
			text-align: center;
			margin: 1rem 0 0 0;
			flex-shrink: 0;
		}
		
		.nav-greeting {
			position: relative;
		}
		.notif-badge {
			position: absolute;
			top: -6px;
			right: -8px;
			background-color: #d32f2f;
			color: white;
			border-radius: 50%;
			width: 20px;
			height: 20px;
			font-size: 0.8em;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
			display: none;
		}
		#main-header.scrolled .notif-badge,
		#main-header.on-dark-bg .notif-badge {
			border-color: white;
		}
		@media (max-width: 992px) {
			.notif-badge {
				top: 10px;
				right: 15px;
			}
		}
		
		.notification-item {
			position: relative;
			padding-right: 30px;
		}
		.notif-delete-btn {
			position: absolute;
			top: 10px;
			right: 5px;
			background: transparent;
			border: none;
			color: #aaa;
			font-size: 1.2em;
			font-weight: bold;
			cursor: pointer;
			padding: 0 5px;
		}
		.notif-delete-btn:hover {
			color: #d32f2f;
		}
		
		.chat-access-modal p {
			text-align: center;
			font-size: 1em;
			line-height: 1.5;
			color: var(--moe-tint7);
		}
		.chat-access-modal .btn-submit {
			background-color: var(--moe);
			color: white;
		}
        .chat-access-modal .btn-submit[disabled] {
            background-color: var(--moe-tint3);
            cursor: not-allowed;
        }
		.chat-access-modal .btn-link {
			background-color: transparent;
			color: var(--moe-tint7);
			border: none;
		}
		.chat-access-modal .button-group {
			display: flex;
			flex-direction: row;
			justify-content: center;
			gap: 15px;
			margin-top: 25px;
		}
	`;
	const antiCopyStyleEl = document.createElement('style');
	antiCopyStyleEl.innerHTML = navbarCSS;
	document.head.appendChild(antiCopyStyleEl);
    
    if (typeof firebase === 'undefined') {
        console.error("Navbar.js: Firebase SDK tidak ditemukan.");
        return; 
    }
    const auth = firebase.auth();
    const db = firebase.firestore();
	let localIsAdmin = false;
    let localChatAccessStatus = null;
    let localAccessListener = null;

    async function checkAccessStatus(user) {
        if (localAccessListener) {
            localAccessListener();
            localAccessListener = null;
        }

        if (!user) {
            localIsAdmin = false;
            localChatAccessStatus = null;
            return;
        }
        
        const adminDoc = await db.collection('admins').doc(user.uid).get();
        if (adminDoc.exists) {
            localIsAdmin = true;
            localChatAccessStatus = 'ok';
            return;
        }
        
        localIsAdmin = false;
        
        const docRef = db.collection('moechat').doc(user.uid);
        
        localAccessListener = docRef.onSnapshot(doc => {
            const oldStatus = localChatAccessStatus;
            if (doc.exists) {
                localChatAccessStatus = doc.data().status.toLowerCase();
            } else {
                localChatAccessStatus = null;
            }
            
            const modal = document.getElementById('chat-access-modal');
            if (modal && oldStatus !== localChatAccessStatus) {
                renderAccessPopup(localChatAccessStatus, docRef);
            }
        }, err => {
            console.error("Gagal mendengarkan status chat:", err);
            localChatAccessStatus = null;
        });
        
        try {
            const initialDoc = await docRef.get();
            if (initialDoc.exists) {
                localChatAccessStatus = initialDoc.data().status.toLowerCase();
            } else {
                localChatAccessStatus = null;
            }
        } catch (e) {
            console.error("Gagal get moechat doc:", e);
            localChatAccessStatus = null;
        }
    }

    let localUserProfile = { bio: '', oshi: {} };
    let localMemberData = { nogi: [], hina: [], saku: [], boku: [] };
    let membersLoaded = false;
	let notifListener = null;

    async function loadMemberDataForNav() {
        if (membersLoaded) return;
        try {
            const [nogi, hina, saku, boku] = await Promise.all([
                fetch('../store/member/members.json').then(res => res.json()),
                fetch('../store/member/members_db_hina.json').then(res => res.json()),
                fetch('../store/member/members_db_saku.json').then(res => res.json()),
                fetch('../store/member/members_db_boku.json').then(res => res.json())
            ]);
            
            localMemberData = { nogi, hina, saku, boku };
            membersLoaded = true;
        } catch (error) {
            console.error("Navbar.js: Gagal memuat data member JSON:", error);
        }
    }

    function showConstructionPopup() {
        const existingPopup = document.getElementById('construction-popup');
        if (existingPopup) {
            existingPopup.remove();
        }

        const constructionIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="300px" height="333px" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 39.24 43.6" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"/><g id="_2424748795296"><path fill="#292929" d="M1.09 29.43l1.09 0 0 -1.09 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 -1.09 1.09 0 0 -1.09 1.09 0 1.09 0 0 1.09 1.09 0 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 0 -1.09zm18.53 -28.34l-1.09 0 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 -1.09 0zm0 31.61l-1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 0 -1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 0 1.09 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 1.09 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0z"/><path fill="#F93C00" d="M8.72 29.43l1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 1.09 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 0 -1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 -1.09 0 -1.09 1.09 0 1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 1.09 0 1.09 0 0 1.09 0 1.09zm20.71 0l0 1.09 -1.09 0 0 -1.09 1.09 0zm-9.81 11.99l1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 0 1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 -1.09 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0zm1.09 -8.72l-1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0zm4.36 -1.09l0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0zm-15.26 -2.18l0 1.09 1.09 0 0 -1.09 -1.09 0zm4.36 2.18l0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 1.09 0 1.09 0 1.09 0z"/><path fill="white" d="M13.08 15.26l1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 0 -1.09 0 -1.09zm6.54 -2.18l1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0zm0 14.17l1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 0 -1.09 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0z"/><polygon fill="#F9A825" points="18.53,1.09 19.62,1.09 20.71,1.09 20.71,2.18 21.8,2.18 21.8,3.27 21.8,4.36 21.8,5.45 22.89,5.45 22.89,6.54 22.89,7.63 22.89,8.72 21.8,8.72 21.8,7.63 21.8,6.54 21.8,5.45 20.71,5.45 20.71,4.36 20.71,3.27 19.62,3.27 18.53,3.27 18.53,4.36 18.53,5.45 17.44,5.45 17.44,6.54 17.44,7.63 17.44,8.72 16.35,8.72 16.35,7.63 16.35,6.54 16.35,5.45 17.44,5.45 17.44,4.36 17.44,3.27 17.44,2.18 18.53,2.18 "/><polygon fill="black" fill-opacity="0.301961" points="39.24,31.61 38.15,31.61 38.15,32.7 38.15,33.79 37.06,33.79 37.06,34.88 35.97,34.88 35.97,35.97 34.88,35.97 34.88,37.06 33.79,37.06 32.7,37.06 32.7,38.15 31.61,38.15 30.52,38.15 30.52,39.24 29.43,39.24 28.34,39.24 27.25,39.24 27.25,40.33 26.16,40.33 25.07,40.33 25.07,41.42 23.98,41.42 22.89,41.42 21.8,41.42 21.8,42.51 20.71,42.51 19.62,42.51 18.53,42.51 17.44,42.51 17.44,41.42 16.35,41.42 15.26,41.42 14.17,41.42 14.17,40.33 13.08,40.33 11.99,40.33 11.99,39.24 10.9,39.24 9.81,39.24 8.72,39.24 8.72,38.15 7.63,38.15 6.54,38.15 6.54,37.06 5.45,37.06 4.36,37.06 4.36,35.97 3.27,35.97 3.27,34.88 2.18,34.88 2.18,33.79 1.09,33.79 1.09,32.7 1.09,31.61 0,31.61 0,32.7 0,33.79 0,34.88 1.09,34.88 1.09,35.97 2.18,35.97 2.18,37.06 3.27,37.06 3.27,38.15 4.36,38.15 5.45,38.15 5.45,39.24 6.54,39.24 7.63,39.24 7.63,40.33 8.72,40.33 9.81,40.33 9.81,41.42 10.9,41.42 11.99,41.42 13.08,41.42 13.08,42.51 14.17,42.51 15.26,42.51 16.35,42.51 16.35,43.6 17.44,43.6 18.53,43.6 19.62,43.6 20.71,43.6 21.8,43.6 22.89,43.6 22.89,42.51 23.98,42.51 25.07,42.51 26.16,42.51 26.16,41.42 27.25,41.42 28.34,41.42 29.43,41.42 29.43,40.33 30.52,40.33 31.61,40.33 31.61,39.24 32.7,39.24 33.79,39.24 33.79,38.15 34.88,38.15 35.97,38.15 35.97,37.06 37.06,37.06 37.06,35.97 38.15,35.97 38.15,34.88 39.24,34.88 39.24,33.79 39.24,32.7 "/><path fill="#F06D03" d="M37.06 29.43l-1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 0 1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 -1.09 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09zm-17.44 -11.99l-1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0zm0 11.99l-1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 -1.09 0 -1.09 -1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 -1.09 0 0 1.09 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0 -1.09 0zm0 -18.53l-1.09 0 -1.09 0 0 -1.09 -1.09 0 0 -1.09 1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 0 -1.09 0 -1.09 1.09 0 1.09 0 0 1.09 0 1.09 1.09 0 0 1.09 0 1.09 0 1.09 1.09 0 0 1.09 -1.09 0 0 1.09 -1.09 0 -1.09 0zm0 13.08l-1.09 0 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 -1.09 0 -1.09 0 0 -1.09 0 -1.09 0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 0 1.09 1.09 0 1.09 0 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 0 -1.09 1.09 0 1.09 0 1.09 0 0 1.09 0 1.09 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 0 1.09 -1.09 0 -1.09 0 -1.09 0z"/></g></g></svg>`;
        const popupHTML = `
            <div class="construction-popup-overlay" id="construction-popup">
                <div class="construction-popup-box">
                    <button class="construction-popup-close" title="Close" style="z-index: 10;">&times;</button>
                    ${constructionIconSVG}
                    <p>Sedang dalam konstruksi</p>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        const popup = document.getElementById('construction-popup');
        
        requestAnimationFrame(() => {
            popup.classList.add('visible');
        });

        const closePopup = () => {
            if (!popup) return;
            popup.classList.remove('visible');
            const removeFunc = () => {
                if (popup && popup.parentNode) popup.remove();
            };
            const timer = setTimeout(removeFunc, 350);
            
            popup.addEventListener('transitionend', () => {
                clearTimeout(timer);
                removeFunc();
            }, { once: true });
        };
        
        popup.querySelector('.construction-popup-close').addEventListener('click', (e) => {
            e.stopPropagation();
            closePopup();
        });
        popup.addEventListener('click', (e) => {
            if (e.target.id === 'construction-popup') {
                closePopup();
            }
        });
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

        newModal.querySelector('#confirm-logout').addEventListener('click', async () => {
            const user = auth.currentUser;
            
            if (user) {
                try {
                    const rtdb = firebase.database();
                    await rtdb.ref('/onlineUsers/' + user.uid).remove();
                } catch (e) {
                    console.error("Gagal menghapus status online saat logout:", e);
                }
            }
            
            try {
                await auth.signOut();
            } catch (error) {
                console.error('Sign out error', error);
            }
            
            closeModal();
        });
        
        newModal.querySelector('#cancel-logout').addEventListener('click', closeModal);
    }

	function setupNotificationListener(uid) {
        if (notifListener) {
            notifListener();
        }
        
        const notifRef = db.collection('users').doc(uid).collection('notifications').where('isRead', '==', false);
        
        notifListener = notifRef.onSnapshot(snapshot => {
            const count = snapshot.size;
            const badge = document.querySelector('.notif-badge');
            
            if (badge) {
                if (count > 0) {
                    badge.textContent = count;
                    badge.style.display = 'flex';
                } else {
                    badge.style.display = 'none';
                }
            }
        }, error => {
            console.error("Gagal mendengarkan notifikasi:", error);
        });
    }

    async function markNotificationsAsRead(unreadDocs) {
        const batch = db.batch();
        unreadDocs.forEach(doc => {
            batch.update(doc.ref, { isRead: true });
        });
        
        try {
            await batch.commit();
        } catch (error) {
            console.error("Gagal menandai notifikasi sebagai terbaca:", error);
        }
    }
	
    function showBioModal() {
        const currentUser = auth.currentUser;
        if (!currentUser) return;
        const currentBio = localUserProfile.bio || ''; 

        const modalHTML = `
        <div class="modal-overlay active" id="bio-modal">
            <div class="modal-box bio-modal-box">
                <h2>Edit Bio</h2>
                <form id="bioForm">
                    <div class="input-group">
                        <textarea id="bio-input" maxlength="100" placeholder="Tulis bio singkat (max 100 karakter)...">${currentBio}</textarea>
                        <div id="bio-char-count">${currentBio.length}/100</div>
                    </div>
                    <div class="button-group">
                        <button type="submit" class="btn-submit">Simpan</button>
                        <button type="button" class="btn-link" id="cancel-bio">Batal</button>
                    </div>
                </form>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const newModal = document.getElementById('bio-modal');
        const form = document.getElementById('bioForm');
        const bioInput = document.getElementById('bio-input');
        const charCount = document.getElementById('bio-char-count');
        
        const closeModal = () => newModal.remove();
        newModal.querySelector('#cancel-bio').onclick = closeModal;
        newModal.addEventListener('click', (e) => {
            if (e.target.id === 'bio-modal') closeModal();
        });

        bioInput.addEventListener('input', () => {
            charCount.textContent = `${bioInput.value.length}/100`;
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newBio = bioInput.value;
            const submitButton = form.querySelector('.btn-submit');
            submitButton.disabled = true;
            submitButton.textContent = 'Menyimpan...';

            try {
                const userRef = db.collection('users').doc(currentUser.uid);
                await userRef.set({
                    bio: newBio,
                    oshi: localUserProfile.oshi || {}
                }, { merge: true });
                
                localUserProfile.bio = newBio; 
                if (window.appState && window.appState.currentUserProfile) {
                    window.appState.currentUserProfile.bio = newBio;
                }
                
                alert('Bio berhasil disimpan!');
                closeModal();
            } catch (error) {
                console.error("Gagal simpan bio:", error);
                alert('Gagal menyimpan bio.');
                submitButton.disabled = false;
                submitButton.textContent = 'Simpan';
            }
        });
    }

async function showOshiModal() {
        const currentUser = auth.currentUser;
        if (!currentUser || !membersLoaded) {
            alert('Data member belum dimuat. Coba lagi sesaat.');
            return;
        }

        const modalHTML = `
        <div class="modal-overlay active" id="oshi-modal">
            <div class="modal-box oshi-modal-box">
                <h2>Pilih Oshi</h2>
                <div class="oshi-modal-tabs">
                    <div class="oshi-modal-tab nogi active" data-group="nogi">Nogizaka46</div>
                    <div class="oshi-modal-tab saku" data-group="saku">Sakurazaka46</div>
                    <div class="oshi-modal-tab hina" data-group="hina">Hinatazaka46</div>
                    <div class="oshi-modal-tab boku" data-group="boku">BokuAo</div>
                </div>
                
                <div class="oshi-modal-filter">
                    <input type="checkbox" id="oshi-include-grad">
                    <label for="oshi-include-grad">Tambah dengan yang lulus</label>
                </div>
                
                <div class="oshi-modal-content nogi active" data-group="nogi"></div>
                <div class="oshi-modal-content saku" data-group="saku"></div>
                <div class="oshi-modal-content hina" data-group="hina"></div>
                <div class="oshi-modal-content boku" data-group="boku"></div>
                
                <p class="info">Klik untuk memilih Oshi. Klik kanan / Tap 2x untuk memilih Kamioshi (1 per grup).</p>

                <div class="button-group">
                    <button type="button" class="btn-submit" id="save-oshi">Simpan</button>
                    <button type="button" class="btn-link" id="cancel-oshi">Batal</button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const newModal = document.getElementById('oshi-modal');
        const tabs = newModal.querySelectorAll('.oshi-modal-tab');
        const contents = newModal.querySelectorAll('.oshi-modal-content');
        const gradCheckbox = document.getElementById('oshi-include-grad');
        
        let currentOshiPicks = JSON.parse(JSON.stringify(
            localUserProfile.oshi || {}
        ));
        
        let lastTap = 0;

        const renderMembers = (group) => {
            const memberList = localMemberData[group]; 
            const contentEl = newModal.querySelector(`.oshi-modal-content[data-group="${group}"]`);
            contentEl.innerHTML = ''; 
            
            const groupOshi = currentOshiPicks[group] || { kamioshi: null, oshi: [] };
            const includeGrads = gradCheckbox.checked;

            const filteredList = memberList.filter(member => {
                return (includeGrads) ? (member.status === 'aktif' || member.status === 'lulus') : member.status === 'aktif';
            });

            filteredList.forEach(member => {
                const item = document.createElement('div');
                item.className = `oshi-member-item ${group}`;
                item.dataset.id = member.id;
                
                item.innerHTML = `
                    <img src="${member.foto_profil}" alt="${member.nama_romaji}" class="oshi-member-photo">
                    <span class="oshi-member-name">${member.nama_romaji}</span>
                `;
                
                if (groupOshi.oshi.includes(member.id)) item.classList.add('selected');
                if (groupOshi.kamioshi === member.id) item.classList.add('kamioshi');

                const setKamioshi = (id) => {
                    if (!currentOshiPicks[group]) currentOshiPicks[group] = { kamioshi: null, oshi: [] };

                    const oldKamioshi = contentEl.querySelector(`.kamioshi`);
                    
                    if (currentOshiPicks[group].kamioshi === id) {
                        currentOshiPicks[group].kamioshi = null;
                        item.classList.remove('kamioshi');
                    } else {
                        if (oldKamioshi) oldKamioshi.classList.remove('kamioshi');
                        currentOshiPicks[group].kamioshi = id;
                        item.classList.add('kamioshi');
                        
                        if (!currentOshiPicks[group].oshi.includes(id)) {
                            currentOshiPicks[group].oshi.push(id);
                            item.classList.add('selected');
                        }
                    }
                };

                item.addEventListener('click', () => {
                    const now = new Date().getTime();
                    const timesince = now - lastTap;
                    
                    if ((timesince < 300) && (timesince > 0)) {
                        setKamioshi(item.dataset.id);
                        lastTap = 0; 
                    } else {
                        const id = item.dataset.id;
                        if (!currentOshiPicks[group]) currentOshiPicks[group] = { kamioshi: null, oshi: [] };
                        
                        const index = currentOshiPicks[group].oshi.indexOf(id);
                        if (index > -1) {
                            currentOshiPicks[group].oshi.splice(index, 1);
                            item.classList.remove('selected');
                            if (currentOshiPicks[group].kamioshi === id) {
                                currentOshiPicks[group].kamioshi = null;
                                item.classList.remove('kamioshi');
                            }
                        } else {
                            currentOshiPicks[group].oshi.push(id);
                            item.classList.add('selected');
                        }
                    }
                    lastTap = new Date().getTime();
                });
				
                item.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    setKamioshi(item.dataset.id);
                });

                contentEl.appendChild(item);
            });
        };

        renderMembers('nogi');

        gradCheckbox.addEventListener('change', () => {
            const activeGroup = newModal.querySelector('.oshi-modal-tab.active').dataset.group;
            renderMembers(activeGroup);
        });
		
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const group = tab.dataset.group;
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                newModal.querySelector(`.oshi-modal-content[data-group="${group}"]`).classList.add('active');                
                renderMembers(group);
            });
        });

        const closeModal = () => newModal.remove();
        newModal.querySelector('#cancel-oshi').onclick = closeModal;
        
        newModal.querySelector('#save-oshi').addEventListener('click', async (e) => {
            const submitButton = e.target;
            submitButton.disabled = true;
            submitButton.textContent = 'Menyimpan...';
            try {
                const userRef = db.collection('users').doc(currentUser.uid);
                await userRef.set({
                    oshi: currentOshiPicks,
                    bio: localUserProfile.bio || ''
                }, { merge: true });
                
                localUserProfile.oshi = currentOshiPicks;
                
                if (window.appState && window.appState.currentUserProfile) {
                    window.appState.currentUserProfile.oshi = currentOshiPicks;
                }
                
                alert('Oshi berhasil disimpan!');
                closeModal();
            } catch (error) {
                console.error("Gagal simpan oshi:", error);
                alert('Gagal menyimpan oshi.');
                submitButton.disabled = false;
                submitButton.textContent = 'Simpan';
            }
        });
    }
	
	async function showNotificationsPopup() {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const modalHTML = `
        <div class="modal-overlay active" id="notifications-modal">
            <div class="modal-box notifications-popup-box">
                <h2>Pemberitahuan</h2>
                <ul class="notifications-list">
                    <p class="notif-empty">Memuat...</p>
                </ul>
                <div class="button-group">
                    <button type="button" class="btn-link" id="cancel-notif">Tutup</button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const newModal = document.getElementById('notifications-modal');
        const listEl = newModal.querySelector('.notifications-list');
        const closeModal = () => newModal.remove();
        newModal.querySelector('#cancel-notif').onclick = closeModal;

        listEl.addEventListener('click', async (e) => {
            if (e.target.classList.contains('notif-delete-btn')) {
                e.preventDefault();
                const btn = e.target;
                const docId = btn.dataset.id;
                const li = btn.closest('li');
                btn.disabled = true;
                
                try {
                    await db.collection('users').doc(currentUser.uid).collection('notifications').doc(docId).delete();
                    li.remove();
                } catch (err) {
                    console.error("Gagal hapus notif:", err);
                    btn.disabled = false;
                }
            }
        });

        const cutOffDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

        try {
            const notifRef = db.collection('users').doc(currentUser.uid).collection('notifications');
            const snapshot = await notifRef.where('timestamp', '>', cutOffDate)
                                         .orderBy('timestamp', 'desc')
                                         .limit(20)
                                         .get();

            if (snapshot.empty) {
                listEl.innerHTML = '<p class="notif-empty">Tidak ada pemberitahuan baru.</p>';
                return;
            }

            listEl.innerHTML = '';
            
            const unreadDocs = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (!data.isRead) {
                    unreadDocs.push(doc);
                }
                const date = data.timestamp.toDate().toLocaleString('id-ID');
                const li = document.createElement('li');
                li.className = 'notification-item';
                li.innerHTML = `
                    <button class="notif-delete-btn" data-id="${doc.id}" title="Hapus">&times;</button>
                    <p>
                        <a href="#">${data.fromUserName}</a> membalas chatmu.
                    </p>
                    <a href="forum.html#${data.replyId}" class="notif-link">Lihat balasan</a>
                    <span class="notif-date"> - ${date}</span>
                `;
                li.querySelector('.notif-link').addEventListener('click', closeModal);
                listEl.appendChild(li);
            });
            
            if (unreadDocs.length > 0) {
                markNotificationsAsRead(unreadDocs);
            }
            
            deleteOldNotifications(notifRef, cutOffDate);

        } catch (error) {
            console.error("Gagal memuat notifikasi:", error);
            listEl.innerHTML = '<p class="notif-empty">Gagal memuat notifikasi.</p>';
        }
    }

    async function deleteOldNotifications(notifRef, cutOffDate) {
        try {
            const oldSnapshot = await notifRef.where('timestamp', '<=', cutOffDate).get();
            const batch = db.batch();
            oldSnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        } catch (error) {
            console.warn("Gagal menghapus notifikasi lama:", error);
        }
    }

	auth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const userRef = db.collection('users').doc(user.uid);
                const doc = await userRef.get();
                if (doc.exists) {
                    localUserProfile = doc.data();
                } else {
                    const defaultProfile = { bio: '', oshi: {} };
                    await userRef.set(defaultProfile);
                    localUserProfile = defaultProfile;
                }
            } catch (error) {
                console.error("Navbar.js: Gagal memuat profil user:", error);
                localUserProfile = { bio: '', oshi: {} };
            }
            await loadMemberDataForNav();
            
            await checkAccessStatus(user);
            setupNotificationListener(user.uid);

        } else {
            localUserProfile = { bio: '', oshi: {} };
            membersLoaded = false;
            
            await checkAccessStatus(null);
            
            if (notifListener) {
                notifListener();
                notifListener = null;
            }
            const badge = document.querySelector('.notif-badge');
            if (badge) badge.style.display = 'none';
        }
        
        renderNavbar(user);
    });

function showChatAccessPopup() {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            showLoginModal();
            return;
        }
        
        const docRef = db.collection('moechat').doc(currentUser.uid);
        renderAccessPopup(localChatAccessStatus, docRef);
    }
    
    function renderAccessPopup(status, docRef) {
        let modalHTML = '';
        const baseStart = `<div class="modal-overlay active" id="chat-access-modal"><div class="modal-box chat-access-modal">`;
        const baseEnd = `</div></div>`;
        
        switch(status) {
            case 'ok':
                modalHTML = `
                    <h2>✅ Akses Disetujui</h2>
                    <p>Kamu sudah bisa akses ke MoeChat.</p>
                    <div class="button-group">
                        <button type="button" class="btn-submit" id="access-chat-btn">Akses</button>
                        <button type="button" class="btn-link" id="cancel-access-btn">Tutup</button>
                    </div>`;
                break;
            case 'wait':
                modalHTML = `
                    <h2>⏳ Akses Masih Pending</h2>
                    <p>Request-mu telah dikirim. Admin akan meninjau manual. Jika > 24 jam, hubungi admin via IG.</p>
                    <div class="button-group">
                        <button type="button" class="btn-link" id="cancel-request-btn">Batalkan</button>
                    </div>`;
                break;
            case 'no':
                modalHTML = `
                    <h2>❌ Akses Ditolak</h2>
                    <p>Maaf, request kamu untuk masuk ke MoeChat ditolak.</p>
                    <div class="button-group">
                        <button type="button" class="btn-link" id="cancel-access-btn">Tutup</button>
                    </div>`;
                break;
            case 'cancelled':
                modalHTML = `
                    <h2>Request Dibatalkan</h2>
                    <p>Kamu telah membatalkan request.</p>
                    <div class="button-group">
                        <button type="button" class="btn-link" id="cancel-access-btn">Tutup</button>
                    </div>`;
                break;
            default:
                modalHTML = `
                    <h2>Akses Dibatasi</h2>
                    <p>Akses ke MoeChat dibatasi. Kamu bisa minta request agar bisa join dengan menekan tombol di bawah ini.</p>
                    <div class="button-group">
                        <button type="button" class="btn-submit" id="request-access-btn">Request</button>
                        <button type="button" class="btn-link" id="cancel-access-btn">Tutup</button>
                    </div>`;
                break;
        }

        const fullHTML = baseStart + modalHTML + baseEnd;
        
        const oldModal = document.getElementById('chat-access-modal');
        if (oldModal) oldModal.remove();
        
        document.body.insertAdjacentHTML('beforeend', fullHTML);
        
        const newModal = document.getElementById('chat-access-modal');
        
        const closeModal = () => newModal.remove();
        
        newModal.addEventListener('click', (e) => {
            if (e.target.id === 'chat-access-modal') closeModal();
        });
        
        const cancelBtn = newModal.querySelector('#cancel-access-btn');
        if (cancelBtn) cancelBtn.onclick = closeModal;
        
        const accessBtn = newModal.querySelector('#access-chat-btn');
        if (accessBtn) accessBtn.onclick = () => window.location.href = 'forum.html';

        const requestBtn = newModal.querySelector('#request-access-btn');
        if (requestBtn) requestBtn.onclick = async () => {
            requestBtn.disabled = true;
            requestBtn.textContent = 'Requesting...';
            try {
                await docRef.set({
                    email: auth.currentUser.email,
                    displayName: auth.currentUser.displayName,
                    status: 'wait'
                });
            } catch (err) {
                console.error("Gagal request akses:", err);
                renderAccessPopup(null, docRef);
            }
        };

        const cancelRequestBtn = newModal.querySelector('#cancel-request-btn');
        if (cancelRequestBtn) cancelRequestBtn.onclick = async () => {
            cancelRequestBtn.disabled = true;
            cancelRequestBtn.textContent = 'Membatalkan...';
            try {
                await docRef.delete();
                renderAccessPopup('cancelled', docRef);
            } catch (err) {
                console.error("Gagal batal request:", err);
                renderAccessPopup('wait', docRef);
            }
        };
    }
	
	function renderNavbar(user) {
        const oldHeader = document.getElementById('main-header');
        if (oldHeader) {
            oldHeader.remove();
        }

        let userGreetingHTML = '';
        if (user) {
            const displayName = user.displayName || user.email;
            const photoURL = user.photoURL || 'https://via.placeholder.com/150?text=?';
            
            userGreetingHTML = `
                <li class="nav-item has-submenu nav-greeting">
                    <a href="#" class="submenu-toggle">Halo, <span id="navbar-username-display">${displayName}</span> <span class="arrow"></span></a>
                    <img src="${photoURL}" alt="Profil" class="navbar-profile-img submenu-toggle">
                    
                    <span class="notif-badge"></span>
                    
                    <ul class="submenu">
                        <li><a href="#" id="change-username-btn">Ganti Username</a></li>
                        <li><a href="#" id="edit-bio-btn">Bio</a></li>
                        <li><a href="#" id="edit-oshi-btn">Pilih Oshi</a></li>
                        <li><a href="#" id="notifications-btn">Pemberitahuan</a></li>
                        <li><a href="#" id="logout-btn">Logout</a></li>
                    </ul>
                </li>`;
        } else {
            // userGreetingHTML = `<li class="nav-item"><a href="#" id="login-btn">Login</a></li>`;
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
						<li class="nav-item"><a href="../sitemap.html">SITEMAP</a></li>
						<li class="nav-item has-submenu">
							<a href="#" class="submenu-toggle">MV <span class="arrow"></span></a>
							<ul class="submenu">
								<li><a href="../moedownload/sub-mv-nogizaka46.html">Nogizaka46</a></li>
								<li><a href="../moedownload/sub-mv-48-46.html">Sakamichi</a></li>
								<li><a href="../moedownload/sub-mv-bokuao.html">BokuAo</a></li>
								<li><a href="../moedownload/sub-mv-random.html">Random J-Pop</a></li>
							</ul>
						</li>
                        <li class="nav-item"><a href="../moedata/">DB</a></li>
						<li class="nav-item has-submenu">
							<a href="#" class="submenu-toggle">OTHER <span class="arrow"></span>
							</a>
							<ul class="submenu">
								<li><a href="../moedownload/folder-icon.html">Folder Icon</a></li>
								<li><a href="../moemagz/magazine-translation.html">Magazine</a></li>
								<li><a href="../moeplay/moeplay-chord.html">Chord</a>
								<li><a href="https://moefangsubs.github.io/n46-idlist/" target="_blank">Masterlist</a></li>
							</ul>
						</li>
						<li class="nav-item"><a href="../moeplay/">PLAY</a></li>
                        <!-- <li class="nav-item"><a href="../forum.html" id="nav-chat-link">CHAT</a></li> -->
                        <li class="nav-item"><a href="#" id="nav-chat-link">CHAT</a></li>
						${userGreetingHTML}
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
		
        header.addEventListener('click', (e) => {
            const target = e.target;
            const isProfileToggle = target.classList.contains('navbar-profile-img') && target.classList.contains('submenu-toggle');
            
            const link = target.closest('a');
            
            if (link && link.classList.contains('submenu-toggle') && window.matchMedia("(max-width: 992px)").matches) {
                e.preventDefault();
                link.parentElement.classList.toggle('active');
            }
            if (isProfileToggle && window.matchMedia("(min-width: 993px)").matches) {
                e.preventDefault();
                target.parentElement.classList.toggle('active');
            }

            const actionId = link ? link.id : (isProfileToggle ? null : (target.closest('[id]') ? target.closest('[id]').id : null));

            switch(actionId) {
                case 'change-username-btn':
                    e.preventDefault();
                    showChangeUsernameModal();
                    break;
                case 'logout-btn':
                    e.preventDefault();
                    showLogoutConfirm();
                    break;
                case 'edit-bio-btn':
                    e.preventDefault();
                    showBioModal();
                    break;
                case 'edit-oshi-btn':
                    e.preventDefault();
                    showOshiModal();
                    break;
                case 'notifications-btn':
                    e.preventDefault();
                    showNotificationsPopup();
                    break;
                // case 'nav-chat-link':
                    // e.preventDefault();
                    // if (localIsAdmin) {
                        // window.location.href = '../forum.html';
                    // } else {
                        // showChatAccessPopup();
                    // }
                    // break;
				case 'nav-chat-link':
                    e.preventDefault();
                    showConstructionPopup();
                    break;
            }

            if (link && (link.getAttribute('href') === '#' || link.getAttribute('href') === '')) {
                const isFunctional = link.classList.contains('submenu-toggle') || 
                                     ['change-username-btn', 'logout-btn', 'edit-bio-btn', 'edit-oshi-btn', 'notifications-btn'].includes(link.id);
                if (!isFunctional) {
                    e.preventDefault();
                    showConstructionPopup();
                }
            }
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