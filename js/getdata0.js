document.addEventListener("DOMContentLoaded", function() {
  const episodelistButtons = document.querySelectorAll(".episodelist");

  episodelistButtons.forEach(button => {
    button.addEventListener("click", function() {
      const episodeNumber = button.getAttribute("data-episode");
      document.getElementById("descEpisode").textContent = descEpisode[episodeNumber];
      document.getElementById("descOnAirDate").innerHTML = "<i class='fas fa-calendar-alt'></i>　" + descOnAirDate[episodeNumber];
      document.getElementById("descEpisodeSynopsis").textContent = descEpisodeSynopsis[episodeNumber];
	  
      // Update episode number for buttons
      const episodeNogiButtons = document.querySelectorAll(".episode_nogi");
      episodeNogiButtons.forEach(nogiButton => {
        nogiButton.setAttribute("data-episode", episodeNumber);
      });
	 
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const episodelistButtons = document.querySelectorAll(".episodelist");

  episodelistButtons.forEach(button => {
    button.addEventListener("click", function() {
      const episodeNumber = button.getAttribute("data-episode");
      document.getElementById("imageThumbBig").src = imageThumbBig[episodeNumber];
      document.getElementById("imageThumbA").src = imageThumbA[episodeNumber];
      document.getElementById("imageThumbB").src = imageThumbB[episodeNumber];
      document.getElementById("imageThumbC").src = imageThumbC[episodeNumber];
      document.getElementById("imageThumbD").src = imageThumbD[episodeNumber];
	 
    });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  const episodelistButtons = document.querySelectorAll(".episodelist");

  episodelistButtons.forEach(button => {
    button.addEventListener("click", function() {
      const episodeNumber = button.getAttribute("data-episode");
      document.getElementById("imageThumbX").src = imageThumbX[episodeNumber];
	 
    });
  });
});

