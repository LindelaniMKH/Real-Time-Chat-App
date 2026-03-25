import json
import asyncio
from websockets.asyncio.server import ServerConnection
from websockets.asyncio.server import serve

# NOTE: Server currently doesn't have a way of managing or creating chatrooms

connected_clients: set = set()
rooms: dict[str: set] = {}

def storeMsg() -> None:
    room_messages: dict[list] = {}

# TODO: Sends the correct message to the correct room
def handleMessageType(websocket: ServerConnection, connected_clients: set, message: dict) -> None:
    pass

# TODO: Adds client to the correct chatroom
def handleJoinType(websocket: ServerConnection, connected_clients: set) -> None:
    pass

# TODO: Removes client from the correcnt chatroom
def handleLeaveType(websocket: ServerConnection, connected_clients: set) -> None:
    pass

async def echo(websocket) -> None:
    connected_clients.add(websocket) #Keeps track of all connected clients regardless of chatroom joined
    print(connected_clients)

    try:
        async for message in websocket:
            js = json.loads(message)
            
            match js['type']:
                case 'message':
                    handleMessageType(websocket, connected_clients, js)
                case 'join':
                    pass
                case 'leave':
                    pass
                case _:
                    pass

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
        
