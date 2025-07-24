document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hashtag-container');
    const memberDataUrl = '../store/member/members.json';

    fetch(memberDataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(members => {
            const activeMembersWithHashtags = members.filter(member => 
                member.status === 'aktif' && 
                (member.hashtagTalk || member.hashtagInst || member.hashtagBlog)
            );

            if (activeMembersWithHashtags.length === 0) {
                container.innerHTML = '<p style="text-align:center;">No members with hashtags found.</p>';
                return;
            }

            activeMembersWithHashtags.forEach(member => {
                const memberCard = createMemberCard(member);
                container.appendChild(memberCard);
            });
        })
        .catch(error => {
            console.error("Failed to load member data:", error);
            container.innerHTML = `<p style="text-align:center; color: #ff7979;">Error loading member data. Please check the console.</p>`;
        });
});

function createMemberCard(member) {
    // ## MODIFICATION START ##
    // Main card container is now an anchor (<a>) tag to make it clickable.
    const card = document.createElement('a');
    card.className = 'member-card';
    card.href = `member.html?id=${member.id}`; // Set the link using the member's ID.
    // ## MODIFICATION END ##

    // Profile section (photo and names)
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

    // Hashtags section
    const hashtagsDiv = document.createElement('div');
    hashtagsDiv.className = 'member-hashtags';

    // Helper function to create a hashtag group (Talk, Insta, Blog)
    const createHashtagGroup = (type, hashtags) => {
        if (!hashtags || hashtags.length === 0) return null;

        const groupDiv = document.createElement('div');
        groupDiv.className = `hashtag-group ${type}`;
        
        const tags = Array.isArray(hashtags) ? hashtags : [hashtags];
        tags.forEach(tag => {
            const p = document.createElement('p');
            p.className = tag.match(/^[a-zA-Z0-9_]+$/) ? '' : 'jpn';
            p.textContent = `#${tag}`;
            groupDiv.appendChild(p);
        });
        return groupDiv;
    };
    
    const talkGroup = createHashtagGroup('talk', member.hashtagTalk);
    const instaGroup = createHashtagGroup('insta', member.hashtagInst);
    const blogGroup = createHashtagGroup('blog', member.hashtagBlog);

    if (talkGroup) hashtagsDiv.appendChild(talkGroup);
    if (instaGroup) hashtagsDiv.appendChild(instaGroup);
    if (blogGroup) hashtagsDiv.appendChild(blogGroup);

    // Assemble the card
    card.append(profileDiv, hashtagsDiv);
    
    return card;
}