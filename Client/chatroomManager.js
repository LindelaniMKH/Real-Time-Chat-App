import Socket from "./socket.js";
const s = new Socket("ws://127.0.0.1:8765/");
const chatroomSection = document.getElementById("Room-List");
document.addEventListener("DOMContentLoaded", () => {
    if (chatroomSection) {
        const childIDs = Array.from(chatroomSection.children)
            .filter((child) => child.id)
            .map((child) => child.id);
        let msgJson = {
            type: "roomUpdate",
            roomIDs: childIDs,
        };
        s.onOpen(() => {
            s.sendMsg(msgJson);
        });
    }
});
//# sourceMappingURL=chatroomManager.js.map