document.addEventListener("DOMContentLoaded", () => {
    const captainContainer = document.getElementById("captain-container");
    const viceCaptainContainer = document.getElementById("vice-captain-container");

    fetch("../store/member/members_captain.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal mengambil data JSON");
            }
            return response.json();
        })
        .then(data => {
            data.forEach(member => {
                let triviaHTML = "";
                member.trivia.forEach(item => {
                    // Gunakan class jpn untuk memastikan karakter jepang terender dengan baik
                    triviaHTML += `<li class="jpn">${item}</li>`;
                });

                const cardHTML = `
                    <div class="leader-card">
                        <div class="leader-profile">
                            <img src="${member.foto_profil}" alt="${member.nama_romaji}">
                            <div class="leader-badge">${member.jabatan} ke-${member.urutan}</div>
                            <div class="leader-name-jp jpn">${member.nama_jp}</div>
                            <div class="leader-name-rm">${member.nama_romaji}</div>
                            <div class="leader-gen jpn">${member.gen}</div>
                        </div>
                        <div class="leader-details">
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <span class="detail-label">Periode Menjabat</span>
                                    <span class="detail-value">${member.mulai_menjabat} - ${member.akhir_menjabat}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Masa Jabatan</span>
                                    <span class="detail-value">${member.masa_jabatan}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Usia Awal Menjabat</span>
                                    <span class="detail-value">${member.usia_awal}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Event Pelantikan</span>
                                    <span class="detail-value">${member.event_pelantikan}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Event Penyerahan</span>
                                    <span class="detail-value">${member.event_penyerahan}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Jumlah Member (Awal - Akhir)</span>
                                    <span class="detail-value">${member.jumlah_awal} ➔ ${member.jumlah_akhir}</span>
                                </div>
                            </div>
                            <div class="trivia-section">
                                <h4>Catatan & Trivia</h4>
                                <ul class="trivia-list">
                                    ${triviaHTML}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;

                if (member.jabatan === "Kapten") {
                    captainContainer.insertAdjacentHTML("beforeend", cardHTML);
                } else if (member.jabatan === "Wakil Kapten") {
                    viceCaptainContainer.insertAdjacentHTML("beforeend", cardHTML);
                }
            });
        })
        .catch(error => {
            console.error("Error loading captain data:", error);
            captainContainer.innerHTML = "<p>Gagal memuat data anggota kepemimpinan. Pastikan path JSON sudah benar.</p>";
        });
});