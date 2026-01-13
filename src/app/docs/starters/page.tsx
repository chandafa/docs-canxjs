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
  ExternalLink,
  FolderTree,
  Users,
  CreditCard,
  LayoutDashboard,
  Terminal,
  Github
} from "lucide-react";

const starterKits = [
  { 
    id: "basic",
    name: "Canx Basic", 
    desc: "Full MVC application with authentication, dashboard, and Tailwind CSS styling. Perfect for building web applications with server-side rendering.",
    icon: "🏗️",
    color: "blue",
    features: ["Login & Register", "Dashboard UI", "Tailwind CSS", "Session Auth", "Queue Dashboard"],
    command: "bunx degit chandafa/canx-starters/basic my-app",
    npm: "canx-starter-basic",
    routes: ["/", "/auth/login", "/auth/register", "/dashboard", "/profile"],
    structure: `src/
├── controllers/
│   ├── AuthController.ts
│   ├── DashboardController.ts
│   └── WelcomeController.ts
├── views/
│   ├── layouts/
│   └── pages/
├── routes.ts
└── app.ts`
  },
  { 
    id: "api",
    name: "Canx API", 
    desc: "Minimal REST API starter with JWT authentication. Ideal for building backend services, mobile app backends, or microservices.",
    icon: "⚡",
    color: "green",
    features: ["JWT Auth", "API Routes", "Validation", "Error Handling", "TypeScript"],
    command: "bunx degit chandafa/canx-starters/api my-api",
    npm: "canx-starter-api",
    routes: ["/api/auth/login", "/api/auth/register", "/api/users", "/api/users/:id"],
    structure: `src/
├── controllers/
│   ├── AuthController.ts
│   └── UserController.ts
├── middlewares/
│   └── auth.ts
├── routes.ts
└── app.ts`
  },
  { 
    id: "admin",
    name: "Canx Admin", 
    desc: "Admin dashboard template with data tables, stats cards, and CRUD operations. Build back-office applications quickly.",
    icon: "🛠️",
    color: "purple",
    features: ["Admin Dashboard", "Data Tables", "User Management", "Stats Cards", "Sidebar Layout"],
    command: "bunx degit chandafa/canx-starters/admin my-admin",
    npm: "canx-starter-admin",
    routes: ["/", "/users", "/users/create", "/auth/login", "/canx-queue"],
    structure: `src/
├── controllers/
│   ├── AuthController.ts
│   ├── DashboardController.ts
│   └── UserController.ts
├── views/
│   └── layouts/
│       └── admin.ts
├── routes.ts
└── app.ts`
  },
  { 
    id: "saas",
    name: "Canx SaaS", 
    desc: "Complete SaaS starter with multi-tenancy, team management, and billing-ready infrastructure. Launch your SaaS product faster.",
    icon: "💼",
    color: "pink",
    features: ["Multi-tenancy", "Team Management", "Billing Ready", "Subscription Plans", "Landing Page"],
    command: "bunx degit chandafa/canx-starters/saas my-saas",
    npm: "canx-starter-saas",
    routes: ["/", "/pricing", "/dashboard", "/team", "/billing", "/auth/login"],
    structure: `src/
├── controllers/
│   ├── AuthController.ts
│   ├── BillingController.ts
│   ├── DashboardController.ts
│   ├── HomeController.ts
│   └── TeamController.ts
├── middleware/
│   └── tenant.ts
├── views/
│   └── layouts/
│       └── saas.ts
├── routes.ts
└── app.ts`
  },
];

const quickStartSteps = [
  { step: 1, title: "Clone the starter", cmd: "bunx degit chandafa/canx-starters/basic my-app" },
  { step: 2, title: "Install dependencies", cmd: "cd my-app && bun install" },
  { step: 3, title: "Start development", cmd: "bun run dev" },
];

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

function StarterCard({ kit }: { kit: typeof starterKits[0] }) {
  const [showDetails, setShowDetails] = useState(false);
  
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/5 border-blue-500/20",
    green: "from-green-500/20 to-green-600/5 border-green-500/20",
    purple: "from-purple-500/20 to-purple-600/5 border-purple-500/20",
    pink: "from-pink-500/20 to-pink-600/5 border-pink-500/20",
  };

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${colorClasses[kit.color as keyof typeof colorClasses]} border p-6 transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{kit.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-white">{kit.name}</h3>
            <code className="text-xs text-zinc-500">{kit.npm}</code>
          </div>
        </div>
        <a 
          href={`https://github.com/chandafa/canx-starters/tree/main/${kit.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
      
      {/* Description */}
      <p className="text-zinc-400 mb-4">{kit.desc}</p>
      
      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-6">
        {kit.features.map((feature) => (
          <Badge 
            key={feature} 
            variant="secondary" 
            className="bg-white/[0.08] border-white/[0.1] text-zinc-300"
          >
            {feature}
          </Badge>
        ))}
      </div>
      
      {/* Clone Command */}
      <div className="flex items-center gap-2 bg-black/30 rounded-xl px-4 py-3 border border-white/[0.05] mb-4">
        <Terminal className="w-4 h-4 text-zinc-500" />
        <code className="flex-1 text-zinc-300 text-sm font-mono truncate">
          {kit.command}
        </code>
        <CopyButton text={kit.command} />
      </div>
      
      {/* Toggle Details */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
      >
        {showDetails ? "Hide" : "Show"} project structure
        <ChevronRight className={`w-4 h-4 transition-transform ${showDetails ? "rotate-90" : ""}`} />
      </button>
      
      {/* Details */}
      {showDetails && (
        <div className="mt-4 space-y-4 animate-fade-in">
          {/* Project Structure */}
          <div>
            <h4 className="text-sm font-medium text-zinc-400 mb-2">Project Structure</h4>
            <pre className="text-xs text-zinc-500 bg-black/30 rounded-lg p-3 overflow-x-auto">
              {kit.structure}
            </pre>
          </div>
          
          {/* Available Routes */}
          <div>
            <h4 className="text-sm font-medium text-zinc-400 mb-2">Available Routes</h4>
            <div className="flex flex-wrap gap-2">
              {kit.routes.map((route) => (
                <code key={route} className="text-xs text-zinc-400 bg-black/30 px-2 py-1 rounded">
                  {route}
                </code>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
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
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">4 Kits</Badge>
        </div>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Pre-built application templates to jumpstart your development. 
          Clone, install, and start building in under a minute.
        </p>
      </div>

      {/* Quick Start */}
      <section className="mb-16 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Zap className="w-5 h-5 text-green-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Quick Start</h2>
        </div>
        
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6">
          <div className="grid md:grid-cols-3 gap-4">
            {quickStartSteps.map((item) => (
              <div key={item.step} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                    {item.step}
                  </span>
                  <span className="text-sm font-medium text-zinc-300">{item.title}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-2">
                  <code className="text-xs text-zinc-400 font-mono truncate flex-1">{item.cmd}</code>
                  <CopyButton text={item.cmd} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Starter Kits */}
      <section className="mb-16 animate-slide-up delay-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Available Starters</h2>
          <a 
            href="https://github.com/chandafa/canx-starters" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            View on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        
        <div className="grid gap-6">
          {starterKits.map((kit) => (
            <StarterCard key={kit.id} kit={kit} />
          ))}
        </div>
      </section>

      {/* Features Comparison */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-6">Features Comparison</h2>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-400 bg-white/[0.02]">
                <th className="p-4 font-medium">Feature</th>
                <th className="p-4 font-medium text-center">🏗️ Basic</th>
                <th className="p-4 font-medium text-center">⚡ API</th>
                <th className="p-4 font-medium text-center">🛠️ Admin</th>
                <th className="p-4 font-medium text-center">💼 SaaS</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-t border-white/[0.05]">
                <td className="p-4 flex items-center gap-2"><Shield className="w-4 h-4 text-zinc-500" />Authentication</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
              <tr className="border-t border-white/[0.05]">
                <td className="p-4 flex items-center gap-2"><LayoutDashboard className="w-4 h-4 text-zinc-500" />Dashboard UI</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
              <tr className="border-t border-white/[0.05]">
                <td className="p-4 flex items-center gap-2"><Layers className="w-4 h-4 text-zinc-500" />Tailwind CSS</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
              <tr className="border-t border-white/[0.05]">
                <td className="p-4 flex items-center gap-2"><FolderTree className="w-4 h-4 text-zinc-500" />Data Tables / CRUD</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
              <tr className="border-t border-white/[0.05]">
                <td className="p-4 flex items-center gap-2"><Users className="w-4 h-4 text-zinc-500" />Multi-tenancy</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
              <tr className="border-t border-white/[0.05]">
                <td className="p-4 flex items-center gap-2"><CreditCard className="w-4 h-4 text-zinc-500" />Billing / Stripe</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
              <tr className="border-t border-white/[0.05]">
                <td className="p-4 flex items-center gap-2"><Users className="w-4 h-4 text-zinc-500" />Team Management</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center text-zinc-600">—</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Which Starter to Choose */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-6">Which Starter Should I Use?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <span className="text-2xl mb-2 block">🏗️</span>
            <h3 className="font-semibold text-white mb-2">Basic</h3>
            <p className="text-sm text-zinc-400">
              Choose this if you're building a <strong className="text-zinc-300">web application</strong> with 
              user authentication, profile pages, and server-rendered views.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <span className="text-2xl mb-2 block">⚡</span>
            <h3 className="font-semibold text-white mb-2">API</h3>
            <p className="text-sm text-zinc-400">
              Choose this if you're building a <strong className="text-zinc-300">REST API</strong>, 
              mobile app backend, or microservice without any frontend.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <span className="text-2xl mb-2 block">🛠️</span>
            <h3 className="font-semibold text-white mb-2">Admin</h3>
            <p className="text-sm text-zinc-400">
              Choose this if you're building an <strong className="text-zinc-300">admin panel</strong>, 
              internal tool, or back-office application with data management.
            </p>
          </div>
          <div className="rounded-2xl bg-pink-500/10 border border-pink-500/20 p-5">
            <span className="text-2xl mb-2 block">💼</span>
            <h3 className="font-semibold text-white mb-2">SaaS</h3>
            <p className="text-sm text-zinc-400">
              Choose this if you're building a <strong className="text-zinc-300">SaaS product</strong> with 
              multiple workspaces, team features, and subscription billing.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-400">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Ready to Build?</h3>
          <p className="text-zinc-400 mb-6">
            Pick a starter and start building your next great project. 
            All starters include the Queue Dashboard at <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">/canx-queue</code>.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/controllers">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Learn Controllers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/queue">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Queue Dashboard
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href="https://github.com/chandafa/canx-starters" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
