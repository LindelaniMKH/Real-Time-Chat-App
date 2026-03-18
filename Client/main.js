import Socket from "./socket.js";
console.log("Test");
const s = new Socket("ws://127.0.0.1:8765/");
const sendBtn = document.getElementById("SendBtn");
const textInput = document.getElementById("TextInput");
sendBtn.addEventListener("click", () => {
    const time = new Date();
    const textValue = textInput.value;
    let msgJson = {
        roomID: "1",
        type: "message",
        message: `${textValue}`,
        time: "",
    };
    console.log(msgJson);
    s.sendMsg(msgJson);
    s.onMessage((data) => {
        console.log(data);
    });
});
//# sourceMappingURL=main.js.map