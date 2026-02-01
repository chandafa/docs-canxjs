import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TestTube2, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle, 
  PlayCircle,
  Settings,
  FileCode,
  Layers
} from "lucide-react";

export const metadata: Metadata = {
  title: "Testing",
  description: "Write reliable tests for your CanxJS applications. Learn unit testing, integration testing, and end-to-end testing with Bun's built-in test runner.",
  openGraph: {
    title: "Testing in CanxJS",
    description: "Comprehensive testing guide for CanxJS applications using Bun's native test runner.",
  },
};

const testingTopics = [
  {
    icon: Settings,
    title: "Installation & Setup",
    description: "Configure testing environment with Bun's built-in test runner",
    href: "/docs/testing/installation",
  },
  {
    icon: PlayCircle,
    title: "Usage Guide",
    description: "Write and run tests for your CanxJS applications",
    href: "/docs/testing/usage",
  },
  {
    icon: FileCode,
    title: "Unit Testing",
    description: "Test individual components, services, and utilities",
    href: "/docs/testing/unit",
  },
];

const testingFeatures = [
  "Bun's native test runner - ultra-fast execution",
  "Built-in mocking and spying utilities",
  "Snapshot testing support",
  "Code coverage reports",
  "Watch mode for development",
  "TypeScript support out of the box",
];

export default function TestingPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <TestTube2 className="w-3 h-3 mr-1.5" />
          Quality Assurance
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Testing</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Write reliable, maintainable tests for your CanxJS applications. Leverage Bun&apos;s 
          blazing-fast native test runner for unit, integration, and end-to-end testing.
        </p>
      </div>

      {/* Quick Overview */}
      <section className="mb-16 animate-slide-up">
        <div className="rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 p-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <TestTube2 className="w-5 h-5 text-green-400" />
            Why Test with CanxJS?
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {testingFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-zinc-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Topics */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-6">Getting Started</h2>
        <div className="grid gap-4">
          {testingTopics.map((topic) => (
            <Link
              key={topic.href}
              href={topic.href}
              className="group rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 hover:bg-white/[0.04] hover:border-white/[0.15] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <topic.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-white transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      {topic.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-6">Quick Start</h2>
        <div className="rounded-2xl bg-zinc-950 border border-white/[0.08] overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
            <span className="text-sm text-zinc-400 font-mono">example.test.ts</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto">
            <code className="text-zinc-300">{`import { describe, test, expect } from "bun:test";
import { createApp } from "canxjs";

describe("API Tests", () => {
  test("GET / returns hello message", async () => {
    const app = createApp({ port: 0 });
    
    app.get("/", (req, res) => {
      res.json({ message: "Hello CanxJS!" });
    });

    const response = await app.request("/");
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.message).toBe("Hello CanxJS!");
  });
});`}</code>
          </pre>
        </div>
        <p className="text-sm text-zinc-500 mt-4">
          Run tests with: <code className="px-2 py-1 rounded bg-zinc-800 text-zinc-300">bun test</code>
        </p>
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-300">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Start Testing</h3>
          <p className="text-zinc-400 mb-6">
            Set up your testing environment and write your first test.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/testing/installation">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Installation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/testing/usage">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Usage Guide
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
