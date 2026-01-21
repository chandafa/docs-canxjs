import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Heart, ChevronRight, ArrowRight, Settings, Database, HardDrive } from "lucide-react";

const setupExample = `import { Controller, Get, Inject } from "canxjs";
import { HealthCheckService, DatabaseHealthIndicator, DiskHealthIndicator } from "canxjs/health";

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: DatabaseHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.9 })
    ]);
  }
}`;

const responseExample = `{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    },
    "storage": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up"
    },
    "storage": {
      "status": "up"
    }
  }
}`;

const modulesExample = `import { Module } from "canxjs";
import { HealthModule } from "canxjs/health";

@Module({
  imports: [HealthModule],
  controllers: [HealthController],
})
export class AppModule {}`;

const features = [
  { icon: Heart, title: "Liveness/Readiness", desc: "Standardized health checks for Kubernetes." },
  { icon: Database, title: "Indicators", desc: "Built-in checks for DB, Memory, and Disk." },
  { icon: Settings, title: "Customizable", desc: "Create your own custom health indicators." },
];

export default function HealthPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Heart className="w-3 h-3 mr-1.5" />Monitoring
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Health Checks</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Monitor your application's state with built-in health indicators. Perfect for Kubernetes readiness/liveness probes.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-green-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
        <p className="text-zinc-400 mb-6">Import the `HealthModule` and inject the service.</p>
        <CodePreview code={modulesExample} filename="app.module.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Custom Endpoint</h2>
        <CodePreview code={setupExample} filename="health.controller.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Response Format</h2>
        <CodePreview code={responseExample} filename="response.json" />
      </section>
    </div>
  );
}
