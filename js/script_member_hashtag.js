document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hashtag-container');
    
    // 🗂️ URL untuk kedua file data
    const memberDataUrl = '../store/member/members.json';
    const hashtagDataUrl = '../store/member/members_hashtag.json';

    // 🔄 Gunakan Promise.all untuk mengambil kedua file secara paralel
    Promise.all([
        fetch(memberDataUrl).then(response => response.json()),
        fetch(hashtagDataUrl).then(response => response.json())
    ])
    .then(([members, hashtagData]) => {
        // `members` adalah array dari members.json
        // `hashtagData` adalah objek dari members_hashtag.json

        const activeMembersWithHashtags = members.filter(member => {
            // Kunci untuk objek hashtag (misal: "ito-riria" -> "ito_riria")
            const hashtagKey = member.id.replace(/-/g, '_');
            const memberHashtags = hashtagData[hashtagKey];

            // Filter member 'aktif' yang punya data hashtag
            return member.status === 'aktif' && memberHashtags;
        });

        if (activeMembersWithHashtags.length === 0) {
            container.innerHTML = '<p style="text-align:center;">No members with hashtags found.</p>';
            return;
        }

        activeMembersWithHashtags.forEach(member => {
            // ✨ Ambil data hashtag yang sesuai untuk anggota ini
            const hashtagKey = member.id.replace(/-/g, '_');
            const memberHashtags = hashtagData[hashtagKey];
            
            // Buat kartu anggota dengan data gabungan
            const memberCard = createMemberCard(member, memberHashtags);
            container.appendChild(memberCard);
        });
    })
    .catch(error => {
        console.error("Failed to load data:", error);
        container.innerHTML = `<p style="text-align:center; color: #ff7979;">Error loading data. Please check the console.</p>`;
    });
});

// Modifikasi fungsi untuk menerima data hashtag secara terpisah
function createMemberCard(member, hashtags) {
    const card = document.createElement('a');
    card.className = 'member-card';
    card.href = `member.html?id=${member.id}`;

    // Profile section (menggunakan data dari members.json)
    const profileDiv = document.createElement('div');
    profileDiv.className = 'member-profile';

    const img = document.createElement('img');
    img.src = member.foto_profil;
    img.alt = member.nama_romaji;

    const nameJp = document.createElement('p');
    nameJp.className = 'name-jp jpn';
    nameJp.textContent = member.nama_jp;

    const nameRomaji = document.createElement('p');
    nameRomaji.className = 'name-romaji';
    nameRomaji.textContent = member.nama_romaji.toLowerCase();

    profileDiv.append(img, nameJp, nameRomaji);

    // Hashtags section (menggunakan data dari members_hashtag.json)
    const hashtagsDiv = document.createElement('div');
    hashtagsDiv.className = 'member-hashtags';

    const createHashtagGroup = (type, tagsData) => {
        if (!tagsData || tagsData.length === 0) return null;

        const groupDiv = document.createElement('div');
        groupDiv.className = `hashtag-group ${type}`;
        
        const tags = Array.isArray(tagsData) ? tagsData : [tagsData];
        tags.forEach(tag => {
            const p = document.createElement('p');
            p.className = tag.match(/^[a-zA-Z0-9_]+$/) ? '' : 'jpn';
            p.textContent = `#${tag}`;
            groupDiv.appendChild(p);
        });
        return groupDiv;
    };
    
    // Ambil hashtag dari objek `hashtags` yang baru
    const talkGroup = createHashtagGroup('talk', hashtags.talk);
    const instaGroup = createHashtagGroup('insta', hashtags.insta);
    const blogGroup = createHashtagGroup('blog', hashtags.blog);

    if (talkGroup) hashtagsDiv.appendChild(talkGroup);
    if (instaGroup) hashtagsDiv.appendChild(instaGroup);
    if (blogGroup) hashtagsDiv.appendChild(blogGroup);

    card.append(profileDiv, hashtagsDiv);
    
    return card;
}