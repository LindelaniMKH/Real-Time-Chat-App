import Socket from "./socket.js";

interface Message {
  [key: string]: string;
  roomID: string;
  type: string;
  message: string;
  time: string;
}

const s = new Socket("ws://127.0.0.1:8765/");
const sendBtn = document.getElementById("SendBtn") as HTMLButtonElement;
const textInput = document.getElementById("TextInput") as HTMLTextAreaElement;

sendBtn.addEventListener("click", () => {
  const time = new Date();

  const textValue = textInput.value.trim();

  let msgJson: Message = {
    roomID: "1",
    type: "message",
    message: `${textValue}`,
    time: "",
  };

  console.log(msgJson);
  s.sendMsg(msgJson);
  s.onMessage((data) => {
    console.log(data);
  });
});
