import Socket from "./socket.js";

type messageStr = "join" | "leave" | "message";

interface Message {
  type: messageStr;
  roomID: number;
}
