const ML_FIREBASE = {
    checkUserRole: async (email) => {
        try {
            const doc = await ML_STATE.refs.db.collection('masterlist_data')
                .doc('role_parent')
                .collection('list_users')
                .doc(email)
                .get();
            
            if (doc.exists) {
                ML_STATE.user.role = doc.data().status;
                return doc.data();
            } else {
                return null;
            }
        } catch (e) {
            console.error("Error checking role:", e);
            return null;
        }
    },

    registerUser: async () => {
        try {
            const email = ML_STATE.user.email;
            const displayName = ML_STATE.user.displayName;
            
            await ML_STATE.refs.db.collection('masterlist_data')
                .doc('role_parent')
                .collection('list_users')
                .doc(email)
                .set({
                    email: email,
                    nickname: displayName,
                    status: 'volunteer',
                    accept: false, 
                    is_add_edit: true,
                    is_add_fansub: false
                });
            return true;
        } catch (e) {
            console.error("Registration Error:", e);
            alert("Gagal mendaftar: " + e.message);
            return false;
        }
    },

    fetchShowsByCategory: async (category) => {
        try {
            const snapshot = await ML_STATE.refs.db.collection('masterlist_data')
                .doc('show_parent')
                .collection(category)
                .get();
            
            let shows = [];
            snapshot.forEach(doc => {
                shows.push({ id: doc.id, ...doc.data() });
            });
            return shows;
        } catch (e) {
            console.error(e);
            return [];
        }
    },

    fetchFansubs: async () => {
        try {
            const snapshot = await ML_STATE.refs.db.collection('masterlist_data')
                .doc('fansub_parent')
                .collection('list_fansubs')
                .get();
            
            ML_STATE.data.fansubs = {};
            const select = UI_REFS.forms.fansubSelect;
            
            while (select.options.length > 2) {
                select.remove(1);
            }

            snapshot.forEach(doc => {
                const d = doc.data();
                ML_STATE.data.fansubs[doc.id] = d;
                const opt = document.createElement('option');
                opt.value = doc.id;
                opt.textContent = d.name;
                select.insertBefore(opt, select.querySelector('option[value="other"]'));
            });
        } catch (e) {
            console.error("Error fetching fansubs", e);
        }
    },

    submitEpisode: async (formData) => {
        const showRef = ML_STATE.refs.db.collection('masterlist_data')
            .doc('show_parent')
            .collection(formData.category)
            .doc(formData.programId);
        
        const epsRef = showRef.collection('episodes').doc(formData.episodeNum);

        try {
            const doc = await epsRef.get();
            
            const newLinkEntry = {
                fansub: formData.fansubName,
                url: formData.url,
                lang: formData.lang,
                type: formData.urlType,
                added_by: ML_STATE.user.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };

            if (doc.exists) {
                const existingData = doc.data();
                const duplicate = existingData.links.find(l => 
                    l.fansub.toLowerCase() === formData.fansubName.toLowerCase()
                );

                if (duplicate) {
                    throw new Error("Penyimpanan ditolak! Alasan: Fansub ini sudah menginput episode ini.");
                }

                await epsRef.update({
                    links: firebase.firestore.FieldValue.arrayUnion(newLinkEntry)
                });
            } else {
                await epsRef.set({
                    airing: formData.airingDate,
                    links: [newLinkEntry]
                });
            }
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    }
};