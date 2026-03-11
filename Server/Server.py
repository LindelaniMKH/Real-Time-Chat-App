import asyncio
from websockets.asyncio.server import serve

def storeMsg() -> None:
    room_messages: dict[list] = {}

async def echo(websocket) -> None:
    async for message in websocket:
        await websocket.send(message)
        print(message)

async def main() -> None:
    async with serve(echo, "localhost", 8765) as server:
        await server.serve_forever()

if __name__ == "__main__":
    asyncio.run(main())
