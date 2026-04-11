import Socket from "./socket.js";
// Manages chatroom html page. Main.js just sets the room id number based on linked clicked

type messageStr = "join" | "leave" | "message" | "roomUpdate";

interface Message {
  [key: string]: string | string[];
  type: messageStr;
  roomIDs: Array<string>;
}

const s = new Socket("ws://127.0.0.1:8765/");
const chatroomSection = document.getElementById("Room-List") as HTMLDivElement;

document.addEventListener("DOMContentLoaded", () => {
  if (chatroomSection) {
    const childIDs: Array<string> = Array.from(chatroomSection.children)
      .filter((child: Element) => child.id)
      .map((child: Element) => child.id);

    let msgJson: Message = {
      type: "roomUpdate",
      roomIDs: childIDs,
    };

    s.onOpen(() => {
      s.sendMsg(msgJson);
    });
  }
});
