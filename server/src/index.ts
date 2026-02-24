// @ts-ignore
import { WebSocketServer, WebSocket } from "ws";



const wss = new WebSocketServer({ port: 8081 });

interface User {
    socket: WebSocket;
    room: string;
    name: string;

}

let allSockets: User[] = []

wss.on("connection", function (socket) {
    console.log("user connected ")
    // here message is gonna come as string.
    socket.on("message", function (message) {
        const strmessage = message.toString()
        const parsedMessage = JSON.parse(strmessage)
        if (parsedMessage.type === "join") {
            // here what we did is we recieved the specific socket & room & name.
            allSockets.push({
                socket,
                room: parsedMessage.payload.room,
                name: parsedMessage.payload.name,

            })
        }

        if (parsedMessage.type === "chat") {
            const currentUserRoom = allSockets.find(user => user.socket === socket)?.room // what is the room of this user we got.

            //here checks if the currentuser's room matches to any another socket's room accordingly we'll only send it to the specific room only.
            for (let i = 0; i < allSockets.length; i++) {
                // @ts-ignore 
                if (allSockets[i].room == currentUserRoom) {
                    const sender = allSockets.find((sender) => sender.socket === socket)
                    //@ts-ignore
                    allSockets[i].socket.send(
                        JSON.stringify({
                            // @ts-ignore
                            from: sender.name,
                            // @ts-ignore
                            message: parsedMessage.payload.message.toString()
                        })
                    )
                }

            }

        }
    })
})