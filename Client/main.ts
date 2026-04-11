import Socket from "./socket.js";

type messageStr = "join" | "leave" | "message";

interface Message {
  [key: string]: string;
  roomID: string;
  type: messageStr;
  message: string;
  time: string;
}

const s = new Socket("ws://127.0.0.1:8765/");
const sendBtn = document.getElementById("SendBtn") as HTMLButtonElement;
const textInput = document.getElementById("TextInput") as HTMLTextAreaElement;
const chatroomList = document.getElementById("Room-List") as HTMLDivElement;

let roomID: string;

if (chatroomList) {
  let children: Array<string> = Array.from(chatroomList.children)
    .filter((child: Element) => child.id)
    .map((child: Element) => child.id); // Filter array to only contain anchor tag

  console.log(children); //[a#Room 1, hr.border-t-gray-300.my-4, a#Room 2, hr.border-t-gray-300.my-4, a#Room 3]

  document.addEventListener("DOMContentLoaded", () => {
    // Add an event listener for each anchor tag in the children array, when clicked roomID is updated.
    children.forEach((tagID: string, index: number) => {
      if (tagID) {
        const tag = document.getElementById(`${tagID}`) as HTMLAnchorElement;
        tag.addEventListener("click", () => {
          roomID = tag.id; //It's still undefinded
        });
      }
    });
  });
}

sendBtn.addEventListener("click", () => {
  const today: string | undefined = new Date().toISOString().split("T")[0];

  const textValue: string = textInput.value.trim();

  let msgJson: Message = {
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
