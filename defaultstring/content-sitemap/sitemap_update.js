// update di yang paling atas
document.write(`
<br/>
<div class="caption">Selamat Datang di MoeFang Subs!
<br>
 Kami mulai 'mengudara' dari <strong>6 Juli 2020</strong>, yang berarti sudah <span id="countup-days">...</span> hari kami menemani kalian, dan total <span data-count-to="1416" data-duration="10000" class="counter">0</span> takarir dengan lebih dari 80 judul (per 19 Mei 2025).</div>
<div class="whatsnew">
	<div class="titlenew">
    <span class="update-header"></span>
    <span class="update-date">5, 12, 19 Mei 2025</span>
	</div>
    <div class="links-container"></div>
</div>
<script>
fetch('../defaultstring/content-sitemap/sitemap_updatelist.json')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.links-container');
        container.innerHTML = ''; // Kosongkan kontainer

        data.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.url;

            const img = document.createElement('img');
            img.src = link.image;

            anchor.appendChild(img);
            anchor.innerHTML += link.title;
            container.appendChild(anchor);
        });
    })
    .catch(error => console.error('Error loading links:', error));

</script>
<script>
  function calculateDays(startDate) {
    const start = new Date(startDate);
    const today = new Date();
    const timeDifference = today - start;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

  document.getElementById("countup-days").textContent = calculateDays("2020-07-06");
</script>

`);
