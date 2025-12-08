// =======================================================
// FUNGSI getCookie VERSI BARU YANG LEBIH BAIK
// =======================================================
function getCookie(cookieName) {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArray = decodedCookie.split(';');
  for(let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return ""; // Kembalikan string kosong jika tidak ditemukan
}

// Cek jika nilai cookie yang didapat TIDAK SAMA DENGAN 'true'
if (getCookie('user_logged_in') !== 'true') {
    // Jika tidak sah, lempar kembali ke halaman login
    window.location.href = 'index.html';
}