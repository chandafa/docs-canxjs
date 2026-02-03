import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { ComponentPreview } from "@/components/ui/component-preview";

export default function ButtonPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Button
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Highly interactive button component with support for multiple variants, sizes, and states.
        </p>
      </div>

      <div className="grid gap-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Installation</h2>
          <CodeBlock language="bash" code="npx canx-ui add button" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Usage</h2>
          <ComponentPreview code={`import { Button } from "@/components/ui/button";

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}`}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </ComponentPreview>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Props</h2>
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="bg-zinc-900/50 text-zinc-200">
                <tr>
                  <th className="px-4 py-3 font-medium">Prop</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr className="hover:bg-zinc-900/20">
                  <td className="px-4 py-3 font-mono text-blue-400">variant</td>
                  <td className="px-4 py-3 font-mono">&quot;primary&quot; | &quot;secondary&quot; | &quot;destructive&quot; | &quot;outline&quot; | &quot;ghost&quot; | &quot;link&quot;</td>
                  <td className="px-4 py-3">&quot;default&quot;</td>
                  <td className="px-4 py-3">
                    Use the <code className="text-primary bg-muted px-1 py-0.5 rounded">&quot;default&quot;</code>, <code className="text-primary bg-muted px-1 py-0.5 rounded">&quot;destructive&quot;</code>, <code className="text-primary bg-muted px-1 py-0.5 rounded">&quot;outline&quot;</code>, <code className="text-primary bg-muted px-1 py-0.5 rounded">&quot;secondary&quot;</code>, <code className="text-primary bg-muted px-1 py-0.5 rounded">&quot;ghost&quot;</code>, or <code className="text-primary bg-muted px-1 py-0.5 rounded">&quot;link&quot;</code> variant.
                  </td>
                </tr>
                <tr className="hover:bg-zinc-900/20">
                  <td className="px-4 py-3 font-mono text-blue-400">size</td>
                  <td className="px-4 py-3 font-mono">&quot;default&quot; | &quot;sm&quot; | &quot;lg&quot; | &quot;icon&quot;</td>
                  <td className="px-4 py-3">&quot;default&quot;</td>
                  <td className="px-4 py-3">
                    Use <code className="text-primary bg-muted px-1 py-0.5 rounded">&quot;default&quot;</code>, <code className="text-primary bg-muted px-1 py-0.5 rounded">&quot;sm&quot;</code>, <code className="text-primary bg-muted px-1 py-0.5 rounded">&quot;lg&quot;</code>, or <code className="text-primary bg-muted px-1 py-0.5 rounded">&quot;icon&quot;</code> sizes.
                  </td>
                </tr>
                <tr className="hover:bg-zinc-900/20">
                  <td className="px-4 py-3 font-mono text-blue-400">asChild</td>
                  <td className="px-4 py-3 font-mono">boolean</td>
                  <td className="px-4 py-3">false</td>
                  <td className="px-4 py-3">Merge props onto the immediate child.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
