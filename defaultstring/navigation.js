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
        <a href="../pages/mv-hardsubs.html">Sakamichi</a>
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
    <li class="navdropdown">
      <a href="#">MOE DATA</a>
      <div class="navsubmenu">
        <a href="../pages/senbatsu-formation-nogizaka46.html">Senbatsu Formation</a>
        <a href="../pages/nogizaka46-senbatsu-and-under-center.html">Senbatsu & Under Center</a>
        <a href="../pages/nogizaka46-member-graph.html">Member Graph</a>
        <a href="../pages/nogizaka46-song-abbreviation.html">Song Abbreviation</a>
        <a href="../pages/sakamichi-penlight.html">Sakamichi Penlight</a>
        <a href="../pages/member-calendar.html">Member Calendar</a>
      </div>
    </li>
    <li class="navdropdown">
      <a href="#">OTHER</a>
      <div class="navsubmenu">
        <a href="../pages/folder-icon.html">Folder Icon</a>
        <a href="../pages/fansub-list.html">Fansub List</a>
        <a href="../pages/color-palette.html">Color Palette</a>
        <a href="../pages/cek-khodam.html">Check Khodam</a>
		<a href="#">MASTERLIST</a>
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
      <a href="#" onclick="toggleDropdown(event)">MV SUBS</a>
      <div class="submenu">
        <a href="../pages/mv-hardsubs.html">Sakamichi</a>
        <a href="../pages/mv-hardsubs-bokuao.html">BokuAo</a>
      </div>
    </li>
    
    <li class="dropdown">
      <a href="#" onclick="toggleDropdown(event)">TRANSLATION</a>
      <div class="submenu">
        <a href="#">Blog</a>
        <a href="../pages/magazine-translation.html">Magazine</a>
      </div>
    </li>
    
    <li><a href="../pages/chord.html">Chord</a></li>
    
    <li class="dropdown">
      <a href="#" onclick="toggleDropdown(event)">MOE DATA</a>
      <div class="submenu">
        <a href="../pages/senbatsu-formation-nogizaka46.html">Senbatsu Formation</a>
        <a href="../pages/nogizaka46-senbatsu-and-under-center.html">Senbatsu & Under Center</a>
        <a href="../pages/nogizaka46-member-graph.html">Member Graph</a>
        <a href="../pages/nogizaka46-song-abbreviation.html">Song Abbreviation</a>
        <a href="../pages/sakamichi-penlight.html">Sakamichi Penlight</a>
        <a href="../pages/member-calendar.html">Member Calendar</a>
      </div>
    </li>
    
    <li class="dropdown">
      <a href="#" onclick="toggleDropdown(event)">OTHER</a>
      <div class="submenu">
        <a href="../pages/folder-icon.html">Folder Icon</a>
        <a href="../pages/fansub-list.html">Fansub List</a>
        <a href="../pages/color-palette.html">Color Palette</a>
        <a href="../pages/cek-khodam.html">Check Khodam</a>
      </div>
    </li>
    
    <li><a href="#">MASTERLIST</a></li>
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

        // Hanya tambahkan margin dan transform jika bukan di halaman sitemap.html
        if (!isSitemapPage) {
            navElement.style.margin = "0 auto";
            navElement.style.transform = "translate(15%, 3%)";
        } else {
            // Jika di halaman sitemap, hilangkan margin dan transform
            navElement.style.margin = "0";
            navElement.style.transform = "none";
        }
    } else {
        navElement.classList.remove("navbar-scrolled");
        logoElement.classList.remove("logo-scrolled");
        searchElement.classList.remove("searchbar-scrolled");
        navElement.style.margin = "";
        navElement.style.transform = "";
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
