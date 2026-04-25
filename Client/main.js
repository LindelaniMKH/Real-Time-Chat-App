import Socket from "./socket.js";
const s = new Socket("ws://127.0.0.1:8765/");
const sendBtn = document.getElementById("SendBtn");
const textInput = document.getElementById("TextInput");
const chatList = document.getElementById("Chat-List");
const roomID = localStorage.getItem("roomID");
sendBtn.addEventListener("click", () => {
    const today = new Date().toISOString().split("T")[0];
    const textValue = textInput.value.trim();
    let msgJson = {
        roomID: `${roomID}`,
        type: "message",
        message: `${textValue}`,
        time: `${today}`,
    };
    s.sendMsg(msgJson);
});
s.onMessage((data) => {
    const messageDiv = document.createElement("div");
    const messageTag = document.createElement("p");
    console.log(data.data);
});
//# sourceMappingURL=main.js.map