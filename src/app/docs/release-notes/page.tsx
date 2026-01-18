import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";

export default function ReleaseNotesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          Release Notes
        </h1>
        <p className="text-xl text-zinc-400">
          Stay up to date with the latest improvements and features in CanxJS.
        </p>
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
          <div className="flex items-center gap-4">
             <h2 className="text-3xl font-bold text-white">v1.4.1</h2>
             <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Current</Badge>
             <span className="text-zinc-500">January 2026</span>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">New Features</h3>
            
            <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                    <h4 className="font-medium text-white mb-2">Task Scheduler</h4>
                    <p className="text-zinc-400 text-sm">
                        A robust cron-style task scheduler has been added, allowing you to schedule repeated tasks directly from your code without relying on the operating system's crontab.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                    <h4 className="font-medium text-white mb-2">Events System</h4>
                    <p className="text-zinc-400 text-sm">
                        A fully-featured event observer implementation. You can now define Event classes and Listeners to decouple your application logic.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                    <h4 className="font-medium text-white mb-2">Notification System</h4>
                    <p className="text-zinc-400 text-sm">
                         Added support for sending notifications via multiple channels (Email, Database, SMS). Includes a fluent API for constructing messages.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                    <h4 className="font-medium text-white mb-2">Storage System</h4>
                    <p className="text-zinc-400 text-sm">
                        introduced a powerful file storage abstraction with support for Local and S3 drivers, making file handling seamless across environments.
                    </p>
                </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
           <div className="flex items-center gap-4">
             <h2 className="text-3xl font-bold text-zinc-500">v1.0.0</h2>
             <span className="text-zinc-500">December 2025</span>
          </div>
           <p className="text-zinc-400">
             Initial release of CanxJS, featuring the core ultra-fast HTTP server, routing engine, and dependency injection container.
           </p>
        </section>
      </div>
    </div>
  );
}
