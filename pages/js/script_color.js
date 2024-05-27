document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const paletteSliders = document.querySelectorAll('.colorpalette-slider');
    const imageColors = document.querySelectorAll('.image-color');
    
    // Buat objek untuk menyimpan indeks slide yang aktif untuk setiap slider
    var slideIndexes = {};

    // Membuat struktur HTML untuk imageColors
    imageColors.forEach(imageColor => {
        const colorcodeDiv = document.createElement('div');
        colorcodeDiv.classList.add('colorcode');
        imageColor.appendChild(colorcodeDiv);

        for (let i = 1; i <= 5; i++) {
            const colorDiv = document.createElement('div');
            colorDiv.classList.add(`color${i}`);
            colorcodeDiv.appendChild(colorDiv);
        }

        const examplecolorDiv = document.createElement('div');
        examplecolorDiv.classList.add('examplecolor');
        imageColor.appendChild(examplecolorDiv);

        for (let i = 1; i <= 20; i++) {
            const exampleDiv = document.createElement('div');
            exampleDiv.classList.add(`example${i}`);
            exampleDiv.textContent = 'Aa'; // Menambahkan teks Aa
            examplecolorDiv.appendChild(exampleDiv);
        }
    });

    // Dropdown menu click event
    dropbtn.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
    });

    dropdownContent.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            const targetName = event.target.getAttribute('data-target');
            dropbtn.textContent = event.target.textContent;
            dropdownContent.classList.remove('show');
            showSlider(targetName);
        }
    });

    // Function to show the selected slider
    function showSlider(name) {
        paletteSliders.forEach(slider => {
            if (slider.getAttribute('name') === name) {
                fadeIn(slider);
            } else {
                fadeOut(slider);
            }
        });
    }

    // Function to fade in an element
    function fadeIn(element) {
        element.style.opacity = 0;
        element.style.display = 'block';

        (function fade() {
            let val = parseFloat(element.style.opacity);
            if (!((val += 0.1) > 1)) {
                element.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    }

    // Function to fade out an element
    function fadeOut(element) {
        element.style.opacity = 1;

        (function fade() {
            if ((element.style.opacity -= 0.1) < 0) {
                element.style.display = 'none';
            } else {
                requestAnimationFrame(fade);
            }
        })();
    }

    // Function to show slides for a specific slider
    function showSlides(n, name) {
        var slider = document.querySelector('.colorpalette-slider[name="' + name + '"]');
        var slides = slider.querySelectorAll('.image-color');

        // Inisialisasi indeks slide jika belum ada
        if (!slideIndexes[name]) {
            slideIndexes[name] = 1;
        }

        // Periksa apakah n lebih dari jumlah slide atau kurang dari 1
        if (n > slides.length) {
            slideIndexes[name] = 1;
        }
        if (n < 1) {
            slideIndexes[name] = slides.length;
        }

        // Sembunyikan semua slide di slider ini
        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Tampilkan slide yang sesuai
        slides[slideIndexes[name] - 1].style.display = 'block';
    }

    // Function to move slides for a specific slider
    window.plusSlides = function(n, name) {
        slideIndexes[name] += n;
        showSlides(slideIndexes[name], name);
    }

    // Inisialisasi slide pertama untuk setiap slider
    paletteSliders.forEach(slider => {
        const sliderName = slider.getAttribute('name');
        slideIndexes[sliderName] = 1;
        showSlides(slideIndexes[sliderName], sliderName);
    });

    imageColors.forEach(imageColor => {
        const id = imageColor.getAttribute('data-id');
        const colors = colorsData[id];

        for (let i = 1; i <= 5; i++) {
            const colorDiv = imageColor.querySelector(`.color${i}`);
            const hexCode = colors[`color${i}`].slice(1); // Menghapus tanda #
            colorDiv.style.backgroundColor = colors[`color${i}`];
            colorDiv.innerText = hexCode;
            colorDiv.style.color = getContrastYIQ(colors[`color${i}`]);
            colorDiv.addEventListener('click', () => {
                copyToClipboard(hexCode, colorDiv);
            });
        }

        const colorCombos = [
            [colors.color1, colors.color2],
            [colors.color1, colors.color3],
            [colors.color1, colors.color4],
            [colors.color1, colors.color5],
            [colors.color2, colors.color1],
            [colors.color2, colors.color3],
            [colors.color2, colors.color4],
            [colors.color2, colors.color5],
            [colors.color3, colors.color1],
            [colors.color3, colors.color2],
            [colors.color3, colors.color4],
            [colors.color3, colors.color5],
            [colors.color4, colors.color1],
            [colors.color4, colors.color2],
            [colors.color4, colors.color3],
            [colors.color4, colors.color5],
            [colors.color5, colors.color1],
            [colors.color5, colors.color2],
            [colors.color5, colors.color3],
            [colors.color5, colors.color4]
        ];

        for (let i = 1; i <= 20; i++) {
            const exampleDiv = imageColor.querySelector(`.example${i}`);
            const comboIndex = i - 1;
            exampleDiv.style.backgroundColor = colorCombos[comboIndex][0];
            exampleDiv.style.color = colorCombos[comboIndex][1];
        }
    });
});

function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#171010e3' : '#f1f1f1e3';
}

function copyToClipboard(text, element) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const originalText = element.innerText;
    element.innerText = 'Copied';
    element.classList.add('copied');
    setTimeout(() => {
        element.innerText = originalText;
        element.classList.remove('copied');
    }, 2000);
}