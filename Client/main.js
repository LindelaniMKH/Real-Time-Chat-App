"use strict";
exports.__esModule = true;
var socket_1 = require("./socket");
var s = new socket_1["default"]("ws://localhost:8765/");
var sendBtn = document.getElementById("SendBtn");
var textInput = document.getElementById("TextInput");
sendBtn.addEventListener("click", function () {
    var time = new Date();
    var hours = time.getHours().toString().padStart(2, "0");
    var minute = time.getMinutes().toString().padStart(2, "0");
    var seconds = time.getSeconds().toString().padStart(2, "0");
    var value = textInput.value;
    var msgJson = {
        roomID: "1",
        type: "message",
        message: value,
        time: "".concat(hours, " : ").concat(minute, " : ").concat(seconds)
    };
    s.sendMsg(msgJson);
});
