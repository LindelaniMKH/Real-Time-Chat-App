import Socket from "./socket.js";

type messageStr = "join" | "leave" | "message";

interface Message {
  [key: string]: string;
  roomID: string;
  type: messageStr;
  message: string;
  time: string;
}

interface leaveMessage {
  [key: string]: string;
  roomID: string;
  type: messageStr;
  time: string;
}

const s = new Socket("ws://127.0.0.1:8765/");
const sendBtn = document.getElementById("SendBtn") as HTMLButtonElement;
const textInput = document.getElementById("TextInput") as HTMLTextAreaElement;
const chatList = document.getElementById("Chat-List") as HTMLUListElement;
const roomID: string | null = localStorage.getItem("roomID");
const today: string | undefined = new Date().toISOString().split("T")[0];
const time: string | undefined = new Date().toLocaleTimeString();

window.addEventListener("popstate", () => {
  let msgJson: leaveMessage = {
    roomID: `${roomID}`,
    type: "leave",
    time: `${today}, ${time}`,
  };
  s.sendMsg(msgJson);
});

sendBtn.addEventListener("click", () => {
  const textValue: string = textInput.value.trim();
  const li = document.createElement("li") as HTMLLIElement;

  li.className =
    "bg-purple-300 m-2 pl-2 py-1.5 rounded-sm w-35 h-8 wrap-break-word";

  let msgJson: Message = {
    roomID: `${roomID}`,
    type: "message",
    message: `${textValue}`,
    time: `${today}, ${time}`,
  };

  s.sendMsg(msgJson);
  li.textContent = `${textValue}`;
  chatList.appendChild(li);
});

s.onMessage((data) => {
  console.log(data.toString());
});
