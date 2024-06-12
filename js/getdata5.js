document.addEventListener("DOMContentLoaded", function() {
  const episodelistButtons = document.querySelectorAll(".episodelist");

  episodelistButtons.forEach(button => {
    button.addEventListener("click", function() {
      const episodeNumber = button.getAttribute("data-episode");
		document.getElementById("deskripsiguest").innerHTML = guestArtis[episodeNumber] !== "" ? "<i class='fas fa-user-check'></i>　" + guestArtis[episodeNumber] : "";
		document.getElementById("deskripsisenpai").innerHTML = guestSenpai[episodeNumber] !== "" ? "<i class='fas fa-user-circle'></i>　" + guestSenpai[episodeNumber] : "";
    });
  });
  });