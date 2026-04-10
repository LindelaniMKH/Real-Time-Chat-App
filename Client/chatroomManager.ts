import Socket from "./socket.js";
// Manages chatroom html page. Main.js just sets the room id number based on linked clicked

type messageStr = "join" | "leave" | "message";

interface Message {
  type: messageStr;
  roomID: number;
}

const chatroomSection = document.getElementById("Room-List") as HTMLDivElement;

if (chatroomSection) {
  const childIDs: Array<string> = Array.from(chatroomSection.children)
    .filter((child: Element) => child.id)
    .map((child: Element) => child.id);

  console.log(childIDs);
}
