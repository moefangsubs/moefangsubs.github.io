document.addEventListener('DOMContentLoaded', () => {
    const loadingBar = document.getElementById('loading-bar');
    const totalFrames = 10;
    const frameWidth = 150;
    const frameDuration = 500; 
    let currentFrame = 0;
    setInterval(() => {
        const positionX = -(currentFrame * frameWidth);
        loadingBar.style.backgroundPosition = `${positionX}px 0px`;
        currentFrame = (currentFrame + 1) % totalFrames;
    }, frameDuration);
});