"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TerminalPreview, CodePreview } from "@/components/ui/TerminalPreview";
import { 
  Check, 
  Copy, 
  Folder, 
  BookOpen, 
  GraduationCap, 
  Terminal, 
  Package,
  ArrowRight,
  ChevronRight,
  Zap,
  AlertCircle
} from "lucide-react";

const projectTemplates = [
  { name: "MVC Project", flag: "", desc: "Full MVC structure with views", icon: "🏗️" },
  { name: "API Only", flag: "--api", desc: "REST API without views", icon: "⚡" },
  { name: "Microservice", flag: "--micro", desc: "Minimal microservice setup", icon: "🔧" },
];

const packageManagers = [
  { id: "bun", name: "bun", command: "bunx create-canx my-app" },
  { id: "npm", name: "npm", command: "npx create-canx my-app" },
  { id: "yarn", name: "yarn", command: "yarn create canx my-app" },
  { id: "pnpm", name: "pnpm", command: "pnpm create canx my-app" },
];

const projectStructure = `my-app/
├── src/
│   ├── controllers/     # Route controllers
│   ├── models/          # Database models
│   ├── views/           # JSX view templates
│   ├── routes/          # Route definitions
│   ├── middlewares/     # Custom middlewares
│   ├── config/          # Configuration files
│   └── app.ts           # Application entry
├── public/              # Static assets
├── storage/             # File storage
├── .env                 # Environment variables
└── package.json`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 hover:bg-accent dark:hover:bg-white/10 rounded-lg transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-muted-foreground dark:text-zinc-500 hover:text-foreground dark:hover:text-zinc-300" />
      )}
    </button>
  );
}

export default function InstallationPage() {
  const [selectedPM, setSelectedPM] = useState("bun");
  const selectedCommand = packageManagers.find(pm => pm.id === selectedPM)?.command || "";

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-muted dark:bg-white/[0.05] border-border dark:border-white/[0.1] text-muted-foreground dark:text-zinc-400">
          <Terminal className="w-3 h-3 mr-1.5" />
          Getting Started
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">Installation</h1>
        <p className="text-lg text-muted-foreground dark:text-zinc-400 leading-relaxed">
          The quickest way to create a new CanxJS app is using create-canx, which sets up everything for you automatically.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="mb-12 animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Package className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-foreground dark:text-white">Prerequisites</h2>
        </div>
        
        <div className="rounded-2xl bg-muted/50 dark:bg-white/[0.02] border border-border dark:border-white/[0.08] p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="p-1 rounded-md bg-green-500/10 mt-0.5">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <span className="font-medium text-foreground dark:text-white">Bun 1.0+</span>
                <span className="text-muted-foreground dark:text-zinc-500 ml-2">— CanxJS is built specifically for Bun runtime</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-1 rounded-md bg-green-500/10 mt-0.5">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <span className="font-medium text-foreground dark:text-white">Node.js 18+</span>
                <span className="text-muted-foreground dark:text-zinc-500 ml-2">— Required for some tooling compatibility</span>
              </div>
            </li>
          </ul>
          
          <div className="mt-6 pt-6 border-t border-border dark:border-white/[0.08]">
            <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-zinc-500 mb-3">
              <AlertCircle className="w-4 h-4" />
              Don&apos;t have Bun installed?
            </div>
            <div className="flex items-center gap-2 bg-zinc-950 dark:bg-zinc-950 rounded-xl p-4 border border-border dark:border-white/[0.05]">
              <code className="flex-1 text-zinc-300 text-sm font-mono">
                curl -fsSL https://bun.sh/install | bash
              </code>
              <CopyButton text="curl -fsSL https://bun.sh/install | bash" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="mb-12 animate-slide-up delay-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Zap className="w-5 h-5 text-green-400" />
          </div>
          <h2 className="text-xl font-semibold text-foreground dark:text-white">Quick Start</h2>
        </div>
        
        <div className="rounded-2xl bg-muted/50 dark:bg-white/[0.02] border border-border dark:border-white/[0.08] overflow-hidden">
          {/* Package Manager Tabs */}
          <div className="flex items-center gap-1 p-2 bg-muted/50 dark:bg-white/[0.02] border-b border-border dark:border-white/[0.05]">
            {packageManagers.map((pm) => (
              <button
                key={pm.id}
                onClick={() => setSelectedPM(pm.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPM === pm.id
                    ? "bg-accent dark:bg-white/[0.1] text-foreground dark:text-white"
                    : "text-muted-foreground dark:text-zinc-500 hover:text-foreground dark:hover:text-zinc-300 hover:bg-accent/50 dark:hover:bg-white/[0.05]"
                }`}
              >
                {pm.name}
              </button>
            ))}
          </div>

          {/* Command */}
          <div className="p-6">
            <div className="flex items-center gap-2 bg-zinc-950 dark:bg-zinc-950 rounded-xl p-4 border border-border dark:border-white/[0.05]">
              <span className="text-zinc-600 font-mono">$</span>
              <code className="flex-1 text-foreground dark:text-white font-mono">{selectedCommand}</code>
              <CopyButton text={selectedCommand} />
            </div>
            
            <p className="text-sm text-muted-foreground dark:text-zinc-500 mt-4">
              This will create a new directory called <code className="px-1.5 py-0.5 rounded bg-muted dark:bg-white/[0.05] text-foreground dark:text-zinc-300 font-mono">my-app</code> with a complete CanxJS project.
            </p>
          </div>
        </div>
      </section>

      {/* Project Templates */}
      <section className="mb-12 animate-slide-up delay-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Folder className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-foreground dark:text-white">Project Templates</h2>
        </div>
        
        <div className="grid gap-4">
          {projectTemplates.map((template) => (
            <div 
              key={template.name} 
              className="rounded-2xl bg-muted/50 dark:bg-white/[0.02] border border-border dark:border-white/[0.08] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-accent/50 dark:hover:bg-white/[0.04] hover:border-border dark:hover:border-white/[0.12] transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{template.icon}</span>
                <div>
                  <h3 className="font-semibold text-foreground dark:text-white">{template.name}</h3>
                  <p className="text-sm text-muted-foreground dark:text-zinc-500">{template.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-zinc-950 dark:bg-zinc-950 rounded-lg px-4 py-2.5 border border-border dark:border-white/[0.05]">
                <code className="text-zinc-300 text-sm font-mono whitespace-nowrap">
                  bunx create-canx my-app {template.flag}
                </code>
                <CopyButton text={`bunx create-canx my-app ${template.flag}`.trim()} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Structure */}
      <section className="mb-12 animate-slide-up delay-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Folder className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-xl font-semibold text-foreground dark:text-white">Project Structure</h2>
        </div>
        
        <CodePreview 
          code={projectStructure}
          filename="project-structure"
          showLineNumbers={false}
        />
      </section>

      {/* Running the App */}
      <section className="mb-12 animate-slide-up delay-400">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/10">
            <Terminal className="w-5 h-5 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold text-foreground dark:text-white">Running Your App</h2>
        </div>
        
        <TerminalPreview 
          commands={[
            "cd my-app",
            "bun install",
            "bun run dev"
          ]}
          title="Terminal"
          animated={false}
        />
        
        <p className="text-sm text-muted-foreground dark:text-zinc-500 mt-4">
          Your app will start at <code className="px-1.5 py-0.5 rounded bg-muted dark:bg-white/[0.05] text-foreground dark:text-zinc-300 font-mono">http://localhost:3000</code>
        </p>
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-500">
        <h2 className="text-xl font-semibold text-foreground dark:text-white mb-4">Next Steps</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link 
            href="/docs/core-concepts" 
            className="group rounded-2xl bg-muted/50 dark:bg-white/[0.02] border border-border dark:border-white/[0.08] p-6 hover:bg-accent/50 dark:hover:bg-white/[0.04] hover:border-border dark:hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-foreground dark:text-white">Core Concepts</h3>
            </div>
            <p className="text-sm text-muted-foreground dark:text-zinc-500 group-hover:text-muted-foreground dark:group-hover:text-zinc-400 transition-colors">
              Learn the fundamentals of CanxJS
            </p>
            <ChevronRight className="w-4 h-4 text-muted-foreground dark:text-zinc-600 group-hover:text-foreground dark:group-hover:text-zinc-400 group-hover:translate-x-1 transition-all mt-3" />
          </Link>
          
          <Link 
            href="/learn" 
            className="group rounded-2xl bg-muted/50 dark:bg-white/[0.02] border border-border dark:border-white/[0.08] p-6 hover:bg-accent/50 dark:hover:bg-white/[0.04] hover:border-border dark:hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                <GraduationCap className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-semibold text-foreground dark:text-white">Tutorials</h3>
            </div>
            <p className="text-sm text-muted-foreground dark:text-zinc-500 group-hover:text-muted-foreground dark:group-hover:text-zinc-400 transition-colors">
              Step-by-step guides for common use cases
            </p>
            <ChevronRight className="w-4 h-4 text-muted-foreground dark:text-zinc-600 group-hover:text-foreground dark:group-hover:text-zinc-400 group-hover:translate-x-1 transition-all mt-3" />
          </Link>
        </div>
      </section>
    </div>
  );
}
