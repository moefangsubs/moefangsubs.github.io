function loadAndDisplayPhotobooks() {
    if (!window.currentMember) {
        console.error("Photobook GAGAL: window.currentMember tidak ditemukan.");
        return;
    }
    fetch('../store/member/members_pb.json')
        .then(response => {
            if (!response.ok) throw new Error('Gagal memuat members_pb.json: ' + response.statusText);
            return response.json();
        })
        .then(photobookData => {
            const memberNameJp = window.currentMember.nama_jp;
            const memberPhotobooks = photobookData.filter(pb => {
                if (!pb.name || !pb.name.jp) return false;
                const normalizedPbName = pb.name.jp.replace(/\s/g, '');
                const normalizedCurrentMemberName = memberNameJp.replace(/\s/g, '');
                return normalizedPbName === normalizedCurrentMemberName;
            });
            if (memberPhotobooks.length === 0) return;
            const keteranganContainer = document.querySelector(".keterangan-container");
            if (!keteranganContainer) {
                console.error("Photobook GAGAL: Elemen .keterangan-container tidak ditemukan.");
                return;
            }
            const photobookSection = document.createElement('div');
            photobookSection.id = 'photobook-section';
            photobookSection.className = 'container';
            photobookSection.innerHTML = `
              <h3 class="gen-title">PHOTOBOOK</h3>
              <div class="photobook-lang-switch">
                <input id="language-toggle" class="check-toggle check-toggle-round-flat" type="checkbox" checked>
                <label for="language-toggle"></label>
                <span class="on">ID</span>
                <span class="off">JP</span>
              </div>
              <div class="photobook-container"></div>
            `;
            keteranganContainer.insertAdjacentElement('afterend', photobookSection);
            createMemberPhotobook(memberPhotobooks);
            const toggle = document.getElementById("language-toggle");
            if (toggle) {
                toggle.addEventListener("change", updateVisibility);
                updateVisibility();
            }
        })
        .catch(error => console.error('Error dalam proses data photobook:', error));
}
document.addEventListener("participationLoaded", loadAndDisplayPhotobooks);
function createMemberPhotobook(data) {
    const container = document.querySelector(".photobook-container");
    if (!container) return;
    container.innerHTML = "";
    data.forEach((item) => {
        const dates = formatDate(item.releaseDate);
        const sales = formatSalesFirst(item.salesfirst);
        const has = (prop) => prop && (prop.id || prop.jp);
        const photobookDiv = document.createElement("div");
        photobookDiv.className = "photobook";
        photobookDiv.innerHTML = `
            <div class="imgprev">
                <figure>
                    <img src="${item.image}" alt="${item.title.id}">
                    ${item.count ? `<div class="count">${item.count}</div>` : ''}
                    <figcaption><span id="idn">Sampul Reguler</span><span id="jpn" class="hidden">通常版表紙</span></figcaption>
                </figure>
            </div>
            <div class="content">
                <div class="pb-title">
                    <span class="title"><span id="idn">${item.title.id}</span><span id="jpn" class="hidden">${item.title.jp}</span></span>
                    <span class="member"><span id="idn">${item.name.id}</span><span id="jpn" class="hidden">${item.name.jp}</span></span>
                </div>
                <div class="pb-desc">
                    ${has(item.photographer) ? `<div><span><span id="idn">Fotografer</span><span id="jpn" class="hidden">撮影</span></span><span>:</span><span><span id="idn">${item.photographer.id}</span><span id="jpn" class="hidden">${item.photographer.jp}</span></span></div>` : ''}
                    <div><span><span id="idn">Penerbit</span><span id="jpn" class="hidden">出版社</span></span><span>:</span><span><span id="idn">${item.publisher.id}</span><span id="jpn" class="hidden">${item.publisher.jp}</span></span></div>
                    <div><span><span id="idn">Tanggal Rilis</span><span id="jpn" class="hidden">発売日</span></span><span>:</span><span><span id="idn">${dates.id}</span><span id="jpn" class="hidden">${dates.jp}</span></span></div>
                    ${has(item.memberAge) ? `<div><span><span id="idn">Usia Rilis</span><span id="jpn" class="hidden">発売時年齢</span></span><span>:</span><span><span id="idn">${item.memberAge.id}</span><span id="jpn" class="hidden">${item.memberAge.jp}</span></span></div>` : ''}
                    ${has(item.type) ? `<div><span><span id="idn">Tipe</span><span id="jpn" class="hidden">形態</span></span><span>:</span><span><span id="idn">${item.type.id}</span><span id="jpn" class="hidden">${item.type.jp}</span></span></div>` : ''}
                    ${item.salesfirst ? `<div><span><span id="idn">Penjualan Pekan Pertama</span><span id="jpn" class="hidden">初週売上</span></span><span>:</span><span><span id="idn">${sales.id}</span><span id="jpn" class="hidden">${sales.jp}</span></span></div>` : ''}
                </div>
                ${has(item.comment) ? `<div class="obicomment"><span><span id="idn">"${item.comment.id}"</span><span id="jpn" class="hidden">「${item.comment.jp}」</span></span><span><span id="idn">${item.commentName.id}</span><span id="jpn" class="hidden">${item.commentName.jp}</span></span></div>` : ''}
                <div class="otherversion">
                    ${item.imageCutOther ? `<figure><img src="${item.imageCutOther}" alt="Sampul Lainnya"><figcaption><span id="idn">Sampul Lainnya</span><span id="jpn" class="hidden">アザーカット</span></figcaption></figure>` : ''}
                    ${item.imageLimited ? `<figure><img src="${item.imageLimited}" alt="Sampul Terbatas"><figcaption><span id="idn">Sampul Terbatas</span><span id="jpn" class="hidden">限定版</span></figcaption></figure>` : ''}
                    ${item.imageSevenNet ? `<figure><img src="${item.imageSevenNet}" alt="Sampul 7net"><figcaption><span id="idn">Sampul 7net</span><span id="jpn" class="hidden">セブンネット限定</span></figcaption></figure>` : ''}
                    ${item.imageRakuten ? `<figure><img src="${item.imageRakuten}" alt="Sampul Rakuten"><figcaption><span id="idn">Sampul Rakuten</span><span id="jpn" class="hidden">楽天限定</span></figcaption></figure>` : ''}
                    ${item.imageTsutaya ? `<figure><img src="${item.imageTsutaya}" alt="Sampul TSUTAYA"><figcaption><span id="idn">Sampul TSUTAYA</span><span id="jpn" class="hidden">TSUTAYA限定</span></figcaption></figure>` : ''}
                    ${item.imageHMV ? `<figure><img src="${item.imageHMV}" alt="Sampul HMV"><figcaption><span id="idn">Sampul HMV</span><span id="jpn" class="hidden">HMV限定</span></figcaption></figure>` : ''}
                    ${item.imageKinokuniya ? `<figure><img src="${item.imageKinokuniya}" alt="Sampul Kinokuniya"><figcaption><span id="idn">Sampul Kinokuniya</span><span id="jpn" class="hidden">紀伊國屋書店限定</span></figcaption></figure>` : ''}
                </div>
                ${item.download ? `<div class="download"><a href="${item.download}" target="_blank">Download Scan</a></div>` : ''}
            </div>`;
        container.appendChild(photobookDiv);
    });
}
function formatDate(date) {
    if (!date) return { jp: '-', id: '-' };
    const dateObj = new Date(date);
    const jpFormat = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
    const idFormat = dateObj.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
    return { jp: jpFormat, id: idFormat };
}
function formatSalesFirst(sales) {
    if (!sales) return { jp: '-', id: '-' };
    const idFormat = `${sales.toLocaleString('id-ID')} eksemplar`;
    const man = Math.floor(sales / 10000);
    const remainder = sales % 10000;
    const jpFormat = remainder > 0 ? `${man}万${remainder.toLocaleString('ja-JP')}冊` : `${man}万冊`;
    return { jp: jpFormat, id: idFormat };
}
function updateVisibility() {
    const isIdnChecked = document.getElementById("language-toggle").checked;
    document.querySelectorAll('#photobook-section #idn').forEach(el => el.classList.toggle('hidden', !isIdnChecked));
    document.querySelectorAll('#photobook-section #jpn').forEach(el => el.classList.toggle('hidden', isIdnChecked));
}