import Socket from "./socket.js";
const s = new Socket("ws://localhost:8765/");
const sendBtn = document.getElementById("SendBtn");
const textInput = document.getElementById("TextInput");
sendBtn.addEventListener("click", function () {
    const time = new Date();
    const hours = time.getHours().toString().padStart(2, "0");
    const minute = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    let value = textInput.value;
    let msgJson = {
        roomID: "1",
        type: "message",
        message: value,
        time: `${hours} : ${minute} : ${seconds}`,
    };
    s.sendMsg(msgJson);
    console.log("Button Pressed");
    console.log(s.responseListener());
});
//# sourceMappingURL=main.js.map