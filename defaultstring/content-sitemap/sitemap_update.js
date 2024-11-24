// update di yang paling atas
document.write(`
<br/>
<div class="caption"><span data-count-to="1299" data-duration="10000" class="counter">0</span> takarir dengan lebih dari 80 judul telah dibuat (13 November 2024)</div>
<div class="whatsnew">
	<div class="titlenew">
    <span class="update-header"></span>
    <span class="update-date">24 November 2024</span>
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
`);
