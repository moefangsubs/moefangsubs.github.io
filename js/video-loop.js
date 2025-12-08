document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');

    // Daftar video yang tersedia
    const videoSources = [
        'https://ik.imagekit.io/moephotos/samenumbers0.webm',
        'https://ik.imagekit.io/moephotos/samenumbers1.webm',
        'https://ik.imagekit.io/moephotos/samenumbers3.webm'
    ];

    // Pilih URL video secara acak
    const randomIndex = Math.floor(Math.random() * videoSources.length);
    const randomVideoUrl = videoSources[randomIndex];

    // Atur sumber video
    video.src = randomVideoUrl;
    
    // Mulai memutar video
    video.play().catch(error => {
        // Tangani jika autoplay gagal
        console.error("Autoplay failed:", error);
    });
});