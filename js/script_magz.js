document.addEventListener('DOMContentLoaded', () => {
    const listView = document.getElementById('magazine-list-view');
    const listContainer = document.getElementById('magazine-list-container');
    const viewer = document.getElementById('magazine-viewer');
    const magTitle = document.getElementById('magazine-title');
    const backBtn = document.getElementById('back-to-list');
    const toggleModeBtn = document.getElementById('toggle-mode');
    const imageViewer = document.getElementById('image-viewer');
    const imageNav = document.getElementById('image-nav');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const textViewer = document.getElementById('text-viewer');
    const baseMagzUrl = '../store/translation/magz/';
    let currentMode = '';  
    let currentPage = 0;
    let imagesData = [];
    const init = () => {
        const params = new URLSearchParams(window.location.search);
        const magId = params.get('magazine');
        if (magId) loadMagazine(magId);
        else displayMagazineList();
    };
    const displayMagazineList = async () => {
        listView.style.display = 'block';
        viewer.style.display = 'none';
        window.scrollTo(0, 0);
        const listResponse = await fetch(`${baseMagzUrl}list_magz.json`);
        const magList = await listResponse.json();
        listContainer.innerHTML = '';
        for (const id in magList) {
            const magEntry = magList[id];
            try {
                const magResponse = await fetch(`${baseMagzUrl}${magEntry.file}`);
                const magData = await magResponse.json();
                const link = document.createElement('a');
                link.href = `?magazine=${id}`;
                link.className = 'boxs2 jpn';
                link.textContent = magData.title;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.history.pushState({ id }, magData.title, `?magazine=${id}`);
                    loadMagazine(id);
                });
                listContainer.appendChild(link);
            } catch (error) {
                console.error(`Gagal memuat data majalah untuk file: ${magEntry.file}`, error);
            }
        }
    };
    const loadMagazine = async (id) => {
        listView.style.display = 'none';
        viewer.style.display = 'block';
        window.scrollTo(0, 0);
        try {
            const listResponse = await fetch(`${baseMagzUrl}list_magz.json`);
            const magList = await listResponse.json();
            const magEntry = magList[id];
            const magResponse = await fetch(`${baseMagzUrl}${magEntry.file}`);
            const magData = await magResponse.json();
            populateViewer(magData, magEntry.flip_mode);
        } catch (error) {
            console.error(`Gagal memuat majalah dengan ID: ${id}`, error);
            alert('Gagal memuat data majalah. Kembali ke daftar.');
            window.history.back();
        }
    };
    const populateViewer = (data, flipMode) => {
        magTitle.textContent = data.title;
        currentMode = flipMode;
        imagesData = data.image;
        currentPage = 0;
        populateImageViewer();
        populateTextViewer(data.text);
        imageViewer.style.display = 'flex';
        textViewer.style.display = 'none';
        toggleModeBtn.textContent = 'Mode Teks';
    };
    const populateImageViewer = () => {
        imageViewer.innerHTML = '';
        const isLandscape = window.matchMedia("(min-width: 769px) and (orientation: landscape)").matches;
        switch (currentMode) {
            case 'no':
                imageViewer.innerHTML = `<div class="static-image-container"><img src="${imagesData[0]}" alt="${magTitle.textContent}"></div>`;
                imageNav.style.display = 'none';
                break;
            case 'duo':
                imageNav.style.display = 'block';
                if (isLandscape) {
                    imageViewer.innerHTML = `
                        <div class="duo-spread">
                            <div class="duo-spread-page"><img src="${imagesData[0]}" alt="Page 1"></div>
                            <div class="duo-spread-page"><img src="${imagesData[1]}" alt="Page 2"></div>
                        </div>`;
                    imageNav.style.display = 'none';
                } else {
                    buildSlider();
                }
                break;
            case 'flip':
                imageNav.style.display = 'block';
                if (isLandscape) {
                    buildFlippingBook();
                } else {
                    buildSlider();
                }
                break;
        }
        updateNavButtons();
    };
    const buildSlider = () => {
        const slider = document.createElement('div');
        slider.className = 'image-slider';
        imagesData.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Page ${index + 1}`;
            if (index === 0) img.classList.add('active');
            slider.appendChild(img);
        });
        imageViewer.appendChild(slider);
        imageViewer.appendChild(imageNav);
    };
    const buildFlippingBook = () => {
        const bookContainer = document.createElement('div');
        bookContainer.id = 'book-container';
        bookContainer.innerHTML = `<div class="book"></div>`;
        imageViewer.appendChild(bookContainer);
        const book = bookContainer.querySelector('.book');
        const numPapers = Math.ceil(imagesData.length / 2);
        for (let i = 0; i < numPapers; i++) {
            const pageDiv = document.createElement('div');
            pageDiv.className = 'book-page';
            if (i === 0) pageDiv.classList.add('cover');
            const frontImgSrc = imagesData[i * 2] || '';
            const backImgSrc = imagesData[i * 2 + 1] || '';
            pageDiv.innerHTML = `
                <div class="page-face page-front">${frontImgSrc ? `<img src="${frontImgSrc}" alt="Page ${i * 2 + 1}">` : ''}</div>
                <div class="page-face page-back">${backImgSrc ? `<img src="${backImgSrc}" alt="Page ${i * 2 + 2}">` : ''}</div>`;
            book.appendChild(pageDiv);
        }
        imageViewer.appendChild(imageNav);
        updateFlipbookState();
    };
    const updateFlipbookState = () => {
        const book = document.querySelector('.book');
        if (!book) return;
        book.classList.toggle('is-closed', currentPage === 0);
        const pages = book.querySelectorAll('.book-page');
        const totalBookPages = pages.length;
        const isLastPageSingle = (imagesData.length % 2 === 0) && (currentPage === totalBookPages);
        book.classList.toggle('is-ending', isLastPageSingle);
        pages.forEach((page, index) => {
            const isFlipped = index < currentPage;
            page.classList.toggle('flipped', isFlipped);
            if (isFlipped) {
                page.style.zIndex = index + 1;
            } else {
                page.style.zIndex = totalBookPages - index;
            }
        });
    };
    const updateSliderState = () => {
        const slides = document.querySelectorAll('.image-slider img');
        if (!slides.length) return;
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentPage);
        });
    };
    const updateNavButtons = () => {
        const isLandscape = window.matchMedia("(min-width: 769px) and (orientation: landscape)").matches;
        if (currentMode === 'no' || (currentMode === 'duo' && isLandscape)) {
            imageNav.style.display = 'none';
            return;
        }
        imageNav.style.display = 'block';
        if (currentMode === 'flip' && isLandscape) {
            prevPageBtn.style.display = currentPage === 0 ? 'none' : 'block';
            nextPageBtn.style.display = 'block';  
        } else {  
            const totalPages = imagesData.length - 1;
            prevPageBtn.style.display = currentPage === 0 ? 'none' : 'block';
            nextPageBtn.style.display = currentPage >= totalPages ? 'none' : 'block';
        }
    };
    const populateTextViewer = (textData) => {
        textViewer.innerHTML = '';
        textData.forEach(item => {
            const block = document.createElement('div');
            block.className = 'text-block';
            if (typeof item === 'string') {
                block.innerHTML = `<p class="caption jpn">${item}</p>`;
            } else if (typeof item === 'object' && item.question) {
                const answersHtml = item.answer.map(ans => `<p class="a jpn">${ans}</p>`).join('');
                block.innerHTML = `<p class="q jpn">${item.question}</p>${answersHtml}`;
            }
            textViewer.appendChild(block);
        });
    };
    const handleNext = () => {
        const isLandscape = window.matchMedia("(min-width: 769px) and (orientation: landscape)").matches;
        if (currentMode === 'flip' && isLandscape) {
            const totalValidViews = Math.ceil(imagesData.length / 2);
            if (currentPage < totalValidViews) {
                currentPage++;
            } else {
                currentPage = 0;  
            }
            updateFlipbookState();
        } else {  
            if (currentPage < imagesData.length - 1) {
                currentPage++;
                updateSliderState();
            }
        }
        updateNavButtons();
    };
    const handlePrev = () => {
        if (currentPage > 0) {
            currentPage--;
            const isLandscape = window.matchMedia("(min-width: 769px) and (orientation: landscape)").matches;
            if (currentMode === 'flip' && isLandscape) updateFlipbookState();
            else updateSliderState();
        }
        updateNavButtons();
    };
    nextPageBtn.addEventListener('click', handleNext);
    prevPageBtn.addEventListener('click', handlePrev);
    toggleModeBtn.addEventListener('click', () => {
        const isImageView = imageViewer.style.display === 'flex';
        if (isImageView) {
            imageViewer.style.display = 'none';
            textViewer.style.display = 'block';
            toggleModeBtn.textContent = 'Mode Gambar';
        } else {
            imageViewer.style.display = 'flex';
            textViewer.style.display = 'none';
            toggleModeBtn.textContent = 'Mode Teks';
        }
    });
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.pushState({}, '', window.location.pathname.split('?')[0]);
        displayMagazineList();
    });
    window.addEventListener('resize', populateImageViewer);
    window.addEventListener('popstate', init);
    init();
});