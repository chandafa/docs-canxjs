import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Layers, ArrowRight, Link as LinkIcon, Box } from "lucide-react";

const chainExample = `import { Bus } from 'canxjs';
import { OptimizeImage } from './jobs/OptimizeImage';
import { SendNotification } from './jobs/SendNotification';

// Run jobs in sequence. If one fails, the rest are not run.
await Bus.chain([
    new OptimizeImage(imageId),
    new SendNotification(userId),
]).dispatch();`;

const batchExample = `import { Bus } from 'canxjs';

// Run jobs in parallel and track completion
const batch = await Bus.batch([
    new ProcessImport(file1),
    new ProcessImport(file2),
    new ProcessImport(file3),
])
.then(() => {
    // Callback when all jobs complete successfully
    console.log('Batch finished!');
})
.catch(() => {
    // Callback if a job fails
    console.log('Batch failed!');
})
.finally(() => {
    // Always run
})
.dispatch();

console.log(\`Batch ID: \${batch.id}\`);`;

const batchAwareExample = `import { Batchable, Dispatchable, InteractsWithBatch } from 'canxjs';

export class ProcessImport implements Dispatchable, Batchable {
  use(InteractsWithBatch);

  async handle() {
    if (this.batch().cancelled()) {
      return;
    }

    // Process...
  }
}`;

export default function BatchesPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Layers className="w-3 h-3 mr-1.5" />Queue
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Job Batches & Chains</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Orchestrate your background jobs. Execute jobs in sequence with Chains, or in parallel as a Batch with completion callbacks.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10"><LinkIcon className="w-5 h-5 text-blue-400" /></div>
            <h2 className="text-2xl font-semibold text-white">Job Chains</h2>
        </div>
        <p className="text-zinc-400 mb-6">
            Job chaining allows you to specify a list of queued jobs that should be run in sequence locally or distributed. 
            If one job in the sequence fails, the rest of the jobs will not be run.
        </p>
        <CodePreview code={chainExample} filename="controller.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10"><Box className="w-5 h-5 text-purple-400" /></div>
            <h2 className="text-2xl font-semibold text-white">Job Batches</h2>
        </div>
        <p className="text-zinc-400 mb-6">
            Job batching allows you to execute a batch of jobs and then perform some action when the batch has completed executing.
        </p>
        <CodePreview code={batchExample} filename="service.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Interacting with Batches</h2>
        <p className="text-zinc-400 mb-6">
            Your job classes should use the <code>Batchable</code> trait (mixin) to interact with the batch they belong to.
        </p>
        <CodePreview code={batchAwareExample} filename="jobs/ProcessImport.ts" />
      </section>

      <section className="animate-slide-up delay-300">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Queue Basics</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/queue">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Queue Documentation <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
