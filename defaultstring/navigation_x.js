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
