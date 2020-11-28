let currShape = new activeShape();
let drawing = false;
const allShapes = [];

function setup() {
    let cnv = createCanvas(800, 600);
    cnv.parent('drawBoard');
    noFill();
}

function draw() {
    background(225);
    allShapes.forEach(element => {
        element.drawShape();
    });
    if (drawing) {
        currShape.setEnd(mouseX, mouseY);
        if (currShape.type === 'text') {

        }
        currShape.drawShape();
    }
}

function mousePressed() {
    if (!drawing) {
        currShape.setStart(mouseX, mouseY);
        drawing = true;
    }
}

function mouseReleased() {
    if (drawing && currShape.props.type !== 'text') {
        currShape.setEnd(mouseX, mouseY);
        const copyObj = new Shape();
        copyObj.copy(currShape.clone());
        allShapes.push(copyObj);
        console.log(allShapes);
        drawing = false;
    }
}


window.addEventListener('load', () => {
    document.querySelector('#shapeSelector-circle').addEventListener('click', () => currShape.setType('circle'));
    document.querySelector('#shapeSelector-rectangle').addEventListener('click', () => currShape.setType('rectangle'));
    document.querySelector('#shapeSelector-line').addEventListener('click', () => currShape.setType('line'));
    document.querySelector('#shapeSelector-text').addEventListener('click', () => {
        currShape.setType('text');
        document.querySelector('#textInputField').focus();
    });

    document.querySelector('#textInputField').addEventListener('input', () => {
        currShape.setText(document.querySelector('#textInputField').value);
    });
})