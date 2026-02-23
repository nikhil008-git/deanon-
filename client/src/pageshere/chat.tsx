"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
export default function Chat() {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const searchParams = useSearchParams()
    const name = searchParams.get("name")
    const room = searchParams.get("room")

    useEffect(() => {

        const ws = new WebSocket("ws://localhost:8081")
        setSocket(ws)
        ws.onopen = () => {
            console.log("user connected")

            //sending the join event
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    name, room
                }
            }))
        }
        ws.onmessage = (message) => {
            console.log(message)
            const data = JSON.parse(message.data)
            // @ts-ignore
            setMessages((prev) => [...prev, `${data.from}: ${data.message}`]);
        }

        return () => ws.close();

    }, [name, room])


    const sendMessage = () => {
        if (!socket || message.trim() === "") return;

        socket.send(
            JSON.stringify({
                type: "chat",
                payload: { message },
            })
        );
        // @ts-ignore
        setMessage("");
    };



    return (
        <div style={{ padding: 40 }}>
            <h2>Room: {room}</h2>

            <div
                style={{
                    border: "1px solid black",
                    height: 300,
                    overflowY: "scroll",
                    padding: 10,
                }}
            >
                {messages.map((msg, i) => (
                    <div key={i}>{msg}</div>
                ))}
            </div>

            <br />

            <input
                type="text"
                value={message}
                placeholder="Type your message"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}