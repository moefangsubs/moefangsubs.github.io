// Game state
const state = {
    username: "",
    difficulty: "",
    duration: 0,
    originalDuration: 0,
    songCount: 0,
    selectedGroups: [],
    currentQuestion: 0,
    score: 0,
    questions: [],
    currentAudio: null,
    lives: 3,
    audioTimeout: null,
    bgMusic: null,
    timeoutDuration: 10,
    timeoutInterval: null,
    timeoutStart: null,
    selectedOption: null // Ditambahkan untuk menyimpan pilihan jawaban
};

// DOM elements
const elements = {
    welcomeScreen: document.getElementById("welcome-screen"),
    difficultyScreen: document.getElementById("difficulty-screen"),
    countScreen: document.getElementById("count-screen"),
    groupScreen: document.getElementById("group-screen"),
    quizScreen: document.getElementById("quiz-screen"),
    resultScreen: document.getElementById("result-screen"),
    usernameInput: document.getElementById("username"),
    startBtn: document.getElementById("start-btn"),
    optionBtns: document.querySelectorAll(".option-btn"),
    startQuizBtn: document.getElementById("start-quiz-btn"),
    playBtn: document.getElementById("play-btn"),
    quizOptions: document.getElementById("quiz-options"),
    optionButtons: document.querySelectorAll(".quiz-option"),
    progress: document.querySelector(".progress"),
    confirmPopup: document.getElementById("confirm-popup"),
    confirmYes: document.getElementById("confirm-yes"),
    confirmNo: document.getElementById("confirm-no"),
    feedbackPopup: document.getElementById("feedback-popup"),
    feedbackText: document.getElementById("feedback-text"),
    timeoutBar: document.querySelector(".timeout-bar"),
    resultTitle: document.getElementById("result-title"),
    resultScore: document.getElementById("result-score"),
    resultMessage: document.getElementById("result-message"),
    audioPlayer: document.getElementById("audio-player"),
    autoConfirm: document.getElementById("auto-confirm"),
    livesDisplay: document.getElementById("lives"),
    replayBtn: document.getElementById("replay-btn"),
    extend1Btn: document.getElementById("extend1-btn"),
    extend2Btn: document.getElementById("extend2-btn"),
    skipBtn: document.getElementById("skip-btn"),
    bgMusic: document.getElementById("bg-music")
};

// Event listeners
elements.startBtn.addEventListener("click", startGame);
elements.startQuizBtn.addEventListener("click", startQuiz);
elements.playBtn.addEventListener("click", playAudio);
elements.confirmYes.addEventListener("click", confirmAnswer);
elements.confirmNo.addEventListener("click", hideConfirmPopup);
elements.replayBtn.addEventListener("click", replayAudio);
elements.extend1Btn.addEventListener("click", () => extendAudio(1));
elements.extend2Btn.addEventListener("click", () => extendAudio(2));
// Event listener tombol skip
document.getElementById("skip-btn").addEventListener("click", skipQuestion);

document.addEventListener("DOMContentLoaded", () => {
    elements.playBtn = document.getElementById("play-btn");
    // dst...

    detectDevTools(() => {
        alert("Dilarang membuka Developer Tools! Permainan dihentikan.");
        stopQuizAndLock();
    });
});

function stopQuizAndLock() {
    elements.audioPlayer.pause();
    clearTimeout(state.audioTimeout);
    clearInterval(state.timeoutInterval);

    elements.playBtn.disabled = true;
    elements.replayBtn.disabled = true;
    elements.extend1Btn.disabled = true;
    elements.extend2Btn.disabled = true;
    document.getElementById("skip-btn").disabled = true;

    document.getElementById("quiz-screen").innerHTML = `
        <h2 style="color:white; text-align:center;">🚫 Kamu ketahuan curang 😠</h2>
        <p style="text-align:center;">Silakan refresh dan main dengan jujur ya!</p>
    `;
    document.getElementById("quiz-screen").style.backgroundColor = "#000";
}

// Add double click listeners for option buttons
elements.optionBtns.forEach(btn => {
    let clickCount = 0;
    
    btn.addEventListener("click", () => {
        clickCount++;
        
        if (clickCount === 1) {
            elements.optionBtns.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            
            if (btn.dataset.difficulty) {
                state.difficulty = btn.dataset.difficulty;
                state.duration = parseInt(btn.dataset.duration);
                state.originalDuration = parseInt(btn.dataset.duration);
            } else if (btn.dataset.count) {
                state.songCount = parseInt(btn.dataset.count);
            }
        } else if (clickCount === 2) {
            if (btn.dataset.difficulty) {
                showScreen(elements.countScreen);
            } else if (btn.dataset.count) {
                showScreen(elements.groupScreen);
            }
            clickCount = 0;
        }
        
        setTimeout(() => {
            clickCount = 0;
        }, 500);
    });
});

// Add click listeners for quiz options
elements.optionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (elements.autoConfirm.checked) {
            checkAnswer(btn.dataset.option);
        } else {
            showConfirmPopup(btn.dataset.option);
        }
    });
});

// Start the game
function startGame() {
    const username = elements.usernameInput.value.trim();
    
    if (username === "") {
        alert("Silakan masukkan nama kamu terlebih dahulu!");
        return;
    }
    
    state.username = username;
    showScreen(elements.difficultyScreen);
    
    // Play background music
    elements.bgMusic.play();
}
let database = {};

async function loadSelectedDatabases() {
    const modules = [];
    state.selectedGroups = [];

    if (document.getElementById("nogi-check").checked) {
        modules.push(import("../store/data/introquiz/db_nogi.js"));
        state.selectedGroups.push("nogi");
    }
    if (document.getElementById("saku-check").checked) {
        modules.push(import("../store/data/introquiz/db_saku.js"));
        state.selectedGroups.push("saku");
    }
    if (document.getElementById("keya-check").checked) {
        modules.push(import("../store/data/introquiz/db_keya.js"));
        state.selectedGroups.push("keya");
    }
    if (document.getElementById("hina-check").checked) {
        modules.push(import("../store/data/introquiz/db_hina.js"));
        state.selectedGroups.push("hina");
    }

    if (state.selectedGroups.length === 0) {
        alert("Silakan pilih minimal satu grup!");
        return false;
    }

    const results = await Promise.all(modules);

    // Isi objek database sesuai grup
    database = {};
    results.forEach((mod, i) => {
        const group = state.selectedGroups[i];
        database[group] = mod[`db_${group}`];
    });

    return true;
}


function preloadAudios(questions) {
    const urls = new Set();

    // Tambahkan semua lagu pertanyaan & opsi
    questions.forEach(q => {
        urls.add(q.song.url);
        q.options.forEach(opt => {
            // Ambil lagu dari judul opsi jika ada di database
            for (const group in database) {
                const match = database[group].find(s => s.title === opt);
                if (match) urls.add(match.url);
            }
        });
    });

    // Tambahkan SFX kalau ada
    if (elements.correctSfx?.src) urls.add(elements.correctSfx.src);
    if (elements.wrongSfx?.src) urls.add(elements.wrongSfx.src);

    const preloadPromises = Array.from(urls).map(url => {
        return new Promise(resolve => {
            const audio = new Audio();
            audio.src = url;
            audio.preload = "auto";
            audio.addEventListener("canplaythrough", resolve, { once: true });
            audio.addEventListener("error", resolve, { once: true }); // biar tetap lanjut meskipun ada yang gagal
        });
    });

    return Promise.all(preloadPromises);
}

// Start the quiz
async function startQuiz() {
    const loaded = await loadSelectedDatabases();
    if (!loaded) return;

    // Generate dulu semua pertanyaan
    const questions = generateQuestions();

    // Tampilkan layar loading
    showScreen(document.getElementById("loading-screen"));

    // Preload lagu dan SFX
    await preloadAudios(questions);

    // Setelah selesai loading, lanjut
    state.questions = questions;
    state.currentQuestion = 0;
    state.score = 0;

    // Hitung nyawa
    if (state.songCount === 50) state.lives = 5;
    else if (state.songCount === 25) state.lives = 4;
    else state.lives = 3;
    state.originalLives = state.lives;

    updateLives();

	// Fade out BGM sekarang
	fadeOutAudio(elements.bgMusic);

    // Tampilkan quiz
    showScreen(elements.quizScreen);
    showQuestion();
}



// Generate questions with balanced distribution across selected groups
function generateQuestions() {
    const questions = [];
    const allSongs = [];
    
    // 1. Kumpulkan semua lagu dari grup yang dipilih
    state.selectedGroups.forEach(group => {
        allSongs.push(...database[group].map(song => ({ ...song, group })));
    });
    
    // 2. Jika hanya 1 grup yang dipilih, gunakan logika sederhana
    if (state.selectedGroups.length === 1) {
        const shuffledSongs = shuffleArray([...allSongs]);
        const selectedSongs = shuffledSongs.slice(0, state.songCount);
        
        // Buat pertanyaan
        selectedSongs.forEach(song => {
            const otherSongs = allSongs.filter(s => s.title !== song.title);
            const shuffledOthers = shuffleArray([...otherSongs]);
            const wrongOptions = shuffledOthers.slice(0, 3).map(s => s.title);
            const options = shuffleArray([song.title, ...wrongOptions]);
            
            questions.push({
                song,
                options,
                correctOption: String.fromCharCode(65 + options.indexOf(song.title))
            });
        });
    } 
    // 3. Jika lebih dari 1 grup, gunakan pembagian merata
    else {
        const groupCount = state.selectedGroups.length;
        const songsPerGroup = Math.floor(state.songCount / groupCount);
        let remainder = state.songCount % groupCount;
        
        const selectedSongs = [];
        
        // Untuk setiap grup, ambil lagu sesuai pembagian
        state.selectedGroups.forEach(group => {
            const groupSongs = allSongs.filter(song => song.group === group);
            const shuffledGroup = shuffleArray([...groupSongs]);
            
            // Hitung jumlah lagu yang akan diambil dari grup ini
            let count = songsPerGroup;
            if (remainder > 0) {
                count++;
                remainder--;
            }
            
            // Tambahkan lagu ke selectedSongs
            selectedSongs.push(...shuffledGroup.slice(0, Math.min(count, groupSongs.length)));
        });
        
        // Acak lagi semua lagu yang telah dipilih
        const shuffledSongs = shuffleArray(selectedSongs).slice(0, state.songCount);
        
        // Buat pertanyaan
        shuffledSongs.forEach(song => {
            const otherSongs = allSongs.filter(s => s.title !== song.title);
            const shuffledOthers = shuffleArray([...otherSongs]);
            const wrongOptions = shuffledOthers.slice(0, 3).map(s => s.title);
            const options = shuffleArray([song.title, ...wrongOptions]);
            
            questions.push({
                song,
                options,
                correctOption: String.fromCharCode(65 + options.indexOf(song.title))
            });
        });
    }
    
    return questions;
}

function applyThemeByGroup() {
    const group = state.selectedGroups.length === 1 ? state.selectedGroups[0] : null;

    const elementsToTheme = [
        { el: document.getElementById("quiz-screen"), classes: ["nogi", "keya", "saku", "hina"] },
        { el: document.querySelector(".progress-bar"), classes: ["nogi", "keya", "saku", "hina"] },
        { el: document.querySelector(".progress-fill"), classes: ["nogi", "keya", "saku", "hina"] },
        { el: document.querySelector(".timeout-container"), classes: ["nogi", "keya", "saku", "hina"] },
        { el: document.querySelector(".timeout-bar"), classes: ["nogi", "keya", "saku", "hina"] },
        { el: document.getElementById("play-btn"), classes: ["nogi", "keya", "saku", "hina"] },
        { el: document.querySelector(".progress-text"), classes: ["nogi", "keya", "saku", "hina"] },
        { el: document.getElementById("minicatatan"), classes: ["nogi", "keya", "saku", "hina"] },
        { el: document.querySelector(".auto-confirm-label"), classes: ["nogi", "keya", "saku", "hina"] }
    ];

    elementsToTheme.forEach(({ el, classes }) => {
        if (!el) return;
        classes.forEach(cls => el.classList.remove(cls));
        if (group) el.classList.add(group);
    });

    // Tambahkan ke semua tombol di dalam quiz screen
    const allButtons = document.querySelectorAll("#quiz-screen button");
    allButtons.forEach(btn => {
        ["nogi", "keya", "saku", "hina"].forEach(cls => btn.classList.remove(cls));
        if (group) btn.classList.add(group);
    });
}



// Show current question
function showQuestion() {
    if (state.currentQuestion >= state.questions.length) {
        showResults();
        return;
    }
    
	applyThemeByGroup();
    const question = state.questions[state.currentQuestion];

    // Reset lives & nyawa
    updateLives();
    
    // Reset durasi ke nilai asli
    state.duration = state.originalDuration;
    
    // Update progress
    const progressText = `${state.currentQuestion + 1}/${state.questions.length}`;
    const progressPercent = ((state.currentQuestion + 1) / state.questions.length) * 100;
    
    document.querySelector(".progress-text").textContent = progressText;
    document.querySelector(".progress-fill").style.width = `${progressPercent}%`;
    
    // Reset UI
    elements.playBtn.disabled = false;
    elements.quizOptions.classList.add("rotated");
    
    // Set option texts
    const optionElements = document.querySelectorAll(".quiz-option");
    question.options.forEach((option, index) => {
        const optionChar = String.fromCharCode(65 + index);
        const optionElement = Array.from(optionElements).find(el => el.dataset.option === optionChar);
        
        if (optionElement) {
            optionElement.textContent = option;
            optionElement.disabled = false;
            
            // Find which group this option belongs to
            let groupClass = "";
            state.selectedGroups.forEach(group => {
                if (database[group].some(song => song.title === option)) {
                    groupClass = group;
                }
            });
            
            // Remove all group classes and add the correct one
            optionElement.classList.remove("nogi", "saku", "hina", "keya");
            if (groupClass) {
                optionElement.classList.add(groupClass);
            }
            
            // Reset styles
            optionElement.style.backgroundColor = "";
            optionElement.style.color = "";
        }
    });

    // UPDATE TAMPILAN NYAWA
    updateLives();

    // TERAKHIR → pastikan semua tombol tool disable sebelum play
    updateToolButtons(false);
}


// Play audio for current question
// function playAudio() {
    // const question = state.questions[state.currentQuestion];
    
    // // Set audio source
    // elements.audioPlayer.src = question.song.url;

    // // Reset progress bar agar tetap penuh dulu (belum jalan)
    // clearInterval(state.timeoutInterval);
    // elements.timeoutBar.style.width = "100%";

    // // Mainkan audio dari awal
    // elements.audioPlayer.currentTime = 0;
    // elements.audioPlayer.play();
    
    // // Pause audio setelah durasi selesai
    // state.audioTimeout = setTimeout(() => {
        // elements.audioPlayer.pause();
        // startDelayedTimeoutAfterAudio(); // baru mulai progress bar setelah lagu selesai + delay
    // }, state.duration * 1000);

    // // Disable tombol play
    // elements.playBtn.disabled = true;

    // // Aktifkan tombol tools sesuai level dan nyawa
    // updateToolButtons(true);

    // // Tampilkan opsi setelah animasi
    // setTimeout(() => {
        // elements.quizOptions.classList.remove("rotated");
    // }, 300);
// }

function playAudio() {
    const question = state.questions[state.currentQuestion];
    const audioUrl = question.song.url;

    elements.audioPlayer.src = audioUrl;
    elements.audioPlayer.load();

    // Reset progress bar dan timer
    clearTimeout(state.audioTimeout);
    clearInterval(state.timeoutInterval);
    elements.timeoutBar.style.width = "100%";

    // Hanya mulai timer setelah audio siap
    elements.audioPlayer.addEventListener("canplaythrough", () => {
        elements.audioPlayer.play().catch(err => {
            console.warn("Gagal memutar:", err);
        });

        // Start timer SETELAH audio berhasil diputar
        state.audioTimeout = setTimeout(() => {
            elements.audioPlayer.pause();
            startDelayedTimeoutAfterAudio();
        }, state.duration * 1000);
    }, { once: true });

    // UI
    elements.playBtn.disabled = true;
    updateToolButtons(true);

    setTimeout(() => {
        elements.quizOptions.classList.remove("rotated");
    }, 300);
}


function startDelayedTimeoutAfterAudio() {
    let delay = 1000;
    if (state.difficulty === "easy") {
        delay = 3000;
        state.timeoutDuration = 10;
    } else if (state.difficulty === "medium") {
        delay = 1000;
        state.timeoutDuration = 15;
    } else if (state.difficulty === "hard") {
        delay = 1000;
        state.timeoutDuration = 20;
    }

    elements.timeoutBar.style.width = "100%"; // pastikan tetap penuh sebelum mulai jalan

    setTimeout(() => {
        startTimeoutProgress();
    }, delay);
}


// Fungsi untuk timeout progress
function startTimeoutProgress() {
    clearInterval(state.timeoutInterval);
    elements.timeoutBar.style.width = "100%";

    const duration = state.timeoutDuration;
    state.timeoutStart = Date.now();

    state.timeoutInterval = setInterval(() => {
        const elapsed = (Date.now() - state.timeoutStart) / 1000;
        const remaining = Math.max(0, duration - elapsed);
        const percent = (remaining / duration) * 100;

        elements.timeoutBar.style.width = `${percent}%`;

        if (remaining <= 0) {
            clearInterval(state.timeoutInterval);
            handleTimeout();
        }
    }, 100);
}


// Fungsi untuk menangani timeout
function handleTimeout() {
    // Stop audio
    elements.audioPlayer.pause();
    clearTimeout(state.audioTimeout);
    
    // Disable all options
    elements.optionButtons.forEach(btn => {
        btn.disabled = true;
    });
    
    // Disable tool buttons
    elements.replayBtn.disabled = true;
    elements.extend1Btn.disabled = true;
    elements.extend2Btn.disabled = true;
    elements.skipBtn.disabled = true;
    
    // Show timeout feedback
    showFeedback(false, true);
    
	const timeoutSound = new Audio("https://files.catbox.moe/dq0aow.mp3");
	timeoutSound.play();

    // Move to next question after delay
    setTimeout(() => {
        state.currentQuestion++;
        showQuestion();
    }, 2000);
}

// Replay audio
function replayAudio() {
    if (state.lives <= 0) return;

    state.lives--;
    updateLives();

    // Reset timeout & progress bar
    clearTimeout(state.audioTimeout);
    clearInterval(state.timeoutInterval);
    elements.timeoutBar.style.width = "100%";

    // Ulang audio dari awal
    elements.audioPlayer.currentTime = 0;
    elements.audioPlayer.play();

    // Setelah selesai, baru mulai progress bar
    state.audioTimeout = setTimeout(() => {
        elements.audioPlayer.pause();
        startDelayedTimeoutAfterAudio();
    }, state.duration * 1000);
}



// Extend audio dengan durasi tambahan (1 atau 2 detik)
function extendAudio(extraSeconds) {
    if (state.lives <= 0) return;

    // Validasi level
    if (state.difficulty === "easy") {
        alert("Penambahan durasi tidak tersedia di level EASY.");
        return;
    }
    if (state.difficulty === "medium" && extraSeconds > 1) {
        alert("Di level MEDIUM hanya bisa menambah 1 detik.");
        return;
    }

    // Kurangi nyawa
    state.lives--;
    updateLives();

    // Update durasi audio
    const newDuration = state.originalDuration + extraSeconds;
    state.duration = newDuration;

    // Reset progress bar
    clearTimeout(state.audioTimeout);
    clearInterval(state.timeoutInterval);
    elements.timeoutBar.style.width = "100%";

    // Putar ulang audio
    elements.audioPlayer.currentTime = 0;
    elements.audioPlayer.play();

    // Setelah selesai, baru jalankan progress bar
    state.audioTimeout = setTimeout(() => {
        elements.audioPlayer.pause();
        startDelayedTimeoutAfterAudio();
    }, newDuration * 1000);
}



// Fungsi untuk skip pertanyaan
function skipQuestion() {
    if (state.lives <= 0) return;

    // Kurangi nyawa
    state.lives--;
    updateLives();

    // Stop audio jika masih diputar
    if (!elements.audioPlayer.paused) {
        elements.audioPlayer.pause();
    }

    clearTimeout(state.audioTimeout);
    clearInterval(state.timeoutInterval);

    // Ambil pertanyaan saat ini
    const question = state.questions[state.currentQuestion];

    // Tandai jawaban yang benar
    const correctElement = document.querySelector(`.quiz-option[data-option="${question.correctOption}"]`);
    if (correctElement) {
        correctElement.style.backgroundColor = "#3498db"; // warna biru
        correctElement.style.color = "white";
    }

    // Nonaktifkan semua tombol pilihan
    elements.optionButtons.forEach(btn => {
        btn.disabled = true;
    });

    // Nonaktifkan tombol tools
    elements.replayBtn.disabled = true;
    elements.extend1Btn.disabled = true;
    elements.extend2Btn.disabled = true;
    elements.skipBtn.disabled = true;

    // Tampilkan feedback "Jawaban benar adalah..."
    elements.feedbackText.textContent = "Dilewati! Jawaban benar ditampilkan.";
    elements.feedbackPopup.style.backgroundColor = "rgba(52, 152, 219, 0.9)";
    elements.feedbackPopup.classList.remove("hidden");

	const skipSound = new Audio("https://files.catbox.moe/bpo19q.mp3");
	skipSound.play();
	
	updateToolButtons(false);

    setTimeout(() => {
        elements.feedbackPopup.classList.add("hidden");

        // Reset tampilan opsi
        elements.optionButtons.forEach(btn => {
            btn.style.backgroundColor = "";
            btn.style.color = "";
        });

        // Lanjut ke soal berikutnya
        state.currentQuestion++;
        showQuestion();
    }, 2000);
}


// Update lives display
function updateLives() {
    let livesText = "";
    for (let i = 0; i < state.originalLives; i++) {
        livesText += i < state.lives ? "❤️" : "❌";
    }
    elements.livesDisplay.textContent = livesText;

    // Nonaktifkan tombol tools jika nyawa habis
    const noLives = state.lives <= 0;

    elements.replayBtn.disabled = noLives;
    elements.extend1Btn.disabled = noLives || !(state.difficulty === "medium" || state.difficulty === "hard");
    elements.extend2Btn.disabled = noLives || !(state.difficulty === "hard");
    document.getElementById("skip-btn").disabled = noLives;
}


function updateToolButtons(afterPlay = false) {
    const noLives = state.lives <= 0;

    if (!afterPlay) {
        // Belum tekan play → semua tombol harus mati
        elements.replayBtn.disabled = true;
        elements.extend1Btn.disabled = true;
        elements.extend2Btn.disabled = true;
        document.getElementById("skip-btn").disabled = true;
    } else {
        // Setelah tekan play → aktifkan sesuai rules
        elements.replayBtn.disabled = noLives;
        elements.extend1Btn.disabled = noLives || !(state.difficulty === "medium" || state.difficulty === "hard");
        elements.extend2Btn.disabled = noLives || !(state.difficulty === "hard");
        document.getElementById("skip-btn").disabled = noLives;
    }
}


// Show confirmation popup
function showConfirmPopup(selectedOption) {
    state.selectedOption = selectedOption;
    elements.confirmPopup.classList.remove("hidden");
}

// Hide confirmation popup
function hideConfirmPopup() {
    elements.confirmPopup.classList.add("hidden");
}

// Confirm answer
function confirmAnswer() {
    hideConfirmPopup();
    checkAnswer(state.selectedOption);
}

// Check answer
function checkAnswer(selectedOption) {
    clearInterval(state.timeoutInterval);
    const question = state.questions[state.currentQuestion];
    const isCorrect = selectedOption === question.correctOption;
    
    // Hentikan lagu pertanyaan jika masih diputar
    if (!elements.audioPlayer.paused) {
        elements.audioPlayer.pause();
    }
    
    // Batalkan timeout yang akan menghentikan lagu
    if (state.audioTimeout) {
        clearTimeout(state.audioTimeout);
        state.audioTimeout = null;
    }
    
    // Disable all options
    elements.optionButtons.forEach(btn => {
        btn.disabled = true;
    });
    
    // Disable tool buttons
    elements.replayBtn.disabled = true;
    elements.extend1Btn.disabled = true;
    elements.extend2Btn.disabled = true;
    elements.skipBtn.disabled = true;
    
    // Highlight correct answer
    const correctElement = document.querySelector(`.quiz-option[data-option="${question.correctOption}"]`);
    if (correctElement) {
        correctElement.style.backgroundColor = "#2ecc71";
        correctElement.style.color = "white";
    }
    
    // Highlight incorrect answer if wrong
    if (!isCorrect) {
        const selectedElement = document.querySelector(`.quiz-option[data-option="${selectedOption}"]`);
        if (selectedElement) {
            selectedElement.style.backgroundColor = "#e74c3c";
            selectedElement.style.color = "white";
        }
    } else {
        state.score++;
    }

    // Play feedback sound
    const feedbackSound = new Audio(isCorrect ? 'https://files.catbox.moe/2aeoq1.mp3' : 'https://files.catbox.moe/w046vq.mp3');
    feedbackSound.play();
    
    // Show feedback
    showFeedback(isCorrect);
    updateToolButtons(false);

    // Move to next question after delay
    setTimeout(() => {
        state.currentQuestion++;
        showQuestion();
        
        // Reset option styles
        elements.optionButtons.forEach(btn => {
            btn.style.backgroundColor = "";
            btn.style.color = "";
        });
    }, 2000);
}

// Fungsi showFeedback untuk menangani timeout
function showFeedback(isCorrect, isTimeout = false) {
    if (isTimeout) {
        elements.feedbackText.textContent = "Waktu habis!";
        elements.feedbackPopup.style.backgroundColor = "rgba(231, 76, 60, 0.9)";
    } else {
        elements.feedbackText.textContent = isCorrect ? "Benar!" : "Salah!";
        elements.feedbackPopup.style.backgroundColor = isCorrect ? "rgba(46, 204, 113, 0.9)" : "rgba(231, 76, 60, 0.9)";
    }
    
    elements.feedbackPopup.classList.remove("hidden");
    
    setTimeout(() => {
        elements.feedbackPopup.classList.add("hidden");
    }, 1000);
}

// Confetti effect
function createConfetti() {
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function showResults() {
    const percentage = (state.score / state.questions.length) * 100;
    
    // Set result title
    if (percentage === 100) {
        elements.resultTitle.textContent = "Selamat!";
    } else if (percentage >= 50) {
        elements.resultTitle.textContent = "Lumayan!";
    } else {
        elements.resultTitle.textContent = "Waduh!";
    }

    // Tampilkan skor
    elements.resultScore.textContent = `${state.username}, kamu benar ${state.score} dari ${state.questions.length}!`;

    const groups = state.selectedGroups;
    let message = "";
    const only = (key) => groups.length === 1 && groups.includes(key);

    if (only("nogi")) {
        if (percentage === 100) message = "Itu bukti kalo kamu wota Nogi!";
        else if (percentage >= 75) message = "Kamu hampir sempurna mengenal lagu-lagunya Nogizaka46";
        else if (percentage >= 50) message = "Kayaknya kamu harus sering denger lagu-lagunya Nogizaka deh";
        else message = "Cintamu pada Nogizaka masih diragukan :(";
    } else if (only("keya")) {
        if (percentage === 100) message = "Itu bukti kalo kamu penggemar beratnya Keyakizaka46";
        else if (percentage >= 75) message = "Kamu hampir sempurna mengenal lagu-lagunya Keyakizaka46";
        else if (percentage >= 50) message = "Kayaknya kamu harus sering denger lagu-lagunya Keyakizaka deh";
        else message = "Cintamu sama Keyaki masih kurang :(";
    } else if (only("saku")) {
        if (percentage === 100) message = "Itu bukti kalo kamu Buddies beneran :)";
        else if (percentage >= 75) message = "Kamu hampir menjadi Buddies yang paripurna, dikit lagi :)";
        else if (percentage >= 50) message = "Kayaknya kamu harus sering denger lagu-lagunya Sakurazaka deh";
        else message = "Kamu beneran Buddies? Apa baru kenal?";
    } else if (only("hina")) {
        if (percentage === 100) message = "Itu bukti kalo kamu Ohisama sejati~!";
        else if (percentage >= 75) message = "Kamu hampir menjadi Ohisama yang sempurna, dikit lagi :)";
        else if (percentage >= 50) message = "Kayaknya kamu harus sering denger lagu-lagunya Hinatazaka deh";
        else message = "Kamu beneran Ohisama? Apa baru kenal?";
    } else {
        // Kombinasi grup
        const fans = [];
        if (groups.includes("nogi")) fans.push("wota nogi");
        if (groups.includes("keya")) fans.push("wota keyaki");
        if (groups.includes("saku")) fans.push("buddies");
        if (groups.includes("hina")) fans.push("ohisama");

        const fansText = fans.join(", ");
        if (percentage === 100) {
            message = `Kamu gabungan ${fansText} sejati!`;
        } else if (percentage >= 75) {
            message = `Kamu hampir jadi ${fansText} paripurna!`;
        } else if (percentage >= 50) {
            message = `Kamu perlu sering dengerin lagu dari grup favoritmu, ${fansText}!`;
        } else {
            message = `Cinta kamu ke ${fansText} masih perlu dipertanyakan 😢`;
        }
    }

    // Tampilkan pesan
    elements.resultMessage.textContent = message;

    if (percentage >= 75) createConfetti();

    // Tombol "Main Lagi"
    const playAgainBtn = document.createElement('button');
    playAgainBtn.className = 'play-again-btn';
    playAgainBtn.textContent = 'Main Lagi';
    playAgainBtn.addEventListener('click', () => {
        showScreen(elements.welcomeScreen);
        document.querySelectorAll('.confetti').forEach(el => el.remove());

        // Reset BGM
        elements.bgMusic.currentTime = 0;
        elements.bgMusic.volume = 1;
        elements.bgMusic.play();
    });

    // Remove tombol lama jika ada
    const existingBtn = elements.resultScreen.querySelector('.play-again-btn');
    if (existingBtn) existingBtn.remove();

    elements.resultScreen.appendChild(playAgainBtn);
    showScreen(elements.resultScreen);
}


// Helper function to shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Helper function to show a screen
// function showScreen(screen) {
    // document.querySelectorAll(".screen").forEach(s => {
        // s.classList.add("hidden");
    // });
    // screen.classList.remove("hidden");
// }

function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
    screen.classList.remove("hidden");
}

// Fade out audio
function fadeOutAudio(audioElement) {
    const fadeOutInterval = setInterval(() => {
        if (audioElement.volume > 0.1) {
            audioElement.volume -= 0.1;
        } else {
            audioElement.volume = 0;
            audioElement.pause();
            clearInterval(fadeOutInterval);
        }
    }, 200);
}

function detectDevTools(callback) {
    let threshold = 160; // tinggi minimal DevTools (px)
    let opened = false;

    const check = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        const isOpen = widthThreshold || heightThreshold;

        if (isOpen !== opened) {
            opened = isOpen;
            if (opened) callback();
        }
    };

    setInterval(check, 500);
}

