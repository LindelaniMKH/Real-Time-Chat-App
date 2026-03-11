"use strict";
exports.__esModule = true;
var Socket = /** @class */ (function () {
    function Socket(wsURL) {
        this._wsURl = wsURL;
        this._ws = new WebSocket(this._wsURl);
    }
    Socket.prototype.sendMsg = function (message) {
        var _this = this;
        this._ws.onopen = function () {
            _this._ws.send(JSON.stringify(message));
        };
    };
    Socket.prototype.responseListener = function () {
        this._ws.onmessage = function (data) {
            console.log("Received: ", data.data);
        };
    };
    return Socket;
}());
exports["default"] = Socket;
