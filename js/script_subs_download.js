async function getDownloadCounts(episodeId) {
    try {
        const episodeRef = db.collection('episodes').doc(episodeId);
        const doc = await episodeRef.get();
        if (doc.exists) {
            const data = doc.data();
            return {
                hardsub: data.hardsubCount || 0,
                softsub: data.softsubCount || 0,
            };
        }
        return { hardsub: 0, softsub: 0 };
    } catch (error) {
        console.error("Error getting download counts:", error);
        return { hardsub: 0, softsub: 0 };
    }
}
async function incrementDownloadCount(episodeId, type) {
    if (!auth.currentUser) {
        console.log("User not logged in. Download count will not be incremented.");
        return;
    }
    if (type !== 'hardsub' && type !== 'softsub') {
        console.error("Invalid download type:", type);
        return;
    }
    const episodeRef = db.collection('episodes').doc(episodeId);
    const increment = firebase.firestore.FieldValue.increment(1);
    try {
        await episodeRef.set({
            [`${type}Count`]: increment
        }, { merge: true });
        console.log(`Successfully incremented ${type} count for ${episodeId}`);
    } catch (error) {
        console.error(`Failed to increment ${type} count:`, error);
    }
}
async function setupDownloadCounters(show, eps) {
    const episodeId = `${show}_eps_${eps}`;
    const hardsubBtn = document.getElementById('hardsub-btn');
    const softsubBtn = document.getElementById('softsub-btn');
    const counts = await getDownloadCounts(episodeId);
    if (hardsubBtn) {
        const countSpan = hardsubBtn.querySelector('.download-count');
        if (countSpan) countSpan.textContent = counts.hardsub;
    }
    if (softsubBtn) {
        const countSpan = softsubBtn.querySelector('.download-count');
        if(countSpan) countSpan.textContent = counts.softsub;
    }
    const handleDownloadClick = (event, type) => {
        if (auth.currentUser) {
            incrementDownloadCount(episodeId, type);
            const btn = type === 'hardsub' ? hardsubBtn : softsubBtn;
            if (btn) {
                const countSpan = btn.querySelector('.download-count');
                if (countSpan) {
                    const currentCount = parseInt(countSpan.textContent, 10) || 0;
                    countSpan.textContent = currentCount + 1;
                }
            }
        }
    };
    if (hardsubBtn) {
        hardsubBtn.addEventListener('mousedown', (e) => handleDownloadClick(e, 'hardsub'));
    }
    if (softsubBtn) {
        softsubBtn.addEventListener('mousedown', (e) => handleDownloadClick(e, 'softsub'));
    }
}