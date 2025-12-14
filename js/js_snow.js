/**
 * js_snow.js (Versi 3 - Dot/Bulatan)
 * Mode: Dot Salju Klasik
 * Fix: Animasi halus, tidak menumpuk di atas.
 */

(function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; 
    canvas.style.zIndex = '9999'; 
    canvas.id = 'canvas-snow';
    
    document.body.appendChild(canvas);

    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // --- Konfigurasi ---
    var maxFlakes = 100; // Jumlah titik
    var flakes = [];

    for (var i = 0; i < maxFlakes; i++) {
        flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 3 + 2, // Radius dot: 2px - 5px (Cukup jelas)
            d: Math.random() * maxFlakes,
            a: Math.random() * 0.2 + 0.3, // Opacity: 0.4 - 0.9
            speed: Math.random() * 0.7 + 0.3 // Kecepatan: Pelan
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "white";
        ctx.beginPath();
        
        for (var i = 0; i < maxFlakes; i++) {
            var f = flakes[i];
            ctx.moveTo(f.x, f.y);
            // Menggambar lingkaran (dot)
            ctx.globalAlpha = f.a; 
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
    }

    var angle = 0;
    function moveFlakes() {
        angle += 0.01;
        for (var i = 0; i < maxFlakes; i++) {
            var f = flakes[i];
            
            // Gerakan jatuh + goyang kiri kanan
            f.y += f.speed; 
            f.x += Math.sin(angle + f.d) * 0.5;

            // Reset jika lewat bawah layar
            if (f.y > height) {
                // Muncul lagi di ATAS layar (posisi negatif) agar masuknya smooth
                f.y = -10; 
                f.x = Math.random() * width;
            }
            
            // Loop kiri-kanan jika tertiup angin keluar layar
            if (f.x > width + 5) f.x = -5;
            if (f.x < -5) f.x = width + 5;
        }
    }

    function animate() {
        draw();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', function() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });
})();