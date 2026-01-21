import { CodeBlock } from "@/components/ui/code-block";
import { Badge } from "@/components/ui/badge";
import { Rocket, AlertTriangle, CheckCircle } from "lucide-react";

export default function UpgradeGuidePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Rocket className="w-3 h-3 mr-1.5" />
          Maintenance
        </Badge>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          Upgrade Guide
        </h1>
        <p className="text-xl text-zinc-400">
          Keep your CanxJS application up-to-date with the latest features and security patches.
        </p>
      </div>

      <div className="space-y-12">
        {/* Latest Version Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-white/10">
            <h2 className="text-2xl font-semibold text-white">Upgrading to v1.5.0</h2>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Latest</Badge>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white">1. Update Dependencies</h3>
            <p className="text-zinc-400">
              Run the following command to update <code>canxjs</code> to the latest version:
            </p>
            <CodeBlock language="bash" code={`bun update canxjs`} />
          </div>

          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
             <div className="flex items-start gap-3">
               <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
               <div>
                 <h4 className="font-medium text-blue-400 mb-1">New Features</h4>
                 <ul className="text-zinc-400 text-sm list-disc list-inside space-y-1">
                   <li><strong>Microservices:</strong> Full support for TCP, Redis, and MQTT transporters.</li>
                   <li><strong>CQRS:</strong> Command, Query, and Event buses with Sagas support.</li>
                   <li><strong>GraphQL:</strong> Code-first schema generation.</li>
                   <li><strong>Performance:</strong> JIT Compiler and Request Batching.</li>
                 </ul>
               </div>
             </div>
          </div>
        </section>

        {/* Previous Versions */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Upgrading from 1.3.x to 1.4.x</h2>
          
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white">Breaking Changes</h3>
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-500 mb-1">Type Definitions</h4>
                  <p className="text-zinc-400 text-sm">
                    Stricter type definitions were introduced for <code>Middleware</code> and <code>Controller</code> based classes.
                    Ensure your custom middleware implements the correct <code>CanxMiddleware</code> interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* General Advice */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">General Upgrade Strategy</h2>
          <p className="text-zinc-400">
            We follow Semantic Versioning. Major version bumps (2.0.0) indicate breaking changes, while minor (1.5.0) and patch (1.5.1) releases are backward compatible.
          </p>
          <ul className="list-disc list-inside text-zinc-400 space-y-2 ml-4">
            <li>Always check the <strong>Release Notes</strong> before upgrading.</li>
            <li>Run your test suite completely after upgrading: <code>bun test</code>.</li>
            <li>Check for deprecated warnings in your console output.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
