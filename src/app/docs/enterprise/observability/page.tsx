import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  Activity, 
  ChevronRight,
  ArrowRight,
  LineChart,
  Search,
  AlertTriangle,
  Timer
} from "lucide-react";

export const metadata: Metadata = {
  title: "Observability: Metrics & Tracing",
  description: "Gain deep insights into your CanxJS application with Prometheus metrics and OpenTelemetry distributed tracing.",
  openGraph: {
    title: "Observability - CanxJS",
    description: "Prometheus metrics and distributed tracing for production applications.",
  },
};

const customMetricsCode = `import { metrics } from 'canxjs';

// Counter - track occurrences
metrics.increment('users_registered_total');
metrics.increment('api_requests_total', { endpoint: '/users' });

// Histogram - track durations
metrics.recordDuration('db_query_duration_ms', 150);
metrics.recordDuration('http_request_duration_ms', 45, { 
  method: 'GET', 
  route: '/api/users' 
});

// Gauge - track current values
metrics.gauge('active_connections', 42);
metrics.gauge('queue_size', await queue.size());`;

const tracingDecoratorCode = `import { Trace, createSpan } from 'canxjs';

class OrderController {
  
  @Trace('order.process')
  async create(req: Request) {
    // Automatic span creation
    await this.validate(req);
    await this.charge(req);
    await this.notify(req);
  }

  async validate(req: Request) {
    // Manual span creation
    const span = createSpan('order.validate');
    try {
      // validation logic...
      span.setStatus('ok');
    } catch (e) {
      span.recordException(e);
      throw e;
    } finally {
      span.end();
    }
  }
}`;

const configCode = `// config/observability.ts
export default {
  metrics: {
    enabled: true,
    endpoint: '/metrics',  // Prometheus scrape endpoint
    prefix: 'canx_',       // Metric name prefix
  },
  tracing: {
    enabled: true,
    exporter: 'jaeger',    // or 'zipkin', 'otlp'
    serviceName: 'my-app',
    sampleRate: 0.1,       // Sample 10% in production
  }
};`;

const features = [
  { 
    icon: LineChart, 
    title: "Prometheus Metrics", 
    desc: "Automatic HTTP, CPU, and memory metrics exposed at /metrics endpoint.",
    color: "blue"
  },
  { 
    icon: Search, 
    title: "Distributed Tracing", 
    desc: "Track requests across microservices with OpenTelemetry support.",
    color: "green"
  },
  { 
    icon: Timer, 
    title: "Custom Metrics", 
    desc: "Create counters, histograms, and gauges for your business logic.",
    color: "purple"
  },
  { 
    icon: AlertTriangle, 
    title: "Error Tracking", 
    desc: "Automatic exception recording in spans for debugging.",
    color: "orange"
  },
];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400",
  green: "bg-green-500/10 text-green-400",
  purple: "bg-purple-500/10 text-purple-400",
  orange: "bg-orange-500/10 text-orange-400",
};

export default function ObservabilityDocs() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-secondary border-border text-muted-foreground">
          <Activity className="w-3 h-3 mr-1.5" />
          Enterprise
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Observability</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Gain deep insights into your application performance with Prometheus metrics 
          and OpenTelemetry distributed tracing. Compatible with Jaeger, Zipkin, and Datadog.
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

      {/* Custom Metrics */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <LineChart className="w-5 h-5 text-blue-400" />
          </div>
          Prometheus Metrics
        </h2>
        <p className="text-muted-foreground mb-6">
          CanxJS automatically exposes default metrics (CPU, Memory, HTTP latency) at{" "}
          <code className="text-primary bg-muted px-1.5 py-0.5 rounded">/metrics</code>. 
          Add custom metrics for your business logic.
        </p>
        <CodePreview code={customMetricsCode} filename="services/analytics.ts" />
      </section>

      {/* Distributed Tracing */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Search className="w-5 h-5 text-green-400" />
          </div>
          Distributed Tracing
        </h2>
        <p className="text-muted-foreground mb-6">
          Use the <code className="text-primary bg-muted px-1.5 py-0.5 rounded">@Trace</code> decorator 
          for automatic span creation, or create spans manually for fine-grained control.
        </p>
        <CodePreview code={tracingDecoratorCode} filename="controllers/OrderController.ts" />
      </section>

      {/* Configuration Table */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Exporters</h2>
        <div className="rounded-2xl bg-card border border-border p-6 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="pb-3 font-medium">Exporter</th>
                <th className="pb-3 font-medium">Use Case</th>
                <th className="pb-3 font-medium">Config</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr className="border-b border-border/50">
                <td className="py-3 font-mono text-xs">jaeger</td>
                <td className="py-3 text-muted-foreground">Self-hosted tracing</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">JAEGER_ENDPOINT</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 font-mono text-xs">zipkin</td>
                <td className="py-3 text-muted-foreground">Self-hosted tracing</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">ZIPKIN_URL</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 font-mono text-xs">otlp</td>
                <td className="py-3 text-muted-foreground">OpenTelemetry Collector</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">OTEL_EXPORTER_URL</td>
              </tr>
              <tr>
                <td className="py-3 font-mono text-xs">datadog</td>
                <td className="py-3 text-muted-foreground">Managed service</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">DD_API_KEY</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Configuration */}
      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Timer className="w-5 h-5 text-purple-400" />
          </div>
          Configuration
        </h2>
        <CodePreview code={configCode} filename="config/observability.ts" />
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-500">
        <div className="rounded-2xl bg-gradient-to-br from-card to-background border border-border p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">Next Steps</h3>
          <p className="text-muted-foreground mb-6">
            Explore other enterprise features for production-ready systems.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/enterprise/security">
              <Button className="rounded-full">
                Enterprise Security
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/enterprise/cluster">
              <Button variant="outline" className="rounded-full">
                Cluster Mode
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
