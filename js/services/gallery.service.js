'use strict'

var gFilterBy = ''
var gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['funny', 'akward'] },
    { id: 2, url: 'images/2.jpg', keywords: ['animal'] },
    { id: 3, url: 'images/3.jpg', keywords: ['animal', 'happy'] },
    { id: 4, url: 'images/4.jpg', keywords: ['animal'] },
    { id: 5, url: 'images/5.jpg', keywords: ['funny'] },
    { id: 6, url: 'images/6.jpg', keywords: ['akward'] },
    { id: 7, url: 'images/7.jpg', keywords: ['funny'] },
    { id: 8, url: 'images/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'images/9.jpg', keywords: ['funny', 'happy'] },
    { id: 10, url: 'images/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'images/11.jpg', keywords: ['bad', 'akward'] },
    { id: 12, url: 'images/12.jpg', keywords: ['akward', 'bad'] },
    { id: 13, url: 'images/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'images/14.jpg', keywords: ['bad', 'sad'] },
    { id: 15, url: 'images/15.jpg', keywords: ['akward'] },
    { id: 16, url: 'images/16.jpg', keywords: ['sad'] },
    { id: 17, url: 'images/17.jpg', keywords: ['bad'] },
    { id: 18, url: 'images/18.jpg', keywords: ['happy'] },

]

function getImgs() {
    if (!gFilterBy) return gImgs
    return gImgs.filter(img => img.keywords.some(keywords => keywords.toLowerCase().includes(gFilterBy.toLowerCase())))
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getUniqueKeywords() {
    const keywords = new Set()
    
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => keywords.add(keyword))
    })
    return Array.from(keywords)
}

function clearFilter() {
    gFilterBy = ''
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        let img = new Image() 
        img.src = event.target.result 
        img.onload = () => onImageReady(img.src)
    }
    reader.readAsDataURL(ev.target.files[0]) 
}

