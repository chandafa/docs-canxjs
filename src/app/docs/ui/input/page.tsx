import { CodeBlock } from "@/components/ui/code-block";

export default function InputPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Input
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Displays a form input field or a component that looks like an input field.
        </p>
      </div>

      <div className="grid gap-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Installation</h2>
          <CodeBlock language="bash" code="npx canx-ui add input" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Usage</h2>
          <CodeBlock language="tsx" code={`import { Input } from "@/components/ui/input";

export default function Demo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-4">
      <Input type="email" placeholder="Email" label="Email Address" />
      <Input type="password" placeholder="Password" label="Password" />
      <Input 
        type="text" 
        placeholder="Username" 
        label="Username" 
        error="Username already taken" 
      />
    </div>
  );
}`} />
        </section>
    </div>
    </div>
  );
}
