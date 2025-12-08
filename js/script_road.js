document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('isometric-grid-container');
    const vectorCol = { x: 150.05, y: 87.41 }; 
    const vectorRow = { x: -150.05, y: 87.41 };
    const assetMap = { 
	'r0tlbr': 'road1.png',
	'build0': 'build0.png',
	};
    const layout = [
        ['r0tlbr', 'r0tlbr', 'r0tlbr', 'r0tlbr', 'r0tlbr'],
        ['r0tlbr', 'r0tlbr', 'build0', 'r0tlbr', 'r0tlbr'],
        ['r0tlbr', 'r0tlbr', 'r0tlbr', 'r0tlbr', 'r0tlbr'],
        ['r0tlbr', 'r0tlbr', 'r0tlbr', 'r0tlbr', 'r0tlbr'],
    ];
    const specialTiles = ['c3'];
    const numRows = layout.length;
    const numCols = layout[0] ? layout[0].length : 0;
    const gridOriginX = (numRows - 1) * vectorRow.x;
    const gridOriginY = 0;  
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const posX = (j * vectorCol.x) + (i * vectorRow.x) - gridOriginX;
            const posY = (j * vectorCol.y) + (i * vectorRow.y) - gridOriginY;
            const zIndex = (i * numCols) + j + 1;
            const rowChar = String.fromCharCode('a'.charCodeAt(0) + i);
            const tileID = `${rowChar}${j + 1}`;
            const tileContainer = document.createElement('div');
            tileContainer.className = 'grid-tile';
            tileContainer.style.left = `${posX}px`;
            tileContainer.style.top = `${posY}px`;
            tileContainer.style.zIndex = zIndex;
            if (specialTiles.includes(tileID)) {
                tileContainer.classList.add('hover-effect');
            }
            const imgElement = document.createElement('img');
            imgElement.src = `../assets/${assetMap[layout[i][j]] || 'road1.svg'}`;
            const labelElement = document.createElement('span');
            labelElement.className = 'tile-label';
            labelElement.textContent = tileID;
            tileContainer.appendChild(imgElement);
            tileContainer.appendChild(labelElement);
            gridContainer.appendChild(tileContainer);
        }
    }
    const panzoomInstance = panzoom(gridContainer, {
        maxZoom: 2,
        minZoom: 0.2,
        filterKey: () => true, 
    });
    function fitGridToScreen() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const gridRect = gridContainer.getBoundingClientRect();
        const scaleX = viewportWidth / gridRect.width;
        const scaleY = viewportHeight / gridRect.height;
        const scale = Math.min(scaleX, scaleY) * 0.95;  
        const x = (viewportWidth - gridRect.width * scale) / 2;
        const y = (viewportHeight - gridRect.height * scale) / 2;
        panzoomInstance.moveTo(x, y);
        panzoomInstance.zoomAbs(x, y, scale);
    }
    fitGridToScreen();
    window.addEventListener('resize', fitGridToScreen);
});