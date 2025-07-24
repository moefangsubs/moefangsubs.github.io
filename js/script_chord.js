document.addEventListener('DOMContentLoaded', () => {
    const chordListContainer = document.getElementById('chord-list-container');
    const chordDetailContainer = document.getElementById('chord-detail-container');
    const loadingListIndicator = document.getElementById('loading-list');
    const loadingChordIndicator = document.getElementById('loading-chord');

    const params = new URLSearchParams(window.location.search);
    const songId = params.get('id');

    if (songId) {
        // Jika ada ID lagu di URL, tampilkan detail chord
        chordListContainer.style.display = 'none';
        chordDetailContainer.style.display = 'block';
        loadChordDetail(songId);
    } else {
        // Jika tidak ada ID, tampilkan daftar lagu
        chordListContainer.style.display = 'block';
        chordDetailContainer.style.display = 'none';
        loadChordList();
    }
});

// Daftar file JSON chord yang ada (simulasi scan direktori)
const chordFiles = [
    'n46-hadashi-de-summer.json',
    'n46-anastasia.json',
    'n46-boku-wa-boku-o-suki-ni-naru.json',
    'n46-hadashi-de-summer.json',
    'n46-jaane-ga-setsunai.json',
    'n46-kaerimichi-wa-toomawari-shitakunaru.json',
    'n46-kanashimi-no-wasurekata.json',
    'n46-kassouro.json',
    'n46-kidzuitara-kataomoi.json',
    'n46-kikkake.json',
    'n46-kimi-no-na-wa-kibou.json',
    'n46-koko-ni-wa-nai-mono.json',
    'n46-monopoly.json',
    'n46-naimononedari.json',
    'n46-natsuzakura.json',
    'n46-navel-orange.json',
    'n46-nigemizu.json',
    'n46-romendensha-no-machi.json',
    'n46-route-246.json',
    'n46-saigo-no-tight-hug.json',
    'n46-salvia-no-hana-o-oboeteirukai.json',
    'n46-sayonara-no-imi.json',
    'n46-shiawase-no-hogoshoku.json',
    'n46-tokidoki-omoidashite-kudasai.json',
    'n46-toshoshitsu-no-kimi-e.json',
    'n46-tsumetai-mizu-no-naka.json',
    'n46-yasashi-dake-nara.json',
    'n46-yuujou-pierce.json',
    's46-cool.json',
    's46-kimi-to-boku-to-sentakumono.json',
    'h46-boku-nanka.json',
    'h46-kimi-shika-katan.json',
    'h46-kitaishite-inai-jibun.json',
    'h46-konna-ni-suki-ni-nachatte-ii-no.json',
    'h46-seishun-no-uma.json',
    'h46-yasashisa-ga-jama-o-suru.json'
    // Tambahkan file JSON lain di sini saat Anda membuatnya
];

async function loadChordList() {
    const nogiList = document.querySelector('#nogizaka46-list .song-list');
    const sakuList = document.querySelector('#sakurazaka46-list .song-list');
    const hinaList = document.querySelector('#hinatazaka46-list .song-list');
    const loadingIndicator = document.getElementById('loading-list');

    try {
        for (const fileName of chordFiles) {
            const response = await fetch(`../store/single/chord/${fileName}`);
            if (!response.ok) {
                console.error(`Gagal memuat ${fileName}`);
                continue;
            }
            const data = await response.json();
            const songId = fileName.replace('.json', '');
            
            // MODIFICATION START: Create wrapper, shadow, and link for retro style
            const wrapper = document.createElement('div');
            wrapper.className = 'song-item-wrapper';

            const shadow = document.createElement('div');
            shadow.className = 'song-item-shadow';

            const link = document.createElement('a');
            link.href = `?id=${songId}`;
            link.textContent = data.titleRo;
            link.classList.add('song-item');

            wrapper.appendChild(shadow);
            wrapper.appendChild(link);
            // MODIFICATION END

            if (fileName.startsWith('n46-')) {
                nogiList.appendChild(wrapper); // Append wrapper instead of link
            } else if (fileName.startsWith('s46-')) {
                sakuList.appendChild(wrapper); // Append wrapper instead of link
            } else if (fileName.startsWith('h46-')) {
                hinaList.appendChild(wrapper); // Append wrapper instead of link
            }
        }
    } catch (error) {
        console.error("Error memuat daftar chord:", error);
        loadingIndicator.textContent = 'Gagal memuat daftar lagu.';
    } finally {
        loadingIndicator.style.display = 'none';
    }
}


async function loadChordDetail(songId) {
    const loadingIndicator = document.getElementById('loading-chord');
    const chordContentEl = document.getElementById('chord-content');

    try {
        // Fetch data chord dan spotify secara bersamaan
        const [chordResponse, spotifyResponse] = await Promise.all([
            fetch(`../store/single/chord/${songId}.json`),
            fetch('../store/single/spotifyembed.json')
        ]);

        if (!chordResponse.ok) {
            throw new Error(`Chord untuk ${songId} tidak ditemukan.`);
        }

        const chordData = await chordResponse.json();
        const spotifyData = spotifyResponse.ok ? await spotifyResponse.json() : {};

        // Update judul
        document.getElementById('song-title-ro').textContent = chordData.titleRo;
        document.getElementById('song-title-jp').textContent = chordData.titleJp;
        document.title = `${chordData.titleRo} - MoePlay Chord`;

        // Update Spotify Embed
        const spotifyPlayer = document.getElementById('spotify-embed');
        const spotifyContainer = document.getElementById('spotify-player-container');
        const spotifyLink = spotifyData[chordData.titleJp] || chordData.SpotifyAlt;

        if (spotifyLink) {
            spotifyPlayer.src = spotifyLink;
            spotifyContainer.style.display = 'block';
        } else {
            spotifyContainer.style.display = 'none';
        }

        // Tampilkan konten chord langsung dari HTML di JSON
        chordContentEl.innerHTML = chordData.Chord;

        // Inisialisasi kontrol
        setupControls();
        // Call the function for floating controls
        setupFloatingControls();

    } catch (error) {
        console.error("Error memuat detail chord:", error);
        chordContentEl.innerHTML = `<p style="text-align:center;">Gagal memuat chord. ${error.message}</p>`;
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

let scrollInterval;

function setupControls() {
    const speedButtons = document.querySelectorAll('.speed-btn');

    speedButtons.forEach(button => {
        button.addEventListener('click', () => {
            clearInterval(scrollInterval); // Hentikan scroll sebelumnya

            // Hapus kelas aktif dari semua tombol
            speedButtons.forEach(btn => btn.classList.remove('active'));
            // Tambahkan kelas aktif ke tombol yang diklik
            button.classList.add('active');

            const speed = parseFloat(button.dataset.speed);
            if (speed > 0) {
                const intervalTime = 50 / speed; // Sesuaikan angka 50 untuk kecepatan dasar
                scrollInterval = setInterval(() => {
                    window.scrollBy(0, 1);
                }, intervalTime);
            }
        });
    });
}

// This function now targets the controls container
function setupFloatingControls() {
    const controlsContainer = document.getElementById('controls-container');
    if (!controlsContainer) return;

    // We will use the initial position of the controls container to trigger the floating effect
    const initialTopOffset = controlsContainer.offsetTop;

    window.addEventListener('scroll', () => {
        // When scroll position is past the controls container's top, add the 'floating' class
        if (window.scrollY > initialTopOffset) {
            controlsContainer.classList.add('floating');
        } else {
            controlsContainer.classList.remove('floating');
        }
    });
}