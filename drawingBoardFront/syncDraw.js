// const updateUserCall = async() => {
//     const path = 'usersOnBoard';
//     if ('workSpaceId' in userInfo) {
//         const response = await getApiCall(path, { workSpaceId: userInfo.workSpaceId });
//         const participants = document.querySelector('#usersOnBoard');
//         if (participants) {
//             participants.innerHTML = '';
//             response.forEach(element => {
//                 const li = document.createElement('li');
//                 li.innerText = `${element.drawUserName}${element.isAdmin? '-(Admin)':''}-${element.isActive? '-(Active)':''}`;
//                 participants.appendChild(li);;
//             });
//             usersInWorkSpace = response.length;
//             updatingUsers = false;
//         }
//     }
// }

/* --------------- p2p ----------------- */
import p2pConnection from './modelJS/p2p.js';

class sketchSync {
    constructor(sketchChannel, messageChannel) {
        this.sketchChannel = sketchChannel;
        this.messageChannel = messageChannel;
    }

    dataChannelListner = (channelEvent) => {
        console.log('dataChannelListner');
        if (channelEvent.channel.label === 'messageChannel') {
            console.log({ channelEvent });
            this.messageChannel.setChannel(channelEvent.channel);
        }
        if (channelEvent.channel.label === 'sketchChannel') {
            console.log({ channelEvent });
            this.sketchChannel.setChannel(channelEvent.channel);
        }
    }

    startHOST = () => {
        console.log('starting host');
        document.querySelector('#choice').style.display = 'none';
        document.querySelector('#HOSTPanel').style.display = 'block';
        const p2p = new p2pConnection(this.dataChannelListner);
        p2p.makeCall();
        this.sketchChannel.setChannel(p2p.createDataChannel('sketchChannel'));
        this.messageChannel.setChannel(p2p.createDataChannel('messageChannel'));
    };

    startGUEST = () => {
        console.log('starting guest');
        document.querySelector('#choice').style.display = 'none';
        document.querySelector('#GUESTPanel').style.display = 'block';
        const p2p = new p2pConnection(this.dataChannelListner);
        p2p.receiveCall();
    };

}
var global = window || global;

global.sketchSync = sketchSync;