import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Zap, ChevronRight, ArrowRight, Gauge, Layers, RefreshCw } from "lucide-react";

const batcherExample = `import { createBatcher } from "canxjs";

const batcher = createBatcher({
  batchWindow: 50, // Collect requests for 50ms
  maxBatchSize: 100,
  dedupe: true // Remove duplicate identical requests
});

// Usage in controller
@Post('batch')
async handleBatch(@Body() requests: any[]) {
  return await batcher.processBatch(requests, async (req) => {
    // Process individual request
    return await this.service.handle(req);
  });
}`;

const jitExample = `import { jitCompiler } from "canxjs";

// JIT is automatic, but you can inspect stats
const stats = jitCompiler.getStats();
console.log(stats);
// { compiledRoutes: 15, cacheHits: 12050, avgCompileTime: 0.05 }`;

const features = [
  { icon: Zap, title: "JIT Compiler", desc: "Compiles routes to regex for zero-overhead matching." },
  { icon: Layers, title: "Request Batching", desc: "Combine multiple API calls into a single HTTP request." },
  { icon: RefreshCw, title: "Deduplication", desc: "Automatically remove duplicate requests in a batch." },
  { icon: Gauge, title: "Zero Overhead", desc: "Optimized for Bun's high-performance runtime." },
];

export default function PerformancePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Zap className="w-3 h-3 mr-1.5" />Optimization
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Performance</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          CanxJS includes advanced performance features like JIT compilation and request batching out of the box.
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
        <h2 className="text-2xl font-semibold text-white mb-4">Request Batching</h2>
        <p className="text-zinc-400 mb-6">
          Reduce HTTP overhead by combining multiple API operations into a single request.
        </p>
        <CodePreview code={batcherExample} filename="batch.controller.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">JIT Compilation</h2>
        <p className="text-zinc-400 mb-6">
          CanxJS automatically compiles your routes into optimized Regular Expressions. No configuration needed.
        </p>
        <CodePreview code={jitExample} filename="debug.ts" />
      </section>
    </div>
  );
}
