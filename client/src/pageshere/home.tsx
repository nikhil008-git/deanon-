"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Shield, Cpu, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Join() {
    const [name, setName] = useState("");
    const [room, setroom] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();

    const handleJoin = async () => {
        if (!name || !room) return;
        setIsLoading(true);
        setTimeout(() => {
            router.push(`/chat?name=${name}&room=${room}`);
        }, 800);
    };

    if (!isMounted) return null;

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-transparent p-4 md:p-12 font-mono overflow-hidden">
            {/* Noise Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Scanline Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-lg"
            >
                {/* Decorative Corner Accents */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-white/40" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-white/40" />

                <div className="bg-neutral-900/80 backdrop-blur-3xl border border-white/5 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    {/* Internal Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                    <div className="mb-12 space-y-4">
                        <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-white/40 uppercase">
                            <Cpu size={14} className="animate-pulse" />
                            <span>System Initialization</span>
                        </div>
                        <h2 className="text-5xl font-light tracking-tighter text-white">
                            DeAnon<span className="opacity-20">_</span>
                        </h2>
                        <div className="h-0.5 w-12 bg-white/20" />
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="group relative"
                            >
                                <label className="block text-[10px] uppercase tracking-widest text-white/30 mb-2 font-bold group-focus-within:text-white/60 transition-colors">
                                    Identity Input
                                </label>
                                <div className="relative">
                                    <Terminal size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="ENTER_UID"
                                        className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-white placeholder:text-white/10 focus:border-white focus:outline-none transition-all uppercase text-sm tracking-widest"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="group relative"
                            >
                                <label className="block text-[10px] uppercase tracking-widest text-white/30 mb-2 font-bold group-focus-within:text-white/60 transition-colors">
                                    Secure Sector
                                </label>
                                <div className="relative">
                                    <Shield size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="SECTOR_KEY"
                                        className="w-full bg-transparent border-b border-white/10 py-3 pl-8 text-white placeholder:text-white/10 focus:border-white focus:outline-none transition-all uppercase text-sm tracking-widest"
                                        value={room}
                                        onChange={(e) => setroom(e.target.value)}
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleJoin}
                            disabled={!name || !room || isLoading}
                            className="flex items-center gap-4 text-white group disabled:opacity-30 transition-all"
                        >
                            <div className="h-px w-8 bg-white/20 group-hover:w-16 transition-all" />
                            <span className="text-sm font-bold tracking-[0.2em] uppercase">
                                {isLoading ? "Synchronizing..." : "Initialize Session"}
                            </span>
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>

                    {/* Data Readout Footer */}
                    <div className="mt-16 flex justify-between items-end">
                        <div className="space-y-1">
                            <div className="text-[8px] text-white/20 flex gap-2">
                                <span>LAT: 40.7128 N</span>
                                <span>LNG: 74.0060 W</span>
                            </div>
                            <div className="text-[10px] text-white/40 tracking-tighter">
                                SECURE_PROTOCOL_v4.2.0
                            </div>
                        </div>
                        <div className="text-[10px] text-white/20 font-bold">
                            © 2026 DEANON_LABS
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

