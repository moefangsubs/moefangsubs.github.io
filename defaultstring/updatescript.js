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
    var currentFileName = window.location.pathname.split("/").pop().split(".")[0];
    var targetEpisode;

    var urlParams = new URLSearchParams(window.location.search);
    var episodeParam = urlParams.get('episode');

    if (episodeParam) {
        targetEpisode = episodeParam;
    } else {
        switch (currentFileName) {
        // case "nogizaka-otameshichuu":
            // targetEpisode = "40";
            // break;
        case "live-performance":
            targetEpisode = "55";
            break;
        case "nogidouga-hitori-de-dekirumon":
            targetEpisode = "22";
            break;
        case "nogidouga-kaettekita-yakubo-channel":
            targetEpisode = "01";
            break;
        // case "chou-nogizaka-star-tanjou":
            // targetEpisode = "57";
            // break;
        case "hinakoi-imechun":
            targetEpisode = "01";
            break;
        case "nogizaka-skits-bd-2":
            targetEpisode = "01";
            break;
        case "compilation":
            targetEpisode = "01";
            break;
        // case "cupstar-sashimen":
            // targetEpisode = "00";
            // break;
        case "random-subs":
            targetEpisode = "46";
            break;
        // case "sonna-kazoku-nara-sutechaeba":
            // targetEpisode = "03";
            // break;
        }
    }

    initializeEpisode(targetEpisode);
});

