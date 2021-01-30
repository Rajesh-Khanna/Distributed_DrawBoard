let currShape = new activeShape();
let othersShapes = [];

window.addEventListener('load', () => {
    document.querySelector('#font-thickness-default').addEventListener('click', () => currShape.setFont(1));
    document.querySelector('#font-thickness-1').addEventListener('click', () => currShape.setFont(5));
    document.querySelector('#font-thickness-2').addEventListener('click', () => currShape.setFont(10));
})

class sketchChannelHandler {
    channel = null;
    channelOpen = false;
    setChannel(channel) {
        this.channel = channel;
        channel.onopen = (msg => {
            this.channelOpen = true;
            console.log('open channel');
            document.querySelector('#HOSTPanel').style.display = 'none';
            document.querySelector('#GUESTPanel').style.display = 'none';
            document.querySelector('#distDrawBoard').style.display = 'block';
        })
        channel.onmessage = (message => {
            const shapeObj = new Shape();
            shapeObj.copy(JSON.parse(message.data));
            othersShapes.push(shapeObj);
        })
    }

    sendMessage = (message) => {
        console.log('send');
        if (message && this.channelOpen) {
            this.channel.send(message);
        };
    }

    pushShape = async(copyObj) => {
        const props = copyObj.clone();
        this.sendMessage(JSON.stringify(props));
    }
}

class messageChannelHandler {
    channel = null;
    channelOpen = false;

    sendMessage(channel) {
        const message = document.querySelector('#messageText').value;
        document.querySelector('#messageText').value = '';
        if (message) {
            channel.send(message);
            const borad = document.querySelector('#messages');
            const p = document.createElement('p');
            p.setAttribute('class', 'myMessage');
            p.innerText = `you: ${message}`;
            borad.appendChild(p);
        };
    }

    setChannel(channel) {
        this.channel = channel;
        const sendMessage = this.sendMessage;
        channel.onopen = (msg => {
            this.channelOpen = true;
            document.querySelector('#HOSTPanel').style.display = 'none';
            document.querySelector('#GUESTPanel').style.display = 'none';
            document.querySelector('#messageBoard').style.display = 'block';
            document.querySelector('#sendMessage').addEventListener('click', () => { this.sendMessage(channel) });
            document.querySelector('#messageText').addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                    sendMessage(channel);
                }
            });

        })
        channel.onmessage = (message => {
            const borad = document.querySelector('#messages');
            const p = document.createElement('p');
            p.setAttribute('class', 'singleMessage');
            p.innerText = `other: ${message.data}`;
            borad.appendChild(p);
        })

    }

}

let sketchChannel;
let messageChannel;

const initialSetup = (syncBoard) => {
    console.log('initialSetup');
    document.querySelector('#HOSTPanel').style.display = 'none';
    document.querySelector('#GUESTPanel').style.display = 'none';
    document.querySelector('#distDrawBoard').style.display = 'none';
    document.querySelector('#startHOST').addEventListener('click', syncBoard.startHOST);
    document.querySelector('#startGUEST').addEventListener('click', syncBoard.startGUEST);

    document.querySelector('#eraser').addEventListener('click', () => currShape.setColor('eraser'));

    document.querySelector('#font-thickness-default').addEventListener('click', () => currShape.setFont(1));
    document.querySelector('#font-thickness-1').addEventListener('click', () => currShape.setFont(5));
    document.querySelector('#font-thickness-2').addEventListener('click', () => currShape.setFont(10));
}

function setup() {
    console.log('setup');
    let cnv = createCanvas(1000, 600);
    cnv.parent('drawBoard');
    noFill();
    background(225);
    sketchChannel = new sketchChannelHandler();
    messageChannel = new messageChannelHandler();
    const syncBoard = new window.sketchSync(sketchChannel, messageChannel);
    initialSetup(syncBoard);
}

function draw() {
    if (mouseIsPressed === true) {
        currShape.setStart(mouseX, mouseY);
        currShape.setEnd(pmouseX, pmouseY);
        const copyObj = new Shape();
        copyObj.copy(currShape.clone());
        sketchChannel.pushShape(currShape);
        currShape.drawShape();
    }
    othersShapes.forEach(element => {
        element.drawShape();
    });
    othersShapes = [];
}