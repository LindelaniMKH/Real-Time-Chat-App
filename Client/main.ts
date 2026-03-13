import Socket from "./socket.js";

interface Message {
  [key: string]: string;
  roomID: string;
  type: string;
  message: string;
  time: string;
}

const s = new Socket("ws://localhost:8765/");
const sendBtn = document.getElementById("SendBtn") as HTMLButtonElement;
const textInput = document.getElementById("TextInput") as HTMLTextAreaElement;

sendBtn.addEventListener("click", function () {
  const time = new Date();
  const hours: string = time.getHours().toString().padStart(2, "0");
  const minute: string = time.getMinutes().toString().padStart(2, "0");
  const seconds: string = time.getSeconds().toString().padStart(2, "0");

  let value: string = textInput.value;

  let msgJson: Message = {
    roomID: "1",
    type: "message",
    message: value,
    time: `${hours} : ${minute} : ${seconds}`,
  };

  s.sendMsg(msgJson);
  console.log("Button Pressed");
  console.log(s.responseListener());
});
