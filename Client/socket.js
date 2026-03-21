"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Socket = /** @class */ (function () {
    function Socket(wsURL) {
        this._wsURL = wsURL;
        this._ws = new WebSocket(this._wsURL);
        this._ws.onopen = function () {
            console.log("Connected to server");
        };
        this._ws.onclose = function () {
            console.log("Disconned from server");
        };
        this._ws.onerror = function (error) {
            console.error("Websocket error: ", error);
        };
    }
    Socket.prototype.isOpen = function () {
        return this._ws.readyState == WebSocket.OPEN;
    };
    Socket.prototype.sendMsg = function (message) {
        if (this._ws.readyState === WebSocket.OPEN) {
            this._ws.send(JSON.stringify(message));
        }
        else {
            console.warn("Websocket is not open");
        }
    };
    Socket.prototype.onMessage = function (callback) {
        this._ws.onmessage = function (event) {
            try {
                var parsed = JSON.parse(event.data);
                callback(parsed);
            }
            catch (err) {
                console.error("Failed to parse message: ", err);
            }
        };
    };
    return Socket;
}());
exports.default = Socket;
