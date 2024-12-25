'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter your text here...',
            size: 30,
            font: 'impact',
            color: '#FFFFFF',
            align: 'center',
            x: 200,
            y: 50,
            width: 0,
            height: 0
        },
        // {
        //     txt: 'Enter your text here',
        //     size: 40,
        //     color: 'white'
        // }
    ]
}
// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

const STORAGE_KEY = "savedmemeDB"
var gSavedMemes = loadFromStorage(STORAGE_KEY) || []

function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setFontSize(diff) {
    const line = gMeme.lines[gMeme.selectedLineIdx]

    if (diff === '+') line.size += 2
    else if (diff === '-') line.size = Math.max(10, line.size - 2)
}

function addLine(txt = 'Enter your text here...', size = 30, color = '#FFFFFF') {
    const y = gMeme.lines.length === 0 ? 50 :
        gMeme.lines.length === 1 ? gElCanvas.height - 50 :
            gElCanvas.height / 2

    gMeme.lines.push({
        txt,
        size,
        font: 'impact',
        color,
        align: 'center',
        x: gElCanvas.width / 2,
        y,
        width: 0,
        height: 0
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
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

function deleteLine() {
    if (!gMeme.lines.length) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineIdx, 1)
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setAlignText(align){
    gMeme.lines[gMeme.selectedLineIdx].align = align
}


// function getSelectedLine() {
//     return gMeme.lines[gMeme.selectedLineIdx]
// }

// function getImgUrlById(id) {
//     return gImgs.find(img => id === img.id).url
// }