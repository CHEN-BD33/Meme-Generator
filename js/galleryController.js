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

function renderKeywordsList() {
    const keywords = getUniqueKeywords()
    const strHtmls = keywords.map(keyword => `<option value="${keyword}">
        `).join('')

    document.querySelector('#keywords-list').innerHTML = strHtmls
}

function OnSearchMeme(filterBy) {
    setFilter(filterBy)
    renderGallery()
}

function onClearFilter(){
    document.querySelector('.search-img').value = ''
    clearFilter()
    renderGallery()
}