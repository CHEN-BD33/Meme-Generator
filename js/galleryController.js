'use strict'


function renderGallery() {
    const images = getImgs()
    const strHtmls = images.map(img => `
    <img
       src="${img.url}"
       onclick="onSelectImg(this)"
       data-img-id="${img.id}"
       alt="meme template ${img.id}"
       class="gallery-img"
    >
    `).join('')

    document.querySelector('.gallery-container').innerHTML = strHtmls
}

