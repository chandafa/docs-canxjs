import { CodeBlock } from "@/components/ui/code-block";

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
          <CodeBlock language="tsx" code={`import { Button } from "@/components/ui/button";

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
}`} />
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
                  <td className="px-4 py-3 font-mono">"primary" | "secondary" | "danger" | "ghost"</td>
                  <td className="px-4 py-3">"primary"</td>
                  <td className="px-4 py-3">Visual style of the button.</td>
                </tr>
                <tr className="hover:bg-zinc-900/20">
                  <td className="px-4 py-3 font-mono text-blue-400">size</td>
                  <td className="px-4 py-3 font-mono">"sm" | "md" | "lg"</td>
                  <td className="px-4 py-3">"md"</td>
                  <td className="px-4 py-3">Size of the button.</td>
                </tr>
                <tr className="hover:bg-zinc-900/20">
                  <td className="px-4 py-3 font-mono text-blue-400">type</td>
                  <td className="px-4 py-3 font-mono">"button" | "submit" | "reset"</td>
                  <td className="px-4 py-3">"button"</td>
                  <td className="px-4 py-3">HTML type attribute.</td>
                </tr>
                <tr className="hover:bg-zinc-900/20">
                  <td className="px-4 py-3 font-mono text-blue-400">className</td>
                  <td className="px-4 py-3 font-mono">string</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">Additional CSS classes to override styles.</td>
                </tr>
                <tr className="hover:bg-zinc-900/20">
                  <td className="px-4 py-3 font-mono text-blue-400">children</td>
                  <td className="px-4 py-3 font-mono">ReactNode</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">Button content.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
