import Socket from "./socket.js";
const s = new Socket("ws://127.0.0.1:8765/");
const chatroomSection = document.getElementById("Room-List");
const today = new Date().toISOString().split("T")[0];
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
        // Add an event listener to each room anchor tag. When clicked a join message is sent to the server for the room.
        childIDs.forEach((tagID, index) => {
            if (tagID) {
                const element = document.getElementById(`${tagID}`);
                element.addEventListener("click", () => {
                    let joinMsg = {
                        type: "join",
                        roomID: `${tagID}`,
                    };
                    localStorage.setItem("roomID", tagID);
                    s.sendMsg(joinMsg);
                });
            }
        });
        window.addEventListener("popstate", () => {
            let msgJson = {
                roomID: `${childIDs}`,
                type: "leave",
                time: `${today}`,
            };
            s.sendMsg(msgJson);
        });
    }
});
//# sourceMappingURL=chatroomManager.js.map