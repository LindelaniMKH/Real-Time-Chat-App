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
const room_one = document.getElementById("Room 1") as HTMLAnchorElement;

let roomID: String;

if (chatroomList) {
  const children = Array.from(chatroomList.children); // Filter array to only contain anchor tag
  console.log(children); // [a#Room 1, hr.border-t-gray-300.my-4, a#Room 2, hr.border-t-gray-300.my-4, a#Room 3]

  document.addEventListener("DOMContentLoaded", () => {
    children.forEach((tag, index) => {
      if (tag) {
        tag?.addEventListener("click", () => {
          roomID = tag.id;
        });
      }
    });
  });
}

sendBtn.addEventListener("click", () => {
  const today = new Date().toISOString().split("T")[0];

  const textValue = textInput.value.trim();

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
