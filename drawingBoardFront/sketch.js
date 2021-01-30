let currShape = new activeShape();
let othersShapes = [];

window.addEventListener('load', () => {
    document.querySelector('#font-thickness-default').addEventListener('click', () => currShape.setFont(1));
    document.querySelector('#font-thickness-1').addEventListener('click', () => currShape.setFont(5));
    document.querySelector('#font-thickness-2').addEventListener('click', () => currShape.setFont(10));
})

function setup() {
    let cnv = createCanvas(1000, 600);
    cnv.parent('drawBoard');
    noFill();
    background(225);
}

function draw() {
    if (mouseIsPressed === true) {
        currShape.setStart(mouseX,mouseY);
        currShape.setEnd(pmouseX,pmouseY);
        const copyObj = new Shape();
        copyObj.copy(currShape.clone());
        pushShape(currShape);
        currShape.drawShape();
    }
    othersShapes.forEach(element => {
        element.drawShape();
    });    
}

window.addEventListener('load', () => {
    document.querySelector('#eraser').addEventListener('click', () => currShape.setColor('eraser'));
    document.querySelector('#pen').addEventListener('click', () => currShape.setColor('black'));

    document.querySelector('#font-thickness-default').addEventListener('click', () => currShape.setFont(1));
    document.querySelector('#font-thickness-1').addEventListener('click', () => currShape.setFont(5));
    document.querySelector('#font-thickness-2').addEventListener('click', () => currShape.setFont(10));
})