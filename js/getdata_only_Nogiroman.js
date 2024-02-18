// HANYA UNTUK NOGI ROMANCE

document.addEventListener("DOMContentLoaded", function() {
  const episodelistButtons = document.querySelectorAll(".buttonEpsList");

  episodelistButtons.forEach(button => {
    button.addEventListener("click", function() {
      const episodeNumber = button.getAttribute("data-episode");
      // Display song descriptions
		document.getElementById("NamaSastra").innerHTML = LiteraturName[episodeNumber] !== "" ? "<i class='fas fa-book-open'></i>　" + LiteraturName[episodeNumber] : "";
		document.getElementById("PengarangSastra").innerHTML = LiteraturAuthor[episodeNumber] !== "" ? "<i class='fas fa-pen-nib'></i>　" + LiteraturAuthor[episodeNumber] : "";
   });
  });
  });