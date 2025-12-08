document.addEventListener('DOMContentLoaded', () => {
    const glossaryContainer = document.getElementById('glossary-container');
    const toggleButtonsContainer = document.getElementById('toggle-buttons');
    let glossaryData = {};
    const categoryMap = {
        "あ行": "あ",
        "か行": "か",
        "さ行": "さ",
        "た行": "た",
        "な行": "な",
        "は行": "は",
        "ま行": "ま",
        "や行": "や",
        "ら行": "ら",
        "わ行": "わ",
        "アルファベット": "Alfabet",
        "数字・記号": "No & Symbol"
    };
    async function fetchGlossaryData() {
        try {
            const response = await fetch('../store/data/n46_glosarium.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            glossaryData = await response.json();
            renderGlossary();
            setupToggleButtons();
        } catch (error) {
            glossaryContainer.innerHTML = `<p>Error loading glossary data: ${error.message}</p>`;
            console.error('Failed to fetch glossary data:', error);
        }
    }
    function renderGlossary() {
        glossaryContainer.innerHTML = '';  
        for (const categoryKey in categoryMap) {
            if (glossaryData[categoryKey]) {
                const terms = glossaryData[categoryKey];
                const categorySection = document.createElement('div');
                categorySection.className = 'category-section';
                categorySection.id = `cat-${categoryKey}`;
                const categoryTitle = document.createElement('h2');
                categoryTitle.textContent = `【 ${categoryMap[categoryKey]} 】`;
                categorySection.appendChild(categoryTitle);
                terms.forEach(term => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'glossary-item';
                    let contentHTML = `
                        <h3 class="istilah_jp">${term.istilah_jp}</h3>
                        ${term.istilah_ro ? `<h4 class="istilah_ro">${term.istilah_ro}</h4>` : ''}
                    `;
                    let noteIndex = 1;
                    while (term[`note${noteIndex}`]) {
                        contentHTML += `<p>${term[`note${noteIndex}`]}</p>`;
                        noteIndex++;
                    }
                    itemDiv.innerHTML = contentHTML;
                    categorySection.appendChild(itemDiv);
                });
                glossaryContainer.appendChild(categorySection);
            }
        }
    }
    function setupToggleButtons() {
        const showAllButton = document.createElement('button');
        showAllButton.className = 'toggle-btn active';
        showAllButton.textContent = 'Semua';
        showAllButton.dataset.target = 'all';
        toggleButtonsContainer.appendChild(showAllButton);
        for (const categoryKey in categoryMap) {
            const button = document.createElement('button');
            button.className = 'toggle-btn';
            button.textContent = `${categoryMap[categoryKey]}`;
            button.dataset.target = `cat-${categoryKey}`;
            toggleButtonsContainer.appendChild(button);
        }
        toggleButtonsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle-btn')) {
                const targetId = e.target.dataset.target;
                filterCategories(targetId);
                document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }
    function filterCategories(targetId) {
        const sections = document.querySelectorAll('.category-section');
        sections.forEach(section => {
            if (targetId === 'all' || section.id === targetId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }
    fetchGlossaryData();
});