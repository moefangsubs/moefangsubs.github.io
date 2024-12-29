document.addEventListener("DOMContentLoaded", function () {
  function checkBirthdays() {
    const today = new Date();
    const todayStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    const hbdContainer = document.querySelector(".hbd-container");

    // Warna berdasarkan kategori
    const categoryColors = {
      nogi: "rgba(139,87,173,0.5)",
      keya: "rgba(27,106,33,0.5)",
      saku: "rgba(243,161,184,0.5)",
      hina: "rgba(123,202,234,0.5)",
      boku: "rgba(0,122,175,0.5)",
      gradn: "rgba(40,24,50,0.5)",
      gradk: "rgba(14,55,17,0.5)",
      grads: "rgba(75,10,28,0.5)",
      gradh: "rgba(11,51,68,0.5)"
    };

    for (const group in calendarData) {
      for (const generation in calendarData[group]) {
        calendarData[group][generation].forEach(member => {
          const [nameJP, nameEN, imgName, dob, imgGroup] = member;
          if (dob.includes(`${today.getMonth() + 1}月${today.getDate()}日`)) {
            const birthYear = parseInt(dob.split("年")[0]);
            const age = today.getFullYear() - birthYear;

            const hbdDiv = document.createElement("div");
            hbdDiv.className = "hbd";
            hbdDiv.style.setProperty("--bg-image", `url('https://ik.imagekit.io/moearchive/calendar/${imgGroup}/${imgName}.png')`);
            
            // Ubah background color berdasarkan kategori
            const bgColor = categoryColors[group] || "rgba(255, 255, 255, 0.1)"; // Default jika kategori tidak ditemukan
            hbdDiv.style.backgroundColor = bgColor;

            // Cek apakah layar lebih kecil dari 720px
            if (window.innerWidth <= 720) {
              // Tampilkan versi mobile untuk ukuran layar kecil
              hbdDiv.innerHTML = `
                <div class="hbd-content">
                  <p>HAPPY BIRTHDAY</p>
                  <p><span>${nameEN}</span></p>
                  <p>yang ke-<span>${age}</span> tahun!</p>
                </div>
              `;
            } else {
              // Tampilkan versi desktop untuk ukuran layar besar
              hbdDiv.innerHTML = `
                <div class="hbd-content">
                  <p>SELAMAT ULANG TAHUN</p>
                  <p><span>${nameEN}</span> yang ke-<span>${age}</span> tahun!</p>
                </div>
              `;
            }

            hbdContainer.appendChild(hbdDiv);
          }
        });
      }
    }
  }

  checkBirthdays();
});
