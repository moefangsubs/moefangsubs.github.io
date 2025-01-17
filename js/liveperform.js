
  // -------------------
  // TOMBOL TERSEMBUNYI YG FREE & TRAKTEER
  // -------------------
    function hideButtons() {
        document.querySelectorAll('.episode_nogi').forEach(function(button) {
            var linkType = button.getAttribute('data-link-type');
            if (linkType === 'linkHardsub') {
                button.style.display = 'none';
            }
        });
    }

    function toggleButtonsForEpisode(episodeNumber) {
        hideButtons();
        
        var allowedEpisodes = ['03', '05', '08', '10', '13', '15', '26', '35', '42', '47', '49', '50', '51', '55', '58'];

        if (allowedEpisodes.includes(episodeNumber)) {
            document.querySelectorAll('.episode_nogi').forEach(function(button) {
                var linkType = button.getAttribute('data-link-type');
                if (linkType === 'linkHardsub') {
                    button.style.display = 'inline-block';
                }
            });
        }
    }

    document.querySelectorAll('.episodelist').forEach(function(episode) {
        episode.addEventListener('click', function() {
            var episodeNumber = this.getAttribute('data-episode');
            toggleButtonsForEpisode(episodeNumber);
        });
    });
    hideButtons(); 
  
  
  // -------------------
  // PASSWORD GARAPAN
  // -------------------

    function hideElements() {
        var elementsToHide = ['.password_garapan'];
        elementsToHide.forEach(function(identifier) {
            var elements = document.querySelectorAll(identifier);
            elements.forEach(function(element) {
                element.style.display = 'none';
            });
        });
    }
    function toggleElementsForEpisode(episodeNumber) {
        hideElements();
        var allowedEpisodes = ['03', '10', '42', '50', '51', '55'];
        if (allowedEpisodes.includes(episodeNumber)) {
            var elementsToShow = ['.password_garapan'];
            elementsToShow.forEach(function(identifier) {
                var elements = document.querySelectorAll(identifier);
                elements.forEach(function(element) {
                    element.style.display = 'block';
                });
            });
        }
    }
    document.querySelectorAll('.episodelist').forEach(function(episode) {
        episode.addEventListener('click', function() {
            var episodeNumber = this.getAttribute('data-episode');
            toggleElementsForEpisode(episodeNumber);
        });
    });
    hideElements();