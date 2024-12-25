'use strict'


function renderGallery() {
    const images = getImgs()
    const strHtmls = images.map(img => 
        `<img src="${img.url}"
       onclick="onSelectImg(this)"
       data-img-id="${img.id}"
       alt="meme template ${img.id}"
       class="gallery-img"
    >`).join('')

    document.querySelector('.gallery-container').innerHTML = strHtmls
}

function onSearchMeme(filterBy) {
    setFilter(filterBy)
    renderGallery()
}

function renderKeywordsList() {
    const keywords = getUniqueKeywords()
    const strHtmls = keywords.map(keyword => `<option value="${keyword}">
        `).join('')

    document.querySelector('#keywords-list').innerHTML = strHtmls
}

function onClearFilter(){
    document.querySelector('.search-img').value = ''
    clearFilter()
    renderGallery()
}

function onImgInput(ev) {
    loadImageFromInput(ev, addImgToGallery)
}

function addImgToGallery(imgSrc) {
    const newImgId = gImgs.length + 1
    gImgs.push({
        id: newImgId,
        url: imgSrc,
        keywords: ['uploaded']
    })
    
    renderGallery()
}
