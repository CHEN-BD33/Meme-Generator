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
    const x = gElCanvas.width / 2
    const y = idx === 0 ? 50 : idx === 1 ? gElCanvas.height - 50 : gElCanvas.height / 2

    gCtx.font = `${size}px Impact`
    gCtx.fillStyle = color
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.strokeText(txt, x, y)
    gCtx.fillText(txt, x, y)

    if (idx === gMeme.selectedLineIdx) {
        const metrics = gCtx.measureText(txt)
        gCtx.strokeStyle = '#ffffff'
        gCtx.setLineDash([5, 5])
        gCtx.strokeRect(
            x - metrics.width / 2 - 10,
            y - size / 2 - 10,
            metrics.width + 20,
            size + 20
        )
    }
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

function onFontSize(diff) {
    setFontSize(diff)
    renderMeme()
}

function onAddLine(txt) {
    addLine(txt)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    updateControlsToSelectedLine()
    renderMeme()
}

function updateControlsToSelectedLine() {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]

    const elTextInput = document.querySelector('.text-input')
    elTextInput.value = selectedLine.txt

    const elColorInput = document.querySelector('.color-input')
    elColorInput.value = selectedLine.color
}