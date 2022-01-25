let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

let ctx = canvas.getContext('2d');

let rectX = 30;
let rectY = 30;
let rectSize = 100;
let mouseX = undefined;
let mouseY = undefined;

let isSelected = false;

canvas.onmousedown = e => {
    if (mouseX >= rectX && mouseX <= rectX + rectSize && mouseY >= rectY && mouseY <= rectY + rectSize) isSelected = true;
}
canvas.onmouseup = e => isSelected = false;
canvas.onmousemove = e => {
    console.log('moving!');
    mouseX = e.x;
    mouseY = e.y;
};

let animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    if (isSelected) {
        ctx.fillStyle = 'red';
        rectX = mouseX - rectSize / 2;
        rectY = mouseY - rectSize / 2;
    }
    ctx.fillRect(rectX, rectY, rectSize, rectSize);
    requestAnimationFrame(animate);
}

animate();