import { CodeBlock } from "@/components/ui/code-block";

export default function TestingInstallationPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          Installation
        </h1>
        <p className="text-xl text-zinc-400">
          Get started with testingcanxjs for robust integration testing.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Install Package</h2>
          <p className="text-zinc-400">
            Install the testing suite as a development dependency.
          </p>
          <CodeBlock language="bash" code="npm install -D testingcanxjs" />
          <p className="text-zinc-500 text-sm">Or with Bun:</p>
          <CodeBlock language="bash" code="bun add -d testingcanxjs" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Configuration</h2>
          <p className="text-zinc-400">
            Ensure your <code>tsconfig.json</code> is configured to support Bun types, as the testing suite relies on the Bun test runner.
          </p>
          <CodeBlock language="json" code={`{
  "compilerOptions": {
    "types": ["bun"]
  }
}`} />
        </section>
      </div>
    </div>
  );
}
