// ----------------------------------------------------
// Global Configuration & Constants
// ----------------------------------------------------
const CWP_BASE_URL = 'https://full.diskon.cloud/~moefa404/store/data/blog';
const MEMBERS_JSON_URL = '../store/member/members.json';

// Path SVG Element
const ICON_EYE = '../sprite/element/eye_show.svg';
const ICON_LIKE_DEFAULT = '../sprite/element/like_x.svg';
const ICON_LIKE_FILLED = '../sprite/element/like_v.svg';

// ----------------------------------------------------
// App Initialization
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const blogListView = document.getElementById('blogListView');
    const blogReaderView = document.getElementById('blogReaderView');
    const blogGrid = document.getElementById('blogGrid');
    const blogCount = document.getElementById('blogCount');
    const btnBackToList = document.getElementById('btnBackToList');

    const memberDropdown = document.getElementById('memberDropdown');
    const memberDropdownBtn = document.getElementById('memberDropdownBtn');
    const memberDropdownMenu = document.getElementById('memberDropdownMenu');
    const memberDropdownList = document.getElementById('memberDropdownList');
    const selectedMemberText = document.getElementById('selectedMemberText');

    const btnBlogLike = document.getElementById('btnBlogLike');
    const readLikeIcon = document.getElementById('readLikeIcon');
    const readLikeCount = document.getElementById('readLikeCount');

    let allPosts = [];
    let memberLookup = {};
    let memberList = [];
    let selectedMember = null;
    let savedScrollPosition = 0;

    // Cache Stats Firestore lokal: { "104938": { views: 5, likes: 2, liked_by: [...] } }
    let blogStatsCache = {};
    let currentUser = null;
    let currentReadingId = null;

    // Inisialisasi Auth Firestore
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(user => {
            currentUser = user;
            if (currentReadingId) {
                checkLikeStatus(currentReadingId);
            }
        });
    }

    loadBlogIndex();

    fetch(`${MEMBERS_JSON_URL}?t=${Date.now()}`)
        .then(res => res.json())
        .then(members => {
            memberList = Array.isArray(members) ? members : [];
            memberList.forEach(m => {
                const normRomaji = (m.nama_romaji || '').toLowerCase().replace(/\s+/g, '');
                const normJp = (m.nama_jp || '').replace(/\s+/g, '');
                if (normRomaji) memberLookup[normRomaji] = m;
                if (normJp) memberLookup[normJp] = m;
            });
            buildMemberDropdown();
            if (allPosts.length > 0) {
                renderGrid(allPosts);
            }
        })
        .catch(err => {
            console.warn('Gagal memuat members.json, melanjutkan tanpa profil member:', err);
        });

    // ----------------------------------------------------
    // Firestore Interaction Functions
    // ----------------------------------------------------
    function getDb() {
        return (typeof firebase !== 'undefined' && firebase.firestore) ? firebase.firestore() : null;
    }

    // Ambil data view & like dari Firestore secara batch
    function fetchAllStats() {
        const db = getDb();
        if (!db) return;

        db.collection('blog').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    blogStatsCache[doc.id] = doc.data();
                });
                updateStatsInDOM();
            })
            .catch(err => {
                console.warn('Gagal memuat statistik blog dari Firestore:', err);
            });
    }

    function recordBlogView(blogId) {
        const db = getDb();
        if (!db || !blogId) return;

        const docRef = db.collection('blog').doc(String(blogId));
        docRef.set({
            views: firebase.firestore.FieldValue.increment(1)
        }, { merge: true })
        .then(() => {
            if (!blogStatsCache[blogId]) {
                blogStatsCache[blogId] = { views: 1, likes: 0, liked_by: [] };
            } else {
                blogStatsCache[blogId].views = (blogStatsCache[blogId].views || 0) + 1;
            }
            updateStatsInDOM(blogId);
        })
        .catch(err => console.warn('Gagal menambah view:', err));
    }

    function checkLikeStatus(blogId) {
        if (!btnBlogLike) return;

        const stats = blogStatsCache[blogId] || { likes: 0, liked_by: [] };
        const likes = stats.likes || 0;
        const likedBy = Array.isArray(stats.liked_by) ? stats.liked_by : [];

        readLikeCount.innerText = likes;

        const isLiked = currentUser && likedBy.includes(currentUser.uid);

        if (isLiked) {
            btnBlogLike.disabled = true;
            btnBlogLike.classList.add('is-liked');
            readLikeIcon.src = ICON_LIKE_FILLED;
        } else {
            btnBlogLike.disabled = !currentUser;
            btnBlogLike.classList.remove('is-liked');
            readLikeIcon.src = ICON_LIKE_DEFAULT;
        }
    }

    if (btnBlogLike) {
        btnBlogLike.addEventListener('click', () => {
            if (!currentUser || !currentReadingId || btnBlogLike.disabled) return;

            const db = getDb();
            if (!db) return;

            const blogId = String(currentReadingId);
            const docRef = db.collection('blog').doc(blogId);

            btnBlogLike.disabled = true;
            btnBlogLike.classList.add('is-liked');
            readLikeIcon.src = ICON_LIKE_FILLED;

            docRef.set({
                likes: firebase.firestore.FieldValue.increment(1),
                liked_by: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
            }, { merge: true })
            .then(() => {
                if (!blogStatsCache[blogId]) {
                    blogStatsCache[blogId] = { views: 1, likes: 1, liked_by: [currentUser.uid] };
                } else {
                    blogStatsCache[blogId].likes = (blogStatsCache[blogId].likes || 0) + 1;
                    if (!Array.isArray(blogStatsCache[blogId].liked_by)) {
                        blogStatsCache[blogId].liked_by = [];
                    }
                    blogStatsCache[blogId].liked_by.push(currentUser.uid);
                }
                readLikeCount.innerText = blogStatsCache[blogId].likes;
                updateStatsInDOM(blogId);
            })
            .catch(err => {
                console.error('Gagal memberikan like:', err);
                btnBlogLike.disabled = false;
                btnBlogLike.classList.remove('is-liked');
                readLikeIcon.src = ICON_LIKE_DEFAULT;
            });
        });
    }

    function updateStatsInDOM(targetId = null) {
        const selector = targetId ? `.card-stats-group[data-id="${targetId}"]` : '.card-stats-group';
        document.querySelectorAll(selector).forEach(el => {
            const bId = el.getAttribute('data-id');
            const data = blogStatsCache[bId] || { views: 0, likes: 0, liked_by: [] };
            const vCount = el.querySelector('.view-count-text');
            const lCount = el.querySelector('.like-count-text');
            const lIcon = el.querySelector('.card-like-icon');

            if (vCount) vCount.innerText = data.views || 0;
            if (lCount) lCount.innerText = data.likes || 0;

            if (lIcon) {
                const isUserLiked = currentUser && Array.isArray(data.liked_by) && data.liked_by.includes(currentUser.uid);
                lIcon.src = isUserLiked ? ICON_LIKE_FILLED : ICON_LIKE_DEFAULT;
            }
        });
    }

    // ----------------------------------------------------
    // Helper Functions
    // ----------------------------------------------------
    function getMemberInfo(kanji, romaji) {
        const keyRomaji = (romaji || '').toLowerCase().replace(/\s+/g, '');
        const keyJp = (kanji || '').replace(/\s+/g, '');
        return memberLookup[keyRomaji] || memberLookup[keyJp] || null;
    }

    function getBlogIdFromUrl() {
        const search = window.location.search;
        if (!search) return null;
        if (search.startsWith('?=')) return search.substring(2);
        const params = new URLSearchParams(search);
        if (params.get('id')) return params.get('id');
        if (/^\?\d+$/.test(search)) return search.substring(1);
        return null;
    }

    function isSameMember(post, member) {
        if (!member) return true;
        const normPostRomaji = (post.author_romaji || '').toLowerCase().replace(/\s+/g, '');
        const normPostJp = (post.author_kanji || '').replace(/\s+/g, '');
        const normMemRomaji = (member.nama_romaji || '').toLowerCase().replace(/\s+/g, '');
        const normMemJp = (member.nama_jp || '').replace(/\s+/g, '');

        return (normPostRomaji && normMemRomaji && normPostRomaji === normMemRomaji) ||
               (normPostJp && normMemJp && normPostJp === normMemJp);
    }

    function autoLinkText(html) {
        if (!html) return '';
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const urlPattern = /(https?:\/\/[^\s<>"']+)/gi;

        const walker = document.createTreeWalker(
            doc.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (node.parentElement && ['A', 'SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );

        const nodesToReplace = [];
        let currentNode = walker.nextNode();
        while (currentNode) {
            if (urlPattern.test(currentNode.nodeValue)) {
                nodesToReplace.push(currentNode);
            }
            urlPattern.lastIndex = 0;
            currentNode = walker.nextNode();
        }

        nodesToReplace.forEach(textNode => {
            const fragment = document.createDocumentFragment();
            const parts = textNode.nodeValue.split(urlPattern);

            parts.forEach(part => {
                if (urlPattern.test(part)) {
                    const anchor = document.createElement('a');
                    anchor.href = part;
                    anchor.target = '_blank';
                    anchor.rel = 'noopener noreferrer';
                    anchor.className = 'blog-intext-link';
                    anchor.textContent = part;
                    fragment.appendChild(anchor);
                } else if (part.length > 0) {
                    fragment.appendChild(document.createTextNode(part));
                }
                urlPattern.lastIndex = 0;
            });

            textNode.parentNode.replaceChild(fragment, textNode);
        });

        return doc.body.innerHTML;
    }

    function buildMemberDropdown() {
        if (!memberDropdownList || memberList.length === 0) return;

        let html = `
            <div class="member-item all-option" data-id="ALL">
                <span class="member-item-name">Semua Member</span>
                <span class="member-item-date">${allPosts.length} Blog</span>
            </div>
        `;

        memberList.forEach(m => {
            const memberPosts = allPosts.filter(p => isSameMember(p, m));
            const isGrad = (m.status || '').toLowerCase() === 'lulus';

            if (isGrad && memberPosts.length === 0) return;

            let dateText = '-';
            if (memberPosts.length > 0) {
                const latestDate = memberPosts[0].date || '';
                const parts = latestDate.split(' ');
                if (parts.length >= 2) {
                    const d = parts[0].substring(5);
                    const t = parts[1].substring(0, 5);
                    dateText = `${d.replace('-', '.')} ${t} New`;
                } else {
                    dateText = `${latestDate} New`;
                }
            }

            const itemClass = isGrad ? 'member-item graduated' : 'member-item';

            html += `
                <div class="${itemClass}" data-id="${m.id}" data-has-posts="${memberPosts.length > 0}">
                    <span class="member-item-name">${m.nama_romaji || m.nama_jp}</span>
                    <span class="member-item-date">${dateText}</span>
                </div>
            `;
        });

        memberDropdownList.innerHTML = html;

        memberDropdownList.querySelectorAll('.member-item').forEach(item => {
            item.addEventListener('click', () => {
                const memberId = item.getAttribute('data-id');
                memberDropdownMenu.classList.remove('open');

                if (memberId === 'ALL') {
                    selectedMember = null;
                    selectedMemberText.innerText = 'Pilih member';
                    renderGrid(allPosts);
                    return;
                }

                const targetMember = memberList.find(m => String(m.id) === String(memberId));
                if (!targetMember) return;

                const memberPosts = allPosts.filter(p => isSameMember(p, targetMember));
                if (memberPosts.length === 0) {
                    alert('Member ini belum ada terjemahan blognya');
                    return;
                }

                selectedMember = targetMember;
                selectedMemberText.innerText = targetMember.nama_romaji || targetMember.nama_jp;
                renderGrid(memberPosts);
            });
        });
    }

    memberDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        memberDropdownMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!memberDropdown.contains(e.target)) {
            memberDropdownMenu.classList.remove('open');
        }
    });

    function showListView() {
        currentReadingId = null;
        blogReaderView.style.display = 'none';
        blogListView.style.display = 'block';
        document.title = 'Nogizaka46 Member Blog - MoeData';

        window.scrollTo({
            top: savedScrollPosition,
            behavior: 'instant'
        });
        updateStatsInDOM();
    }

    function showReaderView(id) {
        currentReadingId = String(id);
        blogListView.style.display = 'none';
        blogReaderView.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        document.getElementById('readTitle').innerText = 'Memuat artikel...';
        document.getElementById('readJpTitle').innerText = '';
        document.getElementById('readDate').innerText = '';
        document.getElementById('readBody').innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Memuat isi blog...</div>';

        // 1. Tambah +1 view ke Firestore
        recordBlogView(id);

        // 2. Cek status tombol like
        checkLikeStatus(id);

        fetch(`${CWP_BASE_URL}/${id}.json?t=${Date.now()}`)
            .then(res => {
                if (!res.ok) throw new Error('Artikel tidak ditemukan.');
                return res.json();
            })
            .then(post => {
                const mInfo = getMemberInfo(post.author_kanji, post.author_romaji);
                const displayRomaji = (mInfo && mInfo.nama_romaji) ? mInfo.nama_romaji : post.author_romaji;

                document.title = `${post.translated_title} - ${displayRomaji} | MoeData`;
                document.getElementById('readTitle').innerText = post.translated_title;
                document.getElementById('readJpTitle').innerText = post.original_title;
                document.getElementById('readDate').innerText = post.date;
                document.getElementById('readOrigLink').href = post.original_url;
                document.getElementById('readBody').innerHTML = autoLinkText(post.content_html);

                const sideImg = document.getElementById('sideMemberImg');
                const sideRomaji = document.getElementById('sideMemberRomaji');
                const sideKanji = document.getElementById('sideMemberKanji');
                const sideLink = document.getElementById('sideMemberLink');

                sideRomaji.innerText = displayRomaji || '';
                sideKanji.innerText = post.author_kanji || '';

                if (mInfo) {
                    sideLink.href = `../moedata/member.html?id=${mInfo.id}`;
                    sideLink.style.display = 'inline-block';
                    sideImg.src = mInfo.foto_profil ? mInfo.foto_profil : post.thumbnail;
                    sideImg.alt = displayRomaji;
                    sideImg.style.display = 'block';
                } else {
                    sideLink.style.display = 'none';
                    sideImg.src = post.thumbnail;
                    sideImg.alt = displayRomaji;
                    sideImg.style.display = 'block';
                }

                renderSidebarEntries(post, id);
            })
            .catch(err => {
                document.getElementById('readBody').innerHTML = `<div class="error-msg"><i class="fas fa-exclamation-triangle"></i> Gagal memuat artikel (${id}).</div>`;
            });
    }

    function renderSidebarEntries(currentPost, currentId) {
        const sideRecentList = document.getElementById('sideRecentList');
        if (!sideRecentList) return;

        const currentAuthorRomaji = (currentPost.author_romaji || '').toLowerCase().replace(/\s+/g, '');
        const currentAuthorKanji = (currentPost.author_kanji || '').replace(/\s+/g, '');

        const memberPosts = allPosts.filter(p => {
            const pRomaji = (p.author_romaji || '').toLowerCase().replace(/\s+/g, '');
            const pKanji = (p.author_kanji || '').replace(/\s+/g, '');
            return (currentAuthorRomaji && pRomaji === currentAuthorRomaji) ||
                   (currentAuthorKanji && pKanji === currentAuthorKanji);
        });

        const recentEntries = memberPosts.slice(0, 5);

        if (recentEntries.length === 0) {
            sideRecentList.innerHTML = '<div class="new-entry-empty">Tidak ada artikel lain.</div>';
            return;
        }

        sideRecentList.innerHTML = recentEntries.map(p => `
            <div class="new-entry-item ${String(p.id) === String(currentId) ? 'active-entry' : ''}" onclick="navigateToBlog('${p.id}')">
                <img src="${p.thumbnail}" alt="${p.author_romaji}" class="new-entry-thumb" loading="lazy" />
                <div class="new-entry-meta">
                    <div class="new-entry-title">${p.translated_title}</div>
                    <div class="new-entry-date">${p.date.split(' ')[0]}</div>
                </div>
            </div>
        `).join('');
    }

    // ----------------------------------------------------
    // Grid Rendering dengan View & Like Counter
    // ----------------------------------------------------
    function renderGrid(posts) {
        blogCount.innerText = `${posts.length} Artikel`;
        if (posts.length === 0) {
            blogGrid.innerHTML = '<div class="empty-msg">Tidak ada artikel yang cocok.</div>';
            return;
        }

        blogGrid.innerHTML = posts.map(p => {
            const mInfo = getMemberInfo(p.author_kanji, p.author_romaji);
            const avatarSrc = (mInfo && mInfo.foto_profil) ? mInfo.foto_profil : p.thumbnail;
            const displayRomaji = (mInfo && mInfo.nama_romaji) ? mInfo.nama_romaji : p.author_romaji;
            const stats = blogStatsCache[p.id] || { views: 0, likes: 0, liked_by: [] };
            const isLiked = currentUser && Array.isArray(stats.liked_by) && stats.liked_by.includes(currentUser.uid);

            return `
            <div class="blog-card" onclick="navigateToBlog('${p.id}')">
                <div class="blog-card-author">
                    <img src="${avatarSrc}" class="card-author-avatar" alt="${displayRomaji}" loading="lazy" />
                    <span class="card-author-name">${displayRomaji}</span>
                </div>
                <div class="blog-thumb">
                    <img src="${p.thumbnail}" alt="${displayRomaji}" loading="lazy" />
                </div>
                <div class="blog-info">
                    <h3 class="blog-card-title">${p.translated_title}</h3>
                    <span class="blog-card-jp-title">${p.original_title}</span>
                    <div class="card-bottom-meta">
                        <span class="blog-date">${p.date}</span>
                        <div class="card-stats-group" data-id="${p.id}">
                            <span class="meta-separator">•</span>
                            <span class="stat-item" title="Jumlah Dilihat">
                                <img src="${ICON_EYE}" class="stat-icon-svg" alt="Views" />
                                <span class="view-count-text">${stats.views || 0}</span>
                            </span>
                            <span class="stat-item" title="Jumlah Disukai">
                                <img src="${isLiked ? ICON_LIKE_FILLED : ICON_LIKE_DEFAULT}" class="stat-icon-svg card-like-icon" alt="Likes" />
                                <span class="like-count-text">${stats.likes || 0}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }

    // ----------------------------------------------------
    // Navigation & Events
    // ----------------------------------------------------
    window.navigateToBlog = function(id) {
        if (blogListView.style.display !== 'none') {
            savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop || 0;
        }
        history.pushState({ id: id, scrollY: savedScrollPosition }, '', `?=${id}`);
        showReaderView(id);
    };

    btnBackToList.addEventListener('click', () => {
        history.pushState(null, '', window.location.pathname);
        showListView();
    });

    window.addEventListener('popstate', (e) => {
        const currentId = getBlogIdFromUrl();
        if (currentId) {
            showReaderView(currentId);
        } else {
            if (e.state && typeof e.state.scrollY === 'number') {
                savedScrollPosition = e.state.scrollY;
            }
            showListView();
        }
    });

    function loadBlogIndex() {
        // Ambil data statistik dari Firestore bersamaan dengan pemuatan index.json
        fetchAllStats();

        fetch(`${CWP_BASE_URL}/index.json?t=${Date.now()}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                allPosts = Array.isArray(data) ? data : [];
                buildMemberDropdown();
                renderGrid(allPosts);
                const directId = getBlogIdFromUrl();
                if (directId) {
                    showReaderView(directId);
                }
            })
            .catch(err => {
                console.error('Gagal mengambil index.json:', err);
                blogGrid.innerHTML = '<div class="empty-msg"><i class="far fa-newspaper"></i><br>Belum ada artikel blog yang tersimpan di server.</div>';
                blogCount.innerText = '0 Artikel';
            });
    }
});