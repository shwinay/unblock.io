let gridSize = 6; // 6 x 6
let getBlockSize = () => document.querySelector('canvas').width / gridSize;

class Block {

    // type: 0 (regular), 1 (red target)
    // width and height in block units
    constructor(x, y, width, height, ctx, type=0, orientation='horizontal') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.type = type;        
        this.selected = false;
        this.orientation = orientation;
    }

    render() {
        ctx.fillStyle = this.type == 0 ? 'rgba(205, 127, 50, 1)' : 'rgba(236, 100, 75, 1)';
        ctx.fillRect(this.x, this.y, getBlockSize() * this.width, getBlockSize() * this.height);
        ctx.lineWidth = 8;
        ctx.strokeStyle = this.type == 0 ? 'rgb(123, 63, 0, 1)' : 'rgba(196, 77, 86, 1)';
        ctx.strokeRect(this.x + this.ctx.lineWidth / 2, this.y + this.ctx.lineWidth / 2, getBlockSize() * this.width - ctx.lineWidth, 
                       getBlockSize() * this.height - ctx.lineWidth);
    }

    inBounds(x, y) {
        return x >= this.x && x <= this.x + getBlockSize() * this.width && y >= this.y && y <= this.y + getBlockSize() * this.height;
    }
}
