'use strict'


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: '#FFFFFF'
        },
        // {
        //     txt: 'Enter your text here',
        //     size: 40,
        //     color: 'white'
        // }
    ]
}
// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

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

if(diff=== '+') line.size +=2
else if (diff === '-') line.size = Math.max(10, line.size - 2)
}

function addLine(txt='Enter your text here..', size = 20, color = '#FFFFFF') {
    // setLineTxt(txt)
    gMeme.lines.push({txt, size, color})
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine(){
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
}