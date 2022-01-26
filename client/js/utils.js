let getMousePos = (canvas, evt) => {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

let roundDown = (n, multiple) => {
    let currMultiple = 0;
    while (currMultiple < n) currMultiple += multiple;
    return currMultiple == n ? n :
           currMultiple > n ? Math.max(currMultiple - multiple, 0) : 
           0;
}

let roundUp = (n, multiple) => {
    let currMultiple = 0;
    while (currMultiple < n) currMultiple += multiple;
    return currMultiple;
}

let handleBlockMovement = (blockList, selectedBlockIndex) => {
    let blockRef = blockList[selectedBlockIndex];
    let blockWidth = blockRef.width * getBlockSize(); // true block width
    let blockHeight = blockRef.height * getBlockSize();

    if (blockList[selectedBlockIndex].orientation == 'horizontal') {
        // set initial block position
        let blockPos = mousePos.x - (blockWidth / 2);
        if (blockPos < 0) blockPos = 0;
        if (blockPos + blockWidth >= canvas.width) blockPos = canvas.width - blockWidth;

        let blockRight = blockPos + blockWidth;
        let blockLeft = blockPos;

        for (let i = 0; i < blockList.length; i ++) {
            if (i == selectedBlockIndex) continue;
            let otherBlock = blockList[i]; 
            let otherBlockWidth = otherBlock.width * getBlockSize();
            let otherBlockHeight = otherBlock.height * getBlockSize();
            let otherBlockLeft = otherBlock.x;
            let otherBlockRight = otherBlock.x + otherBlockWidth;

            // y axis align
            let blockYMid = blockRef.y + blockHeight / 2;
            if (blockYMid >= otherBlock.y && blockYMid <= otherBlock.y + otherBlockHeight) {
                //check left collision
                if (blockLeft < otherBlockRight && blockRef.x + blockWidth > otherBlockRight) {
                    blockPos = otherBlockRight;
                }
                // check right collision
                else if (blockRight > otherBlockLeft && blockRef.x < otherBlockLeft) {
                    blockPos = otherBlockLeft - blockWidth;
                }
            }
            
        }

        blockList[selectedBlockIndex].x = blockPos;
                                       
    }
    else if (blockList[selectedBlockIndex].orientation == 'vertical') {
        // set initial block position
        let blockPos = mousePos.y - blockHeight / 2;
        if (blockPos < 0) blockPos = 0;
        if (blockPos + blockHeight >= canvas.height) blockPos = canvas.height - blockHeight;

        let blockTop = blockPos + blockHeight;
        let blockBottom = blockPos;

        for (let i = 0; i < blockList.length; i ++) {
            if (i == selectedBlockIndex) continue;
            let otherBlock = blockList[i]; 
            let otherBlockWidth = otherBlock.width * getBlockSize();
            let otherBlockHeight = otherBlock.height * getBlockSize();
            let otherBlockBottom = otherBlock.y;
            let otherBlockTop = otherBlock.y + otherBlockHeight;

            // y axis align
            let blockXMid = blockRef.x + (blockWidth / 2);
            if (blockXMid >= otherBlock.x && blockXMid <= otherBlock.x + otherBlockWidth) {
                //check bottom collision
                if (blockBottom < otherBlockTop && blockRef.y + blockHeight > otherBlockTop) {
                    blockPos = otherBlockTop;
                }
                // check top collision
                else if (blockTop > otherBlockBottom && blockRef.y < otherBlockBottom) {
                    blockPos = otherBlockBottom - blockHeight;
                }
            }
            
        }

        blockList[selectedBlockIndex].y = blockPos;
    }
}
