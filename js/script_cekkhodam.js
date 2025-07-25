const khodamList = [
    "Gigi Kakki",
    "Jeruk Kakki",
    "Kaki Furai Kakki",
    "Alis 45 Derajat Haruka",
    "Origami Bangau Kakki",
    "Kambing Yoda",
    "Daging Kuda Yoda",
    "Sepeda Roda Satu Yoda",
	"Stik Ps Ayatie",
	"Bet Ayatie",
	"Yakiniku Ayatie",
	"Gitar Renka",
	"Sepatu Roda Renka",
	"Yoghurt Aloe Vera Iroha",
	"Kamishibai Iroha",
	"Anpan Mentega Iroha",
	"Gitar Iroha",
	"Gitar Hazuki",
	"Air Mata Yakubo",
	"Boba Yakubo",
	"Idol Goods Yakubo",
	"Kapten Ume",
	"Tongkat Estafet Riria",
	"Mitarashi Dango Sakuchan",
	"Klarinet Sakuchan",
	"Sepatu Balet Hina",
	"Sepatu Balet Tamami",
	"Lidah Sapi Shiori",
	"Miso Katsu Runa",
	"Seruling Reno",
	"Permen Kapas Reno",
	"Ramen Tulang Babi Hazuki",
	"Tomat Aaya",
	"Backflip Miyu",
	"Pir Miyu",
	"Buku Harian Miyu",
	"Baju Rajut Ayamen",
	"Teddy Bear Saachan",
	"Tongkat Bisbol Yuna",
	"Photobook Naonao",
	"Gantungan Anjing Naonao",
	"Alat Kosmetik Hina",
	"Kamera SLR Naonao",
	"Awan Putih Yuri",
	"Penadah Katering Terepan",
	"Ikan Tuna Mao",
	"Kuku Bulat Mao",
	"Topeng Kendo Mao",
	"Teh Jasmine Mao",
	"Lukisan Terepan",
	"Udang Goreng Tepung Terepan",
	"Surume Miikyun",
	"Gingsul Satsuki",
	"Plin Plan Satsuki",
	"Buah Kering Satsuki",
	"Ring Basket Satsuki",
	"Sushi Kerang Satsuki",
	"Rei Ketua Osis",
	"Rei Fasih Bahasa Inggris",
	"Jeruk Rei",
	"Tongkat Biliar Mayutan",
	"Hamburger Mayutan",
	"Piano Miikyun",
	"Otameshisa Ririan",
	"Umukuji Tempura Ririan",
	"Kuas Lukis Terepan",
	"Panah Nagi",
	"Busur Nagi",
	"Ohagi Nagi",
	"Paprika Isi Daging Kesukaan Nagi",
	"Sepatu Ski Sakutan",
	"Stroberi Sakutan",
	"Ceri Sakutan",
	"Macaron Sakutan",
	"Bola Sepak Sakutan",
	"Gitar Saachan",
	"Kacamata Baca Saachan",
	"Stroberi Saachan",
	"Bola Basket Yanchan",
	"Bola Basket Yumiki",
	"Sendok Zuki",
	"Hagi No Tsuki Shiori",
	"Kung Fu Kuromi",
	"Belalang Sembah Kuromi",
	"Xiao Long Bao Kuromi",
	"Matras Tamami",
	"Master Gambar Tamami",
	"Pompom Cheerleader Yuna",
	"Omurice Yuna",
	"Sarung Tangan Softball Mayutan",
	"Ninja Warrior Denchan",
	"Robot Ai Denchan",
	"Sepatu Lari Denchan",
	"Wajan Telur Gulung Satsuki",
	"Kok Badminton Denchan",
	"Hacker Lica",
	"Keyboard Lica",
	"Terompet Lica",
	"Sungai Arno",
	"Sempoa Aaya",
	"Stik Drum Aaya",
	"Tokek Macan Tutul Aruno",
	"Sanrio Reno",
	"Headphone Reno",
	"Mata Putih Runa",
	"Tauge Runa",
	"Buku Bahasa Isyarat Runa",
	"Omurice Runa",
	"Oven Microwave Runa",
	"Spatula Yumiki",
	"Takoyaki Seira",
	"Osaka Medhok Seira",
	"Onsen Ume",
	"Mayones Ume",
	"Bola Voli Ume",
	"Sauna Zukki",
	"Klub Golf Zukki",
	"Kerang Yanchan",
	"Semprotan Rambut Yanchan",
	"Flamingo Yamashita",
	"Kedai Kopi Ayamen",
	"Melon Soda Ayamen",
];

function hashName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = (hash << 5) - hash + name.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % khodamList.length;
}

function checkKhodam() {
    const nameInput = document.getElementById('nameInput').value.trim();
    const validCharsRegex = /^[a-zA-Z0-9\s@\-_]+$/;
    if (nameInput.length < 5 || !validCharsRegex.test(nameInput)) {
        alert('Nama harus minimal 5 karakter dan hanya boleh mengandung huruf, angka, spasi, @, -, dan _');
        return;
    }

    document.querySelector('p').style.display = 'none';
    document.querySelector('.input-group').style.display = 'none';

    const loadingAnalyze = document.getElementById('loadingAnalyze');
    loadingAnalyze.style.display = 'block';
    
    let analyzePercentage = 0;
    const analyzeInterval = setInterval(() => {
        analyzePercentage += Math.floor(Math.random() * 10) + 1;
        if (analyzePercentage > 100) analyzePercentage = 100;
        loadingAnalyze.textContent = `Menganalisa ${analyzePercentage}%`;

        if (analyzePercentage === 100) {
            clearInterval(analyzeInterval);
            loadingAnalyze.style.display = 'none';
            determineKhodam(nameInput);
        }
    }, 100);
}

function determineKhodam(name) {
    const loadingDetermine = document.getElementById('loadingDetermine');
    loadingDetermine.style.display = 'block';

    let determinePercentage = 0;
    const determineInterval = setInterval(() => {
        determinePercentage += Math.floor(Math.random() * 10) + 1;
        if (determinePercentage > 100) determinePercentage = 100;
        loadingDetermine.textContent = `Menentukan khodam ${determinePercentage}%`;

        if (determinePercentage === 100) {
            clearInterval(determineInterval);
            displayResult(name);
        }
    }, 100);
}

function displayResult(name) {
    document.getElementById('loadingDetermine').style.display = 'none';

    const resultElement = document.getElementById('result');
    const khodamIndex = hashName(name);
    const khodamName = khodamList[khodamIndex];

    resultElement.innerHTML = `
        Wahai anak yang bernama ${name},<br>di Nogizaka46 kamu punya khodam<br><br>
        <span class="khodam-name">${khodamName}</span><br><br>
    `;
    resultElement.style.display = 'block';
    document.getElementById('shareMessage').style.display = 'block';
    document.getElementById('retryButton').style.display = 'block';
}

function reset() {
    document.querySelector('p').style.display = 'block';
    document.querySelector('.input-group').style.display = 'block';
    document.getElementById('nameInput').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('shareMessage').style.display = 'none';
    document.getElementById('retryButton').style.display = 'none';
}