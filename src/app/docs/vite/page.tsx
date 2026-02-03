import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Zap, ArrowRight, RefreshCw } from "lucide-react";

const configExample = `// vite.config.ts
import { defineConfig } from 'vite';
import canx from 'canxjs/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    canx({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      refresh: true,
    }),
    react(),
  ],
});`;

const viewExample = `<!-- src/views/app.tsx (JSX View) -->
import { Vite } from "canxjs";

export const AppLayout = ({ children }) => (
  <html>
    <head>
      <title>My App</title>
      {/* Auto-injects scripts and styles */}
      <Vite entry={['resources/css/app.css', 'resources/js/app.tsx']} />
    </head>
    <body>
      {children}
    </body>
  </html>
);`;

const usageExample = `// Run in development
bun run dev

// Build for production
bun run build`;

export default function VitePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Zap className="w-3 h-3 mr-1.5" />Frontend
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Vite Integration</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Lightning fast frontend tooling. Enjoy Hot Module Replacement (HMR), optimized builds, 
          and seamless integration with React, Vue, or vanilla JS.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
            <div className="p-2 rounded-lg bg-yellow-500/10 w-fit mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Instant Server Start</h3>
            <p className="text-sm text-zinc-500">On-demand file serving over native ESM.</p>
          </div>
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
            <div className="p-2 rounded-lg bg-blue-500/10 w-fit mb-3">
              <RefreshCw className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Hot Module Replacement</h3>
            <p className="text-sm text-zinc-500">Updates code in the browser without reloading.</p>
          </div>
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Configuration</h2>
        <p className="text-zinc-400 mb-6">Use the CanxJS Vite plugin to manage entry points and reload behavior.</p>
        <CodePreview code={configExample} filename="vite.config.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Injecting Assets</h2>
        <p className="text-zinc-400 mb-6">
          Use the <code>&lt;Vite /&gt;</code> component in your views to inject the correct script and style tags 
          for both development (HMR) and production (hashed assets).
        </p>
        <CodePreview code={viewExample} filename="src/views/app.tsx" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Running</h2>
        <CodePreview code={usageExample} filename="Terminal" />
      </section>

      <section className="animate-slide-up delay-400">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Learn how to use Inertia.js with Vite.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/inertia">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Inertia.js
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
