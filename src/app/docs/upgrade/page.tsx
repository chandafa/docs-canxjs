import { CodeBlock } from "@/components/ui/code-block";
import { Badge } from "@/components/ui/badge";
import { Rocket, AlertTriangle, CheckCircle } from "lucide-react";

export default function UpgradeGuidePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <Badge variant="secondary" className="mb-4 bg-secondary border-border text-muted-foreground">
          <Rocket className="w-3 h-3 mr-1.5" />
          Maintenance
        </Badge>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 mb-4">
          Upgrade Guide
        </h1>
        <p className="text-xl text-muted-foreground">
          Keep your CanxJS application up-to-date with the latest features and security patches.
        </p>
      </div>

      <div className="space-y-12">
        {/* Latest Version Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-border">
            <h2 className="text-2xl font-semibold text-foreground">Upgrading to v1.6.2</h2>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Latest</Badge>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-foreground">1. Update Dependencies</h3>
            <p className="text-muted-foreground">
              Run the following command to update <code>canxjs</code> to the latest version:
            </p>
            <CodeBlock language="bash" code={`bun update canxjs`} />
          </div>

          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
             <div className="flex items-start gap-3">
               <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
               <div>
                 <h4 className="font-medium text-blue-400 mb-1">New Features in 1.6</h4>
                 <ul className="text-muted-foreground text-sm list-disc list-inside space-y-1">
                   <li><strong>WebSocket Support:</strong> Built-in real-time communication.</li>
                   <li><strong>Native JSX:</strong> Removed React dependency for faster SSR.</li>
                   <li><strong>Global Helpers:</strong> <code>route()</code> helper for named reverse routing.</li>
                   <li><strong>Controller API:</strong> <code>render()</code> helper for easier view rendering.</li>
                 </ul>
               </div>
             </div>
          </div>
        </section>

        {/* Previous Versions */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Upgrading from 1.4.x to 1.5.x</h2>
          
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-foreground">Breaking Changes</h3>
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-500 mb-1">Type Definitions</h4>
                  <p className="text-muted-foreground text-sm">
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
          <h2 className="text-2xl font-semibold text-foreground">General Upgrade Strategy</h2>
          <p className="text-muted-foreground">
            We follow Semantic Versioning. Major version bumps (2.0.0) indicate breaking changes, while minor (1.6.0) and patch (1.6.2) releases are backward compatible.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Always check the <strong>Release Notes</strong> before upgrading.</li>
            <li>Run your test suite completely after upgrading: <code>bun test</code>.</li>
            <li>Check for deprecated warnings in your console output.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
