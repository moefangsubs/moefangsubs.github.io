document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('timeline-container');
    const jsonPath = '../store/data/group_chronology.json';
    const formatIndonesianDate = (dateString) => {
        const [year, month, day] = dateString.split('.');
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const date = new Date(year, month - 1, day);
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };
    const getGroupClass = (eventText) => {
        const text = eventText.toLowerCase();
        if (text.includes('nogizaka')) return 'nogizaka';
        if (text.includes('sakurazaka')) return 'sakurazaka';
        if (text.includes('hinatazaka') || text.includes('hiragana')) return 'hinatazaka';
        if (text.includes('keyakizaka')) return 'keyakizaka';
        if (text.includes('audisi gabungan') || text.includes('kenshusei')) return 'audition';
        return 'default';
    };
    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let side = 'left';
            data.group_chronology.forEach(item => {
                const groupClass = getGroupClass(item.event);
                const timelineItem = document.createElement('div');
                timelineItem.className = `timeline-item timeline-${side} ${groupClass}`;
                const contentDiv = document.createElement('div');
                contentDiv.className = 'timeline-content';
                const dateHeader = document.createElement('div');
                dateHeader.className = 'date-header';
                const dateH3 = document.createElement('h3');
                dateH3.className = 'date';
                dateH3.textContent = formatIndonesianDate(item.date);
                dateHeader.appendChild(dateH3);
                contentDiv.appendChild(dateHeader);
                const eventTitleH4 = document.createElement('h4');
                eventTitleH4.className = 'event-title';
                eventTitleH4.textContent = item.event;
                contentDiv.appendChild(eventTitleH4);
                if (item.membercount !== null && item.membercount !== undefined) {
                    const memberCountP = document.createElement('p');
                    memberCountP.className = 'member-count';
                    memberCountP.textContent = `${item.membercount} member`;
                    contentDiv.appendChild(memberCountP);
                }
                const noteP = document.createElement('p');
                noteP.className = 'note';
                noteP.textContent = item.note;
                contentDiv.appendChild(noteP);
                const linkKeys = Object.keys(item).filter(key => key.startsWith('link'));
                if (linkKeys.length > 0) {
                    const sourceContainer = document.createElement('div');
                    sourceContainer.className = 'source-links-container';
                    linkKeys.sort().forEach((key, index) => {
                        const linkUrl = item[key];
                        const linkButton = document.createElement('a');
                        linkButton.href = linkUrl;
                        linkButton.target = '_blank';
                        linkButton.rel = 'noopener noreferrer';  
                        linkButton.className = 'source-link-button';
                        if (linkKeys.length > 1) {
                            linkButton.textContent = `sumber ${index + 1} >`;
                        } else {
                            linkButton.textContent = `sumber >`;
                        }
                        sourceContainer.appendChild(linkButton);
                    });
                    contentDiv.appendChild(sourceContainer);
                }
                timelineItem.appendChild(contentDiv);
                timelineContainer.appendChild(timelineItem);
                side = (side === 'left') ? 'right' : 'left';
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing chronology data:', error);
            timelineContainer.innerHTML = `<p style="text-align: center; color: #ff7b7b;">Gagal memuat data kronologi. Silakan coba lagi nanti.</p>`;
        });
});