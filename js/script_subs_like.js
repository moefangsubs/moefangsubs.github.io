// File: ../js/script_subs_like.js
// Berisi semua fungsi untuk interaksi dengan Firestore (Like & Favorites)

/**
 * Mengambil jumlah total like dan status like dari pengguna untuk sebuah episode.
 * @param {string} episodeId - ID unik episode (e.g., "nogizaka-skits-act-1_eps_01").
 * @returns {Promise<{likeCount: number, userHasLiked: boolean}>}
 */
async function getLikeStatus(episodeId) {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        // Jika pengguna tidak login, hanya ambil jumlah like publik
        const episodeRef = db.collection('episodes').doc(episodeId);
        const episodeDoc = await episodeRef.get();
        const likeCount = episodeDoc.exists ? episodeDoc.data().likeCount : 0;
        return { likeCount, userHasLiked: false };
    }

    // Jika pengguna login, jalankan kedua query secara bersamaan untuk efisiensi
    const episodeRef = db.collection('episodes').doc(episodeId);
    const userLikeRef = db.collection('users').doc(currentUser.uid).collection('likes').doc(episodeId);

    const [episodeDoc, userLikeDoc] = await Promise.all([
        episodeRef.get(),
        userLikeRef.get()
    ]);

    const likeCount = episodeDoc.exists ? episodeDoc.data().likeCount : 0;
    const userHasLiked = userLikeDoc.exists;

    return { likeCount, userHasLiked };
}

/**
 * Menambah atau mengurangi status 'like' pada sebuah episode.
 * @param {string} show - Nama file JSON acara (e.g., "nogizaka-skits-act-1").
 * @param {string} eps - Nomor episode (e.g., "01").
 * @returns {Promise<string>} Aksi yang dilakukan ('liked' atau 'unliked').
 */
async function toggleLike(show, eps) {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.error("User not logged in");
        throw new Error("Anda harus login untuk menyukai postingan.");
    }

    const episodeId = `${show}_eps_${eps}`;
    const episodeRef = db.collection('episodes').doc(episodeId);
    const userLikeRef = db.collection('users').doc(currentUser.uid).collection('likes').doc(episodeId);

    const userLikeDoc = await userLikeRef.get();

    // Gunakan batch write untuk memastikan kedua operasi (update & delete/create) berhasil atau gagal bersamaan.
    const batch = db.batch();

    if (userLikeDoc.exists) {
        // --- PROSES UNLIKE ---
        // 1. Kurangi likeCount di koleksi 'episodes'
        batch.set(episodeRef, { 
            likeCount: firebase.firestore.FieldValue.increment(-1) 
        }, { merge: true });

        // 2. Hapus dokumen dari sub-koleksi 'likes' milik pengguna
        batch.delete(userLikeRef);

        await batch.commit();
        return 'unliked';
    } else {
        // --- PROSES LIKE ---
        // 1. Tambah likeCount di koleksi 'episodes'
        batch.set(episodeRef, { 
            likeCount: firebase.firestore.FieldValue.increment(1) 
        }, { merge: true });

        // 2. Buat dokumen di sub-koleksi 'likes' milik pengguna untuk mencatat histori
        batch.set(userLikeRef, {
            show: show,
            eps: eps,
            likedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        await batch.commit();
        return 'liked';
    }
}