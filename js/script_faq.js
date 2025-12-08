document.addEventListener('DOMContentLoaded', () => {
    const faqContainerWrapper = document.getElementById('faq-container-wrapper');
    const faqContainer = document.getElementById('faq-container');
    const FAQ_DATA_PATH = '../store/data/faq.json';
    let faqData = null;
    async function getFaqData() {
        if (!faqData) {
            try {
                const response = await fetch(FAQ_DATA_PATH);
                if (!response.ok) throw new Error('Failed to fetch FAQ data');
                faqData = await response.json();
            } catch (error) {
                console.error(error);
                return null;
            }
        }
        return faqData;
    }
    function buildFaqSection(id, title, data, isDropdown) {
        const content = Object.values(data).map(item => `<li>${item}</li>`).join('');
        const listType = id === 'faq-warning' ? 'ul' : 'ol';
        return `
            <div id="${id}" class="faq-item pixel-border-wrapper">
                <div class="pixel-border-item">
                    <div class="faq-header ${isDropdown ? '' : 'no-dropdown'}">
                        <span>${title}</span>
                    </div>
                    <div class="faq-content">
                        <${listType}>${content}</${listType}>
                    </div>
                </div>
                <div class="pixel-border-shadow"></div>
            </div>`;
    }
    async function renderFaq(episodeData) {
        const data = await getFaqData();
        if (!data || !faqContainer) return;
        let html = '';
        html += buildFaqSection('faq-warning', 'PERINGATAN', data.warning, false);
        if (episodeData.linkSoftsub) {
            html += buildFaqSection('faq-softsub', 'CARA PENGGUNAAN SOFTSUB', data['howto-softsub'], true);
        }
        if (episodeData.linkHardsub) {
            html += buildFaqSection('faq-hardsub', 'CARA PENGGUNAAN HARDSUB', data['howto-hardsub'], true);
        }
        html += buildFaqSection('faq-main', 'FAQ', data.faq, true);
        faqContainer.innerHTML = html;
        faqContainerWrapper.style.display = 'block';  
        setupAccordion();
        const warningHeader = document.querySelector('#faq-warning .faq-header');
        if (warningHeader) {
            const content = warningHeader.nextElementSibling;
            content.classList.add('visible');
        }
    }
    function setupAccordion() {
        const headers = faqContainer.querySelectorAll('.faq-header:not(.no-dropdown)');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const isActive = header.classList.contains('active');
                headers.forEach(h => {
                    h.classList.remove('active');
                    h.nextElementSibling.classList.remove('visible');
                });
                if (!isActive) {
                    header.classList.add('active');
                    content.classList.add('visible');
                }
            });
        });
    }
    document.addEventListener('episodeRendered', (event) => {
        if (event.detail && event.detail.episodeData) {
            renderFaq(event.detail.episodeData);
        }
    });
});