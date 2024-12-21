'use strict'

let gElCanvas
let gCtx

function onInit() {
    renderGallery()

    gElCanvas = document.querySelector('.editor-canvas')
    gCtx = gElCanvas.getContext('2d')

    window.addEventListener('resize', () => {
        resizeCanvas()
        coverCanvasWithImg(document.querySelector('img'))
    })

    renderMeme()
}

function renderMeme() {

    const meme = getMeme()
    const img = new Image()
    img.src = `images/${meme.selectedImgId}.jpg`

    img.onload = () => {
        coverCanvasWithImg(img)

        meme.lines.forEach((line, idx) => {
            drawText(line, idx)
        })
    }
}

function onSelectImg(elImg) {
    const imgId = elImg.dataset.imgId
   setImg(imgId)
    renderMeme()
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 2
}

function drawText(line, idx) {
    const { txt, size, color } = line
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = 'center'

    const x = gElCanvas.width / 2
    const y = idx === 0 ? 50 : gElCanvas.height - 50

    gCtx.strokeText(txt, x, y)
    gCtx.fillText(txt, x, y)
}

function onTextInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

function downloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'Meme'
}

function onColorChange(color) {
    setLineColor(color)
    renderMeme()
}

function onFontSize(diff){
    setFontSize(diff)
    renderMeme()
}