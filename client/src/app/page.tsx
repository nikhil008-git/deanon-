import Join from "@/pageshere/home";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row bg-neutral-950 font-mono overflow-hidden text-white/80">
      {/* Left Section: Branding & Technical Narrative */}
      <div className="relative flex h-[50vh] md:h-screen w-full md:w-1/2 items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5 bg-black">
        {/* Background Visuals */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 scale-110 blur-[2px]"
          style={{ backgroundImage: "url('/meshdark.png')" }}
        />

        {/* Overlays: Grid, Noise, Scanlines */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black" />

        {/* Technical Status Readouts (Left Side) */}
        <div className="absolute top-12 left-12 z-20 hidden md:block space-y-6">
          <div className="space-y-1">
            <div className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Core Protocol</div>
            <div className="text-xs text-white/60">ESTABLISHED_v4.2</div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Signal Strength</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-3 w-1 ${i < 5 ? 'bg-white/40' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Branding Content */}
        <div className="relative z-20 px-8 text-center md:text-left md:pl-24 w-full">
          <div className="relative inline-block mb-6">
            <h1 className="text-7xl md:text-9xl font-light tracking-tighter text-white select-none">
              DeAnon<span className="opacity-20 translate-x-1 inline-block animate-pulse">_</span>
            </h1>
            {/* Glitch Shadow Effect */}
            <h1 className="absolute inset-0 text-7xl md:text-9xl font-light tracking-tighter text-cyan-500/20 -translate-x-1 -z-10 mix-blend-screen overflow-hidden">DeAnon</h1>
            <h1 className="absolute inset-0 text-7xl md:text-9xl font-light tracking-tighter text-rose-500/20 translate-x-1 -z-10 mix-blend-screen overflow-hidden">DeAnon</h1>
          </div>

          <div className="max-w-md space-y-6">
            <p className="text-sm md:text-base text-white/40 font-medium leading-relaxed uppercase tracking-widest leading-loose">
              Distributed identity protocol for secure interpersonal synchronization.
            </p>
            <div className="flex items-center gap-4 py-4">
              <div className="h-px flex-1 bg-white/10" />
              <div className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-bold">Encrypted Connection</div>
            </div>
          </div>
        </div>

        {/* Animated Grid Dots */}
        <div className="absolute bottom-12 left-12 z-20 flex gap-4 opacity-20">
          <div className="flex flex-col gap-1">
            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
          </div>
          <div className="text-[8px] text-white uppercase tracking-widest self-end">Data Flow Active</div>
        </div>
      </div>

      {/* Right Section: Interactive Terminal Overlay */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-black relative">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent opacity-50" />

        {/* Geometric Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-white/5 m-12 hidden md:block" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-white/5 m-12 hidden md:block" />

        <div className="relative z-10 w-full max-w-2xl px-4 py-12 md:p-0">
          <Join />
        </div>
      </div>
    </main>
  );
}