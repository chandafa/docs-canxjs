import { CodeBlock } from "@/components/ui/code-block";
import { Label } from "@/components/ui/label";
import { ComponentPreview } from "@/components/ui/component-preview";

export default function LabelPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Label
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Renders an accessible label associated with controls.
        </p>
      </div>

      <div className="grid gap-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Installation</h2>
          <CodeBlock language="bash" code="npx canx-ui add label" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Usage</h2>
          <ComponentPreview code={`import { Label } from "@/components/ui/label"

export function LabelDemo() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}`}>
            <div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms-demo" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <Label htmlFor="terms-demo">Accept terms and conditions</Label>
              </div>
            </div>
          </ComponentPreview>
        </section>
      </div>
    </div>
  );
}
