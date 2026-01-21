import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Activity, ChevronRight, ArrowRight, GitBranch, Search, Zap } from "lucide-react";

const tracingExample = `import { TracingModule, Trace } from "canxjs";

@Module({
  imports: [
    TracingModule.forRoot({
      serviceName: "my-service",
      exporter: "console", // or 'otlp'
    })
  ]
})
export class AppModule {}

@Injectable()
export class UserService {
  
  @Trace("Fetch User") // Auto-instrument this method
  async findOne(id: string) {
    // Spans are automatically created
    return await this.repo.find(id);
  }
}`;

const features = [
  { icon: Activity, title: "Auto-Instrumentation", desc: "Automatically traces HTTP requests and DB queries." },
  { icon: GitBranch, title: "Distributed Tracing", desc: "Propagate context across microservices." },
  { icon: Search, title: "OpenTelemetry", desc: "Native support for OTLP exporters (Jaeger, Zipkin)." },
  { icon: Zap, title: "Performance", desc: "Zero-overhead no-op tracer in production by default." },
];

export default function TracingPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Activity className="w-3 h-3 mr-1.5" />Observability
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Tracing</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Monitor performance and debug distributed systems with built-in OpenTelemetry support.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-orange-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Setup</h2>
        <p className="text-zinc-400 mb-6">
          Import `TracingModule` to enable observability. Use the `@Trace` decorator to instrument specific methods.
        </p>
        <CodePreview code={tracingExample} filename="app.ts" />
      </section>

      <section className="animate-slide-up delay-700">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Logging</h3>
          <p className="text-zinc-400 mb-6">Tracing works best with structured logging.</p>
          <div className="flex flex-wrap gap-4">
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
