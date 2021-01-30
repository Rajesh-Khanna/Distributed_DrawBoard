import p2pConnection from './modelJS/p2p.js';

const sendMessage = (channel) => {
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

const handleMessage = (channel) => {
    channel.onopen = (msg => {
        document.querySelector('#HOSTPanel').style.display = 'none';
        document.querySelector('#GUESTPanel').style.display = 'none';
        document.querySelector('#messageBoard').style.display = 'block';
    })
    channel.onmessage = (message => {
        const borad = document.querySelector('#messages');
        const p = document.createElement('p');
        p.setAttribute('class', 'singleMessage');
        p.innerText = `other: ${message.data}`;
        borad.appendChild(p);
    })
    document.querySelector('#sendMessage').addEventListener('click', () => { sendMessage(channel) });
    document.querySelector('#messageText').addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            sendMessage(channel);
        }
    });
}


const dataChannelListner = (channelEvent) => {
    if (channel in channelEvent)
        handleMessage(channelEvent.channel);
    if (sketchChannel in channelEvent)
        handleMessage(channelEvent.sketchChannel);
}

const startHOST = () => {
    console.log('starting host');
    document.querySelector('#choice').style.display = 'none';
    document.querySelector('#HOSTPanel').style.display = 'block';
    const p2p = new p2pConnection(dataChannelListner);
    p2p.makeCall();
    channelCount += 1;
};

const startGUEST = () => {
    console.log('starting guest');
    document.querySelector('#choice').style.display = 'none';
    document.querySelector('#GUESTPanel').style.display = 'block';
    const p2p = new p2pConnection(dataChannelListner);
    p2p.receiveCall();
};

(() => {
    document.querySelector('#HOSTPanel').style.display = 'none';
    document.querySelector('#GUESTPanel').style.display = 'none';
    document.querySelector('#messageBoard').style.display = 'none';
    document.querySelector('#startHOST').addEventListener('click', startHOST);
    document.querySelector('#startGUEST').addEventListener('click', startGUEST);
})();