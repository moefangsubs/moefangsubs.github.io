const sliderWrapper = document.querySelector('.slider-wrapper');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

nextBtn.addEventListener('click', () => {
  if (currentIndex < 42) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = 42;
  }
  updateSlider();
});

let startX = 0;
let endX = 0;

sliderWrapper.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

sliderWrapper.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const difference = startX - endX;
  if (difference > 50) {
    nextBtn.click();
  } else if (difference < -50) {
    prevBtn.click();
  }
}

function updateSlider() {
  // Hanya jalankan fungsi jika lebar layar lebih dari 1280px
  if (window.innerWidth > 1280) {
    const translateValue = currentIndex * -20; /* 20% per slide */
    sliderWrapper.style.transform = `translateX(${translateValue}%)`;
  }
}

// Listener untuk merespons perubahan ukuran layar
window.addEventListener('resize', () => {
  updateSlider(); // Perbarui slider saat ukuran layar berubah
});

// Panggil updateSlider() saat halaman dimuat pertama kali
window.addEventListener('load', () => {
  updateSlider();
});
