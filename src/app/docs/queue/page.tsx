"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  LayoutDashboard, 
  Activity,
  RefreshCw,
  Trash2,
  ChevronRight,
  ArrowRight,
  BarChart3,
  Clock,
  AlertTriangle
} from "lucide-react";

const queueSetupExample = `import { createApp, queue, QueueController } from "canxjs";

const app = createApp({ port: 3000 });

// Mount the Queue Dashboard at /canx-queue
app.routes((router) => {
  router.controller('/canx-queue', QueueController);
});

app.listen();`;

const queueJobExample = `import { queue } from "canxjs";

// Dispatch a job to the queue
await queue.dispatch("send-email", {
  to: "user@example.com",
  subject: "Welcome!",
  body: "Thank you for signing up."
});

// Dispatch with delay (5 minutes)
await queue.later("send-reminder", { userId: 123 }, 300);

// Process jobs
queue.process("send-email", async (job) => {
  await sendEmail(job.data);
  console.log(\`Email sent to \${job.data.to}\`);
});`;

const queueStatsExample = `// Get queue statistics
const stats = await queue.getStats();
console.log(stats);
// { pending: 12, failed: 2, processed: 158 }

// Get failed jobs
const failedJobs = await queue.getFailed();

// Retry a specific job
await queue.retry(jobId);

// Clear all jobs
await queue.clear();`;

const features = [
  { 
    icon: BarChart3, 
    title: "Real-time Stats", 
    desc: "Monitor pending, failed, and processed job counts at a glance" 
  },
  { 
    icon: Clock, 
    title: "Job Management", 
    desc: "View pending and failed jobs with full payload details" 
  },
  { 
    icon: RefreshCw, 
    title: "Retry Failed Jobs", 
    desc: "One-click retry for failed jobs directly from the dashboard" 
  },
  { 
    icon: Trash2, 
    title: "Clear Queue", 
    desc: "Quickly clear all jobs when needed for development or reset" 
  },
];

export default function QueueDashboardPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <LayoutDashboard className="w-3 h-3 mr-1.5" />
          Queue Management
        </Badge>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Queue Dashboard</h1>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">v1.2.4</Badge>
        </div>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Built-in web dashboard for monitoring and managing your background job queues. 
          Inspired by Laravel Horizon, the Queue Dashboard provides real-time visibility 
          into your job processing pipeline.
        </p>
      </div>

      {/* Features Grid */}
      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div 
              key={item.title} 
              className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-blue-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Setup */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Activity className="w-5 h-5 text-green-400" />
          </div>
          Quick Setup
        </h2>
        <p className="text-zinc-400 mb-6">
          Mount the Queue Dashboard in your application with just a few lines of code. 
          The dashboard will be available at <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">/canx-queue</code>.
        </p>
        <CodePreview code={queueSetupExample} filename="app.ts" />
      </section>

      {/* Working with Jobs */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          Working with Jobs
        </h2>
        <p className="text-zinc-400 mb-6">
          Dispatch background jobs to queues and process them asynchronously. 
          Jobs can be immediate or delayed.
        </p>
        <CodePreview code={queueJobExample} filename="jobs.ts" />
      </section>

      {/* Queue API */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <BarChart3 className="w-5 h-5 text-orange-400" />
          </div>
          Queue API
        </h2>
        <p className="text-zinc-400 mb-6">
          Programmatically interact with the queue using the Queue API. 
          Get statistics, manage failed jobs, and more.
        </p>
        <CodePreview code={queueStatsExample} filename="queue-api.ts" />
      </section>

      {/* API Endpoints */}
      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4">Dashboard API Endpoints</h2>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-400 border-b border-white/[0.08]">
                <th className="pb-3 font-medium">Method</th>
                <th className="pb-3 font-medium">Endpoint</th>
                <th className="pb-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-white/[0.05]">
                <td className="py-3"><Badge className="bg-green-500/20 text-green-400">GET</Badge></td>
                <td className="py-3 font-mono text-xs">/canx-queue/api/stats</td>
                <td className="py-3 text-zinc-400">Get queue statistics</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3"><Badge className="bg-green-500/20 text-green-400">GET</Badge></td>
                <td className="py-3 font-mono text-xs">/canx-queue/api/jobs/failed</td>
                <td className="py-3 text-zinc-400">List failed jobs</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3"><Badge className="bg-green-500/20 text-green-400">GET</Badge></td>
                <td className="py-3 font-mono text-xs">/canx-queue/api/jobs/pending</td>
                <td className="py-3 text-zinc-400">List pending jobs</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3"><Badge className="bg-blue-500/20 text-blue-400">POST</Badge></td>
                <td className="py-3 font-mono text-xs">/canx-queue/api/jobs/retry/:id</td>
                <td className="py-3 text-zinc-400">Retry a failed job</td>
              </tr>
              <tr>
                <td className="py-3"><Badge className="bg-blue-500/20 text-blue-400">POST</Badge></td>
                <td className="py-3 font-mono text-xs">/canx-queue/api/clear</td>
                <td className="py-3 text-zinc-400">Clear all jobs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Queue Drivers */}
      <section className="mb-16 animate-slide-up delay-500">
        <h2 className="text-2xl font-semibold text-white mb-4">Queue Drivers</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
            <h3 className="font-semibold text-white mb-2">Memory Driver</h3>
            <p className="text-sm text-zinc-500 mb-3">
              Default driver, perfect for development and testing. Jobs are stored in memory.
            </p>
            <code className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded">MemoryDriver</code>
          </div>
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
            <h3 className="font-semibold text-white mb-2">Redis Driver</h3>
            <p className="text-sm text-zinc-500 mb-3">
              Production-ready driver with persistence. Requires Redis server.
            </p>
            <code className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded">RedisDriver</code>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-600">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">
            Learn more about background job processing and event-driven architecture.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/websockets">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                WebSockets
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/hotwire">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                HotWire Protocol
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
