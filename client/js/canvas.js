let canvas = document.querySelector('canvas');
let canvasSize = Math.min(window.innerHeight - 50, window.innerWidth - 50);
canvas.width = canvasSize;
canvas.height = canvasSize;
let ctx = canvas.getContext('2d');

// define game variables
// let blockList = [new Block(getBlockSize() * 2, getBlockSize() * 3, 2, 1, ctx, 1, 'horizontal'), 
//                  new Block(getBlockSize() * (gridSize - 2), 0, 1, 2, ctx, 0, 'vertical'),
//                  new Block(getBlockSize() * 1, 0, 1, 2, ctx, 0, 'vertical'),
//                  new Block(getBlockSize() * 4, getBlockSize() * 3, 1, 1, ctx, 0, 'horizontal'),
//                 ]

let blockList = getMapBlockList(sampleMap, ctx);
let selectedBlockIndex = -1;
let mousePos = {
    x: null,
    y: null,
}

console.log(parseMap(sampleMap));

// event listeners
canvas.onmousemove = e => {
    let coords = getMousePos(canvas, e);
    mousePos.x = coords.x;
    mousePos.y = coords.y;
}

canvas.onmousedown = e => {
    for (let i = 0; i < blockList.length; i ++) {
        if (blockList[i].inBounds(mousePos.x, mousePos.y)) {
            selectedBlockIndex = i;
        }
    }
}

canvas.onmouseup = e => {
    // there is a selected block
    if (selectedBlockIndex != -1) snapBlock(selectedBlockIndex);
    selectedBlockIndex = -1;
}
canvas.onmouseout = e => selectedBlockIndex = -1;

//helper functions
let drawGridLines = () => {
    for (let i = 0; i < gridSize; i ++) {
        for (let j = 0; j < gridSize; j ++) {
            ctx.strokeStyle = 'rgba(105, 105, 105, 1)';
            ctx.lineWidth = 4;
            ctx.strokeRect(i * getBlockSize(), j * getBlockSize(), getBlockSize(), getBlockSize());
        }
    }
}

let snapBlock = (blockIndex) => {
    let blockRef = blockList[blockIndex];
    if (blockRef.orientation == 'horizontal') {
        // blockList[blockIndex].x = roundDown(blockRef.x, getBlockSize());
        let leftX = blockRef.x;
        let rightX = blockRef.x + (blockRef.width * getBlockSize());
        let xMid = blockRef.x + (blockRef.width * getBlockSize() / 2)
        if (Math.abs(xMid - roundDown(leftX, getBlockSize())) <= Math.abs(xMid - roundUp(rightX, getBlockSize()))) {
            blockList[blockIndex].x = roundDown(leftX, getBlockSize());
        } else {
            blockList[blockIndex].x = roundUp(rightX, getBlockSize()) - blockRef.width * getBlockSize();
        }
    } else if (blockRef.orientation == 'vertical') {
        let bottomY = blockRef.y;
        let topY = blockRef.y + (blockRef.height * getBlockSize());
        let yMid = blockRef.y + (blockRef.height * getBlockSize() / 2)
        if (Math.abs(yMid - roundDown(bottomY, getBlockSize())) <= Math.abs(yMid - roundUp(topY, getBlockSize()))) {
            blockList[blockIndex].y = roundDown(bottomY, getBlockSize());
        } else {
            blockList[blockIndex].y = roundUp(topY, getBlockSize()) - blockRef.height * getBlockSize();
        }
    }
}

// main game loop
let animate = () => {
    // clear grid
    ctx.fillStyle = 'rgba(169, 178, 184, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw grid lines
    drawGridLines();

    for (let i = 0; i < blockList.length; i ++) {
        blockList[i].render();
    }

    if (selectedBlockIndex != -1) {
        handleBlockMovement(blockList, selectedBlockIndex);
    }

    requestAnimationFrame(animate);
}

animate();