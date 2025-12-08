document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');
    const videoSources = [
        'https://ik.imagekit.io/moephotos/samenumbers0.webm',
        'https://ik.imagekit.io/moephotos/samenumbers1.webm',
        'https://ik.imagekit.io/moephotos/samenumbers3.webm'
    ];
    const randomIndex = Math.floor(Math.random() * videoSources.length);
    const randomVideoUrl = videoSources[randomIndex];
    video.src = randomVideoUrl;
    video.play().catch(error => {
        console.error("Autoplay failed:", error);
    });
});