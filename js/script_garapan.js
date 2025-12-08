document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('garapan-main-container');
    const loadingOverlay = document.getElementById('loading-overlay');
    const dataURL = '../store/subs/garapan.json';
    async function loadGarapanData() {
        if (loadingOverlay) loadingOverlay.style.display = 'flex';
        try {
            const response = await fetch(dataURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            renderGarapan(data);
        } catch (error) {
            console.error('Error fetching garapan data:', error);
            mainContainer.innerHTML = '<p style="text-align:center; color: red;">Gagal memuat data garapan. Coba muat ulang halaman.</p>';
        } finally {
            if (loadingOverlay) loadingOverlay.style.display = 'none';
        }
    }
    function renderGarapan(data) {
        mainContainer.innerHTML = '';  
        for (const sectionKey in data) {
            const sectionData = data[sectionKey];
            const sectionElement = createSectionElement(sectionData);
            mainContainer.appendChild(sectionElement);
        }
    }
    function createSectionElement(sectionData) {
        const wrapper = document.createElement('div');
        wrapper.className = 'garapan-section pixel-border-wrapper';
        const itemContainer = document.createElement('div');
        itemContainer.className = 'garapan-section-item';
        const title = document.createElement('h2');
        title.className = 'section-title';
        title.textContent = sectionData.title;
        itemContainer.appendChild(title);
        const description = document.createElement('p');
        description.className = 'section-description jpn';
        description.textContent = sectionData.description;
        itemContainer.appendChild(description);
        let previousBaseTitle = null; 
        sectionData.categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'garapan-category';
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category.name;
            categoryElement.appendChild(categoryTitle);
            const listElement = document.createElement('ul');
            listElement.className = 'garapan-list';
            category.items.forEach(garapanItem => {
                const listItem = document.createElement('li');
                listItem.className = 'garapan-list-item';
                let titleHTML = `<span class="item-title jpn">${garapanItem.title}</span>`;
                if (garapanItem.isRequest) {
                    titleHTML += ` <span class="item-label">[REQUEST]</span>`;
                }
                if (garapanItem.tooltip) {
                    titleHTML += `
                        <span class="item-tooltip-wrapper">
                            <span class="item-tooltip-icon">?</span>
                            <span class="item-tooltip-text jpn">${garapanItem.tooltip}</span>
                        </span>`;
                }
                let actionButtonHTML = '';
                const currentBaseTitle = garapanItem.title.replace(/ #\d+.*/, '').replace(/ Season \d+.*/, '').trim();
                if (garapanItem.link && currentBaseTitle !== previousBaseTitle) {
                     actionButtonHTML = `
                        <a href="${garapanItem.link}" class="item-action-link">
                          <div class="pixel-border-wrapper item-action-button-wrapper">
                            <div class="pixel-border-item item-action-button-item">
                                <span class="item-action-button">&gt;</span>
                            </div>
                            <div class="pixel-border-shadow"></div>
                          </div>
                        </a>`;
                }
                previousBaseTitle = garapanItem.link ? currentBaseTitle : null;
                listItem.innerHTML = `
                    <div class="item-info">${titleHTML}</div>
                    <div class="item-action">${actionButtonHTML}</div>
                `;
                listElement.appendChild(listItem);
            });
            categoryElement.appendChild(listElement);
            itemContainer.appendChild(categoryElement);
        });
        const shadow = document.createElement('div');
        shadow.className = 'pixel-border-shadow';
        wrapper.appendChild(itemContainer);
        wrapper.appendChild(shadow);
        return wrapper;
    }
    loadGarapanData();
});