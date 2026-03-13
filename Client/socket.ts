type StringDict = Record<string, string>;

export default class Socket {
  private _wsURl: string;

  private _ws;

  constructor(wsURL: string) {
    this._wsURl = wsURL;
    this._ws = new WebSocket(this._wsURl);
  }

  sendMsg(message: StringDict) {
    this._ws.onopen = () => {
      this._ws.send(JSON.stringify(message));
    };
  }

  responseListener() {
    this._ws.onmessage = (data) => {
      return data;
    };
  }
}
