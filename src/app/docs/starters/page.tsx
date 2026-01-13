"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TerminalPreview, CodePreview } from "@/components/ui/TerminalPreview";
import { 
  Package, 
  Rocket,
  Layers,
  Zap,
  Shield,
  ChevronRight,
  ArrowRight,
  Check,
  Copy,
  ExternalLink
} from "lucide-react";

const starterKits = [
  { 
    id: "basic",
    name: "Canx Basic", 
    desc: "Full MVC application with authentication, dashboard, and Tailwind CSS styling",
    icon: "🏗️",
    features: ["Login & Register", "Dashboard UI", "Tailwind CSS", "Session Auth"],
    command: "bunx create-canx my-app"
  },
  { 
    id: "api",
    name: "Canx API", 
    desc: "Minimal REST API with token-based authentication",
    icon: "⚡",
    features: ["JWT Auth", "API Routes", "Validation", "Error Handling"],
    command: "bunx create-canx my-api --api"
  },
  { 
    id: "admin",
    name: "Canx Admin", 
    desc: "Admin panel scaffold with CRUD generators",
    icon: "🛠️",
    features: ["Admin Dashboard", "CRUD Generator", "Data Tables", "Charts"],
    command: "bunx create-canx my-admin --admin"
  },
  { 
    id: "saas",
    name: "Canx SaaS", 
    desc: "SaaS starter with multi-tenancy and billing integration",
    icon: "💼",
    features: ["Multi-tenancy", "Stripe Integration", "Team Management", "Subscriptions"],
    command: "bunx create-canx my-saas --saas"
  },
];

const basicRoutesExample = `import { createApp, QueueController } from "canxjs";
import { HomeController } from "./controllers/HomeController";
import { AuthController } from "./controllers/AuthController";

const app = createApp({ port: 3000 });

app.routes((router) => {
  // Controller-based routing (v1.2.1+)
  router.controller('/', HomeController);
  router.controller('/auth', AuthController);
  
  // Queue Dashboard
  router.controller('/canx-queue', QueueController);
});

app.listen();`;

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
      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-zinc-500 hover:text-zinc-300" />
      )}
    </button>
  );
}

export default function StarterKitsPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Package className="w-3 h-3 mr-1.5" />
          Ecosystem
        </Badge>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Starter Kits</h1>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">New</Badge>
        </div>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Pre-built application templates to jumpstart your development. 
          Each starter kit includes authentication, styling, and common features 
          so you can focus on building your product.
        </p>
      </div>

      {/* Starter Kits Grid */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-white mb-6">Available Kits</h2>
        <div className="grid gap-4">
          {starterKits.map((kit) => (
            <div 
              key={kit.id} 
              className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{kit.icon}</span>
                    <h3 className="text-xl font-semibold text-white">{kit.name}</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">{kit.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {kit.features.map((feature) => (
                      <Badge 
                        key={feature} 
                        variant="secondary" 
                        className="bg-white/[0.05] border-white/[0.1] text-zinc-400"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-zinc-950 rounded-xl px-4 py-3 border border-white/[0.05] shrink-0">
                  <code className="text-zinc-300 text-sm font-mono whitespace-nowrap">
                    {kit.command}
                  </code>
                  <CopyButton text={kit.command} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Controller-based Routing */}
      <section className="mb-16 animate-slide-up delay-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Layers className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Controller-based Routing</h2>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">v1.2.1</Badge>
        </div>
        <p className="text-zinc-400 mb-6">
          New in v1.2.1: Use <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">router.controller()</code> to 
          register entire controller classes with their decorated routes. This provides cleaner, 
          more organized routing similar to Laravel.
        </p>
        <CodePreview code={basicRoutesExample} filename="routes.ts" />
      </section>

      {/* Features Comparison */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-6">Features by Kit</h2>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-400 bg-white/[0.02]">
                <th className="p-4 font-medium">Feature</th>
                <th className="p-4 font-medium text-center">Basic</th>
                <th className="p-4 font-medium text-center">API</th>
                <th className="p-4 font-medium text-center">Admin</th>
                <th className="p-4 font-medium text-center">SaaS</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-t border-white/[0.05]">
                <td className="p-4">Authentication</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
              <tr className="border-t border-white/[0.05]">
                <td className="p-4">Dashboard UI</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
              <tr className="border-t border-white/[0.05]">
                <td className="p-4">Tailwind CSS</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
              <tr className="border-t border-white/[0.05]">
                <td className="p-4">CRUD Generator</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
              <tr className="border-t border-white/[0.05]">
                <td className="p-4">Multi-tenancy</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
              <tr className="border-t border-white/[0.05]">
                <td className="p-4">Billing Integration</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-300">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">
            Choose a starter kit and start building your application today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/queue">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Queue Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/controllers">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Controllers
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
