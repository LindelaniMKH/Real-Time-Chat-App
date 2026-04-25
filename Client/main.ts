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
const chatList = document.getElementById("Chat-List") as HTMLDivElement;
const roomID: string | null = localStorage.getItem("roomID");

sendBtn.addEventListener("click", () => {
  const today: string | undefined = new Date().toISOString().split("T")[0];
  const textValue: string = textInput.value.trim();

  let msgJson: Message = {
    roomID: `${roomID}`,
    type: "message",
    message: `${textValue}`,
    time: `${today}`,
  };

  s.sendMsg(msgJson);
});

s.onMessage((data) => {
  const messageDiv = document.createElement("div") as HTMLDivElement;
  const messageTag = document.createElement("p") as HTMLParagraphElement;

  console.log(data.data);
});
