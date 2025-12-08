document.addEventListener('DOMContentLoaded', function() {

    const baseDownloadURL = 'https://drive.google.com/uc?export=download&id=';
    const basePreviewURL = 'https://ik.imagekit.io/mLsKqNSuB/icoprev/';
    const dataUrl = '../store/data/foldericon.json';
    const container = document.getElementById('icon-grid-container');

    if (!container) {
        console.error('Error: The container element #icon-grid-container was not found.');
        return;
    }

    const createIconElement = (item) => {
        const downloadLink = `${baseDownloadURL}${item.linkDown}`;
        const previewLink = `${basePreviewURL}${item.linkPrev}.${item.prevType}`;
        
        return `
            <a href="${downloadLink}" class="icon-card" target="_blank" rel="noopener noreferrer">
                <img src="${previewLink}" alt="${item.name}" loading="lazy"/>
                <span>${item.name}</span>
            </a>
        `;
    };

    const renderGrid = (items) => {
        return items.map(createIconElement).join('');
    };

    fetch(dataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let htmlContent = '';

            for (const mainKey in data) {
                const mainCategory = data[mainKey];
                
                htmlContent += `<h2 class="main-category-title">${mainCategory.title}</h2>`;

                // Case 1: Direct items under main category
                if (mainCategory.items) {
                    htmlContent += `<div class="icon-grid">${renderGrid(mainCategory.items)}</div>`;
                }

                // Case 2: Subcategories under main category
                if (mainCategory.categories) {
                    for (const subKey in mainCategory.categories) {
                        const subCategory = mainCategory.categories[subKey];
                        htmlContent += `<h3 class="sub-category-title">${subCategory.title}</h3>`;
                        
                        if (subCategory.items) {
                             htmlContent += `<div class="icon-grid">${renderGrid(subCategory.items)}</div>`;
                        }

                        if (subCategory.coming_soon) {
                            htmlContent += `<div class="coming-soon-text">${subCategory.coming_soon}</div>`;
                        }
                    }
                }
            }
            container.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Failed to load folder icon data:', error);
            container.innerHTML = `<p style="color: var(--moe-tint4);">Error: Could not load icon data. Please try again later.</p>`;
        });
});