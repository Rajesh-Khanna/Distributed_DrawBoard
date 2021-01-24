import signalChannel from './signalChannel.js';

export default class p2pConnection {

    constructor(handleMessage) {
        this.handleMessage = handleMessage;
    }

    async makeCall() {
        const sc = new signalChannel();
        const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }
        const peerConnection = new RTCPeerConnection(configuration);
        this.handleMessage(peerConnection.createDataChannel('channel'));

        sc.onMessage(async message => {
            if (message) {
                const remoteDesc = new RTCSessionDescription(message);
                await peerConnection.setRemoteDescription(remoteDesc);
            }
            if (message.iceCandidate) {
                try {
                    await peerConnection.addIceCandidate(message.iceCandidate);
                } catch (e) {
                    console.error('Error adding received ice candidate', e);
                }
            }
        });
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        peerConnection.addEventListener("icegatheringstatechange", ev => {
            switch (peerConnection.iceGatheringState) {
                case "complete":
                    sc.send(peerConnection.localDescription);
                    break;
            }
        });
    }

    async receiveCall() {
        const sc = new signalChannel(false);
        const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }

        const peerConnection = new RTCPeerConnection(configuration);
        peerConnection.ondatachannel = e => {
            this.handleMessage(e.channel);
        }
        sc.onMessage(async message => {
            if (message) {
                peerConnection.setRemoteDescription(new RTCSessionDescription(message));
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                peerConnection.addEventListener("icegatheringstatechange", ev => {
                    switch (peerConnection.iceGatheringState) {
                        case "complete":
                            sc.send(peerConnection.localDescription);
                            break;
                    }
                });
            }
        });
    }
}