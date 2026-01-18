import { CodeBlock } from "@/components/ui/code-block";

export default function UpgradeGuidePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          Upgrade Guide
        </h1>
        <p className="text-xl text-zinc-400">
          Follow these guides to upgrade your CanxJS application to the latest version.
        </p>
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
          <h2 id="upgrade-1.4.1" className="text-2xl font-semibold text-white">Upgrading To 1.4.1 From 1.x</h2>
          
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white">Update Dependencies</h3>
            <p className="text-zinc-400">
              Update your <code>package.json</code> to require the latest version of <code>canxjs</code>:
            </p>
            <CodeBlock language="bash" code={`bun update canxjs`} />
          </div>

          <div className="space-y-4">
             <h3 className="text-xl font-medium text-white">Check Main Entry Point</h3>
             <p className="text-zinc-400">
               If you are using the new Scheduler feature, you may need to register the <code>ScheduleServiceProvider</code> in your <code>src/app.ts</code> (though it is usually auto-discovered).
             </p>
          </div>
           
           <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <h4 className="font-medium text-yellow-500 mb-2">Note on Breaking Changes</h4>
              <p className="text-zinc-400 text-sm">
                 There are no breaking changes in this release. All new features (Events, Notifications, Storage) are additive.
              </p>
           </div>
        </section>
      </div>
    </div>
  );
}
