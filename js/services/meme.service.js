'use strict'

const STORAGE_KEY = "savedmemeDB"
var gSavedMemes = loadFromStorage(STORAGE_KEY) || []
var gMeme = {}
// var gMeme = {
//     selectedImgId: 1,
//     selectedLineIdx: 0,
//     lines: [
//         {
//             txt: 'Enter your text here...',
//             size: 30,
//             font: 'impact',
//             color: '#FFFFFF',
//             align: 'center',
//             x: 250,
//             y: 100,
//             width: 0,
//             height: 0,
//             isDragged: false
//         }
//     ]
// }
// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setLineTxt(txt) {
    getSelectedLine().txt = txt
}

function addLine(txt = 'Enter your text here...', size = 30, color = '#FFFFFF') {
    const y = gMeme.lines.length === 0 ? 50 :
        gMeme.lines.length === 1 ? gElCanvas.height - 50 :
            gElCanvas.height / 2

    const line = _createMemeLine(txt, size, color)
    line.y = y
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
}

function moveLine(direction) {
    const line = getSelectedLine()
    line.y += (direction === 'up' ? -10 : 10)
}

function deleteLine() {
    if (!gMeme.lines.length) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineIdx, 1)
}

function setFontSize(diff) {
    const line = getSelectedLine()

    if (diff === '+') line.size += 2
    else if (diff === '-') line.size = Math.max(10, line.size - 2)
}

function setFont(font) {
    getSelectedLine().font = font
}

function setAlignText(align) {
    getSelectedLine().align = align
}

function setLineColor(color) {
    getSelectedLine().color = color
}

function saveMeme() {
    const memeData = {
        imgData: gElCanvas.toDataURL(),
        gMeme: {
            selectedImgId: gMeme.selectedImgId,
            selectedLineIdx: gMeme.selectedLineIdx,
            lines: gMeme.lines
        }
    }
    gSavedMemes.push(memeData)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function getSavedMemes() {
    return loadFromStorage(STORAGE_KEY) || []
}

function deleteSavedMemes() {
    const savedMemes = getSavedMemes()
    savedMemes.length = 0
    saveToStorage(STORAGE_KEY, savedMemes)
}

function getRandomMeme() {
    const images = getImgs()
    const texts = ['BOOM!', 'WOW', 'SO Funny', 'I like It']

    setImg(images[getRandomInt(0, images.length - 1)].id)
    setLineTxt(texts[getRandomInt(0, texts.length - 1)])
}

function isLineClicked(clickedPos) {
    const lineIdx = gMeme.lines.findIndex(line => {
        let xPos = line.x
        if (line.align === 'left') xPos = 50
        if (line.align === 'right') xPos = gElCanvas.width - 50
        
        const distance = Math.sqrt(
            (xPos - clickedPos.x) ** 2 +
            (line.y - clickedPos.y) ** 2
        )
        const textMetrics = gCtx.measureText(line.txt)
        return distance <= textMetrics.width / 2
    })
    if (lineIdx !== -1) {
        gMeme.selectedLineIdx = lineIdx
        return true
    }
    return false
 }

function setLineDrag(isDrag) {
    const line = getSelectedLine()
    if (!line) return
    line.isDragged = isDrag
}

function moveLineByDrag(dx, dy) {
    const line = getSelectedLine()
    if (!line) return
    line.x += dx
    line.y += dy
}

function _createMeme() {
    return gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [_createMemeLine()]
    }
}

function _createMemeLine(txt = 'Enter your text here...', size = 30, color = '#FFFFFF', align = 'center') {
    return {
        txt,
        size,
        font: 'impact',
        color,
        align: 'center',
        x: 250,
        y: 100,
        width: 0,
        height: 0,
        isDragged: false
    }
}