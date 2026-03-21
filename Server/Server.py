import json
import asyncio
from websockets.server import WebSocketServerProtocol
from websockets.asyncio.server import serve

connected_clients: set[WebSocketServerProtocol] = set()
rooms: dict[str: set(WebSocketServerProtocol)]

def storeMsg() -> None:
    room_messages: dict[list] = {}

async def echo(websocket) -> None:
    connected_clients.add(websocket)
    print(connected_clients)

    try:
        async for message in websocket:
            print(message)

            for client in connected_clients:
                if client != websocket:
                    await client.send(json.dumps(message))
    except Exception as e:
        print("Connection error: ", e)
    finally:
        connected_clients.remove(websocket)

async def main() -> None:
    async with serve(echo, "127.0.0.1", 8765) as server:
        await asyncio.Future()
        
if __name__ == "__main__":
    try:
        print("Server started")
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Shutting down server...")
        
