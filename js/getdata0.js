document.addEventListener("DOMContentLoaded", function() {
  const episodelistButtons = document.querySelectorAll(".episodelist");

  episodelistButtons.forEach(button => {
    button.addEventListener("click", function() {
      const episodeNumber = button.getAttribute("data-episode");
      document.getElementById("descEpisode").textContent = descEpisode[episodeNumber];
      document.getElementById("descOnAirDate").innerHTML = "<i class='fas fa-calendar-alt'></i>　" + descOnAirDate[episodeNumber];
      document.getElementById("descEpisodeSynopsis").textContent = descEpisodeSynopsis[episodeNumber];


      // Display thumbnails
      document.getElementById("imageThumbBig").src = imageThumbBig[episodeNumber];
      document.getElementById("imageThumbA").src = imageThumbA[episodeNumber];
      document.getElementById("imageThumbB").src = imageThumbB[episodeNumber];
      document.getElementById("imageThumbC").src = imageThumbC[episodeNumber];
      document.getElementById("imageThumbD").src = imageThumbD[episodeNumber];
	  
      // Update episode number for buttons
      const episodeNogiButtons = document.querySelectorAll(".episode_nogi");
      episodeNogiButtons.forEach(nogiButton => {
        nogiButton.setAttribute("data-episode", episodeNumber);
      });

      // Display song descriptions
		// document.getElementById("deskripsijudul").innerHTML = nameShow[episodeNumber] !== "" ? "<i class='fas fa-film'></i>　" + nameShow[episodeNumber] : "";
		// document.getElementById("deskripsimember").innerHTML = memberParticipate[episodeNumber] !== "" ? "<i class='fas fa-user-friends'></i>　" + memberParticipate[episodeNumber] : "";
		// document.getElementById("deskripsiSkits").innerHTML = descSkits[episodeNumber] !== "" ? "<i class='fas fa-theater-masks'></i>　" + descSkits[episodeNumber] : "";
		// document.getElementById("deskripsilagu1").innerHTML = descSong1[episodeNumber] !== "" ? "<i class='fas fa-music'></i>　" + descSong1[episodeNumber] : "";
		// document.getElementById("deskripsilagu2").innerHTML = descSong2[episodeNumber] !== "" ? "<i class='fas fa-music'></i>　" + descSong2[episodeNumber] : "";
		// document.getElementById("deskripsilagu3").innerHTML = descSong3[episodeNumber] !== "" ? "<i class='fas fa-music'></i>　" + descSong3[episodeNumber] : "";


		
    });
  });

const episodeNogiButtons = document.querySelectorAll(".episode_nogi");

  episodeNogiButtons.forEach(button => {
    button.addEventListener("click", function() {
      const episodeNumber = button.getAttribute("data-episode");
      const linkType = button.getAttribute("data-link-type");
      const link = eval(linkType)[episodeNumber];
      if (link) {
        window.open(link, "_blank");
      } else {
        console.error("Link not found for episode " + episodeNumber);
      }
    });
  });
});

