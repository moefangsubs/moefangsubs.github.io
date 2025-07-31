document.addEventListener('DOMContentLoaded', function() {

    const cssStyles = `
		.warning-footer {
			/* position: fixed; */
			bottom: 0;
			left: 0;
			width: 100%;
			/* background: var(--moe-tint4); */
			background: linear-gradient(0deg,rgba(162, 43, 255, 1) 0%, rgba(162, 43, 255, 1) 80%, rgba(179, 82, 255, 1) 80%, rgba(179, 82, 255, 1) 93%, rgba(196, 121, 255, 1) 93%, rgba(196, 121, 255, 1) 100%);
			color: #212529;
			padding: 55pt 30pt;
			margin-top: 100pt;
			font-size: 9pt;
			font-family: sans-serif;
			font-weight: normal !important;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			/* z-index: 1000; */
			box-sizing: border-box;
			text-align: center;
			color: white;
		}

        .warning-footer span {
            line-height: 1.5;
        }
		
		.about {
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding-bottom: 10pt;
			align-items: center;
		}
		.foot-label {
			width: 50%;
			padding: 15pt;
		}
		.link {
			display: flex;
			width: 100%;
			align-items: center;
			flex-direction: row;
			/* border: 1pt solid red; */
			justify-content: space-evenly;
		}

		.link-form {
			font-size: 1.1em;
			display: flex;
			gap: 10pt;
			/* border: 1pt solid white; */
			width: 50%;
			justify-content: flex-start;
			align-items: center;
			text-align: left;
		}
		.link-form a {
			width: 100%;
		}
		a.f1 {
			border-right-width: 1pt;
			border-color: var(--moe);
			border-right-style: solid;
			background-color: transparent;
			width: max-content;
			padding-right: 10pt;
			white-space: nowrap;
		}
		
		a.f1:hover {
			background-color: var(--moe-tint2);
		}
		
		.link-sns {
			display: flex;
			gap: 15pt;
			/* border: 1pt solid white; */
			width: 50%;
			justify-content: flex-end;
		}
		.link-sns a img {
			width: 20pt;
		}
		.link-sns a img:hover {
			transform: scale(1.3);
		}
		@media (max-width: 992px) { 
			.foot-label {
				width: 80%;
			}
		}
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = cssStyles;

    document.head.appendChild(styleElement);

    const footerHTML = `
        <div class="warning-footer">
			<div class="about">
				<img class="foot-label" src="../sprite/main.svg"/>
				<span>Data Update : 21 Juli 2025 22:00 WIB</span>
				<span>Data bisa saja ada kesalahan input.</span>
				<span>Jika menemukannya dan/atau ingin ada masukan, mohon hubungi admin via DM Instagram</span>
			</div>
			<div class="link">
				<div class="link-form">
					<a href="../request.html" class="f1">Request Sub</a>
					<a href="../moesubs/garapan.html" class="f2">Daftar Garapan</a>
				</div>
				<div class="link-sns">
					<a href="http://instagram.com/moefang_" target="_blank"><img src="../sprite/element/insta.svg" /></a>
					<a href="http://twitter.com/FangMoe" target="_blank"><img src="../sprite/element/twitter.svg" /></a>
					<a href="http://discordapp.com/users/981149278300962816" target="_blank"><img src="../sprite/element/discord.svg" /></a>
				</div>
			</div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);

});