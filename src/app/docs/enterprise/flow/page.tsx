import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  Workflow, 
  ChevronRight,
  ArrowRight,
  Timer,
  Database,
  RefreshCw,
  Shield
} from "lucide-react";

export const metadata: Metadata = {
  title: "Canx Flow - Durable Execution",
  description: "Fault-tolerant workflow engine that survives server restarts and crashes. Build long-running, reliable business processes.",
  openGraph: {
    title: "Canx Flow - Durable Execution",
    description: "Fault-tolerant workflow engine with automatic state persistence and recovery.",
  },
};

const defineWorkflowCode = `import { workflow } from 'canxjs';

const subscriptionFlow = workflow('subscription', async (ctx, userId) => {
  
  // Step 1: Charge
  await ctx.step('charge', () => payment.charge(userId));

  // Step 2: Sleep (Durable)
  // Server can be offline during this time
  await ctx.sleep('trial', 30 * 24 * 3600 * 1000); // 30 days

  // Step 3: Renew
  await ctx.step('renew', () => payment.renew(userId));

});`;

const startWorkflowCode = `// Start async (returns workflow ID)
const id = await subscriptionFlow.start('user-123');

// Check status
const status = await subscriptionFlow.status(id);
// { state: 'sleeping', step: 'trial', resumeAt: '2024-03-15T...' }

// Cancel if needed
await subscriptionFlow.cancel(id);`;

const stepTypesCode = `const orderFlow = workflow('order-processing', async (ctx, orderId) => {
  
  // Regular step - executed once, result cached
  const order = await ctx.step('fetch-order', () => {
    return db.orders.find(orderId);
  });

  // Conditional step
  if (order.requiresApproval) {
    await ctx.step('wait-approval', () => {
      return notifyManager(order);
    });
    
    // Durable sleep - survives restarts
    await ctx.sleep('approval-timeout', 24 * 60 * 60 * 1000); // 24h
  }

  // Side effect step
  await ctx.step('send-confirmation', () => {
    return email.send(order.customerEmail, 'Order Confirmed');
  });
  
});`;

const features = [
  { 
    icon: Database, 
    title: "State Persistence", 
    desc: "Every step is persisted to the database. Resume from exactly where you left off.",
    color: "blue"
  },
  { 
    icon: Timer, 
    title: "Durable Timers", 
    desc: "Sleep for days, weeks, or months. The server can restart without losing progress.",
    color: "green"
  },
  { 
    icon: RefreshCw, 
    title: "Automatic Retry", 
    desc: "Failed steps are automatically retried with exponential backoff.",
    color: "purple"
  },
  { 
    icon: Shield, 
    title: "Fault Tolerant", 
    desc: "Survives crashes, restarts, and deployments. Your workflows always complete.",
    color: "orange"
  },
];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400",
  green: "bg-green-500/10 text-green-400",
  purple: "bg-purple-500/10 text-purple-400",
  orange: "bg-orange-500/10 text-orange-400",
};

export default function FlowDocs() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Workflow className="w-3 h-3 mr-1.5" />
          Enterprise
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Canx Flow</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Fault-tolerant workflow engine that survives server restarts and crashes. 
          Build long-running business processes that never lose state.
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
              <div className={`p-2 rounded-lg w-fit mb-3 ${colorClasses[item.color]}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Canx Flow */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Why Canx Flow?</h2>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 mb-6">
          <p className="text-zinc-400 leading-relaxed">
            Standard code fails if the server restarts in the middle of execution. 
            <strong className="text-white"> Canx Flow</strong> persists the execution state to the database after every step.
            If the server crashes, it resumes automatically from the last successful step.
          </p>
        </div>
      </section>

      {/* Defining a Workflow */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Workflow className="w-5 h-5 text-blue-400" />
          </div>
          Defining a Workflow
        </h2>
        <p className="text-zinc-400 mb-6">
          Create workflows using the <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">workflow()</code> function. 
          Each step is persisted and can be resumed if interrupted.
        </p>
        <CodePreview code={defineWorkflowCode} filename="workflows/subscription.ts" />
      </section>

      {/* Starting a Workflow */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <RefreshCw className="w-5 h-5 text-green-400" />
          </div>
          Starting & Managing Workflows
        </h2>
        <p className="text-zinc-400 mb-6">
          Start workflows asynchronously and manage their lifecycle. Check status, cancel, or retry as needed.
        </p>
        <CodePreview code={startWorkflowCode} filename="app.ts" />
      </section>

      {/* Step Types */}
      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Database className="w-5 h-5 text-purple-400" />
          </div>
          Step Types
        </h2>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-400 border-b border-white/[0.08]">
                <th className="pb-3 font-medium">Method</th>
                <th className="pb-3 font-medium">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs">ctx.step(name, fn)</td>
                <td className="py-3 text-zinc-400">Execute once, cache result</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs">ctx.sleep(name, ms)</td>
                <td className="py-3 text-zinc-400">Durable timer that survives restarts</td>
              </tr>
              <tr>
                <td className="py-3 font-mono text-xs">ctx.waitFor(name, event)</td>
                <td className="py-3 text-zinc-400">Wait for external event</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodePreview code={stepTypesCode} filename="workflows/order.ts" />
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-500">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">
            Explore other enterprise features to build scalable distributed systems.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/enterprise/microservices">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Microservices
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/queue">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
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
