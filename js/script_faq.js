// js/script_faq.js

document.addEventListener('DOMContentLoaded', () => {
    const faqContainerWrapper = document.getElementById('faq-container-wrapper');
    const faqContainer = document.getElementById('faq-container');
    const FAQ_DATA_PATH = '../store/data/faq.json';
    let faqData = null;

    // Fungsi untuk mengambil data FAQ sekali saja
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

    // Fungsi untuk membangun HTML dari satu section FAQ
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

    // Fungsi utama untuk me-render semua section FAQ
    async function renderFaq(episodeData) {
        const data = await getFaqData();
        if (!data || !faqContainer) return;

        let html = '';

        // 1. Warning (selalu tampil)
        html += buildFaqSection('faq-warning', 'PERINGATAN', data.warning, false);

        // 2. How-to Softsub (kondisional)
        if (episodeData.linkSoftsub) {
            html += buildFaqSection('faq-softsub', 'CARA PENGGUNAAN SOFTSUB', data['howto-softsub'], true);
        }

        // 3. How-to Hardsub (kondisional)
        if (episodeData.linkHardsub) {
            html += buildFaqSection('faq-hardsub', 'CARA PENGGUNAAN HARDSUB', data['howto-hardsub'], true);
        }

        // 4. FAQ (selalu tampil)
        html += buildFaqSection('faq-main', 'FAQ', data.faq, true);
        
        faqContainer.innerHTML = html;
        faqContainerWrapper.style.display = 'block'; // Tampilkan container utama

        // Tambahkan fungsionalitas accordion
        setupAccordion();
        
        // Buka 'warning' secara default
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

                // Tutup semua dropdown lain
                headers.forEach(h => {
                    h.classList.remove('active');
                    h.nextElementSibling.classList.remove('visible');
                });

                // Buka/tutup yang diklik
                if (!isActive) {
                    header.classList.add('active');
                    content.classList.add('visible');
                }
            });
        });
    }

    // Dengarkan event kustom dari script_subs.js
    document.addEventListener('episodeRendered', (event) => {
        if (event.detail && event.detail.episodeData) {
            renderFaq(event.detail.episodeData);
        }
    });
});