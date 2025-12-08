document.addEventListener('DOMContentLoaded', () => {
    const mainSongContainer = document.getElementById('main-song-container');
    const couplingSongContainer = document.getElementById('coupling-song-container');

    if (!mainSongContainer || !couplingSongContainer) {
        console.error('Required containers not found.');
        return;
    }

    fetch('../store/single/abbreviation.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Sort keys to maintain order (e.g., s01, s02, ... a1, b1, dig)
            const sortedKeys = Object.keys(data).sort((a, b) => {
                const aType = a.replace(/[0-9]/g, '');
                const bType = b.replace(/[0-9]/g, '');
                const aNum = parseInt(a.replace(/\D/g, ''), 10);
                const bNum = parseInt(b.replace(/\D/g, ''), 10);

                if (aType !== bType) {
                    const order = ['s', 'a', 'u', 'b', 'dig'];
                    return order.indexOf(aType) - order.indexOf(bType);
                }
                return aNum - bNum;
            });

            sortedKeys.forEach(key => {
                const songs = data[key];
                songs.forEach(song => {
                    if (song.isMain) {
                        mainSongContainer.appendChild(createMainSongCard(song));
                    } else {
                        couplingSongContainer.appendChild(createCouplingSongCard(song));
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
            mainSongContainer.innerHTML = '<p>Failed to load song data. Please try again later.</p>';
        });
});

function createMainSongCard(song) {
    const card = document.createElement('div');
    card.className = 'child';

    const singroHTML = song.abbrRo ? `<div class="singro">${song.abbrRo}</div>` : '';

    card.innerHTML = `
        <img src="${song.imageUrl}" alt="${song.titleRo}" loading="lazy">
        <div class="detail">
            <div class="singkatan">${song.abbrJp}</div>
            ${singroHTML}
            <span>${song.titleRo}</span>
        </div>
    `;
    return card;
}

function createCouplingSongCard(song) {
    const card = document.createElement('div');
    card.className = 'cpchild';

    const singroHTML = song.abbrRo ? `<div class="singro">${song.abbrRo}</div>` : '';

    card.innerHTML = `
        <div class="cpdetail">
            <div class="singkatan">${song.abbrJp}</div>
            ${singroHTML}
            <span>${song.titleRo}</span>
        </div>
    `;
    return card;
}