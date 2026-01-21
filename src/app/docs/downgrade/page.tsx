import { CodeBlock } from "@/components/ui/code-block";
import { Badge } from "@/components/ui/badge";
import { History, AlertTriangle, AlertOctagon } from "lucide-react";

export default function DowngradeGuidePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <History className="w-3 h-3 mr-1.5" />
          Maintenance
        </Badge>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          Downgrade Guide
        </h1>
        <p className="text-xl text-zinc-400">
          Instructions for rolling back to a previous version of CanxJS in case of critical issues.
        </p>
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
             <div className="flex items-start gap-3">
               <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
               <div>
                 <h4 className="font-medium text-red-400 mb-1">Warning: Data Compatibility</h4>
                 <p className="text-zinc-400 text-sm">
                   Downgrading may cause issues if you have run database migrations associated with the newer version.
                   <strong>Always backup your database</strong> before performing a downgrade.
                 </p>
               </div>
             </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">How to Downgrade</h2>
          
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white">1. Identify Target Version</h3>
            <p className="text-zinc-400">
              Check the <a href="https://www.npmjs.com/package/canxjs?activeTab=versions" className="text-blue-400 hover:underline" target="_blank">NPM versions</a> or your <code>package.json</code> history to find the stable version you want to revert to (e.g., <code>1.4.1</code>).
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white">2. Install Specific Version</h3>
            <p className="text-zinc-400">
              Use <code>bun add</code> (or <code>npm install</code>) with the specific version tag:
            </p>
            <CodeBlock language="bash" code={`bun add canxjs@1.4.1`} />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white">3. Revert Migrations (If applicable)</h3>
            <p className="text-zinc-400">
              If the newer version included database schema changes, you should rollback those migrations <strong>before</strong> switching the code.
            </p>
            <CodeBlock language="bash" code={`bun canx migration:rollback`} />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white">4. Clear Cache</h3>
            <p className="text-zinc-400">
              Clear your node_modules and lock files to ensure a clean slate.
            </p>
            <CodeBlock language="bash" code={`rm -rf node_modules bun.lockb
bun install`} />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Troubleshooting</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <h4 className="font-medium text-white mb-2">"Module not found" errors</h4>
              <p className="text-sm text-zinc-400">
                If you see errors about missing modules after downgrading, it likely means the newer version introduced modules that your code is still trying to import. You will need to remove references to these new features in your application code.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <h4 className="font-medium text-white mb-2">TypeScript Errors</h4>
              <p className="text-sm text-zinc-400">
                Type definitions might have changed. You may need to restart your TS server in VS Code (<code>Ctrl+Shift+P</code> {'>'} <code>TypeScript: Restart TS Server</code>).
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
