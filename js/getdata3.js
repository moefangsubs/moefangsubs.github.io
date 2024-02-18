document.addEventListener("DOMContentLoaded", function () {
  const episodelistButtons = document.querySelectorAll(".buttonEpsList");

  function updateSongDescriptions(episodeNumber) {
    const updateDescription = (id, content) => {
      document.getElementById(id).innerHTML = content !== "" ? "<i class='fas fa-music'></i>　" + content : "";
    };

    updateDescription("deskripsilagu1", descSong1[episodeNumber]);
    updateDescription("deskripsilagu2", descSong2[episodeNumber]);
    updateDescription("deskripsilagu3", descSong3[episodeNumber]);
    updateDescription("deskripsilagu4", descSong4[episodeNumber]);
    updateDescription("deskripsilagu5", descSong5[episodeNumber]);
    updateDescription("deskripsilagu6", descSong6[episodeNumber]);
    updateDescription("deskripsilagu7", descSong7[episodeNumber]);
  }

  episodelistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const episodeNumber = button.getAttribute("data-episode");
      // Display song descriptions
      updateSongDescriptions(episodeNumber);
    });
  });
});
