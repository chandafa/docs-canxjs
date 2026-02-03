import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  Zap, 
  ChevronRight,
  ArrowRight,
  Radio,
  Database,
  RefreshCw,
  Globe
} from "lucide-react";

export const metadata: Metadata = {
  title: "Universal Signals (Zero-API)",
  description: "Revolutionary Zero-API architecture for real-time state synchronization across server, cluster, and frontend clients.",
  openGraph: {
    title: "Universal Signals - CanxJS",
    description: "Real-time state sync without REST APIs. Change a value on the server, update the UI instantly.",
  },
};

const createSignalCode = `import { useSignal } from 'canxjs';

// Define a signal with options
const onlineUsers = useSignal('stats:online', 0, {
  syncToClient: true,  // Broadcast to all connected frontends
  persistence: true,   // Persist to database
  cluster: true        // Sync across all server instances
});

// Update value from anywhere in your code
async function userConnected() {
  await onlineUsers.set(onlineUsers.value + 1);
  // Automatically syncs to Redis cluster + all WebSocket clients
}

async function userDisconnected() {
  await onlineUsers.set(onlineUsers.value - 1);
}`;

const consumeSignalCode = `// Client-side code (React/Next.js)
import { useSignal } from 'canxjs/client';

export function StatsWidget() {
  // Auto-subscribes via WebSocket
  const users = useSignal('stats:online');
  
  return (
    <div className="stats-card">
      <span className="count">{users}</span>
      <span className="label">Online Users</span>
    </div>
  );
}

// Multiple signals
export function Dashboard() {
  const online = useSignal('stats:online');
  const orders = useSignal('stats:orders_today');
  const revenue = useSignal('stats:revenue');
  
  return (
    <div className="dashboard">
      <Stat label="Online" value={online} />
      <Stat label="Orders" value={orders} />
      <Stat label="Revenue" value={\`$\${revenue}\`} />
    </div>
  );
}`;

const advancedSignalCode = `// Signals with complex data
const cartSignal = useSignal('cart:user-123', { items: [], total: 0 });

// Update nested data
await cartSignal.set({
  ...cartSignal.value,
  items: [...cartSignal.value.items, newItem],
  total: cartSignal.value.total + newItem.price
});

// Signal with computed values
const statsSignal = useSignal('dashboard:stats', null, {
  compute: async () => ({
    users: await User.count(),
    orders: await Order.countToday(),
    revenue: await Order.sumRevenue()
  }),
  refreshInterval: 5000  // Recompute every 5 seconds
});`;

const features = [
  { 
    icon: Zap, 
    title: "Zero-API Design", 
    desc: "No REST endpoints needed. Just set a value on the server, UI updates instantly.",
    color: "blue"
  },
  { 
    icon: Radio, 
    title: "Real-time Sync", 
    desc: "Changes propagate to all connected clients via WebSocket in milliseconds.",
    color: "green"
  },
  { 
    icon: Database, 
    title: "State Persistence", 
    desc: "Optionally persist signal values to database for recovery after restart.",
    color: "purple"
  },
  { 
    icon: Globe, 
    title: "Cluster Support", 
    desc: "Signals sync across all server instances via Redis pub/sub.",
    color: "orange"
  },
];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400",
  green: "bg-green-500/10 text-green-400",
  purple: "bg-purple-500/10 text-purple-400",
  orange: "bg-orange-500/10 text-orange-400",
};

export default function SignalsDocs() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-secondary border-border text-muted-foreground">
          <Zap className="w-3 h-3 mr-1.5" />
          Enterprise
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Universal Signals</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Revolutionary "Zero-API" architecture for real-time state synchronization.
          Change a value on the server, and the UI updates instantly across all clients.
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

      {/* How It Works */}
      <section className="mb-16 animate-slide-up delay-50">
        <h2 className="text-2xl font-semibold text-foreground mb-4">How It Works</h2>
        <div className="rounded-2xl bg-card border border-border p-6 mb-6">
          <p className="text-muted-foreground leading-relaxed">
            CanxJS uses Redis Pub/Sub to sync signals across the cluster. Set <code>cluster: true</code> and you&apos;re done.
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">1.</span>
              <span>Across your entire <strong className="text-foreground">server cluster</strong> via Redis pub/sub</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">2.</span>
              <span>To all connected <strong className="text-foreground">frontend clients</strong> via WebSocket</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">3.</span>
              <span>Optionally persisted to the <strong className="text-foreground">database</strong> for recovery</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Creating Signals */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Database className="w-5 h-5 text-blue-400" />
          </div>
          Creating Signals (Backend)
        </h2>
        <p className="text-muted-foreground mb-6">
          Use <code className="text-primary bg-muted px-1.5 py-0.5 rounded">useSignal()</code> to create 
          a reactive variable. Configure sync options based on your needs.
        </p>
        <CodePreview code={createSignalCode} filename="services/stats.ts" />
      </section>

      {/* Consuming Signals */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <RefreshCw className="w-5 h-5 text-green-400" />
          </div>
          Consuming Signals (Frontend)
        </h2>
        <p className="text-muted-foreground mb-6">
          Import from <code className="text-primary bg-muted px-1.5 py-0.5 rounded">canxjs/client</code> and 
          use the same <code className="text-primary bg-muted px-1.5 py-0.5 rounded">useSignal()</code> hook. 
          It auto-subscribes via WebSocket.
        </p>
        <CodePreview code={consumeSignalCode} filename="components/Dashboard.tsx" />
      </section>

      {/* Advanced Patterns */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          Advanced Patterns
        </h2>
        <p className="text-muted-foreground mb-6">
          Signals support complex data, computed values, and auto-refresh intervals.
        </p>
        <CodePreview code={advancedSignalCode} filename="services/dashboard.ts" />
      </section>

      {/* Configuration Table */}
      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Signal Options</h2>
        <div className="rounded-2xl bg-card border border-border p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="pb-3 font-medium">Option</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr className="border-b border-border/50">
                <td className="py-3 font-mono text-xs">syncToClient</td>
                <td className="py-3 text-muted-foreground">boolean</td>
                <td className="py-3 text-muted-foreground">Broadcast changes to WebSocket clients</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 font-mono text-xs">persistence</td>
                <td className="py-3 text-muted-foreground">boolean</td>
                <td className="py-3 text-muted-foreground">Persist to database</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 font-mono text-xs">cluster</td>
                <td className="py-3 text-muted-foreground">boolean</td>
                <td className="py-3 text-muted-foreground">Sync across server instances via Redis</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 font-mono text-xs">compute</td>
                <td className="py-3 text-muted-foreground">function</td>
                <td className="py-3 text-muted-foreground">Compute value from async function</td>
              </tr>
              <tr>
                <td className="py-3 font-mono text-xs">refreshInterval</td>
                <td className="py-3 text-muted-foreground">number</td>
                <td className="py-3 text-muted-foreground">Auto-recompute interval (ms)</td>
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
            Explore other enterprise features for building real-time applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/websockets">
              <Button className="rounded-full">
                WebSockets
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/enterprise/microservices">
              <Button variant="outline" className="rounded-full">
                Microservices
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
