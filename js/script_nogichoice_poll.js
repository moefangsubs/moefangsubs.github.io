const POLL_CONFIG = [
    {
        id: 'intro',
        type: 'intro',
        title: 'Nogizaka46 Indonesia Fans\' Choice 2025',
        desc: `Halo, Nogizaka fans!
MoeFang Subs sekarang hadir dengan sesuatu yang agak lain wkwkwk.

Di akhir tahun ini, saya mengundang kalian untuk berpartisipasi dalam "Nogizaka46 Indonesia Fans' Choice 2025".
Ayo tunjukkan dukungan kalian dan pilih lagu favorit dari grup kesayangan kita!

Ini diadakan untuk bersenang-senang saja. Tidak ada yang lebih indah daripada melihat komunitas fans bersatu untuk mendukung idola kesayangan kita.`,
        date: 'Pelaksanaan : 1-30 Desember 2025'
    },
    {
        id: 'poll_1_main',
        type: 'song',
        title: '5 Top Main Song Nogizaka Era Baru',
        desc: 'Pilih 3 lagu favorit kalian dari lagu-lagu utama yang menjadi ikon baru Nogizaka46 di era ini, yaitu dari single Hito wa Yume o Nido Miru.\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)',
        source: 'songall',
        filter: (song, sid) => {
            const sNum = parseInt(sid.replace('s', ''));
            if (sid === 's39' && song.titleRo === 'Manatsubi yo') return false;
            return !isNaN(sNum) && sNum >= 32 && sNum <= 40 && song.songOutline === 'Senbatsu' && song.songTypeAvv === 'All';
        },
        limit: 3,
        exact: true
    },
    {
        id: 'poll_2_under',
        type: 'song',
        title: '5 Top Under Song Nogizaka Era Baru',
        desc: 'Berikan cinta kalian untuk Under Members dengan memilih 3 lagu favorit kalian.\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)',
        source: 'songall',
        filter: (song, sid) => {
            const sNum = parseInt(sid.replace('s', ''));
            return !isNaN(sNum) && sNum >= 32 && sNum <= 40 && song.songOutline === 'Under';
        },
        limit: 3,
        exact: true
    },
    {
        id: 'poll_3_unit',
        type: 'song',
        title: '5 Top Unit Song',
        desc: 'Unit Song selalu menghadirkan nuansa unik. Pilih 5 lagu favorit dari daftar berikut.\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)',
        source: 'songall',
        filter: (song, sid) => {
            const sNum = parseInt(sid.replace('s', ''));
            return !isNaN(sNum) && sNum >= 32 && sNum <= 40 && song.songOutline.includes('Unit');
        },
        limit: 5,
        exact: true,
        noImage: true,
        showMembers: true
    },
    {
        id: 'poll_4_gen2',
        type: 'song',
        title: '3 Top 2nd Generation Song',
        desc: 'Pilih 3 lagu favorit dari Generasi 2!\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)',
        source: 'songall',
        filter: (song) => song.songOutline && song.songOutline.includes('Gen (2nd)'),
        limit: 3,
        exact: true
    },
    {
        id: 'poll_5_gen3',
        type: 'song',
        title: '5 Top 3rd Generation Song',
        desc: 'Pilih 5 lagu favorit dari Generasi 3!\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)',
        source: 'songall',
        filter: (song) => song.songOutline && song.songOutline.includes('Gen (3rd)'),
        limit: 5,
        exact: true
    },
    {
        id: 'poll_6_gen4',
        type: 'song',
        title: '5 Top 4th Generation Song',
        desc: 'Pilih 5 lagu favorit dari Generasi 4!\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)',
        source: 'songall',
        filter: (song) => song.songOutline && song.songOutline.includes('Gen (4th)'),
        limit: 5,
        exact: true
    },
    {
        id: 'poll_7_gen5',
        type: 'song',
        title: '5 Top 5th Generation Song',
        desc: 'Pilih 5 lagu favorit dari Generasi 5!\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)',
        source: 'songall',
        filter: (song) => song.songOutline && song.songOutline.includes('Gen (5th)'),
        limit: 5,
        exact: true
    },
    {
        id: 'poll_8_gen6',
        type: 'song',
        title: '6th Generation Song',
        desc: 'Silakan pilih minimal 1 lagu favorit dari masa depan Nogizaka.\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)',
        source: 'songall',
        filter: (song) => song.songOutline && song.songOutline.includes('Gen (6th)') && song.titleJp !== 'ぐるぐるカーテン（6期生ver.）',
        limit: 3,
        exact: false,
        min: 1
    },
    {
        id: 'poll_9_favgen1',
        type: 'member',
        title: '5 TOP 1st Generation Favorite',
        desc: 'Pilih maksimal 5 member favorit di gen-1.\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)\nKamu bisa skip bila tidak ada.',
        source: 'member',
        filter: (m) => m.gen === '1期',
        limit: 5,
        exact: false,
        min: 0
    },
    {
        id: 'poll_10_favgen2',
        type: 'member',
        title: '5 TOP 2nd Generation Favorite',
        desc: 'Pilih maksimal 5 member favorit di gen-2.\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)\nKamu bisa skip bila tidak ada.',
        source: 'member',
        filter: (m) => m.gen === '2期',
        limit: 5,
        exact: false,
        min: 0
    },
    {
        id: 'poll_11_favgen3',
        type: 'member',
        title: '5 TOP 3rd Generation Favorite',
        desc: 'Pilih maksimal 5 member favorit di gen-3.\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)\nKamu bisa skip bila tidak ada.',
        source: 'member',
        filter: (m) => m.gen === '3期',
        limit: 5,
        exact: false,
        min: 0
    },
    {
        id: 'poll_12_favgen4',
        type: 'member',
        title: '5 TOP 4th Generation Favorite',
        desc: 'Pilih maksimal 5 member favorit di gen-4.\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)\nKamu bisa skip bila tidak ada.',
        source: 'member',
        filter: (m) => m.gen === '4期',
        limit: 5,
        exact: false,
        min: 0
    },
    {
        id: 'poll_13_favgen5',
        type: 'member',
        title: '5 TOP 5th Generation Favorite',
        desc: 'Pilih maksimal 5 member favorit di gen-5.\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)\nKamu bisa skip bila tidak ada.',
        source: 'member',
        filter: (m) => m.gen === '5期',
        limit: 5,
        exact: false,
        min: 0
    },
    {
        id: 'poll_14_favgen6',
        type: 'member',
        title: '5 TOP 6th Generation Favorite',
        desc: 'Pilih maksimal 5 member favorit di gen-6.\n(Pilih dari yang paling favorit. Nomor 1 adalah yang terfavorit)\nKamu bisa skip bila tidak ada.',
        source: 'member',
        filter: (m) => m.gen === '6期',
        limit: 5,
        exact: false,
        min: 0
    },
    {
        id: 'finish',
        type: 'finish',
        title: 'Terima Kasih!',
        desc: 'Hasil voting akan kami tampilkan di sini tanggal 31 Desember nanti.\nSampai jumpa di pengumuman hasilnya! ❤️'
    }
];