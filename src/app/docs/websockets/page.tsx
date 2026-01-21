import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Radio, ChevronRight, ArrowRight, Users, Send, MessageSquare, Zap } from "lucide-react";

const gatewayExample = `import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from 'canxjs';

@WebSocketGateway({
  path: '/ws',
  cors: { origin: '*' }
})
export class ChatGateway {
  
  // Handle 'chat:message' event
  @SubscribeMessage('chat:message')
  handleMessage(
    @MessageBody() data: { text: string },
    @ConnectedSocket() client: any
  ) {
    console.log(\`Received message from \${client.id}: \${data.text}\`);
    
    // Return explicit response (emits 'chat:message' back to sender)
    return { event: 'ack', status: 'received' };
  }

  @SubscribeMessage('join:room')
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: any
  ) {
    client.join(room);
    // Broadcast to room (auto-injected server/client methods)
    client.to(room).emit('user:joined', { id: client.id });
  }
}`;

const diIntegrationExample = `import { WebSocketGateway, SubscribeMessage } from 'canxjs';
import { AuthService } from './AuthService';

@WebSocketGateway()
export class AuthGateway {
  // Full Dependency Injection Support
  constructor(private authService: AuthService) {}

  @SubscribeMessage('login')
  async handleLogin(@MessageBody() token: string, @ConnectedSocket() client: any) {
    const user = await this.authService.validate(token);
    client.data.user = user;
    return { status: 'authenticated', user };
  }
}`;

const clientSideExample = `// Native WebSocket Client or CanxJS Client
const ws = new WebSocket("ws://localhost:3000/ws");

ws.onopen = () => {
  // Standard JSON event format
  ws.send(JSON.stringify({
    event: "chat:message",
    data: { text: "Hello World!" }
  }));
};

ws.onmessage = (msg) => {
  const { event, data } = JSON.parse(msg.data);
  console.log(event, data);
};`;

const features = [
  { icon: Radio, title: "Declarative Gateways", desc: "Use decorators to define WebSocket endpoints similar to Controllers." },
  { icon: Zap, title: "DI Integration", desc: "Gateways are providers! Inject services directly into your real-time logic." },
  { icon: Users, title: "Room Support", desc: "Built-in adapters for room-management and broadcasting." },
  { icon: MessageSquare, title: "AsyncAPI Ready", desc: "Automatically generates documentation for your events." },
];

export default function WebSocketsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Radio className="w-3 h-3 mr-1.5" />Real-Time
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">WebSockets (Gateways)</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Build powerful real-time applications using the declarative Gateway pattern. Fully integrated with Dependency Injection.
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
        <h2 className="text-2xl font-semibold text-white mb-4">The Gateway Pattern</h2>
        <p className="text-zinc-400 mb-6">
          Unlike traditional event listeners, Gateways allow you to organize your real-time logic into classes using decorators.
        </p>
        <CodePreview code={gatewayExample} filename="ChatGateway.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Dependency Injection</h2>
        <p className="text-zinc-400 mb-6">
          Gateways are fully managed by the CanxJS IoC container. You can inject any service, repository, or provider.
        </p>
        <CodePreview code={diIntegrationExample} filename="AuthGateway.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Client Integration</h2>
        <CodePreview code={clientSideExample} filename="client.js" />
      </section>

      <section className="animate-slide-up delay-700">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Explore Events</h3>
          <p className="text-zinc-400 mb-6">CanxJS uses AsyncAPI to document your events automatically.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/events">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                AsyncAPI Docs<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
