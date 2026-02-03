import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  Server, 
  ChevronRight,
  ArrowRight,
  Radio,
  Network,
  GitBranch,
  Zap
} from "lucide-react";

export const metadata: Metadata = {
  title: "Microservices & Event Bus",
  description: "Build scalable distributed systems with built-in Service Discovery and Event Bus for CanxJS.",
  openGraph: {
    title: "Microservices & Event Bus - CanxJS",
    description: "Build scalable distributed systems with Redis-powered pub/sub and automatic service discovery.",
  },
};

const publishEventCode = `import { eventBus } from 'canxjs';

// Publish an event
await eventBus().publish('order.created', {
  orderId: '123',
  amount: 99.00,
  customer: 'john@example.com'
});

// Publish with metadata
await eventBus().publish('user.registered', {
  userId: 'usr_456',
  email: 'jane@example.com'
}, {
  priority: 'high',
  retries: 3
});`;

const subscribeEventCode = `import { Subscribe } from 'canxjs';

class EmailService {
  @Subscribe('order.created')
  async onOrderCreated(payload: any) {
    await sendOrderConfirmation(payload.orderId);
  }

  @Subscribe('user.registered')
  async onUserRegistered(payload: any) {
    await sendWelcomeEmail(payload.email);
  }
}

// Or subscribe programmatically
eventBus().subscribe('payment.failed', async (payload) => {
  await notifyAdmin(payload);
});`;

const serviceRegistryCode = `import { createServiceRegistry } from 'canxjs';

const registry = createServiceRegistry({
  driver: 'redis', // or 'consul', 'etcd'
  ttl: 30000       // Health check interval
});

// Register this instance
await registry.register('payment-service', '10.0.0.5', 3000);

// Discover other services
const userService = await registry.discover('user-service');
// Result: { host: '10.0.0.2', port: 4000, healthy: true }

// Load-balanced discovery (round-robin)
const instance = await registry.discoverOne('api-gateway');`;

const rpcClientCode = `import { createRpcClient } from 'canxjs';

// Create typed RPC client
const userClient = createRpcClient<UserService>({
  service: 'user-service',
  timeout: 5000
});

// Call remote methods
const user = await userClient.getUser('usr_123');
const users = await userClient.listUsers({ page: 1, limit: 10 });

// With circuit breaker
const orderClient = createRpcClient<OrderService>({
  service: 'order-service',
  circuitBreaker: {
    threshold: 5,
    timeout: 30000
  }
});`;

const features = [
  { 
    icon: Radio, 
    title: "Event Bus (Pub/Sub)", 
    desc: "Asynchronous communication between services with Redis or in-memory support.",
    color: "blue"
  },
  { 
    icon: Network, 
    title: "Service Discovery", 
    desc: "Automatic service registration and discovery with health checks.",
    color: "green"
  },
  { 
    icon: GitBranch, 
    title: "Load Balancing", 
    desc: "Built-in round-robin and weighted load balancing across instances.",
    color: "purple"
  },
  { 
    icon: Zap, 
    title: "RPC Framework", 
    desc: "Type-safe remote procedure calls with circuit breaker support.",
    color: "orange"
  },
];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400",
  green: "bg-green-500/10 text-green-400",
  purple: "bg-purple-500/10 text-purple-400",
  orange: "bg-orange-500/10 text-orange-400",
};

export default function MicroservicesDocs() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-secondary border-border text-muted-foreground">
          <Server className="w-3 h-3 mr-1.5" />
          Enterprise
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Microservices & Event Bus</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Build scalable distributed systems with built-in Service Discovery and Event Bus. 
          Supports Redis for production and in-memory for development.
        </p>
      </div>

      {/* Features Grid */}
      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div 
              key={item.title} 
              className="rounded-2xl bg-card border border-border p-5 hover:bg-accent/50 transition-all duration-300"
            >
              <div className={`p-2 rounded-lg w-fit mb-3 ${colorClasses[item.color]}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Publishing Events */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Radio className="w-5 h-5 text-blue-400" />
          </div>
          Publishing Events
        </h2>
        <p className="text-muted-foreground mb-6">
          The Event Bus allows your services to communicate asynchronously without tight coupling. 
          Use <code className="text-primary bg-muted px-1.5 py-0.5 rounded">eventBus().publish()</code> to emit events.
        </p>
        <CodePreview code={publishEventCode} filename="services/order.service.ts" />
      </section>

      {/* Subscribing to Events */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <GitBranch className="w-5 h-5 text-green-400" />
          </div>
          Subscribing to Events
        </h2>
        <p className="text-muted-foreground mb-6">
          Use the <code className="text-primary bg-muted px-1.5 py-0.5 rounded">@Subscribe</code> decorator 
          or subscribe programmatically to handle events from other services.
        </p>
        <CodePreview code={subscribeEventCode} filename="services/email.service.ts" />
      </section>

      {/* Service Registry */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Network className="w-5 h-5 text-purple-400" />
          </div>
          Service Registry
        </h2>
        <p className="text-muted-foreground mb-6">
          Automatic service discovery and load balancing. Services register themselves upon startup 
          and can discover other services by name.
        </p>
        <CodePreview code={serviceRegistryCode} filename="app.ts" />
      </section>

      {/* RPC Client */}
      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Zap className="w-5 h-5 text-orange-400" />
          </div>
          RPC Framework
        </h2>
        <p className="text-muted-foreground mb-6">
          Type-safe remote procedure calls with automatic service discovery and circuit breaker support.
        </p>
        <CodePreview code={rpcClientCode} filename="clients/user.client.ts" />
      </section>

      {/* Configuration */}
      <section className="mb-16 animate-slide-up delay-450">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Configuration</h2>
        <div className="rounded-2xl bg-card border border-border p-6 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="pb-3 font-medium">Driver</th>
                <th className="pb-3 font-medium">Use Case</th>
                <th className="pb-3 font-medium">Config</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr className="border-b border-border/50">
                <td className="py-3 font-mono text-xs">memory</td>
                <td className="py-3 text-muted-foreground">Development, testing</td>
                <td className="py-3 text-muted-foreground">None required</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 font-mono text-xs">redis</td>
                <td className="py-3 text-muted-foreground">Production</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">REDIS_URL</td>
              </tr>
              <tr>
                <td className="py-3 font-mono text-xs">consul</td>
                <td className="py-3 text-muted-foreground">Enterprise</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">CONSUL_URL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-500">
        <div className="rounded-2xl bg-gradient-to-br from-card to-background border border-border p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">Next Steps</h3>
          <p className="text-muted-foreground mb-6">
            Explore durable workflows and other enterprise features.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/enterprise/flow">
              <Button className="rounded-full">
                Canx Flow
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/queue">
              <Button variant="outline" className="rounded-full">
                Queue System
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
