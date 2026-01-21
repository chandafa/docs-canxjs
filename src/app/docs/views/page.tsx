import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Monitor, ChevronRight, ArrowRight, Layout, Code, Zap } from "lucide-react";

const viewExample = `// src/views/welcome.tsx
export default function Welcome({ name }: { name: string }) {
  return (
    <div className="p-10">
      <h1>Hello, {name}!</h1>
      <p>Welcome to CanxJS</p>
    </div>
  );
}`;

const controllerExample = `import { Controller, Get, view } from "canxjs";

@Controller()
export class HomeController {
  
  @Get()
  async index() {
    // Renders src/views/welcome.tsx
    return await view('welcome', { name: 'World' });
  }
}`;

const layoutExample = `import { createLayout } from "canxjs";

const MainLayout = ({ children, title }) => (
  <html>
    <head><title>{title}</title></head>
    <body>{children}</body>
  </html>
);

// Usage
export default createLayout(MainLayout);`;

const features = [
  { icon: Code, title: "JSX Support", desc: "Write views using familiar JSX syntax." },
  { icon: Layout, title: "Layouts", desc: "Create reusable layouts for your pages." },
  { icon: Monitor, title: "SSR", desc: "Server-side rendering for better SEO." },
  { icon: Zap, title: "Fast", desc: "Powered by Bun's native JSX transpiler." },
];

export default function ViewsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Monitor className="w-3 h-3 mr-1.5" />Frontend
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Views (JSX)</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Build server-rendered user interfaces using JSX components. No comprehensive frontend framework required.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-blue-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Creating Views</h2>
        <p className="text-zinc-400 mb-6">Views are just functions that return JSX. Save them in `src/views`.</p>
        <CodePreview code={viewExample} filename="src/views/welcome.tsx" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Rendering Views</h2>
        <p className="text-zinc-400 mb-6">Use the `view()` helper in your controllers.</p>
        <CodePreview code={controllerExample} filename="home.controller.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Layouts</h2>
        <CodePreview code={layoutExample} filename="src/views/layouts/main.tsx" />
      </section>
    </div>
  );
}
