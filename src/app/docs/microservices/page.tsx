import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Server, ChevronRight, ArrowRight, Share2, Network, Globe } from "lucide-react";

const mainExample = `import { createApp, MicroserviceOptions, Transport } from "canxjs";

async function bootstrap() {
  const app = createApp();

  // Connect Microservice strategy
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001
    }
  });

  await app.startAllMicroservices();
}`;

const controllerExample = `import { Controller } from "canxjs";
import { MessageHandler, EventHandler } from "canxjs/microservices";

@Controller()
export class MathController {

  // Request-Response pattern
  @MessageHandler({ cmd: 'sum' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }

  // Event pattern (Fire and forget)
  @EventHandler('user_created')
  handleUserCreated(data: Record<string, unknown>) {
    console.log('User created event received', data);
  }
}`;

const clientExample = `import { ClientProxy, ClientProxyFactory, Transport } from "canxjs/microservices";

export class UserService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { port: 3001 }
    });
  }

  getSum(numbers: number[]) {
    return this.client.send({ cmd: 'sum' }, numbers);
  }
}`;

const features = [
  { icon: Server, title: "Transporters", desc: "Support for TCP, Redis, NATS, MQTT, and Kafka." },
  { icon: Network, title: "Distributed", desc: "Build scalable microservice architectures." },
  { icon: Share2, title: "Client Proxy", desc: "Easily communicate between services." },
  { icon: Globe, title: "Hybrid Apps", desc: "Run HTTP and Microservices in the same app." },
];

export default function MicroservicesPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Server className="w-3 h-3 mr-1.5" />Distributed
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Microservices</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Scale your application using CanxJS microservices. Support for multiple transport layers.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-indigo-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Bootstrap</h2>
        <CodePreview code={mainExample} filename="main.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Message Handlers</h2>
        <CodePreview code={controllerExample} filename="math.controller.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Client Proxy</h2>
        <CodePreview code={clientExample} filename="user.service.ts" />
      </section>
    </div>
  );
}
