document.addEventListener('DOMContentLoaded', () => {
    // --- UI Elements ---
    const audioPlayer = document.getElementById('audio-player');
    const lyricsContainer = document.getElementById('lyrics-animation');
    const cdCover = document.getElementById('cd-cover');
    const titleSong = document.getElementById('title-song');
    const singerSong = document.getElementById('singer-song');
    const mediaContainer = document.querySelector('.blurry');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');
    const playlistContainer = document.getElementById('playlist-inside');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeIcon = document.getElementById('volume-icon');

    // --- State Management ---
    let currentTrackIndex = 0;
    let karaokePlaylist = []; // This will hold songs that have both MP3 and Lyrics
    let songlistElements = [];
    let isPlaying = false;
    let isShuffle = false;
    let repeatMode = 'none'; // 'none', 'one', 'all'
    let currentLyrics = [];
    let lastVolume = 0.5;

    // --- Data Store ---
    let allSongsData = {};
    let karaokeLyrics = {};

    // --- Main Function to Load and Initialize ---
    async function initializePlayer() {
        try {
            // Load all necessary data
            [allSongsData, karaokeLyrics] = await Promise.all([
                fetch('../store/single/songall.json').then(res => res.json()),
                fetch('../store/single/lyrics_kara.json').then(res => res.json())
            ]);
            console.log("All data loaded successfully.");
            
            // Create the dynamic playlist
            buildKaraokePlaylist();
            
            // Set initial volume
            setVolume(0.5);

        } catch (error) {
            console.error("Failed to load data:", error);
            playlistContainer.innerHTML = '<a href="#" class="songlist">Gagal memuat data lagu.</a>';
            lyricsContainer.innerHTML = '<span>Error: Gagal memuat data.</span>';
        }
    }

    // --- Playlist and Track Loading ---
    function buildKaraokePlaylist() {
        // Iterate through all songs in songall.json to find eligible karaoke tracks
        for (const key in allSongsData) {
            allSongsData[key].forEach(song => {
                // A song is eligible if it has an MP3 link AND timed lyrics
                if (song.LinkMP3 && karaokeLyrics[song.titleJp]) {
                    karaokePlaylist.push(song);
                }
            });
        }

        if (karaokePlaylist.length > 0) {
            // Populate the playlist UI
            let playlistHtml = '';
            karaokePlaylist.forEach(song => {
                playlistHtml += `<a href="#" class="songlist" data-song-jp="${song.titleJp}">Nogizaka46 - ${song.titleRo}</a>`;
            });
            playlistContainer.innerHTML = playlistHtml;

            // Get the newly created elements and add listeners
            songlistElements = document.querySelectorAll('.songlist');
            addPlaylistEventListeners();
        } else {
            playlistContainer.innerHTML = '<a href="#" class="songlist">Tidak ada lagu karaoke.</a>';
            lyricsContainer.innerHTML = '<span>Pastikan `LinkMP3` ada di `songall.json` dan lirik ada di `lyrics_kara.json`</span>';
        }
    }
    
    function addPlaylistEventListeners() {
        songlistElements.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                playSong();
            });
        });
    }

    function loadTrack(index) {
        if (index < 0 || index >= karaokePlaylist.length) return;
        
        // Remove active class from all, then add to current
        songlistElements.forEach(item => item.classList.remove('active'));
        songlistElements[index].classList.add('active');

        const songData = karaokePlaylist[index];
        
        // Update UI
        titleSong.textContent = songData.titleRo;
        singerSong.textContent = "Nogizaka46";
        const coverUrl = getCoverImageUrl(songData);
        cdCover.src = coverUrl;
        updateBackground(coverUrl);

        // Load Audio and Lyrics
        audioPlayer.src = songData.LinkMP3;
        currentLyrics = karaokeLyrics[songData.titleJp] || [];
        displayLyrics();
    }
    
    function getCoverImageUrl(songData) {
        const baseV2Url = "https://ik.imagekit.io/moearchive/singlealbum/v2/";
		// This logic finds the release key (e.g., 's34') to construct the URL
        let releaseKey = '';
        for (const key in allSongsData) {
            if (allSongsData[key].some(s => s.titleJp === songData.titleJp)) {
                releaseKey = key;
                break;
            }
        }
        
		if (releaseKey && releaseKey.startsWith('s')) {
			const num = releaseKey.replace(/\D/g, '');
			return `${baseV2Url}n46_cover_s${num}a.jpg`;
		}
        // Fallback or add more rules for albums etc.
        return "https://ik.imagekit.io/moearchive/singlealbum/v2/n46_cover_x.jpg";
    }

    // --- Player Controls ---
    function playSong() {
        isPlaying = true;
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function pauseSong() {
        isPlaying = false;
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    function togglePlayPause() {
        if (!audioPlayer.src || audioPlayer.src.endsWith('/')) return;
        isPlaying ? pauseSong() : playSong();
    }

    function changeTrack(direction) {
        if (karaokePlaylist.length === 0) return;
        
        if (isShuffle) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * karaokePlaylist.length);
            } while (karaokePlaylist.length > 1 && newIndex === currentTrackIndex);
            currentTrackIndex = newIndex;
        } else {
            currentTrackIndex = (currentTrackIndex + direction + karaokePlaylist.length) % karaokePlaylist.length;
        }
        
        loadTrack(currentTrackIndex);
        if (isPlaying) playSong();
    }

    // --- Progress, Time, and Lyrics Sync ---
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            totalDurationEl.textContent = formatTime(duration);
        }
        currentTimeEl.textContent = formatTime(currentTime);
        updateActiveLyric(currentTime);
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        if (duration) {
            audioPlayer.currentTime = (clickX / width) * duration;
        }
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    function displayLyrics() {
        lyricsContainer.innerHTML = '';
        if (!currentLyrics || currentLyrics.length === 0) {
            lyricsContainer.innerHTML = '<span>Data lirik karaoke tidak tersedia.</span>';
            return;
        }
        currentLyrics.forEach(lyric => {
            const span = document.createElement('span');
            span.setAttribute('data-time', lyric.time);
            const jpText = document.createTextNode(lyric.jp);
            span.appendChild(jpText);
            if (lyric.ro) {
                const roP = document.createElement('p');
                roP.className = 'ro';
                roP.textContent = lyric.ro;
                span.appendChild(roP);
            }
            if (lyric.id) {
                const idP = document.createElement('p');
                idP.className = 'id';
                idP.textContent = lyric.id;
                span.appendChild(idP);
            }
            lyricsContainer.appendChild(span);
        });
    }

    function updateActiveLyric(currentTime) {
        if (!currentLyrics.length) return;
        
        let activeIndex = -1;
        for (let i = 0; i < currentLyrics.length; i++) {
            if (currentTime >= currentLyrics[i].time - 0.5) {
                activeIndex = i;
            } else {
                break;
            }
        }
        
        const allSpans = lyricsContainer.querySelectorAll('span');
        allSpans.forEach((span, index) => {
            if (index === activeIndex) {
                if (!span.classList.contains('active')) {
                    span.classList.add('active');
                    span.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                span.classList.remove('active');
            }
        });
    }

    // --- Other Controls (Repeat, Shuffle, Volume) ---
    function handleRepeat() {
        if (repeatMode === 'none') {
            repeatMode = 'all';
            repeatBtn.classList.add('active');
            repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
        } else if (repeatMode === 'all') {
            repeatMode = 'one';
            repeatBtn.innerHTML = '<b>1</b>';
        } else {
            repeatMode = 'none';
            repeatBtn.classList.remove('active');
            repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
        }
    }

    function handleShuffle() {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
    }
    
    function handleSongEnd() {
        if (repeatMode === 'one') {
            audioPlayer.currentTime = 0;
            playSong();
        } else if (isShuffle || repeatMode === 'all') {
            changeTrack(1);
        } else {
            if (currentTrackIndex < karaokePlaylist.length - 1) {
                changeTrack(1);
            } else {
                pauseSong();
            }
        }
    }

    function setVolume(volume) {
        audioPlayer.volume = volume;
        volumeSlider.value = volume;
        if (volume > 0.5) volumeIcon.className = 'fas fa-volume-high control-btn';
        else if (volume > 0) volumeIcon.className = 'fas fa-volume-low control-btn';
        else volumeIcon.className = 'fas fa-volume-off control-btn';
    }

    function toggleMute() {
        if (audioPlayer.volume > 0) {
            lastVolume = audioPlayer.volume;
            setVolume(0);
        } else {
            setVolume(lastVolume);
        }
    }

    function updateBackground(imageSrc) {
		mediaContainer.style.opacity = '0';
		setTimeout(() => {
			mediaContainer.style.backgroundImage = imageSrc ? `url(${imageSrc})` : 'none';
			mediaContainer.style.opacity = '1';
		}, 300);
	}

    // --- Event Listeners ---
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', () => changeTrack(1));
    prevBtn.addEventListener('click', () => changeTrack(-1));
    progressContainer.addEventListener('click', setProgress);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', handleSongEnd);
    repeatBtn.addEventListener('click', handleRepeat);
    shuffleBtn.addEventListener('click', handleShuffle);
    volumeSlider.addEventListener('input', (e) => setVolume(e.target.value));
    volumeIcon.addEventListener('click', toggleMute);

    // --- Start the application ---
    initializePlayer();
});