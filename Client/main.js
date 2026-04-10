import Socket from "./socket.js";
const s = new Socket("ws://127.0.0.1:8765/");
const sendBtn = document.getElementById("SendBtn");
const textInput = document.getElementById("TextInput");
const chatroomList = document.getElementById("Room-List");
let roomID;
if (chatroomList) {
    let children = Array.from(chatroomList.children)
        .filter((child) => child.id)
        .map((child) => child.id); // Filter array to only contain anchor tag
    console.log(children); //[a#Room 1, hr.border-t-gray-300.my-4, a#Room 2, hr.border-t-gray-300.my-4, a#Room 3]
    document.addEventListener("DOMContentLoaded", () => {
        // Add an event listener for each anchor tag in the children array, when clicked roomID is updated.
        children.forEach((tagID, index) => {
            if (tagID) {
                const tag = document.getElementById(`${tagID}`);
                tag.addEventListener("click", () => {
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