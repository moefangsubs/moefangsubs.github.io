document.addEventListener('memberReady', () => {
  if (window.currentMember) {
    Promise.all([
      fetch("../store/single/senbatsu.json").then(r => r.json()),
      fetch("../store/single/under.json").then(r => r.json()),
      fetch("../store/single/singletitle.json").then(r => r.json())
    ]).then(([senbatsu, under, singletitle]) => {
      const member = window.currentMember;
      const result = {};

      // Proses data senbatsu
      for (const num in senbatsu) {
        const info = senbatsu[num];
        let positionData = null;

        if (Array.isArray(info.center) && info.center.includes(member.nama_jp)) {
          positionData = { row: "WC", type: "senbatsu" };
        } else if (info.center === member.nama_jp) {
          positionData = { row: "C", type: "senbatsu" };
        } else if (info.members1st?.includes(member.nama_jp)) {
          positionData = { row: "1st", type: "senbatsu" };
        } else if (info.members2nd?.includes(member.nama_jp)) {
          positionData = { row: "2nd", type: "senbatsu" };
        } else if (info.members3rd?.includes(member.nama_jp)) {
          positionData = { row: "3rd", type: "senbatsu" };
        }

        if (positionData) {
          positionData.title = info.singleTitle;
          // Ambil romaji dari singletitle.json
          if (singletitle[num] && singletitle[num].senbatsuTitle) {
            const romaji = Object.values(singletitle[num].senbatsuTitle)[0];
            positionData.romaji = romaji || info.singleTitle;
          } else {
            positionData.romaji = info.singleTitle;
          }
          result[num] = positionData;
        }
      }

	// Proses data under
	for (const num in under) {
	  if (result[num]) continue;
	  const info = under[num];
	  let positionData = null;
	  let totalRows = 0;

	  // Hitung jumlah row under
	  for (let i = 1; i <= 6; i++) {
		const suffix = i === 1 ? "1st" : i === 2 ? "2nd" : i === 3 ? "3rd" : `${i}th`;
		if (info[`under${suffix}`]) totalRows++;
	  }

	  // [PERBAIKAN] Prioritaskan pengecekan posisi center terlebih dahulu
	  // 1. Cek center under (bisa array atau string)
	  if (Array.isArray(info.center) && info.center.includes(member.nama_jp)) {
		positionData = { row: "UWC", type: "under" };
	  } else if (info.center === member.nama_jp) {
		positionData = { row: "UC", type: "under" };
	  }
	  // 2. Cek w-center under
	  else if (Array.isArray(info.UWC) && info.UWC.includes(member.nama_jp)) {
		positionData = { row: "UWC", type: "under" };
	  } 
	  // 3. Baru cek baris under biasa
	  else {
		for (let i = 1; i <= 6; i++) {
		  const suffix = i === 1 ? "1st" : i === 2 ? "2nd" : i === 3 ? "3rd" : `${i}th`;
		  const key = `under${suffix}`;
		  if (info[key]?.includes(member.nama_jp)) {
			positionData = { row: `U${i}`, type: "under" };
			break;
		  }
		}
	  }

	  if (positionData) {
		positionData.title = info.singleTitle;
		positionData.totalRows = totalRows;
		
		// Ambil romaji dari singletitle.json
		if (singletitle[num] && singletitle[num].underTitle) {
		  const romaji = Object.values(singletitle[num].underTitle)[0];
		  positionData.romaji = romaji || info.singleTitle;
		} else {
		  positionData.romaji = info.singleTitle;
		}
		result[num] = positionData;
	  }
	}


      window.memberParticipation = result;
      document.dispatchEvent(new Event("participationLoaded"));
    }).catch(error => {
      console.error("Error loading participation data:", error);
    });
  }
});