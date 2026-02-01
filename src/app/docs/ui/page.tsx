import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  ChevronRight, 
  ArrowRight, 
  Box,
  CheckCircle,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "UI Components",
  description: "Beautiful, accessible UI components for CanxJS applications. Pre-built React components with dark mode support and customizable styling.",
  openGraph: {
    title: "CanxJS UI Components",
    description: "Production-ready UI components with dark mode, accessibility, and customization.",
  },
};

const components = [
  { name: "Button", description: "Interactive button with variants", href: "/docs/ui/button" },
  { name: "Input", description: "Text input with validation states", href: "/docs/ui/input" },
  { name: "Card", description: "Flexible content container", href: "/docs/ui/card" },
  { name: "Badge", description: "Status and label indicators", href: "/docs/ui/badge" },
  { name: "Alert", description: "Feedback and notification messages", href: "/docs/ui/alert" },
  { name: "Modal", description: "Dialog and overlay components", href: "/docs/ui/modal" },
  { name: "Table", description: "Data tables with sorting", href: "/docs/ui/table" },
  { name: "Label", description: "Form field labels", href: "/docs/ui/label" },
];

const features = [
  "Dark mode support out of the box",
  "Fully accessible (WCAG 2.1)",
  "TypeScript-first with full types",
  "Customizable with CSS variables",
  "Responsive by design",
  "Lightweight and tree-shakeable",
];

export default function UIPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Palette className="w-3 h-3 mr-1.5" />
          Components
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">UI Components</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Beautiful, accessible UI components for building modern web applications. 
          Designed for CanxJS with dark mode support and full customization.
        </p>
      </div>

      {/* Features */}
      <section className="mb-16 animate-slide-up">
        <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 p-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Features
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-zinc-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Quick Start</h2>
        <p className="text-zinc-400 mb-6">
          Get started by installing the UI components package.
        </p>
        <div className="rounded-2xl bg-zinc-950 border border-white/[0.08] overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
            <span className="text-sm text-zinc-400 font-mono">Terminal</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto">
            <code className="text-zinc-300">bun add @canxjs/ui</code>
          </pre>
        </div>
        <div className="mt-4">
          <Link href="/docs/ui/installation" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View full installation guide
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* Component List */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-6">Components</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {components.map((component) => (
            <Link
              key={component.href}
              href={component.href}
              className="group rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 hover:bg-white/[0.04] hover:border-white/[0.15] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/[0.05] group-hover:bg-white/[0.1] transition-colors">
                    <Box className="w-5 h-5 text-zinc-400 group-hover:text-zinc-300 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-white transition-colors">
                      {component.name}
                    </h3>
                    <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      {component.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Usage Example */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
        <div className="rounded-2xl bg-zinc-950 border border-white/[0.08] overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
            <span className="text-sm text-zinc-400 font-mono">Example.tsx</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto">
            <code className="text-zinc-300">{`import { Button, Card, Badge } from "@canxjs/ui";

export function Dashboard() {
  return (
    <Card>
      <Card.Header>
        <h2>Welcome to CanxJS</h2>
        <Badge variant="success">Active</Badge>
      </Card.Header>
      <Card.Content>
        <p>Build amazing applications with CanxJS.</p>
      </Card.Content>
      <Card.Footer>
        <Button variant="primary">Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </Card.Footer>
    </Card>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-400">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Get Started</h3>
          <p className="text-zinc-400 mb-6">
            Install the components and start building beautiful UIs.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/ui/installation">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Installation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/ui/button">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                View Button
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
