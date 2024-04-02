// script.js

function initializeEpisode(targetEpisode) {
    var episodeElement = document.querySelector('.episodelist[data-episode="' + targetEpisode + '"]');
    
    if (episodeElement) {
        episodeElement.scrollIntoView();
        episodeElement.click();

        episodeElement.classList.add('clicked');

        var imgElement = episodeElement.querySelector('img');
        if (imgElement) {
            imgElement.classList.add('clicked');
        }

        var spanElement = episodeElement.querySelector('.epsbadgeNew');
        if (spanElement) {
            spanElement.classList.remove('clicked-width-height');
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Mendapatkan nama file HTML
    var currentFileName = window.location.pathname.split("/").pop().split(".")[0];

    // Menentukan episode berdasarkan nama file HTML
    var targetEpisode;
    
    switch (currentFileName) {
        case "nogizaka-otameshichuu":
            targetEpisode = "35";
            break;
        case "asahi-otonasenbatsu":
            targetEpisode = "01";
            break;
        case "utabangumi-cdtv":
            targetEpisode = "01";
            break;
        case "utabangumi-music-on-tv":
            targetEpisode = "01";
            break;
        case "utabangumi-music-station":
            targetEpisode = "01";
            break;
        case "utabangumi-best-artist":
            targetEpisode = "01";
            break;
        case "utabangumi-sound-inn":
            targetEpisode = "01";
            break;
        case "nogikoi-watashitachi-no-girls-rule":
            targetEpisode = "01";
            break;
        case "sakukoi-shiranai-sekai-no-hajimari":
            targetEpisode = "01";
            break;
        case "hinakoi-imechun":
            targetEpisode = "01";
            break;
        case "nogizaka-skits-bd-2":
            targetEpisode = "01";
            break;
        case "compilation":
            targetEpisode = "01";
            break;
        // Tambahkan case sesuai dengan nama file HTML lainnya
    }

    // Inisialisasi episode
    initializeEpisode(targetEpisode);
});
