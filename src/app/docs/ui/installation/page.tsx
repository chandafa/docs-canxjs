import { CodeBlock } from "@/components/ui/code-block";

export default function UIInstallationPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Installation
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Start building beautiful interfaces with Canx UI components. Designed to be lightweight, accessible, and fully customizable with Tailwind CSS.
        </p>
      </div>

      <div className="grid gap-12">
        {/* Requirements */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Requirements</h2>
          <p className="text-zinc-400">
            Canx UI is built on top of React and Tailwind CSS. Make sure your project meets these requirements:
          </p>
          <ul className="list-disc list-inside text-zinc-400 space-y-2 ml-2">
            <li>React 18 or later</li>
            <li>Tailwind CSS 3 or later</li>
            <li>Node.js 18 or later</li>
          </ul>
        </section>

        {/* Installation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">1. Install Package</h2>
          <p className="text-zinc-400">
            Install the <code>canx-ui</code> package using your preferred package manager:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-500">Bun (Recommended)</span>
              <CodeBlock language="bash" code="bun add canx-ui" />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-500">NPM</span>
              <CodeBlock language="bash" code="npm install canx-ui" />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-500">PNPM</span>
              <CodeBlock language="bash" code="pnpm add canx-ui" />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-500">Yarn</span>
              <CodeBlock language="bash" code="yarn add canx-ui" />
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">2. Configure Tailwind CSS</h2>
          <p className="text-zinc-400">
            Since Canx UI components are styled with utility classes, you need to tell Tailwind to scan the package for class usage.
          </p>
          
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-sm">
            <strong>Important:</strong> If you don't do this, the components will appear unstyled because Tailwind will purge the unused classes.
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">For Tailwind CSS v3</h3>
            <p className="text-zinc-400">Update your <code>tailwind.config.js</code> file:</p>
            <CodeBlock language="javascript" code={`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/canx-ui/dist/**/*.{js,ts,jsx,tsx}" // <--- Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`} />
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-medium text-white">For Tailwind CSS v4</h3>
            <p className="text-zinc-400">Import the package in your CSS entry point (if supported) or rely on source scanning configuration.</p>
          </div>
        </section>

        {/* Utilities */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">3. Setup Utilities (Optional)</h2>
          <p className="text-zinc-400">
            If you want to override styles using <code>className</code> prop effectively, we recommend setting up a <code>cn</code> utility.
            You can run our CLI to scaffold the folder structure and utils:
          </p>
          <CodeBlock language="bash" code="npx canx-ui init" />
          <p className="text-zinc-400 text-sm">
            This command creates <code>src/lib/utils.ts</code> and <code>src/components/ui</code>.
          </p>
        </section>

        {/* Global Styles */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">4. Global Styles</h2>
          <p className="text-zinc-400">
            Add the following CSS variables to your global CSS if you want to use the default theme tokens (optional, Canx UI uses standard Tailwind colors by default but can use tokens):
          </p>
          <CodeBlock language="css" code={`@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    /* ... other tokens */
  }
}`} />
        </section>
      </div>
    </div>
  );
}
