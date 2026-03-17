type StringDict = Record<string, string>;

export default class Socket {
  private _wsURL: string;

  private _ws: WebSocket;

  constructor(wsURL: string) {
    this._wsURL = wsURL;
    this._ws = new WebSocket(this._wsURL);

    this._ws.onopen = () => {
      console.log("Connected to server");
    };

    this._ws.onclose = () => {
      console.log("Disconned from server");
    };

    this._ws.onerror = (error) => {
      console.error("Websocket error: ", error);
    };
  }

  isOpen(): boolean {
    return this._ws.readyState == WebSocket.OPEN;
  }

  sendMsg(message: StringDict): void {
    if (this._ws.readyState === WebSocket.OPEN) {
      this._ws.send(JSON.stringify(message));
    } else {
      console.warn("Websocket is not open");
    }
  }

  onMessage(callback: (data: StringDict) => void): void {
    this._ws.onmessage = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);
        callback(parsed);
      } catch (err) {
        console.error("Failed to parse message: ", err);
      }
    };
  }
}
