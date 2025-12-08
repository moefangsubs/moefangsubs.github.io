// --------------------------------------
// Menampilkan daftar member jika tidak ada parameter ?id
// --------------------------------------

(() => {
	const params = new URLSearchParams(location.search);
	const memberId = params.get("id");
	if (memberId) return;

	fetch("../store/member/members.json")
		.then(res => res.json())
		.then(data => {
			const container = document.getElementById("main");
			container.innerHTML = "";

			// Fungsi untuk menampilkan label generasi yang benar
			const getGenLabel = (gen) => {
				if (gen === "留学") return "Kennin";
				if (gen === "研究生") return "Kenkyuusei";
				return `Generasi ${gen.replace("期", "")}`;
			};

			const aktifPerGen = {
				"3期": 0,
				"4期": 0,
				"5期": 0,
				"6期": 0
			};
			const graduatedPerGen = {};
			const groupedAktif = {};
			const groupedGraduated = {};

			data.forEach(member => {
				const gen = member.gen;
				const status = member.status;

				if (status === "lulus") {
					// Inisialisasi jika belum ada
					if (!graduatedPerGen[gen]) graduatedPerGen[gen] = 0;
					graduatedPerGen[gen]++;

					if (!groupedGraduated[gen]) groupedGraduated[gen] = [];
					groupedGraduated[gen].push(member);
				} else {
					if (["3期", "4期", "5期", "6期"].includes(gen)) {
						aktifPerGen[gen]++;
						if (!groupedAktif[gen]) groupedAktif[gen] = [];
						groupedAktif[gen].push(member);
					}
				}
			});

			const totalAktif = Object.values(aktifPerGen).reduce((a, b) => a + b, 0);
			const totalGraduated = Object.values(graduatedPerGen).reduce((a, b) => a + b, 0);

			// ⬇️ Buat tabel ringkasan jumlah member
			const summary = `
			<p class="summary-title">Nogizaka46 saat ini memiliki <strong>${totalAktif}</strong> member aktif, dan <strong>${totalGraduated}</strong> member yang sudah lulus. Untuk lengkapnya silakan lihat tabel ini.</p>
			<table class="summary-table" cellpadding="5" cellspacing="0" border="1">
				<thead>
					<tr>
						<th>Gen-3</th>
						<th>Gen-4</th>
						<th>Gen-5</th>
						<th>Gen-6</th>
						<th>Member aktif</th>
						<th>Graduated</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td data-label="gen-3"><span>${aktifPerGen["3期"]}</span></td>
						<td data-label="gen-4"><span>${aktifPerGen["4期"]}</span></td>
						<td data-label="gen-5"><span>${aktifPerGen["5期"]}</span></td>
						<td data-label="gen-6"><span>${aktifPerGen["6期"]}</span></td>
						<td data-label="member aktif"><span>${totalAktif}</span></td>
						<td data-label="graduated"><span>${totalGraduated}</span></td>
					</tr>
				</tbody>
			</table>
			`;
			container.insertAdjacentHTML("beforeend", summary);

			// ⬇️ CSS warna border per generasi aktif
			const borderColors = {
				"3期": "dodgerblue",
				"4期": "orange",
				"5期": "#d966ff",
				"6期": "turquoise"
			};

			// Fungsi konversi HEX/Nama Warna → RGBA dengan opasitas
			const getRgbaColor = (color, opacity = 1) => {
				const tempElement = document.createElement('div');
				tempElement.style.color = color;
				document.body.appendChild(tempElement);

				const rgb = getComputedStyle(tempElement).color;
				document.body.removeChild(tempElement);

				return rgb.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
			};

			// ⬇️ Tampilkan tiap generasi aktif
			Object.keys(groupedAktif).sort().forEach(gen => {
				const section = document.createElement("div");
				section.className = "gen-section";
				section.innerHTML = `<h3 class="gen-title">${getGenLabel(gen)}</h3>`;

				const grid = document.createElement("div");
				grid.className = "member-grid";

				groupedAktif[gen].forEach(member => {
					const bgColor = getRgbaColor(borderColors[gen]); // Konversi ke RGBA
					grid.innerHTML += `
						<div class="member-data active" style="
						border-color: ${borderColors[gen]};
						background-color: ${bgColor};
						">
						<a href="member.html?id=${member.id}">
						  <img src="${member.foto_profil}" alt="${member.nama_romaji}">
						  <div class="member-name">${member.nama_romaji}</div>
						</a>
						</div>
						`;
				});

				section.appendChild(grid);
				container.appendChild(section);
			});

			// ⬇️ Tampilkan member lulus per generasi
			const gradTitle = `<h3 class="grad-header">GRADUATED MEMBERS</h3>`;
			container.insertAdjacentHTML("beforeend", gradTitle);

			// Urutkan generasi: 1期, 2期, ... kemudian Kennin/Kenkyuusei
			const orderedGens = Object.keys(groupedGraduated).sort((a, b) => {
				const order = ["1期", "2期", "3期", "4期", "5期", "6期", "留学", "研究生"];
				return order.indexOf(a) - order.indexOf(b);
			});

			orderedGens.forEach(gen => {
				const section = document.createElement("div");
				section.className = "gen-section";
				section.innerHTML = `<h3 class="gen-title">${getGenLabel(gen)}</h3>`;

				const grid = document.createElement("div");
				grid.className = "member-grid";
				groupedGraduated[gen].forEach(member => {
					grid.innerHTML += `
						<div class="member-data graduated">
							<a href="member.html?id=${member.id}">
								<img src="${member.foto_profil}" alt="${member.nama_romaji}">
								<div class="member-name">${member.nama_romaji}</div>
							</a>
						</div>
					`;
				});

				section.appendChild(grid);
				container.appendChild(section);
			});
		});
})();