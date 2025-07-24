document.addEventListener("participationLoaded", () => {
  if (!window.currentMember) return;

  const member = window.currentMember;
  const memberNameJp = member.nama_jp;
  const container = document.getElementById("main");
  let totalSongsParticipated = 0;

  // Function to create a table HTML
  function createSongTable(title, songs) {
    if (songs.length === 0) return "";

    let tableRows = songs.map(song => `
      <tr class="song-data-row">
        <td class="song-data-cell">
          <a href="song.html?name=${encodeURIComponent(song.titleJp)}" target="_blank" class="song-link">
            ${song.titleRo}<br/><small class="song-jp-title">(${song.titleJp})</small>
          </a>
        </td>
        <td class="song-data-cell">${song.songNumber}</td>
        <td class="song-data-cell">${song.songTypeAvv}</td>
      </tr>
    `).join("");

    return `
      <div class="song-category-container">
        <h3>${title}</h3>
        <table class="song-participation-table" cellpadding="6" cellspacing="0" border="1">
          <tr class="song-header-row">
            <th class="song-header-cell">Nama Lagu</th>
            <th class="song-header-cell">Single</th>
            <th class="song-header-cell">Type</th>
          </tr>
          ${tableRows}
        </table>
      </div>
    `;
  }

  // Fetch songall.json
  fetch("../store/single/songall.json")
  .then(res => res.json())
  .then(songallData => {
    const soloSongs = [];
    const centerSongs = [];
    const unitSongs = [];
    const generationSongs = [];
    const couplingSongs = [];

    // Helper to check if member is in array or string
    const isMemberIncluded = (data, memberName) => {
        if (!data) return false;
        if (Array.isArray(data)) {
            return data.includes(memberName);
        }
        return data === memberName;
    };

    // Iterate through all releases in songall.json
    for (const releaseKey in songallData) {
      const songsInRelease = songallData[releaseKey];
      
      songsInRelease.forEach(song => {
        let memberParticipated = false;

        // Check all member keys (members0, members1, etc.)
        for (let i = 0; i <= 5; i++) {
          const membersKey = `members${i}`;
          if (song[membersKey] && isMemberIncluded(song[membersKey], memberNameJp)) {
            memberParticipated = true;
            break;
          }
        }
        
        // Also check the center key specifically, as it can exist independently
        if (!memberParticipated && isMemberIncluded(song.center, memberNameJp)) {
            memberParticipated = true;
        }

        if (memberParticipated) {
          totalSongsParticipated++;

          // PERBAIKAN: Logika kategorisasi yang disederhanakan dan akurat
          if (song.songOutline === "Solo") {
            soloSongs.push(song);
          } else if (isMemberIncluded(song.center, memberNameJp)) {
            // Jika member adalah center, masukkan ke daftar center, APAPUN jenis lagunya.
            centerSongs.push(song);
          } else if (song.songOutline === "Unit") {
            unitSongs.push(song);
          } else if (song.songOutline && song.songOutline.startsWith("Gen (")) {
            generationSongs.push(song);
          } else {
            // Semua lagu lain di mana member berpartisipasi (termasuk Senbatsu/Under non-center) masuk ke sini.
            couplingSongs.push(song);
          }
        }
      });
    }

    const songContainer = document.createElement('div');
    songContainer.className = 'song-participation-section';
    songContainer.innerHTML = `
        ${createSongTable(`PARTISIPASI ${member.nama_romaji.toUpperCase()} DI LAGU (MAIN SINGLE, ALBUM, COUPLING)`, couplingSongs)}
        ${createSongTable(`LAGU SOLO ${member.nama_romaji.toUpperCase()}`, soloSongs)}
        ${createSongTable(`LAGU DENGAN CENTER ${member.nama_romaji.toUpperCase()}`, centerSongs)}
        ${createSongTable("PARTISIPASI DI LAGU UNIT", unitSongs)}
        ${createSongTable("PARTISIPASI DI LAGU GENERASI", generationSongs)}
    `;

    // Pastikan untuk menyisipkan kontainer lagu sebelum kontainer Keterangan
    const keteranganContainer = document.querySelector('.keterangan-container');
    if (keteranganContainer) {
        keteranganContainer.insertAdjacentElement('beforebegin', songContainer);
    } else {
        container.appendChild(songContainer); // Fallback
    }
    
    // Update total partisipasi lagu di KETERANGAN
    const totalSongsLi = document.getElementById('total-songs-participation');
    if (totalSongsLi) {
      totalSongsLi.innerHTML = `Partisipasi lagu: ${totalSongsParticipated} lagu`;
    }

  })
  .catch(error => {
    console.error("Error loading song data:", error);
  });
});