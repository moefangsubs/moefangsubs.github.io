// script memanggil about show secara general
//
document.addEventListener("DOMContentLoaded", function() {
    // Mendapatkan semua elemen <p> dengan data-acara attribute
    const acaraElements = document.querySelectorAll('[data-acara]');

    // Mengisi konten <p> sesuai dengan data-acara attribute
    acaraElements.forEach(function(element) {
        const acaraKey = element.dataset.acara;
        if (acaraData.hasOwnProperty(acaraKey)) {
            element.innerHTML = acaraData[acaraKey];
        }
    });
});



// Fungsi untuk menangani efek ketika episodelist ditekan
//
function applyEffect(element) {
    // Menghapus kelas 'clicked' dari semua elemen dengan kelas 'episodelist'
    document.querySelectorAll('.episodelist').forEach(function (el) {
        el.querySelector('img').classList.remove('clicked');
    });

    // Menambahkan kelas 'clicked' pada elemen yang ditekan
    element.classList.add('clicked');
}

// Mendapatkan semua elemen episodelist
var episodelistElements = document.querySelectorAll('.episodelist');

// Menambahkan event listener untuk setiap elemen episodelist
episodelistElements.forEach(function (episodelistElement) {
    episodelistElement.addEventListener('click', function () {
        // Mendapatkan nilai data-episode dari elemen yang ditekan
        var episodeNumber = episodelistElement.getAttribute('data-episode');

        // Memanggil fungsi applyEffect dengan mengirimkan elemen gambar yang ditekan
        applyEffect(episodelistElement.querySelector('img'));

        // Di sini Anda dapat menambahkan logika khusus sesuai dengan kebutuhan Anda
        // Contoh: Memuat konten episode yang sesuai, menampilkan informasi episode, dll.
    });
});



// Mematikan klik kanan
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Mencegah Inspect Element
document.addEventListener('keydown', function(e) {
  if (
    (e.key === "F12" && (e.ctrlKey || e.metaKey)) ||
    (e.key === "I" && (e.ctrlKey || e.metaKey)) ||
    (e.key === "C" && e.ctrlKey) ||
    (e.key === "G" && e.ctrlKey) ||
    (e.key === "F3" && e.ctrlKey) ||
    (e.key === "U" && e.ctrlKey)
  ) {
    e.preventDefault();
  }
});


// Mematikan pemilihan teks
document.onselectstart = function() {
  return false;
};


//
// display ketika klik episode
//

document.addEventListener("DOMContentLoaded", function () {
  const episodelistDivs = document.querySelectorAll(".episodelist");
  const buttonsElement = document.getElementById("buttons");
  const buttonsspElement = document.getElementById("buttonssp");
  const epdetailElement = document.getElementById("epdetail");
  const w3contentElements = document.querySelectorAll(".eps-thumb");
  const episodeNogiButtons = document.querySelectorAll(".episode_nogi");

  episodelistDivs.forEach(function (episodelistDiv) {
    episodelistDiv.addEventListener("click", function () {
      // Menggunakan classList untuk menambah kelas "show"
      buttonsElement.classList.add("show");
      buttonsspElement.classList.add("show");
      epdetailElement.classList.add("show");

      // Setelah menambah kelas "show", mengubah properti display menjadi "flex" tidak lagi diperlukan
      w3contentElements.forEach(function (w3contentElement) {
        w3contentElement.style.display = "flex";
      });

      // Script untuk menampilkan thumbnails
      const episodeNumber = episodelistDiv.getAttribute("data-episode");
      document.getElementById("imageThumb").src = imageThumbA[episodeNumber];
      document.getElementById("imageThumbA").src = imageThumbA[episodeNumber];
      document.getElementById("imageThumbB").src = imageThumbB[episodeNumber];
      document.getElementById("imageThumbC").src = imageThumbC[episodeNumber];
      document.getElementById("imageThumbD").src = imageThumbD[episodeNumber];
    });
  });

  // Script untuk menangani episode_nogiButtons
  episodeNogiButtons.forEach(button => {
    button.addEventListener("click", function () {
      const episodeNumber = button.getAttribute("data-episode");
      const linkType = button.getAttribute("data-link-type");
      const link = eval(linkType)[episodeNumber];
      if (link) {
        window.open(link, "_blank");
      } else {
        console.error("Link not found for episode " + episodeNumber);
      }
    });
  });
});


//
// pemilihan menu dengan filter
//


function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-opacity-off";
}


//
// script untuk hidden elemen ketika pertama kali dibuka sebelum menekan episode list
//
document.addEventListener("DOMContentLoaded", function() {
  const isihalaman = document.querySelector('.isihalaman');
  const descEpisode = document.getElementById('descEpisode');
  const episodelistButtons = document.querySelectorAll('.episodelist');
  const epsBigthumb = document.querySelector('.eps-bigthumb');

  // Sembunyikan elemen saat halaman dimuat
  isihalaman.style.display = 'none';
  descEpisode.style.display = 'none';
  epsBigthumb.style.display = 'none';

  // Tampilkan elemen saat episodelist di klik
  episodelistButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const episodeNumber = button.getAttribute('data-episode');

      isihalaman.style.display = 'block';
      descEpisode.style.display = 'block';
      epsBigthumb.style.display = 'block';
    });
  });
});




//
// script untuk spoiler cara pakai & warn
//


// Fungsi untuk menampilkan atau menyembunyikan elemen dengan class "stepspoil"
function toggleVisibility(className) {
  // Mengambil elemen yang diklik
  var clickedElement = document.querySelector('.' + className);

  // Jika elemen yang diklik memiliki class "active", maka sembunyikan "stepspoil" dan hapus class "active"
  if (clickedElement.classList.contains('active')) {
    clickedElement.querySelector('.stepspoil').style.display = 'none';
    clickedElement.classList.remove('active');
  } else {
    // Jika tidak, sembunyikan semua "stepspoil" dan hapus class "active" dari semua elemen
    document.querySelectorAll('.stepspoil').forEach(function(stepspoil) {
      stepspoil.style.display = 'none';
    });
    document.querySelectorAll('.active').forEach(function(activeElement) {
      activeElement.classList.remove('active');
    });

    // Memperlihatkan elemen yang dipilih dan menambah class "active"
    clickedElement.querySelector('.stepspoil').style.display = 'block';
    clickedElement.classList.add('active');
  }
}

// Menghubungkan fungsi toggleVisibility dengan setiap elemen yang membutuhkan
document.querySelector('.carapake_softsub').addEventListener('click', function() {
  toggleVisibility('carapake_softsub');
});

document.querySelector('.carapake_hardsub').addEventListener('click', function() {
  toggleVisibility('carapake_hardsub');
});

document.querySelector('.password_garapan').addEventListener('click', function() {
  toggleVisibility('password_garapan');
});

document.querySelector('.masalah_unduh').addEventListener('click', function() {
  toggleVisibility('masalah_unduh');
});
const allStepspoil = document.querySelectorAll(".stepspoil");
