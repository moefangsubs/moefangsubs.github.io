/* ---------------------- */
/* GLOBAL STATE & CONFIG */
/* ---------------------- */
let configData = null;
let singleTitlesMap = {};
let activeCategory = null;
let currentIndex = 0;
let currentVersionIndex = 0;
let isSwitching = false;
let activeCanvasId = 'canvasBase';

const GENERATION_DATASET = [
    {
        genNumber: 2,
        genTitle: '2nd Generation',
        romaji: '2nd Generation Uniform',
        japanese: '2期生 制服',
        variants: [
            { fileName: '制服 2期生 a.png', label: 'A', titleRomaji: '2nd Generation Uniform', badge: '2nd Generation' },
            { fileName: '制服 2期生 b.png', label: 'B', titleRomaji: '2nd Generation Uniform', badge: '2nd Generation' }
        ]
    },
    {
        genNumber: 3,
        genTitle: '3rd Generation',
        romaji: '3rd Generation Uniform',
        japanese: '3期生 制服',
        variants: [
            { fileName: '制服 3期生 a.png', label: 'A', titleRomaji: '3rd Generation Uniform', badge: '3rd Generation' },
            { fileName: '制服 3期生 b.png', label: 'B', titleRomaji: '3rd Generation Uniform', badge: '3rd Generation' }
        ]
    },
    {
        genNumber: 4,
        genTitle: '4th Generation',
        romaji: '4th Generation Uniform',
        japanese: '4期生 制服',
        variants: [
            { fileName: '制服 4期生.png', label: '4期', titleRomaji: '4th Generation Uniform', badge: '4th Generation' },
            { fileName: '制服 4期生 新.png', label: '新', titleRomaji: 'Shin 4th Generation Uniform', badge: 'Shin 4th Generation' }
        ]
    },
    {
        genNumber: 5,
        genTitle: '5th Generation',
        romaji: '5th Generation Uniform',
        japanese: '5期生 制服',
        variants: [
            { fileName: '制服 5期生.png', label: 'A', titleRomaji: '5th Generation Uniform', badge: '5th Generation' }
        ]
    },
    {
        genNumber: 6,
        genTitle: '6th Generation',
        romaji: '6th Generation Uniform',
        japanese: '6期生 制服',
        variants: [
            { fileName: '制服 6期生 a.png', label: 'A', titleRomaji: '6th Generation Uniform', badge: '6th Generation' },
            { fileName: '制服 6期生 b.png', label: 'B', titleRomaji: '6th Generation Uniform', badge: '6th Generation' },
            { fileName: '制服 6期生 c.png', label: 'C', titleRomaji: '6th Generation Uniform', badge: '6th Generation' }
        ]
    }
];

/* ---------------------- */
/* BOOTSTRAP INITIALIZATION */
/* ---------------------- */
$(document).ready(async function() {
    disableImageSaveEvents();
    await loadAppConfiguration();
    await loadSingleTitles();
    renderCategoryNavigation();
    setupCarouselEvents();
    loadCostumeDisplay(1, 0, false);
});

/* ---------------------- */
/* PREVENT SAVE / LINK HOVER */
/* ---------------------- */
function disableImageSaveEvents() {
    $(document).on('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    $(document).on('dragstart', 'img, canvas', function(e) {
        e.preventDefault();
        return false;
    });
}

/* ---------------------- */
/* DATA FETCHING */
/* ---------------------- */
async function loadAppConfiguration() {
    try {
        const response = await fetch('../store/data/uniform_pdl.json');
        configData = await response.json();
        activeCategory = configData.categories[0];
    } catch (err) {
        configData = {
            categories: [
                {
                    id: 'single_uniform',
                    title: 'Single Uniform',
                    type: 'single',
                    prefix: '制服',
                    base_url: 'https://ik.imagekit.io/moearchive/web/collection/n46/uniform/',
                    max_single: 42,
                    enabled: true
                },
                {
                    id: 'generation_uniform',
                    title: 'Generation Uniform',
                    type: 'generation',
                    prefix: '制服',
                    base_url: 'https://ik.imagekit.io/moearchive/web/collection/n46/uniform_gen/',
                    enabled: true
                }
            ]
        };
        activeCategory = configData.categories[0];
    }
}

async function loadSingleTitles() {
    try {
        const response = await fetch('../store/single/singletitle.json');
        if (response.ok) {
            singleTitlesMap = await response.json();
        }
    } catch (e) {
        singleTitlesMap = {};
    }
}

/* ---------------------- */
/* FILE RESOLVER LOGIC */
/* ---------------------- */
function resolveItemVariants(index) {
    if (activeCategory.type === 'generation') {
        const genData = GENERATION_DATASET[index];
        return genData.variants.map(v => ({
            fileName: v.fileName,
            label: v.label,
            url: `${activeCategory.base_url}${encodeURIComponent(v.fileName)}`,
            customBadge: v.badge,
            customRomaji: v.titleRomaji,
            japanese: genData.japanese
        }));
    }

    const singleNum = index;
    const numPadded = String(singleNum).padStart(2, '0');
    let variants = [];

    if (singleNum === 1) {
        variants = ['01a', '01b', '01c', '01d'];
    } else if ([2, 3, 4, 5, 12].includes(singleNum)) {
        variants = [`${numPadded}a`, `${numPadded}b`, `${numPadded}c`];
    } else if ([10, 13, 17, 18, 19, 20, 24].includes(singleNum)) {
        variants = [`${numPadded}a`, `${numPadded}b`, `${numPadded}c`, `${numPadded}d`];
    } else if (singleNum === 16) {
        variants = ['16a', '16b', '16 (インフルエンサー封入) a', '16 (インフルエンサー封入) b'];
    } else if ([33, 36].includes(singleNum)) {
        variants = [`${numPadded}a`, `${numPadded}b`, `${numPadded}c`];
    } else {
        variants = [`${numPadded}a`, `${numPadded}b`];
    }

    return variants.map(suffix => {
        const fileName = `${activeCategory.prefix} ${suffix}.png`;
        let label = suffix.slice(-1).toUpperCase();
        if (suffix.includes('封入')) {
            label = `Sp ${suffix.slice(-1).toUpperCase()}`;
        }
        return {
            fileName: fileName,
            label: label,
            url: `${activeCategory.base_url}${encodeURIComponent(fileName)}`
        };
    });
}

/* ---------------------- */
/* NAVIGATION RENDERING */
/* ---------------------- */
function renderCategoryNavigation() {
    const $nav =$('#categoryNav').empty();

    configData.categories.forEach((cat, idx) => {
        const $item =$('<span class="nav-link-item"></span>')
            .text(cat.title)
            .toggleClass('active', cat.id === activeCategory.id)
            .toggleClass('disabled', !cat.enabled);

        if (!cat.enabled) {
            $item.append('<span class="lock-badge">&#128274;</span>');
            $item.attr('data-tooltip', cat.tooltip || 'Pengembangan data');
        } else {
            $item.on('click', function() {
                if (activeCategory.id !== cat.id && !isSwitching) {
                    activeCategory = cat;
                    currentIndex = cat.type === 'generation' ? 0 : 1;
                    currentVersionIndex = 0;
                    renderCategoryNavigation();
                    loadCostumeDisplay(currentIndex, 0, false);
                }
            });
        }

        $nav.append($item);

        if (idx < configData.categories.length - 1) {
            $nav.append('<span class="nav-divider">|</span>');
        }
    });
}

/* ---------------------- */
/* SEAMLESS FADE RENDERER */
/* ---------------------- */
function renderImageToCanvas(canvas, img) {
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
}

function loadCostumeDisplay(itemIndex, targetVersionIdx, animate) {
    if (isSwitching && animate) return;

    currentIndex = itemIndex;
    currentVersionIndex = targetVersionIdx;

    const variants = resolveItemVariants(itemIndex);
    renderInfoMetadata(itemIndex, variants[targetVersionIdx]);
    renderVersionThumbnails(variants, targetVersionIdx);

    const targetUrl = variants[targetVersionIdx].url;
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = function() {
        const currentCanvas = document.getElementById(activeCanvasId);
        const nextCanvasId = activeCanvasId === 'canvasBase' ? 'canvasTop' : 'canvasBase';
        const nextCanvas = document.getElementById(nextCanvasId);

        renderImageToCanvas(nextCanvas, img);

        if (animate) {
            isSwitching = true;

            nextCanvas.style.transition = 'none';
            nextCanvas.classList.remove('is-visible');
            nextCanvas.style.opacity = '0';
            nextCanvas.style.zIndex = '2';

            currentCanvas.style.zIndex = '1';
            currentCanvas.classList.add('is-visible');
            currentCanvas.style.opacity = '1';

            nextCanvas.offsetHeight;

            const transitionStyle = 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
            nextCanvas.style.transition = transitionStyle;
            currentCanvas.style.transition = transitionStyle;

            nextCanvas.classList.add('is-visible');
            nextCanvas.style.opacity = '1';
            currentCanvas.classList.remove('is-visible');
            currentCanvas.style.opacity = '0';

            setTimeout(() => {
                activeCanvasId = nextCanvasId;
                currentCanvas.style.zIndex = '1';
                nextCanvas.style.zIndex = '2';
                isSwitching = false;
            }, 600);
        } else {
            currentCanvas.classList.remove('is-visible');
            currentCanvas.style.opacity = '0';
            currentCanvas.style.zIndex = '1';

            nextCanvas.style.transition = 'none';
            nextCanvas.classList.add('is-visible');
            nextCanvas.style.opacity = '1';
            nextCanvas.style.zIndex = '2';
            activeCanvasId = nextCanvasId;
        }
    };

    img.src = targetUrl;
}

/* ---------------------- */
/* THUMBNAIL STRIP */
/* ---------------------- */
function renderVersionThumbnails(variants, selectedIdx) {
    const $container =$('#versionThumbnails').empty();

    variants.forEach((v, idx) => {
        const $card =$('<div class="version-card"></div>')
            .toggleClass('active', idx === selectedIdx);

        const $img =$('<img>').attr('src', v.url).attr('alt', '');
        const $overlay =$('<div class="version-overlay"></div>').text(v.label);

        $card.append($img).append($overlay);

        $card.on('click', function() {
            if (currentVersionIndex !== idx && !isSwitching) {
                $('.version-card').removeClass('active');$(this).addClass('active');
                loadCostumeDisplay(currentIndex, idx, true);
            }
        });

        $container.append($card);
    });
}

/* ---------------------- */
/* TITLE & BADGE METADATA */
/* ---------------------- */
function renderInfoMetadata(index, activeVariant) {
    if (activeCategory.type === 'generation') {
        const genData = GENERATION_DATASET[index];
        const badgeText = activeVariant.customBadge || genData.genTitle;
        const romajiText = activeVariant.customRomaji || genData.romaji;
        const jpnText = activeVariant.japanese || genData.japanese;

        $('#singleBadge').text(badgeText);
        $('#titleRomaji').text(romajiText);
        $('#titleJpn').show().text(jpnText);
        return;
    }

    const singleNum = index;
    const sKey = String(singleNum);
    let romaji = `Single ${singleNum}`;
    let japanese = '';

    if (singleTitlesMap[sKey] && singleTitlesMap[sKey].senbatsuTitle) {
        const entry = singleTitlesMap[sKey].senbatsuTitle;
        japanese = Object.keys(entry)[0] || '';
        romaji = entry[japanese] || '';
    }

    $('#singleBadge').text(`${getOrdinal(singleNum)} Single`);
    $('#titleRomaji').text(romaji);

    if (romaji.trim().toLowerCase() === japanese.trim().toLowerCase()) {
        $('#titleJpn').hide().text('');
    } else {
        $('#titleJpn').show().text(japanese);
    }
}

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/* ---------------------- */
/* EVENT LISTENERS */
/* ---------------------- */
function setupCarouselEvents() {
    $('#navPrev').on('click', function() {
        if (isSwitching) return;

        if (activeCategory.type === 'generation') {
            const totalGen = GENERATION_DATASET.length;
            const prev = (currentIndex - 1 + totalGen) % totalGen;
            loadCostumeDisplay(prev, 0, true);
        } else {
            const max = activeCategory.max_single;
            const prev = currentIndex <= 1 ? max : currentIndex - 1;
            loadCostumeDisplay(prev, 0, true);
        }
    });

    $('#navNext').on('click', function() {
        if (isSwitching) return;

        if (activeCategory.type === 'generation') {
            const totalGen = GENERATION_DATASET.length;
            const next = (currentIndex + 1) % totalGen;
            loadCostumeDisplay(next, 0, true);
        } else {
            const max = activeCategory.max_single;
            const next = currentIndex >= max ? 1 : currentIndex + 1;
            loadCostumeDisplay(next, 0, true);
        }
    });

    $(document).on('keydown', function(e) {
        if (isSwitching) return;
        if (e.key === 'ArrowLeft') $('#navPrev').click();
        if (e.key === 'ArrowRight') $('#navNext').click();
    });
}