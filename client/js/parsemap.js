// 0: empty, *: target, everything else: unique object
let sampleMap = [
                ['1', '0', '0', '7', '0', '0'],
                ['1', '0', '0', '7', '0', '0'],
                ['*', '*', '0', '6', '0', '8'],
                ['2', '2', '2', '6', '0', '8'],
                ['0', '3', '5', '5', '0', '8'],
                ['0', '3', '4', '4', '0', '0'],
                ];

// returns a list of pieces (each piece a list is a list of coordinates)
let parseMap = (map) => {
    let retrievePiece = (map, i, j, pieceChar, piece) => {
        if (i < 0 || j < 0 || i >= map.length || j >= map[0].length || map[i][j] == '0') return;
        if (map[i][j] == pieceChar) {
            piece.push([i, j]);
            map[i][j] = '0';
            retrievePiece(map, i + 1, j, pieceChar, piece);
            retrievePiece(map, i - 1, j, pieceChar, piece);
            retrievePiece(map, i, j + 1, pieceChar, piece);
            retrievePiece(map, i, j - 1, pieceChar, piece);
        }
    }

    let res = [];
    for (let i = 0; i < map.length; i ++) {
        for (let j = 0; j < map[i].length; j ++) {
            if (map[i][j] != '0') {
                let currChar = map[i][j];
                let piece = [];
                retrievePiece(map, i, j, map[i][j], piece);

                // target
                if (currChar == '*') {
                    piece = ['*', piece];
                }
                res.push(piece);
            }
        }
    }
    return res;
}

// returns new block given parsed piece
let getBlockFromCoords = (coords, ctx) => {
    let target = false;
    if (coords[0] == '*') {
        coords = coords[1];
        target = true;
    }    let x = getBlockSize() * coords[0][1];
    let y = getBlockSize() * coords[0][0];
    console.log(coords);
    // default singleton
    // if (coords.length == 1) return new Block(x, y, 1, 1, ctx);
    
    // determine orientation
    let orientation = 'horizontal';
    if (coords[0][0] < coords[1][0]) orientation = 'vertical';
    
    if (orientation == 'horizontal') {
        return new Block(x, y, Math.abs(coords[coords.length - 1][1] - coords[0][1]) + 1, 1, ctx, target ? 1 : 0, 'horizontal');
    }
    else if (orientation == 'vertical') {
        return new Block(x, y, 1, Math.abs(coords[coords.length - 1][0] - coords[0][0]) + 1, ctx, target ? 1 : 0, 'vertical');
    }
    
}

// given a map, get corresponding block list
let getMapBlockList = (map, ctx) => {
    let pieceCoords = parseMap(map);
    let res = [];
    for (let i = 0; i < pieceCoords.length; i ++) {
        res.push(getBlockFromCoords(pieceCoords[i], ctx))
    }
    console.log(res);
    return res;
}
