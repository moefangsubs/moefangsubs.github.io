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
        case "nogidouga-nogizaka-burari":
            targetEpisode = "09";
            break;
        case "live-performance":
            targetEpisode = "01";
            break;
        case "chou-nogizaka-star-tanjou":
            targetEpisode = "40";
            break;
        case "nogizaka-otameshichuu":
            targetEpisode = "35";
            break;
        // Tambahkan case sesuai dengan nama file HTML lainnya
    }

    // Inisialisasi episode
    initializeEpisode(targetEpisode);
});
