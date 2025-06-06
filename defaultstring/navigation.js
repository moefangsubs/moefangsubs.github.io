// navigation.js
document.write(`


<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="../defaultstring/style_searchbox.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=menu" />
	<link rel="stylesheet" href="style_header.css">
	<title>Responsive Navbar</title>
</head>

<body>
<nav class="navbar">
	<div class="hamburger">
	<span class="material-symbols-outlined" onclick="toggleSidebar()">menu</span>
	</div>
	
	
	<a href="../sitemap.html">
<div class="logo-container">
	<div class="clip">
	<img src="../sprite/logonew2024.svg" alt="Logo" class="logo" />
	<div class="shine"></div>
	</div>
</div>

</a>
	<ul class="nav-links">
	<li class="navdropdown">
		<a href="#">MV</a>
		<div class="navsubmenu">
		<a href="../pages/mv-hardsubs.html">Nogizaka46</a>
		<a href="../pages/mv-hardsubs-48-46.html">48G & Sakamichi</a>
		<a href="../pages/mv-hardsubs-bokuao.html">BokuAo</a>
		</div>
	</li>
	<li class="navdropdown">
		<a href="#">TRANSLATION</a>
		<div class="navsubmenu">
		<a href="#">Blog</a>
		<a href="../pages/magazine-translation.html">Magazine</a>
		</div>
	</li>
	<li><a href="../pages/chord.html">Chord</a></li>
	<li><a href="../pages/database.html">DB</a></li>
	<li class="navdropdown">
		<a href="#">OTHER</a>
		<div class="navsubmenu">
		<a href="../pages/folder-icon.html">Folder Icon</a>
		<a href="../pages/fansub-list.html">Fansub List</a>
		<a href="../pages/color-palette.html">Color Palette</a>
		<a href="#">MASTERLIST</a>
		</div>
	</li>
	<li class="navdropdown">
		<a href="#">GAME!</a>
		<div class="navsubmenu">
		<a href="../pages/cek-khodam.html">Check Khodam</a>
		<a href="../pages/intro-quiz.html">Intro Quiz</a>
		</div>
	</li>
	<a class="floatingButton searchbar"><img src="../sprite/search.svg" alt="Search" class="search-icon"></a>
	</ul>
</nav>

<!-- Sidebar Menu -->
<div class="sidebar" id="sidebar">
	<ul class="nav-links">
	<li><a href="#">Sitemap</a></li>
	
	<li class="dropdown">
		<a href="#" onclick="toggleDropdown(event)">MV Subs</a>
		<div class="submenu">
		<a href="../pages/mv-hardsubs.html">Nogizaka46</a>
		<a href="../pages/mv-hardsubs-48-46.html">48G & Sakamichi</a>
		<a href="../pages/mv-hardsubs-bokuao.html">BokuAo</a>
		</div>
	</li>
	
	<li class="dropdown">
		<a href="#" onclick="toggleDropdown(event)">Translation</a>
		<div class="submenu">
		<a href="#">Blog</a>
		<a href="../pages/magazine-translation.html">Magazine</a>
		</div>
	</li>
	
	<li><a href="../pages/chord.html">Chord</a></li>
	<li><a href="../pages/database.html">Database</a></li>
	<li class="dropdown">
		<a href="#" onclick="toggleDropdown(event)">Other</a>
		<div class="submenu">
		<a href="../pages/folder-icon.html">Folder Icon</a>
		<a href="../pages/fansub-list.html">Fansub List</a>
		<a href="../pages/color-palette.html">Color Palette</a>
		</div>
	</li>
	<li class="dropdown">
		<a href="#" onclick="toggleDropdown(event)">Game!</a>
		<div class="submenu">
		<a href="../pages/cek-khodam.html">Check Khodam</a>
		<a href="../pages/intro-quiz.html">Intro Quiz</a>
		</div>
	</li>
	
	<li><a href="#">Masterlist</a></li>
	 <a class="floatingButton"><img src="../sprite/search.svg" alt="Search" class="search-icon"></a>
	</ul>
</div>


	<div id="popup" class="popup">
			<div class="search-container">
				<div class="category-search">
					<br/>				
						<div class="search-container">
						<div class="search-box">
						<span class="searchtitle">SEARCH BOX</span>
						<div class="carinote">Pusing mencari garapan? Ketik aja disini judulnya.</div>
						<input type="text" id="search-input" placeholder="Search...">
						</div>
						</div>
						<div id="results"></div>
			</div>
			</div>
	</div>
<!-- JavaScript for Sidebar and Dropdown Toggle -->
<script src="../defaultstring/search.js"></script>
<script src="../defaultstring/searchdata.js"></script>

<script>
 // Toggle Sidebar for Mobile Menu
function toggleSidebar() {
	const sidebar = document.getElementById('sidebar');
	sidebar.classList.toggle('active');
}

// Toggle Dropdown for Submenu
function toggleDropdown(event) {
	event.preventDefault();

	// Tutup semua dropdown lain terlebih dahulu
	document.querySelectorAll('.dropdown').forEach(dropdown => {
	if (dropdown !== event.target.parentElement) {
		dropdown.classList.remove('active');
	}
	});

	// Buka dropdown yang diklik
	const dropdown = event.target.parentElement;
	dropdown.classList.toggle('active');
}

// Close Sidebar and Dropdowns when clicking outside (for better UX)
document.addEventListener('click', function(event) {
	const sidebar = document.getElementById('sidebar');
	const hamburger = document.querySelector('.hamburger');
	const clickedInsideSidebar = sidebar.contains(event.target) || hamburger.contains(event.target);

	if (!clickedInsideSidebar) {
	sidebar.classList.remove('active'); // Close sidebar
	document.querySelectorAll('.dropdown').forEach(dropdown => {
		dropdown.classList.remove('active'); // Close all dropdowns
	});
	}
});
</script>

<script>
function changeCss() {
	var navElement = document.querySelector(".navbar");
	var logoElement = document.querySelector(".logo");
	var searchElement = document.querySelector(".searchbar");
	
	// Cek apakah halaman adalah sitemap.html
	var isSitemapPage = window.location.pathname.endsWith("sitemap.html");

	if (window.scrollY > 100) {
		navElement.classList.add("navbar-scrolled");
		logoElement.classList.add("logo-scrolled");
		searchElement.classList.add("searchbar-scrolled");

		if (!isSitemapPage) {
			navElement.classList.add("navbar-centered"); // Tambahkan kelas untuk memastikan posisi tengah
		} else {
			navElement.classList.remove("navbar-centered");
		}
	} else {
		navElement.classList.remove("navbar-scrolled");
		logoElement.classList.remove("logo-scrolled");
		searchElement.classList.remove("searchbar-scrolled");
		navElement.classList.remove("navbar-centered");
	}
}

// Tambahkan event listener untuk memanggil fungsi saat scroll
window.addEventListener("scroll", changeCss);





</script>
<script>
document.addEventListener('DOMContentLoaded', function() {
	const floatingButtons = document.querySelectorAll('.floatingButton');
	const popup = document.getElementById('popup');

	floatingButtons.forEach(button => {
		button.addEventListener('click', function() {
			popup.classList.add('show');
		});
	});

	popup.addEventListener('click', function(event) {
		if (event.target === popup) {
			popup.classList.remove('show');
		}
	});
});


</script>
</body>

</html>
`);
