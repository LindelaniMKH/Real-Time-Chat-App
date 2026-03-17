export default class Socket {
    constructor(wsURL) {
        this._wsURL = wsURL;
        this._ws = new WebSocket(this._wsURL);
        this._ws.onopen = () => {
            console.log("Connected to server");
        };
        this._ws.onclose = () => {
            console.log("Disconned from server");
        };
        this._ws.onerror = (error) => {
            console.error("Websocket error: ", error);
        };
    }
    isOpen() {
        return this._ws.readyState == WebSocket.OPEN;
    }
    sendMsg(message) {
        if (this._ws.readyState === WebSocket.OPEN) {
            this._ws.send(JSON.stringify(message));
        }
        else {
            console.warn("Websocket is not open");
        }
    }
    onMessage(callback) {
        this._ws.onmessage = (event) => {
            try {
                const parsed = JSON.parse(event.data);
                callback(parsed);
            }
            catch (err) {
                console.error("Failed to parse message: ", err);
            }
        };
    }
}
//# sourceMappingURL=socket.js.map