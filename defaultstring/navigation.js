// navigation.js
document.write(`
<!DOCTYPE html>
<!-- Created By CodingNepal - www.codingnepalweb.com -->
<html lang="en" dir="ltr">

<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="style.css">
	<!-- Boxicons CDN Link -->
	<link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
	<link href='style_header.css' rel='stylesheet'>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"> </head>

<body>
	<nav>
		<div class="navbar"> <i class='bx bx-menu'></i>
			<div class="logo">
				<a href="../index.html"><img src="https://ik.imagekit.io/moearchive/logo-moefang2.png" alt="Moefang Logo"></a>
			</div>
			<div class="nav-links">
				<div class="sidebar-logo"> <span class="logo-name">MOEFANG SUBS</span> <i class='bx bx-x'></i> </div>
				<ul class="links">
					<li><a href="../sitemap.html">SITE MAP</a></li>
					<li><a href="../pages/mv-hardsubs.html">MV SUBS</a></li>
					<li> <a href="../503.html">TRANSLATION</a> <i class='bx bxs-chevron-down htmlcss-arrow arrow  '></i>
						<ul class="htmlCss-sub-menu sub-menu">
							<li><a href="../pages/magazine-translation.html">MAGAZINE TRANSLATION</a></li>
							<li><a href="../503.html">BLOG TRANSLATION</a></li>
						</ul>
					</li>
					<li><a href="../pages/chord.html">PIANO CHORD</a></li>
					<li> <a href="#">MOE DATA</a> <i class='bx bxs-chevron-down htmlcss-arrow arrow  '></i>
						<ul class="htmlCss-sub-menu sub-menu">
							<!-- <li><a href="../pages/fansub-list.html">FANSUB LIST</a></li> -->
							<li><a href="../pages/senbatsu-formation-nogizaka46.html">乃 SENBATSU FORMATION</a></li>
							<li><a href="../pages/nogizaka46-senbatsu-and-under-center.html">乃 SENBATSU & UNDER CENTER</a></li>
							<li><a href="../pages/nogizaka46-member-graph.html">乃 MEMBER GRAPH</a></li>
							<li><a href="../pages/nogizaka46-song-abbreviation.html">乃 SONG ABBREVIATION</a></li>
							<li><a href="../pages/sakamichi-penlight.html">◢ SAKAMICHI PENLIGHT</a></li>
							<li><a href="../pages/member-calendar.html">MEMBER CALENDAR</a></li>
							<!-- <li class="more"> <span><a href="#">MOE DATA</a> -->
							<!-- <i class='bx bxs-chevron-right arrow more-arrow'></i> -->
							<!-- </span> -->
								<!-- <ul class="more-sub-menu sub-menu"> -->
									<!-- <li><a href="../pages/senbatsu-formation-nogizaka46.html">乃 SENBATSU FORMATION</a></li> -->
									<!-- <li><a href="../pages/nogizaka46-senbatsu-and-under-center.html">乃 SENBATSU & UNDER CENTER</a></li> -->
									<!-- <li><a href="../pages/nogizaka46-member-graph.html">乃 MEMBER GRAPH</a></li> -->
									<!-- <li><a href="../pages/nogizaka46-song-abbreviation.html">乃 SONG ABBREVIATION</a></li> -->
									<!-- <li><a href="../pages/sakamichi-penlight.html">◢ SAKAMICHI PENLIGHT</a></li> -->
									<!-- <li><a href="../pages/member-calendar.html">MEMBER CALENDAR</a></li> -->
								<!-- </ul> -->
							<!-- </li> -->
						</ul>
					</li>
					<li> <a href="#">OTHER</a> <i class='bx bxs-chevron-down htmlcss-arrow arrow  '></i>
						<ul class="htmlCss-sub-menu sub-menu">
							<!-- <li><a href="../pages/fansub-list.html">FANSUB LIST</a></li> -->
							<li><a href="../pages/folder-icon.html">FOLDER ICON</a></li>
							<li><a href="../pages/fansub-list.html">FANSUB LIST</a></li>
						</ul>
					</li>
					<li><a href="../pages/color-palette.html">COLOR PALETTE</a></li>
					<li><a href="https://moefangsubs.github.io/n46-idlist/">MASTERLIST</a></li>
				</ul>
			</div>
			<div> </div>
		</div>
	</nav>
	<script>

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}


// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
 navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function() {
 navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function() {
 navLinks.classList.toggle("show3");
}
  </script>
</body>
</html>
`);
