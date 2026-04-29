import json
import asyncio
from websockets.asyncio.server import ServerConnection
from websockets.asyncio.server import serve

# NOTE: Server currently doesn't have a way of managing or creating chatrooms
# IDEA: Have a rooms dict that has the room's server id has a key and stores the room's client id as the value. Everytime a new room is created a server id is generated and the client id is assigned.

connected_clients: set = set()
rooms: dict[str, set] = {} #Used to keep track of each connection in each chatroom. 
chatRooms: list = []

def storeMsg() -> None:
    room_messages: dict[list] = {}

# TODO: Create a function that creates chat rooms and sends a response to the client to create the room on the client's side
def createRooms():
    pass

def updateRooms(message: dict) -> None:
    roomsList: list = message['roomIDs']

    global chatRooms
    chatRooms = roomsList[:]

    for chatRoom in chatRooms:
        rooms[chatRoom] = set()
    
    print(rooms)

# NOTE: Sends the correct message to the correct room
async def handleMessageType(websocket: ServerConnection, connected_clients: set, message: dict) -> None:
    print(message)
    room = message['roomID']

    try:
        if room in chatRooms: # First check if room exists
            roomClients = rooms[room] # Returns a set of each client server connection

            for client in roomClients:
                if client != websocket: # Send to other clients in the same room except the sender
                    text = message['message']
                    await client.send(json.dumps(text))
    except Exception:
        print("Connection between client and server is lost or closed")

# NOTE: Adds client to the correct chatroom. Client must first join. 
def handleJoinType(websocket: ServerConnection, connected_clients: set, message: dict) -> None:
    roomSet = rooms[message['roomID']]
    roomSet.add(websocket)

# NOTE: Removes client from the correct chatroom
def handleLeaveType(websocket: ServerConnection, connected_clients: set) -> None:
    for k, v in rooms.items():
        if websocket in v:
            v.discard(websocket)

async def echo(websocket: ServerConnection) -> None:
    connected_clients.add(websocket) # Keeps track of all connected clients regardless of chatroom joined

    try:
        async for message in websocket:
            js: dict = json.loads(message)
            type: str = js['type']
            
            match type:
                case 'message':
                    await handleMessageType(websocket, connected_clients, js)
                case 'join':
                    handleJoinType(websocket, connected_clients, js)
                case 'leave':
                    handleLeaveType(websocket, connected_clients)
                case 'roomUpdate':
                    updateRooms(js)
                case _:
                    print("Unknown message type")
    except Exception:
        print("Connection error: connection closed")
    finally:
        connected_clients.remove(websocket)

        for k, v in rooms.items():
            if websocket in v:
                v.discard(websocket)

async def main() -> None:
    async with serve(echo, "127.0.0.1", 8765) as server:
        await asyncio.Future()
        
if __name__ == "__main__":
    try:
        print("Server started")
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Shutting down server...")
        
