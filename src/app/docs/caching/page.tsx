import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Database, ArrowRight, Zap, Settings } from "lucide-react";

const autoCacheExample = `import { createApp, autoCacheMiddleware } from "canxjs";

const app = createApp();

// Enable AutoCache
// It automatically detects frequent, slow GET requests and caches them.
app.use(autoCacheMiddleware({
  enabled: true,
  defaultTtl: 300, // 5 minutes
  exclude: ['/api/auth/*', '/api/admin/*']
}));`;

const manualCacheExample = `import { autoCache } from "canxjs";

// In your controller
export async function getStats(req, res) {
  // Manual check (optional, middleware does this automatically for routes)
  const cached = autoCache.get(req);
  if (cached) return cached;

  const data = await heavyComputation();
  return res.json(data);
}`;

const clearCacheExample = `# Clear all caches
bun run canx cache:clear

# Optimize (includes cache clear)
bun run canx optimize`;

export default function CachingPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Database className="w-3 h-3 mr-1.5" />Advanced
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">AutoCache</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          CanxJS includes an intelligent "AutoCache" system that learns from traffic patterns and automatically caches slow, frequent GET requests.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-500/10"><Zap className="w-5 h-5 text-yellow-400" /></div>
          How it Works
        </h2>
        <p className="text-zinc-400 mb-6 leading-relaxed">
           The <code>PatternAnalyzer</code> monitors your incoming requests. If a specific GET route is accessed frequently (high hits) and has a high average response time (&gt;100ms), AutoCache marks it as "cacheable" and begins serving it from memory.
        </p>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><Settings className="w-5 h-5 text-blue-400" /></div>
          Configuration
        </h2>
        <CodePreview code={autoCacheExample} filename="src/app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Manual Management</h2>
        <CodePreview code={clearCacheExample} filename="Terminal" showLineNumbers={false} />
      </section>

       <section className="animate-slide-up delay-300">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Ensure your app is secure.</p>
          <div className="flex flex-wrap gap-4">
             <Link href="/docs/security">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Security<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
