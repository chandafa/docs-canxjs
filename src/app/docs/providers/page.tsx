"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Box, ArrowRight, Settings, Package } from "lucide-react";

const providerExample = `import { ServiceProvider, container } from "canxjs";
import { S3Client } from "@aws-sdk/client-s3";

export class StorageServiceProvider extends ServiceProvider {
  /**
   * Register bindings in the container.
   */
  async register() {
    container.bind("STORAGE_CLIENT", () => {
      return new S3Client({ region: "us-east-1" });
    });
  }

  /**
   * Bootstrap any application services.
   */
  async boot() {
    // Perform actions after all providers are registered
  }
}`;

const usageExample = `import { createApp } from "canxjs";
import { StorageServiceProvider } from "./providers/StorageServiceProvider";

const app = createApp({
  providers: [
    StorageServiceProvider
  ]
});`;

const features = [
  { icon: Package, title: "Registration", desc: "Bind services into the service container." },
  { icon: Settings, title: "Bootstrapping", desc: "Configure services after all bindings are registered." },
  { icon: Box, title: "Lazy Loading", desc: "Providers are loaded efficiently during application startup." },
];

export default function ProvidersPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Box className="w-3 h-3 mr-1.5" />Architecture
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Service Providers</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          The central place to configure your application. Service providers allow you to register bindings, event listeners, middleware, and more.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-3 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-indigo-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Writing a Provider</h2>
        <p className="text-zinc-400 mb-6">
          Extend the <code>ServiceProvider</code> class and implement the <code>register</code> and <code>boot</code> methods.
        </p>
        <CodePreview code={providerExample} filename="providers/StorageServiceProvider.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Registering Providers</h2>
        <p className="text-zinc-400 mb-6">
          Add your providers to the <code>createApp</code> configuration.
        </p>
        <CodePreview code={usageExample} filename="app.ts" />
      </section>

      <section className="animate-slide-up delay-300">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Deep dive into the IOC Container.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/container">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Dependency Injection<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
