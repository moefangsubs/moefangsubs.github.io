document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('hashtag-container');
    
    const memberDataUrl = '../store/member/members.json';
    const hashtagDataUrl = '../store/member/members_hashtag.json';

    await loadPictReleaseData();

    Promise.all([
        fetch(memberDataUrl).then(response => response.json()),
        fetch(hashtagDataUrl).then(response => response.json())
    ])
    .then(([members, hashtagData]) => {
        const activeMembersWithHashtags = members.filter(member => {
            const hashtagKey = member.id.replace(/-/g, '_');
            const memberHashtags = hashtagData[hashtagKey];

            return member.status === 'aktif' && memberHashtags;
        });

        if (activeMembersWithHashtags.length === 0) {
            container.innerHTML = '<p style="text-align:center;">No members with hashtags found.</p>';
            return;
        }

        activeMembersWithHashtags.forEach(member => {
            const hashtagKey = member.id.replace(/-/g, '_');
            const memberHashtags = hashtagData[hashtagKey];
            
            const memberCard = createMemberCard(member, memberHashtags);
            container.appendChild(memberCard);
        });
    })
    .catch(error => {
        console.error("Failed to load data:", error);
        container.innerHTML = `<p style="text-align:center; color: #ff7979;">Error loading data. Please check the console.</p>`;
    });
});

window.applyMoeCrop = function(img, memberName) {
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    if (!nw || !nh) return;

    const crop = window.getAccurateCrop ? window.getAccurateCrop(img.src, memberName) || {} : {};

    const container = img.parentElement;
    const cw = container.clientWidth;
    const ch = container.clientHeight;

    let cx, cy, cropW, cropH;
    const isPortrait = ch > cw;
	
    if (isPortrait && crop.normal) {
        const c = crop.normal;
        const ox = c['offset-x'] || 0;
        const oy = c['offset-y'] || 0;
        
        const c_left = (c.left || 0) + ox;
        const c_right = nw - (c.right || 0) + ox;
        const c_top = (c.top || 0) + oy;
        const c_bottom = nh - (c.bottom || 0) + oy;

        cropW = c_right - c_left;
        cropH = c_bottom - c_top;
        cx = c_left + (cropW / 2);
        cy = c_top + (cropH / 2);
    } 
    else if (crop.round) {
        const c = crop.round;
        const r = c.radius || (nw / 2);
        const ox = c['offset-x'] || 0;
        let oy = c['offset-y'] === undefined ? (r - nh/2) : c['offset-y'];

        cropW = r * 2;
        cropH = r * 2;
        cx = (nw / 2) + ox;
        cy = (nh / 2) + oy;
    } 
    else {
        cropW = nw;
        cropH = nh;
        cx = nw / 2;
        cy = nh / 2;
    }

    if (cropW <= 0) cropW = nw;
    if (cropH <= 0) cropH = nh;

    let S = Math.max(cw / cropW, ch / cropH);
    let Tx = (cw / 2) - (cx * S);
    let Ty = (ch / 2) - (cy * S);

    if (nw * S >= cw) {
        if (Tx > 0) Tx = 0;
        if (Tx + nw * S < cw) Tx = cw - nw * S;
    }
    if (nh * S >= ch) {
        if (Ty > 0) Ty = 0;
        if (Ty + nh * S < ch) Ty = ch - nh * S;
    }

    img.style.position = 'absolute';
    img.style.left = '0';
    img.style.top = '0';
    img.style.width = nw + 'px';
    img.style.height = nh + 'px';
    img.style.transformOrigin = '0 0';
    img.style.transform = `translate(${Tx}px, ${Ty}px) scale(${S})`;
    
    if (img.parentElement) img.parentElement.style.backgroundImage = 'none';
    img.removeAttribute("data-fallbacks");
    img.style.opacity = '1';
};

function createMemberCard(member, hashtags) {
    const card = document.createElement('a');
    card.className = 'member-card';
    card.href = `member.html?id=${member.id}`;

    const profileDiv = document.createElement('div');
    profileDiv.className = 'member-profile';

    const photoInfo = getMemberPhotoInfo({ ...member, group_id: "nogi" }, LATEST_NOGI_DATE, "nogi");

    const photoWrapper = document.createElement('div');
    photoWrapper.className = 'photo-wrapper';

    const img = document.createElement('img');
    img.src = photoInfo.url;
    img.alt = member.nama_romaji;
    img.dataset.fallbacks = photoInfo.fallbacks;
    img.onerror = function() { handleMoeFallback(this); };
    img.onload = function() { applyMoeCrop(this, member.nama_jp); };
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";

    photoWrapper.appendChild(img);

    const nameJp = document.createElement('p');
    nameJp.className = 'name-jp jpn';
    nameJp.textContent = member.nama_jp;

    const nameRomaji = document.createElement('p');
    nameRomaji.className = 'name-romaji';
    nameRomaji.textContent = member.nama_romaji.toLowerCase();

    profileDiv.append(photoWrapper, nameJp, nameRomaji);

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
    
    const talkGroup = createHashtagGroup('talk', hashtags.talk);
    const instaGroup = createHashtagGroup('insta', hashtags.insta);
    const blogGroup = createHashtagGroup('blog', hashtags.blog);

    if (talkGroup) hashtagsDiv.appendChild(talkGroup);
    if (instaGroup) hashtagsDiv.appendChild(instaGroup);
    if (blogGroup) hashtagsDiv.appendChild(blogGroup);

    card.append(profileDiv, hashtagsDiv);
    
    return card;
}