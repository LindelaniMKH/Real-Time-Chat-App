import Socket from "./socket.js";
// Manages chatroom html page. Main.js just sets the room id number based on linked clicked

type messageStr = "join" | "leave" | "message" | "roomUpdate";

interface joinMessage {
  [key: string]: string;
  type: messageStr;
  roomID: string;
}

interface updateMessage {
  [key: string]: string | string[];
  type: messageStr;
  roomIDs: Array<string>;
}

interface leaveMessage {
  [key: string]: string;
  roomID: string;
  type: messageStr;
  time: string;
}

const s = new Socket("ws://127.0.0.1:8765/");
const chatroomSection = document.getElementById("Room-List") as HTMLDivElement;
const today: string | undefined = new Date().toISOString().split("T")[0];

document.addEventListener("DOMContentLoaded", () => {
  if (chatroomSection) {
    const childIDs: Array<string> = Array.from(chatroomSection.children)
      .filter((child: Element) => child.id)
      .map((child: Element) => child.id);

    let msgJson: updateMessage = {
      type: "roomUpdate",
      roomIDs: childIDs,
    };

    s.onOpen(() => {
      s.sendMsg(msgJson);
    });

    // Add an event listener to each room anchor tag. When clicked a join message is sent to the server for the room.
    childIDs.forEach((tagID: string, index: number) => {
      if (tagID) {
        const element = document.getElementById(
          `${tagID}`,
        ) as HTMLAnchorElement;
        element.addEventListener("click", () => {
          let joinMsg: joinMessage = {
            type: "join",
            roomID: `${tagID}`,
          };

          localStorage.setItem("roomID", tagID);

          s.sendMsg(joinMsg);
        });
      }
    });

    window.addEventListener("popstate", () => {
      let msgJson: leaveMessage = {
        roomID: `${childIDs}`,
        type: "leave",
        time: `${today}`,
      };
      s.sendMsg(msgJson);
    });
  }
});
