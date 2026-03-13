export default class Socket {
    constructor(wsURL) {
        this._wsURl = wsURL;
        this._ws = new WebSocket(this._wsURl);
    }
    sendMsg(message) {
        this._ws.onopen = () => {
            this._ws.send(JSON.stringify(message));
        };
    }
    responseListener() {
        this._ws.onmessage = (data) => {
            return data;
        };
    }
}
//# sourceMappingURL=socket.js.map