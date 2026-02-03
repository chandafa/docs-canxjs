import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  Cpu, 
  ChevronRight,
  ArrowRight,
  RefreshCw,
  Shield,
  Zap,
  Server
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cluster Mode & High Availability",
  description: "Scale your CanxJS application across multiple CPU cores with zero-downtime reloads and automatic crash recovery.",
  openGraph: {
    title: "Cluster Mode & High Availability - CanxJS",
    description: "Scale across multiple CPU cores with zero-downtime reloads and crash recovery.",
  },
};

const basicClusterCode = `import { initCluster, CanxServer } from 'canxjs';

// Initialize Cluster
initCluster({
  enabled: true,
  workers: 'auto', // Auto-detect CPU cores
});

const app = new CanxServer();
app.start();`;

const advancedClusterCode = `initCluster({
  enabled: process.env.NODE_ENV === 'production',
  workers: 4, // Force 4 workers
  wrapper: (app) => {
    console.log(\`Worker \${process.pid} started\`);
  },
  onWorkerExit: (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
  }
});`;

const zeroDowntimeCode = `// Send SIGUSR2 to master process for graceful reload
// All workers are replaced one-by-one

// In your deployment script:
// kill -SIGUSR2 $(cat /var/run/canx.pid)

// Or use the CLI:
// node canx cluster:reload`;

const features = [
  { 
    icon: Zap, 
    title: "Automatic Load Balancing", 
    desc: "Traffic is distributed round-robin across all worker processes.",
    color: "blue"
  },
  { 
    icon: RefreshCw, 
    title: "Zero-Downtime Reload", 
    desc: "Update code without dropping a single connection.",
    color: "green"
  },
  { 
    icon: Shield, 
    title: "Crash Recovery", 
    desc: "Dead workers are instantly replaced to maintain availability.",
    color: "purple"
  },
  { 
    icon: Server, 
    title: "Multi-Core Utilization", 
    desc: "Utilize all available CPU cores for maximum performance.",
    color: "orange"
  },
];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400",
  green: "bg-green-500/10 text-green-400",
  purple: "bg-purple-500/10 text-purple-400",
  orange: "bg-orange-500/10 text-orange-400",
};

export default function ClusterDocs() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-secondary border-border text-muted-foreground">
          <Cpu className="w-3 h-3 mr-1.5" />
          Enterprise
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Cluster Mode</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Scale your application across multiple CPU cores with zero-downtime reloads 
          CanxJS&apos;s cluster mode is built on top of the Node.js <code>cluster</code> module, but adds significant power:     </p>
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

      {/* Basic Usage */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Cpu className="w-5 h-5 text-blue-400" />
          </div>
          Enabling Cluster Mode
        </h2>
        <p className="text-muted-foreground mb-6">
          Use the <code className="text-primary bg-muted px-1.5 py-0.5 rounded">initCluster()</code> function 
          Typically, you want one worker per CPU core. CanxJS defaults to <code>os.cpus().length</code>. Set <code className="text-primary bg-muted px-1.5 py-0.5 rounded">workers: 'auto'</code> to 
          automatically detect CPU cores.
        </p>
        <CodePreview code={basicClusterCode} filename="app.ts" />
      </section>

      {/* Advanced Configuration */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Server className="w-5 h-5 text-green-400" />
          </div>
          Advanced Configuration
        </h2>
        <p className="text-muted-foreground mb-6">
          Customize cluster behavior with lifecycle hooks and environment-based settings.
        </p>
        <CodePreview code={advancedClusterCode} filename="app.ts" />
      </section>

      {/* Configuration Table */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Configuration Options</h2>
        <div className="rounded-2xl bg-card border border-border p-6 mb-6">
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
                <td className="py-3 font-mono text-xs">enabled</td>
                <td className="py-3 text-muted-foreground">boolean</td>
                <td className="py-3 text-muted-foreground">Enable/disable cluster mode</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 font-mono text-xs">workers</td>
                <td className="py-3 text-muted-foreground">'auto' | number</td>
                <td className="py-3 text-muted-foreground">Number of workers or auto-detect</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 font-mono text-xs">wrapper</td>
                <td className="py-3 text-muted-foreground">function</td>
                <td className="py-3 text-muted-foreground">Called when worker starts</td>
              </tr>
              <tr>
                <td className="py-3 font-mono text-xs">onWorkerExit</td>
                <td className="py-3 text-muted-foreground">function</td>
                <td className="py-3 text-muted-foreground">Called when worker dies</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Zero-Downtime Reload */}
      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <RefreshCw className="w-5 h-5 text-purple-400" />
          </div>
          Zero-Downtime Reload
        </h2>
        <p className="text-muted-foreground mb-6">
          Gracefully reload all workers without dropping connections. Workers are replaced one-by-one.
        </p>
        <CodePreview code={zeroDowntimeCode} filename="deployment.sh" />
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-500">
        <div className="rounded-2xl bg-gradient-to-br from-card to-background border border-border p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">Next Steps</h3>
          <p className="text-muted-foreground mb-6">
            Explore other enterprise features for building production-ready systems.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/enterprise/microservices">
              <Button className="rounded-full">
                Microservices
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/enterprise/observability">
              <Button variant="outline" className="rounded-full">
                Observability
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
