// HANYA UNTUK NOGIZAKA SKITS

document.addEventListener("DOMContentLoaded", function () {
  const episodelistButtons = document.querySelectorAll(".buttonEpsList");

  function updateSongDescriptions(episodeNumber) {
    const updateDescription = (id, content) => {
      document.getElementById(id).innerHTML = content !== "" ? "<i class='fas fa-theater-masks'></i>　" + content : "";
    };

    updateDescription("deskripsiSkitsA", descSkitsA[episodeNumber]);
    updateDescription("deskripsiSkitsB", descSkitsB[episodeNumber]);
  }

  episodelistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const episodeNumber = button.getAttribute("data-episode");
      // Display song descriptions
      updateSongDescriptions(episodeNumber);
    });
  });
});
