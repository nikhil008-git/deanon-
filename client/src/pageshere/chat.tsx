"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    Send,
    Terminal as TerminalIcon,
    Shield,
    Cpu,
    Activity,
    ArrowLeft,
    Circle,
    Clock,
    User as UserIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<{ from: string; message: string; timestamp: string }[]>([]);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"connecting" | "secure" | "lost">("connecting");
    const searchParams = useSearchParams();
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);

    const name = searchParams.get("name") || "ANONYMOUS";
    const room = searchParams.get("room") || "VOID";

    useEffect(() => {
        const ws = new WebSocket("wss://deanon.onrender.com/");
        setSocket(ws);

        ws.onopen = () => {
            setStatus("secure");
            ws.send(JSON.stringify({
                type: "join",
                payload: { name, room }
            }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prev) => [
                ...prev,
                {
                    from: data.from,
                    message: data.message,
                    timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
                }
            ]);
        };

        ws.onclose = () => setStatus("lost");

        return () => ws.close();
    }, [name, room]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (!socket || message.trim() === "") return;
        socket.send(JSON.stringify({
            type: "chat",
            payload: { message }
        }));
        setMessage("");
    };

    return (
        <main className="relative flex h-screen w-full bg-black font-mono overflow-hidden text-white/80">
            {/* Overlays */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Header / Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-16 border-b border-white/5 bg-black/50 backdrop-blur-md z-20 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/')}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex items-center gap-2">
                        <TerminalIcon size={16} className="text-white/20" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Session: {room}</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${status === 'secure' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span className={`text-[10px] uppercase tracking-widest font-bold ${status === 'secure' ? 'text-emerald-500/80' : 'text-rose-500/80'}`}>
                            {status === 'secure' ? 'Secure Node' : 'Connection Interrupted'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex w-72 flex-col border-r border-white/5 z-10 pt-24 pb-6 px-6 bg-neutral-900/20">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white/20 uppercase text-[10px] tracking-[0.2em] font-bold">
                            <UserIcon size={12} />
                            <span>Identity</span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/5 relative group">
                            <div className="text-white/80 text-sm font-bold truncate tracking-widest">{name}</div>
                            <div className="text-[10px] text-white/20 mt-1 uppercase tracking-tighter">Verified Protocol User</div>
                            <div className="absolute top-0 right-0 w-1 h-1 bg-white/20 m-1" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white/20 uppercase text-[10px] tracking-[0.2em] font-bold">
                            <Activity size={12} />
                            <span>System Status</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px]">
                                <span className="text-white/40">ENCRYPTION</span>
                                <span className="text-emerald-500/60 font-bold">AES-256</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white/20"
                                    initial={{ width: 0 }}
                                    animate={{ width: "85%" }}
                                    transition={{ duration: 2 }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px]">
                                <span className="text-white/40">LATENCY</span>
                                <span className="text-white/60">24 MS</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-white/20 uppercase tracking-widest">
                        <Shield size={10} />
                        <span>DeAnon Secured</span>
                    </div>
                </div>
            </aside>

            {/* Chat Area */}
            <section className="flex-1 flex flex-col z-10 pt-20 relative">
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 md:p-12 space-y-6 scrollbar-hide"
                >
                    <AnimatePresence initial={false}>
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                                <Cpu size={48} className="animate-pulse" />
                                <div className="text-xs uppercase tracking-[0.5em]">Waiting for data synchronization...</div>
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="group"
                                >
                                    <div className="flex items-baseline gap-3 mb-1">
                                        <span className={`text-[10px] font-bold tracking-widest uppercase ${msg.from === name ? 'text-white/60' : 'text-cyan-500/60'}`}>
                                            {msg.from}
                                        </span>
                                        <div className="flex items-center gap-1 text-[8px] text-white/10 uppercase font-bold">
                                            <Clock size={8} />
                                            <span>{msg.timestamp}</span>
                                        </div>
                                    </div>
                                    <div className="relative inline-block border-l-2 border-white/5 pl-4 py-1">
                                        <div className="text-sm tracking-tight leading-relaxed max-w-2xl text-white/70">
                                            {msg.message}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="p-6 md:p-12 pt-0">
                    <div className="relative group max-w-5xl mx-auto">
                        <div className="absolute inset-0 bg-white/5 blur-xl group-focus-within:bg-white/[0.08] transition-all opacity-20" />
                        <div className="relative flex items-center bg-black/80 border border-white/10 group-focus-within:border-white/30 transition-all p-2 rounded-lg">
                            <div className="hidden md:flex items-center px-4 text-white/20">
                                <span className="text-[10px] font-bold tracking-widest">MSG_ENTRY &gt;_</span>
                            </div>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="SEND ENCRYPTED PACKET..."
                                className="flex-1 bg-transparent border-none py-3 px-2 text-white placeholder:text-white/10 focus:outline-none text-sm tracking-wider uppercase"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!message.trim()}
                                className="p-3 bg-white text-black rounded-md hover:bg-neutral-200 transition-colors disabled:opacity-20 disabled:cursor-not-allowed mx-2"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
