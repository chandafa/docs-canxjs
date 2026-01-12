import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";
import { TerminalPreview } from "@/components/ui/TerminalPreview";

export default function CliPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Terminal className="w-3 h-3 mr-1.5" />
          CLI Tool
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Command Line Interface</h1>
        <p className="text-lg text-zinc-400 leading-relaxed mb-8">
          The CanxJS CLI helps you scaffold new applications and generate code snippets.
        </p>
      </div>

      {/* Installation */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Global Installation</h2>
        <p className="text-zinc-400 mb-4">
          You don't need to install the CLI globally. We recommend using `bunx` to run commands.
        </p>
        <TerminalPreview 
          commands={["bunx create-canx my-app"]} 
          title="Create a new project"
        />
      </section>

      {/* Commands */}
      <section className="space-y-12">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <h3 className="text-xl font-bold text-white mb-4">create-canx</h3>
          <p className="text-zinc-400 mb-6">
            Scaffolds a new CanxJS application with all dependencies installed.
          </p>
          
          <div className="grid gap-4">
            <CommandOption flag="[directory]" description="The name of the directory to create (default: canx-app)" />
            <CommandOption flag="--template" description="Choose a starter template (api, web, minimal)" />
            <CommandOption flag="--ts, --typescript" description="Initialize as a TypeScript project (default)" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <h3 className="text-xl font-bold text-white mb-4">canx make:controller</h3>
          <p className="text-zinc-400 mb-6">
            Generates a new controller file.
          </p>
          <TerminalPreview 
            commands={["bunx canx make:controller UsersController"]} 
            title="Generate Controller"
            animated={false}
          />
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <h3 className="text-xl font-bold text-white mb-4">canx make:model</h3>
          <p className="text-zinc-400 mb-6">
            Generates a new model file.
          </p>
          <TerminalPreview 
            commands={["bunx canx make:model User"]} 
            title="Generate Model"
            animated={false}
          />
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <h3 className="text-xl font-bold text-white mb-4">canx migrate</h3>
          <p className="text-zinc-400 mb-6">
            Runs pending database migrations.
          </p>
          <TerminalPreview 
            commands={["bunx canx migrate"]} 
            title="Run Migrations"
            animated={false}
          />
        </div>
      </section>
    </div>
  );
}

function CommandOption({ flag, description }: { flag: string; description: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 p-3 rounded-lg bg-black/20">
      <code className="text-purple-400 font-mono text-sm shrink-0">{flag}</code>
      <span className="text-zinc-400 text-sm">{description}</span>
    </div>
  );
}
