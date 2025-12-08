document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch('../store/member/song_penlight.json');
    const songData = await response.json();
    document.querySelectorAll(".song-list").forEach(container => {
        const group = container.getAttribute("data-song-for");
        const data = songData[group];
        if (!data) return;
        const { className, items } = data;
        items.forEach(song => {
            const item = document.createElement("div");
            item.className = className;
            if (song.color1 && song.color2) {
                const circle1 = document.createElement("i");
                circle1.className = `fa-solid fa-circle ${song.color1}`;
                const circle2 = document.createElement("i");
                circle2.className = `fa-solid fa-circle ${song.color2}`;
                item.appendChild(circle1);
                item.appendChild(circle2);
            }
            else if (song.iconClass) {
                const circle1 = document.createElement("i");
                circle1.className = `fa-solid fa-circle ${song.iconClass}`;
                const circle2 = document.createElement("i");
                circle2.className = `fa-solid fa-circle ${song.iconClass}`;
                item.appendChild(circle1);
                item.appendChild(circle2);
            }
            if (song.special) {
                const specialDiv = document.createElement("div");
                specialDiv.className = "songhntrb";
                specialDiv.textContent = song.title;
                item.appendChild(specialDiv);
            } else {
                item.appendChild(document.createTextNode(` ${song.title}`));
            }
            container.appendChild(item);
        });
    });
  } catch (error) {
      console.error("Failed to load song data:", error);
  }
});