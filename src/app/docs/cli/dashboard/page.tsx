import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { LayoutDashboard, ChevronRight, ArrowRight, Activity, Server, Database, Zap } from "lucide-react";

const studioCommand = `bun run canx studio`;

const devToolsExample = `import { createApp, DevToolsModule } from "canxjs";

const app = createApp({
  imports: [
    // Registers the API endpoints for the Studio
    DevToolsModule
  ],
  port: 3000
});`;

const features = [
  { icon: Activity, title: "Real-Time Stats", desc: "Monitor RPS, Memory, and Uptime instantly." },
  { icon: Server, title: "Route Inspector", desc: "View all registered routes and controllers." },
  { icon: Database, title: "Module Graph", desc: "Visualize your module dependencies." },
  { icon: Zap, title: "Zero Config", desc: "Connects automatically to your running app." },
];

export default function DashboardPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <LayoutDashboard className="w-3 h-3 mr-1.5" />New Feature
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">CanxJS Studio</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          A powerful TUI (Terminal User Interface) dashboard to monitor and debug your application in real-time.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-indigo-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Getting Started</h2>
        <p className="text-zinc-400 mb-6">
          First, register the <code>DevToolsModule</code> in your application:
        </p>
        <CodePreview code={devToolsExample} filename="app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Launch Studio</h2>
        <p className="text-zinc-400 mb-6">
          In a separate terminal window, run the studio command:
        </p>
        <CodePreview code={studioCommand} filename="terminal" />
      </section>

      <section className="animate-slide-up delay-700">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Debugging</h3>
          <p className="text-zinc-400 mb-6">Learn more about the CLI tools.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/cli">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                CLI Reference<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
