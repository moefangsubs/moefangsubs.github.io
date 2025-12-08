document.addEventListener('DOMContentLoaded', function() {
    const sparkContainer = document.getElementById('spark-container');
    if (!sparkContainer) return;
    const sparkImages = [
        '../sprite/element/spark1.svg',
        '../sprite/element/spark2.svg',
        '../sprite/element/spark3.svg',
        '../sprite/element/spark4.svg',
        '../sprite/element/spark5.svg',
        '../sprite/element/spark6.svg'
    ];
    const sparkCount = 15; 
    const specificSizes = [50, 25, 15, 5];
    function createSpark() {
        const spark = document.createElement('img');
        spark.src = sparkImages[Math.floor(Math.random() * sparkImages.length)];
        spark.classList.add('spark');
        const size = specificSizes[Math.floor(Math.random() * specificSizes.length)];
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.left = `${Math.random() * 100}vw`;
        spark.style.top = `${Math.random() * 100}vh`;
        spark.style.animationDuration = `${Math.random() * 1 + 1}s`; 
        spark.addEventListener('animationend', () => {
            spark.remove();
            createSpark();
        });
        sparkContainer.appendChild(spark);
    }
    for (let i = 0; i < sparkCount; i++) {
        setTimeout(createSpark, Math.random() * 2000);
    }
});