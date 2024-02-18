document.addEventListener("DOMContentLoaded", function() {
  const episodelistButtons = document.querySelectorAll(".buttonEpsList");

  episodelistButtons.forEach(button => {
    button.addEventListener("click", function() {
      const episodeNumber = button.getAttribute("data-episode");
      // Display song descriptions
		document.getElementById("deskripsijudul").innerHTML = nameShow[episodeNumber] !== "" ? "<i class='fas fa-film'></i>　" + nameShow[episodeNumber] : "";
		document.getElementById("deskripsimember").innerHTML = memberParticipate[episodeNumber] !== "" ? "<i class='fas fa-user-friends'></i>　" + memberParticipate[episodeNumber] : "";
		document.getElementById("deskripsiSkits").innerHTML = descSkits[episodeNumber] !== "" ? "<i class='fas fa-theater-masks'></i>　" + descSkits[episodeNumber] : "";
   });
  });
  });