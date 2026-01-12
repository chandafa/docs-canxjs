"use client";

import { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";

type PackageManager = "bun" | "npm" | "yarn";

interface Commands {
  create: string;
  install: string;
  dev: string;
  add: string;
}

const packageManagers: Record<PackageManager, Commands> = {
  bun: {
    create: "bunx create-canx my-app",
    install: "bun install",
    dev: "bun run dev",
    add: "bun add canxjs",
  },
  npm: {
    create: "npx create-canx@latest my-app",
    install: "npm install",
    dev: "npm run dev",
    add: "npm install canxjs",
  },
  yarn: {
    create: "yarn dlx create-canx my-app",
    install: "yarn",
    dev: "yarn dev",
    add: "yarn add canxjs",
  },
};

interface PackageManagerTabsProps {
  showInstall?: boolean;
  className?: string;
}

export function PackageManagerTabs({ showInstall = false, className = "" }: PackageManagerTabsProps) {
  const [selected, setSelected] = useState<PackageManager>("bun");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("preferred-package-manager") as PackageManager;
    if (saved && packageManagers[saved]) {
      setSelected(saved);
    }
  }, []);

  const handleSelect = (pm: PackageManager) => {
    setSelected(pm);
    localStorage.setItem("preferred-package-manager", pm);
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const commands = packageManagers[selected];
  const displayCommand = showInstall ? commands.add : commands.create;

  return (
    <div className={`w-full ${className}`}>
      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl w-fit mx-auto mb-4">
        {(Object.keys(packageManagers) as PackageManager[]).map((pm) => (
          <button
            key={pm}
            onClick={() => handleSelect(pm)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              selected === pm
                ? "bg-white dark:bg-zinc-700 text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {pm}
          </button>
        ))}
      </div>

      {/* Command Display */}
      <div className="bg-zinc-950 rounded-xl p-4 flex items-center justify-between gap-4 max-w-xl mx-auto">
        <code className="text-zinc-300 text-sm sm:text-base font-mono overflow-x-auto">
          <span className="text-zinc-500 select-none">$ </span>
          {displayCommand}
        </code>
        <button
          onClick={() => handleCopy(displayCommand)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-zinc-400" />
          )}
        </button>
      </div>
    </div>
  );
}

interface InstallCommandsProps {
  className?: string;
}

export function InstallCommands({ className = "" }: InstallCommandsProps) {
  const [selected, setSelected] = useState<PackageManager>("bun");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("preferred-package-manager") as PackageManager;
    if (saved && packageManagers[saved]) {
      setSelected(saved);
    }
  }, []);

  const handleSelect = (pm: PackageManager) => {
    setSelected(pm);
    localStorage.setItem("preferred-package-manager", pm);
  };

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const commands = packageManagers[selected];
  const steps = [
    { code: commands.create, desc: "Create a new project" },
    { code: "cd my-app", desc: "Navigate to project" },
    { code: commands.install, desc: "Install dependencies" },
    { code: commands.dev, desc: "Start development server" },
  ];

  return (
    <div className={className}>
      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl w-fit mb-4">
        {(Object.keys(packageManagers) as PackageManager[]).map((pm) => (
          <button
            key={pm}
            onClick={() => handleSelect(pm)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              selected === pm
                ? "bg-white dark:bg-zinc-700 text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {pm}
          </button>
        ))}
      </div>

      {/* Commands */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="bg-zinc-950 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-zinc-500 text-sm font-mono">{index + 1}</span>
                <code className="text-zinc-300 font-mono">{step.code}</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 hidden sm:inline">{step.desc}</span>
                <button
                  onClick={() => handleCopy(step.code, index)}
                  className="p-2 hover:bg-white/10 rounded-md transition-colors"
                  aria-label="Copy to clipboard"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
