function containsJapanese(text) {
  return /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(text);
}
function forceJapaneseFont(root = document.body) {
  const elements = root.querySelectorAll('*');
  elements.forEach(el => {
    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
      const text = el.textContent.trim();
      if (containsJapanese(text)) {
        el.style.fontFamily = `'M PLUS Rounded 1c', sans-serif`;
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  forceJapaneseFont();
});
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.acara-list');
    const leftBtn = document.querySelector('.acara-nav-left');
    const rightBtn = document.querySelector('.acara-nav-right');
    if (container && leftBtn && rightBtn) {
        function isMobilePortrait() {
            return window.matchMedia("(max-width: 768px) and (orientation: portrait)").matches;
        }
        function calculateItemWidth() {
            if (isMobilePortrait()) return 0;
            const acaraItem = document.querySelector('.acara');
            if (!acaraItem) return 0;  
            return acaraItem.offsetWidth + 
                   parseInt(window.getComputedStyle(acaraItem).marginLeft) + 
                   parseInt(window.getComputedStyle(acaraItem).marginRight);
        }
        function updateButtons() {
            if (isMobilePortrait()) {
                leftBtn.style.visibility = 'hidden';
                rightBtn.style.visibility = 'hidden';
                return;
            }
            const tolerance = 10;
            leftBtn.style.visibility = container.scrollLeft <= tolerance ? 'hidden' : 'visible';
            rightBtn.style.visibility = container.scrollLeft >= container.scrollWidth - container.clientWidth - tolerance ? 'hidden' : 'visible';
        }
        function scrollToItem(direction) {
            if (isMobilePortrait()) return;
            const itemWidth = calculateItemWidth();
            if (itemWidth === 0) return;
            const currentScroll = container.scrollLeft;
            let targetScroll;
            if (direction === 'left') {
                targetScroll = Math.max(0, currentScroll - itemWidth);
            } else {
                targetScroll = Math.min(
                    container.scrollWidth - container.clientWidth,
                    currentScroll + itemWidth
                );
            }
            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
        leftBtn.addEventListener('click', () => scrollToItem('left'));
        rightBtn.addEventListener('click', () => scrollToItem('right'));
        container.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);
        updateButtons();
    }
});