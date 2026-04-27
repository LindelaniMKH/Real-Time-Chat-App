import Socket from "./socket.js";
const s = new Socket("ws://127.0.0.1:8765/");
const sendBtn = document.getElementById("SendBtn");
const textInput = document.getElementById("TextInput");
const chatList = document.getElementById("Chat-List");
const roomID = localStorage.getItem("roomID");
const today = new Date().toISOString().split("T")[0];
window.addEventListener("popstate", () => {
    let msgJson = {
        roomID: `${roomID}`,
        type: "leave",
        time: `${today}`,
    };
    s.sendMsg(msgJson);
});
sendBtn.addEventListener("click", () => {
    const textValue = textInput.value.trim();
    const li = document.createElement("li");
    li.className =
        "bg-purple-300 m-2 pl-2 py-1.5 rounded-sm w-35 h-8 wrap-break-word";
    let msgJson = {
        roomID: `${roomID}`,
        type: "message",
        message: `${textValue}`,
        time: `${today}`,
    };
    s.sendMsg(msgJson);
    li.textContent = `${textValue}`;
    chatList.appendChild(li);
});
s.onMessage((data) => {
    console.log(data.toString());
});
//# sourceMappingURL=main.js.map