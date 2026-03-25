import Socket from "./socket.js";
const s = new Socket("ws://127.0.0.1:8765/");
const sendBtn = document.getElementById("SendBtn");
const textInput = document.getElementById("TextInput");
const chatroomList = document.getElementById("Room-List");
const room_one = document.getElementById("Room 1");
let roomID;
if (chatroomList) {
    const children = Array.from(chatroomList.children);
    console.log(children);
    document.addEventListener("DOMContentLoaded", () => {
        children.forEach((tag, index) => {
            if (tag) {
                tag === null || tag === void 0 ? void 0 : tag.addEventListener("click", () => {
                    roomID = tag.id;
                });
            }
        });
    });
}
sendBtn.addEventListener("click", () => {
    const today = new Date().toISOString().split("T")[0];
    const textValue = textInput.value.trim();
    let msgJson = {
        roomID: `${roomID}`,
        type: "message",
        message: `${textValue}`,
        time: `${today}`,
    };
    console.log(msgJson);
    s.sendMsg(msgJson);
    s.onMessage((data) => {
        console.log(data);
    });
});
//# sourceMappingURL=main.js.map