// HANYA UNTUK GOURMET NO SAKAMICHI

document.addEventListener("DOMContentLoaded", function() {
  const episodelistButtons = document.querySelectorAll(".buttonEpsList");

  episodelistButtons.forEach(button => {
    button.addEventListener("click", function() {
      const episodeNumber = button.getAttribute("data-episode");
      // Display song descriptions
		document.getElementById("RestoNama").innerHTML = RestoName[episodeNumber] !== "" ? "<i class='fas fa-map-marker-alt'></i>　" + RestoName[episodeNumber] : "";
		document.getElementById("RestoAlamat").innerHTML = RestoAdd[episodeNumber] !== "" ? "<i class='fas fa-map'></i>　" + RestoAdd[episodeNumber] : "";
   });
  });
  });