async function getLikeStatus(episodeId) {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        const episodeRef = db.collection('episodes').doc(episodeId);
        const episodeDoc = await episodeRef.get();
        const likeCount = episodeDoc.exists ? episodeDoc.data().likeCount : 0;
        return { likeCount, userHasLiked: false };
    }
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
    const batch = db.batch();
    if (userLikeDoc.exists) {
        batch.set(episodeRef, { 
            likeCount: firebase.firestore.FieldValue.increment(-1) 
        }, { merge: true });
        batch.delete(userLikeRef);
        await batch.commit();
        return 'unliked';
    } else {
        batch.set(episodeRef, { 
            likeCount: firebase.firestore.FieldValue.increment(1) 
        }, { merge: true });
        batch.set(userLikeRef, {
            show: show,
            eps: eps,
            likedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        await batch.commit();
        return 'liked';
    }
}