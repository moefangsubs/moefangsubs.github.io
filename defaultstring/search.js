document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results');
    searchInput.addEventListener('input', search);

    function search() {
        const query = searchInput.value.toLowerCase();
        resultsContainer.innerHTML = ''; // Clear previous results

        // Show a suggestion if the query seems incorrect
        const suggestion = getSuggestion(query);
        if (suggestion && suggestion !== query) {
            const suggestionElement = document.createElement('div');
            suggestionElement.className = 'suggestion';
            suggestionElement.innerHTML = `Mungkin yang anda maksud: <a href="#">${suggestion}</a>`;
            suggestionElement.querySelector('a').addEventListener('click', function() {
                searchInput.value = suggestion;
                search(); // Re-run the search with the suggestion
            });
            resultsContainer.appendChild(suggestionElement);
        }

        // Perform the search if query length is 3 or more
        if (query.length >= 3) {
            const results = []; // Array to store search results

            // Loop through searchData (assumes searchData is predefined)
            for (const show in searchData) {
                const showData = searchData[show];
                let title = showData.title || show;

                if (title.startsWith('[') && title.endsWith(']')) {
                    title = ''; // Clear title if it has square brackets
                }

                // Check for episodes or ranges and build results based on query match
                if (showData.episodeRange) {
                    const { start, end } = showData.episodeRange;
                    for (let i = start; i <= end; i++) {
                        const episode = i.toString().padStart(2, '0');
                        const episodeName = title ? `${title} Episode ${episode}` : `Episode ${episode}`;

                        if (episodeName.toLowerCase().includes(query)) {
                            const thumbnailUrl = `${showData.thumbnailBaseUrl}${episode}.jpg`;
                            results.push({
                                name: episodeName,
                                url: `${showData.baseUrl}?episode=${episode}`,
                                thumbnail: thumbnailUrl
                            });
                        }
                    }
                } else if (Array.isArray(showData.episodes)) {
                    showData.episodes.forEach(episode => {
                        const episodeName = title ? `${title} Episode ${episode}` : `Episode ${episode}`;
                        if (episodeName.toLowerCase().includes(query)) {
                            const thumbnailUrl = `${showData.thumbnailBaseUrl}${episode}.jpg`;
                            results.push({
                                name: episodeName,
                                url: `${showData.baseUrl}?episode=${episode}`,
                                thumbnail: thumbnailUrl
                            });
                        }
                    });
                }
            }

            // Display search results
            if (results.length > 0) {
                results.forEach(item => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';

                    const img = document.createElement('img');
                    img.src = item.thumbnail;
                    img.alt = item.name;
                    img.className = 'thumbnail';
                    img.onclick = () => window.location.href = item.url;

                    const a = document.createElement('a');
                    a.href = item.url;
                    a.textContent = item.name;

                    resultItem.appendChild(img);
                    resultItem.appendChild(a);
                    resultsContainer.appendChild(resultItem);
                });
            } else {
                resultsContainer.innerHTML += '<div class="result-item">No results found</div>';
            }
        }
    }

    // Function to find a suggested term if the user input may be a typo
    function getSuggestion(query) {
        const terms = Object.keys(searchData);
        let closestMatch = '';
        let smallestDistance = Infinity;

        terms.forEach(term => {
            const distance = levenshteinDistance(query, term.toLowerCase());
            if (distance < smallestDistance && distance <= 3) { // Set threshold for close matches
                smallestDistance = distance;
                closestMatch = term;
            }
        });

        return closestMatch;
    }

    // Helper function: Calculate Levenshtein distance between two strings
    function levenshteinDistance(a, b) {
        const matrix = Array.from({ length: b.length + 1 }, () => Array(a.length + 1).fill(0));
        for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
        for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

        for (let j = 1; j <= b.length; j++) {
            for (let i = 1; i <= a.length; i++) {
                if (b[j - 1] === a[i - 1]) matrix[j][i] = matrix[j - 1][i - 1];
                else matrix[j][i] = Math.min(matrix[j - 1][i] + 1, matrix[j][i - 1] + 1, matrix[j - 1][i - 1] + 1);
            }
        }
        return matrix[b.length][a.length];
    }
});
