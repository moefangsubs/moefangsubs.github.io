document.addEventListener("DOMContentLoaded", function() {
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

