import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Zap, ChevronRight, ArrowRight, Radio, Send, Users } from "lucide-react";

const setupHotWireExample = `import { createApp, hotWire } from "canxjs";

const app = createApp({ port: 3000 });

// Create HotWire SSE endpoint
app.get("/hotwire/connect", (req, res) => {
  return hotWire.createStream(req, res);
});

// Subscribe to channels via POST
app.post("/hotwire/subscribe", async (req, res) => {
  const { clientId, channel } = await req.body();
  hotWire.subscribe(clientId, channel);
  return res.json({ subscribed: channel });
});

app.listen();`;

const broadcastExample = `import { hotWire } from "canxjs";

// Broadcast JSON data to a channel
hotWire.broadcast("notifications", {
  type: "new_message",
  message: "Hello World!",
  timestamp: Date.now()
});

// Broadcast to all connected clients
hotWire.broadcastAll({
  type: "announcement",
  text: "Server maintenance in 5 minutes"
});

// Send to specific client
hotWire.sendTo(clientId, { type: "private", data: "secret" });`;

const htmlUpdatesExample = `import { hotWire } from "canxjs";

// Send partial HTML update to channel
hotWire.broadcastHTML(
  "dashboard",           // channel
  "<li>New item!</li>",  // HTML content
  "#notifications-list", // target selector
  "append"               // action: replace, append, prepend
);

// Replace content
hotWire.broadcastHTML(
  "users",
  "<span class='status online'>Online</span>",
  "#user-status-123",
  "replace"
);`;

const clientSideExample = `// Client-side JavaScript
const eventSource = new EventSource("/hotwire/connect");

eventSource.onopen = () => {
  console.log("Connected to HotWire");
};

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  // Handle HTML updates
  if (data.type === "html") {
    const target = document.querySelector(data.target);
    if (target) {
      switch (data.action) {
        case "replace": target.innerHTML = data.content; break;
        case "append": target.innerHTML += data.content; break;
        case "prepend": target.innerHTML = data.content + target.innerHTML; break;
      }
    }
  }
  
  // Handle other events
  console.log("Received:", data);
};

eventSource.onerror = () => {
  console.log("Connection lost, reconnecting...");
};`;

const realWorldExample = `// Real-time notifications example
app.post("/posts", authMiddleware, async (req, res) => {
  const post = await Post.create(await req.body());
  
  // Notify all subscribers
  hotWire.broadcastHTML(
    "feed",
    \`<article class="post">
      <h3>\${post.title}</h3>
      <p>\${post.excerpt}</p>
    </article>\`,
    "#feed-container",
    "prepend"
  );
  
  // Also send JSON event
  hotWire.broadcast("notifications", {
    type: "new_post",
    postId: post.id,
    title: post.title
  });
  
  return res.json(post);
});`;

const features = [
  { icon: Radio, title: "SSE-Based", desc: "No WebSocket setup required, works over HTTP" },
  { icon: Send, title: "HTML Streaming", desc: "Send partial HTML updates to specific elements" },
  { icon: Users, title: "Channels", desc: "Subscribe clients to channels for targeted updates" },
  { icon: Zap, title: "Auto-Reconnect", desc: "Built-in connection keepalive and recovery" },
];

export default function HotWirePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Zap className="w-3 h-3 mr-1.5" />Advanced
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">HotWire Protocol</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Real-time streaming without WebSocket complexity. Send partial HTML updates and JSON events using Server-Sent Events.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-yellow-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Setting Up HotWire</h2>
        <CodePreview code={setupHotWireExample} filename="app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Broadcasting Events</h2>
        <CodePreview code={broadcastExample} filename="broadcast.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10"><Send className="w-5 h-5 text-orange-400" /></div>
          HTML Updates
        </h2>
        <p className="text-zinc-400 mb-6">Send partial HTML to update specific elements without full page reload.</p>
        <CodePreview code={htmlUpdatesExample} filename="html-updates.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4">Client-Side Integration</h2>
        <CodePreview code={clientSideExample} filename="client.js" />
      </section>

      <section className="mb-16 animate-slide-up delay-500">
        <h2 className="text-2xl font-semibold text-white mb-4">Real-World Example</h2>
        <CodePreview code={realWorldExample} filename="notifications.ts" />
      </section>

      <section className="animate-slide-up delay-600">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Need full bidirectional communication? Check out WebSockets.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/websockets">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                WebSockets<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/core-concepts">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Core Concepts<ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
