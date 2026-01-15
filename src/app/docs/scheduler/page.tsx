import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Layers, ChevronRight, ArrowRight, Clock, Play } from "lucide-react";

const scheduleDefinitionExample = `// src/app.ts or src/schedule.ts
import { scheduler } from "canxjs";

// Schedule a closure to run every minute
scheduler.call(() => {
  console.log("Running every minute");
}).everyMinute();

// Schedule a command
scheduler.command("bun run cleanup").dailyAt("02:00");

// Advanced chaining
scheduler.call(async () => {
   await db.users.deleteExpired();
})
.name("cleanup-users")
.withoutOverlapping()
.every("5m");`;

const runScheduleExample = `# Run the scheduler (manual)
bun run canx schedule:run

# Setup Cron (Linux/Mac)
* * * * * cd /path/to/project && bun run canx schedule:run >> /dev/null 2>&1`;

export default function SchedulerPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Layers className="w-3 h-3 mr-1.5" />Advanced
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Task Scheduling</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Define your scheduled tasks directly in code using a fluent API, instead of managing raw crontab entries.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><Clock className="w-5 h-5 text-blue-400" /></div>
          Defining Schedules
        </h2>
        <p className="text-zinc-400 mb-6">
          You can define tasks using <code>scheduler.call()</code> or <code>scheduler.command()</code>.
        </p>
        <CodePreview code={scheduleDefinitionExample} filename="src/schedule.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10"><Play className="w-5 h-5 text-green-400" /></div>
          Running the Scheduler
        </h2>
        <p className="text-zinc-400 mb-6">
          On your server, you only need to add a single cron entry that runs the `canx schedule:run` command every minute.
        </p>
        <CodePreview code={runScheduleExample} filename="Terminal/Crontab" showLineNumbers={false} />
      </section>

      <section className="animate-slide-up delay-200">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Optimize your application performance with caching.</p>
          <div className="flex flex-wrap gap-4">
             <Link href="/docs/caching">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Caching<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
