"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation'


export default function Join() {
    const [name, setName] = useState("")
    const [room, setroom] = useState("")

    const router = useRouter()

    const handleJoin = () => {
        if (!name || !room) return;

        //passig here name & room via query param or state.
        //@ts-ignore
        router.push(`/chat?name=${name}&room=${room}`)
    }


    return (
        <>
            <input
                type="text"
                placeholder="enter your name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />
            <input
                type="text"
                placeholder="enter your room"
                value={room}
                onChange={(e) => {
                    setroom(e.target.value)
                }}
            />
            <button onClick={handleJoin}>Enter the room</button>
        </>
    )
}