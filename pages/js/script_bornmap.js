const svgContainer = document.getElementById('svg-container');
const svg = document.getElementById('map-svg');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');

let scale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX, startY;
let startDistance = 0;
let pinchStartScale = 1;
let isPinching = false;

// Fungsi untuk mengupdate transformasi SVG
function updateTransform() {
    svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// Fungsi untuk menghitung jarak antara dua jari (pinch)
function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// **1. Zoom dengan tombol**
zoomInBtn.addEventListener('click', () => {
    if (scale < 15) {
        scale += 0.5;
        updateTransform();
    }
});

zoomOutBtn.addEventListener('click', () => {
    if (scale > 0.5) {
        scale -= 0.5;
        updateTransform();
    }
});

// **2. Zoom dengan scroll mouse**
svgContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    const zoomFactor = 0.1;
    if (event.deltaY < 0 && scale < 15) {
        scale += zoomFactor;
    } else if (event.deltaY > 0 && scale > 0.5) {
        scale -= zoomFactor;
    }
    updateTransform();
});

// **3. Drag dengan mouse**
svgContainer.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX - translateX;
    startY = event.clientY - translateY;
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    translateX = event.clientX - startX;
    translateY = event.clientY - startY;
    updateTransform();
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// **4. Drag dengan touch (jari)**
svgContainer.addEventListener('touchstart', (event) => {
    if (event.touches.length === 1) {
        // Satu jari → Drag
        isDragging = true;
        startX = event.touches[0].clientX - translateX;
        startY = event.touches[0].clientY - translateY;
    } else if (event.touches.length === 2) {
        // Dua jari → Pinch-to-Zoom
        isPinching = true;
        startDistance = getDistance(event.touches);
        pinchStartScale = scale;
    }
});

svgContainer.addEventListener('touchmove', (event) => {
    if (isDragging && event.touches.length === 1) {
        translateX = event.touches[0].clientX - startX;
        translateY = event.touches[0].clientY - startY;
        updateTransform();
    } else if (isPinching && event.touches.length === 2) {
        const newDistance = getDistance(event.touches);
        const scaleFactor = newDistance / startDistance;
        scale = Math.min(15, Math.max(0.5, pinchStartScale * scaleFactor));
        updateTransform();
    }
});

svgContainer.addEventListener('touchend', () => {
    isDragging = false;
    isPinching = false;
});


// -------------------------
// -------------------------

// Efek hover yang menaikkan <g> ke posisi teratas
document.querySelectorAll('g').forEach(group => {
    group.addEventListener('mouseenter', () => {
        document.querySelectorAll('g').forEach(g => g.classList.add('non-hover'));
        group.classList.remove('non-hover');
        group.parentNode.appendChild(group);
    });

    group.addEventListener('mouseleave', () => {
        document.querySelectorAll('g').forEach(g => g.classList.remove('non-hover'));
    });
});

// Menampilkan div berdasarkan <g> yang diklik dengan efek fade
document.querySelectorAll('g').forEach(group => {
    group.addEventListener('click', () => {
        const id = group.id;
        const contentDivs = document.querySelectorAll('.member-content > div');
        const targetDiv = document.querySelector(`.member-content > div#content-${id}`);

        // Jika sudah aktif, jangan lakukan apa-apa
        if (targetDiv.classList.contains('active')) return;

        // Sembunyikan semua dengan fade out
        contentDivs.forEach(div => {
            div.style.opacity = '0';
            div.style.transform = 'translateY(10px)';
            setTimeout(() => {
                div.classList.remove('active');
                div.style.display = 'none';
            }, 500); // Tunggu animasi selesai (0.5s)
        });

        // Tampilkan yang dipilih dengan fade in setelah delay
        setTimeout(() => {
            targetDiv.style.display = 'block';
            setTimeout(() => {
                targetDiv.classList.add('active');
                targetDiv.style.opacity = '1';
                targetDiv.style.transform = 'translateY(0)';
            }, 10); // Sedikit delay agar transisi bekerja
        }, 500);
    });
});

// Efek klik pada <g> untuk highlight dan reset
document.querySelectorAll('g').forEach(group => {
    group.addEventListener('click', (event) => {
        event.stopPropagation(); // Mencegah klik dari menyebar ke body

        // Jika sudah active, maka kembali normal
        if (group.classList.contains('active')) {
            group.classList.remove('active');
            document.querySelectorAll('g').forEach(g => g.classList.remove('inactive'));
            return;
        }

        // Reset semua <g>
        document.querySelectorAll('g').forEach(g => {
            g.classList.remove('active', 'hovering');
            g.classList.add('inactive');
        });

        // Aktifkan yang baru diklik
        group.classList.add('active');
        group.classList.remove('inactive');

        // Pindahkan ke atas dalam urutan SVG
        group.parentNode.appendChild(group);
    });

    // Saat hover, tetap naik ke atas jika ada yang aktif
    group.addEventListener('mouseenter', () => {
        if (!group.classList.contains('active')) {
            group.classList.add('hovering');
            group.parentNode.appendChild(group);
        }
    });

    group.addEventListener('mouseleave', () => {
        group.classList.remove('hovering');
    });
});

// Klik di luar SVG, reset semua ke normal
document.body.addEventListener('click', () => {
    document.querySelectorAll('g').forEach(g => g.classList.remove('active', 'inactive', 'hovering'));
});


document.addEventListener("DOMContentLoaded", () => {
    // Warna gradien dari gelap ke terang
    const colors = [
		"#460011", "#570015", "#69001a", "#7b001e", "#8c0023", "#9e0027", "#af002b", "#c10030", "#d30034", "#e40039", "#f6003d", "#fe0846", "#ff1a53", "#ff2b60", "#fe3d6d", "#ff4f7b", "#ff6088", "#fe7295", "#ff83a2", "#ff95af"
    ];

    // Menghitung jumlah member di setiap prefektur
    const prefCount = {};

    Object.values(memberData).forEach(group => {
        Object.values(group).flat().forEach(member => {
            const pref = member[3]; // Prefektur di posisi ke-4 array
            prefCount[pref] = (prefCount[pref] || 0) + 1;
        });
    });

    // Mewarnai setiap prefektur berdasarkan jumlah member
    document.querySelectorAll("svg g").forEach(group => {
        const prefName = group.id; // ID dari elemen <g> sebagai nama prefektur
        const count = prefCount[prefName] || 0; // Jumlah member di prefektur

        if (count > 0) {
            const colorIndex = Math.min(count - 1, colors.length - 1); // Batasi indeks warna
            group.querySelectorAll(".land").forEach(path => {
                path.style.fill = colors[colorIndex]; // Terapkan warna ke path dalam group
            });
        } else {
            group.querySelectorAll(".land").forEach(path => {
                path.style.fill = "#12051057"; // Default jika tidak ada member
            });
        }
    });
});



