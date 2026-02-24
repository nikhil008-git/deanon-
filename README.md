# 🕵️ DeAnon — Anonymous Real-Time Chat

A minimal, anonymous real-time chat app. Users join a room with an alias — no accounts, no logs, no identity.

Built with **Next.js** (client) + **Node.js WebSocket server** (ws), deployed on Render.

---

## Architecture

```
rooky/
├── client/       → Next.js 16 frontend (Vercel / any static host)
└── server/       → Node.js WebSocket server (Render)
```

- Client connects to the server via **WebSocket** (`wss://deanon.onrender.com/`)
- Server routes messages **only within the same room**
- No database, no auth, no persistence — fully ephemeral

---

## Prerequisites

| Tool | Min Version | Notes |
|------|------------|-------|
| Node.js | `v18+` | LTS recommended |
| npm | `v9+` | comes with Node |
| TypeScript | `v5+` | installed via devDeps |

---

## Local Development

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd rooky
```

---

### 2. Server setup

```bash
cd server
npm install
npm run dev       # compiles TypeScript → runs on ws://localhost:8081
```

**What `npm run dev` does:** runs `tsc` to compile, then starts `node dist/index.js`

>  The server listens on port **8081**. Make sure it's free.

**Server deps:**

| Package | Purpose |
|---------|---------|
| `ws` | WebSocket server |
| `typescript` *(dev)* | TypeScript compiler |
| `@types/node` *(dev)* | Node.js type definitions |
| `@types/ws` *(dev)* | Type definitions for `ws` |

---

### 3. Client setup

```bash
cd client
npm install
npm run dev       # starts Next.js at http://localhost:3000
```

**Client deps (key ones):**

| Package | Purpose |
|---------|---------|
| `next` | React framework (SSR + routing) |
| `react`, `react-dom` | UI |
| `motion` | Animations (Framer Motion) |
| `lucide-react` | Icons |
| `@react-three/fiber` + `drei` | 3D background |
| `@shadergradient/react` | Shader gradient visuals |
| `tailwindcss` | Styling |

---

### 4. Point client to local server

In `client/src/pageshere/chat.tsx`, change:

```ts
// Production:
const ws = new WebSocket("wss://deanon.onrender.com/");

// Local dev:
const ws = new WebSocket("ws://localhost:8081");
```

---

## Deployment

### Server → Render

1. Push `server/` to GitHub (or the whole monorepo)
2. Create a new **Web Service** on [Render](https://render.com)
3. Set the following in Render dashboard:

| Setting | Value |
|---------|-------|
| **Root Directory** | `server` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Environment** | Node |

> **Important:** Render must run `npm install` (not `--production`) during build so that `typescript` and `@types/*` (devDependencies) are available for `tsc`. Do not set `NODE_ENV=production` before the build step.

After deploy, your WebSocket URL will be:
```
wss://<your-service-name>.onrender.com/
```

Update `chat.tsx` with this URL.

---

### Client → Vercel (recommended)

```bash
cd client
npx vercel
```

Or connect the GitHub repo to [Vercel](https://vercel.com) with:

| Setting | Value |
|---------|-------|
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` |

---

## How It Works

1. User enters a **name** and **room code** on the home page
2. Client opens a WebSocket connection and sends a `join` message:
   ```json
   { "type": "join", "payload": { "name": "ANON", "room": "room-42" } }
   ```
3. When sending a message, client sends:
   ```json
   { "type": "chat", "payload": { "message": "hello" } }
   ```
4. Server broadcasts the message **only to users in the same room**
5. On disconnect, the WebSocket closes — no cleanup needed (ephemeral)

---

## Environment Variables

No `.env` files required. The WebSocket URL is hardcoded in `chat.tsx`.

If you want to make it configurable, add to `client/.env.local`:

```env
NEXT_PUBLIC_WS_URL=wss://deanon.onrender.com/
```

And update `chat.tsx`:
```ts
const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);
```

---

## Common Issues

| Error | Cause | Fix |
|-------|-------|-----|
| `TS2688: Cannot find type definition file for 'node'` | `@types/node` not installed during build | Ensure build command is `npm install && npm run build`, not `--production` |
| WebSocket connection refused | Server not running | Start server with `npm run dev` or check Render logs |
| `tsc` fails in CI | `typescript` in devDeps skipped | Move to `dependencies` or fix build command |
