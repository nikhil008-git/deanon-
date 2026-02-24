import Chat from "@/pageshere/chat"
import { Suspense } from "react"

export default function ChatPage() {
    return (
        <Suspense fallback={<div>Loading Protocol...</div>}>
            <Chat />
        </Suspense>
    )
}
