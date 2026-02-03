import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Layers, ArrowRight, Zap, RefreshCw, LayoutTemplate } from "lucide-react";

const setupExample = `// src/config/app.ts
export const config = {
  // ...
  inertia: {
    rootView: 'app', // views/app.tsx or views/app.ejs
    shared: (req) => ({
      auth: {
        user: req.user,
      },
      flash: {
        success: req.session.get('success'),
        error: req.session.get('error'),
      }
    }),
  }
};`;

const controllerExample = `// src/controllers/DashboardController.ts
import { Controller } from "canxjs/controller";
import { Inertia } from "canxjs";

export class DashboardController extends Controller {
  @Get("/")
  async index() {
    // Render the "Dashboard" component with props
    return Inertia.render("Dashboard", {
      stats: {
        users: 100,
        revenue: 5000
      }
    });
  }
}`;

const frontendExample = `// resources/js/app.tsx (React)
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
    return pages[\`./Pages/\${name}.tsx\`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});`;

const features = [
  { icon: Layers, title: "Modern Monolith", desc: "Build SPAs using classic server-side routing and controllers." },
  { icon: Zap, title: "No API Required", desc: "Pass data directly to components. No REST/GraphQL needed." },
  { icon: RefreshCw, title: "Shared Data", desc: "Share data like Auth logic automatically across all pages." },
  { icon: LayoutTemplate, title: "Asset Versioning", desc: "Automatic reload when assets change." },
];

export default function InertiaPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Layers className="w-3 h-3 mr-1.5" />Frontend
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Inertia.js Integration</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          The Modern Monolith. Build single-page apps without building an API. 
          Seamlessly connect your React/Vue/Svelte frontend with your CanxJS backend.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-purple-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Configuration</h2>
        <p className="text-zinc-400 mb-6">Configure the root view and shared data in your app config.</p>
        <CodePreview code={setupExample} filename="src/config/app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Server-Side Usage</h2>
        <p className="text-zinc-400 mb-6">Return <code>Inertia.render</code> from your controllers.</p>
        <CodePreview code={controllerExample} filename="src/controllers/DashboardController.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Client-Side Usage</h2>
        <p className="text-zinc-400 mb-6">Initialize the Inertia app in your frontend entry point.</p>
        <CodePreview code={frontendExample} filename="resources/js/app.tsx" />
      </section>

      <section className="animate-slide-up delay-400">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Combine with Vite</h3>
          <p className="text-zinc-400 mb-6">Inertia works best with Vite for lightning fast HMR.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/vite">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Vite Integration <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
