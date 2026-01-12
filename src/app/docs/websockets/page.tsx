import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Radio, ChevronRight, ArrowRight, Users, Send, MessageSquare, Zap } from "lucide-react";

const setupWebSocketExample = `import { createApp, createWebSocketServer } from "canxjs";

const app = createApp({ port: 3000 });
const wss = createWebSocketServer({ path: "/ws" });

// Handle new connections
wss.onOpen((ws) => {
  console.log("Client connected:", ws.data.id);
  ws.send(JSON.stringify({ type: "welcome", id: ws.data.id }));
});

// Handle disconnections
wss.onClose((ws) => {
  console.log("Client disconnected:", ws.data.id);
});

// Handle messages
wss.on("message", (ws, message) => {
  console.log("Received:", message);
});

app.listen();`;

const eventHandlingExample = `// Register event handlers
wss.on("chat:message", async (ws, message) => {
  const data = JSON.parse(message);
  
  // Broadcast to room
  wss.broadcastToRoom("chat", {
    event: "chat:message",
    data: {
      userId: ws.data.userId,
      text: data.text,
      timestamp: Date.now()
    }
  });
});

wss.on("user:typing", (ws, message) => {
  wss.broadcastToRoom("chat", {
    event: "user:typing",
    data: { userId: ws.data.userId }
  }, [ws.data.id]); // exclude sender
});`;

const roomsExample = `// Join a room
wss.on("room:join", (ws, message) => {
  const { roomName } = JSON.parse(message);
  wss.joinRoom(ws, roomName);
  
  // Notify others
  wss.broadcastToRoom(roomName, {
    event: "user:joined",
    data: { userId: ws.data.id }
  }, [ws.data.id]);
});

// Leave a room
wss.on("room:leave", (ws, message) => {
  const { roomName } = JSON.parse(message);
  wss.leaveRoom(ws, roomName);
  
  wss.broadcastToRoom(roomName, {
    event: "user:left",
    data: { userId: ws.data.id }
  });
});

// Get room clients
const clients = wss.getRoomClients("chat");
console.log(\`\${clients.length} users in chat\`);`;

const broadcastingExample = `// Broadcast to all clients
wss.broadcast({ type: "announcement", text: "Hello everyone!" });

// Broadcast to specific room
wss.broadcastToRoom("game-123", { type: "game:update", state: gameState });

// Send to specific client
wss.sendTo(clientId, { type: "private", data: "secret" });

// Emit event (auto-wraps in event structure)
wss.emit("notification", { message: "New message!" }, "user-room-456");`;

const userAssociationExample = `// Associate WebSocket with authenticated user
wss.on("auth", async (ws, message) => {
  const { token } = JSON.parse(message);
  
  try {
    const user = await verifyToken(token);
    wss.setUserId(ws, user.id);
    
    // Join user's personal room
    wss.joinRoom(ws, \`user:\${user.id}\`);
    
    ws.send(JSON.stringify({ event: "auth:success", data: user }));
  } catch (error) {
    ws.send(JSON.stringify({ event: "auth:error" }));
  }
});

// Find all connections for a user
const userSockets = wss.findByUserId(123);

// Send notification to specific user
wss.emit("notification", { text: "Hello!" }, \`user:123\`);`;

const clientSideExample = `// Client-side JavaScript
const ws = new WebSocket("ws://localhost:3000/ws");

ws.onopen = () => {
  console.log("Connected!");
  
  // Authenticate
  ws.send(JSON.stringify({ event: "auth", data: { token: authToken } }));
  
  // Join a room
  ws.send(JSON.stringify({ event: "room:join", data: { roomName: "chat" } }));
};

ws.onmessage = (event) => {
  const { event: eventName, data } = JSON.parse(event.data);
  
  switch (eventName) {
    case "chat:message":
      displayMessage(data);
      break;
    case "user:typing":
      showTypingIndicator(data.userId);
      break;
  }
};

// Send chat message
function sendMessage(text) {
  ws.send(JSON.stringify({ event: "chat:message", data: { text } }));
}`;

const features = [
  { icon: Radio, title: "Full Duplex", desc: "Bidirectional real-time communication" },
  { icon: Users, title: "Rooms", desc: "Group clients into rooms for targeted messaging" },
  { icon: Send, title: "Broadcasting", desc: "Send to all, rooms, or specific clients" },
  { icon: MessageSquare, title: "Event-Based", desc: "Clean event handler pattern" },
];

export default function WebSocketsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Radio className="w-3 h-3 mr-1.5" />Advanced
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">WebSockets</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Full-duplex real-time communication with rooms, broadcasting, and event-based messaging.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-cyan-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Setting Up WebSocket Server</h2>
        <CodePreview code={setupWebSocketExample} filename="app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Event Handling</h2>
        <CodePreview code={eventHandlingExample} filename="events.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><Users className="w-5 h-5 text-blue-400" /></div>
          Rooms
        </h2>
        <CodePreview code={roomsExample} filename="rooms.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4">Broadcasting</h2>
        <CodePreview code={broadcastingExample} filename="broadcast.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-500">
        <h2 className="text-2xl font-semibold text-white mb-4">User Association</h2>
        <CodePreview code={userAssociationExample} filename="users.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-600">
        <h2 className="text-2xl font-semibold text-white mb-4">Client-Side</h2>
        <CodePreview code={clientSideExample} filename="client.js" />
      </section>

      <section className="animate-slide-up delay-700">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Learn about securing your application.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/security">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Security<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/hotwire">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                HotWire<ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
