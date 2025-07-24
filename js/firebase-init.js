// File: js/firebase-init.js

// TODO: Ganti dengan konfigurasi Firebase Anda dari file .txt
// Saya sudah isikan berdasarkan file .txt yang Anda berikan
const firebaseConfig = {
  apiKey: "AIzaSyDp6LHXi1-dmTKDq4eL_GB12mm_JFfeGfM",
  authDomain: "moefangsubs-ngz46.firebaseapp.com",
  projectId: "moefangsubs-ngz46",
  storageBucket: "moefangsubs-ngz46.firebasestorage.app",
  messagingSenderId: "124881237230",
  appId: "1:124881237230:web:360929b3c82ea9c17eefff",
  measurementId: "G-V4L9TSQGTH"
};

// Inisialisasi Firebase
// Gunakan versi 8 karena kode Anda saat ini tidak menggunakan 'module'
// Ini untuk menjaga konsistensi dan kemudahan
firebase.initializeApp(firebaseConfig);

// Buat shortcut untuk layanan yang akan sering kita gunakan
const auth = firebase.auth();
const db = firebase.firestore();