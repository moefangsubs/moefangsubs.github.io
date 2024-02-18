document.addEventListener("DOMContentLoaded", function() {
  const episodelistButtons = document.querySelectorAll(".episodelist");

  episodelistButtons.forEach(button => {
    button.addEventListener("click", function() {
      const episodeNumber = button.getAttribute("data-episode");
		document.getElementById("deskripsiBahasaSub").innerHTML = subLanguage[episodeNumber] !== "" ? "<i class='fas fa-closed-captioning'></i>　" + subLanguage[episodeNumber] : "";
		document.getElementById("deskripsiPassword").innerHTML = filePassword[episodeNumber] !== "" ? "<i class='fas fa-lock fa-fade' style='--fa-animation-duration: 1s;'></i>　" + filePassword[episodeNumber] : "";
		
    });
  });
  });